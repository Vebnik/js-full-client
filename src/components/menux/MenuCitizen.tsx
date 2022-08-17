import React, {useContext, useEffect, useState} from 'react';
import {Menu, MenuButton, MenuItem, MenuList, useToast} from "@chakra-ui/react";
import {citizens} from "../../utils/TestData";
import SearchMenu from "./SearchMenu";
import {observer} from "mobx-react-lite";
import {Context} from "../App";
import AlertToast from "../../utils/ToastDialog";


const MenuCitizen = observer(() => {

	const {store} = useContext(Context)
	const [allCitizen, setCitizen] = useState([''])
	const [filterCitizen, setFilterCitizen] = useState([''])
	const toast = useToast()

	const filterItem = (inputValue: string) => {

		if (!store.cityChosen)
			return

		setFilterCitizen(allCitizen.filter(el => el.includes(inputValue)))
	}

	const clickHandler = () => {
		if (!store.Street)
			AlertToast('Warning', 'Choose Street', 'warning', toast)
	}

	const getAllData = () =>  {
		const citizens = store.CitizensData.filter(el => el.groups[2].name === store.Street).map(el => el.name)
		setCitizen(citizens)
		setFilterCitizen(citizens)
	}

	useEffect(() => {getAllData()}, [store.Street])

	return (
		<Menu>
			<MenuButton onClick={clickHandler} mx={1} width={'30%'} px={4} py={2} transition='all 0.2s' borderRadius='md' borderWidth='1px' _hover={{ bg: 'gray.400' }} _expanded={{ bg: 'blue.400' }} _focus={{ boxShadow: 'outline' }}>
				Citizen
			</MenuButton>
			<MenuList w={'130%'} h={'max-content'} overflow={'scroll'}>
				<SearchMenu filterItem={filterItem}/>
				{
					filterCitizen.map(el => <MenuItem>{el}</MenuItem>)
				}
			</MenuList>
		</Menu>
	)
})

export default MenuCitizen;