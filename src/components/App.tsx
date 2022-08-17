import * as React from "react"
import {ChakraProvider, Container, extendTheme, SimpleGrid} from "@chakra-ui/react"
import Header from "./Header";
import MenuData from "./menux/MenuData";
import MenuStreet from "./menux/MenuStreet";
import MenuRound from "./menux/MenuRound";
import MenuCitizen from "./menux/MenuCitizen";
import GlobalSearchStore from "../utils/GlobalSearchStore";
import {observer} from "mobx-react-lite";


const store = new GlobalSearchStore()

export const Context = React.createContext({store})

const theme = extendTheme({
  styles: {
    global: {
      '::-webkit-scrollbar': {
        width: '0px',
      }
    },
  },
})

export const App = observer(() => {
  return (
    <Context.Provider value={{store}}>
      <ChakraProvider theme={theme}>
        <Header/>
        <Container display={'flex'} justifyContent={'center'} alignItems={'center'} maxW={'1200px'} py={1} flexDirection={'row'}>
          <MenuData/>
          {'>'}
          <MenuRound/>
          {'>'}
          <MenuStreet/>
          {'>'}
          <MenuCitizen/>
        </Container>
      </ChakraProvider>
    </Context.Provider>
  )
})
