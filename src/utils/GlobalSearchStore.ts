import {makeAutoObservable} from "mobx";
import {Citizen} from "../interface/AxiosCitizen";

class GlobalSearchStore {

	public cityChosen: boolean =  false

	public City = '' as string
	public Round = '' as string
	public Street = '' as string
	public CitizensData = [] as Array<Citizen>

	constructor() {
		makeAutoObservable(this)
	}

	private setCity(city: string) {
		this.City = city
	}

	private setRound(round: string) {
		this.Round = round
	}

	private setStreet(street: string) {
		this.Street = street
	}
}

export default GlobalSearchStore