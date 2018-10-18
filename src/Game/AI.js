import Judger from "./Judger";
import ArrayHelper from "../Helpers/ArrayHelper";

export default class AI {
    constructor(meFirst) {
        this.weights = Object.assign([], [0, 1, 1, 1, 1]);
        this.learningEnabled = true;
        this.meFirst = meFirst;
        this.setWeightsUpdatedCallback(function () {
        });
    }

    static nextMove(squares, weights, meFirst, nextIsMe) {
        let spots = Judger.getSpots(squares);
        let nextBoards = Judger.generateNewBoardsBySpots(squares, spots);
        let scores = nextBoards.map(b => Judger.getBoardScore(b, weights, meFirst, nextIsMe).total);
        let index = ArrayHelper.findIndexOfMax(scores);

        return spots[index];
    }

    setWeightsUpdatedCallback(cb) {
        this.weightsUpdatedCallback = cb;
    }

    nextMove(squares, nextIsMe) {
        this.tryLearn(squares);
        return AI.nextMove(squares, this.weights, this.meFirst, nextIsMe);
    }

    tryLearn(squares) {
        if (this.learningEnabled) {
            this.learn(this.lastBitmapSquares, squares);
            this.lastBitmapSquares = squares;
        }
    }

    clean() {
        this.lastBitmapSquares = undefined;
    }

    getWeights() {
        return this.weights;
    }

    getFactors() {
        return Judger.getFactors();
    }

    setWeights(weights) {
        this.weights = weights;
    }

    learn(lastSquares, currentSquares) {
        if (!lastSquares) {
            return;
        }

        let estimatedLastScore = Judger.getBoardScore(lastSquares, this.weights, false, true);
        console.log('I thought it was ', estimatedLastScore);
        let actualScore = Judger.getBoardScore(currentSquares, this.weights, false, true);
        console.log('but turned out to be ', actualScore);
        let diff = actualScore.total - estimatedLastScore.total;

        for (let i = 0; i < estimatedLastScore.factors.length; i++) {
            this.weights[i] = this.weights[i] + 0.1 * diff * estimatedLastScore.factors[i];
        }

        this.weightsUpdatedCallback(this.weights);
    }
}
