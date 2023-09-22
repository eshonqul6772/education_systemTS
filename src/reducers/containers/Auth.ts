import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { LOGOUT, PROFILE_SUCCESS } from '../types';

import UserService from 'services/user.service';

const Auth = ({ children }:any) => {
    const dispatch = useDispatch();


    const token = useSelector(({auth}) => auth.token);

    useEffect(() => {
        if (token) {
            UserService.getUser()
                .then(res => {
                    dispatch({ type: PROFILE_SUCCESS, payload: res.data });
                })
                .catch(() => {
                    dispatch({ type: LOGOUT });
                });
        }
    }, [token]);

    return children;
}

export default Auth;