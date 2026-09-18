# MOTORIVA

React/Vite source exported from SiteDrop.

## Run locally

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env` and add any required values.
3. Start the development server with `npm run dev`.

Saved API keys and other secret environment-variable values are intentionally not included in this download.

## Stripe checkout (backend)

Checkout now creates a real Stripe Checkout Session covering the entire cart
(all products, correct quantities, and shipping automatically calculated from
the delivery country) via the serverless function in `api/create-checkout-session.ts`.
Prices and shipping are looked up server-side from `src/data/products.ts`, so
they can't be manipulated in the browser.

### Deploying (Vercel)

1. Push this project to a GitHub repo and import it on [vercel.com](https://vercel.com) - Vercel auto-detects the Vite frontend and the `api/` folder.
2. In the Vercel project, go to **Settings -> Environment Variables** and add:
   - `STRIPE_SECRET_KEY` = your Stripe **secret** key (starts with `sk_live_...` or `sk_test_...` for testing). Never put this in `.env` or commit it - it must only live in Vercel's environment variables, never with a `VITE_` prefix.
3. Deploy. Test first with your Stripe **test** secret key and Stripe's test card `4242 4242 4242 4242`.
4. Once everything works, switch `STRIPE_SECRET_KEY` to your **live** secret key.

Successful payments redirect to `/#/order-success`, cancelled ones to `/#/order-cancelled` (cart stays intact so the customer can try again).

If you deploy anywhere other than Vercel, you'll need an equivalent way to run `api/create-checkout-session.ts` as a server endpoint reachable at `/api/create-checkout-session` (e.g. Netlify Functions, or a small Node/Express server) with the `STRIPE_SECRET_KEY` set there.
