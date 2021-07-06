import React from 'react'
import {
  Switch,
  Route
} from 'react-router-dom'

export default function App () {
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
