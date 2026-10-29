import SetupPayPal from '@/components/SetupPayPal';
import { LANGS } from '@/lib/i18n';

/**
 * The owner's private page. Not linked from anywhere, not in the sitemap, and
 * told to stay out of search results. Deliberately NOT listed in robots.txt
 * either - a Disallow line would advertise the address to anyone reading it.
 */
export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return {
    title: lang === 'fr' ? 'Connecter PayPal' : 'Connect PayPal',
    robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
  };
}

export default async function SetupPage({ params }) {
  const { lang } = await params;
  return <SetupPayPal lang={lang} />;
}
