import { combineReducers } from 'redux';

import * as actionTypes from './actionTypes';

const initialState = {
    stocks: null
};

const stocks = ( state = initialState.stocks, action ) => {
    switch ( action.type ) {
        case actionTypes.STOCKS_LOADED:
            return action.stocks;
            
        default:
            return state;

    }
}

const reducer = combineReducers({
    stocks
});

export default reducer;

