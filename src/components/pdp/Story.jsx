import Reveal from '../Reveal';
import { dict, t } from '@/lib/i18n';
import { money } from '@/lib/shop';
import { sizeLabel, sizesFor } from '@/data/products';
import { story } from '@/data/stories';
import { Check, IconHammer, IconShip } from '../Icons';

/**
 * The long-form listing, in the shape the workshop writes its listings in:
 * lede → paragraphs → features → sizes & prices → craftsmanship → shipping →
 * custom orders → signoff.
 *
 * Everything that is identical across listings (shipping, custom orders, the
 * default craftsmanship note) comes from the dictionary; only the per-piece
 * parts come from src/data/stories.js. A product with no entry there renders
 * nothing and the page falls back to its short description.
 */
export default function Story({ product: p, lang }) {
  const st = story(p.slug);
  if (!st) return null;

  const d = dict(lang);

  // One ladder per finish when the finishes are priced apart, otherwise the
  // product's single ladder. Deduplicated so a shared ladder prints once.
  const ladders = [];
  for (const f of p.finishes) {
    const rows = sizesFor(p, f.id);
    if (!rows) continue;
    const seen = ladders.find((l) => l.rows === rows);
    if (seen) seen.finishes.push(f);
    else ladders.push({ rows, finishes: [f] });
  }

  return (
    <section className="mx-auto mt-24 max-w-[1120px] md:mt-32">
      <Reveal>
        <p className="eyebrow mb-7">{d.storyDescription}</p>
        <h2 className="max-w-[20ch] font-display text-[clamp(30px,4.4vw,52px)] leading-[1.06] text-balance">
          {t(st.seoTitle, lang).split('|')[0].trim()}
        </h2>
        <p className="mt-6 max-w-[62ch] text-[17px] leading-relaxed" style={{ color: 'var(--brass)' }}>
          {t(st.lede, lang)}
        </p>
      </Reveal>

      <div className="mt-12 grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        {/* ── the prose ─────────────────────────────────────────────────── */}
        <Reveal className="space-y-5 text-[16.5px] leading-[1.72] opacity-80 text-pretty">
          {t(st.body, lang).map((para) => (
            <p key={para.slice(0, 40)}>{para}</p>
          ))}
        </Reveal>

        {/* ── features ──────────────────────────────────────────────────── */}
        <Reveal>
          <div className="bezel h-full">
            <div className="bezel-core p-7 md:p-8">
              <p className="label mb-5">{d.storyFeatures}</p>
              <ul className="space-y-3.5">
                {st.features.map((f) => (
                  <li key={f.en} className="flex gap-3 text-[14.5px] leading-snug">
                    <span
                      className="mt-0.5 grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full"
                      style={{ background: 'rgba(224,169,109,0.14)', color: 'var(--brass)' }}
                      aria-hidden
                    >
                      <Check className="h-2.5 w-2.5" />
                    </span>
                    <span className="opacity-85">{t(f, lang)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>

      {/* ── sizes & prices ──────────────────────────────────────────────── */}
      {ladders.length > 0 && (
        <Reveal className="mt-14">
          <p className="label mb-5">{d.storySizes}</p>
          <div className={`grid gap-4 ${ladders.length > 1 ? 'md:grid-cols-2' : ''}`}>
            {ladders.map((l) => (
              <div key={l.finishes.map((f) => f.id).join('-')} className="bezel">
                <div className="bezel-core p-2">
                  {ladders.length > 1 && (
                    <p
                      className="px-4 pb-1 pt-3 text-[11px] uppercase tracking-wide2"
                      style={{ color: 'var(--brass)' }}
                    >
                      {l.finishes.map((f) => t(f.name, lang)).join(' · ')}
                    </p>
                  )}
                  <table className="w-full text-[14.5px]">
                    <tbody>
                      {l.rows.map((s) => (
                        <tr key={s.cm} className="border-b edge last:border-0">
                          <td className="px-4 py-3 tabular opacity-85">
                            {sizeLabel(s, lang)}
                            <span className="ml-2 text-[12px] opacity-45">{s.in}</span>
                          </td>
                          <td className="px-4 py-3 text-right tabular" style={{ color: 'var(--brass)' }}>
                            {money(s.price)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-3 text-[13px] opacity-50">{d.storyCustomSizes}</p>
        </Reveal>
      )}

      {/* ── craftsmanship / shipping / custom ───────────────────────────── */}
      <div className="mt-14 grid gap-4 md:grid-cols-3">
        <Panel icon={<IconHammer className="h-4 w-4" />} title={d.storyCraftTitle}>
          {st.craft ? t(st.craft, lang) : d.storyCraftBody}
        </Panel>
        <Panel icon={<IconShip className="h-4 w-4" />} title={d.storyShippingTitle}>
          {d.storyShippingBody}
        </Panel>
        <Panel title={d.storyCustomTitle}>{d.storyCustomBody}</Panel>
      </div>

      <Reveal className="mt-10 text-center">
        <p className="text-[11.5px] uppercase tracking-wide2 opacity-45">{d.storySignoff}</p>
      </Reveal>
    </section>
  );
}

function Panel({ icon, title, children }) {
  return (
    <Reveal>
      <div className="bezel h-full">
        <div className="bezel-core h-full p-6 md:p-7">
          <p className="mb-3 flex items-center gap-2.5 text-[11px] uppercase tracking-wide2" style={{ color: 'var(--brass)' }}>
            {icon}
            {title}
          </p>
          <p className="text-[14px] leading-relaxed opacity-72 text-pretty">{children}</p>
        </div>
      </div>
    </Reveal>
  );
}
