import { useLocation } from "react-router-dom"

export default function Profile({ getMyHistory,getMyFriendHistory}){
    const location = useLocation();
    if(location.state && location.state.user)
    {
        console.log("friend")
    }
    else{
        console.log("me")
    }
    return(
        <div>
            to profil
        </div>
    )
}