import axios from "axios";
import { HostName } from "../HostName";
import Swal from 'sweetalert2';

axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;

export default class FriendService{
    async getListOfPendingInvitationsc(){
        try{
            const response = await axios.get(HostName+'/api/Friends/GetListOfPendingInvitations',{});
            return response;
        }catch(error)
        {
            return error.response;
        }
    }
    async sendInvitation(nickname){
        try{
            const response = await axios.get(HostName+'/api/Friends/sendInvitation/'+nickname,{});
            return response;
        }catch(error)
        {
            return error.response;
        }
    }
    async acceptInvitation(invitationID){
        try{
            const response = await axios.get(HostName+'/api/Friends/acceptInvitation/'+invitationID,{});
            return response;
        }catch(error){
            return error.response;
        }
    }
    async getListOfFriends(){
        try{
            const response = await axios.get(HostName+'/api/Friends/GetListOfFriends',{});
            return response;
        }catch(error){
            return error.response;
        }
    }
    async removeFriend(friendID){
        try{
            const response = await axios.delete(HostName+'/api/Friends/removeFriend/'+friendID,{});
            return response;
        }catch(error){
            return error.response;
        }
    }
    async getListOfMySentInvitations(){
        try{
            const response = await axios.get(HostName+"/api/Friends/GetListOfMySentInvitations",{});
            return response;
        }catch(error){
            return error.response
        }
    }
}