import React from 'react'
import {
  BrowserRouter as Router
} from 'react-router-dom'

import routes from './routes'
import Nav from './components/Nav'
import Header from './components/Header'

export default function App () {
  return (
    <Router>
      <Header />
      <Nav />
      {routes()}
    </Router>
  )
}
