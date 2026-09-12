export const SHOP = {
  name: 'Copper Atlas Design',
  tagline: { en: 'Marrakech · Hand Hammered', fr: 'Marrakech · Martelé Main' },
  city: 'Marrakech',
  country: 'Morocco',
  email: 'hello@copperatlasdesign.com',
  // E.164, digits only - used to build the wa.me link.
  whatsapp: '212600000000',
  instagram: 'https://instagram.com/copperatlasdesign',
  facebook: 'https://www.facebook.com/profile.php?id=100063544693929',
  currency: 'USD',
  currencySymbol: '$',
  freeShippingOver: 400,
  url: 'https://copperatlasdesign.com',
};

export const money = (n) =>
  n == null ? null : `${SHOP.currencySymbol}${n.toLocaleString('en-US')}`;

export const waLink = (text) =>
  `https://wa.me/${SHOP.whatsapp}?text=${encodeURIComponent(text)}`;
