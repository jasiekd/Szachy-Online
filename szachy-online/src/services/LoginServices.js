import axios from "axios";
import { HostName } from "../HostName";
import jwtDecode from "jwt-decode";

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