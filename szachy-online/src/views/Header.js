import React, { useState,useEffect } from "react";
import {Login, getUser, logout,register} from "../services/AccountService";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { ThemeInput } from '../components/ThemeInput';
import helpIcon from "../img/help.png";
import imgLogo from '../img/logo.png';
import imgChess from '../img/chess.png';
import imgFile from '../img/file.png';
import imgFriends from '../img/friends.png';
import imgLogin from '../img/login.png';
import imgRegister from '../img/register.png';
import friendList from "../img/friend.png";
import onlineHumanHuman from "../img/occ.png";
import onlineHumanComputer from "../img/ocm.png";
import localHumanHuman from "../img/tcc.png";
import continueIcon from "../img/right-arrow.png";
import chessHistory from "../img/chessHistory.png";
import addFriend from "../img/add.png";
import { GetListOfPendingInvitations, SendInvitation } from "../services/FriendService";
import withReactContent from "sweetalert2-react-content";
import PendingFriendsInvitation from "../components/PendingFriendsInvitation";
function Header(){

    const[userName,setUserName] = useState("");
    const [isLogged, setIsLogged] = useState(false);
    useEffect(() => {
         if(localStorage.getItem("accessToken")!=null) 
         {
            setIsLogged(true);
            getUser(setUserName);
         }
    }, []);



    const [nameVal,setNameVal] = useState("");
    const [surnameVal,setSurnameVal] = useState("");
    const [emailVal,setEmailVal] = useState("");
    const [loginValReg,setLoginValReg] = useState("");
    const [passwordValReg,setPasswordValReg] = useState("");
    const [nicknameValReg,setNicknameValReg] = useState("");
    const navigate = useNavigate();
    const [getGameStyle, setGameStyle] = useState({width:"0rem"});
    
    const showGameOptions=() =>{
        setGameStyle({width:"25rem"});
        
    }
    const hideGameOptions=() =>{
        setGameStyle({width:"0rem"});
    }
    const [getFileStyle, setFileStyle] = useState({width:"0rem"});
    const showFileOptions=() =>{
        setFileStyle({width:"25rem"});

    }
    const hideFileOptions=() =>{
        setFileStyle({width:"0rem"});
    }

    const [getFriendStyle,setFriendStyle] = useState({width:"0rem"});
    const showFriendOptions=() =>{
        setFriendStyle({width:"25rem"});

    }
    const hideFriendOptions=() =>{
        setFriendStyle({width:"0rem"});
    }
    
    const [getLoginStyle,setLoginStyle] = useState({width:"0rem"});
    const showLogin=() =>{
        setLoginStyle({width:"25rem"});

    }
    const hideLogin=() =>{
        setLoginStyle({width:"0rem"});
    }
    const [getRegisterStyle,setRegisterStyle] = useState({width:"0rem"});
    const showRegister=() =>{
        setRegisterStyle({width:"25rem"});

    }
    const hideRegister=() =>{
        setRegisterStyle({width:"0rem"});
    }

    const showHumanHumanOptions=()=>{
        hideGameOptions();
        showHumanHuman();
    }

    const [getHumanHumanOptionsStyle,setHumanHumanOptionsStyle] = useState({width:"0rem"});
    const showHumanHuman=() =>{
        setHumanHumanOptionsStyle({width:"55rem"});
    }
    const hideHumanHuman=() =>{
        setHumanHumanOptionsStyle({width:"0rem"});
    }

    const hideAdditionalMenu=()=>{
        setHumanHumanOptionsStyle({width:"0rem"});
        setTurnBasedOptionsStyle({width:"0rem"});
    }
    const [getTurnBasedOptionsStyle,setTurnBasedOptionsStyle] = useState({width:"0rem"});
    const showTurnBasedMenu=() =>{
        setTurnBasedOptionsStyle({width:"100%"});
    }
    const hideTurnBasedMenu=() =>{
        setTurnBasedOptionsStyle({width:"0rem"});
    }
    const startGameHumanHumanOnline=()=>{
        navigate("/chessBoard");
    }
    ////////////////* Edit Login from inputs*////////////////////
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
    ///////////////////////////////////////////////////////////////////

    ////////////////* Edit Register from inputs*/////////////////////////
    const resetRegError=()=>{
        setIsRegisterError(false);
        setRegisterHelperLogEmailText("");
        setRegisterHelperText("");
        setRegisterStstus(200);
    }
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

    //////////////////////////////////////////////////////////////////

    ////////////////* Login error message system*////////////////////
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
   ///////////////////////////////////////////////////////////////////

   ///////////////* Register error message system*////////////////////
   const[isRegisterError,setIsRegisterError] = useState(false);
   const[registerStstus,setRegisterStstus] = useState(-1);
   const[registerHelperLogEmailText,setRegisterHelperLogEmailText] = useState("");
   const[registerHelperText,setRegisterHelperText] = useState("");
   useEffect(() => {
        if(registerStstus===500)
        {
            setIsRegisterError(true);
            setRegisterHelperLogEmailText("Konto o podanym loginie lub email już istnieje");
        }
        else if(registerStstus===400)
        {
            setIsRegisterError(true);
            setRegisterHelperLogEmailText("Pola nie mogą być puste");
            setRegisterHelperText("Pola nie mogą byc puste");
        }
        setRegisterStstus(-1);
    }, [registerStstus]);

    const onClickRegister=()=>{
        
        register(nameVal,surnameVal,emailVal,loginValReg,passwordValReg,nicknameValReg,setRegisterStstus);
        setNameVal("");
        setSurnameVal("");
        setEmailVal("");
        setLoginValReg("");
        setPasswordValReg("");
        setNicknameValReg("");
    }
   ///////////////////////////////////////////////////////////////////

   /////////////////////////* Help window*////////////////////////////
    const showHelpWindow = () =>{
        Swal.fire({
            icon: 'question',
            background: "#20201E",
            color: "white",
            width: "50rem",
            html:"<div><div style='font-size:2rem; font-weight:800;'>Napisz do nas jeśli masz problem</div><div style='color:#C26833; font-weight:800;'>email: szachyonline@gmail.com</div></div>",
            showConfirmButton: false,
          })
    }

   ///////////////////////////////////////////////////////////////////


    const addFriendWindow= () =>{
        const nickname =  Swal.fire({
            title: 'Dodaj znajomego',
            background: "#20201E",
            color: "white",
            input: 'text',
            inputLabel: 'Podaj nickname użytkownika',
            inputPlaceholder: 'nickname',
            confirmButtonText: "Wyślij zaproszenie",
            confirmButtonColor: "#C26833"
          }).then((result)=>{
            if(result.isConfirmed)
            {
                SendInvitation(result.value);
            }
          })
          
          
    }

    const pendingFriendWindow = () =>{
        const MySwal = withReactContent(Swal)
        GetListOfPendingInvitations().then((result) => {

            if(result!==null)
            {
                //console.log(result[0].user1ID);
                result.map((val,key)=>{
                    console.log(val.user1ID);
                })
                MySwal.fire({
                    title: 'Oczekujące zaproszenia',
                    background: "#20201E",
                    color: "white",
                    confirmButtonText: "Zamknij",
                    confirmButtonColor: "#C26833",
                    html: 
                        result.map((val,key)=>{
                            return(val.user1ID);
                        })
                    
                       
                    
                    
                })
            }
        });

        
    }

    const[loginVal,setLoginVal] = useState("");
    const[passwordVal,setPasswordnVal] = useState("");
    return(
        <>
        <nav className="app-nav">
        <div className="logo">
            <img className="img-logo" src={imgLogo} alt=""/>
        </div>

        <button className="nav-btn" onMouseOver={showGameOptions} onMouseOut={hideGameOptions} onClick={hideAdditionalMenu}>
            <img className="btn-img" src={imgChess} alt=""/>
            <p>Graj</p>
        </button>
        <button className="nav-btn" onMouseOver={showFileOptions} onMouseOut={hideFileOptions}  onClick={hideAdditionalMenu}>
            <img className="btn-img" src={imgFile} alt=""/>
            <p>Pliki</p>
        </button>




        {
        !isLogged?
        <div>
                <button className="nav-btn" onMouseOver={showLogin} onMouseOut={hideLogin}  onClick={hideAdditionalMenu}>
                    <img className="btn-img" src={imgLogin} alt=""/>
                    <p>Logowanie</p>
                </button>
                <button className="nav-btn" onMouseOver={showRegister} onMouseOut={hideRegister}  onClick={hideAdditionalMenu}>
                    <img className="btn-img" src={imgRegister} alt=""/>
                    <p>Rejestracja</p>   
                </button>
            </div>
            :
            <div>
                <button className="nav-btn" onMouseOver={showFriendOptions} onMouseOut={hideFriendOptions} onClick={hideAdditionalMenu}>
                    <img className="btn-img" src={imgFriends} alt=""/>
                    <p>Znajomi</p>
                </button>
                <button className="nav-btn" onClick={()=>logout(setIsLogged,setUserName)}>
                    <img className="btn-img" src={imgLogin} alt=""/>
                    <p>Wyloguj</p>
                </button>
            </div>
        }
        <button className="nav-btn" onClick={showHelpWindow}>
            <img className="btn-img" src={helpIcon} alt="" />
            <p>Pomoc</p>
        </button>
        {
            isLogged?
                <div className='logedAs'>
                    <p>Zalogowano jako:</p> 
                    {userName}
                </div>
            :
                <div></div>
        }
        </nav>
        <div className='option' style={getGameStyle} onMouseOver={showGameOptions}  onMouseOut={hideGameOptions}>
        <button className='nav-btn' onClick={showHumanHumanOptions}>
            <img className="btn-img" src={onlineHumanHuman} alt=""/>
            <p className='slide-btn-text'>Online Człowiek - Człowiek</p>
        </button>
        <button className='nav-btn' onClick={showTurnBasedMenu}>
            <img className="btn-img" src={localHumanHuman} alt=""/>
            <p className='slide-btn-text'>Turowo Człowiek - Człowiek</p>
        </button>
        <button className='nav-btn' onClick={()=>console.log(localStorage.accessToken)}>
            <img className="btn-img" src={onlineHumanComputer} alt=""/>
            <p className='slide-btn-text'>Online Człowiek - Maszyna</p>
        </button>
    </div>
    <div className='option' style={getFileStyle} onMouseOver={showFileOptions}  onMouseOut={hideFileOptions}>
        <button className='nav-btn'>
            <img className="btn-img" src={continueIcon} alt=""/>
            <p className='slide-btn-text'>Wznów gre z pliku</p>
        </button>
        <button className='nav-btn'>
            <img className="btn-img" src={chessHistory} alt=""/>
            <p className='slide-btn-text'>Historia rozgrywki z pliku</p>
        </button>
    </div>
    {
    isLogged?
        <div className='option' style={getFriendStyle} onMouseOver={showFriendOptions}  onMouseOut={hideFriendOptions}>
        <button className='nav-btn'>
            <img className="btn-img" src={friendList} alt=""/>
            <p className='slide-btn-text'>Lista znajomych</p>
        </button>
        <button className='nav-btn' onClick={addFriendWindow}>
            <img className="btn-img" src={addFriend} alt=""/>
            <p className='slide-btn-text'>Dodaj znajomego</p>
        </button>
        <button className='nav-btn' onClick={pendingFriendWindow}>
            <img className="btn-img" src={addFriend} alt=""/>
            <p className='slide-btn-text'>Oczekujące zaproszenia</p>
        </button>
        </div>
    :
        <div></div>

    }

    {
    !isLogged?
        <div>
            <div className='option' style={getLoginStyle} onMouseOver={showLogin}  onMouseOut={hideLogin}>
                <div className='option-elements'>
                    <ThemeInput error={isLoginError} helperText={loginHelperText} id="filled-basic" label="Login" variant="outlined" fullWidth value={loginVal} onChange={onChangeLogin}/>
                    <ThemeInput error={isLoginError} helperText={loginHelperText} id="filled-basic" label="Hasło" variant="outlined" fullWidth value={passwordVal} onChange={onChangePassword} type="password"/>
                    <button className='option-btn' onClick={()=>Login(loginVal,passwordVal,setIsLogged,setLoginStstus,setUserName)}>
                        <p className='slide-btn-text'>Zaloguj</p>
                    </button>
                </div>    
                    
                
                
            </div>
                <div className='option' style={getRegisterStyle} onMouseOver={showRegister}  onMouseOut={hideRegister}>
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
        </div>
    :
    <div></div>
    }
    
    <div className="option game-options" style={getHumanHumanOptionsStyle} >
        
            <div>Ustawienia rozgrywki Online Człowiek-Człowiek</div>
            <div className='freind-invate'>
                <select className='friend-select'>
                    <option value="0">Wybierz gracza</option>
                    <option value="1">Jan Nowak</option>
                    <option value="2">Jan Nowak</option>
                    <option value="3">Jan Nowak</option>
                    <option value="4">Jan Nowak</option>
                    <option value="5">Jan Nowak</option>
                    <option value="6">Jan Nowak</option>
                    <option value="7">Jan Nowak</option>
                    <option value="8">Jan Nowak</option>
                    <option value="9">Jan Nowak</option>
                    <option value="10">Jan Nowak</option>
                    <option value="11">Jan Nowak</option>
                    <option value="12">Jan Nowak</option>
                </select>
                <button className='option-btn'>Zaproś</button>
                <button className='option-btn'>Anuluj</button>
            </div>
            <div className='invate-status'>
                Status zaproszenia: niewysłano
            </div>
                
            <div>
                Mój kolor:
                <select className='friend-select'>
                    <option value="0">Wybierz kolor</option>
                    <option value="1">Czarny</option>
                    <option value="1">Biały</option>
                </select>
            </div>
            <div>
                <button className='option-btn' onClick={startGameHumanHumanOnline}>Rozpocznij</button>
                <button className='option-btn' onClick={hideAdditionalMenu}>Anuluj</button>
            </div>
        
        
    </div>
    <div className="option game-options" style={getTurnBasedOptionsStyle} >
        <p>Ustawienia rozgrywki Turowej Człowiek-Człowiek</p>
    </div>
</>
    );
}
export default Header;