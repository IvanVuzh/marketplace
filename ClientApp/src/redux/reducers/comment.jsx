import {
    COMMENTS_FETCH_SUCCESS,
    COMMENT_FETCH_SUCCESS,
    COMMENT_DELETED,
    COMMENT_CHANGED,
    COMMENT_ACTION_SUCCESS,
    FINISH_COMMENT_ACTION,
    SET_COMMENTS_OFFSET,
} from "../actions/types";
import { commentsLimit } from "../helpers/constants";
const initialState = {
    endedAction: false,
    concreteComment: null,
    data: [],
    shouldFetch: true,
    commentsCount: 0,
    offset: 0,
    limit: commentsLimit,
};

export default function category(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case COMMENTS_FETCH_SUCCESS:
            return { data: payload.comments, shouldFetch: false, commentsCount: payload.count };
        case COMMENT_FETCH_SUCCESS:
            return { concreteComment: payload, shouldFetch: false };
        case COMMENT_DELETED:
            return { ...state, shouldFetch: true };
        case COMMENT_CHANGED:
            return { ...state, shouldFetch: true };
        case COMMENT_ACTION_SUCCESS:
            return { ...state, endedAction: true };
        case FINISH_COMMENT_ACTION:
            return { ...state, endedAction: false };
        case SET_COMMENTS_OFFSET:
            return { ...state, offset: payload };
        default:
            return state;
    }
}
