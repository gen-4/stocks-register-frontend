import React from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {ErrorDialog, Loader, InfoBar} from 'modules/common';
import * as actions from 'modules/app/actions';
import * as selectors from 'modules/app/selectors';

const ConnectedErrorDialog = () => {

    const error = useSelector(selectors.getError);
    const dispatch = useDispatch();

    return <ErrorDialog error={ error } 
        onClose={() => dispatch(actions.error(null))}
    />

};

const ConnectedLoader = () => {

    const loading = useSelector(selectors.isLoading);

    return <Loader loading={ loading }/>

};

const AppGlobalComponents = () => (

    <div>
        <ConnectedErrorDialog />
        <ConnectedLoader />
        <InfoBar />
    </div>

);

export default AppGlobalComponents;
