import AI from "./AI";

export default class PlayerExpert {
    constructor(me, enemy, meFirst) {
        this.me = me;
        this.enemy = enemy;
        this.meFirst = meFirst;
        this.expert = new AI(meFirst);

        console.log('creating player ', me);
    }

    nextMove(squares, game, callback) {
        let bitmap = this.convertSquaresToBitmap(squares);

        let nextIndex = this.expert.nextMove(bitmap, !game.state.xIsNext);
        game.handleClick(nextIndex, callback);
    }

    convertSquaresToBitmap(squares) {
        let bitmap = squares.map(s => {
            if (s === this.enemy) {
                return -1;
            }

            if (s === this.me) {
                return 1;
            }

            return 0;
        });
        return bitmap;
    }

    getWeights() {
        return this.expert.getWeights();
    }

    setWeightsUpdatedCallback(cb) {
        this.expert.setWeightsUpdatedCallback(cb);
    }

    tryLearn(squares) {
        this.expert.tryLearn(this.convertSquaresToBitmap(squares));
    }

    clean() {
        this.expert.clean();
    }
}
