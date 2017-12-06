export default {
    findASquare(squares) {
        for (let i = 0; i < squares.length; i++) {
            if (!squares[i]) {
                return i;
            }
        }

        return null;
    }
}