import { useState } from 'react';
import type { NavigatorScreenParams } from '@react-navigation/native';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, StyleSheet, Text } from 'react-native';

import { HelpModal } from '../components/HelpModal';
import { DecoderScreen } from '../screens/DecoderScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { MockExamRunScreen, MockExamScreen } from '../screens/MockExamScreen';
import {
  PracticeAnswerStudyScreen,
  PracticeFocusScreen,
  PracticeQuizScreen,
  PracticeScreen,
  PracticeSectionScreen,
} from '../screens/PracticeScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { StatsScreen } from '../screens/StatsScreen';
import { colors } from '../theme';
import type { QuestionSection } from '../types/question';

type HelpLanguage = 'en' | 'ro' | 'ru';

export type PracticeStackParamList = {
  PracticeHome: undefined;
  PracticeSection: { section: QuestionSection };
  PracticeQuiz: { section: QuestionSection };
  PracticeAnswers: { section: QuestionSection };
  PracticeFocus: { focus: 'wrong' | 'bookmarks' | 'weakest' };
};

export type MockExamStackParamList = {
  MockExamHome: undefined;
  MockExamRun: undefined;
};

export type RootTabParamList = {
  HomeTab: undefined;
  PracticeTab: NavigatorScreenParams<PracticeStackParamList> | undefined;
  DecoderTab: undefined;
  MockExamTab: NavigatorScreenParams<MockExamStackParamList> | undefined;
  StatsTab: undefined;
  SettingsTab: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();
const PracticeStack = createNativeStackNavigator<PracticeStackParamList>();
const MockExamStack = createNativeStackNavigator<MockExamStackParamList>();

type TabIconName = React.ComponentProps<typeof Ionicons>['name'];

const tabIcons: Record<keyof RootTabParamList, { active: TabIconName; inactive: TabIconName }> = {
  HomeTab: { active: 'home', inactive: 'home-outline' },
  PracticeTab: { active: 'school', inactive: 'school-outline' },
  DecoderTab: { active: 'reader', inactive: 'reader-outline' },
  MockExamTab: { active: 'timer', inactive: 'timer-outline' },
  StatsTab: { active: 'bar-chart', inactive: 'bar-chart-outline' },
  SettingsTab: { active: 'information-circle', inactive: 'information-circle-outline' },
};

const sectionSlugByName: Record<QuestionSection, string> = {
  'Product Selection': 'product-selection',
  'Containment Systems': 'containment-systems',
  'Cable Laying': 'cable-laying',
  'Cable Dressing': 'cable-dressing',
  'Fire Regulations': 'fire-regulations',
  'Safe Cable Installation': 'safe-cable-installation',
  'Personal Safety': 'personal-safety',
  'Other Services': 'other-services',
  'Waste Management': 'waste-management',
};

const sectionBySlug = Object.fromEntries(
  Object.entries(sectionSlugByName).map(([section, slug]) => [slug, section]),
) as Record<string, QuestionSection>;

const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.background,
    border: colors.border,
    card: colors.surface,
    primary: colors.primary,
    text: colors.text,
  },
};

const linking = {
  prefixes: ['networktrainer://'],
  config: {
    screens: {
      HomeTab: '',
      PracticeTab: {
        path: 'practice',
        screens: {
          PracticeHome: '',
          PracticeSection: {
            path: ':section',
            parse: {
              section: (slug: string) => sectionBySlug[slug] ?? 'Fire Regulations',
            },
            stringify: {
              section: (section: QuestionSection) => sectionSlugByName[section],
            },
          },
          PracticeQuiz: {
            path: ':section/quiz',
            parse: {
              section: (slug: string) => sectionBySlug[slug] ?? 'Fire Regulations',
            },
            stringify: {
              section: (section: QuestionSection) => sectionSlugByName[section],
            },
          },
          PracticeAnswers: {
            path: ':section/answers',
            parse: {
              section: (slug: string) => sectionBySlug[slug] ?? 'Fire Regulations',
            },
            stringify: {
              section: (section: QuestionSection) => sectionSlugByName[section],
            },
          },
          PracticeFocus: {
            path: 'focus/:focus',
          },
        },
      },
      MockExamTab: {
        path: 'mock-exam',
        screens: {
          MockExamHome: '',
          MockExamRun: 'run',
        },
      },
      DecoderTab: 'decoder',
      StatsTab: 'stats',
      SettingsTab: 'settings',
    },
  },
};

export function AppTabs() {
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [helpLanguage, setHelpLanguage] = useState<HelpLanguage>('en');

  return (
    <>
      <NavigationContainer linking={linking} theme={navigationTheme}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerRight: () => <HelpButton onPress={() => setIsHelpOpen(true)} />,
            tabBarIcon: ({ color, focused, size }) => (
              <Ionicons
                color={color}
                name={focused ? tabIcons[route.name].active : tabIcons[route.name].inactive}
                size={size}
              />
            ),
            tabBarActiveTintColor: colors.primary,
            tabBarInactiveTintColor: colors.muted,
            tabBarLabelStyle: styles.tabLabel,
            tabBarStyle: styles.tabBar,
          })}
        >
          <Tab.Screen
            name="HomeTab"
            component={HomeScreen}
            options={{ title: 'Home', tabBarLabel: 'Home' }}
          />
          <Tab.Screen
            name="PracticeTab"
            options={{ headerShown: false, title: 'Practice', tabBarLabel: 'Practice' }}
          >
            {() => <PracticeNavigator openHelp={() => setIsHelpOpen(true)} />}
          </Tab.Screen>
          <Tab.Screen
            name="DecoderTab"
            component={DecoderScreen}
            options={{ title: 'Decoder', tabBarLabel: 'Decoder' }}
          />
          <Tab.Screen
            name="MockExamTab"
            options={{ headerShown: false, title: 'Mock Exam', tabBarLabel: 'Mock Exam' }}
          >
            {() => <MockExamNavigator openHelp={() => setIsHelpOpen(true)} />}
          </Tab.Screen>
          <Tab.Screen
            name="StatsTab"
            component={StatsScreen}
            options={{ title: 'Stats', tabBarLabel: 'Stats' }}
          />
          <Tab.Screen
            name="SettingsTab"
            component={SettingsScreen}
            options={{ title: 'About', tabBarLabel: 'About' }}
          />
        </Tab.Navigator>
      </NavigationContainer>
      <HelpModal
        isVisible={isHelpOpen}
        language={helpLanguage}
        onChangeLanguage={setHelpLanguage}
        onClose={() => setIsHelpOpen(false)}
      />
    </>
  );
}

function PracticeNavigator({ openHelp }: { openHelp: () => void }) {
  return (
    <PracticeStack.Navigator screenOptions={{ headerRight: () => <HelpButton onPress={openHelp} /> }}>
      <PracticeStack.Screen name="PracticeHome" component={PracticeScreen} options={{ title: 'Practice' }} />
      <PracticeStack.Screen
        name="PracticeSection"
        component={PracticeSectionScreen}
        options={({ route }) => ({ title: route.params.section })}
      />
      <PracticeStack.Screen
        name="PracticeQuiz"
        component={PracticeQuizScreen}
        options={({ route }) => ({ title: route.params.section })}
      />
      <PracticeStack.Screen
        name="PracticeAnswers"
        component={PracticeAnswerStudyScreen}
        options={({ route }) => ({ title: route.params.section })}
      />
      <PracticeStack.Screen
        name="PracticeFocus"
        component={PracticeFocusScreen}
        options={({ route }) => ({
          title:
            route.params.focus === 'wrong'
              ? 'Review wrong'
              : route.params.focus === 'bookmarks'
                ? 'Bookmarks'
                : 'Weakest 10',
        })}
      />
    </PracticeStack.Navigator>
  );
}

function MockExamNavigator({ openHelp }: { openHelp: () => void }) {
  return (
    <MockExamStack.Navigator screenOptions={{ headerRight: () => <HelpButton onPress={openHelp} /> }}>
      <MockExamStack.Screen name="MockExamHome" component={MockExamScreen} options={{ title: 'Mock Exam' }} />
      <MockExamStack.Screen
        name="MockExamRun"
        component={MockExamRunScreen}
        options={{ title: 'Mock Exam' }}
      />
    </MockExamStack.Navigator>
  );
}

function HelpButton({ onPress }: { onPress: () => void }) {
  return (
    <Pressable accessibilityLabel="Open help" onPress={onPress} style={styles.helpButton}>
      <Text style={styles.helpLabel}>?</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  helpButton: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 18,
    height: 36,
    justifyContent: 'center',
    marginRight: 12,
    width: 36,
  },
  helpLabel: {
    color: colors.surface,
    fontSize: 18,
    fontWeight: '900',
  },
  tabBar: {
    backgroundColor: colors.surface,
    borderTopColor: colors.border,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '700',
  },
});
