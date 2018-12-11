import {Drawer, Icon, NavBar, WingBlank} from "antd-mobile";
import Game from "../Game/Game";
import React from "react";
import {sidebar} from "./sidebar";
import './layout.css';

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
        return <div>
            <NavBar leftContent={[<Icon key="1" type="ellipsis"/>]} onLeftClick={() => this.onDock('docked')}
                    rightContent={[]}>
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
                <WingBlank>
                    <Game/>
                </WingBlank>
            </Drawer>
        </div>;
    }
}