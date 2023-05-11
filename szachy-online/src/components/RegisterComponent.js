import { ThemeInput } from "./ThemeInput"
import { useState , useEffect } from "react";

export default function RegisterComponent({onRegister,getStyle,show,hide,setUserName,isRegisterError,registerHelperLogEmailText,registerHelperText,resetRegError}){
    const [nameVal,setNameVal] = useState("");
    const [surnameVal,setSurnameVal] = useState("");
    const [emailVal,setEmailVal] = useState("");
    const [loginValReg,setLoginValReg] = useState("");
    const [passwordValReg,setPasswordValReg] = useState("");
    const [nicknameValReg,setNicknameValReg] = useState("");

    const onChangeNameReg = e =>{
        setNameVal(e.target.value);
        resetRegError();
    }
    const onChangeSurnameReg = e =>{
        setSurnameVal(e.target.value);
        resetRegError();
    }
    const onChangeEmailReg = e =>{
        setEmailVal(e.target.value);
        resetRegError();
    }
    const onChangeLoginReg = e =>{
        setLoginValReg(e.target.value);
        resetRegError();
    }
    const onChangePasswordReg = e =>{
        setPasswordValReg(e.target.value);
        resetRegError();
    }
    const onChangeNicknameReg = e =>{
        setNicknameValReg(e.target.value);
        resetRegError();
    }

    


    

    const onClickRegister=()=>{
        onRegister({nameVal,surnameVal,emailVal,loginValReg,passwordValReg,nicknameValReg});
        setNameVal("");
        setSurnameVal("");
        setEmailVal("");
        setLoginValReg("");
        setPasswordValReg("");
        setNicknameValReg("");
    }
    return(
        <div className='option' style={getStyle} onMouseOver={show}  onMouseOut={hide}>
                    <div className='option-elements'>
                        <ThemeInput error={isRegisterError} helperText={registerHelperText} id="filled-basic" label="Imie" variant="outlined" fullWidth value={nameVal} onChange={onChangeNameReg}/>
                        
                        <ThemeInput error={isRegisterError} helperText={registerHelperText} id="filled-basic" label="Nazwisko" variant="outlined" fullWidth value={surnameVal} onChange={onChangeSurnameReg}/>

                        <ThemeInput type='email' error={isRegisterError} helperText={registerHelperLogEmailText} id="filled-basic" label="Email" variant="outlined" fullWidth value={emailVal} onChange={onChangeEmailReg}/>

                        <ThemeInput error={isRegisterError} helperText={registerHelperLogEmailText} id="filled-basic" label="Login" variant="outlined" fullWidth value={loginValReg} onChange={onChangeLoginReg}/>

                        <ThemeInput error={isRegisterError} helperText={registerHelperText} id="filled-basic" label="Hasło" variant="outlined" fullWidth  value={passwordValReg} onChange={onChangePasswordReg} type='password'/>

                        <ThemeInput error={isRegisterError} helperText={registerHelperText} id="filled-basic" label="Nickname" variant="outlined" fullWidth  value={nicknameValReg} onChange={onChangeNicknameReg}/>
                        <button className='option-btn' onClick={onClickRegister}>
                            <p className='slide-btn-text'>Rejestruj</p>
                        </button>    
                    </div>
        </div>
    )
}