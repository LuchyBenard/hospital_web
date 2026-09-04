# Code of Conduct

Live project state and work history. This file is the **graph**: it lets any
AI tool (or human) onboard by reading one file instead of the whole project.
It is the first thing a new session reads after
[AGENTS.md](AGENTS.md), and it is the record of everything that happened
before.

**Read it at session start. Update it before every commit.**

## 1. What this file is for

When work happens, this file is rewritten to reflect it. Every commit leaves
a trail here, so the project's history is always readable from a single
place. That means:

- A **new model** gets up to speed in seconds, not by scanning the repo.
- A **long pause** is not a problem; the state is on disk, not in a chat.
- **You** can see at a glance what the project is, what was decided, and where
  it stopped.

This file is the contract between every session. Keep it current or the next
session starts blind.

## 2. When and how to update

- **Before every commit.** The update happens before `git commit`, so the
  commit and the graph land together.
- **At session start**, read it and work from the state it describes.
- **Keep it short but complete.** Newest entries at the top of each log.
  One entry per commit, a few lines: what changed, why, what is next.

The update checklist before any commit:

1. Did the work change any files? Add the entry to the **work log**.
2. Did the work settle a rule? Add it to the **decisions log**.
3. Did the build state move? Update the **current build state**.
4. Does the file map need a new path? Update the map.

## 3. File and folder map

Where things live and what each file is for:

| Path                                                  | Role                                               |
| ----------------------------------------------------- | -------------------------------------------------- |
| [AGENTS.md](AGENTS.md)                                | Rule hierarchy, domain map, non-negotiable rules   |
| [README.md](README.md)                                | User-facing explanation of the product             |
| [documentation.md](documentation.md)                  | Dev doc: structure, stack, dependencies            |
| [code_of_conduct.md](code_of_conduct.md)              | This file. State graph, work history               |
| [security.md](security.md)                            | Audit runbook + where the last audit stopped       |
| [skills/frontend-design.md](skills/frontend-design.md) | Visual/UI authority                                |
| [skills/backend.md](skills/backend.md)                | Server/data authority, free-tier-first             |
| [firestore.rules](firestore.rules)                    | Firestore security rules (owner-scoped, default deny) |
| [next.config.js](next.config.js)                      | App config + security headers / CSP                |

## 4. How this project runs

Principles that stay fixed:

- **AGENTS.md rules bind everything else.** Skills defer to it; it defers to
  them only inside their domain.
- **Design comes from the design skill**, never from default AI aesthetics.
  No purple gradients, no glassmorphism by default, no emojis as icons, no
  em-dash copy.
- **Backend is free-tier-first.** Firebase, MongoDB, rarely Supabase. No
  Cloud/Edge Functions. Client-direct reads/writes with rules/RLS doing the
  enforcement. Every read and write is designed to stay inside free quota.
- **Shorter sessions beat exhaustive ones.** New models read the map above,
  not the entire repo. That is why this file exists.
- **No em dashes anywhere in this collection.** Short, concrete, opinionated.

## 5. Current build state

What exists now (self-contained, dependencies available):

- The instruction collection (AGENTS.md, this file, documentation.md,
  README.md, security.md, two skills).
- Complete **Providence General Hospital Web Portal & Patient Portal** at the
  repo root per constants.js metadata: App Router, plain JavaScript (`.js`/`.jsx`),
  hand-written healthcare CSS utility layer in `app/globals.css`, full public pages
  (`/`, `/departments`, `/departments/[slug]`, `/doctors`, `/doctors/[id]`,
  `/services`, `/appointments`, `/emergency`, `/contact`, `/pricing`, `/about`),
  secure patient portal (`/dashboard`, `/dashboard/appointments`, `/dashboard/records`,
  `/dashboard/prescriptions`, `/profile`, `/settings`), mock auth context with
  demo patient login, and REST API route handlers (`/api/departments`,
  `/api/doctors`, `/api/appointments`, `/api/records`, `/api/prescriptions`).
- Design adheres to skills/frontend-design.md. **Palette v2 (user-directed):
  heritage clinical blue** `--color-accent #1e56a0` on deep navy ink
  `#0e2038`, porcelain surfaces; crimson strictly semantic for emergency.
  Brand PNGs and logo.svg regenerated in the blue.
- **Imagery system**: flat vector illustrations in `public/images/`
  (`hero-facility.svg`, `portal-care.svg`, `emergency-response.svg`) wired via
  next/image into the home hero, portal CTA banner, emergency banner, and the
  new split-screen `(auth)` layout. Department cards use a real icon set keyed
  off `constants.icon` (`components/hospital/department-icon.jsx`). Doctor
  cards/profiles show duotone initials avatars (`doctor-avatar.jsx`) until
  real portraits ship. Added dark-panel utilities (`bg-fg`, `text-white`,
  `text-onDark*`, `border-onDark`); fixed pre-existing broken `text-white`
  CTAs that had no backing class.
- **Tier 1 standard-website layer complete**: brand assets (`app/icon.png`,
  `app/apple-icon.png`, `app/favicon.ico`, `app/opengraph-image.png`,
  `public/logo.svg`), `robots.js`, `sitemap.js`, `not-found.jsx`, `error.jsx`,
  root + portal `loading.jsx` skeletons, full root metadata (metadataBase,
  title template `%s | Providence Health`, OG/Twitter cards, viewport/themeColor),
  and real fonts via next/font (Source Sans 3 body, Lora display) wired through
  the `--font-sans` / `--font-display` tokens. Metadata-carrying server layouts
  added for the four client pages (/doctors, /services, /contact, /appointments).
  Fixed an RSC violation on `/resources` (onClick from a server page) with a
  client island (`components/hospital/download-button.jsx`).
- Verified: `npm run build` passes with all routes static (route table includes
  /robots.txt, /sitemap.xml, /icon.png, /apple-icon.png, /opengraph-image.png);
  `npm run lint` is clean with zero warnings or errors. Site URL override lives
  in `NEXT_PUBLIC_SITE_URL`.

## 6. Work log

Newest entry at the top. One entry per commit, a few lines.

- **2026-09-03 (cleanup)**: final code cleaning. Removed the dead `app/api/auth/*`
  routes (login/signup/logout) that returned `dummy-token` and were never called
  by the client (auth is client-side via Firebase SDK / mock), plus their empty
  `app/api/auth/` dir. Removed unused `downloadUrl: "#"` fields from the three
  `demoRecords` in `constants.js` (never referenced by any component). Left the
  documented data/health REST routes in place (they back the documented dummy
  API contract and demonstrate the client-direct architecture). Verified: `npm
  run lint` clean, `npm run build` green (62 routes, down from 65).

- **2026-09-03**: wired real Firebase Auth (portal security) while keeping the
  dummy-data demo intact. `lib/auth.js` now uses the Firebase Auth client SDK
  (signInWithEmailAndPassword / createUserWithEmailAndPassword / signOut) behind
  the `firebaseEnabled` flag, with a graceful demo fallback (any creds log in as
  demo Ada Quinn) when Firebase env is blank. `contexts/auth-context.jsx` now
  subscribes to `onAuthStateChanged` in real mode (localStorage session in demo
  mode). Added `firestore.rules`: default deny with owner-scoped `users/{uid}/*`
  reads/writes, public read-only for departments/doctors/services, anonymous
  inquiry create, staff write dropped until an admin role exists. Rewrote the
  `.env.local` header as a step-by-step wiring guide (still blank = demo mode).
  NOTE: real Firestore per-user data loading in portal pages is NOT yet built;
  pages still read in-memory demo stores. In real mode a fresh account currently
  sees an empty portal (demo data is keyed to patient-001, not the Firebase uid),
  so nothing leaks across users; full async Firestore reads/writes are deferred
  until credentials are available to test. Verified: `npm run lint` clean, `npm
  run build` green (65 routes).

- **2026-09-01**: 5 custom hospital features. Built interactive Campus Map &
  Indoor Wayfinder (`/campus-map`); created Secure Patient-Doctor Clinical
  Messaging Inbox (`/dashboard/messages`) with attachments & HIPAA sessions;
  built Emergency Triage & Symptom Decision Engine (`/symptom-checker`); built
  Public Procedure Cost & Insurance Estimator (`/pricing/estimator`) and Patient
  Invoices & Billing Simulator (`/dashboard/billing`); and created Instant Global
  Search Modal with keyboard shortcuts (`Cmd+K`). Verified: `npm run lint` clean,
  `npm run build` compiled 65 routes green.

- **2026-08-31**: patient workflow enhancements & staff portal. Cleaned up
  legacy post files. Added interactive appointment rescheduling modal + calendar
  export (.ics); added 4-stage visual prescription refill progress stepper on
  `/dashboard/prescriptions`; created interactive Virtual Telehealth Video
  Consultation Room (`/dashboard/telehealth`); added printable official hospital
  letterhead on `/dashboard/records`; and built Physician & Staff Workstation
  (`/staff`) with daily patient queue charting and refill authorizations.
  Verified: `npm run lint` clean, `npm run build` compiled 60 routes green.

- **2026-08-30**: rewritten `README.md` to fully document the Providence General
  Hospital web portal and patient portal, architecture, directory structure,
  feature breakdown, setup commands, scripts, and demo credentials. Streamlined
  public navigation in `constants.js` and `components/layout/navbar.jsx` to
  the cleaner standard layout (`Home`, `About`, `Services`, `Departments`,
  `Doctors`, `Resources`, `Contact` + standout `Book Appointment` CTA button)
  and created `app/resources/page.jsx`. Verified: `npm run lint` is clean.

- **2026-08-25 (d)**: real `/contact` submission + security headers. Contact
  form now POSTs to `app/api/contact/route.js`: zod validation (422), simple
  in-memory per-IP rate limit (429, 5/15min), honest error contract via
  lib/api.js, and persistence through `lib/models/inquiries.js` (Firestore when
  configured, else an labeled in-memory store). Client shows real server
  errors and a sending state instead of a fake success. Added security headers
  in next.config.js (CSP baseline incl. Firebase origins, X-Frame-Options,
  nosniff, Referrer-Policy, Permissions-Policy, HSTS). Verified: lint clean,
  build green (/api/contact present in route table).

- **2026-08-25 (c)**: legal pages + structured data. Added four routes under
  `app/legal/` (index, privacy, terms, accessibility) sharing a
  `components/legal/legal-page.jsx` shell with section headers and cross-links;
  content written in the design-skill human voice with HIPAA-informed privacy
  sections. Added `legalNav` to constants, linked into the footer bottom bar,
  and added the legal URLs to sitemap. Added `components/seo/hospital-schema.jsx`
  emitting JSON-LD `Hospital` schema (address, geo, hours, department
  specialties/members) injected into the root layout head. `legalNav` replaces
  the coding-practice employee-legal links in the footer. Verified: lint clean,
  build green (58 routes incl. 4 legal).

- **2026-08-25 (b)**: light/dark mode + motion pass. Token-level dark theme
  under `html[data-theme="dark"]` (navy family, never pure black; accents lift
  to #6ea3ee, solid fills flip to dark ink foreground, semantic washes become
  translucent tints, body line-height bumped). Hand-rolled ThemeProvider +
  pre-paint boot script in layout head (no flash), `suppressHydrationWarning`
  on html; toggle lives in navbar (public), sidebar footer + bottom-nav
  (portal). Shadows tokenized via --shadow-color. Fixed dead classes:
  animate-pulse/animate-ping now defined, bg-surface/95 replaced with real
  bg-surface-95 utility (sticky header was rendering transparent).
  Motion per skills/frontend-design.md: hero entrance stagger (.anim-in),
  one-shot IntersectionObserver scroll reveals (components/ui/reveal.jsx) on
  home sections with staggered cards, .lift card hover, .press button
  feedback, modal backdrop/panel entrance animations; all disabled under
  prefers-reduced-motion. Verified: lint clean, full build green (54 routes).
- **2026-08-25**: visual overhaul per user feedback ("too plain, wrong
  color"). Replaced teal with heritage clinical blue tokens (#1e56a0 accent,
  #0e2038 ink); recolored themeColor, logo.svg, and regenerated icon/apple/
  OG/favicon PNGs. Built an imagery system: three palette-bound SVG
  illustrations (facility campus, portal records+shield, ambulance) integrated
  into home hero, portal CTA, emergency banner, and a redesigned split-screen
  auth layout with trust points. Department cards gained per-specialty icons
  (heart/brain/baby/bone/ribbon/female/ambulance/scan) honoring the unused
  `icon` field; doctor cards/profiles gained initials avatars. Added missing
  dark-panel utility classes and fixed `text-white` CTAs that referenced a
  nonexistent class. Verified: lint clean, full production build green.
- **2026-08-23**: Tier 1 standard-website layer: brand assets (favicon.ico,
  icon.png, apple-icon.png, opengraph-image.png, logo.svg), robots.js,
  sitemap.js, not-found/error/loading states, full root metadata
  (metadataBase, title template, OG/Twitter), next/font (Source Sans 3 +
  Lora) wired to tokens, metadata layouts for the four client pages, RSC
  onClick fix on /resources via client island.

- **2026-08-22**: implemented Step Two: Complete Providence General Hospital
  web application and patient portal. Built responsive public portal pages (Home,
  Departments directory + dynamic detail pages, Doctors directory + dynamic
  profiles, Hospital Services, interactive Appointment Booking with Suspense,
  24/7 Emergency & Level I Trauma center, Contact & Inquiries, Pricing &
  Insurance, and Hospital About page). Built full patient portal (Dashboard
  overview with upcoming visit alerts, Appointments manager, Medical Records &
  lab result viewer with modal, Prescriptions & refill requests, Clinical
  demographic Profile, and Communication Settings). Added data-access models and
  API route handlers. Verified: `npm run build` compiles 47 routes and `npm run lint` is clean.

- **2026-08-19**: removed Tailwind per user instruction. Replaced the Tailwind
  dependency/config with a hand-written plain CSS utility layer in
  `app/globals.css` (token-driven, no framework). Moved the app out of the
  `project/` subfolder into the repo root so app and instruction collection
  live together. Confirmed no TypeScript anywhere (plain `.js`/`.jsx`). `npm
  run build` passes (17 routes) and `npm run lint` is clean.
- **2026-08-19**: scaffolded the fullstack Next.js app in `project/` from
  documentation.md section 4.1. JavaScript only, no TypeScript. Created every
  folder/file in the 4.1 tree (plus `lib/utils.js`, `lib/api.js`, and the
  `/about`, `/pricing`,   `/posts/[id]` pages the nav links to). Installed deps
  from section 6 (next, react, react-dom, tailwindcss, clsx, tailwind-merge,
  zod, firebase). Pages and API routes return dummy data; auth is a mock
  context. Design follows skills/frontend-design.md (neutral-first, one teal
  accent, no AI-aesthetic markers). Verified: `npm run build` passes (17
  routes) and `npm run lint` is clean.
- **2026-08-17**: rewrote this file as the state graph with links to every
  other file. Added the commit-time update rule (update before `git commit`,
  four-point checklist). Added "Expected output" contract to security.md and
  the exact audit prompt. Expanded documentation.md with the Next.js case
  study, full app tree, auth context, navigation, API contract, and the
  "setup the app" prompt. lib/ trimmed to firebase.js, auth.js, models/.
- **2026-08-17**: created the guidance collection. Added security.md and wired
  the "update code_of_conduct.md before every commit" rule into AGENTS.md.
  Skills moved to `skills/`. Backend skill rewritten free-tier-first (no Cloud
  Functions, quota-aware read/write design). AGENTS.md links both skills.
- **2026-08-17**: wrote AGENTS.md code of conduct, README, documentation.md,
  and this file. Created frontend-design and backend skills in `skills/`.

## 7. Decisions log

Rules that were decided once and should not be re-litigated:

- Skills live in `skills/`, not `.ai/skills`.
- Backend targets free tiers: no Cloud/Edge Functions.
- Frontend design is industry-derived; AI aesthetics are forbidden.
- Apps are plain JavaScript (`.js`/`.jsx`); no TypeScript.
- `code_of_conduct.md` is updated before every commit, not after.
- Auth is the Firebase Auth client SDK behind the `firebaseEnabled` flag; API
  auth routes are legacy/dummy and not used by the context. Portal data stays in
  in-memory demo stores until Firebase credentials exist; real per-user Firestore
  reads/writes are a deferred task, not a bug.
- The audit prompt and expected output live in security.md; an audit updates
  its state so the next audit resumes where the last one stopped.
