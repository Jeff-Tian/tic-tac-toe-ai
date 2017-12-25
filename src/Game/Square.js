import React from 'react';

export default function Square(props) {
    return (
        <button className="square" onClick={props.onClick} onMouseEnter={props.onMouseEnter}>
            {props.highlight ? <strong style={{"color": "red"}}>{props.value}</strong> : <span>{props.value}</span>}
        </button>
    );
}
