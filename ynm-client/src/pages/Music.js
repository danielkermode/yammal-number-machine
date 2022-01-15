import React, { useEffect } from 'react'
import { Box, Icon } from '@chakra-ui/react'
import { connect } from 'react-redux'
import { getTracks } from '../redux/tracks'
import { FaPlay, FaPause } from 'react-icons/fa'

const mapDispatch = { getTracks }

function Music (props) {
  const { getTracks, tracks, audioPlayer, trackPlaying } = props

  useEffect(() => {
    getTracks()
  }, [getTracks])

  return (
    <Box style={{ color: 'white' }}>
      THE NUMBER MACHINE
      <Box overflowY='scroll' style={{ width: '35%' }}>
        {tracks && tracks.map((track, i) => {
          const isTrackPlaying = trackPlaying === i
          return (
            <Box key={i}>
              <Icon
                as={isTrackPlaying ? FaPause : FaPlay} onClick={() => {
                  if (audioPlayer) {
                    if (isTrackPlaying) {
                      audioPlayer.pause()
                    } else {
                      audioPlayer.playByIndex(i)
                      audioPlayer.play()
                    }
                  }
                }}
              />
              {track.name}

              {track.streams}
            </Box>
          )
        })}
      </Box>

    </Box>
  )
}

export default connect(state => ({ tracks: state.tracks.list, trackPlaying: state.tracks.trackPlaying }), mapDispatch)(Music)
