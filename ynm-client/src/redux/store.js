import { configureStore, combineReducers } from '@reduxjs/toolkit'
import auth from './auth'

const reducer = combineReducers({
  auth
})

export default configureStore({
  reducer
})
