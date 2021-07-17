import React from 'react'
import {
  Switch,
  Route
} from 'react-router-dom'

import Home from './pages/Home'
import Music from './pages/Music'
import About from './pages/About'
// import Authenticate from './pages/Authenticate'
// import Enjoyer from './pages/Enjoyer'
import NotFound from './pages/NotFound'
import { connect } from 'react-redux'

function Routes (props) {
  return (
    <Switch>
      <Route exact path='/music'>
        <Music />
      </Route>
      <Route exact path='/about'>
        <About />
      </Route>
      {/* <Route exact path='/tokens'>
        {props.loggedIn ? <Enjoyer /> : <Authenticate />}
      </Route> */}
      <Route exact path='/'>
        <Home />
      </Route>
      <Route component={NotFound} />
    </Switch>
  )
}

export default connect(state => ({ loggedIn: state.auth.loggedIn }))(Routes)
