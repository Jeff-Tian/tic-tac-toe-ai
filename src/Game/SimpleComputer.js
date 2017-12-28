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
    let dead = 0;
    let w = 0;
    let c = 0;

    for (let i = 0; i < sides.length; i++) {
        let side = bitmap.filter((_, j) => sides[i].indexOf(j) >= 0);

        let negatives = side.filter(b => b === -1);
        let zeros = side.filter(b => b === 0);
        let ones = side.filter(b => b === 1);

        if (negatives.length === 2 && zeros.length === 1) {
            d++;
        }

        if (negatives.length === 3) {
            dead++;
        }

        if (ones.length === 3) {
            w++;
        }

        if (ones.length === 2 && zeros.length === 1) {
            c++;
        }
    }

    return {danger: d, lost: dead, chance: c, win: w};
}

export default {
    getBoardScore: function (bitmap, weights, meFirst, nextIsMe) {
        let {danger, lost, chance, win} = checkSides(bitmap);
        let factors = [
                1,
                danger,
                // chance,
                // meFirst ? 1 : -1,
                // nextIsMe ? chance : 0,
                bitmap[4] === 1 ? 1 : -1
            ]
        ;

        if (lost) {
            return {
                factors: factors,
                total: -100
            }
        }

        if (win) {
            return {
                factors: factors,
                total: 100
            }
        }

        let base = 0;
        if (nextIsMe) {
            base += chance;
        }

        let score = factors.map((s, i) => s * weights[i]).reduce((prev, next) => prev + next, base);
        if (score >= 100) {
            score = 99;
        }

        if (score < -100) {
            score = -99;
        }

        return {
            factors: factors,
            total: score
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