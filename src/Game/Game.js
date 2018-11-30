import React from 'react';
import Board from './Board';
import GameOptions from './Options';
import GameModes from './Modes';
import PlayerFool from './player-fool';
import ai from './player-ai';
import Stats from './Stats';
import Judger from "./Judger";
import CultureSelector from './CultureSelector';
import Resources from './Resources';
import Strategy, {StrategySettings} from "./Strategy";
import {spotScoreMap} from "./globals";


StrategySettings.setInitialWeights([0.46, -0.34, 0.14])
StrategySettings.setNamedStrategy((factors) => {
    return {
        const: factors[0],
        danger: factors[1],
        intersectedBads: factors[2]
    };
})

let PlayerX, PlayerO
export default class Game extends React.Component {
    constructor(props) {
        super(props);

        PlayerX = new PlayerFool('X', 'O', true);
        PlayerO = new ai('O', 'X');

        let initialSquares = Array(9).fill(null);
        const initialState = {
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

        this.state = initialState;

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
                        console.log(spotScoreMap);
                        return;
                    }

                    if (this.state.xIsNext && (this.state.currentMode === GameModes.computerVsComputer)) {
                        PlayerX.nextMove(this.state.history[this.state.stepNumber].squares, this);
                        return;
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

        const moves = history.map((step, move) => {
            const desc = Resources.getInstance().getMove(move, step.squares, step.squareIndex);
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>
                        {
                            move === this.state.stepNumber ?
                                <strong>
                                    {desc}
                                </strong>
                                : <span>{desc}</span>
                        }
                    </button>
                    {/*<span>{step.score}</span>*/}
                </li>
            );
        });


        let status;
        if (winner) {
            status = Resources.getInstance().winner + winner;
        } else {
            status = Resources.getInstance().getNextPlayer(this.state.xIsNext, this.state.currentMode);
        }

        return (
            <div className="container">
                <h1 style={{lineHeight: 0.8}}>
                    <CultureSelector currentCulture="zh-CN"
                                     cultureChanged={() => this.forceUpdate()}/>

                    <span>{Resources.getInstance().header}</span>
                    <br/>
                    <span style={{color: 'gray', fontSize: 'xx-small'}}>{Resources.getInstance().subHeader}</span>
                </h1>
                <div>
                    <h2>{Resources.getInstance().getRound(this.state.round)}</h2>
                    <p>
                        O {Resources.getInstance().weightsOf}{this.state.OWeights.map(w => w.toFixed(2)).join(', ')}
                    </p>
                    <p>
                        Strategy: {JSON.stringify(this.state.strategy)}
                    </p>
                </div>
                <div className="game">
                    <div className="game-options">
                        <GameOptions readonly={this.state.stepNumber}
                                     optionChanged={this.optionChanged} autoStart={this.state.autoStart}
                                     mode={this.state.currentMode}
                                     ref={gameOptions => this.gameOptions = gameOptions}/>
                    </div>
                    <div className="game-board">
                        <Board squares={current.squares}
                               onClick={(i) => this.state.currentMode === GameModes.computerVsComputer ? false : this.handleClick(i)}
                               winner={this.state.winnerInfo}/>
                    </div>
                    <div className="game-info">
                        <div>{status}</div>
                        <ol>{moves}</ol>
                    </div>
                </div>
                <div>
                    <p>
                        {Resources.getInstance().autoPlay} <input type="number" onChange={this.changeCountdownNumber}
                                                                  id="turns"
                                                                  value={this.state.countDown}/> {Resources.getInstance().round}
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <button id="start-auto-button"
                                onClick={() => this.learn()}>{Resources.getInstance().startLearning}</button>
                    </p>
                </div>
                <Stats/>
                <p>
                    {Resources.getInstance().sourceCode}
                    <a href="https://github.com/Jeff-Tian/tic-tac-toe-ai"
                       target="_blank" rel="noopener noreferrer">https://github.com/Jeff-Tian/tic-tac-toe-ai</a>
                </p>
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
