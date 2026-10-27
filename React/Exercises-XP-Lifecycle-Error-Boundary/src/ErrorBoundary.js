import { Component } from 'react';

export default class ErrorBoundary extends Component {
  state = { error: null, errorInfo: { componentStack: '' } };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
    console.error(error, errorInfo.componentStack);
  }

  render() {
    if (this.state.error) {
      return (
        <div className="error" role="alert">
          <h3>Something went wrong.</h3>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            <summary>Error details</summary>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }
    return this.props.children;
  }
}
