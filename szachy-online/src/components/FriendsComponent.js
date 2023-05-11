import Swal from "sweetalert2";
import addFriend from "../img/add.png";
import friendList from "../img/friend.png";
import withReactContent from "sweetalert2-react-content";
import PendingInvitations from "./PendingInvitations";
import AccountController from "../controllers/AccountController";
import { useEffect, useState } from "react";
import PendingInvitationsList from "./PendingInvitationsList";
import FriendController from "../controllers/FriendController";
import MyFriendsList from "./MyFriendsList";
import SentInvitationList from "./SentInvitationsList";
import AddFriend from "./AddFriend";

export default function FriendsComponent({onGetSentList,onGetList,onGetFriendsList,onSendInvitation,getStyle,show,hide}){

    const [invitationList,setInvitationList] = useState(null);
    const [sentList,setSentList] = useState(null);
    const [myFriendListData,setMyFriendListData] = useState(null);
    const addFriendWindow= () =>{
        Swal.fire({
            title: 'Dodaj znajomego',
            background: "#20201E",
            color: "white",
            input: 'text',
            inputLabel: 'Podaj nickname użytkownika',
            inputPlaceholder: 'nickname',
            confirmButtonText: "Wyślij zaproszenie",
            confirmButtonColor: "#C26833"
          }).then((result)=>{
            if(result.isConfirmed)
            {
                onSendInvitation(result.value);
                
            }
          })
          
          
    }

    const [openPending, setOpenPending] = useState(false);
    const handleClosePending = () => {
        setOpenPending(false);
    };
    const openPendingList = () =>{
        onGetList().then((result)=>{
            setOpenPending(true);
            setInvitationList(result);
        });
        
    }

    const [openMyFriends, setOpenMyFriends] = useState(false);
    const handleCloseMyFriends = () => {
        setOpenMyFriends(false);
    };
    const openMyFriendsList = () =>{
        onGetFriendsList().then((result)=>{
           
            setOpenMyFriends(true);
            setMyFriendListData(result);
        })

    }

    const [openSent, setOpenSent] = useState(false);
    const handleCloseSent = () => {
        setOpenSent(false);
    };
    const openSentList = () =>{
        onGetSentList().then((result)=>{
            setOpenSent(true);
            setSentList(result);
        })
       
    }

    const [openAddFriend, setOpenAddFriend] = useState(false);
    const handleCloseAddFriend = () => {
        setOpenAddFriend(false);
    };
    const openAddFriendDialog = () =>{
            setOpenAddFriend(true);   
    }
    return(
        
        <div className='option' style={getStyle} onMouseOver={show}  onMouseOut={hide}>
                <AddFriend open={openAddFriend} handleClose={handleCloseAddFriend}/>
                <SentInvitationList open={openSent} handleClose={handleCloseSent} data={sentList}/>
                <PendingInvitationsList open={openPending} handleClose={handleClosePending} data={invitationList} setData={setInvitationList}/>
                <MyFriendsList open={openMyFriends} handleClose={handleCloseMyFriends} data={myFriendListData}/>
        <button className='nav-btn' onClick={()=>openMyFriendsList()}>
            <img className="btn-img" src={friendList} alt=""/>
            <p className='slide-btn-text'>Lista znajomych</p>
        </button>
        <button className='nav-btn' onClick={()=>openAddFriendDialog()}>
            <img className="btn-img" src={addFriend} alt=""/>
            <p className='slide-btn-text'>Dodaj znajomego</p>
        </button>
        <button className='nav-btn' onClick={()=>openPendingList()}>
            <img className="btn-img" src={addFriend} alt=""/>
            <p className='slide-btn-text'>Oczekujące zaproszenia</p>
        </button>
        <button className='nav-btn' onClick={()=>openSentList()}>
            <img className="btn-img" src={addFriend} alt=""/>
            <p className='slide-btn-text'>Wysłane zaproszenia</p>
        </button>
        </div>
    )
}