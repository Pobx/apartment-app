# Design Document: Apartment Management System Modernization & Redesign

**Date:** 2026-10-27  
**Status:** In Review / Ready for Builder Check  
**Author:** Antigravity Engineering  
**Target Repository Directory:** `docs/superpowers/specs/2026-10-27-apartment-system-redesign.md`

---

## 1. Executive Summary & Intent

The existing Apartment Management System consists of a PHP/Lumen backend (`apartments-api`) and a Vue 2 / CoreUI / Bootstrap frontend (`vue-apartment-app`). While functionally complete, the UI design is dated, non-optimal for mobile screens (used by staff reading meters on-site), and the architecture lacks separation of concerns, containerized reverse proxy topology, and enterprise-grade identity management.

This project delivers a full modernization:
1. **Frontend**: Re-architected with **React 18 + Vite + Tailwind CSS**, featuring a clean white-tone aesthetic ("Clean Minimalist / Nordic Warm White"), interactive data visualization charts (utility consumption trends & occupancy stats), and first-class mobile responsive views.
2. **Backend API**: Re-architected in **Golang 1.22+ with Echo framework** utilizing the **Hexagonal Architecture pattern (Ports & Adapters)**, preserving 100% of existing business rules, data schemas, calculation logic, and endpoints.
3. **Authentication & Authorization**: Integrated with **Keycloak** as the Authorization Server (OIDC/OAuth2 with JWT verification and Role-Based Access Control).
4. **DevOps & Infrastructure**: Complete containerization via **Docker Compose** fronted by an **Nginx Reverse Proxy** routing upstream traffic to Frontend, Backend API, and Keycloak.
5. **Planning & Execution**: Structured in accordance with Superpowers methodology, providing comprehensive batch planning markdown files in `docs/`.

---

## 2. Goals, Non-Goals, and Anti-Goals

### 2.1 Goals
- **UX/UI Modernization**: Clean, eye-comfortable white/warm-white tone, airy spacing, crisp typography, and interactive SVG/Canvas charts for data visualization.
- **Mobile First-Class Usability**: Dedicated mobile layouts and forms allowing building staff to walk between rooms and input meter numbers seamlessly.
- **Hexagonal Architecture in Go**: Clear decoupling of domain logic (`core/domain`), interfaces (`core/ports`), and infrastructure (`adapters` for Echo HTTP handlers, Keycloak auth middleware, GORM/MySQL repositories, and billing generators).
- **Security Upgrade**: Eliminate legacy static tokens (`api-token: 95hvjrni`) and replace with Keycloak OIDC JWT token validation with PKCE flow.
- **Identical Business Logic**: Utility bill calculations (minimum unit charges, tiered rates), room category relationships, renter partner management, and bill generation must match legacy behavior.
- **Unified Local Orchestration**: `docker-compose up` spins up MySQL, Keycloak, Backend API, Frontend, and Nginx reverse proxy with zero manual intervention.

### 2.2 Non-Goals
- Altering the core business model of the apartment management (e.g. no changes to the pricing formula or core entities).
- Rewriting third-party accounting integrations outside the existing scope.
- Microservices splitting: this remains a clean, high-performance modular monolith for the backend.

### 2.3 Anti-Goals
- **No Dark-Mode Heavy Clutter**: The primary mandate is clean white tone with high legibility.
- **No Direct Frontend-to-Database Calls**: All operations must flow through Keycloak auth and Go Echo RESTful API.
- **No Framework Coupling in Domain**: The Go domain core must not import Echo, GORM, or Keycloak packages.

---

## 3. Evaluated Approaches & Selection

| Dimension | Approach 1: Clean Monorepo with Dual-Stage Migration (Selected) | Approach 2: In-place In-repo Overwrite |
| :--- | :--- | :--- |
| **Directory Structure** | Dedicated `frontend/`, `backend/`, `deployments/`, `docs/`, keeping legacy folders as reference | Overwriting files directly in `apartments-api/` and `vue-apartment-app/` |
| **Logic Verification** | High: Legacy Lumen & Vue codebase remain intact for parallel side-by-side verification | Low: High risk of accidental omission of business logic and edge cases |
| **Git History & Rollback**| Clean history; easily revertable; zero dependency collisions | Messy conflict between PHP/Vue tools and Go/React tools |
| **Decision** | **Chosen**: Recommended and approved by user | Rejected due to risk |

---

## 4. System Architecture Specification

```
                          [ Client Browser / Mobile ]
                                      |
                                      v
                        [ Nginx Reverse Proxy (Port 80/443) ]
                     /                |                  \
                    /                 |                   \
            Path: /api/*          Path: /auth/*          Path: /*
                  /                   |                     \
                 v                    v                      v
     [ Go Echo Backend API ]    [ Keycloak Az Server ]   [ React Vite SPA ]
         (Port 8080)               (Port 8080)              (Port 80)
              |                         |
              +-----------+-------------+
                          |
                          v
                 [ MySQL 8.0 Database ]
```

### 4.1 Upstream Reverse Proxy (Nginx)
Nginx acts as the single entrypoint:
- `http://localhost/` -> Static React SPA build or Vite dev server container.
- `http://localhost/api/` -> Go Echo API upstream (`http://backend:8080`).
- `http://localhost/auth/` -> Keycloak upstream (`http://keycloak:8080`).
- Headers configured: `X-Forwarded-For`, `X-Forwarded-Proto`, `X-Real-IP`, `Upgrade`, `Connection` (for WebSocket/HMR).

---

## 5. Backend Architecture: Golang + Echo Hexagonal Pattern

```
backend/
├── cmd/
│   └── api/
│       └── main.go                         # Application bootstrap and DI wiring
├── internal/
│   ├── core/
│   │   ├── domain/                         # Pure business entities & errors
│   │   │   ├── apartment.go
│   │   │   ├── room.go
│   │   │   ├── room_category.go
│   │   │   ├── renter.go
│   │   │   ├── utility.go
│   │   │   ├── monthly_usage.go
│   │   │   ├── bill.go
│   │   │   └── dashboard.go                # Dashboard stats entity
│   │   └── ports/                          # Abstraction contracts
│   │       ├── inbound/                    # Driving Ports (Services)
│   │       │   ├── apartment_service.go
│   │       │   ├── room_service.go
│   │       │   ├── renter_service.go
│   │       │   ├── utility_service.go
│   │       │   ├── billing_service.go
│   │       │   └── dashboard_service.go    # Aggregation service
│   │       └── outbound/                   # Driven Ports (Repositories & Infra)
│   │           ├── apartment_repository.go
│   │           ├── room_repository.go
│   │           ├── renter_repository.go
│   │           ├── utility_repository.go
│   │           ├── billing_repository.go
│   │           ├── dashboard_repository.go # SQL aggregations
│   │           └── file_storage.go
│   └── adapters/
│       ├── inbound/
│       │   └── http/
│       │       ├── router.go               # Echo routing configuration
│       │       ├── middleware/
│       │       │   ├── auth_keycloak.go    # OIDC JWT parsing & RBAC validation
│       │       │   ├── cors.go
│       │       │   └── logger.go
│       │       └── handlers/
│       │           ├── apartment_handler.go
│       │           ├── room_handler.go
│       │           ├── renter_handler.go
│       │           ├── utility_handler.go
│       │           ├── usage_handler.go
│       │           ├── bill_handler.go
│       │           └── dashboard_handler.go# GET /api/dashboard/stats
│       └── outbound/
│           ├── persistence/
│           │   ├── mysql/
│           │   │   ├── db.go
│           │   │   ├── apartment_repo.go
│           │   │   ├── room_repo.go
│           │   │   ├── renter_repo.go
│           │   │   ├── utility_repo.go
│           │   │   └── dashboard_repo.go
│           └── billing/
│               └── bill_generator.go       # High-fidelity receipt generator
```

### 5.1 Business Logic & Calculations (Preserved from Legacy)
1. **Utility Usage Calculation**:
   - $\text{unit\_amount} = \text{current\_unit\_amount} - \text{latest\_unit\_amount}$
   - If $\text{unit\_amount} \le \text{unit\_min\_rate}$, then $\text{total\_price} = \text{unit\_min\_price}$
   - Else $\text{total\_price} = \text{unit\_amount} \times \text{price\_per\_unit}$
2. **Bill Total**:
   - $\text{total\_bill} = \text{room\_price} + \sum(\text{utilities\_total\_prices})$
3. **Bill Artifact**:
   - The Go adapter generates bill records and printable receipts with Thai Buddhist Era date formatting ($+543$ years).

### 5.2 Dashboard & Analytics Specification (Builder Call)
To optimize mobile bandwidth and prevent client-side heavy joins, the Go backend exposes:
- **`GET /api/dashboard/stats`**:
  - `total_rooms`, `occupied_rooms`, `vacant_rooms`, `occupancy_rate` (percentage).
  - `utility_trends`: 6-month array with `{ month, electricity_units, water_units }`.
  - `financial_summary`: `{ current_month_expected, collected, pending }`.
  - `pending_tasks`: count and room numbers where monthly meter readings are missing for current billing cycle.

---

## 6. Authentication & Authorization: Keycloak Specification

- **Realm Name**: `apartment-realm`
- **Clients**:
  - `apartment-web`: Public Client (PKCE enabled, redirect URIs: `http://localhost/*`, web origins: `+`).
  - `apartment-api`: Confidential / Bearer-only client for token validation.
- **Roles & RBAC Matrix (Builder Call)**:
  - **`staff` Role**:
    - Permitted: `GET /api/rooms*`, `GET /api/renters*`, `GET /api/utilities*`, `POST/PUT /api/utilities-monthly-usage*`, `GET /api/bills*`, `GET /api/dashboard/stats`.
    - Restricted: Modifying apartment settings, altering utility category rate structures, or mutating base room inventories.
  - **`admin` Role**:
    - Unrestricted CRUD access to all resources.
- **Backend Middleware (`auth_keycloak.go`)**:
  - Retrieves public keys from Keycloak JWKS: `http://keycloak:8080/auth/realms/apartment-realm/protocol/openid-connect/certs`.
  - Verifies `iss` (Issuer), `exp` (Expiration), `aud` (Audience), and parses claims and realm/client roles into Echo request context (`c.Set("user", claims)`).
  - Enforces route-level role checks via Echo middleware chains (e.g. `RequireRole("admin")`).

---

## 7. Frontend Specification: React + Vite + Tailwind CSS

### 7.1 UX/UI Theme & Design System
- **Typography Standard**: **Kanit (Google Fonts)** across Thai and English text (weights 300, 400, 500, 600, 700), providing modern geometric curves, high legibility, and premium comfort for the eyes.
- **Theme Base**: "Modern Minimal" (Airy Whitespace, Zero Clutter, Warm White `#f8fafc` & Crisp Pure White `#ffffff` surfaces).
- **Zero-Friction & Minimal Steps Operational Flow**:
  - **Walkthrough Meter Mode (`WalkthroughModal.jsx`)**: 1-click sequential hallway walkthrough mode allowing staff to input electric & water meters room-by-room with automated calculations, immediate unit cost feedback, and auto-advancing to the next room until completion. Reduces meter reading from 7 clicks per room down to 1 click + typing.
  - **1-Tap Quick Status Filters**: Instant pills on the dashboard to toggle between "All", "Pending Meter Readings", "Billed", and "Vacant" without multi-layered nested menus.
  - **1-Click Share & Print**: Direct buttons on room cards to print invoices or copy formatted bill text directly to clipboard for instant forwarding via LINE or SMS.
- **Mobile-First Thumb-Zone Architecture**:
  - Responsive Bottom Navigation Bar (`BottomNav.jsx`) optimized for one-handed operation.
  - Numeric inputs explicitly configured with `inputMode="numeric"` to summon the mobile numeric keypad automatically.
  - High-contrast visual cards with minimum 44px touch targets.
- **Data Visualization**:
  - Interactive 6-month comparative bar chart for electricity & water units.
  - Occupancy rate radial doughnut gauge with active/vacant breakdown.
  - Real-time live billing calculation badge.

### 7.2 Page & Route Mapping
1. `/` or `/dashboard`: KPI summary, occupancy donut, 6-month usage trends, urgent pending tasks.
2. `/utilities-monthly-usages`: Grid/Table view of all rooms with filter (All, Pending, Completed).
3. `/utilities-monthly-usages/record/:roomId/:utilityId`: Quick meter input form with auto-calculation.
4. `/bills/:roomId`: Bill history, breakdown, and printable invoice preview.
5. `/rooms`: Room list, occupancy status, room categories.
6. `/renters`: Renter directory, ID info, partner contacts, attached documents.
7. `/settings/*`: Apartment settings, room categories, utility categories, packages.

---

## 8. Deployment Specification: Docker Compose & Infrastructure

Services in `deployments/docker-compose.yml`:
1. `mysql`: MySQL 8.0 with automated seed migrations for apartment schema.
2. `keycloak`: Keycloak 24+ container with realm import mounted at startup.
3. `backend`: Multi-stage Go build (`golang:1.22-alpine` -> lightweight alpine runner).
4. `frontend`: Multi-stage React Vite build (`node:20-alpine` -> Nginx static server).
5. `nginx`: Reverse proxy routing port 80 to respective upstreams.

---

## 9. What is Left to the Builder
- Selection of specific React charting library (e.g. Recharts vs Chart.js wrapper; pure SVG is also supported).
- Exact PDF rendering engine in Go (e.g. `gofpdf`, `maroto`, or HTML-to-PDF template / Frontend print-stylesheet).
- Logging format (e.g. Zap or Zerolog in Go).

---

## 10. Acceptance Criteria
1. All legacy Lumen API endpoints have 1:1 functional counterparts in Go Echo.
2. React frontend renders on both desktop and mobile without horizontal overflow or UI breakage.
3. Keycloak authentication guards both frontend routes and backend Echo endpoints.
4. `docker-compose up` launches the entire environment cleanly and ready to use.
5. All batch implementation plans are documented in `docs/`.
