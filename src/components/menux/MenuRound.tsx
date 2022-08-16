import React, {useContext, useEffect, useState} from 'react';
import {Menu, MenuButton, MenuItem, MenuList, useToast} from "@chakra-ui/react";
import {citizens} from "../../utils/TestData";
import SearchMenu from "./SearchMenu";
import {Context} from "../App";
import {observer} from "mobx-react-lite";
import AlertToast from "../../utils/ToastDialog";
import DataService from "../../service/DataService";



const MenuRound = observer(() => {

	const {store} = useContext(Context)
	const toast = useToast()
	const [allRound, setRound] = useState([''])

	useEffect(() => {
		DataService.getCitizens().then(results => {
			setRound(results.data.filter(el => el.groups[0].name === store.City).map(el => el.groups[1].name))
		})
	}, [store.City])

	const filterItem = (inputValue: string) => {

		if (!store.cityChosen)
			return

		const filterRound = citizens.filter(el => el.group[0].name === store.City)
			.map(el => el.group[1].name)

		setRound(filterRound.filter(el => el.includes(inputValue)))
	}

	const selectItem = (ev: any) => {
		if (!ev.target.innerText)
			return

		store.setRound(ev.target.innerText)
	}

	const clickHandler = () => {
		if (!store.cityChosen)
			AlertToast('Warning', 'Choose City', 'warning', toast)
	}

	return (
		<Menu>
			<MenuButton onClick={clickHandler} mx={1} width={'30%'} px={4} py={2} transition='all 0.2s' borderRadius='md' borderWidth='1px' _hover={{ bg: 'gray.400' }} _expanded={{ bg: 'blue.400' }} _focus={{ boxShadow: 'outline' }}>
				District
			</MenuButton>
			<MenuList w={'200%'} maxH={'400px'} h={'max-content'} overflow={'scroll'}>
				<SearchMenu filterItem={filterItem}/>
				{
					allRound.map(el => <MenuItem onClick={(ev) => selectItem(ev)}>{el}</MenuItem>)
				}
			</MenuList>
		</Menu>
	)
})

export default MenuRound;