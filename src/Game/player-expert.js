import ComputerExpert from "./ComputerExpert";

export default class PlayerExpert {
    constructor(me, enemy, meFirst) {
        this.me = me;
        this.enemy = enemy;
        this.meFirst = meFirst;
        this.expert = new ComputerExpert(meFirst);

        console.log('creating player ', me);
    }

    nextMove(squares, game) {
        let bitmap = squares.map(s => {
            if (s === this.enemy) {
                return -1;
            }

            if (s === this.me) {
                return 1;
            }

            return 0;
        });

        console.log('player ', this.me, ' moving...');
        game.handleClick(this.expert.nextMove(bitmap));
    }

    getWeights() {
        return this.expert.getWeights();
    }

    setWeightsUpdatedCallback(cb) {
        this.expert.setWeightsUpdatedCallback(cb);
    }

    getLearningEnabled() {
        return this.expert.learningEnabled;
    }

    toggleLearning() {
        this.expert.learningEnabled = !this.expert.learningEnabled;
        console.log(this.expert.learningEnabled + '--');
    }
}
