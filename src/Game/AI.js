import Judger from "./Judger";
import ArrayHelper from "../Helpers/ArrayHelper";

let latestFactors = null;
let lastSquares = null;
export default class AI {
    constructor(meFirst) {
        this.weights = Object.assign([], [0, 1, 1, 1]);
        this.learningEnabled = true;
        this.meFirst = meFirst;
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

    nextMove(currentSquares, nextIsMe) {
        this.tryLearn(currentSquares);
        let next = AI.nextMove(currentSquares, this.weights, this.meFirst, nextIsMe);
        return next;
    }

    tryLearn(currentSquares) {
        if (this.learningEnabled) {
            this.learn(lastSquares, currentSquares);
        }
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
        console.log('I thought it was ', estimatedLastScore, lastSquares, this.weights);
        let actualScore = Judger.getBoardScore(currentSquares, this.weights, false, true);
        console.log('but turned out to be ', actualScore, currentSquares, this.weights);
        let diff = actualScore.total - estimatedLastScore.total;

        for (let i = 0; i < estimatedLastScore.factors.length; i++) {
            this.weights[i] = this.weights[i] + 0.1 * diff * estimatedLastScore.factors[i];
        }

        this.weightsUpdatedCallback(this.weights);
    }
}
