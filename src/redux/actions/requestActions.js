import {
    SEND_REQUEST,
    REQUEST_SEND,
    REQUEST_RECEIVED,
    UPDATE_REQUEST,
  } from '../actionTypes/requestTypes';
  import requestService from '../services/requestService';
  
  export const sendRequest = (requestData) => async (dispatch, getState) => {
    try {
      const token = getState().auth.user.token;
      const response = await requestService.requestMoney(requestData, token);
      dispatch({ type: SEND_REQUEST, payload: response.data });
    } catch (error) {
      console.log(error);
    }
  };
  
  export const requestSend = () => async (dispatch, getState) => {
    try {
      const token = getState().auth.user.token;
      const response = await requestService.requestSend(token);
      dispatch({ type: REQUEST_SEND, payload: response.data });
    } catch (error) {
      console.log(error);
    }
  };
  
  export const requestReceived = () => async (dispatch, getState) => {
    try {
      const token = getState().auth.user.token;
      const response = await requestService.requestReceived(token);
      dispatch({ type: REQUEST_RECEIVED, payload: response.data });
    } catch (error) {
      console.log(error);
    }
  };
  
  export const updateRequest = (updatedRequest) => async (dispatch, getState) => {
    try {
      const token = getState().auth.user.token;
      const response = await requestService.updateRequestStatus(updatedRequest, token);
      dispatch({ type: UPDATE_REQUEST, payload: response.data });
    } catch (error) {
      console.log(error);
    }
  };