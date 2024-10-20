import {
    fetchConfig,
    appFetch
} from "./appFetch";

import { config } from 'config/constants';

export const getUsers = ( onSuccess, onErrors ) => 
    appFetch(config.ADMIN_BASE_PATH + '/users', fetchConfig('GET'),
        users => onSuccess(users),
        onErrors
    );

export const getRoles = ( onSuccess, onErrors ) => 
    appFetch(config.ADMIN_BASE_PATH + '/roles', fetchConfig('GET'),
        users => onSuccess(users),
        onErrors
    );

export const addRoleToUser = ( userId, roleId, onSuccess, onErrors ) => 
    appFetch(config.ADMIN_BASE_PATH + `/user/${userId}/role`, fetchConfig('PUT', { roleId }),
        resp => onSuccess(resp.message),
        onErrors
    );

export const removeRoleFromUser = ( userId, roleId, onSuccess, onErrors ) => 
    appFetch(config.ADMIN_BASE_PATH + `/user/${userId}/role`, fetchConfig('DELETE', { roleId }),
        resp => onSuccess(resp.message),
        onErrors
    );

export const manageUserBan = ( userId, ban, onSuccess, onErrors ) => {
    appFetch(config.ADMIN_BASE_PATH + `/user/${userId}/ban`, fetchConfig('POST', { ban }),
        resp => onSuccess(resp.message),
        onErrors
    );}
