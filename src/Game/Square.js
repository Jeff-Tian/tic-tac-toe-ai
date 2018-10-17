import React from 'react';

export default function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.highlight ? <strong style={{"color": "red"}}>{props.value}</strong> : <span>{props.value}</span>}
        </button>
    );
}
