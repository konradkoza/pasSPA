import axios from "axios";

const instance = axios.create({
    //zmienic ip na swoje
    baseURL: "http://10.128.144.169:8080/api/v1",
    headers: {
        'Content-Type': 'application/json',
    }
});

export default instance;

