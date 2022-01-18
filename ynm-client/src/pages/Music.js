import React, { useEffect } from 'react'
import MusicIcons from '../components/MusicIcons'
import { Box, Icon, Flex } from '@chakra-ui/react'
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
      <Flex>
        <Box style={{ width: '35%' }}>
          {tracks && tracks.map((track, i) => {
            const isTrackPlaying = trackPlaying === i
            return (
              <Box key={i}>
                <hr style={{ opacity: 0.3 }} />
                <Box m={1} mx={2} style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Box>
                    <Icon
                      as={isTrackPlaying ? FaPause : FaPlay}
                      onClick={() => {
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

                    <span style={{ marginLeft: 10 }}>{track.name}</span>
                  </Box>
                  <Box>
                    {track.streams}
                  </Box>
                </Box>
              </Box>
            )
          })}
          <hr style={{ opacity: 0.3 }} />
        </Box>
        <MusicIcons audioPlayer={audioPlayer} trackPlaying={trackPlaying} />
      </Flex>
    </Box>
  )
}

export default connect(state => ({ tracks: state.tracks.list, trackPlaying: state.tracks.trackPlaying }), mapDispatch)(Music)
