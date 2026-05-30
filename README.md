# Network Infrastructure Trainer

Independent offline study app for the UK Network Infrastructure Awareness Assessment.

This app is not affiliated with, endorsed by or sponsored by The JIB or the
Electrotechnical Certification Scheme. "ECS" is a trademark of The JIB.

## Repository layout

- `app/` — Expo React Native application (iOS + Android).
- `docs/` — planning, compliance and operational documentation.
- `reference/` — local-only reference material (excluded from version control).

## Current state

- **155 original questions** across 9 sections (Product Selection, Containment Systems,
  Cable Laying, Cable Dressing, Fire Regulations, Safe Cable Installation, Personal
  Safety, Other Services, Waste Management).
- **Mock exam** follows the published assessment format: 30 questions, 45-minute
  timer, pass mark 24/30 (80%).
- **Code Decoder** tab — searchable explanations of cable codes, fibre sizes,
  Class EA channel rules, EuroClass ratings and standards like BS EN 50174-2 /
  HD 60364-5-54, with 3 quick-check questions per entry.
- **Privacy-first**: works fully offline; no tracking, no advertising, no
  analytics. Anonymous crash reporting (Sentry) is opt-out via the About screen.
- Live legal documents (Privacy, Terms, Refund, EULA) hosted at
  `https://timrx.live/legal/nia/...`.

## Local development

```bash
cd app
npm install
npx expo start -c
```

## Tooling

```bash
npm run lint        # ESLint + Prettier
npm run typecheck   # tsc --noEmit
npm test            # Jest (question bank schema + utils)
```

## Content rule

The official assessment guide must not be copied into the app. The reference
PDF is used only as a topic map for writing original study questions. See
`docs/CONTENT_COMPLIANCE.md` for details.
