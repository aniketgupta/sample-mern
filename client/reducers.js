/**
 * Root Reducer
 */
import { combineReducers } from 'redux';

// Import Reducers
import app from './modules/App/AppReducer';
import posts from './modules/Post/PostReducer';
import intl from './modules/Intl/IntlReducer';
import user from './modules/Users/UserReducer';
import login from './modules/Users/LoginReducer';
import schedule from './modules/Schedule/ScheduleReducer';
import doctor from './modules/Appointment/AppointmentReducer'
import vote from './modules/Vote/VoteReducer'

// Combine all reducers into one root reducer
export default combineReducers({
  app,
  posts,
  intl,
  user,
  login,
  schedule,
  doctor,
  vote
});
