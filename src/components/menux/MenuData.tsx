import React, {useContext, useEffect, useState} from 'react';
import {Menu, MenuButton, MenuItem, MenuList} from "@chakra-ui/react";
import SearchMenu from "./SearchMenu";
import {Context} from "../App";
import DataService from "../../service/DataService";



const MenuData = () => {

	const {store} = useContext(Context)
	const [allCity, setCity]  = useState([''])

	const filterItem = (inputValue: string) => {

		const filterCity = allCity
			.filter(el => el.includes(inputValue))
			.slice(0, 50)

		setCity(filterCity)
	}

	const selectItem = (ev: any) => {
		if (!ev.target.innerText)
			return

		store.setCity(ev.target.innerText)
		store.setRound('')
		store.setStreet('')
		store.cityChosen = true
	}

	const getAllData = () => {

		DataService.getCitizens().then(results => {
			// @ts-ignore
			const city = [...new Set(results.data.map(el => el.groups[0].name))]
			setCity(city)
		})
	}

	useEffect(() => getAllData(), [])

	return (
		<Menu>
			<MenuButton mx={1} width={'30%'} px={4} py={2} transition='all 0.2s' borderRadius='md' borderWidth='1px' _hover={{ bg: 'gray.400' }} _expanded={{ bg: 'blue.400' }} _focus={{ boxShadow: 'outline' }}>
				City
			</MenuButton>
			<MenuList w={'200%'} h={'400px'} overflow={'scroll'}>
				<SearchMenu filterItem={filterItem}/>
				{
					allCity.map(el => <MenuItem onClick={(ev) => selectItem(ev)}>{el}</MenuItem>)
				}
			</MenuList>
		</Menu>
	)
}

export default MenuData;