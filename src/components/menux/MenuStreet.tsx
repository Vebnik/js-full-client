import React, {useContext, useEffect, useState} from 'react';
import {Menu, MenuButton, MenuItem, MenuList, useToast} from "@chakra-ui/react";
import {citizens, city} from "../../utils/TestData";
import SearchMenu from "./SearchMenu";
import {observer} from "mobx-react-lite";
import {Context} from "../App";
import DataService from "../../service/DataService";

const MenuStreet = observer(() => {

	const {store} = useContext(Context)
	const [allStreet, setStreet] = useState([''])

	useEffect(() => {
		DataService.getCitizens().then(results => {
			setStreet(results.data.filter(el => el.groups[1].name === store.Round).map(el => el.groups[2].name))
		})
	}, [store.Round])

	const filterItem = (inputValue: string) => {

		if (!store.cityChosen)
			return

		const filterStreet = citizens.filter(el => el.group[1].name === store.Round)
			.map(el => el.group[2].name)

		setStreet(filterStreet.filter(el => el.includes(inputValue)))
	}

	const selectItem = (ev: any) => {
		if (!ev.target.innerText)
			return

		store.setStreet(ev.target.innerText)
	}

	return (
		<Menu>
			<MenuButton mx={1} width={'30%'} px={4} py={2} transition='all 0.2s' borderRadius='md' borderWidth='1px' _hover={{ bg: 'gray.400' }} _expanded={{ bg: 'blue.400' }} _focus={{ boxShadow: 'outline' }}>
				Street
			</MenuButton>
			<MenuList w={'200%'} h={'400px'} overflow={'scroll'}>
				<SearchMenu filterItem={filterItem}/>
				{
					allStreet.map(el => <MenuItem onClick={(ev) => selectItem(ev)}>{el}</MenuItem>)
				}
			</MenuList>
		</Menu>
	)
})

export default MenuStreet;