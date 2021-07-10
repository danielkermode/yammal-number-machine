import React, { useEffect } from 'react'
import { Box } from '@chakra-ui/react'

import { connect } from 'react-redux'
import { getEnjoyer } from '../redux/auth'

const mapDispatch = { getEnjoyer }

function Enjoyer (props) {
  const { enjoyer, getEnjoyer } = props
  useEffect(() => {
    getEnjoyer(window.localStorage.getItem('ynmUuid'))
  }, [getEnjoyer])
  return (
    <Box>
      Hello, enjoyer {enjoyer && enjoyer.enjoyername}. You are now logged in.
    </Box>
  )
}

export default connect(state => ({ enjoyer: state.auth.enjoyer }), mapDispatch)(Enjoyer)
