import axios from 'axios';
import config from '../Config'

let headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
}

headers.Authorization = "bearer " + localStorage.getItem('userToken');

const Api = axios.create({
    baseURL: config.API_BASE_URL,
    headers
});

Api.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    if (error.response && error.response.data && error.response.data.message === 'token-expired') {
        localStorage.clear();
        return window.location.replace('/login?expired=true');
    }
    return Promise.reject(error);
});



export default Api;