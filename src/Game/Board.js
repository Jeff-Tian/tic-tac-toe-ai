import React from 'react';
import Square from './Square';

export default class Board extends React.Component {

    renderSquare(i) {
        return <Square value={this.props.squares[i]} onClick={() => this.props.onClick(i)} key={i} index={i}
                       highlight={this.props.winner ? this.props.winner.where.indexOf(i) >= 0 : false}/>;
    }

    renderBoardRow(side, rowIndex) {
        let cols = [];
        for (let i = 0; i < side; i++) {
            cols.push(this.renderSquare(rowIndex * side + i));
        }

        return cols;
    }

    renderBoard() {
        let side = Math.sqrt(this.props.squares.length);
        let rows = [];
        for (let i = 0; i < side; i++) {
            rows.push(<div className="board-row" key={i}>
                {this.renderBoardRow(side, i)}
            </div>);
        }

        return rows;
    }

    render() {
        return (
            <div>
                {this.renderBoard()}
            </div>
        );
    }
}
