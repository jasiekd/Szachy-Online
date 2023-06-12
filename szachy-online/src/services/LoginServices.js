import axios from "axios";
import { HostName } from "../HostName";
import jwtDecode from "jwt-decode";
import Swal from "sweetalert2";


async function refreshAccessToken() {
    try {
      const response = await axios.post(HostName+'/api/Token/refresh', {
        accessToken: localStorage.accessToken,
        refreshToken: localStorage.refreshToken
      });
        localStorage.accessToken = response.data.accessToken;
        localStorage.refreshToken = response.data.refreshToken;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
  
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      const originalRequest = error.config;
  
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        return refreshAccessToken().then(() => {
          originalRequest.headers.Authorization = `Bearer ${localStorage.accessToken}`;
          return axios(originalRequest);
        });
      }
  
      return Promise.reject(error);
    }
  );


export default class LoginService{
    
    async login(data)
    {
        try{
            const response = await axios.post(HostName+'/api/Account/login',
            {
                userName: data.loginVal,
                password: data.passwordVal
            })
            localStorage.accessToken = response.data.accessToken;
            localStorage.refreshToken = response.data.refreshToken;
            const rawDecodedToken = jwtDecode(response.data.accessToken)
            localStorage.uid = rawDecodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`;
            return response;
        }catch(error)
        {
            return error.response;
        }
    }
}