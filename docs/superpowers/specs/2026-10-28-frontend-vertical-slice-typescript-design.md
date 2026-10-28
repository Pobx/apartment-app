# Design Document: Frontend Pragmatic Vertical Slice Architecture with TypeScript

## 1. Intent and Why
The current frontend of the Apartment Management System is built using JavaScript (ES6+ JSX) with a flat, type-based folder structure (`pages/`, `components/`, `api/`). As the application expands with complex utility billing formulas, multi-step walkthrough meter recording, and Keycloak IAM integration, this flat structure scatters feature logic across disconnected folders.

This project refactors the frontend into a **Pragmatic Vertical Slice Architecture** powered by **TypeScript (strict mode)** and **TanStack Query (React Query v5)**. Each business feature will be encapsulated into a self-contained slice containing its UI, state hooks, domain rules, and DTO types, aligning cleanly with the backend's Go Hexagonal Architecture.

---

## 2. Goals, Non-Goals, and Anti-Goals

### Goals
- **Vertical Slice Organization:** Organize code by business capabilities:
  - `features/auth` (Keycloak Login, Token Storage, AuthGuard)
  - `features/dashboard` (KPI Summary, 6-Month Trends, Occupancy Donut)
  - `features/meters` (UtilitiesUsage Page, Single Meter Modal, 1-Click Walkthrough Modal, Calculation Rules)
  - `features/rooms` (Room Grid, Floor Filtering, Room Details)
  - `features/renters` (Renter Directory, Contact Info, Room Assignment)
  - `features/billing` (Monthly Invoices, Bill Preview Modal, PDF Print Layout)
  - `features/settings` (Utility Rates Configuration, Apartment Info)
  - `shared/` (Cross-cutting UI Design System, HTTP Client, Formatters)
- **100% Strict TypeScript:** Complete migration from `.jsx`/`.js` to `.tsx`/`.ts` with strict compiler flags (`strict: true`, `noImplicitAny: true`) and zero `any` shortcuts.
- **Direct Backend DTO Alignment:** TypeScript DTO interfaces directly mirror the Go Echo backend JSON schemas (`snake_case` payloads like `total_rooms`, `occupied_rooms`, `electricity_units`, `room_id`) to eliminate unnecessary transformation layers.
- **Server State Management with TanStack Query:** Leverage React Query v5 for queries, mutations, cache invalidation, and automated loading/error states.
- **Visual & Functional Parity:** Preserve 100% of the UI design (Modern Minimal aesthetic, Google Font Kanit, responsive zero-overflow mobile layout, 1-Click Walkthrough mode, and Bill Preview).
- **Production Build & Container Verification:** Ensure `npm run build` passes with zero TypeScript warnings/errors, and the Docker Compose frontend container builds and serves cleanly.

### Non-Goals
- Modifying backend API contracts or database schemas (Go API remains untouched).
- Changing styling framework (retain Tailwind CSS and Lucide icons).
- Introducing full-blown Next.js or SSR (keep it as a high-performance Vite SPA).

### Anti-Goals
- **Dogmatic Clean Architecture Boilerplate:** Avoid creating redundant repository classes, abstract use-case interfaces, or multi-layered mappers for simple 1-line queries. Keep slices pragmatic, functional, and cohesive.
- **Global Giant State Store:** Avoid introducing Redux or bloated global stores for state that is naturally local or server-cached.

---

## 3. Approaches Considered & Trade-offs

### Approach 1: Pragmatic Vertical Slice + TanStack Query (Chosen)
- Each feature slice owns its components, hooks/queries, pure utility rules, and DTO types.
- Uses TanStack Query v5 for network state and cache management.
- **Pros:** High cohesion, minimal boilerplate, declarative cache invalidation (e.g., recording a meter automatically invalidates dashboard and room queries), robust DX.
- **Cons:** Introduces `@tanstack/react-query` (~12kB gzipped).

### Approach 2: Lightweight Native Slice (Pure Custom Hooks)
- Uses native `useState`/`useEffect` within slice-local hooks with a lightweight custom fetch wrapper.
- **Pros:** Zero external dependencies.
- **Cons:** Requires manual implementation of loading states, error handling, refetch triggers, and race-condition prevention across modals.

*Decision:* Approach 1 was selected by user agreement for its maintainability, developer ergonomics, and rock-solid state synchronization.

---

## 4. Architectural Structure

```text
frontend/
├── tsconfig.json             # Strict TypeScript configuration
├── tsconfig.node.json
├── vite.config.ts            # Vite with '@' alias support
├── src/
│   ├── main.tsx              # Entry point with QueryClientProvider
│   ├── app/                  # Application Shell & Layout
│   │   ├── App.tsx           # Tab routing & modal orchestrator
│   │   ├── providers/        # QueryClientProvider, AuthProvider
│   │   └── layout/           # Navbar.tsx, Sidebar.tsx, BottomNav.tsx
│   ├── features/             # Vertical Feature Slices
│   │   ├── auth/             # Authentication & Keycloak IAM
│   │   │   ├── api/          # useLoginMutation, useCurrentUser
│   │   │   ├── components/   # LoginForm.tsx
│   │   │   ├── types/        # AuthUser, TokenPayload, LoginCredentials
│   │   │   ├── utils/        # parseJwt, storage helpers
│   │   │   └── index.ts      # Public slice API
│   │   ├── dashboard/        # KPI Metrics & Analytics
│   │   │   ├── api/          # useDashboardStatsQuery
│   │   │   ├── components/   # StatCard.tsx, UtilityTrendsChart.tsx, OccupancyDonut.tsx, DashboardView.tsx
│   │   │   ├── types/        # DashboardStatsDTO, UtilityTrendDTO
│   │   │   └── index.ts
│   │   ├── meters/           # Meter Reading & Utilities Usage
│   │   │   ├── api/          # useRecordMeterMutation, useSaveWalkthroughMutation
│   │   │   ├── components/   # UtilitiesUsageView.tsx, MeterRecordModal.tsx, WalkthroughModal.tsx
│   │   │   ├── domain/       # calculateUtilityCharge (pure business formulas)
│   │   │   ├── types/        # MeterReading, UtilityRateConfig, WalkthroughState
│   │   │   └── index.ts
│   │   ├── rooms/            # Room Management & Status
│   │   │   ├── api/          # useRoomsQuery
│   │   │   ├── components/   # RoomsView.tsx, RoomGrid.tsx, RoomCard.tsx, FilterBar.tsx
│   │   │   ├── types/        # RoomDTO, RoomStatus
│   │   │   └── index.ts
│   │   ├── renters/          # Renter Management
│   │   │   ├── api/          # useRentersQuery
│   │   │   ├── components/   # RentersView.tsx, RenterCard.tsx
│   │   │   ├── types/        # RenterDTO
│   │   │   └── index.ts
│   │   ├── billing/          # Invoices & Billing
│   │   │   ├── api/          # useBillingPreviewQuery
│   │   │   ├── components/   # BillPreviewModal.tsx, BillSummaryCard.tsx
│   │   │   ├── types/        # InvoiceDTO, BillBreakdown
│   │   │   └── index.ts
│   │   └── settings/         # System Settings & Utility Rates
│   │       ├── api/          # useSettingsQuery, useUpdateRatesMutation
│   │       ├── components/   # SettingsView.tsx
│   │       ├── types/        # UtilityRateConfigDTO
│   │       └── index.ts
│   └── shared/               # Cross-Cutting Shared Modules
│       ├── api/              # httpClient.ts, apiConfig.ts, errorHandling.ts
│       ├── components/       # Design System UI (Button, Modal, Card, Badge, Input)
│       ├── utils/            # formatCurrency, formatBuddhistDate, cn
│       └── types/            # ApiResponse<T>, ApiError
```

---

## 5. Domain Rules & Core Types Specification

### 5.1 Utility Calculation Formula (Domain Rule)
Preserves the exact business formula from the backend:
$$\text{Charge} = \max(\text{Units} \times \text{Rate}, \text{MinRate})$$
- Parameterized with sensible defaults:
  - Water: Unit rate ฿18, Minimum ฿100.
  - Electricity: Unit rate ฿8, Minimum ฿0 (actual usage).
  - Central / Common Fee: Fixed ฿300 / month.

### 5.2 Direct Go-Aligned TypeScript DTOs
```typescript
export interface RoomDTO {
  id: number;
  room_name: string;
  floor: number;
  status: 'occupied' | 'vacant' | 'maintenance';
  renter_name?: string;
  renter_phone?: string;
  water_previous_meter: number;
  water_current_meter?: number;
  electric_previous_meter: number;
  electric_current_meter?: number;
  is_billed: boolean;
}

export interface DashboardStatsDTO {
  total_rooms: number;
  occupied_rooms: number;
  vacant_rooms: number;
  occupancy_rate: number;
  total_meters_billed: number;
  financial: {
    current_month_expected: number;
    collected: number;
    pending: number;
  };
  utility_trends: Array<{
    month: string;
    electricity_units: number;
    water_units: number;
    total_cost: number;
  }>;
  pending_tasks: Array<{
    room_id: number;
    room_name: string;
    renter_name: string;
    floor: number;
  }>;
}

export interface AuthUser {
  username: string;
  name: string;
  email: string;
  roles: string[];
  isAdmin: boolean;
  isStaff: boolean;
}
```

---

## 6. Migration Steps & Execution Plan

1. **TypeScript Tooling & Configuration:**
   - Install `typescript`, `@types/react`, `@types/react-dom`, `@types/node`, `@tanstack/react-query`.
   - Setup `tsconfig.json` with strict settings and path alias `@/*` pointing to `src/*`.
   - Update `vite.config.ts` with path aliases.
2. **Setup Shared Layer:**
   - Implement `shared/api/httpClient.ts` with Keycloak Bearer token injection.
   - Implement `shared/utils/formatters.ts` (Thai Baht currency, Buddhist year conversion).
   - Implement `shared/components/` (Button, Modal, Card, Badge, Input).
3. **Migrate Feature Slices:**
   - Slice 1: `features/auth` (Keycloak login, session management, user profile).
   - Slice 2: `features/dashboard` (KPIs, Charts, Stats queries).
   - Slice 3: `features/meters` (UtilitiesUsageView, Single modal, Walkthrough modal, calculation logic).
   - Slice 4: `features/rooms` & `features/renters` (Room grid, Renter list).
   - Slice 5: `features/billing` & `features/settings` (Bill preview modal, settings configuration).
4. **App Shell Integration:**
   - Wire `App.tsx` with `QueryClientProvider` and navigation tabs.
5. **Verification & Delivery:**
   - `npm run build` (Clean TypeScript compilation).
   - Rebuild Docker container `deployments/docker-compose up -d --build frontend`.
   - Visual verification via headless screenshot.

---

## 7. Architectural Decisions (Builder Calls)
1. **DTO Naming:** Kept as Go-native `snake_case` in DTOs to eliminate runtime transformation overhead, while local UI component state uses standard React camelCase.
2. **All 5 Pages Covered:** Every existing tab (`dashboard`, `utilities`, `rooms`, `renters`, `settings`) has an explicit home inside its designated vertical slice.
3. **Cache Invalidation:** Mutating a meter in `features/meters` invalidates query keys `['dashboard']` and `['rooms']` automatically via TanStack Query.
