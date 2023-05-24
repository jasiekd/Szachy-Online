import React, { useEffect } from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PendingInvitations from "./PendingInvitations";



export default function PendingInvitationsList({open,handleClose,data,setData})
{
    return(
        <Dialog
                sx={{ '& .MuiDialog-paper': { background:'#1d1d1b' }}}
                open={open}
                onClose={handleClose}
                maxWidth
            >
                <DialogTitle style={{color:"white"}}>
                {"Oczekujące zaproszenia"}
                </DialogTitle>
                <DialogContent>
                <DialogContentText>
                    {
                        data?
                            data.map((val,key)=>{
                                if(localStorage.uid === val.userId1)
                                {
                                    return(
                                        <PendingInvitations nick={val.user2Nickname} friendshipID={val.friendshipId} closeList={handleClose} setList={setData} key={key}/>
                                    )
                                }
                                else
                                {
                                    return(
                                        <PendingInvitations nick={val.user1Nickname} friendshipID={val.friendshipId} closeList={handleClose} setList={setData} key={key}/>
                                    )
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