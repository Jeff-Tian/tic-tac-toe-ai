import React from 'react';
import Board from './Board';
import GameModes from './Modes';
import PlayerFool from './player-fool';
import ai from './player-ai';
import Stats from './Stats';
import Judger from "./Judger";
import Resources from './Resources';
import Strategy, {StrategySettings} from "./Strategy";
import {Button, Flex, WhiteSpace} from 'antd-mobile'
import GameOptions from "./Options";
import classnames from 'classnames'
import './game.css';
import LearningStatus from "./LearningStatus";


StrategySettings.setInitialWeights([0, -2, -1, 1, 1.5, -1]);
//-0.01, -0.47, -0.16, 1.46, 0.67, -0.54
StrategySettings.setNamedStrategy((factors) => {
    return {
        const: factors[0],
        danger: factors[1],
        intersectedBads: factors[2],
        chance: factors[3],
        occupyCenter: factors[4],
        numberOfBadsOfMyChance: factors[5]
    };
})

let PlayerX, PlayerO
export default class Game extends React.Component {
    constructor(props) {
        super(props);

        PlayerX = new PlayerFool('X');
        PlayerO = new ai('O', 'X');

        let initialSquares = Array(9).fill(null);
        this.state = {
            history: [{
                squares: initialSquares,
                squareIndex: null
            }],
            xIsNext: true,
            stepNumber: 0,
            currentMode: GameModes.humanVsComputer,
            autoStart: false,
            OWeights: Object.assign([], PlayerO.getWeights()),
            strategy: Strategy.getNamedStrategy(Strategy.getBoardStatus(new ai('O', 'X').convertSquaresToBitmap(initialSquares)).factors),
            winnerInfo: null,
            round: 1,
            countDown: 0,
        };

        this.optionChanged = this.optionChanged.bind(this);
        this.changeCountdownNumber = this.changeCountdownNumber.bind(this);
    }

    componentDidMount() {
        PlayerO.setWeightsUpdatedCallback(this.weightsUpdated.bind(this));
        PlayerX.setWeightsUpdatedCallback(this.weightsUpdated.bind(this));

    }

    changeCountdownNumber(e) {
        this.setState({
            countDown: e.target.value
        })
    }

    handleClick(i, callback) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        if (this.notifyGameOverIfEnds(squares)) {
            return;
        }

        if (squares[i]) {
            return;
        }

        this.placeAt(squares, i, history, () => {
            this.setState({strategy: Strategy.getNamedStrategy(Strategy.getBoardStatus(new ai('O', 'X').convertSquaresToBitmap(this.state.history[this.state.history.length - 1].squares)).factors)})

            if (this.notifyGameOverIfEnds(this.state.history[this.state.stepNumber].squares)) {
                return;
            }

            if (!this.state.autoPlaying) {
                setTimeout(() => {
                    if (!this.state.xIsNext) {
                        PlayerO.nextMove(this.state.history[this.state.stepNumber].squares, this);
                        return;
                    }

                    if (this.state.xIsNext && (this.state.currentMode === GameModes.computerVsComputer)) {
                        PlayerX.nextMove(this.state.history[this.state.stepNumber].squares, this);
                    }
                }, 10);
            }

            typeof callback === 'function' && callback();
        });

    }

    notifyGameOverIfEnds(squares) {
        let progress = Judger.gameProgress(PlayerO.convertSquaresToBitmap(squares));

        if (Judger.gameEnds(progress)) {
            this.gameEnds({
                who: progress.lost ? 'X' : (progress.win ? 'O' : null),
                where: progress.lost || progress.win || []
            });

            return true;
        }

        return false;
    }

    placeAt(squares, i, history, afterStateChangedCallback) {
        if (squares[i]) {
            return;
        }

        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
                squareIndex: i
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext
        }, afterStateChangedCallback);
    }

    jumpTo(step, callback) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
            winnerInfo: step === 0 ? null : this.state.winnerInfo
        }, () => {
            this.autoStart(this.state.currentMode, this.state.autoStart);

            typeof callback === 'function' && callback();
        });
    }

    optionChanged(selectedMode, autoStart) {
        this.setState({
            currentMode: selectedMode,
            autoStart: autoStart
        }, () => {
            this.autoStart(selectedMode, autoStart);
        });
    }

    autoStart(selectedMode, autoStart) {
        if (selectedMode === GameModes.computerVsComputer && autoStart && this.state.stepNumber === 0) {
            this.setState({endsAt: undefined}, () => {
                PlayerX.nextMove(this.state.history[this.state.stepNumber].squares, this);
            });
        }
    }

    learn() {
        this.setState({
            countDown: this.state.countDown - 1
        });

        this.gameOptions.checkAutoStart(true);
        this.gameOptions.selectMode('computerVsComputer');

        if (this.state.stepNumber > 0) {
            this.jumpTo(0);
        }
    }

    weightsUpdated(newWeights) {
        this.setState({
            OWeights: Object.assign([], PlayerO.getWeights()),
        });
    }

    gameEnds(winnerInfo) {
        PlayerO.tryLearn(this.state.history[this.state.stepNumber].squares);
        PlayerO.clean();
        Stats.updateRoundResult(winnerInfo ? winnerInfo.who : null);

        this.setState(
            {
                winnerInfo: winnerInfo,
                round: this.state.round + 1,
                endsAt: this.state.stepNumber,
            }, () => {
                if (this.state.countDown > 0) {
                    this.setState({
                        countDown: this.state.countDown - 1
                    }, () => {
                        this.jumpTo(0);
                    });
                } else {
                    this.setState({autoPlaying: false})
                }
            }
        );
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = this.state.winnerInfo ? this.state.winnerInfo.who : null;

        let status;
        if (winner) {
            status = Resources.getInstance().winner + winner;
        } else {
            if (!this.state.winnerInfo) {
                status = Resources.getInstance().getNextPlayer(this.state.xIsNext, this.state.stepNumber);
            } else {
                status = '和棋！'
            }
        }

        return (
            <div className="flex-container">
                <LearningStatus state={this.state}/>
                <Flex>
                    <Flex.Item style={{textAlign: 'center'}}>
                        <div className={classnames({
                            'win': this.state.winnerInfo,
                            'progress': !this.state.winnerInfo
                        })}>{status}</div>
                    </Flex.Item>
                </Flex>
                <WhiteSpace size="lg"/>
                <Flex>
                    <Flex.Item style={{textAlign: 'center'}}>
                        <Board squares={current.squares}
                               onClick={(i) => this.state.currentMode === GameModes.computerVsComputer ? false : this.handleClick(i)}
                               winner={this.state.winnerInfo}/>
                    </Flex.Item>
                </Flex>
                <WhiteSpace size="lg"/>
                <Flex>
                    <Flex.Item>
                        {
                            this.state.winnerInfo !== null &&
                            <Button icon={<img src="https://gw.alipayobjects.com/zos/rmsportal/jBfVSpDwPbitsABtDDlB.svg"
                                               alt=""/>} onClick={() => this.jumpTo(0)}>再来一局！</Button>
                        }
                    </Flex.Item>
                </Flex>
                <WhiteSpace size="lg"/>
                <Flex>
                    <Flex.Item style={{textAlign: 'center'}}>
                        <Stats/>
                    </Flex.Item>
                </Flex>
                <WhiteSpace size="lg"/>
                <Flex style={{display: 'none'}}>
                    <Flex.Item>
                        <p>
                            {Resources.getInstance().autoPlay} <input type="number"
                                                                      onChange={this.changeCountdownNumber}
                                                                      id="turns"
                                                                      value={this.state.countDown}/> {Resources.getInstance().round}
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <button id="start-auto-button"
                                    onClick={() => this.learn()}>{Resources.getInstance().startLearning}</button>
                        </p>
                    </Flex.Item>
                    <Flex.Item>
                        <GameOptions readonly={this.state.stepNumber}
                                     optionChanged={this.optionChanged} autoStart={this.state.autoStart}
                                     mode={this.state.currentMode}
                                     ref={gameOptions => this.gameOptions = gameOptions}/>
                    </Flex.Item>
                </Flex>
            </div>
        );
    }

    move(squares, callback) {
        if (this.state.xIsNext) {
            return PlayerX.nextMove(squares, this, callback);
        }

        return PlayerO.nextMove(squares, this, callback);
    }

    autoPlay() {
        this.setState({
            autoPlaying: true
        }, () => {
            let squares = this.state.history[this.state.stepNumber].squares;

            let progress = Judger.gameProgress(PlayerO.convertSquaresToBitmap(squares));
            if (!Judger.gameEnds(progress)) {
                this.move(squares, this.autoPlay.bind(this));
            } else {
                this.gameEnds({
                    who: progress.win ? 'O' : (progress.lost ? 'X' : null),
                    where: progress.win || progress.lost || []
                });

                this.setState({
                    autoPlaying: false
                });
            }
        });
    }
}
