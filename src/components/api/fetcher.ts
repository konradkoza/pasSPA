import axios from "axios";

const instance = axios.create({
    //zmienic ip na swoje
    baseURL: "http://localhost/api/v1",
    headers: {
        'Content-Type': 'application/json',
    }
});

export default instance;

