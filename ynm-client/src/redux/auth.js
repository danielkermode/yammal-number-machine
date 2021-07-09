import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { apiUrl } from '../api'

const authSlice = createSlice({
  name: 'auth',
  initialState: { error: null, enjoyer: null },
  reducers: {
    setEnjoyer (state, action) {
      const { enjoyer } = action.payload
      state.enjoyer = enjoyer
    },
    setError (state, action) {
      const { error } = action.payload
      state.error = error
    }
  }
})

export const { setError, setEnjoyer } = authSlice.actions

export const register = registerDetails => async dispatch => {
  const resp = await axios({
    method: 'post',
    url: `${apiUrl}/enjoyers`,
    data: {
      enjoyername: registerDetails.name,
      password: registerDetails.password
    }
  })

  console.log(resp)
}

export const login = (loginDetails, history) => async dispatch => {
  try {
    const resp = await axios({
      method: 'post',
      url: `${apiUrl}/enjoyers/login`,
      data: {
        enjoyername: loginDetails.name,
        password: loginDetails.password
      },
      withCredentials: true
    })
    const getEnjoyerThunk = getEnjoyer(resp.data)
    await getEnjoyerThunk()
    history.push('/')
  } catch (err) {
    if (err.response && err.response.data.message) {
      window.alert(err.response.data.message)
    }
    dispatch(setError({ error: err.toString() }))
  }
}

export const logout = (history, type) => async dispatch => {
  try {
    const resp = await axios({
      method: 'post',
      url: `${apiUrl}/logout`,
      withCredentials: true
    })

    console.log(resp)

    dispatch(setEnjoyer({ enjoyer: null }))
    history.push(type === 'admins' ? '/admin' : '/auth')
  } catch (err) {
    dispatch(setError({ error: err.toString() }))
  }
}

export const getEnjoyer = id => async dispatch => {
  try {
    const resp = await axios({
      method: 'get',
      url: `${apiUrl}/enjoyers/${id}`,
      withCredentials: true
    })
    dispatch(setEnjoyer({ enjoyer: resp.data }))
  } catch (err) {
    dispatch(setError({ error: err.toString() }))
  }
}

export default authSlice.reducer
