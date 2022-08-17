import React, {useContext, useEffect, useState} from 'react';
import {Menu, MenuButton, MenuItem, MenuList, useToast} from "@chakra-ui/react";
import SearchMenu from "./SearchMenu";
import {observer} from "mobx-react-lite";
import {Context} from "../App";
import AlertToast from "../../utils/ToastDialog";


const MenuStreet = observer(() => {

	const {store} = useContext(Context)
	const [allStreet, setStreet] = useState([''])
	const [filterStreet, setFilterStreet]  = useState([''])
	const toast = useToast()

	const filterItem = (inputValue: string) => {

		if (!store.cityChosen)
			return

		setFilterStreet(allStreet.filter(el => el.includes(inputValue)))
	}

	const selectItem = (ev: any) => {
		if (!ev.target.innerText)
			return

		store.Street = ev.target.innerText
	}

	const clickHandler = () => {
		if (!store.Round)
			AlertToast('Warning', 'Choose District', 'warning', toast)
	}

	const getAllData = () => {
		//@ts-ignore
		const street = [...new Set(store.CitizensData.filter(el => el.groups[1].name === store.Round).map(el => el.groups[2].name))]
		setStreet(street)
		setFilterStreet(street)
	}

	useEffect(() => {getAllData()}, [store.Round])

	return (
		<Menu>
			<MenuButton onClick={clickHandler} mx={1} width={'30%'} px={4} py={2} transition='all 0.2s' borderRadius='md' borderWidth='1px' _hover={{ bg: 'gray.400' }} _expanded={{ bg: 'blue.400' }} _focus={{ boxShadow: 'outline' }}>
				Street
			</MenuButton>
			<MenuList w={'200%'} h={'max-content'} overflow={'scroll'}>
				<SearchMenu filterItem={filterItem}/>
				{
					filterStreet[0]
						? filterStreet.map(el => <MenuItem onClick={(ev) => selectItem(ev)}>{el}</MenuItem>)
						: ''
				}
			</MenuList>
		</Menu>
	)
})

export default MenuStreet;