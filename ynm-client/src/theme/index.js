import { extendTheme } from '@chakra-ui/react'
import AppleCursor from '../assets/apple_cursor.svg'

console.log(AppleCursor)

// Global style overrides
const theme = extendTheme({
  styles: {
    global: {
      body: {
        margin: 5,
        background: 'black',
        cursor: `url('${AppleCursor}'), auto`
      }
    }
  }
})

export default theme
