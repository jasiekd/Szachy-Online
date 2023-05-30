import axios from "axios";
import { HostName } from "../HostName";
import jwtDecode from "jwt-decode";
import Swal from "sweetalert2";

export async function refreshTonke(){
    try{
        const response = await axios.post(HostName+'/api/Token/refresh',
        {
            accessToken: localStorage.accessToken,
            refreshTokken: localStorage.refreshToken
        })
        localStorage.accessToken = response.data.accessToken;
        localStorage.refreshToken = response.data.refreshToken;
    }catch(error){
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Błąd odnawiania sesji',
            background: "#20201E",
            showConfirmButton: false,
            timer: 1500
          })
    }
}

export default class LoginService{
    
    async login(data)
    {
        try{
            const response = await axios.post(HostName+'/api/Account/login',
            {
                userName: data.loginVal,
                password: data.passwordVal
            })
            localStorage.accessToken = response.data.accessToken;
            localStorage.refreshToken = response.data.refreshToken;
            const rawDecodedToken = jwtDecode(response.data.accessToken)
            localStorage.uid = rawDecodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`;
            return response;
        }catch(error)
        {
            return error.response;
        }
    }
}