import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InvHub from '../services/GameServices';

export default function GameInvate({open,handleClose}){
    const invHub = new InvHub();
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
                        Zaproszenie od gracza {invHub.getSenderUid()}

                    </div>
                </DialogContentText>   
               
                </DialogContent>
                <DialogActions>
                    <button className='option-btn friends-btn-accept'>Dołącz</button>
                    <button className='option-btn friends-btn-reject'>Usuń</button>
                </DialogActions>
            </Dialog>
    )
}