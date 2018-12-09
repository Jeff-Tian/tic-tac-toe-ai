import {Icon, NavBar} from "antd-mobile";
import Game from "../Game/Game";
import React from "react";

export default class Layout extends React.Component {
    state = {
        docked: false,
    }

    onDock = (d) => {
        this.setState({
            [d]: !this.state[d],
        });
    }

    render() {
        return <div style={{height: '100%'}}>
            <NavBar icon={<Icon type="ellipsis"/>} onLeftClick={() => this.onDock('docked')}>
                AI 三子棋
            </NavBar>
            
            <Game/>
        </div>;
    }
}