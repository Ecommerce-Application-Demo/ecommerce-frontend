// withTooltip.js
import React from 'react';
import {Tooltip} from 'react-tooltip';

const withTooltip = (Component) => ({ tooltip, ...props }) => {
  const tooltipId = `tooltip-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div data-tip={tooltip} data-for={tooltipId}>
      <Component {...props} />
      <Tooltip id={tooltipId} />
    </div>
  );
};

export default withTooltip;
