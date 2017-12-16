import Computer from "./Computer";

const weights = [0, 1, 1, 1, 1, 1, 1, 1, 1];

class ComputerExpert {
    constructor() {
        this.weights = weights;
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

    static nextMove(squares, weights) {
        let spots = Computer.getSpots(squares);
        console.log(spots);
        let nextBoards = Computer.getNewBoardsBySpots(squares, spots);
        let scores = nextBoards.map(b => Computer.getBoardScore(b, weights));
        console.log(scores);
        let index = ComputerExpert.findIndexOfMax(scores);
        console.log('max score index = ', index);

        return spots[index];
    }

    nextMove(squares) {
        return ComputerExpert.nextMove(squares, this.weights);
    }
}

export default new ComputerExpert();