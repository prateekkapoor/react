import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger.firebaseio.com/'
});

export default instance;
