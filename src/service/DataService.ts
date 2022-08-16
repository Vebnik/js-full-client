import API from "../http/AxiosApi";
import {GetResponse} from "../interface/AxiosCitizen";

class DataService {

	public getCitizens(): Promise<GetResponse> {
		return API.get('/citizens').then(response => response.data)
	}

}

export default new DataService()