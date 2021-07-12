import React, { useEffect } from 'react'
import { Box, Text } from '@chakra-ui/react'
import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'
import { connect } from 'react-redux'
import { getTracks } from '../redux/tracks'

const mapDispatch = { getTracks }

function Music (props) {
  const { getTracks } = props
  useEffect(() => {
    getTracks()
  }, [getTracks])
  return (
    <Box>
      Listen to the number machine:
      {props.tracks.map((track, i) => {
        return (
          <Box key={i}>
            <Text>{track.name}</Text>
            <AudioPlayer
              src={track.uri}
              onPlay={e => console.log('onPlay')}
            />
          </Box>
        )
      })}

    </Box>
  )
}

export default connect(state => ({ tracks: state.tracks.list }), mapDispatch)(Music)
