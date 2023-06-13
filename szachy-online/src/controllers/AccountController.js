import React from "react";
import AccountService from "../services/AccountService";
import Swal from "sweetalert2";
export default function AccountController({children})
{
    const gateway = new AccountService();
    
    const getUser = async() => {
        const response = await gateway.getUser();

        if(response.status === 200)
        {
            return response.data;
            
        }
        else{
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Błąd pobierania danych użytkownika',
                background: "#20201E",
                showConfirmButton: false,
                timer: 1500
              })
        }
    }

    const getUserById = async(uid) =>{
        const response = await gateway.getUserById(uid);
        if(response.status === 200)
        {
            return response.data.nickname;
            
        }
        else{
            return "error_get_user_by_id"
        }
    }

    const findByNickName = async(nickname) =>{
        const response = await gateway.findByNickName(nickname);

        if(response.status === 200)
        {
            return response.data;
        }
        else{
           
            return [];
        }
    }

    const getMyHistory = async() =>{
        const response = await gateway.getMyHistory();
        if(response.status === 200)
        {
            return response.data;
        }
        else{
           
            return [];
        }
    }

    const getMyFriendHistory = async() =>{
        const response = await gateway.getMyFriendHistory();
        if(response.status === 200)
        {
            return response.data;
        }
        else{
           
            return [];
        }
    }
    return React.cloneElement(children,{
        getUser,
        findByNickName,
        getUserById,
        getMyHistory,
        getMyFriendHistory
    })
}