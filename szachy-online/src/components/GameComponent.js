import AccountController from "../controllers/AccountController";
import GameController from "../controllers/GameController";
import onlineHumanHuman from "../img/occ.png";
import onlineHumanComputer from "../img/ocm.png";
import localHumanHuman from "../img/tcc.png";
import GameInvate from "./GameInvate";
import { useEffect, useState } from "react";
export default function GameComponent({getStyle,show,hide,showOHH,showTHH,showTHC,setInvateDialogRef}){
    const [openGameInvate, setOpenGameInvate] = useState(false);
    const [update,setUpdate] = useState(false);
    const handleCloseGameInvate = () => {
        setOpenGameInvate(false);
    };
    const openGameInvateDialog = () =>{
            setOpenGameInvate(true); 
            setUpdate(!update);  
    }
    
    useEffect(()=>{
        setInvateDialogRef(openGameInvateDialog,handleCloseGameInvate);
    },[])
    return(
        <div className='option' style={getStyle} onMouseOver={show}  onMouseOut={hide}>
            <AccountController>
                <GameController>
                    <GameInvate open={openGameInvate} handleClose={handleCloseGameInvate} update={update}/>
                </GameController>
            </AccountController>
            <button className='nav-btn' onClick={showOHH}>
                <img className="btn-img" src={onlineHumanHuman} alt=""/>
                <p className='slide-btn-text'>Online Człowiek - Człowiek</p>
            </button>
            <button className='nav-btn' onClick={showTHH}>
                <img className="btn-img" src={localHumanHuman} alt=""/>
                <p className='slide-btn-text'>Turowo Człowiek - Człowiek</p>
            </button>
            <button className='nav-btn' onClick={showTHC}>
                <img className="btn-img" src={onlineHumanComputer} alt=""/>
                <p className='slide-btn-text'>Online Człowiek - Maszyna</p>
            </button>
        </div>
    )
}