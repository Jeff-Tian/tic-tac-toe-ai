const scoreMap = {
    100: [
        [
            [1, 1, 1],
            [0, 0, 0],
            [0, 0, 0]
        ],
        [
            [1, 0, 0],
            [0, 1, 0],
            [0, 0, 1]
        ],
        [
            [1, 0, 0],
            [1, 0, 0],
            [1, 0, 0]
        ],
        [
            [0, 1, 0],
            [0, 1, 0],
            [0, 1, 0]
        ],
        [
            [0, 0, 1],
            [0, 1, 0],
            [1, 0, 0]
        ],
        [
            [0, 0, 1],
            [0, 0, 1],
            [0, 0, 1]
        ],
        [
            [0, 0, 0],
            [1, 1, 1],
            [0, 0, 0]
        ],
        [
            [0, 0, 0],
            [0, 0, 0],
            [1, 1, 1]
        ]
    ],

};


export default {
    findNextAvailableSquare(squares) {
        for (let i = 0; i < squares.length; i++) {
            if (!squares[i]) {
                return i;
            }
        }

        return null;
    },

    getBoardScore(squares) {
        return 0;
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
    }
}