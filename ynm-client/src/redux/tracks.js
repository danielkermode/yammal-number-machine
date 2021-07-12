import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { apiUrl } from '../api'

const tracksSlice = createSlice({
  name: 'tracks',
  initialState: { list: [] },
  reducers: {
    setTracks (state, action) {
      const { tracks } = action.payload
      state.list = tracks
    }
  }
})

export const { setTracks } = tracksSlice.actions

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
      return { ...track, trackNumber: TRACK_ORDER.findIndex(name => name === track.name) }
    })
    console.log(orderedTracks)

    orderedTracks.sort((a, b) => {
      return a.trackNumber - b.trackNumber
    })

    dispatch(setTracks({ tracks: orderedTracks }))
  } catch (err) {
    console.error(err)
    window.alert(err.message)
  }
}

export default tracksSlice.reducer
