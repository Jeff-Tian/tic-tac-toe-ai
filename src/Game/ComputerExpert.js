import Computer from "./Computer";

const weights = [0, 1, 1, 1, 1, 1, 1, 1, 1];

export default class ComputerExpert {
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

    static nextMove(squares, weights, meFirst) {
        let spots = Computer.getSpots(squares);
        let nextBoards = Computer.getNewBoardsBySpots(squares, spots);
        let scores = nextBoards.map(b => Computer.getBoardScore(b, weights, meFirst).total);
        let index = ComputerExpert.findIndexOfMax(scores);

        return {nextIndex: spots[index], score: scores[index]};
    }

    setWeightsUpdatedCallback(cb) {
        this.weightsUpdatedCallback = cb;
    }

    nextMove(squares) {
        this.tryLearn(squares);
        let {nextIndex, score} = ComputerExpert.nextMove(squares, this.weights, this.meFirst);

        return {nextIndex, score};
    }

    tryLearn(squares) {
        if (this.learningEnabled) {
            this.updateWeights(squares);
            this.lastBitmapSquares = squares;
        }
    }

    clean() {
        this.lastBitmapSquares = undefined;
    }

    getScoreAt(bitmap, i) {
        let newBitmap = bitmap.slice();
        newBitmap[i] = 1;

        return Computer.getBoardScore(newBitmap, this.weights, this.meFirst).total;
    }

    updateWeights(bitmapSquares) {
        if (this.lastBitmapSquares) {
            let currentScore = Computer.getBoardScore(bitmapSquares, this.weights, this.meFirst).total;
            let last = Computer.getBoardScore(this.lastBitmapSquares, this.weights, this.meFirst);
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