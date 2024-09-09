import axios from "axios";
import { useContext } from "react";
import { AuthContext, AuthSetterContext } from "../App";
import { useNavigate } from "react-router-dom";

const isDevelopment = import.meta.env.MODE === 'development';

let baseURL;

if (isDevelopment) {
  baseURL = 'http://localhost:8080/api/'
}else{
  baseURL = 'https://integrify-backend-ecommerece.onrender.com'
}

const axiosClient = axios.create({
  baseURL: baseURL,
  timeout: 1000,
});


export function useAxiosClient(){
  const authContext = useContext(AuthContext);
  const authSetterContext = useContext(AuthSetterContext);
  const navigate = useNavigate();


  function UpdateTokenInHeaders() {
    if (authContext.token !== undefined) {
      axiosClient.defaults.headers.common['Authorization'] = `Bearer ${authContext.token}`;
    } else{
      axiosClient.defaults.headers.common['Authorization'] = undefined;
    }
  }

  UpdateTokenInHeaders();

  axiosClient.interceptors.response.use((response) =>
    // Any status code that lie within the range of 2xx cause this function to trigger
    response, (error) => {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      if (error.response.status === 403) {
        authSetterContext({});
        UpdateTokenInHeaders();
        navigate('/');
      }
      return Promise.reject(error);
    })

  return axiosClient;
}