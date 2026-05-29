import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ErrorBoundary } from './src/components/ErrorBoundary';
import { AppTabs } from './src/navigation/AppTabs';

export default function App() {
  return (
    <SafeAreaProvider>
      <ErrorBoundary>
        <AppTabs />
      </ErrorBoundary>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}
