# Batch Plan 01: Database Models & Backend API (Golang + Echo + Hexagonal Pattern)

> **Part of:** Apartment Management System Modernization  
> **Status:** Ready for Implementation  
> **Spec Reference:** `docs/superpowers/specs/2026-10-27-apartment-system-redesign.md`

## 1. Goal
Implement the Golang backend using Echo framework and Hexagonal Architecture (Ports & Adapters), preserving all existing database schema, calculations, and endpoints from the legacy Lumen API.

## 2. File & Directory Structure
```
backend/
├── go.mod
├── go.sum
├── cmd/
│   └── api/
│       └── main.go
├── internal/
│   ├── core/
│   │   ├── domain/
│   │   │   ├── apartment.go
│   │   │   ├── room.go
│   │   │   ├── renter.go
│   │   │   ├── utility.go
│   │   │   ├── bill.go
│   │   │   └── dashboard.go
│   │   └── ports/
│   │       ├── inbound/
│   │       │   ├── apartment_service.go
│   │       │   ├── room_service.go
│   │       │   ├── renter_service.go
│   │       │   ├── utility_service.go
│   │       │   ├── billing_service.go
│   │       │   └── dashboard_service.go
│   │       └── outbound/
│   │           ├── apartment_repository.go
│   │           ├── room_repository.go
│   │           ├── renter_repository.go
│   │           ├── utility_repository.go
│   │           ├── billing_repository.go
│   │           └── dashboard_repository.go
│   └── adapters/
│       ├── inbound/
│       │   └── http/
│       │       ├── router.go
│       │       ├── middleware/
│       │       │   ├── auth_keycloak.go
│       │       │   └── cors.go
│       │       └── handlers/
│       │           ├── apartment_handler.go
│       │           ├── room_handler.go
│       │           ├── renter_handler.go
│       │           ├── utility_handler.go
│       │           ├── usage_handler.go
│       │           ├── bill_handler.go
│       │           └── dashboard_handler.go
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
│               └── bill_generator.go
└── tests/
    └── calculation_test.go
```

## 3. Tasks & Deliverables
- [ ] **Task 1.1**: Initialize Go module `apartment-api` with Echo v4, GORM MySQL driver, and golang-jwt/jwt.
- [ ] **Task 1.2**: Define pure Domain Entities:
  - `Apartment`: ID, Name, Status (`new_apartment`, `active_apartment`, etc.).
  - `RoomCategory`: ID, Name, Status.
  - `Room`: ID, Name, ApartmentsID, RoomCategoriesID, Price, RentersID, UtilitiesPackagesID, Status.
  - `UtilityCategory`: ID, Name, PricePerUnitCost, PricePerUnit, UnitMinRate, UnitMinPrice, Type (`unit`/`monthly`), Status.
  - `UtilityPackage` & `UtilityPackageItem`.
  - `Renter`, `RenterPartner`, `RenterAttachedFile`.
  - `UtilityMonthlyUsage`: RoomID, UtilityCategoriesID, UtilityMemoDate, LatestUnitAmount, CurrentUnitAmount, UnitAmount, PricePerUnit, TotalPrice, Status.
  - `Bill`: Receipt data structure with Buddhist Era ($+543$ years) formatting.
- [ ] **Task 1.3**: Implement Inbound & Outbound Port interfaces.
- [ ] **Task 1.4**: Implement GORM Database Repositories with auto-migration / schema compatibility with existing MySQL tables.
- [ ] **Task 1.5**: Implement Business Services (Calculation logic: minimum unit rate check, tiered utility billing).
- [ ] **Task 1.6**: Implement Echo Handlers & Keycloak OIDC Middleware (verifying Bearer token signature or providing dev bypass header).
- [ ] **Task 1.7**: Write unit tests for utility billing calculation:
  - If usage $\le$ unit min rate, verify price equals unit min price.
  - If usage $>$ unit min rate, verify price equals usage $\times$ price per unit.
  - Verify total bill equals room price $+$ utility items total.
