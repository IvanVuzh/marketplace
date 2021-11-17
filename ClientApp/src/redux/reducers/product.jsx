import {
    PRODUCT_ADDED_SUCCESS,
    PRODUCT_CHANGED,
    PRODUCT_DELETED,
    PRODUCT_FETCH_SUCCESS,
    PRODUCTS_FETCH_SUCCESS,
    FINISH_PRODUCT_ACTION,
    PRODUCT_ACTION_SUCCESS,
    SET_PRODUCTS_OFFSET,
} from "../actions/types";
import { productsLimit } from "../helpers/constants";

const initialState = {
    endedAction: false,
    concreteProduct: null,
    data: [],
    shouldFetch: true,
    productsCount: 0,
    offset: 0,
    limit: productsLimit,
};

export default function product (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case PRODUCTS_FETCH_SUCCESS:
            return { data: payload.products, shouldFetch: false, productsCount: payload.count };
        case PRODUCT_ADDED_SUCCESS:
            return { ...state, shouldFetch: true }
        case PRODUCT_FETCH_SUCCESS:
            return { concreteProduct: payload, shouldFetch: false }
        case PRODUCT_CHANGED:
            return { ...state, shouldFetch: true }
        case PRODUCT_DELETED:
            return { ...state, shouldFetch: true }
        case PRODUCT_ACTION_SUCCESS:
            return { ...state, endedAction: true }
        case FINISH_PRODUCT_ACTION:
            return { ...state, endedAction: false }
        case SET_PRODUCTS_OFFSET:
            return { ...state, offset: payload }
        default:
            return state
    }
}