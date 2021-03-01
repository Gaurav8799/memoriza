import { combineReducers } from 'redux';
import authReducer from './auth';
import posts from './posts';

export default combineReducers({
    posts,  //posts:posts
    authReducer
    
})