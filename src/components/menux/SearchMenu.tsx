import React from 'react';
import {Button, Input, InputGroup, InputRightElement} from "@chakra-ui/react";

const SearchMenu = ({filterItem}:{filterItem: Function}) => {

	return (
		<InputGroup size='md'>
			<Input mx={1} variant={'flushed'} pr='4.5rem' type={'text'} placeholder='Enter text' onChange={(ev) => filterItem(ev.target.value)}/>
			<InputRightElement width='4.5rem'>
				<Button h='1.75rem' size='sm'>
					Search
				</Button>
			</InputRightElement>
		</InputGroup>
	);
};

export default SearchMenu;