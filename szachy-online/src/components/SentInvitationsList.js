import React, { useEffect } from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AccountController from "../controllers/AccountController";
import { useState } from "react";
import FriendController from "../controllers/FriendController";

function SentInvitationButtons({closeList})
{
    const onClickCancle = () =>{
        closeList();
    }
    return(
        <button onClick={()=>onClickCancle()}>Anuluj</button>
    )
}

function SentInvitation({getAnyUser,userID,closeList})
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
                    <SentInvitationButtons closeList={closeList}/>
                </FriendController>
            </div>
        </div>
    )
}

export default function SentInvitationList({open,handleClose,data})
{
    return(
        <Dialog

                open={open}
                onClose={handleClose}
                maxWidth
            >
                <DialogTitle>
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
                                            <SentInvitation userID={val.user2ID} closeList={handleClose} />
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