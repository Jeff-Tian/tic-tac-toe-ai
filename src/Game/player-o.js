import ComputerExpert from "./ComputerExpert";

export default class PlayerX {
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

        game.handleUserClick(ComputerExpert.nextMove(bitmap));
    }
}