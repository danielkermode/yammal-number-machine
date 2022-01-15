import React from 'react'
import { Flex } from '@chakra-ui/react'
import YammalBox from '../components/YammalBox'

export default function Home () {
  return (
    <Flex align='center' justify='center' style={{ height: '60vh' }}>
      <YammalBox />
    </Flex>
  )
}
