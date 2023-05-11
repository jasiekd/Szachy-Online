import React from "react";
import AccountService from "../services/AccountService";
import Swal from "sweetalert2";
export default function AccountController({children})
{
    const gateway = new AccountService();

    const getAnyUser = async(userId,setUserName) => {
        const response = await gateway.getAnyUser(userId);

        if(response.status === 200)
        {
            setUserName(response.data.nickname);
        } 
    }
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
    return React.cloneElement(children,{
        getAnyUser,
        getUser
    })
}