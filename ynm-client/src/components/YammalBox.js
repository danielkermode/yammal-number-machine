import React from 'react'
import { Text, Flex } from '@chakra-ui/react'

export default function YammalBox () {
  return (
    <Flex
      flexDirection='column'
      align='center'
      justify='center'
      py={10}
      style={{ color: 'white', border: '1px solid white', width: '30%' }}
    >
      <Text style={{ fontFamily: 'manofa', fontWeight: 'bold' }}>YAMMAL</Text>
      <Text style={{ fontFamily: 'eb garamond' }}>MAKER OF MUSIC | ARTIFICIAL HUMAN</Text>
    </Flex>
  )
}
