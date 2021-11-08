import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles, styled } from "@material-ui/core/styles";
import bossardLogo from "../assets/images/logo.svg";
import bossard from "../assets/images/bossard_icon.png";
import algoBossardLogo from "../assets/images/algoBossard.png";
import {
  ShoppingCartOutlined,
  BuildOutlined,
  CheckOutlined,
  CloseOutlined,
  Close,
} from "@material-ui/icons";
import GroupWork from "@material-ui/icons/GroupWork";
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
  CardHeader,
  CardContent,
  CardFooter,
  IconButton,
  Tooltip,
  Button,
} from "@material-ui/core";
import TxnsSmartView from "./TxnsSmartView.js";
import OrdersSmartView from "./OrdersSmartView.js";
import OracleSmartView from "./OracleSmartView.js";
import SupplySmartView from "./SupplySmartView.js";
import SmartLabel from "./SmartLabel.js";
import algosdk from "algosdk";
import MyAlgoConnect from "@randlabs/myalgo-connect";
import { store } from "react-notifications-component";
import SmartContracts from "../SmartContracts"

const { appProg, escrowProg, clearProg } = SmartContracts;
const bstAssetId = "40299547";

const allAssets = [
  {
    _id: 12345678,
    description: "BOSSARD TEST DATA DESC",
    name: "Bossard-item1",
    avatar: "",
  },
  {
    _id: 26,
    description: "BOSSARD TEST DATA DESC2",
    name: "Bossard-item2",
    avatar: "",
  },
  {
    _id: 37,
    description: "BOSSARD TEST DATA DESC3",
    name: "Bossard item3",
    avatar: "",
  },
];

const styles = (theme) => ({
  blueStatus: {
    width: "40px",
    height: "40px",
    marginLeft: 14,
    borderRadius: "50%",
    border: "1px solid #9BE4FD",
    backgroundColor: "#2393F6",
    boxShadow: "0px 0px 18px #B1D7FC",
    display: "inline-block",
    [theme.breakpoints.down("xs")]: {
      position: "absolute",
      top: "55px",
      left: "30%",
      width: "30px",
      height: "30px",
    },
  },
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
    [theme.breakpoints.down("sm")]: {
      width: "76%",
      marginTop: 30,
    },
    [theme.breakpoints.down("xs")]: {
      width: "48%",
    },
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
      top: "63px",
      left: "30%",
      width: "30px",
      height: "30px",
    },
  },
  yellowStatus: {
    width: "40px",
    height: "40px",
    marginLeft: 14,
    borderRadius: "50%",
    border: "1px solid #f7f01d",
    backgroundColor: "#fac20a",
    boxShadow: "0px 0px 18px #fcfc27",
    display: "inline-block",
    [theme.breakpoints.down("xs")]: {
      position: "absolute",
      top: "55px",
      left: "30%",
      width: "30px",
      height: "30px",
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
      top: "55px",
      left: "30%",
      width: "30px",
      height: "30px",
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
    borderRadius: 10,
    backgroundColor: "#ffffff",
  },
  dialogRootDark: {
    borderRadius: 10,
    backgroundColor: "#242424",
  },
  closeBtn: {
    position: "absolute",
    right: 8,
    top: 8,
  },
  cardTitleDark: {
    color: "#ffffff",
    fontSize: "1em",
  },
  cardTitle: {
    color: "#000000",
    fontSize: "1em",
  },
  darkIcon: {
    color: "#ffffff",
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
    // display: "inline",
    width: 34,
  },
});


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wallet: "AMESZ5UX7ZJL5M6GYEHXM63OMFCPOJ23UXCQ6CVTI2HVX6WUELYIY262WI",
      walletSupplier: "LP6QRRBRDTDSP4HF7CSPWJV4AG4QWE437OYHGW7K5Y7DETKCSK5H3HCA7Q",
      walletDataURL: null,
      walletUri: null,
      escrowAddress: null,
      isConfiguring: false,
      appId: "42151131",
      description: "Hexalobular socket pan washer head machine screws-ecosyn-fix",
      expDate: "01.01.2035",
      prodName: "ST-42151131",
      orderQty: 0,
      orderNum: 0,
      supplyQty: 0,
      consumptionQty: 0,
      smartbinQty: 4000,
      smartbinQtyDefault: 4000,
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
      isSupplyModalOpen: false,
      isOracleViewOpen: false,
      isOrdersViewOpen: false,
      isSupplyViewOpen: false,
      isPaymentsViewOpen: false,
      barChartOptions: {
        chart: {
          id: "basic-bar",
          animations: {
            enabled: true,
            easing: "easeinout",
            speed: 800,
            animateGradually: {
              enabled: true,
              delay: 150,
            },
            dynamicAnimation: {
              enabled: true,
              speed: 350,
            },
          },
        },
        xaxis: {
          categories: [0],
        },
      },
      barChartSeries: [
        {
          name: "SmartBin Consumtion",
          data: [0],
        },
      ],
      crOptions: {
        chart: {
          id: "basic-area",
          animations: {
            enabled: true,
            easing: "easeinout",
            speed: 800,
            animateGradually: {
              enabled: true,
              delay: 150,
            },
            dynamicAnimation: {
              enabled: true,
              speed: 350,
            },
          },
        },
        legend: {
          show: true,
        },
        dataLabels: {
          enabled: false,
        },
        /* stroke: {
          curve: "stepline",
        }, */
        stacked: true,
        colors: ["#d50b0b", "#fabe19", "#3889fa", "#1aaf04", "#e08e0b"],
      },
      crSeries: [
        {
          name: "Red Status",
          data: [100, 100, 100, 100],
        },
        {
          name: "Yellow Status",
          data: [70, 70, 70, 70],
        },
        {
          name: "Blue Status",
          data: [40, 40, 40, 40],
        },
        {
          name: "Green Status",
          data: [20, 20, 20, 20],
        },
        {
          name: "Consumption",
          type: "line",
          data: [0],
        },
      ],
      xaxis: {
        type: "numeric",
      },
    };
    this.handleDarkModeClick = this.handleDarkModeClick.bind(this);
    this.handleCloseOrderModal = this.handleCloseOrderModal.bind(this);
    this.handleCloseSupplyModal = this.handleCloseSupplyModal.bind(this);
    this.openOrderModal = this.openOrderModal.bind(this);
    this.fetchWalletInfo = this.fetchWalletInfo.bind(this);
    this.myAlgoConnect = this.myAlgoConnect.bind(this);
    this.checkAssetOptIn = this.checkAssetOptIn.bind(this);
    this.assetOptIn = this.assetOptIn.bind(this);
    this.funEscrow = this.funEscrow.bind(this);
    this.register = this.register.bind(this);
    this.handleContinuousReplenishment =
      this.handleContinuousReplenishment.bind(this);
    this.continuousReplenishment = this.continuousReplenishment.bind(this);
    this.generateDapp = this.generateDapp.bind(this);
    this.compileProgram = this.compileProgram.bind(this);
    this.deleteApps = this.deleteApps.bind(this);
    this.openSupplyModal = this.openSupplyModal.bind(this);
    this.waitForConfirmation = this.waitForConfirmation.bind(this);
    this.consume = this.consume.bind(this);
  }

  openSupplyModal() {
    const that = this;
    let {
      smartbinQtyDefault,
      orderQty,
      consumptionQty,
      smartbinQty,
      isContinuousReplenishment,
      smartbinGeneralStatus,
    } = that.state;
    let supply = orderQty;

    if (supply === 0) {
      store.addNotification({
        title: "Error",
        message: "Supply of 0 is not allowed!",
        type: "danger",
        insert: "bottom",
        container: "bottom-left",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
          duration: 2000,
          onScreen: false,
          pauseOnHover: true,
          showIcon: true,
          waitForAnimation: false,
        },
      });
    } else {
      store.addNotification({
        title: "Supplying...",
        message: "Manually supplying in Qty: " + supply,
        type: "info",
        insert: "bottom",
        container: "bottom-left",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
          duration: 2000,
          onScreen: false,
          pauseOnHover: true,
          showIcon: true,
          waitForAnimation: false,
        },
      });
      this.setState({ isOrderModalOpen: true });
    }
  }

  openOrderModal() {
    const that = this;
    let {
      smartbinQtyDefault,
      orderQty,
      consumptionQty,
      smartbinQty,
      isContinuousReplenishment,
      smartbinGeneralStatus,
    } = that.state;
    let order = smartbinQtyDefault - smartbinQty;
    this.setState({ orderQty: order }, () => {
      let { orderQty } = that.state;
      if (Number(orderQty) === 0) {
        store.addNotification({
          title: "Error",
          message: "There is no need for replenishment, currently! The SmartBin contains: " + smartbinQty,
          type: "danger",
          insert: "bottom",
          container: "bottom-left",
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          dismiss: {
            duration: 2000,
            onScreen: false,
            pauseOnHover: true,
            showIcon: true,
            waitForAnimation: false,
          },
        });
      } else {
        store.addNotification({
          title: "Ordering...",
          message: "Manually ordering in Qty: " + orderQty,
          type: "info",
          insert: "bottom",
          container: "bottom-left",
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          dismiss: {
            duration: 2000,
            onScreen: false,
            pauseOnHover: true,
            showIcon: true,
            waitForAnimation: false,
          },
        });
        that.setState({ isOrderModalOpen: true });
      }
    });
  }

  consume() {
    const that = this;
    let {
      orderQty,
      consumptionQty,
      smartbinQty,
      isContinuousReplenishment,
      smartbinGeneralStatus,
    } = that.state;

    let data = that.state.barChartSeries[0].data;
    let crdata = that.state.crSeries[4].data;
    let categories = that.state.barChartOptions.xaxis.categories;
    let take = Math.floor(Math.random() * Number(100)) + 1;
    let remVal = Number(smartbinQty) - Number(take);
    if (remVal >= 3500) {
      smartbinGeneralStatus = "green";
    } else if (remVal >= 2000) {
      smartbinGeneralStatus = "blue";
    } else if (remVal >= 1000) {
      smartbinGeneralStatus = "yellow";
    } else if (remVal >= 500) {
      smartbinGeneralStatus = "red";
    }
    data.push(take);
    crdata.push(take);
    const newSeries = [];
    const newCrData = [];
    const newCategories = [];
    categories.map((item) => newCategories.push(item));
    crdata.map((item) => newCrData.push(item));
    newCategories.push(take);
    newSeries.push({
      name: "SmartBin Consumtion",
      data: data,
    });
    let crSeries0 = [];
    let crSeries1 = [];
    let crSeries2 = [];
    let crSeries3 = [];
    this.state.crSeries[0].data.map((item) => crSeries0.push(item));
    this.state.crSeries[1].data.map((item) => crSeries1.push(item));
    this.state.crSeries[2].data.map((item) => crSeries2.push(item));
    this.state.crSeries[3].data.map((item) => crSeries3.push(item));
    crSeries0.push(100);
    crSeries1.push(70);
    crSeries2.push(40);
    crSeries3.push(20);
    this.setState({
      consumptionQty: take,
      smartbinQty: remVal,
      smartbinGeneralStatus: smartbinGeneralStatus,
      barChartSeries: newSeries,
      barChartOptions: {
        chart: {
          id: "basic-bar",
          animations: {
            enabled: true,
            easing: "easeinout",
            speed: 800,
            animateGradually: {
              enabled: true,
              delay: 150,
            },
            dynamicAnimation: {
              enabled: true,
              speed: 350,
            },
          },
        },
        xaxis: {
          categories: newCategories,
        },
      },
      crSeries: [
        {
          name: "Red Status",
          data: crSeries0,
        },
        {
          name: "Yellow Status",
          data: crSeries1,
        },
        {
          name: "Blue Status",
          data: crSeries2,
        },
        {
          name: "Green Status",
          data: crSeries3,
        },
        {
          name: "Consumption",
          type: "line",
          data: newCrData,
        },
      ],
    });
  }

  continuousReplenishment(swt) {
    const that = this;
    let timeout = (Math.floor(Math.random() * 3.5) + 1) * 1000;
    let { isContinuousReplenishment } = that.state;
    if (swt && isContinuousReplenishment) {
      that.consume();
      setTimeout(() => {
        that.continuousReplenishment(true);
      }, timeout);
    }
  }

  handleContinuousReplenishment() {
    const that = this;
    this.setState(
      { isContinuousReplenishment: !this.state.isContinuousReplenishment },
      () => {
        if (that.state.isContinuousReplenishment) {
          that.continuousReplenishment(true);
        } else {
          that.continuousReplenishment(false);
        }
      }
    );
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

  async assetOptIn(wallet) {
    const algodClient = new algosdk.Algodv2(
      "",
      "https://api.testnet.algoexplorer.io",
      ""
    );

    store.addNotification({
      title: "Opting in...",
      message: "Now opting into Bossard Smart Token: BST! ",
      type: "info",
      insert: "bottom",
      container: "bottom-left",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: {
        duration: 2000,
        onScreen: false,
        pauseOnHover: true,
        showIcon: true,
        waitForAnimation: false,
      },
    });

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

    //let opttxnGroup = [];

    let txn = {
      ...params,

      type: "axfer",
      assetIndex: Number(bstAssetId),
      from: sender,
      to: recipient,
      amount: amount,
      note: note,
      closeRemainderTo: undefined,
      revocationTarget: undefined,
    };
    /* 
        const groupID = await algosdk.computeGroupID(opttxnGroup)
        for (let i = 0; i < opttxnGroup.length; i++) opttxnGroup[i].group = groupID;
        
     */

    let rawSignedTxn = await this.myAlgoWallet.signTransaction(txn);

    /* let sigendTrxArray = [];
    await rawSignedTxnGroup.forEach((txn) => {
      sigendTrxArray.push(txn.blob);
    }); */

    let sentTxn = await algodClient.sendRawTransaction(rawSignedTxn.blob).do();
    let txId = sentTxn.txId;

    store.addNotification({
      title: "Waiting for transaction...",
      message: "Now waiting for Opti-in transaction response from Algorand... ",
      type: "info",
      insert: "bottom",
      container: "bottom-left",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: {
        duration: 2000,
        onScreen: false,
        pauseOnHover: true,
        showIcon: true,
        waitForAnimation: false,
      },
    });
    await this.waitForConfirmation(algodClient, txId);
    window.localStorage.setItem('algo-bossard-optin', 'ok')
    store.addNotification({
      title: "Welcome to Algo Bossard",
      message: "Done! Thank you for registering in Algo Bossard!",
      type: "success",
      insert: "bottom",
      container: "bottom-left",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: {
        duration: 2000,
        onScreen: false,
        pauseOnHover: true,
        showIcon: true,
        waitForAnimation: false,
      },
    });
  }

  async funEscrow(wallet) {
    let escrowAddress = window.localStorage.getItem("algo-bossard-escrow-address");
    const algodClient = new algosdk.Algodv2(
      "",
      "https://api.testnet.algoexplorer.io",
      ""
    );

    store.addNotification({
      title: "Funding escrow account...",
      message: "Now funding SmartBin's escrow account: " + escrowAddress,
      type: "info",
      insert: "bottom",
      container: "bottom-left",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: {
        duration: 2000,
        onScreen: false,
        pauseOnHover: true,
        showIcon: true,
        waitForAnimation: false,
      },
    });

    let params = await algodClient.getTransactionParams().do();
    params.fee = 1000;
    params.flatFee = true;
    let sender = wallet;
    let recipient = escrowAddress;
    let revocationTarget = undefined;
    let closeRemainderTo = undefined;
    let amount = 2000000;
    let note = algosdk.encodeObj(
      JSON.stringify({
        system: "ALGOBOSSARD",
        date: `${new Date()}`,
      })
    );

    //let opttxnGroup = [];

    let txn = {
      ...params,

      type: "pay",
      from: sender,
      to: recipient,
      amount: amount,
      note: note,
      closeRemainderTo: undefined,
      revocationTarget: undefined,
    };

    let rawSignedTxn = await this.myAlgoWallet.signTransaction(txn);
    let sentTxn = await algodClient.sendRawTransaction(rawSignedTxn.blob).do();
    let txId = sentTxn.txId;

    store.addNotification({
      title: "Waiting for transaction...",
      message: "Now waiting for escrow fun transaction response from Algorand... ",
      type: "info",
      insert: "bottom",
      container: "bottom-left",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: {
        duration: 2000,
        onScreen: false,
        pauseOnHover: true,
        showIcon: true,
        waitForAnimation: false,
      },
    });
    await this.waitForConfirmation(algodClient, txId);
    window.localStorage.setItem('algo-bossard-fund', 'ok')
    store.addNotification({
      title: "Escrow funded!",
      message: `Done! SmartBin Escrow Account founded for: 2000 MicroAlgos`,
      type: "success",
      insert: "bottom",
      container: "bottom-left",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: {
        duration: 2000,
        onScreen: false,
        pauseOnHover: true,
        showIcon: true,
        waitForAnimation: false,
      },
    });
  }

  async deleteApps(wallet, appId) {
    const algodClient = new algosdk.Algodv2(
      "",
      "https://api.testnet.algoexplorer.io",
      ""
    );

    store.addNotification({
      title: "Deleting Apps...",
      message: "Now deleting previous apps:  " + appId,
      type: "info",
      insert: "bottom",
      container: "bottom-left",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: {
        duration: 2000,
        onScreen: false,
        pauseOnHover: true,
        showIcon: true,
        waitForAnimation: false,
      },
    });

    let params = await algodClient.getTransactionParams().do();
    params.fee = 1000;
    params.flatFee = true;
    let sender = wallet;
    let revocationTarget = undefined;
    let closeRemainderTo = undefined;

    let note = algosdk.encodeObj(
      JSON.stringify({
        system: "ALGOBOSSARD",
        date: `${new Date()}`,
      })
    );
    let opttxnGroup = []
    let appIndexArray = [Number(appId)];
    appIndexArray.forEach((appIndex) => {
      let txn = {
        ...params,
        type: "appl",
        appIndex: appIndex,
        from: sender,
        appOnComplete: 5,
        note: note,
        closeRemainderTo: undefined,
        revocationTarget: undefined,
      };
      opttxnGroup.push(txn)
    })
    const groupID = await algosdk.computeGroupID(opttxnGroup)
    for (let i = 0; i < opttxnGroup.length; i++) opttxnGroup[i].group = groupID;




    let rawSignedTxnGroup = await this.myAlgoWallet.signTransaction(opttxnGroup);

    let sigendTrxArray = [];
    await rawSignedTxnGroup.forEach((txn) => {
      sigendTrxArray.push(txn.blob);
    });
    let sentTxn = await algodClient.sendRawTransaction(sigendTrxArray).do();
    let txId = sentTxn.txId;

    store.addNotification({
      title: "Waiting for transaction...",
      message: "Now waiting for delete apps: " + appIndexArray.toString(),
      type: "info",
      insert: "bottom",
      container: "bottom-left",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
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
      title: "dApp deleted!",
      message: "Done! dApp deleted with IDs:" + appIndexArray.toString(),
      type: "success",
      insert: "bottom",
      container: "bottom-left",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: {
        duration: 2000,
        onScreen: false,
        pauseOnHover: true,
        showIcon: true,
        waitForAnimation: false,
      },
    });
    window.localStorage.removeItem("algo-bossard-dapp-txId");
    window.localStorage.removeItem("algo-bossard-dapp-id");
    window.localStorage.removeItem("algo-bossard-escrow-address");

  }

  async compileProgram(client, programSource) {
    let compileResponse = await client.compile(programSource).do();
    console.log("Compiled OK!")
    let compiledBytes = new Uint8Array(
      Buffer.from(compileResponse.result, "base64")
    );
    return compiledBytes;
  }

  async generateDapp(wallet) {
    const algodClient = new algosdk.Algodv2(
      "",
      "https://api.testnet.algoexplorer.io",
      ""
    );
    let thisAppProg = appProg.replaceAll('AMESZ5UX7ZJL5M6GYEHXM63OMFCPOJ23UXCQ6CVTI2HVX6WUELYIY262WI', wallet);
    store.addNotification({
      title: "Generating Dapp...",
      message: "Now Generating Algo Bossard dApp! ",
      type: "info",
      insert: "bottom",
      container: "bottom-left",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: {
        duration: 4000,
        onScreen: false,
        pauseOnHover: true,
        showIcon: true,
        waitForAnimation: false,
      },
    });

    let params = await algodClient.getTransactionParams().do();
    params.fee = 1000;
    params.flatFee = true;
    let sender = wallet;

    const approvalProgram = await this.compileProgram(algodClient, thisAppProg);
    console.log('dApp have been compiled!')
    const clearProgram = await this.compileProgram(algodClient, clearProg);

    let onComplete = algosdk.OnApplicationComplete.NoOpOC;
    const txn = algosdk.makeApplicationCreateTxnFromObject({
      suggestedParams: {
        ...params,
      },
      from: sender,
      numLocalByteSlices: 2,
      numGlobalByteSlices: 2,
      numLocalInts: 2,
      numGlobalInts: 2,
      approvalProgram: approvalProgram,
      clearProgram: clearProgram,
      onComplete: onComplete,
    });

    let txId = txn.txID().toString();
    let rawSignedTxn = await this.myAlgoWallet.signTransaction(txn.toByte());
    store.addNotification({
      title: "TXN Signed!",
      message: "Signed transaction  to Algorand with txID:" + txId,
      type: "success",
      insert: "bottom",
      container: "bottom-left",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: {
        duration: 4000,
        onScreen: false,
        pauseOnHover: true,
        showIcon: true,
        waitForAnimation: false,
      },
    });
    console.log("Signed transaction with txID: %s", txId);
    window.localStorage.setItem('algo-bossard-dapp-txId', txId)
    console.log("Raw signed TXN: %s", rawSignedTxn);

    let sentTxn = await algodClient.sendRawTransaction(rawSignedTxn.blob).do();
    txId = sentTxn.txId;
    store.addNotification({
      title: "TXN Sent!",
      message: "Sent dApp generation transaction to Algorand with txID:" + txId,
      type: "success",
      insert: "bottom",
      container: "bottom-left",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: {
        duration: 4000,
        onScreen: false,
        pauseOnHover: true,
        showIcon: true,
        waitForAnimation: false,
      },
    });
    console.log("Sent transaction with txID: %s", txId);

    await this.waitForConfirmation(algodClient, txId);

    // display results
    let transactionResponse = await algodClient
      .pendingTransactionInformation(txId)
      .do();
    let appId = transactionResponse["application-index"];
    console.log("Created new app-id: ", appId);
    window.localStorage.setItem('algo-bossard-dapp-id', appId)
    this.setState({ appId });
    store.addNotification({
      title: "dApp Generated!",
      message: "Created new dApp: " + appId + " on Algorand!",
      type: "success",
      insert: "bottom",
      container: "bottom-left",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: {
        duration: 4000,
        onScreen: false,
        pauseOnHover: true,
        showIcon: true,
        waitForAnimation: false,
      },
    });
  }

  async generateEscrow(dappId) {
    const algodClient = new algosdk.Algodv2(
      "",
      "https://api.testnet.algoexplorer.io",
      ""
    );

    store.addNotification({
      title: "Escrow Generation...",
      message: "Now Generating Algo Bossard SmartBin Escrow! ",
      type: "info",
      insert: "bottom",
      container: "bottom-left",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: {
        duration: 4000,
        onScreen: false,
        pauseOnHover: true,
        showIcon: true,
        waitForAnimation: false,
      },
    });

    let escrowProgSnd = escrowProg.replace("algoBossardAppId", Number(dappId));
    const escrowProgram = await this.compileProgram(algodClient, escrowProgSnd);

    console.log('Escrow have been compiled!')
    const lsig = new algosdk.LogicSigAccount(escrowProgram);
    const escrowAcc = lsig.address();
    window.localStorage.setItem('algo-bossard-escrow-address', escrowAcc)
    this.setState({ escrowAddress: escrowAcc });

    store.addNotification({
      title: "Escrow Generated!",
      message: "SmartBin Escrow Account created with address: " + escrowAcc,
      type: "info",
      insert: "bottom",
      container: "bottom-left",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: {
        duration: 4000,
        onScreen: false,
        pauseOnHover: true,
        showIcon: true,
        waitForAnimation: false,
      },
    });
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

  async myAlgoConnect() {
    try {
      this.myAlgoWallet = new MyAlgoConnect();
      const accounts = await this.myAlgoWallet.connect({
        shouldSelectOneAccount: false,
      });
      this.setState({ wallet: accounts[0].address });
      store.addNotification({
        title: "Connected!",
        message:
          "You have connected to MYAlgo wallet with: " + accounts[0].address,
        type: "info",
        insert: "bottom",
        container: "bottom-left",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
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

  async register() {
    this.setState({ isConfiguring: true });
    const wallet = await this.myAlgoConnect();
    this.setState({ wallet: wallet });
    window.localStorage.setItem("algo-bossard-wallet", wallet);
    let inOptin = window.localStorage.getItem("algo-bossard-optin");
    if (inOptin !== 'ok') {
      await this.assetOptIn(wallet);
    }


    let dappId = window.localStorage.getItem("algo-bossard-dapp-id");
    if (dappId) {
      await this.deleteApps(wallet, dappId)
    }
    await this.generateDapp(wallet);
    await this.generateEscrow(dappId);
    await this.funEscrow(wallet);
    
    window.localStorage.setItem("algo-bossard-configured", "ok");
    this.setState({ isConfiguring: false });
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

  handleCloseSupplyModal() {
    this.setState({ isSupplyModalOpen: false });
  }

  render() {
    let isConfigured = window.localStorage.getItem("algo-bossard-configured");
    const { classes, isDarkMode } = this.props;
    const {
      smartbinGeneralStatus,
      isSmartbinOk,
      isSmartbinMaintenance,
      isContinuousReplenishment,
      isTxnsFullWidth,
      isOracleFullWidth,
      isOrdersFullWidth,
      isSupplyFullWidth,
      isDarkModeChecked,
      isOrderModalOpen,
      description,
      expDate,
      prodName,
      orderQty,
      consumptionQty,
      smartbinQty,
      supplySty,
      isSupplyModalOpen,
      isConfiguring,
    } = this.state;

    return (
      <>
        <Dialog
          open={isOrderModalOpen}
          onClose={this.handleCloseOrderModal}
          classes={{
            paper: isDarkMode ? classes.dialogRootDark : classes.dialogRoot,
          }}
        >
          <IconButton
            className={classes.closeBtn}
            onClick={this.handleCloseOrderModal}
          >
            <Close />
          </IconButton>
          <DialogContent>
            <Card classes={{ root: isDarkMode && classes.cardRootDark }}>
              <CardHeader
                classes={{
                  title: isDarkMode ? classes.cardTitleDark : classes.cardTitle,
                }}
                title="SmartBin"
                avatar={
                  <img
                    src={algoBossardLogo}
                    className={classes.algoBossardImg}
                    alt="algo bossard"
                  />
                }
              />
              <CardContent>
                <Typography variant="h6" style={{ color: isDarkMode ? '#ffffff' : '#000000' }}>New Order: </Typography>
                <Typography variant="h6" style={{ color: isDarkMode ? '#ffffff' : '#000000' }}>Qty: {orderQty}</Typography>
                <Button style={{ color: isDarkMode ? '#ffffff' : '#000000' }}>OK</Button>
                <Button style={{ color: isDarkMode ? '#ffffff' : '#000000' }}>CANCEL</Button>
              </CardContent>
            </Card>
          </DialogContent>
        </Dialog>
        <Dialog
          open={isSupplyModalOpen}
          onClose={this.handleCloseSupplyModal}
          classes={{
            paper: isDarkMode ? classes.dialogRootDark : classes.dialogRoot,
          }}
        >
          <IconButton
            className={classes.closeBtn}
            onClick={this.handleCloseSupplyModal}
          >
            <Close />
          </IconButton>
          <DialogContent>
            <CardHeader
              classes={{
                title: isDarkMode ? classes.cardTitleDark : classes.cardTitle,
              }}
              title="SmartBin"
            >
              <Typography variant="h6">
                <img
                  src={algoBossardLogo}
                  className={classes.algoBossardImg}
                  alt="algo bossard"
                />
                SmartBin
              </Typography>
            </CardHeader>
            <Card classes={{ root: isDarkMode && classes.cardRootDark }}>
              <CardContent>
                <Typography variant="h6" style={{ color: isDarkMode ? '#ffffff' : '#000000' }}>New Supply: </Typography>
                <Typography variant="h6" style={{ color: isDarkMode ? '#ffffff' : '#000000' }}>Qty: {supplySty}</Typography>
                <Button style={{ color: isDarkMode ? '#ffffff' : '#000000' }}>OK</Button>
                <Button style={{ color: isDarkMode ? '#ffffff' : '#000000' }}>CANCEL</Button>
              </CardContent>
            </Card>
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
                style={{ padding: 26 }}
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                className={classes.switchCard}
              >
                <Grid item style={{ height: 86 }}>
                  <Tooltip title={isDarkMode ? "Light mode" : "Dark mode"}>
                    <Switch
                      checked={isDarkModeChecked}
                      onChange={this.handleDarkModeClick}
                    />
                  </Tooltip>
                </Grid>
                <Grid item style={{ height: 86 }}>
                  <Tooltip title="SmartBin status">
                    <span
                      className={
                        smartbinGeneralStatus === "green"
                          ? classes.greenStatus
                          : smartbinGeneralStatus === "yellow"
                            ? classes.yellowStatus
                            : smartbinGeneralStatus === "blue"
                              ? classes.blueStatus
                              : classes.redStatus
                      }
                    ></span>
                  </Tooltip>
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
                          : smartbinGeneralStatus === "blue"
                            ? classes.blueStatus
                            : classes.redStatus
                    }
                  ></span>
                </Grid>

                <Grid item>
                  <Tooltip title={isDarkMode ? "Light mode" : "Dark mode"}>
                    <Switch
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
              <Grid style={{ padding: 26 }} container>
                <Grid item xs={10} sm={10} md={10}>
                  <Tooltip title="SmartBin">
                    <img
                      src={
                        smartbinGeneralStatus === "green"
                          ? smartBin1
                          : smartbinGeneralStatus === "yellow"
                            ? smartBin3
                            : smartbinGeneralStatus === "blue"
                              ? smartBin2
                              : smartBin4
                      }
                      className={classes.smartBinImg}
                      alt="smart bin"
                    />
                  </Tooltip>
                </Grid>
                <Grid item xs={2} sm={2} md={2}>
                  <br />
                  <Tooltip title="Configuration status">
                    <div
                      className={classes.badge}
                      style={{
                        backgroundColor:
                          isConfigured === "ok" ? "#06ba0387" : "#f82a2aa3",
                      }}
                    >
                      <BuildOutlined className={classes.icon} />
                    </div>
                  </Tooltip>
                  <br />
                  <Tooltip title="Continus replenishment status">
                    <div
                      className={classes.badge}
                      style={{
                        backgroundColor: isContinuousReplenishment
                          ? "#06ba0387"
                          : "#f82a2aa3",
                      }}
                    >
                      {isContinuousReplenishment ? (
                        <CheckOutlined className={classes.icon} />
                      ) : (
                        <CloseOutlined className={classes.icon} />
                      )}
                    </div>
                  </Tooltip>
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={12} sm={5} md={5}>
            <Paper
              className={classes.paper}
              elevation={1}
              classes={{ root: isDarkMode && classes.cardRootDark }}
            >
              <Grid container item style={{ padding: 26 }}>
                <Grid item xs={10} sm={10} md={10}>
                  <SmartLabel
                    orderQty={orderQty}
                    smartbinQty={smartbinQty}
                    consumptionQty={consumptionQty}
                    description={description}
                    expDate={expDate}
                    prodName={prodName}
                    isDarkMode={isDarkMode}
                  />
                </Grid>
                <Grid item xs={2} sm={2} md={2}>
                  {isConfigured !== "ok" && !isConfiguring && (
                    <Tooltip title="Configure SmartBin">
                      <IconButton
                        onClick={this.register}
                        className={classes.iconButton}
                      >
                        <BuildOutlined />
                      </IconButton>
                    </Tooltip>
                  )}
                  {isConfigured === "ok" && (
                    <Tooltip title="Manual Randomized Consumption">
                      <IconButton
                        onClick={this.consume}
                        className={classes.iconButton}
                      >
                        <GroupWork />
                      </IconButton>
                    </Tooltip>
                  )}
                  {isConfigured !== "ok" && !isConfiguring && (
                    <Typography variant="body2">
                      ↑ Please configure SmartBin first!
                    </Typography>
                  )}
                  <br />
                  {isConfigured !== "ok" && !isConfiguring && (
                    <Typography style={{ color: "darkred" }} variant="subtitle">
                      You need MyAlgo Wallet
                    </Typography>
                  )}
                  {isConfigured !== "ok" && isConfiguring && (
                    <div id="spinning-circle">
                      <img src={bossard} />
                    </div>
                  )}
                  {isConfigured === "ok" && (
                    <Tooltip title="Manual Order">
                      <IconButton
                        onClick={this.openOrderModal}
                        className={classes.iconButton}
                      >
                        <ShoppingCartOutlined />
                      </IconButton>
                    </Tooltip>
                  )}
                  {isConfigured === "ok" && (
                    <>
                      <br />
                      <br />
                      <Tooltip title={!isContinuousReplenishment
                        ? "Turn ON Continuous Replenishment (Randomized)"
                        : "Turn OFF Continuous Replenishment"}>
                        <Switch
                          onChange={this.handleContinuousReplenishment}
                          color="secondary"
                        />
                      </Tooltip>
                    </>
                  )}
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
        <Grid container spacing={1} className={classes.grid}>
          <Grid item xs={12} sm={6} md={6}>
            <Paper
              styel={{ padding: 10 }}
              className={classes.paper}
              classes={{ root: isDarkMode && classes.cardRootDark }}
            >
              <div className="row">
                <div className="mixed-chart">
                  <Chart
                    options={this.state.crOptions}
                    series={this.state.crSeries}
                    type="area"
                    height="200"
                  />
                </div>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Paper
              styel={{ padding: 10 }}
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
