import SimpleComputer from "./SimpleComputer";

const weights = [0, 1];

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

    static nextMove(squares, weights, meFirst) {
        let spots = SimpleComputer.getSpots(squares);
        let nextBoards = SimpleComputer.getNewBoardsBySpots(squares, spots);
        let scores = nextBoards.map(b => SimpleComputer.getBoardScore(b, weights, meFirst).total);
        let index = AI.findIndexOfMax(scores);

        return {nextIndex: spots[index], score: scores[index]};
    }

    setWeightsUpdatedCallback(cb) {
        this.weightsUpdatedCallback = cb;
    }

    nextMove(squares) {
        this.tryLearn(squares);
        let {nextIndex, score} = AI.nextMove(squares, this.weights, this.meFirst);

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

    updateWeights(bitmapSquares) {
        if (this.lastBitmapSquares) {
            let currentScore = SimpleComputer.getBoardScore(bitmapSquares, this.weights, this.meFirst).total;
            let last = SimpleComputer.getBoardScore(this.lastBitmapSquares, this.weights, this.meFirst);
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