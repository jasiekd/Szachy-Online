import React, { useEffect } from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FriendController from "../controllers/FriendController";
import "../styles/FriendsStyle.css"
import { useNavigate } from "react-router-dom";
function MyFriendsButtons ({onRemoveFriend,closeList,friendshipID,uid,nick}){
    const navigate = useNavigate()
    const onClickRemove = () => {
        onRemoveFriend(friendshipID);
        closeList();
    }
    return(
        <div style={{display:"flex",gap:"1rem"}}>
            <button className="option-btn friends-btn-accept" onClick={()=>navigate("/profile",{state:{user:uid,nick:nick}})}>Pokaż profil</button>
            <button className="option-btn friends-btn-reject" onClick={()=>onClickRemove()}>Usuń</button>
        </div>
        
    )
}

function MyFriend ({closeList,friendshipID,nick,uid})
{
    return(
        <div className="friendElementOnList">
            <div>
                {nick}
            </div>
            <div>
                <FriendController>
                    <MyFriendsButtons closeList={closeList} friendshipID={friendshipID} uid={uid} nick={nick}/>
                </FriendController>
            </div>
        </div>
    )
}
export default function MyFriendsList({open,handleClose,data})
{
    useEffect(()=>{
        console.log(data);
    },[])
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
                                if(localStorage.uid === val.userId1)
                                {
                                    return(
                                                <MyFriend friendshipID={val.friendshipId} nick={val.user2Nickname} closeList={handleClose} uid={val.userId2} key={key}/>
                                    )
                                }
                                else{
                                    return(
                                                <MyFriend friendshipID={val.friendshipId} nick={val.user1Nickname} closeList={handleClose} uid={val.userId1} key={key}/>
                                    )
                                }
                               
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