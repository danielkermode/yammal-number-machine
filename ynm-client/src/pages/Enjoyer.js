import React, { useEffect } from 'react'
import { Box, Button } from '@chakra-ui/react'

import { connect } from 'react-redux'
import { getEnjoyer, logout } from '../redux/auth'

const mapDispatch = { getEnjoyer, logout }

function Enjoyer (props) {
  const { enjoyer, getEnjoyer, logout } = props
  useEffect(() => {
    getEnjoyer(window.localStorage.getItem('ynmUuid'))
  }, [getEnjoyer])

  return (
    <Box>
      Hello, enjoyer {enjoyer && enjoyer.enjoyername}. You are now logged in.
      <Button onClick={logout}>Logout</Button>
    </Box>
  )
}

export default connect(state => ({ enjoyer: state.auth.enjoyer }), mapDispatch)(Enjoyer)
