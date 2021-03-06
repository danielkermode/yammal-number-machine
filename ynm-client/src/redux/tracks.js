import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { apiUrl } from '../api'

const tracksSlice = createSlice({
  name: 'tracks',
  initialState: { list: [], trackPlaying: null },
  reducers: {
    setTrackPlaying (state, action) {
      const { trackPlaying } = action.payload
      state.trackPlaying = trackPlaying
    },
    setTracks (state, action) {
      const { tracks } = action.payload
      state.list = tracks
    },
    setTrack (state, action) {
      const { track } = action.payload
      state.list = state.list.map(t => {
        if (t.id === track.id) {
          return {
            ...t,
            ...track
          }
        }

        return t
      })
    }
  }
})

export const { setTracks, setTrack, setTrackPlaying } = tracksSlice.actions

const TRACK_ORDER = [
  'the number machine',
  'won',
  'deux',
  'free',
  'for',
  'allen fiverson',
  'sex',
  'sven',
  'infinate',
  'nonagon',
  'ten',
  'elven conversation feat. Mikey\'s gas'
]

export const getTracks = () => async dispatch => {
  try {
    const resp = await axios({
      method: 'get',
      url: `${apiUrl}/tracks/list`
    })

    const tracks = resp.data

    const orderedTracks = tracks.map(track => {
      return { ...track, trackNumber: TRACK_ORDER.findIndex(name => name === track.name), hasListened: false }
    })

    orderedTracks.sort((a, b) => {
      return a.trackNumber - b.trackNumber
    })

    dispatch(setTracks({ tracks: orderedTracks }))
  } catch (err) {
    console.error(err)
    window.alert(err.message)
  }
}

export const incrementTrackStreams = trackId => async dispatch => {
  try {
    await axios({
      method: 'post',
      url: `${apiUrl}/tracks/increment/${trackId}`
    })

    dispatch(setTrack({ track: { hasListened: true } }))
  } catch (err) {
    console.error(err)
    window.alert(err.message)
  }
}

export const setAudioPlayer = (setAudioPlayerFunction, audio) => async () => {
  setAudioPlayerFunction(audio)
}

export default tracksSlice.reducer
