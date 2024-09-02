import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../App";


const axiosClient = axios.create({
  baseURL: 'http://localhost:8080/api/',
  timeout: 1000,
});


export function useAxiosClient(){
  const authContext = useContext(AuthContext);

  if (authContext.token !== undefined) {
    axiosClient.defaults.headers.common['Authorization'] = `Bearer ${authContext.token}`;
  }

  return axiosClient;
}