import React, { useEffect } from 'react'
import { Box } from '@chakra-ui/react'

import { connect } from 'react-redux'
import { getEnjoyer } from '../redux/auth'

const mapDispatch = { getEnjoyer }

function Enjoyer (props) {
  useEffect(() => {
    props.getEnjoyer(window.localStorage.getItem('ynmUuid'))
  }, [])
  return (
    <Box>
      Hello, enjoyer. You are now logged in.
    </Box>
  )
}

export default connect(state => state, mapDispatch)(Enjoyer)
