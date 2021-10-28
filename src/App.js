import React, { Component } from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography,Box } from "@material-ui/core";

import bossardLogo from "./assets/images/logo.svg";
import algoBossardLogo from "./assets/images/algoBossard.png";
import algorandLogo from "./assets/images/algorand_full_logo_white.png";
import Home from "./components/Home.js";

const styles = (theme) => ({
  appName: {
    [theme.breakpoints.down("md")]: {
      fontSize: "2em",
      marginTop: "0%",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.7em",
      marginTop: "2%",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.5em",
      marginTop: "0%",
    },
  },
  bossardImg: {
    width: "11%",
    float: "right",
    marginRight: "3%",
    marginTop: "19px",
    [theme.breakpoints.down("lg")]: {
      width: "8%",
      marginTop: "2%",
    },
    [theme.breakpoints.down("md")]: {
      width: "8%",
      marginTop: "2%",
    },
    [theme.breakpoints.down("sm")]: {
      width: "8%",
      marginTop: "2%",
    },
    [theme.breakpoints.down("xs")]: {
      width: "14%",
      marginTop: "4%",
    },
  },
  algoBossardImg: {
    float: "left",
    marginLeft: "2%",
    display: "inline",
    marginTop: "1%",
    [theme.breakpoints.down("lg")]: {
      width: "5%",
      marginTop: "1%",
    },
    [theme.breakpoints.down("md")]: {
      width: "5%",
      marginTop: "1%",
    },
    [theme.breakpoints.down("sm")]: {
      width: "6%",
      marginTop: "0px",
    },
    [theme.breakpoints.down("xs")]: {
      width: "11%",
      marginTop: "2%",
    },
  },
  algorandImg: {
    float: "right",
    marginRight: "3%",
    // marginTop: "2%",
    display: "inline",
    [theme.breakpoints.down("xl")]: {
      width: "10%",
      marginTop: "1%",
    },
    [theme.breakpoints.down("lg")]: {
      width: "10%",
      marginTop: "1%",
    },
    [theme.breakpoints.down("md")]: {
      width: "10%",
      marginTop: "1%",
    },
    [theme.breakpoints.down("sm")]: {
      width: "9%",
      marginTop: "1%",
    },
    [theme.breakpoints.down("xs")]: {
      width: "14%",
      marginTop: "2%",
    },
  },
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      showGen: false,
      showAsset: false,
      showTxn: false,
      showTxnOffline: false,
      showPayment: false,
      isDescEnabled: false,
      showNft: false,
    };
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <AppBar position="static" className="App-header">
          <Toolbar>
              <img
                src={algoBossardLogo}
                className={classes.algoBossardImg}
                alt="algo bossard"
              />
              <div className={"App-name"}>
                <Typography className={classes.appName} variant="h4">
                  Algo Bossard
                </Typography>
              </div>
              <Box sx={{ flexGrow: 1 }} />
              <img
                src={algorandLogo}
                className={classes.algorandImg}
                alt="algorand"
              />
              <img
                src={bossardLogo}
                className={classes.bossardImg}
                alt="bossard"
              />
          </Toolbar>
        </AppBar>
        <Home />
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(App);
