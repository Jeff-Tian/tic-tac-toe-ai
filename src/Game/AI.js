import Judger from "./Judger";
import ArrayHelper from "../Helpers/ArrayHelper";
import Strategy from "./Strategy";
import {GlobalSettings, spotScoreMap} from "./globals";

let latestFactors = null;
let lastSquares = null;
export default class AI {
    constructor() {
        this.weights = Object.assign([], Strategy.getInitialWeights());
        this.setWeightsUpdatedCallback(function () {
        });
    }

    static nextMove(squares, weights, nextIsMe) {
        spotScoreMap.clear();
        let spots = Judger.getSpots(squares);
        let nextBoards = Judger.generateNewBoardsBySpots(squares, spots);
        let scores = nextBoards.map(b => Judger.getBoardScore(b, weights).total);

        for (let i = 0; i < spots.length; i++) {
            const spot = spots[i];
            const score = scores[i];

            spotScoreMap.set(spot, {
                weights: weights,
                strategy: Strategy.getBoardStatus(squares).factors,
                score: score
            });
        }

        let index = ArrayHelper.findIndexOfMax(scores);
        latestFactors = scores[index].namedFactors;
        lastSquares = nextBoards[index];

        return spots[index];
    }

    setWeightsUpdatedCallback(cb) {
        this.weightsUpdatedCallback = cb;
    }

    nextMove(squares, nextIsMe) {
        this.tryLearn(squares);
        return AI.nextMove(squares, this.weights, nextIsMe);
    }

    tryLearn(squares) {
        this.learn(this.lastBitmapSquares, squares);
        this.lastBitmapSquares = squares;
    }

    clean() {
        lastSquares = null;
        latestFactors = null;
    }

    getWeights() {
        return this.weights;
    }

    getFactors() {
        return latestFactors;
    }

    setWeights(weights) {
        this.weights = weights;
    }

    learn(lastSquares, currentSquares) {
        if (!lastSquares) {
            return;
        }

        if (!GlobalSettings.learn) {
            return;
        }

        let estimatedLastScore = Judger.getBoardScore(lastSquares, this.weights);
        let actualScore = Judger.getBoardScore(currentSquares, this.weights);
        let diff = actualScore.total - estimatedLastScore.total;

        for (let i = 0; i < estimatedLastScore.factors.length; i++) {
            this.weights[i] = this.weights[i] + 0.1 * diff * estimatedLastScore.factors[i];
        }

        this.weightsUpdatedCallback(this.weights);
    }
}
