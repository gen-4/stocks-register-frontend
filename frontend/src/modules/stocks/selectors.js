const getModuleState = state => state.stocks;

export const getStocks = state => 
    getModuleState(state).stocks;
