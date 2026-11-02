# Nimu Capstone — Redesign Progress

> **This folder is `sites/nimu-capstonev2`, the redesign shown beside the original for comparison.** The original, unmodified site stays in `sites/nimu-capstone` (`nimu-capstone.farhansegujja.com`); this redesign is served at `nimu-capstonev2.farhansegujja.com`. Every remaining redesign phase is built here, never in `sites/nimu-capstone`.
>
> **Promotion plan (after the client approves):** (1) copy this folder's contents over `sites/nimu-capstone/` (keep the folder name `nimu-capstone`); (2) delete `sites/nimu-capstonev2/`; (3) delete the `nimu-capstonev2.farhansegujja.com` line from `HOSTNAME_TO_SLUG` in `worker/index.js`; (4) remove the `nimu-capstonev2` DNS record in Cloudflare; (5) build and deploy. In the contract and progress records, read "`sites/nimu-capstonev2`" as the live `sites/nimu-capstone` after promotion.

Companion to `DESIGN_CONTRACT.md`. Updated at the end of every phase.

## Baseline

| Item | Value |
|---|---|
| Date | 2026-11-02 |
| Base branch | `main` (tracking `origin/main`, up to date at time of inspection) |
| Base commit | `c1041703e9e23b34b9757f18a221451b08c9d658` — "Test commit to verify git integration" |
| Working tree at start | Clean (`git status --short` returned nothing). No pre-existing user changes. |
| Redesign branch | `redesign/nimu-capstone-ledger`, created locally from `main`. Not pushed; no remote branch created; GitHub not contacted. |
| Instruction files | `CLAUDE.md` present and applied. No `AGENTS.md`. `docs/` does not exist, so `docs/design-ledger.md` (referenced by `CLAUDE.md`) is absent. |
| Stack verified | Static HTML, one shared `src/style.css` (27,768 B), `src/main.js` (1,836 B), Vite 6 per-site build via `scripts/build-all.mjs`, Cloudflare Worker (`worker/index.js`) with hostname allowlist. Node v24.11.1. No React, no framework. Playwright is a devDependency (unused by the build). |
| Worker mapping | `'nimu-capstone.farhansegujja.com': 'nimu-capstone'` present in `HOSTNAME_TO_SLUG`. |

### Baseline build

Command: `npm run build` (existing `node_modules` and lockfile; nothing installed or added).

Result: **passed**. `[build-all] done — built 6 site(s): c23, modestmuse, nimu-capstone, nimu-timber, nutking, wrist-mode`. No errors or failures reported. `nimu-capstone` emitted five HTML files, one CSS bundle (`main-*.css`), one JS bundle (`main-*.js`) and ten hashed images in `dist/nimu-capstonev2/` (the `dist/` folder is gitignored; `git status` was still clean after the build).

Not run in Phase 1: `wrangler dev`/preview, browser smoke test, link check, contrast measurement, responsive screenshots, Lighthouse. Their baseline is therefore **unmeasured**, not "passing".

## Roadmap (nine phases)

The brief asked for a nine-phase roadmap without naming phases. This is a proposal; reorder or rename as needed.

| # | Phase | Status |
|---|---|---|
| 1 | Baseline, preservation contract, handoff records | **Complete** |
| 2 | Shared visual foundation: in-flow header, navigation, footer, focus/hover states, shared primitives, dead CSS removal | **Complete** (see Phase 2 log) |
| 3 | Home composition (product-led introduction) | **Complete, approved by owner** (see Phase 3 log) |
| 4 | Products composition (indexed sample catalogue, eight entries) | **Complete, approved by owner** (see Phase 4 log) |
| 5 | About composition (documentary portrait) | **Complete, approved by owner** (see Phase 5 log) |
| 6 | Pay & Order composition (order sheet, instruction-led) | **Complete, approved by owner** (see Phase 6 log) |
| 7 | Policies composition (indexed document, print-ready) | **Complete, approved by owner** (see Phase 7 log) |
| 8 | Cross-page pass: responsive (five widths), accessibility, CSS motion, image/performance, reduced motion | Not started |
| 9 | Final audit against `CLAUDE.md` quality gate, preservation checklist, build + Worker preview, `COURSEWORK_GUIDE.md` update, handoff | Not started |

## Phase 1 log

### Files changed

Added (only these two):
- `sites/nimu-capstonev2/DESIGN_CONTRACT.md`
- `sites/nimu-capstonev2/REDESIGN_PROGRESS.md`

Modified: none. No HTML, CSS, JS, asset, config or Worker file was touched.

Git state change: new local branch `redesign/nimu-capstone-ledger` (switching from a clean tree). Nothing committed, nothing staged.

### Decisions

1. Created a local redesign branch because the tree was clean and switching could not affect any changes.
2. Treated source as the authority; all token values were re-read from `src/style.css`. All twelve supplied `:root` values match exactly.
3. Preserved SAMPLE/Illustrative/"to be confirmed" content as required coursework material.
4. Recorded, rather than fixed, every inconsistency found (section 14 of the contract).
5. Did not add a `docs/design-ledger.md`; the brief limited this phase to two records.
6. The earlier audit file `Impeccable_audit.md` is gitignored and not present in the checkout, so the audit was not re-read. Its claims were checked against source instead.

### Verification evidence

- `git status --short --branch` at start: clean on `main`; after branch creation: clean on `redesign/nimu-capstone-ledger`.
- `npm run build`: passed, 6 sites (output above).
- Read in full: `style.css`, `main.js`, `index.html`, `products.html`; main content of `about.html`, `pay.html`, `policies.html`; `worker/index.js`, `scripts/build-all.mjs`, `vite.config.base.mjs`, `package.json`, `COURSEWORK_GUIDE.md`.
- Grep confirmed: `.eyebrow` and `.section-grid` have no CSS rule; h3s have no font-family; `timber-market-400.webp` is unreferenced; `index.html` holds one HTML comment.
- Source-unchanged check: see the final status line at the bottom of this file.

### Unresolved issues

Factual (owner input needed): "15 years" and "Seroma Ltd." claims; real prices/widths/thicknesses; business hours; approval of WhatsApp number and TikTok handle for public use.

Design/engineering (decisions needed before or during Phase 2):
- About half of `style.css` styles markup that does not exist on the five pages (inherited from `nimu-timber`). Delete in Phase 2?
- `.eyebrow` and `.section-grid` are used but unstyled.
- h3s render in DM Sans bold rather than Fraunces.
- `.site-footer` defined twice.
- Pill-shaped status badges and circular logos vs. "square" geometry.
- `CLAUDE.md` forbids source comments; the current source has them.
- `docs/design-ledger.md` is missing.
- Unused `timber-market-400.webp`.
- Contrast, responsive and accessibility baselines were not measured.
- Fonts depend on Google Fonts; no self-hosted fallback.

Environmental: none. Build ran cleanly with the existing install.

## Prerequisites for Phase 2

1. Owner's answers (or explicit "proceed with default") for the nine open questions in contract section 15, in particular: delete inherited unused CSS (Q5), h3 font (Q6), comment stripping (Q8).
2. Confirm the nine-phase roadmap above, or supply the intended one.
3. Confirm Phase 2 stays on `redesign/nimu-capstone-ledger` and that commits are wanted only on explicit instruction (commits must carry no AI co-author trailer, per `CLAUDE.md`).
4. Confirm whether to capture a pre-change visual/behavioural baseline first (Playwright or browser screenshots at 360, 390, 768, 1280 and 1600px of all five pages, plus a link/anchor check), since none exists yet.
5. `git status` is clean on the redesign branch at the start of Phase 2 apart from these two records.

---
Final state check (Phase 1): `git status --short --branch` shows branch `redesign/nimu-capstone-ledger` with only the two untracked files above; `git diff` and `git diff --cached` are empty, so no tracked file (including all application source) changed.

## Phase 2 log — shared visual foundation

The owner answered the Phase 1 open questions with "go with everything", i.e. the defaults in contract section 15 were adopted (inherited CSS deleted, h3 in Fraunces, source comments stripped, pill badges and round logos accepted, contract used in place of `docs/design-ledger.md`, nine-phase roadmap confirmed, data left as SAMPLE / to be confirmed).

### Files changed

- `index.html`, `products.html`, `about.html`, `pay.html`, `policies.html`: shared head script, `<body id="top">`, skip link moved first, rebuilt banner/header/footer. Page `<main>` content untouched. `index.html` lost its HTML comment and the hero lost `id="top"` (the anchor now lives on `<body>`).
- `src/style.css`: rewritten (27.8 KB source down to about 16 KB; built CSS 16.7 KB).
- `src/main.js`: menu logic tightened; unused FAQ accordion removed; comments removed.
- `DESIGN_CONTRACT.md`, `REDESIGN_PROGRESS.md`: updated.
- Not touched: other sites, `worker/`, `scripts/`, `package*.json`, assets, `COURSEWORK_GUIDE.md`.

### Shared conventions established

- **Header:** in-flow, solid `--forest`, 88px (78px at 520px and below), 1px `rgba(248,244,235,.42)` bottom rule. Not sticky, so there are no content jumps and no obscured anchors. Hero and page-hero no longer reserve space for an overlaid header.
- **Navigation:** collapses at **960px** (previously 800px). Measured at 1280px: brand 177px plus links 497px plus gaps needs about 790px of shell width, so the old 800px breakpoint collided between roughly 800 and 900px. At 961px the measured gap between brand and nav is 53px. Other layout breakpoints (800px, 520px) are unchanged.
- **Mobile menu:** simple disclosure. Collapsed menu is `display:none`, so its links are not focusable. `aria-expanded`/`aria-controls`, Escape-to-close with focus return, close on link click, and close when the viewport grows past 960px.
- **No JavaScript:** a head script adds `js` to `<html>`. Without it, the toggle is hidden and the nav is a wrapping list under the brand.
- **Current page:** `<span class="nav-current" aria-current="page">` in the header; `aria-current="page"` link in the footer.
- **Focus:** `--focus` custom property (an alias, not a new colour). Default `--forest` on light surfaces; `#edc294` on dark surfaces (banner, header, hero, page-hero, CTA band, catalogue note, footer, `.section--forest`). One rule: `2px solid var(--focus)`, offset 4px.
- **Buttons/links:** primary button hover is now `--bark` text on `--paper` (was paper on `#bc7043`, 3.46:1). Underline thickness grows on link hover. Nav CTA hover unchanged (forest on paper). Icons inherit text colour; the green WhatsApp hover and rotating icon effects were removed. Buttons have a 44px minimum height.
- **Banner:** now `.82rem`/600 (was `.74rem`), placed after the skip link.
- **Footer:** brand and location block, labelled page list, labelled contact list ("WhatsApp", "TikTok @wood.timber", both with a visually hidden "opens in a new tab"), disclosure line in the bottom row, real "Back to top" link to `#top`. No newsletter, no new business information.
- **Headings:** h3 now Fraunces 600, line-height 1.15 (one rule, no letter-spacing change). Status badge text raised from `.68rem` to `.74rem`; product code from `.72rem` to `.74rem`.
- **Primitives available, not yet used by any page:** `.eyebrow` (styled for the first time; rust on light, `#e1ae7b` on dark), `.measure`, `.text-link`, `.photo` plus caption, `.spec-list`, `.section--sand`, `.section--forest`. Phase 3 onward should use or delete them.

### Removed

Inherited, unreferenced styling from the real site (services, material, FAQ, contact, timber pieces, hero caption, hover lifts on non-link cards, duplicate `.site-footer`), the `.footer-social` tiles, and every comment in HTML, CSS and JS. Remaining class selectors were written from the classes used in the five pages. `.section-grid` remains an unstyled hook in the HTML (markup unchanged).

### Verification evidence

Dev server: `npm run dev -- nimu-capstonev2 --port 5174` (verified in `scripts/dev.mjs`), inspected in the in-app browser, then stopped.

- **Nav transition:** at 1280px and 961px the brand and nav do not collide (gap 53px at 961px). No horizontal overflow (`scrollWidth` equals the viewport at 390 and 320px). At 960px the toggle appears and the nav is hidden.
- **Mobile menu (390px):** toggle is 44x44px; closed menu has 0 visible links; open shows 6 items; Escape closes it and focus returns to the toggle; reopening works; panel sits within the gutters. Screenshot confirmed layout.
- **No-JS fallback:** removing the `js` class at 390px showed the full nav wrapping under the brand with no toggle; screenshot confirmed.
- **Resize closure:** calling the resize handler at 1000px with the menu open closes it (`aria-expanded` goes `true` to `false`). The browser tool's viewport emulation does not fire native resize events, so the real-resize path is unverified.
- **Keyboard:** first Tab stop is the skip link (forest ring); after the banner link and brand, the nav links take a light `#edc294` ring.
- **All five pages (fetched and parsed):** one `<h1>`, no duplicate ids, banner present, `body#top` present, Back to top is `#top`, exactly one `aria-current` in header and one in footer, every internal link and fragment resolves, external links have `rel="noopener"`.
- **Back to top:** with smooth scrolling disabled the click moved `scrollY` from 3794 to 0. With smooth scrolling on, the hidden/emulated pane did not animate, so the animated case was not observed.
- **Banner:** wraps to three lines at 320px and stays readable (screenshot).
- **Contrast (computed from token values, not measured on rendered pixels):** forest on paper 12.04, forest on sand 10.49, `#edc294` on forest 8.02, on bark 7.71, on footer 10.58, on moss 4.22, on the timber banner 3.46 (all above the 3:1 needed for focus indicators); primary button text 5.20; new hover (bark on paper) 11.58; old hover 3.46.
- **Build:** `npm run build` from the repository root passed for all 6 sites; `grep` found no comments left in the five HTML files, `style.css` or `main.js`.
- **Tree:** only the seven source files above and the two records show in `git status`. Nothing committed or staged.

### Limitations and unresolved issues

- Visual inspection covered Home (desktop, 320 and 390px), Pay (desktop, mobile menu, footer, no-JS) and Products (keyboard). Products, About and Policies were verified structurally, not screenshot-reviewed at every width. Tablet (768px) and wide (1600px) were not inspected.
- `wrangler dev` / Worker routing was not exercised, so the `#top` change is untested through the Worker.
- Animated smooth scroll and native resize events could not be observed in the tool.
- Hero height (`clamp(560px, 100svh - 150px, 820px)`) changed because the header is now in flow; seen only at 1280px, 390px and 320px wide.
- h3 weight 600 and the badge/code size adjustments change page bodies slightly; every card and step title should be reviewed in its own phase.
- `.eyebrow` is now visible on every hero and page-hero; the owner may want to review it.
- The `.status-badge` pill and circular logos were kept as accepted exceptions.
- Factual open questions from Phase 1 (15 years / Seroma Ltd., prices, hours, contact approval) are unchanged.
- Pre-existing: fonts load from Google Fonts with no self-hosted fallback; `timber-market-400.webp` is unreferenced.

### Prerequisites for Phase 3 (Home composition)

1. Review this foundation in a browser (suggested: all five pages at 390, 768 and 1280px) and flag any visual drift.
2. Decide the fate of the unused primitives (keep for Phases 3 to 7, or delete).
3. Decide whether Home's hero keeps its viewport-based height or takes a fixed composition.
4. Confirm which Home sections to retain (`#reasons`, `#featured`, `#audience`, `#order` anchors must survive) and whether the unstyled `.section-grid` hook can be replaced.
5. Say whether to commit Phase 2 first (nothing is committed; no AI co-author trailer per `CLAUDE.md`).
6. Optional: run `npm run preview` to check Worker routing before page work stacks up.

## Phase 3 log — Home composition

### Files changed

- `index.html`: `<main>` content replaced. Header, footer, banner and head untouched.
- `src/style.css`: homepage components added; hero retuned; index-only rules removed.
- `redesign-reference/`: three new full-page reference screenshots (see below).
- `REDESIGN_PROGRESS.md`, `DESIGN_CONTRACT.md`: updated.
- Not touched: other pages, shared header/footer markup, `main.js`, assets, other sites, `worker/`, `scripts/`, dependencies. No shared defect was found, so no shared correction was made.

### Composition

1. **Opening.** Same warehouse photo (`timber-yard-1080.webp`, 1080x701; `timber-yard-720.webp` on phones), same grayscale filter and scrim. Hero is shorter: `min-height: clamp(440px, 62svh, 620px)` instead of `clamp(560px, 100svh - 150px, 820px)`. Hero content now aligns to the shell's left edge, in line with the sections below. H1 scale unchanged (`clamp(3.4rem,8vw,7.5rem)`; phone rule unchanged); headline is "Timber for your next build." with `text-wrap: balance` and no forced breaks.
2. **Copy.** "Musambya and Kalitunsi timber for construction, roofing and furniture. This demo shows how an order, payment and delivery could work." Location stays in the eyebrow. No new claims.
3. **Actions.** Primary button "Browse timber" to `products.html`; secondary text link "How ordering works" to `pay.html`.
4. **Collections (`#featured`).** Directly after the opening. Two-column grid, 7fr / 5fr. Structural & Roofing Timber is the dominant panel (landscape crop of `logs-800.webp`, 800x1067); Furniture & Workshop (`warehouse-timber-480.webp`, 480x360) and Bulk & Contractor (`delivery-truck-512.webp`, 512x683, cropped to landscape) stack in the right column. Text sits below each photo on the paper surface, never over it. Each panel has a spec line (code range and entry count taken from `products.html`), name, one-line description and an arrow cue; the whole panel links to `#structural`, `#furniture` or `#bulk`.
5. **Editorial rows (`#reasons`, sand surface).** Storage, Cutting and Quantities as three ruled rows (label, Fraunces title, description) replacing the three equal boxes. Copy is the existing copy. No decorative numbering.
6. **Buyer choice (`#audience`).** Two linked choices: individuals to `pay.html#order-steps`, businesses to `pay.html#payment-methods`.
7. **Closing strip (`#order`).** A single compact bark band with a question and an outline "Ask on WhatsApp" button (existing number and prefilled message). It replaces the large CTA band and flows into the footer.

### Responsive derivation

- Above 800px: 7/5 collections grid, ledger rows in three columns, two choices side by side.
- 521 to 800px: lead collection full width, supporting pair side by side, ledger and choices stack.
- 520px and below: single column in reading order (lead, furniture, bulk).
- The inherited 720px phone hero minimum was removed (`min-height: 0`); the hero is sized by its content. At 390x844 the primary button's bottom edge is at 594px, so it is discoverable without scrolling.

### Image notes

All images are shown at or below their native width, so none is upscaled on a standard-density display; the 800px, 480px and 512px photos will look soft on high-density screens. Sources are low resolution; better originals would help (open question for the owner).

### Motion

CSS only. Hover and keyboard focus on a collection or choice lightens the photo filter (`grayscale(.55)` to `grayscale(.3)`) and shifts the arrow 4px; focus has parity with hover. Under `prefers-reduced-motion: reduce`, transitions are disabled (state still changes, instantly) and the hero entrance animation is off. Everything is visible by default.

### Verification evidence

Tools: Playwright (an existing devDependency, headless Chromium) against `npm run dev -- nimu-capstonev2 --port 5174`, plus the in-app browser earlier. The dev server was stopped afterwards.

- **Renders inspected:** full-page desktop (1280px) and phone (390px) screenshots read in full; tablet (768px) collection area and phone hero inspected as viewport captures.
- **Overflow and assets (1280, 768, 390px):** no horizontal overflow, 0 broken images, no failed requests, no console errors, on Home and also on About, Products, Pay and Policies.
- **Links:** "Browse timber" goes to `/products.html`; "How ordering works" goes to `/pay.html`; the three collections land on `products.html#structural`, `#furniture`, `#bulk` with the section heading in view at the top (header is not sticky); the two choices land on `pay.html#order-steps` and `#payment-methods`; the WhatsApp strip link is `wa.me/256790320976` in a new tab. Home anchors `top`, `main`, `reasons`, `featured`, `audience`, `order` all exist.
- **Keyboard:** a collection panel receives `:focus-visible` with a solid forest outline (light surface); focus applies the same arrow shift and image filter as hover.
- **Reduced motion:** with `reducedMotion: reduce` the hero animation is `none`, hero opacity is 1, and transition durations are 0s.
- **Build:** `npm run build` passed for all 6 sites.

### Screenshot locations

`sites/nimu-capstonev2/redesign-reference/home-final-desktop-1280.png`, `home-final-tablet-768.png`, `home-final-phone-390.png` (final Home, full page; earlier phase3-* and iter-* captures were removed as superseded). The folder is not part of the Vite build (only HTML entries and referenced assets are emitted). Uncommitted.

### Limitations and unresolved issues

- Not observed: a real hover on a touch device, Safari/Firefox rendering, wide (1600px) Home render, `wrangler dev` routing.
- Tablet was reviewed as a viewport crop of the collections, not a full-page image read.
- `.measure`, `.photo`, `.spec-list` and `.section--forest` remain unused; `.eyebrow`, `.text-link`, `.section--tight`, `.section--sand` are now used.
- Whether sample entry counts and code ranges should be shown on Home (they must be kept in sync with `products.html` by hand).
- Whether the Structural panel should show a plank photograph rather than logs (the logs photo is the only structural-roofing image the catalogue assigns to NTW-103; no higher-resolution plank image exists).
- Home's heading scale for h2 sections is the existing `clamp(2.2rem, 4vw, 3.2rem)`, smaller than the `.section-intro h2` still used on About; About's alignment is for a later phase.
- Factual open questions from Phase 1 are unchanged.

### Prerequisites for Phase 4 (Products)

1. Owner visual review of the Home reference screenshots, with notes on crops, headline and tone.
2. Decide the products composition direction (specification-style browse) and whether the structural/furniture/bulk anchors keep their order.
3. Decide whether the Home hero photo should differ from collection imagery, and whether any better originals can be supplied.
4. Decide the fate of the unused primitives (`.measure`, `.photo`, `.spec-list`, `.section--forest`); Products is the likely consumer of `.photo` and `.spec-list`.
5. Confirm commit timing (Phase 3 is uncommitted).

## Standing design rules for all remaining phases (owner directive, 2026-11-02)

These override any earlier statement in this file or in the contract that says geometry is square. Full detail is in `DESIGN_CONTRACT.md` section 18.

1. **Rounded card system** for cards, sections and CTAs, using the tokens `--radius-xs/sm/md/lg` (6/10/16/24px). No new radii, no shadows.
2. **No horizontal rules anywhere** (no `<hr>`, `border-top`/`border-bottom` dividers, 1px-gap line grids, list separators). Use spacing, tinted rounded blocks or separate cards instead.
3. **Content never hangs.** Group it in a card, tinted block or section surface.
4. **Sectional feel.** Pages read as distinct sections: alternating paper and tinted rounded surfaces with generous separation.
5. Phase 4 to 9 verification must include a check that no `border-top`/`border-bottom` rule or `<hr>` has been introduced (`grep` the stylesheet and HTML) and that new cards use the radius tokens.

## Phase 3 revision log — rounded system and no rules

Triggered by owner feedback after reviewing Home: wanted designed card borders, a sectional feel, a site-wide rounded card design, and no horizontal rules.

### Changed

- `src/style.css`: added radius tokens and `--section-inset`; rounded cards, sections, CTAs, hero, page-hero and footer; removed every `border-top`/`border-bottom` divider and the 1px-gap line grid (`.credentials` is now separate cards); header, footer and mobile menu dividers removed. Home collections and buyer choices are bordered rounded cards with an inset body and a rounded CTA chip pinned to the bottom; ledger rows are separate rounded cards on the sand section; the lead collection image now takes the free height so no dead space sits above its CTA; the footer bottom bar is a rounded inset bar and the footer carries its own bottom padding.
- Shared CSS carries the system to Products, About, Pay and Policies: product cards and spec blocks, step cards, payment-method cards, audience and credentials cards, warning note, code chips, sand/moss section surfaces. Their page markup is untouched.
- `DESIGN_CONTRACT.md` (new section 18) and this file updated. `redesign-reference/` now also holds `round-*` full-page screenshots of all five pages at 1280, 768 and 390px.

### Verification

- `grep` of `src/style.css` and the five HTML files finds no `border-top`, `border-bottom`, `border-block`, `<hr>`, or non-card `1px solid` rule.
- Playwright at 1280, 768 and 390px on all five pages: no horizontal overflow, no broken images, no failed requests, no console errors.
- Home and Products full-page desktop renders read in full; other pages and the tablet/phone full-page renders were checked by metrics only, not read image by image.
- Not re-run after this revision: link/anchor and focus tests from the Phase 3 log (the markup is unchanged), a Safari/Firefox render, Worker routing.

### Open items

- Pay, About and Policies still use their pre-redesign compositions; they now look rounded but are not yet composed.
- Whether Home's section surfaces should alternate more strongly (currently paper, sand, paper, bark).
- Phase 3 prerequisites above still apply; add: owner review of the rounded treatment on Home before Products starts.

## Navbar revision log

Owner asked for a navbar like a supplied reference (floating rounded bar, active page as a filled pill) using our tokens, with the links centred between the logo and the WhatsApp CTA. Implemented as described in `DESIGN_CONTRACT.md` section 19.

- **Files:** `index.html`, `products.html`, `about.html`, `pay.html`, `policies.html` (nav links wrapped in `.nav-links`, CTA stays in `<nav>`); `src/style.css` (header, nav, hero and page-hero surfaces); records.
- **Measured (Playwright, index and pay, widths 320 to 1600px):** links centre offset from the bar centre is 0 at every desktop width; at 961px the gaps are 39px (logo to links) and 26px (links to CTA), so nothing collides; no horizontal overflow at any width; bar height 72px (64px at 390 and 320px).
- **Mobile and keyboard (390px):** closed menu has 0 visible links; Tab reaches the toggle; Enter opens (6 visible items); the first Tab lands on Home; Escape closes and returns focus to the toggle; a real viewport resize to 1200px closes an open menu. No-JS fallback shows 6 links, hidden toggle, no overflow.
- **Screenshots:** `redesign-reference/nav-1280.png`, `nav-961.png`, `nav-mobile-open.png`, `nav-nojs.png`.
- **Limitations:** hover and focus colours were checked by computed styles only for the toggle ring; the 961px bar was measured, and its screenshot taken, but not inspected image by image; other browsers not tested.
- **Breakpoint:** the 960px collapse is unchanged; with centred links the tightest desktop case (961px) still has positive gaps.

## Status at hand-off (end of Phase 3 revisions)

- **Phase 3 (Home): complete.** Includes the rounded card system, the no-horizontal-rules rule, the floating navbar and outlined section panels (contract sections 18 to 20).
- **Last change not visually reviewed by the owner or by me image by image:** outlined `.section--panel` on Home's `#featured` and `#audience` plus the inter-section spacing. Metrics checks (overflow, broken images, failed requests, console errors) were run for it; the build passes.
- **Committed by owner instruction** after the revisions; screenshots in `redesign-reference/` are included in the commit (`home-final-*` are the final Home references).
- **Next: Phase 4 (Products).** Owner supplies the brief. Standing rules apply: rounded tokens, no horizontal rules, content never hanging, sectional feel.

## Phase 4 log — Products

### Files changed
- `products.html`: `<main>` content replaced (header, footer, banner untouched); page generated from one data set so all eight entries share one structure.
- `src/style.css`: catalogue styles replaced (see contract section 21); old product/catalogue-note rules removed.
- `COURSEWORK_GUIDE.md`: Products maintenance guidance updated.
- `DESIGN_CONTRACT.md` (section 21) and this file.
- `redesign-reference/`: `products-final-{desktop-1280,tablet-768,phone-390}.png`; older `round-products-*` removed as superseded.
- Not touched: other pages, shared shell, `main.js`, other sites, infrastructure, dependencies, prices, policies.

### Decisions
1. Followed the standing rounded, no-horizontal-rules system rather than the brief's "square geometry" wording.
2. Cards are uniform rather than bento; the only structural variation is the horizontal NTW-203 service feature.
3. 7 ft versus 82–83 in: kept both figures exactly as given, added an explicit note that they do not match and the length is to be confirmed, and logged an owner question (contract section 21). No measurement was invented or changed.
4. Added an "Illustrative yard photograph" caveat on every image because yard photos are not verified exact-SKU photographs.
5. The "Supply" rows on the bulk units reuse existing description wording (pickup / delivery).
6. Replaced the public maintenance note with a next-step panel; maintenance steps remain in `COURSEWORK_GUIDE.md`.

### Verification evidence
Playwright (headless Chromium) against `npm run dev -- nimu-capstonev2 --port 5174`.
- **Inventory (script, before = commit `6b29f0d`, after = working tree):** same 8 codes NTW-101, 102, 103, 201, 202, 203, 301, 302; identical 8 price strings (UGX 45,000 per plank; 52,000 per plank; 380,000 per bundle; 58,000 per board; 61,000 per board; 5,000 per cut; 2,100,000 per bundle; 2,450,000 per bundle, delivery included); same 8 images; 17 SAMPLE badges before and after.
- **Links:** the three masthead chips land with their section at the top; all 8 "See how to order" links and the next-step button resolve to `pay.html#order-steps`; `products.html#furniture` deep link lands correctly. One `<h1>`, no duplicate ids, no missing alt text.
- **Hover and focus:** hovering a card gives `transform: none` and default cursor; only the order link changes (forest fill, paper text) and shifts its arrow; keyboard focus shows a forest ring and the same arrow shift; under reduced motion transitions are 0s.
- **Layouts:** no horizontal overflow, broken images, failed requests or console errors at 1280, 768 and 390px, and none on Home, About, Pay or Policies after the shared CSS change. A 200% text-size test showed no clipping or overflow at 1280 and 390px, with no line clamping.
- **Visually read:** full-page desktop render; phone card NTW-101; tablet furniture section; enlarged-text structural section. Phone NTW-302 and the enlarged phone crop were captured but not read image by image.
- **Rules:** `grep` finds no `border-top`, `border-bottom` or `<hr>` in the stylesheet or `products.html`.
- **Build:** `npm run build` passed for all 6 sites (see completion run below).

### Limitations and unresolved issues
- Owner has not yet reviewed Products visually; Safari and Firefox and Worker routing unchecked.
- NTW-101 length question (nominal 7 ft versus 82–83 in) is open.
- Images are low resolution and not item-specific; NTW-103 and NTW-301 are portrait photos cropped to landscape.
- Masthead is compact but still tall at desktop because of the page-hero padding; Phase 8 may tune it.
- The Pay page's own ordering steps will be recomposed in Phase 6, so "See how to order" lands on its current step cards.
- Uncommitted.

### Prerequisites for Phase 5 (About)
1. Owner review of Products screenshots and the NTW-101 length answer (or an instruction to leave it flagged).
2. About composition direction (editorial storytelling); decide whether the "15 years" and "Seroma Ltd." claims stay as flagged credentials and how prominently.
3. Decide whether to reuse the unit-card and section-panel patterns or introduce a new editorial layout.
4. Confirm commit timing (Phase 4 is uncommitted).

## Relocation to `sites/nimu-capstonev2`

- **Why:** the owner wants the original and the redesign live side by side so the client can compare, then promote the redesign into `nimu-capstone` once approved.
- **What changed:** the clean branch `feature/nimu-capstonev2` was cut from `main`. `sites/nimu-capstone/` is byte-identical to `main` (verified with `git diff main`). The Phases 1 to 4 work moved to `sites/nimu-capstonev2/`. `worker/index.js` gained `'nimu-capstonev2.farhansegujja.com': 'nimu-capstonev2'`. Docs in this folder were re-pointed to the v2 paths and commands.
- **Dev:** `npm run dev -- nimu-capstonev2 --port 5174`.
- **Manual steps still needed:** create the `nimu-capstonev2` DNS record in Cloudflare (proxied), then `npm run deploy`. Nothing was deployed or pushed as part of this move.
- **Remote branch:** the earlier `redesign/nimu-capstone-ledger` remote branch was deleted at the owner's request; a local copy of that branch remains as a backup.


## Phase 5 log — About

Built in `sites/nimu-capstonev2` (the brief said `sites/nimu-capstone`; v2 is where all remaining phases are built, and the original is untouched).

### Files changed
- `about.html`: `<main>` replaced (head, header, footer, banner untouched).
- `src/style.css`: About components added; dead About and inherited rules removed (listed in contract section 22).
- `COURSEWORK_GUIDE.md`, `DESIGN_CONTRACT.md` (section 22 and the About anchor row), this file.
- `redesign-reference/about-about-{desktop-1280,tablet-768,phone-390}.png` (old `round-about-*` captures remain as before-state references).
- Not touched: other pages, shared shell, `main.js`, `sites/nimu-capstone`, other sites, `worker/`, dependencies, payment data.

### Narrative and images
Opening photo `timber-yard-1080.webp` (the largest, 1080px native, at roughly 690px); operations images `logs-800`, `warehouse-timber-480`, `delivery-truck-512` at 4/12 width (at or below native size). The opening photograph also serves as Home's hero image, cropped differently (colour-filtered here, grayscale there); no other yard photo is large enough for a 7-column slot.

### Decisions
1. Removed headline treatment of "15 years" and "Seroma Ltd." and kept them in one small "not presented as proof" note with a "to be confirmed" badge; verification task kept in the guide.
2. Replaced equal cards with typography: photograph-and-text rows, two plain customer columns, three typographic values.
3. Business statements are qualified in place ("the business says", "as the business describes", "not independently certified").
4. Customer copy is the existing wording, shortened by removing the Home-duplicated segmentation intro; it links to the ordering guide instead of restating it.
5. Moss surface for the values section so two dark forest/bark surfaces do not meet.

### Verification evidence
Playwright (headless Chromium) against `npm run dev -- nimu-capstonev2 --port 5174`.
- No horizontal overflow, broken images, failed requests or console errors at 1280, 768 and 390px.
- One `<h1>` ("From the Bwaise yard."), no duplicate ids, descriptive alt text on all four photographs; anchors `audience`, `operations`, `values`, `next-step`, `main`, `top` exist.
- DOM order of the opening is copy then photograph; tab order follows the visual order (customer links, then "Browse timber", then "How ordering works", then the footer).
- All four in-page links work (`pay.html#order-steps`, `pay.html#payment-methods`, `products.html`, `pay.html`).
- Claim check by text search: "15 years" and "Seroma" occur once in `about.html`, inside `.values-note`, with the badge; the page has no `<strong>` proof treatment and no testimonial, award, timeline, team or statistic wording.
- `grep` finds no `border-top`, `border-bottom` or `<hr>` in the stylesheet or `about.html`.
- Read visually: full-page desktop render, phone opening, tablet operations section. Not read image by image: phone customers and values sections, tablet customers and values sections.
- `npm run build` passed for all 7 sites.

### Limitations and unresolved issues
- Owner has not yet reviewed About; Safari, Firefox and Worker routing unchecked.
- The customers panel is intentionally light (plain columns inside an outlined panel); the owner may want more weight.
- Opening photograph repeats Home's hero image.
- "15 years" and "Seroma Ltd." verification is still outstanding with the owner.
- Uncommitted.

### Prerequisites for Phase 6 (Pay & Order)
1. Owner review of the About screenshots and any change requests.
2. Pay composition direction: an instruction-led, step-by-step layout; confirm that the five steps, five payment methods, verification warning and refund summary stay, and keep every disclosure (banner, "payments not active", fictitious numbers, card "proposed, not active").
3. Confirm the fictitious account and number strings stay exactly as they are.
4. Decide whether the ordering steps keep `#order-steps` and `#payment-methods` anchors (they are linked from Home, Products and About).
5. Confirm commit timing (Phase 5 is uncommitted).


## Phase 6 log — Pay & Order

Built in `sites/nimu-capstonev2` (the brief said `sites/nimu-capstone`; the original is untouched). Phase 5 was committed first as `15f5601`.

### Contradictions found and how they were resolved
- Step 5 and the verification text said funds must be verified before preparing or releasing timber, while cash on delivery has no money before dispatch. Now split: prepaid routes verify funds first; cash on delivery is agreed first and paid and recorded at handover.
- The first delivery step opened "Once payment is verified". Now it covers both routes.
- The five steps sat in an auto-fit grid (four plus one). Now one vertical ordered list.
- The screenshot warning sat apart from verification. Now beside the prepaid rule.

### Files changed
- `pay.html` (`<main>` only), `src/style.css`, `COURSEWORK_GUIDE.md`, `DESIGN_CONTRACT.md` (section 23 and the Pay anchor row), this file, and `redesign-reference/pay-pay-*.png` (the older `round-pay-*` captures remain as before-state references).
- Not touched: other pages, shared shell, `main.js`, `sites/nimu-capstone`, other sites, `worker/`, dependencies, prices, business contact details, policy commitments.

### Reading journeys (walked by reading the final page, top to bottom)
1. **Individual, cash on delivery.** Masthead states demonstration-only and inactive payments. The individual column says payment is Mobile Money or cash on delivery. Steps 1 to 3 are the same for everyone. Step 4 says cash on delivery is agreed in advance and paid at handover; step 5 says the business confirms the agreed total and delivery details. The reference list tells them what to send. The Cash on delivery row labels the route "Pay on delivery, agreed before dispatch" and gives the three actions. The verification section's cash-on-delivery column explains that no money arrives before dispatch, so the agreement comes first, and that payment is recorded on the signed delivery note. Handover: order confirmed once delivery details are agreed, timber prepared, delivered and checked on arrival; refund summary and returns link follow. No step contradicts this route.
2. **Business, prepaid bank transfer.** The business column says quotation by phone or WhatsApp, the same routes plus bank transfer, delivery coordinated for larger loads. Steps 1 to 5 apply, with step 2 offering a phone quotation. The Bank transfer row is labelled "Prepaid, verified before delivery is scheduled" with the fictitious details. The prepaid verification column says funds must be visible in the business's own account before timber is prepared or released, with the screenshot warning directly beside it. Handover then follows with funds verified. No step contradicts this route.

### Verification evidence
Playwright (headless Chromium) against `npm run dev -- nimu-capstonev2 --port 5174`.
- **No live behaviour:** 0 forms, 0 inputs, 0 buttons in `<main>`, 0 copy controls, 0 scripts; the page has no storage.
- **Structure:** one `<h1>`; no duplicate ids; anchors `order-steps`, `payment-methods`, `delivery-refunds`, `verification`, `compare`, `next-step` exist. The sequence is an `<ol role="list">` of 5 items, stacked vertically with equal left edges, paired side by side with the checklist at 1280px.
- **Methods:** four rows with the Illustrative badge and the route labels; one "Proposed, not active" card block, visually separate. Sample identifiers verified exactly: `0771 00 00 00`, `0750 00 00 00`, `0000 1234 5678`, "Demo Commercial Bank", "Nimu Timber & Woodworks (Demo)".
- **Old contradictions:** "Once payment is verified" no longer appears; the cash-on-delivery column does not say funds are required before delivery; the demonstration disclosures and the banner are present.
- **Links and anchors:** masthead buttons land on their sections (top 0); deep link `pay.html#payment-methods` lands (top 0); the returns link goes to `policies.html#returns`; the catalogue links go to `products.html`. Home choices, Products order links and the About links all land on the right Pay sections (top 0 after the smooth scroll settles).
- **Layouts:** no horizontal overflow, broken images, failed requests or console errors at 1280, 768 and 390px on Pay (and on Home, Products, About and Policies after the shared CSS change). A 200% text-size test at 390px showed no clipping or overflow and no clamped text.
- **Read visually:** full-page desktop render; phone and enlarged-text payment-methods crops. Not read image by image: the tablet and phone verification and handover sections and the tablet process crop.
- **Rules:** `grep` finds no `border-top`, `border-bottom` or `<hr>` in the stylesheet or `pay.html`.
- `npm run build`: see the completion run below.

### Limitations and unresolved issues
- Owner review pending; Safari, Firefox and Worker routing unchecked.
- Owner questions raised (contract section 23 and the guide's confirmation list): any cash-on-delivery conditions such as a deposit or size limit, and whether paying in person at the yard is accepted. Neither is stated, so neither is shown.
- Bank-transfer verification is labelled "before delivery is scheduled" (from the existing instructions) while the other prepaid routes say "before the order is prepared"; the verification column says both happen before timber is prepared or released.
- Uncommitted.

### Prerequisites for Phase 7 (Policies)
1. Owner review of the Pay screenshots and decisions on the two open questions (or confirmation to leave them unstated).
2. Policies composition direction: a long-form reading layout; confirm the five policies (`#delivery`, `#returns`, `#privacy`, `#terms`, `#communication`) and every educational and non-compliance disclaimer must stay; the banner links to `#privacy` and Pay links to `#returns`.
3. Confirm the Delivery policy text can be left as written even though the Pay page now describes handover in more detail (the policy commits to nothing new).
4. Confirm commit timing (Phase 6 is uncommitted).


## Phase 7 log — Policies

Built in `sites/nimu-capstonev2` (the brief said `sites/nimu-capstone`; the original is untouched). The rounded system was applied in place of the brief's square geometry.

### Files changed
- `policies.html` (`<main>` only), `src/style.css` (policy layout, replaced old policy rules, new `@media print`), `DESIGN_CONTRACT.md` (section 27), this file, and `redesign-reference/policies-final-*.png`. Not touched: other pages, the shared shell, `main.js`, `sites/nimu-capstone`, other sites, infrastructure, dependencies.

### Content preservation
- All 21 sentences of the five original policies are present verbatim (script comparison against the previous commit). The only differences are the added leads, labels, notes and the privacy factual statement described in contract section 27.
- Anchor inventory unchanged: `delivery`, `returns`, `privacy`, `terms`, `communication` (plus `main` and `next-step`); each of the five contents links resolves.
- During review I restored the masthead's original qualification wording ("no legal compliance review"), after first shortening it to "no legal review".
- Hypothetical practices are labelled Hypothetical and introduced with one verifiable statement (this demo's pages have no forms). No hosting, logging, analytics, third-party, retention or compliance facts were added.

### Verification evidence
Playwright (headless Chromium) against `npm run dev -- nimu-capstonev2 --port 5174`.
- **Contents:** all five rail links land with their section 16px from the top (scroll margin). With JavaScript disabled (the `js` class was confirmed absent) the `#terms` link navigates and lands. The rail is sticky at 1280x720: 331px tall, top 20px, bottom 351px inside a 720px viewport, and there is no sticky header to obscure.
- **Incoming links:** the banner link from Home reaches `policies.html#privacy`; Pay's returns link reaches `policies.html#returns`; the closing panel link reaches `pay.html#order-steps`; the footer back-to-top returns to scrollY 0.
- **Structure:** one `<h1>`, then h2 only; no duplicate ids; all five policies open by default; no details, tabs or carousels.
- **Widths:** rail 280px, column 760px, gutter 51px, paragraphs about 690px at 1280px. No overflow at 1280, 768 and 390px, nor at 200% text at 390px. On tablet and phone the rail is static and above the text. No overflow, broken images, failed requests or console errors on all five pages after the shared CSS change.
- **Print:** under print emulation the banner, header, footer, rail and closing panel are hidden; the heading and all five policies (3,182 characters) remain with no background. A PDF was generated and the print render read (the eyebrow colour fix was applied after that render). No printed-page review in a real browser dialog.
- **Rules:** `grep` finds no `border-top`, `border-bottom` or `<hr>`. `npm run build` passes for all 7 sites.
- **Read visually:** full desktop render, phone policies column, print render. Not read image by image: tablet render, enlarged-text crop, PDF pages.
- **Not performed:** legal review, screen-reader testing, Safari, Firefox, Worker routing.

### Limitations and unresolved issues
- Words 486 to 557 (policy text is exempt from the copy budget; additions are navigation, leads, labels and notes).
- Open owner questions (contract section 27): whether the privacy notice should mention third-party font requests and hosting; whether the communication policy should carry its own qualifier.
- Active-section highlighting was not added (optional).
- Uncommitted.

### Prerequisites for cross-site integration
1. Owner review of the Policies screenshots and print behaviour.
2. Decide the two open privacy questions.
3. Decide when to promote `nimu-capstonev2` into `nimu-capstone` (steps are at the top of this file and in the contract); the `nimu-timber` overhaul already uses the same system.
4. Run Phase 8 (cross-page responsive, accessibility, motion and performance pass) and Phase 9 (final audit) before promotion; the v2 pages still use some wide card crops against the no-oblong-images rule.
5. Confirm commit timing (Phase 7 is uncommitted).

## Current status

Phases 1 to 7 are built. Phases 1 to 6 and the nimu-timber overhaul are approved and committed; Phase 7 is approved (uncommitted). **Next: Phase 8 (cross-page pass).** All remaining work stays in `sites/nimu-capstonev2` under the standing rules.
