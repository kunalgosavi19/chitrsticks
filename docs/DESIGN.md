# Design System

**Product:** चित्रSTICKS E-Commerce Platform  
**Version:** 1.0  
**Status:** Draft  
**Last Updated:** July 22, 2026  
**Companion Document:** [PRD.md](./PRD.md)

---

## Overview

This document defines the visual and interaction design language for the चित्रSTICKS storefront and admin interface. It translates the brand positioning—*premium lifestyle stickers rooted in Indian artistic heritage, expressed through contemporary design*—into a consistent, scalable system of tokens, components, and patterns.

### Design Principles

| Principle | Description |
|-----------|-------------|
| **Premium, not precious** | Elevated aesthetics with approachable usability. Avoid clutter; let product art breathe. |
| **Heritage meets modern** | Subtle nods to Indian craft (color, typography, motif) without ornamental overload. |
| **Mobile-first clarity** | ≥ 70% of traffic is mobile. Every pattern must work on small screens first. |
| **Trust through transparency** | Pricing, shipping thresholds, and order status are always visible and legible. |
| **Accessible by default** | WCAG 2.1 AA contrast, touch targets, and readable type at all breakpoints. |

### Token Naming Convention

Design tokens follow a hierarchical naming pattern:

```
{category}-{property}-{variant}-{state}
```

Examples: `color-brand-primary`, `spacing-4`, `radius-lg`, `shadow-card-hover`

Implementation may map these to CSS custom properties, Tailwind theme extensions, or design-tool libraries. This document defines the canonical values.

---

## Brand Colors

The palette balances warm, culturally resonant tones with neutral foundations suitable for product photography and long browsing sessions.

### Primary Palette

| Token | Hex | RGB | Usage |
|-------|-----|-----|-------|
| `color-brand-primary` | `#C45C26` | 196, 92, 38 | Primary CTAs, active nav states, key accents. Inspired by terracotta and earthen craft. |
| `color-brand-primary-hover` | `#A84E20` | 168, 78, 32 | Hover state for primary buttons and links. |
| `color-brand-primary-active` | `#8F4219` | 143, 66, 25 | Pressed/active state. |
| `color-brand-primary-subtle` | `#FDF3ED` | 253, 243, 237 | Light tint backgrounds, badges, progress bars toward ₹299/₹599. |

### Secondary Palette

| Token | Hex | RGB | Usage |
|-------|-----|-----|-------|
| `color-brand-secondary` | `#1E3A5F` | 30, 58, 95 | Headings, footer background, premium accents. Deep indigo evoking traditional dye and ink. |
| `color-brand-secondary-hover` | `#152A45` | 21, 42, 69 | Hover on secondary buttons. |
| `color-brand-secondary-subtle` | `#EEF2F7` | 238, 242, 247 | Secondary section backgrounds, info panels. |

### Accent Palette

| Token | Hex | RGB | Usage |
|-------|-----|-----|-------|
| `color-accent-saffron` | `#E8A317` | 232, 163, 23 | Promotional highlights, "Free shipping unlocked" states, limited badges. |
| `color-accent-saffron-subtle` | `#FEF8E8` | 254, 248, 232 | Success-adjacent promotional backgrounds. |
| `color-accent-teal` | `#2A7F7F` | 42, 127, 127 | Success confirmations, in-stock indicators, trust badges. |
| `color-accent-rose` | `#C45C6A` | 196, 92, 106 | Sale/compare-at pricing, wishlist active state (optional). |

### Neutral Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `color-neutral-0` | `#FFFFFF` | Page backgrounds, card surfaces, input backgrounds. |
| `color-neutral-50` | `#FAFAF8` | Alternate page background (warm off-white). |
| `color-neutral-100` | `#F2F0EC` | Dividers, disabled backgrounds, subtle borders. |
| `color-neutral-200` | `#E4E0DA` | Default borders, input borders. |
| `color-neutral-300` | `#C9C4BC` | Placeholder text, inactive icons. |
| `color-neutral-400` | `#9E9890` | Secondary text, captions. |
| `color-neutral-500` | `#736E66` | Body text (light backgrounds). |
| `color-neutral-600` | `#524E48` | Emphasized body text. |
| `color-neutral-700` | `#3A3733` | Headings on light backgrounds. |
| `color-neutral-900` | `#1A1816` | Primary text, high-emphasis headings. |

### Semantic Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `color-success` | `#2A7F7F` | Order confirmed, item added, free shipping unlocked. |
| `color-success-subtle` | `#E8F4F4` | Success alert backgrounds. |
| `color-warning` | `#E8A317` | Low stock, cart below minimum (₹299), approaching threshold. |
| `color-warning-subtle` | `#FEF8E8` | Warning alert backgrounds. |
| `color-error` | `#C0392B` | Form errors, payment failure, out of stock. |
| `color-error-subtle` | `#FCEAEA` | Error alert backgrounds. |
| `color-info` | `#1E3A5F` | Informational banners, shipping estimates. |
| `color-info-subtle` | `#EEF2F7` | Info alert backgrounds. |

### Color Usage Rules

1. **Primary actions** use `color-brand-primary`. Never use saffron for primary checkout CTAs—it is reserved for promotional/success messaging.
2. **Body text** on light backgrounds: `color-neutral-900` (headings), `color-neutral-500` (body), `color-neutral-400` (captions).
3. **Text on dark backgrounds** (footer, hero overlays): `color-neutral-0` at 100% (headings) and 80% opacity (body).
4. **Minimum contrast:** All text/background pairs must meet WCAG 2.1 AA (4.5:1 normal text, 3:1 large text).
5. **Product imagery** always sits on `color-neutral-0` or `color-neutral-50`—never on saturated brand colors.
6. **Progress indicators** (₹299 min cart, ₹599 free shipping) use a gradient from `color-brand-primary-subtle` fill to `color-brand-primary` or `color-accent-saffron` at threshold completion.

### Dark Mode

Dark mode is **out of scope for v1**. Token architecture should reserve a `dark-` prefix namespace for future extension.

---

## Typography

Typography pairs a distinctive display face (brand personality) with a highly legible UI face (commerce clarity). Devanagari brand elements in the logo and marketing headings use the display family where supported.

### Font Families

| Token | Family | Fallback Stack | Role |
|-------|--------|----------------|------|
| `font-display` | **Fraunces** | Georgia, "Times New Roman", serif | Hero headlines, collection titles, brand moments. |
| `font-body` | **DM Sans** | system-ui, -apple-system, sans-serif | Body copy, UI labels, buttons, forms, navigation. |
| `font-mono` | **DM Mono** | ui-monospace, monospace | Order IDs, promo codes, SKUs (admin + confirmation). |

**Devanagari consideration:** For inline Hindi copy (e.g., taglines, collection names), use **Noto Sans Devanagari** as a supplementary family when `font-body` lacks glyph coverage. Logo wordmark is a custom asset, not a live font dependency.

### Type Scale

Base font size: **16px** (`1rem`) on mobile; scales to **18px** on desktop for body where specified.

| Token | Size (mobile) | Size (desktop) | Weight | Line Height | Letter Spacing | Usage |
|-------|-----------------|----------------|--------|-------------|----------------|-------|
| `text-display-xl` | 40px / 2.5rem | 56px / 3.5rem | 600 | 1.1 | -0.02em | Homepage hero headline |
| `text-display-lg` | 32px / 2rem | 44px / 2.75rem | 600 | 1.15 | -0.02em | Collection page titles |
| `text-display-md` | 28px / 1.75rem | 36px / 2.25rem | 600 | 1.2 | -0.01em | Section headings |
| `text-heading-lg` | 24px / 1.5rem | 28px / 1.75rem | 600 | 1.25 | -0.01em | Page titles (Cart, Checkout) |
| `text-heading-md` | 20px / 1.25rem | 22px / 1.375rem | 600 | 1.3 | 0 | Card titles, product names |
| `text-heading-sm` | 18px / 1.125rem | 18px / 1.125rem | 600 | 1.35 | 0 | Subsection headings |
| `text-body-lg` | 18px / 1.125rem | 18px / 1.125rem | 400 | 1.6 | 0 | Lead paragraphs, About page |
| `text-body-md` | 16px / 1rem | 16px / 1rem | 400 | 1.6 | 0 | Default body, descriptions |
| `text-body-sm` | 14px / 0.875rem | 14px / 0.875rem | 400 | 1.5 | 0 | Secondary info, metadata |
| `text-caption` | 12px / 0.75rem | 12px / 0.75rem | 500 | 1.4 | 0.02em | Labels, legal footnotes, badges |
| `text-overline` | 11px / 0.6875rem | 12px / 0.75rem | 600 | 1.3 | 0.08em | Category tags, "NEW", uppercase labels |

### Font Weights

| Token | Value | Usage |
|-------|-------|-------|
| `font-weight-regular` | 400 | Body text |
| `font-weight-medium` | 500 | Buttons, captions, nav links |
| `font-weight-semibold` | 600 | Headings, prices, emphasis |
| `font-weight-bold` | 700 | Rare; promotional callouts only |

### Typography Rules

1. **Maximum line length:** 65–75 characters for body copy (`max-width: 65ch`).
2. **Product names:** `text-heading-sm`, max 2 lines with ellipsis overflow in cards.
3. **Prices:** `font-weight-semibold`, `text-heading-sm` on cards; `text-heading-md` on product detail and checkout.
4. **Currency:** Always prefix with `₹` (Unicode U+20B9). No space between symbol and amount for whole rupees: `₹299`. Use Indian numbering (lakhs) only in admin dashboards if needed; storefront uses standard grouping: `₹1,299`.
5. **All caps:** Restrict to `text-overline` labels only—never for sentences or button text.
6. **Link styling:** Underline on hover only for inline text links; nav links use color/weight change without underline.

---

## Spacing

Spacing follows a **4px base grid**. All margins, paddings, and gaps should use tokens from this scale.

### Spacing Scale

| Token | Value | Common Usage |
|-------|-------|--------------|
| `spacing-0` | 0 | Reset |
| `spacing-1` | 4px | Tight icon gaps, badge padding |
| `spacing-2` | 8px | Inline element gaps, compact list items |
| `spacing-3` | 12px | Form field internal padding (vertical), chip gaps |
| `spacing-4` | 16px | Default component padding, card inner padding (mobile) |
| `spacing-5` | 20px | Section gaps within components |
| `spacing-6` | 24px | Card padding (desktop), stack gaps between form fields |
| `spacing-8` | 32px | Section padding (mobile), grid gaps (mobile) |
| `spacing-10` | 40px | Component group separation |
| `spacing-12` | 48px | Section padding (desktop) |
| `spacing-16` | 64px | Major section vertical rhythm |
| `spacing-20` | 80px | Hero vertical padding (desktop) |
| `spacing-24` | 96px | Large homepage section breaks |

### Layout Spacing

| Token | Value | Usage |
|-------|-------|-------|
| `layout-gutter-mobile` | 16px | Horizontal page padding on mobile |
| `layout-gutter-tablet` | 24px | Horizontal page padding on tablet (≥ 768px) |
| `layout-gutter-desktop` | 32px | Horizontal page padding on desktop (≥ 1024px) |
| `layout-max-width` | 1280px | Maximum content width |
| `layout-max-width-narrow` | 720px | Checkout, forms, article content |
| `layout-max-width-wide` | 1440px | Full-bleed hero, large catalog grids |

### Spacing Rules

1. **Vertical rhythm:** Section-to-section spacing uses `spacing-16` (mobile) and `spacing-20` (desktop) minimum.
2. **Component internals:** Prefer `spacing-4` (mobile) and `spacing-6` (desktop) for card padding.
3. **Touch targets:** Interactive elements require minimum **44×44px** hit area; use padding tokens to achieve this even when visual size is smaller.
4. **Grid gaps:** Product grids use `spacing-4` (mobile, 2 columns) and `spacing-6` (desktop, 3–4 columns).

---

## Border Radius

Rounded corners convey approachability and align with the soft, tactile nature of stickers. Radius values are intentionally moderate—not fully pill-shaped except for badges and chips.

| Token | Value | Usage |
|-------|-------|-------|
| `radius-none` | 0 | Image crops (full-bleed), admin data tables |
| `radius-sm` | 4px | Badges, tags, small chips |
| `radius-md` | 8px | Buttons, inputs, thumbnails, dropdown menus |
| `radius-lg` | 12px | Cards, modals, cart drawer panels |
| `radius-xl` | 16px | Feature cards, hero CTA containers, product image containers |
| `radius-2xl` | 24px | Marketing banners, collection hero cards |
| `radius-full` | 9999px | Circular icon buttons, avatar placeholders, quantity pill toggles |

### Radius Rules

1. **Product images** use `radius-lg` on catalog cards and `radius-xl` on product detail gallery.
2. **Nested elements:** Inner radius = outer radius minus padding (e.g., card `radius-lg` with `spacing-4` padding → image `radius-md`).
3. **Buttons** always use `radius-md` regardless of size variant.
4. **Admin UI** may use `radius-sm` and `radius-md` exclusively for a denser, utilitarian feel.

---

## Shadows

Shadows are soft and warm-toned (based on `color-neutral-900` at low opacity) to reinforce premium depth without harsh contrast.

| Token | Value | Usage |
|-------|-------|-------|
| `shadow-none` | none | Flat elements, inline inputs |
| `shadow-xs` | `0 1px 2px rgba(26, 24, 22, 0.04)` | Subtle lift: badges, sticky mini-cart bar |
| `shadow-sm` | `0 2px 4px rgba(26, 24, 22, 0.06), 0 1px 2px rgba(26, 24, 22, 0.04)` | Cards at rest, dropdowns |
| `shadow-md` | `0 4px 12px rgba(26, 24, 22, 0.08), 0 2px 4px rgba(26, 24, 22, 0.04)` | Hover cards, popovers, cart drawer |
| `shadow-lg` | `0 8px 24px rgba(26, 24, 22, 0.10), 0 4px 8px rgba(26, 24, 22, 0.04)` | Modals, mobile nav overlay panel |
| `shadow-xl` | `0 16px 48px rgba(26, 24, 22, 0.12)` | Image zoom overlay, full-screen mobile menu |
| `shadow-inner` | `inset 0 2px 4px rgba(26, 24, 22, 0.06)` | Pressed input states, inset image frames |

### Shadow Rules

1. **Elevation hierarchy:** Resting cards → `shadow-sm`; hover → `shadow-md`; modals/drawers → `shadow-lg` or `shadow-xl`.
2. **Navbar (sticky):** `shadow-sm` when scrolled; `shadow-none` at page top.
3. **Avoid** combining heavy shadow with heavy border on the same element—choose one depth cue.
4. **Dark backgrounds:** Do not use shadows on footer elements; rely on background color contrast.

---

## Buttons

Buttons are the primary conversion drivers. Hierarchy must be immediately scannable on mobile checkout flows.

### Button Variants

| Variant | Background | Text | Border | Usage |
|---------|------------|------|--------|-------|
| **Primary** | `color-brand-primary` | `color-neutral-0` | none | Add to Cart, Proceed to Checkout, Pay Now |
| **Primary Hover** | `color-brand-primary-hover` | `color-neutral-0` | none | — |
| **Secondary** | transparent | `color-brand-secondary` | 1.5px `color-brand-secondary` | Continue Shopping, View Collection |
| **Secondary Hover** | `color-brand-secondary-subtle` | `color-brand-secondary` | 1.5px `color-brand-secondary` | — |
| **Ghost** | transparent | `color-neutral-700` | none | Tertiary actions, Cancel, modal dismiss |
| **Ghost Hover** | `color-neutral-100` | `color-neutral-900` | none | — |
| **Destructive** | `color-error` | `color-neutral-0` | none | Remove item, delete address (admin) |
| **Disabled** | `color-neutral-100` | `color-neutral-400` | 1px `color-neutral-200` | Below-min-cart checkout, out-of-stock |

### Button Sizes

| Size | Height | Horizontal Padding | Font Token | Icon Size |
|------|--------|-------------------|------------|-----------|
| **Large** | 52px | 32px | `text-body-md`, weight 600 | 20px |
| **Medium** (default) | 44px | 24px | `text-body-md`, weight 600 | 18px |
| **Small** | 36px | 16px | `text-body-sm`, weight 600 | 16px |
| **Icon-only** | 44px × 44px | centered | — | 20px |

### Button Anatomy

- **Border radius:** `radius-md`
- **Gap** (icon + label): `spacing-2`
- **Focus ring:** 2px offset, 2px width, `color-brand-primary` at 50% opacity
- **Loading state:** Replace label with spinner; maintain button width to prevent layout shift
- **Full-width on mobile:** Primary CTAs on Cart, Checkout, and Product Detail use 100% width below 768px

### Button Labels (Commerce)

| Context | Label | Variant |
|---------|-------|---------|
| Product detail | "Add to Cart" | Primary, Large |
| Cart (valid) | "Proceed to Checkout" | Primary, Large |
| Cart (below ₹299) | "Proceed to Checkout" | Primary, Disabled + tooltip |
| Checkout | "Pay ₹{total}" | Primary, Large |
| Out of stock | "Out of Stock" | Primary, Disabled |
| Secondary nav | "Continue Shopping" | Secondary |

### Button Rules

1. **One primary button per viewport section**—never two competing primary CTAs in the same visible area.
2. **Destructive actions** require confirmation modal before execution (remove from cart is inline; account deletion is modal).
3. **Icon-only buttons** must include `aria-label` (e.g., "Open cart", "Close menu").

---

## Cards

Generic content cards for collections, features, testimonials, and informational blocks.

### Card Variants

| Variant | Background | Border | Shadow | Usage |
|---------|------------|--------|--------|-------|
| **Elevated** | `color-neutral-0` | none | `shadow-sm` → `shadow-md` on hover | Collection cards, feature highlights |
| **Outlined** | `color-neutral-0` | 1px `color-neutral-200` | none | FAQ items, order summary sidebar |
| **Filled** | `color-neutral-50` | none | none | Inline info blocks, cart threshold messaging |
| **Interactive** | `color-neutral-0` | 1px `color-neutral-200` | `shadow-sm` | Clickable cards with hover lift + border darken |

### Card Anatomy

| Element | Specification |
|---------|---------------|
| Padding | `spacing-4` (mobile), `spacing-6` (desktop) |
| Border radius | `radius-lg` (standard), `radius-2xl` (featured/marketing) |
| Image aspect ratio | 16:9 (collection), 1:1 (feature icon area) |
| Title | `text-heading-sm`, `color-neutral-900` |
| Description | `text-body-sm`, `color-neutral-500`, max 3 lines |
| Hover (interactive) | `shadow-md`, translate Y -2px, transition 200ms ease |
| Focus | 2px focus ring, `color-brand-primary` |

### Card Rules

1. Entire card is clickable for collection navigation; include visible focus state for keyboard users.
2. Do not nest interactive cards inside interactive cards.
3. **Cart threshold card** (₹299 / ₹599 messaging) uses **Filled** variant with `color-brand-primary-subtle` or `color-accent-saffron-subtle` background depending on state.

---

## Product Cards

Product cards are the highest-traffic component. They must showcase sticker art clearly while surfacing price and availability at a glance.

### Product Card Layout

```
┌─────────────────────────┐
│                         │
│      Product Image      │  ← 1:1 aspect ratio, radius-lg
│      (badge overlay)    │
│                         │
├─────────────────────────┤
│  Collection tag         │  ← text-overline, optional
│  Product Name           │  ← text-heading-sm, 2 lines max
│  ★★★★☆ (future)         │
│  ₹299  ₹399             │  ← price + compare-at
│  [Add to Cart]          │  ← Small primary button, optional on grid
└─────────────────────────┘
```

### Product Card Specifications

| Property | Value |
|----------|-------|
| Image aspect ratio | **1:1** (square; stickers are naturally square-friendly) |
| Image background | `color-neutral-50` |
| Image object fit | `contain` with 8% internal padding (prevents edge clipping) |
| Card padding | `spacing-3` (mobile), `spacing-4` (desktop) |
| Gap (image to content) | `spacing-3` |
| Border radius | `radius-lg` (card), `radius-md` (image) |
| Shadow | `shadow-sm`; `shadow-md` on hover |
| Min width (grid) | 160px (mobile 2-col), 220px (desktop) |

### Product Card States

| State | Visual Treatment |
|-------|------------------|
| **Default** | Full color image, price visible |
| **Hover (desktop)** | Shadow lift, optional quick "Add to Cart" reveal |
| **Out of stock** | Image at 60% opacity, "Sold Out" badge overlay, no add button |
| **On sale** | Compare-at price struck through (`color-neutral-400`), sale price in `color-accent-rose` or `color-neutral-900` |
| **New arrival** | "NEW" badge, `color-brand-primary` background, top-left overlay |

### Badges (Product Card Overlays)

| Badge | Background | Text |
|-------|------------|------|
| NEW | `color-brand-primary` | `color-neutral-0` |
| SALE | `color-accent-rose` | `color-neutral-0` |
| SOLD OUT | `color-neutral-700` at 90% opacity | `color-neutral-0` |
| LOW STOCK | `color-warning` | `color-neutral-900` |

Badge specs: `text-caption`, `radius-sm`, padding `spacing-1` × `spacing-2`, positioned top-left with `spacing-2` inset.

### Product Card Rules

1. **Product name** truncates at 2 lines; full name visible on product detail page.
2. **Quick add** on desktop hover is optional for v1; tap navigates to product detail on mobile.
3. **Wishlist icon** (if enabled) sits top-right on image, icon-only ghost button, 44px hit area.
4. Grid: **2 columns** (mobile), **3 columns** (tablet), **4 columns** (desktop wide).

---

## Forms

Forms power checkout, account creation, contact, and admin data entry. Clarity and error recovery are prioritized over decorative styling.

### Input Fields

| Property | Specification |
|----------|---------------|
| Height | 48px (default), 44px (compact/admin) |
| Padding | `spacing-3` horizontal, centered vertical |
| Background | `color-neutral-0` |
| Border | 1px `color-neutral-200` |
| Border radius | `radius-md` |
| Font | `text-body-md`, `font-body` |
| Placeholder | `color-neutral-300` |
| Text | `color-neutral-900` |

### Input States

| State | Border | Background | Other |
|-------|--------|------------|-------|
| Default | `color-neutral-200` | `color-neutral-0` | — |
| Hover | `color-neutral-300` | `color-neutral-0` | — |
| Focus | 2px `color-brand-primary` | `color-neutral-0` | Outline offset 0 (border replacement) |
| Error | 2px `color-error` | `color-error-subtle` | Error message below field |
| Disabled | `color-neutral-200` | `color-neutral-100` | Text `color-neutral-400` |
| Read-only | `color-neutral-200` | `color-neutral-50` | — |

### Labels & Helper Text

| Element | Token | Color |
|---------|-------|-------|
| Label | `text-body-sm`, weight 600 | `color-neutral-700` |
| Required indicator | asterisk | `color-error` |
| Helper text | `text-caption` | `color-neutral-400` |
| Error message | `text-caption` | `color-error` |

Label positioned **above** input with `spacing-2` gap. Error message `spacing-1` below input.

### Form Controls

| Control | Specification |
|---------|---------------|
| **Checkbox / Radio** | 20px × 20px, `radius-sm` (checkbox) / full (radio), accent `color-brand-primary` |
| **Select** | Same dimensions as input; chevron icon right-aligned |
| **Textarea** | Min height 120px, resize vertical only |
| **Quantity stepper** | Inline: ghost `-` | numeric input | ghost `+`; bordered container `radius-md` |
| **Pin code field** | Numeric input, max 6 digits, triggers shipping lookup on blur |

### Form Layout

| Context | Layout |
|---------|--------|
| Checkout (mobile) | Single column, full-width fields |
| Checkout (desktop) | Two-column for City/State, Pin/Phone; shipping left, summary right |
| Contact form | Single column, max-width `layout-max-width-narrow` |
| Admin | Compact density, two-column where logical |

### Form Rules

1. **Inline validation** on blur for format checks; on submit for completeness.
2. **Error summary** at top of checkout form if multiple errors on submit.
3. **Autofill** styling must not break border/focus design (override browser defaults).
4. **Phone input:** Indian format, 10-digit validation, optional `+91` prefix display.
5. **Password fields** include show/hide toggle (icon-only, `aria-label` "Show password").

---

## Navbar

The navbar is persistent, sticky, and optimized for thumb reach on mobile.

### Desktop Navbar (≥ 1024px)

```
┌──────────────────────────────────────────────────────────────────┐
│  [Logo]     Shop   Collections   About   FAQ        [🔍] [👤] [🛒 2] │
└──────────────────────────────────────────────────────────────────┘
```

| Property | Value |
|----------|-------|
| Height | 72px |
| Background | `color-neutral-0` |
| Border bottom | 1px `color-neutral-100` |
| Sticky shadow (scrolled) | `shadow-sm` |
| Logo height | 36px |
| Nav link font | `text-body-sm`, weight 500 |
| Nav link color | `color-neutral-600` → `color-brand-primary` (active/hover) |
| Icon buttons | 44px hit area, `color-neutral-700` |
| Cart badge | `color-brand-primary` circle, `text-caption` white text, top-right of cart icon |

### Mobile Navbar (< 1024px)

```
┌────────────────────────────────────┐
│  [☰]        [Logo]        [🛒 2]  │
└────────────────────────────────────┘
```

| Property | Value |
|----------|-------|
| Height | 56px |
| Menu trigger | Hamburger left, 44px touch target |
| Logo | Centered or left-aligned after menu icon |
| Cart | Right-aligned, always visible |
| Search / Account | Inside mobile menu drawer (not header bar) |

### Mobile Menu Drawer

- Slides from **left**, full height, width 85% max 320px
- Background `color-neutral-0`, shadow `shadow-xl`
- Nav links: `text-heading-sm`, `spacing-6` vertical padding per item
- Overlay: `color-neutral-900` at 40% opacity behind drawer
- Close via X button, overlay tap, or Escape key

### Navbar Rules

1. **Cart icon** always visible; badge shows item count (hide badge at 0).
2. **Active page** indicated by `color-brand-primary` text and optional 2px bottom border (desktop).
3. **Announcement bar** (optional, above navbar): `color-brand-secondary` background, `text-caption` white text, dismissible. Height 36px.
4. **Z-index:** Navbar `100`, mobile drawer `200`, modals `300`.

---

## Footer

The footer anchors trust, legal compliance, and brand storytelling.

### Footer Structure

```
┌─────────────────────────────────────────────────────────────────┐
│  [Logo + tagline]                                               │
│                                                                 │
│  Shop          Support        Company        Connect            │
│  All Products  FAQ            About          Instagram          │
│  Collections   Shipping       Contact        Pinterest          │
│                Returns        Privacy                           │
│                               Terms                             │
│                                                                 │
│  ─────────────────────────────────────────────────────────────  │
│  © 2026 चित्रSTICKS. All rights reserved.    [Payment icons]    │
└─────────────────────────────────────────────────────────────────┘
```

### Footer Specifications

| Property | Value |
|----------|-------|
| Background | `color-brand-secondary` |
| Text (headings) | `color-neutral-0`, `text-heading-sm` |
| Text (links) | `color-neutral-0` at 80%, `text-body-sm` |
| Link hover | `color-neutral-0` at 100%, underline |
| Padding top/bottom | `spacing-12` (mobile), `spacing-16` (desktop) |
| Column layout | 1 col (mobile), 2 col (tablet), 4 col (desktop) |
| Divider | 1px `color-neutral-0` at 15% opacity |
| Payment/trust icons | Monochrome white at 70% opacity, `spacing-4` gap |

### Newsletter Block (Optional in Footer)

- Input + Primary button inline on desktop; stacked on mobile
- Background: slightly lighter `color-brand-secondary-hover` inset panel, `radius-lg`, `spacing-6` padding

### Footer Rules

1. Legal links (Privacy, Terms, Returns) always present in footer on every page.
2. Footer is **not** sticky; it follows content naturally.
3. Admin pages use a minimal footer (copyright only) or no footer.

---

## Icons

Icons supplement labels—they never replace critical text on primary actions except universally understood symbols (cart, close, search).

### Icon System

| Property | Specification |
|----------|---------------|
| Library | **Lucide Icons** (consistent stroke style, open source) |
| Default stroke width | 1.75px |
| Style | Outlined only (no filled variants except rating stars, future) |
| Color (default) | `color-neutral-700` |
| Color (on dark) | `color-neutral-0` |
| Color (active/selected) | `color-brand-primary` |

### Icon Sizes

| Token | Size | Usage |
|-------|------|-------|
| `icon-sm` | 16px | Inline with `text-body-sm`, badges |
| `icon-md` | 20px | Buttons, navbar, form adornments |
| `icon-lg` | 24px | Feature highlights, empty states |
| `icon-xl` | 32px | Order confirmation, success/error pages |

### Core Icon Set

| Icon | Usage |
|------|-------|
| `shopping-bag` | Cart |
| `search` | Search trigger |
| `user` | Account |
| `menu` / `x` | Mobile nav open/close |
| `plus` / `minus` | Quantity stepper |
| `trash-2` | Remove from cart |
| `chevron-down` | Select dropdowns, accordions |
| `chevron-right` | Breadcrumbs, card navigation |
| `arrow-left` | Back navigation (checkout) |
| `check` | Success, checkbox |
| `alert-circle` | Error, warning |
| `truck` | Shipping, tracking |
| `gift` | Promotions, gift messaging |
| `heart` | Wishlist (optional) |
| `share-2` | Share product (future) |

### Icon Rules

1. Icons in buttons sit **left** of label with `spacing-2` gap (except icon-only buttons).
2. Decorative icons require `aria-hidden="true"`.
3. Functional icon-only buttons require `aria-label`.
4. **Payment method icons** (UPI, Visa, etc.) use official brand assets at 24px height in checkout/footer.

---

## Animations

Motion is subtle and purposeful—reinforcing feedback without delaying commerce tasks.

### Duration Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `duration-instant` | 0ms | Reduced motion fallback |
| `duration-fast` | 100ms | Button press, toggle |
| `duration-normal` | 200ms | Hover states, dropdowns, card lift |
| `duration-moderate` | 300ms | Drawer slide, cart panel |
| `duration-slow` | 500ms | Page hero fade-in, modal entrance |

### Easing Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `ease-default` | `cubic-bezier(0.4, 0, 0.2, 1)` | General transitions |
| `ease-in` | `cubic-bezier(0.4, 0, 1, 1)` | Exit animations |
| `ease-out` | `cubic-bezier(0, 0, 0.2, 1)` | Enter animations |
| `ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Add-to-cart bounce (micro-interaction) |

### Standard Animations

| Name | Properties | Duration | Easing | Usage |
|------|------------|----------|--------|-------|
| `fade-in` | opacity 0 → 1 | 200ms | ease-out | Modals, toasts |
| `slide-up` | translateY 8px → 0, opacity | 300ms | ease-out | Toast notifications |
| `slide-in-left` | translateX -100% → 0 | 300ms | ease-out | Mobile nav drawer |
| `scale-in` | scale 0.95 → 1, opacity | 200ms | ease-out | Modal content |
| `card-lift` | translateY 0 → -2px, shadow | 200ms | ease-default | Product/card hover |
| `cart-bounce` | scale 1 → 1.2 → 1 | 400ms | ease-spring | Cart icon on add (optional) |
| `progress-fill` | width transition | 400ms | ease-out | ₹299/₹599 progress bars |
| `skeleton-pulse` | opacity 0.5 ↔ 1 | 1.5s loop | ease-default | Loading placeholders |

### Toast Notifications

| Property | Value |
|----------|-------|
| Position | Bottom center (mobile), bottom right (desktop) |
| Background | `color-neutral-900` |
| Text | `color-neutral-0`, `text-body-sm` |
| Border radius | `radius-md` |
| Shadow | `shadow-lg` |
| Duration visible | 4 seconds, dismissible |
| Animation | `slide-up` enter, `fade-in` exit |

### Reduced Motion

When `prefers-reduced-motion: reduce` is detected:

- Disable `cart-bounce`, `card-lift` translate, and `skeleton-pulse`
- Replace slide animations with instant opacity change
- Progress bars update instantly without width animation

### Animation Rules

1. **Never animate** checkout form field values or price totals in a way that obscures the final amount.
2. **Loading states** use skeleton screens for product grids; spinner inside buttons for submit actions.
3. **Page transitions** between catalog and product detail: none (instant navigation) for v1; optional subtle fade in future.
4. **Maximum simultaneous animations** on one viewport: 2 (e.g., drawer + overlay).

---

## Mobile Responsiveness

Mobile is the primary design target. Desktop layouts are progressive enhancements.

### Breakpoints

| Token | Min Width | Target Devices |
|-------|-----------|----------------|
| `breakpoint-xs` | 0 | Small phones (320px+) |
| `breakpoint-sm` | 480px | Large phones |
| `breakpoint-md` | 768px | Tablets, small laptops |
| `breakpoint-lg` | 1024px | Desktop |
| `breakpoint-xl` | 1280px | Large desktop |
| `breakpoint-2xl` | 1440px | Wide monitors |

Design mobile-first: default styles apply to `breakpoint-xs`–`breakpoint-sm`; overrides added at `md`, `lg`, and above.

### Layout Patterns by Breakpoint

| Pattern | Mobile (< 768px) | Tablet (768–1023px) | Desktop (≥ 1024px) |
|---------|------------------|---------------------|---------------------|
| Product grid | 2 columns | 3 columns | 4 columns |
| Collection grid | 1 column | 2 columns | 3 columns |
| Navbar | Hamburger + logo + cart | Same or simplified links | Full horizontal nav |
| Cart | Single column, sticky bottom CTA | Single column | Two column (items + summary) |
| Checkout | Single column, summary collapsible | Single column | Two column (form + sticky summary) |
| Footer | Stacked sections | 2-column grid | 4-column grid |
| Hero | Full width, stacked text/image | Side-by-side optional | Side-by-side, max-width container |
| Typography scale | Mobile sizes (see Typography) | Intermediate where noted | Desktop sizes |

### Touch & Interaction (Mobile)

| Requirement | Specification |
|-------------|---------------|
| Minimum touch target | 44 × 44px |
| Tap highlight | Custom; suppress default `-webkit-tap-highlight-color` with brand-consistent feedback |
| Hover states | Disabled on touch devices; use `:active` press feedback instead |
| Sticky checkout CTA | Fixed bottom bar on Cart/Checkout mobile, `color-neutral-0` background, `shadow-md` top edge, safe-area padding |
| Scroll locking | Enable when mobile menu or cart drawer is open |
| Pull to refresh | Disabled (native browser behavior suppressed on cart/checkout) |

### Safe Areas

- Respect `env(safe-area-inset-*)` for notched devices on sticky navbar, bottom CTA bar, and toasts.
- Minimum bottom padding on fixed elements: `spacing-4` + safe area inset.

### Performance (Mobile)

| Requirement | Target |
|-------------|--------|
| Largest Contentful Paint | < 2.5s on 4G |
| Cumulative Layout Shift | < 0.1 |
| Product image loading | Lazy load below fold; priority load for hero and first row |
| Image sizes | Responsive srcset; max 800px width for product card images |
| Font loading | `font-display: swap` for all web fonts; subset weights used (400, 500, 600 only) |

### Responsive Content Rules

1. **Tables** (order history, admin): horizontal scroll wrapper on mobile or card-based layout conversion.
2. **Modals** on mobile become **bottom sheets** (slide up, 90% max height, `radius-xl` top corners).
3. **Product detail gallery:** single image swipe carousel on mobile; thumbnail strip on desktop.
4. **Truncation:** increase allowed lines on desktop (product description) vs mobile (collapse with "Read more").
5. **Announcement bar + navbar + sticky cart bar** must not collectively consume > 30% of mobile viewport height.

---

## Admin UI Notes

The admin interface shares foundational tokens (spacing, radius, typography body scale) but diverges intentionally:

| Aspect | Storefront | Admin |
|--------|------------|-------|
| Primary color | Terracotta (`color-brand-primary`) | Indigo (`color-brand-secondary`) for actions |
| Font display | Fraunces for marketing headings | DM Sans only (no display serif) |
| Density | Spacious, marketing-oriented | Compact, data-oriented |
| Shadows | Prominent on cards | Minimal; borders preferred |
| Border radius | `radius-lg` cards | `radius-sm` / `radius-md` |

Admin component specs will be expanded in a separate admin UI appendix when implementation begins.

---

## Appendix

### Design Token Export Checklist

When implementing, export tokens in this order:

1. Color palette (including semantic aliases)
2. Typography scale and font families
3. Spacing and layout constants
4. Radius, shadow, duration, easing
5. Component-level composite tokens (button heights, input heights, navbar height)

### Asset Requirements

| Asset | Format | Notes |
|-------|--------|-------|
| Logo (full) | SVG | Horizontal lockup: Devanagari + STICKS |
| Logo (mark) | SVG | Icon-only for favicon, mobile compact |
| Favicon | ICO / PNG | 32px, 180px apple-touch-icon |
| OG image template | PNG | 1200×630, brand colors + product collage |
| Payment badges | SVG | UPI, Visa, Mastercard, RuPay |

### Open Design Questions

1. Final logo asset and exact wordmark typography?
2. Photography style guide: lifestyle mockups vs flat product-on-neutral?
3. Illustration/motif usage in empty states and 404 page?
4. Custom icon set for sticker-specific categories, or Lucide-only for v1?

---

*Document owner: Design / Product Team · चित्रSTICKS*  
*Next review: Upon DATABASE.md schema definition and component implementation planning*
