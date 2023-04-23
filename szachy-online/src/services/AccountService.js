import React from "react";
import axios from "axios";
import { useState } from "react";
import { HostName } from "../HostName";


export function login(login,password,setIsLogged,setStyleText,setStyleInput){
    console.log("start login");
    console.log("login: "+login);
    console.log("password: "+password);
    axios.post(HostName+'/api/Account/login',
        {
                userName: login,
                password: password
        })
        .then(response => {
            localStorage.accessToken = response.data.accessToken;
            localStorage.refreshToken = response.data.refreshToken;
            setIsLogged(true);
        })
        .catch(error => {
            setStyleText("account-text-error");
            setStyleInput("account-input-error");
        })
    console.log("stop login");
}
export function logout(setIsLogged){
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setIsLogged(false);
}
export function register(id,name,surname,email,login,password){
    axios.post(HostName+'/api/Account',
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
        console.log("git");
    })
    .catch(error =>{
        console.log(error.data);
    })

}
 