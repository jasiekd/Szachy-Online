import React, { useEffect } from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AccountController from "../controllers/AccountController";
import { useState } from "react";
import FriendController from "../controllers/FriendController";
import '../styles/FriendsStyle.css';
function SentInvitationButtons({closeList,onRemoveFriend,friendshipID})
{
    const onClickCancle = () =>{
        onRemoveFriend(friendshipID);
        closeList();
    }
    return(
        <button onClick={()=>onClickCancle()} className="option-btn friends-btn-reject">Anuluj</button>
    )
}

function SentInvitation({getAnyUser,userID,closeList,friendshipID})
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
                    <SentInvitationButtons closeList={closeList} friendshipID={friendshipID}/>
                </FriendController>
            </div>
        </div>
    )
}

export default function SentInvitationList({open,handleClose,data})
{
    return(
        <Dialog
                sx={{ '& .MuiDialog-paper': { background:'#1d1d1b' }}}
                open={open}
                onClose={handleClose}
                maxWidth
            >
                <DialogTitle style={{color:"white"}}>
                {"Wysłane zaproszenia"}
                </DialogTitle>
                <DialogContent>
                <DialogContentText>
                    {
                        data?
                            data.map((val,key)=>{
                                return(
                                    <div key={key}>
                                        <AccountController>
                                            <SentInvitation userID={val.user2ID} friendshipID={val.friendshipID} closeList={handleClose} />
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
                    <button onClick={handleClose} className='option-btn'>Zamknij</button>
                </DialogActions>
            </Dialog>
    )
}