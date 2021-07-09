import React from 'react'
import {
  Box,
  Flex,
  Text
} from '@chakra-ui/react'
import Register from '../components/Register'
import Login from '../components/Login'

function AuthenticatePage (props) {
  return (
    <Flex mt={50}>
      <Box w='40%'>
        <Text>Sign Up</Text>
        <Register />
      </Box>
      <Box w='40%' ml={50}>
        <Text>Log in</Text>
        <Login />
      </Box>
    </Flex>
  )
}

export default AuthenticatePage
