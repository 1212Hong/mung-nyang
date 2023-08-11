import axios from "axios";

const OPENVIDU = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${btoa("OPENVIDUAPP:MUNG")}`,
    },
});

export default OPENVIDU;
