import {
    CATEGORIES_FETCH_SUCCESS,
    CATEGORY_FETCH_SUCCESS,
    CATEGORY_DELETED,
    CATEGORY_CHANGED,
    CATEGORY_ACTION_SUCCESS,
    FINISH_CATEGORY_ACTION,
    SET_CATEGORIES_OFFSET,
    CLEAR_MESSAGE
  } from "../actions/types";

import CategoryService from "../services/category.service";
import ErrorCreator from "../helpers/ErrorCreator";

export const fetchPaginatedCategories = (offset = 0) => async (dispatch) => {
    try {
        const data = await CategoryService.getPaginated(offset)
        dispatch({
            type: CATEGORIES_FETCH_SUCCESS,
            payload: data,
        });
        dispatch({
            type: SET_CATEGORIES_OFFSET,
            payload: offset
          })
    } catch (error) {
        console.log('error fetching categories', error);
        dispatch(ErrorCreator(error));
    }
};

export const createCategory = (data) => async (dispatch) => {
    try {
        await CategoryService.create(data)
        dispatch({
            type: CATEGORY_CHANGED,
        });
        dispatch({
            type: CATEGORY_ACTION_SUCCESS,
        });
    } catch (error) {
        dispatch(ErrorCreator(error));
        console.log('error creating category', error);
    }
};

export const fetchCategory = (id) => async (dispatch) => {
    try {
        const data = await CategoryService.get(id)
        dispatch({
            type: CATEGORY_FETCH_SUCCESS,
            payload: data,
        });
    } catch (error) {
        console.log('error fetching category', error);
        dispatch(ErrorCreator(error));
    }
};

export const updateCategory = (data) => async (dispatch) => {
    try {
        await CategoryService.update(data)
        dispatch({
            type: CATEGORY_CHANGED,
        });
        dispatch({
            type: CATEGORY_ACTION_SUCCESS,
        });
    } catch (error) {
        dispatch(ErrorCreator(error));
        console.log('error updating category', error);
    }
};

export const deleteCategory = (id) => async (dispatch) => {
    try {
        await CategoryService.remove(id);
        const data = CategoryService.getAll();
        dispatch({
            type: CATEGORY_DELETED,
            payload: data
        });
    } catch (error) {
        console.log('error deleting category', error);
        dispatch(ErrorCreator(error));
    }
}

export const resetError = () => (dispatch) => {
    dispatch({
        type: FINISH_CATEGORY_ACTION,
    });
    dispatch({
        type: CLEAR_MESSAGE
    });
}
