import {
    CLEAR_MESSAGE,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT,
    RESET_PASSWORD_FAIL,
    RESET_PASSWORD_SUCCESS,
    SET_MESSAGE,
    REFRESHED_TOKEN,
    TOKEN_REFRESH_FAIL,
} from "./types";

import AuthService from "../services/auth.service";
import jwtDecode from "jwt-decode";
import axios from '../services/http.service'
import ErrorCreator from "../helpers/ErrorCreator";

export const login = (email, password) => async (dispatch) => {
    try {
        const tokens = await AuthService.login(email, password)
        const token = tokens.token;
        const refreshToken = tokens.refresh_token;
        const role = jwtDecode(token).user_role;
        const should_reset_password = jwtDecode(token).should_reset_password;
        await dispatch({
            type: LOGIN_SUCCESS,
            payload: {token},
            refreshToken: refreshToken,
            userRole: role,
            should_reset_password: should_reset_password
        });
        dispatch({
            type: CLEAR_MESSAGE
        })
        const storage_token = JSON.parse(localStorage.getItem("token"));
        axios.defaults.headers.common['Authorization'] = `Bearer ${ storage_token }`;


        return true;
    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
        });
        dispatch(ErrorCreator(error));
    }
    return false;
};

export const refreshToken = () => async (dispatch) => {
    try {
        const tokens = await AuthService.refreshToken()
        const token = tokens.token;
        const refreshToken = tokens.refresh_token;
        await dispatch({
            type: REFRESHED_TOKEN,
            payload: {token},
            refreshToken: refreshToken,
        });
        dispatch({
            type: CLEAR_MESSAGE
        })
        return token;
    } catch (error) {
        await dispatch({
            type: TOKEN_REFRESH_FAIL,
        });
        dispatch(ErrorCreator(error));
        dispatch(logout);
    }
    return false;
}

export const resetPassword = (password, confirmPassword) => async (dispatch) => {
    if ( password !== confirmPassword ) {
        await dispatch({
            type: SET_MESSAGE,
            payload: "Passwords missmatch"
        });
        setTimeout(() => dispatch({type: CLEAR_MESSAGE}), 3000);
        return false
    }
    try {
        const tokens = await AuthService.resetPassword(password, confirmPassword);
        const token = tokens.token;
        const should_reset_password = jwtDecode(token).should_reset_password;
        dispatch({
            type: RESET_PASSWORD_SUCCESS,
            should_reset_password: should_reset_password
        });
        dispatch({
            type: CLEAR_MESSAGE
        })
        const storage_token = JSON.parse(localStorage.getItem("token"));
        axios.defaults.headers.common['Authorization'] = `Bearer ${ storage_token }`;


        return true;
    } catch (error) {
        dispatch({
            type: RESET_PASSWORD_FAIL,
        });

        dispatch(ErrorCreator(error));
    }
    return false;
}

export const logout = () => async (dispatch) => {
    await AuthService.logout();

    dispatch({
        type: LOGOUT,
    });
};
