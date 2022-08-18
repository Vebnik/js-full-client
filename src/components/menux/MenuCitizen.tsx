import React, {useContext, useEffect, useState} from 'react';
import {Menu, MenuButton, MenuItem, MenuList, Tooltip, useToast} from "@chakra-ui/react";
import SearchMenu from "./SearchMenu";
import {observer} from "mobx-react-lite";
import {Context} from "../App";
import AlertToast from "../../utils/ToastDialog";
import DataService from "../../service/DataService";


const MenuCitizen = observer(() => {

	const {store} = useContext(Context)
	const [allCitizen, setCitizen] = useState([['']])
	const [filterCitizen, setFilterCitizen] = useState([['']])
	const [cityData, setCityData] = useState({' ': ' '})
	const toast = useToast()

	const filterItem = (inputValue: string) => {

		if (!store.cityChosen)
			return

		setFilterCitizen(allCitizen.filter(el => el[0].includes(inputValue)))
	}

	const getAllData = () =>  {

		DataService.getCity().then(results2 => {

			const tmpObj = {} as any
			const citizens = store.CitizensData.filter(el => el.groups[2].name === store.Street).map(el => [el.name, el.groups[0].name.split(' ')[0]])

			results2.data.forEach(el => tmpObj[el.name] = el.data)

			setCityData(tmpObj)
			setCitizen(citizens)
			setFilterCitizen(citizens)
		})
	}

	useEffect(() => {getAllData()}, [store.Street])

	return (
		<Menu>
			<MenuButton disabled={!store.Street} mx={1} width={'100%'} px={4} py={2} transition='all 0.2s' borderRadius='md' borderWidth='1px' _hover={{ bg: 'gray.700' }} _expanded={{ bg: 'blue.400' }} _focus={{ boxShadow: 'outline' }}>
				Citizen
			</MenuButton>
			<MenuList w={'80vh'} h={'max-content'} overflow={'scroll'}>
				<SearchMenu filterItem={filterItem}/>
				{
					filterCitizen.map(el =>
						// @ts-ignore
						<Tooltip label={`${el[1]} население ${cityData[el[1]]} чел.`}>
							<MenuItem>{el[0]}</MenuItem>
						</Tooltip>)
				}
			</MenuList>
		</Menu>
	)
})

export default MenuCitizen;