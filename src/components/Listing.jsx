'use client';

import { useMemo, useState } from 'react';
import ProductCard from './ProductCard';
import { ChevronDown, Close } from './Icons';
import { dict, t } from '@/lib/i18n';
import { fromPrice, CATEGORIES } from '@/data/products';

const FINISHES = [
  { id: 'gold', en: 'Gold Copper', fr: 'Cuivre Doré' },
  { id: 'oil-rubbed', en: 'Oil-Rubbed Copper', fr: 'Cuivre Patiné' },
  { id: 'verdigris', en: 'Living Verdigris', fr: 'Patine Verdigris' },
];

export default function Listing({ lang, products, showCategoryFilter = true }) {
  const d = dict(lang);
  const [finish, setFinish] = useState('all');
  const [cat, setCat] = useState('all');
  const [sort, setSort] = useState('featured');

  const list = useMemo(() => {
    let out = [...products];
    if (finish !== 'all') out = out.filter((p) => p.finishes.some((f) => f.id === finish));
    if (cat !== 'all') out = out.filter((p) => p.category === cat);

    const price = (p) => fromPrice(p) ?? Number.POSITIVE_INFINITY;
    if (sort === 'price-asc') out.sort((a, b) => price(a) - price(b));
    if (sort === 'price-desc') out.sort((a, b) => price(b) - price(a));
    if (sort === 'az') out.sort((a, b) => t(a.name, lang).localeCompare(t(b.name, lang)));
    if (sort === 'featured') out.sort((a, b) => (b.signature ? 1 : 0) - (a.signature ? 1 : 0));
    return out;
  }, [products, finish, cat, sort, lang]);

  const dirty = finish !== 'all' || cat !== 'all';

  return (
    <>
      <div className="sticky top-[86px] z-20 -mx-6 mb-10 px-6 py-3 md:-mx-10 md:px-10"
        style={{
          background: 'rgba(var(--bg-rgb),0.9)',
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
          borderBottom: '1px solid var(--edge)',
        }}
      >
        <div className="flex flex-wrap items-center gap-2.5">
          <Chip active={finish === 'all' && !dirty} onClick={() => { setFinish('all'); setCat('all'); }}>
            {d.filterAll}
          </Chip>

          {FINISHES.map((f) => (
            <Chip key={f.id} active={finish === f.id} onClick={() => setFinish(finish === f.id ? 'all' : f.id)}>
              <span
                className="h-2.5 w-2.5 rounded-full ring-1 ring-white/25"
                style={{
                  background:
                    f.id === 'gold' ? 'linear-gradient(135deg,#F0D9A8,#D9A85F)'
                    : f.id === 'oil-rubbed' ? 'linear-gradient(135deg,#A9603C,#6B3B26)'
                    : 'linear-gradient(135deg,#8FC4B4,#4E9A86)',
                }}
                aria-hidden
              />
              {f[lang] ?? f.en}
            </Chip>
          ))}

          {showCategoryFilter && (
            <Select
              label={d.filterCategory}
              value={cat}
              onChange={setCat}
              options={[
                { v: 'all', l: d.filterAll },
                ...CATEGORIES.map((c) => ({ v: c.slug, l: t(c.name, lang) })),
              ]}
            />
          )}

          <Select
            label={d.sort}
            value={sort}
            onChange={setSort}
            className="ml-auto"
            options={[
              { v: 'featured', l: d.sortFeatured },
              { v: 'price-asc', l: d.sortPriceLow },
              { v: 'price-desc', l: d.sortPriceHigh },
              { v: 'az', l: d.sortAZ },
            ]}
          />

          <span className="tabular hidden text-[12px] opacity-45 sm:block">
            {list.length} {d.results}
          </span>
        </div>
      </div>

      {list.length === 0 ? (
        <div className="flex flex-col items-center gap-5 py-28 text-center">
          <p className="text-[16px] opacity-60">{d.noResults}</p>
          <button
            onClick={() => { setFinish('all'); setCat('all'); }}
            className="btn btn-ghost"
          >
            <Close className="h-4 w-4" />
            {d.clearFilters}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p, i) => (
            <ProductCard key={p.slug} product={p} lang={lang} priority={i < 3} />
          ))}
        </div>
      )}
    </>
  );
}

function Chip({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[12px] uppercase tracking-wide2 transition-all duration-400 ease-atlas active:scale-95"
      style={{
        background: active ? 'var(--brass)' : 'rgba(242,234,223,0.05)',
        color: active ? 'var(--ink)' : 'rgba(242,234,223,0.8)',
        border: `1px solid ${active ? 'var(--brass)' : 'var(--edge)'}`,
      }}
    >
      {children}
    </button>
  );
}

function Select({ label, value, onChange, options, className = '' }) {
  return (
    <label className={`relative inline-flex items-center ${className}`}>
      <span className="sr-only">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none rounded-full py-2 pl-4 pr-9 text-[12px] uppercase tracking-wide2 transition-colors duration-400"
        style={{
          background: 'rgba(242,234,223,0.05)',
          border: '1px solid var(--edge)',
          color: 'rgba(242,234,223,0.8)',
        }}
      >
        {options.map((o) => (
          <option key={o.v} value={o.v} style={{ background: '#1f1a14', color: '#F2EADF' }}>
            {o.l}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 h-3.5 w-3.5 opacity-55" />
    </label>
  );
}
