import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import App from './App'
import './assets/css/App.css'
import './assets/css/index.css'
import './assets/css/material-dashboard-react.css'

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path='/' component={App} />
       <Redirect from='/*' to='/' />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
)

