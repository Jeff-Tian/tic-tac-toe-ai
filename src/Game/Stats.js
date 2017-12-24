import React from 'react';

let state = {
    XWin: 0,
    OWin: 0,
    Fair: 0
};

class Stats extends React.Component {

    static updateRoundResult(winner) {
        console.log('congratulates: ', winner);
        if (winner === 'X') {
            state.XWin = state.XWin + 1
            return;
        }

        if (winner === 'O') {
            state.OWin = state.OWin + 1
            return;
        }

        state.Fair = state.Fair + 1
    }

    getTotal() {
        return state.XWin + state.OWin + state.Fair;
    }

    getXWinPercent() {
        if (this.getTotal() === 0) {
            return 0;
        }
        return (state.XWin) / this.getTotal();
    }

    getOWinPercent() {
        if (this.getTotal() === 0) {
            return 0;
        }
        return (state.OWin) / this.getTotal();
    }

    getFairPercent() {
        if (this.getTotal() === 0) {
            return 0;
        }
        return (state.Fair) / this.getTotal();
    }

    render() {
        return (
            <div>
                <h3>Stats:</h3>
                <table border="1">
                    <thead>
                    <tr>
                        <th>Measure</th>
                        <th>X Win:</th>
                        <th>O Win:</th>
                        <th>Fair:</th>
                        <th>Total:</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <th>#</th>
                        <td>{state.XWin}</td>
                        <td>{state.OWin}</td>
                        <td>{state.Fair}</td>
                        <td>{this.getTotal()}</td>
                    </tr>
                    <tr>
                        <th>%</th>
                        <td>{this.getXWinPercent().toFixed(2) * 100} %</td>
                        <td>{this.getOWinPercent().toFixed(2) * 100} %</td>
                        <td>{this.getFairPercent().toFixed(2) * 100} %</td>
                        <td>100 %</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Stats;