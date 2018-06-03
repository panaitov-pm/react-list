import { combineReducers } from 'redux';
import userInfo from './userInfo';
import users from './users';

export default combineReducers({
  userInfo,
  users,
});
