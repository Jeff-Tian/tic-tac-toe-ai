import ArrayHelper from "../Helpers/ArrayHelper";

export const header = '人工智能版三子棋';
export const subHeader = '三子棋里的阿尔法狗';
export const winner = '胜利者：';
export const weightsOf = ' 的权重：';
export const autoPlay = '自动学习';
export const round = '回合';
export const startLearning = '开始学习';
export const sourceCode = '源代码：';
export const autoStart = '自动运行（机-机对战模式）';

export const humanVsComputer = '人-机对战';
export const computerVsComputer = '机-机对战';

export const stats = '统计:';
export const wins = '胜出';
export const fair = '平局';
export const total = '总计';

export const showAdvancedSettings = '显示高级设置'

export function getRound(round) {
    return `第 ${round} 回合`;
}

export function getNextPlayer(xIsNext, step) {
    if (step <= 0) {
        return '你（X）先走'
    }
    return '轮到：' + (xIsNext ? '你（X）' : '电脑（O）') + ' 了';
}

export function getMove(move, squares, squareIndex) {
    if (move) {
        let {col, row} = ArrayHelper.getRowColumnByIndex(squares, squareIndex);

        return '第 #' + move + ` 步 @ (${col}, ${row})`;
    }

    return '重新开始';
}
