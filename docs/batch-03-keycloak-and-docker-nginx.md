# Batch Plan 03: Keycloak Az Server, Nginx Reverse Proxy, and Docker Compose

> **Part of:** Apartment Management System Modernization  
> **Status:** Ready for Implementation  
> **Spec Reference:** `docs/superpowers/specs/2026-10-27-apartment-system-redesign.md`

## 1. Goal
Provide a production-ready, containerized deployment orchestration via Docker Compose. Configure Nginx as an upstream reverse proxy routing traffic to Frontend, Go API, and Keycloak Authorization Server.

## 2. File & Directory Structure
```
deployments/
├── docker-compose.yml
├── nginx/
│   ├── Dockerfile
│   └── nginx.conf
├── keycloak/
│   └── realm-export.json          # Pre-configured apartment-realm with clients & users
├── backend/
│   └── Dockerfile                 # Multi-stage Go build
└── frontend/
    └── Dockerfile                 # Multi-stage Vite build + Nginx static server
```

## 3. Tasks & Deliverables
- [ ] **Task 3.1**: Create `realm-export.json` with:
  - Realm: `apartment-realm`
  - Client `apartment-web` (public client, PKCE)
  - Client `apartment-api` (bearer-only)
  - Roles: `admin` and `staff`
  - Pre-seeded users: `admin` (`password: admin123`), `staff` (`password: staff123`)
- [ ] **Task 3.2**: Configure `nginx.conf`:
  - Port 80
  - Location `/` -> `http://frontend:80`
  - Location `/api/` -> `http://backend:8080/api/`
  - Location `/auth/` -> `http://keycloak:8080/`
  - Forwarded headers (`Host`, `X-Real-IP`, `X-Forwarded-For`, `X-Forwarded-Proto`, WebSocket upgrades).
- [ ] **Task 3.3**: Create Dockerfile for Go backend (using `golang:1.22-alpine` for build, `alpine:3.19` for minimal runtime image).
- [ ] **Task 3.4**: Create Dockerfile for React frontend (using `node:20-alpine` build, `nginx:alpine` runner).
- [ ] **Task 3.5**: Assemble `docker-compose.yml` defining services: `mysql`, `keycloak`, `backend`, `frontend`, and `nginx`.
- [ ] **Task 3.6**: Verify complete container launch and capture screenshots of running application.
