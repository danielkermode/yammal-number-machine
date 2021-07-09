/* eslint-disable react/jsx-closing-tag-location */
import React from 'react'
import {
  Box,
  Text,
  Button
} from '@chakra-ui/react'
import Register from '../components/Register'
import Login from '../components/Login'

function AuthenticatePage (props) {
  const [showLogin, setShowLogin] = React.useState(false)

  const toggleLogin = () => setShowLogin(!showLogin)
  const buttonText = showLogin ? 'Sign up' : 'Already have an account?'
  return (
    <Box mt={50}>
      <Button onClick={toggleLogin}>{buttonText}</Button>
      {showLogin
        ? <Box w='40%'>
          <Text>Log in</Text>
          <Login />
        </Box>
        : <Box w='40%'>
          <Text>Sign Up</Text>
          <Register />
        </Box>}
    </Box>
  )
}

export default AuthenticatePage
