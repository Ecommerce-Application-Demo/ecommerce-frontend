import React from 'react';
import { useSelector } from 'react-redux';
import { makeSelectState } from './selectors';

const withReduxState = (WrappedComponent) => {
  return (props) => {
    const selectedState = useSelector(makeSelectState);
    return <WrappedComponent {...props} {...selectedState} />;
  };
};

export default withReduxState;
