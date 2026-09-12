# Getting real reviews — the fast, legal way

The store ships with an empty review list on purpose. Invented testimonials are
illegal in the markets this shop sells into (US FTC 16 CFR Part 465, UK DMCC Act
2024, EU UCPD/Omnibus) and the penalty falls on Tarik, not on whoever wrote them.
A handmade workshop also does not need them: buyers of a $300 hand-hammered lamp
read the reviews closely, and two real ones outperform twenty invented ones.

Target: **10–15 genuine reviews within six weeks.**

---

## 1. Harvest what already exists (day one, free)

Tarik has years of buyer messages sitting in three places:

- **Facebook page** — comments and recommendations on
  `Creation-el ouirgani tarik design`
- **WhatsApp / Telegram** — past buyers who sent thanks or photos
- **Any marketplace feedback** — Etsy, Instagram DMs

For each one, message the buyer:

> Hi [name] — you bought the [piece] from us last [month]. We've just launched a
> proper website and we'd like to put your words on the product page. Is it okay
> if we use what you wrote, with just your first name and last initial? If you'd
> rather write something new, even one line is perfect.

Keep the reply. Paste the wording **verbatim** into `REAL_REVIEWS` — do not
improve their English, do not lengthen it. A three-word review reads as real
because it is.

## 2. Ask every new buyer (ongoing, automatic)

Send this **10 days after delivery**, not on dispatch — they need to have lived
with it and hung it.

**WhatsApp / email, English:**

> Hi [name], your [piece] should have been up for a week or so now.
>
> Two quick things:
> 1. If anything isn't right — finish, fitting, anything — tell me and I'll sort it.
> 2. If it is right, would you write me a line or two for the website? Even one
>    sentence helps the next person decide. A photo of it in your room is worth
>    even more, if you don't mind it being shown.
>
> Thank you either way — Tarik

**French:**

> Bonjour [nom], votre [pièce] doit être installée depuis une semaine environ.
>
> Deux choses :
> 1. Si quelque chose ne va pas — finition, fixation, quoi que ce soit — dites-le-moi
>    et je m'en occupe.
> 2. Si tout va bien, accepteriez-vous d'écrire une ligne ou deux pour le site ?
>    Même une phrase aide la personne suivante à se décider. Une photo chez vous
>    vaut encore plus, si vous acceptez qu'elle soit montrée.
>
> Merci dans tous les cas — Tarik

Asking about problems first is what makes this work: it reads as service, not as
a review farm, and it catches a complaint before it becomes a public one.

## 3. Entering a review

In `src/data/reviews.js`:

```js
export const REAL_REVIEWS = [
  {
    product: 'zahra-fluted-basin',   // must match a slug in products.js
    name: 'Claire D.',               // first name + initial, as they agreed
    country: 'FR',                   // ISO-2
    rating: 5,
    date: '2026-03-02',              // ISO
    title: 'Deeper than it looks online',
    body: 'The flutes are much deeper in person…',   // their words, unedited
    verified: true,                  // ONLY if you can match it to an order
    finish: 'gold',                  // optional
    size: 40,                        // optional, cm
    photos: ['/reviews/claire-01.webp'],  // optional, file in /public/reviews
    helpful: 0,
  },
];
```

`verified: true` means a real order exists for that person. It puts a green
"Verified buyer" badge on the review, and claiming it falsely is the same
offence as inventing the review.

## 4. Photos

A customer photo outperforms everything else on the page. When someone sends
one, ask explicitly: *"May I show this photo on the website?"* Save the reply.
Drop the file into `public/reviews/`, resize to about 1000px wide, save as WebP.

## 5. What never to do

- Write a review yourself, or have staff or family write one
- Pay for reviews, or trade a discount for a positive one specifically
  (offering a discount for *a review, positive or not* is legal in most markets
  but must be disclosed — simpler not to)
- Edit a review's meaning, or delete negative ones to lift the average
- Show an aggregate rating built from anything but real reviews

A 4.6 average with two three-star reviews in it converts better than a
suspicious flat 5.0. Leave the imperfect ones up.
