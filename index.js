import { registerRootComponent } from 'expo';
import App from './App';

// Wrap App in error boundary
import React from 'react';
import { View, Text } from 'react-native';

class RootErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Root Error Boundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#1A0033' }}>
          <Text style={{ color: 'white', fontSize: 18, marginBottom: 10 }}>App Crashed</Text>
          <Text style={{ color: 'white', fontSize: 14 }}>{String(this.state.error)}</Text>
        </View>
      );
    }

    return this.props.children;
  }
}

const WrappedApp = () => (
  <RootErrorBoundary>
    <App />
  </RootErrorBoundary>
);

registerRootComponent(WrappedApp);
