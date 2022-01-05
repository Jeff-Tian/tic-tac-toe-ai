import React from "react";
import { UserAgentApplication } from "msal";

const applicationConfig = {
  clientID: "bacb8d3b-6ee0-4443-9bea-b54485a5a20d"
};

function tokenReceivedCallback(errorDesc, token, error, tokenType) {
  if (token) {
    console.log("token = ", token);
  } else {
    console.error(error + ": " + errorDesc);
  }
}

const userAgentApp = new UserAgentApplication(
  applicationConfig.clientID,
  null,
  tokenReceivedCallback
);

export default class SignedIn extends React.Component {
  constructor(props) {
    super(props);

    const hash = window.location.hash;

    if (hash.startsWith("#id_token=")) {
      window.localStorage.setItem("token", hash.replace("#id_token=", ""));
    }
  }

  async componentDidMount() {
    const token = window.localStorage.getItem("token");

    const res = await userAgentApp.acquireTokenSilent([
      "user.read",
      "mail.send"
    ]);

    console.log("res = ", res);

    if (token) {
      const headers = new Headers();
      const bearer = "Bearer " + token;
      headers.append("Authorization", bearer);

      const options = {
        method: "GET",
        headers
      };

      const graphEndpoint = "https://graph.microsoft.com/v1.0/me";

      const res = await fetch(graphEndpoint, options);
      console.log(await res.text());
    }
  }

  render() {
    return <div>Hello</div>;
  }
}
