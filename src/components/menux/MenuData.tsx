import React, {useState} from 'react';
import {Menu, MenuButton, MenuDivider, MenuItem, MenuList} from "@chakra-ui/react";
import {city} from "../utils/TestData";



const MenuData = () => {

	const [allCity, setCity]  = useState(city)

	return (
		<Menu>
			<MenuButton mx={1} width={'30%'} px={4} py={2} transition='all 0.2s' borderRadius='md' borderWidth='1px' _hover={{ bg: 'gray.400' }} _expanded={{ bg: 'blue.400' }} _focus={{ boxShadow: 'outline' }}>
				City
			</MenuButton>
			<MenuList>
				<MenuList overflow={'scroll'}>
					{
						allCity.map(el => <MenuItem>{el}</MenuItem>)
					}
				</MenuList>
			</MenuList>
		</Menu>
	)
}

export default MenuData;