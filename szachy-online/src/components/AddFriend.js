import { useState } from "react";
import { ThemeInput } from "./ThemeInput";
import React from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FriendController from "../controllers/FriendController";
import Autocomplete from '@mui/material/Autocomplete';
import AccountController from "../controllers/AccountController";

function AddFriendButtons({handleClose,onSendInvitation,nickname,isActive}){
    const onClickSend = () => {
        //console.log(nickname.charCodeAt(0));
        onSendInvitation(nickname);
        handleClose()
    }
    return(
        <button disabled={isActive} className='option-btn' onClick={() => onClickSend()}>Wyślij zaproszenie</button>
    )

}
function SearchField({findByNickName,setIsButtonActive,setNickname}){
    
    const [data,setData] = useState([]);
        const onChangeSearch = (nickname) =>{
            setIsButtonActive(true);
            if(nickname.length>=2){
                findByNickName(nickname).then((r)=>{
                    console.log(r);
                    setData(r);
                 })
            }
           
        }


        const onSelectUser = (value) =>{
            setIsButtonActive(false)
            setNickname(value.nickname)
            console.log(value);
        }
    return(

        <Autocomplete
            options={data}
            disableClearable
            getOptionLabel={(option)=>option.nickname}
            onChange={(event,value) => onSelectUser(value)}
            renderInput={(params) => <ThemeInput {...params} label="Nickname" onChange={(e)=>onChangeSearch(e.target.value)}/>}
        />
    )
}
export default function AddFriend({open,handleClose})
{
    const [isButtonActive,setIsButtonActive] = useState(true);
    const[nickname,setNickname] = useState("");
    return(
        <Dialog 
                sx={{ '& .MuiDialog-paper': { background:'#1d1d1b' }}}
                open={open}
                onClose={handleClose}
                maxWidth
            >
                <DialogTitle style={{color:'white'}}>
                {"Dodaj znajomego"}
                </DialogTitle>
                <DialogContent >
                <DialogContentText  sx={{zIndex:1000}}>
                    <div style={{color:'white',gap:'8px',display:'flex',flexDirection:'column'}}>
                        <p>Podaj nickname użytkownika którego chcesz dodać do znajomych</p>
                        <AccountController>
                            <SearchField setIsButtonActive={setIsButtonActive} setNickname={setNickname}/>
                        </AccountController>
                    </div>
                </DialogContentText>   
               
                </DialogContent>
                <DialogActions>
                    <FriendController>
                        <AddFriendButtons handleClose={handleClose} nickname={nickname} isActive={isButtonActive}/>
                    </FriendController>
                </DialogActions>
            </Dialog>
    )
}