import React, { Component } from "react";

import io from "socket.io-client";

import { Link } from "react-router-dom";

class Home extends Component {
  state = {
    message: ""
  };

  componentDidMount = () => {
    const adminSocket = io("http://localhost:8079");

    adminSocket.on("home", msg => {
      console.log("message:", msg);
      this.setState({
        message: msg
      });
    });
  };
  render() {
    return (
      <div>
        <h1>
          {this.state.message === ""
            ? "you are not connected to socket, please try again"
            : this.state.message}
        </h1>
        <Link to="/chat">Go to Chat</Link>
      </div>
    );
  }
}

export default Home;
