import { useState } from "react";
import { useEffect } from "react";
import { ThemeInput } from "./ThemeInput";

export default function LoginComponent({onLogin,getStyle,show,hide,setUserName}){

    const[isLoginError,setIsLoginError] = useState(false);
    const[loginStstus,setLoginStstus] = useState(-1);
    const[loginHelperText,setLoginHelperText] = useState("");
    useEffect(() => {
        if(loginStstus==401)
        {
            setIsLoginError(true);
            setLoginHelperText("Niepoprawne dane logowania");
        }
        setLoginStstus(-1);
   }, [loginStstus]);
   
    const[loginVal,setLoginVal] = useState("");
    const[passwordVal,setPasswordnVal] = useState("");

    const onChangeLogin = e =>{
        setIsLoginError(false);
        setLoginHelperText("");
        setLoginVal(e.target.value);
        setLoginStstus(200);
    }
    const onChangePassword = e =>{
        setIsLoginError(false);
        setLoginHelperText("");
        setPasswordnVal(e.target.value);
        setLoginStstus(200);
    }
    
    const onClickLogin = () =>{
        onLogin({loginVal,passwordVal},setLoginStstus,setUserName);
    }

    return(
        <div className='option' style={getStyle} onMouseOver={show}  onMouseOut={hide}>
            <div className='option-elements'>
                <ThemeInput error={isLoginError} helperText={loginHelperText} id="filled-basic" label="Login" variant="outlined" fullWidth value={loginVal} onChange={onChangeLogin}/>
                <ThemeInput error={isLoginError} helperText={loginHelperText} id="filled-basic" label="Hasło" variant="outlined" fullWidth value={passwordVal} onChange={onChangePassword} type="password"/>
                <button className='option-btn' onClick={()=>onClickLogin()}>
                    <p className='slide-btn-text'>Zaloguj</p>
                </button>
            </div>     
        </div>
    )
}