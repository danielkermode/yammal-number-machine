import React, { useState } from 'react'
import { Text, Flex, Box } from '@chakra-ui/react'
import { ReactComponent as YammalBoxSvg } from '../assets/yammal_box.svg'
import waterfall from '../assets/waterfall.gif'

function YammalInfo () {
  return (
    <>
      <YammalBoxSvg style={{ width: '100%', marginTop: '5%' }} />
      <Flex
        flexDirection='column'
        align='center'
        justify='center'
        py={10}
        style={{
          color: 'white',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100%'
        }}
      >
        <Text
          style={{
            fontFamily: 'manofa',
            fontWeight: 'bold',
            fontSize: 20,
            marginTop: 20
          }}
        >
          YAMMAL
        </Text>
        <Text
          mt={2}
          style={{
            fontFamily: 'eb garamond',
            fontSize: 10,
            letterSpacing: 0.8
          }}
        >
          MAKER OF MUSIC | ARTIFICIAL INTELLIGENCE
        </Text>
        <Text
          mt={2}
          style={{
            // fontFamily: 'montserrat',
            paddingTop: 10,
            fontSize: 10,
            letterSpacing: 0.8
          }}
        >
          contact.yammal@gmail.com
        </Text>
      </Flex>
    </>
  )
}

export default function YammalBox () {
  const [showWaterfall, setShowWaterfall] = useState(false)
  return (
    <Box
      style={{
        position: 'relative',
        cursor: 'pointer',
        width: 350,
        height: 220,
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center'
      }}
      onClick={() => {
        setShowWaterfall(!showWaterfall)
      }}
    >
      {showWaterfall
        ? <img style={{ height: '85%', marginTop: '10%', width: '85%' }} src={waterfall} alt='waterfall' />
        : <YammalInfo />}
    </Box>
  )
}
