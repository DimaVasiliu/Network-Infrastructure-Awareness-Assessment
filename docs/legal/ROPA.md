# Record of Processing Activities (ROPA)

Internal record kept under **Article 30, UK GDPR**. Not published. Show to the
ICO on request. Review at least annually and whenever processing changes.

- **Controller:** Dumitru Vasiliu (sole trader, operating the TimrX portfolio)
- **Contact:** support@timrx.live
- **Postal address:** 39 Spearpoint Gardens, Aldborough Road North, Ilford, Essex, IG2 7SX, United Kingdom
- **ICO registration number:** _registration in progress; add once issued_
- **DPO:** Not required (small-scale processing; no large-scale or special-category data). Controller is the contact point.
- **Last reviewed:** 2026-05-31
- **Next review due:** 2027-05-31

---

## Activity 1 — Support correspondence

| Field | Detail |
|---|---|
| Purpose of processing | Responding to user enquiries, refund/billing questions, bug reports and feedback |
| Lawful basis | Legitimate interests (responding to a user who contacts us) and, where the message concerns a purchase, performance of a contract |
| Categories of data subjects | App users (and prospective users) who email support |
| Categories of personal data | Email address; any personal data the user chooses to include in the free-text message |
| Special category data | None requested. If a user volunteers any, it is not used and is deleted on closure of the query |
| Recipients / processors | **Neo.Space** (inbound mailbox for `support@timrx.live`); **AWS SES**, eu-west-2 / London (outbound replies) |
| Transfers outside the UK | Mail may be processed in the UK and the EU. Safeguard: UK adequacy regulations and/or the UK International Data Transfer Addendum to the EU SCCs |
| Retention period | 24 months from the last message in a thread, then deleted |
| Technical & organisational measures | TLS in transit; access limited to the controller; strong unique password via a password manager; 2FA on the email account |

## Activity 2 — Crash & error diagnostics

| Field | Detail |
|---|---|
| Purpose of processing | Detecting and fixing crashes and faults to keep the App stable |
| Lawful basis | Legitimate interests (Art. 6(1)(f) UK GDPR) — improving app reliability for all users. Data is minimised (no user ID, no IP) and users can opt out via the "Send anonymous crash reports" toggle in About |
| Categories of data subjects | Users who leave crash reporting enabled |
| Categories of personal data | Crash logs: device model, OS version, app version, stack traces. No user ID, no account ID, no IP address linkage |
| Special category data | None |
| Recipients / processors | **Sentry** (Functional Software, Inc.) — DPA accepted 2026-05-30, archived at `docs/legal/SENTRY_DPA.md` |
| Transfers outside the UK | Sentry EU region (Frankfurt). Safeguard: Sentry DPA incorporating the EU SCCs + UK IDTA |
| Retention period | Per Sentry's default event retention (~90 days), then deleted |
| Technical & organisational measures | TLS in transit; performance tracing disabled (`tracesSampleRate = 0`); no PII linkage; opt-out in-app |

## Note — on-device data (not controller-processed)

Learning progress, scores, bookmarks and stats are stored **only on the user's
device**. The controller has no access to this data and does not process it, so
it falls outside this ROPA. It is removed when the user clears progress or
uninstalls the App.

---

## Data subject rights

Requests (access, rectification, erasure, restriction, portability, objection)
are handled via support@timrx.live and answered within one month. Individuals
may complain to the ICO (ico.org.uk).
