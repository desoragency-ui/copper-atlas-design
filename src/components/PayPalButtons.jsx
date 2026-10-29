'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * PayPal Smart Buttons (PayPal, Pay Later, and debit/credit card), drawn by
 * PayPal's own script. Card numbers are typed into PayPal's window, never into
 * this site - which keeps the store out of card-data compliance entirely.
 *
 * The browser only names the pieces; /api/paypal/create-order prices them and
 * /api/paypal/capture takes the money. Props are read through refs so the
 * buttons are drawn once, not torn down on every keystroke in the form.
 */
export default function PayPalButtons({ clientId, lang, items, customer, validate, onPaid, onError }) {
  const box = useRef(null);
  const live = useRef({});
  live.current = { lang, items, customer, validate, onPaid, onError };
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!clientId) return;
    let buttons;
    let cancelled = false;

    const locale = lang === 'fr' ? 'fr_FR' : 'en_US';
    const src =
      `https://www.paypal.com/sdk/js?client-id=${encodeURIComponent(clientId)}` +
      `&currency=USD&intent=capture&components=buttons&locale=${locale}`;

    loadScript(src)
      .then(() => {
        if (cancelled || !window.paypal || !box.current) return;
        buttons = window.paypal.Buttons({
          style: { layout: 'vertical', color: 'gold', shape: 'pill', label: 'pay', height: 50 },

          // Contact details first - the workshop needs a phone number to arrange delivery.
          onClick: (_data, actions) => (live.current.validate() ? actions.resolve() : actions.reject()),

          createOrder: async () => {
            const res = await fetch('/api/paypal/create-order', {
              method: 'POST',
              headers: { 'content-type': 'application/json' },
              body: JSON.stringify({
                lang: live.current.lang,
                // Only what identifies a line. Prices are worked out on the server.
                items: live.current.items.map(({ slug, finish, size, qty }) => ({ slug, finish, size, qty })),
              }),
            });
            const json = await res.json().catch(() => ({}));
            if (!res.ok || !json.id) throw new Error(json.error || 'create_failed');
            return json.id;
          },

          onApprove: async (data, actions) => {
            const res = await fetch('/api/paypal/capture', {
              method: 'POST',
              headers: { 'content-type': 'application/json' },
              body: JSON.stringify({
                orderId: data.orderID,
                customer: live.current.customer,
                lang: live.current.lang,
              }),
            });
            const json = await res.json().catch(() => ({}));
            // Card refused: reopen the PayPal window so the buyer can choose another way to pay.
            if (json.restart) return actions.restart();
            if (!res.ok || !json.ok) throw new Error(json.error || 'capture_failed');
            live.current.onPaid(json);
          },

          onError: () => live.current.onError(),
        });

        if (buttons.isEligible()) {
          buttons.render(box.current).then(() => !cancelled && setReady(true));
        }
      })
      .catch(() => !cancelled && live.current.onError());

    return () => {
      cancelled = true;
      try {
        buttons?.close();
      } catch {
        /* already gone */
      }
    };
  }, [clientId, lang]);

  return (
    <div className="relative min-h-[110px]">
      {!ready && (
        <div className="absolute inset-0 grid place-items-center rounded-full text-[12px] uppercase tracking-wide2 opacity-50">
          {lang === 'fr' ? 'Chargement de PayPal…' : 'Loading PayPal…'}
        </div>
      )}
      <div ref={box} />
    </div>
  );
}

/** Inject PayPal's script once per URL and resolve when window.paypal exists. */
function loadScript(src) {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector('script[data-paypal-sdk]');
    if (existing && existing.src === src && window.paypal) return resolve();
    // A different locale needs a fresh copy of the SDK.
    existing?.remove();
    delete window.paypal;

    const s = document.createElement('script');
    s.src = src;
    s.async = true;
    s.dataset.paypalSdk = '1';
    s.onload = () => resolve();
    s.onerror = () => reject(new Error('sdk_failed'));
    document.head.appendChild(s);
  });
}
