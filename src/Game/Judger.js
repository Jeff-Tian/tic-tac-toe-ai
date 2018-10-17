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

let latestFactors = null;

function checkSides(bitmap) {
    let danger = 0;
    let dead = 0;
    let win = 0;
    let chance = 0;
    let bad = 0;

    for (let i = 0; i < sides.length; i++) {
        let side = bitmap.filter((_, j) => sides[i].indexOf(j) >= 0);

        let negatives = side.filter(b => b === -1);
        let zeros = side.filter(b => b === 0);
        let ones = side.filter(b => b === 1);

        if (negatives.length === 2 && zeros.length === 1) {
            danger++;
        }

        if (negatives.length === 3) {
            dead++;
        }

        if (ones.length === 3) {
            win++;
        }

        if (ones.length === 2 && zeros.length === 1) {
            chance++;
        }

        if (negatives.length === 1 && zeros.length === 2) {
            bad++;
        }
    }

    return {danger: danger, lost: dead, chance: chance, win: win, bad: bad};
}

export default {
    getBoardScore: function (bitmap, weights, meFirst, nextIsMe) {
        function nameFactors(factors) {
            return {
                const: factors[0],
                danger: factors[1],
                occupyCenter: factors[2],
                bad: factors[3],
            };
        }

        let {danger, lost, chance, win, bad} = checkSides(bitmap);
        let factors = [
                1,
                danger,
                bitmap[4] === 1 ? 1 : -1,
                bad
            ]
        ;

        latestFactors = nameFactors(factors);
        if (lost) {
            return {
                factors: factors,
                namedFactors: latestFactors,
                total: -100
            }
        }

        if (win) {
            return {
                factors: factors,
                namedFactors: latestFactors,
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
            namedFactors: latestFactors,
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
    },

    getFactors() {
        return latestFactors;
    }
}
