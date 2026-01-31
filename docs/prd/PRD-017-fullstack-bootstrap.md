# PRD-017: Full-Stack Application Bootstrap Command

**Status:** Draft
**Created:** 2026-01-31
**Author:** @user

---

## Problem Statement

Developers spend days or weeks setting up production-grade full-stack applications. The boilerplate includes:

- Frontend framework configuration
- Backend API setup
- Authentication flows
- Database connections
- CI/CD pipelines
- Testing infrastructure
- Docker containerization
- Environment management (staging/production)

This setup is repetitive, error-prone, and delays actual feature development. Developers need a way to bootstrap a production-ready application in minutes, not days.

## Solution

Add a `/pdd-bootstrap` command that generates a complete, opinionated full-stack application scaffold with:

### Technology Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 14 (App Router, static export) + Tailwind CSS |
| Backend | Python FastAPI on Google Cloud Run |
| Database | Firebase Firestore |
| Auth | Firebase Auth (Google OAuth + Email/Password) |
| Hosting | Firebase Hosting with Cloud Run rewrites (same-origin) |
| CI/CD | GitHub Actions (staging on push to main, prod on release tag) |
| Testing | Playwright E2E, pytest (backend), Vitest (frontend) |
| Containers | Docker for both frontend and backend |
| State Management | Zustand |
| Form Handling | react-hook-form |
| Data Fetching | TanStack Query |
| UI Feedback | Native (no external toast/modal libraries) |

### Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Firebase Hosting                          │
│  ┌─────────────────┐              ┌─────────────────────┐   │
│  │   Frontend      │              │   /api/* rewrite    │   │
│  │   Next.js       │              │   to Cloud Run      │   │
│  │   (static)      │              │                     │   │
│  └────────┬────────┘              └──────────┬──────────┘   │
└───────────┼──────────────────────────────────┼──────────────┘
            │                                  │
            │  Firebase ID Token               │
            │  in Authorization header         │
            ▼                                  ▼
┌─────────────────────────────────────────────────────────────┐
│                    Cloud Run (FastAPI)                       │
│  - Verifies Firebase token                                   │
│  - All Firestore operations                                  │
│  - Returns JSON to frontend                                  │
└─────────────────────────────────────────────────────────────┘
            │
            ▼
┌─────────────────────────────────────────────────────────────┐
│                    Firebase Firestore                        │
│  - Rules deny all direct client access                       │
│  - Only backend (Admin SDK) can read/write                   │
└─────────────────────────────────────────────────────────────┘
```

### Key Features

**Same-Origin Setup (No CORS)**
- Frontend at `/`
- Backend API at `/api/*` via Firebase Hosting rewrites
- Single domain, no CORS configuration needed

**Secure Auth Flow**
- Frontend handles auth UI only (Firebase JS SDK)
- Frontend sends ID token in `Authorization: Bearer <token>` header
- Backend verifies token with Firebase Admin SDK
- Backend performs all database operations

**Two-Environment Strategy**
- `{project-name}-staging` - deploys on push to main
- `{project-name}-prod` - deploys on release tag
- Separate Firebase projects under same billing account

**Frontend Features**
- Dark mode toggle (Tailwind dark: classes)
- PWA support (service worker, manifest.json)
- i18n setup (next-intl or similar)
- Loading and error states
- Form validation
- `data-testid` attributes on all interactive elements

**Backend Features**
- API versioning (`/api/v1/...`)
- OpenAPI documentation (`/api/docs`)
- Structured JSON logging (Cloud Logging compatible)
- Rate limiting (100 req/min per user)
- Request ID tracking (correlation IDs)
- Comprehensive error handling

**Auth Features**
- Google Sign-In
- Email/Password authentication
- Email verification flow
- Password reset flow
- "Remember me" session persistence

**Monitoring**
- Google Analytics (Firebase integration)

### Technical Specifications

**Frontend Architecture**

| Aspect | Choice | Notes |
|--------|--------|-------|
| State Management | Zustand | Lightweight, no boilerplate |
| Form Handling | react-hook-form | Performant, great DX |
| Data Fetching | TanStack Query | Caching, retry, optimistic updates |
| UI Feedback | Native | No toast library, use native alerts/dialogs |
| Modals/Dialogs | Native `<dialog>` | HTML5 dialog element |
| Dark Mode | System preference | Auto-detect, user can override |
| Styling | Tailwind defaults | No custom design tokens initially |

**Backend Architecture**

| Aspect | Choice | Notes |
|--------|--------|-------|
| Pagination | Cursor-based | Firestore-native, better for real-time |
| Soft Delete | Yes | `deleted_at` timestamp, can restore |
| API Envelope | Wrapped | `{"data": [...], "meta": {...}}` |
| Coverage Threshold | 80% | CI fails if below |

**Auth Configuration**

| Aspect | Value |
|--------|-------|
| Session Duration | 1 hour (default) |
| "Remember Me" Duration | 30 days |
| Concurrent Sessions | Unlimited (allowed) |

**Cloud Run Configuration**

| Setting | Value |
|---------|-------|
| Min Instances | 0 (cold starts OK) |
| Max Instances | 2 |
| Memory | 512Mi |
| CPU | 1 |
| Timeout | 60s |

**Todo Model (Minimal)**

```python
class Todo:
    id: str
    title: str           # max 200 chars
    description: str     # max 1000 chars, optional
    completed: bool
    user_id: str
    created_at: datetime
    updated_at: datetime
    deleted_at: datetime | None  # soft delete
```

**API Response Format**

```json
{
  "data": [...],
  "meta": {
    "cursor": "abc123",
    "has_more": true
  }
}
```

**Error Response Format**

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Title is required",
    "details": [...]
  }
}
```

## Acceptance Criteria

### Phase 1: Core Scaffold

- [ ] AC1: `/pdd-bootstrap` command creates project structure in current directory
- [ ] AC2: Command runs `git init` with initial commit automatically
- [ ] AC3: Command runs `npm install` for frontend dependencies
- [ ] AC4: Command runs `pip install -r requirements.txt` for backend dependencies
- [ ] AC5: If any tool (git, npm, pip, firebase) is missing, show helpful error with install instructions
- [ ] AC6: Frontend builds successfully with `npm run build`
- [ ] AC7: Backend starts successfully with `uvicorn app.main:app`
- [ ] AC8: `make dev` starts local development with Firebase emulators

### Phase 2: Authentication

- [ ] AC9: Login page with Google Sign-In button
- [ ] AC10: Login page with Email/Password form
- [ ] AC11: Sign-up flow creates new account
- [ ] AC12: Email verification sent on sign-up
- [ ] AC13: Password reset flow works end-to-end
- [ ] AC14: "Remember me" checkbox persists session
- [ ] AC15: Logout clears session and redirects to login
- [ ] AC16: Protected routes redirect to login if not authenticated

### Phase 3: Sample Application (Todo CRUD)

- [ ] AC17: Dashboard shows list of user's todos
- [ ] AC18: User can create new todo
- [ ] AC19: User can mark todo as complete/incomplete
- [ ] AC20: User can edit todo title/description
- [ ] AC21: User can delete todo (soft delete)
- [ ] AC22: Todos are user-scoped (users only see their own)
- [ ] AC23: Loading states shown during API calls (TanStack Query)
- [ ] AC24: Error states shown on API failures
- [ ] AC25: Pagination with cursor-based navigation

### Phase 4: Frontend Polish

- [ ] AC26: Dark mode auto-detects system preference
- [ ] AC27: Dark mode toggle allows user override (persisted to localStorage)
- [ ] AC28: PWA installable (manifest.json, service worker)
- [ ] AC29: i18n setup with at least English locale
- [ ] AC30: All interactive elements have `data-testid` attributes
- [ ] AC31: Form validation using react-hook-form on all inputs
- [ ] AC32: Responsive design (mobile-first)
- [ ] AC33: Zustand store for UI state (theme, sidebar, etc.)

### Phase 5: Backend API

- [ ] AC34: Health endpoints: `/api/health`, `/api/health/ready`, `/api/health/live`
- [ ] AC35: OpenAPI docs at `/api/docs`
- [ ] AC36: API versioning at `/api/v1/...`
- [ ] AC37: All endpoints require valid Firebase token (except health)
- [ ] AC38: Rate limiting returns 429 after 100 req/min
- [ ] AC39: Structured JSON logs with request IDs
- [ ] AC40: Proper HTTP status codes (201 on create, 404 on not found, etc.)
- [ ] AC41: Wrapped API response format with `data` and `meta` fields
- [ ] AC42: Cursor-based pagination in list endpoints

### Phase 6: CI/CD & Deployment

- [ ] AC43: `ci.yml` runs lint, type-check, unit tests on PR
- [ ] AC44: `ci.yml` fails if test coverage below 80%
- [ ] AC45: `deploy-staging.yml` deploys to staging on push to main
- [ ] AC46: `deploy-production.yml` deploys to production on release tag
- [ ] AC47: E2E tests run against staging after deploy
- [ ] AC48: Firestore rules deployed (deny all direct access)
- [ ] AC49: `scripts/setup-firebase.sh` creates both Firebase projects
- [ ] AC50: Cloud Run configured with min=0, max=2 instances

### Phase 7: Testing

- [ ] AC51: Backend unit tests pass with `pytest` (80%+ coverage)
- [ ] AC52: Frontend unit tests pass with `vitest` (80%+ coverage)
- [ ] AC53: E2E auth tests pass (login, logout, sign-up)
- [ ] AC54: E2E todo CRUD tests pass
- [ ] AC55: Tests use dedicated test user (not production data)

### Phase 8: Documentation

- [ ] AC56: README.md with setup instructions
- [ ] AC57: `.env.example` files for frontend and backend
- [ ] AC58: Makefile with common commands (dev, test, lint, deploy)
- [ ] AC59: OpenAPI client generation script documented

## Out of Scope

- Additional OAuth providers (GitHub, Apple, etc.)
- Preview deployments for PRs
- Error tracking (Sentry)
- Custom analytics beyond Google Analytics
- Database migrations (Firestore is schemaless)
- Multi-tenancy
- Admin dashboard
- File uploads (can be added later)

## Technical Notes

### Project Structure

```
project-root/
├── .github/workflows/
│   ├── ci.yml
│   ├── deploy-staging.yml
│   └── deploy-production.yml
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── login/page.tsx
│   │   │   └── dashboard/page.tsx
│   │   ├── components/
│   │   │   ├── auth/
│   │   │   └── todos/
│   │   ├── lib/
│   │   │   ├── firebase.ts
│   │   │   ├── api.ts
│   │   │   └── auth.ts
│   │   └── types/
│   ├── public/
│   ├── Dockerfile
│   ├── next.config.js
│   ├── tailwind.config.js
│   └── package.json
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── config.py
│   │   ├── dependencies.py
│   │   ├── routers/
│   │   ├── services/
│   │   ├── models/
│   │   ├── middleware/
│   │   └── utils/
│   ├── tests/
│   ├── Dockerfile
│   ├── requirements.txt
│   └── pyproject.toml
├── firebase/
│   ├── firestore.rules
│   └── firestore.indexes.json
├── e2e/
│   ├── tests/
│   └── playwright.config.ts
├── scripts/
│   ├── setup-firebase.sh
│   └── local-dev.sh
├── docker-compose.yml
├── firebase.json
├── .firebaserc
├── Makefile
└── README.md
```

### Implementation Phases

The LLM should implement this PRD in phases to manage workload:

**Phase 1** (Foundation): Project structure, configs, Dockerfiles, Makefile
**Phase 2** (Auth): Firebase auth integration, login/signup pages
**Phase 3** (API): FastAPI backend with health endpoints, auth middleware
**Phase 4** (CRUD): Todo model, endpoints, frontend components
**Phase 5** (Polish): Dark mode, PWA, i18n, form validation
**Phase 6** (CI/CD): GitHub Actions workflows
**Phase 7** (Testing): Unit tests, E2E tests
**Phase 8** (Docs): README, setup scripts, examples

### Environment Variables

**Frontend (.env.example)**
```
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

**Backend (.env.example)**
```
ENVIRONMENT=local|staging|production
GOOGLE_CLOUD_PROJECT=
FIREBASE_AUTH_EMULATOR_HOST=  # For local dev
FIRESTORE_EMULATOR_HOST=      # For local dev
```

### GitHub Secrets Required

Per environment (staging/production):
- `GCP_PROJECT_ID`
- `WIF_PROVIDER` (Workload Identity Federation)
- `WIF_SERVICE_ACCOUNT`
- `FIREBASE_SERVICE_ACCOUNT`
- `FIREBASE_API_KEY`
- `FIREBASE_AUTH_DOMAIN`
- `FIREBASE_PROJECT_ID`
- `FIREBASE_STORAGE_BUCKET`
- `FIREBASE_MESSAGING_SENDER_ID`
- `FIREBASE_APP_ID`
- `E2E_TEST_USER_EMAIL`
- `E2E_TEST_USER_PASSWORD`

---

## Changelog

| Date | Change |
|------|--------|
| 2026-01-31 | PRD created |
