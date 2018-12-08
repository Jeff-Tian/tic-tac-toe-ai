import React from "react";
import {Drawer, Icon, NavBar} from "antd-mobile";
import Game from "../Game/Game";
import {sidebar} from "./sidebar";
import 'antd-mobile/dist/antd-mobile.css'; // or 'antd-mobile/dist/antd-mobile.less'

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
        return (
            <div style={{height: '100%'}}>
                <NavBar icon={<Icon type="ellipsis"/>} onLeftClick={() => this.onDock('docked')}>
                    AI 三子棋
                </NavBar>
                <Drawer
                    className="my-drawer"
                    style={{minHeight: document.documentElement.clientHeight}}
                    contentStyle={{color: '#A6A6A6', textAlign: 'center', paddingTop: 42}}
                    sidebarStyle={{border: '1px solid #ddd'}}
                    sidebar={sidebar}
                    docked={this.state.docked}
                >

                    <Game/>
                </Drawer>
            </div>
        );
    }
}