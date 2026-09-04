# Providence General Hospital (Providence Health)

A modern, production-grade fullstack web application and secure patient portal for **Providence General Hospital**, an accredited tertiary medical center and Level I Trauma Hub established in 1984.

Built with **Next.js 14 (App Router)**, React 18, plain JavaScript, token-driven vanilla CSS, and a free-tier-first data access layer adhering to strict healthcare design standards.

---

## Features

### 1. Public Healthcare Portal
- **24/7 Level I Trauma & Emergency Hub (`/emergency`)**: Direct dispatch hotlines for Ambulance & Trauma (`+1 800-555-0911`), Acute Stroke & Chest Pain Triage, Pediatric Emergency Desk, and Poison Control, with ER vs. Urgent Care triage guidelines.
- **Specialty Departments (`/departments`, `/departments/[slug]`)**: 8 clinical specialty centers (Cardiology, Neurology, Pediatrics, Orthopedics, Oncology, Obstetrics & Gynecology, Emergency Medicine, Radiology) with department heads, clinical capabilities, and physician rosters.
- **Doctor Directory (`/doctors`, `/doctors/[id]`)**: Searchable and filterable medical staff directory with specialty filters, qualifications, consultation fees, patient ratings, clinic schedules, and direct appointment booking.
- **Clinical Services (`/services`)**: Inpatient and outpatient clinical capabilities categorized by Critical Care, Diagnostics, Surgical Care, Wellness & Prevention, Outpatient, and 24/7 In-House Pharmacy.
- **Interactive Appointment Booking (`/appointments`)**: Dynamic appointment booking system with department/specialist selection, in-person vs. telehealth consultation formats, time slot picker, and instant booking confirmation.
- **Health & Patient Resources (`/resources`)**: Hospital admission checklists, surgical preparation instructions, diagnostic imaging protocols, downloadable patient registration forms, and clinical FAQs.
- **Insurance & Pricing Transparency (`/pricing`)**: Outpatient consultation fee schedules, accepted commercial insurance networks (BlueCross, Aetna, Cigna, UnitedHealthcare, Medicare), and financial assistance programs.
- **Hospital History & Mission (`/about`)**: 40-year history of clinical excellence, Magnet nursing recognition, JCAHO Gold Seal accreditations, and New York State DOH licensing.
- **Contact & Inquiries (`/contact`)**: Interactive inquiry and feedback form, pavilion location map links, direct department phone extensions, and visiting hours breakdown.
- **Campus Map & Wayfinder (`/campus-map`)**: Interactive hospital campus map for finding departments, entrances, and amenities.
- **Symptom Checker (`/symptom-checker`)**: Emergency triage guidance and symptom decision engine with escalation recommendations.
- **Procedure Cost Estimator (`/pricing/estimator`)**: Public out-of-pocket cost estimates for common procedures by insurance network.

### 2. Confidential Patient Healthcare Portal (`(app)` Protected Routes)
- **Patient Dashboard (`/dashboard`)**: Comprehensive overview for registered patients displaying next upcoming visit alerts, vital clinical badges (Blood Group O+, documented allergies, MRN), recent diagnostic lab results preview, and active prescriptions.
- **Appointments Manager (`/dashboard/appointments`)**: Manage upcoming, past, and completed clinical visits with rescheduling and one-click cancellation.
- **Medical Records & Diagnostics (`/dashboard/records`)**: View verified metabolic & lipid panels, 2D echocardiograms, and MRI reports with clinical summary modals and printable letterhead.
- **Prescriptions & Pharmacy Refills (`/dashboard/prescriptions`)**: Track daily medications, dosage schedules, remaining refills, and submit refill requests with a 4-stage fulfillment tracker.
- **Telehealth Room (`/dashboard/telehealth`)**: Virtual video consultation room for telehealth visits.
- **Secure Messaging (`/dashboard/messages`)**: HIPAA-styled patient-doctor clinical messaging inbox with attachments.
- **Billing & Invoices (`/dashboard/billing`)**: Patient statements, procedure pricing, and payment simulator.
- **Staff Workstation (`/staff`)**: Physician daily patient queue, encounter charting, and refill authorizations.
- **Patient Clinical Profile (`/profile`)**: Official medical demographics, Medical Record Number (MRN), primary care physician, verified insurance policy, and emergency contact details.
- **Portal Settings (`/settings`)**: Configurable SMS appointment reminders, lab result email alerts, pharmacy pickup notices, and security credentials.

---

## Design System & Architecture

- **Industry-Derived Healthcare Aesthetics**: Clean, calm, high-trust healthcare palette featuring heritage clinical blue (`#1e56a0`), deep ink navy (`#0e2038`), emergency crimson (`#b91c1c`), and porcelain surfaces with generous whitespace and accessible WCAG contrast. Full dark mode and motion design honoring `prefers-reduced-motion`.
- **Zero AI Clichés**: No generic purple/indigo gradients, no universal pill buttons, no emoji-as-icons (all drawn SVG icons), and human clinical copy.
- **Single Source of Truth (`constants.js`)**: Hospital metadata, emergency hotlines, menu items, departments, doctors, services, and demo patient records originate from one central module.
- **Free-Tier-First Data Layer**: Structured data-access models (`lib/models/`) and Next.js route handlers (`app/api/`) designed for minimal read/write quota overhead and clean separation of concerns. Runs on dummy in-memory seed data until Firebase credentials are configured (see `.env.local`), then switches to real Firebase Auth + owner-scoped Firestore per `firestore.rules`.

---

## Project Structure

```
hospital_web/
├── app/
│   ├── (app)/                       # Protected patient portal routes (auth-guarded)
│   │   ├── dashboard/               # Dashboard overview
│   │   │   ├── appointments/        # Appointments manager + reschedule
│   │   │   ├── prescriptions/       # Prescriptions & refill requests
│   │   │   ├── records/             # Medical records & lab reports
│   │   │   ├── messages/            # Secure patient-doctor messaging
│   │   │   ├── telehealth/          # Virtual video consultation room
│   │   │   └── billing/             # Patient invoices & payment simulator
│   │   ├── staff/                   # Physician & staff workstation
│   │   ├── profile/                 # Patient clinical profile
│   │   ├── settings/                # Notification & security settings
│   │   └── layout.jsx               # Auth guard, sidebar & mobile bottom nav
│   ├── (auth)/                      # Authentication routes
│   │   ├── login/                   # Patient sign in
│   │   ├── signup/                  # Patient registration
│   │   └── layout.jsx               # Centered split-screen auth shell
│   ├── about/                       # Hospital history & accreditations
│   ├── api/                         # REST route handlers (see 4.4 contract)
│   │   ├── contact/                 # Contact & inquiry submissions
│   │   ├── departments/             # Departments list
│   │   ├── doctors/                 # Doctors list with filters
│   │   ├── health/                  # Liveness check
│   │   ├── prescriptions/           # Prescriptions & refills
│   │   ├── records/                 # Medical records query
│   │   ├── user/                    # User profile endpoints
│   │   └── appointments/            # Appointments CRUD
│   ├── appointments/                # Public appointment booking wizard
│   ├── campus-map/                  # Campus map & indoor wayfinder
│   ├── contact/                     # Hospital contact & inquiry form
│   ├── departments/                 # Department directory & dynamic [slug] pages
│   ├── doctors/                     # Physician directory & dynamic [id] profiles
│   ├── emergency/                   # 24/7 Trauma center & emergency hotlines
│   ├── legal/                       # Privacy, terms & accessibility
│   ├── pricing/                     # Insurance & transparent fee schedules
│   ├── resources/                   # Patient guides, forms & clinical FAQs
│   ├── services/                    # Clinical services directory
│   ├── symptom-checker/             # Emergency triage & symptom engine
│   ├── globals.css                  # Vanilla CSS healthcare design system
│   ├── layout.jsx                   # Root layout, metadata & navbar/footer
│   ├── not-found.jsx, error.jsx     # Error boundaries
│   ├── robots.js, sitemap.js        # SEO outputs
│   └── page.jsx                     # Hospital homepage
├── components/
│   ├── auth/                        # LoginForm & SignupForm
│   ├── hospital/                    # DoctorCard, DepartmentCard, StatusBadge, EmergencyBanner
│   ├── layout/                      # Navbar, Footer, Sidebar, BottomNav, MobileMenu, SearchModal
│   ├── seo/                         # JSON-LD structured data
│   └── ui/                          # Button, Card, Input, Modal, Spinner, Reveal
├── contexts/
│   └── auth-context.jsx             # AuthProvider & useAuth hook
├── lib/
│   ├── models/                      # Data-access models (appointments, doctors, records, etc.)
│   ├── auth.js                      # Firebase Auth wiring + demo fallback
│   ├── firebase.js                  # Firebase client init (config-gated)
│   ├── api.js, utils.js             # API response contract & helpers
├── firestore.rules                  # Firestore security rules (owner-scoped)
├── next.config.js                   # App config + security headers
├── skills/                          # Frontend & backend authority specs
├── AGENTS.md                        # Instruction hierarchy & non-negotiable rules
├── code_of_conduct.md               # Project state graph & work history
├── constants.js                     # Domain metadata, doctors, departments & seed data
├── documentation.md                 # Developer reference and roadmap
└── security.md                     # Audit runbook & security checklist
```

---

## Getting Started

### Prerequisites
- Node.js 18.17+ or 20+
- npm or yarn

### Installation
1. Clone the repository or navigate to the project directory:
   ```bash
   cd c:\LuchyApps\hospital_web
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

### Demo Patient Login Credentials
To test the patient portal without configuring Firebase:
- Click **"Patient Sign In"** in the top navigation or go to `http://localhost:3000/login`
- Click the **"Auto-fill Credentials"** button (Email: `ada@example.com`, Password: `password123`)
- Click **"Sign In to Portal"** to enter the patient dashboard.

While Firebase credentials are blank the portal runs in demo mode: any
non-empty credentials sign in as the demo patient (Ada Quinn, MRN-48920-A) so
reviews and demos flow freely. Fill in the `NEXT_PUBLIC_FIREBASE_*` values in
`.env.local` and deploy `firestore.rules` to switch on real email/password
auth with owner-scoped Firestore data.

---

## Verification & Scripts

- **`npm run dev`**: Launches local Next.js development server.
- **`npm run build`**: Compiles production bundle and statically prerenders all 62 routes.
- **`npm run lint`**: Runs ESLint check across all components and pages.
- **`npm start`**: Runs the production server after build.

---

## License & Accreditation

&copy; 2026 Providence General Hospital. All rights reserved. Licensed under New York State Department of Health License #MED-HOSP-NY-8942. Magnet Recognized for Nursing Excellence & Joint Commission (JCAHO) Gold Seal Certified.