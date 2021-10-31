import React, { Component } from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography,Box, Dialog, DialogContent,IconButton } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import bossardLogo from "./assets/images/logo.svg";
import algoBossardLogo from "./assets/images/algoBossard.png";
import algorandLogo from "./assets/images/algorand_full_logo_white.png";
import Home from "./components/Home.js";
import Presentation from "./components/Presentation.js";

const styles = (theme) => ({
  appName: {
    [theme.breakpoints.down("md")]: {
      fontSize: "2em",
      marginTop: "0%",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.7em",
      marginTop: "0%",
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
    display: "inline",
    [theme.breakpoints.down("lg")]: {
      width: "4%",
    },
    [theme.breakpoints.down("md")]: {
      width: "4%",
    },
    [theme.breakpoints.down("sm")]: {
      width: "6%",
    },
    [theme.breakpoints.down("xs")]: {
      width: "10%",
      marginRight: 10
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
  dialogRoot: {
  
    borderRadius: 3,
  },
  closeBtn: {
    position: "absolute",
    right: 8,
    top: 8,
  },
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      isDarkMode: false,
      isPresentationModalOpen: false,
    };
    this.handleClosePresentation = this.handleClosePresentation.bind(this);
    this.openPresentation = this.openPresentation.bind(this);
  }
  handleClosePresentation(){
    this.setState({isPresentationModalOpen : false})
  }
  openPresentation(){
    this.setState({isPresentationModalOpen : true})
  }
  render() {
    const { classes } = this.props;
    const { isDarkMode,isPresentationModalOpen } = this.state;
    return (
      <>
      <Dialog
          fullWidth
          maxWidth="xl"
          open={isPresentationModalOpen}
          onClose={this.handleClosePresentation}
          classes={{ paper: classes.dialogRoot }}
        >
          <IconButton
            className={classes.closeBtn}
            onClick={this.handleClosePresentation}
          >
            <Close />
          </IconButton>
          <DialogContent>
            <Presentation />
          </DialogContent>
        </Dialog>
      <div style={{backgroundColor: isDarkMode && '#000000'}}>
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
        <Home isDarkMode={isDarkMode} setIsDarkMode={(isDark) => this.setState({isDarkMode: isDark})} />
      </div>
      </>
    );
  }
}

App.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(App);
