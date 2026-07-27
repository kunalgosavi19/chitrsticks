# Database Schema Documentation

**Product:** चित्रSTICKS E-Commerce Platform  
**Version:** 1.0  
**Status:** Draft  
**Last Updated:** July 22, 2026  
**Companion Documents:** [PRD.md](./PRD.md) · [DESIGN.md](./DESIGN.md)

---

## Overview

This document describes the logical data model for the चित्रSTICKS platform. It defines the tables required to support catalog browsing, cart and checkout, order fulfillment, promotions, customer accounts, and future capabilities such as reviews and custom sticker uploads.

### Conventions

| Convention | Description |
|------------|-------------|
| **Primary keys** | Opaque UUIDs (`id`) on all tables unless noted. Never expose sequential IDs publicly for orders or payments. |
| **Timestamps** | Every table includes `created_at` and `updated_at` (UTC). Soft-deletable tables add `deleted_at` where applicable. |
| **Currency** | All monetary amounts stored as **integers in paise** (1 ₹ = 100 paise) to avoid floating-point errors. Display layer converts to rupees. |
| **Public identifiers** | Customer-facing codes (order numbers, upload references) use human-readable prefixed strings (e.g., `CS-20260722-A1B2C3`) stored in dedicated columns, separate from internal UUIDs. |
| **Enums** | Status and type fields use enumerated string values documented per table. |
| **Guest support** | Tables that serve both authenticated and guest users use nullable foreign keys plus alternate identifiers (e.g., `session_id`). |

### Entity Relationship Summary

```
Users ─────────┬──────── Addresses
               ├──────── Carts ──── Cart Items ──── Products
               ├──────── Wishlist ─── Products
               ├──────── Orders ──── Order Items ─── Products
               │              └──── Payments
               │              └──── Coupons (applied)
               ├──────── Reviews ─── Products
               └──────── Custom Sticker Uploads

Newsletter (standalone, email-centric)

Coupons ──── Orders (redemption via Orders.coupon_id)
Products ◄──── referenced by Cart Items, Order Items, Wishlist, Reviews, Custom Sticker Uploads
```

### Supporting Entities (Out of Scope for Detailed Tables)

The PRD requires collections, product variants, and product images. These are not in the requested table list but are referenced throughout relationships:

| Entity | Role |
|--------|------|
| **Collections** | Themed product groupings (many-to-many with Products) |
| **Product Variants** | Size/finish/SKU-level inventory and pricing child records of Products |
| **Product Images** | Ordered image URLs and alt text per product or variant |

Field-level detail for these entities should be defined before catalog implementation. Relationships below reference them where Cart Items and Order Items may point to a variant rather than a base product alone.

---

## Users

### Purpose

Stores customer accounts for registered shoppers. Supports email/password authentication, profile management, order history linkage, saved addresses, wishlists, and optional post–guest-checkout account creation. Admin staff may share this table with a `role` discriminator or use a separate admin table at implementation time—the fields below describe the customer-facing user record.

Guest checkout does **not** require a Users row at purchase time; guest orders store contact email on the Order itself and may later link to a User if the customer registers with the same email.

### Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | UUID | Yes | Primary key. |
| `email` | String (255) | Yes | Unique login identifier. Normalized to lowercase. |
| `email_verified_at` | Timestamp | No | When the user confirmed their email address. |
| `password_hash` | String | No | Bcrypt/Argon2 hash. Null for OAuth-only accounts (future). |
| `first_name` | String (100) | No | Display and shipping default. |
| `last_name` | String (100) | No | Display and shipping default. |
| `phone` | String (15) | No | Indian mobile number, 10 digits stored without country code or with normalized `+91` prefix—pick one convention app-wide. |
| `role` | Enum | Yes | `customer` (default), `admin`, `fulfillment`. Admin UI access gated on role. |
| `status` | Enum | Yes | `active`, `suspended`, `deleted`. Suspended users cannot log in. |
| `last_login_at` | Timestamp | No | Most recent successful authentication. |
| `marketing_opt_in` | Boolean | Yes | Default `false`. User consent for promotional email beyond transactional messages. |
| `created_at` | Timestamp | Yes | Account creation time. |
| `updated_at` | Timestamp | Yes | Last profile modification. |
| `deleted_at` | Timestamp | No | Soft delete for GDPR/account deletion requests. |

**Indexes:** unique on `email`; index on `role`, `status`.

### Relationships

| Relationship | Type | Description |
|--------------|------|-------------|
| Users → Addresses | One-to-many | A user may save multiple shipping addresses. |
| Users → Carts | One-to-many | At most one **active** cart per user; historical/abandoned carts may be retained. |
| Users → Wishlist | One-to-many | Each row is one product saved by the user (see Wishlist table). |
| Users → Orders | One-to-many | All orders placed while authenticated. Nullable on Order for guest checkout. |
| Users → Reviews | One-to-many | Reviews submitted by authenticated users. |
| Users → Custom Sticker Uploads | One-to-many | Uploads tied to a logged-in customer. Nullable for guest uploads (future). |
| Users → Newsletter | Optional link | If a subscriber later creates an account, `newsletter.subscriber_id` may reference Users. Not required at signup. |

---

## Products

### Purpose

The canonical catalog record for each sellable sticker product (or sticker sheet/set). Holds merchandising content, base pricing, inventory, SEO metadata, and lifecycle status. Supports the premium catalog described in the PRD: curated collections, variants (via child records), compare-at pricing, and stock tracking.

Products with variants delegate SKU-level stock and price overrides to **Product Variants** (supporting entity). Cart Items and Order Items should reference the specific variant when applicable.

### Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | UUID | Yes | Primary key. |
| `name` | String (255) | Yes | Display name (e.g., "Mandala Gold Foil Sheet"). |
| `slug` | String (255) | Yes | Unique URL segment (`/products/mandala-gold-foil`). |
| `description` | Text | No | Long-form HTML or markdown product description. |
| `short_description` | String (500) | No | Catalog card excerpt. |
| `sku` | String (50) | No | Base SKU when no variants; otherwise null and SKU lives on variants. |
| `price_paise` | Integer | Yes | Current selling price in paise. |
| `compare_at_price_paise` | Integer | No | Strike-through "was" price for sale display. Must reflect genuine prior pricing per PRD compliance rules. |
| `cost_paise` | Integer | No | Internal COGS for margin reporting (admin only). |
| `stock_quantity` | Integer | Yes | On-hand units for simple (non-variant) products. Default `0`. Variants maintain their own stock. |
| `low_stock_threshold` | Integer | Yes | Triggers admin dashboard alert. Default e.g. `5`. |
| `track_inventory` | Boolean | Yes | If `false`, product is always considered in stock (made-to-order/custom). |
| `status` | Enum | Yes | `draft`, `active`, `archived`. Only `active` products are purchasable. |
| `is_customizable` | Boolean | Yes | Default `false`. If `true`, may accept linked Custom Sticker Uploads. |
| `weight_grams` | Integer | No | Shipping weight for rate calculation (future pin-code tiers). |
| `dimensions_mm` | JSON | No | `{ "width": 100, "height": 150, "depth": 1 }` for product detail specs. |
| `material` | String (255) | No | e.g., "Premium vinyl, matte laminate". |
| `care_instructions` | Text | No | Application and care copy. |
| `hsn_code` | String (20) | No | GST HSN/SAC code for invoicing (future). |
| `tax_rate_bps` | Integer | No | Tax rate in basis points (e.g., `1800` = 18.00%). Future GST implementation. |
| `tags` | String array | No | Search/filter tags (e.g., `["indian-art", "mandala", "gold"]`). |
| `meta_title` | String (70) | No | SEO title override. |
| `meta_description` | String (160) | No | SEO description override. |
| `sort_order` | Integer | No | Manual catalog sort weight within collection. |
| `published_at` | Timestamp | No | When product first went active. |
| `created_at` | Timestamp | Yes | Record creation. |
| `updated_at` | Timestamp | Yes | Last catalog edit. |
| `deleted_at` | Timestamp | No | Soft delete; archived products may use `status` instead. |

**Indexes:** unique on `slug`; unique on `sku` where not null; index on `status`, `price_paise`; GIN/full-text index on `name`, `description`, `tags` for search.

### Relationships

| Relationship | Type | Description |
|--------------|------|-------------|
| Products ↔ Collections | Many-to-many | Via junction table `collection_products` (supporting entity). |
| Products → Product Variants | One-to-many | Optional child SKUs (size, finish). |
| Products → Product Images | One-to-many | Ordered gallery images (supporting entity). |
| Products ← Cart Items | One-to-many | Items currently in shopping carts. |
| Products ← Order Items | One-to-many | Historical line items on fulfilled orders. |
| Products ← Wishlist | One-to-many | Saved items per user. |
| Products ← Reviews | One-to-many | Customer reviews post-delivery. |
| Products ← Custom Sticker Uploads | One-to-many | Uploads associated with a customizable product template. |

---

## Orders

### Purpose

Represents a completed or in-progress purchase transaction. Created when checkout is initiated (status `pending_payment`) and confirmed upon successful payment. Stores a **snapshot** of pricing, shipping, discounts, and shipping address at time of purchase so historical records remain accurate even if catalog prices or user addresses change later.

Enforces PRD business rules: minimum cart value (₹299), free shipping threshold (₹599), single coupon per order, and order lifecycle from payment through delivery.

### Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | UUID | Yes | Primary key. |
| `order_number` | String (20) | Yes | Public-facing ID (e.g., `CS-20260722-X7K9M2`). Unique, shown in emails and tracking. |
| `user_id` | UUID | No | FK → Users. Null for guest checkout. |
| `guest_email` | String (255) | Conditional | Required when `user_id` is null. Used for confirmations and optional account linking. |
| `guest_phone` | String (15) | No | Guest contact number. |
| `status` | Enum | Yes | See **Order Status** below. |
| `payment_status` | Enum | Yes | `pending`, `paid`, `failed`, `refunded`, `partially_refunded`. |
| `currency` | String (3) | Yes | Default `INR`. Reserved for future multi-currency. |
| `subtotal_paise` | Integer | Yes | Sum of line items before discounts. |
| `discount_paise` | Integer | Yes | Promo/coupon discount applied to subtotal. Default `0`. |
| `discounted_subtotal_paise` | Integer | Yes | `subtotal_paise - discount_paise`. Used for free-shipping evaluation. |
| `shipping_paise` | Integer | Yes | Shipping charged. `0` when free shipping applies. |
| `tax_paise` | Integer | Yes | Total tax amount. Default `0` until GST logic is implemented. |
| `total_paise` | Integer | Yes | Final amount charged: discounted subtotal + shipping + tax. |
| `coupon_id` | UUID | No | FK → Coupons. Applied promo code, if any. |
| `coupon_code_snapshot` | String (50) | No | Denormalized code string at time of order (e.g., `WELCOME10`). |
| `free_shipping_applied` | Boolean | Yes | Whether ₹599 threshold (or override) granted free shipping. |
| `min_cart_value_met` | Boolean | Yes | Validation flag that subtotal met ₹299 minimum at checkout. |
| **Shipping address snapshot** | | | |
| `shipping_full_name` | String (200) | Yes | Recipient name at order time. |
| `shipping_phone` | String (15) | Yes | Delivery contact. |
| `shipping_address_line1` | String (255) | Yes | Street / building. |
| `shipping_address_line2` | String (255) | No | Landmark, apartment, etc. |
| `shipping_city` | String (100) | Yes | City. |
| `shipping_state` | String (100) | Yes | State (Indian states/UTs). |
| `shipping_pin_code` | String (6) | Yes | 6-digit PIN code. |
| `shipping_country` | String (2) | Yes | ISO code. Default `IN`. |
| **Fulfillment** | | | |
| `courier_name` | String (100) | No | e.g., "Delhivery", "Blue Dart". Set when shipped. |
| `tracking_number` | String (100) | No | AWB / tracking ID. |
| `tracking_url` | String (500) | No | Courier tracking link. |
| `shipped_at` | Timestamp | No | When order left fulfillment. |
| `delivered_at` | Timestamp | No | When delivery confirmed. |
| `cancelled_at` | Timestamp | No | When order was cancelled. |
| `cancellation_reason` | Text | No | Customer or admin reason. |
| `customer_notes` | Text | No | Optional gift message or delivery instructions. |
| `admin_notes` | Text | No | Internal fulfillment notes. |
| `ip_address` | String (45) | No | Client IP at checkout for fraud review (future). |
| `user_agent` | String (500) | No | Browser/device string at checkout. |
| `created_at` | Timestamp | Yes | Order initiated (checkout started or payment session created). |
| `updated_at` | Timestamp | Yes | Last status or fulfillment update. |

**Order Status enum:** `pending_payment` → `paid` → `processing` → `shipped` → `delivered` | `cancelled` | `refunded`

**Indexes:** unique on `order_number`; index on `user_id`, `guest_email`, `status`, `payment_status`, `created_at`; composite index on `(status, created_at)` for admin filters.

### Relationships

| Relationship | Type | Description |
|--------------|------|-------------|
| Orders → Users | Many-to-one | Optional owner for authenticated purchases. |
| Orders → Order Items | One-to-many | Line items comprising the order. |
| Orders → Payments | One-to-many | Payment attempts; typically one successful payment per order. |
| Orders → Coupons | Many-to-one | Applied promotion. |
| Orders → Addresses | Soft reference | `shipping_*` fields snapshot address; optional `address_id` FK (not listed above) may record source Address row for analytics. |
| Orders → Custom Sticker Uploads | One-to-many | Custom uploads attached to this order's line items. |

---

## Order Items

### Purpose

Individual line items within an order. Each row captures the product (and variant) purchased, quantity, and **price at time of order** so receipts and refunds remain accurate if catalog prices change post-purchase.

### Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | UUID | Yes | Primary key. |
| `order_id` | UUID | Yes | FK → Orders. |
| `product_id` | UUID | Yes | FK → Products. |
| `product_variant_id` | UUID | No | FK → Product Variants (supporting entity). Null for simple products. |
| `custom_upload_id` | UUID | No | FK → Custom Sticker Uploads when line item is personalized. |
| `product_name_snapshot` | String (255) | Yes | Product title at purchase. |
| `variant_label_snapshot` | String (100) | No | e.g., "Large / Glossy" frozen at purchase. |
| `sku_snapshot` | String (50) | Yes | SKU at purchase for fulfillment and returns. |
| `unit_price_paise` | Integer | Yes | Price per unit at purchase (before line-level discounts). |
| `quantity` | Integer | Yes | Units ordered. Minimum `1`. |
| `line_subtotal_paise` | Integer | Yes | `unit_price_paise × quantity` before allocated order-level discount. |
| `line_discount_paise` | Integer | Yes | Portion of order coupon discount allocated to this line. Default `0`. |
| `line_total_paise` | Integer | Yes | Final line amount after discount allocation. |
| `tax_paise` | Integer | Yes | Tax attributed to this line (future GST split). Default `0`. |
| `image_url_snapshot` | String (500) | No | Primary product image URL at purchase for order history emails. |
| `is_returnable` | Boolean | Yes | Default `true`. `false` for custom/personalized items per PRD return policy. |
| `created_at` | Timestamp | Yes | Row creation (same as parent order confirmation). |
| `updated_at` | Timestamp | Yes | Updated on partial refund or return processing. |

**Indexes:** index on `order_id`; index on `product_id`; unique composite on `(order_id, product_id, product_variant_id, custom_upload_id)` where business rules allow duplicate products only with distinct uploads.

### Relationships

| Relationship | Type | Description |
|--------------|------|-------------|
| Order Items → Orders | Many-to-one | Parent order. Cascade delete only while order is `pending_payment`; otherwise restrict delete. |
| Order Items → Products | Many-to-one | Catalog reference. Restrict delete if historical orders exist. |
| Order Items → Product Variants | Many-to-one | Optional variant reference. |
| Order Items → Custom Sticker Uploads | Many-to-one | Optional personalization source file. |
| Order Items ← Reviews | One-to-one (optional) | A review may reference the specific order item purchased (verified purchase). |

---

## Wishlist

### Purpose

Stores products saved by registered users for later purchase. Supports the optional Phase 1 wishlist feature described in the PRD. Wishlist is **authenticated-only**; guests use cart or session-based favorites in a future iteration.

Each row represents one product (or variant) saved by one user. Duplicate saves are ignored or upserted.

### Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | UUID | Yes | Primary key. |
| `user_id` | UUID | Yes | FK → Users. |
| `product_id` | UUID | Yes | FK → Products. |
| `product_variant_id` | UUID | No | FK → Product Variants if user saved a specific variant. |
| `notify_on_sale` | Boolean | Yes | Default `false`. Future: email when product goes on sale. |
| `notify_on_restock` | Boolean | Yes | Default `false`. Future: back-in-stock alerts. |
| `created_at` | Timestamp | Yes | When item was saved. |
| `updated_at` | Timestamp | Yes | Last modification (e.g., notification prefs). |

**Indexes:** unique composite on `(user_id, product_id, product_variant_id)`; index on `user_id`.

### Relationships

| Relationship | Type | Description |
|--------------|------|-------------|
| Wishlist → Users | Many-to-one | Owning account. Delete wishlist rows when user is hard-deleted. |
| Wishlist → Products | Many-to-one | Saved product. Remove or orphan policy when product is archived. |
| Wishlist → Product Variants | Many-to-one | Optional specific variant. |

---

## Cart

### Purpose

Represents a shopping cart session holding items prior to checkout. Supports **authenticated carts** (linked to Users) and **guest carts** (linked to anonymous `session_id`). Enforces one active cart per user or session.

Cart header holds applied coupon reference and metadata; line-level detail lives in Cart Items. Business rule validation (₹299 minimum, ₹599 free shipping) is computed from cart items at read/checkout time and may be cached on the cart for display performance.

### Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | UUID | Yes | Primary key. |
| `user_id` | UUID | No | FK → Users. Set when authenticated. |
| `session_id` | String (64) | No | Anonymous browser/session token for guest carts. |
| `status` | Enum | Yes | `active`, `converted`, `abandoned`, `merged`. `converted` when order is paid; cart becomes read-only. |
| `coupon_id` | UUID | No | FK → Coupons currently applied. |
| `coupon_code` | String (50) | No | Denormalized for quick display without join. |
| `currency` | String (3) | Yes | Default `INR`. |
| `last_activity_at` | Timestamp | Yes | Updated on every cart mutation for abandonment analytics. |
| `converted_order_id` | UUID | No | FK → Orders once checkout succeeds. |
| `expires_at` | Timestamp | No | Guest cart TTL (e.g., 30 days). Null for user carts. |
| `created_at` | Timestamp | Yes | Cart creation. |
| `updated_at` | Timestamp | Yes | Last item or coupon change. |

**Constraints:** Exactly one of `user_id` or `session_id` must be set. At most one `active` cart per `user_id` or `session_id`.

**Indexes:** unique partial index on `user_id` where `status = 'active'`; index on `session_id`, `status`, `last_activity_at`.

### Relationships

| Relationship | Type | Description |
|--------------|------|-------------|
| Cart → Users | Many-to-one | Optional owner. On login, guest cart may merge into user cart. |
| Cart → Cart Items | One-to-many | Products and quantities in the basket. |
| Cart → Coupons | Many-to-one | Currently applied promotion. |
| Cart → Orders | One-to-one (optional) | `converted_order_id` links to resulting order after payment. |

---

## Cart Items

### Purpose

Line-level entries within a cart: which product (and variant), quantity, and any linked custom upload. Prices are read from the current catalog at display/checkout time (not snapshotted until order creation). Stock availability is validated before checkout and again at payment capture.

### Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | UUID | Yes | Primary key. |
| `cart_id` | UUID | Yes | FK → Cart. |
| `product_id` | UUID | Yes | FK → Products. |
| `product_variant_id` | UUID | No | FK → Product Variants. |
| `custom_upload_id` | UUID | No | FK → Custom Sticker Uploads for customizable products. |
| `quantity` | Integer | Yes | Minimum `1`; maximum enforced by stock and per-product limits. |
| `added_at` | Timestamp | Yes | When item was first added (defaults to `created_at`). |
| `created_at` | Timestamp | Yes | Row creation. |
| `updated_at` | Timestamp | Yes | Last quantity change. |

**Indexes:** unique composite on `(cart_id, product_id, product_variant_id, custom_upload_id)`; index on `cart_id`.

### Relationships

| Relationship | Type | Description |
|--------------|------|-------------|
| Cart Items → Cart | Many-to-one | Parent cart. Cascade delete when cart is cleared. |
| Cart Items → Products | Many-to-one | Live catalog reference for pricing and stock checks. |
| Cart Items → Product Variants | Many-to-one | Optional variant. |
| Cart Items → Custom Sticker Uploads | Many-to-one | Optional personalization before add-to-cart completes. |

---

## Coupons

### Purpose

Promotional discount codes configured in admin (PRD §7.7). Supports percentage or fixed-amount discounts, validity windows, usage limits, minimum cart requirements, and product/collection scoping. One coupon applies per order; discount applies to product subtotal, not shipping.

Also referred to as "promo codes" in the PRD UI copy.

### Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | UUID | Yes | Primary key. |
| `code` | String (50) | Yes | Unique, case-insensitive redeemable code (e.g., `WELCOME10`). Stored uppercase. |
| `description` | String (255) | No | Internal/admin description of campaign. |
| `discount_type` | Enum | Yes | `percentage` or `fixed_amount`. |
| `discount_value` | Integer | Yes | Percentage (0–100) or fixed discount in paise depending on type. |
| `max_discount_paise` | Integer | No | Cap for percentage discounts (e.g., max ₹100 off). |
| `min_cart_value_paise` | Integer | Yes | Minimum subtotal required to apply code. Default `29900` (₹299) aligned with store minimum or higher. |
| `usage_limit_total` | Integer | No | Max redemptions store-wide. Null = unlimited. |
| `usage_limit_per_user` | Integer | No | Max redemptions per user. Null = unlimited. |
| `usage_count` | Integer | Yes | Running total redemptions. Default `0`. |
| `starts_at` | Timestamp | No | Code valid from. Null = immediately. |
| `expires_at` | Timestamp | No | Code valid until. Null = no expiry. |
| `is_active` | Boolean | Yes | Admin kill switch. Default `true`. |
| `applies_to` | Enum | Yes | `all_products`, `specific_products`, `specific_collections`. |
| `applicable_product_ids` | UUID array | No | When `applies_to = specific_products`. |
| `applicable_collection_ids` | UUID array | No | When `applies_to = specific_collections`. |
| `prevent_below_min_cart` | Boolean | Yes | If `true`, reject application that would drop discounted subtotal below store minimum (₹299). Default `true`. |
| `created_by` | UUID | No | FK → Users (admin) who created the coupon. |
| `created_at` | Timestamp | Yes | Record creation. |
| `updated_at` | Timestamp | Yes | Last edit. |

**Indexes:** unique on `upper(code)`; index on `is_active`, `starts_at`, `expires_at`.

### Relationships

| Relationship | Type | Description |
|--------------|------|-------------|
| Coupons ← Carts | One-to-many | Carts with this code applied pre-checkout. |
| Coupons ← Orders | One-to-many | Orders that redeemed the code (`Orders.coupon_id`). |
| Coupons → Users | Many-to-one | Admin creator (optional). |

---

## Addresses

### Purpose

Saved shipping addresses for registered users. Speeds up repeat checkout and supports the Account → Addresses page. Checkout copies address fields onto the Order snapshot; edits to saved addresses do not retroactively change past orders.

Indian address format: line1, line2, city, state, 6-digit PIN code, phone.

### Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | UUID | Yes | Primary key. |
| `user_id` | UUID | Yes | FK → Users. |
| `label` | String (50) | No | User-defined label: "Home", "Office", etc. |
| `full_name` | String (200) | Yes | Recipient name. |
| `phone` | String (15) | Yes | Delivery contact number. |
| `address_line1` | String (255) | Yes | Street, house number, building. |
| `address_line2` | String (255) | No | Landmark, floor, apartment. |
| `city` | String (100) | Yes | City or town. |
| `state` | String (100) | Yes | State or union territory. |
| `pin_code` | String (6) | Yes | 6-digit postal code. Validated against serviceable PIN list. |
| `country` | String (2) | Yes | ISO 3166-1 alpha-2. Default `IN`. |
| `is_default` | Boolean | Yes | Default `false`. One default shipping address per user. |
| `is_serviceable` | Boolean | No | Cached result of PIN code shipping check. May be refreshed periodically. |
| `created_at` | Timestamp | Yes | When address was saved. |
| `updated_at` | Timestamp | Yes | Last edit. |
| `deleted_at` | Timestamp | No | Soft delete. |

**Indexes:** index on `user_id`; partial unique on `(user_id)` where `is_default = true` (one default per user).

### Relationships

| Relationship | Type | Description |
|--------------|------|-------------|
| Addresses → Users | Many-to-one | Owning customer. Delete addresses when user is hard-deleted. |
| Addresses → Orders | One-to-many (optional) | Orders may store optional `source_address_id` for analytics; snapshot fields are authoritative. |

---

## Reviews

### Purpose

Customer product reviews and ratings. Supports the future UGC feature in PRD §11 with a schema ready at launch. Reviews require moderation before public display. Verified-purchase badge when linked to an Order Item.

### Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | UUID | Yes | Primary key. |
| `product_id` | UUID | Yes | FK → Products. |
| `user_id` | UUID | Yes | FK → Users. Author. |
| `order_item_id` | UUID | No | FK → Order Items. Set when review is tied to verified purchase. |
| `rating` | Integer | Yes | 1–5 stars. |
| `title` | String (150) | No | Review headline. |
| `body` | Text | No | Review content. |
| `status` | Enum | Yes | `pending`, `approved`, `rejected`, `flagged`. Only `approved` shown publicly. |
| `is_verified_purchase` | Boolean | Yes | Derived from presence of valid `order_item_id`. |
| `helpful_count` | Integer | Yes | Default `0`. Future "was this helpful?" votes. |
| `admin_response` | Text | No | Official brand reply visible on product page. |
| `responded_at` | Timestamp | No | When admin responded. |
| `moderated_by` | UUID | No | FK → Users (admin). |
| `moderated_at` | Timestamp | No | When moderation decision was made. |
| `rejection_reason` | String (255) | No | Internal reason if rejected. |
| `created_at` | Timestamp | Yes | Submission time. |
| `updated_at` | Timestamp | Yes | Last edit by user or admin. |

**Constraints:** One review per `(user_id, product_id)` or per `(user_id, order_item_id)` to prevent spam.

**Indexes:** index on `product_id`, `status`; unique on `(user_id, product_id)` where not order-linked.

### Relationships

| Relationship | Type | Description |
|--------------|------|-------------|
| Reviews → Products | Many-to-one | Reviewed product. |
| Reviews → Users | Many-to-one | Review author. |
| Reviews → Order Items | Many-to-one | Optional verified purchase link. |
| Reviews → Users (moderator) | Many-to-one | Admin who approved/rejected. |

---

## Newsletter

### Purpose

Captures email subscribers from footer signup, checkout opt-in, and marketing landing pages. Distinct from transactional order emails. Supports double opt-in, unsubscribe tracking, and future integration with email service providers (Mailchimp, SendGrid, etc.).

### Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | UUID | Yes | Primary key. |
| `email` | String (255) | Yes | Subscriber email. Unique, lowercase normalized. |
| `subscriber_id` | UUID | No | FK → Users if subscriber later creates an account. |
| `status` | Enum | Yes | `pending`, `active`, `unsubscribed`, `bounced`. |
| `source` | Enum | Yes | `footer`, `checkout`, `popup`, `admin_import`, `other`. |
| `consent_text` | String (500) | No | Wording of consent checkbox at signup for compliance. |
| `consent_at` | Timestamp | No | When user explicitly opted in. |
| `confirmed_at` | Timestamp | No | Double opt-in confirmation timestamp. |
| `unsubscribed_at` | Timestamp | No | When user unsubscribed. |
| `unsubscribe_token` | String (64) | Yes | Unique token for one-click unsubscribe links. |
| `ip_address` | String (45) | No | IP at signup for compliance audit. |
| `user_agent` | String (500) | No | Device/browser at signup. |
| `tags` | String array | No | Segmentation tags (e.g., `["launch-list"]`). |
| `created_at` | Timestamp | Yes | Initial subscription request. |
| `updated_at` | Timestamp | Yes | Last status change. |

**Indexes:** unique on `email`; unique on `unsubscribe_token`; index on `status`.

### Relationships

| Relationship | Type | Description |
|--------------|------|-------------|
| Newsletter → Users | Many-to-one (optional) | Linked account if email matches registered user. |

---

## Custom Sticker Uploads

### Purpose

Stores customer-uploaded artwork for personalized/custom sticker orders (PRD future feature: sticker customizer). Tracks file metadata, processing status, admin approval, and linkage to cart items and order items. Custom products are **non-returnable** per PRD return policy.

### Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | UUID | Yes | Primary key. |
| `reference_code` | String (20) | Yes | Public reference (e.g., `UP-20260722-K4M8`). |
| `user_id` | UUID | No | FK → Users. Null for guest uploads until checkout links email. |
| `product_id` | UUID | Yes | FK → Products. Must be a customizable product template. |
| `original_filename` | String (255) | Yes | Client-side file name. |
| `storage_path` | String (500) | Yes | Object storage key (S3/R2 path). Never expose directly; serve via signed URLs. |
| `storage_url` | String (500) | No | Cached CDN URL if applicable. |
| `mime_type` | String (100) | Yes | e.g., `image/png`, `image/svg+xml`, `application/pdf`. |
| `file_size_bytes` | Integer | Yes | Upload size for quota enforcement. |
| `width_px` | Integer | No | Image dimensions after processing. |
| `height_px` | Integer | No | Image dimensions after processing. |
| `preview_storage_path` | String (500) | No | Thumbnail/preview for cart and admin review. |
| `status` | Enum | Yes | See **Upload Status** below. |
| `rejection_reason` | Text | No | Admin feedback if design rejected (copyright, quality, etc.). |
| `customer_notes` | Text | No | Instructions from customer (placement, colors). |
| `admin_notes` | Text | No | Internal production notes. |
| `approved_by` | UUID | No | FK → Users (admin). |
| `approved_at` | Timestamp | No | When design approved for production. |
| `expires_at` | Timestamp | No | Auto-delete orphaned uploads not attached to a paid order. |
| `ip_address` | String (45) | No | Uploader IP for abuse monitoring. |
| `created_at` | Timestamp | Yes | Upload time. |
| `updated_at` | Timestamp | Yes | Last status change. |

**Upload Status enum:** `uploaded` → `processing` → `pending_approval` → `approved` | `rejected` | `expired`

Allowed MIME types and max file size enforced at application layer (e.g., 10 MB, PNG/JPG/SVG/PDF).

**Indexes:** unique on `reference_code`; index on `user_id`, `product_id`, `status`.

### Relationships

| Relationship | Type | Description |
|--------------|------|-------------|
| Custom Sticker Uploads → Users | Many-to-one | Uploader account (optional). |
| Custom Sticker Uploads → Products | Many-to-one | Product template being customized. |
| Custom Sticker Uploads ← Cart Items | One-to-many | Pending cart lines using this design. |
| Custom Sticker Uploads ← Order Items | One-to-many | Fulfilled orders including this design. |
| Custom Sticker Uploads → Users (approver) | Many-to-one | Admin who approved/rejected. |

---

## Payments

### Purpose

Records payment attempts and outcomes from the payment gateway (Razorpay or equivalent). Separated from Orders to support idempotent retries, webhook reconciliation, refunds, and audit trails without duplicating orders.

An order may have multiple payment rows (failed attempts); exactly one should reach `captured` status for a successful sale.

### Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | UUID | Yes | Primary key. |
| `order_id` | UUID | Yes | FK → Orders. |
| `user_id` | UUID | No | FK → Users. Payer if authenticated. |
| `gateway` | Enum | Yes | `razorpay`, `cashfree`, `payu`, `manual`. Extensible. |
| `gateway_order_id` | String (100) | No | Payment gateway's order/session ID. |
| `gateway_payment_id` | String (100) | No | Gateway payment ID on success. |
| `gateway_signature` | String (255) | No | Webhook/callback signature for verification. Stored hashed or omitted after verification per security policy. |
| `amount_paise` | Integer | Yes | Amount attempted in paise. Must match `Orders.total_paise` at capture. |
| `currency` | String (3) | Yes | Default `INR`. |
| `method` | Enum | No | `upi`, `card`, `netbanking`, `wallet`, `emi`, `unknown`. Set from gateway response. |
| `method_details` | JSON | No | Masked instrument info (e.g., last4, UPI VPA masked, card network). No PCI raw data. |
| `status` | Enum | Yes | See **Payment Status** below. |
| `failure_code` | String (50) | No | Gateway error code on failure. |
| `failure_message` | String (500) | No | Human-readable failure reason. |
| `refund_amount_paise` | Integer | Yes | Total refunded against this payment. Default `0`. |
| `refunded_at` | Timestamp | No | Latest refund timestamp. |
| `idempotency_key` | String (64) | Yes | Client-generated key to prevent duplicate charges on retry. Unique. |
| `webhook_received_at` | Timestamp | No | Last webhook processed for this payment. |
| `metadata` | JSON | No | Arbitrary gateway payload excerpts for debugging. |
| `created_at` | Timestamp | Yes | Payment session initiated. |
| `updated_at` | Timestamp | Yes | Last status update. |
| `captured_at` | Timestamp | No | When payment was successfully captured. |

**Payment Status enum:** `created` → `authorized` → `captured` | `failed` | `cancelled` | `refunded` | `partially_refunded`

**Indexes:** index on `order_id`; unique on `idempotency_key`; unique on `gateway_payment_id` where not null; index on `status`, `gateway`.

### Relationships

| Relationship | Type | Description |
|--------------|------|-------------|
| Payments → Orders | Many-to-one | Parent order being paid. |
| Payments → Users | Many-to-one | Optional payer account. |

---

## Cross-Table Business Rules

These rules from the PRD must be enforced in application logic referencing the tables above:

| Rule | Implementation Notes |
|------|---------------------|
| **Minimum cart ₹299** | Sum `Cart Items` × current catalog price ≥ `29900` paise before checkout. Block `Coupons` that violate minimum when `prevent_below_min_cart = true`. Persist `Orders.min_cart_value_met`. |
| **Free shipping ₹599** | After coupon discount, if `Orders.discounted_subtotal_paise ≥ 59900`, set `shipping_paise = 0` and `free_shipping_applied = true`. |
| **Stock decrement** | On payment `captured`, decrement `Products.stock_quantity` or variant stock for each `Order Item`. |
| **Order creation timing** | Create `Orders` + `Order Items` at checkout start (`pending_payment`); transition to `paid` only on `Payments.status = captured`. |
| **Coupon redemption** | Increment `Coupons.usage_count` atomically on successful payment; validate limits and date range. |
| **Cart conversion** | Set `Cart.status = converted` and `Cart.converted_order_id` on successful payment. |
| **Guest merge** | On login, merge `session_id` cart into `user_id` cart; deduplicate `Cart Items`. |
| **Custom uploads** | Require `Custom Sticker Uploads.status = approved` before checkout for products with `is_customizable = true`. Set `Order Items.is_returnable = false`. |
| **Reviews** | Optionally restrict submission to users with delivered `Order Items` for that `product_id`. |

---

## Data Retention & Privacy

| Data | Retention Policy |
|------|------------------|
| Active carts | Guest: 30 days from `last_activity_at`; User: indefinite until converted or cleared. |
| Abandoned carts | 90 days for marketing recovery, then anonymize or delete. |
| Orders & payments | 7+ years for tax/accounting compliance (India). |
| Custom uploads (unpaid) | Delete after `expires_at` (e.g., 7 days). |
| Custom uploads (paid) | Retain with order for reprint/dispute window, then archive. |
| Newsletter (unsubscribed) | Retain suppression record indefinitely to honor opt-out. |
| User soft delete | Anonymize PII; retain order/payment records with redacted identifiers. |

---

## Appendix: Store Settings (Configuration, Not Transactional)

These PRD-defined values are not in the requested table list but are typically stored in a **Store Settings** key-value or singleton table:

| Setting Key | Default | Description |
|-------------|---------|-------------|
| `min_cart_value_paise` | `29900` | Minimum order subtotal (₹299). |
| `free_shipping_threshold_paise` | `59900` | Free shipping subtotal threshold (₹599). |
| `flat_shipping_rate_paise` | TBD | Standard shipping below threshold. |
| `store_name` | `चित्रSTICKS` | Brand name. |
| `support_email` | — | Customer support contact. |
| `support_phone` | — | Support phone number. |

---

*Document owner: Engineering / Product Team · चित्रSTICKS*  
*Next review: Upon TASKS.md implementation planning and ORM selection*
