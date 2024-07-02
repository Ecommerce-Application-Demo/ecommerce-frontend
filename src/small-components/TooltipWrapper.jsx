// TooltipWrapper.js
import React from 'react';
import withTooltip from './WithTooltip';

const TooltipWrapper = ({ children }) => {
  const wrapWithTooltip = (child) => {
    if (child.props && child.props.tooltip) {
      const WrappedComponent = withTooltip(child.type);
      return <WrappedComponent {...child.props} />;
    }
    if (child.props && child.props.children) {
      return React.cloneElement(child, {
        children: React.Children.map(child.props.children, wrapWithTooltip),
      });
    }
    return child;
  };

  return (
    <>
      {React.Children.map(children, wrapWithTooltip)}
    </>
  );
};

export default TooltipWrapper;
