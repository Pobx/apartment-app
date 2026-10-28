# Batch Plan 02: Modern Frontend (React + Vite + Tailwind CSS + Kanit Font)

> **Part of:** Apartment Management System Modernization  
> **Status:** Ready for Implementation  
> **Spec Reference:** `docs/superpowers/specs/2026-10-27-apartment-system-redesign.md`

## 1. Goal
Implement a modern, high-performance, mobile-responsive SPA using React 18, Vite, and Tailwind CSS. The UI strictly adheres to Google Font **Kanit**, clean white-toned surfaces, interactive data visualization charts, real-time meter calculation, and printable invoice views.

## 2. File & Directory Structure
```
frontend/
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── index.html                       # Google Font Kanit import
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css                    # Tailwind directives & Kanit font family
    ├── api/
    │   ├── client.js                # Axios client with Keycloak auth bearer interceptor
    │   ├── apartments.js
    │   ├── rooms.js
    │   ├── utilities.js
    │   └── renters.js
    ├── components/
    │   ├── layout/
    │   │   ├── Navbar.jsx           # Clean white header with breadcrumbs
    │   │   ├── Sidebar.jsx          # Desktop navigation
    │   │   └── BottomNav.jsx        # Mobile responsive navigation bar
    │   ├── ui/
    │   │   ├── MetricCard.jsx       # KPI card with soft shadow
    │   │   ├── Modal.jsx
    │   │   └── Badge.jsx
    │   └── charts/
    │       ├── UtilityTrendsChart.jsx # Interactive 6-month Bar Chart (Electric vs Water)
    │       └── OccupancyDonut.jsx   # Radial gauge donut chart
    ├── pages/
    │   ├── Dashboard.jsx            # Main overview with charts & urgent tasks
    │   ├── UtilitiesUsage.jsx       # Utility meter table & batch recording
    │   ├── MeterRecordModal.jsx     # Live meter calculator (Smart Inspector)
    │   ├── Rooms.jsx                # Room list & floor-by-floor matrix
    │   ├── Renters.jsx              # Renter directory
    │   ├── BillPreviewModal.jsx     # Printable bill / invoice drawer
    │   └── Settings.jsx             # Rates & Packages management
    └── auth/
        └── keycloak.js              # Keycloak-js integration & token management
```

## 3. Tasks & Deliverables
- [ ] **Task 2.1**: Scaffold React + Vite app with Tailwind CSS and configure Google Font Kanit as default `font-sans`.
- [ ] **Task 2.2**: Build Theme Layout & Responsive Navigation:
  - Sidebar for desktop screens ($\ge 768px$)
  - Bottom tab navigation for mobile screens ($< 768px$)
  - Glassmorphic top navigation with breadcrumbs and apartment selector
- [ ] **Task 2.3**: Build Interactive Data Visualization Charts:
  - `UtilityTrendsChart`: Pure SVG/Canvas interactive 6-month comparison of Electricity (kWh) and Water ($m^3$) with hover states.
  - `OccupancyDonut`: Circular radial chart displaying percentage occupied vs vacant rooms.
- [ ] **Task 2.4**: Build Core Business Pages:
  - `Dashboard`: KPI summary cards, quick urgent task alerts, charts.
  - `UtilitiesUsage`: Complete table listing rooms, previous and current meter units, total bill, and status badges.
  - `MeterRecordModal`: Smart Fast Entry form that calculates difference and total price live as the user inputs meter readings.
  - `BillPreviewModal`: Clean Thai-formatted printable invoice with Buddhist Era dates and itemized charges.
  - `Rooms`: Room directory with floor matrix filter.
  - `Renters`: Renter contacts, ID cards, and partner details.
- [ ] **Task 2.5**: Connect API Service Layer with fallback mock-data provider for offline/standalone execution.
