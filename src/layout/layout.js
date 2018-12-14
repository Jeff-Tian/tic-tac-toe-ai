import {Drawer, Icon, NavBar, WingBlank} from "antd-mobile";
import Game from "../Game/Game";
import React from "react";
import {SideBar} from "./sideBar";
import './layout.css';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Settings from "../Game/globals";

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
        return <Router basename={process.env.PUBLIC_URL}>
            <div>
                <NavBar leftContent={[<Icon key="1" type="ellipsis"/>]} onLeftClick={() => this.onDock('docked')}
                        rightContent={[]}>
                    AI 三子棋
                </NavBar>
                <Drawer
                    className="my-drawer"
                    style={{minHeight: document.documentElement.clientHeight - 45}}
                    contentStyle={{textAlign: 'center'}}
                    sidebarStyle={{border: '1px solid #ddd'}}
                    sidebar={<SideBar onClicked={() => this.onDock('docked')}/>}
                    docked={this.state.docked}
                >
                    <WingBlank>
                        <Route path="/" exact component={Game}/>
                        <Route path="/settings" component={Settings}/>
                    </WingBlank>
                </Drawer>
            </div>
        </Router>;
    }
}