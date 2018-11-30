import React from 'react';
import {spotScoreMap} from "./globals";

export default function Square(props) {
    return (
        <button className="square" onClick={props.onClick} title={JSON.stringify(spotScoreMap.get(props.index))}>
            {props.highlight ? <strong style={{"color": "red"}}>{props.value}</strong> : <span>{props.value}</span>}
        </button>
    );
}
