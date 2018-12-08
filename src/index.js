import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Game from './Game/Game';
import {Icon, NavBar} from "antd-mobile";

ReactDOM.render(
    <div style={{height: '100%'}}>
        <NavBar icon={<Icon type="ellipsis"/>} onLeftClick={() => this.onDock('docked')}>
            AI 三子棋
        </NavBar>
        <Game/>
    </div>,
    document.getElementById('root')
);
