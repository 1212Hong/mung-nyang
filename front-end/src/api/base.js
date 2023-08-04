import axios from "axios";

const API = axios.create({
    baseURL: "https://i9c209.p.ssafy.io",
    headers: {
        "Content-Type": "application/json",
    },
});

export default API;
