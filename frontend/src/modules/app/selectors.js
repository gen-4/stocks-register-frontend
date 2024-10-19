const getModuleState = state => state.app;

export const getError = state => getModuleState(state).error;

export const isLoading = state => getModuleState(state).loading;

export const getInfoMessage = state => getModuleState(state).info;
