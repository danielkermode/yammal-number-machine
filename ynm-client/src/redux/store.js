import { configureStore, combineReducers } from '@reduxjs/toolkit'
import auth from './auth'
import tracks from './tracks'

const reducer = combineReducers({
  auth,
  tracks
})

export default configureStore({
  reducer
})
