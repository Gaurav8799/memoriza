import posts from "../components/Posts/Posts";
import { CREATE, DELETE, FETCH_ALL, UPDATE } from '../actionTypes/actionTypes';

export default (posts = [],action) =>{
    switch(action.type){
        case FETCH_ALL:
            return action.payload;  //action.payload are posts
        case CREATE:
            return [...posts,action.payload];
        case UPDATE:
            return posts.map(post => post._id === action.payload._id ? action.payload : post)
        case DELETE:
            return posts.filter(post => post._id !== action.payload)
        default:
            return posts;
    }
}