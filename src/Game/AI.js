import SimpleComputer from "./SimpleComputer";

const weights = [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

export default class AI {
    constructor(meFirst) {
        this.weights = Object.assign([], weights);
        this.learningEnabled = true;
        this.meFirst = meFirst;
    }

    static findIndexOfMax(array) {
        let index = 0;
        let max = array[0];

        for (let i = 1; i < array.length; i++) {
            if (array[i] > max) {
                max = array[i];
                index = i;
            }
        }

        return index;
    }

    static nextMove(squares, weights, meFirst, nextIsMe) {
        let spots = SimpleComputer.getSpots(squares);
        let nextBoards = SimpleComputer.getNewBoardsBySpots(squares, spots);
        let scores = nextBoards.map(b => SimpleComputer.getBoardScore(b, weights, meFirst, nextIsMe).total);
        let index = AI.findIndexOfMax(scores);

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
            this.updateWeights(squares, nextIsMe);
            this.lastBitmapSquares = squares;
            this.lastNextIsMe = nextIsMe;
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

    updateWeights(bitmapSquares, nextIsMe) {
        if (this.lastBitmapSquares) {
            let currentScore = SimpleComputer.getBoardScore(bitmapSquares, this.weights, this.meFirst, nextIsMe).total;
            let last = SimpleComputer.getBoardScore(this.lastBitmapSquares, this.weights, this.meFirst, this.lastNextIsMe);
            let lastFactors = last.factors;
            let lastScore = last.total;

            console.log(`I thought it was ${lastScore}, but turned out to be ${currentScore}`)
            for (let i = 0; i < last.factors.length; i++) {
                this.weights[i] = this.weights[i] + 0.1 * (currentScore - lastScore) * lastFactors[i];
            }

            this.weightsUpdatedCallback(this.weights);
        }
    }

    getWeights() {
        return this.weights;
    }
}