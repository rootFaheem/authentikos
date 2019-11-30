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

const chatSocket = io("http://localhost:8079");

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
  }
});

class chat extends Component {
  state = {
    users: "",
    messages: "",
    text: ""
  };

  componentDidMount = () => {
    const randomName = uniqueNamesGenerator({
      dictionaries: [adjectives, colors, animals]
    });

    console.log("name:;;;;", randomName);

    chatSocket.emit("login", randomName);

    chatSocket.on("chat", user => {
      console.log("user", user);
      this.setState({ users: user });
    });

    chatSocket.on("message", newMsg => {
      let messages = this.state;

      console.log("new MSG:", newMsg);

      messages.push(newMsg);
      this.setState({
        messages
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
  };

  render() {
    const { classes } = this.props;

    const { users } = this.state;

    const { messages } = this.state;

    let onlineUsers = "";
    let messagesList = "";

    if (users !== "") {
      onlineUsers = users.map((item, _i) => {
        return (
          <li key={_i} className={classes.li}>
            {item.name}
          </li>
        );
      });
    }

    if (messages !== "") {
      messagesList = messages.map((msg, _i) => {
        return (
          <li key={_i} className={classes.li}>
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
              <ul>{messagesList}</ul>
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
