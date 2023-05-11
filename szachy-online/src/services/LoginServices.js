import axios from "axios";
import { HostName } from "../HostName";

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
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`;
            return response;
        }catch(error)
        {
            return error.response;
        }
    }
}