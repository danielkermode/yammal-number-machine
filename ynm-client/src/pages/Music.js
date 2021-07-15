import React, { useEffect, useState } from 'react'
import { Box, Icon } from '@chakra-ui/react'
import { connect } from 'react-redux'
import { getTracks, setTrack, incrementTrackStreams } from '../redux/tracks'
import { FaPlay, FaPause } from 'react-icons/fa'

import ReactJkMusicPlayer from 'react-jinke-music-player'
import 'react-jinke-music-player/assets/index.css'

const mapDispatch = { getTracks, incrementTrackStreams, setTrack }

function Music (props) {
  const { getTracks, incrementTrackStreams, tracks, setTrack } = props

  const [trackPlaying, setTrackPlaying] = useState(null)
  const [trackProgress, setTrackProgress] = useState(null)
  const [audioPlayer, setAudioPlayer] = useState(null)

  useEffect(() => {
    getTracks()
  }, [getTracks])

  return (
    <Box>
      Listen to the number machine:
      <Box overflow='scroll'>
        {tracks && tracks.map((track, i) => {
          const isTrackPlaying = trackPlaying === i
          return (
            <Box key={i}>
              {track.name}
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
              {track.streams}
            </Box>
          )
        })}
      </Box>
      {tracks.length
        ? <ReactJkMusicPlayer
            glassBg
            showReload={false}
            showMiniModeCover={false}
            showMediaSession
            showThemeSwitch={false}
            remove={false}
            mode='full'
            theme='auto'
            autoPlay={false}
            audioLists={tracks.map(track => {
              return {
                name: track.name,
                musicSrc: track.uri
              }
            })}
            onAudioProgress={info => {
              const listenedThreshold = trackProgress + 30
              const passedListenedThreshold = info.currentTime > listenedThreshold
              const currentTrack = tracks[info.playIndex]
              if (currentTrack && !currentTrack.hasListened && passedListenedThreshold) {
                const trackId = tracks[info.playIndex].id
                if (trackId) {
                  incrementTrackStreams(trackId)
                }
                setTrack({ track: { ...currentTrack, hasListened: true } })
              }
            }}
            getAudioInstance={audio => {
              setAudioPlayer(audio)
            }}
            onAudioPlay={info => {
              setTrackPlaying(info.playIndex)
              setTrackProgress(info.currentTime)
            }}
            onAudioSeeked={info => {
              setTrackProgress(info.currentTime)
            }}
            onAudioPause={() => {
              setTrackPlaying(null)
            }}
          />
        : <></>}

    </Box>
  )
}

export default connect(state => ({ tracks: state.tracks.list }), mapDispatch)(Music)
