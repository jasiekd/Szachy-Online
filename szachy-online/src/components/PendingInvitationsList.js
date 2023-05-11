import React, { useEffect } from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import AccountController from "../controllers/AccountController";
import PendingInvitations from "./PendingInvitations";
import { useState } from "react";


export default function PendingInvitationsList({open,handleClose,data,setData})
{
    return(
        <Dialog

                open={open}
                onClose={handleClose}
                maxWidth
            >
                <DialogTitle>
                {"Oczekujące zaproszenia"}
                </DialogTitle>
                <DialogContent>
                <DialogContentText>
                    {
                        data?
                            data.map((val,key)=>{
                                return(
                                    <div key={key}>
                                        <AccountController>
                                            <PendingInvitations data={val.user1ID} friendshipID={val.friendshipID} closeList={handleClose} setList={setData}/>
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