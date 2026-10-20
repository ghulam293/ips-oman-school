# IPS Oman — System Architecture

## Overview

```
┌─────────────────────────────────────────────────────────────┐
│                   ipsoman.com (WordPress)                    │
│              PRODUCTION — UNTOUCHED — READ ONLY              │
│   Only connection: HTML link → portal.ipsoman.com (Phase 5) │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│              school-platform (New System)                    │
│                                                              │
│  ┌──────────────┐   REST API    ┌──────────────────────┐    │
│  │  Next.js 14  │ ──────────── │   Laravel 11 API     │    │
│  │  Web Portal  │   (HTTPS)    │  /api/v1/...         │    │
│  │  :3000       │              │  :8000               │    │
│  └──────────────┘              └──────────┬───────────┘    │
│                                           │                  │
│  ┌──────────────┐   REST API              │                  │
│  │ React Native │ ──────────────────────  │                  │
│  │ Expo Mobile  │   (HTTPS + Bearer)      │                  │
│  │  Android/iOS │                         ▼                  │
│  └──────────────┘              ┌──────────────────────┐    │
│                                 │   MySQL 8.x          │    │
│                                 │  school_platform DB  │    │
│                                 │  :3306               │    │
│                                 └──────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

## Technology Stack

| Component | Technology | Version |
|-----------|-----------|---------|
| Web Frontend | Next.js (App Router) | 14.x |
| Frontend Language | TypeScript | 5.x |
| UI Styling | Tailwind CSS + custom CSS | 3.x |
| Backend API | Laravel | 11.x |
| Backend Language | PHP | 8.3 |
| Authentication | Laravel Sanctum | — |
| Mobile | React Native + Expo | SDK 51 |
| Database | MySQL | 8.x |
| Queue/Jobs | Laravel Queues | — |
| Audit Logging | owen-it/laravel-auditing | — |
| Notifications | Firebase FCM (push), SMTP (email), Twilio (SMS) | — |
| MFA | pragmarx/google2fa-laravel | — |
| i18n (web) | next-intl | — |
| i18n (mobile) | expo-localization + i18next | — |
| File Storage | Laravel Storage (local→S3) | — |

## API Design

- Base URL: `/api/v1/`
- Authentication: Bearer token (mobile), Cookie session (web)
- Format: JSON
- Versioned: `/api/v1/`, future `/api/v2/`
- Rate limiting: 60 req/min (general), 5 req/min (login)
- All responses follow structure:
  ```json
  {
    "success": true,
    "data": { ... },
    "message": "...",
    "meta": { "page": 1, "total": 100 }
  }
  ```

## Database Design Principles

1. Soft deletes on all student, guardian, staff records
2. All FK relationships defined with cascade rules
3. `audit_logs` table records every INSERT/UPDATE/DELETE
4. Guardian-student link requires `is_verified = 1` before parent can access child data
5. Medical, counseling, safeguarding data in separate tables with separate policy checks
6. No direct SQL in controllers — all via Eloquent + Policies

## Module → API Route Map

| Module | Route Prefix |
|--------|-------------|
| Auth | `/api/v1/auth/` |
| Students | `/api/v1/students/` |
| Guardians | `/api/v1/guardians/` |
| Staff | `/api/v1/staff/` |
| Attendance | `/api/v1/attendance/` |
| Academics | `/api/v1/academics/` |
| Homework | `/api/v1/homework/` |
| Examinations | `/api/v1/examinations/` |
| Online Classes | `/api/v1/online-classes/` |
| Appointments | `/api/v1/appointments/` |
| Cafeteria | `/api/v1/cafeteria/` |
| Library | `/api/v1/library/` |
| Leave | `/api/v1/leave/` |
| Transport | `/api/v1/transport/` |
| Medical | `/api/v1/medical/` |
| Visitors | `/api/v1/visitors/` |
| Notifications | `/api/v1/notifications/` |
| Reports | `/api/v1/reports/` |
| Audit | `/api/v1/audit/` |
| Settings | `/api/v1/settings/` |

## Security Layers

1. **Network**: HTTPS only in production, CORS whitelist
2. **Authentication**: Sanctum tokens (mobile) / sessions (web)
3. **Authorization**: Laravel Policies (per-record), Gates (per-action)
4. **MFA**: TOTP for privileged roles (Super Admin, Principal, Nurse)
5. **Input**: FormRequest validation on every endpoint
6. **Rate Limiting**: Login 5/min, API 60/min, notifications 10/min
7. **Audit**: Every data change logged with actor, timestamp, diff
8. **Child Safety**: Guardian-child link enforced at API layer — never UI only
9. **Data Isolation**: Medical/safeguarding in separate restricted tables
10. **File Safety**: Uploaded files scanned, type-checked, stored outside webroot

## WordPress Integration (Phase 5)

Zero database crossover. Zero code changes to WordPress.

Steps:
1. Log in to WordPress Admin
2. Appearance → Menus
3. Add Custom Link: URL = `https://portal.ipsoman.com`, Label = `Staff/Parent Portal`
4. Save menu

Optional future: OAuth2 SSO widget (requires explicit approval before implementation).
