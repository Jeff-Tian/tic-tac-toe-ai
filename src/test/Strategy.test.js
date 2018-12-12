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

        expect(Strategy.getIntersectedBads(bitmap)).toEqual(4);

        bitmap = [
            -1, 0, 0,
            0, 1, 0,
            0, -1, 0
        ]

        expect(Strategy.getIntersectedBads(bitmap)).toEqual(2);
    })

    it('更危险的情况也应该考虑进去', () => {
        let bitmap = [
            -1, -1, 0,
            -1, 0, 0,
            0, 0, 0
        ]

        expect(Strategy.getIntersectedBads(bitmap)).toEqual(8);
    })

    it('被敌方占中', () => {
        let bitmap = [
            1, 0, 0,
            0, -1, 0,
            0, 0, 0
        ]

        expect(Strategy.getIntersectedBads(bitmap)).toEqual(3);


    })


    test('自己的机会赢面不要给对手机会。', () => {
        let b = [
            -1, 0, 1,
            0, 1, 0,
            0, 0, -1
        ]
        expect(Strategy.getNumberOfBadsOfMyChancePosition(b)).toEqual(2)

        b = [
            -1, 0, 0,
            0, 1, 1,
            0, 0, -1
        ]

        expect(Strategy.getNumberOfBadsOfMyChancePosition(b)).toEqual(1)
    })
})