# Hopla

Hopla is a small catalog website for kids' products. It is not an online store: visitors browse the catalog, open a product page, view the photos/details, then contact Hopla on WhatsApp to order.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

Useful checks:

```bash
npm run lint
npx tsc --noEmit
npm run build
```

## Edit products

Products live in [`data/products.ts`](data/products.ts). To add a product:

1. Add the product photos to `public/images`.
2. Add one object to the `products` array.
3. Use image paths like `/images/my-photo.jpg`.
4. Keep missing facts as `TODO:` until confirmed.

Prices use MAD and display as `149 DH` when `price` is a number. Use `price: null` when the price still needs confirmation.

## Edit reviews

Reviews live in [`data/reviews.ts`](data/reviews.ts). The current reviews are placeholders and should be replaced with real customer messages before launch.

Two review types are supported:

- `type: "text"` for normal quotes.
- `type: "screenshot"` for a WhatsApp or Instagram screenshot image.

## Change WhatsApp number

The WhatsApp number is read from:

```bash
NEXT_PUBLIC_WHATSAPP_NUMBER=212751246331
```

Copy `.env.example` to `.env.local` and change the number there. Keep only digits, without `+`.

## Change the public site URL

Set this before deploying so product links and sharing metadata are absolute:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## Main Copy And FAQ

Most site copy is in [`lib/content.ts`](lib/content.ts), including the tagline, navigation labels, FAQ answers, trust points, and the placeholder checklist.

## Deploy On Vercel

1. Push the project to a Git repository.
2. Import it in Vercel.
3. Add the environment variables from `.env.example`.
4. Deploy. No database, API key, or external service is required.

## Asset Notes

The supplied product photos are in `public/images`. The logo was supplied as a PDF; the header uses a lightweight Hopla wordmark component inspired by the visible logo because no transparent PNG/SVG logo asset was available.
