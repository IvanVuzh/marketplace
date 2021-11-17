import {
    PRODUCT_ADDED_SUCCESS,
    PRODUCT_CHANGED,
    PRODUCT_DELETED,
    PRODUCT_FETCH_SUCCESS,
    PRODUCTS_FETCH_SUCCESS,
    PRODUCT_ACTION_SUCCESS,
    FINISH_PRODUCT_ACTION,
    SET_PRODUCTS_OFFSET,
    CLEAR_MESSAGE
} from "./types";

import ProductService from '../services/product.service';
import ErrorCreator from "../helpers/ErrorCreator"

export const fetchProductsPaginated = (offset = 0) => async (dispatch) => {
    try {
        const data = await ProductService.getPaginated(offset);
        dispatch({
            type: PRODUCTS_FETCH_SUCCESS,
            payload: data,
        });
        dispatch({
            type: SET_PRODUCTS_OFFSET,
            payload: offset,
          })
    } catch (error) {
        console.log('error fetchin products', error)
        dispatch(ErrorCreator(error));
    };
};

export const createProduct = (data) => async dispatch => {
    try {
        await ProductService.create(data)
        dispatch({
            type: PRODUCT_ADDED_SUCCESS
        });
        dispatch({
            type: PRODUCT_ACTION_SUCCESS
        });
    } catch (error) {
        dispatch(ErrorCreator(error));
        console.log('error creating product', error);
    }
};

export const updateProduct = (data) => async dispatch => {
    try {
        await ProductService.update(data);
        dispatch({
            type: PRODUCT_CHANGED,
        });
        dispatch({
            type: PRODUCT_ACTION_SUCCESS
        });
    } catch (error) {
        console.log('error updating product', error);
        dispatch(ErrorCreator(error));
    }
};

export const fetchProduct = (id) => async dispatch => {
    try {
        const data = await ProductService.get(id);
        dispatch({
            type: PRODUCT_FETCH_SUCCESS,
            payload: data
        });
    } catch (error) {
        console.log('error fetching product');
        dispatch(ErrorCreator(error));
    }
};

export const deleteProduct = (id) => async (dispatch) => {
    try {
        await ProductService.remove(id);
        dispatch({
            type: PRODUCT_DELETED
        });
    } catch (error) {
        console.log('error deleting product', error);
        dispatch(ErrorCreator(error));
    }
}

export const resetError = () => (dispatch) => {
    dispatch({
        type: FINISH_PRODUCT_ACTION,
    });
    dispatch({
        type: CLEAR_MESSAGE,
      });
}
