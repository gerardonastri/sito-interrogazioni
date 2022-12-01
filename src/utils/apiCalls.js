import axios from "axios"

const  BASE_URL = "http://localhost:8000/api/";
// const BASE_URL = "https://sito-interrogazioni-backend.onrender.com/api/"

export const axiosReq = axios.create({
    baseURL:  BASE_URL
})