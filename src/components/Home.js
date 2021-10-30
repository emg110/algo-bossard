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
import { toDataURL } from "qrcode";
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
import OracleSmartView from "./OracleSmartView.js";
import SupplySmartView from "./SupplySmartView.js";
import SmartLabel from "./SmartLabel.js";
import algosdk from "algosdk";
import MyAlgoConnect from "@randlabs/myalgo-connect";
import { store } from 'react-notifications-component';


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
    height: '100%'
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
    borderRadius: "35%",
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
      wallet: null,
      walletDataURL: null,
      walletUri: null,
      ordersQty: 0,
      smartbinGeneralStatus: "green",
      isSmartbinOk: false,
      isContinuousReplenishment: false,
      isSmartbinMaintenance: true,
      isOracleFullWidth: false,
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

    this.fetchWalletInfo = this.fetchWalletInfo.bind(this);
    this.myAlgoConnect = this.myAlgoConnect.bind(this);
    this.checkAssetOptIn = this.checkAssetOptIn.bind(this);
    this.assetOptIn = this.assetOptIn.bind(this);

    this.waitForConfirmation = this.waitForConfirmation.bind(this);


  }
  checkAssetOptIn(wallet, asset) {
    const self = this;
    let isOptIn = false;
    const url = `https://testnet.algoexplorerapi.io/idx2/v2/transactions?asset-id=${asset}&tx-type=axfer&address=${wallet}`;
    window
      .fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          if (data.transactions) {
            data.transactions.forEach((trx) => {
              if (trx["asset-transfer-transaction"]) {
                if (
                  trx.sender === trx["asset-transfer-transaction"].receiver &&
                  trx["asset-transfer-transaction"].amount === 0
                ) {
                  isOptIn = true;
                }
              }
            });
          }
        }
        return isOptIn;
      })
      .catch((error) => {
        console.error("Error:", error);
        return false;
      });
  }
  async waitForConfirmation(algodClient, txId) {
    let response = await algodClient.status().do();
    let lastround = response["last-round"];
    while (true) {
      const pendingInfo = await algodClient
        .pendingTransactionInformation(txId)
        .do();
      if (
        pendingInfo["confirmed-round"] !== null &&
        pendingInfo["confirmed-round"] > 0
      ) {
        console.log(
          "Transaction " +
          txId +
          " confirmed in round " +
          pendingInfo["confirmed-round"]
        );
        break;
      }
      lastround++;
      await algodClient.statusAfterBlock(lastround).do();
    }
  }
  async assetOptIn(wallet, role) {
    const tokens = {
      supplier: [
        ["RIT", "29186874"],
        ["SUP", "29186667"],
        ["GOO", "29187737"],
      ],
      retailer: [
        ["CER", "29187037"],
        ["RIT", "29186874"],
        ["SUP", "29186667"],
        ["POS", "29187343"],
        ["PRO", "29187472"],
        ["GOO", "29187737"],
      ],
      consumer: [
        ["RIT", "29186874"],
        ["PRO", "29187472"],
        ["CER", "29187037"],
      ],
    };
    const algodClient = new algosdk.Algodv2(
      "",
      "https://api.testnet.algoexplorer.io",
      ""
    );
    let roleTokens = tokens[`${role.toLowerCase()}`];
    //console.log("Tokens are: ", tokens);
    //console.log("Role is: ", role);
    store.addNotification({
      title: "Opting in...",
      message: "Now opting into token utilities for role: " + role,
      type: 'info',
      insert: 'bottom',
      container: 'bottom-left',
      animationIn: ['animated', 'fadeIn'],
      animationOut: ['animated', 'fadeOut'],
      dismiss: {
        duration: 2000,
        onScreen: false,
        pauseOnHover: true,
        showIcon: true,
        waitForAnimation: false,
      },
    });
    //console.log("Role tokens are: ", roleTokens);
    let params = await algodClient.getTransactionParams().do();
    params.fee = 1000;
    params.flatFee = true;
    let sender = wallet;
    let recipient = sender;
    let revocationTarget = undefined;
    let closeRemainderTo = undefined;
    let amount = 0;
    let note = algosdk.encodeObj(
      JSON.stringify({
        system: "ALGOBOSSARD",
        date: `${new Date()}`,
      })
    );

    let opttxnGroup = [];
    for (let i = 0; i < roleTokens.length; i++) {
      console.log(role, roleTokens[i]);
      /* let txn = await algosdk.makeAssetTransferTxnWithSuggestedParams(sender, recipient, closeRemainderTo, revocationTarget,
        amount, note, token[1], params); */
      let txn = {
        ...params,

        type: "axfer",
        assetIndex: Number(roleTokens[i][1]),
        from: sender,
        to: recipient,
        amount: amount,
        note: note,
        closeRemainderTo: undefined,
        revocationTarget: undefined,

      };
      /*  let txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
        suggestedParams: {
            ...params,
        },
        
        type: 'axfer',
        assetIndex: 12400859,
        from: sender,
        to: recipient,
        amount: amount,
        note: note
    }) */

      /* let txn = algosdk.makeAssetTransferTxnWithSuggestedParams(
        sender,
        recipient,
        closeRemainderTo,
        revocationTarget,
        amount,
        note,
        Number(roleTokens[i][1]),
        params
      ); */
      //console.log("TXN:", txn);

      opttxnGroup.push(txn);
    }
    //console.log("going to assign group id:", opttxnGroup);
    const groupID = await algosdk.computeGroupID(opttxnGroup)
    for (let i = 0; i < opttxnGroup.length; i++) opttxnGroup[i].group = groupID;
    //await algosdk.assignGroupID(opttxnGroup);

    //console.log("After assigned group id:", opttxnGroup);
    /* const groupID = algosdk.computeGroupID(opttxnGroup)
for (let i = 0; i < opttxnGroup.length; i++) {opttxnGroup[i].group = groupID}; */
    //await algosdk.assignGroupID(opttxnGroup);

    let rawSignedTxnGroup = await this.myAlgoWallet.signTransaction(
      opttxnGroup
    );
    //console.log('SIGNED TXN:', rawSignedTxnGroup)
    let sigendTrxArray = [];
    await rawSignedTxnGroup.forEach((txn) => {
      sigendTrxArray.push(txn.blob);
    });
    //console.log("SIGNED TXN GROUP:", sigendTrxArray);
    let sentTxn = await algodClient.sendRawTransaction(sigendTrxArray).do();
    let txId = sentTxn.txId;
    //console.log("SENT TXN GROUP:", sentTxn);
    store.addNotification({
      title: "Waiting for transaction...",
      message: "Now waiting for Opti-in transaction response from Algorand... ",
      type: 'info',
      insert: 'bottom',
      container: 'bottom-left',
      animationIn: ['animated', 'fadeIn'],
      animationOut: ['animated', 'fadeOut'],
      dismiss: {
        duration: 2000,
        onScreen: false,
        pauseOnHover: true,
        showIcon: true,
        waitForAnimation: false,
      },
    });
    await this.waitForConfirmation(algodClient, txId);
    store.addNotification({
      title: "Welcome to Algo Bossard",
      message: "Done! Thank you for registering in Algo Bossard!",
      type: 'info',
      insert: 'bottom',
      container: 'bottom-left',
      animationIn: ['animated', 'fadeIn'],
      animationOut: ['animated', 'fadeOut'],
      dismiss: {
        duration: 2000,
        onScreen: false,
        pauseOnHover: true,
        showIcon: true,
        waitForAnimation: false,
      },
    });
    //await algodClient.pendingTransactionInformation(txId).do();
    //console.log(`You have opted in to all BST tokens!`);
  }
  generateWalletQRCode() {
    let {
      wallet,
      label,
      inverse,
      version,
      margin,
      errorLevel,
      lightColor,
      darkColor,
    } = this.state;
    const errorCorrectionLevel = errorLevel;
    const color = { light: lightColor, dark: darkColor };

    const opts = {
      inverse,
      version,
      margin,
      errorCorrectionLevel,
      color,
    };
    let alrorandURI = "";

    alrorandURI = `algorand://${wallet}?label=${label}`;

    const self = this;
    opts.mode = "Auto";
    toDataURL(alrorandURI, opts)
      .then((res) => {
        self.setState({ walletDataURL: res[0], walletUri: res[1] });
      })
      .catch((err) => {
        console.error(err);
      });
  }
  handleRegister() {
    const { role } = this.state;
    this.setState({ startRegister: true });

  }
  async myAlgoConnect() {
    try {
      this.myAlgoWallet = new MyAlgoConnect();
      const accounts = await this.myAlgoWallet.connect({
        shouldSelectOneAccount: true,
      });
      store.addNotification({
        title: "Connected!",
        message: "You have connected ALGO BOSSARD to MYAlgo wallet!",
        type: 'info',
        insert: 'bottom',
        container: 'bottom-left',
        animationIn: ['animated', 'fadeIn'],
        animationOut: ['animated', 'fadeOut'],
        dismiss: {
          duration: 2000,
          onScreen: false,
          pauseOnHover: true,
          showIcon: true,
          waitForAnimation: false,
        },
      });
      return accounts[0].address;
    } catch (err) {
      console.error(err);
    }
  }

  fetchWalletInfo() {
    const { wallet } = this.state;
    const self = this;
    const url = `https://testnet.algoexplorerapi.io/v2/accounts/${wallet}`;
    const urlTrx = `https://testnet.algoexplorerapi.io/idx2/v2/accounts/${wallet}/transactions?limit=10`;
    window
      .fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          if (data.address === wallet) {
            self.setState({
              assetsHeld: data.assets,
              assetsCreated: data["created-assets"],
              balance: data.amount / 1000000,
              heldAssetsBalance: data.assets.length,
              createdAssetsBalance: data["created-assets"].length,
            });
          }
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    window
      .fetch(urlTrx, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          if (data.transactions) {
            self.setState({
              trxPayment: data.transactions.filter(
                (trx) => !!trx["payment-transaction"]
              ),
              trxTransfer: data.transactions.filter(
                (trx) => !!trx["asset-transfer-transaction"]
              ),
            });
          }
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
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
    const { classes, isDarkMode, isContinuousReplenishment } = this.props;
    const {
      smartbinGeneralStatus,
      isSmartbinOk,
      isSmartbinMaintenance,
      isTxnsFullWidth,
      isOracleFullWidth,
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
          <Grid item xs={12} sm={3} md={2}>
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

                {/* <Grid item>
                  <Tooltip title={isDarkMode ? "Light mode" : "Dark mode"}>
                    <Switch
                      color="secondary"
                      checked={isDarkModeChecked}
                      onChange={this.handleDarkModeClick}
                    />
                  </Tooltip>
                </Grid> */}
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4} md={5}>
            <Card
              className={classes.paper}
              style={{ verticalAlign: 'middle' }}
              elevation={1}
              classes={{ root: isDarkMode && classes.cardRootDark }}
            >
              <Grid style={{ verticalAlign: 'middle' }} container>
                <Grid style={{ verticalAlign: 'middle' }} item xs={10} sm={10} md={10}>
                  <img
                    src={smartBin1}
                    className={classes.smartBinImg}
                    alt="smart bin"
                  />
                </Grid>
                <Grid style={{ verticalAlign: 'middle' }} item xs={2} sm={2} md={2}>
                  <br />
                  <div className={classes.badge} style={{ backgroundColor: isSmartbinMaintenance ? '#06ba0387' : "#f82a2aa3" }}>

                    <BuildOutlined className={classes.icon} />
                  </div>
                  <br />
                  <div className={classes.badge} style={{ backgroundColor: isSmartbinOk ? '#06ba0387' : "#f82a2aa3" }}>
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
                  <Tooltip title="Configure SmartBin">
                    <IconButton className={classes.iconButton}>
                      <BuildOutlined />
                    </IconButton>
                  </Tooltip>
                  <br />
                  <Tooltip title="Manual Order">
                    <IconButton className={classes.iconButton}>
                      <ShoppingCartOutlined />
                    </IconButton>
                  </Tooltip>
                  <br />
                  <br />
                  <Switch color="secondary" title={isContinuousReplenishment ? "Turn ON Continuous Replenishment" : "Turn ON Continuous Replenishment"} />
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
            xs={isOracleFullWidth ? 12 : 12}
            sm={isOracleFullWidth ? 12 : 3}
            md={isOracleFullWidth ? 12 : 3}
          >
            <OracleSmartView
              assets={allAssets}
              isDarkMode={isDarkMode}
              isOracleFullWidth={isOracleFullWidth}
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
            sm={isOrdersFullWidth ? 12 : 3}
            md={isOrdersFullWidth ? 12 : 3}
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
            sm={isSupplyFullWidth ? 12 : 3}
            md={isSupplyFullWidth ? 12 : 3}
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
          <Grid
            item
            xs={isTxnsFullWidth ? 12 : 12}
            sm={isTxnsFullWidth ? 12 : 3}
            md={isTxnsFullWidth ? 12 : 3}
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
