import { useNavigate } from "react-router-dom";
export default function GameOptionHMComponent({getStyle,hide,createGameWithComputer}){
    const navigate = useNavigate();

    const startGame=()=>{
        createGameWithComputer(1,"White",1)
    }

    return(
        <>
            <div className="option game-options" style={getStyle} >
            
            <div>Ustawienia rozgrywki Online Człowiek-Maszyna</div>
            <div>
                <button className='option-btn' onClick={startGame}>Rozpocznij</button>
                <button className='option-btn' onClick={hide}>Anuluj</button>
            </div>
        
        
    </div>
  
        </>
    )
}