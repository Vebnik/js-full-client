import React, {useContext, useEffect, useState} from 'react';
import {Menu, MenuButton, MenuItem, MenuList, useToast} from "@chakra-ui/react";
import {citizens} from "../../utils/TestData";
import SearchMenu from "./SearchMenu";
import {observer} from "mobx-react-lite";
import {Context} from "../App";
import DataService from "../../service/DataService";



const MenuCitizen = observer(() => {

	const {store} = useContext(Context)
	const [allCitizen, setCitizen] = useState([''])

	useEffect(() => {
		DataService.getCitizens().then(results => {
			setCitizen(results.data.filter(el => el.groups[2].name === store.Street).map(el => el.name))
		})
	}, [store.Street])

	const filterItem = (inputValue: string) => {

		if (!store.cityChosen)
			return

		const filterStreet = citizens.filter(el => el.group[2].name === store.Street).map(el => el.name)

		setCitizen(filterStreet.filter(el => el.includes(inputValue)))
	}

	return (
		<Menu>
			<MenuButton mx={1} width={'30%'} px={4} py={2} transition='all 0.2s' borderRadius='md' borderWidth='1px' _hover={{ bg: 'gray.400' }} _expanded={{ bg: 'blue.400' }} _focus={{ boxShadow: 'outline' }}>
				Citizen
			</MenuButton>
			<MenuList w={'130%'} h={'400px'} overflow={'scroll'}>
				<SearchMenu filterItem={filterItem}/>
				{
					allCitizen.map(el => <MenuItem>{el}</MenuItem>)
				}
			</MenuList>
		</Menu>
	)
})

export default MenuCitizen;