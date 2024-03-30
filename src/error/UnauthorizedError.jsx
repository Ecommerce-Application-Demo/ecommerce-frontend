import React from 'react';

const UnauthorizedComponent = () => {
  return (
    <div className="unauthorized">
      <div className="unauthorized-content">
        <h1>Unauthorized Access</h1>
        <p>You don't have permission to access this page.</p>
        {/* You can add additional content or styling as needed */}
      </div>
    </div>
  );
}

export default UnauthorizedComponent;
