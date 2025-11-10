import axios from "axios";

const apiInstance = axios.create({
    baseURL: "https://easydev.club/api/v1",
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    },
});

export default apiInstance;