import React from 'react'
import {
  useHistory
} from 'react-router-dom'

import { Flex, Text, Box } from '@chakra-ui/react'

export default function Nav () {
  const history = useHistory()
  return (
    <Flex>
      <Box m={5}>
        <Text
          style={{ fontFamily: 'manofa', fontWeight: 'bold', fontSize: 12 }}
          cursor='pointer'
          color='white'
          onClick={() => {
            history.push('/')
          }}
        >YAMMAL
        </Text>
      </Box>
      <Box m={5}>
        <Text
          style={{ fontFamily: 'manofa', fontWeight: 'bold', fontSize: 12 }}
          cursor='pointer'
          color='white'
          onClick={() => {
            history.push('/music')
          }}
        >LISTEN
        </Text>
      </Box>

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
