# Project Structure

```text
Network-Infrastructure-Awareness-Assessment/
  app/          Expo React Native app
  docs/         Planning, compliance and operational documentation
  reference/    Local-only reference material (gitignored)
```

## App structure

```text
app/
  assets/         Expo image assets
  src/
    components/   Reusable UI (QuizRunner, PrimaryButton, ErrorBoundary, HelpModal)
    data/         questionBank.ts (155 Qs) and cableCodes.ts (decoder reference)
    lib/          crashReporting.ts (Sentry wrapper)
    navigation/   AppTabs.tsx (bottom tabs + per-tab stacks, deep links)
    screens/      HomeScreen, PracticeScreen, DecoderScreen, MockExamScreen,
                  StatsScreen, SettingsScreen
    store/        Zustand persisted store (attempts, bookmarks, stats, opt-out)
    types/        Shared TypeScript types
    utils/        questions.ts (selectors), questions.test.ts
```

## Tabs

`Home` · `Practice` · `Decoder` · `Mock Exam` · `Stats` · `About`

## Content rule

The official assessment guide PDF must not be copied into the app's question
bank. It is used only to identify topics. Questions, explanations and decoder
entries are all original.

## Mock exam blueprint

The mock exam follows the published Network Infrastructure Awareness assessment
format:

- 30 multiple-choice questions.
- 45-minute timer.
- Pass mark: 24 correct answers (80%).
- Topic weighting: Product Selection 3, Containment Systems 4, Cable Laying 4,
  Cable Dressing 4, Fire Regulations 3, Safe Cable Installation 4,
  Personal Safety 4, Other Services 3, Waste Management 1.

## Build

EAS Build for iOS and Android. Source maps uploaded to Sentry (EU region)
during production builds via the `SENTRY_AUTH_TOKEN` EAS environment variable.
No web build.
