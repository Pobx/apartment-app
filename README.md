# Apartment Management System (ApartmentOS) v2.0

> Re-Designed with Modern Minimal Aesthetics, Kanit Google Typography, Data Visualization, Hexagonal Architecture (Golang + Echo), Keycloak Authorization Server, and Container Deployment (Docker Compose + Nginx).

---

## 📸 ผลงานการออกแบบ UI & ภาพถ่ายหน้าจอ (Screenshots)

* **Desktop View**: [`docs/screenshots/01-minimal-desktop-dashboard.png`](docs/screenshots/01-minimal-desktop-dashboard.png)
* **Mobile View (iPhone 390px)**: [`docs/screenshots/02-minimal-mobile-dashboard.png`](docs/screenshots/02-minimal-mobile-dashboard.png)
* **UI Showcase & Interactive Mockups**: [`docs/screenshots/03-ui-showcase-kanit.png`](docs/screenshots/03-ui-showcase-kanit.png)

---

## 🏗️ โครงสร้างสถาปัตยกรรม (Architecture)

```text
apartment-app/
├── frontend/                   # React 18 + Vite + Tailwind CSS + Kanit Font
│   ├── src/
│   │   ├── components/         # Layout (Navbar, Sidebar, BottomNav), Charts
│   │   └── pages/              # Dashboard, WalkthroughModal, UtilitiesUsage, Rooms, Renters
├── backend/                    # Golang 1.22+ with Echo Framework (Hexagonal Pattern)
│   ├── cmd/api/main.go         # Bootstrap & DI wiring
│   └── internal/
│       ├── core/domain/        # Pure Entities: apartment, room, renter, utility, bill, dashboard
│       ├── core/ports/         # Inbound Services & Outbound Repositories contracts
│       ├── core/services/      # Business logic: calculation formulas & minimum rate rules
│       └── adapters/           # Echo Handlers, Keycloak JWT Middleware, GORM MySQL Repositories
├── deployments/                # Container Orchestration
│   ├── docker-compose.yml      # MySQL 8.0, Keycloak 24, Go Backend, React Frontend, Nginx
│   ├── nginx/nginx.conf        # Upstream Reverse Proxy (:80)
│   └── keycloak/realm-export.json # Realm `apartment-realm` with admin/staff roles
└── docs/                       # Batch Plans & Specs (.md)
    ├── superpowers/specs/      # 2026-10-27-apartment-system-redesign.md
    ├── superpowers/plans/      # 2026-10-27-apartment-system-plan.md
    └── batch-*.md              # Batch 01, 02, 03 Plan Files
```

---

## ⚡ ไฮไลต์ฟีเจอร์เด่น (Key Highlights)

1. **Modern Minimal UI (Kanit Google Font)**
   - โทนสีขาวนวลสบายตา (`#F8FAFC`) มีระยะหายใจ (Airy Whitespace) และจัดลำดับความสำคัญของข้อมูลชัดเจน
   - กราฟแท่งเปรียบเทียบสถิติการใช้ไฟฟ้า & น้ำประปา 6 เดือนล่าสุด และ Donut Chart สัดส่วนการเข้าพัก
2. **โหมดเดินจดมิเตอร์ด่วน (1-Click Walkthrough Mode)**
   - หน้าแรกมีแบนเนอร์แตะครั้งเดียวเพื่อเริ่มโหมดเดินจดมิเตอร์ตามชั้น พิมพ์ตัวเลขแล้วคำนวณเงินสดใสอัตโนมัติ และกด "บันทึก & ไปห้องถัดไป" ได้ต่อเนื่องจนครบทั้งตึก
3. **1-Tap Quick Filter & 1-Click Action**
   - แตะเลือกดู `[ทั้งหมด]` `[⚠️ รอจดมิเตอร์]` `[ออกบิลแล้ว]` `[ห้องว่าง]` ได้ในคลิกเดียว
   - การ์ดห้องพักมีปุ่มลัดพิมพ์ใบเสร็จ และคัดลอกสรุปยอดบิลส่ง LINE ได้ทันที
4. **Mobile-First Ergonomics**
   - แถบเมนูด้านล่าง (Bottom Navigation Bar) สะดวกต่อการใช้นิ้วโป้งมือเดียว
   - ช่องกรอกตัวเลขเด้งคีย์บอร์ดตัวเลข (`inputMode="numeric"`) อัตโนมัติบนมือถือ
   - ไม่มีการหลุดขอบหน้าจอ (0% Horizontal Overflow)

---

## 🚀 วิธีการติดตั้งและรันระบบ (Quick Start)

### วิธีที่ 1: รันผ่าน Docker Compose (แนะนำ)

สั่งงานเพียงคำสั่งเดียวเพื่อเริ่มต้น Services ทั้งหมด (Nginx, Go Echo API, React Frontend, Keycloak, MySQL):

```bash
cd deployments
docker-compose up -d --build
```

#### URL บริการต่างๆ:
* **Web Frontend (React SPA)**: [http://localhost](http://localhost)
* **Backend API (Go Echo)**: [http://localhost/api/](http://localhost/api/)
* **Keycloak Authorization Server**: [http://localhost/auth/](http://localhost/auth/)
  - **Realm**: `apartment-realm`
  - **Admin**: `admin` / `admin123`
  - **Staff**: `staff` / `staff123`

---

### วิธีที่ 2: รันแบบ Standalone ในเครื่อง Local

#### 1. Backend (Go Echo)
```bash
cd backend
go test -v ./...       # รัน Unit Tests ทดสอบสูตรคำนวณบิล
go run ./cmd/api       # เริ่มต้นเซิร์ฟเวอร์บนพอร์ต :8080
```

#### 2. Frontend (React Vite)
```bash
cd frontend
npm install
npm run dev            # เริ่มต้น Dev Server บนพอร์ต :3000
```
