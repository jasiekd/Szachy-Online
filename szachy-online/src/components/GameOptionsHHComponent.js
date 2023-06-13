import { useNavigate } from "react-router-dom";
import Autocomplete from '@mui/material/Autocomplete';
import { ThemeInput } from "./ThemeInput";
import { useEffect, useState } from "react";
import FriendController from "../controllers/FriendController";
import GameController from "../controllers/GameController";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Countdown from 'react-countdown';

function SendInvate({invateToGame,friendId}){
    const [disabledBtn,setDisabledBtn] = useState(false);
    const [endDate,setEndDate] = useState();
    const invate = () => {
        setEndDate(Date.now()+30000)
       setDisabledBtn(true);
        invateToGame(friendId);
    }
    const Completionist = () => <span>Time Out!</span>;
    const renderer = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
            //timeOutInvate(invHub.getSenderUid());
            //handleClose();
            setDisabledBtn(false);
          return <Completionist />;
        } else {
          return <span>Oczekiwanie: {seconds}</span>;
        }
      };
    return(
        <div style={{display:"flex",gap:"10rem"}}>
             <button className='option-btn' onClick={()=>invate()} disabled={disabledBtn}>{disabledBtn?<Countdown date={endDate} renderer={renderer} />:"Zaproś"}</button>
            <button className='option-btn'>Anuluj</button>
        </div>
    )
}

function FreindInvate({onGetFriendsList,setSelectedFriendId}){
    const [data,setData] = useState([]);
   
   
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
            <FormControl style={{width:"100%"}}>
                <FormLabel style={{color:"white",fontSize:"2rem"}}>Przciwnik</FormLabel>
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
            </FormControl>
           
            
            
        </div>
    )
}

export default function GameOptionsHHComponent({getStyle,hide,createConnectToInvHub}){
    const navigate = useNavigate();
    const [selectedFriendId,setSelectedFriendId] = useState(null);
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
                <FreindInvate setSelectedFriendId={setSelectedFriendId}/>
            </FriendController>
                
            <div style={{width:"50rem"}}>  

                
                <FormControl style={{width:"100%"}}>
                <FormLabel style={{color:"white",fontSize:"2rem"}}>Kolor pionków</FormLabel>
                <RadioGroup
                    row
                    style={{width:"100%",gap:"10rem"}}
                >
                    <FormControlLabel value="White" control={<Radio style={{color:"white"}}/>} label="Białe" />
                    <FormControlLabel value="Black" control={<Radio style={{color:"white"}}/>} label="Czarne" />
                    <FormControlLabel value="Random" control={<Radio style={{color:"white"}}/>} label="Losowe" />

                </RadioGroup>
                </FormControl>
            </div>
            <div>
                <GameController>
                    <SendInvate friendId={selectedFriendId}/>
                </GameController>
                
            </div>
        
        
    </div>
  
        </>
    )
}