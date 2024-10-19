const getModuleState = state => state.user;

export const getUser = state => 
    getModuleState(state).user;

export const isLoggedIn = state =>
    getUser(state) !== null;

export const getUsername = state =>
    isLoggedIn(state) ? getUser(state).username : null;

export const getUserEmail = state =>
    isLoggedIn(state) ? getUser(state).email : null;

export const isAdmin = state =>
    isLoggedIn(state) ? getUser(state).roles.includes('ADMIN') : false;
