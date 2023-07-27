import axios from "axios";

function apiInstance() {
    const instance = axios.create({
        baseURL: "http://localhost:8080",
        headers: {
            "Content-Type": "application/json; charset=UTF-8`",
            "Access-Control-Allow-Origin": "http://localhost:8080",
        },
    });
    return instance;
}
export { apiInstance };
