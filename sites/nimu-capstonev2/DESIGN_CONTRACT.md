# Nimu Capstone — Design Contract

> **This folder is `sites/nimu-capstonev2`, the redesign shown beside the original for comparison.** The original, unmodified site stays in `sites/nimu-capstone` (`nimu-capstone.farhansegujja.com`); this redesign is served at `nimu-capstonev2.farhansegujja.com`. Every remaining redesign phase is built here, never in `sites/nimu-capstone`.
>
> **Promotion plan (after the client approves):** (1) copy this folder's contents over `sites/nimu-capstone/` (keep the folder name `nimu-capstone`); (2) delete `sites/nimu-capstonev2/`; (3) delete the `nimu-capstonev2.farhansegujja.com` line from `HOSTNAME_TO_SLUG` in `worker/index.js`; (4) remove the `nimu-capstonev2` DNS record in Cloudflare; (5) build and deploy. In the contract and progress records, read "`sites/nimu-capstonev2`" as the live `sites/nimu-capstone` after promotion.

> **Standing owner directive (section 18):** the site uses a rounded card system for cards, sections and CTAs, and horizontal rules are not allowed anywhere. This overrides every "square" statement below.

Status: Phase 2 (shared foundation) applied; see section 16. Baseline: `main` @ `c1041703e9e23b34b9757f18a221451b08c9d658`. Every value below was read from the local checkout on 2026-11-02, not taken from the earlier audit. Where this contract and the source disagree, the source is the baseline and the disagreement is listed under "Open questions".

This is a working contract for the "Bwaise Timber Ledger" redesign. It records what must be preserved and what may change. It is not a spec for new tokens; no new scale is invented here.

## 1. Purpose, audience, boundaries

**Purpose.** A five-page educational demonstration of an e-commerce presence for Nimu Timber & Woodworks, built for the MUBS BUC3106 E-Commerce Capstone (due 4 November 2026). Served at `nimu-capstonev2.farhansegujja.com`.

**Audience.** Primary: the BUC3106 assessors and classmates who read the site. Secondary: it must still make sense to a real visitor, a homeowner, carpenter or contractor in Kampala, on a phone.

**Demonstration-only boundaries (all must stay true after redesign).**
- No active checkout, cart, payment processing, form that collects data, or database.
- The banner "Student project for BUC3106 at MUBS · Payments and orders are not active · Read the data notice" appears above the header on every page.
- SAMPLE, Illustrative, "Proposed, not active" and "to be confirmed" labels are intentional coursework content. They are never removed or softened for visual reasons.
- No invented testimonials, statistics, awards, customers, prices or contact details. New copy may only reorganise what is already on the pages or in `COURSEWORK_GUIDE.md`.
- `sites/nimu-timber/` (the real business site) is out of scope and must not be touched.

## 2. Approved identity: "The Bwaise Timber Ledger"

- Authentic yard photography as the primary visual material (the 11 photos in `src/assets/`).
- Expressive Fraunces headings; precise, specification-style presentation of sizes, codes and prices.
- Restrained material colours (the existing palette in section 4).
- Different compositions for browsing, storytelling, instruction and reading.
- Avoid: faux-ledger decoration (ruled paper, stamps, fake book textures), glows, glassmorphism, animation as spectacle. Cards are rounded by owner directive (section 18); horizontal rules are never used. This is consistent with the repository's Anti–Vibe-Coded Quality Gate in `CLAUDE.md`.

### Page-specific compositions (direction, not yet designed)

| Page | Job | Composition direction |
|---|---|---|
| `index.html` Home | Orient and persuade | Photograph-led hero, then a short run of reasons, collections and the two customer types. Storytelling rhythm. |
| `products.html` Products | Browse and compare | Catalogue/specification layout where code, timber type, size and price scan quickly. Browsing rhythm. |
| `about.html` About | Explain who and why | Editorial, narrative layout. Storytelling rhythm. |
| `pay.html` Pay & Order | Instruct | Sequential, numbered, task-oriented layout. Instruction rhythm. |
| `policies.html` Policies | Be read | Long-form reading layout: measure, headings, anchors. Reading rhythm. |

Pages must not share one repeated section template. The five compositions above are the redesign's main structural goal.

## 3. Pages, routes, anchors (preservation contract)

Built as five flat root-level HTML entries (picked up automatically by `scripts/build-all.mjs`). No subfolders or extra pages; see section 12.

| Route | Anchors that must keep working |
|---|---|
| `/` (`index.html`) | `#top` (now `<body id="top">` on every page; the target of every same-page "Back to top" link), `#main`, `#reasons`, `#featured`, `#audience`, `#order` |
| `/products.html` | `#structural`, `#furniture`, `#bulk` (linked from Home featured cards) |
| `/about.html` | `#audience`, `#operations`, `#values`, `#next-step` |
| `/pay.html` | `#order-steps`, `#payment-methods`, `#compare`, `#verification`, `#delivery-refunds`, `#next-step` |
| `/policies.html` | `#delivery`, `#returns`, `#privacy` (linked from the banner on every page), `#terms`, `#communication` |

Also preserve: `#main` skip-link target on every page; `#menuToggle` and `#siteNav` IDs (used by `src/main.js` and `aria-controls`); `#year` (footer year, set by JS).

Cross-links that must still resolve: banner → `./policies.html#privacy`; Home featured cards → `./products.html#structural|#furniture|#bulk`; Home CTAs → `./pay.html`; Pay step 1 → `./products.html`; Pay refunds → `./policies.html#returns`; footer "Pages" list on every page.

## 4. Token inventory (verified in `src/style.css` `:root`)

```
--ink:#132319
--forest:#163625
--moss:#456048
--timber:#9a542d
--bark:#4a2b1b
--sand:#ede4d5
--paper:#f8f4eb
--line:#c9bba8
--muted:#59655a
--display:'Fraunces',Georgia,serif
--body:'DM Sans',Arial,sans-serif
--gutter:clamp(20px,5vw,80px)
```

All twelve values match the values supplied for verification. There are no other custom properties, no spacing/type/radius/shadow tokens.

### Colour roles (as used today)

| Role | Value |
|---|---|
| Page background / light text on dark | `--paper` |
| Primary text | `--ink` |
| Secondary text | `--muted` |
| Alternate light surface (cards, banded sections) | `--sand` |
| Hairlines and 1px grid gaps | `--line` |
| Primary accent: CTA fill, banner, codes, numerals, audience tags | `--timber` |
| Dark surfaces | `--forest` (page-hero, mobile nav, hero base), `--bark` (CTA band), `--moss` (catalogue note), `--ink` (hero/contact base) |

### Component-local literal colours (preserve)

- Primary button hover fill `#bc7043`
- Card hover surface `#f1e6d3`
- Footer: background `#0e1d14`; text `#ced7ce` (first rule, overridden) / `#d7dfd5` (effective); heading and link hover `#e1ae7b`; muted `#b8c7b8`; bottom row `#9fac9e`; social tile fill `#183222`, hover fill `#244330`; rules `rgba(215,223,213,.24)`; social border `rgba(215,223,213,.45)`
- Social icon tint: WhatsApp `#d7dfd5`, hover `#25d366`; TikTok via `filter: brightness(0) saturate(100%) invert(89%) sepia(12%) saturate(235%) hue-rotate(73deg) brightness(92%) contrast(91%)`
- Dark-surface body text: `#d8e1d7` (page-hero lead), `#ead7c3` (CTA band, material copy), `#e0e7df`, `#d9b28d`, `#e6b887`
- Status labels: SAMPLE `#f3dcb8` on `--bark`; Illustrative `#d8e1d7` on `--forest`; warning note `#f3dcb8` on `--bark`
- Focus ring `#edc294` (variant `#e6b887` for WhatsApp/social/footer-social)
- Hero scrim: `linear-gradient(90deg,rgba(8,25,15,.95),rgba(13,34,21,.77) 48%,rgba(11,26,17,.25)),linear-gradient(0deg,rgba(6,20,12,.55),transparent 42%)`
- Contact scrim (unused, see section 14): `linear-gradient(90deg,rgba(10,26,16,.94),rgba(10,26,16,.7) 55%,rgba(10,26,16,.27))`
- Banner link/outline alphas: `rgba(248,244,235,.72)`, `rgba(255,255,255,.45)`, `rgba(255,255,255,.75)`, `rgba(248,244,235,.42)`, `rgba(248,244,235,.5)`, `rgba(248,244,235,.12)`, `rgba(248,244,235,.15)`, `rgba(248,244,235,.05)`
- Timber-grain stripes (unused on the five pages): `#bd7849 #a55d31 #d09a6d` and `#573018 #774425 #9b6841`
- Services hover tint `rgba(154,84,45,.06)`

### Image filters (preserve per use)

| Use | Filter |
|---|---|
| Hero image | `grayscale(1) contrast(1.04)` |
| Featured card image | `grayscale(.6) sepia(.15) contrast(1.05)` |
| Product card image | `grayscale(.55) sepia(.12) contrast(1.05)` |
| Other (unused-page) images | `grayscale(.72) sepia(.16) contrast(1.04–1.05)`, `grayscale(.7) sepia(.18–.22) contrast(1.05–1.08)`, `grayscale(.55) sepia(.1) contrast(1.04)`, `grayscale(1) sepia(.25) contrast(1.08)`, `grayscale(1) contrast(1.08)` |

Photos are deliberately desaturated. Any redesign that restores full colour is a decision for the owner, not a default.

## 5. Typography

Fonts load from Google Fonts on every page: `DM Sans` opsz 9..40 weights 400/600/700 and `Fraunces` opsz 9..144 weights 500/600, `display=swap`. Fallbacks `Georgia, serif` and `Arial, sans-serif`. Weights outside these (e.g. Fraunces 700, italics) are not loaded.

| Role | Rule |
|---|---|
| Body | `--body`, line-height 1.6 |
| h1, h2 | `--display`, 600, letter-spacing `-.055em`, line-height `.98` |
| h3 (reason, featured, audience, product, step, payment-method) | No `font-family` or weight set, so they render in **DM Sans bold** (browser default 700; DM Sans 700 is loaded). Only the unused `.services-list h3` sets `--display`. Fraunces is currently used for h1, h2, brand name, numerals, footer label and product-type only. |
| Hero h1 | `clamp(3.4rem,8vw,7.5rem)`; mobile ≤520px `clamp(3rem,15vw,4.5rem)` |
| Page-hero h1 | `clamp(2.6rem,6vw,4.6rem)`, max-width 820px |
| Hero lead | `clamp(1rem,1.5vw,1.18rem)`, max 58ch |
| Page-hero lead | `1.05rem`, max 65ch, `#d8e1d7` |
| Section intro paragraph | `1.1rem`, max 55ch, `--muted` |
| Section h2 (intro) | `clamp(2.7rem,5.5vw,5.9rem)` (applies only where wrapped in the listed selectors; see section 14) |
| CTA band h2 | `clamp(2.2rem,4vw,3.2rem)` |
| Policy h2 | `clamp(1.8rem,3vw,2.4rem)` |
| Component h3 sizes | reason `1.3rem`, featured `1.4rem`, audience `1.5rem`, product `1.3rem`, step `1.15rem`, payment method `1.3rem` |
| Numerals | reason number `600 1rem/1 Fraunces`, step number `600 1.6rem/1 Fraunces` |
| Eyebrow-scale labels | `.64rem` uppercase `.14em` (captions), `.66rem` `.14em` (footer heading), `.72rem` `.1em` (product code), `.74rem` `.1em` (audience tag), `.62rem` `.15em` (brand sub-line) |
| Nav / buttons | nav `.82rem`/600; button `.83rem`/700; footer `.88rem`; footer bottom `.72rem`; banner `.74rem`/600 |
| Status badge | `.68rem`/700, `.04em`, uppercase |
| Product meta | `.86rem`; product-type-label `.82rem`/600; product-status `.78rem` |
| Brand | strong `Fraunces 1.15rem`; small `.62rem` |
| Text wrapping | `overflow-wrap:anywhere` on h1–h3, p, a |

Existing measures: 55ch (intro), 58ch (hero), 65ch (leads, lists, steps, notes), 70ch (policy item).

## 6. Spacing and layout

Spacing is untokenised; these are the values in use.

- **Gutter:** `--gutter: clamp(20px,5vw,80px)`.
- **Container:** `.shell { width:min(1200px,calc(100% - var(--gutter) * 2)); margin-inline:auto }`.
- **Section rhythm:** `.section { padding-block:clamp(76px,10vw,144px) }`. Page-hero: top `calc(88px + clamp(48px,8vw,96px))`, bottom `clamp(48px,6vw,80px)`.
- **Header:** absolutely positioned over the first section; inner min-height 88px (78px ≤520px); gap 24px; nav gap `clamp(18px,2.6vw,36px)`.
- **Hero:** min-height `100svh` (fallback 780px; 720px ≤520px), padding-top 130px, padding-bottom `clamp(80px,10vw,130px)`.
- **Grids:** 1px-gap sand grids on `--line` (reasons-grid, three columns, margin-top 50px); featured grid three columns gap `clamp(18px,2.5vw,30px)`; audience grid two columns gap `clamp(18px,3vw,36px)`; product grid `repeat(auto-fit,minmax(260px,1fr))` gap `clamp(20px,2.5vw,30px)`; steps grid `repeat(auto-fit,minmax(220px,1fr))` gap `clamp(18px,2.5vw,26px)`; about grid two columns gap `clamp(34px,11vw,170px)`.
- **Card padding:** reason `clamp(26px,3vw,38px)`; audience `clamp(28px,4vw,42px)`; product body 22px; step 22px; warning 16px 18px; button `14px 18px`; nav CTA `10px 14px`; banner `10px var(--gutter)`; badge `2px 8px`.
- **Image heights:** featured 220px, product 190px (`object-fit:cover`).
- **Footer:** top padding `clamp(46px,7vw,82px) 0 clamp(36px,5vw,58px)`; links padding `clamp(38px,6vw,66px) 0`; link grid `1fr 1fr 1.25fr`; social tile 44×44px.

## 7. Geometry

- **Superseded by section 18:** cards, sections and CTAs are rounded using the radius tokens. (Baseline was square.)
- Documented exceptions in the baseline source: `.status-badge` has `border-radius:999px` (pill); header logo and footer logo are circular (`border-radius:50%`).
- Borders are 1px `--line` (light surfaces) or 1px translucent paper/white (dark surfaces).
- **No shadows exist** and no shadow scale is to be invented. Horizontal rules are not used (section 18).
- Brand mark: `logo-128.webp` rendered 48px (42px ≤520px) in the header and 64px in the footer, `object-position:50% 30%`.

## 8. Shared conventions

**Banner.** `.coursework-banner`, first element in `body` on every page, `--timber` fill, centred, with a link to `./policies.html#privacy`.

**Header and navigation (Phase 2).** In-flow `--forest` header, not sticky; collapses at 960px, with `html.js` gating the toggle so the nav still works without JavaScript. Order: Home, Products, About, How to Pay & Order, Policies, then the WhatsApp CTA ("Enquire on WhatsApp", with prefilled message). The current page is a non-link `<span class="nav-current" aria-current="page">`; other pages are links. Mobile (≤960px): hamburger `#menuToggle` (44×44px) toggles `#siteNav` via `.is-open`; closes on link click and on Escape (focus returns to the toggle). Header text is paper on the dark hero/page-hero.

**Footer (Phase 2).** Identical on all five pages except `aria-current`: brand and "BUC3106 coursework demonstration", Find us (Bwaise Industrial Area, Mambule Road), Pages list, Contact (visible labels "WhatsApp" and "TikTok @wood.timber", both `target="_blank" rel="noopener"`), copyright with `#year`, the coursework disclosure line, and a same-page "Back to top" link to `#top`.

**Links.** Inherit colour; underline offsets 3–5px; nav links underline on hover; active page underlined. Focus ring (Phase 2): `2px solid var(--focus)`, offset 4px. `--focus` is an alias: `--forest` on light surfaces, `#edc294` on dark surfaces. The earlier `#edc294` ring was below 3:1 on paper and sand.

**Status labels.** `.status-badge--sample` (SAMPLE, "to be confirmed", "Proposed, not active") and `.status-badge--illustrative` (Illustrative). Meaning is carried by the word, not only colour.

**Images.** Photos in `src/assets/` imported by path in HTML and hashed by Vite. Alt text is descriptive on content images and empty on decorative ones (logos, icons). Below-fold images use `loading="lazy" decoding="async"`; hero uses `fetchpriority="high"` with a 720px `<source>` for ≤720px. Intrinsic `width`/`height` are set.

## 9. Responsive rules

- Breakpoints in use: 960px (nav collapse; decided in Phase 2 from measured nav width, not a token change), 800px (single-column about/features, footer 2-col) and 520px (header/hero/credentials/footer adjustments). Do not add arbitrary new breakpoints without need.
- No horizontal scroll at any width; `body` has `overflow-x:clip`.
- Test widths required by repo policy: narrow mobile (≈320–360px), normal mobile (≈390px), tablet (≈768px), laptop (≈1280px), wide (≥1600px).
- Tap targets ≥44px for icon controls (existing: toggle, social tiles).

## 10. Accessibility rules

- Skip link to `#main` on every page; one `<h1>` per page; ordered headings.
- Keep `aria-current="page"`, `aria-expanded`/`aria-controls` on the menu toggle, and keyboard close via Escape.
- Visible focus on all links and buttons; never remove outlines without replacement.
- Contrast: audit text/background pairs when touched. Baseline contrast was **not measured in Phase 1**; no compliance claim is made.
- Information must not rely on colour alone (badges contain words).
- External links keep `rel="noopener"`.

## 11. CSS-only motion and performance rules

**Motion (existing inventory).** `hero-arrival` keyframes (opacity + 16px rise, .7s) on `.hero-content`; hover lifts (`translateY(-2px/-3px)`) on buttons and cards; hover transitions `.2s`–`.35s`; mobile nav toggling; smooth scrolling on `html`. Hover effects sit inside `(hover:hover) and (pointer:fine)`. `prefers-reduced-motion: reduce` disables listed transitions and animation and sets `scroll-behavior:auto`.

Rules going forward: CSS only; motion for feedback or hierarchy only, not spectacle; no animation on page load beyond a single restrained entrance; every new animated selector must be added to the reduced-motion block; no layout shift from animation; no scroll-jacking, parallax or auto-playing media.

**Performance.**
- Build output is static HTML plus one CSS and one JS bundle (`main-*.css`, `main-*.js`) and hashed images.
- Keep images optimised (existing WebP, 30–207 KB each), with `width`/`height` and lazy loading below the fold. No new libraries, no web fonts beyond the two already loaded.
- Fonts are an external dependency on `fonts.googleapis.com`; fallbacks must stay acceptable.
- No client-side frameworks; JS stays limited to the menu toggle, the (currently unused) accordion, and the footer year.

## 12. Source and infrastructure boundaries

**May change (later phases):** files inside `sites/nimu-capstonev2/` — the five HTML files, `src/style.css`, `src/main.js`, `src/assets/`, and `COURSEWORK_GUIDE.md` if documentation needs to track changes.

**Must not change without explicit permission:**
- Any other `sites/<slug>/`, especially `sites/nimu-timber/` and the other launched participant sites.
- `dist/` (generated, gitignored).
- `worker/index.js`, `wrangler.jsonc`, `vite.config.base.mjs`, `scripts/*`, `package.json`, `package-lock.json`, DNS.
- No new dependencies, no React, no backend, no database, no build-tool changes. `base:'/'` stays.
- No secondary HTML pages or subfolders beyond the five flat root files (Cloudflare `auto-trailing-slash` conflicts with the Worker's prefix rewrite).
- No push, merge, deploy, or commit without the owner's instruction.

**Repository conventions (from `CLAUDE.md`).** Source stays human-readable (one declaration/statement per line, not minified). **No comments in HTML, CSS or JS source.** No AI attribution in commit messages or PR descriptions. Anti–Vibe-Coded Quality Gate and release audit apply at the end.

## 13. Content that must be preserved

**Required disclosures.**
1. Banner on every page (text in section 1).
2. `pay.html` hero: "This is a student project for BUC3106 at MUBS. Payments and orders are not active." (bold) plus "No form here collects real customer data or triggers a real purchase."
3. `pay.html` payment methods intro: every sample account, number and reference is fictitious.
4. Card payment: "Proposed, not active" badge and the statement that no gateway is connected and no card details should be entered.
5. `pay.html` verification warning: never trust a payment screenshot alone.
6. `policies.html` hero: examples only, no claim of adoption, no legal compliance review.
7. Privacy notice (`#privacy`) with the Data Protection and Privacy Act, 2019 reference and the "not independently reviewed or certified" statement.
8. Terms and returns paragraphs retain their "educational/illustrative example" wording.
9. `about.html`: "15 years" and "Seroma Ltd." keep their "to be confirmed" badges; `.about-caveat` stays.
10. Products page: every SAMPLE badge and per-entry `product-status` line stays; the "How to update this catalogue" note stays unless the owner approves removal.
11. Footer: "BUC3106 coursework demonstration" and the "Student project for BUC3106 at MUBS" copyright line.

**Products — eight entries (UGX, all SAMPLE unless noted).**

| Code | Name | Collection | Size / quantity | Price | Image |
|---|---|---|---|---|---|
| NTW-101 | Musambya Structural Plank | Structural | Length 7 ft (≈82–83 in); width/thickness SAMPLE | UGX 45,000 per plank | timber-yard-720 |
| NTW-102 | Kalitunsi Structural Plank | Structural | 7 ft plank, standard width | UGX 52,000 per plank | yard-work-480 |
| NTW-103 | Musambya Roofing Timber | Structural | bundle of 10 pieces | UGX 380,000 per bundle | logs-800 |
| NTW-201 | Musambya Furniture-Grade Board | Furniture | board, standard width | UGX 58,000 per board | warehouse-timber-480 |
| NTW-202 | Kalitunsi Workshop Board | Furniture | board, standard width | UGX 61,000 per board | upright-timber-640 |
| NTW-203 | Custom Cut-to-Size Service | Furniture | Quantity: per customer request | UGX 5,000 per cut | covered-timber-480 |
| NTW-301 | Bulk Musambya Timber Bundle | Bulk | bundle of 50 planks | UGX 2,100,000 per bundle | timber-market-608 |
| NTW-302 | Bulk Kalitunsi Bundle with Delivery | Bulk | bundle of 50 planks | UGX 2,450,000 per bundle, delivery included | delivery-truck-512 |

Each entry has: code, name, timber type label, one-sentence description, size/quantity row, price row, status line. The 7 ft Musambya length is the only carried-over (non-sample) dimension.

**Payment methods on `pay.html` (all Illustrative unless noted).** MTN Mobile Money (sample 6-digit merchant code `000 111`); Airtel Money (sample 6-digit merchant code `000 222`); Bank transfer for business customers (account name "Nimu Timber & Woodworks (Demo)", number `0000 1234 5678`, "Demo Commercial Bank"); Cash on delivery; Card payment (Proposed, not active). Five order steps and three delivery/confirmation steps also stay.

**Carried-over real facts (needing owner confirmation, per `COURSEWORK_GUIDE.md`).** Name and address (Bwaise Industrial Area, Mambule Road); WhatsApp `+256 790 320 976` (appears in header CTA and footer on every page); TikTok `@wood.timber`; Musambya and Kalitunsi; warehouse drying in a few days; cut-to-size; bulk and delivery.

## 14. Baseline observations that affect later phases

These are verified facts about the current source, not decisions.

- `.eyebrow` and `.section-grid` classes are used in HTML (eyebrows on every hero; `.section-grid` on Home/About) but have **no CSS rules**. Eyebrows currently render as plain paragraphs.
- The `.section-intro h2` size rule also lists `.stockyard-copy`, `.services`, `.material`, `.about`, `.questions`, `.contact` selectors. Most of the stylesheet (timber-pieces, services, material, questions/FAQ accordion, contact, credentials grid hover effects, `.hero-caption`, `.timber-portrait`, `.delivery-row`) comes from the real `nimu-timber` site and styles markup that does not exist on the five pages. `.credentials` and `.about-grid` are the only inherited blocks still used.
- `.site-footer` is defined twice; the second definition wins.
- `.reasons-grid`, `.featured-grid`, `.audience-grid` and `.steps-list` have no hover treatments, while inherited `.timber-piece`, `.credentials p` do.
- The stylesheet and `main.js` contain comments, and `index.html` contains one comment; this conflicts with the repo's no-comments rule (pre-existing).
- `src/assets/timber-market-400.webp` is not referenced anywhere. `logo-128.webp` (3.8 KB) is inlined by Vite; the two SVG icons are referenced from CSS/HTML.
- `docs/design-ledger.md`, which `CLAUDE.md` says to compare against before building, does not exist in the repo.
- Header is `position:absolute` over the first section; the mobile menu panel uses `--forest` with a translucent paper border.

## 15. Open factual questions and uncertainty rules

**Open questions for the owner/group (do not guess in source):**
1. Are "15 years of experience" and "Seroma Ltd." true? (Both remain flagged.)
2. Real prices, widths and thicknesses, bundle sizes. (All remain SAMPLE.)
3. Business opening hours (`policies.html#delivery` says "during business hours" without stating them).
4. Is the `wa.me` number and the TikTok handle approved for public use on this coursework copy?
5. May the unused inherited CSS be deleted in Phase 2? (Recommended, but it changes ~half the stylesheet.)
6. h3s render in DM Sans bold, not Fraunces. Is moving card/step/product titles to Fraunces 500/600 (already loaded) acceptable, given "expressive existing Fraunces headings"?
7. Is the SAMPLE-badge pill and the circular logo an accepted exception to "square geometry"?
8. Should the existing source comments be stripped to comply with `CLAUDE.md`, or kept for coursework readability?
9. The absent `docs/design-ledger.md` — create it, or treat this contract as the comparison record?

**Rules for uncertainty.**
- Never fill a factual gap with a plausible value. Keep the SAMPLE/"to be confirmed" label and list the question here.
- Never add a claim, price, metric, name or contact detail that is not already in the source or `COURSEWORK_GUIDE.md`.
- If a design need conflicts with a preservation rule, stop and record the conflict in `REDESIGN_PROGRESS.md` instead of resolving it silently.
- If a value is not verified against source, label it "unverified" in the record, not as fact.
- Verification claims must name exactly what was run and what was observed.

## 16. Phase 2 clarifications (approved conventions, not new tokens)

- Button hover: the primary button hovers to `--bark` text on `--paper` (the old `#bc7043` pairing was 3.46:1). Nav CTA hover remains `--forest` on `--paper`.
- h3 headings use Fraunces 600 (approved from Q6). Badge text is `.74rem`; banner is `.82rem`/600.
- Shared primitives defined, awaiting page use: `.eyebrow`, `.measure`, `.text-link`, `.photo`, `.spec-list`, `.section--sand`, `.section--forest`.
- Sections 4 to 9 describe the pre-Phase-2 baseline values. Where Phase 2 changed one (header positioning, footer, focus colour, the 960px breakpoint, removal of inherited unused rules and comments, and the items above), this section and the Phase 2 log in `REDESIGN_PROGRESS.md` take precedence. The section 14 observations about unused CSS, the duplicate `.site-footer`, missing `.eyebrow` rules and source comments are resolved.
- Open questions 5 to 9 were resolved with the defaults. Questions 1 to 4 (factual) remain open.

## 17. Phase 3 clarifications (Home)

- Home composition: shortened hero (`min-height: clamp(440px, 62svh, 620px)`, no phone minimum, content aligned to the shell), a 7/5 collections grid with text below photographs, ruled editorial rows on a sand surface, two linked buyer choices, and a compact bark WhatsApp strip. Home anchors `#top`, `#main`, `#featured`, `#reasons`, `#audience`, `#order` are preserved.
- New classes: `.hero-actions`, `.home-head`, `.collections`, `.collection` (`--lead`, `--support`), `.collection-spec`, `.collection-cue`, `.ledger`, `.ledger-row`, `.ledger-label`, `.choices`, `.choice`, `.home-close`, `.button-outline`, `.section--tight`. No new colour, font, size, radius or shadow values were introduced; `.home-head h2` reuses `clamp(2.2rem,4vw,3.2rem)`, collection and choice titles reuse existing h3 sizes.
- Removed (Home-only, replaced): `.reasons-grid`, `.reason-*`, `.featured-*`, `.cta-band*`. `.audience-grid`, `.audience-card`, `.audience-tag`, `.section-intro` and `.section-grid` remain because About uses them.
- Home photographs use the existing product-card filter `grayscale(.55) sepia(.12) contrast(1.05)`; hover and keyboard focus lighten it to `grayscale(.3)`.
- Hero copy and headline are approved for Home only: "Timber for your next build." with the supporting sentence in `index.html`; no new factual claims were added.
- Reference screenshots live in `redesign-reference/` (not part of the build).

## 18. Rounded card system (owner directive, standing rule for every phase)

The owner directed that the whole website adopt a rounded card design covering **cards, sections and CTAs**, and that **horizontal rules are not allowed anywhere**. This supersedes every earlier "square geometry" statement in this contract (sections 2, 7, 15 Q7 and the "Cards and buttons are square" baseline note). Every later phase must follow it; a page composition that needs square corners or a rule line must be raised with the owner first.

### Radius tokens (in `:root` of `src/style.css`)

| Token | Value | Used for |
|---|---|---|
| `--radius-xs` | 6px | inline code chips |
| `--radius-sm` | 10px | buttons, nav CTA, in-card CTA chips, spec rows, skip link, inset blocks inside cards |
| `--radius-md` | 16px | cards, panels, ledger rows, payment methods, warning note, mobile menu panel, footer bottom bar, framed images |
| `--radius-lg` | 24px | section surfaces, hero and page-hero bottom corners, footer top corners |
| `--section-inset` | `clamp(8px,1.5vw,20px)` | horizontal inset of tinted section surfaces |

Kept as before: status badges stay pills (`999px`), logos stay circular (`50%`). Radii are deliberately restrained (maximum 24px); do not enlarge them, and do not add shadows, glows or glass effects. `CLAUDE.md` warns against "oversized rounded cards" and "every block in a card"; this directive is the owner's explicit choice, so keep radii at these tokens and still use plain typography and whitespace where a card adds nothing.

### Rules

1. **Cards.** Any grouped content is a rounded card: a 1px `--line` border, `--radius-md`, a surface from the existing palette (`--sand` on paper sections, `--paper` on sand sections), and inner padding. Cards that hold images use `overflow: hidden` so the image takes the card's corners.
2. **Sections.** Tinted sections (`--sand`, `--bark`, `--moss`, `--forest`) are inset rounded surfaces (`margin-inline: var(--section-inset)`, `--radius-lg`). Hero and page-hero are flush under the header with rounded bottom corners; the footer is flush at the bottom with rounded top corners. Untinted sections sit on the paper page.
3. **CTAs.** Buttons use `--radius-sm`. A card's destination cue is a rounded CTA chip (`.collection-cue`: paper chip, forest fill with paper text on hover and focus), not an underlined link or a rule.
4. **No horizontal rules.** No `<hr>`, no `border-top`/`border-bottom` dividers, no 1px-gap grids that simulate lines, no list separators. Separate things with spacing, tinted rounded blocks or separate cards. Full 1px card outlines are allowed. Text underlines on links and the 1px hamburger icon strokes are not rules.
5. **Content is never left hanging.** Every group of text, image or data sits inside a card, a tinted block or a section surface with intentional padding.
6. **Focus and motion.** Focus outlines follow the radius. Hover and focus changes stay CSS-only (border colour, chip fill, image filter, 4px arrow shift) and are disabled under reduced motion.
7. **Contrast.** New pairings must come from the existing palette; check them before use (chip hover is `--paper` on `--forest`, 12.04:1).

### Where it is already applied (Phase 3 revision)

All five pages: banner-adjacent hero and page-hero corners, header-to-page flow, footer and its rounded bottom bar, Home collection cards, ledger rows, buyer-choice cards and closing strip; Products cards and spec blocks; About credentials and audience cards; Pay step cards, payment-method cards and warning note; sand and moss section surfaces. Pages not yet recomposed (Products, About, Pay, Policies) carry the system through shared CSS only and will be recomposed in their own phases under these same rules.

Unused primitives updated to the system: `.spec-list` rows are tinted rounded rows (no rules); `.photo img` is `--radius-md`.

## 19. Navbar (owner directive, floating rounded bar)

- The header is a floating rounded bar, not a full-bleed strip: `--forest` surface, `--radius-lg`, inset by `--section-inset` on all sides, 72px tall (64px at 520px and below), sitting on the paper page under the banner. Hero and page-hero are now inset rounded surfaces (`--radius-lg` on all corners, `--section-inset` margins) rather than flush under the header.
- Desktop (961px and wider): a three-column grid. Logo at the left, the five page links exactly centred between the logo and the CTA (measured centre offset 0 at every width from 961 to 1600px), and the "Enquire on WhatsApp" CTA at the right. `.site-nav` uses `display: contents` so the links and CTA are grid items of `.header-inner`.
- Links are rounded `--radius-sm` pills (10px 14px padding). The current page is a filled `--timber` pill with `--paper` text and `aria-current="page"` (5.20:1); hover is `rgba(248,244,235,.12)`. No underlines or rules.
- At 960px and below the links and CTA move into a rounded `--radius-md` disclosure panel opened by the 44px toggle (panel sits 8px below the bar); the CTA is a full-width outlined chip at the bottom. Without JavaScript the nav is shown as a wrapping list under the logo.
- Markup: `<nav class="site-nav">` contains `<div class="nav-links">` (the five links) followed by `<a class="nav-cta">`. Identical on all five pages except which item is the current-page span.

## 20. Section panels

- `.section--panel` is an outlined paper section surface (`--paper`, 1px `--line` border, `--radius-lg`, inset by `--section-inset`) used where an untinted section needs to read as its own block. Home's `#featured` and `#audience` use it, giving Home a stack of distinct surfaces: hero, outlined collections panel, sand ledger panel, outlined buyer panel, bark closing strip, footer.
- `main > * + *` adds `--section-inset` of vertical space between consecutive sections so inset surfaces never touch.

## 21. Products page (Phase 4)

**Comparison structure.** An indexed sample catalogue. A compact masthead ("Find your timber.") states once that SAMPLE details are illustrative and that photographs show the yard, not the exact item. Three outlined or tinted section surfaces follow, one per collection, reached from three outline-button anchors in the masthead (`#structural`, `#furniture`, `#bulk`). There is no search or filter system.

**Unit anatomy (every entry, `.product-card` with `id="ntw-###"`).** Yard photograph with caption "Yard photograph, not this exact item"; code; h3 title; timber-type line; one-sentence use description; `<dl class="spec-list">` (tinted rounded rows, label above or beside value, SAMPLE badge immediately before the value it qualifies); the existing qualification line; a rounded "See how to order" link to `pay.html#order-steps`. Only that link and the masthead chips give hover and focus feedback; cards do not lift or change cursor.

**Layout.**
- Structural: three equal units from 960px, one column below. The three units keep the same two spec rows (Size, Price) so they compare directly.
- Furniture: the two boards sit side by side from 700px; the cut-to-size service (NTW-203) is a full-width horizontal feature (photo left, details right) that stacks on narrow screens.
- Bulk: two equal broad units from 700px; each adds a "Supply" row (pickup from the yard / delivery to the customer's site, both taken from the existing descriptions).
- Spec labels stack above values below 960px and on phones; values are left-aligned and never clamped.
- The old on-page "How to update this catalogue" note was replaced by a bark "next step" panel with a link to the ordering guide. Maintenance guidance lives only in `COURSEWORK_GUIDE.md`.

**Preserved.** All eight codes, illustrative prices, quantities, status lines, images and the 17 SAMPLE badges (compared before and after by script). Home links to `#structural`, `#furniture`, `#bulk` still land on the section tops.

**Displayed additions that are not new facts.** The two captions and links above; the "Supply" rows (from existing description text); and an explicit note on NTW-101 that the 7 ft and 82–83 in figures do not match exactly so the exact length is to be confirmed. No new measurement, price or stock claim was added.

**Open factual question (new).** The business-stated length is shown as "7 ft (approx. 82–83 in)". 7 ft is 84 in, so the two figures differ by 1 to 2 in. Whether 7 ft is a nominal length and 82–83 in the actual cut length, or the reverse, is unconfirmed. Do not "fix" the figures; ask the owner.

**Classes added:** `.catalogue-nav`, `.catalogue-head`, `.product-grid` (`--two`, `--three`), `.product-card` (`--feature`), `.product-figure`, `.spec-note`, `.unit-link`, `.next-step`. `.spec-list` is now used. Removed: `.product-meta`, `.catalogue-note`, `.product-catalogue--alt`. The Phase 4 brief mentioned "square geometry"; the standing rounded system (section 18) was applied instead.

## 22. About page (Phase 5)

**Narrative.** "From the Bwaise yard." A documentary portrait of the supplier built only from copy and claims already on the site or in `COURSEWORK_GUIDE.md`. No timeline, team, customer logos, partnerships, testimonials, awards or statistics were added.

**Sections.**
1. Split opening on the forest page-hero surface: copy in 5 columns, landscape yard photograph in 7 (`timber-yard-1080.webp`, 1080px native, shown about 690px wide). DOM order is copy then photo, so stacking on narrow screens follows reading order with no CSS reordering.
2. Operations spread (`#operations`, sand surface): three photograph-and-text rows (the timber, storage and cutting, bulk and delivery) using `logs-800`, `warehouse-timber-480` and `delivery-truck-512`, each with a visible caption. Framed as "as the business describes its own operations; none of this is independently certified".
3. Customers (`#audience`, outlined panel): two compact columns (B2C and B2B) with plain links to the ordering steps and payment methods; no card-per-column.
4. Values (`#values`, moss surface): three typographic statements, no boxes, labelled as the business's own words and unverified.
5. Closing next-step panel: primary "Browse timber" button to `products.html`, secondary "How ordering works" link to `pay.html`.

**Unconfirmed claims.** "15 years of experience" and "Seroma Ltd." no longer have a headline or credential treatment. They appear once, inside the values section's small note, worded as "Not presented as proof", with a "to be confirmed" badge, and the verification task stays in `COURSEWORK_GUIDE.md`. Phrases such as "business says" and "as the business describes" qualify the drying, durability and pricing statements.

**Added to the system.** `.about-opening` (with `.about-opening-grid`, `.about-figure`, `.about-opening-note`), `.ops` / `.ops-row` / `.ops-figure` / `.ops-copy`, `.customers` / `.customer`, `.about-values` / `.values-row` / `.value` / `.values-note`, `.next-step-actions`. `.about-values` is a moss section surface (`--moss` with `--paper` text, 6.1:1) using the same inset and rounded rules as other surfaces. Removed as unused: `.section-intro`, `.audience-grid`, `.audience-card`, `.credentials`, `.about-grid`, `.about-body`, `.values-list`, `.about-caveat`. `.audience-tag` remains (Home and About use it). The Phase 5 brief mentioned "square geometry"; the standing rounded system (section 18) was applied.

## 23. Pay & Order page (Phase 6)

**Reading model.** An order sheet, not a landing page. One hypothetical process with two clearly separated routes: **prepaid** (Mobile Money, bank transfer: funds verified before the order is prepared or released) and **cash on delivery** (agreed before dispatch, paid to the driver and recorded on a signed delivery note at handover). The page never states that all delivery requires prior receipt of funds.

**Sections.**
1. Compact masthead on the forest surface: "A sample order, start to finish." with the bold disclosure "This is a student project for BUC3106 at MUBS. Payments and orders are not active." plus "no form here collects real customer data" and "every number, account and reference is fictitious"; three outline buttons to `#order-steps`, `#payment-methods`, `#delivery-refunds`.
2. `#compare` (outlined panel): individual and business columns as tinted spec rows (typical order, enquiry, payment, timber). Existing distinctions only; no deposits, credit terms or payment requirements.
3. `#order-steps` (sand): one vertical `<ol role="list">` of five steps with CSS-counter numerals, paired on desktop (7/5) with a non-interactive reference list ("Reference list, not a form") of product code, timber type, required size, quantity and collection or delivery. DOM order is steps then list, so narrow screens stack naturally. The list uses plain tinted rows with no checkbox, input or form control and states that the page stores nothing.
4. `#payment-methods` (outlined): four structured method rows (MTN Mobile Money, Airtel Money, bank transfer for business customers, cash on delivery), each with an Illustrative badge, a route label ("Prepaid" or "Pay on delivery") and its three numbered instructions; every sample identifier is visibly fictitious and kept exactly. Card payment is a separate paper block with the "Proposed, not active" badge.
5. `#verification` (sand): two columns, prepaid (with the screenshot warning directly beside the verification rule) and cash on delivery.
6. `#delivery-refunds` (outlined): three-part handover (order confirmed, timber prepared, delivered or collected), the refund statement and a link to `policies.html#returns`.
7. Closing next-step panel linking to `products.html`.

**No live behaviour.** The page has no form, input, button, copy-to-pay control, script or storage. Classes added: `.compare`, `.process`, `.order-steps-list`, `.order-step`, `.checklist`, `.methods`, `.method`, `.method-head`, `.method-type`, `.method-steps`, `.method-proposed`, `.verify-grid`, `.verify-col`, `.handover`, `.refund-note`. Removed: `.steps-list`, `.step-card`, `.step-number`, `.payment-method*`. The Phase 6 brief mentioned "square geometry"; the standing rounded system (section 18) was applied.

**Wording changes that resolve the old contradictions** (the only copy changes beyond layout): step 4 and 5 now distinguish prepaid from cash on delivery; the verification text applies "not prepared or released until the money is visible" to prepaid routes only; the first handover step no longer says "Once payment is verified" for every order. No fee, deposit, deadline or requirement was added.

**New open owner questions.** (a) Does cash on delivery need any prior agreement beyond confirming the total and address, such as a deposit or an order-size limit? None is stated, so none is shown. (b) Is paying in person at the yard accepted? An earlier version of the Home copy mentioned it; the current pages do not, so it is omitted.

## 24. Concise copy and icon system (owner directive, Pay page first)

The owner found the Pay page too verbose and not premium. Standing rules for every page:
- **Copy budget.** Prefer a heading plus one short sentence per item. Remove section lead paragraphs that restate the heading. The Pay page main content went from 981 to 540 words (about 45% fewer). Required disclosures, fictitious identifiers, status labels, the screenshot warning and policy links are exempt from cutting and stay verbatim in meaning.
- **Icons.** One inline-SVG set, defined once per page as a hidden `<svg class="icon-sprite">` of `<symbol id="i-name">` and used with `<svg class="icon"><use href="#i-name"></use></svg>`. Style: 24px grid, 1.6px stroke, round caps, `currentColor`, no fill, no emoji. Icons sit in forest `.icon-tile` squares (44px, `--radius-sm`, paper glyph; `.icon-tile--sm` 32px with `--radius-xs`). Step tiles carry a timber number badge (the one allowed pill) from a CSS counter. Icons are decorative (`aria-hidden`); meaning stays in the text.
- **Logos.** Brand marks are shown only as payment-method identifiers: the existing WhatsApp logo (`src/assets/whatsapp.svg`) in the "Send an enquiry" tile, and the MTN and Airtel logos on the Pay page (section 29). Bank and cash methods use neutral icons.
- **Pay page icons in use:** list, wallet, truck (masthead links); user, building (compare); box, WhatsApp, tag, wallet, shield (steps); hash, log, ruler, stack, pin (reference list); phone, bank, cash, card (methods); shield, cash, alert (verification); check, box, truck, refund (handover).

## 25. Concise copy and icons applied to Home, Products and About

The section 24 rules (copy budget, inline icon set, forest icon tiles, WhatsApp as the only brand mark) now apply to Home, Products and About as well as Pay. Main-content word counts (script count, before to after): Home 308 to 180 (41% fewer), Products 628 to 373 (40%), About 382 to 220 (42%), Pay 981 to 540 (45%). Policies is not built yet and must follow the same rules in Phase 7.

- **Home:** shorter hero line, a one-line collections lead, one-sentence collection and ledger copy, icon tiles on collection cards (log, ruler, truck), ledger rows (box, ruler, stack) and buyer choices (user, building).
- **Products:** every entry keeps its code, name, timber type, description, spec rows, SAMPLE badges, qualification line and order link; descriptions and qualification lines are shortened, the caption is "Yard photo", the masthead states that timber types are business-confirmed and SAMPLE details are illustrative, and spec labels carry small icons (ruler, tag, stack, truck). All 8 codes, all 8 price strings and all 8 images are unchanged. The 7 ft versus 82–83 in note remains (shortened to "differ, so the exact length is to be confirmed"). Footer note: the SAMPLE badge count fell from 17 to 16 only because the next-step panel no longer contains one; all 15 entry badges remain.
- **About:** icon tiles on the operations rows, customer headers and values; the unconfirmed claims remain in a single note ("Not proof ... Neither is verified" with the "to be confirmed" badge).
- **Per-page sprite:** each page carries the same hidden icon sprite (static pages, no shared include); keep the symbol list identical when adding icons.

## 26. Image ratios and the nimu-timber overhaul

- **Image ratio rule (owner directive).** Photographs sit in balanced fixed ratios: 4:3 landscape, 4:5 portrait or 1:1. Do not stretch images into oblong strips or slivers; set `aspect-ratio` with `height:auto` (the HTML `height` attribute otherwise overrides the ratio) and let `object-fit: cover` crop. Full-bleed hero photography is the only wide placement. The `nimu-timber` page follows this rule. The v2 pages still use some wide card crops (product card photos, the About opening and operations rows, the Home hero) and have not been re-audited against it.
- **`sites/nimu-timber` overhaul.** The live one-page business site was rebuilt in this design system at the owner's explicit request (it is otherwise protected): same single `index.html`, same section anchors (`#top`, `#timber`, `#services`, `#about`, `#questions`, `#contact`), same copy, links, WhatsApp messages, images and alt text. New: floating rounded navbar with centred links, rounded inset hero, section surfaces (outlined paper, sand, forest, moss, ink), icon tiles (log, ruler, stack, truck, check, building), rounded FAQ accordion, split contact panel with a 4:5 photo, and the v2 footer with a rounded bottom bar. Removed: the decorative wood-grain stripes, the vertical hero caption "NIMU / TIMBER SUPPLY", ruled service list and hairline dividers. Additions are labels only (section eyebrows, "See our timber", screen-reader "(opens in a new tab)"). The site has its own stylesheet; nothing is shared with v2.

## 27. Policies page (Phase 7)

**Reading model.** An indexed document, no photography and no motion. Compact masthead ("Policies", eyebrow "Policies for this demonstration") carrying the qualification: "Coursework examples for BUC3106, not policies adopted by the business. No legal compliance review has been carried out." Below it, one outlined panel holds a contents rail (about 280px) and a reading column (760px), centred with a 51px gutter at 1280px; paragraphs are about 690px wide (70ch cap).

**Structure.** Five always-open sections keep their exact IDs: `#delivery`, `#returns`, `#privacy`, `#terms`, `#communication`. Each is a rounded card with an icon tile, an h2 (headings run h1 then h2), a status label, a one-line lead, the policy paragraphs and a visible qualifier note. There are no accordions, tabs or carousels. The contents rail is a plain `<ol>` of anchors that works without JavaScript; on desktop it is sticky (top 20px, capped to the viewport height, 331px tall, no overlap because the header is not sticky); at 800px and below it is static and sits above the text.

**Content preservation.** Every sentence of the original five policies is retained verbatim (21 sentences checked by script, apart from paragraph grouping). Added, not replacing: a one-line lead per policy that paraphrases the policy beneath it, status labels (Illustrative; Hypothetical for privacy), the qualifier text moved into a note under each policy (original wording), and for privacy one verifiable statement: "In fact, this demo's pages contain no forms and collect no customer information. What follows is hypothetical." The masthead lead keeps the original qualifications ("not adopted" and "no legal compliance review"). The communication policy had no original qualifier, so it carries only the Illustrative label.

**Not added.** No statements about hosting, logging, analytics, third-party requests (for example web fonts), retention or compliance. No consent system.

**Print.** `@media print` hides the banner, header, footer, contents rail, closing panel and icon tiles, removes surfaces and colours, and keeps the heading, lead and all five policies in full with the status labels outlined and sections kept together.

**Classes added:** `.policy-layout`, `.policy-toc`, `.policy-doc`, `.policy-item`, `.policy-head`, `.policy-badge`, `.policy-lead`, `.policy-actual`, `.policy-note`. The old plain `.policy-item` rules were replaced. The Phase 7 brief mentioned "square geometry" and "no motion"; the rounded system (section 18) was applied and no motion was added. The standing 40% copy budget was not applied to the policy text itself, which is exempt (obligations stay verbatim); total page words went from 486 to 557 because of the contents list, leads, labels and notes.

**New open owner questions.** (a) The site loads fonts from Google Fonts and is served by Cloudflare Workers, so visitor requests do reach third parties; should the privacy notice say so? It was left unstated because the brief forbids inventing hosting facts. (b) Should the communication policy carry a specific qualifier like the others?

## 28. Responsive and interaction conventions (Phase 8)

**Breakpoints in use (layout decisions, not visual tokens).** 960px (navigation collapse and policy/product three-column switch), 800px (most two-column layouts stack), 700px (two-up product and bulk grids), 600px (horizontal product cards, see below), 560px (About operations rows stack), 520px (phone adjustments). These dimensions are not tokens; the frozen tokens (colours, fonts, type sizes, radii, spacing values) were not changed in Phase 8.

**Layout-only changes made in Phase 8.**
- Product photographs use `aspect-ratio: 4 / 3` instead of fixed heights (previously 180 to 220px, which became 3.7:1 strips at tablet width). At 600 to 959px single-column product cards become horizontal cards (photo about 42% wide beside the text, DOM order unchanged).
- Home collection photographs (supporting cards, and the lead card once stacked at 800px and below) use 4:3.
- About: the opening photo is 4:3 once stacked; the operations rows stay two-column down to 560px (previously stacked at 800px, leaving 3.3:1 strips) and use 4:3 photos below that.
- Standalone `.text-link` is a 44px-tall target (was about 26px).
- Image rule restated: no placed image (outside the full-bleed hero) should render wider than about 1.8:1 or narrower than about 0.6:1.

**Interaction vocabulary.** Feedback exists only on real actions: link underline thickness, a 4px arrow shift, a fill or colour swap on buttons and chips, and contained image emphasis (filter lightening inside the card). Durations are the existing 0.2s and 0.3s with specific-property transitions. Visual hover effects live in one `@media (hover:hover) and (pointer:fine)` block, so touch devices never get stuck hover states; every one of them has a `:focus-visible` equivalent outside that block so keyboard users get the same feedback. Hover never carries information. Essential content is visible without JavaScript (the hero entrance animation ends fully visible; navigation shows as a wrapping list). Under `prefers-reduced-motion: reduce` all animation and transitions are off and smooth scrolling is off. Not used: scroll-driven effects, loaders, parallax, cursor effects or repeated reveals.

**Known and left unchanged.** Labels (eyebrows, badges, captions, codes) are 0.74rem (11.8px), marginally under 12px; this is a frozen type value and was recorded, not changed. A local anchor target can land at -1px because of sub-pixel margin rounding on Pay; harmless.

## 29. Payment logos and merchant codes (owner directive)

- **Logos.** With the owner's permission, two SVG files were downloaded from Wikimedia Commons: "MTN 2022 logo.svg" (850 bytes) and "Airtel Africa logo.svg" (4,759 bytes). The unmodified originals are kept in `src/assets/logos/` (`mtn-2022-logo.svg`, `airtel-africa-logo.svg`) for provenance. They are community-uploaded copies, not files from MTN's or Airtel's own brand portals, and both names and marks belong to their owners; they are used only to identify the payment method named beside them, not to suggest endorsement. The files were inspected before use (plain paths only; no scripts, images or external references).
- **Brand tokens.** The marks are recoloured to our tokens: inlined as `<symbol id="i-logo-mtn">` and `<symbol id="i-logo-airtel">` in the Pay page's icon sprite with `fill="currentColor"`, so they render paper on the forest `.icon-tile` like every other icon. The Airtel original is a single red (`#f21016`) in both paths and the MTN original is a single path, so recolouring loses no multi-colour detail; the original brand colours are not used anywhere.
- **Tile size.** Method rows use 56px tiles (28px icons, 42x21 MTN mark, 34x34 Airtel mark) so logos and the bank and cash icons align. Contract note: the logos are decorative (`aria-hidden`); the method name beside them carries the meaning.
- **Merchant codes.** Mobile Money merchant codes are 6 digits, so the sample identifiers changed from the earlier 10-digit numbers: MTN `000 111`, Airtel `000 222` (obviously sample values, so they cannot be mistaken for a real merchant). The wording is "Sample merchant code ...". The code and its label are kept together on one line (non-breaking space; `.no-wrap`) from 360px up; below 360px the label may wrap but the code never splits.
- **Open question for the owner.** The instructions still say "Choose Send Money" in the MTN and Airtel menus. Merchant payments may use a different menu option (for example a merchant or pay-merchant item). The page does not invent menu names; confirm the real wording before relying on it.
