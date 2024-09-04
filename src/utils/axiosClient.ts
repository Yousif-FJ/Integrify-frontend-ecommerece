import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../App";

const isDevelopment = import.meta.env.MODE === 'development';

let baseURL;

if (isDevelopment) {
  baseURL = 'http://localhost:8080/api/'
}else{
  //put production URL
}

const axiosClient = axios.create({
  baseURL: baseURL,
  timeout: 1000,
});


export function useAxiosClient(){
  const authContext = useContext(AuthContext);

  if (authContext.token !== undefined) {
    axiosClient.defaults.headers.common['Authorization'] = `Bearer ${authContext.token}`;
  }

  return axiosClient;
}