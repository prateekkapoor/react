import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com'
});

axios.defaults.headers.common['Authorization'] = 'MY-Token from axios instance';

export default instance;