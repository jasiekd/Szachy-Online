import { useNavigate } from "react-router-dom";

export default function GameOptionsHHComponent({getStyle,hide}){
    const navigate = useNavigate();
    const startGameHumanHumanOnline=()=>{
        navigate("/chessBoard");
    }
    return(
        <>
            <div className="option game-options" style={getStyle} >
            
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
                <button className='option-btn' onClick={hide}>Anuluj</button>
            </div>
        
        
    </div>
  
        </>
    )
}