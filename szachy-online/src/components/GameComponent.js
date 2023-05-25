import onlineHumanHuman from "../img/occ.png";
import onlineHumanComputer from "../img/ocm.png";
import localHumanHuman from "../img/tcc.png";
import GameInvate from "./GameInvate";
import { useEffect, useState } from "react";
export default function GameComponent({getStyle,show,hide,showOHH,showTHH,showTHC,setInvateDialogRef}){
    const [openGameInvate, setOpenGameInvate] = useState(false);
    const handleCloseGameInvate = () => {
        console.log("zamykam");
        setOpenGameInvate(false);
    };
    const openGameInvateDialog = () =>{
            console.log("otwieram");
            setOpenGameInvate(true);   
    }
    
    useEffect(()=>{
        setInvateDialogRef(openGameInvateDialog,handleCloseGameInvate);
    },[])
    return(
        <div className='option' style={getStyle} onMouseOver={show}  onMouseOut={hide}>
            <GameInvate open={openGameInvate} handleClose={handleCloseGameInvate}/>
            <button className='nav-btn' onClick={showOHH}>
                <img className="btn-img" src={onlineHumanHuman} alt=""/>
                <p className='slide-btn-text'>Online Człowiek - Człowiek</p>
            </button>
            <button className='nav-btn' onClick={showTHH}>
                <img className="btn-img" src={localHumanHuman} alt=""/>
                <p className='slide-btn-text'>Turowo Człowiek - Człowiek</p>
            </button>
            <button className='nav-btn' >
                <img className="btn-img" src={onlineHumanComputer} alt=""/>
                <p className='slide-btn-text'>Online Człowiek - Maszyna</p>
            </button>
        </div>
    )
}