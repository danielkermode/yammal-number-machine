import React from 'react'
import {
  Switch,
  Route
} from 'react-router-dom'

import Home from './pages/Home'
import About from './pages/About'
import AuthenticatePage from './pages/Authenticate'
import NotFound from './pages/NotFound'

export default function Routes () {
  return (
    <Switch>
      <Route exact path='/about'>
        <About />
      </Route>
      <Route exact path='/tokens'>
        <AuthenticatePage />
      </Route>
      <Route exact path='/'>
        <Home />
      </Route>
      <Route component={NotFound} />
    </Switch>
  )
}
