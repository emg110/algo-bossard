import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import screw from "../assets/images/screw.png";
import screwBlack from "../assets/images/screw-black.png";

import { Grid, Typography } from "@material-ui/core";

const styles = (theme) => ({
  mainDivDark: {
    width: "50%",
    height: 118,
    backgroundColor: "#212121",
    color: "#ffffff",
    borderRadius: 6,
    border: "10px solid #5e5f61",
    margin: "0px auto",
    [theme.breakpoints.down("xl")]: {
      width: '60%',
    },
    [theme.breakpoints.down("lg")]: {
      width: '58%',
    },
     [theme.breakpoints.down("md")]: {
      width: '80%',
    },
    [theme.breakpoints.down("sm")]: {
      width: '83%',
      height: 'auto',
    },
    [theme.breakpoints.down("xs")]: {
      width: '70%',
      height: 'auto',
    },
  },
  mainDiv: {
    width: "50%",
    height: 118,
    backgroundColor: "#fef7eb",
    color: "#000000",
    borderRadius: 6,
    border: "10px solid #5e5f61",
    margin: "0px auto",
    [theme.breakpoints.down("xl")]: {
      width: '60%',
    },
    [theme.breakpoints.down("lg")]: {
      width: '58%',
    },
     [theme.breakpoints.down("md")]: {
      width: '80%',
    },
    [theme.breakpoints.down("sm")]: {
      width: '83%',
      height: 'auto',
    },
    [theme.breakpoints.down("xs")]: {
      width: '70%',
      height: 'auto',
    },
  },
  img: {
    width: 50,
    [theme.breakpoints.down("md")]: {
      width: 50,
    },
    [theme.breakpoints.down("sm")]: {
      width: 40,
    },
    [theme.breakpoints.down("xs")]: {
      width: 50,
      padding:5
    },
  },
  subtitle: {
    fontSize: "9px",
    color: "#999999",
  },
  num: {
    fontSize: "13px",
    color: '#000000'
  },
  numDark: {
    fontSize: "13px",
    color: '#ffffff'
  },
  textDark: {
    fontSize: "8px",
    color: "#999999",
  },
  text: {
    fontSize: "8px",
  },
  subText: {
    fontSize: "8px",
    color: "#999999",
  },
  orders: {
    fontSize: "10px",
    color: "#faae0a",
    marginRight: 10
  },
  topText:{
    fontSize: "10px",
    color: "#128802",
    float: 'right',
    marginRight: 20
  }
});

class SmartLabel extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { classes, description,expDate,prodName, isDarkMode,ordersQty,smartbinQty,takeQty } = this.props;
    const {} = this.state;

    return (
      <div className={isDarkMode ? classes.mainDivDark : classes.mainDiv}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          style={{ height: "100%"}}
        >
          <Grid item xs={3} sm={3} md={3}>
            <img src={isDarkMode ? screw : screwBlack} className={classes.img} alt='product' />
            <Typography className={classes.subtitle}>{prodName}</Typography>
            <Typography className={classes.subtitle}>{expDate}</Typography>
          </Grid>
          <Grid item xs={9} sm={9} md={9} style={{ textAlign: "left" }}>
          <Typography className={classes.topText}>QTY: {takeQty}</Typography>
            <Typography className={isDarkMode ? classes.numDark : classes.num}>{smartbinQty}</Typography>
            <Typography className={isDarkMode ? classes.textDark : classes.text }>
              {description}
            </Typography>
            <div style={{ float: "right", marginRight: 4 }}>
              <Typography className={classes.orders}>ORD : {ordersQty}</Typography>
              <Typography className={classes.subText}>M6 X30/X30</Typography>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}
SmartLabel.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  assets: PropTypes.array.isRequired,
  isDarkMode: PropTypes.bool.isRequired,
  ordersQty: PropTypes.number.isRequired,
  takeQty: PropTypes.number.isRequired,
  smartbinQty: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  expDate: PropTypes.string.isRequired,
  prodName: PropTypes.string.isRequired,
};
export default withStyles(styles)(SmartLabel);
