const getModuleState = state => state.admin;

export const getUsers = state => 
    getModuleState(state).users;

export const getRoles = state => 
    getModuleState(state).roles;
