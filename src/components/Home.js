import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles, styled } from "@material-ui/core/styles";
import {
  Brightness4,
  Brightness7,
  ShoppingCartOutlined,
  BuildOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@material-ui/icons";
import smartBin from "../assets/images/firstThresholdImage.png";
import smartLabel from "../assets/images/SmartLabel2.jpg";
import User from "../assets/images/img1.png";
import Chart from "react-apexcharts";
import {
  Grid,
  Paper,
  List,
  ListItem,
  Switch,
  Avatar,
  Card,
  Typography,
  CardActions,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import TxnsSmartView from "./TxnsSmartView.js";
import OrdersSmartView from "./OrdersSmartView.js";
import SupplySmartView from "./SupplySmartView.js";

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
    marginTop: "4%",
  },
  smartLabelImg: {
    width: "50%",
  },
  greenStatus: {
    width: "40px",
    height: "40px",
    border: "1px solid #93fa33",
    borderRadius: "50%",
    backgroundColor: "#03ab13",
    boxShadow: "0px 0px 18px #50fc4a",
    [theme.breakpoints.down("xl")]: {
      position: "absolute",
      top: "24%",
      left: "8%",
    },
    [theme.breakpoints.down("lg")]: {
      position: "absolute",
      top: "27%",
      left: "8%",
    },
    [theme.breakpoints.down("md")]: {
      position: "absolute",
      top: "28%",
      left: "7%",
    },
    [theme.breakpoints.down("sm")]: {
      position: "absolute",
      top: "21%",
      left: "7%",
    },
    [theme.breakpoints.down("xs")]: {
      position: "absolute",
      top: "2.7%",
      left: "3%",
    },
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
    height: 105,
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
  iconButton: {
    backgroundColor: "#bee6fdbd",
    borderRadius: "50%",
    textAlign: "center",
    margin: "5% 3% 4%",
    width: 43,
    height: 43,
    marginTop: 13,
    [theme.breakpoints.down("sm")]: {
      marginTop: "5px",
    },
    [theme.breakpoints.down("xs")]: {
      marginTop: "5px",
    },
  },
  cardActionsRoot: {
    display: "block",
    margin: "0px auto",
  },
  list: {
    marginLeft: "30%",
    [theme.breakpoints.down("sm")]: {
      marginLeft: "0",
    },
    [theme.breakpoints.down("xs")]: {
      display: "flex",
      flexDirection: "row",
      padding: 0,
      marginLeft: "25px",
    },
  },
  icon: {
    marginTop: 6,
  },
  activeBtn: {
    borderBottom: "2px solid #d747045e",
    borderRadius: 0,
  },
  cardRootDark: {
    backgroundColor: "#242424",
  },
  switchCard: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  smallSwitchCard: {
    display: "none",
    [theme.breakpoints.down("sm")]: {
      display: "flex",
    },
  },
});

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smartbinGeneralStatus: "green",
      isSmartbinOk: false,
      isSmartbinMaintenance: false,
      isTxnsFullWidth: false,
      isOrdersFullWidth: false,
      isSupplyFullWidth: false,
      isDarkModeChecked: false,
      barChartOptions: {
        chart: {
          id: "basic-bar",
        },
        xaxis: {
          x: new Date("14 Nov 2012").getTime(),
          borderColor: "#999",
        },
      },
      barChartSeries: [
        {
          name: "series-1",
          data: [
            60, 40, 15, 80, 29, 70, 50, 82, 43, 64, 94, 1, 43, 74, 5, 44, 40,
            32, 58, 12, 71, 2, 49, 14, 52, 81, 20, 49, 37, 11,
          ],
        },
      ],
      options: {
        chart: {
          id: "basic-area",
        },
        stroke: {
          curve: "stepline",
        },
        stacked: true,
      },
      series: [
        {
          name: "Series 1",
          data: [100, 138, 123, 109, 118, 150, 116, 105, 91, 143, 114, 103],
        },
        {
          name: "Series 2",
          data: [70, 108, 93, 79, 88, 120, 86, 75, 61, 113, 84, 73],
        },
        {
          name: "Series 3",
          data: [40, 78, 63, 49, 58, 90, 56, 45, 31, 83, 54, 43],
        },
        {
          name: "Series 4",
          data: [10, 48, 33, 19, 28, 60, 26, 15, 1, 53, 24, 13],
        },
      ],
      xaxis: {
        type: "numeric",
      },
    };
    this.handleDarkModeClick = this.handleDarkModeClick.bind(this);
  }

  handleDarkModeClick() {
    const { isDarkMode, setIsDarkMode } = this.props;
    setIsDarkMode(!isDarkMode);
    this.setState({ isDarkModeChecked: !this.state.isDarkModeChecked });
  }

  render() {
    const { classes, isDarkMode } = this.props;
    const {
      smartbinGeneralStatus,
      isSmartbinOk,
      isSmartbinMaintenance,
      isTxnsFullWidth,
      isOrdersFullWidth,
      isSupplyFullWidth,
      isDarkModeChecked,
    } = this.state;

    return (
      <>
        <Grid container spacing={1} className={classes.grid}>
          <Grid item xs={12} sm={2} md={2}>
            <Card
              className={classes.paper}
              elevation={1}
              classes={{ root: isDarkMode && classes.cardRootDark }}
            >
              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                className={classes.switchCard}
              >
                <Grid item style={{ height: 95 }}>
                  <span
                    className={
                      smartbinGeneralStatus === "green"
                        ? classes.greenStatus
                        : smartbinGeneralStatus === "yellow"
                        ? classes.yellowStatus
                        : classes.redStatus
                    }
                  ></span>
                </Grid>
                <Grid item style={{ height: 95 }}>
                  <Avatar className={classes.avatar} src={User} />
                </Grid>
                <Grid item style={{ height: 95 }}>
                  <Grid
                    component="label"
                    container
                    alignItems="center"
                    spacing={1}
                  >
                    <Grid item>Dark</Grid>
                    <Grid item>
                      <Switch
                        color="secondary"
                        checked={isDarkModeChecked}
                        onChange={this.handleDarkModeClick}
                      />
                    </Grid>
                    <Grid item>Light</Grid>
                  </Grid>
                </Grid>
                <Grid item style={{ height: 95 }}>
                  <Grid
                    component="label"
                    container
                    alignItems="center"
                    spacing={1}
                  >
                    <Grid item></Grid>
                    <Grid item>
                      <Switch color="secondary" />
                    </Grid>
                    <Grid item></Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                className={classes.smallSwitchCard}
              >
                <Grid item>
                  <div
                    className={
                      smartbinGeneralStatus === "green"
                        ? classes.greenStatus
                        : smartbinGeneralStatus === "yellow"
                        ? classes.yellowStatus
                        : classes.redStatus
                    }
                  ></div>
                </Grid>
                <Grid item>
                  <Avatar className={classes.avatar} src={User} />
                </Grid>
                <Grid item>
                  <Grid
                    component="label"
                    container
                    alignItems="center"
                    spacing={1}
                  >
                    <Grid item>Dark</Grid>
                    <Grid item>
                      <Switch
                        color="secondary"
                        checked={isDarkModeChecked}
                        onChange={this.handleDarkModeClick}
                      />
                    </Grid>
                    <Grid item>Light</Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid
                    component="label"
                    container
                    alignItems="center"
                    spacing={1}
                  >
                    <Grid item></Grid>
                    <Grid item>
                      <Switch color="secondary" />
                    </Grid>
                    <Grid item></Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={12} sm={5} md={5}>
            <Card
              className={classes.paper}
              elevation={1}
              classes={{ root: isDarkMode && classes.cardRootDark }}
            >
              <img
                src={smartBin}
                className={classes.smartBinImg}
                alt="smart bin"
              />
              <CardActions classes={{ root: classes.cardActionsRoot }}>
                <Tooltip title="Manual Order">
                  <IconButton className={classes.iconButton}>
                    <ShoppingCartOutlined />
                  </IconButton>
                </Tooltip>

                <div className={classes.badge}>
                  {isSmartbinMaintenance ? (
                    <BuildOutlined className={classes.icon} />
                  ) : (
                    <BuildOutlined className={classes.icon} />
                  )}
                </div>
                <div className={classes.badge}>
                  {isSmartbinOk ? (
                    <CheckOutlined className={classes.icon} />
                  ) : (
                    <CloseOutlined className={classes.icon} />
                  )}
                </div>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} sm={5} md={5}>
            <Grid container direction="column" columnSpacing={4} spacing={1}>
              <Grid item>
                <Paper
                  className={classes.paper}
                  elevation={1}
                  classes={{ root: isDarkMode && classes.cardRootDark }}
                >
                  <img
                    src={smartLabel}
                    className={classes.smartLabelImg}
                    alt="smart label"
                  />
                </Paper>
              </Grid>
              <Grid item style={{ marginTop: "10%" }}>
                <Paper
                  className={classes.paper}
                  elevation={1}
                  classes={{ root: isDarkMode && classes.cardRootDark }}
                >
                  <div className="row">
                    <div className="mixed-chart">
                      <Chart
                        options={this.state.barChartOptions}
                        series={this.state.barChartSeries}
                        type="bar"
                        height="170"
                      />
                    </div>
                  </div>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={12} className={classes.grid}>
          <Paper
            className={classes.paper}
            classes={{ root: isDarkMode && classes.cardRootDark }}
          >
            <div className="row">
              <div className="mixed-chart">
                <Chart
                  options={this.state.options}
                  series={this.state.series}
                  type="area"
                  height="200"
                />
              </div>
            </div>
          </Paper>
        </Grid>
        <Grid container spacing={2} className={classes.grid}>
          <Grid
            item
            xs={isTxnsFullWidth ? 12 : 12}
            sm={isTxnsFullWidth ? 12 : 4}
            md={isTxnsFullWidth ? 12 : 4}
          >
            <TxnsSmartView
              assets={allAssets}
              isDarkMode={isDarkMode}
              isTxnsFullWidth={isTxnsFullWidth}
              setFullWidth={(a, b, c) =>
                this.setState({
                  isTxnsFullWidth: a,
                  isOrdersFullWidth: b,
                  isSupplyFullWidth: c,
                })
              }
            />
          </Grid>
          <Grid
            item
            xs={isOrdersFullWidth ? 12 : 12}
            sm={isOrdersFullWidth ? 12 : 4}
            md={isOrdersFullWidth ? 12 : 4}
          >
            <OrdersSmartView
              assets={allAssets}
              isDarkMode={isDarkMode}
              isOrdersFullWidth={isOrdersFullWidth}
              setFullWidth={(a, b, c) =>
                this.setState({
                  isTxnsFullWidth: a,
                  isOrdersFullWidth: b,
                  isSupplyFullWidth: c,
                })
              }
            />
          </Grid>
          <Grid
            item
            xs={isSupplyFullWidth ? 12 : 12}
            sm={isSupplyFullWidth ? 12 : 4}
            md={isSupplyFullWidth ? 12 : 4}
          >
            <SupplySmartView
              assets={allAssets}
              isDarkMode={isDarkMode}
              isSupplyFullWidth={isSupplyFullWidth}
              setFullWidth={(a, b, c) =>
                this.setState({
                  isTxnsFullWidth: a,
                  isOrdersFullWidth: b,
                  isSupplyFullWidth: c,
                })
              }
            />
          </Grid>
        </Grid>
      </>
    );
  }
}
Home.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  isDarkMode: PropTypes.bool.isRequired,
  setIsDarkMode: PropTypes.func.isRequired,
};
export default withStyles(styles)(Home);
