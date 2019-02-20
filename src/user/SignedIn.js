import React from "react";

export default class SignedIn extends React.Component {
  constructor(props) {
    super(props);

    const hash = window.location.hash;

    if (hash.startsWith("#id_token=")) {
      window.localStorage.setItem("token", hash.replace("#id_token=", ""));
    }

    console.log("opener = ", window.opener);
  }
}
