import axios from "axios";

const API = axios.create({
    baseURL: "https://i9c209.p.ssafy.io",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${btoa("OPENVIDUAPP:MUNG")}`,
    },
});

export default API;
