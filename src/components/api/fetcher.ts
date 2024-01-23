import axios from "axios";
import { setupCache } from 'axios-cache-interceptor';

const URL = "https://localhost:8080/api/v1";
const headers = {
    'Content-Type': 'application/json',
};
const instance = axios.create({
    //zmienic ip na swoje
    baseURL: URL,
    headers: headers,
});
export const cacheInstance = setupCache(instance);


export const privateInstance = axios.create({
    baseURL: URL,
    headers: headers,
});


export default instance;

