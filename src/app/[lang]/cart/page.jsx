import CartPageInner from '@/components/CartPageInner';
import { LANGS, dict } from '@/lib/i18n';

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return { title: dict(lang).cartTitle, robots: { index: false, follow: false } };
}

export default async function CartPage({ params }) {
  const { lang } = await params;
  return <CartPageInner lang={lang} />;
}
