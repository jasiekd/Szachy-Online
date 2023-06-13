import axios from "axios";
import { HostName } from "../HostName";
import { refreshTonke } from "./LoginServices";

axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;

export default class AccountService{
    /*async getAnyUser(userId){
        try{
            const response = await axios.get(HostName+'/api/Account/'+userId,{});
            return response;
        }catch(error){
            return error.response;
        }
    }*/
    async getUser(){
        //let count = 0;
       // while(true)
       // {
            try{
                const response = await axios.get(HostName+'/api/Account/getUser',{});
                return response;
            }catch(error){
               // if(count===1){
                    return error.response;
              //  }
               // count = 1
               // refreshTonke();
            }
        //}
        
    }

    async getUserById(uid){
        try{
            const response = await axios.get(HostName+'/api/Account/getUser/'+uid,{});
            return response;
        }catch(error){
            return error.response;
        }   
    }

    async findByNickName(nickname){
        try{
            const response = await axios.post(HostName+'/api/Account/findByNickname?nickname='+nickname,{})
            return response;
        }catch(error){
            return error.response;
        }
    }  

    async getMyHistory(){
        try{
            const response = await axios.get(HostName+'/api/Account/GetMyHistory',{})
            return response;
        }catch(error){
            return error.response;
        }
    }

    async getMyFriendHistory(uid){
        try{
            const response = await axios.get(HostName+'/api/Account/GetMyFriendHistory/'+uid,{})
            return response;
        }catch(error){
            return error.response;
        }
    }
}