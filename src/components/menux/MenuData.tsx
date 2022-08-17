import React, {useContext, useEffect, useState} from 'react';
import {Menu, MenuButton, MenuItem, MenuList, Tooltip} from "@chakra-ui/react";
import SearchMenu from "./SearchMenu";
import {Context} from "../App";
import DataService from "../../service/DataService";
import {City} from "../../interface/AxiosCitizen";


const MenuData = () => {

	const cityArr = {} as any
	const {store} = useContext(Context)
	const [allCity, setCity]  = useState([''])
	const [filterCity, setFilterCity]  = useState([''])
	const [cityData, setCityData] = useState(cityArr)

	const filterItem = (inputValue: string) => {

		const filterCity = allCity.filter(el => el.includes(inputValue))

		setFilterCity(filterCity)
	}

	const selectItem = (ev: any) => {
		if (!ev.target.innerText)
			return

		store.City = ev.target.innerText
		store.Round = ''
		store.Street = ''
		store.cityChosen = true
	}

	const getAllData = () => {

		DataService.getCitizens().then(results1 => {

			DataService.getCity().then(results2 => {

				const tmpObj = {} as any
				results2.data.forEach(el => tmpObj[el.name] = el.data)
				// @ts-ignore
				const city = [...new Set(results1.data.map(el => el.groups[0].name))]

				store.CitizensData = results1.data
				setCityData(tmpObj)
				setCity(city)
				setFilterCity(city)
			})
		})
	}

	useEffect(() => getAllData(), [store.City])

	return (
		<Menu>
			<MenuButton mx={1} width={'30%'} px={4} py={2} transition='all 0.2s' borderRadius='md' borderWidth='1px' _hover={{ bg: 'gray.400' }} _expanded={{ bg: 'blue.400' }} _focus={{ boxShadow: 'outline' }}>
				City
			</MenuButton>
			<MenuList w={'200%'} h={'max-content'} overflow={'scroll'}>
				<SearchMenu filterItem={filterItem}/>
				{
					filterCity.map(el =>
						<Tooltip label={`Население ${cityData[el.split(' ')[0]]} чел.`}>
							<MenuItem onClick={(ev) => selectItem(ev)}>{el}</MenuItem>
						</Tooltip>)
				}
			</MenuList>
		</Menu>
	)
}

export default MenuData;