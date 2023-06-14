import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from './Header.js';
import moment from "moment/moment.js";
import {Chess} from "chess.js";
export default function Profile({ getMyHistory,getMyFriendHistory,getInfoAboutGame}){
    const location = useLocation();
    const navigate = useNavigate();

    const [history,setHistory]=useState([]);

    useEffect(()=>{
        if(location.state && location.state.user)
        {
            getMyFriendHistory(location.state.user).then((r)=>{
                setHistory(...history,r);
            })
        }
        else{
            getMyHistory().then((r)=>{
                setHistory(...history,r);
            })
        }

    },[]);
   

    

    function navigateToViewHistory(gameID){    
        getInfoAboutGame(gameID).then((r)=>{
            if(r){
                debugger
                const chess = new Chess();
                chess.load_pgn(r.pgn)
                chess.set_comment( JSON.stringify({
                   white: r.whiteNickname,
                   black: r.blackNickname
                }))
                let content=chess.pgn();
                navigate('/viewHistory',{state:{content}});
            }

        });
        
    }
    
    return(
        <div className="App">
            <Header/>
            <main className="content">
                
                {
                    !(location.state && location.state.user) &&
                    <div className='piece-header'>
                        Mój profil
                    </div>
                    
                }
                {
                    (location.state && location.state.user) &&
                    <div className='piece-header'>
                        Profil użytkownika {location.state.nick}
                    </div>
                }
            {
            history?.map((item,index)=>(
                <div className='chess-piece-info pointer' key={index} onClick={()=>navigateToViewHistory(item.gameID)}>
                    <div className='piece-text'>
                        <p>Gracz grający białymi pionkami: {item.whiteNickname}</p>
                        <p>Gracz grający czarnymi pionkami: {item.blackNickname}</p>
                        <p>Data rozgrywki: { moment(item.date).format('MMMM Do YYYY, h:mm a')}</p>
                       
                    </div>
                </div>
                ))
            }
            </main>
        </div>
    )
}