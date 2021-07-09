import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { apiUrl } from '../api'

const authSlice = createSlice({
  name: 'auth',
  initialState: { enjoyer: null },
  reducers: {
    setEnjoyer (state, action) {
      const { enjoyer } = action.payload
      state.enjoyer = enjoyer
    }
  }
})

export const { setError, setEnjoyer } = authSlice.actions

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
    const getEnjoyerThunk = getEnjoyer(response.data)
    await getEnjoyerThunk(dispatch)
    history.push('/')
  } catch (err) {
    console.error(err)
    window.alert(err.message)
  }
}

export const logout = () => async dispatch => {
  try {
    const response = await axios({
      method: 'post',
      url: `${apiUrl}/logout`,
      withCredentials: true
    })

    console.log(response)
    dispatch(setEnjoyer({ enjoyer: null }))
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
    window.alert(err.message)
  }
}

export default authSlice.reducer
