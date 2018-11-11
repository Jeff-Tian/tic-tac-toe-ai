export default class Strategy {
    static getInitialWeights() {
        return [0, 1, 1]
    }

    static getNamedStrategy(factors) {
        return {
            const: factors[0],
            danger: factors[1],
            occupyCenter: factors[2]
        };
    }
}
