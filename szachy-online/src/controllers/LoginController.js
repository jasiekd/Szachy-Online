import axios from "axios";
import Swal from "sweetalert2";
import React from "react";
import LoginService from "../services/LoginServices";
import InvHub from "../services/GameServices";

export function checkIsLogged(){
    if(localStorage.getItem("accessToken")!=null)
    {
        return true;
    }
    return false;
}
export function logOut(){
    localStorage.clear();
    axios.defaults.headers.common['Authorization'] = `Bearer ${null}`;
    InvHub.connection.stop();
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Wylogowano',
        background: "#20201E",
        showConfirmButton: false,
        timer: 1500
      })
    checkIsLogged();
}


export default function LoginController({children})
{

    const login = async (loginData,setStatus,setUserName)=>{ 
        const gateway = new LoginService();
        const response = await gateway.login(loginData);
        if(response.status === 401){
            setStatus(response.status);
        }
        else if(response.status === 200){
            new InvHub().refactorConnection();
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Zalogowano',
                background: "#20201E",
                showConfirmButton: false,
                timer: 1500
              })
        }
    }
    return React.cloneElement(children,{
        onLogin: login
    })
}