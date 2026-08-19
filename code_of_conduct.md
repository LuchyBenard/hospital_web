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
- A scaffolded Next.js app at the repo root (no `project/` subfolder) per
  documentation.md section 4.1: App Router, plain JavaScript (`.js`/`.jsx`),
  plain hand-written CSS (no Tailwind), zod, Firebase client stub (disabled
  without env), mock auth context, full public + protected routing shell, and
  dummy-data API route handlers. All pages and routes render dummy data so it
  runs end to end.
- Backend authority assumes Firebase-first. Design authority is industry-driven.
- Deps installed (npm install succeeded after network `ECONNRESET` retries; the
  corrupt `@next/swc` binary was refetched). `npm run build` passes (17 routes)
  and `npm run lint` is clean. Run `npm run dev` to use it.

## 6. Work log

Newest entry at the top. One entry per commit, a few lines.

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
- The audit prompt and expected output live in security.md; an audit updates
  its state so the next audit resumes where the last one stopped.
