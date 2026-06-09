# ZapShift — System Architecture Documentation

**Version:** 2.1  
**Author Role:** Senior Software Architect  

---

## 1. Architecture Overview

ZapShift follows a **Layered Monolith** architecture on the backend with a **Feature-Based** frontend. This is intentional: it's simple enough to build and explain in interviews, yet structured in a way that can extract to microservices later without rewriting business logic.

```
┌─────────────────────────────────────────────────────────┐
│                     CLIENT (React)                       │
│         Feature-Based SPA with React Query               │
└──────────────────────┬──────────────────────────────────┘
                       │ HTTPS / REST API
┌──────────────────────▼──────────────────────────────────┐
│               API GATEWAY (Express.js)                   │
│     Rate Limiting · CORS · Request Logging               │
└──────┬──────────────┬───────────────┬───────────────────┘
       │              │               │
┌──────▼──────┐ ┌─────▼──────┐ ┌─────▼──────┐
│  Auth Layer │ │Route Layer │ │Middleware  │
│  JWT verify │ │  /v1/...   │ │ RBAC check │
└──────┬──────┘ └─────┬──────┘ └─────┬──────┘
       └──────────────▼───────────────┘
┌──────────────────────────────────────────────────────────┐
│                  CONTROLLER LAYER                         │
│          Request parsing · Response formatting            │
└──────────────────────┬───────────────────────────────────┘
                       │
┌──────────────────────▼───────────────────────────────────┐
│                   SERVICE LAYER                           │
│          Business Logic · Validation · Rules              │
└──────────────────────┬───────────────────────────────────┘
                       │
┌──────────────────────▼───────────────────────────────────┐
│                 REPOSITORY LAYER                          │
│         Database queries · Data mapping                   │
└──────────────────────┬───────────────────────────────────┘
                       │
┌──────────────────────▼───────────────────────────────────┐
│              DATABASE (MongoDB)                           │
│   Collections: users · parcels · notifications · logs    │
└──────────────────────────────────────────────────────────┘
```

---

## 2. Frontend Architecture

### Technology Stack
- **Framework:** React 18 (Vite)
- **Routing:** React Router v6
- **State (Server):** TanStack Query (React Query)
- **State (UI):** Zustand (lightweight global UI state)
- **Styling:** Tailwind CSS
- **Charts:** Recharts
- **Forms:** React Hook Form + Zod
- **HTTP:** Axios with interceptors
- **Auth:** JWT stored in httpOnly cookie (or localStorage with refresh)

### Component Strategy
```
3 levels of components:

1. UI Primitives   → Button, Badge, Input, Card, Modal
                     (no business logic, fully reusable)

2. Feature Components → ParcelCard, DeliveryTimeline, StatWidget
                        (knows about domain, no API calls)

3. Page Components  → AdminDashboard, UserParcels, TrackingPage
                      (composes features, handles data fetching)
```

### Route Structure
```
/                          → Home (public)
/login                     → Login (public)
/register                  → Register (public)

/dashboard                 → Role-based redirect:
  /dashboard/admin         → Admin Dashboard
  /dashboard/manager       → Manager Dashboard
  /dashboard/user          → User Dashboard
  /dashboard/delivery      → Delivery Man Dashboard

/parcels                   → Parcel list (role-filtered)
/parcels/create            → Create parcel (User only)
/parcels/:id               → Parcel detail + tracking
/parcels/:id/edit          → Edit parcel (User, if pending)

/admin/users               → User management (Admin only)
/admin/delivery-men        → Delivery man management (Admin only)
/admin/analytics           → Full analytics with revenue (Admin only)

/manager/parcels           → All parcels — approve & assign (Manager)
/manager/delivery-men      → View delivery men, performance (Manager)
/manager/analytics         → Operational analytics, no revenue (Manager)

/profile                   → Profile edit (all roles)
/notifications             → Notification center
```

---

## 3. Backend Architecture

### Technology Stack
- **Runtime:** Node.js (LTS)
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Auth:** JWT (access + refresh token pattern)
- **Validation:** Joi or Zod
- **File Upload:** Multer + Cloudinary
- **Logging:** Winston

### Layered Architecture Explained

**Controller Layer**
- Receives HTTP request
- Extracts and validates input
- Calls the appropriate service
- Formats and sends HTTP response
- Has NO business logic

**Service Layer**
- All business rules live here
- Orchestrates multiple repositories
- Throws domain-specific errors
- Is framework-agnostic (can be tested without Express)

**Repository Layer**
- Wraps all database queries
- Returns plain objects (not Mongoose documents)
- Single responsibility: data access only
- Makes database swapping possible

---

## 4. Database Architecture (MongoDB)

### Collections

#### `users`
```
{
  _id, name, email, passwordHash,
  role: "admin" | "manager" | "user" | "delivery_man",
  phone, profileImage, isActive,
  createdAt, updatedAt
}
```

#### `parcels`
```
{
  _id, trackingId (unique, auto-generated),
  senderId (ref: users),
  senderName, senderPhone, senderAddress,
  receiverName, receiverPhone, receiverAddress,
  weight, description, price,
  status: "pending"|"approved"|"assigned"|"picked_up"|"in_transit"|"delivered"|"cancelled",
  assignedTo (ref: users, nullable),
  statusHistory: [
    { status, changedBy (ref:users), timestamp, note }
  ],
  createdAt, updatedAt
}
```

#### `notifications`
```
{
  _id, userId (ref: users),
  type: "parcel_approved"|"parcel_assigned"|"parcel_delivered"|"parcel_cancelled",
  message, parcelId (ref: parcels),
  isRead, createdAt
}
```

#### `activityLogs`
```
{
  _id, actorId (ref: users), actorRole,
  action, targetType, targetId,
  metadata (JSON), ipAddress,
  createdAt
}
```

### Index Strategy
```
users:       email (unique), role
parcels:     trackingId (unique), senderId, assignedTo, status, createdAt
notifications: userId + isRead (compound), createdAt
activityLogs: actorId, createdAt
```

### Relationships
```
users ──< parcels (one user has many parcels as sender)
users ──< parcels (one delivery man has many assigned parcels)
users ──< notifications (one user has many notifications)
parcels ─< statusHistory (embedded array, not separate collection)
```

---

## 5. API Architecture

### Versioning
All endpoints prefixed with `/api/v1/` for forward compatibility.

### Response Format (Standardized)
```json
// Success
{
  "success": true,
  "message": "Parcel created successfully",
  "data": { ... }
}

// Paginated
{
  "success": true,
  "data": [ ... ],
  "pagination": {
    "total": 120,
    "page": 1,
    "limit": 10,
    "totalPages": 12
  }
}

// Error
{
  "success": false,
  "message": "Parcel not found",
  "errorCode": "PARCEL_NOT_FOUND"
}
```

### Core Endpoint Groups
```
POST   /api/v1/auth/login
POST   /api/v1/auth/register
POST   /api/v1/auth/refresh
POST   /api/v1/auth/logout

GET    /api/v1/users              (admin)
GET    /api/v1/users/:id
PATCH  /api/v1/users/:id
DELETE /api/v1/users/:id          (admin)

GET    /api/v1/parcels            (role-filtered)
POST   /api/v1/parcels
GET    /api/v1/parcels/:id
PATCH  /api/v1/parcels/:id
DELETE /api/v1/parcels/:id

PATCH  /api/v1/parcels/:id/approve       (admin, manager)
PATCH  /api/v1/parcels/:id/assign        (admin, manager)
PATCH  /api/v1/parcels/:id/status        (delivery man)
PATCH  /api/v1/parcels/:id/cancel        (user/admin/manager)

GET    /api/v1/notifications             (current user)
PATCH  /api/v1/notifications/read-all
PATCH  /api/v1/notifications/:id/read

GET    /api/v1/analytics/overview        (admin, manager — revenue hidden for manager)
GET    /api/v1/analytics/parcels-trend   (admin, manager)
GET    /api/v1/analytics/delivery-performance (admin, manager)
GET    /api/v1/analytics/revenue         (admin only)

GET    /api/v1/dashboard/admin
GET    /api/v1/dashboard/manager
GET    /api/v1/dashboard/user
GET    /api/v1/dashboard/delivery-man
```

---

## 6. Authentication Architecture

### JWT Strategy
```
Login → Issue:
  accessToken  (expires: 15 min)
  refreshToken (expires: 7 days, stored in httpOnly cookie)

Protected request:
  Authorization: Bearer <accessToken>

Token expired:
  POST /auth/refresh → new accessToken issued

Logout:
  Refresh token invalidated server-side (blocklist or DB flag)
```

### RBAC Middleware
```
Request → verifyToken → attachUser → checkRole(allowedRoles[]) → Controller

Examples:
router.patch('/approve', verifyToken, checkRole(['admin', 'manager']), approveParcel)
router.delete('/:id',    verifyToken, checkRole(['admin']),             deleteParcel)
router.get('/revenue',   verifyToken, checkRole(['admin']),             getRevenue)
```

---

## 7. State Management Strategy

### Server State (TanStack Query)
Used for all API data. Provides:
- Automatic caching and background refetch
- Loading/error states out of the box
- Optimistic updates for status changes
- Query invalidation after mutations

### UI State (Zustand)
Used only for:
- Sidebar open/closed
- Active notification panel
- Global modals (confirmation dialogs)
- Toast queue

**Rule:** If the data comes from the server, it's React Query. Everything else is Zustand.

---

## 8. Error Handling

### Backend
```
Global error middleware catches all thrown errors:
- ValidationError → 400
- AuthenticationError → 401
- AuthorizationError → 403
- NotFoundError → 404
- ConflictError → 409
- InternalError → 500

All errors include: message + errorCode (for frontend mapping)
```

### Frontend
```
Axios interceptor:
- 401 → trigger token refresh or redirect to login
- 403 → show "Access Denied" page
- 500 → show generic error toast

React Query:
- onError callback → show toast with message
- Error boundary for full-page crashes
```

---

## 9. File Upload Strategy

**User Profile Image**
- Upload via Multer → sent to Cloudinary
- Store Cloudinary URL in user document
- Max size: 2MB, formats: jpg/png/webp

**Parcel Proof Images** (Future)
- Delivery Man uploads on delivery confirmation
- Same Cloudinary pipeline
- Max 3 images per parcel

---

## 10. Logging Strategy

### Activity Logs
Every state-changing action logs:
- Who did it (actor, role)
- What they did (action string)
- What was affected (entity type + ID)
- When (timestamp)
- From where (IP address)

### Audit Trail (statusHistory in Parcel)
Embedded in each parcel document:
- Gives a complete timeline of who changed what and when
- Queryable without joins

---

## 11. Scalability Path

### Current (Portfolio Phase)
- Single Express server
- Single MongoDB instance (Atlas free tier)
- Vercel (frontend) + Render/Railway (backend)

### Phase 2 (Production Ready)
- Add Redis for refresh token storage and rate limiting
- Add job queue (Bull) for notification processing
- Add WebSocket layer (Socket.io) for real-time updates

### Phase 3 (Scale Out)
- Extract notification service as separate microservice
- Add CDN for static assets
- Add MongoDB Atlas with replica sets
- Horizontal scaling with PM2 cluster or containerize with Docker

### Phase 4 (Enterprise)
- Extract to full microservices (auth, parcels, notifications, analytics)
- API Gateway (Kong or custom)
- Kafka for event streaming between services
