import RegisterServices from "../services/RegisterServices"
import React from "react";
import Swal from "sweetalert2";
import { useState } from "react";
export default function RegisterController({children})
{
    const[isRegisterError,setIsRegisterError] = useState(false);
    const[registerHelperLogEmailText,setRegisterHelperLogEmailText] = useState("");
    const[registerHelperText,setRegisterHelperText] = useState("");

    const register = async (registerData) =>{
        const gateway = new RegisterServices();
        const response = await gateway.register(registerData);
        if(response.status === 404)
        {
            setIsRegisterError(true);
            setRegisterHelperLogEmailText("Pola nie mogą być puste");
            setRegisterHelperText("Pola nie mogą byc puste");
        }
        else if(response.status === 201)
        {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Zarejestrowano',
                background: "#20201E",
                showConfirmButton: false,
                timer: 1500
              })
        }
        else if(response.status === 500)
        {
            setIsRegisterError(true);
            setRegisterHelperLogEmailText("Konto o podanym loginie lub email już istnieje");
        }
    }
    const resetRegError=()=>{
        setIsRegisterError(false);
        setRegisterHelperLogEmailText("");
        setRegisterHelperText("");
    }
    return React.cloneElement(children,{
        onRegister: register,
        isRegisterError,
        registerHelperLogEmailText,
        registerHelperText,
        resetRegError
    })
}