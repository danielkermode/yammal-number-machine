import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { apiUrl } from '../api'

const authSlice = createSlice({
  name: 'auth',
  initialState: { error: null, enjoyer: null },
  reducers: {
    setUser (state, action) {
      const { user } = action.payload
      state.user = user
    },
    setError (state, action) {
      const { error } = action.payload
      state.error = error
    }
  }
})

export const { setError, setUser } = authSlice.actions

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

export const login = (
  email,
  password,
  history,
  type
) => async dispatch => {
  try {
    const resp = await axios({
      method: 'post',
      url: `${apiUrl}/${type}/login`,
      data: {
        email,
        password
      },
      withCredentials: true
    })
    const user = resp.data.user
    dispatch(setUser({ user }))
    const redirectUri = type === 'employers' ? `/${user.id}/jobs` : `admin/${user.id}/employers`
    history.push(redirectUri)
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

export const updateUserLogoImg = (id, formData) => async (dispatch, getState) => {
  try {
    const resp = await axios({
      method: 'post',
      url: `${apiUrl}/employers/${id}/image`,
      data: formData,
      headers: {
        'Content-type': 'multipart/form-data'
      },
      withCredentials: true
    })
    const user = resp.data.user
    const oldUser = getState().auth.user
    dispatch(setUser({ user: { ...oldUser, ...user } }))
  } catch (err) {
    if (err.response && err.response.status === 413) {
      window.alert('Logo image is too large. Max file size is 5mb.')
    } else if (err.response && err.response.data.message) {
      window.alert(err.response.data.message)
    } else {
      window.alert(err.toString())
    }
    dispatch(setError({ error: err.toString() }))
  }
}

export const updateUserPassword = (id, passwordData) => async (dispatch) => {
  try {
    const resp = await axios({
      method: 'post',
      url: `${apiUrl}/employers/${id}/password`,
      data: passwordData,
      withCredentials: true
    })
    if (resp.data.success) {
      window.alert('Password changed successfully.')
    }
  } catch (err) {
    console.log(err)
    // dispatch(setError({ error: err.toString() }))
  }
}

export const checkUser = (id, history, type = 'employers') => async (dispatch) => {
  try {
    const resp = await axios({
      method: 'get',
      url: `${apiUrl}/${type}/${id}`,
      withCredentials: true
    })
    const user = resp.data.user
    dispatch(setUser({ user }))
  } catch (err) {
    dispatch(setError({ error: err.toString() }))
    history.push(type === 'admins' ? '/admin' : '/auth')
  }
}

export default authSlice.reducer
