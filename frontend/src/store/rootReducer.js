import { combineReducers } from 'redux';

import app from 'modules/app';
import user from 'modules/user';
import admin from 'modules/admin';
import stocks from 'modules/stocks';



const rootReducer = combineReducers({
    app: app.reducer,
    user: user.reducer,
    admin: admin.reducer,
    stocks: stocks.reducer
});

export default rootReducer;
