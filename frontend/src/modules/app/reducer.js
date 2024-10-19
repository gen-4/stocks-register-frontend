import { combineReducers } from 'redux';

import * as actionTypes from './actionTypes';

const initialState = {
    error: null,
    loading: false,
    info: null,
};

const error = (state = initialState.error, action) => {
    switch (action.type) {
        case actionTypes.ERROR:
            return action.error;

        default:
            return state;

    }
}

const loading = (state = initialState.loading, action) => {
    switch (action.type) {
        case actionTypes.LOADING:
            return true;

        case actionTypes.LOADED:
            return false;

        case actionTypes.ERROR:
            return false;

        default:
            return state;

    }
}

const info = (state = initialState.info, action)=> {

    switch (action.type) {
        case actionTypes.SHOW_INFO:
            return action.info;
        
        case actionTypes.INFO_HIDDEN:
            return initialState.info;
            
        default:
            return state;
    }
}

const reducer = combineReducers({
    error,
    loading,
    info
});

export default reducer;
