import axios from "axios";
import { HostName } from "../HostName";

export default class OpeningService{
    async getOpenings(){
        try{
            const response = await axios.get(HostName+'/api/Opening/GetOpenings')
            return response;
        }catch(error){
            return error.response;
        }
    }
}