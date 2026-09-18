import type { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';
import { products } from '../src/data/products.js';

// STRIPE_SECRET_KEY must be set as an environment variable in your Vercel
// project settings (Project -> Settings -> Environment Variables).
// NEVER prefix it with VITE_ and never commit it - it must stay server-side only.
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

const SHIPPING_CH = 18.9;
const SHIPPING_INT = 67.0;
const SWISS_NAMES = ['schweiz', 'switzerland', 'suisse', 'svizzera', 'ch'];

interface CartLine {
  productId: string;
  quantity: number;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { items, email, country, origin } = req.body as {
      items: CartLine[];
      email?: string;
      country?: string;
      origin?: string;
    };

    if (!Array.isArray(items) || items.length === 0) {
      res.status(400).json({ error: 'Cart is empty' });
      return;
    }

    // Look up every price from OUR OWN product data - never trust a price
    // sent by the browser. This is what stops someone from editing the
    // cart in devtools/localStorage to pay less.
    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
    for (const line of items) {
      const product = products.find((p) => p.id === line.productId);
      const quantity = Math.max(1, Math.min(20, Math.floor(Number(line.quantity) || 1)));
      if (!product) {
        res.status(400).json({ error: `Unknown product: ${line.productId}` });
        return;
      }
      line_items.push({
        quantity,
        price_data: {
          currency: 'chf',
          unit_amount: Math.round(product.price * 100),
          product_data: {
            name: product.name,
            images: product.images?.[0] ? [product.images[0]] : undefined,
            metadata: { sku: product.sku, productId: product.id },
          },
        },
      });
    }

    // Same rule the frontend uses to show the shipping estimate - computed
    // here again server-side so it can't be tampered with either.
    const isSwiss = SWISS_NAMES.includes((country || '').trim().toLowerCase());
    const shippingAmount = isSwiss ? SHIPPING_CH : SHIPPING_INT;

    const siteOrigin = origin || `https://${req.headers.host}`;

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items,
      customer_email: email || undefined,
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: { amount: Math.round(shippingAmount * 100), currency: 'chf' },
            display_name: isSwiss ? 'Versand Schweiz' : 'Internationaler Versand',
          },
        },
      ],
      success_url: `${siteOrigin}/#/order-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteOrigin}/#/order-cancelled`,
    });

    res.status(200).json({ url: session.url });
  } catch (err) {
    console.error('create-checkout-session error', err);
    res.status(500).json({ error: 'Checkout session could not be created' });
  }
}
