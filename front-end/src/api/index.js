import axios from "axios";

function apiInstance() {
    const instance = axios.create({
        baseURL: "http://localhost:8080",
        headers: {
            "Content-Type": "application/json; charset=UTF-8`",
            "Access-Control-Allow-Origin": "*",
        },
    });
    return instance;
}
export { apiInstance };
