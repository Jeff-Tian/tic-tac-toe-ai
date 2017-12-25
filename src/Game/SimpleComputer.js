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

function checkSides(bitmap) {
    let d = 0;
    let l = 0;

    for (let i = 0; i < sides.length; i++) {
        let side = bitmap.filter((_, j) => sides[i].indexOf(j) >= 0);

        let negatives = side.filter(b => b === -1);
        let zeros = side.filter(b => b === 0);
        let ones = side.filter(b => b === 1);

        if (negatives.length === 2 && zeros.length === 1) {
            d++;
        }

        if (negatives.length === 3) {
            l++;
        }
    }

    return {danger: d, lost: l};
}

export default {
    getBoardScore: function (squares, weights, meFirst) {
        let {danger, lost} = checkSides(squares);
        let factors = [
            1,
            danger
        ];

        if (lost) {
            return {
                factors: [1, 0],
                total: -100
            }
        }

        return {
            factors: factors,
            total: factors.map((s, i) => s * weights[i]).reduce((prev, next) => prev + next, 0)
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