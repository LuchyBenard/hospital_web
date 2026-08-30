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

### 2. Confidential Patient Healthcare Portal (`(app)` Protected Routes)
- **Patient Dashboard (`/dashboard`)**: Comprehensive overview for registered patients displaying next upcoming visit alerts, vital clinical badges (Blood Group O+, documented allergies, MRN), recent diagnostic lab results preview, and active prescriptions.
- **Appointments Manager (`/dashboard/appointments`)**: Manage upcoming, past, and completed clinical visits with one-click cancellation.
- **Medical Records & Diagnostics (`/dashboard/records`)**: View verified metabolic & lipid panels, 2D echocardiograms, and MRI reports with clinical summary modals and export options.
- **Prescriptions & Pharmacy Refills (`/dashboard/prescriptions`)**: Track daily medications, dosage schedules, remaining refills, and submit refill requests to the 24/7 in-house pharmacy.
- **Patient Clinical Profile (`/profile`)**: Official medical demographics, Medical Record Number (MRN), primary care physician, verified insurance policy, and emergency contact details.
- **Portal Settings (`/settings`)**: Configurable SMS appointment reminders, lab result email alerts, pharmacy pickup notices, and security credentials.

---

## Design System & Architecture

- **Industry-Derived Healthcare Aesthetics**: Clean, calm, high-trust healthcare palette featuring clinical teal (`#0f766e`), slate navy (`#0f172a`), emergency crimson (`#b91c1c`), and off-white surfaces with generous whitespace and accessible WCAG contrast.
- **Zero AI Clichés**: No generic purple/indigo gradients, no universal pill buttons, no emoji-as-icons (all drawn SVG icons), and human clinical copy.
- **Single Source of Truth (`constants.js`)**: Hospital metadata, emergency hotlines, menu items, departments, doctors, services, and demo patient records originate from one central module.
- **Free-Tier-First Data Layer**: Structured data-access models (`lib/models/`) and Next.js route handlers (`app/api/`) designed for minimal read/write quota overhead and clean separation of concerns.

---

## Project Structure

```
hospital_web/
├── app/
│   ├── (app)/                       # Protected patient portal routes
│   │   ├── dashboard/               # Patient dashboard
│   │   │   ├── appointments/        # Patient appointments manager
│   │   │   ├── prescriptions/       # Prescriptions & refill requests
│   │   │   └── records/             # Medical records & lab reports
│   │   ├── profile/                 # Patient clinical profile
│   │   ├── settings/                # Notification & security settings
│   │   └── layout.jsx               # Auth guard, sidebar & mobile bottom nav
│   ├── (auth)/                      # Authentication routes
│   │   ├── login/                   # Patient sign in
│   │   ├── signup/                  # Patient registration
│   │   └── layout.jsx               # Centered auth shell
│   ├── about/                       # Hospital history & accreditations
│   ├── api/                         # REST API route handlers
│   │   ├── appointments/            # Appointments CRUD
│   │   ├── auth/                    # Auth endpoints (login, signup, logout)
│   │   ├── departments/             # Departments list
│   │   ├── doctors/                 # Doctors list with filters
│   │   ├── prescriptions/           # Prescriptions & refills
│   │   └── records/                 # Medical records query
│   ├── appointments/                # Public appointment booking wizard
│   ├── contact/                     # Hospital contact & inquiry form
│   ├── departments/                 # Department directory & dynamic [slug] pages
│   ├── doctors/                     # Physician directory & dynamic [id] profiles
│   ├── emergency/                   # 24/7 Trauma center & emergency hotlines
│   ├── pricing/                     # Insurance & transparent fee schedules
│   ├── resources/                   # Patient guides, forms & clinical FAQs
│   ├── services/                    # Clinical services directory
│   ├── globals.css                  # Pure CSS healthcare design system
│   ├── layout.jsx                   # Root layout, metadata & navbar/footer
│   └── page.jsx                     # Hospital homepage
├── components/
│   ├── auth/                        # LoginForm & SignupForm
│   ├── hospital/                    # DoctorCard, DepartmentCard, StatusBadge, EmergencyBanner
│   ├── layout/                      # Navbar, Footer, Sidebar, BottomNav, MobileMenu
│   └── ui/                          # Button, Card, Input, Modal, Spinner
├── contexts/
│   └── auth-context.jsx             # AuthProvider & useAuth hook
├── lib/
│   ├── models/                      # Data-access models (appointments, doctors, records, etc.)
│   ├── auth.js                      # Session helpers & authentication stubs
│   └── utils.js                     # ClassName merger (cn)
├── skills/                          # Frontend & backend authority specs
├── AGENTS.md                        # Instruction hierarchy & non-negotiable rules
├── code_of_conduct.md               # Project state graph & work history
├── constants.js                     # Domain metadata, doctors, departments & seed data
├── documentation.md                 # Developer reference and roadmap
└── security.md                      # Audit runbook & security checklist
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
To test the patient portal without creating a new account:
- Click **"Patient Sign In"** in the top navigation or go to `http://localhost:3000/login`
- Click the **"Auto-fill Credentials"** button (Email: `ada@example.com`, Password: `password123`)
- Click **"Sign In to Portal"** to enter the patient dashboard.

---

## Verification & Scripts

- **`npm run dev`**: Launches local Next.js development server.
- **`npm run build`**: Compiles production bundle and statically prerenders all 47 routes.
- **`npm run lint`**: Runs ESLint check across all components and pages.
- **`npm start`**: Runs the production server after build.

---

## License & Accreditation

&copy; 2026 Providence General Hospital. All rights reserved. Licensed under New York State Department of Health License #MED-HOSP-NY-8942. Magnet Recognized for Nursing Excellence & Joint Commission (JCAHO) Gold Seal Certified.