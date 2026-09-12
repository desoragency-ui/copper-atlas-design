export const LANGS = ['en', 'fr'];
export const DEFAULT_LANG = 'en';

export const isLang = (l) => LANGS.includes(l);

/** Pick the right half of a `{en, fr}` field. */
export const t = (field, lang) => {
  if (field == null) return '';
  if (typeof field === 'string') return field;
  return field[lang] ?? field[DEFAULT_LANG] ?? '';
};

export const DICT = {
  en: {
    /* chrome */
    skip: 'Skip to content',
    shop: 'Shop',
    collections: 'Collections',
    allProducts: 'All pieces',
    workshop: 'The Workshop',
    trade: 'Trade & Hospitality',
    contact: 'Contact',
    cart: 'Cart',
    menu: 'Menu',
    close: 'Close',
    search: 'Search',
    currency: 'USD',

    /* announcement */
    announce: [
      'Hand-hammered in Marrakech - never machine-pressed',
      'Worldwide shipping, tracked & insured',
      'Every piece made to order by one artisan',
      'Free shipping on orders over $400',
    ],

    /* home */
    heroEyebrow: 'Marrakech · Since the old medina',
    heroTitle: 'Light, beaten\nout of raw metal',
    heroLead:
      'Copper Atlas Design is a Marrakech workshop raising lighting and basins from flat sheets of copper and brass - one hammer, one artisan, one piece at a time.',
    heroCta: 'Explore the collection',
    heroCta2: 'Watch it being made',
    scroll: 'Scroll',

    shopByRoom: 'Shop by category',
    categoriesLead: 'Six families of work, all from the same bench.',
    signature: 'Signature pieces',
    signatureLead: 'The work the workshop is known for.',
    viewAll: 'View all',
    viewPiece: 'View piece',

    craftTitle: 'Nothing here comes out of a press',
    craftLead:
      'A machine can stamp a thousand identical shades a day. A hammer cannot. That difference is the whole business.',
    craftSteps: [
      { n: '01', t: 'The flat disc', d: 'Every piece starts as a plain sheet of copper or brass, cut to a circle by hand.' },
      { n: '02', t: 'The raising', d: 'Thousands of hammer strikes drive the metal into shape from the centre outward. Hours per shade.' },
      { n: '03', t: 'The finish', d: 'Polished to a mirror, taken down to near-black, or dropped into a patina bath and left to react.' },
      { n: '04', t: 'The wiring', d: 'Solid brass E27 socket, adjustable black cable, matte black canopy, 110-240 V. Ready to hang.' },
    ],

    finishTitle: 'Two finishes, two entirely different rooms',
    finishLead:
      'The same form reads warm and reflective in Gold Copper, quiet and architectural in Oil-Rubbed. Drag to compare.',

    trustTitle: 'Buying a handmade object from abroad',
    trustItems: [
      { t: 'Made to order', d: 'Your piece is started after you order it. Nothing sits in a warehouse.' },
      { t: 'Tracked worldwide', d: 'DHL / FedEx with insurance and a tracking number on every parcel.' },
      { t: '14-day returns', d: 'Unused and in its packaging, returned for a refund minus shipping.' },
      { t: 'Talk to the maker', d: 'Questions on sizing or finish go straight to the workshop, not a call centre.' },
    ],

    storyTitle: 'From a bench in the medina',
    storyLead:
      'Tarik El Ouirgani has worked copper in Marrakech for over twenty years. Copper Atlas Design is his workshop - the same hand that beats the metal answers the messages.',
    storyCta: 'Read the story',

    /* listing */
    filterFinish: 'Finish',
    filterCategory: 'Category',
    filterAll: 'All',
    sort: 'Sort',
    sortFeatured: 'Featured',
    sortPriceLow: 'Price, low to high',
    sortPriceHigh: 'Price, high to low',
    sortAZ: 'A to Z',
    results: 'pieces',
    noResults: 'Nothing matches those filters yet.',
    clearFilters: 'Clear filters',

    /* product */
    from: 'From',
    priceOnRequest: 'Price on request',
    requestPrice: 'Request a price',
    size: 'Diameter',
    finish: 'Finish',
    qty: 'Quantity',
    addToCart: 'Add to cart',
    added: 'Added',
    adding: 'Adding…',
    inStock: 'Made to order · ships in 2-3 weeks',
    sizeGuide: 'Which size?',
    specifications: 'Specifications',
    included: 'What arrives',
    includedItems: [
      'The piece, hand-finished and inspected',
      'Complete fitting kit and fixings',
      'Care card and workshop certificate',
      'Double-boxed with moulded protection',
    ],
    shippingTitle: 'Shipping & returns',
    shippingBody:
      'Made to order in Marrakech and shipped worldwide by DHL or FedEx, tracked and insured. Production takes 2-3 weeks, delivery a further 3-6 working days. Import duties are not included and are payable on delivery. 14-day returns on unused pieces.',
    careTitle: 'Living with copper',
    careBody:
      'Copper and brass are alive. Left alone they deepen; wiped with a soft cloth they stay bright. Never use an abrasive or an acid cleaner. Patina finishes will keep shifting for months - that is the material working, not a fault.',
    askTitle: 'Not sure it fits?',
    askBody: 'Send the room measurements and a photo. You get an answer from the workshop, usually same day.',
    askCta: 'Ask about this piece',
    youMayLike: 'Pairs well with',
    backTo: 'Back to',

    /* reviews */
    reviews: 'Reviews',
    reviewsTitle: 'What buyers say',
    basedOn: 'based on',
    reviewCount: 'reviews',
    writeReview: 'Write a review',
    verified: 'Verified buyer',
    noReviews: 'No reviews yet for this piece.',
    beFirst: 'Be the first to review it',
    sortReviews: 'Sort reviews',
    mostRecent: 'Most recent',
    highestRated: 'Highest rated',
    lowestRated: 'Lowest rated',
    mostHelpful: 'Most helpful',
    helpful: 'Helpful',
    showMore: 'Show more reviews',
    ratingBreakdown: 'Rating breakdown',

    /* cart & checkout */
    cartTitle: 'Your cart',
    cartEmpty: 'Your cart is empty.',
    cartEmptyCta: 'Browse the collection',
    subtotal: 'Subtotal',
    shippingAtCheckout: 'Shipping quoted at checkout',
    checkout: 'Checkout',
    continueShopping: 'Continue shopping',
    remove: 'Remove',
    orderSummary: 'Order summary',
    yourDetails: 'Your details',
    name: 'Full name',
    email: 'Email',
    phone: 'Phone / WhatsApp',
    country: 'Country',
    city: 'City',
    address: 'Address',
    notes: 'Anything we should know?',
    notesPh: 'Ceiling height, cabinet width, a deadline…',
    placeOrder: 'Send order to the workshop',
    sending: 'Sending…',
    orderVia: 'You will get a written quote with shipping before any payment is taken.',
    orSendWhatsapp: 'Or send it on WhatsApp',
    orderSent: 'Order sent',
    orderSentBody: 'The workshop has your order and will reply with a full quote including shipping.',
    required: 'required',

    /* footer */
    newsletter: 'New pieces, first look',
    newsletterBody: 'One email when something new leaves the bench. Nothing else.',
    subscribe: 'Subscribe',
    emailPh: 'you@email.com',
    footerShop: 'Shop',
    footerHelp: 'Help',
    footerAbout: 'Workshop',
    faq: 'FAQ',
    shippingReturns: 'Shipping & returns',
    care: 'Care guide',
    rights: 'All rights reserved.',
    handmade: 'Hand-hammered in Marrakech, Morocco',
  },

  fr: {
    skip: 'Aller au contenu',
    shop: 'Boutique',
    collections: 'Collections',
    allProducts: 'Toutes les pièces',
    workshop: 'L’Atelier',
    trade: 'Professionnels & Hôtellerie',
    contact: 'Contact',
    cart: 'Panier',
    menu: 'Menu',
    close: 'Fermer',
    search: 'Rechercher',
    currency: 'USD',

    announce: [
      'Martelé main à Marrakech - jamais pressé à la machine',
      'Livraison mondiale, suivie et assurée',
      'Chaque pièce façonnée à la commande par un seul artisan',
      'Livraison offerte dès 400 $',
    ],

    heroEyebrow: 'Marrakech · Depuis la vieille médina',
    heroTitle: 'La lumière,\nmartelée dans le métal',
    heroLead:
      'Copper Atlas Design est un atelier de Marrakech qui façonne luminaires et vasques à partir de feuilles de cuivre et de laiton - un marteau, un artisan, une pièce à la fois.',
    heroCta: 'Découvrir la collection',
    heroCta2: 'Voir la fabrication',
    scroll: 'Défiler',

    shopByRoom: 'Par catégorie',
    categoriesLead: 'Six familles de pièces, toutes nées du même établi.',
    signature: 'Pièces signature',
    signatureLead: 'Le travail qui fait la réputation de l’atelier.',
    viewAll: 'Tout voir',
    viewPiece: 'Voir la pièce',

    craftTitle: 'Rien ici ne sort d’une presse',
    craftLead:
      'Une machine estampe mille abat-jour identiques par jour. Un marteau, non. Toute la maison tient dans cette différence.',
    craftSteps: [
      { n: '01', t: 'Le disque plat', d: 'Chaque pièce commence par une simple feuille de cuivre ou de laiton, découpée en cercle à la main.' },
      { n: '02', t: 'La levée', d: 'Des milliers de coups de marteau font monter le métal, du centre vers l’extérieur. Des heures par abat-jour.' },
      { n: '03', t: 'La finition', d: 'Poli miroir, poussé presque au noir, ou plongé dans un bain de patine et laissé libre de réagir.' },
      { n: '04', t: 'Le câblage', d: 'Douille laiton massif E27, câble noir ajustable, rosace noir mat, 110-240 V. Prêt à poser.' },
    ],

    finishTitle: 'Deux finitions, deux pièces entièrement différentes',
    finishLead:
      'La même forme se lit chaude et réfléchissante en Cuivre Doré, sobre et architecturale en Cuivre Patiné. Glissez pour comparer.',

    trustTitle: 'Acheter un objet fait main depuis l’étranger',
    trustItems: [
      { t: 'Fait à la commande', d: 'Votre pièce est commencée après votre commande. Rien ne dort en entrepôt.' },
      { t: 'Suivi mondial', d: 'DHL / FedEx, assurance et numéro de suivi sur chaque colis.' },
      { t: 'Retours 14 jours', d: 'Non utilisée et dans son emballage, remboursée hors frais de port.' },
      { t: 'Parler à l’artisan', d: 'Vos questions de taille ou de finition vont à l’atelier, pas à un centre d’appel.' },
    ],

    storyTitle: 'Depuis un établi de la médina',
    storyLead:
      'Tarik El Ouirgani travaille le cuivre à Marrakech depuis plus de vingt ans. Copper Atlas Design est son atelier - la main qui bat le métal est celle qui répond aux messages.',
    storyCta: 'Lire l’histoire',

    filterFinish: 'Finition',
    filterCategory: 'Catégorie',
    filterAll: 'Toutes',
    sort: 'Trier',
    sortFeatured: 'En vedette',
    sortPriceLow: 'Prix croissant',
    sortPriceHigh: 'Prix décroissant',
    sortAZ: 'De A à Z',
    results: 'pièces',
    noResults: 'Aucune pièce ne correspond à ces filtres.',
    clearFilters: 'Effacer les filtres',

    from: 'À partir de',
    priceOnRequest: 'Prix sur demande',
    requestPrice: 'Demander le prix',
    size: 'Diamètre',
    finish: 'Finition',
    qty: 'Quantité',
    addToCart: 'Ajouter au panier',
    added: 'Ajouté',
    adding: 'Ajout…',
    inStock: 'Fait à la commande · expédié sous 2-3 semaines',
    sizeGuide: 'Quelle taille ?',
    specifications: 'Caractéristiques',
    included: 'Ce que vous recevez',
    includedItems: [
      'La pièce, finie et contrôlée à la main',
      'Kit de fixation complet',
      'Carte d’entretien et certificat d’atelier',
      'Double emballage avec calage moulé',
    ],
    shippingTitle: 'Livraison & retours',
    shippingBody:
      'Fabriqué à la commande à Marrakech et expédié dans le monde entier par DHL ou FedEx, suivi et assuré. Comptez 2-3 semaines de fabrication, puis 3-6 jours ouvrés de livraison. Droits de douane non inclus, payables à la livraison. Retours sous 14 jours sur pièce non utilisée.',
    careTitle: 'Vivre avec le cuivre',
    careBody:
      'Le cuivre et le laiton sont vivants. Laissés tranquilles, ils foncent ; essuyés au chiffon doux, ils restent clairs. Jamais d’abrasif ni de nettoyant acide. Les patines continuent d’évoluer des mois durant - c’est la matière qui travaille, pas un défaut.',
    askTitle: 'Un doute sur les dimensions ?',
    askBody: 'Envoyez les mesures de la pièce et une photo. L’atelier répond, généralement le jour même.',
    askCta: 'Poser une question',
    youMayLike: 'S’accorde avec',
    backTo: 'Retour à',

    reviews: 'Avis',
    reviewsTitle: 'Ce que disent les acheteurs',
    basedOn: 'sur la base de',
    reviewCount: 'avis',
    writeReview: 'Laisser un avis',
    verified: 'Achat vérifié',
    noReviews: 'Pas encore d’avis pour cette pièce.',
    beFirst: 'Soyez le premier à en laisser un',
    sortReviews: 'Trier les avis',
    mostRecent: 'Plus récents',
    highestRated: 'Mieux notés',
    lowestRated: 'Moins bien notés',
    mostHelpful: 'Plus utiles',
    helpful: 'Utile',
    showMore: 'Voir plus d’avis',
    ratingBreakdown: 'Répartition des notes',

    cartTitle: 'Votre panier',
    cartEmpty: 'Votre panier est vide.',
    cartEmptyCta: 'Parcourir la collection',
    subtotal: 'Sous-total',
    shippingAtCheckout: 'Livraison chiffrée à la commande',
    checkout: 'Commander',
    continueShopping: 'Continuer mes achats',
    remove: 'Retirer',
    orderSummary: 'Récapitulatif',
    yourDetails: 'Vos coordonnées',
    name: 'Nom complet',
    email: 'E-mail',
    phone: 'Téléphone / WhatsApp',
    country: 'Pays',
    city: 'Ville',
    address: 'Adresse',
    notes: 'Quelque chose à nous signaler ?',
    notesPh: 'Hauteur sous plafond, largeur de meuble, une date…',
    placeOrder: 'Envoyer la commande à l’atelier',
    sending: 'Envoi…',
    orderVia: 'Vous recevrez un devis écrit avec les frais de port avant tout paiement.',
    orSendWhatsapp: 'Ou envoyer sur WhatsApp',
    orderSent: 'Commande envoyée',
    orderSentBody: 'L’atelier a votre commande et répondra avec un devis complet, livraison incluse.',
    required: 'obligatoire',

    newsletter: 'Les nouvelles pièces, en avant-première',
    newsletterBody: 'Un e-mail quand une pièce quitte l’établi. Rien d’autre.',
    subscribe: 'S’inscrire',
    emailPh: 'vous@email.com',
    footerShop: 'Boutique',
    footerHelp: 'Aide',
    footerAbout: 'Atelier',
    faq: 'FAQ',
    shippingReturns: 'Livraison & retours',
    care: 'Guide d’entretien',
    rights: 'Tous droits réservés.',
    handmade: 'Martelé main à Marrakech, Maroc',
  },
};

export const dict = (lang) => DICT[isLang(lang) ? lang : DEFAULT_LANG];
