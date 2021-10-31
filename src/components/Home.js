import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles, styled } from "@material-ui/core/styles";
import {
  ShoppingCartOutlined,
  BuildOutlined,
  CheckOutlined,
  CloseOutlined,
  Close,
} from "@material-ui/icons";
import smartBin1 from "../assets/images/firstThresholdImage.png";
import smartBin2 from "../assets/images/secondThresholdImage.png";
import smartBin3 from "../assets/images/thirdThresholdImage.png";
import smartBin4 from "../assets/images/fourthThresholdImage.png";
import smartLabel from "../assets/images/SmartLabel2.jpg";
import User from "../assets/images/img1.png";
import Chart from "react-apexcharts";
import {
  Grid,
  Paper,
  Dialog,
  DialogContent,
  DialogHeader,
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
import SmartLabel from "./SmartLabel.js";

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
    height: "100%",
  },
  smartBinImg: {
    width: "43%",
    height: "auto",
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
    display: "inline-block",
    [theme.breakpoints.down("xs")]: {
      position: "absolute",
      top: "2%",
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
    display: "inline-block",
    [theme.breakpoints.down("xs")]: {
      position: "absolute",
      top: "2.7%",
      left: "3%",
    },
  },
  redStatus: {
    width: "40px",
    height: "40px",
    marginLeft: 14,
    borderRadius: "50%",
    border: "1px solid #fda1a1",
    backgroundColor: "#d91d08",
    boxShadow: "0px 0px 18px #fd7c7c",
    display: "inline-block",
    [theme.breakpoints.down("xs")]: {
      position: "absolute",
      top: "2.7%",
      left: "3%",
    },
  },
  avatar: {
    width: 70,
    height: 70,
  },
  listItem: {
    height: 105,
  },
  badge: {
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
    marginTop: 10,
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  smallSwitchCard: {
    display: "none",
    [theme.breakpoints.down("xs")]: {
      display: "flex",
    },
  },
  dialogRoot: {
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderRadius: 3,
  },
  closeBtn: {
    position: "absolute",
    right: 8,
    top: 8,
  },
});

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ordersQty: 0,
      smartbinGeneralStatus: "green",
      isSmartbinOk: false,
      isSmartbinMaintenance: true,
      isTxnsFullWidth: false,
      isOrdersFullWidth: false,
      isSupplyFullWidth: false,
      isDarkModeChecked: false,
      isOrderModalOpen: false,
      barChartOptions: {
        chart: {
          id: "basic-bar",
        },
      },
      barChartSeries: [
        {
          name: "series-1",
          data: [60, 40, 15, 80, 29, 70, 50, 82, 43, 64],
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
        colors: ["#1aaf04", "#3889fa", "#fabe19", "#d50b0b"],
      },
      series: [
        {
          name: "Green",
          data: [100, 100, 100, 100],
        },
        {
          name: "Blue",
          data: [70, 70, 70, 70],
        },
        {
          name: "Yellow",
          data: [40, 40, 40, 40],
        },
        {
          name: "Red",
          data: [10, 10, 10, 10],
        },
      ],
      xaxis: {
        type: "numeric",
      },
    };
    this.handleDarkModeClick = this.handleDarkModeClick.bind(this);
    this.handleCloseOrderModal = this.handleCloseOrderModal.bind(this);
    this.openOrderModal = this.openOrderModal.bind(this);
  }

  handleDarkModeClick() {
    const { isDarkMode, setIsDarkMode } = this.props;
    setIsDarkMode(!isDarkMode);
    this.setState({ isDarkModeChecked: !this.state.isDarkModeChecked });
  }
  handleCloseOrderModal() {
    this.setState({ isOrderModalOpen: false });
  }
  openOrderModal() {
    this.setState({ isOrderModalOpen: true });
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
      isOrderModalOpen,
      ordersQty,
    } = this.state;

    return (
      <>
        <Dialog
          open={isOrderModalOpen}
          onClose={this.handleCloseOrderModal}
          classes={{ paper: classes.dialogRoot }}
        >
          <IconButton
            className={classes.closeBtn}
            onClick={this.handleCloseOrderModal}
          >
            <Close />
          </IconButton>
          <DialogContent>
            <Typography variant="h6">New orders:{ordersQty}</Typography>
          </DialogContent>
        </Dialog>
        <Grid container spacing={1} className={classes.grid}>
          <Grid item xs={12} sm={4} md={2}>
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
                <Grid item style={{ height: 86 }}>
                  <Tooltip title={isDarkMode ? "Light mode" : "Dark mode"}>
                    <Switch
                      color="secondary"
                      checked={isDarkModeChecked}
                      onChange={this.handleDarkModeClick}
                    />
                  </Tooltip>
                </Grid>
                <Grid item style={{ height: 86 }}>
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
              </Grid>
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                className={classes.smallSwitchCard}
              >
                <Grid item>
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

                <Grid item>
                  <Tooltip title={isDarkMode ? "Light mode" : "Dark mode"}>
                    <Switch
                      color="secondary"
                      checked={isDarkModeChecked}
                      onChange={this.handleDarkModeClick}
                    />
                  </Tooltip>
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4} md={5}>
            <Card
              className={classes.paper}
              elevation={1}
              classes={{ root: isDarkMode && classes.cardRootDark }}
            >
              <Grid container>
                <Grid item xs={10} sm={10} md={10}>
                  <img
                    src={smartBin1}
                    className={classes.smartBinImg}
                    alt="smart bin"
                  />
                </Grid>
                <Grid item xs={2} sm={2} md={2}>
                  <br />
                  <div
                    className={classes.badge}
                    style={{
                      backgroundColor: isSmartbinMaintenance
                        ? "#06ba0387"
                        : "#f82a2aa3",
                    }}
                  >
                    <BuildOutlined className={classes.icon} />
                  </div>
                  <br />
                  <div
                    className={classes.badge}
                    style={{
                      backgroundColor: isSmartbinOk ? "#06ba0387" : "#f82a2aa3",
                    }}
                  >
                    {isSmartbinOk ? (
                      <CheckOutlined className={classes.icon} />
                    ) : (
                      <CloseOutlined className={classes.icon} />
                    )}
                  </div>
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4} md={5}>
            <Paper
              className={classes.paper}
              elevation={1}
              classes={{ root: isDarkMode && classes.cardRootDark }}
            >
              <Grid container item style={{ padding: 26 }}>
                <Grid item xs={10} sm={10} md={10}>
                  <SmartLabel />
                </Grid>
                <Grid item xs={2} sm={2} md={2}>
                  <Tooltip title="Manual Order">
                    <IconButton className={classes.iconButton}>
                      <ShoppingCartOutlined />
                    </IconButton>
                  </Tooltip>
                  <br />
                  <Switch color="secondary" />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
        <Grid container spacing={1} className={classes.grid}>
          <Grid item xs={12} sm={6} md={6}>
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
          <Grid item xs={12} sm={6} md={6}>
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
                    height="200"
                  />
                </div>
              </div>
            </Paper>
          </Grid>
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
