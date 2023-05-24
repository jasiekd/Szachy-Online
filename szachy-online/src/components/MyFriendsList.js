import React from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useState } from 'react';
import AccountController from "../controllers/AccountController";
import FriendController from "../controllers/FriendController";
import "../styles/FriendsStyle.css"
function MyFriendsButtons ({onRemoveFriend,closeList,friendshipID}){
    const onClickRemove = () => {
        onRemoveFriend(friendshipID);
        closeList();
    }
    return(
        <button className="option-btn friends-btn-reject" onClick={()=>onClickRemove()}>Usuń</button>
    )
}

function MyFriend ({getAnyUser,userID,closeList,friendshipID})
{
    const [userName,setUserName] = useState("");
    useEffect(()=>{
        getAnyUser(userID,setUserName);
    },[])
    return(
        <div className="friendElementOnList">
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
                sx={{ '& .MuiDialog-paper': { background:'#1d1d1b' }}}
                open={open}
                onClose={handleClose}
                maxWidth
            >
                <DialogTitle style={{color:"white"}}>
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
                    <button className="option-btn" onClick={handleClose}>Zamknij</button>
                </DialogActions>
            </Dialog>
    )
}