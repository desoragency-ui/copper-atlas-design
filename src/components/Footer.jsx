import Link from 'next/link';
import { Wordmark } from './Logo';
import { ArrowUpRight, Whatsapp } from './Icons';
import { dict, t } from '@/lib/i18n';
import { CATEGORIES } from '@/data/products';
import { SHOP, waLink } from '@/lib/shop';

export default function Footer({ lang }) {
  const d = dict(lang);

  const help = [
    { href: `/${lang}/guides`, label: lang === 'fr' ? 'Guides d’achat' : 'Buying guides' },
    { href: `/${lang}/faq`, label: d.faq },
    { href: `/${lang}/shipping`, label: d.shippingReturns },
    { href: `/${lang}/care`, label: d.care },
    { href: `/${lang}/contact`, label: d.contact },
  ];
  const about = [
    { href: `/${lang}/workshop`, label: d.workshop },
    { href: `/${lang}/trade`, label: d.trade },
  ];

  return (
    <footer className="relative mt-32 border-t edge" style={{ background: 'var(--ink)' }}>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 glow-warm opacity-40" />

      <div className="relative mx-auto max-w-[1320px] px-6 pb-12 pt-20 md:px-10">
        {/* newsletter */}
        <div className="bezel mb-20">
          <div className="bezel-core grid gap-8 px-7 py-10 md:grid-cols-[1.1fr_1fr] md:items-center md:px-12 md:py-14">
            <div>
              <p className="eyebrow mb-5">{SHOP.city}</p>
              <h2 className="font-display text-[clamp(30px,4vw,46px)] leading-[1.04]">{d.newsletter}</h2>
              <p className="mt-3 max-w-md text-[15px] opacity-65">{d.newsletterBody}</p>
            </div>
            <form className="flex flex-col gap-3 sm:flex-row" action={`/${lang}/contact`}>
              <label className="sr-only" htmlFor="nl">{d.emailPh}</label>
              <input id="nl" name="email" type="email" required placeholder={d.emailPh} className="field flex-1" />
              <button type="submit" className="btn btn-primary group/btn justify-between sm:justify-start">
                {d.subscribe}
                <span className="btn-disc"><ArrowUpRight className="h-4 w-4" /></span>
              </button>
            </form>
          </div>
        </div>

        <div className="grid gap-12 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <Wordmark />
            <p className="mt-6 max-w-xs text-[14px] leading-relaxed opacity-60">{d.handmade}</p>
            <a
              href={waLink('Hello Copper Atlas - I have a question.')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost group/btn mt-7"
            >
              WhatsApp
              <span className="btn-disc"><Whatsapp className="h-4 w-4" /></span>
            </a>
          </div>

          <FooterCol title={d.footerShop}>
            {CATEGORIES.map((c) => (
              <FooterLink key={c.slug} href={`/${lang}/collections/${c.slug}`}>{t(c.name, lang)}</FooterLink>
            ))}
            <FooterLink href={`/${lang}/collections`}>{d.allProducts}</FooterLink>
          </FooterCol>

          <FooterCol title={d.footerHelp}>
            {help.map((l) => <FooterLink key={l.href} href={l.href}>{l.label}</FooterLink>)}
          </FooterCol>

          <FooterCol title={d.footerAbout}>
            {about.map((l) => <FooterLink key={l.href} href={l.href}>{l.label}</FooterLink>)}
            <FooterLink href={SHOP.facebook} external>Facebook</FooterLink>
            <FooterLink href={SHOP.instagram} external>Instagram</FooterLink>
          </FooterCol>
        </div>

        <div className="rule my-12" />

        <div className="flex flex-col-reverse items-center justify-between gap-4 text-[11.5px] uppercase tracking-wide2 opacity-45 md:flex-row">
          <p>© {new Date().getFullYear()} {SHOP.name}. {d.rights}</p>
          <p>{SHOP.city}, {SHOP.country} · {SHOP.currency}</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }) {
  return (
    <div>
      <p className="label mb-5">{title}</p>
      <ul className="flex flex-col gap-3">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children, external }) {
  const cls = 'link-underline text-[14px] opacity-70 hover:opacity-100';
  return (
    <li>
      {external ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>{children}</a>
      ) : (
        <Link href={href} className={cls}>{children}</Link>
      )}
    </li>
  );
}
