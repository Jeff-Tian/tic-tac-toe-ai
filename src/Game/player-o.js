import ComputerExpert from "./ComputerExpert";

export default class PlayerO {
    static nextMove(squares, game) {
        console.log(squares, '--> player o');
        let bitmap = squares.map(s => {
            if (s === 'X') {
                return -1;
            }

            if (s === 'O') {
                return 1;
            }

            return 0;
        });

        game.handleClick(ComputerExpert.nextMove(bitmap));
    }

    static getWeights() {
        return ComputerExpert.getWeights();
    }

    static setWeightsUpdatedCallback(cb) {
        ComputerExpert.setWeightsUpdatedCallback(cb);
    }
}