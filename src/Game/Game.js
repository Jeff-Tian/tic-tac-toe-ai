import React from 'react';
import Board from './Board';
import GameOptions from './Options';
import ArrayHelper from '../Helpers/ArrayHelper';
import GameModes from './Modes';
import PlayerFool from './player-fool';
import ai from './player-ai';
import Stats from './Stats';
import Judger from "./Judger";

let PlayerX = new PlayerFool('X', 'O', true);
let PlayerO = new ai('O', 'X', false);

const initialState = {
    history: [{
        squares: Array(9).fill(null),
        squareIndex: null
    }],
    xIsNext: true,
    stepNumber: 0,
    currentMode: GameModes.humanVsComputer,
    autoStart: false,
    OWeights: Object.assign([], PlayerO.getWeights()),
    XWeights: Object.assign([], PlayerX.getWeights()),
    winnerInfo: null,
    round: 1,
    countDown: 0,
};

export default class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = initialState;

        this.optionChanged = this.optionChanged.bind(this);
        this.changeCountdownNumber = this.changeCountdownNumber.bind(this);
        this.players = {
            X: PlayerX,
            O: PlayerO
        }
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

        this.placeAt(squares, i, history, function () {
            if (this.notifyGameOverIfEnds(this.state.history[this.state.stepNumber].squares)) {
                return;
            }

            if (!this.state.autoPlaying) {
                setTimeout(() => {
                    if (!this.state.xIsNext && this.state.currentMode !== GameModes.humanVsHuman) {
                        PlayerO.nextMove(this.state.history[this.state.stepNumber].squares, this);
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
            console.log("you can not place here!");
            return;
        }

        squares[i] = this.state.xIsNext ? 'X' : 'O';
        console.log(squares);
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
        console.log('received: ', selectedMode, autoStart);

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

    silentLearn() {
        PlayerO.clean();
        PlayerX.clean();
        this.jumpTo(0, () => {
            this.autoPlay();
        });
    }

    weightsUpdated(newWeights) {
        console.log('updated ', newWeights);
        this.setState({
            OWeights: Object.assign([], PlayerO.getWeights()),
            XWeights: Object.assign([], PlayerX.getWeights())
        });
    }

    gameEnds(winnerInfo) {
        console.log('ends at ', this.state.stepNumber, this.state.endsAt)
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
            const desc = this.getMoveDescription(move, step);
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
            status = '胜利者: ' + winner;
        } else {
            status = '轮到: ' + (this.state.xIsNext ? 'X' : (this.state.currentMode === GameModes.humanVsHuman ? 'O' : '电脑')) + ' 走子';
        }

        return (
            <div className="container">
                <h1>人工智能版三子棋</h1>
                <div>
                    <h2>第 {this.state.round} 回合</h2>
                    <p>
                        O 的权重: {this.state.OWeights.map(w => w.toFixed(2)).join(', ')}
                        <input type="checkbox" checked={this.players.O.getLearningEnabled() ? 'checked' : ''}
                               id="enable-learning"
                               onChange={() => this.setState({oLearningEnabled: this.players.O.toggleLearning()})}/>
                        < label htmlFor="enable-learning">学习状态</label>
                    </p>
                </div>
                <div className="game">
                    <div className="game-options">
                        <GameOptions readonly={this.state.stepNumber}
                                     optionChanged={this.optionChanged} autoStart={this.state.autoStart}
                                     mode={this.state.currentMode}
                                     ref={gameOptions => this.gameOptions = gameOptions}></GameOptions>
                    </div>
                    <div className="game-board">
                        <Board squares={current.squares}
                               onClick={(i) => this.state.currentMode === GameModes.computerVsComputer ? false : this.handleClick(i)}
                               winner={this.state.winnerInfo} onMouseEnter={() => {
                            console.log('mouse enter');
                        }}/>
                    </div>
                    <div className="game-info">
                        <div>{status}</div>
                        <ol>{moves}</ol>
                    </div>
                </div>
                <div>
                    <p>
                        自动学习 <input type="number" onChange={this.changeCountdownNumber}
                                    value={this.state.countDown}></input> 局
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <button onClick={() => this.learn()}>开始学习</button>
                        <button id="silent-learn-button" onClick={() => this.silentLearn()}
                                disabled={this.state.autoPlaying} style={{display: 'none'}}>静默学习
                        </button>
                    </p>
                </div>
                <Stats></Stats>
                <p>
                    源代码：<a href="https://github.com/Jeff-Tian/tic-tac-toe-ai" target="_blank" rel="noopener noreferrer">https://github.com/Jeff-Tian/tic-tac-toe-ai</a>
                </p>
            </div>
        );
    }

    getMoveDescription(move, step) {
        if (move) {
            let {col, row} = ArrayHelper.getRowColumnByIndex(step.squares, step.squareIndex);

            return '第 #' + move + ` 步 @ (${col}, ${row})`;
        }

        return '重新开始';
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

                debugger;
                this.setState({
                    autoPlaying: false
                });
            }
        });
    }
}