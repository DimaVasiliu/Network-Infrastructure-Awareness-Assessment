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
| Privacy Policy | `docs/legal/PRIVACY.md` | `{{PRIVACY_URL}}` | [x] | [ ] | [ ] |
| Terms of Use | `docs/legal/TERMS.md` | `{{TERMS_URL}}` | [x] | [ ] | [ ] |
| Refund Policy | `docs/legal/REFUND.md` | `{{REFUND_URL}}` | [x] | [ ] | [ ] |
| EULA | `docs/legal/EULA.md` | `{{EULA_URL}}` | [x] | [ ] | [ ] |

**Placeholders to fill** before hosting (search-and-replace in every file):

- `{{LEGAL_NAME}}` — registered legal entity (e.g. "John Smith t/a Network Trainer" or "Network Trainer Ltd")
- `{{SUPPORT_EMAIL}}` — must match the email in `SettingsScreen.tsx`
- `{{POSTAL_ADDRESS}}` — UK postal address (PO box is acceptable)
- `{{EFFECTIVE_DATE}}` / `{{LAST_UPDATED}}` — ISO dates (e.g. 2026-06-01)
- `{{ICO_NUMBER}}` — issued by the ICO after registration (see §3)
- `{{EMAIL_PROVIDER}}` / `{{EMAIL_PROVIDER_REGION}}` — who hosts the `support@` mailbox (e.g. "Fastmail", "Ireland")
- `{{PRIVACY_URL}}` / `{{TERMS_URL}}` / `{{REFUND_URL}}` / `{{EULA_URL}}` — public URLs after hosting
- `{{ADDITIONAL_COUNTRIES}}` — leave blank for UK-only launch; or add e.g. "and the European Union"

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

| Step | Done | Notes |
|---|---|---|
| Confirm a UK legal entity / sole trader registration | [ ] | Needed before ICO registration |
| Self-assessment on `ico.org.uk` to confirm fee tier | [ ] | Tier 1 (micro org) is currently £40 — confirm at registration |
| Pay annual data protection fee | [ ] | Direct debit recommended so it auto-renews |
| Record ICO registration number | [ ] | Goes into `{{ICO_NUMBER}}` in `PRIVACY.md` |
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
| Diagnostics → Crash Data | **No** | — | — |
| Diagnostics → Performance | **No** | — | — |
| Usage Data → Product Interaction | **No** | — | — |
| Purchases → Purchase History | **No** (Apple holds this, not us) | — | — |
| Location | **No** | — | — |
| Health / Sensitive Info | **No** | — | — |

**Privacy Choices URL:** `{{PRIVACY_URL}}` (must be live before submission).

**App Privacy Choices required?** No — we do not track. Confirm "We do not track" in the App Privacy form.

| Step | Done |
|---|---|
| Privacy URL added in App Store Connect | [ ] |
| App Privacy questionnaire submitted | [ ] |
| Account holder Apple Developer Program ($99/yr) active | [ ] |
| ITSAppUsesNonExemptEncryption set (`app.json` ios.infoPlist) | [x] |

---

## 5. Google Play Data Safety form

Done inside Play Console → your app → App content → Data safety.

| Section | Answer |
|---|---|
| Does your app collect or share any of the required user data types? | No data is collected by the app itself. Email address is processed if (and only if) the user contacts support — declare as user-initiated contact, encrypted in transit, optional, used for App functionality, not shared. |
| Is all user data encrypted in transit? | Yes (HTTPS / TLS for support emails; on-device storage is plaintext but local-only) |
| Can users request data deletion? | Yes — email `{{SUPPORT_EMAIL}}` for support-inbox data; on-device data is deleted by uninstalling or by tapping "Clear Progress" inside the app |
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
| ROPA drafted | [ ] |
| ROPA saved alongside other compliance docs (not in this repo) | [ ] |
| Reviewed annually | [ ] |

---

## 10. Data Processing Agreements (DPAs)

| Processor | Required | Status |
|---|---|---|
| Apple (App Store) | No DPA — Apple is independent controller for store data | [x] |
| Google (Play Store) | No DPA — Google is independent controller for store data | [x] |
| Email provider (`support@`) | Yes | [ ] Accept their standard DPA on signup |
| Hosting provider for legal pages | Yes if pages contain forms; no if static-only | [ ] N/A while static |

---

## 11. Breach response

| Item | Done |
|---|---|
| Single inbox monitored for security reports (`security@` or `support@`) | [ ] |
| 72-hour ICO notification path documented | [ ] |
| User notification template prepared | [ ] |

---

## 12. Pre-submission final checklist

Run this top-to-bottom on the day you submit the binary.

```
[ ] Legal entity registered (Companies House / HMRC) — name in {{LEGAL_NAME}}
[ ] All placeholders in PRIVACY.md / TERMS.md / REFUND.md / EULA.md replaced
[ ] Privacy, Terms, Refund, EULA hosted at stable URLs
[ ] URLs in SettingsScreen.tsx match the hosted URLs
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
[ ] Final TestFlight / Play Internal Test run on real iOS + Android device
```
