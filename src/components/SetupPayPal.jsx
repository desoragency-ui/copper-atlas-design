'use client';

import { useState } from 'react';
import { ArrowUpRight, Check } from './Icons';

/**
 * The owner's "Connect PayPal" page. Hidden (noindex, not linked, not in the
 * sitemap) and locked behind SETUP_PASSWORD.
 *
 * It walks the owner through getting his PayPal keys, proves they work, then
 * hands him the exact lines to paste into Netlify. It never saves the keys:
 * they only go live from the host dashboard, which sits behind his own login.
 * The password lives in this component's memory only - a reload locks it again.
 */

const T = {
  en: {
    eyebrow: 'Owner only',
    title: 'Connect PayPal',
    lead: 'Link your PayPal account so customers can pay for every piece online, and the money goes straight to you.',
    lockedOff: 'This page is switched off. Ask your web agency to turn it on.',
    pw: 'Owner password',
    unlock: 'Unlock',
    wrong: 'Wrong password. Try again.',
    checking: 'Checking…',
    status: 'Store status',
    refresh: 'Refresh',
    ppOn: 'Connected - real money',
    ppTest: 'Connected - test mode (fake money)',
    ppOff: 'Not connected yet',
    ppBroken: 'Keys saved but PayPal refuses them - redo the steps below',
    shipSet: (n) => `Shipping under $400: $${n}`,
    shipUnset: 'Shipping fee not set - orders under $400 currently ship free',
    shipFree: (n) => `Orders over $${n} always ship free`,
    mailOn: 'Order emails: on',
    mailOff: 'Order emails: off (orders are only kept in the Netlify logs)',
    connect: 'Connect my PayPal',
    s1: 'Have a PayPal Business account',
    s1b: 'Not a personal one. If you do not have it yet, create it, then confirm your email and link your bank account.',
    s1cta: 'Open PayPal Business',
    s2: 'Open the PayPal developer page',
    s2b: 'Log in with the same PayPal account. It is free, nothing to install.',
    s2cta: 'Open PayPal Developer',
    s3: 'Create the app',
    s3b: 'Click "Create App". Name it Copper Atlas Store, choose "Merchant", then click "Create App" again.',
    s4: 'Copy your two keys here',
    s4b: 'On the app page you see a Client ID and a Secret (click "Show" to see the Secret). Start in test mode: buy something with fake money first, then come back with your real-money keys.',
    modeTest: 'Test (fake money)',
    modeLive: 'Real money',
    cid: 'Client ID',
    sec: 'Secret',
    show: 'Show',
    hide: 'Hide',
    check: 'Check my keys',
    ok: 'These keys work.',
    badKeys: 'PayPal does not accept these keys. Check you copied both in full, and that the mode above matches the page you copied them from (Sandbox = Test, Live = Real money).',
    unreachable: 'Could not reach PayPal. Check your internet and try again.',
    missing: 'Paste both keys first.',
    s5: 'Paste them into Netlify',
    s5b: 'Last step. This switches PayPal on for the whole store.',
    shipQ: 'Shipping fee for orders under $400 (USD)',
    copy: 'Copy all',
    copied: 'Copied',
    n1: 'Open app.netlify.com and log in.',
    n2: 'Click your store site.',
    n3: 'Click "Site configuration", then "Environment variables".',
    n4: 'Click "Add a variable", then "Import from a .env file".',
    n5: 'Paste what you copied, then click "Import variables".',
    n6: 'Click "Deploys", then "Trigger deploy", then "Deploy site".',
    n7: 'Wait about 2 minutes, come back here and press Refresh. It should say Connected.',
    openNetlify: 'Open Netlify',
    bank: 'Before switching to real money, ask your bank how PayPal payouts reach your Moroccan account, and whether there is a yearly limit.',
  },
  fr: {
    eyebrow: 'Propriétaire uniquement',
    title: 'Connecter PayPal',
    lead: 'Reliez votre compte PayPal pour que vos clients paient chaque pièce en ligne, et que l’argent arrive directement chez vous.',
    lockedOff: 'Cette page est désactivée. Demandez à votre agence web de l’activer.',
    pw: 'Mot de passe propriétaire',
    unlock: 'Déverrouiller',
    wrong: 'Mot de passe incorrect. Réessayez.',
    checking: 'Vérification…',
    status: 'État de la boutique',
    refresh: 'Actualiser',
    ppOn: 'Connecté - argent réel',
    ppTest: 'Connecté - mode test (faux argent)',
    ppOff: 'Pas encore connecté',
    ppBroken: 'Clés enregistrées mais refusées par PayPal - refaites les étapes ci-dessous',
    shipSet: (n) => `Livraison sous 400 $ : ${n} $`,
    shipUnset: 'Frais de livraison non définis - les commandes sous 400 $ sont livrées gratuitement',
    shipFree: (n) => `Livraison toujours offerte au-dessus de ${n} $`,
    mailOn: 'E-mails de commande : activés',
    mailOff: 'E-mails de commande : désactivés (les commandes restent seulement dans les journaux Netlify)',
    connect: 'Connecter mon PayPal',
    s1: 'Avoir un compte PayPal Business',
    s1b: 'Pas un compte personnel. Si vous n’en avez pas, créez-le, puis confirmez votre e-mail et reliez votre compte bancaire.',
    s1cta: 'Ouvrir PayPal Business',
    s2: 'Ouvrir la page développeur PayPal',
    s2b: 'Connectez-vous avec le même compte PayPal. C’est gratuit, rien à installer.',
    s2cta: 'Ouvrir PayPal Developer',
    s3: 'Créer l’application',
    s3b: 'Cliquez sur « Create App ». Nommez-la Copper Atlas Store, choisissez « Merchant », puis cliquez à nouveau sur « Create App ».',
    s4: 'Copiez vos deux clés ici',
    s4b: 'Sur la page de l’application, vous voyez un Client ID et un Secret (cliquez sur « Show » pour voir le Secret). Commencez en mode test : faites un achat avec du faux argent, puis revenez avec vos clés d’argent réel.',
    modeTest: 'Test (faux argent)',
    modeLive: 'Argent réel',
    cid: 'Client ID',
    sec: 'Secret',
    show: 'Voir',
    hide: 'Masquer',
    check: 'Vérifier mes clés',
    ok: 'Ces clés fonctionnent.',
    badKeys: 'PayPal refuse ces clés. Vérifiez que vous avez copié les deux en entier, et que le mode ci-dessus correspond à la page d’où vous les avez copiées (Sandbox = Test, Live = Argent réel).',
    unreachable: 'Impossible de joindre PayPal. Vérifiez votre connexion et réessayez.',
    missing: 'Collez d’abord les deux clés.',
    s5: 'Collez-les dans Netlify',
    s5b: 'Dernière étape. C’est elle qui active PayPal sur toute la boutique.',
    shipQ: 'Frais de livraison pour les commandes sous 400 $ (USD)',
    copy: 'Tout copier',
    copied: 'Copié',
    n1: 'Ouvrez app.netlify.com et connectez-vous.',
    n2: 'Cliquez sur le site de votre boutique.',
    n3: 'Cliquez sur « Site configuration », puis « Environment variables ».',
    n4: 'Cliquez sur « Add a variable », puis « Import from a .env file ».',
    n5: 'Collez ce que vous avez copié, puis cliquez sur « Import variables ».',
    n6: 'Cliquez sur « Deploys », puis « Trigger deploy », puis « Deploy site ».',
    n7: 'Attendez environ 2 minutes, revenez ici et cliquez sur Actualiser. Il doit être écrit Connecté.',
    openNetlify: 'Ouvrir Netlify',
    bank: 'Avant de passer à l’argent réel, demandez à votre banque comment les virements PayPal arrivent sur votre compte marocain, et s’il existe une limite annuelle.',
  },
};

export default function SetupPayPal({ lang }) {
  const t = T[lang] ?? T.en;

  const [pw, setPw] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [lockErr, setLockErr] = useState(null); // 'wrong' | 'off'
  const [busy, setBusy] = useState(false);
  const [st, setSt] = useState(null);

  const [open, setOpen] = useState(false);
  const [env, setEnv] = useState('sandbox');
  const [cid, setCid] = useState('');
  const [sec, setSec] = useState('');
  const [showSec, setShowSec] = useState(false);
  const [check, setCheck] = useState(null); // null | 'busy' | 'ok' | reason
  const [ship, setShip] = useState('');
  const [copied, setCopied] = useState(false);

  const call = async (payload) => {
    const res = await fetch('/api/setup', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ password: pw, ...payload }),
    });
    const json = await res.json().catch(() => ({}));
    return { res, json };
  };

  const loadStatus = async () => {
    setBusy(true);
    setLockErr(null);
    try {
      const { res, json } = await call({ action: 'status' });
      if (res.status === 503) return setLockErr('off');
      if (res.status === 401) return setLockErr('wrong');
      if (!res.ok) return setLockErr('off');
      setSt(json);
      setUnlocked(true);
      if (json.shippingFlat != null && ship === '') setShip(String(json.shippingFlat));
      if (!json.connected || !json.working) setOpen(true);
    } finally {
      setBusy(false);
    }
  };

  const runCheck = async () => {
    if (!cid.trim() || !sec.trim()) return setCheck('missing');
    setCheck('busy');
    const { json } = await call({ action: 'check', clientId: cid, secret: sec, env });
    setCheck(json.ok ? 'ok' : json.reason || 'unreachable');
  };

  const shipNum = Number(ship);
  const envBlock =
    `PAYPAL_CLIENT_ID=${cid.trim()}\n` +
    `PAYPAL_CLIENT_SECRET=${sec.trim()}\n` +
    `PAYPAL_ENV=${env}\n` +
    (ship !== '' && Number.isFinite(shipNum) && shipNum >= 0 ? `SHIPPING_FLAT_USD=${shipNum}\n` : '');

  const copyAll = async () => {
    try {
      await navigator.clipboard.writeText(envBlock);
    } catch {
      document.getElementById('env-block')?.select();
      document.execCommand?.('copy');
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  /* ── locked ──────────────────────────────────────────────────────────── */
  if (!unlocked) {
    return (
      <div className="mx-auto max-w-md px-6 py-24 md:py-32">
        <p className="eyebrow mb-6">{t.eyebrow}</p>
        <h1 className="font-display text-[clamp(36px,6vw,56px)] leading-[1.02]">{t.title}</h1>
        <p className="mt-4 text-[15px] leading-relaxed opacity-65">{t.lead}</p>

        <form
          className="mt-10"
          onSubmit={(e) => {
            e.preventDefault();
            if (pw) loadStatus();
          }}
        >
          <label>
            <span className="label">{t.pw}</span>
            <input
              type="password"
              autoComplete="current-password"
              className="field"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
            />
          </label>
          {lockErr && (
            <p className="mt-3 text-[13px]" style={{ color: '#E8907A' }}>
              {lockErr === 'off' ? t.lockedOff : t.wrong}
            </p>
          )}
          <button type="submit" disabled={busy || !pw} className="btn btn-primary group/btn mt-6 disabled:opacity-60">
            {busy ? t.checking : t.unlock}
            <span className="btn-disc"><ArrowUpRight className="h-4 w-4" /></span>
          </button>
        </form>
      </div>
    );
  }

  /* ── unlocked ────────────────────────────────────────────────────────── */
  const ppLine = !st.connected ? t.ppOff : !st.working ? t.ppBroken : st.env === 'live' ? t.ppOn : t.ppTest;
  const ppGood = st.connected && st.working;

  return (
    <div className="mx-auto max-w-3xl px-6 pb-28 pt-12 md:pt-16">
      <p className="eyebrow mb-6">{t.eyebrow}</p>
      <h1 className="font-display text-[clamp(36px,6vw,56px)] leading-[1.02]">{t.title}</h1>
      <p className="mt-4 max-w-[56ch] text-[15px] leading-relaxed opacity-65">{t.lead}</p>

      {/* status */}
      <div className="bezel mt-10">
        <div className="bezel-core p-6 md:p-7">
          <div className="mb-5 flex items-center justify-between gap-4">
            <p className="label !mb-0">{t.status}</p>
            <button onClick={loadStatus} disabled={busy} className="link-underline text-[12px] uppercase tracking-wide2" style={{ color: 'var(--brass)' }}>
              {busy ? t.checking : t.refresh}
            </button>
          </div>
          <ul className="space-y-3 text-[14.5px]">
            <Row good={ppGood} warn={st.connected && !st.working}>
              PayPal: {ppLine}
              {st.clientIdTail && <span className="ml-2 tabular opacity-40">…{st.clientIdTail}</span>}
            </Row>
            <Row good={st.shippingFlat != null} warn={st.shippingFlat == null}>
              {st.shippingFlat != null ? t.shipSet(st.shippingFlat) : t.shipUnset}
            </Row>
            <Row good>{t.shipFree(st.freeShippingOver)}</Row>
            <Row good={st.email} warn={!st.email}>{st.email ? t.mailOn : t.mailOff}</Row>
          </ul>
        </div>
      </div>

      {!open && (
        <button onClick={() => setOpen(true)} className="btn btn-primary group/btn mt-8">
          {t.connect}
          <span className="btn-disc"><ArrowUpRight className="h-4 w-4" /></span>
        </button>
      )}

      {open && (
        <ol className="mt-12 space-y-10">
          <Step n={1} title={t.s1} body={t.s1b}>
            <a href="https://www.paypal.com/business" target="_blank" rel="noopener noreferrer" className="btn btn-ghost group/btn">
              {t.s1cta}
              <span className="btn-disc"><ArrowUpRight className="h-4 w-4" /></span>
            </a>
          </Step>

          <Step n={2} title={t.s2} body={t.s2b}>
            <a
              href={`https://developer.paypal.com/dashboard/applications/${env === 'live' ? 'live' : 'sandbox'}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost group/btn"
            >
              {t.s2cta}
              <span className="btn-disc"><ArrowUpRight className="h-4 w-4" /></span>
            </a>
          </Step>

          <Step n={3} title={t.s3} body={t.s3b} />

          <Step n={4} title={t.s4} body={t.s4b}>
            <div className="flex flex-wrap gap-2" role="radiogroup">
              {[
                ['sandbox', t.modeTest],
                ['live', t.modeLive],
              ].map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  role="radio"
                  aria-checked={env === id}
                  onClick={() => {
                    setEnv(id);
                    setCheck(null);
                  }}
                  className="rounded-full px-5 py-2.5 text-[12px] uppercase tracking-wide2 transition-all duration-400 ease-atlas"
                  style={{
                    background: env === id ? 'var(--brass)' : 'rgba(242,234,223,0.05)',
                    color: env === id ? 'var(--ink)' : 'inherit',
                    border: `1px solid ${env === id ? 'var(--brass)' : 'var(--edge)'}`,
                  }}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="mt-6 grid gap-5">
              <label>
                <span className="label">{t.cid}</span>
                <input
                  className="field font-mono text-[13px]"
                  value={cid}
                  spellCheck={false}
                  autoComplete="off"
                  onChange={(e) => {
                    setCid(e.target.value);
                    setCheck(null);
                  }}
                />
              </label>
              <label>
                <span className="label flex items-center justify-between">
                  <span>{t.sec}</span>
                  <button type="button" onClick={() => setShowSec((v) => !v)} className="link-underline normal-case tracking-normal" style={{ color: 'var(--brass)' }}>
                    {showSec ? t.hide : t.show}
                  </button>
                </span>
                <input
                  className="field font-mono text-[13px]"
                  type={showSec ? 'text' : 'password'}
                  value={sec}
                  spellCheck={false}
                  autoComplete="off"
                  onChange={(e) => {
                    setSec(e.target.value);
                    setCheck(null);
                  }}
                />
              </label>
            </div>

            <button type="button" onClick={runCheck} disabled={check === 'busy'} className="btn btn-primary group/btn mt-6 disabled:opacity-60">
              {check === 'busy' ? t.checking : t.check}
              <span className="btn-disc"><Check className="h-4 w-4" /></span>
            </button>

            {check && check !== 'busy' && (
              <p
                className="mt-4 rounded-2xl px-4 py-3 text-[13.5px]"
                style={
                  check === 'ok'
                    ? { background: 'rgba(78,154,134,0.14)', border: '1px solid rgba(78,154,134,0.4)' }
                    : { background: 'rgba(200,90,60,0.14)', border: '1px solid rgba(200,90,60,0.4)' }
                }
              >
                {check === 'ok' ? t.ok : check === 'invalid_client' ? t.badKeys : check === 'missing' ? t.missing : t.unreachable}
              </p>
            )}
          </Step>

          {check === 'ok' && (
            <Step n={5} title={t.s5} body={t.s5b}>
              <label className="block max-w-xs">
                <span className="label">{t.shipQ}</span>
                <input
                  className="field tabular"
                  inputMode="decimal"
                  placeholder="45"
                  value={ship}
                  onChange={(e) => setShip(e.target.value.replace(/[^0-9.]/g, ''))}
                />
              </label>

              <div className="bezel mt-6">
                <div className="bezel-core p-2">
                  <textarea
                    id="env-block"
                    readOnly
                    rows={envBlock.split('\n').length}
                    value={envBlock.trimEnd()}
                    className="w-full resize-none bg-transparent px-4 py-3 font-mono text-[12.5px] leading-relaxed outline-none"
                    onFocus={(e) => e.target.select()}
                  />
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-3">
                <button type="button" onClick={copyAll} className="btn btn-primary group/btn">
                  {copied ? t.copied : t.copy}
                  <span className="btn-disc"><Check className="h-4 w-4" /></span>
                </button>
                <a href="https://app.netlify.com" target="_blank" rel="noopener noreferrer" className="btn btn-ghost group/btn">
                  {t.openNetlify}
                  <span className="btn-disc"><ArrowUpRight className="h-4 w-4" /></span>
                </a>
              </div>

              <ol className="mt-8 list-decimal space-y-2.5 pl-5 text-[14.5px] leading-relaxed opacity-80 marker:opacity-50">
                {[t.n1, t.n2, t.n3, t.n4, t.n5, t.n6, t.n7].map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ol>

              {env === 'live' && (
                <p className="mt-6 rounded-2xl px-4 py-3 text-[13px] opacity-85"
                  style={{ background: 'rgba(224,169,109,0.08)', border: '1px solid rgba(224,169,109,0.25)' }}>
                  {t.bank}
                </p>
              )}
            </Step>
          )}
        </ol>
      )}
    </div>
  );
}

function Row({ good, warn, children }) {
  const color = warn ? '#E8B07A' : good ? 'var(--verdigris)' : 'rgba(242,234,223,0.4)';
  return (
    <li className="flex items-start gap-3">
      <span className="mt-[7px] h-2 w-2 shrink-0 rounded-full" style={{ background: color, boxShadow: `0 0 10px ${color}` }} aria-hidden />
      <span className="opacity-85">{children}</span>
    </li>
  );
}

function Step({ n, title, body, children }) {
  return (
    <li className="grid grid-cols-[auto_1fr] gap-5">
      <span
        className="grid h-9 w-9 place-items-center rounded-full font-display text-[17px] tabular"
        style={{ border: '1px solid rgba(224,169,109,0.4)', color: 'var(--brass)' }}
        aria-hidden
      >
        {n}
      </span>
      <div className="min-w-0">
        <h2 className="font-display text-[clamp(22px,2.6vw,28px)] leading-tight">{title}</h2>
        {body && <p className="mt-2 max-w-[60ch] text-[14.5px] leading-relaxed opacity-65">{body}</p>}
        {children && <div className="mt-5">{children}</div>}
      </div>
    </li>
  );
}
