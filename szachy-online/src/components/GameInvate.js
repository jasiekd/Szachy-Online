import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InvHub from '../services/GameServices';
import { useEffect, useState } from 'react';
import Countdown from 'react-countdown';

export default function GameInvate({open,handleClose,createGameOnlineWithPlayer,getUserById,cancelInvate,timeOutInvate}){
    const invHub = new InvHub();
    const [username,setUserName] = useState("");
    const [endDate,setEndDate] = useState();

    const onAccept = () =>{
        handleClose();
        createGameOnlineWithPlayer(invHub.getSenderUid(),invHub.getSenderColor());
    }
    
  
    const onReject = () =>{
        handleClose();
        cancelInvate(invHub.getSenderUid());
    }
    useEffect(()=>{
        setEndDate(Date.now()+30000);
        getUserById(invHub.getSenderUid()).then((r)=>{
            setUserName(r)
        })
        
    },[invHub.getSenderUid()])
    const Completionist = () => <span>Time Out!</span>;
    const renderer = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
            timeOutInvate(invHub.getSenderUid());
            handleClose();
          return <Completionist />;
        } else {
          return <span>Czas na akceptacje: {seconds}</span>;
        }
      };
    return(
        <Dialog 
                sx={{ '& .MuiDialog-paper': { background:'#1d1d1b' }}}
                open={open}
                onClose={handleClose}
                maxWidth
            >
                <DialogTitle style={{color:'white',fontSize:"2rem",fontWeight:"700"}}>
                {" Nowe zaproszenie do gry online"}
                </DialogTitle>
                <DialogContent >
                <DialogContentText  sx={{zIndex:1000}}>
                    <div style={{color:'white',gap:'8px',display:'flex',flexDirection:'column'}}>
                        Zaproszenie od gracza {username} <Countdown date={endDate} renderer={renderer} />

                    </div>
                </DialogContentText>   
               
                </DialogContent>
                <DialogActions>
                    <button className='option-btn friends-btn-accept' onClick={()=>onAccept()}>Dołącz</button>
                    <button className='option-btn friends-btn-reject' onClick={()=>onReject()}>Usuń</button>
                </DialogActions>
            </Dialog>
    )
}