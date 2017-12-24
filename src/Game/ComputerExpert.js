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

        return {board: squares, nextIndex: spots[index]};
    }

    setWeightsUpdatedCallback(cb) {
        this.weightsUpdatedCallback = cb;
    }

    nextMove(squares) {
        let {board, nextIndex} = ComputerExpert.nextMove(squares, this.weights, this.meFirst);

        if (this.learningEnabled) {
            this.updateWeights(board);
            this.lastBitmapSquares = squares;
        }

        return nextIndex;
    }

    updateWeights(bitmapSquares) {
        if (this.lastBitmapSquares) {
            let currentScore = Computer.getBoardScore(bitmapSquares, this.weights, this.meFirst).total;
            let last = Computer.getBoardScore(this.lastBitmapSquares, this.weights, this.meFirst);
            let lastSideScores = last.sideScores;
            let lastScore = last.total;

            for (let i = 0; i < this.weights.length; i++) {
                this.weights[i] = this.weights[i] + 0.1 * (currentScore - lastScore) * lastSideScores[i];
            }
        }

        this.weightsUpdatedCallback(this.weights);
    }

    getWeights() {
        return this.weights;
    }
}