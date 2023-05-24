import { useNavigate } from "react-router-dom";
import Autocomplete from '@mui/material/Autocomplete';
import { ThemeInput } from "./ThemeInput";
import { useEffect, useState } from "react";
import FriendController from "../controllers/FriendController";

function FreindInvate({onGetFriendsList}){
    const [data,setData] = useState([]);

   

    const getMyFriendsList = () => {
        onGetFriendsList().then(r=>{
            setData(r);
            console.log(r)
        })
    }

    return(
        <div className='freind-invate'>
            <Autocomplete
                options={data}
                disableClearable
                getOptionLabel={(option)=>option.user1ID}
                sx={{width:"100%"}}
                //onChange={(event,value) => onSearchFriend(value)}
                renderInput={(params) => <ThemeInput {...params}  label="Nickname" onClick={()=>getMyFriendsList()}/>}
            />
                
            <button className='option-btn'>Zaproś</button>
            <button className='option-btn'>Anuluj</button>
        </div>
    )
}

export default function GameOptionsHHComponent({getStyle,hide,createConnectToChessHub}){
    const navigate = useNavigate();

    const startGameHumanHumanOnline=()=>{
        navigate("/chessBoard");
    }
    const conect = () =>{
        createConnectToChessHub();
    }
    return(
        <>
            <div className="option game-options" style={getStyle} >
            
            <div>Ustawienia rozgrywki Online Człowiek-Człowiek</div>
            <FriendController>
                <FreindInvate/>
            </FriendController>
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
                <button className='option-btn' onClick={conect}>Rozpocznij</button>
                <button className='option-btn' onClick={hide}>Anuluj</button>
            </div>
        
        
    </div>
  
        </>
    )
}