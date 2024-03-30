import React from 'react';
import  UnauthorizedComponent  from './UnauthorizedError'; // Import the unauthorized component

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorType: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, errorType: error.message };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.state.errorType === 'Unauthorized') {
        // Render the unauthorized component
        return <UnauthorizedComponent />;
      } else {
        // Render the generic error message
        return <div>Something went wrong.</div>;
      }
    }

    // If there's no error, render the children
    return this.props.children;
  }
}

export default ErrorBoundary;
