# Frontend Pragmatic Vertical Slice Architecture with TypeScript Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refactor frontend from flat JavaScript into Pragmatic Vertical Slice Architecture with 100% strict TypeScript and TanStack Query v5.

**Architecture:** Vertical feature slices (`features/auth`, `features/dashboard`, `features/meters`, `features/rooms`, `features/renters`, `features/billing`, `features/settings`) encapsulate their respective UI, query hooks, domain rules, and DTOs. Shared cross-cutting components, HTTP client, formatters, and types live in `shared/`.

**Tech Stack:** React 18, TypeScript (Strict), Vite, TanStack Query v5, Tailwind CSS, Lucide Icons.

**Spec:** [docs/superpowers/specs/2026-10-28-frontend-vertical-slice-typescript-design.md](file:///Users/poppy.geidtiphong/Documents/workspace/homework/apartment-app/docs/superpowers/specs/2026-10-28-frontend-vertical-slice-typescript-design.md)

## Global Constraints
- Target Language: TypeScript (`strict: true`, `noImplicitAny: true`, zero `any` types).
- Path Alias: `@/*` maps to `<root>/src/*`.
- Visual Parity: Modern Minimal white tone, Google Font Kanit, Lucide icons, zero mobile horizontal overflow.
- Direct Go DTO compatibility: JSON fields use native Go `snake_case` in API contracts.
- Container Build: `npm run build` must pass cleanly without warnings/errors; Docker Compose frontend container must build and serve HTTP 200.

## Review Focus
1. `features/meters/domain/calculator.ts`: Under minimum usage (e.g. 2 units water = ฿36 < ฿100 min) must enforce ฿100 floor.
2. `shared/api/httpClient.ts`: 401 Unauthorized must cleanly handle expired Keycloak JWT tokens and redirect to login state.
3. `features/meters/components/WalkthroughModal.tsx`: Room-to-room navigation must preserve previous step inputs without state loss.
4. `features/auth/api/useAuth.ts`: Page refresh must rehydrate user profile from valid localStorage JWT token.
5. Mobile viewport responsiveness: All feature views and modals must have `scrollWidth == clientWidth` on 360px and 390px screens.

---

### Task 1: TypeScript Tooling, Configuration, and TanStack Query Setup
**Files:**
- Create: `frontend/tsconfig.json`
- Create: `frontend/tsconfig.node.json`
- Modify: `frontend/package.json`
- Modify: `frontend/vite.config.js` -> `frontend/vite.config.ts`

- [ ] **Step 1: Install TypeScript and TanStack Query dependencies**
```bash
cd frontend && npm install typescript @types/react @types/react-dom @types/node @tanstack/react-query --save
```
- [ ] **Step 2: Configure `tsconfig.json` and `tsconfig.node.json`**
Configure strict type checking, React JSX transform, and `@/*` path mapping.
- [ ] **Step 3: Update `vite.config.ts` with path aliases**
Configure `@` resolving to `/src`.
- [ ] **Step 4: Verify initial TypeScript compiler setup**
Run `npx tsc --noEmit` and verify configuration is recognized.
- [ ] **Step 5: Commit configuration**
```bash
git add frontend/package.json frontend/tsconfig.json frontend/tsconfig.node.json frontend/vite.config.ts
git commit -m "chore(frontend): setup typescript and tanstack query tooling"
```

---

### Task 2: Shared Layer (Primitives, API Client, and Formatters)
**Files:**
- Create: `frontend/src/shared/types/api.ts`
- Create: `frontend/src/shared/api/httpClient.ts`
- Create: `frontend/src/shared/utils/formatters.ts`
- Create: `frontend/src/shared/components/Card.tsx`
- Create: `frontend/src/shared/components/Button.tsx`
- Create: `frontend/src/shared/components/Badge.tsx`
- Create: `frontend/src/shared/components/Modal.tsx`
- Create: `frontend/src/shared/index.ts`

- [ ] **Step 1: Define shared API envelope and error types in `shared/types/api.ts`**
- [ ] **Step 2: Implement type-safe `httpClient.ts` with Bearer token injection and error handling**
- [ ] **Step 3: Implement `formatters.ts` for Thai Baht currency and Buddhist Era dates**
- [ ] **Step 4: Implement shared UI primitives (`Card`, `Button`, `Badge`, `Modal`)**
- [ ] **Step 5: Test TypeScript compilation of `shared/`**
- [ ] **Step 6: Commit shared layer**
```bash
git add frontend/src/shared/
git commit -m "feat(shared): implement shared ui primitives, http client, and formatters in typescript"
```

---

### Task 3: Feature Slice - Auth & Keycloak IAM (`features/auth`)
**Files:**
- Create: `frontend/src/features/auth/types/index.ts`
- Create: `frontend/src/features/auth/utils/token.ts`
- Create: `frontend/src/features/auth/api/useAuth.ts`
- Create: `frontend/src/features/auth/components/LoginForm.tsx`
- Create: `frontend/src/features/auth/index.ts`

- [ ] **Step 1: Define `AuthUser`, `TokenPayload`, and `LoginCredentials` interfaces**
- [ ] **Step 2: Implement JWT decoding and token storage utilities in `utils/token.ts`**
- [ ] **Step 3: Implement `useAuth` hook and mutation with Keycloak Direct Access Grant**
- [ ] **Step 4: Migrate `Login.jsx` to `LoginForm.tsx` with Kanit typography and 1-click test fill**
- [ ] **Step 5: Verify auth slice compiles cleanly with `tsc --noEmit`**
- [ ] **Step 6: Commit auth feature slice**
```bash
git add frontend/src/features/auth/
git commit -m "feat(auth): migrate keycloak auth slice to typescript"
```

---

### Task 4: Feature Slice - Meters & Utilities (`features/meters`)
**Files:**
- Create: `frontend/src/features/meters/types/index.ts`
- Create: `frontend/src/features/meters/domain/calculator.ts`
- Create: `frontend/src/features/meters/api/useMeters.ts`
- Create: `frontend/src/features/meters/components/MeterRecordModal.tsx`
- Create: `frontend/src/features/meters/components/WalkthroughModal.tsx`
- Create: `frontend/src/features/meters/components/UtilitiesUsageView.tsx`
- Create: `frontend/src/features/meters/index.ts`

- [ ] **Step 1: Define meter reading interfaces and utility rate configs in `types/index.ts`**
- [ ] **Step 2: Implement pure domain business logic `calculateUtilityCharge` in `domain/calculator.ts` with minimum rate enforcement**
- [ ] **Step 3: Implement `useRecordMeterMutation` and `useSaveWalkthroughMutation` in `api/useMeters.ts`**
- [ ] **Step 4: Migrate `MeterRecordModal.tsx`, `WalkthroughModal.tsx`, and `UtilitiesUsageView.tsx`**
- [ ] **Step 5: Verify meter slice compiles cleanly**
- [ ] **Step 6: Commit meters feature slice**
```bash
git add frontend/src/features/meters/
git commit -m "feat(meters): migrate meters and utilities slice to typescript with domain calculator"
```

---

### Task 5: Feature Slices - Dashboard, Rooms, Renters, Billing, and Settings
**Files:**
- Create: `frontend/src/features/dashboard/`
- Create: `frontend/src/features/rooms/`
- Create: `frontend/src/features/renters/`
- Create: `frontend/src/features/billing/`
- Create: `frontend/src/features/settings/`

- [ ] **Step 1: Implement `features/dashboard` (KPI cards, UtilityTrendsChart, OccupancyDonut, `useDashboardStatsQuery`)**
- [ ] **Step 2: Implement `features/rooms` (RoomGrid, RoomCard, Floor filters, `useRoomsQuery`)**
- [ ] **Step 3: Implement `features/renters` (RenterList, Contact cards, `useRentersQuery`)**
- [ ] **Step 4: Implement `features/billing` (BillPreviewModal with Buddhist Era invoice, print action)**
- [ ] **Step 5: Implement `features/settings` (SettingsView with utility rate customizer)**
- [ ] **Step 6: Commit all remaining feature slices**
```bash
git add frontend/src/features/
git commit -m "feat(features): migrate dashboard, rooms, renters, billing, and settings to typescript"
```

---

### Task 6: Application Shell, Providers, and Layout Integration
**Files:**
- Create: `frontend/src/app/providers/QueryProvider.tsx`
- Create: `frontend/src/app/layout/Navbar.tsx`
- Create: `frontend/src/app/layout/Sidebar.tsx`
- Create: `frontend/src/app/layout/BottomNav.tsx`
- Create: `frontend/src/app/App.tsx`
- Modify: `frontend/src/main.tsx`
- Remove: Legacy `.jsx` files in `frontend/src/components/`, `frontend/src/pages/`, `frontend/src/api/`

- [ ] **Step 1: Implement `QueryProvider.tsx` with TanStack QueryClient**
- [ ] **Step 2: Migrate layout components (`Navbar.tsx`, `Sidebar.tsx`, `BottomNav.tsx`) to TypeScript**
- [ ] **Step 3: Implement root `App.tsx` orchestrating slices, modals, and tab navigation**
- [ ] **Step 4: Clean up obsolete `.jsx` files**
- [ ] **Step 5: Verify `npm run build` passes with zero errors**
- [ ] **Step 6: Commit app shell and clean up**
```bash
git add frontend/src/
git commit -m "refactor(app): integrate typescript app shell and clean up legacy jsx files"
```

---

### Task 7: Docker Container Verification & Visual Regression Check
**Files:**
- Verify: `deployments/docker-compose.yml`
- Verify: Docker build via `cd deployments && docker compose up -d --build frontend`
- Verify: Headless screenshot capture

- [ ] **Step 1: Rebuild Docker frontend image with new TypeScript build**
- [ ] **Step 2: Verify HTTP 200 on `http://localhost`**
- [ ] **Step 3: Capture desktop and mobile screenshot to verify zero regression**
- [ ] **Step 4: Commit final verification**
