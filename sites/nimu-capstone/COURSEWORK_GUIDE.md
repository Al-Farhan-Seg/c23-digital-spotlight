# Nimu Timber & Woodworks — BUC3106 Coursework Demo

> **This folder is `sites/nimu-capstone`, the redesign shown beside the original for comparison.** The original, unmodified site stays in `sites/nimu-capstone` (`nimu-capstone.farhansegujja.com`); this redesign is served at `nimu-capstone.farhansegujja.com`.
>
> **Promotion plan (after the client approves):** (1) copy this folder's contents over `sites/nimu-capstone/` (keep the folder name `nimu-capstone`); (2) delete `sites/nimu-capstone/`; (3) delete the `nimu-capstone.farhansegujja.com` line from `HOSTNAME_TO_SLUG` in `worker/index.js`; (4) remove the `nimu-capstone` DNS record in Cloudflare; (5) build and deploy. After promotion, read every `sites/nimu-capstone` path in the records and this guide as `sites/nimu-capstone`.

This folder is a **separate, educational copy** of the real `sites/nimu-timber/`
website, built for the MUBS BUC3106 E-Commerce Capstone Project (due
4 November 2026). It reuses Nimu Timber's real brand, colours, fonts and
photos, but it is not the live business site, and it does not process real
payments or orders. The real site at `sites/nimu-timber/` is a different
one-page site (it was restyled separately in the same design direction; its
content, links and anchors were kept).

## The five pages

1. **`index.html` — Home.** A shorter hero ("Timber for your next build."), three
   collection cards leading into the catalogue (structural, furniture, bulk),
   three short rows on how the yard works, two linked choices for individual
   and business buyers, and a WhatsApp enquiry strip.
2. **`products.html` — Products.** "Find your timber." Eight sample catalogue
   entries in three collections: Structural & Roofing, Furniture & Workshop
   (including the cut-to-size service) and Bulk & Contractor Supply. Every entry
   has a code, timber type, short description, size/quantity and price rows with
   SAMPLE labels, a qualification line, a yard photograph and a link to the
   ordering guide.
3. **`about.html` — About.** "From the Bwaise yard": who the business is, how the
   yard stores, cuts and delivers timber (in the business's own words), the two
   kinds of customer, and the values the business states for itself.
4. **`pay.html` — How to Pay & Order.** A sample order sheet: individual vs
   business differences, one five-step process beside a reference list, four
   payment methods (MTN Mobile Money, Airtel Money, bank transfer, cash on
   delivery) as illustrative rows, a separate proposed (inactive) card block,
   verification rules for prepaid payments vs cash on delivery (with the
   screenshot warning), handover steps and the refund summary.
5. **`policies.html` — Policies.** An indexed document: five always-open policy
   cards (delivery, returns and refunds, privacy notice, terms of service,
   customer communication and security) with a contents list, qualifier notes
   and a print stylesheet.

Every page shares the same floating header, navigation, footer and a notice at
the very top reading **"Student project for BUC3106 at MUBS · Payments and orders
are not active."**

## Running it locally

From the repository root:

```
npm install            # first time only
npm run dev -- nimu-capstone --port 5174
```

Add `--host` to open it on another device on the same network (for a phone over
Wi-Fi); stop the server when finished. Each page is a real, separate `.html`
file: clicking a nav link is a normal page load.

To build every site into `dist/`:

```
npm run build
```

To test through the real Cloudflare Worker routing:

```
npm run preview
```

(`npm run preview` builds and runs `wrangler dev`. Locally the Worker needs to be
told which hostname to treat the request as, for example
`npx wrangler dev --local-upstream nimu-capstone.farhansegujja.com`.)

There are no lint, typecheck or test scripts in this repository.

## How the website works, in plain terms

- Every page is a plain HTML file. There is no database and no server-side code;
  nothing here remembers an order or a customer. There are no forms, inputs,
  carts or payment controls anywhere in this folder.
- `src/style.css` holds all colours, fonts, spacing and component styles, shared
  by the five pages. Design values live in `:root` (colours, fonts, `--gutter`,
  radius tokens `--radius-xs/sm/md/lg`, `--section-inset`, `--focus`).
- `src/main.js` is a small script: it opens and closes the mobile menu and fills in
  the footer's copyright year. Without JavaScript the navigation still works as a
  wrapping list and all content is visible.
- `src/assets/` holds the photos, logo, WhatsApp and TikTok icons.
  `src/assets/logos/` keeps the two original payment-logo files for provenance
  (the Pay page uses recoloured inline copies). Vite hashes images into
  `dist/nimu-capstone/`.
- Icons are one small inline SVG set defined once per page in a hidden
  `<svg class="icon-sprite">` and used with `<use href="#i-name">`. If you add an
  icon, add the same `<symbol>` to every page that uses it.
- `DESIGN_CONTRACT.md` (design rules and conventions) and `REDESIGN_PROGRESS.md`
  (what was built, evidence and open items) explain the design system.
  `redesign-reference/` holds reference screenshots; it is not part of the build.

## What is real and what is sample

**Carried over from the real business (treat as needing owner confirmation, not
as verified facts for a graded submission):**
- Business name, location (Bwaise Industrial Area, Mambule Road), WhatsApp number
  and TikTok handle.
- The two timber types (Musambya, Kalitunsi) and their general uses.
- That timber is stored in a warehouse and described as drying within a few days,
  can be cut to size, and that bulk supply and delivery are offered.
- The standard Musambya length stated as "7 ft (approx. 82–83 in)". These two
  figures do not match exactly (7 ft is 84 in); the Products page says the exact
  length is to be confirmed.
- The "15 years of experience" and "Seroma Ltd." claims, which come from the live
  site's own copy. On the About page they appear only in one small note under
  "What it says it values", marked "to be confirmed" and "Not proof". They are not
  shown as credentials or social proof.

**Clearly marked as SAMPLE / illustrative, and must not be presented as real
stock, prices or active payment details:**
- Every product code (`NTW-101` to `NTW-302`), size, bundle quantity and UGX price.
- The Mobile Money merchant codes (`000 111` MTN, `000 222` Airtel; six digits and
  deliberately fake), the bank account and the sample references.
- The card payment option (a proposal only, connected to nothing).
- The wording of every policy: educational examples, not the business's adopted
  policies, and no legal review has been carried out.

Nothing on this site was invented as a testimonial, statistic, award, customer
review or survey finding.

## What the group must confirm or supply before using this beyond the coursework

1. Confirm or correct the "15 years" and "Seroma Ltd." claims (About page).
2. Confirm real prices and standard sizes, to replace the SAMPLE values (Products).
3. Confirm whether 7 ft is a nominal length and 82–83 in the actual length (NTW-101),
   then update the wording and remove the note.
4. Confirm how cash on delivery works in practice (deposit, order-size limit or other
   condition) and whether paying in person at the yard is accepted; the Pay page
   states neither.
5. Confirm the real menu wording for merchant payments; the steps currently say
   "Choose Send Money" for MTN and Airtel.
6. Decide whether the privacy notice should say the site loads fonts from Google
   Fonts and is served through Cloudflare (third parties receive visitor requests).
   It does not say so now.
7. Decide whether the sample merchant codes and bank details should ever become
   real. That is a business decision involving real financial risk and is outside
   this coursework.
8. Confirm the business opening hours (the delivery policy says only "during
   business hours").
9. Review the Policies page with the business owner before treating any of it as a
   real policy.
10. Decide whether to replace the two payment logos with files from MTN's and
    Airtel's own brand pages (the current ones are Wikimedia Commons copies).

## Where to edit

| To change | Open | Look for |
|---|---|---|
| A product's size, price or label | `products.html` | `<article class="product-card" id="ntw-###">`, its `<dl class="spec-list">` and the `status-badge--sample` spans; update the "size and price illustrative" line too |
| Product photo captions | `products.html` | `<figcaption>Yard photo</figcaption>`; keep unless an exact-item photo is supplied |
| Category anchors | `products.html` | `id="structural"`, `id="furniture"`, `id="bulk"` (Home links to them) |
| Payment methods | `pay.html` | `.method` blocks under `id="payment-methods"`; card is the separate `.method-proposed` block |
| Payment logos | `pay.html` | `<symbol id="i-logo-mtn">` and `<symbol id="i-logo-airtel">` in the icon sprite |
| The five ordering steps and reference list | `pay.html` | `ol.order-steps-list` and `.checklist` under `id="order-steps"` |
| A policy | `policies.html` | `<article class="policy-item" id="delivery|returns|privacy|terms|communication">` and the matching contents link |
| Claims about the business | `about.html` | the "Not proof" note (`.values-note`) and the operations rows |
| Banner text | every page | `<aside aria-label="Demonstration notice">` (keep identical on all five) |
| Navigation and footer | every page | `.site-header` and `.site-footer`; keep identical except which page is current |
| Colours, fonts, radii, spacing | `src/style.css` | the `:root` block at the top |

## Publishing, and removing it afterwards

This demo is wired into the repository's existing build and deploy pipeline:

- `worker/index.js` maps `nimu-capstone.farhansegujja.com` to this folder's
  build output.
- `npm run build` includes this site automatically.
- To publish it, a project maintainer must (manually, outside this repo) add a
  proxied `nimu-capstone` DNS record in the Cloudflare dashboard, then run
  `npm run deploy`. **None of this has been done.**

To remove the coursework site after the module is graded:

1. Delete the `nimu-capstone.farhansegujja.com` line from `HOSTNAME_TO_SLUG` in
   `worker/index.js`.
2. Delete the `sites/nimu-capstone/` folder.
3. Remove the DNS record in the Cloudflare dashboard (manual).
4. Run `npm run build` and `npm run deploy` so the live Worker stops serving it.

## What to demonstrate in the class presentation

- Navigate all five pages on a phone-sized and a desktop-sized screen, showing the
  shared header, navigation, footer and the "Student project for BUC3106 at MUBS"
  notice on every page.
- Open Products and point out the SAMPLE labels: explain why they exist (no
  confirmed price list from the owner) rather than hiding them.
- Walk through How to Pay & Order: the demonstration-only status, the five steps,
  the reference list, each payment method, why prepaid payments are verified
  before preparation while cash on delivery is agreed first and paid at handover,
  the "never trust a screenshot alone" warning and the disclosure that payments
  are not active.
- Open Policies, explain the privacy notice's reference to Uganda's Data Protection
  and Privacy Act, 2019, and that it is an educational example, not a claim of legal
  compliance. Try the print view.
- Show that the real `nimu-timber.farhansegujja.com` site still works independently.

## AI-use summary (adapt for your required AI-use log)

An AI coding assistant (Claude, via Claude Code) was used to:
- Read and understand the existing `sites/nimu-timber/` site, its design system and
  the repository's Vite and Cloudflare Worker build pipeline.
- Generate and iteratively redesign the HTML, CSS and JavaScript for the five
  coursework pages, reusing the existing visual identity, photos and confirmed
  facts from the real site, under the owner's direction and review at each phase.
- Mark unconfirmed sizes, prices and payment details as SAMPLE or illustrative
  instead of presenting them as real, per explicit instructions not to invent
  testimonials, statistics or offers.
- Run automated checks (build, layout, link, accessibility-structure and lab
  performance scripts) and report what was and was not verified.
- Add one line to `worker/index.js` for hostname routing.

The group should state in its own AI-use log: which tool was used, that it was
directed to treat existing business facts separately from new sample content, that
all generated prices and details were explicitly requested to be marked as samples,
and that a human reviewed the output before submission.
