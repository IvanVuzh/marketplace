import {
    CATEGORIES_FETCH_SUCCESS,
    CATEGORY_FETCH_SUCCESS,
    CATEGORY_DELETED,
    CATEGORY_CHANGED,
    CATEGORY_ACTION_SUCCESS,
    FINISH_CATEGORY_ACTION,
    SET_CATEGORIES_OFFSET,
} from "../actions/types";
import { categoriesLimit } from "../helpers/constants";
const initialState = {
    endedAction: false,
    concreteCategory: null,
    data: [],
    shouldFetch: true,
    categoriesCount: 0,
    offset: 0,
    limit: categoriesLimit,
};

export default function category(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case CATEGORIES_FETCH_SUCCESS:
            return { data: payload.categories, shouldFetch: false, categoriesCount: payload.count };
        case CATEGORY_FETCH_SUCCESS:
            return { concreteCategory: payload, shouldFetch: false };
        case CATEGORY_DELETED:
            return { ...state, shouldFetch: true };
        case CATEGORY_CHANGED:
            return { ...state, shouldFetch: true };
        case CATEGORY_ACTION_SUCCESS:
            return { ...state, endedAction: true };
        case FINISH_CATEGORY_ACTION:
            return { ...state, endedAction: false };
        case SET_CATEGORIES_OFFSET:
            return { ...state, offset: payload };
        default:
            return state;
    }
}
