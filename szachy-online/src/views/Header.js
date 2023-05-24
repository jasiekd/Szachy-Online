import React, { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import helpIcon from "../img/help.png";
import imgLogo from '../img/logo.png';
import imgChess from '../img/chess.png';
import imgFile from '../img/file.png';
import imgFriends from '../img/friends.png';
import imgLogin from '../img/login.png';
import imgRegister from '../img/register.png';
import LoginComponent from "../components/LoginComponent";
import LoginController, { checkIsLogged,logOut } from "../controllers/LoginController";
import RegisterComponent from "../components/RegisterComponent";
import RegisterController from "../controllers/RegisterController";
import FriendsComponent from "../components/FriendsComponent";
import GameOptionsHHComponent from "../components/GameOptionsHHComponent";
import GameOptionsTHHComponent from "../components/GameOptionsTHHComponent";
import GameComponent from "../components/GameComponent";
import FileComponent from "../components/FileComponent";
import FriendController from "../controllers/FriendController";
import AccountController from "../controllers/AccountController";
import GameController from "../controllers/GameController";


function LoggeAs({getUser}){
    const[userName,setUserName] = useState("");
    useEffect(()=>{
        getUser().then((result)=>{
            setUserName(result.name+" "+result.surname);
        })
    },[])
    return(
        <div className='logedAs'>
            <p>Zalogowano jako:</p> 
            {userName}
        </div>
    )
}

function Header(){
    const[userName,setUserName] = useState("");//huba wywalic
    

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
    const showTurnbasedHumanHumanOptions=()=>{
        hideGameOptions();
        showTurnbasedHumanHuman();
    }

    const [getHumanHumanOptionsStyle,setHumanHumanOptionsStyle] = useState({width:"0rem"});
    const showHumanHuman=() =>{
        setHumanHumanOptionsStyle({width:"55rem"});
    }
   

    const hideAdditionalMenu=()=>{
        setHumanHumanOptionsStyle({width:"0rem"});
        setTurnbasedHumanHumanOptionsStyle({width:"0rem"});
        
    }
    const [getTurnbasedHumanHumanOptionsStyle,setTurnbasedHumanHumanOptionsStyle] = useState({width:"0rem"});
    const showTurnbasedHumanHuman=() =>{
        setTurnbasedHumanHumanOptionsStyle({width:"55rem"});
    }
   


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
            !checkIsLogged()?
                <>
                    <button className="nav-btn" onMouseOver={showLogin} onMouseOut={hideLogin}  onClick={hideAdditionalMenu}>
                        <img className="btn-img" src={imgLogin} alt=""/>
                        <p>Logowanie</p>
                    </button>
                    <button className="nav-btn" onMouseOver={showRegister} onMouseOut={hideRegister}  onClick={hideAdditionalMenu}>
                        <img className="btn-img" src={imgRegister} alt=""/>
                        <p>Rejestracja</p>   
                    </button>
                </>
                :
                <>
                    <button className="nav-btn" onMouseOver={showFriendOptions} onMouseOut={hideFriendOptions} onClick={hideAdditionalMenu}>
                        <img className="btn-img" src={imgFriends} alt=""/>
                        <p>Znajomi</p>
                    </button>
                    <button className="nav-btn" onClick={()=>logOut()}>
                        <img className="btn-img" src={imgLogin} alt=""/>
                        <p>Wyloguj</p>
                    </button>
                </>
            }

            <button className="nav-btn" onClick={showHelpWindow}>
                <img className="btn-img" src={helpIcon} alt="" />
                <p>Pomoc</p>
            </button>
            {
                checkIsLogged()?
                    <AccountController>
                        <LoggeAs/>
                    </AccountController>
                :
                    null
            }
        </nav>

        <GameComponent getStyle={getGameStyle} show={showGameOptions} hide={hideGameOptions} showOHH={showHumanHumanOptions} showTHH={showTurnbasedHumanHumanOptions}/>
        <FileComponent getStyle={getFileStyle} show={showFileOptions} hide={hideFileOptions}/>
        {
        checkIsLogged()?
            <FriendController>
                <FriendsComponent getStyle={getFriendStyle} show={showFriendOptions} hide={hideFriendOptions}/>
            </FriendController>
            
        :
            null

        }

        {
        !checkIsLogged()?
            <>
                <LoginController>
                    <LoginComponent getStyle={getLoginStyle} show={showLogin} hide={hideLogin} setUserName={setUserName}/>
                </LoginController>
                <RegisterController>
                    <RegisterComponent getStyle={getRegisterStyle} show={showRegister} hide={hideRegister} setUserName={setUserName}/>
                </RegisterController>
            </>
        :
        null
        }
        <GameController>
        <GameOptionsHHComponent getStyle={getHumanHumanOptionsStyle} hide={hideAdditionalMenu}/>
        </GameController>
        <GameOptionsTHHComponent getStyle={getTurnbasedHumanHumanOptionsStyle} hide={hideAdditionalMenu}/>
        
</>
    );
}
export default Header;