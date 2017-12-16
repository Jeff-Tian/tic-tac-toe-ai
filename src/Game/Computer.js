import Modes from "./Modes";
import ComputerExpert from "./ComputerExpert";

const boardSides = {
    top: [0, 1, 2],
    left: [0, 3, 6],
    right: [2, 5, 8],
    bottom: [6, 7, 8],
    center: [3, 4, 5],
    middle: [1, 4, 7],
    slash: [2, 4, 6],
    antiSlash: [0, 4, 8]
};
export default {
    nextMove(squares, mode) {
        let board = squares.map(s => {
            if (s === 'X') {
                return -1;
            }

            if (s === 'O') {
                return 1;
            }

            return 0;
        });

        if (mode === Modes.humanVsExpertComputer || mode === Modes.computerVsComputer) {
            return ComputerExpert.nextMove(board);
        }
    },

    getSideScore: function (squares, direction) {
        let line = squares.filter((s, index) =>
            direction.indexOf(index) >= 0
        );

        let myself = line.filter(s => s > 0);
        let enemy = line.filter(s => s < 0);

        if (myself.length > 0 && enemy.length > 0) {
            return 0;
        }

        let myScore = myself.reduce((prev, next) => prev + next, 0);

        if (myScore > 0) {
            return myScore;
        }

        return enemy.reduce((prev, next) => prev + next, 0);
    },

    getComponentSideScore: function (squares, direction) {
        return -this.getSideScore(squares, direction);
    },

    getBoardScore: function (squares, weights) {
        let sideScores = [
            1,
            this.getSideScore(squares, boardSides.top),
            this.getSideScore(squares, boardSides.left),
            this.getSideScore(squares, boardSides.right),
            this.getSideScore(squares, boardSides.bottom),
            this.getSideScore(squares, boardSides.center),
            this.getSideScore(squares, boardSides.middle),
            this.getSideScore(squares, boardSides.slash),
            this.getSideScore(squares, boardSides.antiSlash)
        ];

        return sideScores.map((s, i) => s * weights[i]).reduce((prev, next) => prev + next, 0);
    },

    getSpots(sqaures) {
        return sqaures.map((s, i) => {
            if (s === 0) {
                return i;
            }

            return NaN;
        }).filter(s => !isNaN(s));
    },

    getNewBoardsBySpots(initialSquares, spots) {
        return spots.map(i => {
            let newSquares = initialSquares.slice();
            newSquares[i] = 1;

            return newSquares;
        });
    }
}