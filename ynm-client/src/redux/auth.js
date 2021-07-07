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

export const { setError, setUser } = authSlice.actions

export const register = registerDetails => async dispatch => {
  // const resp = await axios({
  //   method: 'post',
  //   url: `${apiUrl}/enjoyers`,
  //   data: {
  //     enjoyername: registerDetails.name,
  //     password: registerDetails.password
  //   }
  // })

  login(registerDetails)(dispatch)
}

export const login = loginDetails => async dispatch => {
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
    console.log(resp)

    checkUser(resp.data)(dispatch)
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

    dispatch(setUser({ user: null }))
    history.push(type === 'admins' ? '/admin' : '/auth')
  } catch (err) {
    dispatch(setError({ error: err.toString() }))
  }
}

export const updateUser = (userDetails) => async (dispatch) => {
  try {
    const resp = await axios({
      method: 'post',
      url: `${apiUrl}/employers/${userDetails.id}`,
      data: userDetails,
      withCredentials: true
    })
    const user = resp.data.user
    dispatch(setUser({ user }))
  } catch (err) {
    if (err.response && err.response.data.message) {
      window.alert(err.response.data.message)
    } else {
      window.alert(err.toString())
    }

    dispatch(setError({ error: err.toString() }))
  }
}

export const checkUser = id => async dispatch => {
  try {
    const resp = await axios({
      method: 'get',
      url: `${apiUrl}/enjoyers/${id}`,
      withCredentials: true
    })
    console.log(resp)
    // dispatch(setUser({ user }))
  } catch (err) {
    dispatch(setError({ error: err.toString() }))
  }
}

export default authSlice.reducer
