import axios from "axios";
import { HostName } from "../HostName";
import Swal from 'sweetalert2';

axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;

export function SendInvitation(nickname){
    axios.get(HostName+'/api/Friends/sendInvitation/'+nickname,
        {
        })
        .then(response => {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Zaproszenie wysłane',
                background: "#20201E",
                showConfirmButton: false,
                timer: 1500
              })
        })
        .catch(error => {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Niepowodzenie',
                background: "#20201E",
                showConfirmButton: false,
                timer: 1500
              })
        })
       
}
export async function GetListOfPendingInvitations(){
    return axios.get(HostName+'/api/Friends/GetListOfPendingInvitations', {})
        .then(response => {
            
            return response.data;
        })
        .catch(error => {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Błąd pobierania listy zaproszeń',
                background: "#20201E",
                showConfirmButton: false,
                timer: 1500
              });
            return null;
        });
}