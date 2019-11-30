import React, { Component } from "react";

import io from "socket.io-client";

import { Link } from "react-router-dom";

class Home extends Component {
  componentDidMount = () => {
    const adminSocket = io("http://localhost:8079");

    adminSocket.on("home", msg => {
      console.log("message:", msg);
    });
  };
  render() {
    return (
      <div>
        <h1>Welcome home Authentikos</h1>
        <Link to="/chat">Go to Chat</Link>
      </div>
    );
  }
}

export default Home;
