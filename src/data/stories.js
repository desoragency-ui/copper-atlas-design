/**
 * Copper Atlas Design - long-form product copy.
 *
 * The workshop writes its listings in a fixed shape: a lede, two or three
 * paragraphs, a bulleted feature list, then the size ladder, shipping and
 * custom-order notes. Shipping and custom-order text is identical on every
 * listing, so it lives in the dictionary (`storyShipping*`, `storyCustom*`)
 * and is rendered from there - only the parts that differ per piece are here.
 *
 * ── HOW TO EDIT ─────────────────────────────────────────────────────────────
 * seoTitle  the long, keyword-carrying listing title. Used as the <title> and
 *           as the heading above this block. Keep the pipe: "<what> | <where>".
 * lede      one sentence, ends with "- Crafted in Marrakech, Morocco".
 * body      2-3 paragraphs. First: what it is and who makes it. Second: how it
 *           is made and why that shows. Third: where it belongs in a house.
 * features  pick from F below, or add a new pair there. 8-11 reads best.
 * craft     optional. Only for pieces where the making is the selling point.
 *
 * Every string is a `{ en, fr }` pair - read it with `t(field, lang)`.
 * A product with no entry here falls back to its short `description`.
 * ────────────────────────────────────────────────────────────────────────────
 */

/**
 * Shared feature lines. The workshop repeats the same claims across listings -
 * writing them once keeps the French honest and the wording identical.
 */
const F = {
  handmade: {
    en: '🇲🇦 Handmade in Marrakech, Morocco',
    fr: '🇲🇦 Fait main à Marrakech, Maroc',
  },
  artisan: {
    en: 'Handcrafted by experienced Moroccan artisans',
    fr: 'Façonné par des artisans marocains expérimentés',
  },
  tradition: {
    en: 'Traditional Moroccan metalworking techniques',
    fr: 'Techniques traditionnelles de dinanderie marocaine',
  },
  unique: {
    en: 'Each piece is individually handcrafted and unique',
    fr: 'Chaque pièce est façonnée une à une et reste unique',
  },
  custom: {
    en: 'Custom sizes and designs available',
    fr: 'Dimensions et modèles sur mesure disponibles',
  },
  customFinish: {
    en: 'Custom sizes and finishes available',
    fr: 'Dimensions et finitions sur mesure disponibles',
  },

  /* materials */
  solidBrass: {
    en: 'Solid yellow brass construction',
    fr: 'Laiton jaune massif de part en part',
  },
  brass: { en: 'High-quality yellow brass', fr: 'Laiton jaune de haute qualité' },
  redCopper: { en: 'High-quality red copper', fr: 'Cuivre rouge de haute qualité' },
  heavyCopper: {
    en: 'Heavy 16-gauge copper - holds heat, resists denting',
    fr: 'Cuivre fort 16 gauge - garde la chaleur, résiste aux chocs',
  },
  noPlating: {
    en: 'Solid metal throughout, never plated - it cannot blister or flake',
    fr: 'Métal massif, jamais plaqué - ni cloque ni écaillage possible',
  },

  /* finishes */
  hammered: {
    en: 'Beautiful handmade hammered finish',
    fr: 'Belle finition martelée à la main',
  },
  matteBrass: { en: 'Elegant matte brass finish', fr: 'Élégante finition laiton mat' },
  patina: {
    en: 'Beautiful green oxidised patina finish',
    fr: 'Belle finition patine verte oxydée',
  },
  livingPatina: {
    en: 'Living patina - the surface keeps moving for months',
    fr: 'Patine vivante - la surface continue d’évoluer des mois',
  },
  pierced: {
    en: 'Pattern pierced by hand, strike by strike',
    fr: 'Motif ajouré à la main, coup par coup',
  },
  engraved: {
    en: 'Chased and engraved by hand with a burin',
    fr: 'Ciselé et gravé à la main au burin',
  },

  /* light behaviour */
  warmLight: {
    en: 'Warm and atmospheric lighting effect',
    fr: 'Lumière chaude et atmosphérique',
  },
  shadowPlay: {
    en: 'Beautiful light and shadow effect on walls and ceiling',
    fr: 'Superbes jeux d’ombre et de lumière sur murs et plafond',
  },
  decorative: {
    en: 'A beautiful decorative piece even when not illuminated',
    fr: 'Un bel objet décoratif même éteint',
  },
  e27: {
    en: 'Standard E27 fitting, 110-240 V (bulb not included)',
    fr: 'Douille E27 standard, 110-240 V (ampoule non incluse)',
  },
  adjustableDrop: {
    en: 'Adjustable drop - shortened on site in seconds',
    fr: 'Hauteur ajustable - se raccourcit sur place en quelques secondes',
  },

  /* placement */
  rooms: {
    en: 'Suitable for living rooms, dining rooms, bedrooms and entryways',
    fr: 'Convient aux salons, salles à manger, chambres et entrées',
  },
  venues: {
    en: 'Perfect for riads, hotels, restaurants, cafés and luxury interiors',
    fr: 'Parfait pour riads, hôtels, restaurants, cafés et intérieurs de luxe',
  },
  interiors: {
    en: 'Suits Moroccan, boho, Mediterranean, rustic and modern décor',
    fr: 'S’accorde aux décors marocain, bohème, méditerranéen, rustique et moderne',
  },

  /* bathroom & kitchen */
  vessel: {
    en: 'Countertop vessel basin - sits proud of the counter',
    fr: 'Vasque à poser - elle dépasse du plan',
  },
  drain: { en: 'Matching drain included', fr: 'Bonde assortie incluse' },
  durable: { en: 'Strong and durable construction', fr: 'Construction solide et durable' },
  easyDecor: {
    en: 'Easy to combine with modern or traditional bathroom décor',
    fr: 'Se marie avec une salle de bain moderne comme traditionnelle',
  },
  bathVenues: {
    en: 'Perfect for homes, villas, riads, hotels and luxury interiors',
    fr: 'Parfait pour maisons, villas, riads, hôtels et intérieurs de luxe',
  },
  antimicrobial: {
    en: 'Copper is naturally antimicrobial - it gets more hygienic with use',
    fr: 'Le cuivre est naturellement antimicrobien - il s’assainit à l’usage',
  },
  madeToMeasure: {
    en: 'Made to order to any cabinet width',
    fr: 'Fabriqué sur mesure à toute largeur de meuble',
  },
};

export const STORIES = {
  /* ─────────────────────────── PENDANT LIGHTS ─────────────────────────── */

  'lotus-cluster-pendant': {
    seoTitle: {
      en: 'Handmade Brass Lotus Pendant Light | Moroccan 3-Light Cluster Ceiling Lamp',
      fr: 'Suspension Lotus en Laiton Fait Main | Plafonnier Marocain 3 Lumières',
    },
    lede: {
      en: 'Handmade Moroccan Brass Lotus Cluster Pendant - Crafted in Marrakech, Morocco 🇲🇦',
      fr: 'Suspension Lotus en laiton, faite main - Fabriquée à Marrakech, Maroc 🇲🇦',
    },
    body: {
      en: [
        'Bring the warm beauty of Moroccan craftsmanship into your home with this handmade brass lotus pendant light. Each petal is carefully shaped in Marrakech by experienced Moroccan artisans, combining traditional metalworking, patient hand-hammering and timeless Moroccan design.',
        'Every petal starts life as a flat brass disc and is beaten by hand until it curls in on itself - the fold is what holds the light. Three shades are hung from a single matte-black canopy at different drops, so the light layers through the room instead of flattening against it. Because each petal is folded by hand, no two are ever identical.',
        'Its warm, layered glow makes it a stunning addition to living rooms, dining rooms, bedrooms, entryways, riads, restaurants, hotels and luxury interiors.',
      ],
      fr: [
        'Faites entrer la chaleur de l’artisanat marocain chez vous avec cette suspension lotus en laiton, faite main. Chaque pétale est façonné à Marrakech par des artisans marocains expérimentés, alliant dinanderie traditionnelle, martelage patient et design marocain intemporel.',
        'Chaque pétale part d’un disque de laiton plat, martelé à la main jusqu’à s’enrouler sur lui-même - c’est le pli qui retient la lumière. Trois abat-jour sont suspendus à une même rosace noir mat, à des hauteurs différentes, pour que la lumière se superpose au lieu de s’aplatir. Aucun pétale ne se plie deux fois pareil.',
        'Sa lueur chaude et étagée en fait une pièce remarquable pour les salons, salles à manger, chambres, entrées, riads, restaurants, hôtels et intérieurs de luxe.',
      ],
    },
    features: [F.handmade, F.brass, F.hammered, F.tradition, F.artisan, F.warmLight, F.decorative, F.adjustableDrop, F.e27, F.interiors, F.unique, F.custom],
    craft: {
      en: 'Every petal is raised by hand in our Marrakech workshop. The hammered surface is worked strike by strike, which is why each shade carries its own pattern and character. Minor variations in texture, fold and tone are natural and are what make the piece handmade rather than manufactured.',
      fr: 'Chaque pétale est formé à la main dans notre atelier de Marrakech. La surface martelée est travaillée coup par coup, ce qui donne à chaque abat-jour son propre dessin et son caractère. De légères variations de texture, de pli et de ton sont naturelles : c’est ce qui distingue le fait main du fabriqué en série.',
    },
  },

  'atlas-verdigris-dome-pendant': {
    seoTitle: {
      en: 'Green Patina Brass Ceiling Light | Handmade Moroccan Half-Sphere Pendant Lamp',
      fr: 'Plafonnier Laiton Patine Verte | Suspension Demi-Sphère Marocaine Fait Main',
    },
    lede: {
      en: 'Handmade Moroccan Oxidised Brass Half-Sphere Ceiling Light - Crafted in Marrakech 🇲🇦',
      fr: 'Plafonnier demi-sphère en laiton oxydé, fait main - Fabriqué à Marrakech 🇲🇦',
    },
    body: {
      en: [
        'Bring a unique Moroccan touch to your interior with this handmade half-sphere ceiling light, finished with an elegant green oxidised patina.',
        'Each lamp is carefully handcrafted in Marrakech by experienced Moroccan artisans using traditional metalworking techniques. The dome is spun, polished to a mirror, then half-buried in a patina bath. Where the two meet, the metal draws its own coastline - a ragged turquoise horizon that no one can redraw on purpose. The inside is left bare so the bulb throws gold, not green.',
        'The elegant half-sphere shape gives a warm, inviting light, making this lamp both a working light source and a beautiful decorative element for living rooms, dining rooms, bedrooms, entryways, riads, hotels, restaurants and cafés.',
      ],
      fr: [
        'Apportez une touche marocaine unique à votre intérieur avec ce plafonnier demi-sphère fait main, fini d’une élégante patine verte oxydée.',
        'Chaque lampe est façonnée avec soin à Marrakech par des artisans marocains expérimentés, selon des techniques de dinanderie traditionnelles. Le dôme est repoussé, poli miroir, puis à demi plongé dans un bain de patine. À la rencontre des deux, le métal dessine son propre littoral - un horizon turquoise déchiqueté que personne ne peut refaire à l’identique. L’intérieur reste nu pour que l’ampoule renvoie de l’or, pas du vert.',
        'La forme en demi-sphère diffuse une lumière chaude et accueillante : à la fois source lumineuse et véritable élément décoratif, pour salons, salles à manger, chambres, entrées, riads, hôtels, restaurants et cafés.',
      ],
    },
    features: [F.handmade, F.brass, F.patina, F.livingPatina, F.artisan, F.tradition, F.warmLight, F.decorative, F.e27, F.venues, F.interiors, F.unique, F.customFinish],
  },

  'sahara-wide-dome-pendant': {
    seoTitle: {
      en: 'Matte Brass Pendant Light | Handmade Moroccan Wide Dome Ceiling Lamp',
      fr: 'Suspension Laiton Mat | Plafonnier Dôme Large Marocain Fait Main',
    },
    lede: {
      en: 'Handmade Moroccan Matte Brass Pendant Light - Crafted in Marrakech 🇲🇦',
      fr: 'Suspension en laiton mat, faite main - Fabriquée à Marrakech 🇲🇦',
    },
    body: {
      en: [
        'Add a touch of Moroccan elegance and warm character to your interior with this handmade matte yellow brass pendant light.',
        'Each lamp is carefully handcrafted in Marrakech by experienced Moroccan artisans using traditional metalworking techniques. The matte brass finish gives the lamp a sophisticated, timeless appearance, while the low, wide profile drops light in a broad circle rather than a spotlight. Sized for a round dining table - hang it 75-85 cm above the top and it lights the food, not the faces.',
        'Perfect for adding warmth and character to living rooms, dining rooms, bedrooms, entryways, riads, restaurants, hotels, cafés and luxury interior projects.',
      ],
      fr: [
        'Ajoutez une touche d’élégance marocaine et de chaleur à votre intérieur avec cette suspension en laiton jaune mat, faite main.',
        'Chaque lampe est façonnée avec soin à Marrakech par des artisans marocains expérimentés, selon des techniques de dinanderie traditionnelles. La finition laiton mat lui donne une allure sobre et intemporelle, tandis que son profil bas et large pose la lumière en large cercle plutôt qu’en faisceau. Pensée pour une table ronde : suspendez-la à 75-85 cm du plateau et elle éclaire les plats, pas les visages.',
        'Parfaite pour réchauffer salons, salles à manger, chambres, entrées, riads, restaurants, hôtels, cafés et projets d’architecture intérieure.',
      ],
    },
    features: [F.handmade, F.brass, F.matteBrass, F.hammered, F.artisan, F.tradition, F.warmLight, F.adjustableDrop, F.e27, F.venues, F.interiors, F.unique, F.custom],
  },

  'kasbah-dome-pendant': {
    seoTitle: {
      en: 'Red Copper Pendant Light | Handmade Moroccan Dome Ceiling Lamp',
      fr: 'Suspension Cuivre Rouge | Plafonnier Dôme Marocain Fait Main',
    },
    lede: {
      en: 'Handmade Moroccan Red Copper Pendant Light - Crafted in Marrakech 🇲🇦',
      fr: 'Suspension en cuivre rouge, faite main - Fabriquée à Marrakech 🇲🇦',
    },
    body: {
      en: [
        'Bring the warmth and beauty of Moroccan craftsmanship into your home with this unique handmade red copper pendant light.',
        'Each lamp is carefully handcrafted in Marrakech by experienced Moroccan artisans using traditional metalworking techniques. The outside is taken almost to black while the inside is left raw copper: switched off it reads as a dark sculptural mass, switched on the bowl fills with orange. The natural warm tone of red copper gives this pendant a character no finish can imitate.',
        'Built for the run above a kitchen island, and equally at home over living rooms, dining tables, bedrooms, entryways, riads, restaurants, hotels and cafés.',
      ],
      fr: [
        'Faites entrer la chaleur de l’artisanat marocain chez vous avec cette suspension en cuivre rouge, unique et faite main.',
        'Chaque lampe est façonnée avec soin à Marrakech par des artisans marocains expérimentés, selon des techniques de dinanderie traditionnelles. L’extérieur est poussé presque au noir, l’intérieur reste cuivre brut : éteinte, c’est une masse sculpturale sombre ; allumée, la coupe se remplit d’orange. Le ton chaud du cuivre rouge lui donne un caractère qu’aucune finition n’imite.',
        'Conçue pour la ligne au-dessus d’un îlot de cuisine, et tout aussi juste au-dessus d’un salon, d’une table, d’une chambre, d’une entrée, d’un riad, d’un restaurant, d’un hôtel ou d’un café.',
      ],
    },
    features: [F.handmade, F.redCopper, F.hammered, F.artisan, F.tradition, F.warmLight, F.decorative, F.adjustableDrop, F.e27, F.venues, F.interiors, F.unique, F.custom],
  },

  'oasis-wave-pendant': {
    seoTitle: {
      en: 'Pierced Brass Pendant Light | Handmade Moroccan Wave Ceiling Lamp',
      fr: 'Suspension Laiton Ajouré | Plafonnier Vague Marocain Fait Main',
    },
    lede: {
      en: 'Handmade Moroccan Pierced Brass Pendant Light - Crafted in Marrakech 🇲🇦',
      fr: 'Suspension en laiton ajouré, faite main - Fabriquée à Marrakech 🇲🇦',
    },
    body: {
      en: [
        'Bring the warm beauty of Moroccan craftsmanship into your home with this elegant handmade pierced brass pendant light. Each piece is carefully handcrafted in Morocco by skilled artisans, combining traditional craftsmanship, detailed metalwork and timeless Moroccan design.',
        'Every wave is punched through by hand with a chisel, one strike at a time. Lit, the shade stops being an object and becomes a projector - the wall behind it moves. It hangs from a solid brass chain rather than a cable, which is both stronger and quieter to look at.',
        'The intricate pattern creates beautiful shadows and a warm, atmospheric glow, making it a stunning addition to living rooms, dining rooms, bedrooms, entryways, riads, restaurants, hotels and luxury interiors.',
      ],
      fr: [
        'Faites entrer la chaleur de l’artisanat marocain chez vous avec cette élégante suspension en laiton ajouré, faite main. Chaque pièce est façonnée au Maroc par des artisans qualifiés, alliant savoir-faire traditionnel, travail du métal minutieux et design marocain intemporel.',
        'Chaque vague est percée à la main au burin, coup par coup. Allumé, l’abat-jour cesse d’être un objet et devient un projecteur : le mur derrière lui s’anime. Il est suspendu par une chaîne de laiton massif plutôt que par un câble - plus solide, et plus beau à regarder.',
        'Le motif ajouré dessine de superbes ombres et une lueur chaude et enveloppante : une pièce marquante pour salons, salles à manger, chambres, entrées, riads, restaurants, hôtels et intérieurs de luxe.',
      ],
    },
    features: [F.handmade, F.brass, F.pierced, F.artisan, F.tradition, F.shadowPlay, F.warmLight, F.adjustableDrop, F.e27, F.venues, F.interiors, F.unique, F.custom],
  },

  'souk-globe-pendant': {
    seoTitle: {
      en: 'Moroccan Copper Pendant Light | Handmade Globe Lantern',
      fr: 'Suspension Cuivre Marocaine | Lanterne Globe Faite Main',
    },
    lede: {
      en: 'Handmade Moroccan Copper Pendant Light - Crafted in Marrakech 🇲🇦',
      fr: 'Suspension en cuivre, faite main - Fabriquée à Marrakech 🇲🇦',
    },
    body: {
      en: [
        'Bring the warm beauty of Moroccan craftsmanship into your home with this elegant handmade copper pendant light. Each piece is carefully handcrafted in Morocco by skilled Moroccan artisans, combining traditional craftsmanship, detailed metalwork and timeless Moroccan design.',
        'A full sphere pierced in a diamond lattice, open at the base so the work surface below stays properly lit. Above, the pattern climbs the ceiling. The two jobs a kitchen light has to do, done by one piece.',
        'The intricate geometric pattern creates beautiful shadows and a warm, atmospheric glow when the light is switched on, making it a stunning addition to living rooms, dining rooms, bedrooms, entryways, riads, restaurants, hotels and luxury interiors.',
      ],
      fr: [
        'Faites entrer la chaleur de l’artisanat marocain chez vous avec cette élégante suspension en cuivre, faite main. Chaque pièce est façonnée au Maroc par des artisans marocains qualifiés, alliant savoir-faire traditionnel, travail du métal minutieux et design marocain intemporel.',
        'Une sphère entière ajourée en losanges, ouverte à la base pour que le plan de travail reste correctement éclairé. Au-dessus, le motif grimpe au plafond. Les deux fonctions d’un luminaire de cuisine, tenues par une seule pièce.',
        'Le motif géométrique ajouré dessine de superbes ombres et une lueur chaude et enveloppante une fois allumé : une pièce marquante pour salons, salles à manger, chambres, entrées, riads, restaurants, hôtels et intérieurs de luxe.',
      ],
    },
    features: [F.handmade, F.redCopper, F.pierced, F.artisan, F.tradition, F.shadowPlay, F.warmLight, F.adjustableDrop, F.e27, F.venues, F.interiors, F.unique, F.custom],
  },

  'andalus-glass-lantern': {
    seoTitle: {
      en: 'Brass & Glass Lantern Pendant | Handmade Moroccan Ceiling Lamp',
      fr: 'Lanterne Suspendue Laiton & Verre | Plafonnier Marocain Fait Main',
    },
    lede: {
      en: 'Handmade Moroccan Brass and Leaded-Glass Lantern - Crafted in Marrakech 🇲🇦',
      fr: 'Lanterne en laiton et verre serti, faite main - Fabriquée à Marrakech 🇲🇦',
    },
    body: {
      en: [
        'Add a touch of Moroccan elegance to your interior with this handmade brass and glass lantern, built the way the lanterns of the old medina workshops are still built.',
        'Frosted and green glass is set panel by panel into a soldered brass frame, each facet cut and fitted by hand. The result is a softer light than pierced metal gives: the lantern glows rather than patterns, so it can hang in a room where a hard shadow would be too much.',
        'Perfect above a stairwell, a hallway, a dining table or a bed, and equally at home in riads, restaurants, hotels, cafés and luxury interior projects.',
      ],
      fr: [
        'Ajoutez une touche d’élégance marocaine à votre intérieur avec cette lanterne en laiton et verre, faite main, construite comme on les construit encore dans les ateliers de la vieille médina.',
        'Le verre dépoli et vert est serti panneau par panneau dans une armature de laiton soudée, chaque facette coupée et ajustée à la main. Le résultat est une lumière plus douce que celle du métal ajouré : la lanterne diffuse au lieu de dessiner, et peut donc éclairer une pièce où une ombre franche serait de trop.',
        'Parfaite au-dessus d’une cage d’escalier, d’un couloir, d’une table ou d’un lit, et tout aussi juste dans les riads, restaurants, hôtels, cafés et projets d’architecture intérieure.',
      ],
    },
    features: [F.handmade, F.brass, F.artisan, F.tradition, F.warmLight, F.decorative, F.adjustableDrop, F.e27, F.venues, F.interiors, F.unique, F.custom],
  },

  /* ─────────────────────────── CEILING LIGHTS ─────────────────────────── */

  'riad-flush-ceiling-light': {
    seoTitle: {
      en: 'Pierced Brass Flush Ceiling Light | Handmade Moroccan Low-Ceiling Lamp',
      fr: 'Plafonnier Laiton Ajouré | Luminaire Marocain Fait Main pour Plafond Bas',
    },
    lede: {
      en: 'Handmade Moroccan Pierced Brass Flush Ceiling Light - Crafted in Marrakech 🇲🇦',
      fr: 'Plafonnier en laiton ajouré, fait main - Fabriqué à Marrakech 🇲🇦',
    },
    body: {
      en: [
        'Bring the warmth of Moroccan craftsmanship into rooms where a pendant simply will not fit, with this handmade pierced brass flush ceiling light.',
        'A lobed body is pierced with concentric rosettes, each one cut by hand. Because it sits tight to the ceiling, the pattern spreads wide across the plaster instead of dropping into the room - which is exactly what a corridor, an entrance or a low-ceilinged bathroom needs.',
        'Perfect for hallways, entrances, bathrooms, bedrooms and any room where a hanging light would be in the way, and a favourite of riads, hotels and restaurants.',
      ],
      fr: [
        'Faites entrer la chaleur de l’artisanat marocain là où une suspension ne tient pas, avec ce plafonnier en laiton ajouré, fait main.',
        'Un corps lobé, ajouré de rosaces concentriques découpées une à une à la main. Plaqué au plafond, le motif s’étale largement sur l’enduit au lieu de tomber dans la pièce - exactement ce qu’il faut à un couloir, une entrée ou une salle de bain sous plafond bas.',
        'Parfait pour couloirs, entrées, salles de bain, chambres et toute pièce où une suspension gênerait ; très demandé par les riads, hôtels et restaurants.',
      ],
    },
    features: [F.handmade, F.brass, F.pierced, F.artisan, F.tradition, F.shadowPlay, F.warmLight, F.e27, F.venues, F.interiors, F.unique, F.custom],
  },

  /* ──────────────────────────── WALL SCONCES ──────────────────────────── */

  'cascade-wall-sconce': {
    seoTitle: {
      en: 'Green Patina Copper Wall Light | Handmade Moroccan Sconce',
      fr: 'Applique Murale Cuivre Patine Verte | Applique Marocaine Faite Main',
    },
    lede: {
      en: 'Handmade Moroccan Oxidised Copper Wall Sconce - Crafted in Marrakech 🇲🇦',
      fr: 'Applique murale en cuivre oxydé, faite main - Fabriquée à Marrakech 🇲🇦',
    },
    body: {
      en: [
        'Bring a unique Moroccan touch to your wall with this handmade copper sconce, finished with a living green oxidised patina.',
        'A single sheet of copper is rolled into a curve at the bottom, with a bare solid-brass socket standing in the trough. The turquoise-and-rust surface is not paint - it is the metal reacting, and it carries on moving for months after the piece is on your wall. No two sconces oxidise the same way, which is the whole point.',
        'Suitable indoors or in covered outdoor spaces: hallways, staircases, bedsides, terraces, riads, hotels, restaurants and cafés.',
      ],
      fr: [
        'Apportez une touche marocaine unique à votre mur avec cette applique en cuivre faite main, finie d’une patine verte oxydée vivante.',
        'Une seule feuille de cuivre est roulée en courbe à sa base, avec une douille en laiton massif nu posée dans le creux. La surface turquoise et rouille n’est pas une peinture - c’est le métal qui réagit, et il continue d’évoluer des mois après la pose. Aucune applique ne s’oxyde de la même façon : c’est tout l’intérêt.',
        'Convient en intérieur comme en extérieur abrité : couloirs, escaliers, têtes de lit, terrasses, riads, hôtels, restaurants et cafés.',
      ],
    },
    features: [F.handmade, F.redCopper, F.patina, F.livingPatina, F.artisan, F.tradition, F.warmLight, F.decorative, F.e27, F.venues, F.interiors, F.unique, F.customFinish],
    craft: {
      en: 'The patina is grown, not painted. Each sconce spends days in the workshop reacting before it is stabilised, and the pattern it forms cannot be repeated on purpose. Expect the colour to keep shifting for several months after delivery - that is the material working, not a fault.',
      fr: 'La patine se cultive, elle ne se peint pas. Chaque applique passe plusieurs jours en atelier à réagir avant d’être stabilisée, et le dessin obtenu ne peut être reproduit volontairement. La couleur continuera d’évoluer plusieurs mois après la livraison : c’est le métal qui travaille, pas un défaut.',
    },
  },

  /* ────────────────────────────── BASINS ──────────────────────────────── */

  'zahra-fluted-basin': {
    seoTitle: {
      en: 'Handmade Fluted Brass Sink | Hammered Moroccan Bathroom Vessel Basin',
      fr: 'Vasque Cannelée en Laiton Fait Main | Lavabo Marocain Martelé',
    },
    lede: {
      en: 'Handmade Fluted Brass and Copper Basin - Crafted in Marrakech, Morocco 🇲🇦',
      fr: 'Vasque cannelée en laiton et cuivre, faite main - Fabriquée à Marrakech, Maroc 🇲🇦',
    },
    body: {
      en: [
        'Bring the timeless beauty of Moroccan craftsmanship into your bathroom with this elegant handmade fluted basin, raised from solid brass and carefully finished by experienced Moroccan artisans in Marrakech.',
        'Every one of the forty-two flutes is beaten into the metal from underneath, working outward from the drain - which is why the ribs meet cleanly at the centre instead of being stamped in a press. The scalloped rim sits proud of the counter, and the whole bowl is raised from a single disc with no seams or welds.',
        'Available oval or round, in solid brass or two-tone copper and brass. This basin suits bathrooms, powder rooms, luxury villas, riads, boutique hotels, restaurants and other sophisticated interior spaces.',
      ],
      fr: [
        'Faites entrer la beauté intemporelle de l’artisanat marocain dans votre salle de bain avec cette élégante vasque cannelée, formée en laiton massif et finie à la main par des artisans marocains expérimentés à Marrakech.',
        'Chacune des quarante-deux cannelures est repoussée dans le métal par en dessous, de la bonde vers l’extérieur - c’est pour cela que les nervures se rejoignent nettement au centre au lieu d’être estampées à la presse. Le bord festonné dépasse du plan, et la cuve entière est formée d’un seul disque, sans soudure ni assemblage.',
        'Disponible en ovale ou en rond, en laiton massif ou bicolore cuivre et laiton. Cette vasque convient aux salles de bain, WC d’invités, villas de luxe, riads, hôtels de charme, restaurants et autres intérieurs raffinés.',
      ],
    },
    features: [F.handmade, F.solidBrass, F.hammered, F.tradition, F.artisan, F.vessel, F.drain, F.durable, F.easyDecor, F.bathVenues, F.unique, F.custom],
    craft: {
      en: 'Every basin is raised by hand in our Marrakech workshop. The flutes and the hammered ground are worked strike by strike, giving each bowl its own pattern and character. Because each piece is handmade, minor variations in texture, finish and appearance are natural and make every basin unique.',
      fr: 'Chaque vasque est formée à la main dans notre atelier de Marrakech. Les cannelures et le fond martelé sont travaillés coup par coup, ce qui donne à chaque cuve son propre dessin et son caractère. Comme chaque pièce est faite main, de légères variations de texture, de finition et d’aspect sont naturelles et rendent chaque vasque unique.',
    },
  },

  'medina-engraved-basin': {
    seoTitle: {
      en: 'Hand-Engraved Brass Sink | Moroccan Bathroom Vessel Basin, Chased by Hand',
      fr: 'Vasque en Laiton Gravée Main | Lavabo Marocain Ciselé',
    },
    lede: {
      en: 'Handmade Hand-Engraved Brass Basin - Crafted in Marrakech, Morocco 🇲🇦',
      fr: 'Vasque en laiton gravée à la main - Fabriquée à Marrakech, Maroc 🇲🇦',
    },
    body: {
      en: [
        'Bring the timeless beauty of Moroccan craftsmanship into your bathroom with this deep engraved basin, raised in solid brass and chased by hand in Marrakech.',
        'A straight-sided bowl carries an interlace band cut around the outside wall - the same knot the old Marrakech engravers still cut into tea trays, struck line by line with a burin. The inside is deliberately left smooth and hammered so the basin cleans in a single wipe.',
        'Perfect for bathrooms, powder rooms, luxury villas, riads, boutique hotels, restaurants and other sophisticated interior spaces.',
      ],
      fr: [
        'Faites entrer la beauté intemporelle de l’artisanat marocain dans votre salle de bain avec cette vasque profonde gravée, formée en laiton massif et ciselée à la main à Marrakech.',
        'Une cuve à parois droites porte une tresse ciselée tout autour de la paroi extérieure - le même entrelacs que les graveurs de Marrakech taillent encore sur les plateaux à thé, tracé ligne par ligne au burin. L’intérieur est volontairement laissé lisse et martelé pour se nettoyer d’un seul geste.',
        'Parfaite pour salles de bain, WC d’invités, villas de luxe, riads, hôtels de charme, restaurants et autres intérieurs raffinés.',
      ],
    },
    features: [F.handmade, F.solidBrass, F.engraved, F.hammered, F.tradition, F.artisan, F.vessel, F.drain, F.durable, F.easyDecor, F.bathVenues, F.unique, F.custom],
  },

  'atlas-oval-basin': {
    seoTitle: {
      en: 'Handmade Solid Yellow Brass Oval Sink | Hammered Moroccan Bathroom Basin',
      fr: 'Vasque Ovale en Laiton Jaune Massif | Lavabo Marocain Martelé Fait Main',
    },
    lede: {
      en: 'Handmade Solid Yellow Brass Oval Sink - Crafted in Marrakech, Morocco 🇲🇦',
      fr: 'Vasque ovale en laiton jaune massif - Fabriquée à Marrakech, Maroc 🇲🇦',
    },
    body: {
      en: [
        'Bring the timeless beauty of Moroccan craftsmanship into your bathroom with this elegant handmade oval sink, crafted from solid yellow brass and carefully finished by experienced Moroccan artisans in Marrakech.',
        'Each sink is individually handcrafted using traditional metalworking techniques. There is no engraving and no fluting here - just the hammer marks left where they fell. The beautiful hammered surface gives the brass a unique texture, character and luxurious appearance, and every piece is slightly different.',
        'This elegant oval basin is the quietest piece in the catalogue and the one that sits best on a rough wood or stone counter. Perfect for bathrooms, powder rooms, luxury villas, riads, boutique hotels, restaurants and other sophisticated interior spaces.',
      ],
      fr: [
        'Faites entrer la beauté intemporelle de l’artisanat marocain dans votre salle de bain avec cette élégante vasque ovale, façonnée en laiton jaune massif et finie avec soin par des artisans marocains expérimentés à Marrakech.',
        'Chaque vasque est réalisée une à une, selon des techniques de dinanderie traditionnelles. Ni gravure ni cannelure ici - seulement les marques du marteau, laissées telles quelles. La belle surface martelée donne au laiton une texture, un caractère et une allure luxueuse, et chaque pièce diffère légèrement.',
        'Cette vasque ovale est la pièce la plus sobre du catalogue et celle qui va le mieux sur un plan en bois brut ou en pierre. Parfaite pour salles de bain, WC d’invités, villas de luxe, riads, hôtels de charme, restaurants et autres intérieurs raffinés.',
      ],
    },
    features: [F.handmade, F.solidBrass, F.hammered, F.tradition, F.artisan, F.unique, F.vessel, F.drain, F.durable, F.easyDecor, F.bathVenues, F.custom],
    craft: {
      en: 'Every basin is made by hand in our Marrakech workshop. The hammered finish is carefully created by skilled artisans, giving each sink its own distinctive pattern and character. Because each piece is handmade, minor variations in texture, finish and appearance are natural and make every basin unique.',
      fr: 'Chaque vasque est faite à la main dans notre atelier de Marrakech. La finition martelée est créée avec soin par des artisans qualifiés, donnant à chaque pièce son dessin et son caractère propres. Comme chaque pièce est faite main, de légères variations de texture, de finition et d’aspect sont naturelles et rendent chaque vasque unique.',
    },
  },

  /* ─────────────────────────── KITCHEN SINKS ──────────────────────────── */

  'medallion-farmhouse-sink-copper': {
    seoTitle: {
      en: 'Handmade Copper Farmhouse Sink | Hammered Moroccan Apron-Front Kitchen Sink',
      fr: 'Évier de Ferme en Cuivre Fait Main | Évier Marocain Martelé à Tablier',
    },
    lede: {
      en: 'Handmade Hammered Copper Farmhouse Sink - Crafted in Marrakech, Morocco 🇲🇦',
      fr: 'Évier de ferme en cuivre martelé, fait main - Fabriqué à Marrakech, Maroc 🇲🇦',
    },
    body: {
      en: [
        'Bring the timeless beauty of Moroccan craftsmanship into your kitchen with this handmade apron-front farmhouse sink, raised from heavy 16-gauge copper by experienced Moroccan artisans in Marrakech.',
        'A chased rosette sits at the centre of the apron panel, struck by hand before the front is formed. The heavy gauge is not decoration: it holds heat in the bowl and takes a knock without denting. Copper is also naturally antimicrobial, which makes this the one surface in a kitchen that becomes more hygienic the longer you use it.',
        'Made to order in any cabinet width, single or double bowl. Perfect for homes, villas, riads, boutique hotels, restaurants and luxury kitchen projects.',
      ],
      fr: [
        'Faites entrer la beauté intemporelle de l’artisanat marocain dans votre cuisine avec cet évier de ferme à tablier, fait main, formé en cuivre fort 16 gauge par des artisans marocains expérimentés à Marrakech.',
        'Une rosace ciselée orne le centre du tablier, frappée à la main avant que la façade ne soit galbée. L’épaisseur n’est pas décorative : elle garde la chaleur dans la cuve et encaisse les chocs sans se marquer. Le cuivre est aussi naturellement antimicrobien, ce qui en fait la seule surface de la cuisine qui devient plus saine à l’usage.',
        'Fabriqué sur mesure à toute largeur de meuble, en cuve simple ou double. Parfait pour maisons, villas, riads, hôtels de charme, restaurants et projets de cuisine haut de gamme.',
      ],
    },
    features: [F.handmade, F.heavyCopper, F.hammered, F.engraved, F.tradition, F.artisan, F.antimicrobial, F.durable, F.madeToMeasure, F.bathVenues, F.unique, F.custom],
    craft: {
      en: 'Every sink is raised by hand in our Marrakech workshop, then the apron is formed and the rosette chased. Because each piece is handmade, minor variations in texture, finish and appearance are natural and make every sink unique.',
      fr: 'Chaque évier est formé à la main dans notre atelier de Marrakech, puis le tablier est galbé et la rosace ciselée. Comme chaque pièce est faite main, de légères variations de texture, de finition et d’aspect sont naturelles et rendent chaque évier unique.',
    },
  },

  'medallion-farmhouse-sink-brass': {
    seoTitle: {
      en: 'Handmade Solid Brass Farmhouse Sink | Hammered Moroccan Apron Kitchen Sink',
      fr: 'Évier de Ferme en Laiton Massif | Évier Marocain Martelé à Tablier',
    },
    lede: {
      en: 'Handmade Hammered Brass Farmhouse Sink - Crafted in Marrakech, Morocco 🇲🇦',
      fr: 'Évier de ferme en laiton martelé, fait main - Fabriqué à Marrakech, Maroc 🇲🇦',
    },
    body: {
      en: [
        'The medallion farmhouse sink, raised in solid yellow brass instead of copper, and handmade in Marrakech by the same artisans.',
        'Brass is brighter and harder than copper, and it holds its colour far longer in a hard-water kitchen - which is why this is the version most often specified for a working family kitchen rather than a showpiece. The apron carries the same hand-chased rosette, and the bowl is hammered inside and out.',
        'Made to order in any cabinet width, single or double bowl. Perfect for homes, villas, riads, boutique hotels, restaurants and luxury kitchen projects.',
      ],
      fr: [
        'L’évier de ferme médaillon, formé en laiton jaune massif plutôt qu’en cuivre, et fait main à Marrakech par les mêmes artisans.',
        'Le laiton est plus clair et plus dur que le cuivre, et il garde sa couleur bien plus longtemps en eau calcaire - c’est pourquoi c’est cette version qu’on choisit le plus souvent pour une vraie cuisine de famille plutôt que pour une pièce d’apparat. Le tablier porte la même rosace ciselée main, et la cuve est martelée dedans comme dehors.',
        'Fabriqué sur mesure à toute largeur de meuble, en cuve simple ou double. Parfait pour maisons, villas, riads, hôtels de charme, restaurants et projets de cuisine haut de gamme.',
      ],
    },
    features: [F.handmade, F.solidBrass, F.hammered, F.engraved, F.tradition, F.artisan, F.durable, F.madeToMeasure, F.easyDecor, F.bathVenues, F.unique, F.custom],
  },

  'medina-engraved-farmhouse-sink': {
    seoTitle: {
      en: 'Hand-Engraved Copper Farmhouse Sink | Moroccan Chased Apron Kitchen Sink',
      fr: 'Évier de Ferme en Cuivre Gravé Main | Évier Marocain Ciselé à Tablier',
    },
    lede: {
      en: 'Handmade Hand-Engraved Copper Farmhouse Sink - Crafted in Marrakech, Morocco 🇲🇦',
      fr: 'Évier de ferme en cuivre gravé à la main - Fabriqué à Marrakech, Maroc 🇲🇦',
    },
    body: {
      en: [
        'The most labour-intensive piece the workshop makes: a full apron-front copper sink, chased edge to edge in a running vine before the curved front is formed.',
        'The engraving alone is roughly three weeks of one engraver’s time, cut line by line with a burin. Only once the panel is finished is the apron curved, because forming it first would distort the pattern. The bowl behind it is hammered and left smooth enough to clean in one wipe.',
        'Available single or double bowl, with or without a centre drainboard, and made to order to any cabinet width. Built for villas, riads, boutique hotels, restaurants and interior design projects where the sink is the point of the room.',
      ],
      fr: [
        'La pièce la plus longue de l’atelier : un évier à tablier complet en cuivre, ciselé bord à bord de rinceaux avant que la façade galbée ne soit formée.',
        'La gravure seule représente environ trois semaines de travail pour un graveur, tracée ligne par ligne au burin. Ce n’est qu’une fois le panneau terminé que le tablier est galbé, car le former d’abord déformerait le motif. La cuve derrière est martelée et laissée assez lisse pour se nettoyer d’un geste.',
        'Disponible en cuve simple ou double, avec ou sans égouttoir central, et fabriqué sur mesure à toute largeur de meuble. Conçu pour les villas, riads, hôtels de charme, restaurants et projets d’architecture intérieure où l’évier est le sujet de la pièce.',
      ],
    },
    features: [F.handmade, F.heavyCopper, F.engraved, F.hammered, F.tradition, F.artisan, F.antimicrobial, F.durable, F.madeToMeasure, F.bathVenues, F.unique, F.custom],
    craft: {
      en: 'Roughly four to six weeks from order to despatch, of which three are engraving. Because the vine is cut freehand, no two aprons are ever identical - minor variations in the pattern are the signature of the engraver, not a fault.',
      fr: 'Environ quatre à six semaines de la commande à l’expédition, dont trois de gravure. Les rinceaux étant tracés à main levée, aucun tablier n’est identique à un autre : les variations du motif sont la signature du graveur, pas un défaut.',
    },
  },

  'atlas-workstation-sink': {
    seoTitle: {
      en: 'Handmade Copper Undermount Workstation Sink | Moroccan Kitchen Sink with Rail',
      fr: 'Évier Sous-Plan en Cuivre Fait Main | Évier Marocain avec Barre Intégrée',
    },
    lede: {
      en: 'Handmade Hammered Copper and Brass Workstation Sink - Crafted in Marrakech 🇲🇦',
      fr: 'Évier plan de travail en cuivre et laiton martelés - Fabriqué à Marrakech 🇲🇦',
    },
    body: {
      en: [
        'A square undermount bowl with a solid metal rail welded across the front face, handmade in Marrakech by experienced Moroccan artisans.',
        'Hammered inside and out, the bowl disappears beneath a stone counter and leaves only the metal edge and the rail visible. The rail is not a fitting bought in - it is bent and welded in the workshop from the same stock as the bowl, so the colour and the hammer texture carry straight across.',
        'Available in copper or brass and made to order to any cabinet width. Built for working kitchens in homes, villas, riads, restaurants and interior design projects.',
      ],
      fr: [
        'Une cuve carrée sous-plan avec une barre en métal massif soudée en façade, faite main à Marrakech par des artisans marocains expérimentés.',
        'Martelée dedans comme dehors, la cuve disparaît sous un plan en pierre et ne laisse voir que l’arête du métal et la barre. Cette barre n’est pas un accessoire acheté : elle est cintrée et soudée à l’atelier dans la même matière que la cuve, pour que la couleur et le martelage se prolongent sans rupture.',
        'Disponible en cuivre ou en laiton, fabriqué sur mesure à toute largeur de meuble. Conçu pour les vraies cuisines de maisons, villas, riads, restaurants et projets d’architecture intérieure.',
      ],
    },
    features: [F.handmade, F.heavyCopper, F.hammered, F.tradition, F.artisan, F.antimicrobial, F.durable, F.madeToMeasure, F.bathVenues, F.unique, F.custom],
  },

  'marrakech-bridge-sink': {
    seoTitle: {
      en: 'Handmade Copper Undermount Sink | Plain Hammered Moroccan Kitchen Bowl',
      fr: 'Évier Sous-Plan en Cuivre Fait Main | Cuve Marocaine Martelée Sobre',
    },
    lede: {
      en: 'Handmade Hammered Copper and Brass Undermount Sink - Crafted in Marrakech 🇲🇦',
      fr: 'Évier sous-plan en cuivre et laiton martelés - Fabriqué à Marrakech 🇲🇦',
    },
    body: {
      en: [
        'No apron, no medallion, no engraving - a deep hammered bowl set under stone, handmade in Marrakech by experienced Moroccan artisans.',
        'Available round or rectangular, in copper or brass. This is the sink to specify when the counter is meant to be the star and the sink simply has to be beautiful quietly: only the hammered rim shows above the stone, and it catches the light without asking for attention.',
        'Made to order to any cabinet width. Perfect for homes, villas, riads, boutique hotels, restaurants and interior design projects.',
      ],
      fr: [
        'Ni tablier, ni médaillon, ni gravure - une cuve profonde martelée, posée sous la pierre, faite main à Marrakech par des artisans marocains expérimentés.',
        'Disponible en rond ou en rectangulaire, en cuivre ou en laiton. C’est l’évier qu’on choisit quand c’est le plan qui doit primer et que l’évier doit être beau sans se faire remarquer : seul le bord martelé dépasse de la pierre, et il accroche la lumière sans réclamer l’attention.',
        'Fabriqué sur mesure à toute largeur de meuble. Parfait pour maisons, villas, riads, hôtels de charme, restaurants et projets d’architecture intérieure.',
      ],
    },
    features: [F.handmade, F.heavyCopper, F.hammered, F.tradition, F.artisan, F.antimicrobial, F.durable, F.madeToMeasure, F.easyDecor, F.bathVenues, F.unique, F.custom],
  },

  /* ────────────────────────── SPA & ACCESSORIES ───────────────────────── */

  'hammam-bath-bowl': {
    seoTitle: {
      en: 'Handmade Copper Hammam Bowl | Moroccan Foot Bath & Spa Basin',
      fr: 'Bassine de Hammam en Cuivre Fait Main | Bain de Pieds Marocain',
    },
    lede: {
      en: 'Handmade Hammered Copper Hammam Bath Bowl - Crafted in Marrakech, Morocco 🇲🇦',
      fr: 'Bassine de hammam en cuivre martelé, faite main - Fabriquée à Marrakech, Maroc 🇲🇦',
    },
    body: {
      en: [
        'The wide, low copper bowl used in Moroccan bathhouses, handmade in Marrakech using the same techniques the hammams have relied on for generations.',
        'Big enough for both feet, shallow enough to carry full. Copper holds heat far longer than steel or ceramic, which is the entire reason the hammams have never switched material. The whole bowl is raised from one disc and hammered by hand, so there are no seams to trap water.',
        'Perfect for home spas, hammams, wellness centres, riads, boutique hotels and treatment rooms - and it works as a decorative bowl when it is not in use.',
      ],
      fr: [
        'La bassine en cuivre large et basse des hammams marocains, faite main à Marrakech selon les techniques mêmes dont les hammams dépendent depuis des générations.',
        'Assez grande pour les deux pieds, assez basse pour être portée pleine. Le cuivre garde la chaleur bien plus longtemps que l’acier ou la céramique - c’est précisément pour cela que les hammams n’ont jamais changé de matière. La bassine entière est formée d’un seul disque et martelée à la main : aucune soudure où l’eau puisse stagner.',
        'Parfaite pour spas privés, hammams, centres de bien-être, riads, hôtels de charme et cabines de soin - et elle sert de coupe décorative entre deux usages.',
      ],
    },
    features: [F.handmade, F.redCopper, F.hammered, F.tradition, F.artisan, F.durable, F.easyDecor, F.bathVenues, F.unique, F.custom],
  },

  'brass-tumbler-holder': {
    seoTitle: {
      en: 'Solid Brass Wall Tumbler Holder | Handmade Moroccan Bathroom Accessory',
      fr: 'Porte-Gobelet Mural en Laiton Massif | Accessoire de Salle de Bain Marocain',
    },
    lede: {
      en: 'Handmade Solid Brass Wall-Mounted Tumbler Holder - Crafted in Marrakech 🇲🇦',
      fr: 'Porte-gobelet mural en laiton massif, fait main - Fabriqué à Marrakech 🇲🇦',
    },
    body: {
      en: [
        'A wall-mounted tumbler holder in solid yellow brass, handmade in Marrakech and sold complete with its tumbler.',
        'Solid brass throughout - not plated steel - so it can never blister or flake in a wet room, which is what eventually happens to almost every plated bathroom fitting. Left alone it ages to a soft gold; wiped with a cloth it stays bright. Screws and wall plugs are included.',
        'A small piece that finishes a bathroom in a villa, riad, boutique hotel or guest washroom.',
      ],
      fr: [
        'Un porte-gobelet mural en laiton jaune massif, fait main à Marrakech et vendu avec son gobelet.',
        'Laiton massif de part en part - pas d’acier plaqué - il ne peut donc ni cloquer ni s’écailler en pièce humide, ce qui finit par arriver à presque tous les accessoires plaqués. Laissé tel quel, il prend une patine dorée douce ; essuyé d’un chiffon, il reste brillant. Vis et chevilles incluses.',
        'Une petite pièce qui achève une salle de bain de villa, de riad, d’hôtel de charme ou de WC d’invités.',
      ],
    },
    features: [F.handmade, F.solidBrass, F.noPlating, F.tradition, F.artisan, F.durable, F.easyDecor, F.bathVenues, F.unique, F.custom],
  },
};

/** The long-form listing for a product, or null when it has none yet. */
export const story = (slug) => STORIES[slug] ?? null;
