# Launch Playbook — Network Infrastructure Trainer

One-screen, click-through launch checklist. Follow it top to bottom. Cross-references — but does **not** duplicate — the form answers in `LAUNCH_COMPLIANCE.md`, the store copy in `STORE_LISTING.md`, and the Sentry token setup in `SENTRY.md`.

**Status (2026-05-30):** code green, 46/46 Jest tests passing, TypeScript clean, ESLint 0 errors. No build blockers. The work below is paperwork + submission, not engineering.

**Identities you will reuse on every form**

| Field | Value |
|---|---|
| Legal entity | Dumitru Vasiliu (sole trader) |
| Trading name | TimrX |
| App name | Network Infrastructure Trainer |
| Bundle ID / Package | `uk.networkinfrastructure.trainer` |
| Support email | support@timrx.live |
| Marketing URL | https://timrx.live |
| Privacy URL | https://timrx.live/legal/nia/privacy |
| Terms URL | https://timrx.live/legal/nia/terms |
| Refund URL | https://timrx.live/legal/nia/refunds |
| EULA URL | https://timrx.live/legal/nia/eula |
| Price | £4.99 (Tier 5 equivalent) |
| Age rating | 4+ (Apple) / Everyone (Google) |
| Category | Education (Primary) / Reference (Secondary) |

---

## Day 1 — Apple App Store Connect setup

Go to https://appstoreconnect.apple.com and sign in with the paid Apple Developer account.

### 1. Tax & Banking (do this first — Apple won't process anything until it's done)

**Agreements, Tax, and Banking → Paid Apps agreement**
- Accept the Paid Apps agreement. Without this, the app cannot be priced.

**Tax forms**
- W-8BEN (US tax form for non-US individual sole traders).
  - Beneficial owner: Dumitru Vasiliu
  - Country of citizenship: your nationality
  - Permanent residence: your UK address
  - Tax treaty: United Kingdom, Article 12 (Royalties), 0% rate
  - Type of income: Royalties — Copyright (software)

**Bank account**
- Add UK bank account (sole trader account is fine).
- Currency: GBP.

### 2. Create the app record

**My Apps → "+" → New App**
- Platforms: iOS
- Name: `Network Infrastructure Trainer`
- Primary language: English (U.K.)
- Bundle ID: `uk.networkinfrastructure.trainer` (must already exist in Certificates, Identifiers & Profiles — EAS creates it on first build)
- SKU: `nit-ios-001`
- User Access: Full Access

### 3. App Information

- Subtitle: paste from `STORE_LISTING.md` → "App Subtitle" section
- Category: Primary = Education, Secondary = Reference
- Content Rights: "Does this app contain, show, or access third-party content?" → **No**
- Age Rating → Edit → answer all No → result must be **4+**

### 4. Pricing and Availability

- Price: GBP £4.99 → Apple auto-converts to all currencies
- Availability: All countries and regions
- Pre-Order: Off

### 5. App Privacy

Go to **App Privacy → Get Started**. Use the answer table from `LAUNCH_COMPLIANCE.md` §4. Summary:

| Data type | Collected? | Linked to user? | Used for tracking? | Purpose |
|---|---|---|---|---|
| Email Address | Yes (only if user contacts support) | Yes | No | App Functionality, Customer Support |
| Crash Data | Yes (opt-out in Settings) | No | No | App Functionality, Analytics |
| Everything else | **No** | — | — | — |

- Privacy Policy URL: `https://timrx.live/legal/nia/privacy`
- Privacy Choices URL: (leave blank — the in-app Settings toggle is the choice mechanism)

### 6. Prepare for Submission (1.0)

**Version Information**
- Promotional Text (170 char limit): paste from `STORE_LISTING.md` → "Promotional Text"
- Description: paste full description from `STORE_LISTING.md` (disclaimer block stays in)
- Keywords: paste keyword string from `STORE_LISTING.md` (no "ECS", no "JIB")
- Support URL: `https://timrx.live/nia/support`
- Marketing URL: `https://timrx.live`

**Screenshots** — required sizes (one set of each is enough; Apple scales):
- 6.7" iPhone (1290 × 2796) — iPhone 15 Pro Max / 16 Pro Max
- 6.5" iPhone (1242 × 2688) — iPhone 11 Pro Max / XS Max
- Take 4–6 each: Home with Readiness card, Decoder list, Quiz mid-question, Mock exam with timer, Stats screen

**App Review Information**
- Sign-in required: **No**
- Demo Account: leave blank
- Notes (paste from `STORE_LISTING.md` → "App Review Notes"):
  > Network Infrastructure Trainer is an independent study aid for the UK Network Infrastructure Awareness Assessment. It is not affiliated with The JIB or the Electrotechnical Certification Scheme. All content is original paraphrasing of publicly available British and European standards (BS 7671, BS EN 50174, BS EN 50575 (CPR), HSG47, COSHH). No login is required. No tracking. Crash reports are opt-out and contain no PII (see Settings → Crash reporting).

**Version Release**
- Manually release this version (do not auto-release) — gives you a chance to verify Sentry sees the production traffic.

### 7. Encryption export compliance

In Build → Compliance section:
- "Does your app use encryption?" → **No** (matches `ITSAppUsesNonExemptEncryption: false` in app.json)

### 8. EU Digital Services Act trader identification

EU now requires trader identity for paid apps. Under **App Information → Trader Information**:
- Trader Status: I am a trader
- Trader Name: Dumitru Vasiliu (TimrX)
- Trader Address: your UK address (must match ICO registration)
- Trader Email: support@timrx.live
- Trader Phone: your phone

### 9. iOS Privacy Manifest (2024+ Apple requirement)

The Expo SDK 54 build already includes a default `PrivacyInfo.xcprivacy`. Verify after the first production build by extracting the `.ipa` and checking it lists:
- Required Reason APIs: `NSPrivacyAccessedAPICategoryUserDefaults` reason `CA92.1` (in-app preferences)
- Tracking: false
- No collected data types declared (matches App Privacy form)

If anything else appears, file an issue and rebuild — do not submit.

---

## Day 2 — Google Play Console setup

Go to https://play.google.com/console and pay the one-time **$25** developer fee with the same Google account you'll use for the studio.

### 1. Identity verification

Google now requires government ID + selfie for new individual accounts. Allow up to 48 hours. The app cannot enter Production until this clears.

### 2. Create the app

**Create app**
- App name: `Network Infrastructure Trainer`
- Default language: English (United Kingdom)
- App or game: App
- Free or paid: **Paid**
- Declarations: tick both ("I confirm" + "I agree")

### 3. Set up your app (left rail checklist)

Work through each card in order. Most are paste jobs from `STORE_LISTING.md`.

- **Privacy policy**: `https://timrx.live/legal/nia/privacy`
- **App access**: All functionality available without restrictions
- **Ads**: No, my app does not contain ads
- **Content rating** (questionnaire): all No → result must be **Everyone**
- **Target audience**: 18+ (working professionals/apprentices). Tick "Appeals to children" → No
- **News app**: No
- **COVID-19 contact tracing**: No
- **Data safety**: use the table in `LAUNCH_COMPLIANCE.md` §5. Summary: Email Address (collected, not shared, optional, support purpose) + Crash logs (collected, not shared, optional, app functionality) — nothing else.
- **Government app**: No
- **Financial features**: No

### 4. Store listing

- Short description (80 char max): pull from `STORE_LISTING.md`
- Full description: paste from `STORE_LISTING.md` (keep the disclaimer paragraph at the bottom)
- App icon: 512 × 512 PNG, 32-bit
- Feature graphic: 1024 × 500 PNG (no text smaller than 30pt)
- Phone screenshots: minimum 2, maximum 8. Same set as iOS, exported at 1080 × 1920 or larger
- Tablet screenshots: optional, skip for v1
- App category: Education
- Tags: Self-Improvement, Productivity (max 5)
- Contact details:
  - Email: support@timrx.live
  - Website: https://timrx.live
  - Phone: optional, skip

### 5. Pricing & distribution

- Price: £4.99 (Play auto-converts)
- Countries: All available
- Contains ads: No
- In-app purchases: No

### 6. App content → Government identity (EU DSA)

Same trader-identity block as Apple:
- Trader name: Dumitru Vasiliu (TimrX)
- Address, email, phone — must match ICO record

### 7. Closed testing first (required for new personal Play accounts)

If your Google Play developer account is a **personal** account created after **November 2023**, closed testing is **mandatory before you can publish to Production**: Google requires at least **12 testers opted in for 14 continuous days** before it unlocks production access. (Organisation/company accounts are exempt.)

Steps: create a Closed Testing track, add **≥12 testers** (each must accept the opt-in link), upload the production AAB, and keep the test running for **14 days**. Once eligible and the build passes Google review, apply for production access and promote to Production. Allow extra calendar time for this in your launch plan.

---

## Day 3 — Production build & submit

All commands run from `app/` directory.

### 1. Pre-flight

```bash
cd app
npm run typecheck
npm run lint
npm test
```

All three must pass. If anything fails, **do not build** — fix it first.

### 2. Confirm EAS env has the Sentry token

```bash
eas env:list --environment production
```

You should see `SENTRY_AUTH_TOKEN` (secret, value hidden). If missing, follow `docs/SENTRY.md` step 4.

### 3. Production build

```bash
eas build --profile production --platform all
```

This produces:
- `.ipa` for iOS (submitted via App Store Connect)
- `.aab` for Android (submitted via Google Play Console)

Wait time: 15–25 min each. Watch for "Build succeeded" + check Sentry dashboard shows the source-map upload from this build.

### 4. Submit

```bash
eas submit --platform ios --latest
eas submit --platform android --latest
```

The iOS submission uploads to App Store Connect → it appears under TestFlight → Builds within ~30 min. Add it to the 1.0 version, then click **Submit for Review** in App Store Connect.

The Android submission uploads to Play Console → Internal testing track by default. Promote to Production from the Console UI.

### 5. Review times

- Apple: typically 24–48 hours, occasionally 7 days
- Google: typically 1–3 days for first submission (longer because new account)

---

## Day 4 — Live legal page final fills

These four placeholders are still on the published Cloudflare Pages versions of the legal docs. Fill them as soon as the ICO confirmation email arrives.

| Placeholder | Page | Value to paste |
|---|---|---|
| `{{ICO_NUMBER}}` | `timrx.live/legal/nia/privacy` §1 | The ZA-prefixed registration number from ICO (the CSN is **not** this) |
| `{{POSTAL_ADDRESS}}` | privacy §1, terms §11, refunds §4, EULA §10 | Your trading address as it appears on ICO record |
| International transfers paragraph | privacy §6 | "We use Neo.Space (Namecheap, Inc., USA) for inbound email under the EU–US Data Privacy Framework and the UK extension. Outbound transactional email is sent via Amazon SES in eu-west-2 (London), keeping email content within the UK." |
| "Last updated" line | all four pages | Today's date when you edit |

Bump the privacy policy "Last updated" date in `app/app.json` `extra.privacyPolicyVersion` so users see a "Privacy policy updated" notice on next launch.

---

## Real-device QA checklist (before clicking Submit for Review)

Install the production build (TestFlight for iOS, Internal Testing for Android) on a real device — **not** Expo Go, **not** simulator. Walk through:

- [ ] App launches without splash hanging
- [ ] Home → Readiness card shows "Get started" (no data yet)
- [ ] Tap Decoder → search for "Cca" returns Cca-s1b,d2,a2
- [ ] Open one decoder entry → 3 quiz cards reveal answers on tap
- [ ] Start a Practice section → answer 5 questions → return to Home → Readiness card updates
- [ ] Start a Mock Exam → answer 5 → use the "X/30 answered · Jump to…" navigator to skip to Q20 → answer it → return to Q6 via navigator
- [ ] Background the app mid-mock for 10 seconds → reopen → exam resumes exactly where you left it (Resume Mock Exam panel on the Mock tab confirms)
- [ ] Force-quit mid-mock → reopen → Resume panel appears with correct "answered / left on the clock"
- [ ] Complete a mock → review shows answer text (e.g. "Cca-s1b,d2,a2") not just letter
- [ ] Bookmark a question → check Practice → Bookmarks list
- [ ] Get a question wrong → check Practice → Review wrong list
- [ ] Stats tab shows per-section accuracy
- [ ] About → all four legal links open in Safari/Chrome and load real pages (not 404)
- [ ] About → Support email opens Mail composer to support@timrx.live
- [ ] About → toggle "Crash reporting" off → force a crash (dev menu or remove a non-optional prop) → confirm nothing reaches Sentry
- [ ] Toggle "Crash reporting" back on → crash again → event appears in Sentry within 60s
- [ ] Reset progress → all stats clear → Readiness returns to zero
- [ ] Disclaimer text visible on Home and About — exact wording matches `STORE_LISTING.md`

Anything failing = block the submission, ship a fix, rebuild.

---

## Optional but recommended

- **Solicitor review (30 minutes)**: pay a UK solicitor with software/consumer experience to read the four legal docs. Around £75–£150. Reduces risk of ASA/CMA challenges over the disclaimer wording.
- **Icon polish**: current icon is functional. If you want a designer pass, brief them on "cable bundle wrapped around a study book", flat colour, no text. Cost £30–£80 on Fiverr.
- **Pre-launch press**: a single LinkedIn post when the listing goes live is enough. No paid marketing needed for a £4.99 study aid.

---

## What you do NOT need

These appeared in the original `IMPLEMENTATION_PLAN.md` but are not part of the mobile-only launch:

- **Mollie / Stripe / any payment processor** — App Store and Play Store handle payment, VAT remittance, refunds, and chargebacks. You receive net 70% (Apple/Google take 30% standard, or 15% under the Small Business Program after sign-up).
- **AWS RDS / Postgres / TablePlus** — no server, no database, no accounts. All progress lives in AsyncStorage on the device.
- **AWS S3** — no asset hosting needed; legal docs are on Cloudflare Pages, app assets ship inside the bundle.
- **AWS Lambda / API Gateway** — no backend.
- **Mailchimp / Customer accounts / Login** — anonymous app, no marketing list.

`aws-ses` is the only AWS dependency, and only for outbound replies from support@timrx.live. Nothing in the app talks to AWS.

---

## Apple Small Business Program (do this on Day 1 if you haven't already)

https://developer.apple.com/app-store/small-business-program/

If you earn under $1M/yr on the App Store, you qualify for 15% commission instead of 30%. Apply immediately — it takes effect from the first of the next month after approval. Free, no downside.

Google has no equivalent (their 15% rate applies automatically to the first $1M each year).

---

## Order of operations (3–7 days realistic timeline)

| Day | Block |
|---|---|
| 1 | Apple Tax & Banking, Small Business Program application, ICO email arrives → fill `{{ICO_NUMBER}}` on live pages |
| 2 | Google Play sign-up + ID verification (clears in 24–48h in background) |
| 3 | `eas build --profile production --platform all` (~45 min total) |
| 3 | App Store Connect: create app, paste all metadata, upload screenshots, App Privacy form |
| 4 | Real-device QA pass on TestFlight build |
| 4 | Submit iOS for Review |
| 4 | Google Play: create app, paste metadata, Data Safety form, upload AAB, submit for Production review |
| 5–7 | Wait for Apple/Google review. Watch Sentry dashboard for any first-day-of-launch issues |

That's the whole launch. There is no shadow backlog — when both stores approve, you are live.

---

## If something gets rejected

**Apple rejection — most common reasons for an app like this:**
- Disclaimer not visible enough → ours is on Home, About, and the store description. If they push back, screenshot all three and reply via App Review.
- Trademark concern over "ECS" or "JIB" → our copy avoids both. If they question it, reply: "All content is original paraphrasing of publicly available standards (BS 7671, BS EN 50174, BS EN 50575). No use of ECS or JIB trademarks. Disclaimer is permanently displayed on Home and About screens."
- Privacy policy mismatch → re-verify App Privacy form matches `LAUNCH_COMPLIANCE.md` §4 exactly.

**Google rejection — most common reasons:**
- Data Safety form mismatch with privacy policy → re-verify §5 of `LAUNCH_COMPLIANCE.md`.
- Account verification delay (not a rejection, just a wait).

In both cases, reply in the App Review / Play Console message thread the same day — fast turnaround speeds re-review.

---

**That's it.** Everything above is paperwork. The app itself is ready to ship today.
