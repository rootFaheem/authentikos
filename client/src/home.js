import React, { Component } from "react";

import io from "socket.io-client";

import { Link } from "react-router-dom";

const {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals
} = require("unique-names-generator");

class Home extends Component {
  state = {
    message: ""
  };

  componentDidMount = () => {
    const randomName = uniqueNamesGenerator({
      dictionaries: [adjectives, colors, animals]
    });

    console.log("name:;;;;", randomName);
    const adminSocket = io("http://localhost:8079");

    adminSocket.emit("login", randomName);

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
