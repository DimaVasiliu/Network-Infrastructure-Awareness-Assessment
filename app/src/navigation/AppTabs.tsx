import { useState } from 'react';
import type { NavigatorScreenParams } from '@react-navigation/native';
import { DefaultTheme, getFocusedRouteNameFromRoute, NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { HelpModal } from '../components/HelpModal';
import { useLanguage, useSetLanguage, useT } from '../i18n';
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
  const t = useT();
  const language = useLanguage();
  const setLanguage = useSetLanguage();
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  return (
    <>
      <NavigationContainer linking={linking} theme={navigationTheme}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            header: ({ navigation, options }) => (
              <AppHeader
                canGoBack={false}
                onBack={navigation.goBack}
                title={getHeaderTitle(options, route.name)}
              />
            ),
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
            options={{ title: t.tabs.home, tabBarLabel: t.tabs.home }}
          />
          <Tab.Screen
            name="PracticeTab"
            options={({ route }) => {
              const focused = getFocusedRouteNameFromRoute(route);
              const immersive = focused === 'PracticeQuiz' || focused === 'PracticeFocus';
              return {
                headerShown: false,
                tabBarLabel: t.tabs.practice,
                tabBarStyle: immersive ? { display: 'none' } : styles.tabBar,
              };
            }}
          >
            {() => <PracticeNavigator />}
          </Tab.Screen>
          <Tab.Screen
            name="DecoderTab"
            component={DecoderScreen}
            options={{ title: t.tabs.decoder, tabBarLabel: t.tabs.decoder }}
          />
          <Tab.Screen
            name="MockExamTab"
            options={({ route }) => {
              const focused = getFocusedRouteNameFromRoute(route);
              const immersive = focused === 'MockExamRun';
              return {
                headerShown: false,
                tabBarLabel: t.tabs.mock,
                tabBarStyle: immersive ? { display: 'none' } : styles.tabBar,
              };
            }}
          >
            {() => <MockExamNavigator />}
          </Tab.Screen>
          <Tab.Screen
            name="StatsTab"
            component={StatsScreen}
            options={{ title: t.tabs.stats, tabBarLabel: t.tabs.stats }}
          />
          <Tab.Screen
            name="SettingsTab"
            component={SettingsScreen}
            options={{ title: t.tabs.about, tabBarLabel: t.tabs.about }}
          />
        </Tab.Navigator>
      </NavigationContainer>
      <FloatingHelpButton onPress={() => setIsHelpOpen(true)} />
      <HelpModal
        isVisible={isHelpOpen}
        language={language}
        onChangeLanguage={setLanguage}
        onClose={() => setIsHelpOpen(false)}
      />
    </>
  );
}

function PracticeNavigator() {
  const t = useT();
  return (
    <PracticeStack.Navigator
      screenOptions={{
        header: ({ navigation, options, route, back }) => (
          <AppHeader
            canGoBack={Boolean(back)}
            onBack={navigation.goBack}
            title={getHeaderTitle(options, route.name)}
          />
        ),
      }}
    >
      <PracticeStack.Screen
        name="PracticeHome"
        component={PracticeScreen}
        options={{ title: t.tabs.practice }}
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
              ? t.nav.reviewWrong
              : route.params.focus === 'bookmarks'
                ? t.nav.bookmarks
                : t.nav.weakest10,
        })}
      />
    </PracticeStack.Navigator>
  );
}

function MockExamNavigator() {
  const t = useT();
  return (
    <MockExamStack.Navigator
      screenOptions={{
        header: ({ navigation, options, route, back }) => (
          <AppHeader
            canGoBack={Boolean(back)}
            onBack={navigation.goBack}
            title={getHeaderTitle(options, route.name)}
          />
        ),
      }}
    >
      <MockExamStack.Screen
        name="MockExamHome"
        component={MockExamScreen}
        options={{ title: t.nav.mockTitle }}
      />
      <MockExamStack.Screen
        name="MockExamRun"
        component={MockExamRunScreen}
        options={{ title: t.nav.mockTitle }}
      />
    </MockExamStack.Navigator>
  );
}

function getHeaderTitle(options: { headerTitle?: unknown; title?: string }, fallback: string) {
  return typeof options.headerTitle === 'string' ? options.headerTitle : (options.title ?? fallback);
}

function AppHeader({ canGoBack, onBack, title }: { canGoBack: boolean; onBack: () => void; title: string }) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.header, { paddingTop: insets.top }]}>
      <View style={styles.headerRow}>
        <View style={styles.headerSide}>
          {canGoBack ? (
            <Pressable
              accessibilityLabel="Go back"
              accessibilityRole="button"
              hitSlop={8}
              onPress={onBack}
              style={({ pressed }) => [styles.backButton, pressed && styles.headerButtonPressed]}
            >
              <Ionicons color={colors.muted} name="chevron-back" size={28} />
            </Pressable>
          ) : null}
        </View>
        <Text numberOfLines={1} style={styles.headerTitle}>
          {title}
        </Text>
        <View style={styles.headerSide} />
      </View>
    </View>
  );
}

function FloatingHelpButton({ onPress }: { onPress: () => void }) {
  const insets = useSafeAreaInsets();

  return (
    <View pointerEvents="box-none" style={StyleSheet.absoluteFill}>
      <View pointerEvents="box-none" style={[styles.floatingHelpSlot, { top: insets.top + 12 }]}>
        <HelpButton onPress={onPress} />
      </View>
    </View>
  );
}

function HelpButton({ onPress }: { onPress: () => void }) {
  const t = useT();
  return (
    <Pressable
      accessibilityLabel={t.nav.openHelp}
      accessibilityRole="button"
      hitSlop={8}
      onPress={onPress}
      style={({ pressed }) => [styles.helpButton, pressed && styles.headerButtonPressed]}
    >
      <Ionicons color={colors.surface} name="help-circle" size={22} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.background,
  },
  headerRow: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 64,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  headerSide: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: 48,
  },
  headerTitle: {
    color: colors.text,
    flex: 1,
    fontSize: 18,
    fontWeight: '800',
    paddingHorizontal: 12,
    textAlign: 'center',
  },
  backButton: {
    alignItems: 'center',
    height: 40,
    justifyContent: 'center',
    marginLeft: -8,
    width: 40,
  },
  helpButton: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 20,
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
  floatingHelpSlot: {
    alignItems: 'center',
    height: 40,
    justifyContent: 'center',
    position: 'absolute',
    right: 24,
    width: 40,
  },
  headerButtonPressed: {
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
