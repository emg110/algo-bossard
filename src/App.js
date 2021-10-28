import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'

import bossardLogo from './assets/images/logo.svg'
import algoBossardLogo from './assets/images/algoBossard.png'
import algorandLogo from './assets/images/algorand_full_logo_white.png'
import Home from "./components/Home.js"


const styles = (theme) => ({
  algorandImage: {
    width: '128px',
  },
  bossardImg:{
    width:'11%',
    float: 'right',
    marginRight: '3%',
    marginTop: '63px',
  },
  algoBossardImg:{
    width:'5%',
    float: 'left',
    marginLeft: '2%',
    marginTop: '33px',
    display: 'inline'
  },
  algorandImg:{
    width:'150px',
    float: 'right',
    marginRight: '3%',
    marginTop: '53px',
    display: 'inline'
  }

})

class App extends Component {
  constructor() {
    super()
    this.state = {
      showGen: false,
      showAsset: false,
      showTxn: false,
      showTxnOffline: false,
      showPayment: false,
      isDescEnabled: false,
      showNft: false,
    }
  }
  /* componenetDidMount () {
    window.MyVars = {
      QRCode: require('./components/qrcode-react.js'),
    };
} */

  render() {
    const { classes } = this.props
    return (
      <div className={classes.app}>
        <div className='App-header'>
          <img src={algoBossardLogo} className={classes.algoBossardImg} alt="algo bossard" />                   
          <h1 className='App-name'>Algo Bossard</h1>
          <img src={bossardLogo} className={classes.bossardImg} alt="bossard" />                   
          <img src={algorandLogo} className={classes.algorandImg} alt="algorand" />                   
        </div>
        <Home />
       


        </div>

    )
  }
}

App.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired
}

export default withStyles(styles)(App)
