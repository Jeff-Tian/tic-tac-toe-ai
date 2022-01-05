import { List } from "antd-mobile";
import React from "react";
import { Link } from "react-router-dom";
import Resources from "../Game/Resources";

let fullLink = { width: "100%", display: "inline-block" };
export const SideBar = ({ onClicked }) => (
  <List>
    <List.Item key="0" multipleLine>
      <Link to="/" onClick={onClicked} style={fullLink}>
        {Resources.getCurrentCulture().homepage}
      </Link>
    </List.Item>
    <List.Item key="1" multipleLine>
      <Link to="/settings" onClick={onClicked} style={fullLink}>
        {Resources.getCurrentCulture().settings}
      </Link>
    </List.Item>
    <List.Item key="7" multipleLine>
      <a
        href="https://view.officeapps.live.com/op/view.aspx?src=https%3A%2F%2Ftictactoe.js.org%2F%E5%B0%86%E4%BA%BA%E5%B7%A5%E6%99%BA%E8%83%BD%E5%BA%94%E7%94%A8%E4%BA%8E%E6%A3%8B%E7%B1%BB%E6%B8%B8%E6%88%8F%E5%BC%80%E5%8F%91%E4%B8%AD%E7%9A%84%E4%B8%80%E8%88%AC%E6%AD%A5%E9%AA%A4.docx"
        rel="noopener noreferrer"
        target="_blank"
      >
        {Resources.getCurrentCulture().how}
      </a>
    </List.Item>
    <List.Item
      key="2"
      thumb={
        <svg
          height="32"
          className="octicon octicon-mark-github"
          viewBox="0 0 16 16"
          version="1.1"
          width="32"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"
          />
        </svg>
      }
      multipleLine
    >
      <a
        onClick={onClicked}
        href="https://github.com/Jeff-Tian/tic-tac-toe-ai"
        rel="noopener noreferrer"
        target="_blank"
        style={fullLink}
      >
        {Resources.getCurrentCulture().source}
      </a>
    </List.Item>
    <List.Item key="6" thumb={"https://id3.js.org/favicon.ico"} multipleLine>
      <a
        onClick={onClicked}
        href="https://id3.js.org"
        rel="noopener noreferrer"
        target="_blank"
      >
        id3
      </a>
    </List.Item>
    <List.Item
      key="3"
      thumb={"https://gitmoji.js.org/static/favicon-32x32.png"}
      multipleLine
    >
      <a
        onClick={onClicked}
        href="https://gitmoji.js.org"
        rel="noopener noreferrer"
        target="_blank"
      >
        gitmoji
      </a>
    </List.Item>
    <List.Item
      key="4"
      thumb={require("../Resources/images/alipay-red-package.png")}
    >
      <Link to="/alipay-red-package" onClick={onClicked} style={fullLink}>
        {Resources.getCurrentCulture().getRedPackage}
      </Link>
    </List.Item>
    <List.Item
      key="5"
      thumb={require("../Resources/images/alipay-red-package.png")}
    >
      <Link to="/support-author" onClick={onClicked} style={fullLink}>
        {Resources.getCurrentCulture().supportAuthor}
      </Link>
    </List.Item>
  </List>
);
