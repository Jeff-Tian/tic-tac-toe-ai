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

    static nextMove(squares, weights, nextIsMe) {
        let spots = Judger.getSpots(squares);
        console.log('sopts = ', spots);
        let nextBoards = Judger.generateNewBoardsBySpots(squares, spots);
        let scores = nextBoards.map(b => Judger.getBoardScore(b, weights).total);
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

        let estimatedLastScore = Judger.getBoardScore(lastSquares, this.weights);
        let actualScore = Judger.getBoardScore(currentSquares, this.weights);
        let diff = actualScore.total - estimatedLastScore.total;

        for (let i = 0; i < estimatedLastScore.factors.length; i++) {
            this.weights[i] = this.weights[i] + 0.1 * diff * estimatedLastScore.factors[i];
        }

        this.weightsUpdatedCallback(this.weights);
    }
}
