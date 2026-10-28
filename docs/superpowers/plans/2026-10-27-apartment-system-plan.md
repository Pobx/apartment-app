# Apartment Management System Modernization & Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Re-design the Apartment Management System into a modern, white-toned, mobile-responsive React+Tailwind SPA with Kanit typography and interactive charts, backed by a Golang+Echo API built with Hexagonal Architecture, secured by Keycloak, and orchestrated by Docker Compose + Nginx.

**Architecture:** Monorepo with separated services: Go Echo backend (`backend/`) structured via Ports & Adapters, React 18 SPA (`frontend/`) styled with Tailwind and Kanit font, Keycloak 24+ Authorization Server, and Nginx reverse proxy routing port 80 upstreams in Docker Compose.

**Tech Stack:** React 18, Vite, Tailwind CSS, Kanit Google Font, Golang 1.22+, Echo v4, GORM MySQL, Keycloak 24+, Nginx, Docker Compose.

**Spec:** `docs/superpowers/specs/2026-10-27-apartment-system-redesign.md`

## Global Constraints
- Typography: Kanit Google Font across all UI elements.
- Design: Clean white tone (`#f8fafc` / `#ffffff`), soft shadows, high legibility.
- Mobile: Fully responsive with bottom tab bar for on-site meter readings.
- Business Logic: 100% preservation of legacy utility rate formulas and minimum charges.
- Security: Keycloak JWT verification in Echo middleware.
- Batch Plans: Stored in `docs/` (`batch-01-database-and-backend-hexagonal.md`, `batch-02-frontend-react-vite-tailwind.md`, `batch-03-keycloak-and-docker-nginx.md`).

## Review Focus
- Utility minimum rate calculation (usage $\le$ min_rate gets charged min_price, not usage $\times$ rate).
- Mobile viewport overflow (tables and meter forms must render without horizontal layout breaking).
- Buddhist Era date calculations ($+543$ years) for printed bills and receipts.
- Token validation in Echo middleware (unauthorized requests return 401).
- Reverse proxy header forwarding (Nginx preserves real IP and host).

---

### Task 1: Go Echo Backend with Hexagonal Architecture
**Files:**
- Create: `backend/go.mod`, `backend/cmd/api/main.go`
- Create: `backend/internal/core/domain/*.go`
- Create: `backend/internal/core/ports/**/*.go`
- Create: `backend/internal/adapters/inbound/http/**/*.go`
- Create: `backend/internal/adapters/outbound/**/*.go`
- Test: `backend/tests/billing_test.go`

- [ ] Step 1: Initialize Go module and install Echo v4, GORM, MySQL driver, and JWT library.
- [ ] Step 2: Write unit test for utility calculation logic in `backend/tests/billing_test.go`.
- [ ] Step 3: Implement domain models and port interfaces.
- [ ] Step 4: Implement MySQL persistence adapters and Echo HTTP handlers.
- [ ] Step 5: Implement Keycloak JWT authentication middleware.
- [ ] Step 6: Run tests and ensure all pass (`go test ./...`).

---

### Task 2: React + Vite + Tailwind CSS Frontend with Kanit Font
**Files:**
- Create: `frontend/package.json`, `frontend/vite.config.js`, `frontend/tailwind.config.js`
- Create: `frontend/index.html`, `frontend/src/index.css`
- Create: `frontend/src/components/**/*.{jsx,js}`
- Create: `frontend/src/pages/*.jsx`
- Create: `frontend/src/api/*.js`

- [ ] Step 1: Scaffold Vite React project with Tailwind and Kanit font imports.
- [ ] Step 2: Implement responsive layout (desktop sidebar + mobile bottom bar + glass header).
- [ ] Step 3: Implement interactive data visualization charts (6-month utility trends & occupancy donut).
- [ ] Step 4: Implement Dashboard, Meter Reading Table, Smart Fast Calculator modal, and Room/Renter pages.
- [ ] Step 5: Implement Printable Invoice & Bill modal with Buddhist Era dates.
- [ ] Step 6: Verify build compiles cleanly (`npm run build`).

---

### Task 3: Infrastructure, Docker Compose, Nginx, and Keycloak
**Files:**
- Create: `deployments/docker-compose.yml`
- Create: `deployments/nginx/nginx.conf`
- Create: `deployments/keycloak/realm-export.json`
- Create: `backend/Dockerfile`, `frontend/Dockerfile`

- [ ] Step 1: Create Keycloak realm export JSON with `apartment-realm`, clients, roles, and seed users.
- [ ] Step 2: Create Nginx reverse proxy configuration routing `/`, `/api/`, and `/auth/`.
- [ ] Step 3: Create backend and frontend Dockerfiles.
- [ ] Step 4: Assemble `docker-compose.yml` with all 5 services.

---

### Task 4: Verification, Execution & Screenshot Capture
- [ ] Step 1: Launch application and verify responsive layout.
- [ ] Step 2: Capture desktop and mobile screenshots of the redesigned UI using headless browser.
- [ ] Step 3: Save screenshots to `docs/screenshots/` and present results.
