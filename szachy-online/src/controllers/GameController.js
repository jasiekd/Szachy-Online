import React, { useState } from "react"
import InvHub, { GameService } from "../services/GameServices";
import Swal from "sweetalert2";
export default function GameController({children})
{
    const invHubInstance =  new InvHub();
    const gameGateway = new GameService();
  

    const receiveInvate = (senderUid,color) =>{
        InvHub.senderUid = senderUid;
        InvHub.senderColor = color;
        console.log(color);
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
    const createGameOnlineWithPlayer = async(guid,color) =>{
        const response = await gameGateway.createGameOnlineWithPlayer(guid,color);

        if(response.status === 200)
        {
            console.log(response);
        }else{
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Błąd tworzenia nowej rozgrywki',
                background: "#20201E",
                showConfirmButton: false,
                timer: 1500
              });
            return null;
        }
    }
    const createGameWithComputer = async(level,color,openingId) =>{
        const response = await gameGateway.createGameWithComputer(level,color,openingId);
        if(response.status === 200)
        {
            console.log(response);
        }else{
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Błąd tworzenia nowej rozgrywki',
                background: "#20201E",
                showConfirmButton: false,
                timer: 1500
              });
            return null;
        }
    }
    InvHub.onReceiveInvate = receiveInvate;
    return React.cloneElement(children,{
        invateToGame,
        setInvateDialogRef,
        createGameOnlineWithPlayer,
        createGameWithComputer
    })

    
}