# Nimu Timber & Woodworks — BUC3106 Coursework Demo

> **This folder is `sites/nimu-capstonev2`, the redesign shown beside the original for comparison.** The original, unmodified site stays in `sites/nimu-capstone` (`nimu-capstone.farhansegujja.com`); this redesign is served at `nimu-capstonev2.farhansegujja.com`. Every remaining redesign phase is built here, never in `sites/nimu-capstone`.
>
> **Promotion plan (after the client approves):** (1) copy this folder's contents over `sites/nimu-capstone/` (keep the folder name `nimu-capstone`); (2) delete `sites/nimu-capstonev2/`; (3) delete the `nimu-capstonev2.farhansegujja.com` line from `HOSTNAME_TO_SLUG` in `worker/index.js`; (4) remove the `nimu-capstonev2` DNS record in Cloudflare; (5) build and deploy. In the contract and progress records, read "`sites/nimu-capstonev2`" as the live `sites/nimu-capstone` after promotion.

This folder (`sites/nimu-capstonev2/`) is a **separate, educational copy** of the
real `sites/nimu-timber/` website, built for the MUBS BUC3106 E-Commerce
Capstone Project (due 4 November 2026). It reuses Nimu Timber's real brand,
colours, fonts and photos, but it is not the live business site, and it does
not process real payments or orders.

The real site at `sites/nimu-timber/` was **not changed** by this work.

## The five pages

1. **`index.html` — Home.** Hero, three reasons customers choose the
   business, a preview of the three product collections, the individual
   vs. business customer split, and a call to action into the ordering guide.
2. **`products.html` — Products.** Eight sample catalogue entries across
   three collections: Structural & Roofing Timber, Furniture & Workshop
   Timber, and Bulk & Contractor Supply. Each entry has a product code,
   timber type, description, size/quantity, price and an image.
3. **`about.html` — About.** Who the business is, what it supplies, and how
   individual (B2C) and business (B2B) customers are served differently.
4. **`pay.html` — How to Pay & Order.** A step-by-step sample ordering
   workflow, MTN/Airtel Mobile Money, bank transfer, cash on delivery, a
   proposed (inactive) card option, payment verification guidance, a
   screenshot warning, refunds, and delivery/confirmation steps.
5. **`policies.html` — Policies.** Short educational examples covering
   delivery, returns & refunds, a privacy notice referencing Uganda's Data
   Protection and Privacy Act, 2019, terms of service, and customer
   communication/security.

Every page shares the same header, navigation, footer, and a banner strip
at the very top reading **"Student project for BUC3106 at MUBS · Payments
and orders are not active."**

## Running it locally

From the repository root:

```
npm install            # first time only
npm run dev -- nimu-capstonev2 --port 5174
```

Then open the printed local URL in a browser. Because this is a flat
multi-page site (no framework, no router), each page is a real, separate
`.html` file — clicking a nav link is a normal page load, not a JavaScript
transition.

To build it (along with every other site in the repo) into `dist/`:

```
npm run build
```

To test it through the real Cloudflare Worker routing (the same way it will
be served in production):

```
npm run preview
```

## How the website works, in plain terms

- Every page is a plain HTML file. There is no database and no server-side
  code — nothing here "remembers" an order or a customer.
- `src/style.css` holds all the colours, fonts, spacing and component styles
  (product cards, payment steps, the status badges, etc.), shared by all
  five pages.
- `src/main.js` is a small script that opens/closes the mobile menu and
  fills in the footer's copyright year. It runs the same way on every page.
- `src/assets/` holds the real Nimu Timber photos and logo, reused from
  `sites/nimu-timber/`. The build tool (Vite) automatically renames each
  image file with a unique hash and copies it into `dist/nimu-capstonev2/`,
  which is how the browser gets a fresh copy whenever an image changes.
- There is no shopping cart, checkout form, or payment gateway anywhere in
  this folder. The "How to Pay & Order" page is a written explanation of a
  process, not working software that takes money.

## What is real and what is sample

**Carried over from the real business (treat as needs owner confirmation,
not as verified facts for a graded submission):**
- Business name, location (Bwaise Industrial Area, Mambule Road), WhatsApp
  number, and TikTok handle.
- The two timber types sold (Musambya, Kalitunsi) and their general uses
  (construction, roofing, furniture).
- That timber is stored in a warehouse and described as drying within a few
  days, that it can be cut to size, that bulk supply and delivery are
  offered, and that the standard confirmed Musambya length is about 7 ft
  (82–83 in).
- The "15 years of experience" and "Seroma Ltd." claims on the About page —
  these come directly from the live site's own copy and are marked with a
  "to be confirmed" badge here, because no independent evidence for them was
  provided.

**Clearly marked as SAMPLE / illustrative, and must not be presented as
real stock, prices or active payment details:**
- Every product code (`NTW-10x` etc.), exact size/width, bundle quantity and
  UGX price on the Products page.
- Every Mobile Money number, bank account, and sample reference on the
  How to Pay & Order page.
- The card payment option (shown only as a future proposal, not connected
  to anything).
- The specific wording of every policy on the Policies page — these are
  educational examples, not the business's actual adopted policies.

Nothing on this site was invented as a testimonial, statistic, award,
customer review, or survey finding. Where the real site already made a
claim (years of experience, a named customer), it is carried over but
flagged, not newly invented.

## What the group must confirm or supply before using this for anything
beyond the coursework presentation

1. Confirm or correct the "15 years" and "Seroma Ltd." claims on `about.html`.
2. Confirm real prices and standard sizes for each product line, to replace
   the SAMPLE values on `products.html`.
3. Decide whether MTN/Airtel Mobile Money numbers and bank details shown on
   `pay.html` should ever become real — if so, that is a business decision
   involving real financial risk and is outside the scope of this coursework
   demo.
4. Review the Policies page with the business owner before treating any of
   it as a real policy.

## How to replace sample data

- **Products:** open `products.html`. Each of the eight entries is one
  `<article class="product-card" id="ntw-###">` block with a `<dl class="spec-list">`
  holding its Size/Quantity, Price and (bulk only) Supply rows. Search for
  `status-badge--sample`: each SAMPLE size or price sits next to that badge. Replace
  the value, then delete the
  `<span class="status-badge status-badge--sample">SAMPLE</span>` once the owner
  confirms it, and update the "size and price are illustrative" line under the
  specifications. The three collections are marked with `id="structural"`,
  `id="furniture"` and `id="bulk"` (the Home page links to them). The photographs
  are yard photographs, not photographs of the exact item; keep the caption unless
  an exact photo is supplied. The public page no longer carries maintenance
  instructions; this guide is the place for them.
- **Product length:** NTW-101 shows "7 ft (approx. 82–83 in)". These two figures do
  not match exactly (7 ft is 84 in), so the page says the exact length is to be
  confirmed. Ask the owner whether 7 ft is nominal and 82–83 in the actual length,
  then update the wording and remove the note.
- **Payment details:** open `pay.html` and look inside `.payment-method`
  blocks under `id="payment-methods"`. Replace the sample numbers and
  account details only with details the business owner has approved for
  real use, and only once the group is ready to actually go live — this
  demo intentionally keeps them fictitious.
- **Policies:** open `policies.html`; each policy is one `<article
  class="policy-item">` block with its own `id` (`delivery`, `returns`,
  `privacy`, `terms`, `communication`).

## Publishing, and removing it afterwards

This demo is wired into the repository's existing build and deploy
pipeline, the same way every other site is:

- `worker/index.js` already maps `nimu-capstonev2.farhansegujja.com` to this
  folder's build output.
- `npm run build` already includes this site automatically — no extra
  configuration was needed beyond the one line in `worker/index.js`.
- To actually publish it, a project maintainer still needs to (manually,
  outside this repo): add the `nimu-capstonev2` DNS record in the Cloudflare
  dashboard, then run `npm run deploy`. **This has not been done as part of
  this change** — see "Deployment steps requiring action" below.

To remove the coursework site after the module is graded:

1. Delete the `nimu-capstonev2.farhansegujja.com` line from
   `HOSTNAME_TO_SLUG` in `worker/index.js`.
2. Delete the `sites/nimu-capstonev2/` folder.
3. Remove the DNS record in the Cloudflare dashboard (manual).
4. Run `npm run build` and `npm run deploy` so the live Worker stops
   serving it.

## What to demonstrate in the class presentation

- Navigate all five pages on a phone-sized screen and a desktop-sized
  screen, showing the shared header/nav/footer and the "Student project for
  BUC3106 at MUBS" banner on every page.
- Open the Products page and point out the SAMPLE badges — explain *why*
  they exist (no confirmed price list from the owner) rather than hiding
  them.
- Walk through the How to Pay & Order page step by step: ordering steps,
  each payment method's 3 steps, the "never trust a screenshot alone"
  warning, and the required disclosure that payments are not active.
- Open the Policies page and explain the privacy notice's reference to
  Uganda's Data Protection and Privacy Act, 2019, and that it is an
  educational example, not a claim of legal compliance.
- Show that the real `nimu-timber.farhansegujja.com` site is untouched and
  still works independently of this coursework copy.

## AI-use summary (adapt for your required AI-use log)

An AI coding assistant (Claude, via Claude Code) was used to:
- Read and understand the existing `sites/nimu-timber/` site, its CSS
  design system, and the repository's Vite/Cloudflare Worker build pipeline.
- Generate the HTML, CSS and JS for the five new coursework pages, reusing
  the existing visual identity, photos, and confirmed facts from the real
  site.
- Mark unconfirmed sizes, prices, and payment details as SAMPLE/illustrative
  rather than presenting them as real, per explicit instructions not to
  invent testimonials, statistics, or offers.
- Add one line to `worker/index.js` for hostname routing, and run
  `npm run build` to verify every site in the repository still builds.

The group should state in its own AI-use log: which tool was used, that it
was directed to treat existing confirmed business facts separately from new
sample content, that all generated prices/details were explicitly requested
to be marked as samples, and that a human reviewed the output before
submission.
