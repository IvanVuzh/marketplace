import {
    COMMENTS_FETCH_SUCCESS,
    COMMENT_FETCH_SUCCESS,
    COMMENT_DELETED,
    COMMENT_CHANGED,
    COMMENT_ACTION_SUCCESS,
    FINISH_COMMENT_ACTION,
    SET_COMMENTS_OFFSET,
    CLEAR_MESSAGE
  } from "./types";

import CommentService from "../services/comment.service";
import ErrorCreator from "../helpers/ErrorCreator";

export const fetchPaginatedComments = (offset = 0, productId ) => async (dispatch) => {
    try {
        const data = await CommentService.getPaginated(offset, productId)
        dispatch({
            type: COMMENTS_FETCH_SUCCESS,
            payload: data,
        });
        dispatch({
            type: SET_COMMENTS_OFFSET,
            payload: offset
          })
    } catch (error) {
        console.log('error fetching comments', error);
        dispatch(ErrorCreator(error));
    }
};

export const createComment = (data) => async (dispatch) => {
    try {
        await CommentService.create(data)
        dispatch({
            type: COMMENT_CHANGED,
        });
        dispatch({
            type: COMMENT_ACTION_SUCCESS,
        });
    } catch (error) {
        dispatch(ErrorCreator(error));
        console.log('error creating comment', error);
    }
};

export const fetchComment = (id) => async (dispatch) => {
    try {
        const data = await CommentService.get(id)
        dispatch({
            type: COMMENT_FETCH_SUCCESS,
            payload: data,
        });
    } catch (error) {
        console.log('error fetching comment', error);
        dispatch(ErrorCreator(error));
    }
};

export const updateComment = (data) => async (dispatch) => {
    try {
        await CommentService.update(data)
        dispatch({
            type: COMMENT_CHANGED,
        });
        dispatch({
            type: COMMENT_ACTION_SUCCESS,
        });
    } catch (error) {
        dispatch(ErrorCreator(error));
        console.log('error updating comment', error);
    }
};

export const deleteComment = (id) => async (dispatch) => {
    try {
        await CommentService.remove(id);
        const data = CommentService.getAll();
        dispatch({
            type: COMMENT_DELETED,
            payload: data
        });
    } catch (error) {
        console.log('error deleting comment', error);
        dispatch(ErrorCreator(error));
    }
}

export const resetError = () => (dispatch) => {
    dispatch({
        type: FINISH_COMMENT_ACTION,
    });
    dispatch({
        type: CLEAR_MESSAGE
    });
}
