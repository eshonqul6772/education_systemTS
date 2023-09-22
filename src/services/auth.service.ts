import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;


const register = (username: string, password: string, email: string) => {
    return axios.post(API_URL + '/signup', {
        username,
        email,
        password
    });
};

const login = (username: string, password: string) => axios
    .post(API_URL + '/auth/login', {
        username,
        password,
    })
    .then((response) => {
        return response.data;
    });

export default {
    register,
    login
};
