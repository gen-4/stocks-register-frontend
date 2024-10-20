import {
    fetchConfig,
    appFetch,
    setServiceToken,
    getServiceToken,
    removeServiceToken,
    setReauthenticationCallback,
} from "./appFetch";

import { config } from 'config/constants';
  
export const login = (email, password, onSuccess, onErrors, reauthenticationCallback) =>
    appFetch(config.AUTH_BASE_PATH + '/login', fetchConfig('POST', { email, password }),
        authenticatedUser => {
            setServiceToken(authenticatedUser.token);
            setReauthenticationCallback(reauthenticationCallback);
            onSuccess(authenticatedUser);
        },
        onErrors
    );
  
export const tryLoginFromServiceToken = (onSuccess, reauthenticationCallback) => {
  
    const serviceToken = getServiceToken();
  
    if (!serviceToken) {
        onSuccess();
        return;
    }
  
    setReauthenticationCallback(reauthenticationCallback);
  
    appFetch(config.AUTH_BASE_PATH + '/login-with-token', fetchConfig('POST'),
        authenticatedUser => onSuccess(authenticatedUser),
        () => removeServiceToken()
    );
  
}
  
export const register = (user, onSuccess, onErrors, reauthenticationCallback) => {
  
    appFetch(config.AUTH_BASE_PATH + '/register', fetchConfig('POST', user), 
        authenticatedUser => {
            setServiceToken(authenticatedUser.token);
            setReauthenticationCallback(reauthenticationCallback);
            onSuccess(authenticatedUser);
        }, 
        onErrors
    );
  
}

export const logout = () => removeServiceToken();
