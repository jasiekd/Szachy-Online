import * as signalR from "@microsoft/signalr";

class InvHub{/*
     connection;
     events = (onInvateReceive) =>{}
    static instance = InvHub;

    constructor(){
        if(InvHub.instance){
            return InvHub.instance;
        }


        this.connection = new signalR.HubConnectionBuilder()
        .withUrl('https://localhost:7225/invHub')
        .withAutomaticReconnect()
        .build();

        this.connection.start()
        .then(result =>{
            console.log("Conected");
        })
        .catch(error =>{
            console.log("Error");
            console.log(error)
        })
        //this.events = (onInvateReceive)=>{
            this.connection.on(localStorage.uid,(message,hgfds)=>{
                console.log("zaproszenie");
            });
        //}
        InvHub.instance = this;
    }

    sendInvate(receiverUid){
        console.log(InvHub.connection);
        
        //this.connection.send("SendGameInvitation",localStorage.uid,receiverUid,"white");
    }
    
    static getInstance(){
        if(!InvHub.instance){
            InvHub.instance = new InvHub();
            console.log("create new");
        }else{
            console.log('alredy exist')
        }
           
        return InvHub.instance;
    }*/
    /*static events = (
        onReceiveInvate = (senderUid,color) =>{}
    ) */
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
        InvHub.connection= new signalR.HubConnectionBuilder()
        .withUrl('https://localhost:7225/invHub')
        .withAutomaticReconnect()
        .build();

        //console.log("test");
        InvHub.connection.start()
        .then(result =>{
            console.log("Conected");
            //InvHub.events = (onReceiveInvate) =>{
                InvHub.connection.on(localStorage.uid,(senderUid,color)=>{
                    //console.log("zaproszenie "+message+" "+hgfds);
                    InvHub.onReceiveInvate(senderUid,color);
                });
           // } 
        })
        .catch(error =>{
            console.log("Error");
            console.log(error)
        })
        //this.events = (onInvateReceive)=>{
            /*InvHub.connection.on(localStorage.uid,(message,hgfds)=>{
                console.log("zaproszenie "+message+" "+hgfds);
            });*/
        //}
    }
    getSenderUid(){
        return InvHub.senderUid;
    }
    getSenderColor(){
        return InvHub.senderColor;
    }

    sendInvate(receiverUid){
        //console.log(InvHub.connection);
        InvHub.connection.send("SendGameInvitation",localStorage.uid,receiverUid,"White");
    }
}



export default InvHub;