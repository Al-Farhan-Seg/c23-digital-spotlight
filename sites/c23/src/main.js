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
  const fontLink = document.getElementById('webfontStylesheet');
  const fontsReady = new Promise((resolve) => {
    if (!fontLink || fontLink.sheet) {
      resolve();
      return;
    }
    let settled = false;
    const done = () => { if (!settled) { settled = true; resolve(); } };
    fontLink.addEventListener('load', done, { once: true });
    fontLink.addEventListener('error', done, { once: true }); // fails open
    setTimeout(done, 800); // safety cap, in case load/error never fire
  });
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  fontsReady.then(() => {
    requestAnimationFrame(() => {
      splash.classList.add('is-ready');
      mainTimer = setTimeout(startExit, reduceMotion ? 500 : 2500);
    });
  });
  window.addEventListener('pageshow', (event) => {
    if (event.persisted) finish();
  });
}
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
const applicationForm = document.getElementById('applicationForm');
if (applicationForm) {
  const UGANDAN_PHONE_PATTERN = /^(0|\+?256)7[0-9]{8}$/;
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
      } else {
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
