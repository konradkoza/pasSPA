import axios from "axios";

const URL = "https://localhost:8080/api/v1";
const headers = {
    'Content-Type': 'application/json',
};
const instance = axios.create({
    //zmienic ip na swoje
    baseURL: URL,
    headers: headers,
});

export const privateInstance = axios.create({
    baseURL: URL,
    headers: headers,
});


export default instance;

