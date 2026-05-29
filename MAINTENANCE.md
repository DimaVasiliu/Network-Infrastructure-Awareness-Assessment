# Maintenance Notes

Short list of housekeeping items that need a human (Finder / Terminal) rather
than code.

## 1. Delete the SDK 56 backup folder

The folder `app-sdk56-backup.PLEASE-DELETE/` is left over from an Expo SDK
migration. Its `node_modules/` is protected by macOS file permissions that
prevent automated cleanup. **Delete it from Finder** (right-click → Move to
Bin) or from Terminal:

```bash
cd ~/Desktop/"Network Infrastructure Awareness Assessment"/Network-Infrastructure-Awareness-Assessment
rm -rf app-sdk56-backup.PLEASE-DELETE
```

After deletion, nothing in the repo references it. The `.gitignore` also
covers it so a stray future copy won't get committed by accident.

## 2. Move (or back up) the ECS PDF if you've copied it back into the repo

The official JIB / ECS assessment PDF must **never** live inside the git repo
(see `reference/README.md`). It currently lives one folder up at:

```
~/Desktop/Network Infrastructure Awareness Assessment/ECS-Network-Infrastructure-Awareness-guide.pdf
```

That path is outside the repo and is fine for personal reference. If you back
the repo up, exclude that file.

## 3. After installing new dev tools, run

```bash
cd app
npm install
npm run lint        # surface any code-quality issues
npm test            # run the question-bank schema tests
npx tsc --noEmit    # type-check
```

All three should pass before any TestFlight / Play Internal release.

## 4. Before each release build

- Increment `version` in `app.json` (semver).
- `eas.json` is configured with `appVersionSource: "remote"` and
  `autoIncrement: true`, so iOS `buildNumber` and Android `versionCode` are
  managed by EAS automatically.
- Make sure the live legal pages match `docs/legal/` — especially after a
  privacy-relevant change such as enabling/disabling Sentry.
