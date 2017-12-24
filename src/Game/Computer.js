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
    getSideScore: function (squares, direction, meFirst) {
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

        let enemyScore = enemy.reduce((prev, next) => prev + next, 0);
        if (meFirst) {
            return enemyScore;
        } else {
            if (enemyScore <= -2) {
                return enemyScore - 0.5;
            }

            return enemyScore;
        }
    },

    getComponentSideScore: function (squares, direction) {
        return -this.getSideScore(squares, direction);
    },

    getBoardScore: function (squares, weights, meFirst) {
        let sideScores = [
            1,
            this.getSideScore(squares, boardSides.top, meFirst),
            this.getSideScore(squares, boardSides.left, meFirst),
            this.getSideScore(squares, boardSides.right, meFirst),
            this.getSideScore(squares, boardSides.bottom, meFirst),
            this.getSideScore(squares, boardSides.center, meFirst),
            this.getSideScore(squares, boardSides.middle, meFirst),
            this.getSideScore(squares, boardSides.slash, meFirst),
            this.getSideScore(squares, boardSides.antiSlash, meFirst)
        ];

        return {
            sideScores: sideScores,
            total: sideScores.map((s, i) => s * weights[i]).reduce((prev, next) => prev + next, 0)
        };
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