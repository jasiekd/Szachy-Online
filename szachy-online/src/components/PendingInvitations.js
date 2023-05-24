 import { useEffect, useState } from "react";
import FriendController from "../controllers/FriendController";
import '../styles/FriendsStyle.css'
function PendingInvitationsButtons({acceptInvitation,onRemoveFriend,onGetList,setList,closeList,friendshipID}){
    const onAccept = () =>{
        acceptInvitation(friendshipID,closeList);
        closeList();
        onRefresh();
    }
    const onReject = () =>{
        onRemoveFriend(friendshipID);
        closeList();
        onRefresh();
    }
    const onRefresh = () =>{
        onGetList().then((result)=>{
            setList(result);
        });
    }
    return(
        <div style={{display:"flex",gap:"1rem"}}>
            <button className="option-btn friends-btn-accept" onClick={()=>onAccept()}>
                Zatwierdź
            </button>
            <button className="option-btn friends-btn-reject" onClick={()=>onReject()}>
                Usuń
            </button>
        </div>
    )
}

export default function PendingInvitations({getAnyUser,data,setList,closeList,friendshipID}){

    const [userName,setUserName] = useState("");
    useEffect(()=>{
        getAnyUser(data,setUserName);
    },[])
  


    return (
        <div className="friendElementOnList">
            <div>
                {userName}
            </div>
            <div>
                <FriendController>
                    <PendingInvitationsButtons setList={setList} closeList={closeList} friendshipID={friendshipID}/>
                </FriendController>
              
                 
            </div>
        </div>
    )
}