export default {
    convertIndexToRowColumn(rowLength, index) {
        return {
            col: (index % rowLength) + 1,
            row: Math.floor(index / rowLength) + 1
        }
    },
    is2DArray: function (array) {
        return array[0] instanceof Array;
    },
    getRowColumnByIndex(array, index) {
        if (this.is2DArray(array)) {
            return this.convertIndexToRowColumn(array[0].length, index);
        }

        return this.convertIndexToRowColumn(Math.sqrt(array.length), index);
    },

    findIndexOfMax(array) {
        let index = 0;
        let max = array[0];

        for (let i = 1; i < array.length; i++) {
            if (array[i] > max) {
                max = array[i];
                index = i;
            }
        }

        return index;
    }
}