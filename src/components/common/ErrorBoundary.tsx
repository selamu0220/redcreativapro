import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
    console.log('ErrorBoundary: Constructor called');
  }

  static getDerivedStateFromError(error: Error): State {
    console.log('ErrorBoundary: getDerivedStateFromError called', error);
    return { hasError: true, error, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary: Uncaught error:', error, errorInfo);
    this.setState({ error, errorInfo });
  }

  render() {
    console.log('ErrorBoundary: Render called. Has error:', this.state.hasError);
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', border: '1px solid red', margin: '20px' }}>
          <h1>Algo salió mal.</h1>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo && this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;