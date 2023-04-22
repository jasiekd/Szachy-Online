import React from "react";
import axios from "axios";

export function login(login,password){
    console.log("start login");
    console.log("login: "+login);
    console.log("password: "+password);
    axios.post('https://localhost:7225/api/Account/login',
        {
                userName: login,
                password: password
        })
        .then(response => {
            localStorage.accessToken = response.data.accessToken;
            localStorage.refreshToken = response.data.refreshToken;
        })
        .catch(error => {
            console.log(error.data);
        })
    console.log("stop login");
}