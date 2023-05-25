import React, { useState } from "react"
import InvHub from "../services/GameServices";
export default function GameController({children})
{
    //const [handleOpenInvate,setHandleOPenInvate] = useState(null);
    //const [handleCloseInvate,setHandleCloseInvate] = useState(null);
    const invHubInstance =  new InvHub();
   
  

    const receiveInvate = (senderUid,color) =>{
        InvHub.senderUid = senderUid;
        InvHub.color = color;
        InvHub.openInvate();
    }
    const invateToGame = (receiverUid) =>{
        //handleOpenInvate();
        invHubInstance.sendInvate(receiverUid);
    }
    const setInvateDialogRef = (open,close) =>{
 
        console.log("ustawiam");
        InvHub.openInvate = open;
       // setHandleCloseInvate(close);
        //setHandleOPenInvate(open);
    }
    InvHub.onReceiveInvate = receiveInvate;
    return React.cloneElement(children,{
        invateToGame,
        setInvateDialogRef
    })

    
}