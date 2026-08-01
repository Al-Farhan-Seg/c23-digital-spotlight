// Intro splash (index.html only — guarded, no-op on apply.html since it has
// no #splash element). The show-once-per-tab decision and its sessionStorage
// write already happened synchronously in the inline <script> right after
// #splash in the HTML — if #splash still exists by the time this runs, that
// means "yes, show and animate it" was already decided. This block only
// orchestrates the animation/skip/cleanup of a splash that's already there.
//
// Wrapped in initSplash() rather than run inline so it can be deferred the
// same way the inline gate script defers past Chrome's speculative
// "Preload pages" prerendering (see the matching comment in index.html):
// document.getElementById('splash') is re-read *inside* this function, not
// captured at module top-level, specifically so that during a deferred
// prerendering pass it's re-checked *after* the inline gate's decide() has
// actually run (guaranteed by listener registration order) — otherwise this
// would see the not-yet-removed splash on every repeat visit during
// prerendering and wrongly lock page scroll/inertness for a splash that was
// never meant to show.
function initSplash() {
  const splash = document.getElementById('splash');
  if (!splash) return;
  const skipBtn = document.getElementById('splashSkip');
  const lockTargets = ['.site-header', 'main', '.site-footer']
    .map((sel) => document.querySelector(sel))
    .filter(Boolean);

  document.documentElement.style.overflow = 'hidden';
  lockTargets.forEach((el) => { el.inert = true; });
  skipBtn?.focus();

  let done = false;
  const finish = () => {
    if (done) return;
    done = true;
    clearTimeout(failSafeTimer);
    document.documentElement.style.overflow = '';
    lockTargets.forEach((el) => { el.inert = false; });
    splash.remove();
  };

  // Absolute ceiling: no matter what happens below (an animationend event
  // that never fires, some other script erroring, anything) the splash
  // is force-removed and never permanently blocks the page.
  const failSafeTimer = setTimeout(finish, 4000);

  let exiting = false;
  const startExit = () => {
    if (exiting) return;
    exiting = true;
    splash.classList.add('is-exiting');
    splash.addEventListener('animationend', finish, { once: true });
    setTimeout(finish, 700); // backup, in case animationend never fires
  };

  let mainTimer;
  skipBtn?.addEventListener('click', () => {
    clearTimeout(mainTimer);
    startExit();
  }, { once: true });

  // Don't start the entrance animation (or the countdown to exit) until the
  // render-blocking Google Fonts <link> has actually finished loading. A
  // CSS animation's clock runs on wall time from the moment styles are
  // computed, regardless of whether a frame was ever painted — on a cold
  // cache, fetching that stylesheet can take longer than the entrance
  // animation itself, so by the time it clears and the browser finally
  // paints, the animation had already run out in the background and jumps
  // straight to its end state with no visible motion.
  // (document.fonts.ready is the wrong signal for this: it only tracks
  // font faces the browser already knows about from @font-face rules it
  // has parsed — while this stylesheet is still in flight, the browser
  // doesn't know those rules exist yet, so fonts.ready resolves as if
  // there's nothing to wait for, immediately, even though the actual
  // render-blocking resource hasn't loaded at all.)
  const fontLink = document.getElementById('webfontStylesheet');
  const fontsReady = new Promise((resolve) => {
    if (!fontLink || fontLink.sheet) {
      // Not present, or already loaded (the common case — small stylesheet,
      // usually resolves well before this deferred script even runs) —
      // resolve immediately, no artificial delay.
      resolve();
      return;
    }
    let settled = false;
    const done = () => { if (!settled) { settled = true; resolve(); } };
    fontLink.addEventListener('load', done, { once: true });
    fontLink.addEventListener('error', done, { once: true }); // fails open
    setTimeout(done, 800); // safety cap, in case load/error never fire
  });

  // Full experience is ~3s from when the entrance actually starts (2.5s
  // settled + the 0.5s exit slide) — a starting point, tune later.
  // Reduced-motion stays short regardless, per the "remove the splash
  // quickly" accessibility requirement.
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  fontsReady.then(() => {
    requestAnimationFrame(() => {
      splash.classList.add('is-ready');
      mainTimer = setTimeout(startExit, reduceMotion ? 500 : 2500);
    });
  });

  // Back/forward-cache guard. Navigating away (e.g. tapping "Apply") before
  // the splash finished its own dismissal — before mainTimer/failSafeTimer
  // fired — leaves this exact page frozen mid-splash in the browser's
  // bfcache: DOM, pending timers and all. Returning via Back restores that
  // frozen snapshot verbatim without re-running any script (the inline
  // sessionStorage gate included), so the still-present splash reappears —
  // it wasn't re-shown, it just never finished the first time. The frozen
  // timers do eventually resume and self-correct, but only after a visible
  // delay, which reads as the splash "replaying". `pageshow`'s `persisted`
  // flag is exactly the bfcache-restore signal: force an instant, silent
  // finish() (no animation) so a resumed page never shows a stale splash.
  window.addEventListener('pageshow', (event) => {
    if (event.persisted) finish();
  });
}

// document.prerendering is undefined in browsers without the Prerendering
// API, so this check is a no-op everywhere except Chrome with speculative
// prerendering active — see the matching comment on initSplash() above.
if (document.prerendering) {
  document.addEventListener('prerenderingchange', initSplash, { once: true });
} else {
  initSplash();
}

const toggle = document.getElementById('navToggle');
const nav = document.getElementById('primaryNav');

toggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(isOpen));
});

nav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  });
});

// Hero background carousel (index.html only — guarded, no-op on apply.html).
// Slides left every 3 seconds; pauses when the tab isn't visible (no point
// burning cycles on an offscreen slide) and never starts at all under
// prefers-reduced-motion, per this site's existing motion-accessibility
// convention — the first image just stays put instead of cycling.
//
// Looping technique: the track's last child is a clone of the first slide
// (see index.html). Sliding onto that clone looks identical to sliding onto
// the real first slide, so once the transition into it finishes, we can
// snap the track back to position 0 with transitions disabled for that one
// frame — invisibly, since the clone and the real slide 1 are pixel-identical.
const heroTrack = document.querySelector('.hero-carousel-track');
if (heroTrack && heroTrack.children.length > 2 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const realSlideCount = heroTrack.children.length - 1; // exclude the trailing clone
  let index = 0;
  let heroTimer = null;

  const advanceHero = () => {
    index += 1;
    heroTrack.style.transform = `translateX(-${index * 100}%)`;
  };

  heroTrack.addEventListener('transitionend', (event) => {
    if (event.propertyName !== 'transform' || index !== realSlideCount) return;
    heroTrack.classList.add('is-resetting');
    index = 0;
    heroTrack.style.transform = 'translateX(0)';
    heroTrack.offsetHeight; // force layout so the instant jump commits before...
    heroTrack.classList.remove('is-resetting'); // ...transitions resume here
  });

  const startHero = () => {
    if (heroTimer) return;
    heroTimer = setInterval(advanceHero, 3000);
  };
  const stopHero = () => {
    clearInterval(heroTimer);
    heroTimer = null;
  };

  startHero();
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stopHero();
    else startHero();
  });
}

const whyTrack = document.querySelector('.why-problems');
const whyPrev = document.querySelector('.why-carousel-prev');
const whyNext = document.querySelector('.why-carousel-next');
if (whyTrack && whyPrev && whyNext) {
  const scrollByCard = (direction) => {
    const card = whyTrack.querySelector('.why-card');
    if (!card) return;
    const gap = parseFloat(getComputedStyle(whyTrack).gap) || 0;
    whyTrack.scrollBy({ left: (card.offsetWidth + gap) * direction, behavior: 'smooth' });
  };
  whyPrev.addEventListener('click', () => scrollByCard(-1));
  whyNext.addEventListener('click', () => scrollByCard(1));
}

const faqTriggers = document.querySelectorAll('.faq-trigger');
if (faqTriggers.length) {
  const closeAllFaq = () => {
    faqTriggers.forEach((other) => {
      other.setAttribute('aria-expanded', 'false');
      document.getElementById(other.getAttribute('aria-controls'))?.classList.remove('is-open');
    });
  };
  const openFaq = (trigger) => {
    closeAllFaq();
    trigger.setAttribute('aria-expanded', 'true');
    document.getElementById(trigger.getAttribute('aria-controls'))?.classList.add('is-open');
  };

  faqTriggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const isOpen = trigger.getAttribute('aria-expanded') === 'true';
      if (isOpen) {
        closeAllFaq();
      } else {
        openFaq(trigger);
      }
    });
  });

  // Deep-linking: #faq-question-N should open (not just scroll to) that item,
  // both on initial load and when arriving via an in-page hash change.
  const openFaqFromHash = () => {
    const id = decodeURIComponent(location.hash.slice(1));
    if (!id) return;
    const trigger = document.getElementById(id);
    if (trigger && trigger.classList.contains('faq-trigger')) {
      openFaq(trigger);
      trigger.scrollIntoView({ block: 'start' });
    }
  };
  if (location.hash) openFaqFromHash();
  window.addEventListener('hashchange', openFaqFromHash);
}

// Nav active-link tracking: marks whichever nav link's section is currently
// in view. Visual only — no destinations or click behaviour change. Only
// wires up when both sides exist, so it's a no-op on apply.html (its nav
// links point to ./index.html#..., not #...).
const spySections = document.querySelectorAll('main section[id]');
const spyLinks = document.querySelectorAll('.nav-links a[href^="#"]');
if (spySections.length && spyLinks.length) {
  const linkFor = (id) => document.querySelector(`.nav-links a[href="#${id}"]`);
  const setActive = (id) => {
    const link = linkFor(id);
    if (!link) return;
    spyLinks.forEach((l) => l.classList.remove('is-active'));
    link.classList.add('is-active');
  };
  const spyObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    },
    { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
  );
  spySections.forEach((section) => spyObserver.observe(section));
}

// Application form (apply.html only — guarded, no-op on index.html).
const applicationForm = document.getElementById('applicationForm');
if (applicationForm) {
  const UGANDAN_PHONE_PATTERN = /^(0|\+?256)7[0-9]{8}$/;

  // --- School attendance: checking a class enables + requires its
  // stream/discipline select; unchecking disables + clears it, so a
  // stray value from a since-unchecked class can never submit. ---
  applicationForm.querySelectorAll('[data-class-checkbox]').forEach((checkbox) => {
    const row = checkbox.closest('.class-row');
    const select = row?.querySelector('[data-class-select]');
    if (!select) return;
    checkbox.addEventListener('change', () => {
      select.disabled = !checkbox.checked;
      select.required = checkbox.checked;
      if (!checkbox.checked) {
        select.value = '';
        select.setAttribute('aria-invalid', 'false');
      }
    });
  });

  // --- Referral toggle: showing/hiding also disables the hidden fields
  // (not just visually hiding them), so FormData naturally omits them
  // from the payload entirely when not applicable, rather than sending
  // empty strings. ---
  const referralFields = document.getElementById('referralFields');
  const referredName = document.getElementById('referredName');
  const referredContact = document.getElementById('referredContact');
  applicationForm.querySelectorAll('[data-applicant-type]').forEach((radio) => {
    radio.addEventListener('change', () => {
      const isReferral = radio.value === "Someone I'm referring" && radio.checked;
      if (!radio.checked) return;
      referralFields.hidden = !isReferral;
      [referredName, referredContact].forEach((field) => {
        field.disabled = !isReferral;
        field.required = isReferral;
        if (!isReferral) {
          field.value = '';
          field.setAttribute('aria-invalid', 'false');
        }
      });
    });
  });

  // --- Character counter on "Reason for applying". ---
  const reasonField = document.getElementById('reason');
  const reasonCounter = document.getElementById('reason-counter');
  const REASON_MAX = 1000;
  const REASON_MIN = 100;
  const updateReasonCounter = () => {
    const remaining = REASON_MAX - reasonField.value.length;
    reasonCounter.textContent = `${remaining} characters remaining`;
    reasonCounter.classList.toggle('is-near-limit', remaining <= 50);
  };
  reasonField.addEventListener('input', updateReasonCounter);
  updateReasonCounter();

  // --- Validation. novalidate is set on the <form> so the browser never
  // shows its own bubble UI — every field still carries its native
  // required/type/pattern attributes, but we read `.validity` ourselves
  // and render one consistent, custom-styled error message per field,
  // rather than a mix of native tooltips and our own text. ---
  const setFieldError = (input, errorEl, message) => {
    if (!errorEl) return;
    errorEl.textContent = message || '';
    input?.setAttribute('aria-invalid', message ? 'true' : 'false');
  };

  const validateSimpleField = (input, messages) => {
    const errorEl = document.getElementById(`${input.id}-error`);
    if (input.disabled) { setFieldError(input, errorEl, ''); return true; }
    if (input.validity.valid) { setFieldError(input, errorEl, ''); return true; }
    const message = input.validity.valueMissing
      ? messages.missing
      : (messages.invalid || messages.missing);
    setFieldError(input, errorEl, message);
    return false;
  };

  const fieldMessages = {
    fullName: { missing: 'Enter your full name.' },
    gender: { missing: 'Select your gender.' },
    email: { missing: 'Enter your email address.', invalid: 'Enter a valid email address.' },
    phone: { missing: 'Enter your contact number.', invalid: 'Enter a Ugandan number like 07XXXXXXXX or +2567XXXXXXXX.' },
    whatsappNumber: { missing: 'Enter the WhatsApp-group number.', invalid: 'Enter a Ugandan number like 07XXXXXXXX or +2567XXXXXXXX.' },
    readinessConfirmed: { missing: 'Confirm you understand the 24-hour requirement.' },
    termsAccept: { missing: 'You must accept the terms to continue.' },
    referredName: { missing: "Enter the referred person's name." },
    referredContact: { missing: "Enter a way to reach the referred person." },
  };

  const validateSchoolAttendance = () => {
    const errorEl = document.getElementById('schoolAttendance-error');
    const checked = Array.from(applicationForm.querySelectorAll('[data-class-checkbox]:checked'));
    if (checked.length === 0) {
      errorEl.textContent = 'Select at least one class you attended.';
      return false;
    }
    const missingSelect = checked.some((checkbox) => {
      const select = checkbox.closest('.class-row')?.querySelector('[data-class-select]');
      const invalid = !select || !select.value;
      select?.setAttribute('aria-invalid', invalid ? 'true' : 'false');
      return invalid;
    });
    if (missingSelect) {
      errorEl.textContent = 'Choose the stream or discipline for every class you selected.';
      return false;
    }
    errorEl.textContent = '';
    return true;
  };

  const validateApplicantType = () => {
    const errorEl = document.getElementById('applicantType-error');
    const checked = applicationForm.querySelector('[data-applicant-type]:checked');
    errorEl.textContent = checked ? '' : "Select whether you're applying for yourself or referring someone.";
    return Boolean(checked);
  };

  const validateReason = () => {
    const errorEl = document.getElementById('reason-error');
    if (!reasonField.validity.valid) {
      setFieldError(reasonField, errorEl, 'Tell us briefly why you’re applying.');
      return false;
    }
    if (reasonField.value.trim().length < REASON_MIN) {
      setFieldError(reasonField, errorEl, `Add a little more detail (at least ${REASON_MIN} characters).`);
      return false;
    }
    setFieldError(reasonField, errorEl, '');
    return true;
  };

  const captchaErrorEl = document.getElementById('captcha-error');
  const validateCaptcha = () => {
    const response = applicationForm.querySelector('[name="h-captcha-response"]')?.value;
    captchaErrorEl.textContent = response ? '' : 'Please complete the captcha.';
    return Boolean(response);
  };

  const honeypot = document.getElementById('website');

  const validateForm = () => {
    // Honeypot: a real applicant never reaches this field (off-screen,
    // no tab stop). If it's filled, treat as a bot and stop silently —
    // no error message, no network call, no hint given back.
    if (honeypot.value) return { valid: false, silent: true };

    const results = [
      validateSimpleField(document.getElementById('fullName'), fieldMessages.fullName),
      validateSimpleField(document.getElementById('gender'), fieldMessages.gender),
      validateSimpleField(document.getElementById('email'), fieldMessages.email),
      validateSimpleField(document.getElementById('phone'), fieldMessages.phone),
      validateSimpleField(document.getElementById('whatsappNumber'), fieldMessages.whatsappNumber),
      validateSchoolAttendance(),
      validateApplicantType(),
      referredName.disabled ? true : validateSimpleField(referredName, fieldMessages.referredName),
      referredContact.disabled ? true : validateSimpleField(referredContact, fieldMessages.referredContact),
      validateSimpleField(document.getElementById('readinessConfirmed'), fieldMessages.readinessConfirmed),
      validateReason(),
      validateSimpleField(document.getElementById('termsAccept'), fieldMessages.termsAccept),
      validateCaptcha(),
    ];

    return { valid: results.every(Boolean), silent: false };
  };

  const focusFirstInvalid = () => {
    const firstInvalid = applicationForm.querySelector('[aria-invalid="true"]')
      || (applicationForm.querySelector('[data-class-checkbox]:checked') ? null : applicationForm.querySelector('[data-class-checkbox]'))
      || (applicationForm.querySelector('[data-applicant-type]:checked') ? null : applicationForm.querySelector('[data-applicant-type]'))
      || (applicationForm.querySelector('[name="h-captcha-response"]')?.value ? null : applicationForm.querySelector('.h-captcha'));
    firstInvalid?.focus?.({ preventScroll: false });
    firstInvalid?.scrollIntoView?.({ block: 'center', behavior: 'smooth' });
  };

  // --- Submission. ---
  const submitBtn = document.getElementById('submitBtn');
  const formStatus = document.getElementById('formStatus');
  const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

  applicationForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const { valid, silent } = validateForm();
    if (!valid) {
      if (!silent) focusFirstInvalid();
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting…';
    applicationForm.setAttribute('aria-busy', 'true');
    formStatus.textContent = '';
    formStatus.className = 'form-status';

    const payload = Object.fromEntries(new FormData(applicationForm).entries());
    // hCaptcha's script auto-injects a hidden g-recaptcha-response field for
    // reCAPTCHA drop-in compatibility. Web3Forms treats its mere presence as
    // an attempt to use their Pro-only reCAPTCHA integration and rejects the
    // whole submission with a 400 ("You are trying to use a Pro feature,
    // Please Upgrade to use reCaptcha.") — even though we're only using
    // hCaptcha. Strip it before sending; h-captcha-response is unaffected.
    delete payload['g-recaptcha-response'];

    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => ({}));

      if (response.ok && result.success) {
        formStatus.textContent = 'Application received. Applications stay open throughout the pilot — you’ll be contacted directly if selected.';
        formStatus.className = 'form-status is-success';
        applicationForm.reset();
        applicationForm.querySelectorAll('[data-class-select]').forEach((select) => { select.disabled = true; });
        referralFields.hidden = true;
        [referredName, referredContact].forEach((field) => { field.disabled = true; field.required = false; });
        updateReasonCounter();
        submitBtn.textContent = 'Submit application';
        // Button stays disabled after a successful submission — resubmitting
        // the same application isn't a supported flow.
      } else {
        // Web3Forms doesn't publicly document the exact shape of a
        // quota-exceeded response, so this is a best-effort heuristic, not
        // a verified contract. It degrades to the generic message if the
        // keywords don't match, and logs the real response so the
        // heuristic can be corrected later if this ever actually fires.
        const messageText = String(result.message || '').toLowerCase();
        const looksLikeQuota = /quota|limit|maximum|exceeded/.test(messageText);
        if (looksLikeQuota) {
          console.warn('Web3Forms: possible quota-exhaustion response', result);
          formStatus.textContent = 'Applications are temporarily unavailable due to high volume this month. Please try again soon or reach out on WhatsApp.';
        } else {
          console.error('Web3Forms submission failed', result);
          formStatus.textContent = 'Something went wrong sending your application. Your answers are still here — please try again.';
        }
        formStatus.className = 'form-status is-error';
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit application';
      }
    } catch (error) {
      console.error('Web3Forms network error', error);
      formStatus.textContent = 'Something went wrong sending your application. Your answers are still here — please try again.';
      formStatus.className = 'form-status is-error';
      submitBtn.disabled = false;
      submitBtn.textContent = 'Submit application';
    } finally {
      applicationForm.setAttribute('aria-busy', 'false');
    }
  });
}
