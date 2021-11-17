import {
  USERS_FETCH_SUCCESS,
  USER_FETCH_SUCCESS,
  USER_CHANGED,
  USER_DELETED,
  USER_ACTION_SUCCESS,
  FINISH_USER_ACTION,
  SET_USERS_OFFSET,
} from "../actions/types";
import { usersLimit } from "../helpers/constants";
const initialState = {
  endedAction: false,
  concreteUser: null,
  data: [],
  shouldFetch: true,
  usersCount: 0,
  offset: 0,
  limit: usersLimit,
};

export default function user (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case USERS_FETCH_SUCCESS:
      return { data: payload.users, shouldFetch: false, usersCount: payload.count };
    case USER_FETCH_SUCCESS:
      return { concreteUser: payload, shouldFetch: false };
    case USER_CHANGED:
      return { ...state, shouldFetch: true };
    case USER_DELETED:
      return { ...state, shouldFetch: true };
    case USER_ACTION_SUCCESS:
      return { ...state, endedAction: true };
    case FINISH_USER_ACTION:
      return { ...state, endedAction: false };
    case SET_USERS_OFFSET:
      return { ...state, offset: payload };
    default:
      return state;
  }
}
