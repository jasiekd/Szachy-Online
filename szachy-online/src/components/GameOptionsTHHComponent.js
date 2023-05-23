import { useNavigate } from "react-router-dom";
import { ThemeInput } from "./ThemeInput"
import { useState , useEffect } from "react";

export default function GameOptionsTHHComponent({getStyle,hide}){
    const navigate = useNavigate();

    const [nickname,setNickname] = useState("");
    const [nicknameSecondPlayer,setNicknameSecondPlayer] = useState("");

    const startGameTurnbasedHumanHumanOnline=()=>{
        navigate();
        if(!nickname) return;
        if(!nicknameSecondPlayer) return;
        navigate("/turnbasedGameplay",{state:{nick:nickname,secondNick:nicknameSecondPlayer}});
    }


    return(
        <div className="option game-options" style={getStyle}>   
            <div>Ustawienia rozgrywki turowej Człowiek-Człowiek</div>
            <div className='freind-invate'>
                <div style={{backgroundColor:'white',height:'100%',width:150}}/>
                <ThemeInput id="filled-basic" label="Nazwa gracza" variant="outlined" fullWidth value={nickname} onChange={(e)=>setNickname(e.target.value)}/>
                <div style={{backgroundColor:'black',height:'100%',width:150}}/>
                <ThemeInput id="filled-basic" label="Nazwa drugiego gracza" variant="outlined" fullWidth value={nicknameSecondPlayer} onChange={(e)=>setNicknameSecondPlayer(e.target.value)}/>
            </div>
           
                
            
            <div>
                <button className='option-btn' onClick={startGameTurnbasedHumanHumanOnline}>Rozpocznij</button>
                <button className='option-btn' onClick={hide}>Anuluj</button>
            </div>
        
        
        </div>
    )
}