import React from 'react'
import {
  Switch,
  Route
} from 'react-router-dom'

import Home from './pages/Home'
import About from './pages/About'
import Register from './pages/Register'

export default function Routes () {
  return (
    <Switch>
      <Route path='/about'>
        <About />
      </Route>
      <Route path='/tokens'>
        <Register />
      </Route>
      <Route path='/'>
        <Home />
      </Route>
    </Switch>
  )
}
