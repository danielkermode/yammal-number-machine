import React, { useState } from 'react'
import {
  BrowserRouter as Router
} from 'react-router-dom'

import Routes from './routes'
import Nav from './components/Nav'
import MusicPlayer from './components/MusicPlayer'

export default function App () {
  const [audioPlayer, setAudioPlayer] = useState(null)

  return (
    <Router>
      <MusicPlayer setAudioPlayer={setAudioPlayer} />
      <Nav />
      <Routes audioPlayer={audioPlayer} />
    </Router>
  )
}
