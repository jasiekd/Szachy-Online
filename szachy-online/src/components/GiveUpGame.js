import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


export default function GiveUpGame({open,handleClose,forfeit,gameId}){
   
    const accept = () =>{
        forfeit(gameId).then(r=>{
            handleClose()
        })
        
    }
    const reject = () =>{
        handleClose()
    }
    return(
        <Dialog 
                sx={{ '& .MuiDialog-paper': { background:'#1d1d1b' }}}
                open={open}
                onClose={handleClose}
                maxWidth
            >
                <DialogTitle style={{color:'white',fontSize:"2rem",fontWeight:"700"}}>
                {"Próba poddania"}
                </DialogTitle>
                <DialogContent >
                <DialogContentText  sx={{zIndex:1000}}>
                    <div style={{color:'white',gap:'8px',display:'flex',flexDirection:'column'}}>
                        Czy napewno chcesz się poddać? 

                    </div>
                </DialogContentText>   
               
                </DialogContent>
                <DialogActions>
                    <button className='option-btn friends-btn-reject' onClick={()=>accept()} >Tak</button>
                    <button className='option-btn friends-btn-accept' onClick={()=>reject()}>Nie</button>
                </DialogActions>
            </Dialog>
    )
}