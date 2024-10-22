import {
    fetchConfig,
    appFetch
} from "./appFetch";

import { config } from 'config/constants';

export const getStocks = ( onSuccess, onErrors ) => 
    appFetch(config.STOCKS_BASE_PATH + '/stocks', fetchConfig('GET'),
        stocks => onSuccess(stocks),
        onErrors
    );

export const requestStock = ( stock, onSuccess, onErrors ) =>
    appFetch(config.STOCKS_BASE_PATH + '/request', fetchConfig('PUT', stock),
        request => onSuccess(request),
        onErrors
    );
