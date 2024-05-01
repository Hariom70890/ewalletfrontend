import { LOGIN, REGISTER, GET_USERS, LOGOUT } from '../actionTypes/authTypes';
import authService from '../services/authService';

export const login = (userData) => async (dispatch) => {
  try {
    const response = await authService.login(userData);
    dispatch({ type: LOGIN, payload: response.data });
  } catch (error) {
    console.log(error);
  }
};

export const register = (userData) => async (dispatch) => {
  try {
    const response = await authService.register(userData);
    dispatch({ type: REGISTER, payload: response.data });
  } catch (error) {
    console.log(error);
  }
};

export const getAllUsers = () => async (dispatch, getState) => {
  try {
    const token = getState().auth.user.token;
    const response = await authService.getAllUsers(token);
    dispatch({ type: GET_USERS, payload: response.data });
  } catch (error) {
    console.log(error);
  }
};

export const logout = () => async (dispatch) => {
  try {
    authService.logout();
    dispatch({ type: LOGOUT });
  } catch (error) {
    console.log(error);
  }
};