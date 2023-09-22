import axios from 'axios';

import authHeader from './auth-header';

const API_URL = process.env.REACT_APP_API_URL;

const getUser = () => {
    return axios.get(API_URL + '/users/me', { headers: authHeader() });
};

const getUserId = (id?:string) => {
    return axios.get(API_URL + '/users/' + id, {headers: authHeader()});
};

const update = (id?:string, data?:any) => {
    return axios.put(API_URL + `/users/${id}`,data, {headers: authHeader()});
};

export default {
    getUser,
    getUserId,
    update
};
