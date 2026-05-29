import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ErrorBoundary } from './src/components/ErrorBoundary';
import { AppTabs } from './src/navigation/AppTabs';
import { Sentry, initCrashReporting } from './src/lib/crashReporting';
import { useProgressStore } from './src/store/progressStore';

function App() {
  const crashReportingOptOut = useProgressStore((state) => state.crashReportingOptOut);

  useEffect(() => {
    initCrashReporting(crashReportingOptOut);
  }, [crashReportingOptOut]);

  return (
    <SafeAreaProvider>
      <ErrorBoundary>
        <AppTabs />
      </ErrorBoundary>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}

export default Sentry.wrap(App);
