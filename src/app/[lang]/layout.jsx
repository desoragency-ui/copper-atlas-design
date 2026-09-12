import { Cormorant_Garamond, Jost } from 'next/font/google';
import '../globals.css';
import { CartProvider } from '@/lib/cart';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import Announce from '@/components/Announce';
import { LANGS, dict } from '@/lib/i18n';
import { SHOP } from '@/lib/shop';

const display = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-display',
  display: 'swap',
});

const sans = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-sans',
  display: 'swap',
});

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const fr = lang === 'fr';
  return {
    metadataBase: new URL(SHOP.url),
    title: {
      default: fr
        ? 'Copper Atlas Design — Luminaires & Vasques en Cuivre Martelé, Marrakech'
        : 'Copper Atlas Design — Hand-Hammered Copper Lighting & Basins, Marrakech',
      template: `%s · ${SHOP.name}`,
    },
    description: fr
      ? 'Suspensions, appliques, vasques et éviers en cuivre et laiton martelés à la main à Marrakech. Fabriqués à la commande, expédiés dans le monde entier.'
      : 'Pendant lights, sconces, vessel basins and farmhouse sinks raised by hand from copper and brass in Marrakech. Made to order, shipped worldwide.',
    alternates: {
      canonical: `${SHOP.url}/${lang}`,
      languages: { en: `${SHOP.url}/en`, fr: `${SHOP.url}/fr`, 'x-default': `${SHOP.url}/en` },
    },
    openGraph: {
      type: 'website',
      siteName: SHOP.name,
      locale: fr ? 'fr_FR' : 'en_US',
      url: `${SHOP.url}/${lang}`,
      images: ['/products/atlas-verdigris-dome-pendant/01.webp'],
    },
    twitter: { card: 'summary_large_image' },
    robots: { index: true, follow: true },
  };
}

export const viewport = {
  themeColor: '#0E2B24',
  width: 'device-width',
  initialScale: 1,
};

export default async function LangLayout({ children, params }) {
  const { lang } = await params;
  const d = dict(lang);

  // Store + WebSite graph. A single @graph keeps the entities linked so Google
  // treats the brand, the shop and the site as one knowledge-panel subject.
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['Organization', 'Store', 'HomeGoodsStore'],
        '@id': `${SHOP.url}/#org`,
        name: SHOP.name,
        alternateName: 'Creation El Ouirgani Tarik Design',
        url: SHOP.url,
        email: SHOP.email,
        telephone: `+${SHOP.whatsapp}`,
        description:
          lang === 'fr'
            ? 'Atelier de dinanderie à Marrakech : luminaires, vasques et éviers en cuivre et laiton martelés à la main, fabriqués à la commande.'
            : 'Coppersmith workshop in Marrakech making hand-hammered copper and brass lighting, vessel basins and kitchen sinks to order.',
        foundingDate: '2005',
        sameAs: [SHOP.facebook, SHOP.instagram],
        address: {
          '@type': 'PostalAddress',
          addressLocality: SHOP.city,
          addressRegion: 'Marrakech-Safi',
          addressCountry: 'MA',
        },
        areaServed: 'Worldwide',
        currenciesAccepted: SHOP.currency,
        knowsLanguage: ['en', 'fr', 'ar'],
        makesOffer: {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: lang === 'fr' ? 'Dinanderie sur mesure' : 'Bespoke coppersmithing',
          },
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${SHOP.url}/#website`,
        url: SHOP.url,
        name: SHOP.name,
        inLanguage: lang,
        publisher: { '@id': `${SHOP.url}/#org` },
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${SHOP.url}/${lang}/collections?q={search_term_string}`,
          },
          'query-input': 'required name=search_term_string',
        },
      },
    ],
  };

  return (
    <html lang={lang} className={`${display.variable} ${sans.variable}`}>
      <body className="grain">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-[--brass] focus:px-5 focus:py-3 focus:text-[--ink]"
        >
          {d.skip}
        </a>

        <CartProvider>
          <Announce lang={lang} />
          <Header lang={lang} />
          <main id="main" className="pt-[92px] md:pt-[104px]">
            {children}
          </main>
          <Footer lang={lang} />
          <CartDrawer lang={lang} />
        </CartProvider>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
        />
      </body>
    </html>
  );
}
