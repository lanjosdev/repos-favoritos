import axios from "axios";

const API_URL = axios.create({
    baseURL: 'https://api.github.com',
});

export default API_URL;