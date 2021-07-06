import React from 'react'
import {
  useHistory
} from 'react-router-dom'

import { Center, Text, Circle } from '@chakra-ui/react'

export default function Nav () {
  const history = useHistory()
  return (
    <Center>
      <Circle
        mx={10}
        cursor='pointer'
        w='30%' bg='tomato' color='white' onClick={() => {
          history.push('/')
        }}
      >
        <Text>Home</Text>
      </Circle>

      <Circle
        cursor='pointer'
        w='30%' bg='tomato' color='white' onClick={() => {
          history.push('/about')
        }}
      > <Text>About</Text>
      </Circle>

      <Circle
        mx={10}
        cursor='pointer'
        w='30%' bg='tomato' color='white' onClick={() => {
          history.push('/tokens')
        }}
      > <Text>Tokens</Text>
      </Circle>
    </Center>
  )
}
