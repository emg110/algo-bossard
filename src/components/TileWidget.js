import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Avatar from "@material-ui/core/Avatar";
import CardHeader from "@material-ui/core/CardHeader";
import nextId from "react-id-generator";

const styles = (theme) => ({
  card: {
    margin: "auto",
    // marginTop: theme.spacing(5),
    // marginBottom: theme.spacing(3),
    border: "1px solid #333",
    padding: 0,
    height: "100%",
    width: "100%",
  },
  darkCard: {
    margin: "auto",
    // marginTop: theme.spacing(5),
    // marginBottom: theme.spacing(3),
    border: "1px solid #333",
    padding: 0,
    height: "100%",
    width: "100%",
    backgroundColor: "#333131",
    color: "#ffffff",
  },
  avatar: {
    width: 50,
    height: 50,
    marginLeft: "5%",
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
});

class TileWiget extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { classes, assets, isDarkMode } = this.props;
    const {} = this.state;

    return (
      <Grid container spacing={2}>
        {assets.map((asset) => (
          <Grid
            key={nextId()}
            item
            xs={12}
            sm={6}
            md={6}
            style={{ display: "flex" }}
          >
            <Card className={isDarkMode ? classes.darkCard : classes.card}>
              <CardHeader
                action={
                  <Avatar
                    className={classes.avatar}
                    src={asset.qrcode}
                  />
                }
              />
              <CardContent className={classes.classContentRoot}>
                <div
                  className={classes.dataDiv}
                  // style={{ height: asset.description.length < 100 && 158 }}
                >
                  <Typography className={classes.dataTitle}>TXN ID:</Typography>
                  <Typography className={classes.subTitle}>
                    
                    {asset.txnId}
                  </Typography>
                  <br />
                  <Typography className={classes.dataTitle}>URL:</Typography>
                  <Typography className={classes.subTitle}>
                  <Link href={asset.url}>{asset.url}</Link>
                  </Typography>
                  <Typography className={classes.dataTitle}>Amount:</Typography>
                  <Typography className={classes.subTitle}>
                  {asset.amount}
                  </Typography>
                
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  }
}
TileWiget.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  assets: PropTypes.array.isRequired,
  isDarkMode: PropTypes.bool.isRequired,
};
export default withStyles(styles)(TileWiget);
