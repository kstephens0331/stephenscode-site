// One-time (idempotent) setup script: creates a real Stripe Product for each of the
// 7 checkout tiers, so checkout sessions reference a real catalog item in the Stripe
// dashboard instead of an ad-hoc unnamed charge. Prices themselves are computed
// dynamically at checkout time (full amount, 50% deposit, 20% down + installments all
// derive from the same tier price), so this script only needs to create Products, not
// every price variant.
//
// Safe to re-run: looks up existing products by metadata.internalSlug before creating.
//
// Usage: node scripts/create-stripe-catalog.js
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const Stripe = require('stripe');
const { TIERS } = require('../lib/pricing-catalog');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const OUTPUT_PATH = path.join(__dirname, '..', 'stripe-catalog.json');

async function findExistingProduct(slug) {
  const search = await stripe.products.search({
    query: `metadata['internalSlug']:'${slug}'`,
  });
  return search.data[0] || null;
}

async function main() {
  if (!process.env.STRIPE_SECRET_KEY) {
    console.error('STRIPE_SECRET_KEY is not set. Aborting -- refusing to run without real credentials.');
    process.exit(1);
  }

  const catalog = fs.existsSync(OUTPUT_PATH)
    ? JSON.parse(fs.readFileSync(OUTPUT_PATH, 'utf8'))
    : {};

  for (const tier of TIERS) {
    let product = await findExistingProduct(tier.slug);

    if (!product) {
      product = await stripe.products.create({
        name: tier.name,
        metadata: { internalSlug: tier.slug, basePriceUsd: String(tier.priceUsd) },
      });
      console.log(`Created product for ${tier.slug}: ${product.id}`);
    } else {
      console.log(`Found existing product for ${tier.slug}: ${product.id}`);
    }

    catalog[tier.slug] = { productId: product.id, basePriceUsd: tier.priceUsd };
  }

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(catalog, null, 2) + '\n');
  console.log(`\nWrote ${OUTPUT_PATH}`);
}

main().catch((err) => {
  console.error('Catalog setup failed:', err);
  process.exit(1);
});
