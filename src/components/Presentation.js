/*eslint-disable*/
import React, { Component } from "react";
import Carousel from "react-elastic-carousel";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import img2 from "../assets/images/presentation/algobossard01.svg";
import img3 from "../assets/images/presentation/algobossard02.svg";
import img4 from "../assets/images/presentation/algobossard03.svg";
import img5 from "../assets/images/presentation/algobossard04.svg";
import img6 from "../assets/images/presentation/algobossard05.svg";
import img7 from "../assets/images/presentation/algobossard06.svg";

const styles = (theme) => ({});

class Presentation extends Component {
  render() {
    return (
      <Carousel itemsToShow={1}>
        <Card>
          <img src={img2} style={{ width: "100%" }} />
        </Card>
        <Card>
          <img src={img3} style={{ width: "100%" }} />
        </Card>
        <Card>
          <img src={img4} style={{ width: "100%" }} />
        </Card>
        <Card>
          <img src={img5} style={{ width: "100%" }} />
        </Card>
        <Card>
          <img src={img6} style={{ width: "100%" }} />
        </Card>
        <Card>
          <img src={img7} style={{ width: "100%" }} />
        </Card>
      </Carousel>
    );
  }
}

Presentation.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};
export default withStyles(styles)(Presentation);
