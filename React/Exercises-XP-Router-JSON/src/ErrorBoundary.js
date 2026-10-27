import { Component } from 'react';
export default class ErrorBoundary extends Component {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(error, info) {
    this.setState({ hasError: true });
    console.error(error, info.componentStack);
  }
  render() {
    return this.state.hasError
      ? <h2 role="alert">Something went wrong.</h2>
      : this.props.children;
  }
}
