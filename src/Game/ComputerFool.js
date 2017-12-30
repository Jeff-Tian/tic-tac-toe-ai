import Judger from "./Judger";

const weights = [0, 1, 1, 1, 1, 1, 1, 1, 1];

export class ComputerFool {
    constructor() {
        this.weights = weights;
    }

    static nextMove(squares, weights) {
        let spots = Judger.getSpots(squares);

        return spots[Math.round((spots.length - 1) * Math.random())];
    }

    nextMove(squares) {
        return ComputerFool.nextMove(squares, this.weights);
    }
}

export default new ComputerFool();