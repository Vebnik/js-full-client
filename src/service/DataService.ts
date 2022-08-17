import API from "../http/AxiosApi";
import {GetResponse, GetResponseCity} from "../interface/AxiosCitizen";


class DataService {

	public getCity(): Promise<GetResponseCity> {
		return API.get('/city').then(response => response.data)
	}

	public getCitizens(): Promise<GetResponse> {
		return API.get('/citizens').then(response => response.data)
	}

}

export default new DataService()