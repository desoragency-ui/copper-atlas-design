/**
 * Tells the workshop about an order. Uses Resend when RESEND_API_KEY and
 * ORDER_EMAIL_TO are set; otherwise writes the order to the platform logs so
 * nothing is silently lost. Returns false only when a configured send failed.
 */
export async function notifyWorkshop({ subject, text, replyTo }) {
  const to = process.env.ORDER_EMAIL_TO;
  const key = process.env.RESEND_API_KEY;

  if (!key || !to) {
    console.log(`[order] (no RESEND_API_KEY/ORDER_EMAIL_TO configured) ${subject}\n`, text);
    return true;
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { authorization: `Bearer ${key}`, 'content-type': 'application/json' },
      body: JSON.stringify({
        from: process.env.ORDER_EMAIL_FROM || 'orders@copperatlasdesign.com',
        to: [to],
        ...(replyTo ? { reply_to: replyTo } : {}),
        subject,
        text,
      }),
    });
    if (!res.ok) throw new Error(`Resend ${res.status}`);
    return true;
  } catch (err) {
    console.error('[order] email failed', subject, err);
    return false;
  }
}
