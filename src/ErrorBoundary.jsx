import React from 'react';
import PropTypes from 'prop-types';

import Toolbar from '@material-ui/core/Toolbar';

const ErrorBoundary = ({ title }) => (
  <Toolbar>
    <h2 style={{ color: 'red' }}>{title}</h2>
  </Toolbar>
);

ErrorBoundary.propTypes = {
  title: PropTypes.string.isRequired,
};

export default ErrorBoundary;
