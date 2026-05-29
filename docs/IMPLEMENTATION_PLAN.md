# ECS Network Infrastructure Awareness — Training App
## Implementation Plan (Phase 0: Setup)

---

## 1. Market audit (the gap you're filling)

Existing ECS apps on the App Store / Play Store target the **Health & Safety** assessment only:
- ECS Test & Toolkit (£free + IAP)
- ECS Revision
- ECS Card Revision
- ECS Exam Prep 2025
- ECS H&S Assessment Test Lite (Android)

**No dedicated app exists for the Network Infrastructure Awareness Assessment.** You have a clean niche with 145 vetted questions across 9 sections from the official PDF guide.

**Suggested price:** £4.99 one-time (paid up-front on stores; same price via Stripe on web).

---

## 2. Stack (decided)

| Layer | Choice | Why |
|---|---|---|
| App framework | **Expo SDK 52** (React Native + RN Web) | One TypeScript codebase → iOS + Android + Web |
| Language | TypeScript | Type safety, great in VS Code |
| State | Zustand + AsyncStorage | Tiny, local-first |
| Web hosting | **AWS S3 + CloudFront** | Static export of Expo web |
| Web payment | **Mollie Payments** (one-time) | You already have an account; cheaper UK fees than Stripe (~1.8% + 18p), hosted checkout |
| Backend | **AWS Lambda + API Gateway** (Node 20) | Only needed for Stripe webhook + licence lookup |
| Database | **AWS RDS Postgres** (smallest tier, db.t4g.micro) | You'll manage in TablePlus |
| Mobile distribution | Apple App Store + Google Play (paid app, £4.99) | No IAP complexity needed |
| Builds | **EAS Build** (Expo's cloud build service) | Avoid keeping Xcode/Android Studio in sync |

**Data we collect:** essentially nothing.
- Mobile: zero. Apple/Google handle the payment. Questions ship inside the app.
- Web: email + a licence key (so users can re-log-in after paying). One Postgres row per buyer.

---

## 3. Database schema (TablePlus → RDS Postgres)

One table. That's it.

```sql
CREATE TABLE licences (
  id              BIGSERIAL PRIMARY KEY,
  licence_key     TEXT NOT NULL UNIQUE,           -- e.g. ECS-NIA-XXXX-XXXX-XXXX
  email           TEXT NOT NULL,
  mollie_payment  TEXT NOT NULL UNIQUE,           -- Mollie payment id, used for webhook idempotency
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_seen_at    TIMESTAMPTZ
);
CREATE INDEX idx_licences_email ON licences (lower(email));
```

That's the entire backend data model.

---

## 4. AWS resources you'll create later (don't do this yet)

- **S3 bucket** `ecs-nia-web-prod` — static site
- **CloudFront** distribution in front of the S3 bucket (custom domain, HTTPS)
- **RDS Postgres** — `db.t4g.micro` in a single AZ (cheapest), public access locked to your IP + Lambda SG
- **Lambda functions**: `mollie-webhook`, `verify-licence`
- **API Gateway** HTTP API in front of Lambda
- **Route 53** for your domain (or whatever registrar you use)
- **Secrets Manager** for Stripe secret + DB password

Estimated AWS monthly cost while small: **£15–25/month** (RDS micro is the big one).

---

## 5. Costs to launch

| Item | Cost |
|---|---|
| Apple Developer Program | $99/year (~£78) |
| Google Play Console | $25 one-time |
| Domain (.com or .co.uk) | ~£10/year |
| AWS (small) | ~£20/month |
| Mollie fees | ~1.8% + 18p per UK card transaction |
| EAS Build (free tier is enough at start) | £0 |
| **Total to first launch** | **~£113 + ~£20/month** |

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
- Mock exam mode (50 random Qs, 30-min timer, pass = 35/50 or whatever ECS uses).
- Wrong-answer review.
- Progress stored in AsyncStorage (no backend).

**Phase 3 — Polish & web build.**
- Dark mode, icons, splash screen.
- `npx expo export -p web` → upload to S3 bucket behind CloudFront.

**Phase 4 — Web payment.**
- Add a landing page (free preview of 5 questions).
- Mollie Checkout button → Lambda webhook → write row to `licences` → email key (via AWS SES).
- Licence-key gate on the web app.

**Phase 5 — Store submission.**
- Apple Developer account, App Store Connect entry, EAS build → submit.
- Google Play Console, EAS build → internal testing → production.

**Phase 6 — Post-launch.**
- ASO (app store optimisation): titles like "ECS Network Infrastructure Test Prep".
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

### 7e. AWS CLI (install before Phase 4)

```bash
brew install awscli
aws configure                                 # paste your IAM access key/secret
```

Mollie has no CLI — we'll use their Node SDK (`@mollie/api-client`) inside the Lambda and test webhooks with `ngrok` or by deploying to a dev Lambda. Install ngrok now if you want local webhook testing:

```bash
brew install --cask ngrok
```

You already have **TablePlus** — connect it to your RDS instance once Phase 4 starts.

---

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
- **Required disclaimer** on the landing page, in the app's About screen, and in the App Store description:
  > *This app is an independent study aid. It is not affiliated with, endorsed by, or sponsored by The JIB or the Electrotechnical Certification Scheme (ECS). "ECS" is a trademark of The JIB.*

### 9c. UK GDPR + Data Protection Act 2018

Because you're collecting almost nothing, you're in great shape — but you still need the paperwork.

**What you must do:**
- **Privacy Policy** — a public URL linked from the app, the store listing, and the website. It must list: data collected (email, licence key, IP via CloudFront logs), purpose (delivering the licence and customer support), lawful basis (contract under Art. 6(1)(b)), retention (e.g. 7 years for tax records, then delete), data subject rights, your contact email, and any processors (AWS, Mollie).
- **Cookie banner on the website** — only if you set non-essential cookies. If you only set a session cookie for the licence-key login, no banner needed; just mention it in the policy.
- **No tracking SDKs without consent** — skip Google Analytics, Facebook Pixel, etc. on launch. If you later want analytics, use **Plausible** or **Simple Analytics** (cookieless, GDPR-compliant by design) or self-hosted Umami.
- **ICO registration** — as a UK data controller you're legally required to register with the ICO and pay the data protection fee (£40–£60/year for most small businesses). Register at https://ico.org.uk/for-organisations/data-protection-fee/.
- **Records of processing (ROPA)** — a simple internal document. Template on the ICO website.
- **Data Processing Agreement** — Mollie and AWS publish standard DPAs; you accept them when signing up.
- **Subject Access Request process** — set up a `privacy@yourdomain` mailbox and a one-page internal procedure to respond within 30 days.
- **Breach notification** — if data is breached, you have 72 hours to notify the ICO. Plan for it.

### 9d. App Store & Play Store privacy declarations

Both stores require you to declare what data you collect, even if it's "none".

- **Apple App Privacy** (App Store Connect → App Privacy) — for the mobile apps, declare "Data Not Collected". For the web version (separate concern), it doesn't apply.
- **Google Play Data Safety** (Play Console → App content → Data safety) — same: declare no data collection for the mobile app.
- **Age rating** — choose 4+ / Everyone. No mature content.
- **EULA / Terms of Use** — Apple has a default EULA you can use, or write your own. Required on both stores.

### 9e. Consumer protection (UK + EU)

You're selling a digital product to UK and likely EU consumers.

- **Right of withdrawal** — for digital goods you can disable this *only if* the consumer expressly waives it and acknowledges they lose the right when the download starts. Add a checkbox on Mollie checkout: *"I agree to immediate access and waive my 14-day cancellation right."*
- **VAT** — UK threshold is £90,000/year (2026). Below that, no VAT registration needed; above, you must charge VAT. For EU consumer sales there's a **separate £0 threshold** under the EU VAT scheme; either register for VAT OSS (One-Stop Shop) once you sell into the EU, or use a merchant of record like Paddle / Lemon Squeezy that handles VAT for you. **For launch: either restrict sales to UK only, or use Paddle as merchant of record instead of direct Mollie — they take ~5% but absorb all VAT obligations.** Worth discussing.
- **Refund policy** — publish a clear refund policy on the website. For a £4.99 study aid, "no refunds after assessment is taken / question bank accessed" is reasonable.

### 9f. Quick checklist before launch

```
[ ] Question bank rewritten from scratch (or JIB licence in writing)
[ ] App name does not contain "ECS"
[ ] Disclaimer placed in app About screen, store listing, and website footer
[ ] Privacy policy URL live
[ ] Terms / EULA URL live
[ ] Refund policy URL live
[ ] ICO registration paid (~£40)
[ ] Apple App Privacy declaration submitted
[ ] Google Play Data Safety form completed
[ ] Mollie DPA and AWS DPA on file
[ ] VAT route decided (UK-only sales OR Paddle OR VAT OSS)
[ ] Mollie checkout includes consumer waiver checkbox
```

I'll generate draft Privacy Policy, Terms, Refund Policy, and Disclaimer documents for you when we hit Phase 4 — they're boilerplate-able once we know the company name and contact email.

---

## 10. After Phase 0

Reply with "setup done" and I'll start Phase 1: scaffolding the real project and parsing the 145-question PDF into a typed JSON the app can use. We'll do it in small commits so you can see each piece working before we move on.
