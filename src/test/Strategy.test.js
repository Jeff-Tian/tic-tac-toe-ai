import Strategy from "../Game/Strategy";

describe('Strategy', () => {
    it('计算所有 bad 边的两两相交数', () => {
        let bitmap = [
            0, 0, 0,
            0, 0, 0,
            0, 0, 0,
        ]

        expect(Strategy.getIntersectedBads(bitmap)).toEqual(0);

        bitmap = [
            0, -1, 0,
            -1, 0, 0,
            0, 0, 0
        ]

        expect(Strategy.getIntersectedBads(bitmap)).toEqual(2);

        bitmap = [
            -1, 0, 0,
            0, 1, 0,
            0, -1, 0
        ]

        expect(Strategy.getIntersectedBads(bitmap)).toEqual(1);
    })
})