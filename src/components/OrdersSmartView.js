import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CardHeader from "@material-ui/core/CardHeader";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Apps from "@material-ui/icons/Apps";
import List from "@material-ui/icons/List";
import Fullscreen from "@material-ui/icons/Fullscreen";
import { IconButton } from "@material-ui/core";
import TileWidget from "./TileWidget";
import TableView from "./TableView";


const styles = (theme) => ({
  title: {
    margin: `${theme.spacing(3)}px 0 ${theme.spacing(2)}px`,
    color: theme.palette.protectedTitle,
    textAlign: "center",
    fontSize: "1.2em",
  },
  avatar: {
    width: 80,
    height: 80,
    // marginLeft:'35%',
    marginBottom: "10%",
  },
  activeBtn:{
    backgroundColor: '#bee6fdbd'
  },
  cardRootDark:{
    backgroundColor: '#242424'
  }, 
  cardTitleDark:{
    color: '#ffffff'
  },
  darkIcon:{
    color: '#ffffff'

  }
});

class OrdersSmartView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTileView: false,
      isTableView: true,
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

  handleFullWidthClick() {
    this.props.setFullWidth(false,!this.props.isOrdersFullWidth,false)

  }

  render() {
    const { classes ,isOrdersFullWidth,assets,isDarkMode} = this.props;
    const { isTileView, isTableView } = this.state;

   

    return (
      <Card classes={{root: isDarkMode && classes.cardRootDark}}>
        <CardHeader
        classes={{title: isDarkMode && classes.cardTitleDark}}
          action={
            <>
              <IconButton onClick={this.handleClickTileView} className={isTileView && classes.activeBtn}>
                <Apps className={isDarkMode && classes.darkIcon} />
              </IconButton>
              <IconButton onClick={this.handleClickTableView} className={isTableView && classes.activeBtn}>
                <List className={isDarkMode && classes.darkIcon} />
              </IconButton>
              <IconButton onClick={this.handleFullWidthClick} className={isOrdersFullWidth && classes.activeBtn}>
                <Fullscreen className={isDarkMode && classes.darkIcon} />
              </IconButton>
            </>
          }
          title="ORDERS"
        />
        <CardContent>
          {isTileView && <TileWidget assets={assets} isDarkMode={isDarkMode} />}
          {isTableView && <TableView assets={assets} isDarkMode={isDarkMode} />}
        </CardContent>
      </Card>
    );
  }
}
OrdersSmartView.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  assets: PropTypes.array.isRequired,
  isDarkMode: PropTypes.bool.isRequired,
  isOrdersFullWidth: PropTypes.bool.isRequired,
  setFullWidth: PropTypes.func.isRequired,
  
};
export default withStyles(styles)(OrdersSmartView);
