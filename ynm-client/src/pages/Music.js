import React, { useEffect, useRef } from 'react'
import { Box, Text } from '@chakra-ui/react'
import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'
import { connect } from 'react-redux'
import { getTracks, setTrack, incrementTrackStreams } from '../redux/tracks'

const mapDispatch = { getTracks, incrementTrackStreams, setTrack }

function playNextTrack (audioRefs, nextIndex, callPlay) {
  audioRefs.current.forEach((track, i) => {
    const { current } = track.audio
    if (!current.paused && i !== nextIndex) {
      current.pause()
      current.currentTime = 0
    }
  })

  if (callPlay) {
    const newTrack = audioRefs.current[nextIndex]
    if (newTrack) {
      const { current } = newTrack.audio
      current.currentTime = 0
      current.play()
    }
  }
}

function Music (props) {
  const { getTracks, incrementTrackStreams, tracks, setTrack } = props
  const audioRefs = useRef([])

  useEffect(() => {
    audioRefs.current = audioRefs.current.slice(0, tracks.length)
  }, [tracks])

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
              onPlay={e => {
                console.log('called')
                playNextTrack(audioRefs, i)
              }}
              onClickPrevious={e => {
                playNextTrack(audioRefs, i - 1, true)
              }}
              onClickNext={e => {
                playNextTrack(audioRefs, i + 1, true)
              }}
              showSkipControls
              showJumpControls={false}
              ref={a => {
                audioRefs.current[i] = a
              }}
              src={track.uri}
              listenInterval={15000}
              onListen={e => {
                if (!track.hasListened && track.hasStarted) {
                  incrementTrackStreams(track.id)
                } else if (!track.hasStarted) {
                  setTrack({ track: { ...track, hasStarted: true } })
                }
              }}
              onEnded={e => {
                playNextTrack(audioRefs, i + 1, true)
              }}
            />
          </Box>
        )
      })}

    </Box>
  )
}

export default connect(state => ({ tracks: state.tracks.list }), mapDispatch)(Music)
