import axios from "axios";
import { HostName } from "../HostName";

export default class TipService{
    async getRandomTip(){
        try{
            const response = await axios.post(HostName+"/api/Tip/GetRandomTip",{})
            return response;
        }catch(e){
            return e.response;
        }
    }
}