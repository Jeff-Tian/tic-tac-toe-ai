import ArrayHelper from "../Helpers/ArrayHelper";

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

let initialWeights = [0, 1, 1];
let namedStrategy = (factors) => {
    return {
        const: factors[0],
        danger: factors[1],
        occupyCenter: factors[2],
    };
}

export class StrategySettings {
    static setInitialWeights(iw) {
        initialWeights = iw;
    }

    static setNamedStrategy(func) {
        namedStrategy = func;
    }
}

export default class Strategy {
    static getInitialWeights() {
        return initialWeights;
    }

    static getNamedStrategy(factors) {
        return namedStrategy(factors);
    }

    static getBoardStatus(bitmap) {
        let {danger, lost, chance, win} = checkSides(bitmap);
        return {
            danger, lost, chance, win,
            factors: Object.keys(namedStrategy(Strategy.getInitialWeights())).map(key => {
                return {
                    const: 1,
                    danger: danger * 1.1,
                    occupyCenter: bitmap[4] === 1 ? 1 : 0,
                    intersectedBads: Strategy.getIntersectedBads(bitmap) / 2,
                    chance: chance,
                    numberOfBadsOfMyChance: Strategy.getNumberOfBadsOfMyChancePosition(bitmap)
                }[key];
            })
        };
    }

    static getIntersectedBads(bitmap) {
        let intersectedBads = 0;
        const bads = [];

        for (let i = 0; i < sides.length; i++) {
            let side = bitmap.filter((_, j) => sides[i].indexOf(j) >= 0);

            const [v1, v2, v3] = side;

            if ((v1 === -1 && v2 === 0 && v3 === 0) ||
                (v1 === 0 && v2 === -1 && v3 === 0) ||
                (v1 === 0 && v2 === 0 && v3 === -1) ||

                (v1 === -1 && v2 === -1 && v3 === 0) ||
                (v1 === -1 && v2 === 0 && v3 === -1) ||
                (v1 === 0 && v2 === -1 && v3 === -1)
            ) {
                bads.push(sides[i]);
            }
        }

        if (bads.length <= 1) {
            return 0;
        }

        for (let i = 0; i < bads.length - 1; i++) {
            for (let j = i + 1; j < bads.length; j++) {
                const bad1 = bads[i];
                const bad2 = bads[j];

                const intersects = ArrayHelper.intersects(bad1, bad2);

                if (intersects.length > 0 && (bitmap[intersects[0]] === 0 || bitmap[intersects[0]] === -1)) {
                    intersectedBads++;
                }
            }
        }

        return intersectedBads;
    }

    static getNumberOfBadsOfMyChancePosition(bitmap) {
        let sum = 0;

        for (let i = 0; i < sides.length; i++) {
            let sideValues = bitmap.filter((_, j) => sides[i].indexOf(j) >= 0);

            let zeros = sideValues.filter(b => b === 0);
            let ones = sideValues.filter(b => b === 1);

            if (ones.length === 2 && zeros.length === 1) {
                const theChance = sides[i].filter(index => bitmap[index] === 0)[0];

                if (theChance !== undefined) {
                    let sidesContainsTheChancePosition = sides.filter(s => s.indexOf(theChance) >= 0);

                    for (const s of sidesContainsTheChancePosition) {
                        let sValues = bitmap.filter((_, j) => s.indexOf(j) >= 0);

                        let n = sValues.filter(b => b === -1).length;
                        let p = sValues.filter(b => b === 1).length;

                        if (n > 0 && p === 0) {
                            sum++;
                        }
                    }
                }
            }
        }

        return sum;
    }
}
