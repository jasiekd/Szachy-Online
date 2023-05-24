import React, { useState } from "react"
import { HubConnection,HubConnectionBuilder,LogLevel } from "@microsoft/signalr"
import axios from "axios"
export default function GameController({children})
{
    const [gameHubConection,setGameHubConection] = useState(null);
    const createGame = () =>{
        const response = axios.get("https://localhost:7225/api/Game/CreateGameWithComputer")
        console.log(response);
    }
    const createConnectToChessHub = () =>{
        const hubConnection = new HubConnectionBuilder()
        .withUrl('https://localhost:7225/chesshub')
        .withAutomaticReconnect()
        .build();

        setGameHubConection(hubConnection)
        startConnectionToChessHub()

    }
    const startConnectionToChessHub = () =>{
        console.log("1")
        if(gameHubConection){
            console.log("2")
            
            gameHubConection.start()
                .then(result =>{
                    console.log("Conected");
                })
                .catch(error =>{
                    console.log("Error");
                    console.log(error)
                })
        }
    }
    return React.cloneElement(children,{
        createConnectToChessHub
    })
}