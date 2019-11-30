import React, { Component } from "react";

import io from "socket.io-client";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";

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
    users: ""
  };

  componentDidMount = () => {
    const chatSocket = io("http://localhost:8079");

    chatSocket.on("chat", user => {
      // console.log("users::", user);
      this.setState({ users: user });
    });
  };

  render() {
    const { classes } = this.props;

    const { users } = this.state;

    let onlineUsers = "";

    if (users !== "") {
      onlineUsers = users.map((item, _i) => {
        return (
          <li key={_i} className={classes.li}>
            {" "}
            {item}
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
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(chat);
