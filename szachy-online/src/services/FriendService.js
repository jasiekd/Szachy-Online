import axios from "axios";
import { HostName } from "../HostName";
import Swal from 'sweetalert2';

axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;

export default class FriendService{
    async getListOfPendingInvitationsc(){
       // let count = 0;

       // while(true){
            try{
                const response = await axios.get(HostName+'/api/Friends/GetListOfPendingInvitations',{});
                return response;
            }catch(error)
            {
               // if(count===1)
               // {
                    return error.response;
                //}
                //count = 1;
            }
      //  }
       
    }
    async sendInvitation(nickname){
        //let count = 0;

        //while(true){
            try{
                const response = await axios.get(HostName+'/api/Friends/sendInvitation/'+nickname,{});
                return response;
            }catch(error)
            {
              //  if(count===1)
               // {
                    return error.response;
              //  }
               // count = 1;
            }
       //}
        
    }
    async acceptInvitation(invitationID){
       // let count = 0;

        //while(true){
            try{
                const response = await axios.get(HostName+'/api/Friends/acceptInvitation/'+invitationID,{});
                return response;
            }catch(error){
                //if(count === 1)
                //{
                    return error.response;
               // }
               // count = 1;
            }
       // }
        
    }
    async getListOfFriends(){
       // let count = 0;

       // while(true){
            try{
                const response = await axios.get(HostName+'/api/Friends/GetListOfFriends',{});
                return response;
            }catch(error){
               // if(count === 1)
               // {
                    return error.response;
               // }
               // count = 1;
            }
      //  }
        
    }
    async removeFriend(friendID){
        //let count = 0;

       // while(true){
            try{
                const response = await axios.delete(HostName+'/api/Friends/removeFriend/'+friendID,{});
                return response;
            }catch(error){
              //  if(count === 1)
              //  {
                    return error.response;
              //  }
              //  count = 1;
            }
       // }
        
    }
    async getListOfMySentInvitations(){
       // let count = 0;

        //while(true){
            try{
                const response = await axios.get(HostName+"/api/Friends/GetListOfMySentInvitations",{});
                return response;
            }catch(error){
               // if(count ===1)
               // {
                    return error.response
               // }
                //count = 1;
            }
      //  }
        
    }
}