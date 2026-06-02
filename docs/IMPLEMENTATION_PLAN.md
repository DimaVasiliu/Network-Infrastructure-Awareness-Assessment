# Network Infrastructure Trainer — Implementation Plan

> **Historical document.** Phases 0–5 are complete. The actual delivered product
> differs in places from the original plan: the question bank grew to **155
> questions**, the mock exam uses the published **30 / 45 min / 24-pass-mark**
> format, the build/deploy stack is **EAS only** (web export dropped), and
> hosting for the legal pages is **Cloudflare Pages on `timrx.live`** (not S3 +
> CloudFront). The §9 compliance notes were superseded by `LAUNCH_COMPLIANCE.md`.
> Treat this file as background reading; for current state see `README.md` and
> the docs in `docs/`.

---

## 1. Market audit (the gap you're filling)

Existing ECS apps on the App Store / Play Store target the **Health & Safety** assessment only:
- ECS Test & Toolkit (£free + IAP)
- ECS Revision
- ECS Card Revision
- ECS Exam Prep 2025
- ECS H&S Assessment Test Lite (Android)

**No dedicated app exists for the Network Infrastructure Awareness Assessment.** You have a clean niche with 145 vetted questions across 9 sections from the official PDF guide.

**Suggested price:** £4.99 one-time paid up-front on the Apple App Store and Google Play.

---

## 2. Stack (decided)

| Layer | Choice | Why |
|---|---|---|
| App framework | **Expo SDK 54** (React Native) | One TypeScript codebase → iOS + Android |
| Language | TypeScript | Type safety, great in VS Code |
| State | Zustand + AsyncStorage | Tiny, local-first |
| Mobile distribution | Apple App Store + Google Play (paid app, £4.99) | No IAP complexity needed |
| Builds | **EAS Build** (Expo's cloud build service) | Avoid keeping Xcode/Android Studio in sync |

**Data we collect:** zero for launch. Apple/Google handle the payment. Questions ship inside the app.

---

## 3. Backend and database

None for launch. This is a mobile-only paid app for iOS and Android.

---

## 4. AWS resources

None for launch. The product is mobile-only for iOS and Android.

---

## 5. Costs to launch

| Item | Cost |
|---|---|
| Apple Developer Program | $99/year (~£78) |
| Google Play Console | $25 one-time |
| EAS Build (free tier is enough at start) | £0 |
| **Total to first launch** | **~£103** |

---

## 6. Build phases (chronological, each is its own working session)

**Phase 0 — Setup (you're here).** Install everything below. No code yet.

**Phase 1 — Skeleton app + question bank.**
- `npx create-expo-app` in VS Code.
- Parse the PDF into a typed `questions.json` (145 items: id, section, question, choices A–D, correctAnswer, explanation).
- Bottom-tab navigation: Home / Practice / Mock Exam / Stats.
- Runs on iPhone via Expo Go (QR code) — you don't need Xcode yet.

**Phase 2 — Quiz engine.**
- Practice mode (by section, shuffled).
- Mock exam mode — actual format adopted: 30 random Qs drawn from a 155-question bank weighted across the 9 sections, 45-minute timer, pass mark 24/30 (80%).
- Wrong-answer review.
- Progress stored in AsyncStorage (no backend).

**Phase 3 — Polish.**
- Dark mode, icons, splash screen.

**Phase 4 — Store submission.**
- Apple Developer account, App Store Connect entry, EAS build → submit.
- Google Play Console, EAS build → internal testing → production.

**Phase 5 — Post-launch.**
- ASO (app store optimisation): improve keywords and screenshots without using
  "ECS" in the app name, subtitle, short description or keyword field.
- Backlink from electriciantraining.co.uk, applyecscard.co.uk, the JIB forum, Reddit r/electricians.

---

## 7. What to install on your Mac NOW (Phase 0)

Run these in **Terminal** in order. Comments explain why.

### 7a. Core toolchain

```bash
# 1. Homebrew (skip if you already have it — check with `brew -v`)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 2. Node.js LTS (v20) via nvm — gives you `node`, `npm`, `npx`
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
# reload your shell, then:
nvm install --lts
nvm use --lts
node -v   # should print v20.x

# 3. Watchman — Metro bundler needs it for fast file watching
brew install watchman

# 4. Git (usually preinstalled, verify)
git --version
```

### 7b. VS Code + extensions

Install VS Code from https://code.visualstudio.com/ then in VS Code:

```
Cmd+Shift+X  →  install:
  - ESLint (dbaeumer.vscode-eslint)
  - Prettier (esbenp.prettier-vscode)
  - Expo Tools (expo.vscode-expo-tools)
  - React Native Tools (msjsdiag.vscode-react-native)
  - Error Lens (usernamehw.errorlens)
  - GitHub Copilot (optional)
```

### 7c. Phone-only testing (do this first, skip simulators for now)

Install **Expo Go** on your iPhone and Android phone:
- iOS: https://apps.apple.com/app/expo-go/id982107779
- Android: https://play.google.com/store/apps/details?id=host.exp.exponent

With Expo Go you scan a QR code from VS Code's terminal and the app loads on your real phone. **No Xcode or Android Studio needed for development.** This alone gets you through Phase 1 and 2.

### 7d. Optional now, required before store submission (heavy installs)

You can postpone these until Phase 5. They are large.

```bash
# Xcode (~70 GB) — for iOS simulator and final .ipa builds
# Install from Mac App Store: search "Xcode", click Get
# After install:
sudo xcode-select --install                       # command-line tools
sudo xcodebuild -license accept
sudo gem install cocoapods                        # iOS native dep manager

# Android Studio (~10 GB) — for Android emulator and SDK
brew install --cask android-studio
# Open it once, run the setup wizard, install Android SDK 34 + an emulator image

# Java JDK 17 (required by Android tooling)
brew install --cask zulu@17
```

**Workaround for store builds without Xcode/Android Studio locally:** use **EAS Build** (Expo's cloud build service). Free tier covers our launch volumes:

```bash
npm install -g eas-cli
eas login
eas build --platform ios       # builds in the cloud, no Xcode needed locally
eas build --platform android   # ditto
eas submit                     # submits to App Store / Play
```

You still need the **Apple Developer ($99/yr) and Google Play ($25 one-time)** accounts before submitting.

## 8. Verify the setup

After installing 7a–7c, run this sanity check in a new Terminal:

```bash
brew -v && node -v && npm -v && watchman -v && git --version
```

All five should print versions. If any fail, fix that one before moving on.

Then test Expo end-to-end without writing any project code:

```bash
cd ~/Desktop
npx create-expo-app@latest expo-smoke-test --template blank-typescript
cd expo-smoke-test
npx expo start
```

A QR code appears in the terminal. Open **Expo Go** on your phone, scan it, and you should see "Open up App.tsx to start working on your app!" within ~15 seconds. Delete the folder after — it was just a smoke test.

---

## 9. Legal & compliance — read this carefully

You asked specifically about legal risk. There are five separate issues. The first one is the biggest.

### 9a. Copyright on the question bank (MOST IMPORTANT)

The PDF you uploaded is **© ECS / The JIB**. The 145 questions, the way they're worded, the explanations, the order — all of that is the JIB's copyrighted work. You **cannot ship those questions verbatim** in your app. That's textbook copyright infringement and grounds for App Store takedown, a cease-and-desist, and damages.

What is *not* copyrighted is **the underlying knowledge**: the standards (BS EN 50174-2, BS 7671, CPR / EuroClass system), the facts (e.g. "Class Ea permanent link max length is 90 m"), and the regulations. Facts and standards numbers aren't copyrightable.

You have three options, ranked by risk:

1. **Safest — write your own question bank from scratch.** Use the official PDF only as a *topic map*. Read the actual standards (BS EN 50174-2 is available via BSI; many are also summarised free online), then write fresh questions that test the same concepts with different wording, different scenarios, different numerical examples. Your explanations should cite the standard (e.g. "BS EN 50174-2 §6.4.3") rather than copying the JIB's explanation text. This is what reputable revision apps like Whitecode and others do.
2. **Cleanest — contact the JIB and ask for a licence.** Email `enquiries@ecscard.org.uk` or `online@ecscard.org.uk`. Pitch it as an official partnership: you build the app, they get a revenue share or flat licence fee, and you can use their content + branding legitimately. This takes months and isn't guaranteed, but is the strongest commercial position if it works.
3. **Riskiest — "rewrite" their questions while keeping the structure.** Don't. Courts treat close paraphrases as derivative works. You're one complaint away from removal.

**My recommendation:** start with option 1 immediately (it's enough to launch), and pursue option 2 in parallel as an upgrade path.

### 9b. Trademark — don't use "ECS" in your app name

"ECS" and the ECS card logo are JIB trademarks. Using "ECS" in your app name, icon, or store listing implies endorsement and is trademark infringement.

- **Bad:** "ECS Network Infrastructure Trainer", "ECS NIA Prep"
- **OK:** "Network Infrastructure Awareness Trainer", "NetInfra Cert Prep UK", "Cable Installer Test Coach"
- In the description you may factually state *"Practice for the UK Network Infrastructure Awareness Assessment"* — describing what the app prepares for is allowed (nominative fair use), as long as you also include a disclaimer.
- **Required disclaimer** in the app's About/Help area and in the App Store / Play Store description:
  > *This app is an independent study aid. It is not affiliated with, endorsed by, or sponsored by The JIB or the Electrotechnical Certification Scheme (ECS). "ECS" is a trademark of The JIB.*

### 9c. UK GDPR + Data Protection Act 2018

Because you're collecting almost nothing, you're in great shape — but you still need the paperwork.

**What you must do:**
- **Privacy Policy** — a public URL linked from the app and store listings. For the mobile-only launch it should say the app collects no personal data, stores quiz progress locally on device, and Apple/Google process store payments.
- **No tracking SDKs without consent** — skip Google Analytics, Facebook Pixel, etc. on launch.
- **ICO registration** — as a UK data controller you're legally required to register with the ICO and pay the data protection fee (£40–£60/year for most small businesses). Register at https://ico.org.uk/for-organisations/data-protection-fee/.
- **Records of processing (ROPA)** — a simple internal document. Template on the ICO website.
- **Subject Access Request process** — set up a contact email and a one-page internal procedure to respond within 30 days.
- **Breach notification** — if data is breached, you have 72 hours to notify the ICO. Plan for it.

### 9d. App Store & Play Store privacy declarations

Both stores require you to declare what data you collect, even if it's "none".

- **Apple App Privacy** (App Store Connect → App Privacy) — declare the two data types actually collected: Contact Info → Email (support, linked to user, not used for tracking) and Diagnostics → Crash Data (Sentry, not linked, not tracking). Full answers in `LAUNCH_COMPLIANCE.md` §4.
- **Google Play Data Safety** (Play Console → App content → Data safety) — same two streams: support email and opt-out crash diagnostics. Full answers in `LAUNCH_COMPLIANCE.md` §5.
- **Age rating** — choose 4+ / Everyone. No mature content.
- **EULA / Terms of Use** — Apple has a default EULA you can use, or write your own. Required on both stores.

### 9e. Consumer protection (UK + EU)

You're selling a digital product to UK and likely EU consumers.

- **Refunds and cancellation** — Apple and Google handle paid-app purchases and refund flows through their stores.
- **VAT** — Apple and Google generally handle consumer tax collection/remittance for App Store / Play Store purchases, but confirm your seller obligations before launch.

### 9f. Quick checklist before launch

```
[ ] Question bank rewritten from scratch (or JIB licence in writing)
[ ] App name does not contain "ECS"
[ ] Disclaimer placed in app About/Help screen and store listings
[ ] Privacy policy URL live
[ ] Terms / EULA URL live
[ ] ICO registration paid (~£40)
[ ] Apple App Privacy declaration submitted
[ ] Google Play Data Safety form completed
[ ] VAT/accounting position checked for App Store / Play Store sales
```

I'll generate draft Privacy Policy, Terms, and Disclaimer documents before store submission — they're boilerplate-able once we know the company name and contact email.

---

## 10. After Phase 0

Reply with "setup done" and I'll start Phase 1: scaffolding the real project and parsing the 145-question PDF into a typed JSON the app can use. We'll do it in small commits so you can see each piece working before we move on.
