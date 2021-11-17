import {
    USER_CHANGED, 
    USER_DELETED, 
    USER_FETCH_SUCCESS, 
    USERS_FETCH_SUCCESS, 
    USER_ACTION_SUCCESS,
    FINISH_USER_ACTION,
    SET_USERS_OFFSET,
    CLEAR_MESSAGE
} from "./types";

import UserService from "../services/user.service";
import ErrorCreator from "../helpers/ErrorCreator";

export const fetchPaginatedUsers = (offset = 0) => async (dispatch) => {
    try {
        const data = await UserService.getPaginated(offset)
        dispatch({
            type: USERS_FETCH_SUCCESS,
            payload: data,
        });
        dispatch({
            type: SET_USERS_OFFSET,
            payload: offset
          })
    } catch (error) {
        console.log('error fetching users', error);
        dispatch(ErrorCreator(error));
    }
};

export const createUser = (data) => async (dispatch) => {
    try {
        await UserService.create(data)
        dispatch({
            type: USER_CHANGED,
        });
        dispatch({
            type: USER_ACTION_SUCCESS,
        });
    } catch (error) {
        dispatch(ErrorCreator(error));
        console.log('error creating user', error);
    }
};

export const fetchUser = (id) => async (dispatch) => {
    try {
        const data = await UserService.get(id)
        dispatch({
            type: USER_FETCH_SUCCESS,
            payload: data,
        });
    } catch (error) {
        console.log('error fetching user', error);
        dispatch(ErrorCreator(error));
    }
};

export const ApplyMyRate = (id, rating) => async (dispatch) => {
    try {
        await UserService.rateUser(id, rating)
    } catch (error) {
        console.log('error rating user', error);
        dispatch(ErrorCreator(error));
    }
};

export const updateUser = (data) => async (dispatch) => {
    try {
        await UserService.update(data)
        dispatch({
            type: USER_CHANGED,
        });
        dispatch({
            type: USER_ACTION_SUCCESS,
        });
    } catch (error) {
        dispatch(ErrorCreator(error));
        console.log('error updating user', error);
    }
};

export const deleteUser = (id) => async (dispatch) => {
    try {
        await UserService.remove(id);
        const data = UserService.getAll();
        dispatch({
            type: USER_DELETED,
            payload: data
        });
    } catch (error) {
        console.log('error deleting user', error);
        dispatch(ErrorCreator(error));
    }
}

export const resetError = () => (dispatch) => {
    dispatch({
        type: FINISH_USER_ACTION,
    });
    dispatch({
        type: CLEAR_MESSAGE
    });
}
