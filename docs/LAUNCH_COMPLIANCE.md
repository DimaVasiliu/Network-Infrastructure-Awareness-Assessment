# Launch Compliance Tracker

Single source of truth for the legal / compliance items the App needs **before** the first paid release.
Owner: founder. Update statuses inline. Anything still red blocks launch.

> Status legend
> - [x] Done
> - [ ] Not started or in progress (add a date / owner / note in the row)
> - [~] Not applicable (with a one-line reason)

---

## 1. Legal documents (drafted in `docs/legal/`)

| Document | File | Public URL slot | Drafted | Hosted | Reviewed by solicitor |
|---|---|---|---|---|---|
| Privacy Policy | `docs/legal/PRIVACY.md` | https://timrx.live/legal/nia/privacy | [x] | [x] | [ ] |
| Terms of Use | `docs/legal/TERMS.md` | https://timrx.live/legal/nia/terms | [x] | [x] | [ ] |
| Refund Policy | `docs/legal/REFUND.md` | https://timrx.live/legal/nia/refunds | [x] | [x] | [ ] |
| EULA | `docs/legal/EULA.md` | https://timrx.live/legal/nia/eula | [x] | [x] | [ ] |

> **Solicitor review** (final table column) is optional best practice, **not** a store or UK legal
> requirement to launch. Deferred by the founder; revisit if scope expands (user accounts, direct
> web checkout, or processing data from under-16s).

**Placeholders status** (the live pages on `timrx.live/legal/nia/*` are already
populated; this list is the source of truth for the templates in `docs/legal/`):

- `{{LEGAL_NAME}}` — **Dumitru Vasiliu** (sole trader, operating the TimrX portfolio).
- `{{SUPPORT_EMAIL}}` — **support@timrx.live**. Matches `SettingsScreen.tsx`.
- `{{POSTAL_ADDRESS}}` — **39 Spearpoint Gardens, Aldborough Road North, Ilford, Essex, IG2 7SX, United Kingdom**.
- `{{EFFECTIVE_DATE}}` / `{{LAST_UPDATED}}` — set per page on hosting (currently 2026-05-30).
- `{{ICO_NUMBER}}` — _awaiting issuance from the ICO_ — registration in progress (see §3).
- `{{EMAIL_PROVIDER}}` / `{{EMAIL_PROVIDER_REGION}}` — **Neo.Space** (inbound `support@timrx.live`) and **AWS SES — eu-west-2 / London, UK** (outbound replies). See §10.
- `{{PRIVACY_URL}}` — **https://timrx.live/legal/nia/privacy**
- `{{TERMS_URL}}` — **https://timrx.live/legal/nia/terms**
- `{{REFUND_URL}}` — **https://timrx.live/legal/nia/refunds**
- `{{EULA_URL}}` — **https://timrx.live/legal/nia/eula**
- `{{ADDITIONAL_COUNTRIES}}` — leave blank for UK-only launch; or add e.g. "and the European Union".
- `{{SENTRY_REGION}}` — **`EU`** (Frankfurt). Confirmed by the DSN ingest host `ingest.de.sentry.io`.

Hosting: any static URL is fine. Cheapest path: a single static page per document, served from
S3 + CloudFront, Cloudflare Pages, or GitHub Pages. The URLs in `SettingsScreen.tsx` must point to
these pages before submitting to the app stores.

---

## 2. In-app surfacing

| Item | Where | Done |
|---|---|---|
| Disclaimer in About screen | `app/src/screens/SettingsScreen.tsx` | [x] |
| Disclaimer on Home screen | `app/src/screens/HomeScreen.tsx` | [x] |
| Support email link | About screen | [x] |
| Privacy Policy URL | About screen | [x] |
| Terms of Use URL | About screen | [x] |
| Refund Policy URL | About screen | [x] |
| EULA URL | About screen | [x] |
| App version visible | About screen (read from `app.json`) | [x] |

---

## 3. ICO registration (UK data protection fee)

Required because the App's support inbox processes personal data (email addresses + message content),
even though the App itself stores user data only on-device.

> **Status (2026-05-31): registration in progress — awaiting ICO number.**

| Step | Done | Notes |
|---|---|---|
| Confirm a UK legal entity / sole trader registration | [x] | Operating as sole trader: Dumitru Vasiliu |
| Self-assessment on `ico.org.uk` to confirm fee tier | [ ] | Tier 1 (micro org) is currently £40 — confirm at registration |
| Pay annual data protection fee | [ ] | Direct debit recommended so it auto-renews |
| Record ICO registration number | [ ] | **Awaiting number from ICO** — goes into `{{ICO_NUMBER}}` in `PRIVACY.md` |
| Add ICO number to the live privacy policy URL | [ ] | Re-publish after editing |
| Calendar reminder for annual renewal | [ ] | T-1 month before anniversary |

Reference: https://ico.org.uk/for-organisations/data-protection-fee/

---

## 4. Apple App Store privacy declaration ("App Privacy")

Done inside App Store Connect → your app → App Privacy.

| Data type | Collected? | Used to track? | Linked to user? |
|---|---|---|---|
| Contact Info → Email | Yes (when user emails support) | No | Yes (support thread) |
| Identifiers → User ID | **No** | — | — |
| Identifiers → Device ID | **No** | — | — |
| Diagnostics → Crash Data | **Yes** (Sentry, opt-out via About) | **No** | **No** (no user ID, no IP) |
| Diagnostics → Performance | **No** (Sentry tracesSampleRate = 0) | — | — |
| Usage Data → Product Interaction | **No** | — | — |
| Purchases → Purchase History | **No** (Apple holds this, not us) | — | — |
| Location | **No** | — | — |
| Health / Sensitive Info | **No** | — | — |

**Privacy Choices URL:** `{{PRIVACY_URL}}` (must be live before submission).

**App Privacy Choices required?** No — we do not track. Confirm "We do not track" in the App Privacy form.

> If the Sentry opt-out toggle is removed in future, or if session replay /
> traces are enabled, the Crash Data and Performance rows must be re-evaluated
> and the App Privacy form re-submitted.

| Step | Done |
|---|---|
| Privacy URL added in App Store Connect | [ ] |
| App Privacy questionnaire submitted | [ ] |
| Account holder Apple Developer Program ($99/yr) active | [x] Active (Dumitru Vasiliu) |
| ITSAppUsesNonExemptEncryption set (`app.json` ios.infoPlist) | [x] |

---

## 5. Google Play Data Safety form

Done inside Play Console → your app → App content → Data safety.

| Section | Answer |
|---|---|
| Does your app collect or share any of the required user data types? | Yes — two streams: (a) email + free-text when user contacts support, (b) crash diagnostics via Sentry (opt-out). Nothing else is collected. |
| App activity → Other actions / Other user-generated content | **No** |
| Personal info → Email address | **Yes** — collected, user-initiated only, used for App functionality (responding to support), optional, encrypted in transit, user can request deletion |
| App info and performance → Crash logs | **Yes** — collected, used for App functionality (fixing crashes), optional (user can opt out in About), encrypted in transit, ephemeral / not linked to user |
| App info and performance → Diagnostics | **No** (Sentry traces sample rate is 0) |
| Is all user data encrypted in transit? | Yes (HTTPS / TLS for support emails and Sentry; on-device storage is plaintext but local-only) |
| Can users request data deletion? | Yes — email `{{SUPPORT_EMAIL}}` for support-inbox data; in-App "Clear Progress" wipes attempt + question stats; uninstall removes all on-device state |
| Has your app been independently validated against a global security standard? | No |

**Privacy Policy URL:** `{{PRIVACY_URL}}`.

| Step | Done |
|---|---|
| Privacy URL added in Play Console | [ ] |
| Data Safety form completed and approved | [ ] |
| Google Play developer account ($25 one-off) active | [ ] |
| Age rating questionnaire submitted (target: Everyone) | [ ] |

---

## 6. Consumer waiver checkbox

Required for the digital-content waiver to actually waive the 14-day right.

| Surface | Done |
|---|---|
| Purchase flow uses Apple App Store / Google Play (no separate checkout, so waiver is implicit on tap-to-buy and documented in `REFUND.md` §2) | [x] |
| Refund policy explicitly states the waiver | [x] |
| Terms of Use explicitly states the waiver (§7) | [x] |

If, in future, a direct web checkout is introduced (Mollie / Stripe / Paddle), an explicit consent
checkbox is required next to the pay button before the user clicks "Pay". Add to launch checklist
at that point.

---

## 7. Trademark hygiene

| Item | Done |
|---|---|
| App name does not contain "ECS" | [x] (current name: "Network Infrastructure Trainer") |
| App icon does not imitate the ECS card design | [x] |
| Store listing description uses nominative fair use only ("Practice for the UK Network Infrastructure Awareness Assessment") | [x] (see `STORE_LISTING.md`) |
| Disclaimer present in store description | [ ] (see `STORE_LISTING.md` for the exact text) |
| Disclaimer present in About screen | [x] |
| Disclaimer present on Home screen | [x] |

---

## 8. VAT / merchant of record

| Item | Status |
|---|---|
| Sales channel | Apple + Google only at launch — both act as marketplace facilitators and handle VAT collection for consumer sales in supported jurisdictions |
| UK VAT registration required at launch? | No — Apple and Google are responsible for VAT collection on store-sold consumer apps |
| Threshold reminder | Annual self-employment / company income still counts toward your own VAT threshold (currently £90,000/yr). Track via accounting. |

If a direct web checkout is added later, the position changes: either register for VAT OSS or use a
merchant of record (Paddle, Lemon Squeezy). Document the decision when that happens.

---

## 9. Records of processing (ROPA) — internal

A simple one-page internal document recording:

- name and contact details of the controller,
- purposes of processing (responding to support emails),
- categories of personal data (email address, free-text content),
- categories of recipients (email provider only),
- transfers outside the UK (if any),
- retention period (24 months from last message),
- general description of technical and organisational measures (TLS in transit, password manager,
  2FA on the email account).

Template: https://ico.org.uk/for-organisations/sme-web-hub/documentation/

| Item | Done |
|---|---|
| ROPA drafted (`docs/legal/ROPA.md`) | [x] |
| ROPA saved alongside other compliance docs (not in this repo) | [ ] |
| Reviewed annually | [ ] |

---

## 10. Data Processing Agreements (DPAs)

| Processor | Required | Status |
|---|---|---|
| Apple (App Store) | No DPA — Apple is independent controller for store data | [x] |
| Google (Play Store) | No DPA — Google is independent controller for store data | [x] |
| **Neo.Space (inbound `support@timrx.live`)** | **Yes** | [x] Auto-incorporated via Neo Customer Terms of Use at signup. Reference: https://support.neo.space/hc/en-us/articles/14462505748121-Neo-Privacy-Policy and Terms of Use at https://support.neo.space/hc/en-us/articles/14461974928281-Neo-Customer-Terms-of-Use |
| **AWS SES (outbound replies — eu-west-2 / London)** | **Yes** | [x] Auto-incorporated via the AWS GDPR DPA, which AWS publishes and applies to all customers automatically (no signing step). Reference: https://aws.amazon.com/compliance/gdpr-center/ |
| Hosting provider for legal pages (Cloudflare Pages) | Yes if pages collect personal data; the legal pages are static | [x] N/A — pages are static read-only HTML with no forms |
| **Sentry (sentry.io)** | **Yes** — they process crash diagnostics on our behalf | [x] Accepted 2026-05-30 (Dumitru Vasiliu) — see `docs/legal/SENTRY_DPA.md` |

> **Sentry DPA accepted 2026-05-30** as customer entity **Dumitru Vasiliu**.
> Full signed text archived at `docs/legal/SENTRY_DPA.md` (do not delete —
> this is the authoritative record). Re-accept and bump the file/date here
> whenever Sentry publishes a revised DPA.

---

## 11. Breach response

| Item | Done |
|---|---|
| Single inbox monitored for security reports — `support@timrx.live` | [x] |
| 72-hour ICO notification path documented (`docs/legal/BREACH_RESPONSE.md`) | [x] |
| User notification template prepared (`docs/legal/BREACH_RESPONSE.md`) | [x] |

---

## 12. Pre-submission final checklist

Run this top-to-bottom on the day you submit the binary.

```
[x] Legal entity registered — operating as sole trader: Dumitru Vasiliu (name in legal docs)
[x] All placeholders in PRIVACY.md / TERMS.md / REFUND.md / EULA.md replaced (no {{...}} remain)
[x] Privacy, Terms, Refund, EULA hosted at stable URLs (verified live 2026-06-01: privacy/terms/refunds/eula at timrx.live/legal/nia/*)
[x] URLs in SettingsScreen.tsx match the hosted URLs (verified exact match)
[ ] ICO registration paid; number in {{ICO_NUMBER}}
[ ] Apple App Privacy form submitted, URL set in App Store Connect
[ ] Google Play Data Safety form submitted, URL set in Play Console
[ ] App name on both stores does not contain "ECS"
[ ] Disclaimer present in App Store description (per STORE_LISTING.md)
[ ] Disclaimer present in Play Store description (per STORE_LISTING.md)
[ ] Age rating: 4+ / Everyone
[ ] Support inbox alive and monitored
[ ] ROPA saved
[ ] Calendar reminder for ICO renewal set
[ ] Build version + buildNumber / versionCode incremented from any prior submission
[x] Sentry DSN set in `app.json` extra.sentryDsn — EU region (ingest.de.sentry.io)
[x] Sentry org + project slugs set in the `@sentry/react-native` plugin block in `app.json` (both: network-infrastructure-trainer — verified via /projects/network-infrastructure-trainer URL)
[x] Sentry DPA accepted (2026-05-30, Dumitru Vasiliu) — archived at docs/legal/SENTRY_DPA.md
[x] Source-map upload working in the production EAS build — verified 2026-05-30 (Crash Free Sessions 100%, session received from real iOS device, release `uk.networkinfrastructure.trainer@1.0.0+5` tagged correctly)
[ ] Final TestFlight / Play Internal Test run on real iOS + Android device
```
