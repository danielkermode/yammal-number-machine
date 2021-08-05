import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getTracks, setTrack, incrementTrackStreams, setTrackPlaying } from '../redux/tracks'

import ReactJkMusicPlayer from 'react-jinke-music-player'
import 'react-jinke-music-player/assets/index.css'

const mapDispatch = { getTracks, incrementTrackStreams, setTrack, setTrackPlaying }

function Music (props) {
  const { getTracks, incrementTrackStreams, tracks, setTrack } = props
  const [trackProgress, setTrackProgress] = useState(null)

  useEffect(() => {
    getTracks()
  }, [getTracks])

  return (
    <>
      {tracks.length
        ? <ReactJkMusicPlayer
            glassBg
            showReload={false}
            showMiniModeCover={false}
            showMediaSession
            showThemeSwitch={false}
            remove={false}
            mode='full'
            theme='dark'
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
              props.setAudioPlayer && props.setAudioPlayer(audio)
            }}
            onAudioPlay={info => {
              props.setTrackPlaying({ trackPlaying: info.playIndex })
              setTrackProgress(info.currentTime)
            }}
            onAudioSeeked={info => {
              setTrackProgress(info.currentTime)
            }}
            onAudioPause={() => {
              props.setTrackPlaying({ trackPlaying: null })
            }}
          />
        : <></>}
    </>
  )
}

export default connect(state => ({ tracks: state.tracks.list }), mapDispatch)(Music)
