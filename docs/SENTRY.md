# Sentry setup

How crash reporting is wired into the app, and what you need to do once
before the first production build.

## What is already in the repo

- `@sentry/react-native@8.x` is installed (`app/package.json`).
- `app/src/lib/crashReporting.ts` initialises Sentry with a privacy-safe
  configuration:
  - disabled in `__DEV__`
  - disabled when the user has opted out (via the **About** screen toggle)
  - `sendDefaultPii: false`
  - `tracesSampleRate: 0.0` (no performance traces)
  - `beforeSend` strips user ID, email and IP from every outgoing event
  - never throws — initialisation failures are swallowed
- `app/App.tsx` calls `initCrashReporting(optOut)` on mount and wraps the
  root component with `Sentry.wrap(App)`.
- `app/app.json` references the Sentry Expo plugin and reads the DSN from
  `expo.extra.sentryDsn`.
- `progressStore.crashReportingOptOut` persists the user toggle.
- Privacy policy (§3) and the App Privacy / Data Safety tables in
  `LAUNCH_COMPLIANCE.md` already declare the new data flow.

## What you do once, before the first production build

1. **Create the Sentry project.**
   - Go to https://sentry.io and create an organisation (pick the **EU**
     region to keep data inside the EEA; pick **US** only if you have a
     specific reason).
   - Inside that organisation, create a project named
     `network-infrastructure-trainer`. Platform: **React Native**.
   - Note the **organisation slug**, **project slug**, and the **client DSN**
     (looks like `https://abc123@o12345.ingest.sentry.io/67890`).

2. **Sign the Sentry DPA.**
   - sentry.io → **Settings → Legal & Compliance → Data Processing Addendum**.
   - Accept and download a copy. Record the date in
     `LAUNCH_COMPLIANCE.md` §10.

3. **Wire the credentials into `app.json`.**
   Open `app/app.json` and replace the three placeholders:
   ```json
   "plugins": [
     ...
     [
       "@sentry/react-native/expo",
       {
         "organization": "your-org-slug",
         "project": "network-infrastructure-trainer"
       }
     ]
   ],
   "extra": {
     ...
     "sentryDsn": "https://abc123@o12345.ingest.sentry.io/67890"
   }
   ```

   The DSN is a **public** key — it is safe in `app.json` and will be
   embedded in the binary. (Sentry's *auth token* used to upload source maps
   is a different thing and is private — see the next step.)

4. **Set up source-map uploads (EAS Secret).**
   The Sentry plugin uploads JS source maps during the production build so
   stack traces are readable. It needs an auth token.
   - sentry.io → **Settings → Account → API → Auth Tokens** → create a token
     with scope `project:releases` and `project:write` for the
     `network-infrastructure-trainer` project.
   - Add it as an EAS secret so the build can read it without exposing it in
     the repo:
     ```bash
     cd app
     eas secret:create --scope project --name SENTRY_AUTH_TOKEN --type string --value "sntrys_..."
     ```
   - EAS automatically exposes the secret to the Sentry plugin during the
     build. **Never** commit the token.

5. **Update the `{{SENTRY_REGION}}` placeholder** in
   `docs/legal/PRIVACY.md` (§3) to either `EU` or `US` to match the region
   you picked in step 1.

6. **Verify on a preview build.**
   ```bash
   cd app
   eas build --profile preview --platform ios       # or android
   ```
   Install the build, open the app once, then inside the Sentry dashboard
   confirm a session was reported. If you want to test a crash explicitly,
   add a temporary button somewhere that calls
   `Sentry.captureException(new Error('test'))`, build again, tap it,
   confirm the event appears in Sentry, then remove the button before the
   production build.

## What happens at runtime

- **Dev (`__DEV__ === true`):** Sentry is **off**. No events are sent.
- **Production, opt-in (default):** Sentry initialises on first render and
  reports unhandled JS errors and native crashes, with no PII attached.
- **Production, opt-out:** the user toggled the About → "Send anonymous
  crash reports" switch. `initCrashReporting(true)` returns early — Sentry
  is never started and no events are sent.

## Future changes that require updating the privacy declarations

If any of the following are enabled, update `docs/legal/PRIVACY.md` §3,
re-submit Apple's **App Privacy** form, re-submit Google's **Data Safety**
form, and bump the privacy policy "Last updated" date:

- Sentry **Session Replay** (`replaysSessionSampleRate > 0`).
- Sentry **Performance tracing** (`tracesSampleRate > 0`).
- Sentry **User context** (`Sentry.setUser({ id })`) — currently we never
  set user identifiers.
- Allowing PII to flow through (`sendDefaultPii: true`).

Any of those changes the answers in `LAUNCH_COMPLIANCE.md` §§4–5.
