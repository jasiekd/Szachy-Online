import React from "react";
import axios from "axios";
import { useState } from "react";
import { HostName } from "../HostName";
import Swal from 'sweetalert2';

axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;
export function Login(login,password,setIsLogged,setStatus,setUserName){
    axios.post(HostName+'/api/Account/login',
        {
                userName: login,
                password: password
        })
        .then(response => {
            localStorage.accessToken = response.data.accessToken;
            localStorage.refreshToken = response.data.refreshToken;
            setIsLogged(true);
            setStatus(response.status);
            axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Zalogowano',
                background: "#20201E",
                showConfirmButton: false,
                timer: 1500
              })
            getUser(setUserName);
        })
        .catch(error => {
            setStatus(error.response.status);
        })
       
}
export function logout(setIsLogged,setUserName){
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    axios.defaults.headers.common['Authorization'] = `Bearer ${null}`;
    setIsLogged(false);
    setUserName("");
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Wylogowano',
        background: "#20201E",
        showConfirmButton: false,
        timer: 1500
      })
}
export function register(id,name,surname,email,login,password,setRegisterStstus){
    axios.post(HostName+'/api/Account/register',
    {
        id: id,
        name: name,
        surname: surname,
        email: email,
        login: login,
        password: password,
        dateCreated: new Date(),
    })
    .then(response => {
        setRegisterStstus(response.status);
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Zarejestrowano',
            background: "#20201E",
            showConfirmButton: false,
            timer: 1500
          })
    })
    .catch(error =>{
        setRegisterStstus(error.response.status);
    })

}
export function getUser(setUserName){
    axios.get(HostName+'/api/Account/getUser',
    {
    })
    .then(response => {
        setUserName(response.data.name+" "+response.data.surname);
    })
    .catch(error =>{
    })
}
 