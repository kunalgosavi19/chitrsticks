# Development Tasks

**Product:** चित्रSTICKS E-Commerce Platform  
**Version:** 1.0  
**Status:** Draft  
**Last Updated:** July 22, 2026  
**Companion Documents:** [PRD.md](./PRD.md) · [DESIGN.md](./DESIGN.md) · [DATABASE.md](./DATABASE.md)

---

## How to Use This Document

- Each bullet is **one task** intended to complete in **under 2 hours**.
- Tasks are ordered by dependency within each phase. Complete earlier phases before later ones unless noted.
- Mark tasks complete as you go: `- [x]` done, `- [ ]` pending.
- Supporting database entities (Collections, Product Variants, Product Images, Store Settings) appear as tasks where needed even though they are summarized separately in DATABASE.md.

### Suggested Sprint Mapping

| Sprint | Phases | Focus |
|--------|--------|-------|
| Sprint 1 | 0–1 | Foundation, design tokens, layout shell |
| Sprint 2 | 2 | Catalog browsing |
| Sprint 3 | 3–4 | Cart, checkout, payments |
| Sprint 4 | 5–6 | Accounts, static pages, emails |
| Sprint 5 | 7 | Admin panel |
| Sprint 6 | 8–11 | SEO, QA, deployment |

---

## Phase 0 — Project Foundation

Infrastructure, tooling, and shared conventions before feature work.

- [ ] **0.1** Verify Next.js project scaffold and document folder structure (`app/`, `components/`, `lib/`, `types/`)
- [ ] **0.2** Configure environment variables template (`.env.example`) for database, auth, payment gateway, and storage
- [ ] **0.3** Set up PostgreSQL database and connection pooling configuration
- [ ] **0.4** Initialize ORM/schema tooling and migration workflow
- [ ] **0.5** Create Users table migration
- [ ] **0.6** Create Products, Product Variants, and Product Images table migrations
- [ ] **0.7** Create Collections and collection–product junction table migrations
- [ ] **0.8** Create Cart and Cart Items table migrations
- [ ] **0.9** Create Orders and Order Items table migrations
- [ ] **0.10** Create Payments, Coupons, and Addresses table migrations
- [ ] **0.11** Create Wishlist, Reviews, Newsletter, and Custom Sticker Uploads table migrations
- [ ] **0.12** Create Store Settings singleton/key-value table migration
- [ ] **0.13** Seed Store Settings defaults (₹299 min cart, ₹599 free shipping, store name)
- [ ] **0.14** Create database seed script with sample collections and products for development
- [ ] **0.15** Set up shared TypeScript types for API responses and domain models
- [ ] **0.16** Configure path aliases and absolute imports (`@/components`, `@/lib`)
- [ ] **0.17** Install and configure Lucide Icons
- [ ] **0.18** Set up ESLint and Prettier to match project conventions
- [ ] **0.19** Configure Git hooks or CI lint step (optional for solo dev)

---

## Phase 1 — Design System & Global Layout

Design tokens, reusable UI primitives, and the storefront shell.

### Design Tokens

- [ ] **1.1** Implement CSS custom properties / Tailwind theme for brand colors (primary, secondary, accent, neutral, semantic)
- [ ] **1.2** Implement typography tokens (Fraunces, DM Sans, DM Mono) with `next/font`
- [ ] **1.3** Implement spacing, radius, shadow, and animation duration tokens
- [ ] **1.4** Create utility helpers for paise ↔ rupee formatting (`₹299`)

### Core UI Components

- [ ] **1.5** Build Button component (primary, secondary, ghost, destructive, disabled, loading states)
- [ ] **1.6** Build Input, Label, and Helper Text form primitives
- [ ] **1.7** Build Textarea and Select form components
- [ ] **1.8** Build Checkbox and Radio components
- [ ] **1.9** Build Badge component (NEW, SALE, SOLD OUT, LOW STOCK)
- [ ] **1.10** Build Card component (elevated, outlined, filled, interactive variants)
- [ ] **1.11** Build Toast notification system (slide-up animation, auto-dismiss)
- [ ] **1.12** Build Modal and mobile Bottom Sheet components
- [ ] **1.13** Build Skeleton loading placeholder component
- [ ] **1.14** Build Spinner / loading indicator for buttons
- [ ] **1.15** Build Progress Bar component (for ₹299 / ₹599 thresholds)

### Layout Components

- [ ] **1.16** Build root layout with font loading and global styles
- [ ] **1.17** Build Container / page width wrapper with responsive gutters
- [ ] **1.18** Build Navbar — desktop layout (logo, links, search, account, cart badge)
- [ ] **1.19** Build Navbar — mobile layout (hamburger, logo, cart)
- [ ] **1.20** Build Mobile Menu Drawer (slide-in-left, overlay, scroll lock)
- [ ] **1.21** Build Announcement Bar component (dismissible, optional)
- [ ] **1.22** Build Footer — column structure and link groups
- [ ] **1.23** Build Footer — newsletter signup block UI (non-functional stub)
- [ ] **1.24** Build Footer — payment trust icons row
- [ ] **1.25** Build Breadcrumbs component
- [ ] **1.26** Wire Navbar sticky scroll shadow behavior
- [ ] **1.27** Create storefront layout wrapper that composes Navbar + Footer

### Homepage

- [ ] **1.28** Build Homepage route shell (`/`)
- [ ] **1.29** Build Hero section (headline, subcopy, CTA, responsive image)
- [ ] **1.30** Build Featured Collections section (static placeholder cards)
- [ ] **1.31** Build "Why चित्रSTICKS" / trust features section (quality, shipping, returns icons)
- [ ] **1.32** Build Homepage featured products grid (static placeholder)
- [ ] **1.33** Build Homepage promotional banner / CTA strip
- [ ] **1.34** Connect Homepage hero and featured sections to Store Settings or CMS stub

---

## Phase 2 — Product Catalog

Browse, search, filter, and view products.

### Product Card & Shared Catalog UI

- [ ] **2.1** Build Product Card component (image, name, price, compare-at, badges)
- [ ] **2.2** Build Product Card out-of-stock and on-sale states
- [ ] **2.3** Build Product Grid layout (2 / 3 / 4 columns responsive)
- [ ] **2.4** Build Empty State component ("No products found")
- [ ] **2.5** Build Collection Card component for collection listings

### Shop Page

- [ ] **2.6** Build Shop page route (`/shop`)
- [ ] **2.7** Create API/route handler to list active products with pagination
- [ ] **2.8** Wire Shop page to fetch and render product grid
- [ ] **2.9** Add Shop page loading skeleton state
- [ ] **2.10** Add Shop page SEO metadata defaults

### Collection Pages

- [ ] **2.11** Build Collection page route (`/collections/[slug]`)
- [ ] **2.12** Create API to fetch collection by slug with products
- [ ] **2.13** Build Collection page hero (title, description, cover image)
- [ ] **2.14** Wire Collection page product grid and empty state

### Search

- [ ] **2.15** Create product search API (name, tags, description full-text)
- [ ] **2.16** Build Search input in Navbar (desktop)
- [ ] **2.17** Build Search page or modal results view (`/shop?q=`)
- [ ] **2.18** Add search autocomplete dropdown (top 5 suggestions)
- [ ] **2.19** Add Search to mobile menu drawer

### Filters & Sort

- [ ] **2.20** Build Filter sidebar / mobile filter sheet UI (collection, price range, availability)
- [ ] **2.21** Implement collection filter query logic on Shop API
- [ ] **2.22** Implement price range filter query logic
- [ ] **2.23** Implement in-stock-only filter
- [ ] **2.24** Build Sort dropdown (price low/high, newest, popularity)
- [ ] **2.25** Wire filters and sort to URL query params for shareable state
- [ ] **2.26** Add active filter chips and clear-all control

### Product Detail Page

- [ ] **2.27** Build Product Detail route (`/products/[slug]`)
- [ ] **2.28** Create API to fetch product by slug with images and variants
- [ ] **2.29** Build image gallery — mobile swipe carousel
- [ ] **2.30** Build image gallery — desktop thumbnails and main image
- [ ] **2.31** Build product info block (name, price, short description)
- [ ] **2.32** Build variant selector (size/finish) when variants exist
- [ ] **2.33** Build quantity stepper component
- [ ] **2.34** Build product metadata section (dimensions, material, care, SKU)
- [ ] **2.35** Build "Add to Cart" button with out-of-stock disabled state
- [ ] **2.36** Build Related Products section (same collection)
- [ ] **2.37** Add Product Detail SEO metadata and Open Graph tags
- [ ] **2.38** Add Product structured data (JSON-LD Product schema)

---

## Phase 3 — Cart & Promotions

Shopping cart persistence, business rules, and promo codes.

### Cart Backend

- [ ] **3.1** Implement guest session ID generation and cookie storage
- [ ] **3.2** Create API — get or create active cart (user or session)
- [ ] **3.3** Create API — add item to cart
- [ ] **3.4** Create API — update cart item quantity
- [ ] **3.5** Create API — remove cart item
- [ ] **3.6** Create cart merge logic on user login (guest → authenticated)
- [ ] **3.7** Implement cart subtotal calculation service (paise, live catalog prices)
- [ ] **3.8** Implement stock validation on add/update cart item

### Cart Business Rules

- [ ] **3.9** Implement minimum cart value rule (₹299) validation service
- [ ] **3.10** Implement free shipping threshold rule (₹599) calculation service
- [ ] **3.11** Implement shipping fee logic (flat rate vs free) from Store Settings
- [ ] **3.12** Build cart totals DTO returning subtotal, discount, shipping, total, threshold messages

### Cart UI

- [ ] **3.13** Build Cart page route (`/cart`)
- [ ] **3.14** Build Cart line item row (image, name, price, quantity stepper, remove)
- [ ] **3.15** Build Cart order summary sidebar / section
- [ ] **3.16** Build ₹299 minimum cart progress bar and messaging
- [ ] **3.17** Build ₹599 free shipping progress bar and messaging
- [ ] **3.18** Build disabled Checkout CTA when below minimum with tooltip
- [ ] **3.19** Build mobile sticky bottom Checkout bar on Cart page
- [ ] **3.20** Wire Navbar cart badge to live item count
- [ ] **3.21** Add "Item added to cart" toast on Product Detail add action
- [ ] **3.22** Build Cart empty state with Continue Shopping CTA

### Promo Codes

- [ ] **3.23** Create API — validate and apply coupon to cart
- [ ] **3.24** Create API — remove coupon from cart
- [ ] **3.25** Implement coupon validation rules (dates, limits, min cart, product scope)
- [ ] **3.26** Implement prevent-below-min-cart rule on coupon application
- [ ] **3.27** Build promo code input UI on Cart page with error states
- [ ] **3.28** Display applied coupon and discount amount in order summary

### Add to Cart Integration

- [ ] **3.29** Wire Product Detail "Add to Cart" to cart API
- [ ] **3.30** Handle variant selection validation before add-to-cart

---

## Phase 4 — Checkout & Payments

Checkout flow, address capture, payment gateway, and order creation.

### Checkout UI

- [ ] **4.1** Build Checkout page route (`/checkout`)
- [ ] **4.2** Build checkout layout — shipping form column
- [ ] **4.3** Build checkout layout — sticky order summary column
- [ ] **4.4** Build guest email and phone fields on checkout
- [ ] **4.5** Build Indian shipping address form (name, lines, city, state, PIN, phone)
- [ ] **4.6** Build Indian states dropdown / select
- [ ] **4.7** Build PIN code input with format validation
- [ ] **4.8** Build checkout order summary (line items, subtotal, discount, shipping, total)
- [ ] **4.9** Build mobile collapsible order summary on checkout
- [ ] **4.10** Build mobile sticky "Pay ₹{total}" bottom bar
- [ ] **4.11** Add checkout form client-side validation and error summary
- [ ] **4.12** Re-validate ₹299 minimum on checkout entry; redirect to cart if fail

### Checkout Backend

- [ ] **4.13** Create API — initiate checkout (validate cart, create pending order)
- [ ] **4.14** Implement order number generator (`CS-YYYYMMDD-XXXXXX`)
- [ ] **4.15** Snapshot cart line items into Order Items on checkout initiation
- [ ] **4.16** Snapshot shipping address onto Order record
- [ ] **4.17** Implement final totals calculation on order (discount, shipping, tax stub)
- [ ] **4.18** Implement pin code serviceability check (static list or API stub)
- [ ] **4.19** Re-validate stock at checkout initiation

### Payment Gateway (Razorpay)

- [ ] **4.20** Configure Razorpay SDK and environment keys
- [ ] **4.21** Create API — create payment session for order
- [ ] **4.22** Create Payments record with idempotency key on session create
- [ ] **4.23** Build Razorpay checkout modal / embedded payment trigger on frontend
- [ ] **4.24** Create API — verify payment signature on client callback
- [ ] **4.25** Create webhook endpoint — handle `payment.captured`
- [ ] **4.26** Create webhook endpoint — handle `payment.failed`
- [ ] **4.27** Update Order status to `paid` on successful capture
- [ ] **4.28** Decrement product/variant stock on successful payment
- [ ] **4.29** Increment coupon usage count on successful payment
- [ ] **4.30** Mark cart as `converted` and link to order on success
- [ ] **4.31** Handle duplicate webhook / idempotent payment processing
- [ ] **4.32** Build payment failure UI with retry option

### Order Confirmation & Tracking

- [ ] **4.33** Build Order Confirmation page (`/order/[id]/confirmation`)
- [ ] **4.34** Build Order Tracking page (`/order/[id]/track`)
- [ ] **4.35** Build order status timeline component (Placed → Processing → Shipped → Delivered)
- [ ] **4.36** Create API — fetch order by order number (guest email verification or auth)
- [ ] **4.37** Build guest order lookup form (order number + email)

---

## Phase 5 — Authentication & Customer Account

Registration, login, profile, addresses, and order history.

### Auth Backend

- [ ] **5.1** Configure auth library (e.g., NextAuth, Lucia, or custom JWT sessions)
- [ ] **5.2** Implement password hashing utility (bcrypt/Argon2)
- [ ] **5.3** Create API — register with email/password
- [ ] **5.4** Create API — login with email/password
- [ ] **5.5** Create API — logout
- [ ] **5.6** Create API — request password reset email
- [ ] **5.7** Create API — reset password with token
- [ ] **5.8** Implement auth middleware for protected routes
- [ ] **5.9** Implement admin role guard middleware

### Auth UI

- [ ] **5.10** Build Login page (`/account/login`)
- [ ] **5.11** Build Register page (`/account/register`)
- [ ] **5.12** Build Forgot Password page
- [ ] **5.13** Build Reset Password page
- [ ] **5.14** Wire Navbar account icon to login or account dashboard
- [ ] **5.15** Trigger guest cart merge on successful login

### Account Pages

- [ ] **5.16** Build Account dashboard page (`/account`)
- [ ] **5.17** Build profile edit form (name, phone, email read-only or change flow)
- [ ] **5.18** Create API — update user profile
- [ ] **5.19** Build Order History page (`/account/orders`)
- [ ] **5.20** Create API — list orders for authenticated user
- [ ] **5.21** Build Order Detail page (`/account/orders/[id]`)
- [ ] **5.22** Build reorder shortcut (add past order items to cart)

### Addresses

- [ ] **5.23** Create API — list user addresses
- [ ] **5.24** Create API — create address
- [ ] **5.25** Create API — update address
- [ ] **5.26** Create API — delete address (soft delete)
- [ ] **5.27** Create API — set default address
- [ ] **5.28** Build Addresses page (`/account/addresses`)
- [ ] **5.29** Build Add/Edit Address form modal
- [ ] **5.30** Build saved address selector on checkout for logged-in users

### Post-Purchase Account Creation

- [ ] **5.31** Build "Create account" prompt on Order Confirmation for guests
- [ ] **5.32** Implement register-with-order-email prefill and order linking

### Wishlist (Optional Phase 1)

- [ ] **5.33** Create API — add/remove wishlist item
- [ ] **5.34** Create API — list wishlist items
- [ ] **5.35** Build Wishlist page (`/account/wishlist`)
- [ ] **5.36** Add wishlist heart icon on Product Card and Product Detail

---

## Phase 6 — Static Content & Newsletter

Marketing pages, legal content, contact, and email capture.

### Static Pages

- [ ] **6.1** Build About page (`/about`) with brand story layout
- [ ] **6.2** Build FAQ page (`/faq`) with accordion component
- [ ] **6.3** Write and add FAQ content (shipping, returns, product care, payments)
- [ ] **6.4** Build Contact page (`/contact`) with support info
- [ ] **6.5** Build Contact form with validation
- [ ] **6.6** Create API — submit contact form (email to support or store in DB)
- [ ] **6.7** Build Privacy Policy page (`/privacy`)
- [ ] **6.8** Build Terms of Service page (`/terms`)
- [ ] **6.9** Build Return & Refund Policy page (`/returns`)
- [ ] **6.10** Add SEO metadata to all static pages

### Newsletter

- [ ] **6.11** Create API — subscribe email to Newsletter table
- [ ] **6.12** Implement duplicate email and already-subscribed handling
- [ ] **6.13** Generate unsubscribe token on subscribe
- [ ] **6.14** Wire Footer newsletter form to subscribe API
- [ ] **6.15** Build unsubscribe page (`/newsletter/unsubscribe/[token]`)
- [ ] **6.16** Add optional marketing opt-in checkbox on checkout

### Error Pages

- [ ] **6.17** Build custom 404 page with Shop CTA
- [ ] **6.18** Build custom 500 / error boundary page

---

## Phase 7 — Admin Panel

Internal tools for catalog, orders, promotions, and settings.

### Admin Shell

- [ ] **7.1** Build admin route group layout (separate from storefront)
- [ ] **7.2** Build Admin Login page (`/admin/login`)
- [ ] **7.3** Apply admin UI styling (compact density, indigo primary actions)
- [ ] **7.4** Build admin sidebar navigation
- [ ] **7.5** Build admin top bar (user menu, logout)
- [ ] **7.6** Protect all `/admin/*` routes with admin/fulfillment role guard

### Admin Dashboard

- [ ] **7.7** Build Dashboard page (`/admin`) layout
- [ ] **7.8** Build orders-today and revenue summary widgets
- [ ] **7.9** Build pending fulfillment count widget
- [ ] **7.10** Build low-stock products alert list
- [ ] **7.11** Build recent orders table with quick status view

### Admin Products

- [ ] **7.12** Build Products list page with search and status filter
- [ ] **7.13** Build Product create/edit form — basic fields (name, slug, price, SKU, stock)
- [ ] **7.14** Build Product form — descriptions and tags
- [ ] **7.15** Build Product form — image upload (multi-image, ordered)
- [ ] **7.16** Build Product form — variant management (add/edit/remove)
- [ ] **7.17** Build Product form — collection assignment
- [ ] **7.18** Build Product form — SEO fields
- [ ] **7.19** Create admin API — CRUD products
- [ ] **7.20** Create admin API — upload product images to object storage
- [ ] **7.21** Implement product publish/archive status toggle
- [ ] **7.22** Implement bulk publish/unpublish actions

### Admin Collections

- [ ] **7.23** Build Collections list page
- [ ] **7.24** Build Collection create/edit form (name, slug, description, cover image, sort)
- [ ] **7.25** Create admin API — CRUD collections
- [ ] **7.26** Build collection product picker (assign/unassign)

### Admin Orders

- [ ] **7.27** Build Orders list page with status and date filters
- [ ] **7.28** Build Order detail page (customer info, items, payment, address)
- [ ] **7.29** Build order status update controls (Processing, Shipped, Delivered, Cancelled)
- [ ] **7.30** Build shipment form (courier name, AWB, tracking URL)
- [ ] **7.31** Create admin API — update order status
- [ ] **7.32** Trigger customer email on shipped/delivered status change
- [ ] **7.33** Implement order CSV export

### Admin Customers

- [ ] **7.34** Build Customers list page (email, order count, LTV)
- [ ] **7.35** Build Customer detail page with order history
- [ ] **7.36** Create admin API — list and fetch customers

### Admin Promotions

- [ ] **7.37** Build Coupons list page
- [ ] **7.38** Build Coupon create/edit form (code, type, value, limits, dates, scope)
- [ ] **7.39** Create admin API — CRUD coupons
- [ ] **7.40** Build coupon redemption history view

### Admin Settings

- [ ] **7.41** Build Settings page (store name, support email, phone)
- [ ] **7.42** Build shipping settings form (flat rate, free shipping threshold, min cart value)
- [ ] **7.43** Build homepage banner settings form (headline, CTA, linked collection)
- [ ] **7.44** Create admin API — read/update Store Settings

### Admin Custom Uploads (Future-Ready)

- [ ] **7.45** Build Custom Uploads queue page (pending approval list)
- [ ] **7.46** Build upload review detail view with approve/reject actions
- [ ] **7.47** Create admin API — update upload status and rejection reason

### Admin Reviews (Future-Ready)

- [ ] **7.48** Build Reviews moderation queue page
- [ ] **7.49** Build approve/reject review actions and admin reply form

---

## Phase 8 — Transactional Email

Order and account email notifications.

- [ ] **8.1** Choose email provider (Resend, SendGrid, AWS SES) and configure API keys
- [ ] **8.2** Create email template layout (brand header, footer, legal)
- [ ] **8.3** Build Order Confirmation email template
- [ ] **8.4** Send Order Confirmation email on payment capture
- [ ] **8.5** Build Order Shipped email template with tracking link
- [ ] **8.6** Send Order Shipped email on admin status update
- [ ] **8.7** Build Order Delivered email template
- [ ] **8.8** Build Password Reset email template
- [ ] **8.9** Build Welcome / Registration email template
- [ ] **8.10** Build Newsletter double opt-in confirmation email (if enabled)
- [ ] **8.11** Create email send utility with error logging and retry stub

---

## Phase 9 — SEO, Performance & Accessibility

Discovery, speed, and inclusive access before launch.

### SEO

- [ ] **9.1** Add default site metadata and Organization JSON-LD in root layout
- [ ] **9.2** Generate dynamic sitemap (`/sitemap.xml`) for products, collections, static pages
- [ ] **9.3** Create `robots.txt`
- [ ] **9.4** Add BreadcrumbList JSON-LD on catalog and product pages
- [ ] **9.5** Audit and fill meta titles/descriptions for all public routes

### Performance

- [ ] **9.6** Configure Next.js Image optimization for product photos
- [ ] **9.7** Add responsive `srcset` / sizes to Product Card and Detail images
- [ ] **9.8** Implement lazy loading for below-fold product grids
- [ ] **9.9** Run Lighthouse mobile audit on Home, Shop, Product, Cart, Checkout
- [ ] **9.10** Fix top Lighthouse performance issues (LCP, CLS, font loading)
- [ ] **9.11** Add loading and error states audit across all data-fetching pages

### Accessibility

- [ ] **9.12** Audit keyboard navigation on Navbar, drawers, modals, and forms
- [ ] **9.13** Verify all icon-only buttons have `aria-label`
- [ ] **9.14** Verify color contrast meets WCAG AA on primary UI pairs
- [ ] **9.15** Add skip-to-content link in storefront layout
- [ ] **9.16** Test `prefers-reduced-motion` disables cart bounce and slide animations

---

## Phase 10 — Custom Sticker Uploads (Future Feature)

Optional phase — schema exists; implement when product team is ready.

- [ ] **10.1** Configure object storage bucket (S3/R2) and signed URL utility
- [ ] **10.2** Create API — upload custom sticker file with validation (type, size)
- [ ] **10.3** Build upload UI on customizable Product Detail page
- [ ] **10.4** Generate and store preview thumbnail after upload
- [ ] **10.5** Block add-to-cart until upload status is `approved` (or auto-approve stub)
- [ ] **10.6** Link upload to Cart Item and Order Item on purchase
- [ ] **10.7** Set `is_returnable = false` on custom order line items

---

## Phase 11 — Reviews (Future Feature)

Optional phase — schema exists; implement post-launch if desired.

- [ ] **11.1** Create API — submit review (authenticated, verified purchase check)
- [ ] **11.2** Build review submission form on Product Detail (delivered orders only)
- [ ] **11.3** Build product reviews list on Product Detail (approved only)
- [ ] **11.4** Display average rating on Product Card (when count > 0)
- [ ] **11.5** Wire admin moderation queue (see tasks 7.48–7.49)

---

## Phase 12 — Testing & Quality Assurance

Manual and automated verification before production.

- [ ] **12.1** Write smoke test checklist document from PRD user flows
- [ ] **12.2** Test happy-path purchase: browse → cart → checkout → pay → confirmation
- [ ] **12.3** Test ₹299 minimum cart blocked checkout and messaging
- [ ] **12.4** Test ₹599 free shipping unlocked and shipping fee below threshold
- [ ] **12.5** Test promo code apply, invalid code, expired code, and min-cart block
- [ ] **12.6** Test guest checkout and post-purchase account creation
- [ ] **12.7** Test authenticated checkout with saved address
- [ ] **12.8** Test cart merge on login
- [ ] **12.9** Test out-of-stock product cannot add to cart
- [ ] **12.10** Test stock decrement and oversell prevention at payment
- [ ] **12.11** Test payment failure and retry without duplicate charge
- [ ] **12.12** Test order tracking page and status timeline
- [ ] **12.13** Test admin order fulfillment flow and shipped email
- [ ] **12.14** Test mobile responsive layouts on Home, Shop, Cart, Checkout
- [ ] **12.15** Test newsletter subscribe and unsubscribe flow
- [ ] **12.16** Add API integration tests for cart totals and business rules
- [ ] **12.17** Add API integration tests for checkout and payment webhook handler
- [ ] **12.18** Run security pass on auth, admin routes, and webhook signature verification

---

## Phase 13 — Deployment & Launch

Production infrastructure, monitoring, and go-live.

### Staging Environment

- [ ] **13.1** Provision staging database
- [ ] **13.2** Deploy staging app to hosting (Vercel or equivalent)
- [ ] **13.3** Configure staging environment variables
- [ ] **13.4** Run full QA checklist on staging
- [ ] **13.5** Seed staging with production-like catalog data

### Production Environment

- [ ] **13.6** Provision production PostgreSQL with backups enabled
- [ ] **13.7** Provision production object storage for product images
- [ ] **13.8** Register production domain and configure DNS
- [ ] **13.9** Deploy production app with production env vars
- [ ] **13.10** Configure Razorpay production keys and webhook URL
- [ ] **13.11** Run production database migrations
- [ ] **13.12** Upload real product catalog via admin or import script
- [ ] **13.13** Configure SSL/TLS (automatic via host or manual cert)

### Monitoring & Operations

- [ ] **13.14** Set up error tracking (Sentry or equivalent)
- [ ] **13.15** Set up uptime monitoring on homepage and checkout
- [ ] **13.16** Configure server/application logging for payment webhooks
- [ ] **13.17** Document rollback procedure for failed deployments
- [ ] **13.18** Create runbook for order fulfillment daily workflow

### Launch Checklist

- [ ] **13.19** Legal review sign-off on Privacy, Terms, and Returns pages
- [ ] **13.20** Verify contact email and support phone are live
- [ ] **13.21** Send test order end-to-end in production (then cancel/refund)
- [ ] **13.22** Submit sitemap to Google Search Console
- [ ] **13.23** Verify analytics installed (GA4 or Plausible) — optional
- [ ] **13.24** Announce launch and monitor first 24h orders/errors

---

## Task Count Summary

| Phase | Tasks | Focus |
|-------|-------|-------|
| 0 — Foundation | 19 | DB, tooling, seeds |
| 1 — Design System & Layout | 34 | Tokens, UI, Homepage |
| 2 — Catalog | 38 | Shop, search, filters, PDP |
| 3 — Cart | 30 | Cart API, rules, promos |
| 4 — Checkout & Payments | 37 | Checkout, Razorpay, orders |
| 5 — Auth & Account | 36 | Login, account, addresses, wishlist |
| 6 — Static & Newsletter | 18 | Content pages, email capture |
| 7 — Admin | 49 | Full admin panel |
| 8 — Email | 11 | Transactional emails |
| 9 — SEO & Performance | 16 | Launch quality |
| 10 — Custom Uploads | 7 | Future |
| 11 — Reviews | 5 | Future |
| 12 — QA | 18 | Testing |
| 13 — Deployment | 24 | Staging, prod, launch |
| **Total** | **~342** | |

At ~1.5 hours average per task, the full v1 scope is roughly **500+ developer hours** (~13 weeks for one developer at 40 hrs/week). Phases 10–11 are optional future work.

---

## Dependency Graph (Critical Path)

```
Phase 0 (Foundation)
    ↓
Phase 1 (Layout + Design System)
    ↓
Phase 2 (Catalog) ──────────────────────────┐
    ↓                                       │
Phase 3 (Cart)                              │
    ↓                                       │
Phase 4 (Checkout + Payments)               │
    ↓                                       │
Phase 5 (Auth + Account) ←──────────────────┘
    ↓
Phase 6 (Static Pages)    Phase 7 (Admin) — can parallel after Phase 4
    ↓                          ↓
Phase 8 (Email) ←──────────────┘
    ↓
Phase 9 (SEO + Performance)
    ↓
Phase 12 (QA)
    ↓
Phase 13 (Deployment)

Phases 10–11: independent future tracks
```

---

## Open Questions Blocking Tasks

Resolve before starting the listed tasks:

| Question | Blocks Tasks |
|----------|--------------|
| Payment gateway choice (Razorpay vs Cashfree) | 4.20–4.32 |
| GST inclusive vs exclusive pricing display | 2.31, 4.17, 9.5 |
| Flat shipping rate amount | 3.11, 7.42 |
| Final logo and product photography assets | 1.18, 1.29, 2.1 |
| Legal page copy approval | 6.7–6.9, 13.19 |
| Email provider selection | 8.1–8.11 |
| Pin code serviceability data source | 4.18 |

---

*Document owner: Engineering Team · चित्रSTICKS*  
*Review cadence: Update task checkboxes weekly; reprioritize Phases 10–11 based on launch scope.*
