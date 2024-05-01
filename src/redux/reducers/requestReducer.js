import {
    SEND_REQUEST,
    REQUEST_SEND,
    REQUEST_RECEIVED,
    UPDATE_REQUEST,
  } from '../actionTypes/requestTypes';
  
  const initialState = {
    request: null,
    send: [],
    received: [],
    isLoading: false,
    error: null,
  };
  
  const requestReducer = (state = initialState, action) => {
    switch (action.type) {
      case SEND_REQUEST:
        return {
          ...state,
          request: action.payload,
          isLoading: false,
          error: null,
        };
      case REQUEST_SEND:
        return {
          ...state,
          send: action.payload,
          isLoading: false,
          error: null,
        };
      case REQUEST_RECEIVED:
        return {
          ...state,
          received: action.payload,
          isLoading: false,
          error: null,
        };
      case UPDATE_REQUEST:
        return {
          ...state,
          request: action.payload,
          isLoading: false,
          error: null,
        };
      default:
        return state;
    }
  };
  
  export default requestReducer;