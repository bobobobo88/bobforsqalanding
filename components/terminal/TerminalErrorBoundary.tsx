import React from 'react';

interface TerminalErrorBoundaryProps {
  children: React.ReactNode;
}

interface TerminalErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class TerminalErrorBoundary extends React.Component<
  TerminalErrorBoundaryProps,
  TerminalErrorBoundaryState
> {
  constructor(props: TerminalErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // You could log error info here
    // console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-red-500 bg-black p-4 rounded font-mono">
          <strong>Terminal Error:</strong> {this.state.error?.message}
        </div>
      );
    }
    return this.props.children;
  }
} 