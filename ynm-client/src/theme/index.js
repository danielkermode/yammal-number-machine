import { extendTheme } from '@chakra-ui/react'

// Global style overrides
const theme = extendTheme({
  styles: {
    global: {
      body: {
        margin: 10
      }
    }
  }
})

export default theme
