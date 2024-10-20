import React from 'react';
import PropTypes from 'prop-types';

import { CircularProgress } from '@mui/material';

import './Loader.css';

const Loader = ({ loading }) => loading && (
    <div>
        <CircularProgress />
    </div>
);

Loader.propTypes = {
    loading: PropTypes.bool.isRequired
};

export default Loader;
