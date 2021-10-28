import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CardHeader from "@material-ui/core/CardHeader";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Apps from "@material-ui/icons/Apps";
import List from "@material-ui/icons/List";
import { IconButton } from "@material-ui/core";
import TileWidget from "./TileWidget";
import TableView from "./TableView";


const styles = (theme) => ({
  card: theme.mixins.gutters({
    margin: "auto",
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(3),
    border: "1px solid #333",
    padding: 0,
  }),
  title: {
    margin: `${theme.spacing(3)}px 0 ${theme.spacing(2)}px`,
    color: theme.palette.protectedTitle,
    textAlign: "center",
    fontSize: "1.2em",
  },
  tablePaperRoot: {
    display: "flex",
    marginTop: theme.spacing.unit * 3,
    overflowX: "hide",
    width: "100%",
  },
  table: {
    minWidth: 340,
  },
  tableCell: {
    paddingRight: 4,
    paddingLeft: 5,
  },
  tableHeader: {
    paddingRight: 4,
    paddingLeft: 5,
    fontWeight: "bold",
  },
  avatar: {
    width: 80,
    height: 80,
    // marginLeft:'35%',
    marginBottom: "10%",
  },
  dataDiv: {
    width: "100%",
    textAlign: "left",
  },
  dataTitle: {
    fontSize: "0.8em",
    fontWeight: "bold",
    display: "inline",
  },
  subTitle: {
    fontSize: "0.7em",
    display: "inline",
    wordBreak: "break-word",
  },
  classContentRoot: {
    minHeight: 200,
    padding: 0,
    paddingTop: 20,
  },
  activeBtn:{
    backgroundColor: '#bee6fdbd'
  }
});

class OrdersSmartView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTileView: true,
      isTableView: false,
      isFullWidth: false,
    };
    this.handleClickTableView = this.handleClickTableView.bind(this);
    this.handleClickTileView = this.handleClickTileView.bind(this);
    this.handleFullWidthClick = this.handleFullWidthClick.bind(this);
  }

  handleClickTableView() {
    this.setState({
      isTableView: true,
      isTileView: false,
    });
  }

  handleClickTileView() {
    this.setState({
      isTableView: false,
      isTileView: true,
    });
  }

  handleFullWidthClick(id) {
    this.setState({
      isFullWidth: !this.state.isFullWidth,
      index: id,
    });
  }

  render() {
    const { classes ,assets} = this.props;
    const { isTileView, isTableView, isFullWidth, index } = this.state;

   

    return (
      <Card>
        <CardHeader
          action={
            <>
              <IconButton onClick={this.handleClickTileView} className={isTileView && classes.activeBtn}>
                <Apps />
              </IconButton>
              <IconButton onClick={this.handleClickTableView} className={isTableView && classes.activeBtn}>
                <List />
              </IconButton>
            </>
          }
          title="ORDERS"
        />
        <CardContent>
          {isTileView && <TileWidget assets={assets} />}
          {isTableView && <TableView assets={assets} />}
        </CardContent>
      </Card>
    );
  }
}
OrdersSmartView.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  assets: PropTypes.array.isRequired,
  
};
export default withStyles(styles)(OrdersSmartView);
