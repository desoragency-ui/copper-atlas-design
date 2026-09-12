import Link from 'next/link';
import { ArrowUpRight } from '@/components/Icons';

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[62vh] max-w-lg flex-col items-center justify-center px-6 text-center">
      <p className="eyebrow mb-8">404</p>
      <h1 className="font-display text-[clamp(40px,7vw,72px)] leading-[1]">Nothing here</h1>
      <p className="mt-5 text-[15.5px] opacity-60">
        This piece may have been renamed, or the link is wrong.
      </p>
      <div className="mt-9 flex flex-wrap justify-center gap-3">
        <Link href="/en/collections" className="btn btn-primary group/btn">
          Browse the collection
          <span className="btn-disc"><ArrowUpRight className="h-4 w-4" /></span>
        </Link>
        <Link href="/en" className="btn btn-ghost">Home</Link>
      </div>
    </div>
  );
}
