import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './reducers/authReducer';
import requestReducer from './reducers/requestReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  request: requestReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;