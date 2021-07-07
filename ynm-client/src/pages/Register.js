import React from 'react'
import {
  Box,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  Button
} from '@chakra-ui/react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'

import { connect } from 'react-redux'
import { register } from '../redux/auth'

const mapDispatch = { register }

function Register (props) {
  const [show, setShow] = React.useState(false)

  const [registerDetails, setRegisterDetails] = React.useState({
    name: '',
    password: '',
    confirmPassword: ''
  })

  const updateDetail = field => {
    return e => {
      setRegisterDetails({ ...registerDetails, [field]: e.target.value })
    }
  }

  const register = () => {
    props.register(registerDetails)
  }

  const handleClick = () => setShow(!show)

  return (
    <Box w='50%'>
      <form>
        <FormControl id='name' isRequired>
          <FormLabel>Enjoyer name</FormLabel>
          <FormHelperText>Your name will be used to identify the account that holds your tokens.</FormHelperText>
          <Input
            autoComplete='username'
            value={registerDetails.name}
            onChange={updateDetail('name')}
            placeholder='Enter your enjoyer name here'
          />
        </FormControl>
        <FormControl id='password' isRequired>
          <FormLabel>Password</FormLabel>
          <FormHelperText>Please choose a secure password.</FormHelperText>
          <InputGroup size='md'>
            <Input
              autoComplete='new-password'
              value={registerDetails.password}
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
        <FormControl id='confirm-password' isRequired>
          <FormLabel>Confirm Password</FormLabel>
          <InputGroup size='md'>
            <Input
              autoComplete='new-password'
              value={registerDetails.confirmPassword}
              onChange={updateDetail('confirmPassword')}
              pr='4.5rem'
              type={show ? 'text' : 'password'}
              placeholder='Confirm password'
            />
            <InputRightElement width='4.5rem'>
              <IconButton icon={show ? <ViewOffIcon /> : <ViewIcon />} h='1.75rem' size='sm' onClick={handleClick} />
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Button onClick={register}> Register </Button>
      </form>
    </Box>
  )
}

export default connect(f => f, mapDispatch)(Register)
