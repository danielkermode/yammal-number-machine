import React, { useState } from 'react'
import {
  useHistory
} from 'react-router-dom'

import { Flex, Text } from '@chakra-ui/react'

export default function Nav () {
  const history = useHistory()
  const [rerender, setRerender] = useState(false)
  const isHome = window.location.pathname === '/'
  const isMusic = window.location.pathname === '/music' || window.location.pathname === '/music/'
  return (
    <Flex>
      <Text
        as={isHome && 'u'}
        m={5}
        textUnderlineOffset={5}
        style={{ fontFamily: 'manofa', fontWeight: 'bold', fontSize: 12 }}
        cursor='pointer'
        color={isHome ? 'white' : '#d3d3d3'}
        _hover={{
          color: 'white'
        }}
        onClick={() => {
          setRerender(!rerender)
          history.push('/')
        }}
      >YAMMAL
      </Text>
      <Text
        as={isMusic && 'u'}
        m={5}
        textUnderlineOffset={5}
        style={{ fontFamily: 'manofa', fontWeight: 'bold', fontSize: 12 }}
        cursor='pointer'
        color={isMusic ? 'white' : '#d3d3d3'}
        _hover={{
          color: 'white'
        }}
        onClick={() => {
          setRerender(!rerender)
          history.push('/music')
        }}
      >LISTEN
      </Text>

      {/* <Circle
        mx={10}
        cursor='pointer'
        w='20%' bg='tomato' color='white' onClick={() => {
          history.push('/tokens')
        }}
      > <Text>Tokens</Text>
      </Circle> */}
    </Flex>
  )
}
