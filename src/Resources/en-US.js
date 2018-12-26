import ArrayHelper from "../Helpers/ArrayHelper";

export const header = 'AI version of tic-tac-toe';
export const subHeader = 'Alpha Go of tic-tac-toe';
export const winner = 'Winner is: ';
export const weightsOf = '\'s Weights: ';
export const autoPlay = 'Auto play ';
export const round = 'round';
export const startLearning = 'Start learning';
export const sourceCode = 'Source code: ';
export const autoStart = 'Auto start (computer-vs-computer mode only)';

export const humanVsComputer = 'Human vs Computer';
export const computerVsComputer = 'Computer vs Computer';

export const stats = 'Statistics:';
export const wins = 'Wins';
export const fair = 'Draw';
export const total = 'Total';
export const showAdvancedSettings = 'Show Advanced Settings'

export const siteName = 'AI tic tac toe';
export const chooseLanguage = 'Choose language';

export function getRound(round) {
    if (round === 1) {
        return `${round}st Round`;
    }

    if (round === 2) {
        return `${round}nd Round`;
    }

    if (round === 3) {
        return `${round}rd Round`;
    }

    return `${round}th Round`;
}


export function getNextPlayer(xIsNext, step) {
    if (step <= 0) {
        return 'Your turn.'
    }
    return 'It\'s ' + (xIsNext ? 'X' : 'Computer O') + '\'s turn.';
}

export function getMove(move, squares, squareIndex) {
    if (move) {
        let {col, row} = ArrayHelper.getRowColumnByIndex(squares, squareIndex);

        return '#' + move + ` step @ (${col}, ${row})`;
    }

    return 'Restart';
}

export default class EnUS {
    static siteName = siteName
}
