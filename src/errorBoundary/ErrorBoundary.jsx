import React from 'react';

// ...

export class ErrorBoundary extends React.Component {
  state = {
    error: null
  };

  trace = (error, errorInfo) => {
    console.log(error, errorInfo);
  }

  // ...

  static getDerivedStateFromError(error) {
    return {
      error
    };
  }

  componentDidCatch(error, errorInfo) {
    this.trace(error, errorInfo);
  }

  render() {
    const {
      error
    } = this.state;

    if (error) {
      const {
        Fallback
      } = this.props;
      
      return <Fallback error={error} />
    }

    return this.props.children;
  }
}