# ZapShift — Design System Documentation

**Version:** 2.1  
**Purpose:** This document is the single source of truth for all design decisions in ZapShift.  
Any developer or AI agent creating a new page, section, or component MUST follow this system to maintain visual consistency.

---

## 1. Brand Identity

**Brand Name:** ZapShift  
**Brand Personality:** Fast, Reliable, Modern, Professional  
**Design Philosophy:** Clarity over cleverness. Every element earns its place. Density is not complexity — good dashboards are information-rich and visually calm at the same time.

**Visual Direction:** SaaS Dashboard — Dark sidebar, white content area, rich data visualization, professional but approachable.

---

## 2. Color System

### Primary Palette
| Role | Name | Hex | Usage |
|------|------|-----|-------|
| Primary | Zap Blue | `#3B82F6` | Buttons, links, active states, accents |
| Primary Dark | Deep Blue | `#1D4ED8` | Hover states, pressed buttons |
| Primary Light | Sky Blue | `#EFF6FF` | Backgrounds for highlighted sections |
| Secondary | Slate | `#64748B` | Secondary text, borders, icons |
| Accent | Amber | `#F59E0B` | Warnings, pending badge |
| Success | Emerald | `#10B981` | Delivered, success states |
| Warning | Orange | `#F97316` | In-transit, attention |
| Error | Red | `#EF4444` | Cancelled, errors, destructive actions |
| Info | Cyan | `#06B6D4` | Informational alerts |

### Neutral Scale
| Name | Hex | Usage |
|------|-----|-------|
| White | `#FFFFFF` | Card backgrounds, main content area |
| Gray 50 | `#F8FAFC` | Page background |
| Gray 100 | `#F1F5F9` | Input backgrounds, table stripes |
| Gray 200 | `#E2E8F0` | Borders, dividers |
| Gray 400 | `#94A3B8` | Placeholder text, disabled |
| Gray 600 | `#475569` | Secondary text |
| Gray 800 | `#1E293B` | Primary text |
| Gray 900 | `#0F172A` | Sidebar background |
| Black | `#020617` | Headings (max contrast) |

### Status Color Map (Parcel)
| Status | Color | Hex |
|--------|-------|-----|
| Pending | Amber | `#F59E0B` |
| Approved | Blue | `#3B82F6` |
| Assigned | Purple | `#8B5CF6` |
| Picked Up | Orange | `#F97316` |
| In Transit | Cyan | `#06B6D4` |
| Delivered | Emerald | `#10B981` |
| Cancelled | Red | `#EF4444` |

**Rule:** Never use color alone to convey status. Always pair with text label and icon.

---

## 3. Typography

### Font Families
```
Display / Headings: "Inter", sans-serif   (weight: 600, 700)
Body:               "Inter", sans-serif   (weight: 400, 500)
Data / Mono:        "JetBrains Mono", monospace  (for IDs, tracking codes)
```
Inter is the industry standard for SaaS dashboards. It reads well at every size and weight.

### Type Scale
| Token | Size | Weight | Line Height | Usage |
|-------|------|--------|-------------|-------|
| `text-xs` | 12px | 400 | 1.5 | Labels, captions |
| `text-sm` | 14px | 400/500 | 1.5 | Table body, form labels |
| `text-base` | 16px | 400 | 1.6 | Body text |
| `text-lg` | 18px | 500 | 1.4 | Card titles |
| `text-xl` | 20px | 600 | 1.3 | Section headings |
| `text-2xl` | 24px | 700 | 1.2 | Page headings |
| `text-3xl` | 30px | 700 | 1.1 | Dashboard KPI numbers |
| `text-4xl` | 36px | 800 | 1.0 | Hero numbers (homepage) |

### Heading Hierarchy (HTML)
```
h1 → Page title (only one per page)
h2 → Section title
h3 → Card/widget title
h4 → Sub-section, table column header
```

**Rules:**
- Never bold body text for emphasis — use color or a slightly larger size
- Tracking codes always in monospace: `font-mono`
- KPI numbers always in `text-3xl font-bold`
- All labels in `text-sm font-medium text-gray-600`

---

## 4. Spacing System

ZapShift uses Tailwind's default spacing scale (1 unit = 4px).

### Standard Spacing Tokens
| Token | px | Usage |
|-------|----|-------|
| `space-1` | 4px | Icon gaps |
| `space-2` | 8px | Inline element gaps |
| `space-3` | 12px | Compact padding |
| `space-4` | 16px | Default element padding |
| `space-5` | 20px | Card internal padding |
| `space-6` | 24px | Section internal padding |
| `space-8` | 32px | Between cards/widgets |
| `space-10` | 40px | Between page sections |
| `space-12` | 48px | Page top padding |

### Padding Rules
```
Page container:     px-6 md:px-8 py-6
Card:               p-5 md:p-6
Table cell:         px-4 py-3
Button (default):   px-4 py-2
Button (large):     px-6 py-3
Input:              px-3 py-2
Modal:              p-6
```

### Section Gap Rules
```
Between dashboard widgets:  gap-4 md:gap-6
Between table rows:         implicit (py-3 per row)
Between form fields:        space-y-4
Between nav items:          space-y-1
```

---

## 5. Border Radius System

| Token | Radius | Usage |
|-------|--------|-------|
| `rounded-sm` | 4px | Badges, tags |
| `rounded` | 6px | Inputs, small buttons |
| `rounded-md` | 8px | Buttons, cards (compact) |
| `rounded-lg` | 12px | Cards, modals |
| `rounded-xl` | 16px | Dashboard widgets |
| `rounded-full` | 9999px | Avatar, pill badges |

**Rule:** Cards and widgets use `rounded-xl`. Buttons use `rounded-md`. Badges use `rounded-full`.

---

## 6. Shadow System

| Token | CSS | Usage |
|-------|-----|-------|
| `shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | Subtle card lift |
| `shadow` | `0 1px 3px rgba(0,0,0,0.1)` | Default card |
| `shadow-md` | `0 4px 6px rgba(0,0,0,0.07)` | Hover card, dropdown |
| `shadow-lg` | `0 10px 15px rgba(0,0,0,0.1)` | Modal |
| `shadow-xl` | `0 20px 25px rgba(0,0,0,0.1)` | Sidebar floating panel |

**Rule:** On white backgrounds, use `shadow-sm` or `shadow`. Dark sidebar needs no shadow. On hover, elevate shadow by one step.

---

## 7. Grid System

```
Dashboard layout:
  Main grid: grid-cols-1 md:grid-cols-2 lg:grid-cols-4
  KPI row:   4 equal columns (1 on mobile, 2 on tablet, 4 on desktop)
  Charts:    grid-cols-1 lg:grid-cols-2
  Table:     full width, no grid

Sidebar + Content:
  Sidebar: fixed, 240px wide (desktop) | hidden (mobile)
  Content: ml-[240px] on desktop | full width on mobile
```

---

## 8. Responsive Breakpoints

Using Tailwind defaults:
| Breakpoint | Width | Notes |
|-----------|-------|-------|
| Mobile (default) | 0–639px | Sidebar hidden, stacked layout |
| `sm` | 640px | Small adjustments |
| `md` | 768px | 2-column grids begin |
| `lg` | 1024px | 4-column grids, sidebar visible |
| `xl` | 1280px | Full dashboard layout |
| `2xl` | 1536px | Large monitors |

---

## 9. Component Design Rules

### 9.1 Button
```
Variants:
  Primary:    bg-blue-500 text-white hover:bg-blue-600
  Secondary:  bg-white border border-gray-200 text-gray-700 hover:bg-gray-50
  Danger:     bg-red-500 text-white hover:bg-red-600
  Ghost:      bg-transparent text-blue-500 hover:bg-blue-50

Sizes:
  sm:   px-3 py-1.5 text-sm rounded-md
  md:   px-4 py-2 text-sm rounded-md      ← default
  lg:   px-6 py-3 text-base rounded-md

States:
  loading: spinner inside button, disabled cursor
  disabled: opacity-50 cursor-not-allowed

Rules:
  - Always include an icon for destructive actions
  - Loading state prevents double-submit
  - Never use color alone to differentiate button types — add label
```

### 9.2 Form
```
Label:    text-sm font-medium text-gray-700 mb-1
Input:    w-full px-3 py-2 border border-gray-200 rounded-md
          focus:outline-none focus:ring-2 focus:ring-blue-500
          text-sm bg-white text-gray-800
Error:    text-xs text-red-500 mt-1
Helper:   text-xs text-gray-400 mt-1

Spacing:  Each field in space-y-4
Layout:   Single column on mobile, 2-column grid on desktop (for long forms)

Rules:
  - Every input has a visible label (never placeholder-only)
  - Error messages appear below the field, not at top
  - Required fields marked with asterisk in label
  - Submit button at bottom right
```

### 9.3 Card
```
Base:     bg-white rounded-xl shadow-sm border border-gray-100 p-5

KPI Card:
  - Icon in colored circle (bg-blue-50, text-blue-500)
  - Large number: text-3xl font-bold text-gray-900
  - Label: text-sm text-gray-500
  - Trend indicator: text-xs (green up arrow, red down arrow)

Content Card:
  - Header: flex justify-between items-center mb-4
  - Title: text-lg font-semibold text-gray-800
  - Optional action: text-sm text-blue-500

Rules:
  - Cards never have colored backgrounds (white only)
  - Accent color goes in icon or badge, not card background
  - No card-within-card nesting
```

### 9.4 Table
```
Wrapper:  overflow-x-auto
Table:    w-full text-sm
Header:   bg-gray-50 text-gray-500 text-xs font-medium uppercase tracking-wide
          px-4 py-3 border-b border-gray-200
Row:      border-b border-gray-100 hover:bg-gray-50 transition-colors
Cell:     px-4 py-3 text-gray-700
Empty:    centered illustration + message + CTA button

Rules:
  - Status always shown as Badge, not raw text
  - Actions column on far right
  - Sticky header on scroll for long tables
  - Pagination below table (not inside)
  - Row click → navigate to detail, not required but nice-to-have
```

### 9.5 Badge (Status)
```
Base:     inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium

Pending:  bg-amber-100 text-amber-700
Approved: bg-blue-100 text-blue-700
Assigned: bg-purple-100 text-purple-700
Picked Up: bg-orange-100 text-orange-700
In Transit: bg-cyan-100 text-cyan-700
Delivered: bg-emerald-100 text-emerald-700
Cancelled: bg-red-100 text-red-700

Role badges:
  Admin:        bg-red-100 text-red-700
  Manager:      bg-violet-100 text-violet-700
  User:         bg-blue-100 text-blue-700
  Delivery Man: bg-green-100 text-green-700

Rules:
  - Never use colored text without colored background
  - Always include a dot or icon before status text
  - Dot: w-1.5 h-1.5 rounded-full inline-block mr-1.5
```

### 9.6 Modal
```
Overlay:  fixed inset-0 bg-black/50 z-50 flex items-center justify-center
Panel:    bg-white rounded-xl shadow-xl p-6 w-full max-w-md mx-4
Header:   text-xl font-semibold text-gray-900 + close button (top right)
Body:     mt-4 (form or content)
Footer:   mt-6 flex justify-end gap-3 (cancel + confirm)

Rules:
  - Confirm button matches action type (blue for neutral, red for delete)
  - Close on overlay click + ESC key
  - Trap focus inside modal for accessibility
  - No scrolling content inside modal unless unavoidable
```

### 9.7 Notification
```
Bell icon in top nav with unread count badge (red dot, number)
Dropdown: w-80 max-h-[400px] overflow-y-auto rounded-xl shadow-lg border

Item:
  Unread:  bg-blue-50 border-l-4 border-blue-400
  Read:    bg-white

Content:
  Icon (type-based) + message text + time ago
  "Mark all read" button at top

Toast (action feedback):
  Position: bottom-right, stack upward
  Duration: 3 seconds auto-dismiss
  Types: success (green), error (red), info (blue), warning (amber)
  Width: ~320px, rounded-lg, shadow-lg
```

### 9.8 Empty State
```
Layout:   flex flex-col items-center justify-center py-16 text-center
Icon:     40x40 muted icon (text-gray-300)
Heading:  text-lg font-medium text-gray-600
Message:  text-sm text-gray-400 mt-1 max-w-xs
CTA:      Primary button, mt-4

Rules:
  - Every list/table has an empty state
  - CTA must guide to logical next action ("Create your first parcel")
  - Never show a blank white space
```

### 9.9 Loading State
```
KPI Cards:   Skeleton block (animate-pulse, rounded-xl, h-24)
Tables:      5 skeleton rows (h-10 each, rounded, animate-pulse)
Charts:      Skeleton block (h-48, rounded-xl, animate-pulse)
Full page:   Centered spinner (border-blue-500)

Rules:
  - Show skeleton, not spinner, for content-heavy areas
  - Spinner only for action feedback (submit button, page transition)
  - Never let layout shift during loading (reserve space with skeleton)
```

### 9.10 Alert
```
Info:     bg-blue-50 border-l-4 border-blue-400 text-blue-800
Success:  bg-emerald-50 border-l-4 border-emerald-400 text-emerald-800
Warning:  bg-amber-50 border-l-4 border-amber-400 text-amber-800
Error:    bg-red-50 border-l-4 border-red-400 text-red-800

Structure: icon + message text + optional dismiss button
Padding:   p-4, rounded-md (right side only, flat left due to border)
```

---

## 10. Layout Rules

### Sidebar Navigation
```
Width:      240px (fixed, not collapsible in portfolio version)
Background: bg-gray-900 (dark sidebar)
Logo:       top left, text-white font-bold text-xl, py-6 px-5

Nav items:
  Default:  text-gray-400, rounded-lg mx-2 px-3 py-2
  Active:   bg-blue-600 text-white
  Hover:    bg-gray-800 text-white

Sections:   "MAIN", "MANAGEMENT", "ACCOUNT" (text-xs text-gray-500 uppercase)
Icons:      Lucide icons, w-4 h-4, always to left of label
User info:  Bottom of sidebar, avatar + name + role badge

Role-specific nav items:
  Admin:        Dashboard, All Parcels, Users, Delivery Men, Analytics, Settings
  Manager:      Dashboard, All Parcels, Delivery Men, Analytics (no Settings, no Revenue)
  User:         Dashboard, My Parcels, Create Parcel, Track Parcel
  Delivery Man: Dashboard, Assigned Parcels, History, Earnings

Mobile: sidebar hidden, hamburger in top nav opens overlay drawer
```

### Top Navigation (Header)
```
Height:     64px
Background: bg-white border-b border-gray-200
Content:    Page title (left) | Search bar (center) | Notifications + Avatar (right)

Search:     Global search, opens command palette style (Cmd+K)
Avatar:     Dropdown with Profile, Settings, Logout
```

### Page Layout Template
```
<Sidebar />
<div class="ml-[240px]">
  <Header />
  <main class="p-6">
    <PageHeader>   ← Title + subtitle + optional action button
    <Content />
  </main>
</div>
```

---

## 11. Dashboard Widget Rules

**KPI Widget:**
- Title (top) → Icon → Number (large) → Label → Trend
- Background: white, border: gray-100, shadow-sm
- Icon in soft colored bg (bg-blue-50, icon text-blue-500)

**Chart Widget:**
- Title + optional date filter in header
- Chart fills body
- Legend below chart if needed
- Empty state if no data

**Activity Feed Widget:**
- Timeline style (left dot/line)
- Each entry: icon + action text + time ago
- "View all" link at bottom

**Rule:** All widgets have a consistent header (title left, action right), consistent padding (p-5), and consistent card style.

---

## 12. Parcel Tracking Timeline

```
Vertical timeline, left-aligned dots

○ Pending       → gray dot, gray text
● Approved      → blue dot, blue label, gray timestamp
● Assigned      → purple dot
● Picked Up     → orange dot
● In Transit    → cyan dot (animated pulse if current)
● Delivered     → green dot, green label "Delivered ✓"
○ (next step)   → gray (not yet reached)

Each step shows:
  Status label (bold)
  Actor name + role
  Timestamp (formatted: "Jan 15, 2025 · 3:42 PM")

Current step: animated ring pulse around dot
```

---

## 13. Icon Usage Rules

**Library:** Lucide React (consistent, clean, MIT licensed)

| Context | Icon | Size |
|---------|------|------|
| Sidebar nav | Role-specific (Package, LayoutDashboard, Users) | w-4 h-4 |
| KPI card | Domain-specific (TrendingUp, Package, Truck) | w-5 h-5 |
| Button | Action-specific (Plus, Edit, Trash) | w-4 h-4 |
| Status badge | Circle dot or CheckCircle | w-3 h-3 |
| Notification | Bell | w-5 h-5 |
| Table action | MoreVertical or specific action icon | w-4 h-4 |

**Rules:**
- Never use icon without label in a clickable element (exception: icon-only buttons must have `aria-label`)
- Consistent size per context, never mix sizes in same row
- Stroke width: default (1.5) — never change

---

## 14. Accessibility Rules

- All interactive elements keyboard-focusable
- Focus ring: `focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`
- Color contrast: minimum 4.5:1 for body text, 3:1 for large text
- All images have alt text; decorative images have `alt=""`
- ARIA labels on icon-only buttons
- Modals trap focus and close on ESC
- Form errors announced via `aria-describedby`
- Skip-to-main-content link at top of page

---

## 15. Component Naming Rules

```
Pages:           PascalCase, descriptive  →  AdminDashboard.jsx, ManagerDashboard.jsx
Feature components: PascalCase + domain   →  ParcelStatusBadge.jsx
UI primitives:   PascalCase, generic      →  Button.jsx, Modal.jsx
Hooks:           camelCase, use prefix    →  useParcelFilters.js
Services:        camelCase, noun          →  parcelService.js
Utils:           camelCase, verb          →  formatDate.js, formatCurrency.js
Constants:       UPPER_SNAKE_CASE         →  PARCEL_STATUS.js, ROLES.js
```

---

## 16. Design Consistency Checklist

Before shipping any new page or component, verify:

- [ ] Colors are from the defined palette only
- [ ] Typography follows the type scale
- [ ] Spacing uses 4px grid (Tailwind tokens only)
- [ ] All interactive states defined (hover, focus, disabled, loading)
- [ ] Status shown as Badge, not raw text
- [ ] Tables have empty state
- [ ] Forms have validation and error states
- [ ] Loading state uses skeleton, not spinner
- [ ] Mobile layout tested
- [ ] No hardcoded colors (no `style={{ color: '#fff' }}`)
- [ ] Lucide icons used consistently
- [ ] Page title updates in browser tab
