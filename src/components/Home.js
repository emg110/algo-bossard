import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles, styled } from "@material-ui/core/styles";
import {
  ReorderOutlined,
  ShoppingCartOutlined,
  BuildOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@material-ui/icons";
import smartBin from "../assets/images/firstThresholdImage.png";
import smartLabel from "../assets/images/SmartLabel2.jpg";
import user from "../assets/images/img1.png";
import {
  Grid,
  Paper,
  List,
  ListItem,
  Switch,
  Avatar,
  Card,
  CardHeader,
  CardActions,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import TxnsSmartView from './TxnsSmartView.js'
import OrdersSmartView from './OrdersSmartView.js'
import SupplySmartView from './SupplySmartView.js'


const allAssets = [
  {
    _id: 12345678,
    description: "d tempor incididunt ut labore et dolore magna aliqu",
    name: "testatk one",
    avatar: "",
  },
  {
    _id: 26,
    description:
      "ing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    name: "NASLOWSD",
    avatar: "",
  },
  {
    _id: 37,
    description: "incididunt ut labore et dolore magna",
    name: "WRbvx",
    avatar: "",
  },
];

const styles = (theme) => ({
  grid: {
    padding: "1%",
  },
  paper: {
    textAlign: "center",
  },
  smartBinImg: {
    width: "40%",
    height: "auto",
  },
  smartLabelImg: {
    width: "70%",
  },
  greenStatus: {
    width: "40px",
    height: "40px",
    marginLeft: 14,
    border: "1px solid #93fa33",
    borderRadius: "50%",
    backgroundColor: "#03ab13",
    boxShadow: "0px 0px 18px #50fc4a",
  },
  yellowStatus: {
    width: "40px",
    height: "40px",
    marginLeft: 14,
    borderRadius: "50%",
    border: "1px solid #fad533",
    backgroundColor: "#ef6b06",
    boxShadow: "0px 0px 18px #fdc577",
  },
  redStatus: {
    width: "40px",
    height: "40px",
    marginLeft: 14,
    borderRadius: "50%",
    border: "1px solid #fda1a1",
    backgroundColor: "#d91d08",
    boxShadow: "0px 0px 18px #fd7c7c",
  },
  avatar: {
    width: 70,
    height: 70,
  },
  listItem: {
    height: 90,
  },
  badge: {
    backgroundColor: "#fce1e4",
    borderRadius: "50%",
    textAlign: "center",
    display: "inline-block",
    margin: "5% 3% 4%",
    width: 40,
    height: 40,
  },
  icon: {
    marginTop: 6,
  },
  activeBtn: {
    borderBottom: "2px solid #d747045e",
    borderRadius: 0,
  },
});

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 52,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      marginLeft: 11,
      "& + .MuiSwitch-track": {
        backgroundColor: "#cac9c9",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#f44336",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: 0.7,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
    backgroundRepeat: "no-repeat",
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#cac9c9",
    opacity: 1,
    [theme.breakpoints.down("xs")]: {
      backgroundColor: "#E9E9EA",
    },
    "&:after, &:before": {
      color: "white",
      fontSize: "11px",
      position: "absolute",
      top: "6px",
    },
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smartbinGeneralStatus: "yellow",
      isSmartbinOk: false,
      isSmartbinMaintenance: false,
    };
  }

  render() {
    const { classes } = this.props;
    const { smartbinGeneralStatus, isSmartbinOk, isSmartbinMaintenance } =
      this.state;

    return (
      <>
        <Grid container spacing={3} className={classes.grid}>
          <Grid item xs={6} sm={5} md={5}>
            <Grid container direction="column" columnSpacing={4}>
              <Grid item>
                <Card className={classes.paper} elevation={1}>
                  <img
                    src={smartBin}
                    className={classes.smartBinImg}
                    alt="smart bin"
                  />
                  <CardActions>
                    <Tooltip title="Manual Order">
                      <IconButton className={classes.badge}>
                        <ShoppingCartOutlined />
                      </IconButton>
                    </Tooltip>

                    <div
                      className={classes.badge}
                      style={{ backgroundColor: "#bee6fdbd" }}
                    >
                      {isSmartbinMaintenance ? (
                        <BuildOutlined className={classes.icon} />
                      ) : (
                        <BuildOutlined className={classes.icon} />
                      )}
                    </div>
                    <div
                      className={classes.badge}
                      style={{ backgroundColor: "#bee6fdbd" }}
                    >
                      {isSmartbinOk ? (
                        <CheckOutlined className={classes.icon} />
                      ) : (
                        <CloseOutlined className={classes.icon} />
                      )}
                    </div>
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6} sm={5} md={5}>
            <Grid container direction="column" columnSpacing={4}>
              <Grid item>
                <Paper className={classes.paper} elevation={1}>
                  <img src={smartLabel} className={classes.smartLabelImg} alt="smart label" />
                </Paper>
              </Grid>
              <Grid item style={{ marginTop: '10%' }}>
                <Paper className={classes.paper} elevation={1}>
                  Chhhhhhaaaaart
                </Paper>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4} sm={2} md={2}>
            <List style={{ marginLeft: "15%" }}>
              <ListItem className={classes.listItem}>
                <span
                  className={
                    smartbinGeneralStatus === "green"
                      ? classes.greenStatus
                      : smartbinGeneralStatus === "yellow"
                      ? classes.yellowStatus
                      : classes.redStatus
                  }
                ></span>
              </ListItem>

              <ListItem className={classes.listItem}>
                <Avatar className={classes.avatar} src={user} />
              </ListItem>
              <ListItem className={classes.listItem}>
                <IOSSwitch />
              </ListItem>
            </List>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={12} className={classes.grid}>
          <Paper className={classes.paper}>CHAAAAARt</Paper>
        </Grid>
        <Grid container spacing={3} className={classes.grid}>
          <Grid item xs={4} sm={4} md={4}>
            <TxnsSmartView assets={allAssets} />
          </Grid>
          <Grid item xs={4} sm={4} md={4}>
           <OrdersSmartView assets={allAssets} />
          </Grid>
          <Grid item xs={4} sm={4} md={4}>
            <SupplySmartView assets={allAssets} />
          </Grid>
        </Grid>
      </>
    );
  }
}
Home.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};
export default withStyles(styles)(Home);
