import React from 'react'
import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  Button
} from '@chakra-ui/react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'

import { connect } from 'react-redux'
import { login } from '../redux/auth'

const mapDispatch = { login }

function Login (props) {
  const [show, setShow] = React.useState(false)

  const [loginDetails, setLoginDetails] = React.useState({
    name: '',
    password: ''
  })

  const updateDetail = field => {
    return e => {
      setLoginDetails({ ...loginDetails, [field]: e.target.value })
    }
  }

  const login = () => {
    props.login(loginDetails)
  }

  const handleClick = () => setShow(!show)

  return (
    <form>
      <FormControl id='name' isRequired>
        <FormLabel>Enjoyer name</FormLabel>
        <Input
          autoComplete='username'
          value={loginDetails.name}
          onChange={updateDetail('name')}
          placeholder='Enter your enjoyer name here'
        />
      </FormControl>
      <FormControl id='password' isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size='md'>
          <Input
            autoComplete='password'
            value={loginDetails.password}
            onChange={updateDetail('password')}
            pr='4.5rem'
            type={show ? 'text' : 'password'}
            placeholder='Enter password'
          />
          <InputRightElement width='4.5rem'>
            <IconButton icon={show ? <ViewOffIcon /> : <ViewIcon />} h='1.75rem' size='sm' onClick={handleClick} />
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button onClick={login}> Login </Button>
    </form>
  )
}

export default connect(f => f, mapDispatch)(Login)
