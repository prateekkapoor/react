import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-brger.firebaseio.com/'
});

export default instance;