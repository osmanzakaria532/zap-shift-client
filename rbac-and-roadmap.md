# ZapShift — Role Permission Matrix

## Complete Permission Table

| Permission | Admin | Manager | User | Delivery Man |
|-----------|:-----:|:-------:|:----:|:------------:|
| **DASHBOARD** | | | | |
| View Admin Dashboard | ✅ | ❌ | ❌ | ❌ |
| View Manager Dashboard | ❌ | ✅ | ❌ | ❌ |
| View User Dashboard | ❌ | ❌ | ✅ | ❌ |
| View Delivery Man Dashboard | ❌ | ❌ | ❌ | ✅ |
| View Analytics & Charts | ✅ | ✅ (no revenue) | ❌ | ❌ |
| View Revenue Reports | ✅ | ❌ | ❌ | ❌ |
| **PARCEL MANAGEMENT** | | | | |
| Create Parcel | ❌ | ❌ | ✅ | ❌ |
| Edit Own Parcel (pending only) | ❌ | ❌ | ✅ | ❌ |
| Cancel Own Parcel (pending only) | ❌ | ❌ | ✅ | ❌ |
| View Own Parcels | ❌ | ❌ | ✅ | ❌ |
| View All Parcels | ✅ | ✅ | ❌ | ❌ |
| View Assigned Parcels | ❌ | ❌ | ❌ | ✅ |
| Approve Parcel | ✅ | ✅ | ❌ | ❌ |
| Reject Parcel | ✅ | ✅ | ❌ | ❌ |
| Assign Parcel to Delivery Man | ✅ | ✅ | ❌ | ❌ |
| Reassign Parcel | ✅ | ✅ | ❌ | ❌ |
| Delete Parcel | ✅ | ❌ | ❌ | ❌ |
| **STATUS MANAGEMENT** | | | | |
| Update Status → Picked Up | ❌ | ❌ | ❌ | ✅ |
| Update Status → In Transit | ❌ | ❌ | ❌ | ✅ |
| Update Status → Delivered | ❌ | ❌ | ❌ | ✅ |
| Update Status → Cancelled | ✅ | ✅* | ✅* | ❌ |
| Override Any Status | ✅ | ❌ | ❌ | ❌ |
| View Status History | ✅ | ✅ | ✅ (own) | ✅ (assigned) |
| **PARCEL TRACKING** | | | | |
| Track Any Parcel | ✅ | ✅ | ❌ | ❌ |
| Track Own Parcel | ❌ | ❌ | ✅ | ❌ |
| Track Assigned Parcel | ❌ | ❌ | ❌ | ✅ |
| **USER MANAGEMENT** | | | | |
| View All Users | ✅ | ❌ | ❌ | ❌ |
| Create / Delete User | ✅ | ❌ | ❌ | ❌ |
| Activate/Deactivate User | ✅ | ❌ | ❌ | ❌ |
| Promote User to Manager | ✅ | ❌ | ❌ | ❌ |
| Edit Own Profile | ✅ | ✅ | ✅ | ✅ |
| **DELIVERY MAN MANAGEMENT** | | | | |
| View All Delivery Men | ✅ | ✅ (view only) | ❌ | ❌ |
| Activate/Deactivate Delivery Man | ✅ | ❌ | ❌ | ❌ |
| View Delivery Man Performance | ✅ | ✅ | ❌ | ❌ |
| View Own Performance | ❌ | ❌ | ❌ | ✅ |
| View Own Earnings | ❌ | ❌ | ❌ | ✅ |
| **NOTIFICATIONS** | | | | |
| Receive Notifications | ✅ | ✅ | ✅ | ✅ |
| Notified on new parcel request | ✅ | ✅ | ❌ | ❌ |
| Mark Notifications Read | ✅ | ✅ | ✅ | ✅ |
| **REPORTS & EXPORT** | | | | |
| View Revenue Reports | ✅ | ❌ | ❌ | ❌ |
| Export Parcel Data (CSV) | ✅ | ✅ | ❌ | ❌ |
| View Delivery Performance Report | ✅ | ✅ | ❌ | ❌ |
| **SYSTEM** | | | | |
| Access System Settings | ✅ | ❌ | ❌ | ❌ |

*Manager can cancel only approved/pending parcels. User can cancel only pending parcels.

---

## Status Transition Rules

```
pending     → approved     (Admin, Manager)
pending     → cancelled    (User, Admin, Manager)
approved    → assigned     (Admin, Manager)
approved    → cancelled    (Admin, Manager)
assigned    → picked_up    (Delivery Man only)
picked_up   → in_transit   (Delivery Man only)
in_transit  → delivered    (Delivery Man only)
in_transit  → cancelled    (Admin only — exceptional override)

TERMINAL STATES: delivered, cancelled (no further changes)
```

**Rule:** Manager has full operational control but cannot override terminal states or undo a Delivery Man's action. Only Admin can make exceptional overrides.

---
---

# ZapShift — Folder Structure

## Frontend (React + Vite)

```
src/
│
├── app/                        # App-level setup
│   ├── App.jsx                 # Root component
│   ├── store.js                # Zustand store
│   └── queryClient.js          # React Query client config
│
├── routes/                     # Route definitions
│   ├── index.jsx               # All routes assembled
│   ├── ProtectedRoute.jsx      # Redirects unauthenticated users
│   └── RoleRoute.jsx           # Redirects unauthorized roles
│
├── layouts/                    # Page shell layouts
│   ├── DashboardLayout.jsx     # Sidebar + header + content wrapper
│   ├── AuthLayout.jsx          # Centered card layout for login/register
│   └── PublicLayout.jsx        # Navbar + footer for homepage
│
├── pages/                      # One file per route (thin, compose features)
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── admin/
│   │   ├── AdminDashboard.jsx
│   │   ├── ManageParcels.jsx
│   │   ├── ManageUsers.jsx
│   │   ├── ManageDeliveryMen.jsx
│   │   └── Analytics.jsx
│   ├── manager/
│   │   ├── ManagerDashboard.jsx
│   │   ├── ApproveParcels.jsx
│   │   ├── AssignParcels.jsx
│   │   └── OperationalAnalytics.jsx
│   ├── user/
│   │   ├── UserDashboard.jsx
│   │   ├── MyParcels.jsx
│   │   ├── CreateParcel.jsx
│   │   └── TrackParcel.jsx
│   └── delivery/
│       ├── DeliveryDashboard.jsx
│       ├── AssignedParcels.jsx
│       └── DeliveryHistory.jsx
│
├── features/                   # Domain-driven feature modules
│   ├── auth/
│   │   ├── LoginForm.jsx
│   │   ├── RegisterForm.jsx
│   │   └── useAuth.js
│   ├── parcels/
│   │   ├── ParcelTable.jsx
│   │   ├── ParcelCard.jsx
│   │   ├── ParcelForm.jsx
│   │   ├── ParcelStatusBadge.jsx
│   │   ├── ParcelTimeline.jsx
│   │   ├── ParcelFilters.jsx
│   │   └── useParcels.js
│   ├── dashboard/
│   │   ├── KPIWidget.jsx
│   │   ├── ActivityFeed.jsx
│   │   ├── ParcelsChart.jsx
│   │   ├── StatusDonutChart.jsx
│   │   └── DeliveryPerformanceTable.jsx
│   ├── notifications/
│   │   ├── NotificationBell.jsx
│   │   ├── NotificationDropdown.jsx
│   │   ├── NotificationItem.jsx
│   │   └── useNotifications.js
│   └── users/
│       ├── UserTable.jsx
│       ├── UserForm.jsx
│       └── useUsers.js
│
├── components/                 # Shared UI primitives
│   ├── ui/
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   ├── Select.jsx
│   │   ├── Modal.jsx
│   │   ├── Badge.jsx
│   │   ├── Card.jsx
│   │   ├── Alert.jsx
│   │   ├── Toast.jsx
│   │   ├── Spinner.jsx
│   │   ├── Skeleton.jsx
│   │   ├── Table.jsx
│   │   ├── Pagination.jsx
│   │   ├── EmptyState.jsx
│   │   └── Avatar.jsx
│   ├── Sidebar.jsx
│   ├── Header.jsx
│   └── PageHeader.jsx
│
├── hooks/                      # Generic reusable hooks
│   ├── useDebounce.js
│   ├── useLocalStorage.js
│   ├── useClickOutside.js
│   └── useMediaQuery.js
│
├── services/                   # API call functions (axios)
│   ├── api.js                  # Axios instance + interceptors
│   ├── authService.js
│   ├── parcelService.js
│   ├── userService.js
│   ├── notificationService.js
│   └── analyticsService.js
│
├── contexts/                   # React contexts (if not using Zustand)
│   └── AuthContext.jsx         # Current user + token
│
├── constants/                  # App-wide constants
│   ├── ROLES.js
│   ├── PARCEL_STATUS.js
│   ├── ROUTES.js
│   └── QUERY_KEYS.js
│
├── utils/                      # Pure utility functions
│   ├── formatDate.js
│   ├── formatCurrency.js
│   ├── generateTrackingId.js
│   └── cn.js                   # className merge utility
│
└── assets/                     # Static files
    ├── images/
    ├── icons/
    └── logo.svg
```

**Folder Responsibilities:**
- `app/` — Bootstrap only. No business logic.
- `routes/` — Route map and guards. No UI.
- `layouts/` — Shell structure. No data fetching.
- `pages/` — Route targets. Thin wrappers; compose features.
- `features/` — Domain logic + domain UI. Each feature owns its data hooks.
- `components/ui/` — Dumb primitives. No API calls, no business logic.
- `services/` — All API calls. One file per domain.
- `constants/` — Single source of truth for magic strings/values.
- `utils/` — Pure functions. No side effects.

---

## Backend (Node.js + Express)

```
src/
│
├── config/                     # Configuration
│   ├── db.js                   # MongoDB connection
│   ├── cloudinary.js           # File upload config
│   └── env.js                  # Env variable validation
│
├── controllers/                # HTTP layer: parse req, call service, send res
│   ├── auth.controller.js
│   ├── parcel.controller.js
│   ├── user.controller.js
│   ├── notification.controller.js
│   ├── analytics.controller.js
│   └── dashboard.controller.js
│
├── services/                   # Business logic
│   ├── auth.service.js
│   ├── parcel.service.js       # Status transitions, assignment logic
│   ├── user.service.js
│   ├── notification.service.js # Notification creation on events
│   └── analytics.service.js   # Aggregation pipelines
│
├── repositories/               # Data access layer (DB queries only)
│   ├── parcel.repository.js
│   ├── user.repository.js
│   └── notification.repository.js
│
├── models/                     # Mongoose schemas
│   ├── User.model.js
│   ├── Parcel.model.js
│   ├── Notification.model.js
│   └── ActivityLog.model.js
│
├── routes/                     # Express routers
│   ├── index.js                # Mount all routes
│   ├── auth.routes.js
│   ├── parcel.routes.js
│   ├── user.routes.js
│   ├── notification.routes.js
│   ├── analytics.routes.js
│   └── dashboard.routes.js
│
├── middleware/                 # Express middleware
│   ├── auth.middleware.js      # JWT verification
│   ├── role.middleware.js      # RBAC enforcement
│   ├── error.middleware.js     # Global error handler
│   ├── notFound.middleware.js  # 404 handler
│   └── upload.middleware.js    # Multer config
│
├── validators/                 # Request validation schemas
│   ├── auth.validator.js
│   ├── parcel.validator.js
│   └── user.validator.js
│
├── utils/                      # Utility functions
│   ├── ApiError.js             # Custom error class
│   ├── ApiResponse.js          # Standardized response helper
│   ├── generateTrackingId.js
│   ├── logger.js               # Winston setup
│   └── activityLogger.js      # Helper to write activity logs
│
├── logs/                       # Log files (gitignored)
│   ├── error.log
│   └── combined.log
│
├── app.js                      # Express app setup (no listen)
└── server.js                   # HTTP server entry point
```

**Folder Responsibilities:**
- `config/` — External connections only. No business logic.
- `controllers/` — HTTP-aware layer only. No DB access.
- `services/` — Business rules. Framework-agnostic. Unit-testable.
- `repositories/` — DB queries only. Return plain objects.
- `models/` — Schema definitions only. No methods with business logic.
- `middleware/` — Cross-cutting concerns. Applied at router level.
- `validators/` — Input validation schemas. Separate from controllers.
- `utils/` — Helpers used by multiple layers.

---
---

# ZapShift — 2-Day Upgrade Roadmap

## Day 1: Core Dashboard Overhaul (8 hours)

### Morning (4 hours)
| Time | Task | Impact |
|------|------|--------|
| 0–1h | Set up sidebar layout (DashboardLayout.jsx, role-aware nav) | HIGH — all pages benefit |
| 1–2h | Build KPI widget component (shared by Admin + Manager) | HIGH — reused in 4 dashboards |
| 2–3h | Admin Dashboard: 4 KPI cards + recent parcels table | HIGH — first thing recruiter sees |
| 3–4h | Admin Dashboard: Recharts line chart + donut chart | HIGH — visual wow factor |

### Afternoon (4 hours)
| Time | Task | Impact |
|------|------|--------|
| 4–5h | Manager Dashboard: operational KPIs + pending approvals table | HIGH — reuses Admin components |
| 5–6h | User Dashboard + Delivery Man Dashboard | HIGH |
| 6–7h | Parcel tracking timeline component | HIGH — unique feature |
| 7–8h | Status badge component + consistent table design | MEDIUM |

---

## Day 2: Polish & Pro Features (8 hours)

### Morning (4 hours)
| Time | Task | Impact |
|------|------|--------|
| 0–1h | Search + filter on parcel table | HIGH |
| 1–2h | Notification bell + dropdown | HIGH — shows system thinking |
| 2–3h | Loading skeletons for all dashboard sections | MEDIUM — polish |
| 3–4h | Empty states for all list views | MEDIUM — completeness |

### Afternoon (4 hours)
| Time | Task | Impact |
|------|------|--------|
| 4–5h | Toast notification system for actions | MEDIUM |
| 5–6h | Mobile responsive sidebar (drawer) | MEDIUM |
| 6–7h | README update + project screenshots | HIGH — portfolio page |
| 7–8h | Final QA, fix visual inconsistencies | HIGH — impression |

---

## Priority Ranking (if time runs short)
1. ✅ Sidebar layout with role-aware nav (foundation for everything)
2. ✅ Admin Dashboard KPIs + charts
3. ✅ Manager Dashboard (reuses Admin components — ~1 hour)
4. ✅ Parcel tracking timeline
5. ✅ Status badges everywhere
6. ✅ Notification bell
7. ✅ Loading skeletons
8. ⭕ Search + filter
9. ⭕ Mobile responsive sidebar
10. ⭕ Analytics full page

---
---

# ZapShift — Portfolio Presentation Strategy

## What Recruiters & Senior Devs Look For

### In the First 30 Seconds (Demo/Screenshot)
- Clean, professional UI that looks like a real product
- Clear role-based dashboards with real data
- Charts and analytics (shows data thinking)
- Status badges, timelines, and tracking (shows UX thinking)

### In the First 5 Minutes (Code Review)
- Folder structure that is organized and predictable
- Separation of concerns (controllers don't have DB queries)
- Custom hooks for data fetching
- Consistent naming conventions
- A README that explains architecture decisions

### Questions They'll Ask
- "How do you handle authentication?" → JWT + refresh token, explain the flow
- "How is RBAC implemented?" → Middleware on each route + role check in frontend
- "How would you scale this?" → Explain the scalability path in architecture.md
- "What would you add next?" → Real-time tracking (WebSocket), payment integration

---

## README Structure (for GitHub)
```
1. Live Demo link (Vercel + Render)
2. Screenshot/GIF of dashboard
3. Tech Stack badges
4. Features list (with role breakdown)
5. Getting Started (local setup)
6. Architecture Overview (link to architecture.md)
7. Future Roadmap
8. Author
```

## Demo Credentials (include in README)
```
Admin:        admin@zapshift.com    / password123
Manager:      manager@zapshift.com  / password123
User:         user@zapshift.com     / password123
Delivery Man: delivery@zapshift.com / password123
```

## Talking Points for Interviews
- "I built a full-stack SaaS with **4 distinct user roles** and separate dashboards"
- "Admin vs Manager separation shows real business hierarchy thinking — Admin owns the system, Manager runs daily operations"
- "The backend follows a layered architecture: controller → service → repository"
- "RBAC is enforced at both the API level (middleware) and UI level (route guards + conditional rendering)"
- "I used React Query for server state — it eliminates a lot of loading/error boilerplate"
- "The design system is documented so any developer can maintain visual consistency"
- "The architecture is designed to extract to microservices without rewriting business logic"

---
---

# ZapShift — Future Scalability Roadmap

## Phase 1 (Current — Portfolio)
- [x] JWT auth + role-based access
- [x] Parcel CRUD + status workflow
- [x] Role-specific dashboards
- [ ] Tracking timeline
- [ ] Notification system
- [ ] Analytics charts

## Phase 2 (Production Ready)
- [ ] WebSocket real-time updates (Socket.io)
- [ ] Email notifications (Nodemailer / SendGrid)
- [ ] Redis for session/cache layer
- [ ] Job queue for async tasks (Bull)
- [ ] Unit + integration tests (Jest)
- [ ] CI/CD pipeline (GitHub Actions)
- [ ] Docker containerization

## Phase 3 (Scale)
- [ ] SMS notifications (Twilio)
- [ ] Payment gateway (Stripe)
- [ ] Mobile app (React Native)
- [ ] MongoDB Atlas with replica sets
- [ ] CDN for file uploads

## Phase 4 (Enterprise)
- [ ] Multi-branch / franchise management
- [ ] Vendor / merchant portal
- [ ] B2B API for e-commerce integration
- [ ] Advanced analytics + ML predictions
- [ ] Microservices migration
