export default {
    getPositionOf2DArrayByIndex(rowLength, index) {
        return {
            col: (index % rowLength) + 1,
            row: Math.floor(index / rowLength) + 1
        }
    },
    getPositionByIndex(array, index) {
        if (array[0] instanceof Array) {
            return this.getPositionOf2DArrayByIndex(array[0].length, index);
        }

        return this.getPositionOf2DArrayByIndex(Math.sqrt(array.length), index);
    }
}