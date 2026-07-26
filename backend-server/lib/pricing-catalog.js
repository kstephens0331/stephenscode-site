// Single source of truth for the 7 self-serve checkout tiers.
// Mirrors stephenscode-marketing/lib/services-data.ts (corePackages + premiumBuilds),
// excluding "enterprise-custom" (price: 0, always a bespoke quote, never self-serve checkout).
const TIERS = [
  { slug: 'plug-and-play', name: 'Plug and Play', priceUsd: 250 },
  { slug: 'website-rebuild', name: 'Website Rebuild', priceUsd: 350 },
  { slug: 'standard-website', name: 'Standard Website', priceUsd: 950 },
  { slug: 'ecommerce-website', name: 'E-Commerce Website', priceUsd: 1100 },
  { slug: 'premium-build', name: 'Premium Build', priceUsd: 2000 },
  { slug: 'custom-business-platform', name: 'Custom Business Platform', priceUsd: 5000 },
  { slug: 'enterprise-platform', name: 'Enterprise Platform', priceUsd: 7500 },
];

const PLAN_TYPES = ['full', 'deposit50', 'installment6', 'installment12'];

function getTier(slug) {
  return TIERS.find((t) => t.slug === slug);
}

let catalogCache = null;
function loadStripeCatalog() {
  if (catalogCache) return catalogCache;
  try {
    // Written by scripts/create-stripe-catalog.js. Maps tier slug -> Stripe Product id.
    catalogCache = require('../stripe-catalog.json');
  } catch (err) {
    catalogCache = {};
  }
  return catalogCache;
}

function getStripeProductId(slug) {
  return loadStripeCatalog()[slug]?.productId || null;
}

module.exports = { TIERS, PLAN_TYPES, getTier, getStripeProductId, loadStripeCatalog };
