import { UPDATE_USERNAME } from "../actions/user";
import { combineReducers } from 'redux';

const user  = (user = { username: ''}, action) => {
    switch (action.type) {
        case UPDATE_USERNAME:
            return { username: action.username }
        default:
            return user;
    }
}

export default combineReducers({ user })