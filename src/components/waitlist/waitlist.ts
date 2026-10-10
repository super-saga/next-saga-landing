/**
 * Waitlist dialog client logic.
 *
 * Exposes:
 *   window.openWaitlist()  — opens the dialog, saves last-focused element
 *   window.closeWaitlist() — closes the dialog, restores focus
 *
 * Also attaches a global delegated click listener for [data-open="waitlist"]
 * elements so the href="#mulai" fallback does not trigger a page jump.
 */

export {};

declare global {
  interface Window {
    openWaitlist: () => void;
    closeWaitlist: () => void;
  }
}

// ---------------------------------------------------------------------------
// Focusable elements for focus-trap
// ---------------------------------------------------------------------------
// I1: Exclude [tabindex="-1"] from every clause so the honeypot input (and
//     any other programmatically-focusable-but-not-tabbable element) is never
//     captured by the focus trap.
const FOCUSABLE =
  'a[href]:not([tabindex="-1"]), button:not([disabled]):not([tabindex="-1"]), ' +
  'input:not([disabled]):not([tabindex="-1"]), select:not([disabled]):not([tabindex="-1"]), ' +
  'textarea:not([disabled]):not([tabindex="-1"]), [tabindex]:not([tabindex="-1"])';

function getFocusable(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE));
}

function trapFocus(e: KeyboardEvent, container: HTMLElement) {
  const focusable = getFocusable(container);
  if (focusable.length === 0) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (e.shiftKey) {
    if (document.activeElement === first) {
      e.preventDefault();
      last.focus();
    }
  } else {
    if (document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
}

// ---------------------------------------------------------------------------
// State
// ---------------------------------------------------------------------------
let lastFocused: HTMLElement | null = null;
let keydownHandler: ((e: KeyboardEvent) => void) | null = null;

// ---------------------------------------------------------------------------
// Open / close
// ---------------------------------------------------------------------------
function openWaitlist() {
  const dialog = document.getElementById('waitlist-dialog') as HTMLElement | null;
  if (!dialog) return;

  // m2: Guard against double-open — if dialog is already visible, do nothing.
  // This prevents attaching a second keydownHandler on rapid repeated calls.
  if (!dialog.hasAttribute('hidden')) return;

  lastFocused = document.activeElement as HTMLElement;

  dialog.removeAttribute('hidden');
  dialog.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  // Move focus to first focusable element inside dialog.
  const focusable = getFocusable(dialog);
  if (focusable.length > 0) {
    focusable[0].focus();
  } else {
    dialog.focus();
  }

  keydownHandler = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeWaitlist();
      return;
    }
    if (e.key === 'Tab') {
      trapFocus(e, dialog);
    }
  };
  document.addEventListener('keydown', keydownHandler);
}

function closeWaitlist() {
  const dialog = document.getElementById('waitlist-dialog') as HTMLElement | null;
  if (!dialog) return;

  dialog.setAttribute('hidden', '');
  dialog.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';

  if (keydownHandler) {
    document.removeEventListener('keydown', keydownHandler);
    keydownHandler = null;
  }

  // Reset form state so it's clean on next open.
  resetDialog();

  // Return focus to the element that opened the dialog.
  lastFocused?.focus();
  lastFocused = null;
}

// ---------------------------------------------------------------------------
// Reset dialog to idle state
// ---------------------------------------------------------------------------
function resetDialog() {
  const form = document.getElementById('waitlist-form') as HTMLFormElement | null;
  const successView = document.getElementById('waitlist-success');
  const errorView = document.getElementById('waitlist-error');
  const formView = document.getElementById('waitlist-form-view');

  form?.reset();

  // Clear individual error messages.
  document.querySelectorAll('.waitlist-field-error').forEach((el) => {
    (el as HTMLElement).textContent = '';
    (el as HTMLElement).hidden = true;
  });

  // Show form, hide feedback views.
  if (formView) formView.hidden = false;
  if (successView) successView.hidden = true;
  if (errorView) errorView.hidden = true;
}

// ---------------------------------------------------------------------------
// Client-side validation helpers
// ---------------------------------------------------------------------------
function showFieldError(fieldId: string, message: string) {
  const errEl = document.getElementById(`${fieldId}-error`);
  if (errEl) {
    errEl.textContent = message;
    errEl.hidden = false;
  }
  const field = document.getElementById(fieldId) as HTMLElement | null;
  field?.setAttribute('aria-invalid', 'true');
}

function clearFieldError(fieldId: string) {
  const errEl = document.getElementById(`${fieldId}-error`);
  if (errEl) {
    errEl.textContent = '';
    errEl.hidden = true;
  }
  const field = document.getElementById(fieldId) as HTMLElement | null;
  field?.removeAttribute('aria-invalid');
}

function validateForm(form: HTMLFormElement): boolean {
  let valid = true;

  const nama = (form.elements.namedItem('nama') as HTMLInputElement)?.value.trim() ?? '';
  const whatsapp = (form.elements.namedItem('whatsapp') as HTMLInputElement)?.value.trim() ?? '';
  const peran = (form.elements.namedItem('peran') as HTMLSelectElement)?.value ?? '';
  const email = (form.elements.namedItem('email') as HTMLInputElement)?.value.trim() ?? '';

  clearFieldError('wl-nama');
  clearFieldError('wl-whatsapp');
  clearFieldError('wl-peran');
  clearFieldError('wl-email');

  if (!nama) {
    showFieldError('wl-nama', 'Nama wajib diisi.');
    valid = false;
  }

  if (!whatsapp) {
    showFieldError('wl-whatsapp', 'Nomor WhatsApp wajib diisi.');
    valid = false;
  } else if (!/^\+?[\d\s\-()]{7,20}$/.test(whatsapp)) {
    showFieldError('wl-whatsapp', 'Format nomor tidak valid.');
    valid = false;
  }

  if (!peran) {
    showFieldError('wl-peran', 'Pilih peran Anda.');
    valid = false;
  }

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showFieldError('wl-email', 'Format email tidak valid.');
    valid = false;
  }

  return valid;
}

// ---------------------------------------------------------------------------
// Submit handler
// ---------------------------------------------------------------------------
async function handleSubmit(e: SubmitEvent) {
  e.preventDefault();
  const form = e.currentTarget as HTMLFormElement;

  // Honeypot check (client-side guard; server also validates).
  const honeypot = (form.elements.namedItem('website') as HTMLInputElement)?.value ?? '';
  if (honeypot) return; // silently drop

  if (!validateForm(form)) return;

  const submitBtn = form.querySelector<HTMLButtonElement>('[type="submit"]');
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.textContent = 'Mengirim...';
  }

  const errorView = document.getElementById('waitlist-error');
  if (errorView) errorView.hidden = true;

  const payload = {
    nama: (form.elements.namedItem('nama') as HTMLInputElement)?.value.trim(),
    whatsapp: (form.elements.namedItem('whatsapp') as HTMLInputElement)?.value.trim(),
    peran: (form.elements.namedItem('peran') as HTMLSelectElement)?.value,
    email: (form.elements.namedItem('email') as HTMLInputElement)?.value.trim() || undefined,
    komunitas: (form.elements.namedItem('komunitas') as HTMLInputElement)?.value.trim() || undefined,
    // intentionally omit honeypot from payload
  };

  try {
    const res = await fetch('/api/waitlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = (await res.json()) as { ok: boolean; error?: string };

    if (data.ok) {
      const formView = document.getElementById('waitlist-form-view');
      const successView = document.getElementById('waitlist-success');
      if (formView) formView.hidden = true;
      if (successView) {
        successView.hidden = false;
        // Move focus to success message for screen readers.
        (successView.querySelector('[tabindex="-1"]') as HTMLElement)?.focus();
      }
    } else {
      if (errorView) {
        const errMsg = errorView.querySelector('.waitlist-error-msg');
        if (errMsg) errMsg.textContent = data.error ?? 'Terjadi kesalahan, silakan coba lagi.';
        errorView.hidden = false;
      }
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Kirim';
      }
    }
  } catch {
    if (errorView) {
      const errMsg = errorView.querySelector('.waitlist-error-msg');
      if (errMsg) errMsg.textContent = 'Koneksi gagal, silakan coba lagi.';
      errorView.hidden = false;
    }
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Kirim';
    }
  }
}

// ---------------------------------------------------------------------------
// Bootstrap
// ---------------------------------------------------------------------------
function init() {
  // Register globals.
  window.openWaitlist = openWaitlist;
  window.closeWaitlist = closeWaitlist;

  // Global delegated listener for [data-open="waitlist"].
  document.addEventListener('click', (e: MouseEvent) => {
    const target = (e.target as HTMLElement).closest('[data-open="waitlist"]');
    if (target) {
      e.preventDefault();
      openWaitlist();
    }
  });

  // Close button inside dialog (X button).
  document.getElementById('waitlist-close')?.addEventListener('click', closeWaitlist);

  // I5: CSP-safe "Tutup" button in the success view — wired here instead of
  //     using an inline onclick="window.closeWaitlist()" attribute.
  document.getElementById('waitlist-success-close')?.addEventListener('click', closeWaitlist);

  // Backdrop click closes dialog.
  const dialog = document.getElementById('waitlist-dialog');
  dialog?.addEventListener('click', (e: MouseEvent) => {
    const backdrop = document.getElementById('waitlist-backdrop');
    if (e.target === backdrop) {
      closeWaitlist();
    }
  });

  // Form submit.
  const form = document.getElementById('waitlist-form') as HTMLFormElement | null;
  form?.addEventListener('submit', (e) => handleSubmit(e as SubmitEvent));
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
