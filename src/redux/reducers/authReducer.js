import { LOGIN, REGISTER, GET_USERS, LOGOUT } from '../actionTypes/authTypes';

const initialState = {
  user: null,
  users: [],
  isLoading: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        user: action.payload,
        isLoading: false,
        error: null,
      };
    case REGISTER:
      return {
        ...state,
        user: action.payload,
        isLoading: false,
        error: null,
      };
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
        isLoading: false,
        error: null,
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
        isLoading: false,
        error: null,
      };
    default:
      return state;
  }
};

export default authReducer;