import Swal from "sweetalert2";
import React from "react";
import FriendService from "../services/FriendService";

export default function FriendController({children})
{
    const gateway = new FriendService();

    const getListOfPendingInvitations = async() =>{
        const response = await gateway.getListOfPendingInvitationsc();
        if(response.status === 200)
        {
            return response.data;
        }
        else{
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Błąd pobierania listy zaproszeń',
                background: "#20201E",
                showConfirmButton: false,
                timer: 1500
              });
            return null;
        }
    }

    const sendInvitation = async(nickname) => {
        const response = await gateway.sendInvitation(nickname);
        if(response.status === 200)
        {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Zaproszenie wysłane',
                background: "#20201E",
                showConfirmButton: false,
                timer: 1500
              })
        }
        else if(response.status === 400){
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Użytkownik ma już zaproszenie',
                background: "#20201E",
                showConfirmButton: false,
                timer: 1500
              });
        }
        else {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Błąd wysyłania zaproszenia',
                background: "#20201E",
                showConfirmButton: false,
                timer: 1500
              });
        }
    }
    
    const acceptInvitation = async(invitationID) =>{
        const response = await gateway.acceptInvitation(invitationID);
        if(response.status===200)
        {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Znajomy dodany',
                background: "#20201E",
                showConfirmButton: false,
                timer: 1500
              })
        }else{
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Błąd dodawania znajomych',
                background: "#20201E",
                showConfirmButton: false,
                timer: 1500
              });
        }
        
        console.log("test");
    }

    const getListOfFriends = async() => {
        const response = await gateway.getListOfFriends();
        if(response.status === 200)
        {
            console.log(response.data);
            return response.data;
        }
        else{
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Błąd pobierania listy znajomych',
                background: "#20201E",
                showConfirmButton: false,
                timer: 1500
              });
        }
    }

    const removeFriend = async(friendID) =>{
        const response = await gateway.removeFriend(friendID);
        if(response.status === 204)
        {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Znajomy usunięty',
                background: "#20201E",
                showConfirmButton: false,
                timer: 1500
              })
        }
        else{
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Błąd usuwania znajomego',
                background: "#20201E",
                showConfirmButton: false,
                timer: 1500
              })
        }
    }

    const getListOfMySentInvitations = async() => {
        const response = await gateway.getListOfMySentInvitations();
        if(response.status === 200)
        {
            return response.data;
        }
        else{
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Błąd pobierania listy wysłanych zaproszeń',
                background: "#20201E",
                showConfirmButton: false,
                timer: 1500
              })
        }
    }
    return React.cloneElement(children,{
        onGetList: getListOfPendingInvitations,
        onSendInvitation: sendInvitation,
        acceptInvitation,
        onGetFriendsList: getListOfFriends,
        onRemoveFriend: removeFriend,
        onGetSentList: getListOfMySentInvitations
    })
}