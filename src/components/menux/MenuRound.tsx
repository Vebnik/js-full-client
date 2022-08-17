import React, {useContext, useEffect, useState} from 'react';
import {Menu, MenuButton, MenuItem, MenuList, useToast} from "@chakra-ui/react";
import SearchMenu from "./SearchMenu";
import {Context} from "../App";
import {observer} from "mobx-react-lite";
import AlertToast from "../../utils/ToastDialog";


const MenuRound = observer(() => {

	const {store} = useContext(Context)
	const toast = useToast()
	const [allRound, setRound] = useState([''])
	const [filterRound, setFilterRound]  = useState([''])

	const filterItem = (inputValue: string) => {

		if (!store.cityChosen)
			return

		setFilterRound(allRound.filter(el => el.includes(inputValue)))
	}

	const selectItem = (ev: any) => {
		if (!ev.target.innerText)
			return

		store.Round = ev.target.innerText
	}

	const clickHandler = () => {
		if (!store.cityChosen)
			AlertToast('Warning', 'Choose City', 'warning', toast)
	}

	const getAllData = () => {
		// @ts-ignore
		const round = [...new Set(store.CitizensData.filter(el => el.groups[0].name === store.City).map(el => el.groups[1].name))]
		setRound(round)
		setFilterRound(round)
	}

	useEffect(() => {getAllData()}, [store.City])

	return (
		<Menu>
			<MenuButton onClick={clickHandler} mx={1} width={'30%'} px={4} py={2} transition='all 0.2s' borderRadius='md' borderWidth='1px' _hover={{ bg: 'gray.400' }} _expanded={{ bg: 'blue.400' }} _focus={{ boxShadow: 'outline' }}>
				District
			</MenuButton>
			<MenuList w={'200%'} maxH={'400px'} h={'max-content'} overflow={'scroll'}>
				<SearchMenu filterItem={filterItem}/>
				{
					filterRound.map(el => <MenuItem onClick={(ev) => selectItem(ev)}>{el}</MenuItem>)
				}
			</MenuList>
		</Menu>
	)
})

export default MenuRound;