import Modes from "./Modes";
import ComputerExpert from "./ComputerExpert";

export default class PlayerX {
    static nextMove(squares, game) {
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
            game.handleClick(ComputerExpert.nextMove(bitmap));
        } else {
            console.log('ok');
        }
    }
}