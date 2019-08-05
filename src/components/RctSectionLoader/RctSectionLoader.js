/**
 * Rct Section Loader
 */
import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const RctSectionLoader = () => (
    <div className="d-flex justify-content-center loader-overlay" style={{backgroundColor: '#f9f9f9', opacity: 0.5}}>
        <CircularProgress />
    </div>
);

export default RctSectionLoader;
