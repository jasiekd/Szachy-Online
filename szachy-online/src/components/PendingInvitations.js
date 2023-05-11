 import { useEffect, useState } from "react";
import FriendController from "../controllers/FriendController";

function PendingInvitationsButtons({acceptInvitation,onGetList,setList,closeList,friendshipID}){
    const onAccept = () =>{
        acceptInvitation(friendshipID,closeList);
        onRefresh();
    }
    const onReject = () =>{
        //onRefresh();
    }
    const onRefresh = () =>{
        onGetList().then((result)=>{
            setList(result);
        });
    }
    return(
        <>
            <button onClick={()=>onAccept()}>
                Zatwierdź
            </button>
            <button onClick={()=>onReject()}>
                Usuń
            </button>
        </>
    )
}

export default function PendingInvitations({getAnyUser,data,setList,closeList,friendshipID}){

    const [userName,setUserName] = useState("");
    useEffect(()=>{
        getAnyUser(data,setUserName);
    },[])
  


    return (
        <div style={{display:"flex"}}>
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