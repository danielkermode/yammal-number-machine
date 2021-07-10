import React from 'react'
import { Box } from '@chakra-ui/react'
import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'

export default function Music () {
  return (
    <Box>
      This is all about Yammal!!
      <AudioPlayer
        autoPlay
        src='http://example.com/audio.mp3'
        onPlay={e => console.log('onPlay')}
      />
    </Box>
  )
}
