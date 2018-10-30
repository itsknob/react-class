import { combineReducers } from 'redux';
import authReducer from './authReducer';

export default combineReducers({
   // keys here represent keys in our state object
   auth: authReducer 
});