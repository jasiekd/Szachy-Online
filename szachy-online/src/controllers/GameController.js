import React, { useEffect, useRef, useState } from "react"
import InvHub, { GameService ,ChessHub } from "../services/GameServices";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
export default function GameController({children,getOpenings})
{
    const game = useRef(null);
    const invHubInstance =  new InvHub();
    const chessHub = new ChessHub();
    const gameGateway = new GameService();
    const navigate = useNavigate();
    const [receiveMoveAlert,setReceiveMoveAlert] = useState(true);

    const [lastEnemyMove,setLastEnemyMove] = useState(true);
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

    const onReceiveStartGame = (gameId) =>{
        localStorage.gameId = gameId;
        console.log(gameId);
        setChessHubOnGame()
        navigate("/chessBoard")
        
    }

    const onReceivePlayerMove = (move) =>{
        
        console.log("odbieram: "+move);
        setLastEnemyMove(move);
        setReceiveMoveAlert(!receiveMoveAlert);
        //console.log("wynik ruchu: ");
        //console.log(game.current.move(move));
        //const gameCopy = { ...game.current };
        //const result = gameCopy.move(move);
    
        //game.current=gameCopy;
        //console.log(move)
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

    const sendPlayerMove = async(move)=>{
        
        
        const response = await gameGateway.playerMove(move);

        if(response.status === 200)
        {
            
            return response.data;
        }
        else{
            //console.log(response);
        }
        
    }    
    const getInfoAboutGame = async() =>{
        const response = await gameGateway.getInfoAboutGame();

        if(response.status === 200)
        {
            
            return response.data;
        }
        else{
            //console.log(response);
        }
    }

    const getPlayerMove = async()=>{
        return "c6";
    }
    const setChessHubOnReceive = async()=>{
        if(ChessHub.onReceiveGameData !== onReceiveStartGame)
        {
            ChessHub.onReceiveGameData = onReceiveStartGame;
            chessHub.refactorConnection();
        }
    }
    const setChessHubOnGame = async()=>{

        if(ChessHub.onReceiveGameData !== onReceivePlayerMove)
        {
            ChessHub.onReceiveGameData = onReceivePlayerMove;
            chessHub.refactorConnection();
        }
    }
    const setRefToGame = async(gameRef)=>{
        game.current = gameRef;
    }

    InvHub.onReceiveInvate = receiveInvate;
    //ChessHub.onReceiveGameData = onReceiveStartGame;
    return React.cloneElement(children,{
        invateToGame,
        setInvateDialogRef,
        createGameOnlineWithPlayer,
        createGameWithComputer,
        sendPlayerMove,
        setChessHubOnGame,
        setChessHubOnReceive,
        getPlayerMove,
        setRefToGame,
        getInfoAboutGame,
        receiveMoveAlert,
        lastEnemyMove,
        getOpenings
    })

    
}