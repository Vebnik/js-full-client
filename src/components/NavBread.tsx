import React, {useContext} from 'react';
import {Breadcrumb, BreadcrumbItem, BreadcrumbLink} from "@chakra-ui/react";
import {Context} from "./App";
import {observer} from "mobx-react-lite";

const NavBread = observer(() => {

	const {store} = useContext(Context)

	return (
		<Breadcrumb spacing='8px' separator={'>'}>
			<BreadcrumbItem>
				<BreadcrumbLink href='#'>{store.City || 'No select'}</BreadcrumbLink>
			</BreadcrumbItem>

			<BreadcrumbItem isCurrentPage>
				<BreadcrumbLink href='#'>{store.Round || 'No select'}</BreadcrumbLink>
			</BreadcrumbItem>

			<BreadcrumbItem isCurrentPage>
				<BreadcrumbLink href='#'>{store.Street || 'No select'}</BreadcrumbLink>
			</BreadcrumbItem>

		</Breadcrumb>
	);
})

export default NavBread;