# Full-Stack Application Bootstrap

**Usage:** `/pdd-bootstrap [project-name]`

Bootstrap a production-grade full-stack web application with Next.js, FastAPI, Firebase, and GitHub Actions.

**Project name:** $ARGUMENTS

---

## Pre-flight Checks

Before starting, verify required tools are installed:

```bash
# Check each tool
git --version
node --version
npm --version
python3 --version
pip3 --version
```

If any tool is missing, stop and provide install instructions:

| Tool | Install Command |
|------|-----------------|
| Git | `brew install git` or https://git-scm.com |
| Node.js | `brew install node` or https://nodejs.org |
| Python | `brew install python` or https://python.org |

**STOP if any tool is missing.** Do not proceed without all tools.

---

## Phase 1: Project Structure

Create the project directory structure:

```
{project-name}/
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
│   │   │   │   ├── LoginForm.tsx
│   │   │   │   ├── SignupForm.tsx
│   │   │   │   └── AuthProvider.tsx
│   │   │   ├── todos/
│   │   │   │   ├── TodoList.tsx
│   │   │   │   ├── TodoItem.tsx
│   │   │   │   └── TodoForm.tsx
│   │   │   └── ui/
│   │   │       ├── Button.tsx
│   │   │       ├── Input.tsx
│   │   │       └── Dialog.tsx
│   │   ├── hooks/
│   │   │   ├── useAuth.ts
│   │   │   └── useTodos.ts
│   │   ├── lib/
│   │   │   ├── firebase.ts
│   │   │   ├── api.ts
│   │   │   └── auth.ts
│   │   ├── stores/
│   │   │   └── uiStore.ts
│   │   └── types/
│   │       └── index.ts
│   ├── public/
│   │   ├── manifest.json
│   │   └── sw.js
│   ├── Dockerfile
│   ├── next.config.js
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   ├── vitest.config.ts
│   ├── .env.example
│   └── package.json
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py
│   │   ├── config.py
│   │   ├── dependencies.py
│   │   ├── routers/
│   │   │   ├── __init__.py
│   │   │   ├── health.py
│   │   │   └── todos.py
│   │   ├── services/
│   │   │   ├── __init__.py
│   │   │   └── firestore.py
│   │   ├── models/
│   │   │   ├── __init__.py
│   │   │   └── todo.py
│   │   ├── middleware/
│   │   │   ├── __init__.py
│   │   │   ├── auth.py
│   │   │   ├── logging.py
│   │   │   └── rate_limit.py
│   │   └── utils/
│   │       ├── __init__.py
│   │       └── responses.py
│   ├── tests/
│   │   ├── __init__.py
│   │   ├── conftest.py
│   │   ├── test_health.py
│   │   └── test_todos.py
│   ├── Dockerfile
│   ├── requirements.txt
│   ├── pyproject.toml
│   └── .env.example
├── firebase/
│   ├── firestore.rules
│   └── firestore.indexes.json
├── e2e/
│   ├── tests/
│   │   ├── auth.spec.ts
│   │   └── todos.spec.ts
│   └── playwright.config.ts
├── scripts/
│   ├── setup-firebase.sh
│   └── local-dev.sh
├── docker-compose.yml
├── firebase.json
├── .firebaserc
├── Makefile
├── .gitignore
└── README.md
```

---

## Phase 2: Configuration Files

### Root Configuration

**Makefile:**

```makefile
.PHONY: dev test lint build deploy-staging deploy-prod

# Development
dev:
	docker-compose up

dev-frontend:
	cd frontend && npm run dev

dev-backend:
	cd backend && uvicorn app.main:app --reload --port 8000

# Testing
test:
	cd frontend && npm test
	cd backend && pytest

test-e2e:
	cd e2e && npx playwright test

# Linting
lint:
	cd frontend && npm run lint
	cd backend && ruff check .

# Build
build:
	cd frontend && npm run build
	cd backend && docker build -t backend .

# Deploy
deploy-staging:
	firebase deploy --only hosting,firestore:rules --project staging

deploy-prod:
	firebase deploy --only hosting,firestore:rules --project production
```

**docker-compose.yml:**

```yaml
version: '3.8'

services:
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_API_URL=http://localhost:8000
    volumes:
      - ./frontend:/app
      - /app/node_modules

  backend:
    build: ./backend
    ports:
      - "8000:8000"
    environment:
      - ENVIRONMENT=local
      - FIRESTORE_EMULATOR_HOST=firebase:8080
      - FIREBASE_AUTH_EMULATOR_HOST=firebase:9099
    volumes:
      - ./backend:/app
    depends_on:
      - firebase

  firebase:
    image: ghcr.io/nicholasjackson/firebase-emulator:latest
    ports:
      - "4000:4000"   # Emulator UI
      - "8080:8080"   # Firestore
      - "9099:9099"   # Auth
```

**firebase.json:**

```json
{
  "hosting": {
    "public": "frontend/out",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [
      {
        "source": "/api/**",
        "run": {
          "serviceId": "backend",
          "region": "us-central1"
        }
      },
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  },
  "firestore": {
    "rules": "firebase/firestore.rules",
    "indexes": "firebase/firestore.indexes.json"
  },
  "emulators": {
    "auth": { "port": 9099 },
    "firestore": { "port": 8080 },
    "ui": { "enabled": true, "port": 4000 }
  }
}
```

**.firebaserc:**

```json
{
  "projects": {
    "staging": "{project-name}-staging",
    "production": "{project-name}-prod"
  }
}
```

**.gitignore:**

```
# Dependencies
node_modules/
__pycache__/
*.pyc
.venv/
venv/

# Build outputs
.next/
out/
dist/
*.egg-info/

# Environment
.env
.env.local
.env.*.local

# IDE
.idea/
.vscode/
*.swp
*.swo

# Testing
coverage/
.coverage
htmlcov/
.pytest_cache/

# Firebase
.firebase/

# OS
.DS_Store
Thumbs.db
```

---

## Phase 3: Frontend Implementation

### package.json

```json
{
  "name": "{project-name}-frontend",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "vitest",
    "test:coverage": "vitest --coverage"
  },
  "dependencies": {
    "next": "14.1.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "firebase": "^10.8.0",
    "zustand": "^4.5.0",
    "react-hook-form": "^7.50.0",
    "@tanstack/react-query": "^5.18.0"
  },
  "devDependencies": {
    "@types/node": "^20.11.0",
    "@types/react": "^18.2.0",
    "typescript": "^5.3.0",
    "tailwindcss": "^3.4.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0",
    "vitest": "^1.2.0",
    "@vitejs/plugin-react": "^4.2.0",
    "eslint": "^8.56.0",
    "eslint-config-next": "14.1.0"
  }
}
```

### Key Frontend Files

**src/lib/firebase.ts:**

```typescript
import { initializeApp, getApps } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(app);

if (process.env.NODE_ENV === 'development') {
  connectAuthEmulator(auth, 'http://localhost:9099');
}
```

**src/lib/api.ts:**

```typescript
import { auth } from './firebase';

const API_BASE = '/api/v1';

async function getAuthHeaders(): Promise<HeadersInit> {
  const user = auth.currentUser;
  if (!user) return {};

  const token = await user.getIdToken();
  return { Authorization: `Bearer ${token}` };
}

export async function apiGet<T>(path: string): Promise<T> {
  const headers = await getAuthHeaders();
  const res = await fetch(`${API_BASE}${path}`, { headers });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error?.message || 'API Error');
  }

  return res.json();
}

export async function apiPost<T>(path: string, body: unknown): Promise<T> {
  const headers = await getAuthHeaders();
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: { ...headers, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error?.message || 'API Error');
  }

  return res.json();
}

// Similar for apiPut, apiPatch, apiDelete...
```

**src/stores/uiStore.ts:**

```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UIState {
  theme: 'light' | 'dark' | 'system';
  sidebarOpen: boolean;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  toggleSidebar: () => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      theme: 'system',
      sidebarOpen: true,
      setTheme: (theme) => set({ theme }),
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
    }),
    { name: 'ui-storage' }
  )
);
```

---

## Phase 4: Backend Implementation

### requirements.txt

```
fastapi==0.109.0
uvicorn[standard]==0.27.0
firebase-admin==6.4.0
python-dotenv==1.0.0
pydantic==2.6.0
pydantic-settings==2.1.0
structlog==24.1.0
slowapi==0.1.9
pytest==8.0.0
pytest-asyncio==0.23.0
pytest-cov==4.1.0
httpx==0.26.0
ruff==0.2.0
```

### Key Backend Files

**app/main.py:**

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.middleware.logging import LoggingMiddleware
from app.middleware.rate_limit import limiter
from app.routers import health, todos

app = FastAPI(
    title=f"{settings.PROJECT_NAME} API",
    version="1.0.0",
    docs_url="/api/docs",
    openapi_url="/api/openapi.json",
)

# Middleware
app.add_middleware(LoggingMiddleware)
app.state.limiter = limiter

# CORS (only needed for local dev, production uses same-origin)
if settings.ENVIRONMENT == "local":
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["http://localhost:3000"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

# Routers
app.include_router(health.router, prefix="/api", tags=["health"])
app.include_router(todos.router, prefix="/api/v1", tags=["todos"])
```

**app/middleware/auth.py:**

```python
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from firebase_admin import auth

security = HTTPBearer()

async def verify_token(
    credentials: HTTPAuthorizationCredentials = Depends(security),
) -> dict:
    """Verify Firebase ID token and return decoded token."""
    try:
        decoded = auth.verify_id_token(credentials.credentials)
        return decoded
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail={"error": {"code": "INVALID_TOKEN", "message": "Invalid or expired token"}},
        )

async def get_current_user(token: dict = Depends(verify_token)) -> str:
    """Extract user ID from verified token."""
    return token["uid"]
```

**app/routers/todos.py:**

```python
from fastapi import APIRouter, Depends, HTTPException, status
from typing import Optional

from app.dependencies import get_current_user
from app.models.todo import TodoCreate, TodoUpdate, TodoResponse, TodoListResponse
from app.services.firestore import TodoService
from app.utils.responses import wrap_response, wrap_list_response

router = APIRouter()

@router.get("/todos", response_model=TodoListResponse)
async def list_todos(
    cursor: Optional[str] = None,
    limit: int = 20,
    user_id: str = Depends(get_current_user),
):
    """List user's todos with cursor-based pagination."""
    todos, next_cursor, has_more = await TodoService.list_by_user(
        user_id, cursor=cursor, limit=limit
    )
    return wrap_list_response(todos, cursor=next_cursor, has_more=has_more)

@router.post("/todos", response_model=TodoResponse, status_code=status.HTTP_201_CREATED)
async def create_todo(
    todo: TodoCreate,
    user_id: str = Depends(get_current_user),
):
    """Create a new todo."""
    created = await TodoService.create(user_id, todo)
    return wrap_response(created)

@router.patch("/todos/{todo_id}", response_model=TodoResponse)
async def update_todo(
    todo_id: str,
    todo: TodoUpdate,
    user_id: str = Depends(get_current_user),
):
    """Update a todo."""
    updated = await TodoService.update(user_id, todo_id, todo)
    if not updated:
        raise HTTPException(status_code=404, detail={"error": {"code": "NOT_FOUND", "message": "Todo not found"}})
    return wrap_response(updated)

@router.delete("/todos/{todo_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_todo(
    todo_id: str,
    user_id: str = Depends(get_current_user),
):
    """Soft delete a todo."""
    deleted = await TodoService.soft_delete(user_id, todo_id)
    if not deleted:
        raise HTTPException(status_code=404, detail={"error": {"code": "NOT_FOUND", "message": "Todo not found"}})
```

**app/models/todo.py:**

```python
from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field

class TodoBase(BaseModel):
    title: str = Field(..., max_length=200)
    description: Optional[str] = Field(None, max_length=1000)

class TodoCreate(TodoBase):
    pass

class TodoUpdate(BaseModel):
    title: Optional[str] = Field(None, max_length=200)
    description: Optional[str] = Field(None, max_length=1000)
    completed: Optional[bool] = None

class Todo(TodoBase):
    id: str
    completed: bool = False
    user_id: str
    created_at: datetime
    updated_at: datetime
    deleted_at: Optional[datetime] = None

class TodoResponse(BaseModel):
    data: Todo

class TodoListResponse(BaseModel):
    data: list[Todo]
    meta: dict
```

---

## Phase 5: CI/CD Workflows

**.github/workflows/ci.yml:**

```yaml
name: CI

on:
  pull_request:
    branches: [main]

jobs:
  frontend:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: frontend
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          cache-dependency-path: frontend/package-lock.json
      - run: npm ci
      - run: npm run lint
      - run: npm run build
      - run: npm run test:coverage
      - name: Check coverage threshold
        run: |
          COVERAGE=$(cat coverage/coverage-summary.json | jq '.total.lines.pct')
          if (( $(echo "$COVERAGE < 80" | bc -l) )); then
            echo "Coverage $COVERAGE% is below 80% threshold"
            exit 1
          fi

  backend:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: backend
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: '3.11'
          cache: 'pip'
      - run: pip install -r requirements.txt
      - run: ruff check .
      - run: pytest --cov=app --cov-fail-under=80
```

**.github/workflows/deploy-staging.yml:**

```yaml
name: Deploy to Staging

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      id-token: write

    steps:
      - uses: actions/checkout@v4

      - id: auth
        uses: google-github-actions/auth@v2
        with:
          workload_identity_provider: ${{ secrets.WIF_PROVIDER_STAGING }}
          service_account: ${{ secrets.WIF_SERVICE_ACCOUNT_STAGING }}

      - uses: google-github-actions/setup-gcloud@v2

      # Build and deploy backend to Cloud Run
      - name: Deploy Backend
        run: |
          gcloud run deploy backend \
            --source backend \
            --region us-central1 \
            --min-instances 0 \
            --max-instances 2 \
            --memory 512Mi \
            --cpu 1 \
            --timeout 60s \
            --allow-unauthenticated

      # Build and deploy frontend to Firebase Hosting
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: cd frontend && npm ci && npm run build

      - uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: ${{ secrets.GITHUB_TOKEN }}
          firebaseServiceAccount: ${{ secrets.FIREBASE_SERVICE_ACCOUNT_STAGING }}
          projectId: ${{ secrets.FIREBASE_PROJECT_ID_STAGING }}
          channelId: live

  e2e:
    needs: deploy
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: cd e2e && npm ci
      - run: npx playwright install --with-deps
      - run: npx playwright test
        env:
          BASE_URL: https://${{ secrets.FIREBASE_PROJECT_ID_STAGING }}.web.app
          E2E_TEST_USER_EMAIL: ${{ secrets.E2E_TEST_USER_EMAIL }}
          E2E_TEST_USER_PASSWORD: ${{ secrets.E2E_TEST_USER_PASSWORD }}
```

**.github/workflows/deploy-production.yml:**

```yaml
name: Deploy to Production

on:
  release:
    types: [published]

jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      id-token: write

    steps:
      - uses: actions/checkout@v4

      - id: auth
        uses: google-github-actions/auth@v2
        with:
          workload_identity_provider: ${{ secrets.WIF_PROVIDER_PROD }}
          service_account: ${{ secrets.WIF_SERVICE_ACCOUNT_PROD }}

      - uses: google-github-actions/setup-gcloud@v2

      - name: Deploy Backend
        run: |
          gcloud run deploy backend \
            --source backend \
            --region us-central1 \
            --min-instances 0 \
            --max-instances 2 \
            --memory 512Mi \
            --cpu 1 \
            --timeout 60s \
            --allow-unauthenticated

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: cd frontend && npm ci && npm run build

      - uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: ${{ secrets.GITHUB_TOKEN }}
          firebaseServiceAccount: ${{ secrets.FIREBASE_SERVICE_ACCOUNT_PROD }}
          projectId: ${{ secrets.FIREBASE_PROJECT_ID_PROD }}
          channelId: live
```

---

## Phase 6: Firebase Security Rules

**firebase/firestore.rules:**

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Deny all direct client access
    // All operations go through backend with Admin SDK
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

---

## Phase 7: Environment Examples

**frontend/.env.example:**

```
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

**backend/.env.example:**

```
ENVIRONMENT=local
GOOGLE_CLOUD_PROJECT=
FIREBASE_AUTH_EMULATOR_HOST=localhost:9099
FIRESTORE_EMULATOR_HOST=localhost:8080
```

---

## Execution Instructions

1. **Create all directories first** using `mkdir -p`
2. **Write configuration files** (Makefile, docker-compose.yml, firebase.json, etc.)
3. **Write frontend files** in order: package.json, configs, then source files
4. **Write backend files** in order: requirements.txt, configs, then source files
5. **Write CI/CD workflows**
6. **Initialize git** and create initial commit
7. **Run npm install** in frontend directory
8. **Run pip install** in backend directory (suggest creating venv first)

**STOP after each phase** to show progress and ask if user wants to continue.

---

## Constraints

**MUST:**

- Create all files with proper formatting and no syntax errors
- Include `data-testid` attributes on all interactive frontend elements
- Use cursor-based pagination in all list endpoints
- Wrap all API responses in `{"data": ..., "meta": ...}` format
- Include proper TypeScript types for all frontend code
- Include proper Pydantic models for all backend code

**MUST NOT:**

- Skip any file from the structure
- Use external toast/notification libraries (use native only)
- Allow direct Firestore access from frontend
- Hard-code any secrets or API keys
- Create files without proper error handling

---

## Reference

This command implements **PRD-017: Full-Stack Application Bootstrap Command**.

See `docs/prd/PRD-017-fullstack-bootstrap.md` for complete specifications.
