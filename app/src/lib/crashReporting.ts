/**
 * Crash reporting wrapper around @sentry/react-native.
 *
 * Design rules:
 *   1. Disabled in development / Expo Go (DSN may be missing; we don't want
 *      every dev refresh to count as a session).
 *   2. Disabled when the user has opted out via the About screen toggle.
 *   3. No PII attached. We do not set user IDs, IP addresses, or session
 *      replays. Breadcrumbs only contain navigation events.
 *   4. Failures to initialise are swallowed — the app must never crash because
 *      crash reporting failed.
 *
 * If the privacy posture changes in future (e.g. session replay added, PII
 * captured, opt-in instead of opt-out), update PRIVACY.md and the App Privacy
 * + Data Safety declarations in LAUNCH_COMPLIANCE.md to match.
 */
import Constants from 'expo-constants';
import * as Sentry from '@sentry/react-native';

let initialised = false;

function dsn(): string | undefined {
  const extra = (Constants.expoConfig?.extra ?? {}) as Record<string, unknown>;
  const value = extra.sentryDsn;
  return typeof value === 'string' && value.length > 0 ? value : undefined;
}

export function initCrashReporting(optedOut: boolean) {
  if (initialised) return;
  if (optedOut) return;
  if (__DEV__) return;
  const sentryDsn = dsn();
  if (!sentryDsn) return;

  try {
    Sentry.init({
      dsn: sentryDsn,
      enableAutoSessionTracking: true,
      sendDefaultPii: false,
      tracesSampleRate: 0.0,
      // Strip user data and IP from outgoing events.
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
    // Never fail the app because crash reporting could not start.
    initialised = false;
  }
}

/**
 * Best-effort flag for whether reporting is currently active. Useful for
 * surfacing status to the user without leaking SDK internals.
 */
export function isCrashReportingActive() {
  return initialised;
}

/**
 * Manually flush any pending events. Call before the user clears local data
 * or revokes consent to make sure nothing is queued up against the old state.
 */
export async function flushCrashReporting() {
  if (!initialised) return;
  try {
    await Sentry.flush();
  } catch {
    // Ignore — flushing is best-effort.
  }
}

/**
 * Re-export the Sentry namespace for callers that want to add custom
 * breadcrumbs or error reports. Most code should not need this directly.
 */
export { Sentry };
