# Product Requirements Document (PRD)

**Product:** चित्रSTICKS E-Commerce Platform  
**Version:** 1.0  
**Status:** Draft  
**Last Updated:** July 22, 2026  

---

## 1. Business Overview

**चित्रSTICKS** (pronounced *Chitra Sticks*) is a direct-to-consumer (D2C) premium sticker brand that blends Indian artistic heritage with contemporary design. The brand name combines *चित्र* (Hindi for *picture* or *art*) with *STICKS*, reflecting a product line of high-quality, visually distinctive stickers intended for personal expression, gifting, and lifestyle use.

The business operates as an online-first retailer, selling curated sticker collections across themes such as Indian art, typography, pop culture, and seasonal designs. Products are positioned in the premium segment—emphasizing print quality, durable materials, and distinctive packaging—rather than competing on volume or discount pricing.

This PRD defines the requirements for the **चित्रSTICKS e-commerce website**: a customer-facing storefront and an internal admin interface for catalog, order, and fulfillment management. The platform will serve customers primarily in India, with pricing and promotions denominated in Indian Rupees (INR).

**Brand positioning:**

| Attribute | Description |
|-----------|-------------|
| Category | Premium lifestyle stickers |
| Price tier | Mid-to-premium (not mass-market discount) |
| Differentiation | Artistic Indian identity, quality materials, curated collections |
| Channel | Owned D2C website (primary sales channel) |

---

## 2. Goals

### Business Goals

- Establish a credible online storefront that reflects the premium brand identity.
- Enable end-to-end online purchase flow from product discovery through delivery.
- Increase average order value (AOV) through minimum cart thresholds and free-shipping incentives.
- Build a repeatable foundation for catalog expansion, promotions, and future channels.

### Product Goals

- Launch a responsive, mobile-first shopping experience optimized for Indian customers.
- Provide a streamlined checkout with transparent pricing, shipping, and order confirmation.
- Deliver an admin experience that allows non-technical staff to manage products, inventory, and orders without developer intervention.
- Ensure business rules (minimum cart value, free shipping) are enforced consistently across the customer journey.

### Success Metrics (Launch + 90 Days)

| Metric | Target |
|--------|--------|
| Checkout completion rate | ≥ 65% of initiated checkouts |
| Cart abandonment (post–min-cart validation) | ≤ 40% |
| Average order value | ≥ ₹450 |
| Order fulfillment SLA | 95% shipped within 2 business days |
| Site uptime | ≥ 99.5% |
| Mobile traffic conversion | Within 10% of desktop conversion |

---

## 3. Target Audience

### Primary Personas

**1. The Aesthetic Collector (18–30)**  
Urban, design-conscious individual who uses stickers to personalize laptops, water bottles, journals, and phone cases. Values uniqueness and visual quality over lowest price. Discovers brands via Instagram, Pinterest, and word of mouth.

**2. The Gift Buyer (22–40)**  
Purchases sticker sets or bundles as thoughtful, affordable gifts for friends, siblings, or colleagues. Prefers curated collections and attractive packaging. Sensitive to shipping timelines and order tracking.

**3. The Cultural Enthusiast (20–45)**  
Drawn to Indian art, regional motifs, and bilingual or Devanagari typography. Seeks products that reflect identity and heritage. Willing to pay a premium for authentic, well-executed design.

### Secondary Personas

**4. The Parent / Educator**  
Buys reward stickers or themed sets for children. Prioritizes safety messaging (non-toxic materials), clear product descriptions, and reliable delivery.

**5. The Small Business Buyer**  
Occasionally orders stickers in modest quantities for packaging, events, or resale. May require invoice and GST details at checkout (future enhancement).

### Geographic & Device Context

- **Primary market:** India (Tier 1 and Tier 2 cities)
- **Primary device:** Mobile (expected ≥ 70% of traffic)
- **Payment preferences:** UPI, cards, net banking, wallets (via payment gateway integration)
- **Language:** English primary; Hindi-friendly brand elements in UI/marketing copy

---

## 4. Pages

### Customer-Facing Pages

| Page | Route (proposed) | Purpose |
|------|------------------|---------|
| Home | `/` | Brand storytelling, featured collections, promotions, entry to shop |
| Shop / Catalog | `/shop` | Browse all products with filtering and sorting |
| Collection | `/collections/[slug]` | Themed product groupings (e.g., Indian Art, Typography) |
| Product Detail | `/products/[slug]` | Individual product info, images, pricing, add-to-cart |
| Cart | `/cart` | Review items, apply promo codes, view shipping/min-cart messaging |
| Checkout | `/checkout` | Shipping address, payment, order summary |
| Order Confirmation | `/order/[id]/confirmation` | Post-purchase summary and next steps |
| Order Tracking | `/order/[id]/track` | Shipment status and timeline |
| About | `/about` | Brand story, quality promise, founder/team narrative |
| FAQ | `/faq` | Shipping, returns, product care, payment questions |
| Contact | `/contact` | Support form and contact details |
| Privacy Policy | `/privacy` | Legal compliance |
| Terms of Service | `/terms` | Legal compliance |
| Return & Refund Policy | `/returns` | Return eligibility and process |

### Account Pages (Authenticated Users)

| Page | Route (proposed) | Purpose |
|------|------------------|---------|
| Login / Register | `/account/login`, `/account/register` | Account access (optional at launch; guest checkout supported) |
| My Account | `/account` | Profile overview |
| Order History | `/account/orders` | Past orders and reorder links |
| Order Detail | `/account/orders/[id]` | Single order view with tracking |
| Addresses | `/account/addresses` | Saved shipping addresses |
| Wishlist | `/account/wishlist` | Saved products (Phase 1 optional) |

### Admin Pages

| Page | Route (proposed) | Purpose |
|------|------------------|---------|
| Admin Login | `/admin/login` | Secure staff authentication |
| Dashboard | `/admin` | KPIs, recent orders, low-stock alerts |
| Products | `/admin/products` | CRUD for products |
| Collections | `/admin/collections` | Manage product groupings |
| Orders | `/admin/orders` | View and update order status |
| Customers | `/admin/customers` | Customer list and order history |
| Promotions | `/admin/promotions` | Discount codes and campaigns |
| Settings | `/admin/settings` | Store config (shipping rules, contact info) |

### Global UI Elements (All Customer Pages)

- Header: logo, navigation, search, cart icon with item count
- Footer: links, social media, newsletter signup, legal links
- Persistent cart/min-cart/free-shipping progress indicator (where applicable)
- Toast/notification system for cart and checkout actions

---

## 5. Features

### 5.1 Product Catalog

- Display products with name, price (INR), images, short description, and availability status.
- Support product variants where applicable (e.g., size: small/large sheet; finish: matte/glossy).
- Organize products into collections with cover imagery and descriptions.
- Enable filtering by collection, price range, and availability.
- Enable sorting by price (low/high), newest, and popularity (manual sort order or sales-based).
- Full-text search across product names, tags, and descriptions.
- Out-of-stock products remain visible but cannot be added to cart (or show "Notify Me" in future).

### 5.2 Product Detail

- Image gallery with zoom on desktop; swipeable on mobile.
- Clear pricing inclusive of applicable taxes (or tax breakdown at checkout per legal requirement).
- Quantity selector with stock validation.
- "Add to Cart" with immediate feedback and cart drawer/page update.
- Related products / "You may also like" recommendations.
- Product metadata: dimensions, material, care instructions, SKU.

### 5.3 Shopping Cart

- Add, update quantity, and remove items.
- Persist cart for logged-in users; session-based persistence for guests.
- Display line-item subtotals, cart subtotal, estimated shipping, and order total.
- Real-time validation against business rules (minimum cart value, free shipping threshold).
- Promo code entry with validation and error messaging.
- Clear messaging when cart is below minimum order value or approaching free shipping.

### 5.4 Checkout

- Guest checkout supported at launch; optional account creation post-purchase.
- Shipping address form with Indian address fields (pin code, state, city).
- Pin code–based shipping rate calculation (or flat rate below free-shipping threshold).
- Payment via integrated gateway (Razorpay or equivalent): UPI, cards, net banking, wallets.
- Order summary with itemized breakdown before payment.
- Order confirmation email upon successful payment.
- Idempotent payment handling to prevent duplicate charges on retry.

### 5.5 Order Management (Customer)

- Order confirmation page with order ID and summary.
- Email notifications: order confirmed, shipped (with tracking link/AWB), delivered.
- Order tracking page showing status timeline: Placed → Processing → Shipped → Delivered.

### 5.6 Search & Discovery

- Site-wide search with autocomplete suggestions.
- Featured collections and hero banners on homepage (admin-configurable).
- Breadcrumb navigation on catalog and product pages.

### 5.7 Authentication & Accounts (Phase 1 — Basic)

- Email/password registration and login.
- Password reset via email.
- Guest checkout without mandatory account.
- Optional account creation after guest checkout using order email.

### 5.8 Content & Trust

- About, FAQ, Contact, and policy pages (CMS-editable or static at launch).
- Display trust signals: secure payment badges, return policy summary, quality guarantee.
- Newsletter signup (email capture; integration with email provider in future).

### 5.9 Performance & Accessibility

- Mobile-first responsive design.
- Target Lighthouse performance score ≥ 85 on mobile.
- Semantic HTML, keyboard navigation, alt text on product images.
- Image optimization (WebP/AVIF, lazy loading).

### 5.10 SEO

- Unique meta titles and descriptions per product, collection, and static page.
- Clean, human-readable URLs (`/products/mandala-gold-foil`).
- Structured data (Product, BreadcrumbList, Organization schema).
- XML sitemap and robots.txt.

---

## 6. User Flows

### 6.1 Browse and Purchase (Happy Path)

```
Home → Shop → Product Detail → Add to Cart → Cart (meets ₹299 min) 
→ Checkout → Payment → Order Confirmation → Email → Track Order
```

**Steps:**

1. User lands on homepage and navigates to Shop or a Collection.
2. User filters/sorts products and opens a Product Detail page.
3. User selects quantity and adds item to cart.
4. User opens cart; system validates cart subtotal ≥ ₹299.
5. If below ₹299, user sees message with amount needed; checkout is disabled.
6. User proceeds to checkout, enters shipping address, reviews order total.
7. Shipping fee applies if subtotal < ₹599; free if ≥ ₹599.
8. User completes payment; order is created and confirmation displayed.
9. User receives confirmation email; later receives shipping notification with tracking.

### 6.2 Cart Below Minimum Order Value

```
Add to Cart → View Cart → Subtotal < ₹299 → Checkout Disabled 
→ Prompt: "Add ₹X more to checkout" → Continue Shopping → Add Items → Cart Valid
```

**Requirements:**

- Checkout button disabled until cart subtotal ≥ ₹299.
- Display dynamic message: e.g., *"Add ₹47 more to reach the minimum order value of ₹299."*
- Progress bar or visual indicator toward ₹299 threshold (recommended UX).

### 6.3 Free Shipping Threshold

```
Cart Subtotal ≥ ₹599 → Shipping = ₹0 
Cart Subtotal < ₹599 → Standard shipping fee applied at checkout
```

**Requirements:**

- Cart and checkout show shipping cost before payment.
- When subtotal is below ₹599, show upsell: e.g., *"Add ₹120 more for free shipping!"*
- Free shipping applies to cart subtotal after discounts, before shipping (see Business Rules).

### 6.4 Guest Checkout

```
Cart → Checkout (no login) → Enter Email + Address → Pay → Confirmation 
→ Optional: "Create account to track orders"
```

### 6.5 Order Tracking

```
Order Confirmation Email → Click Track Link → Tracking Page → Status Updates
```

### 6.6 Admin Order Fulfillment

```
Admin Login → Orders List → Open Order → Mark Processing 
→ Enter AWB/Tracking → Mark Shipped → Customer Notified
```

### 6.7 Out-of-Stock Attempt

```
Product Detail (Out of Stock) → Add to Cart Disabled → Message Displayed
```

---

## 7. Admin Features

### 7.1 Authentication & Authorization

- Secure admin login separate from customer accounts.
- Role-based access (minimum: Admin, Fulfillment; expandable later).
- Session timeout and logout.

### 7.2 Dashboard

- Summary widgets: orders today, revenue (period), pending fulfillment count, low-stock products.
- Recent orders list with quick status view.
- Link shortcuts to common actions (add product, view pending orders).

### 7.3 Product Management

- Create, edit, archive, and delete products.
- Fields: name, slug, description, price, compare-at price (optional), SKU, stock quantity, images (multi-upload), tags, collection assignment, variant options, SEO fields.
- Bulk actions: publish/unpublish, adjust stock.
- Product status: Draft, Active, Archived.

### 7.4 Collection Management

- Create and edit collections with name, slug, description, cover image, and sort order.
- Assign/unassign products to collections (many-to-many).

### 7.5 Order Management

- Order list with filters: status, date range, payment status.
- Order detail: customer info, line items, payment ID, shipping address.
- Update order status: Pending → Processing → Shipped → Delivered → Cancelled.
- Enter courier name and tracking/AWB number on shipment.
- Trigger customer notification on status change (shipped, delivered).
- Cancel order (with rules; see Business Rules).
- Export orders to CSV.

### 7.6 Customer Management

- View customer list with order count and lifetime value.
- View individual customer profile and order history.
- No direct editing of customer passwords by admin (reset flow only).

### 7.7 Promotions

- Create promo codes: percentage or fixed discount.
- Configure: code, validity dates, usage limits, minimum cart value, applicable collections/products.
- Enable/disable codes.
- View redemption history.

### 7.8 Settings

- Store name, contact email, support phone.
- Configure flat shipping rate (for orders below free-shipping threshold).
- Configure minimum cart value (default ₹299) and free-shipping threshold (default ₹599).
- Manage homepage banner content (headline, CTA, linked collection).

### 7.9 Inventory

- Stock decrement on successful order placement.
- Low-stock threshold alerts on dashboard.
- Prevent overselling: block checkout if stock insufficient at payment time.

---

## 8. Business Rules

### 8.1 Pricing & Currency

- All prices displayed and charged in **INR (₹)**.
- Prices stored exclusive or inclusive of GST per accounting decision; checkout must show final payable amount clearly.
- Compare-at (strike-through) pricing may be shown only when the product was genuinely sold at the higher price within a defined period (consumer protection compliance).

### 8.2 Inventory

- Stock is tracked at variant level where variants exist.
- Adding to cart does not reserve inventory; stock is decremented on successful payment.
- If stock reaches zero during checkout, user receives error and must update cart before completing payment.

### 8.3 Orders

- An order is created only after successful payment confirmation from the payment gateway.
- Order states: **Pending Payment → Paid → Processing → Shipped → Delivered** (or **Cancelled** / **Refunded**).
- Cancellation by customer allowed only before order enters **Processing** status (configurable).
- Admin may cancel orders with automatic refund initiation via payment gateway where supported.

### 8.4 Promotions & Discounts

- Only one promo code per order unless explicitly configured otherwise.
- Discounts apply to cart subtotal (product line items), not shipping.
- Promo codes cannot reduce cart below ₹0; minimum payable rules of payment gateway apply.
- Stacking: promo discounts and free shipping are independent; free shipping determined after discount is applied to subtotal.

### 8.5 Shipping

- Shipping available to serviceable pin codes within India (pin code validation at checkout).
- Orders not meeting free-shipping threshold incur a flat shipping fee (configurable in admin).
- Estimated delivery: 3–7 business days post-shipment (displayed as estimate, not guarantee).

### 8.6 Returns & Refunds

- Returns accepted within 7 days of delivery for unused, unopened products in original packaging (policy detail on `/returns`).
- Refunds processed to original payment method within 7–10 business days of return approval.
- Custom or personalized products are non-returnable (if introduced later).

### 8.7 Tax & Invoicing

- GST-compliant tax calculation based on shipping state and product HSN (future detailed implementation).
- Email invoice/receipt sent with order confirmation.

### 8.8 Fraud & Abuse

- Rate limiting on checkout and promo code validation.
- Admin review flag for unusually large or high-risk orders (future).

---

## 9. Minimum Cart Value Rule (₹299)

### Rule Definition

Customers **cannot proceed to checkout** unless the cart **subtotal** (sum of all line-item prices before shipping, taxes displayed separately, and after product-level discounts) is **≥ ₹299**.

### Rationale

- Protects unit economics against low-value orders with disproportionate fulfillment and payment processing costs.
- Encourages bundle purchases and higher AOV without requiring aggressive discounting.

### Behavior Specification

| Condition | System Behavior |
|-----------|-----------------|
| Cart subtotal < ₹299 | Checkout button disabled; tooltip/message explains minimum |
| Cart subtotal ≥ ₹299 | Checkout enabled |
| User removes items mid-checkout | Re-validate on each checkout step; redirect to cart if below minimum |
| Promo code reduces subtotal below ₹299 | Checkout blocked; message: promo cannot be applied if it violates minimum order value, OR block promo application that would violate minimum (preferred) |
| API/backend validation | Server-side enforcement on checkout initiation and order creation (never client-only) |

### User-Facing Messaging

- **Cart page:** *"Minimum order value is ₹299. Add ₹{remaining} more to checkout."*
- **Cart drawer (if used):** Same message with link to continue shopping.
- **Progress indicator:** Visual bar from ₹0 → ₹299 showing current subtotal progress.

### Admin Configuration

- Minimum cart value configurable in Admin → Settings (default: ₹299).
- Changes apply immediately to new cart sessions; existing carts re-validated on next interaction.

### Edge Cases

- Gift cards (future): applied after subtotal calculation; minimum applies to product subtotal before gift card.
- Free samples (future): excluded from minimum calculation unless configured otherwise.

---

## 10. Free Shipping Rule (₹599)

### Rule Definition

Orders with a cart **subtotal ≥ ₹599** (after promo discounts, before shipping and taxes) qualify for **free standard shipping** within India.

Orders with subtotal **< ₹599** are charged a **flat standard shipping fee** (amount configured in admin, e.g., ₹49–₹79).

### Rationale

- Incentivizes larger baskets, improving AOV and reducing per-order logistics cost as a percentage of revenue.
- Transparent threshold creates a clear upsell opportunity without hidden fees.

### Behavior Specification

| Condition | Shipping Cost |
|-----------|---------------|
| Subtotal < ₹599 | Flat standard shipping fee applied |
| Subtotal ≥ ₹599 | Shipping = ₹0 (Free) |
| Express shipping (future) | Additional fee regardless of subtotal unless promoted |

### Calculation Order

1. Sum product line totals → **Cart Subtotal**
2. Apply promo code discount → **Discounted Subtotal**
3. Evaluate free shipping: if Discounted Subtotal ≥ ₹599 → shipping = ₹0; else shipping = flat rate
4. Add applicable taxes → **Order Total**

### User-Facing Messaging

- **Cart page (subtotal < ₹599):** *"Add ₹{remaining} more for free shipping!"*
- **Cart page (subtotal ≥ ₹599):** *"You've unlocked free shipping!"*
- **Checkout summary:** Line item: *Shipping — Free* or *Shipping — ₹{fee}*

### Admin Configuration

- Free-shipping threshold configurable in Admin → Settings (default: ₹599).
- Flat shipping rate configurable separately.
- Ability to disable free shipping promotion globally (emergency toggle).

### Edge Cases

- Remote/non-serviceable pin codes: show message that shipping is unavailable regardless of cart value.
- Partial refunds: shipping non-refundable unless entire order cancelled due to seller fault.
- International shipping (future): excluded from this rule; separate rate table applies.

---

## 11. Future Features

The following capabilities are **out of scope for v1** but should be considered in architecture and data modeling to avoid rework.

### Commerce & Merchandising

- **Product bundles and gift sets** — Pre-configured multi-product SKUs at bundle pricing.
- **Wishlist with shareable links** — Save and share product lists.
- **Back-in-stock notifications** — Email/SMS when out-of-stock items return.
- **Product reviews and ratings** — UGC with moderation workflow.
- **Loyalty program** — Points per purchase, tiered rewards.
- **Gift wrapping and personalized notes** — Add-on at checkout.

### Personalization & Content

- **Blog / lookbook** — SEO content and brand storytelling.
- **Sticker customizer** — Upload or configure custom designs (high complexity).
- **Regional language support** — Hindi UI toggle.

### Operations & Logistics

- **Multi-courier integration** — Automated rate shopping and label generation (Shiprocket, Delhivery API).
- **Warehouse multi-location inventory** — If scaling beyond single fulfillment center.
- **Bulk / B2B ordering** — MOQ pricing, GST invoice automation, net terms.

### Marketing & Growth

- **Abandoned cart recovery** — Email/SMS sequences.
- **Referral program** — Give ₹X, get ₹X credits.
- **Instagram / WhatsApp commerce integration** — Catalog sync and deep links.
- **Advanced analytics** — Funnel analysis, cohort LTV, A/B testing framework.

### Customer Experience

- **Mobile app (PWA or native)** — Push notifications for orders and promotions.
- **Live chat support** — Integrated helpdesk (Intercom, Freshchat).
- **Subscription boxes** — Recurring sticker club deliveries.

### Admin & Platform

- **Advanced RBAC** — Marketing, finance, and support roles with granular permissions.
- **Audit logs** — Track all admin changes to products, prices, and orders.
- **Headless API** — Public storefront decoupled from admin for future channels (marketplace, app).
- **Multi-currency / international expansion** — Beyond India.

---

## Appendix

### Glossary

| Term | Definition |
|------|------------|
| AOV | Average Order Value |
| AWB | Air Waybill — courier tracking number |
| D2C | Direct-to-Consumer |
| SKU | Stock Keeping Unit — unique product identifier |
| Subtotal | Sum of product line items before shipping and tax |

### Assumptions

- Single fulfillment location at launch.
- Payment gateway supports UPI, cards, and net banking for Indian customers.
- Product photography and copy provided by brand team before launch.
- Legal pages (Privacy, Terms, Returns) reviewed by legal counsel before go-live.

### Open Questions

1. Final flat shipping rate below ₹599 threshold?
2. GST-inclusive vs exclusive display on product pages?
3. Guest checkout only vs mandatory account for launch?
4. Which payment gateway (Razorpay, Cashfree, PayU)?
5. Return shipping cost borne by customer or brand?

---

*Document owner: Product Team · चित्रSTICKS*  
*Next review: Upon completion of technical design (DESIGN.md)*
