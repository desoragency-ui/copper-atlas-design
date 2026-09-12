/**
 * Copper Atlas Design - product catalogue.
 *
 * ── HOW TO EDIT ─────────────────────────────────────────────────────────────
 * This file is the single source of truth for the whole storefront. Changing a
 * price, a name, a spec or a photo order here updates the listing pages, the
 * product pages, the cart, the sitemap and the structured data at once.
 *
 * PRICING
 * Lamps use `sizes[]` - Tarik's confirmed retail list, USD:
 * 25cm $167 · 30cm $192 · 35cm $236 · 40cm $282 · 45cm $332 · 50cm $384
 * Sinks, basins and spa pieces are `priceOnRequest: true` until Tarik sends
 * his sink price sheet. Replace with `price: <usd>` (or a `sizes[]` array)
 * and the "Price on request" CTA turns into a normal Add-to-cart button.
 *
 * FINISHES
 * Both finishes currently carry the same price. If Oil-Rubbed ends up costing
 * more, add `priceDelta: <usd>` to that finish and it is added per unit.
 * ────────────────────────────────────────────────────────────────────────────
 */

// Tarik's confirmed lamp price ladder.
const LAMP_SIZES = [
  { cm: 25, in: '9.8"', price: 167 },
  { cm: 30, in: '11.8"', price: 192 },
  { cm: 35, in: '13.8"', price: 236 },
  { cm: 40, in: '15.7"', price: 282 },
  { cm: 45, in: '17.7"', price: 332 },
  { cm: 50, in: '19.7"', price: 384 },
];

const GOLD = {
  id: 'gold',
  name: { en: 'Gold Copper', fr: 'Cuivre Doré' },
  hint: { en: 'Polished, warm, reflective', fr: 'Poli, chaud, réfléchissant' },
  swatch: '#D9A85F',
  swatch2: '#F0D9A8',
};

const OIL = {
  id: 'oil-rubbed',
  name: { en: 'Oil-Rubbed Copper', fr: 'Cuivre Patiné' },
  hint: { en: 'Deep, aged, matte', fr: 'Profond, vieilli, mat' },
  swatch: '#6B3B26',
  swatch2: '#A9603C',
};

const VERDIGRIS = {
  id: 'verdigris',
  name: { en: 'Living Verdigris', fr: 'Patine Verdigris' },
  hint: { en: 'Oxidised turquoise, one of a kind', fr: 'Turquoise oxydé, unique' },
  swatch: '#4E9A86',
  swatch2: '#8FC4B4',
};

/** Build `/products/<slug>/NN.webp` paths from image numbers. */
const img = (slug, ns) => ns.map((n) => `/products/${slug}/${String(n).padStart(2, '0')}.webp`);

export const CATEGORIES = [
  {
    slug: 'pendant-lights',
    name: { en: 'Pendant Lights', fr: 'Suspensions' },
    blurb: {
      en: 'Hand-raised domes and petals that throw warm, living light across a room.',
      fr: 'Dômes et pétales martelés à la main qui diffusent une lumière chaude et vivante.',
    },
    cover: '/products/atlas-verdigris-dome-pendant/01.webp',
  },
  {
    slug: 'ceiling-lights',
    name: { en: 'Ceiling Lights', fr: 'Plafonniers' },
    blurb: {
      en: 'Pierced lanterns that turn a plain ceiling into lacework.',
      fr: 'Lanternes ciselées qui transforment un plafond nu en dentelle.',
    },
    cover: '/products/riad-flush-ceiling-light/01.webp',
  },
  {
    slug: 'wall-sconces',
    name: { en: 'Wall Sconces', fr: 'Appliques' },
    blurb: {
      en: 'A single sheet of copper, folded once, left to oxidise on its own terms.',
      fr: 'Une feuille de cuivre, pliée une fois, laissée libre de s’oxyder.',
    },
    cover: '/products/cascade-wall-sconce/01.webp',
  },
  {
    slug: 'basins',
    name: { en: 'Vessel Basins', fr: 'Vasques' },
    blurb: {
      en: 'Fluted, engraved and hammered basins raised from a single disc.',
      fr: 'Vasques cannelées, gravées et martelées, formées d’un seul disque.',
    },
    cover: '/products/zahra-fluted-basin/01.webp',
  },
  {
    slug: 'kitchen-sinks',
    name: { en: 'Kitchen Sinks', fr: 'Éviers' },
    blurb: {
      en: 'Farmhouse and workstation sinks built to outlive the kitchen around them.',
      fr: 'Éviers de ferme et plans de travail conçus pour survivre à la cuisine.',
    },
    cover: '/products/medallion-farmhouse-sink-copper/01.webp',
  },
  {
    slug: 'spa-hammam',
    name: { en: 'Spa & Hammam', fr: 'Spa & Hammam' },
    blurb: {
      en: 'Copper vessels for the ritual half of the bathroom.',
      fr: 'Récipients en cuivre pour la part rituelle de la salle de bain.',
    },
    cover: '/products/hammam-bath-bowl/01.webp',
  },
];

export const PRODUCTS = [
  /* ─────────────────────────── PENDANT LIGHTS ─────────────────────────── */
  {
    slug: 'lotus-cluster-pendant',
    category: 'pendant-lights',
    sku: 'CA-LTS',
    signature: true,
    badge: { en: 'Signature piece', fr: 'Pièce signature' },
    name: { en: 'Lotus Cluster Pendant', fr: 'Suspension Lotus Trio' },
    tagline: {
      en: 'Three folded petals, hung at three heights',
      fr: 'Trois pétales pliés, suspendus à trois hauteurs',
    },
    description: {
      en: 'Each petal starts as a flat brass disc and is hammered by hand until it curls in on itself - the fold is what holds the light. Hung as a cluster of three from one matte-black canopy, the shades sit at different drops so the light layers instead of flattening. No two petals fold the same way.',
      fr: 'Chaque pétale part d’un disque de laiton plat, martelé à la main jusqu’à s’enrouler sur lui-même - c’est le pli qui retient la lumière. Suspendus en grappe de trois sous une même rosace noir mat, les abat-jour tombent à des hauteurs différentes pour superposer la lumière au lieu de l’aplatir. Aucun pétale ne se plie deux fois pareil.',
    },
    finishes: [
      { ...GOLD, images: img('lotus-cluster-pendant', [1, 2, 3, 4, 5, 6, 13]) },
      { ...OIL, images: img('lotus-cluster-pendant', [7, 8, 9, 10, 11, 12, 14]) },
    ],
    sizes: LAMP_SIZES,
    specs: [
      { k: { en: 'Material', fr: 'Matière' }, v: { en: 'Solid brass', fr: 'Laiton massif' } },
      { k: { en: 'Finish', fr: 'Finition' }, v: { en: 'Hand-hammered', fr: 'Martelé main' } },
      { k: { en: 'Shade size', fr: 'Abat-jour' }, v: { en: '27 × 18 cm', fr: '27 × 18 cm' } },
      { k: { en: 'Canopy', fr: 'Rosace' }, v: { en: '30 cm, matte black', fr: '30 cm, noir mat' } },
      { k: { en: 'Drop', fr: 'Hauteur' }, v: { en: '150 cm, adjustable', fr: '150 cm, ajustable' } },
      { k: { en: 'Lights', fr: 'Points lumineux' }, v: { en: '3 × E27', fr: '3 × E27' } },
      { k: { en: 'Voltage', fr: 'Tension' }, v: { en: '110-240 V', fr: '110-240 V' } },
      { k: { en: 'Bulbs', fr: 'Ampoules' }, v: { en: 'Not included', fr: 'Non incluses' } },
    ],
  },
  {
    slug: 'atlas-verdigris-dome-pendant',
    category: 'pendant-lights',
    sku: 'CA-VDP',
    signature: true,
    badge: { en: 'Living patina', fr: 'Patine vivante' },
    name: { en: 'Atlas Verdigris Dome', fr: 'Dôme Atlas Verdigris' },
    tagline: {
      en: 'Polished above, oxidised below - the line is never the same twice',
      fr: 'Poli en haut, oxydé en bas - la ligne n’est jamais deux fois la même',
    },
    description: {
      en: 'The dome is spun, polished to a mirror, then half-buried in a patina bath. Where the two meet, the metal draws its own coastline - a ragged turquoise horizon no one can redraw on purpose. The inside stays bare so the bulb bounces gold, not green.',
      fr: 'Le dôme est repoussé, poli miroir, puis à demi plongé dans un bain de patine. À la rencontre des deux, le métal dessine son propre littoral - un horizon turquoise déchiqueté que personne ne peut refaire à l’identique. L’intérieur reste nu pour que l’ampoule renvoie de l’or, pas du vert.',
    },
    finishes: [
      { ...GOLD, images: img('atlas-verdigris-dome-pendant', [1, 2, 3, 4, 5]) },
      { ...OIL, images: img('atlas-verdigris-dome-pendant', [6, 7, 8, 9, 10, 11]) },
    ],
    sizes: LAMP_SIZES,
    specs: [
      { k: { en: 'Material', fr: 'Matière' }, v: { en: 'Copper / brass', fr: 'Cuivre / laiton' } },
      { k: { en: 'Finish', fr: 'Finition' }, v: { en: 'Polished + live patina', fr: 'Poli + patine vivante' } },
      { k: { en: 'Interior', fr: 'Intérieur' }, v: { en: 'Bare polished metal', fr: 'Métal poli nu' } },
      { k: { en: 'Drop', fr: 'Hauteur' }, v: { en: '150 cm, adjustable', fr: '150 cm, ajustable' } },
      { k: { en: 'Lights', fr: 'Points lumineux' }, v: { en: '1 × E27', fr: '1 × E27' } },
      { k: { en: 'Voltage', fr: 'Tension' }, v: { en: '110-240 V', fr: '110-240 V' } },
    ],
  },
  {
    slug: 'sahara-wide-dome-pendant',
    category: 'pendant-lights',
    sku: 'CA-SWD',
    name: { en: 'Sahara Wide Dome', fr: 'Dôme Large Sahara' },
    tagline: {
      en: 'A low, wide shade that pools light on a table',
      fr: 'Un abat-jour bas et large qui pose la lumière sur la table',
    },
    description: {
      en: 'Hammered flat and wide rather than deep, so the light falls in a broad circle instead of a spotlight. Sized for a round dining table - hang it 75-85 cm above the top and it lights the food, not the faces.',
      fr: 'Martelé large et plat plutôt que profond, la lumière tombe en large cercle plutôt qu’en faisceau. Pensé pour une table ronde - suspendez-le à 75-85 cm du plateau et il éclaire les plats, pas les visages.',
    },
    finishes: [
      { ...OIL, images: img('sahara-wide-dome-pendant', [1, 2, 3, 4, 5]) },
      { ...GOLD, images: img('sahara-wide-dome-pendant', [1, 2, 3, 4, 5]) },
    ],
    sizes: LAMP_SIZES,
    specs: [
      { k: { en: 'Material', fr: 'Matière' }, v: { en: 'Hammered brass', fr: 'Laiton martelé' } },
      { k: { en: 'Profile', fr: 'Profil' }, v: { en: 'Wide, shallow', fr: 'Large, peu profond' } },
      { k: { en: 'Lights', fr: 'Points lumineux' }, v: { en: '1 × E27', fr: '1 × E27' } },
      { k: { en: 'Drop', fr: 'Hauteur' }, v: { en: '150 cm, adjustable', fr: '150 cm, ajustable' } },
    ],
  },
  {
    slug: 'kasbah-dome-pendant',
    category: 'pendant-lights',
    sku: 'CA-KDP',
    name: { en: 'Kasbah Dome Pendant', fr: 'Suspension Dôme Kasbah' },
    tagline: {
      en: 'Dark outside, molten inside',
      fr: 'Sombre dehors, incandescent dedans',
    },
    description: {
      en: 'The outside is taken almost to black; the inside is left raw copper. Switched off it reads as a dark sculptural mass. Switched on, the bowl fills with orange. Built for the run above a kitchen island.',
      fr: 'L’extérieur est poussé presque au noir ; l’intérieur reste cuivre brut. Éteint, c’est une masse sculpturale sombre. Allumé, la coupe se remplit d’orange. Conçu pour la ligne au-dessus d’un îlot de cuisine.',
    },
    finishes: [
      { ...OIL, images: img('kasbah-dome-pendant', [1, 2, 3, 4, 5]) },
      { ...GOLD, images: img('kasbah-dome-pendant', [1, 2, 3, 4, 5]) },
    ],
    sizes: LAMP_SIZES,
    specs: [
      { k: { en: 'Material', fr: 'Matière' }, v: { en: 'Hammered copper', fr: 'Cuivre martelé' } },
      { k: { en: 'Interior', fr: 'Intérieur' }, v: { en: 'Raw copper', fr: 'Cuivre brut' } },
      { k: { en: 'Lights', fr: 'Points lumineux' }, v: { en: '1 × E27', fr: '1 × E27' } },
    ],
  },
  {
    slug: 'oasis-wave-pendant',
    category: 'pendant-lights',
    sku: 'CA-OWP',
    name: { en: 'Oasis Wave Pendant', fr: 'Suspension Vague Oasis' },
    tagline: {
      en: 'Chiselled waves that throw a rippled shadow',
      fr: 'Vagues ciselées qui projettent une ombre ondulée',
    },
    description: {
      en: 'Every wave is punched through by hand with a chisel, one strike at a time. Lit, the shade stops being an object and becomes a projector - the wall behind it moves. Hung from a brass chain rather than cable.',
      fr: 'Chaque vague est percée à la main au burin, coup par coup. Allumé, l’abat-jour cesse d’être un objet et devient un projecteur - le mur derrière lui s’anime. Suspendu par chaîne de laiton plutôt que par câble.',
    },
    finishes: [{ ...GOLD, images: img('oasis-wave-pendant', [1, 2, 3, 4, 5]) }],
    sizes: LAMP_SIZES,
    specs: [
      { k: { en: 'Material', fr: 'Matière' }, v: { en: 'Pierced brass', fr: 'Laiton ajouré' } },
      { k: { en: 'Suspension', fr: 'Suspension' }, v: { en: 'Brass chain', fr: 'Chaîne laiton' } },
      { k: { en: 'Lights', fr: 'Points lumineux' }, v: { en: '1 × E27', fr: '1 × E27' } },
    ],
  },
  {
    slug: 'souk-globe-pendant',
    category: 'pendant-lights',
    sku: 'CA-SGP',
    name: { en: 'Souk Globe Pendant', fr: 'Globe Souk' },
    tagline: {
      en: 'A lattice sphere that scatters light to the corners',
      fr: 'Une sphère ajourée qui projette la lumière jusqu’aux angles',
    },
    description: {
      en: 'A full sphere pierced in a diamond lattice, open at the base so the work surface below stays properly lit. Above, the pattern climbs the ceiling. The two jobs a kitchen light has to do, done by one piece.',
      fr: 'Une sphère entière ajourée en losanges, ouverte à la base pour que le plan de travail reste correctement éclairé. Au-dessus, le motif grimpe au plafond. Les deux fonctions d’un luminaire de cuisine, tenues par une seule pièce.',
    },
    finishes: [{ ...OIL, images: img('souk-globe-pendant', [1, 2, 3, 4, 5]) }],
    sizes: LAMP_SIZES,
    specs: [
      { k: { en: 'Material', fr: 'Matière' }, v: { en: 'Pierced brass', fr: 'Laiton ajouré' } },
      { k: { en: 'Form', fr: 'Forme' }, v: { en: 'Open-base sphere', fr: 'Sphère ouverte en bas' } },
      { k: { en: 'Lights', fr: 'Points lumineux' }, v: { en: '1 × E27', fr: '1 × E27' } },
    ],
  },
  {
    slug: 'andalus-glass-lantern',
    category: 'pendant-lights',
    sku: 'CA-AGL',
    name: { en: 'Andalus Glass Lantern', fr: 'Lanterne Andalouse' },
    tagline: {
      en: 'Leaded glass panes in a faceted brass cage',
      fr: 'Verre serti de plomb dans une cage de laiton facettée',
    },
    description: {
      en: 'Frosted and green glass set panel by panel into a soldered brass frame, the way the lanterns in the old medina workshops are still made. Softer light than pierced metal - it glows rather than patterns.',
      fr: 'Verre dépoli et vert serti panneau par panneau dans une armature de laiton soudée, comme on fabrique encore les lanternes dans les ateliers de la vieille médina. Lumière plus douce que le métal ajouré - elle diffuse au lieu de dessiner.',
    },
    finishes: [{ ...OIL, images: img('andalus-glass-lantern', [1, 2, 3, 4, 5]) }],
    sizes: LAMP_SIZES,
    specs: [
      { k: { en: 'Material', fr: 'Matière' }, v: { en: 'Brass + leaded glass', fr: 'Laiton + verre serti' } },
      { k: { en: 'Glass', fr: 'Verre' }, v: { en: 'Frosted / green', fr: 'Dépoli / vert' } },
      { k: { en: 'Lights', fr: 'Points lumineux' }, v: { en: '1 × E27', fr: '1 × E27' } },
    ],
  },

  /* ─────────────────────────── CEILING LIGHTS ─────────────────────────── */
  {
    slug: 'riad-flush-ceiling-light',
    category: 'ceiling-lights',
    sku: 'CA-RFC',
    badge: { en: 'Low ceilings', fr: 'Plafonds bas' },
    name: { en: 'Riad Flush Ceiling Light', fr: 'Plafonnier Riad' },
    tagline: {
      en: 'Rosettes cut by hand, projected across the whole ceiling',
      fr: 'Rosaces découpées à la main, projetées sur tout le plafond',
    },
    description: {
      en: 'A lobed flush-mount pierced with concentric rosettes. Because it sits tight to the ceiling, the pattern spreads wide instead of dropping - corridors, entrances, bathrooms and any room where a pendant would be in the way.',
      fr: 'Un plafonnier lobé, ajouré de rosaces concentriques. Plaqué au plafond, le motif s’étale au lieu de tomber - couloirs, entrées, salles de bain, et toute pièce où une suspension gênerait.',
    },
    finishes: [{ ...OIL, images: img('riad-flush-ceiling-light', [1, 2, 3, 4, 5]) }],
    sizes: LAMP_SIZES,
    specs: [
      { k: { en: 'Material', fr: 'Matière' }, v: { en: 'Pierced brass', fr: 'Laiton ajouré' } },
      { k: { en: 'Mount', fr: 'Fixation' }, v: { en: 'Flush to ceiling', fr: 'Plaqué au plafond' } },
      { k: { en: 'Lights', fr: 'Points lumineux' }, v: { en: '1 × E27', fr: '1 × E27' } },
    ],
  },

  /* ──────────────────────────── WALL SCONCES ──────────────────────────── */
  {
    slug: 'cascade-wall-sconce',
    category: 'wall-sconces',
    sku: 'CA-CWS',
    signature: true,
    badge: { en: 'One of a kind', fr: 'Pièce unique' },
    name: { en: 'Cascade Wall Sconce', fr: 'Applique Cascade' },
    tagline: {
      en: 'One sheet, folded once, oxidised on its own',
      fr: 'Une feuille, un pli, oxydée d’elle-même',
    },
    description: {
      en: 'A single sheet of copper rolled into a curve at the bottom, with a bare brass socket standing in the trough. The turquoise-and-rust surface is not paint - it is the metal reacting, and it carries on moving for months after it is on your wall. Indoor or covered outdoor.',
      fr: 'Une seule feuille de cuivre roulée en courbe à sa base, avec une douille en laiton nu posée dans le creux. La surface turquoise et rouille n’est pas une peinture - c’est le métal qui réagit, et il continue d’évoluer des mois après sa pose. Intérieur ou extérieur abrité.',
    },
    finishes: [{ ...VERDIGRIS, images: img('cascade-wall-sconce', [1, 2, 3, 4, 5, 6, 7, 8, 9]) }],
    price: 148,
    specs: [
      { k: { en: 'Material', fr: 'Matière' }, v: { en: 'Sheet copper', fr: 'Feuille de cuivre' } },
      { k: { en: 'Finish', fr: 'Finition' }, v: { en: 'Live verdigris patina', fr: 'Patine verdigris vivante' } },
      { k: { en: 'Socket', fr: 'Douille' }, v: { en: 'Solid brass, E27', fr: 'Laiton massif, E27' } },
      { k: { en: 'Bulb', fr: 'Ampoule' }, v: { en: 'Edison ST64 recommended', fr: 'Edison ST64 recommandée' } },
      { k: { en: 'Placement', fr: 'Emplacement' }, v: { en: 'Indoor / sheltered outdoor', fr: 'Intérieur / extérieur abrité' } },
    ],
  },

  /* ────────────────────────────── BASINS ──────────────────────────────── */
  {
    slug: 'zahra-fluted-basin',
    category: 'basins',
    sku: 'CA-ZFB',
    signature: true,
    badge: { en: 'Best seller', fr: 'Meilleure vente' },
    name: { en: 'Zahra Fluted Basin', fr: 'Vasque Cannelée Zahra' },
    tagline: {
      en: 'Forty-two flutes, raised from one disc',
      fr: 'Quarante-deux cannelures, formées d’un seul disque',
    },
    description: {
      en: 'Every flute is beaten into the metal from underneath, working outward from the drain - which is why the ribs meet at the centre instead of being stamped in a press. Oval or round, brass or two-tone copper and brass. The scalloped rim sits proud of the counter.',
      fr: 'Chaque cannelure est repoussée par en dessous, du bonde vers l’extérieur - c’est pour cela que les nervures se rejoignent au centre au lieu d’être estampées à la presse. Ovale ou ronde, en laiton ou bicolore cuivre et laiton. Le bord festonné dépasse du plan.',
    },
    finishes: [
      { ...GOLD, images: img('zahra-fluted-basin', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]) },
      { ...OIL, images: img('zahra-fluted-basin', [13, 14, 15, 16, 17, 18, 19]) },
    ],
    priceOnRequest: true,
    specs: [
      { k: { en: 'Material', fr: 'Matière' }, v: { en: 'Brass / copper', fr: 'Laiton / cuivre' } },
      { k: { en: 'Type', fr: 'Type' }, v: { en: 'Countertop vessel', fr: 'Vasque à poser' } },
      { k: { en: 'Shapes', fr: 'Formes' }, v: { en: 'Oval or round', fr: 'Ovale ou ronde' } },
      { k: { en: 'Drain', fr: 'Bonde' }, v: { en: 'Matching, included', fr: 'Assortie, incluse' } },
      { k: { en: 'Tap', fr: 'Robinet' }, v: { en: 'Wall-mounted (not included)', fr: 'Mural (non inclus)' } },
    ],
  },
  {
    slug: 'medina-engraved-basin',
    category: 'basins',
    sku: 'CA-MEB',
    name: { en: 'Medina Engraved Basin', fr: 'Vasque Gravée Medina' },
    tagline: {
      en: 'A woven band chased around the outside wall',
      fr: 'Une tresse ciselée tout autour de la paroi',
    },
    description: {
      en: 'A deep straight-sided bowl with an interlace band chased around the outside - the same knot the old Marrakech engravers cut into tea trays. Inside stays smooth and hammered so it cleans in one wipe.',
      fr: 'Une cuve profonde à parois droites, avec une tresse ciselée tout autour - le même entrelacs que les graveurs de Marrakech taillent sur les plateaux à thé. L’intérieur reste lisse et martelé, il se nettoie d’un geste.',
    },
    finishes: [
      { ...GOLD, images: img('medina-engraved-basin', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]) },
    ],
    priceOnRequest: true,
    specs: [
      { k: { en: 'Material', fr: 'Matière' }, v: { en: 'Engraved brass', fr: 'Laiton gravé' } },
      { k: { en: 'Type', fr: 'Type' }, v: { en: 'Countertop vessel', fr: 'Vasque à poser' } },
      { k: { en: 'Interior', fr: 'Intérieur' }, v: { en: 'Smooth hammered', fr: 'Martelé lisse' } },
    ],
  },
  {
    slug: 'atlas-oval-basin',
    category: 'basins',
    sku: 'CA-AOB',
    name: { en: 'Atlas Oval Basin', fr: 'Vasque Ovale Atlas' },
    tagline: { en: 'Plain, deep, and entirely hammered', fr: 'Simple, profonde, entièrement martelée' },
    description: {
      en: 'No engraving, no flutes - just the hammer marks left where they fell. The quietest piece in the catalogue and the one that suits a rough wood or stone counter best.',
      fr: 'Ni gravure ni cannelure - seulement les marques du marteau, laissées telles quelles. La pièce la plus sobre du catalogue, et celle qui va le mieux sur un plan en bois brut ou en pierre.',
    },
    finishes: [{ ...OIL, images: img('atlas-oval-basin', [1, 2, 3]) }],
    priceOnRequest: true,
    specs: [
      { k: { en: 'Material', fr: 'Matière' }, v: { en: 'Hammered copper', fr: 'Cuivre martelé' } },
      { k: { en: 'Type', fr: 'Type' }, v: { en: 'Countertop vessel', fr: 'Vasque à poser' } },
    ],
  },

  /* ─────────────────────────── KITCHEN SINKS ──────────────────────────── */
  {
    slug: 'medallion-farmhouse-sink-copper',
    category: 'kitchen-sinks',
    sku: 'CA-MFC',
    signature: true,
    name: { en: 'Medallion Farmhouse Sink', fr: 'Évier de Ferme Médaillon' },
    tagline: { en: 'Apron front, single medallion, sixteen-gauge copper', fr: 'Tablier, médaillon central, cuivre 16 gauge' },
    description: {
      en: 'A full apron-front sink with a chased rosette at the centre of the panel. Heavy-gauge copper, so it holds heat and takes a knock without denting. Copper is naturally antimicrobial - this is the one surface in a kitchen that gets more hygienic the longer you use it.',
      fr: 'Un évier à tablier complet, avec une rosace ciselée au centre du panneau. Cuivre fort, qui garde la chaleur et encaisse les chocs sans se marquer. Le cuivre est naturellement antimicrobien - c’est la seule surface de la cuisine qui devient plus saine à l’usage.',
    },
    finishes: [{ ...OIL, images: img('medallion-farmhouse-sink-copper', [1, 2, 3, 4, 5, 6, 7, 8]) }],
    priceOnRequest: true,
    specs: [
      { k: { en: 'Material', fr: 'Matière' }, v: { en: '16-gauge copper', fr: 'Cuivre 16 gauge' } },
      { k: { en: 'Style', fr: 'Style' }, v: { en: 'Apron / farmhouse', fr: 'Tablier / ferme' } },
      { k: { en: 'Bowls', fr: 'Cuves' }, v: { en: 'Single or double', fr: 'Simple ou double' } },
      { k: { en: 'Made to order', fr: 'Sur mesure' }, v: { en: 'Any cabinet width', fr: 'Toute largeur de meuble' } },
    ],
  },
  {
    slug: 'medallion-farmhouse-sink-brass',
    category: 'kitchen-sinks',
    sku: 'CA-MFB',
    name: { en: 'Medallion Farmhouse Sink - Brass', fr: 'Évier de Ferme Médaillon - Laiton' },
    tagline: { en: 'The same sink, raised in brass', fr: 'Le même évier, formé en laiton' },
    description: {
      en: 'The medallion sink built in hammered brass instead of copper - brighter, harder, and it holds its colour longer in a hard-water kitchen.',
      fr: 'L’évier médaillon réalisé en laiton martelé plutôt qu’en cuivre - plus clair, plus dur, et il garde sa couleur plus longtemps en eau calcaire.',
    },
    finishes: [{ ...GOLD, images: img('medallion-farmhouse-sink-brass', [1, 2, 3]) }],
    priceOnRequest: true,
    specs: [
      { k: { en: 'Material', fr: 'Matière' }, v: { en: 'Hammered brass', fr: 'Laiton martelé' } },
      { k: { en: 'Style', fr: 'Style' }, v: { en: 'Apron / farmhouse', fr: 'Tablier / ferme' } },
    ],
  },
  {
    slug: 'medina-engraved-farmhouse-sink',
    category: 'kitchen-sinks',
    sku: 'CA-MEF',
    badge: { en: 'Made to order', fr: 'Sur mesure' },
    name: { en: 'Medina Engraved Farmhouse Sink', fr: 'Évier de Ferme Gravé Medina' },
    tagline: { en: 'The apron chased edge to edge in vine work', fr: 'Le tablier ciselé de rinceaux, bord à bord' },
    description: {
      en: 'The most labour-intensive piece in the workshop: the whole apron is chased in a running vine, then the curved front is formed. Roughly three weeks of one engraver’s time. Single or double bowl, with or without a centre drainboard.',
      fr: 'La pièce la plus longue de l’atelier : le tablier entier est ciselé de rinceaux, puis la façade galbée est formée. Environ trois semaines de travail pour un graveur. Cuve simple ou double, avec ou sans égouttoir central.',
    },
    finishes: [{ ...OIL, images: img('medina-engraved-farmhouse-sink', [1, 2, 3, 4, 5]) }],
    priceOnRequest: true,
    specs: [
      { k: { en: 'Material', fr: 'Matière' }, v: { en: 'Engraved copper', fr: 'Cuivre gravé' } },
      { k: { en: 'Front', fr: 'Façade' }, v: { en: 'Curved apron', fr: 'Tablier galbé' } },
      { k: { en: 'Lead time', fr: 'Délai' }, v: { en: '4-6 weeks', fr: '4-6 semaines' } },
    ],
  },
  {
    slug: 'atlas-workstation-sink',
    category: 'kitchen-sinks',
    sku: 'CA-AWS',
    name: { en: 'Atlas Workstation Sink', fr: 'Évier Plan de Travail Atlas' },
    tagline: { en: 'Undermount, with an integrated towel rail', fr: 'Sous-plan, avec barre à torchons intégrée' },
    description: {
      en: 'A square undermount bowl with a solid rail welded across the front face. Hammered inside and out, it disappears under a stone counter and leaves only the metal edge and the rail visible.',
      fr: 'Une cuve carrée sous-plan, avec une barre massive soudée en façade. Martelée dedans comme dehors, elle disparaît sous un plan en pierre et ne laisse voir que l’arête de métal et la barre.',
    },
    finishes: [
      { ...GOLD, images: img('atlas-workstation-sink', [1, 3, 4, 5, 6]) },
      { ...OIL, images: img('atlas-workstation-sink', [2, 7, 8, 9, 10]) },
    ],
    priceOnRequest: true,
    specs: [
      { k: { en: 'Material', fr: 'Matière' }, v: { en: 'Copper / brass', fr: 'Cuivre / laiton' } },
      { k: { en: 'Mount', fr: 'Pose' }, v: { en: 'Undermount', fr: 'Sous-plan' } },
      { k: { en: 'Extra', fr: 'Détail' }, v: { en: 'Integrated towel rail', fr: 'Barre à torchons intégrée' } },
    ],
  },
  {
    slug: 'marrakech-bridge-sink',
    category: 'kitchen-sinks',
    sku: 'CA-MBS',
    name: { en: 'Marrakech Undermount Sink', fr: 'Évier Sous-Plan Marrakech' },
    tagline: { en: 'A plain deep bowl for a marble counter', fr: 'Une cuve profonde et sobre pour un plan en marbre' },
    description: {
      en: 'No apron, no medallion - a deep hammered bowl set under stone. Round or rectangular. The one to specify when the counter is meant to be the star and the sink just has to be beautiful quietly.',
      fr: 'Ni tablier ni médaillon - une cuve profonde martelée, posée sous la pierre. Ronde ou rectangulaire. Celle qu’on choisit quand c’est le plan qui doit primer et que l’évier doit être beau sans se faire remarquer.',
    },
    finishes: [
      { ...GOLD, images: img('marrakech-bridge-sink', [3, 4, 5]) },
      { ...OIL, images: img('marrakech-bridge-sink', [1, 2]) },
    ],
    priceOnRequest: true,
    specs: [
      { k: { en: 'Material', fr: 'Matière' }, v: { en: 'Copper / brass', fr: 'Cuivre / laiton' } },
      { k: { en: 'Mount', fr: 'Pose' }, v: { en: 'Undermount', fr: 'Sous-plan' } },
      { k: { en: 'Shapes', fr: 'Formes' }, v: { en: 'Round or rectangular', fr: 'Ronde ou rectangulaire' } },
    ],
  },

  /* ────────────────────────── SPA & ACCESSORIES ───────────────────────── */
  {
    slug: 'hammam-bath-bowl',
    category: 'spa-hammam',
    sku: 'CA-HBB',
    name: { en: 'Hammam Bath Bowl', fr: 'Bassine de Hammam' },
    tagline: { en: 'A wide, shallow bowl for the foot-bath ritual', fr: 'Une bassine large et basse pour le bain de pieds' },
    description: {
      en: 'The wide, low copper bowl used in Moroccan bathhouses - big enough for both feet, shallow enough to carry full. Copper holds heat far longer than steel or ceramic, which is the entire point of it.',
      fr: 'La bassine en cuivre large et basse des hammams marocains - assez grande pour les deux pieds, assez basse pour être portée pleine. Le cuivre garde la chaleur bien plus longtemps que l’acier ou la céramique - c’est tout l’intérêt.',
    },
    finishes: [{ ...OIL, images: img('hammam-bath-bowl', [1, 2, 3, 4]) }],
    priceOnRequest: true,
    specs: [
      { k: { en: 'Material', fr: 'Matière' }, v: { en: 'Hammered copper', fr: 'Cuivre martelé' } },
      { k: { en: 'Use', fr: 'Usage' }, v: { en: 'Foot bath / spa', fr: 'Bain de pieds / spa' } },
      { k: { en: 'Care', fr: 'Entretien' }, v: { en: 'Dry after use', fr: 'Sécher après usage' } },
    ],
  },
  {
    slug: 'brass-tumbler-holder',
    category: 'spa-hammam',
    sku: 'CA-BTH',
    name: { en: 'Brass Tumbler Holder', fr: 'Porte-Gobelet Laiton' },
    tagline: { en: 'Wall-mounted, solid, no plating', fr: 'Mural, massif, sans placage' },
    description: {
      en: 'Solid brass throughout - not plated steel, so it will never blister or flake in a wet room. Ages to a soft gold. Sold with the tumbler.',
      fr: 'Laiton massif de part en part - pas d’acier plaqué, donc ni cloque ni écaille en pièce humide. Prend une patine dorée douce. Vendu avec le gobelet.',
    },
    finishes: [{ ...GOLD, images: img('brass-tumbler-holder', [1]) }],
    priceOnRequest: true,
    specs: [
      { k: { en: 'Material', fr: 'Matière' }, v: { en: 'Solid brass', fr: 'Laiton massif' } },
      { k: { en: 'Mount', fr: 'Fixation' }, v: { en: 'Wall, screws included', fr: 'Murale, vis incluses' } },
    ],
  },
];

/* ──────────────────────────── helpers ─────────────────────────────────── */

export const getProduct = (slug) => PRODUCTS.find((p) => p.slug === slug);
export const getCategory = (slug) => CATEGORIES.find((c) => c.slug === slug);
export const byCategory = (slug) => PRODUCTS.filter((p) => p.category === slug);

/** Lowest advertised price, or null when the piece is quote-only. */
export const fromPrice = (p) => {
  if (p.priceOnRequest) return null;
  if (p.sizes?.length) return Math.min(...p.sizes.map((s) => s.price));
  return p.price ?? null;
};

export const heroImage = (p) => p.finishes[0].images[0];

export const allImages = (p) => [...new Set(p.finishes.flatMap((f) => f.images))];

/** Four related pieces: same category first, then other signature work. */
export const related = (p, n = 4) => {
  const same = PRODUCTS.filter((x) => x.category === p.category && x.slug !== p.slug);
  const rest = PRODUCTS.filter((x) => x.category !== p.category && x.signature);
  return [...same, ...rest].slice(0, n);
};
