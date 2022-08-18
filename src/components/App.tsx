import * as React from "react"
import {ChakraProvider, Container, extendTheme} from "@chakra-ui/react"
import Header from "./Header";
import MenuData from "./menux/MenuData";
import MenuStreet from "./menux/MenuStreet";
import MenuRound from "./menux/MenuRound";
import MenuCitizen from "./menux/MenuCitizen";
import GlobalSearchStore from "../utils/GlobalSearchStore";
import {observer} from "mobx-react-lite";
import {Icon} from "@chakra-ui/icons";
import {FaArrowRight} from "react-icons/all";


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

//TODO drag and drop

export const App = observer(() => {

  return (
    <Context.Provider value={{store}}>
      <ChakraProvider theme={theme}>
        <Header/>
        <Container h={'50vh'} display={'flex'} justifyContent={'center'} alignItems={'center'} maxW={'1200px'} py={1} flexDirection={'row'}>
          <MenuData/>
          <Icon as={FaArrowRight}/>
          <MenuRound/>
          <Icon as={FaArrowRight}/>
          <MenuStreet/>
          <Icon as={FaArrowRight}/>
          <MenuCitizen/>
        </Container>
      </ChakraProvider>
    </Context.Provider>
  )
})
