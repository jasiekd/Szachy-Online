import axios from "axios";
import { HostName } from "../HostName";

export default class RegisterServices{

    async register(data)
    {
        console.log(data);
        try{
            const response = await axios.post(HostName+'/api/Account/register',
            {
                name: data.nameVal,
                surname: data.surnameVal,
                email: data.emailVal,
                login: data.loginValReg,
                password: data.passwordValReg,
                nickname: data.nicknameValReg,
            })
            console.log(response);
            return response;

        }catch(error){
            return error.response;
        }
    }
}