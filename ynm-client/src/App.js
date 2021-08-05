import React, { useState } from 'react'
import {
  BrowserRouter as Router
} from 'react-router-dom'

import Routes from './routes'
import Nav from './components/Nav'
import Header from './components/Header'
import MusicPlayer from './components/MusicPlayer'

export default function App () {
  const [audioPlayer, setAudioPlayer] = useState(null)

  return (
    <Router>
      <Header />
      <MusicPlayer setAudioPlayer={setAudioPlayer} />
      <Nav />
      <Routes audioPlayer={audioPlayer} />
    </Router>
  )
}
