import React, { useEffect } from 'react'
import { Box, Text } from '@chakra-ui/react'
import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'
import { connect } from 'react-redux'
import { getTracks, setTrack, incrementTrackStreams } from '../redux/tracks'

const mapDispatch = { getTracks, incrementTrackStreams, setTrack }

function Music (props) {
  const { getTracks, incrementTrackStreams, tracks, setTrack } = props
  useEffect(() => {
    getTracks()
  }, [getTracks])
  return (
    <Box>
      Listen to the number machine:
      {tracks.map((track, i) => {
        return (
          <Box key={i}>
            <Text>{track.name}</Text>
            <Text>Streams: {track.streams}</Text>
            <AudioPlayer
              src={track.uri}
              listenInterval={15000}
              onListen={e => {
                if (!track.hasListened && track.hasStarted) {
                  incrementTrackStreams(track.id)
                } else if (!track.hasStarted) {
                  setTrack({ track: { ...track, hasStarted: true } })
                }
              }}
            />
          </Box>
        )
      })}

    </Box>
  )
}

export default connect(state => ({ tracks: state.tracks.list }), mapDispatch)(Music)
