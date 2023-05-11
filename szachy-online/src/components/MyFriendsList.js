import React from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useState } from 'react';
import AccountController from "../controllers/AccountController";
import FriendController from "../controllers/FriendController";

function MyFriendsButtons ({onRemoveFriend,closeList,friendshipID}){
    const onClickRemove = () => {
        onRemoveFriend(friendshipID);
        closeList();
    }
    return(
        <button onClick={()=>onClickRemove()}>Usuń</button>
    )
}

function MyFriend ({getAnyUser,userID,closeList,friendshipID})
{
    const [userName,setUserName] = useState("");
    useEffect(()=>{
        getAnyUser(userID,setUserName);
    },[])
    return(
        <div style={{display:"flex"}}>
            <div>
                {userName}
            </div>
            <div>
                <FriendController>
                    <MyFriendsButtons closeList={closeList} userID={userID} friendshipID={friendshipID}/>
                </FriendController>
            </div>
        </div>
    )
}
export default function MyFriendsList({open,handleClose,data})
{
    return(
        <Dialog

                open={open}
                onClose={handleClose}
                maxWidth
            >
                <DialogTitle>
                {"Moi Znajomi"}
                </DialogTitle>
                <DialogContent>
                <DialogContentText>
                    {
                        data?
                            data.map((val,key)=>{
                                return(
                                    <div key={key}>
                                        <AccountController>
                                            <MyFriend friendshipID={val.friendshipID} userID={val.user1ID} closeList={handleClose}/>
                                        </AccountController>
                                    </div>
                                )
                            })
                        :
                        null    
                    }
                    
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <button onClick={handleClose}>Zamknij</button>
                </DialogActions>
            </Dialog>
    )
}