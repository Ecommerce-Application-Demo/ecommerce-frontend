import React from 'react';
import PropTypes from 'prop-types';

const DesiCartCustomTags = ({ tagName, loading, className = '', children, skeletonHeight = '30px', skeletonWidth = '200px' }) => {
  const Tag = tagName || 'div';

  if (loading) {
    return <Tag className={`skeleton-wrapper ${className}`} style={{width: skeletonWidth, height: skeletonHeight}} />;
  }

  return <Tag className={className}>{children}</Tag>;
};

DesiCartCustomTags.propTypes = {
  tagName: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  className: PropTypes.string,
  children: PropTypes.node,
};

export default DesiCartCustomTags;
