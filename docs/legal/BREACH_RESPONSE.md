# Personal Data Breach Response Plan

Internal procedure for handling a personal data breach under **UK GDPR Articles
33–34**. Owner: Dumitru Vasiliu (controller). Review annually.

A **personal data breach** is any breach of security leading to accidental or
unlawful destruction, loss, alteration, unauthorised disclosure of, or access
to, personal data.

## What we actually hold (scope)

Most app data lives only on the user's device. The controller holds two limited
data sets, so realistic breach scenarios are narrow:

1. **Support inbox** (`support@timrx.live`) — email addresses + message text. Risk: email-account compromise, misdirected reply.
2. **Crash diagnostics** (Sentry) — crash logs with no user identifiers. Risk: Sentry account compromise.

## Detection & reporting in

- The `support@timrx.live` inbox is monitored; it also receives security reports.
- Sentry sends alerts to the controller's email.
- Anyone may report a suspected issue to `support@timrx.live`.

## Response steps

1. **Contain** — within hours of becoming aware: change the affected password, revoke sessions/tokens, enable/verify 2FA, and stop any ongoing exposure.
2. **Assess** — what data, how many people, what harm could result (identity theft, distress, spam)? Record the facts in the breach log below.
3. **Decide on ICO notification** — if the breach is **likely to result in a risk** to people's rights and freedoms, notify the ICO **within 72 hours** of becoming aware. If unsure, lean towards reporting.
4. **Decide on individual notification** — if the breach is likely to result in a **high risk** to individuals, tell the affected people **without undue delay** (template below).
5. **Record** — log every breach in the breach log, **even if not reported** (Article 33(5) requires this).
6. **Review** — after resolution, note the root cause and any change made to prevent recurrence.

## ICO notification

- Online: https://ico.org.uk/for-organisations/report-a-breach/ — or phone 0303 123 1113.
- Include: what happened; categories and approximate number of individuals and records; likely consequences; measures taken or proposed; controller contact details.
- If full details aren't ready within 72 hours, report what is known and follow up in phases.

## Breach log (append entries)

| Date discovered | What happened | Data & people affected | Risk assessment | ICO notified? (date) | Individuals notified? (date) | Root cause / fix |
|---|---|---|---|---|---|---|
| | | | | | | |

---

## Individual notification — email template

> **Subject:** Important security notice about your data
>
> Hello,
>
> We're contacting you because of a security incident that may have affected
> personal data you shared with the Network Infrastructure Trainer app.
>
> **What happened:** [brief, plain-English description and date].
>
> **What information was involved:** [e.g. your email address and the content of
> a support message].
>
> **What we've done:** [containment steps taken].
>
> **What you can do:** [e.g. be alert to suspicious emails; we will never ask for
> your password]. 
>
> We take this seriously and are sorry for any concern. If you have questions,
> reply to this email or contact support@timrx.live.
>
> You also have the right to complain to the Information Commissioner's Office
> (ico.org.uk).
>
> — Dumitru Vasiliu, Network Infrastructure Trainer
