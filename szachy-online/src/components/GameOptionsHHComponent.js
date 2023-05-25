import { useNavigate } from "react-router-dom";
import Autocomplete from '@mui/material/Autocomplete';
import { ThemeInput } from "./ThemeInput";
import { useEffect, useState } from "react";
import FriendController from "../controllers/FriendController";
import GameController from "../controllers/GameController";

function SendInvate({invateToGame,friendId}){
    const invate = () => {
       // console.log("Fuid:"+friendId);
        invateToGame(friendId);
    }
    return(
        <>
             <button className='option-btn' onClick={()=>invate()}>Zaproś</button>
            <button className='option-btn'>Anuluj</button>
        </>
    )
}

function FreindInvate({onGetFriendsList}){
    const [data,setData] = useState([]);
    const [selectedFriendId,setSelectedFriendId] = useState(null);
   
    const selectFriend = (friendObj) =>{
        
        if(friendObj.userId1 === localStorage.uid)
        {
            setSelectedFriendId(friendObj.userId2);
        }else
        {
            setSelectedFriendId(friendObj.userId1);
        }
    }

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
                getOptionLabel={(option)=>
                    localStorage.uid===option.userId1?
                    option.user2Nickname
                    :
                    option.user1Nickname
                }
                sx={{width:"100%"}}
                onChange={(event,value) => selectFriend(value)}
                renderInput={(params) => <ThemeInput {...params}  label="Nickname" onClick={()=>getMyFriendsList()}/>}
            />
            <GameController>
               <SendInvate friendId={selectedFriendId}/>
            </GameController>  
            
        </div>
    )
}

export default function GameOptionsHHComponent({getStyle,hide,createConnectToInvHub}){
    const navigate = useNavigate();

    const startGameHumanHumanOnline=()=>{
        navigate("/chessBoard");
    }
    const conect = () =>{
        createConnectToInvHub();
        
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