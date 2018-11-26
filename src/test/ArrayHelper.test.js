import ArrayHelper from "../Helpers/ArrayHelper";

describe('ArrayHelper', function () {
    it('intersects', () => {
        expect(ArrayHelper.intersects([1, 2, 3, 4], [4, 5, 6, 7])).toEqual([4])
    })
});