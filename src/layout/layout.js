import { Drawer, Icon, NavBar, WingBlank } from "antd-mobile";
import Game from "../Game/Game";
import React from "react";
import { SideBar } from "./sidebar";
import "./layout.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Settings from "../Game/Settings";
import AlipayRedPackage from "../money/alipay-red-package";
import SupportAuthor from "../money/support-author";
import Resources from "../Game/Resources";
import CultureContext, { cultures } from "../Game/CultureContext";
import SignedIn from "../user/SignedIn";

export default class Layout extends React.Component {
  changeCulture = value => {
    this.setState({
      culture: { currentCulture: Resources.setCulture(value[0]) }
    });
    console.log(value);
  };

  state = {
    docked: false,
    culture: { currentCulture: cultures.getDefault() },
    changeCulture: this.changeCulture
  };

  onDock = d => {
    this.setState({
      [d]: !this.state[d]
    });
  };

  render() {
    const url =
      window.location.hostname === "localhost"
        ? "https://unihearti.b2clogin.com/unihearti.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1_tictactoe&client_id=bacb8d3b-6ee0-4443-9bea-b54485a5a20d&nonce=defaultNonce&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fidentified&scope=openid&response_type=id_token&prompt=login"
        : "https://unihearti.b2clogin.com/unihearti.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1_tictactoe&client_id=bacb8d3b-6ee0-4443-9bea-b54485a5a20d&nonce=defaultNonce&redirect_uri=https%3A%2F%2Ftictactoe.js.org%2Fidentified&scope=openid&response_type=id_token&prompt=login";

    return (
      <Router basename={process.env.PUBLIC_URL}>
        <CultureContext.Provider value={this.state}>
          <div>
            <NavBar
              leftContent={[<Icon key="1" type="ellipsis" />]}
              onLeftClick={() => this.onDock("docked")}
              rightContent={[
                <a
                  href={url}
                  key="1"
                  style={{ width: "22px", height: "22px" }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={require("../icons/user.svg")}
                    alt=""
                    style={{ maxHeight: "22px" }}
                  />
                </a>
              ]}
            >
              {Resources.getCurrentCulture().siteName}
            </NavBar>
            <Drawer
              className="my-drawer"
              style={{ minHeight: document.documentElement.clientHeight - 45 }}
              contentStyle={{ textAlign: "center" }}
              sidebarStyle={{ border: "1px solid #ddd" }}
              sidebar={<SideBar onClicked={() => this.onDock("docked")} />}
              docked={this.state.docked}
            >
              <WingBlank>
                <Route path="/" exact component={Game} />
                <Route path="/settings" component={Settings} />
                <Route
                  path="/alipay-red-package"
                  component={AlipayRedPackage}
                />
                <Route path="/support-author" component={SupportAuthor} />
                <Route path="/identified" component={SignedIn} />
              </WingBlank>
            </Drawer>
          </div>
        </CultureContext.Provider>
      </Router>
    );
  }
}
