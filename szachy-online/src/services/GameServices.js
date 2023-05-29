import * as signalR from "@microsoft/signalr";
import axios from "axios";
import { HostName } from "../HostName";

class InvHub{
    static senderUid = null;
    static senderColor = null;
    static openInvate = ()=>{};
    static closeInvate = ()=>{};
    static onReceiveInvate = (senderUid,color) =>{};
    static connection = null;
    static instance = null;
    constructor(){

       if(InvHub.instance)
            return InvHub.instance;

        InvHub.instance = this;
        this.refactorConnection();
    }
    getSenderUid(){
        return InvHub.senderUid;
    }
    getSenderColor(){
        return InvHub.senderColor;
    }

    sendInvate(receiverUid){
        //console.log(InvHub.connection);
        InvHub.connection.send("SendGameInvitation",localStorage.uid,receiverUid,"Random");
    }

    refactorConnection(){
        if(InvHub.connection){
            InvHub.connection.stop();
        }

        InvHub.connection= new signalR.HubConnectionBuilder()
        .withUrl('https://localhost:7225/invHub')
        .withAutomaticReconnect()
        .build();

        InvHub.connection.start()
        .then(result =>{
            console.log("Conected");
                InvHub.connection.on(localStorage.uid,(senderUid,color)=>{
                    InvHub.onReceiveInvate(senderUid,color);
                });
        })
        .catch(error =>{
            console.log("Error");
            console.log(error)
        })
    }
}

export class GameService{
    async createGameOnlineWithPlayer(guid,color){
        let count = 0;
        
        while(true){
            try{
                const response = await axios.post(HostName+'/api/Game/CreateGameOnlineWithPlayer',
                {
                    guid: guid,
                    color: color
                });
                return response;
            }catch(error)
            {
                if(count===1)
                {
                    console.log(error.response);
                    return error.response;
                }
                count = 1;
            }
        }

        
        
    }

    async createGameWithComputer(level,color,openingId){
        let count = 0;
        while(true){
            try{
                const response = await axios.post(HostName+'/api/Game/CreateGameWithComputer',{
                    level: level,
                    color: color,
                    openingId: openingId
                })
                return response;
            }
            catch(error){
                if(count === 1)
                {
                    return error.response
                }
                count = 1;
            }
        }
    }
}

export default InvHub;