import {useEffect} from 'react';
import axios from '../services/http.service';
import {useDispatch} from 'react-redux';

import {LOGIN_FAIL, LOGIN_SUCCESS} from '../actions/types';
import jwtDecode from "jwt-decode";

const useAuth = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const token = JSON.parse(localStorage.getItem("token"));
        const refresh_token = JSON.parse(localStorage.getItem("refresh_token"));
        const userRole = token? jwtDecode(token).user_role: null;
        const should_reset_password = token? jwtDecode(token).should_reset_password: false;

        if ( ! token ) {
            dispatch({
                type: LOGIN_FAIL
            })

            axios.defaults.headers.common['Authorization'] = null;
            return;
        }
        dispatch({
            type: LOGIN_SUCCESS,
            payload: {token},
            refresh_token: refresh_token,
            userRole: userRole,
            should_reset_password: should_reset_password,
        });
        axios.defaults.headers.common['Authorization'] = `Bearer ${ token }`;


    }, []);
}

export default useAuth;