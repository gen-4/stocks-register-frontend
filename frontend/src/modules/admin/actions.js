import * as actionTypes from './actionTypes';
import backend from 'backend';


const usersLoaded = users => ({
    type: actionTypes.USERS_LOADED,
    users
});

export const loadUsers = ( onSuccess, onErrors ) => dispatch =>
    backend.adminService.getUsers(
        users => {
            dispatch(usersLoaded(users));
            onSuccess();
        },
        onErrors
    );

const rolesLoaded = roles => ({
    type: actionTypes.ROLES_LOADED,
    roles
});

export const loadRoles = ( onErrors ) => dispatch =>
    backend.adminService.getRoles(
        roles => dispatch(rolesLoaded(roles)),
        onErrors
    );

export const addRoleToUser = ( userId, roleId, onSuccess, onErrors ) => dispatch =>
    backend.adminService.addRoleToUser(
        userId,
        roleId,
        onSuccess,
        onErrors
    );

export const removeRoleFromUser = ( userId, roleId, onSuccess, onErrors ) => dispatch =>
    backend.adminService.removeRoleFromUser(
        userId,
        roleId,
        onSuccess,
        onErrors
    );

export const manageUserBan = ( userId, banned, onSuccess, onErrors ) => dispatch =>
    backend.adminService.manageUserBan(
        userId,
        banned,
        onSuccess,
        onErrors
    );

const requestsLoaded = requests => ({
    type: actionTypes.REQUESTS_LOADED,
    requests
});

export const loadRequests = ( onSuccess, onErrors ) => dispatch =>
    backend.adminService.getRequests(
        requests => {
            dispatch(requestsLoaded(requests));
            onSuccess();
        },
        onErrors
    );
    
    