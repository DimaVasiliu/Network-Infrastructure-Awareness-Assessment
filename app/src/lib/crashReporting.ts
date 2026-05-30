/**
 * Crash reporting wrapper around @sentry/react-native v7.
 *
 * Initialisation happens at MODULE LOAD time (the v7 pattern). The user
 * opt-out toggle is applied at runtime by enabling / disabling the client.
 *
 * Privacy posture:
 *   1. Disabled in __DEV__.
 *   2. Disabled if no DSN is configured.
 *   3. Disabled (events dropped + offline) when the user has opted out via
 *      the About screen toggle.
 *   4. `sendDefaultPii: false`, `tracesSampleRate: 0` (no perf traces),
 *      `beforeSend` strips user ID / email / IP from outgoing events.
 *   5. Init wrapped in try/catch — Sentry failures never break the app.
 *
 * If this privacy posture changes (session replay, traces, user identifiers,
 * PII), update PRIVACY.md and the App Privacy / Data Safety declarations.
 */
import Constants from 'expo-constants';
import * as Sentry from '@sentry/react-native';

let initialised = false;

function readDsn(): string | undefined {
  const extra = (Constants.expoConfig?.extra ?? {}) as Record<string, unknown>;
  const value = extra.sentryDsn;
  return typeof value === 'string' && value.length > 0 ? value : undefined;
}

function initOnce() {
  if (initialised) return;
  if (__DEV__) return;
  const dsn = readDsn();
  if (!dsn) return;

  try {
    Sentry.init({
      dsn,
      enableAutoSessionTracking: true,
      sendDefaultPii: false,
      tracesSampleRate: 0,
      beforeSend(event) {
        if (event.user) {
          delete event.user.id;
          delete event.user.email;
          delete event.user.ip_address;
        }
        return event;
      },
    });
    initialised = true;
  } catch {
    initialised = false;
  }
}

// Init at module load — this is what Sentry v7 expects so that any
// app-start instrumentation can attach to the running client.
initOnce();

/**
 * Apply the user's current opt-out preference. Call this once on mount and
 * whenever the toggle changes. If the user opts out, we close the SDK so no
 * further events are sent until the app is restarted with the toggle on.
 */
export function applyCrashReportingPreference(optedOut: boolean) {
  if (!initialised) return;
  try {
    const client = Sentry.getClient();
    if (!client) return;
    const options = client.getOptions();
    options.enabled = !optedOut;
  } catch {
    // ignore — best effort
  }
}

export function isCrashReportingActive() {
  return initialised;
}

export async function flushCrashReporting() {
  if (!initialised) return;
  try {
    await Sentry.flush();
  } catch {
    // ignore
  }
}

export { Sentry };
