import SimpleComputer from "./SimpleComputer";
import ArrayHelper from "../Helpers/ArrayHelper";

const weights = [0, 1, 1];

export default class AI {
    constructor(meFirst) {
        this.weights = Object.assign([], weights);
        this.learningEnabled = true;
        this.meFirst = meFirst;
        this.setWeightsUpdatedCallback(function () {
        });
    }

    static nextMove(squares, weights, meFirst, nextIsMe) {
        let spots = SimpleComputer.getSpots(squares);
        let nextBoards = SimpleComputer.getNewBoardsBySpots(squares, spots);
        let scores = nextBoards.map(b => SimpleComputer.getBoardScore(b, weights, meFirst, nextIsMe).total);
        let index = ArrayHelper.findIndexOfMax(scores);

        return {nextIndex: spots[index], score: scores[index]};
    }

    setWeightsUpdatedCallback(cb) {
        this.weightsUpdatedCallback = cb;
    }

    nextMove(squares, nextIsMe) {
        this.tryLearn(squares, nextIsMe);
        let {nextIndex, score} = AI.nextMove(squares, this.weights, this.meFirst, nextIsMe);

        return {nextIndex, score};
    }

    tryLearn(squares, nextIsMe) {
        if (this.learningEnabled) {
            this.learn(this.lastBitmapSquares, squares);
            this.lastBitmapSquares = squares;
        }
    }

    clean() {
        this.lastBitmapSquares = undefined;
    }

    getScoreAt(bitmap, i, nextIsMe) {
        let newBitmap = bitmap.slice();
        newBitmap[i] = 1;

        return SimpleComputer.getBoardScore(newBitmap, this.weights, this.meFirst, nextIsMe).total;
    }

    getWeights() {
        return this.weights;
    }

    setWeights(weights) {
        this.weights = weights;
    }

    learn(lastSquares, currentSquares) {
        if (!lastSquares) {
            return;
        }

        let estimatedLastScore = SimpleComputer.getBoardScore(lastSquares, this.weights, false, true);
        console.log('I thought it was ', estimatedLastScore);
        let actualScore = SimpleComputer.getBoardScore(currentSquares, this.weights, false, true);
        console.log('but turned out to be ', actualScore);
        let diff = actualScore.total - estimatedLastScore.total;

        for (let i = 0; i < estimatedLastScore.factors.length; i++) {
            this.weights[i] = this.weights[i] + 0.1 * diff * estimatedLastScore.factors[i];
        }

        this.weightsUpdatedCallback(this.weights);
    }
}