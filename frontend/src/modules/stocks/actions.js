import * as actionTypes from './actionTypes';
import backend from 'backend';


const stocksLoaded = stocks => ({
    type: actionTypes.STOCKS_LOADED,
    stocks
});

export const loadStocks = ( onSuccess, onErrors ) => dispatch =>
    backend.stocksService.getStocks(
        stocks => {
            dispatch(stocksLoaded(stocks));
            onSuccess();
        },
        onErrors
    );

export const requestStock = ( stock, onSuccess, onErrors ) => dispatch =>
    backend.stocksService.requestStock(
        stock,
        request => onSuccess(request), // TODO: Load among requests
        onErrors
    );

export const createStock = ( stock, onSuccess, onErrors ) => dispatch =>
    backend.adminService.createStock(
        stock,
        request => onSuccess(request), // TODO: Load stock
        onErrors
        );
