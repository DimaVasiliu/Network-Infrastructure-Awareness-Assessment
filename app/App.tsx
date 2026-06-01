import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ErrorBoundary } from './src/components/ErrorBoundary';
import { useLanguageHydrated } from './src/i18n';
import { AppTabs } from './src/navigation/AppTabs';
import { applyCrashReportingPreference } from './src/lib/crashReporting';
import { useProgressStore } from './src/store/progressStore';

export default function App() {
  const crashReportingOptOut = useProgressStore((state) => state.crashReportingOptOut);
  const languageHydrated = useLanguageHydrated();

  useEffect(() => {
    applyCrashReportingPreference(crashReportingOptOut);
  }, [crashReportingOptOut]);

  return (
    <SafeAreaProvider>
      <ErrorBoundary>{languageHydrated ? <AppTabs /> : null}</ErrorBoundary>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}
