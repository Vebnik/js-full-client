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


export interface GetResponse {
	ok: boolean
	data : Array<Citizen>
}