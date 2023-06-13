import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from './Header.js';

export default function Profile({ getMyHistory,getMyFriendHistory}){
    const location = useLocation();
    const navigate = useNavigate();

    const [history,setHistory]=useState([
        {
            gameID:1,
            whiteID:1,
            whiteNickname:'test1',
            blackID:2,
            blackNickname:'test2',
            date:'02-02-2023'
        },
        {
            gameID:1,
            whiteID:1,
            whiteNickname:'test1',
            blackID:2,
            blackNickname:'test2',
            date:'02-02-2023'
        },
        {
            gameID:1,
            whiteID:1,
            whiteNickname:'test1',
            blackID:2,
            blackNickname:'test2',
            date:'02-02-2023'
        },
    ]);

    useEffect(()=>{
        if(location.state && location.state.user)
        {
            console.log(location.state)
        }
        else{
            console.log("me")
        }

    },[]);
   

    

    function navigateToViewHistory(){    
        let content="";
        navigate('/viewHistory',{state:{content}});
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
            {history?.map((item,index)=>(
                <div className='chess-piece-info pointer' key={index} onClick={()=>navigateToViewHistory()}>
                    <div className='piece-text'>
                        <p>Gracz grający białymi pionkami: {item.whiteNickname}</p>
                        <p>Gracz grający czarnymi pionkami: {item.blackNickname}</p>
                        <p>Data rozgrywki: {item.date}</p>
                       
                    </div>
                </div>
                ))
            }
            </main>
        </div>
    )
}