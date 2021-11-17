import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_SUCCESS,
  REFRESHED_TOKEN,
  TOKEN_REFRESH_FAIL,
} from "../actions/types";

const storageToken = JSON.parse(localStorage.getItem("token"));
const storageRefreshToken = JSON.parse(localStorage.getItem("refresh_token"));
const initialState = storageToken
  ? { isLoggedIn: true, token:storageToken, refreshToken: storageRefreshToken }
  : { isLoggedIn: false, token: null, refresh_token: null };

export default function auth (state = initialState, action) {
  const { type, payload, refreshToken } = action;
  switch (type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        token: payload.token,
        refreshToken: refreshToken,
      };
    case TOKEN_REFRESH_FAIL:
    case LOGIN_FAIL:
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        token: null,
        refreshToken: null,
      };
    case REFRESHED_TOKEN:
      return {
        ...state,
        token: payload,
        refreshToken: refreshToken,
      };
    case RESET_PASSWORD_FAIL:
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
      };
    default:
      return state;
  }
}