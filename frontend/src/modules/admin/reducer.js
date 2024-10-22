import { combineReducers } from 'redux';

import * as actionTypes from './actionTypes';

const initialState = {
    users: null,
    roles: null,
    requests: null
};

const users = ( state = initialState.users, action ) => {
    switch ( action.type ) {
        case actionTypes.USERS_LOADED:
            return action.users;
            
        default:
            return state;

    }
}

const roles = ( state = initialState.roles, action ) => {
    switch ( action.type ) {
        case actionTypes.ROLES_LOADED:
            return action.roles;
            
        default:
            return state;

    }
}

const requests = ( state = initialState.requests, action ) => {
    switch ( action.type ) {
        case actionTypes.REQUESTS_LOADED:
            return action.requests;
            
        default:
            return state;

    }
}

const reducer = combineReducers({
    users,
    roles,
    requests
});

export default reducer;
