import * as actionTypes from './actionTypes';

export const loading = () => ({
    type: actionTypes.LOADING
});

export const loaded = () => ({
    type: actionTypes.LOADED
});

export const error = error => ({
    type: actionTypes.ERROR,
    error
});

export const showInfo = (info) => ({
    type: actionTypes.SHOW_INFO,
    info
});

export const hidInfo = () => ({
    type: actionTypes.INFO_HIDDEN
});
