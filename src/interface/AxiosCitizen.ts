interface Group {
	type: string
	name: string
}

export interface Citizen {
	id: number
	name: string
	city_id: number
	groups: Array<Group>
}

export interface City {
	id: number
	name: string
	data: string
}

export interface GetResponse {
	ok: boolean
	data : Array<Citizen>
}

export interface GetResponseCity {
	ok: boolean
	data : Array<City>
}