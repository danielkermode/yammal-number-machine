import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { apiUrl } from '../api'

const authSlice = createSlice({
  name: 'auth',
  initialState: { enjoyer: null, loggedIn: !!window.localStorage.getItem('ynmLoggedIn') },
  reducers: {
    setEnjoyer (state, action) {
      const { enjoyer } = action.payload
      state.enjoyer = enjoyer
    },
    setLoggedIn (state, action) {
      const loggedIn = action.payload
      state.loggedIn = loggedIn
    }
  }
})

export const { setLoggedIn, setEnjoyer } = authSlice.actions

export const register = (registerDetails, history) => async dispatch => {
  const enjoyerData = {
    enjoyername: registerDetails.name,
    password: registerDetails.password
  }
  try {
    await axios({
      method: 'post',
      url: `${apiUrl}/enjoyers`,
      data: enjoyerData
    })

    const loginThunk = login(enjoyerData, history)
    await loginThunk(dispatch)
  } catch (err) {
    console.error(err)
    window.alert(err.message)
  }
}

export const login = (loginDetails, history) => async dispatch => {
  try {
    const response = await axios({
      method: 'post',
      url: `${apiUrl}/enjoyers/login`,
      data: {
        enjoyername: loginDetails.name,
        password: loginDetails.password
      },
      withCredentials: true
    })
    if (response.data) {
      dispatch(setLoggedIn(true))
      window.localStorage.setItem('ynmLoggedIn', true)
      window.localStorage.setItem('ynmUuid', response.data)

      const getEnjoyerThunk = getEnjoyer(response.data)
      await getEnjoyerThunk(dispatch)
    } else {
      throw new Error('No response data.')
    }
  } catch (err) {
    console.error(err)
    window.alert(err.message)
  }
}

export const logout = () => async dispatch => {
  try {
    window.localStorage.removeItem('ynmLoggedIn')
    window.localStorage.removeItem('ynmUuid')
    dispatch(setEnjoyer({ enjoyer: null }))
    dispatch(setLoggedIn(false))
    const response = await axios({
      method: 'get',
      url: `${apiUrl}/enjoyers/logout`,
      withCredentials: true
    })
    console.log(response)
  } catch (err) {
    console.error(err)
    window.alert(err.message)
  }
}

export const getEnjoyer = id => async dispatch => {
  try {
    const response = await axios({
      method: 'get',
      url: `${apiUrl}/enjoyers/${id}`,
      withCredentials: true
    })
    dispatch(setEnjoyer({ enjoyer: response.data }))
  } catch (err) {
    console.error(err)

    await logout()(dispatch)

    // window.alert(err.message)
  }
}

export default authSlice.reducer
