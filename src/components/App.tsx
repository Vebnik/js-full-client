import * as React from "react"
import {ChakraProvider, Container, extendTheme, Wrap} from "@chakra-ui/react"
import Header from "./Header";
import MenuData from "./menux/MenuData";
import MenuStreet from "./menux/MenuStreet";
import MenuRound from "./menux/MenuRound";
import MenuCitizen from "./menux/MenuCitizen";

import {Reorder} from 'framer-motion'

import GlobalSearchStore from "../utils/GlobalSearchStore";
import {observer} from "mobx-react-lite";
import {Icon} from "@chakra-ui/icons";
import {FaArrowRight} from "react-icons/all";
import {useState} from "react";


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

  const menuList = [<MenuData/>, <MenuRound/>, <MenuStreet/>, <MenuCitizen/>]
  const [items, setItems] = useState(menuList)

  return (
    <Context.Provider value={{store}}>
      <ChakraProvider theme={theme}>
        <Header/>
        <Container minW={'590px'} h={'50vh'} maxW={'1200px'} py={1} flexDirection={'row'}>
          <Reorder.Group axis={'y'} values={items} onReorder={setItems}>
            {items.map(el =>
              <Reorder.Item value={el} style={{display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
                {el}
                <Wrap height={'60px'}/>
              </Reorder.Item>
            )}
          </Reorder.Group>
        </Container>
      </ChakraProvider>
    </Context.Provider>
  )
})
