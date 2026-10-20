# IPS Oman — Integrated School Operations Platform

> **Version:** 1.0.0-alpha (Phase 1)
> **Spec:** School_Management_Features_Proposal_v2.2.docx
> **Status:** 🚧 Under active development

---

## 🏫 About

A centralized, role-based school operations platform for IPS Oman that connects:
- Administration & Principal
- Teachers
- Parents & Guardians
- Students
- Receptionists
- Transport, Cafeteria, Medical, Security staff

Combines a **web portal** (Next.js) + **REST API** (Laravel) + **mobile apps** (React Native/Expo) on one data model.

---

## 📁 Project Structure

```
school-platform/
  web/        → Next.js 14 (TypeScript) — Admin & User Web Portal
  backend/    → Laravel 11 (PHP) — REST API
  mobile/     → React Native + Expo (TypeScript) — Android & iOS App
  docs/       → Architecture, API specs, security docs
```

---

## 🚀 Quick Start (Phase 1 — Web Portal Only)

### Prerequisites
- Node.js v18+ ✅ (you have v22.23.3)
- PHP 8.3 ❌ (needs install)
- Composer ❌ (needs install)
- MySQL 8.x ❌ (needs install)

### Run the Web Portal (frontend only — mock data)
```powershell
cd web
npm install
npm run dev
# Open http://localhost:3000
```

### Run the Full Stack (after PHP/MySQL installed)
```powershell
# Terminal 1 — Backend API
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve
# API at http://localhost:8000

# Terminal 2 — Web Portal
cd web
npm install
npm run dev
# Portal at http://localhost:3000

# Terminal 3 — Mobile (after Expo CLI installed)
cd mobile
npm install
npx expo start
```

---

## 👥 User Roles

| Role | Web | Mobile |
|------|-----|--------|
| Super Admin | ✅ | — |
| Principal / School Admin | ✅ | ✅ |
| Receptionist | ✅ | — |
| Teacher | ✅ | ✅ |
| Parent / Guardian | ✅ | ✅ |
| Student | ✅ | ✅ |
| Transport Manager / Driver | ✅ | ✅ |
| Cafeteria Staff | ✅ | — |
| Nurse / Student Care | ✅ | ✅ |
| Security / Gate Staff | ✅ | ✅ |

---

## 📦 Modules (Phased)

### Phase 1 (Current)
- [x] Project scaffolding & architecture
- [x] Role-based UI shell & navigation
- [ ] Authentication system (Laravel Sanctum)
- [ ] Student & Guardian records
- [ ] Guardian-child verification
- [ ] Core dashboards per role

### Phase 2
- [ ] Attendance & notifications
- [ ] Academics / Timetable / Homework
- [ ] Examinations
- [ ] Parent & Student portal

### Phase 3
- [ ] Appointments & Reception
- [ ] Cafeteria & meal requests
- [ ] Library management
- [ ] Leave management
- [ ] News & academic calendar
- [ ] Online classes & daily lectures

### Phase 4
- [ ] Transport GPS & live video gateway
- [ ] Visitor & authorized pickup
- [ ] Medical & student-care workflows
- [ ] Inventory & duty rosters
- [ ] Games & Security Guide
- [ ] Reports & audit logs

---

## 🔒 Security

- Server-side role + record-level authorization (never UI-only)
- Guardian-child verification — parent never sees another child's data
- MFA (TOTP) for Super Admin, Principal, Nurse roles
- Audit logging on every create/update/delete
- Encrypted transport (HTTPS in production)
- Medical, location, video, safeguarding: separate restricted permissions

---

## 🌐 WordPress Integration

The existing ipsoman.com WordPress site is **untouched**. Integration = a single HTML link in the WordPress navigation menu pointing to the portal URL. No database crossover. No plugin required. No WordPress code changes.

---

## 📋 Proposal Reference

Full functional specification: `School_Management_Features_Proposal_v2.2.docx`

Located at: `C:\Users\Ghulam Hussain\Downloads\`

---

## 📄 License

Private — IPS Oman internal use only. Not for public distribution.
