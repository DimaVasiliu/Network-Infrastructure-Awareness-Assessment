import { useState } from 'react';
import type { NavigatorScreenParams } from '@react-navigation/native';
import { DefaultTheme, getFocusedRouteNameFromRoute, NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, StyleSheet, View } from 'react-native';

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

const baseHeaderOptions = {
  headerShadowVisible: false,
  headerStyle: {
    backgroundColor: colors.background,
  },
  headerTitleStyle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '800' as const,
  },
  headerRightContainerStyle: {
    paddingRight: 0,
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
            ...baseHeaderOptions,
            headerRight: () => <HeaderHelpButton onPress={() => setIsHelpOpen(true)} />,
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
            options={({ route }) => {
              const routeName = getFocusedRouteNameFromRoute(route) ?? 'PracticeHome';
              return {
                headerShown: routeName === 'PracticeHome',
                title: 'Practice',
                tabBarLabel: 'Practice',
              };
            }}
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
            options={({ route }) => {
              const routeName = getFocusedRouteNameFromRoute(route) ?? 'MockExamHome';
              return {
                headerShown: routeName === 'MockExamHome',
                title: 'Mock Exam',
                tabBarLabel: 'Mock',
              };
            }}
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
    <PracticeStack.Navigator
      screenOptions={{
        ...baseHeaderOptions,
        headerRight: () => <HeaderHelpButton onPress={openHelp} />,
      }}
    >
      <PracticeStack.Screen
        name="PracticeHome"
        component={PracticeScreen}
        options={{ headerShown: false, title: 'Practice' }}
      />
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
    <MockExamStack.Navigator
      screenOptions={{
        ...baseHeaderOptions,
        headerRight: () => <HeaderHelpButton onPress={openHelp} />,
      }}
    >
      <MockExamStack.Screen
        name="MockExamHome"
        component={MockExamScreen}
        options={{ headerShown: false, title: 'Mock Exam' }}
      />
      <MockExamStack.Screen
        name="MockExamRun"
        component={MockExamRunScreen}
        options={{ title: 'Mock Exam' }}
      />
    </MockExamStack.Navigator>
  );
}

function HeaderHelpButton({ onPress }: { onPress: () => void }) {
  return (
    <View pointerEvents="box-none" style={styles.helpSlot}>
      <HelpButton onPress={onPress} />
    </View>
  );
}

function HelpButton({ onPress }: { onPress: () => void }) {
  return (
    <Pressable
      accessibilityLabel="Open help"
      accessibilityRole="button"
      hitSlop={8}
      onPress={onPress}
      style={({ pressed }) => [styles.helpButton, pressed && styles.helpButtonPressed]}
    >
      <Ionicons color={colors.surface} name="help-circle" size={22} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  helpSlot: {
    alignItems: 'center',
    height: 48,
    justifyContent: 'center',
    paddingRight: 16,
    width: 64,
  },
  helpButton: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 20,
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
  helpButtonPressed: {
    opacity: 0.78,
  },
  tabBar: {
    backgroundColor: colors.surface,
    borderTopColor: colors.border,
    height: 64,
    paddingBottom: 8,
    paddingTop: 6,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '700',
  },
});
