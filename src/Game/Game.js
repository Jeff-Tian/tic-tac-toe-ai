import React from 'react';
import Board from './Board';
import GameOptions from './Options';
import ArrayHelper from '../Helpers/ArrayHelper';
import GameModes from './Modes';
import PlayerX from "./player-x";
import PlayerO from './player-o';
import Stats from './Stats';

const initialState = {
    history: [{
        squares: Array(9).fill(null),
        squareIndex: null
    }],
    xIsNext: true,
    stepNumber: 0,
    currentMode: GameModes.humanVsHuman,
    autoStart: false,
    OWeights: Object.assign([], PlayerO.getWeights()),
    XWeights: Object.assign([], PlayerX.getWeights()),
    winnerInfo: null,
    round: 1,
    countDown: 0
};

export default class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = initialState;

        this.optionChanged = this.optionChanged.bind(this);
        this.changeCountdownNumber = this.changeCountdownNumber.bind(this);
        PlayerO.setWeightsUpdatedCallback(this.weightsUpdated.bind(this));
    }

    changeCountdownNumber(e) {
        this.setState({
            countDown: e.target.value
        })
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        if (this.calculateWinner(squares) || squares[i]) {
            return;
        }

        if (this.calculateFair(squares) || squares[i]) {
            return;
        }

        this.placeAt(squares, i, history);

        let self = this;
        console.log(self.state.xIsNext, self.state.currentMode);
        if (!self.state.xIsNext && self.state.currentMode !== GameModes.humanVsHuman) {
            PlayerO.nextMove(self.state.history[self.state.stepNumber].squares, self);
        }

        if (self.state.xIsNext && self.state.currentMode !== GameModes.humanVsHuman) {
            PlayerX.nextMove(self.state.history[self.state.stepNumber].squares, self);
        }
    }

    placeAt(squares, i, history) {
        if (squares[i]) {
            console.log("you can not place here!");
            return;
        }

        console.log('xIsNext = ', this.state.xIsNext);
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
                squareIndex: i
            }]),
            xIsNext: !this.state.xIsNext,
            stepNumber: history.length,
        });

        console.log('xIsNext = ', this.state.xIsNext);
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
            winnerInfo: step === 0 ? null : this.state.winnerInfo
        });

        setTimeout(() => {
            this.autoStart(this.state.currentMode, this.state.autoStart);
        })
    }

    optionChanged(selectedMode, autoStart) {
        this.setState({
            currentMode: selectedMode,
            autoStart: autoStart
        });
        this.autoStart(selectedMode, autoStart);
    }

    autoStart(selectedMode, autoStart) {
        if (selectedMode === GameModes.computerVsComputer && autoStart && this.state.stepNumber === 0) {
            let self = this;
            setTimeout(() => {
                PlayerX.nextMove(self.state.history[self.state.stepNumber].squares, self);
            })
        }
    }

    learn() {
        this.setState({countDown: this.state.countDown - 1, currentMode: GameModes.computerVsComputer, autoStart: true})
        this.jumpTo(0);
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
        Stats.updateRoundResult(winnerInfo ? winnerInfo.who : null);
        this.setState(
            {
                winnerInfo: winnerInfo,
                round: this.state.round + 1
            }
        );

        if (this.state.countDown > 0) {
            this.setState({
                countDown: this.state.countDown - 1
            });

            setTimeout(() => {
                this.jumpTo(0);
            }, 500);
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
                </li>
            );
        });


        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : (this.state.currentMode === GameModes.humanVsHuman ? 'O' : 'Computer'));
        }

        return (
            <div className="container">
                <div>
                    <h2>Round {this.state.round}</h2>
                    <p>Weights of Player X: {this.state.XWeights.map(w => w.toFixed(2)).join(', ')}</p>
                    <p>Weights of Player O: {this.state.OWeights.map(w => w.toFixed(2)).join(', ')}</p>
                </div>
                <div className="game">
                    <div className="game-options">
                        <GameOptions readonly={this.state.stepNumber}
                                     optionChanged={this.optionChanged} autoStart={this.state.autoStart}
                                     mode={this.state.currentMode}></GameOptions>
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
                        Auto play <input type="number" onChange={this.changeCountdownNumber}
                                         value={this.state.countDown}></input> rounds
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <button onClick={() => this.learn()}>Start</button>
                    </p>
                </div>
                <Stats></Stats>
            </div>
        );
    }

    getMoveDescription(move, step) {
        if (move) {
            let {col, row} = ArrayHelper.getPositionByIndex(step.squares, step.squareIndex);

            return 'Go to move #' + move + ` @ (${col}, ${row})`;
        }

        return 'Go to game start';
    }
}