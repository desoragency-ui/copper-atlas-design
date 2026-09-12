import Checkout from '@/components/Checkout';
import { LANGS, dict } from '@/lib/i18n';

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return { title: dict(lang).checkout, robots: { index: false, follow: false } };
}

export default async function CheckoutPage({ params }) {
  const { lang } = await params;
  return <Checkout lang={lang} />;
}
