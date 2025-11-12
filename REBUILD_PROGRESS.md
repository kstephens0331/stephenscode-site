# StephensCode Website Rebuild - Progress Report

## ✅ Completed (Phase 1)

### 1. New Next.js 14 Marketing Site Created
**Location:** `stephenscode-marketing/`

**Status:** ✅ **DEV SERVER RUNNING** at http://localhost:3000

**What's Built:**
- ✅ Next.js 14 with App Router (TypeScript)
- ✅ Tailwind CSS configured with custom colors
- ✅ Firebase integration with environment variables
- ✅ SEO-optimized root layout with full metadata
- ✅ Automatic sitemap generation
- ✅ Automatic robots.txt generation
- ✅ Schema.org structured data (Organization, Service, Blog)
- ✅ Responsive Header with mobile menu
- ✅ Professional Footer with links
- ✅ Homepage with:
  - Hero section with veteran badge
  - Services overview (6 services)
  - "Why Choose Us" section
  - CTA section
  - Full schema markup

**Tech Stack:**
- Next.js 15.5.6
- React 19
- TypeScript
- Tailwind CSS 3.4.17
- Firebase 11.8.1
- Framer Motion 12.12.2
- Heroicons for icons

---

## 🔧 What Works Right Now

1. **Homepage:** Fully functional with all sections
2. **Navigation:** Desktop and mobile menus working
3. **SEO:** Meta tags, Open Graph, Twitter Cards all configured
4. **Schema Markup:** Organization structured data on homepage
5. **Firebase:** Configured with environment variables (secure)
6. **Responsive Design:** Mobile-first, works on all screens

---

## 📋 Next Steps (Phase 2 - Public Pages)

### Pages to Build:

1. **Services Pages** (NEXT)
   - `/services` - Services overview
   - `/services/custom-websites` - Custom websites service
   - `/services/ecommerce` - E-commerce solutions
   - `/services/business-automation` - Automation service
   - `/services/dashboards` - Dashboard service
   - `/services/premium` - Premium & enterprise solutions

2. **Pricing Page**
   - `/pricing` - Full pricing with all packages and add-ons
   - Filter by category
   - Add to cart functionality (or Get Quote buttons)

3. **Other Pages**
   - `/work` - Portfolio/case studies
   - `/about` - About Kyle Stephens
   - `/contact` - Contact form with email API
   - `/blog` - Blog listing
   - `/blog/[slug]` - Individual blog posts

4. **API Routes**
   - `/api/contact` - Contact form submission with Nodemailer

---

## 📋 Phase 3 - Backend & Portals

### Admin Dashboard Enhancement
**Location:** `admin-dashboard/`

**Current Issues:**
- ❌ Firebase API keys hardcoded
- ❌ No environment variables
- ❌ Weak authorization (frontend only)

**Fixes Needed:**
- Add `.env` file with Firebase config
- Update `firebase.js` to use environment variables
- Add backend authorization check
- Remove console.logs
- Deploy to Vercel as subdomain: `admin.stephenscode.dev`

---

### Customer Portal Enhancement
**Location:** `customer.stephenscode.dev/`

**Current Issues:**
- ❌ Firebase API keys hardcoded
- ❌ No environment variables
- ❌ Broken import path (submodule has uncommitted changes)

**Fixes Needed:**
- Add `.env` file with Firebase config
- Update `firebase.js` to use environment variables
- Remove console.logs
- Fix typo in UpgradePlan.jsx (line 11: "ect." → "etc.")
- Deploy to Vercel as subdomain: `customer.stephenscode.dev`

---

## 📋 Phase 4 - Backend API (Railway)

### Unified Backend Server
**New Location:** `backend-api/` (to be created)

**Will Combine:**
- Current `backend-server/` (customer upgrades)
- Current `clean-checkout-server/` (main cart checkout)

**Features:**
- Express server on Railway
- Stripe checkout sessions (2 endpoints)
- Firebase Admin SDK
- Webhook handling
- Proper CORS configuration
- Environment variables (secure)

**Critical Security:**
- ❌ **MUST ROTATE STRIPE KEYS** (currently exposed in git)
- Create new secret key
- Create new webhook secret
- Update `.env` file
- Never commit `.env` to git

---

## 🔥 Firebase Projects

You have **3 separate Firebase projects:**

1. **Main Marketing Site**
   - Project: `stephenscode-12f75`
   - Collections: `orders`
   - Used for: Cart orders from pricing page

2. **Admin Dashboard**
   - Project: `admin-dashboard-stephenscode`
   - Collections: `orders`
   - Used for: Admin viewing orders

3. **Customer Portal**
   - Project: `customer-stephenscode`
   - Collections: `customers`, `update_requests`, `module_requests`
   - Used for: Customer accounts and requests

---

## 💳 Stripe Integration

**Current Status:**
- ✅ Stripe SDK installed
- ❌ Using placeholder price IDs (`price_12345`, etc.)
- ❌ Need real price IDs from Stripe Dashboard

**What Needs Stripe Price IDs:**

### Core Packages:
- Plug and Play: $250
- Website Rebuild: $350
- Standard Website: $850
- E-Commerce Website: $1,100

### Premium Builds:
- $2,000 Premium Build
- $5,000 Agency Replacement
- $7,500 Enterprise Platform

### Add-Ons (55 total):
- Email Setup: $25
- Maintenance Plan: $50-$75/mo
- Form Generator: $100
- SEO Boost: $120
- Customer Dashboard: $160
- Analytics Dashboard: $150
- ... and 50 more

**Action Required:**
1. Log into Stripe Dashboard
2. Create Products for each package/add-on
3. Create Prices for each product
4. Copy price IDs (format: `price_xxxxxxxxxxxxx`)
5. Update backend price mapping

---

## 🚀 Deployment Plan

### 1. Marketing Site
- **Platform:** Vercel
- **Domain:** `www.stephenscode.dev`
- **Custom Domain:** `stephenscode.dev` (apex redirect)
- **Environment Variables:** Firebase, Stripe publishable key, SMTP

### 2. Admin Dashboard
- **Platform:** Vercel
- **Subdomain:** `admin.stephenscode.dev`
- **Environment Variables:** Firebase (admin project)

### 3. Customer Portal
- **Platform:** Vercel
- **Subdomain:** `customer.stephenscode.dev`
- **Environment Variables:** Firebase (customer project), API URL

### 4. Backend API
- **Platform:** Railway
- **URL:** `api.stephenscode.dev`
- **Environment Variables:**
  - Firebase Admin credentials
  - Stripe secret key
  - Stripe webhook secret
  - Allowed CORS origins

---

## 📝 Environment Variables Summary

### Marketing Site (`.env.local`)
```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyCfeUf56zdhPtsV0QkVqjd_WBP5OuFLQBA
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=stephenscode-12f75.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=stephenscode-12f75
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=stephenscode-12f75.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=[FILL IN]
NEXT_PUBLIC_FIREBASE_APP_ID=[FILL IN]
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=[FILL IN]
NEXT_PUBLIC_API_URL=https://api.stephenscode.dev
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=[FILL IN]
SMTP_PASSWORD=[FILL IN]
CONTACT_EMAIL=leads@stephenscode.dev
```

### Admin Dashboard (`.env`)
```env
VITE_FIREBASE_API_KEY=AIzaSyDJuVsf9s0YUrSrZ-MX1PCldVwjSf80RWY
VITE_FIREBASE_AUTH_DOMAIN=admin-dashboard-stephenscode.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=admin-dashboard-stephenscode
VITE_FIREBASE_STORAGE_BUCKET=admin-dashboard-stephenscode.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=265435005798
VITE_FIREBASE_APP_ID=1:265435005798:web:fabccba1bf3cc15c0f7ea7
```

### Customer Portal (`.env`)
```env
VITE_FIREBASE_API_KEY=AIzaSyCN8KHXDHnXglsiCnGox40G_fQZGxFJbdw
VITE_FIREBASE_AUTH_DOMAIN=customer-stephenscode.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=customer-stephenscode
VITE_FIREBASE_STORAGE_BUCKET=customer-stephenscode.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=1004875053671
VITE_FIREBASE_APP_ID=1:1004875053671:web:67079df56e91e5dc7572c2
VITE_API_URL=https://api.stephenscode.dev
```

### Backend API (Railway) (`.env`)
```env
FIREBASE_PROJECT_ID=customer-stephenscode
GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account.json
STRIPE_SECRET_KEY=[NEW KEY - MUST ROTATE]
STRIPE_WEBHOOK_SECRET=[NEW SECRET - MUST ROTATE]
ALLOWED_ORIGINS=https://stephenscode.dev,https://www.stephenscode.dev,https://customer.stephenscode.dev
PORT=3000
```

---

## ⚠️ CRITICAL SECURITY ACTIONS

### BEFORE GOING LIVE:

1. **Rotate Stripe Keys Immediately**
   - Current keys are compromised (in git history)
   - Generate new secret key in Stripe Dashboard
   - Generate new webhook secret
   - Update all references

2. **Remove Exposed .env Files from Git**
   - `backend-server/.env` is currently tracked
   - Must remove from git history
   - Add to .gitignore (already created but not committed)

3. **Set Up Proper Authorization**
   - Admin dashboard needs server-side auth check
   - Implement JWT or Firebase Admin verification
   - Don't rely on frontend-only email check

4. **Enable Firebase Security Rules**
   - Add Firestore security rules
   - Limit read/write access per user
   - Protect admin collections

---

## 📊 Project Structure

```
stephenscode-site/
├── stephenscode-marketing/          ✅ NEW - Next.js 14 site (RUNNING)
│   ├── app/                         ✅ Pages and routing
│   ├── components/                  ✅ React components
│   ├── lib/                         ✅ Firebase, schemas, utils
│   └── .env.local                   ✅ Environment variables
│
├── admin-dashboard/                 ⚠️ NEEDS FIXES
│   └── src/
│       ├── auth/firebase.js         ❌ Hardcoded API keys
│       └── pages/                   ✅ Working pages
│
├── customer.stephenscode.dev/       ⚠️ NEEDS FIXES (Git submodule)
│   └── src/
│       ├── firebase.js              ❌ Hardcoded API keys
│       └── pages/                   ✅ Working pages
│
├── backend-server/                  ❌ TO BE MERGED
│   ├── server.js                    ⚠️ Placeholder price IDs
│   └── .env                         🚨 EXPOSED IN GIT
│
├── clean-checkout-server/           ❌ TO BE MERGED
│   └── server.js                    ✅ Working logic
│
└── backend-api/                     📋 TO BE CREATED
    └── (unified backend for Railway)
```

---

## 🎯 Recommended Next Steps

### Option A: Continue Building Pages (Fastest Path to Launch)
1. Build all service pages (`/services/*`)
2. Build pricing page with full package list
3. Build contact page with working form
4. Build about, work, blog pages
5. Deploy marketing site to Vercel
6. Fix admin/customer portals (env vars)
7. Deploy portals to Vercel
8. Create unified backend for Railway
9. Set up Stripe price IDs
10. **GO LIVE**

### Option B: Fix Security First (Recommended)
1. Rotate Stripe keys **NOW**
2. Remove .env from git history
3. Add environment variables to all apps
4. Create unified backend API
5. Deploy backend to Railway
6. Fix admin/customer portals
7. Deploy portals to Vercel
8. Continue building marketing pages
9. **THEN GO LIVE**

---

## 💰 Stripe Price ID Checklist

When you're ready, create these in Stripe Dashboard:

### Core Packages (4):
- [ ] Plug and Play - $250
- [ ] Website Rebuild - $350
- [ ] Standard Website - $850
- [ ] E-Commerce Website - $1,100

### Premium Builds (3):
- [ ] $2,000 Premium Build
- [ ] $5,000 Agency Replacement
- [ ] $7,500 Enterprise Platform

### Add-Ons (55 total - see rebuild spec for full list)
- [ ] Email Setup - $25
- [ ] Maintenance Plan - $50-75/mo
- [ ] Form Generator - $100
- [ ] ... (52 more)

**After Creating:**
- Copy all price IDs
- Update `backend-api/server.js` price mapping
- Test checkout flow

---

## 📞 Questions to Answer

1. **Do you have SMTP credentials for the contact form?**
   - Gmail account with app password?
   - Or use a service like SendGrid?

2. **Do you want to migrate existing Firebase data?**
   - Current orders from old site?
   - Existing customer accounts?

3. **Blog content - do you have it ready?**
   - Or should I create placeholder structure?

4. **Professional photos?**
   - Headshot of Kyle Stephens?
   - Workspace/office photos?
   - Client website screenshots?

5. **When do you want to go live?**
   - ASAP? (2-3 weeks)
   - After all content is ready? (4-6 weeks)
   - Flexible timeline?

---

## ✅ Current Status: Phase 1 Complete

**The new Next.js marketing site is running successfully!**

View it at: **http://localhost:3000**

**What's Live:**
- ✅ Homepage with hero, services, why choose us, CTA
- ✅ Header navigation (desktop + mobile)
- ✅ Footer with all links
- ✅ SEO optimized with schema markup
- ✅ Firebase integrated (secure with env vars)
- ✅ Responsive design
- ✅ Professional styling

**Ready for Phase 2:** Building the remaining pages!

---

**Last Updated:** 2025-11-11
**Dev Server:** Running at http://localhost:3000
**Next Task:** Build service pages or fix security issues (your choice!)
