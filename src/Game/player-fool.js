import Modes from "./Modes";
import ComputerFool from "./ComputerFool";

export default class PlayerFool {
    constructor(me, enemy, meFirst) {
        this.me = me;
        this.enemy = enemy;
        this.meFirst = meFirst;
    }

    nextMove(squares, game) {
        console.log(squares);
        let bitmap = squares.map(s => {
            if (s === 'X') {
                return 1;
            }

            if (s === 'O') {
                return -1;
            }

            return 0;
        });

        if (game.state.currentMode === Modes.computerVsComputer) {
            game.handleClick(ComputerFool.nextMove(bitmap));
        } else {
            console.log('let human move');
        }
    }

    getWeights() {
        return [];
    }

    getLearningEnabled() {
        return false;
    }


    setWeightsUpdatedCallback() {
    }

    clean() {
    }
}