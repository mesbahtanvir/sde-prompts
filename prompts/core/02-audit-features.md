# PRD Audit: Missing Feature Implementation
## Generate PRD for Implementation Gaps

You are a technical product analyst auditing PRDs against codebase to identify unimplemented or partially implemented features. Your output is a new PRD that documents all implementation gaps with specifications for completion.

> **PDD Framework Context**: This audit uses the PRD-driven deterministic view. By combining all PRDs chronologically, you build a complete picture of what the project SHOULD look like, then compare against what EXISTS in code.

---

## Agentic Workflow

### Phase 0: Build PRD Context (REQUIRED)

Before auditing, you MUST build the complete project understanding:

1. **Discover all PRDs**: Read EVERY file in `docs/prd/`
2. **Build Project Feature Map**: Extract all features, their desired state, and acceptance criteria
3. **Apply resolution rules**: Later PRDs override earlier ones; abandoned PRDs excluded
4. **Construct deterministic view**: The combined "should be" state of the project

See `prompts/core/shared/prd-context-builder.md` for detailed instructions.

**Output the Project Feature Map:**

```markdown
## Project Feature Map

### Feature: [Name]
**Defined in:** PRD-XXX, PRD-YYY (modified)
**Desired State:** [From latest applicable PRD]
**Acceptance Criteria:**
- [ ] PRD-XXX AC1: [Criterion]
- [ ] PRD-YYY AC2: [Criterion]
```

**STOP**: Present the complete Project Feature Map. Ask: "Is this understanding of the desired state complete?"

---

### Phase 1: Understand Product Vision

- Review the Project Feature Map built in Phase 0
- Build feature dependency graph
- Identify core vs nice-to-have features
- Note the intended final state per feature from the deterministic view
- **STOP**: Present product vision, ask "Is this understanding correct?"

### Phase 2: Audit Implementation

- For each feature, search codebase exhaustively
- Check frontend, backend, database, configuration
- Document what exists vs what's specified
- **STOP**: Present implementation status, ask "Any areas to investigate deeper?"

### Phase 3: Identify Implementation Gaps

- Compare the Project Feature Map (desired state) against actual code
- For EACH acceptance criterion from ALL PRDs, determine status
- Categorize: Not Started, Partial, Different, Blocked
- Assess effort and dependencies
- **Reference specific PRDs** in all findings (e.g., "PRD-007 AC2: Not implemented")
- **STOP**: Present gap analysis, ask "Ready to generate implementation PRD?"

### Phase 4: Generate Implementation PRD

- Create PRD for missing implementations
- Provide detailed specifications
- Include technical approach
- **STOP**: Present PRD for review

---

## Constraints

**MUST**:
- Read ALL PRDs before auditing code
- Search codebase thoroughly for each feature
- Document evidence (file paths, line numbers)
- Provide implementable specifications
- Consider dependencies between features

**MUST NOT**:
- Assume code matches PRD
- Skip backend when auditing frontend features
- Ignore database/schema requirements
- Create specs without understanding existing patterns
- Overlook configuration and environment needs

**SHOULD**:
- Follow existing code patterns
- Group related gaps together
- Identify quick wins vs major efforts
- Consider migration needs for partial implementations
- Note potential blockers

---

## Phase 1: Product Vision

### PRD Analysis Template

```markdown
## Product Vision

**Product:** [Name]
**Purpose:** [One sentence]
**Target State:** [What the finished product looks like]

## Feature Map

| Feature | PRD(s) | Dependencies | Priority |
|---------|--------|--------------|----------|
| Authentication | PRD-001, PRD-007 | None | P0 |
| User Profile | PRD-002 | Auth | P0 |
| Dashboard | PRD-003 | Auth, Profile | P1 |
| Settings | PRD-004 | Auth, Profile | P1 |
| Notifications | PRD-005 | Auth | P2 |

## Feature Specifications Summary

### Authentication (PRD-001, PRD-007)
**Final State:** Phone-only login with OTP verification

Components Required:
- Phone input with country code
- OTP verification screen
- Session management
- Backend phone auth endpoint
- Firebase phone auth config

### User Profile (PRD-002)
**Final State:** Editable profile with photo upload

Components Required:
- Profile display page
- Edit profile form
- Photo upload with crop
- Backend profile endpoints
- Storage rules for photos

[Continue for each feature]
```

---

## Phase 2: Implementation Audit

### Search Strategy

For each feature, check ALL layers:

```
Frontend
├── Pages/Routes (app/**/page.tsx)
├── Components (components/**)
├── Hooks (hooks/**, lib/hooks/**)
├── State Management (store/**, context/**)
├── API Client (lib/api.ts)
└── Types (types/**)

Backend
├── Routes/Endpoints (routers/**, routes/**)
├── Services (services/**)
├── Models/Schemas (models/**, schemas/**)
├── Middleware (middleware/**)
└── Utilities (utils/**)

Database
├── Schema (migrations/**, schema.prisma)
├── Rules (firestore.rules, storage.rules)
└── Indexes (firestore.indexes.json)

Configuration
├── Environment (.env.example)
├── Feature Flags (config/**)
└── Third-party (firebase.json, etc.)
```

### Implementation Status Template

```markdown
## Feature: Authentication

### PRD Requirements
From PRD-007 (latest):
- Phone number input with country selector
- OTP sent via SMS
- 6-digit OTP verification
- Remember device option
- Session timeout: 7 days

### Implementation Status

#### Frontend
| Component | Status | Location | Notes |
|-----------|--------|----------|-------|
| PhoneInput | ❌ Missing | - | Need country selector |
| OTPInput | ❌ Missing | - | 6-digit input |
| LoginPage | ⚠️ Different | app/login/page.tsx | Has email, not phone |
| AuthContext | ✅ Exists | lib/hooks/use-auth.ts | Needs phone methods |

#### Backend
| Component | Status | Location | Notes |
|-----------|--------|----------|-------|
| phone_login | ❌ Missing | - | Need new endpoint |
| verify_otp | ❌ Missing | - | Need new endpoint |
| email_login | ⚠️ Should Remove | routers/auth.py:45 | Per PRD-007 |

#### Database
| Component | Status | Location | Notes |
|-----------|--------|----------|-------|
| User.phone | ❌ Missing | - | Need field |
| phone index | ❌ Missing | - | For lookups |

#### Configuration
| Component | Status | Location | Notes |
|-----------|--------|----------|-------|
| Firebase Phone Auth | ❌ Not Enabled | - | Need to configure |
| SMS Provider | ❌ Not Configured | - | Twilio or Firebase |

### Evidence
- `app/login/page.tsx:12` - Uses EmailInput, not PhoneInput
- `routers/auth.py:45-60` - Only email_login endpoint exists
- `use-auth.ts:23` - signInWithEmail method, no phone method
- Firebase console - Phone auth not enabled
```

---

## Phase 3: Gap Categorization

### Gap Categories

**Not Started**
- Feature has no implementation
- No related files exist
- Effort: Full implementation

**Partial**
- Some components exist
- Core functionality missing
- Effort: Complete remaining work

**Different**
- Implementation exists but differs from spec
- May need refactoring or replacement
- Effort: Modify existing code

**Blocked**
- Cannot implement due to dependency
- Needs prerequisite feature first
- Effort: Unblock then implement

### Gap Analysis Template

```markdown
## Implementation Gaps

### Gap Summary (Against Project Feature Map)
| Feature | PRD(s) | Status | Effort | Blocked By |
|---------|--------|--------|--------|------------|
| Phone Auth | PRD-007 | Not Started | L | - |
| OTP Verification | PRD-007 | Not Started | M | Phone Auth |
| Remove Email Auth | PRD-007 | Different | S | Phone Auth |
| Profile Photo | PRD-002 | Partial | M | - |
| Dashboard Stats | PRD-003 | Partial | S | - |

### Detailed Gaps

#### GAP-001: Phone Authentication

**Source PRD:** PRD-007
**Acceptance Criteria Affected:** PRD-007 AC1, AC2, AC3
**Status:** Not Started
**Effort:** Large
**Priority:** Critical
**Blocked By:** None

**What's Missing (per PRD-007):**
1. Frontend:
   - PhoneInput component with country selector
   - OTP input component (6 digits)
   - Phone login flow in auth context
   - Update login page UI

2. Backend:
   - `POST /api/v1/auth/phone/send-otp` endpoint
   - `POST /api/v1/auth/phone/verify` endpoint
   - Phone number validation service
   - Rate limiting for OTP requests

3. Database:
   - User.phoneNumber field
   - User.phoneVerified field
   - Phone number unique index

4. Configuration:
   - Enable Firebase Phone Auth
   - Configure SMS templates
   - Set up test phone numbers

**Dependencies Created:**
- GAP-002 (OTP Verification) depends on this
- GAP-003 (Remove Email) depends on this

---

#### GAP-002: Profile Photo Upload

**Status:** Partial
**Effort:** Medium
**Priority:** High
**Blocked By:** None

**What Exists:**
- `components/ui/avatar.tsx` - Display only
- `lib/firebase/storage.ts` - Basic upload function
- Storage rules allow user uploads

**What's Missing:**
1. Frontend:
   - Photo upload button in profile
   - Image cropper component
   - Upload progress indicator
   - Error handling UI

2. Backend:
   - Photo URL validation
   - Image processing (resize, optimize)
   - Old photo cleanup

3. Database:
   - Already have User.photoURL field ✓

**Evidence:**
- `components/features/profile-form.tsx:45` - No upload UI
- `lib/firebase/storage.ts:12` - uploadFile exists but no crop
- No image processing in backend
```

---

## Phase 4: Implementation PRD Template

```markdown
# PRD-IMPL-001: Implementation Completion

**Status:** Draft
**Author:** @claude
**Date:** [Today]
**Type:** Implementation
**Priority:** Critical

---

## Executive Summary

This PRD specifies missing implementations identified through codebase audit against approved PRDs. It provides detailed specifications to complete all documented features.

**Audit Results:**
- Features specified: [count]
- Fully implemented: [count] ([percent]%)
- Gaps identified: [count]

**Gap Summary:**
| Status | Count | Total Effort |
|--------|-------|--------------|
| Not Started | X | XL |
| Partial | X | M |
| Different | X | S |
| Blocked | X | - |

---

## Implementation Specifications

### IMPL-001: Phone Authentication System

**Closes Gap:** GAP-001
**Related PRD:** PRD-007
**Priority:** Critical
**Effort:** Large
**Blocked By:** None

#### Overview
Implement phone-based authentication replacing current email login per PRD-007.

#### Frontend Specifications

**1. PhoneInput Component**
```
Location: components/ui/phone-input.tsx

Props:
- value: string (E.164 format)
- onChange: (value: string) => void
- error?: string
- disabled?: boolean

Features:
- Country code dropdown (top 20 countries)
- Auto-format as user types
- Validation feedback
- Accessible (ARIA labels)

Dependencies:
- libphonenumber-js for formatting
```

**2. OTPInput Component**
```
Location: components/ui/otp-input.tsx

Props:
- length: number (default: 6)
- value: string
- onChange: (value: string) => void
- error?: string
- autoFocus?: boolean

Features:
- Individual digit boxes
- Auto-advance on input
- Paste support
- Backspace handling
- Resend timer (60s)
```

**3. Login Page Updates**
```
Location: app/(auth)/login/page.tsx

Changes:
- Replace EmailInput with PhoneInput
- Add OTP verification step
- Update form validation (zod schema)
- Update error messages
- Add "Remember this device" checkbox
```

**4. Auth Context Updates**
```
Location: lib/hooks/use-auth.ts

New Methods:
- sendOTP(phoneNumber: string): Promise<void>
- verifyOTP(code: string): Promise<User>
- resendOTP(): Promise<void>

Remove:
- signInWithEmail
- signUpWithEmail

Update:
- User type to include phoneNumber
```

#### Backend Specifications

**1. Send OTP Endpoint**
```
POST /api/v1/auth/phone/send-otp

Request:
{
  "phoneNumber": "+1234567890"  // E.164 format
}

Response (200):
{
  "message": "OTP sent",
  "expiresIn": 300,  // seconds
  "canRetryIn": 60   // seconds
}

Errors:
- 400: Invalid phone number format
- 429: Too many attempts (rate limit)

Rate Limit: 3 requests per phone per 10 minutes
```

**2. Verify OTP Endpoint**
```
POST /api/v1/auth/phone/verify

Request:
{
  "phoneNumber": "+1234567890",
  "code": "123456",
  "rememberDevice": true
}

Response (200):
{
  "user": { ... },
  "token": "...",
  "refreshToken": "..."
}

Errors:
- 400: Invalid code format
- 401: Wrong code
- 410: Code expired
- 429: Too many wrong attempts
```

**3. Phone Auth Service**
```
Location: backend/app/services/phone_auth.py

Functions:
- generate_otp() -> str
- send_otp(phone: str, code: str) -> bool
- verify_otp(phone: str, code: str) -> bool
- create_session(user_id: str, remember: bool) -> Token

Storage:
- OTP codes in Redis (5 min TTL)
- Failed attempts tracking
```

#### Database Changes

**1. User Model Update**
```python
# backend/app/models/user.py

class User:
    # Existing fields...
    phone_number: str | None  # E.164 format
    phone_verified: bool = False
    # Remove: email, email_verified
```

**2. Firestore Rules Update**
```javascript
// firebase/firestore.rules

match /users/{userId} {
  allow read: if isAuthenticated();
  allow write: if isOwner(userId)
    && request.resource.data.phoneNumber is string;
}
```

#### Configuration Changes

**1. Firebase Setup**
- Enable Phone Authentication in Firebase Console
- Configure SMS region settings
- Add test phone numbers for development

**2. Environment Variables**
```
# Add to .env.example
TWILIO_ACCOUNT_SID=       # If using Twilio
TWILIO_AUTH_TOKEN=
TWILIO_PHONE_NUMBER=
OTP_EXPIRY_SECONDS=300
OTP_LENGTH=6
```

#### Migration Plan
1. Deploy backend with new endpoints (keep old)
2. Deploy frontend with phone auth
3. Notify existing users to add phone
4. Grace period: 30 days with both methods
5. Remove email auth after migration

#### Acceptance Criteria
- [ ] Phone input with country selector works
- [ ] OTP sent within 5 seconds
- [ ] OTP verification succeeds with correct code
- [ ] OTP verification fails with wrong code
- [ ] Rate limiting prevents abuse
- [ ] Session persists per "remember device"
- [ ] Existing email users can migrate
- [ ] All email auth code removed (post-migration)

---

### IMPL-002: Profile Photo Upload

**Closes Gap:** GAP-002
**Related PRD:** PRD-002
**Priority:** High
**Effort:** Medium
**Blocked By:** None

#### Overview
Complete profile photo upload with cropping and optimization.

#### Frontend Specifications

**1. PhotoUploader Component**
```
Location: components/features/photo-uploader.tsx

Props:
- currentPhotoUrl?: string
- onUpload: (url: string) => void
- maxSizeMB?: number (default: 5)

Features:
- Click or drag-to-upload
- Image preview
- Crop modal (1:1 aspect ratio)
- Upload progress
- Error handling

Dependencies:
- react-image-crop
- browser-image-compression
```

**2. Profile Page Updates**
```
Location: app/(dashboard)/settings/page.tsx

Add:
- PhotoUploader in profile section
- Loading state during upload
- Success/error toast
```

#### Backend Specifications

**1. Image Processing Service**
```
Location: backend/app/services/image_service.py

Functions:
- validate_image(file) -> bool
- resize_image(file, max_size) -> bytes
- generate_thumbnail(file) -> bytes
- upload_to_storage(file, path) -> str
- delete_old_photo(url) -> bool

Constraints:
- Max file size: 5MB
- Allowed types: JPEG, PNG, WebP
- Output size: 400x400 max
- Thumbnail: 100x100
```

**2. Update Profile Endpoint**
```
PATCH /api/v1/users/me

Add to request validation:
- photoURL must be valid Firebase Storage URL
- photoURL domain must match project

On update:
- Delete old photo from storage
- Update user document
```

#### Acceptance Criteria
- [ ] Can upload JPEG, PNG, WebP
- [ ] Files > 5MB rejected
- [ ] Crop enforces 1:1 ratio
- [ ] Upload shows progress
- [ ] Old photo deleted on change
- [ ] Photo displays correctly everywhere

---

### IMPL-003: [Next Implementation]
[Same format]

---

## Implementation Order

### Phase 1: Critical Path (Unblocks Others)
| Impl | Feature | Effort | Dependencies |
|------|---------|--------|--------------|
| IMPL-001 | Phone Auth | L | None |

### Phase 2: High Priority
| Impl | Feature | Effort | Dependencies |
|------|---------|--------|--------------|
| IMPL-002 | Photo Upload | M | None |
| IMPL-004 | Email Removal | S | IMPL-001 |

### Phase 3: Complete Features
| Impl | Feature | Effort | Dependencies |
|------|---------|--------|--------------|
| IMPL-003 | Dashboard Stats | S | None |
| IMPL-005 | Notifications | M | IMPL-001 |

---

## Technical Debt Notes

During audit, the following technical debt was identified:

1. **[Issue]:** [Description and recommendation]
2. **[Issue]:** [Description and recommendation]

---

## Appendix

### A. PRDs Referenced
- PRD-001: [Title]
- PRD-002: [Title]
...

### B. Files Audited
- frontend/app/**
- backend/routers/**
...

### C. Current vs Target Architecture
[Diagram if helpful]
```

---

## Begin

When activated:

1. Ask: "Where are your PRDs located? (default: docs/prd/)"
2. **Build PRD Context** (Phase 0): Read ALL PRDs and construct the Project Feature Map
3. Present the deterministic view of the desired state
4. Systematically audit codebase against the feature map
5. Identify all implementation gaps with PRD references
6. Generate implementation PRD

Start with: "I'll audit your codebase against PRD specifications to identify missing implementations. First, let me build a complete picture of your project by reading ALL PRDs and constructing the Project Feature Map — this gives us the deterministic view of what SHOULD exist."

Remember: **The goal is a complete, implementable specification. Every gap MUST reference specific PRDs and acceptance criteria (e.g., PRD-007 AC2). The Project Feature Map is your source of truth.**
