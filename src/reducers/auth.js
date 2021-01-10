import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  WRITER_REGISTER_SUCCESS,
  WRITER_LOGIN_SUCCESS,
  WRITER_REGISTER_FAIL,
  USER_LOADED,
  WRITER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  ACCOUNT_DELETED,
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  writertoken: localStorage.getItem('writertoken'),
  isAuthenticated: null,
  loading: true,
  user: null,
  isGroup: false,
};
// eslint-disable-next-line
export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    case WRITER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case WRITER_REGISTER_SUCCESS:
    case WRITER_LOGIN_SUCCESS:
      localStorage.setItem('writertoken', payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
    case ACCOUNT_DELETED:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        writertoken: null,
        user: null,
        isAuthenticated: false,
        loading: false,
        isGroup: false,
      };
    case WRITER_REGISTER_FAIL:
      localStorage.removeItem('writertoken');
      return {
        ...state,
        token: null,
        writertoken: null,
        user: null,
        isAuthenticated: false,
        loading: false,
        isGroup: false,
      };
    default:
      return state;
  }
}
