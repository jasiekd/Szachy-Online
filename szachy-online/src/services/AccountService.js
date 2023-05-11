import axios from "axios";
import { HostName } from "../HostName";

axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;

export default class AccountService{
    async getAnyUser(userId){
        try{
            const response = await axios.get(HostName+'/api/Account/'+userId,{});
            return response;
        }catch(error){
            return error.response;
        }
    }
    async getUser(){
        try{
            const response = await axios.get(HostName+'/api/Account/getUser',{});
            return response;
        }catch(error){
            return error.response;
        }
    }
    
}