import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import CardHeader from "@material-ui/core/CardHeader";
import nextId from "react-id-generator";

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
  activeBtn: {
    backgroundColor: "#bee6fdbd",
  },
});

class TileWiget extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { classes, assets } = this.props;
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
            <Card className={classes.card}>
            <CardHeader action={<Avatar
                      className={classes.avatar}
                      // src={asset.avatar ? asset.avatar : avatarSample}
                    />} />
              <CardContent className={classes.classContentRoot}>
                
                <div
                  className={classes.dataDiv}
                  // style={{ height: asset.description.length < 100 && 158 }}
                >
                  <Typography className={classes.dataTitle}>ID:</Typography>
                  <Typography className={classes.subTitle}>
                    {" "}
                    {asset._id}
                  </Typography>
                  <br />
                  <Typography className={classes.dataTitle}>Title:</Typography>
                  <Typography className={classes.subTitle}>
                    {" "}
                    {asset.name}
                  </Typography>
                  <br />
                  <Typography className={classes.dataTitle}>
                    Description:
                  </Typography>
                  <Typography className={classes.subTitle}>
                    {" "}
                    {asset.description}
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
};
export default withStyles(styles)(TileWiget);
