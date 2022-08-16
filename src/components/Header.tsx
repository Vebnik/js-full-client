import React from 'react';
import {Box, Button, ButtonGroup} from "@chakra-ui/react";
import {ColorModeSwitcher} from "./ColorModeSwitcher";
import NavBread from "./NavBread";

const Header = () => {
	return (
		<Box display={'flex'} bg={'#424242'} w={'90%'} h={'40px'} m={'auto'} rounded={5} justifyContent={'space-between'} px={2} alignItems={'center'}>
			<NavBread/>
			<ColorModeSwitcher/>
		</Box>
	)
}

export default Header;