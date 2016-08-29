import {combineReducers} from 'redux';
import { reducer as formReducer } from 'redux-form';
import auth from './authReducer';
const rootReducer = combineReducers({
  auth
});
export default rootReducer;
//we using the shorthand-property name in ES6
