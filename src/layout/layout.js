import {Button, Drawer, Icon, NavBar, WingBlank} from "antd-mobile";
import Game from "../Game/Game";
import React from "react";
import {SideBar} from "./sidebar";
import './layout.css';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Settings from "../Game/Settings";
import AlipayRedPackage from "../money/alipay-red-package";
import SupportAuthor from "../money/support-author";
import Resources from "../Game/Resources";
import CultureContext, {cultures} from "../Game/CultureContext";
import {CustomIcon} from "../icons/CustomIcon";

export default class Layout extends React.Component {
    changeCulture = (value) => {
        this.setState({culture: {currentCulture: Resources.setCulture(value[0])}});
        console.log(value);
    }

    state = {
        docked: false,
        culture: {currentCulture: cultures.getDefault()},
        changeCulture: this.changeCulture
    }

    onDock = (d) => {
        this.setState({
            [d]: !this.state[d],
        });

        console.log('c = ', this.state.currentCulture)
    }

    render() {
        return <Router basename={process.env.PUBLIC_URL}>
            <CultureContext.Provider value={this.state}>
                <div>
                    <NavBar leftContent={[<Icon key="1" type="ellipsis"/>]} onLeftClick={() => this.onDock('docked')}
                            rightContent={[
                                <CustomIcon type={require('../icons/login.svg')}
                                        onClick={() => alert('hello')}/>
                            ]}>
                        {Resources.getCurrentCulture().siteName}
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
                            <Route path="/alipay-red-package" component={AlipayRedPackage}/>
                            <Route path="/support-author" component={SupportAuthor}/>
                        </WingBlank>
                    </Drawer>
                </div>
            </CultureContext.Provider>
        </Router>;
    }
}
