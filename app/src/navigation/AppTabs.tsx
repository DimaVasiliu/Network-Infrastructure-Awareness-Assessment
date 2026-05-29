import { useState } from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { colors } from '../theme';
import { HomeScreen } from '../screens/HomeScreen';
import { MockExamScreen } from '../screens/MockExamScreen';
import { PracticeScreen } from '../screens/PracticeScreen';
import { StatsScreen } from '../screens/StatsScreen';

type TabKey = 'home' | 'practice' | 'mockExam' | 'stats';

const tabs: Array<{ key: TabKey; label: string }> = [
  { key: 'home', label: 'Home' },
  { key: 'practice', label: 'Practice' },
  { key: 'mockExam', label: 'Mock Exam' },
  { key: 'stats', label: 'Stats' },
];

export function AppTabs() {
  const [activeTab, setActiveTab] = useState<TabKey>('home');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>{renderScreen(activeTab, setActiveTab)}</View>
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
  tabBar: {
    flexDirection: 'row',
    borderTopColor: colors.border,
    borderTopWidth: StyleSheet.hairlineWidth,
    backgroundColor: colors.surface,
    paddingHorizontal: 8,
    paddingVertical: 8,
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
