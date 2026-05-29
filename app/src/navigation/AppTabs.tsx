import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { HelpModal } from '../components/HelpModal';
import { colors } from '../theme';
import { HomeScreen } from '../screens/HomeScreen';
import { MockExamScreen } from '../screens/MockExamScreen';
import { PracticeScreen } from '../screens/PracticeScreen';
import { StatsScreen } from '../screens/StatsScreen';

type TabKey = 'home' | 'practice' | 'mockExam' | 'stats';
type HelpLanguage = 'en' | 'ro' | 'ru';

const tabs: Array<{ key: TabKey; label: string }> = [
  { key: 'home', label: 'Home' },
  { key: 'practice', label: 'Practice' },
  { key: 'mockExam', label: 'Mock Exam' },
  { key: 'stats', label: 'Stats' },
];

export function AppTabs() {
  const [activeTab, setActiveTab] = useState<TabKey>('home');
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [helpLanguage, setHelpLanguage] = useState<HelpLanguage>('en');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Pressable accessibilityLabel="Open help" onPress={() => setIsHelpOpen(true)} style={styles.helpButton}>
          <Text style={styles.helpLabel}>?</Text>
        </Pressable>
        {renderScreen(activeTab, setActiveTab)}
      </View>
      <View style={styles.tabBar}>
        {tabs.map((tab) => {
          const isActive = tab.key === activeTab;

          return (
            <Pressable
              key={tab.key}
              accessibilityRole="button"
              accessibilityState={{ selected: isActive }}
              onPress={() => setActiveTab(tab.key)}
              style={[styles.tabButton, isActive && styles.activeTabButton]}
            >
              <Text style={[styles.tabLabel, isActive && styles.activeTabLabel]}>{tab.label}</Text>
            </Pressable>
          );
        })}
      </View>
      <HelpModal
        isVisible={isHelpOpen}
        language={helpLanguage}
        onChangeLanguage={setHelpLanguage}
        onClose={() => setIsHelpOpen(false)}
      />
    </SafeAreaView>
  );
}

function renderScreen(tab: TabKey, navigate: (tab: TabKey) => void) {
  switch (tab) {
    case 'practice':
      return <PracticeScreen />;
    case 'mockExam':
      return <MockExamScreen />;
    case 'stats':
      return <StatsScreen />;
    case 'home':
    default:
      return <HomeScreen navigate={navigate} />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  content: {
    flex: 1,
  },
  helpButton: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 8,
    height: 38,
    justifyContent: 'center',
    position: 'absolute',
    right: 16,
    top: 18,
    width: 38,
    zIndex: 10,
  },
  helpLabel: {
    color: colors.surface,
    fontSize: 20,
    fontWeight: '900',
  },
  tabBar: {
    flexDirection: 'row',
    borderTopColor: colors.border,
    borderTopWidth: StyleSheet.hairlineWidth,
    backgroundColor: colors.surface,
    paddingHorizontal: 8,
    paddingTop: 8,
    paddingBottom: 12,
  },
  tabButton: {
    alignItems: 'center',
    borderRadius: 8,
    flex: 1,
    justifyContent: 'center',
    minHeight: 44,
    paddingHorizontal: 6,
  },
  activeTabButton: {
    backgroundColor: colors.primarySoft,
  },
  tabLabel: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'center',
  },
  activeTabLabel: {
    color: colors.primary,
  },
});
