import Computer from "./Computer";

const weights = [0, 1, 1, 1, 1, 1, 1, 1, 1];

export class ComputerFool {
    constructor() {
        this.weights = weights;
    }

    static nextMove(squares, weights) {
        let spots = Computer.getSpots(squares);

        return spots[Math.round(spots.length * Math.random())];
    }

    nextMove(squares) {
        return ComputerFool.nextMove(squares, this.weights);
    }
}

export default new ComputerFool();