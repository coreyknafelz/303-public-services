# Product Brief: ClearCase — Benefits Application Status & Document Portal

**Program:** Fictional Public Benefits Program (template-ready for SNAP, Medicaid, housing assistance, or general assistance contexts)
**Format:** Mobile-first responsive web experience
**Audience:** Benefits applicants, age 18+, using a personal or shared smartphone
**Deliverable type:** Interactive data story / prototype
**Version:** 1.1 — Prototype implementation update

### Current prototype status

The prototype is implemented as a root-level Vite/Vue application and is deployed at [303-public-services.vercel.app](https://303-public-services.vercel.app/). The current build includes the core entry, status, checklist, upload, confirmation, and help flows; English and Spanish locale bundles; accessible core workflow controls; a fixed authenticated bottom navigation bar; and Vercel SPA route rewrites.

The app uses Rosa's fixture data and simulated authentication, upload, SMS opt-in, and callback behavior. It is not connected to a production benefits system.

---

## 1. The Story We're Telling

Every year, millions of people apply for public benefits — food assistance, healthcare coverage, rental support, childcare subsidies — and then wait. They wait in silence, with no meaningful visibility into what is happening with their case. When they need an update, most must call an overloaded office, stay on hold, and hope to reach someone who can pull up their file.

The gap between applying and receiving is not just logistical. It is a source of profound anxiety. For a family deciding whether to buy groceries or pay the utility bill, not knowing whether their application is approved — or held up because of a missing utility bill scan — means making decisions in the dark.

This product tells the story of that gap and what closing it looks like. The interactive experience is built around a single fictional applicant navigating a fictional benefits portal, **ClearCase**, that gives them what they actually need: clarity on where their case stands, exactly what's missing, and a simple path to resolve it — all from their phone, in under five minutes, without calling anyone.

The product is not just a UI prototype. It is a data story about the cost of opacity in government services and the human impact of even modest improvements in communication.

---

## 2. Background & Context

### 2.1 The Problem at Scale

In a typical large state or county benefits system:

- **30–45% of applications** are delayed not because of eligibility issues, but because of missing or unreadable documentation.
- **The average applicant calls a benefits office 2–3 times** during the review period before receiving a decision.
- **Average hold times** at benefits offices range from 25 to 55 minutes during peak periods (first of month, post-holiday, open enrollment seasons).
- Many applicants have limited English proficiency, disabilities affecting phone use, or work schedules that make daytime calls effectively impossible.
- **Document submission** — the most common sticking point — is still handled in most jurisdictions by fax, mail, or in-person drop-off. Only a minority of portals offer mobile-friendly upload.

The result: a system where the burden of navigating bureaucratic friction lands almost entirely on the person with the least bandwidth to absorb it.

### 2.2 The Fictional Program: ClearCase

For this prototype, we anchor the experience in a fictional unified benefits portal called **ClearCase**, administered by the fictional **Meridian County Department of Human Services**. ClearCase covers:

- **NourishNow** — a food and nutrition assistance program (analogous to SNAP/EBT)
- **CoverAll Health** — a low-income health coverage program (analogous to Medicaid/CHIP)
- **StableHome** — an emergency rental assistance program

A single applicant may be applying for one or more of these simultaneously. The case code and status portal is unified across programs, so a family doesn't have to track three separate application threads.

### 2.3 Our Fictional Applicant: Rosa

To ground the design, we write to a specific person.

**Rosa** is 34, lives in a two-bedroom apartment with her two children (ages 6 and 9). She recently left a restaurant job when her childcare arrangement fell through and is reapplying for NourishNow and CoverAll Health simultaneously. She has a prepaid Android phone with limited storage, uses mobile data (not home Wi-Fi), and has moderate comfort with apps — she uses a grocery store app and receives school notifications through a parent portal. She does not have a printer at home. Her primary language is Spanish, though she reads and navigates English-language apps.

Rosa submitted her application 11 days ago. She hasn't heard anything. She has tried calling once and abandoned the hold queue after 22 minutes. Tonight she scans a QR code from a letter she received and lands on ClearCase.

**Her goal in this session:** Find out if anything is wrong, and if so, fix it without having to call.

---

## 3. Experience Design Goals

### 3.1 Primary Goals

1. **Reduce anxiety through radical clarity.** The status view must tell Rosa — immediately, in plain language — whether her case is on track, held up, or needs her action. No jargon. No ambiguity.

2. **Make the path to resolution obvious.** If something is missing, the next step must be a button, not a phone number.

3. **Work on the phone she actually has.** The experience must load and function on a low-end Android device, on a slow 4G connection, with partial JavaScript support and limited storage. Performance is a feature.

4. **Earn trust through tone.** Government services have a history of making applicants feel suspected. Every piece of copy in this experience should treat Rosa as a capable adult navigating a complicated system, not as a case to be managed.

### 3.2 Secondary Goals

- Support low-bandwidth graceful degradation
- Enable save-and-resume for multi-document upload sessions
- Offer Spanish/English language toggle (with at minimum the core flows translated)
- Provide a clear path to live help if the self-service flow fails

---

## 4. Core Flows

### Flow 1: Entry — Sign In or Case Code

Rosa arrives via QR code from her mailed notice. The entry screen should:

- Accept a **secure case code** (format: 3-letter program prefix + 6-digit number, e.g. `NNW-482931`) without requiring account creation
- Offer an **alternative: sign in with existing account** (email + password, or magic link)
- Explain briefly what the code is and where to find it
- Not require Rosa to know or remember anything she wasn't explicitly given

**Edge cases to design:**
- Expired or invalid case code (expired after 30 days)
- Wrong program prefix (entered NNW code on a CoverAll case)
- Partial sign-in failure (magic link expired)

### Flow 2: Application Status Overview

The status screen is the emotional center of the experience. It must accomplish, in one scroll:

- **Program(s) applied for** and their individual statuses
- **Overall case health** — a clear, prominent signal (on track / action needed / decision reached)
- **Timeline** — when application was submitted, where it is in review, expected decision window
- **Key contacts** — assigned caseworker name, not just a phone number

**Status states to design:**
- `Received` — application submitted, not yet in review
- `In Review` — caseworker assigned, documents verified
- `Action Needed` — missing documents or information blocking review
- `Decision Pending` — review complete, awaiting final approval
- `Approved` — with next steps (how benefits are delivered, when)
- `Denied` — with appeal pathway clearly presented
- `On Hold` — with reason and expected resolution date

### Flow 3: Missing Information / Requirements Checklist

When a case has status `Action Needed`, Rosa needs to see:

- **Exactly which documents are missing** (not "please provide proof of income" — "please upload your most recent pay stub or a benefits award letter")
- **Why each item is needed** (one sentence, plain language)
- **Deadline** — when this document must be received to avoid delay or denial
- **Format guidance** — what file types are accepted, how to take a legible photo with a phone

Each requirement item is tappable and leads directly to the upload flow for that item.

### Flow 4: Document Upload

The upload screen is the most technically sensitive flow. Design considerations:

- **Camera-first** — the primary action should be "Take a photo," not "Select file," given mobile context
- **Preview before submit** — Rosa must be able to see the photo she took and confirm it's legible before uploading
- **Quality check** — a simple brightness/contrast check with a human-readable result: "This photo looks clear" / "This photo may be hard to read — try again in better light"
- **Retry without penalty** — Rosa should be able to retake as many times as needed without losing her session
- **File size management** — compression on-device before upload; show progress; handle timeouts gracefully

**Upload states to design:**
- Idle (ready to capture or select)
- Camera active / capture in progress
- Preview with confirm / retake options
- Quality check in progress
- Upload in progress (with % indicator on slow connections)
- Upload success
- Upload failure — with specific reason and recovery action (not "an error occurred")

### Flow 5: Confirmation & Next Steps

After successful upload:

- **Confirm what was submitted** (document type, timestamp, case it was attached to)
- **Set expectations** — "Your caseworker will review this within 3 business days. You do not need to call."
- **Offer notification opt-in** — "Text me when my status changes" (SMS, not app notification)
- **Breadcrumb back to case** — don't strand Rosa on a success screen with nowhere to go

### Flow 6: Help / Escalation

Accessible from every screen via a persistent but non-intrusive entry point:

- **FAQ for the most common moments of confusion** (where is my case code, what counts as proof of address, what happens if I miss the deadline)
- **Call back request** — "I'd rather talk to someone. Request a callback." (avoids making Rosa sit on hold)
- **Office locator** — nearest in-person drop-off location with hours
- **Language assistance line** — prominently surfaced when language toggle is set to Spanish

---

## 5. Key Screens

| Screen | Primary Job | Key Components |
|---|---|---|
| Entry / Sign In | Trust, access | Case code input, sign-in alt, program logo |
| Status Overview | Reduce anxiety | Status badge, program cards, timeline, caseworker |
| Requirements Checklist | Clarity on what's needed | Document list, deadlines, urgency indicators |
| Upload | Capture and submit | Camera trigger, preview, quality check, progress |
| Confirmation | Close the loop | Summary, next steps, SMS opt-in |
| Help | Catch the cases that fall through | FAQ, callback request, office locator |

---

## 6. Visual & Interaction Design Direction

### Tone

This is a civic product for people under stress. The visual design should feel:

- **Calm and organized** — not clinical or cold
- **Direct** — information hierarchy is ruthless; the most important thing is always the biggest thing on screen
- **Human** — not a sterile government portal; warm enough to signal that there's a person reviewing this case

Avoid: dark patterns, unnecessary animation, decorative complexity, small touch targets, error states that blame the user.

### Design Language Principles

- **Progressive disclosure** — show only what's needed for the current moment; additional detail is available on tap, not piled on the overview screen
- **Status-first layout** — every screen has one dominant status signal; supporting information is secondary
- **Accessibility floor** — WCAG AA as minimum; tap targets minimum 44×44px; avoid color as the sole status signal; support system font size preferences

### Color

Status colors must be immediately legible and not rely solely on hue:

- `Action Needed` — amber + warning icon + bold label
- `On Track` — teal/green + checkmark icon
- `Decision Reached` — neutral blue + distinct icon

Background: near-white with very slight warm tint. Not pure white (too harsh on screens in variable light). Not cream (reads as decorative, not civic).

### Typography

Single typeface family, variable weight. Body text minimum 16px. Labels in sentence case. No all-caps. Generous line spacing (1.6) for readability on small screens at arm's length.

---

## 7. Stretch Goals

These are explicitly out of scope for the initial prototype but should be architecturally anticipated:

| Goal | Description | Priority |
|---|---|---|
| Low-bandwidth state | Detect slow connection; serve text-only status; defer images | High |
| Save-and-resume | Preserve upload session if interrupted; pick up where Rosa left off | High |
| Multilingual toggle | EN / ES at minimum; interface for adding additional languages | Medium |
| Upload error recovery | Specific error messages + recovery paths for each failure type | High |
| SMS status updates | Two-way opt-in to receive case status notifications via text | Medium |
| Offline cache | Cache status view for offline reading (no upload while offline) | Low |
| Accessibility audit | Full screen reader pass, keyboard navigation, reduced motion | Medium |

---

## 8. Data Context (Future)

The product brief reserves a future data-context layer to help viewers understand the systemic problem alongside Rosa's individual experience. It is not part of the current user interface.

**Possible future data callouts:**

- On the status screen: *"In Meridian County, 1 in 3 applications is delayed for missing documents. Yours is one of them."*
- On the requirements checklist: *"The average applicant takes 6 days to respond to a document request. Responding tonight keeps your case on schedule."*
- On confirmation: *"Cases where documents are submitted via the portal are processed 40% faster than those submitted by mail or fax."*
- On the help screen: *"Last month, 12,000 calls to the Meridian County benefits line went unanswered. This portal is an alternative."*

Any future contextual layer should be designed separately from the core case workflow and should remain optional.

---

## 9. Prototype Scope & Fidelity

| Dimension | Decision |
|---|---|
| Fidelity | High-fidelity, interactive (not static mockups) |
| Data | Fictional but realistic; hardcoded for Rosa's case |
| Interactivity | All primary flows fully navigable; edge cases indicated but not necessarily fully built |
| Device target | Mobile viewport (375px–430px); test on Chrome DevTools mobile emulation |
| Upload simulation | Simulate upload with progress bar + artificial delay; no actual file storage required |
| Language toggle | Functional EN/ES toggle on at least the Status and Checklist screens |

---

## 10. Success Criteria

The prototype succeeds if a viewer can:

1. Understand Rosa's situation and what's blocking her case within 10 seconds of landing on the status screen
2. Navigate from status → checklist → upload → confirmation without instruction
3. Feel, through copy and visual design, that the system is working *with* Rosa, not against her
4. Come away with a clear sense of the systemic stakes — what this portal does to the 30–45% of applicants whose cases stall on missing documents

---

## 11. Open Questions

- Should the case code entry support QR scan-to-fill (camera permission) or manual entry only?
- Is a future data-context layer needed, and where should it live without adding complexity to the core workflow?
- What is the handoff format: Figma annotations, a live hosted URL, or an exportable HTML/React component?
- Should the experience include a caseworker-side view (showing what the uploaded documents look like in review)?
- For the multilingual stretch goal: do we use real Spanish translations or placeholder language tagging?

---

*Brief version 1.0 — ready for design kickoff and stakeholder review.*
*Last updated: September 2026*
