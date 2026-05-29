import { StatusBar } from 'expo-status-bar';

import { AppTabs } from './src/navigation/AppTabs';

export default function App() {
  return (
    <>
      <AppTabs />
      <StatusBar style="auto" />
    </>
  );
}
