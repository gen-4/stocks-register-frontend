import * as actionTypes from './actionTypes';
import backend from 'backend';

const registerCompleted = authenticatedUser => ({
    type: actionTypes.REGISTER_COMPLETED,
    authenticatedUser
});

export const register = ( user, onSuccess, onErrors, reauthenticationCallback ) => dispatch =>
    backend.userService.signUp(user,
        authenticatedUser => {
            dispatch(registerCompleted(authenticatedUser));
            onSuccess(user);
        },
        onErrors,
        reauthenticationCallback);

const loginCompleted = authenticatedUser => ({
    type: actionTypes.LOGIN_COMPLETED,
    authenticatedUser
});

export const login = ( email, password, onSuccess, onErrors, reauthenticationCallback ) => dispatch =>
    backend.userService.login(email, password,
        authenticatedUser => {
            dispatch(loginCompleted(authenticatedUser));
            onSuccess();
        },
        onErrors,
        reauthenticationCallback
    );

export const tryLoginFromServiceToken = reauthenticationCallback => dispatch =>
    backend.userService.tryLoginFromServiceToken(
        authenticatedUser => {
            if (authenticatedUser) {
                dispatch(loginCompleted(authenticatedUser));
            }
        },
        reauthenticationCallback
    );
    

export const logout = () => {
    backend.userService.logout();

    return { type: actionTypes.LOGOUT };

};
