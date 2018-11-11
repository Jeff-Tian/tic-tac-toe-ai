import Judger from "./Judger";
import ArrayHelper from "../Helpers/ArrayHelper";
import Strategy from "./Strategy";

let latestFactors = null;
let lastSquares = null;
export default class AI {
    constructor() {
        this.weights = Object.assign([], Strategy.getInitialWeights());
        this.setWeightsUpdatedCallback(function () {
        });
    }

    static nextMove(squares, weights, meFirst, nextIsMe) {
        let spots = Judger.getSpots(squares);
        console.log('sopts = ', spots);
        let nextBoards = Judger.generateNewBoardsBySpots(squares, spots);
        let perf = nextBoards.map(b => Judger.getBoardScore(b, weights, meFirst, nextIsMe));
        console.log('perf = ', perf);
        let scores = perf.map(p => p.total);
        let index = ArrayHelper.findIndexOfMax(scores);
        latestFactors = perf[index].namedFactors;
        lastSquares = nextBoards[index];
        console.log('latest= ', latestFactors, lastSquares);
        console.log('weights = ', weights);
        console.log('factors = ', perf[index].factors);
        console.log('score = ', perf[index].total);

        return spots[index];
    }

    setWeightsUpdatedCallback(cb) {
        this.weightsUpdatedCallback = cb;
    }

    nextMove(squares, nextIsMe) {
        this.tryLearn(squares);
        return AI.nextMove(squares, this.weights, false, nextIsMe);
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

        let estimatedLastScore = Judger.getBoardScore(lastSquares, this.weights, false, true);
        let actualScore = Judger.getBoardScore(currentSquares, this.weights, false, true);
        let diff = actualScore.total - estimatedLastScore.total;

        for (let i = 0; i < estimatedLastScore.factors.length; i++) {
            this.weights[i] = this.weights[i] + 0.1 * diff * estimatedLastScore.factors[i];
        }

        this.weightsUpdatedCallback(this.weights);
    }
}
