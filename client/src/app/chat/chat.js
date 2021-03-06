import React, { Component } from "react";

import io from "socket.io-client";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import { Button } from "@material-ui/core";

import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals
} from "unique-names-generator";

const chatSocket = io("192.168.1.28:8079");

const styles = theme => ({
  root: {
    marginTop: "30px"
  },
  grid: {
    margin: theme.spacing(1)
  },
  paper: {
    padding: theme.spacing(2)
  },
  li: {
    color: "green",
    padding: "8px 0px"
  },
  msg: {
    // color: "#bbb",
    padding: "10px 5px",
    margin: "20px",
    listStyle: "none",
    textAlign: "left",
    background: "#eee"
  },
  messageList: {
    maxHeight: "500px",
    overflow: "scroll"
  }
});

class chat extends Component {
  state = {
    users: "",
    messageList: "",
    text: ""
  };

  componentDidMount = () => {
    const randomName = uniqueNamesGenerator({
      dictionaries: [adjectives, colors, animals]
    });

    console.log("name:;;;;", randomName);

    chatSocket.emit("login", randomName);

    chatSocket.on("join", { name, room }, () => {
      console.log("user name:", name);
      console.log("user room:", room);
    });

    chatSocket.on("chat", user => {
      console.log("user", user);
      this.setState({ users: user });
    });

    chatSocket.on("send message", messageList => {
      console.log("new MSG LISt:", messageList);
      this.setState({
        messageList
      });
    });
  };

  textChangedHandler = e => {
    console.log("e.target.value", e.target.value);
    this.setState({
      text: e.target.value
    });
  };

  messageSendHandler = e => {
    e.preventDefault();

    chatSocket.emit("send message", this.state.text);
    console.log("API successful");
    this.setState({
      text: ""
    });
  };

  render() {
    const { classes } = this.props;

    const { users, messageList } = this.state;

    let onlineUsers = "";
    let messageLister = "";

    if (users !== "") {
      onlineUsers = users.map((item, _i) => {
        return (
          <li key={_i} className={classes.li}>
            {item.name}
          </li>
        );
      });
    }

    if (messageList !== "") {
      messageLister = messageList.map((msg, _i) => {
        return (
          <li key={_i} className={classes.msg}>
            {msg}
          </li>
        );
      });
    }

    return (
      <div>
        <Grid container justify="space-around" className={classes.root}>
          <Grid item sm={3} className={classes.grid}>
            <Paper className={classes.paper}>
              <Typography variant="h5">Online Users</Typography>
              <ul>{onlineUsers}</ul>
            </Paper>
          </Grid>
          <Grid item sm={8} className={classes.grid}>
            <Paper className={classes.paper}>
              <Typography variant="h5">Chat Section</Typography>
              <ul className={classes.messageList}>{messageLister}</ul>
            </Paper>
            <div>
              <TextField
                required
                id="standard-required"
                label="Enter you message"
                margin="normal"
                fullWidth
                className={classes.textField}
                value={this.state.text ? this.state.text : ""}
                onChange={this.textChangedHandler}
              ></TextField>
              <Button
                type="submit"
                fullWidth
                variant="outlined"
                color="primary"
                onClick={this.messageSendHandler}
              >
                Send
              </Button>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(chat);
