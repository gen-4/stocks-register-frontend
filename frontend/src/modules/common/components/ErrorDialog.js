import React from 'react';
import PropTypes from 'prop-types';
import { useIntl, FormattedMessage } from 'react-intl';

import { NetworkError } from 'backend';

const ErrorDialog = ({ error, onClose }) => {

    const intl = useIntl();

    if (error == null) {
        return null;
    }

    const modalStyle = { 
        display: 'block', 
        color: 'var(--text-black)'
    }; 
    const documentStyle = { border: '2px solid var(--error)' };
    const buttonStyle = { backgroundColor: 'var(--primary)', color: 'var(--text-white)' }
    const message = error instanceof NetworkError ?
        intl.formatMessage({id: 'stocks.global.exceptions.NetworkError'}) :
        error.message;

    return (

        <div className="modal" style={ modalStyle } tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
                <div className="modal-content" style={ documentStyle }>
                    <div className="modal-header">
                        <h5 className="modal-title">
                            <FormattedMessage id="stocks.common.ErrorDialog.title"/>
                        </h5>
                    </div>
                    <div className="modal-body">
                        <p>{ message }</p>
                    </div>
                    <div className="modal-footer">
                        <button style={ buttonStyle } type="button" className="btn" 
                            data-dismiss="modal" 
                            onClick={ onClose }>
                            <FormattedMessage id="stocks.global.buttons.close"/>
                        </button>
                    </div>
                </div>
            </div>
        </div>

    );

};

ErrorDialog.propTypes = {
    error: PropTypes.object,
    onClose: PropTypes.func.isRequired
}

export default ErrorDialog;
