import React, { Component } from "react";

import io from "socket.io-client";

import { Link } from "react-router-dom";

class Home extends Component {
  state = {
    message: ""
  };

  componentDidMount = () => {
    const adminSocket = io("192.168.1.28:8079");

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
            ? "Oops....you are not connected to socket, please try again"
            : this.state.message}
        </h1>
        <Link to="/chat">Go to Chat</Link>
      </div>
    );
  }
}

export default Home;
