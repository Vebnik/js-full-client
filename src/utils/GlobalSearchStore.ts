import {makeAutoObservable} from "mobx";

class GlobalSearchStore {

	public cityChosen: boolean =  false

	public City = '' as string
	public Round = '' as string
	public Street = '' as string

	constructor() {
		makeAutoObservable(this)
	}

	public setCity(city: string) {
		this.City = city
	}

	public setRound(round: string) {
		this.Round = round
	}

	public setStreet(street: string) {
		this.Street = street
	}
}

export default GlobalSearchStore