import React, { useEffect } from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
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

function SentInvitation({nick,closeList,friendshipID})
{
   
    return(
        <div className="friendElementOnList">
            <div>
                {nick}
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
                                if(localStorage.uid === val.userId1)
                                {
                                    return(
                                        <div key={key}>
                                                <SentInvitation nick={val.user2Nickname} friendshipID={val.friendshipId} closeList={handleClose} key={key}/>
                                        </div>
                                    )
                                }else{
                                                <SentInvitation nick={val.user1Nickname} friendshipID={val.friendshipId} closeList={handleClose} key={key}/>
                                }
                               
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