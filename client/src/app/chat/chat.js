import React, { Component } from "react";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";

const styles = theme => ({
  paper: {
    padding: theme.spacing(3)
  }
});

class chat extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Grid container>
          <Grid item sm={4}>
            <Paper className={classes.paper}>
              <Typography variant="h5">Online Users</Typography>
            </Paper>
          </Grid>
          <Grid item sm={8}>
            <Paper>
              <Typography variant="h5">chat section</Typography>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(chat);
