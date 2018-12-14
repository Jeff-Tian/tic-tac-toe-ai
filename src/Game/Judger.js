import Strategy from "./Strategy";

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

const sides = [
    boardSides.top,
    boardSides.center,
    boardSides.bottom,
    boardSides.left,
    boardSides.middle,
    boardSides.right,
    boardSides.slash,
    boardSides.antiSlash
];
export default {
    getBoardScore: function (bitmap, weights) {
        weights = weights || Strategy.getInitialWeights();

        let {lost, win, factors} = Strategy.getBoardStatus(bitmap);

        if (lost) {
            return {
                factors: factors,
                namedFactors: Strategy.getNamedStrategy(factors),
                total: -Math.PI / 2
            }
        }

        if (win) {
            return {
                factors: factors,
                namedFactors: Strategy.getNamedStrategy(factors),
                total: Math.PI / 2
            }
        }

        let score = Math.atan(factors.map((s, i) => s * weights[i]).reduce((prev, next) => prev + next, 0));

        return {
            factors: factors,
            namedFactors: Strategy.getNamedStrategy(factors),
            total: score
        };
    },

    getSpots(bitmapSquares) {
        return bitmapSquares.map((s, i) => {
            if (s === 0) {
                return i;
            }

            return NaN;
        }).filter(s => !isNaN(s));
    },

    generateNewBoardsBySpots(currentBoard, spots) {
        spots = spots || this.getSpots(currentBoard);

        return spots.map(i => {
            let newSquares = currentBoard.slice();
            newSquares[i] = 1;

            return newSquares;
        });
    },

    gameProgress(bitmapSquares) {
        let emptySpots = bitmapSquares.filter(b => b === 0);

        if (emptySpots.length === bitmapSquares.length) {
            return {
                win: false,
                lost: false,
                fair: false
            }
        }

        for (let i = 0; i < sides.length; i++) {
            let side = bitmapSquares.filter((_, j) => sides[i].indexOf(j) >= 0);

            let ones = side.filter(b => b === 1);
            let negatives = side.filter(b => b === -1);

            if (ones.length === 3) {
                return {
                    win: sides[i],
                    lost: false,
                    fair: false
                };
            }

            if (negatives.length === 3) {
                return {
                    win: false,
                    lost: sides[i],
                    fair: false
                };
            }
        }

        return {
            win: false,
            lost: false,
            fair: emptySpots.length === 0
        }
    },

    gameEnds(progress) {
        return progress.fair || progress.win || progress.lost;
    }
}
