import axios from 'axios';
import baseApp from './firebase/index';

const instance = axios.create({
    baseURL: baseApp.databaseURL
});

export default instance;