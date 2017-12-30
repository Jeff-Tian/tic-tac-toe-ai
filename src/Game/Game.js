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

    click(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        this.placeAt(squares, i, history);
    }

    handleClick(i, score) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        if (this.calculateWinner(squares) || squares[i]) {
            return;
        }

        if (this.calculateFair(squares) || squares[i]) {
            return;
        }

        this.placeAt(squares, i, history, score);

        let self = this;
        setTimeout(() => {
            self.calculateWinner(self.state.history[self.state.stepNumber].squares);
            self.calculateFair(self.state.history[self.state.stepNumber].squares);

            if (!self.state.winnerInfo) {
                if (!self.state.xIsNext && self.state.currentMode !== GameModes.humanVsHuman) {
                    PlayerO.nextMove(self.state.history[self.state.stepNumber].squares, self);
                    return;
                }

                if (self.state.xIsNext && (self.state.currentMode === GameModes.computerVsComputer)) {
                    PlayerX.nextMove(self.state.history[self.state.stepNumber].squares, self);
                    return;
                }
            }
        }, 10)

    }

    placeAt(squares, i, history, score) {
        if (squares[i]) {
            console.log("you can not place here!");
            return;
        }

        squares[i] = this.state.xIsNext ? 'X' : 'O';
        console.log(squares);
        this.setState({
            history: history.concat([{
                squares: squares,
                squareIndex: i,
                score: score
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
            winnerInfo: step === 0 ? null : this.state.winnerInfo
        });

        let self = this;
        setTimeout(() => {
            console.log('state = ', self.state.currentMode, self.state.autoStart);
            self.autoStart(self.state.currentMode, self.state.autoStart);
        })
    }

    optionChanged(selectedMode, autoStart) {
        console.log('received: ', selectedMode, autoStart);

        this.setState({
            currentMode: selectedMode,
            autoStart: autoStart
        });

        let self = this;
        setTimeout(() => {
            self.autoStart(selectedMode, autoStart);
        });
    }

    autoStart(selectedMode, autoStart) {
        if (selectedMode === GameModes.computerVsComputer && autoStart && this.state.stepNumber === 0) {
            this.setState({endsAt: undefined});
            let self = this;
            setTimeout(() => {
                PlayerX.nextMove(self.state.history[self.state.stepNumber].squares, self);
            })
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
        console.log('updated ', newWeights);
        this.setState({
            OWeights: Object.assign([], PlayerO.getWeights()),
            XWeights: Object.assign([], PlayerX.getWeights())
        });
    }

    calculateWinner(squares) {
        if (this.state.winnerInfo) {
            return this.state.winnerInfo;
        }

        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                this.gameEnds({who: squares[a], where: [a, b, c]});
                return this.state.winnerInfo;
            }
        }

        // this.setState({round: this.state.round + 1})
        return null;
    }

    gameEnds(winnerInfo) {
        if (this.state.endsAt === this.state.stepNumber) {
            return;
        }
        console.log('ends at ', this.state.stepNumber, this.state.endsAt)
        PlayerO.tryLearn(this.state.history[this.state.stepNumber].squares);
        PlayerX.clean();
        PlayerO.clean();
        Stats.updateRoundResult(winnerInfo ? winnerInfo.who : null);
        this.setState(
            {
                winnerInfo: winnerInfo,
                round: this.state.round + 1,
                endsAt: this.state.stepNumber
            }
        );

        if (this.state.countDown > 0) {
            this.setState({
                countDown: this.state.countDown - 1
            });

            setTimeout(() => {
                this.jumpTo(0);
            }, 10);
        }
    }

    calculateFair(squares) {
        for (let i = 0; i < squares.length; i++) {
            if (!squares[i]) {
                return false;
            }
        }

        console.log('fair !');
        this.gameEnds(null);

        return true;
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
                    {/*<p>*/}
                    {/*Weights of Player X: {this.state.XWeights.map(w => w.toFixed(2)).join(', ')}*/}
                    {/*<input type="checkbox" checked={this.state.xLearningEnabled ? 'checked' : ''}*/}
                    {/*id="enable-x-learning"*/}
                    {/*onChange={() => this.toggleXLearning()}/>*/}
                    {/*<label htmlFor="enable-x-learning">Enable learning</label>*/}
                    {/*</p>*/}
                    {/*<p>*/}
                    {/*Weights of Player O: {this.state.OWeights.map(w => w.toFixed(2)).join(', ')}*/}
                    {/*<input type="checkbox" checked={this.state.oLearningEnabled ? 'checked' : ''}*/}
                    {/*id="enable-learning"*/}
                    {/*onChange={() => this.toggleOLearning()}/>*/}
                    {/*<label htmlFor="enable-learning">Enable learning</label>*/}
                    {/*</p>*/}
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

    move(squares) {
        if (this.state.xIsNext) {
            return PlayerX.nextMove(squares, this);
        }

        return PlayerO.nextMove(squares, this);
    }

    autoPlay() {
        this.state.currentMode = GameModes.humanVsHuman;
        let squares = this.state.history[this.state.history.length - 1].squares;

        while (!Judger.gameEnds(PlayerO.convertSquaresToBitmap(squares))) {
            this.move(squares);
            break;

            squares = this.state.history[this.state.history.length - 1].squares;
        }
    }
}