# ZapShift — Product Requirements Document (PRD)

**Version:** 2.1  
**Status:** Upgrade Planning — Manager Role Added  
**Author Role:** Senior Product Manager + Technical Lead  
**Target:** Portfolio-Quality, SaaS-Grade Application  

---

## 1. Product Overview

**Product Name:** ZapShift  
**Tagline:** Smart Parcel Delivery — Faster, Smarter, Trackable.  
**Type:** SaaS-Style Parcel Delivery Management Platform  
**Target Audience:** Small-to-medium logistics businesses, courier services, e-commerce fulfillment teams  

### What It Does
ZapShift is a role-based parcel delivery management platform that enables users to request deliveries, managers to handle day-to-day operations (approve, assign), admins to oversee the full system, and delivery personnel to execute and report on deliveries — all within a unified, real-time dashboard experience.

### Why It Matters (Portfolio Angle)
This project demonstrates:
- Full-stack engineering with role-based access control
- Real-world business workflow implementation
- SaaS dashboard patterns (analytics, tracking, activity logs)
- Scalable architecture designed for future growth

---

## 2. User Roles & Personas

| Role | Persona | Primary Goal |
|------|---------|-------------|
| **Admin** | System Owner | Full system control — settings, user management, revenue oversight |
| **Manager** | Operations Lead | Day-to-day parcel operations — approve, assign, monitor deliveries |
| **User** | Sender / Customer | Create parcel requests, track deliveries |
| **Delivery Man** | Field Agent | Accept assignments, update delivery status |

### Role Hierarchy
```
Admin
  └── Manager        (operational subset of Admin)
        └── User     (creates requests)
        └── Delivery Man (executes deliveries)
```

**Key distinction:**
- **Admin** owns the system. Creates managers, manages settings, sees revenue.
- **Manager** runs operations. Approves parcels, assigns delivery men, monitors performance.
- They never overlap in system-level controls — Admin is the only one who can create/delete accounts or access financial reports.

---

## 3. Core Features

### 3.1 Authentication & Authorization
- Email/password login with JWT
- Role-based redirect after login
- Protected routes per role
- Refresh token for session persistence
- Profile management for all roles

### 3.2 Parcel Lifecycle Management
- Parcel creation with sender/receiver details
- Status flow: `Pending → Approved → Assigned → Picked Up → In Transit → Delivered / Cancelled`
- Admin approval gate before assignment
- Delivery Man assignment by Admin
- Status updates by Delivery Man at each stage

### 3.3 Dashboards (Role-Specific)
- Visual KPI cards with real data
- Charts and analytics (Admin + Manager, scope differs)
- Activity feeds for recent actions
- Role-specific quick actions

**Admin Dashboard:** Full system overview — revenue, all users, system health  
**Manager Dashboard:** Operational view — pending approvals, assignments, delivery performance  
**User Dashboard:** Personal view — my parcels, tracking  
**Delivery Man Dashboard:** Field view — today's jobs, earnings

### 3.4 Parcel Tracking
- Timeline view showing each status change with timestamp
- Visual step-progress indicator
- Actor who triggered each status change

### 3.5 Search & Filtering
- Global search across parcels
- Filter by status, date range, delivery man
- Sortable tables

### 3.6 Notification System
- In-app notification bell
- Notification types: parcel approved, assigned, delivered, cancelled
- Mark as read / clear all

### 3.7 Analytics (Admin + Manager)
- Parcel volume over time (line chart) — Admin + Manager
- Status distribution (donut chart) — Admin + Manager
- Delivery Man performance table — Admin + Manager
- Revenue summary — **Admin only**
- Manager sees operational metrics only (no revenue/financial data)

---

## 4. User Stories

### Admin
- As an Admin, I want to see all parcels in one place so I can manage operations efficiently.
- As an Admin, I want to assign parcels to delivery men so deliveries are distributed fairly.
- As an Admin, I want to see revenue and performance analytics so I can make informed decisions.
- As an Admin, I want to manage user, manager, and delivery man accounts.
- As an Admin, I want to see recent activity logs for audit purposes.
- As an Admin, I want to create and deactivate Manager accounts.

### Manager
- As a Manager, I want to see all pending parcels so I can approve or reject them quickly.
- As a Manager, I want to assign approved parcels to available delivery men.
- As a Manager, I want to monitor today's active deliveries and their current status.
- As a Manager, I want to see delivery man performance so I can assign work fairly.
- As a Manager, I want to view an operational dashboard without access to financial/revenue data.
- As a Manager, I want to receive notifications for new parcel requests needing approval.

### User
- As a User, I want to create a parcel request with pickup and delivery details.
- As a User, I want to track my parcel in real time so I know when to expect delivery.
- As a User, I want to see the full history of my parcels.
- As a User, I want to cancel a parcel if it hasn't been assigned yet.
- As a User, I want to receive notifications when my parcel status changes.

### Delivery Man
- As a Delivery Man, I want to see my assigned parcels for today.
- As a Delivery Man, I want to update parcel status at each step.
- As a Delivery Man, I want to see my delivery history and earnings.
- As a Delivery Man, I want to view my performance metrics.

---

## 5. Functional Requirements

### FR-01: Authentication
- Users must log in with email and password
- Tokens must expire and refresh automatically
- Logout must invalidate session

### FR-02: Parcel CRUD
- Users can create, edit (if pending), and cancel parcels
- Admin can view, approve, assign, and update all parcels
- Manager can view, approve, assign parcels — but cannot delete or override terminal states
- Delivery Man can only view and update assigned parcels

### FR-03: Status Workflow
- Status must follow the defined flow — no skipping states
- Each status change must log actor + timestamp
- Cancelled state is terminal

### FR-04: Dashboard Data
- All KPI numbers must be live (fetched from backend)
- Charts must be interactive and readable
- Empty states must guide users to take action

### FR-05: Notifications
- Notifications are created server-side on status change
- Frontend polls or receives push for new notifications
- Unread count shown in nav bell

### FR-06: Search & Filter
- Search by parcel ID, sender name, receiver name
- Filter by status, assigned delivery man, date range
- Results update without page reload

### FR-07: Manager Access Boundaries
- Manager CANNOT access: revenue reports, system settings, user creation/deletion
- Manager CAN access: all parcel operations, delivery man list (view only), operational analytics
- Manager actions are logged with role identifier for audit trail
- Admin can promote a User to Manager or demote a Manager to User

---

## 6. Non-Functional Requirements

| Category | Requirement |
|----------|-------------|
| **Performance** | Dashboard loads in < 2 seconds |
| **Security** | All routes protected by role middleware |
| **Scalability** | Stateless API; horizontally scalable |
| **Maintainability** | Feature-based folder structure; no god files |
| **Responsiveness** | Fully functional on mobile, tablet, desktop |
| **Accessibility** | WCAG AA compliant contrast, keyboard nav |
| **Error Handling** | Graceful error states; no blank screens |

---

## 7. What to KEEP from Current System
- Authentication & Authorization (JWT base is solid)
- Parcel creation workflow
- Role-based routing
- Core data models (parcels, users, delivery men)

## 8. What to CHANGE
- Dashboards → redesign with real KPI cards + charts
- Parcel list tables → add search, filter, sorting
- Status management → add proper timeline/audit log
- UI/UX → modernize to SaaS design standards
- Navigation → sidebar layout for dashboard, replace top-nav-only

## 9. What to ADD
- **Manager role + Manager Dashboard** (operational KPIs, no revenue)
- **Manager-specific routes and RBAC middleware** (`['admin', 'manager']` where applicable)
- Parcel tracking timeline view
- Analytics charts (Admin + Manager, with scope difference)
- Notification system (Manager notified on new parcel requests)
- Activity/audit log (includes Manager actions)
- Earnings summary (Delivery Man)
- Empty states and loading skeletons
- Toast notifications for actions

## 10. What to REMOVE / DEPRIORITIZE
- Any placeholder or lorem ipsum sections on homepage
- Overcomplicated features that add code but no visible value
- Redundant pages with the same content

---

## 11. Future Roadmap

| Phase | Feature | Priority |
|-------|---------|----------|
| Phase 2 | Real-time tracking via WebSocket | High |
| Phase 2 | Email notifications (Nodemailer) | High |
| Phase 3 | SMS integration (Twilio) | Medium |
| Phase 3 | Payment gateway integration | Medium |
| Phase 4 | Mobile app (React Native) | High |
| Phase 4 | Multi-branch / franchise support | Medium |
| Phase 5 | Vendor/merchant management | Low |
| Phase 5 | AI-based delivery route optimization | Low |

---

## 12. 2-Day Upgrade Priority List

### Day 1 (Foundation)
1. Redesign Admin Dashboard with KPI cards + charts
2. Build Manager Dashboard (operational KPIs — reuse Admin components)
3. Redesign User Dashboard
4. Redesign Delivery Man Dashboard
5. Implement sidebar navigation (role-aware nav items)
6. Add parcel tracking timeline

### Day 2 (Polish)
1. Add search + filter to parcel tables
2. Implement notification bell + dropdown (Manager gets "new parcel" alerts)
3. Add loading skeletons and empty states
4. Add toast notifications
5. Final responsive QA + README update

> **Time-saving tip:** Manager Dashboard reuses the same KPI widgets and chart components as Admin Dashboard — just with different data endpoints and hidden revenue section. Build Admin Dashboard first, then Manager Dashboard takes ~1 hour.
