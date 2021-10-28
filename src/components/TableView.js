import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import Check from "@material-ui/icons/CheckCircleOutline";
import Close from "@material-ui/icons/HighlightOff";

const styles = (theme) => ({
  paper: {
    overflowX: "auto",
    marginRight: "auto",
    marginLeft: "auto",
    padding: "10px",
    margin: "10px",
    marginTop: "27px",
    "&::-webkit-scrollbar": {
      height: "5px",
    },
    "&::-webkit-scrollbar-track": {
      boxShadow: "inset 0 0 5px grey",
      borderRadius: "10px",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "#808080",
      borderRadius: "10px",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: "#808070",
    },
    scrollbarColor: "#808080",
    scrollbarWidth: "thin",
  },
  table: {
    margin: 40,
  },
  tableRoot: {
    [theme.breakpoints.down("xl")]: {
      width: "90%",
    },
    [theme.breakpoints.down("lg")]: {
      width: "92%",
    },
    [theme.breakpoints.down("md")]: {
      width: "94%",
    },
    [theme.breakpoints.down("sm")]: {
      width: "95%",
    },
    [theme.breakpoints.down("xs")]: {
      width: "96%",
    },
  },
  tableHeader: {
    paddingRight: 4,
    paddingLeft: 5,
    fontWeight: "bold",
  },
  closeIcon:{
    color:'#fce1e4'
  },
  checkIcon:{
    color:'#ddedea '
  },
  avatar: {
    width: 60,
    height: 60,
    // marginLeft:'35%',
    marginBottom: "10%",
  },
  selectTableCell: {
    width: 60,
  },
  tableCell: {
    width: 130,
    height: 40,
    paddingRight: 4,
    paddingLeft: 5,
  },
});

class TableView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAsset: {},
      selectedAssetId: "",
    };
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
  }

  handleCloseDialog() {
    const { setAssetModalOpen } = this.props;
    this.setState({
      isEditMode: false,
    });
    setAssetModalOpen(false);
  }

  render() {
    const { classes, assets } = this.props;
    const { selectedAsset } = this.state;

    return (
      <>
        <Paper className={classes.paper}>
          <Table
            className={classes.table}
            classes={{ root: classes.tableRoot }}
            size="small"
          >
            <TableHead>
              <TableRow>
              <TableCell align="left" className={classes.tableHeader}>
                  
                </TableCell>
                <TableCell align="left" className={classes.tableHeader}>
                  Id
                </TableCell>
                <TableCell align="left" className={classes.tableHeader}>
                  Name
                </TableCell>
                           
                <TableCell align="left" className={classes.tableHeader}>
                  Description
                </TableCell>
                
              </TableRow>
            </TableHead>
            <TableBody>
              {assets &&
                assets.map((asset) => (
                  <TableRow key={asset._id}> 
                  <TableCell align="left" className={classes.tableCell}>
                      <Avatar src={asset.avatar} />
                    </TableCell>
                  <TableCell align="left" className={classes.tableCell}>
                      {asset._id}
                    </TableCell>                   
                    <TableCell align="left" className={classes.tableCell}>
                     {asset.name}
                    </TableCell>
                    
                    <TableCell align="left" className={classes.tableCell}>
                      {asset.description}
                    </TableCell>
                    
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Paper>
      </>
    );
  }
}
TableView.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  assets: PropTypes.array.isRequired,
  
};
export default withStyles(styles)(TableView);
