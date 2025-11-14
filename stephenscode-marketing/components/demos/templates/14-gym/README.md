# Iron Temple Fitness - Gym Demo

**Demo Type:** $850 Standard Website (9 Pages)  
**Slug:** iron-temple-fitness  
**Industry:** Fitness & Gym

## Overview

A complete, production-quality gym website featuring bold, energetic design with premium equipment showcases, class schedules, trainer profiles, and membership options. Built for Iron Temple Fitness with a focus on transformation and results.

## Color Palette

- **Primary:** #c1121f (Bold Red)
- **Secondary:** #780000 (Deep Maroon)
- **Accent:** #fdf0d5 (Cream)
- **Background:** Dark theme with zinc-950

## Pages (9 Total)

1. **Home** (`/`)
   - Hero section with CTA
   - Feature highlights
   - Stats showcase
   - Why choose us section
   - Testimonials
   - Free trial CTA

2. **Classes & Schedule** (`/classes`)
   - 8 class types with detailed info
   - Class categories overview
   - What to expect section
   - Intensity levels and benefits

3. **Personal Training** (`/training`)
   - 4 trainer profiles with certifications
   - Training programs and specialties
   - Benefits of 1-on-1 coaching
   - Package pricing (Starter, Accelerator, Elite)

4. **Membership Plans** (`/membership`)
   - 3-tier pricing (Basic, Premium, Elite)
   - Feature comparison table
   - Add-on services
   - FAQs

5. **Schedule** (`/schedule`)
   - Weekly class timetable
   - Day-by-day filtering
   - Class type filtering
   - Real-time availability
   - Booking interface

6. **Amenities** (`/amenities`)
   - Premium equipment inventory
   - Spa facilities (sauna, steam room)
   - Climate control features
   - Fuel bar and nutrition
   - Cleanliness standards

7. **Success Stories** (`/success-stories`)
   - 6 detailed transformation stories
   - Before/after statistics
   - Member testimonials
   - Common goal achievements

8. **Blog/Fitness Tips** (`/blog`)
   - Featured article
   - 9+ blog posts
   - Category filtering
   - Newsletter signup
   - Expert advice from trainers

9. **Join Now** (`/join`)
   - Membership signup form
   - 7-day free trial offer
   - Order summary sidebar
   - Emergency contact fields
   - Terms and conditions

## Key Features

### Classes (8 Types)
- CrossFit
- HIIT
- Yoga
- Spin
- Boxing
- Strength Training
- Bootcamp
- Pilates

### Trainers (4 Profiles)
- Marcus Steel (Strength & Powerlifting)
- Sarah Chen (HIIT & Weight Loss)
- Jake Morrison (CrossFit & Functional)
- Emily Rodriguez (Yoga & Mobility)

### Membership Tiers
- **Basic** - $39/month (Gym access, standard hours)
- **Premium** - $69/month (Unlimited classes, 24/7 access) ⭐ Most Popular
- **Elite** - $99/month (All-inclusive with perks)

### Amenities
- 15,000 sq ft facility
- 200+ equipment pieces
- Sauna & steam room
- Nutrition bar
- 24/7 access
- Free parking

## Components

### Layout (`components/Layout.tsx`)
- Sticky header with navigation
- Mobile-responsive menu
- Footer with contact info
- Consistent branding

### Pages Directory
```
pages/
├── HomePage.tsx          # Main landing page
├── ClassesPage.tsx       # Class offerings
├── TrainingPage.tsx      # Personal training
├── MembershipPage.tsx    # Pricing plans
├── SchedulePage.tsx      # Class schedule
├── AmenitiesPage.tsx     # Facilities
├── SuccessStoriesPage.tsx # Transformations
├── BlogPage.tsx          # Fitness blog
└── JoinPage.tsx          # Signup form
```

## Design Elements

- **Typography:** Black/Bold weights for headers, emphasis on energy
- **Gradients:** Red to maroon for CTAs and accents
- **Cards:** Equipment showcases, trainer profiles, class cards
- **Icons:** Lucide icons throughout
- **Forms:** Multi-step signup with validation
- **Stats:** Large numbers with transformations focus

## Unique Features

1. **Class Schedule System**
   - Day-by-day navigation
   - Filter by class type
   - Live availability tracking
   - Duration and intensity indicators

2. **Trainer Profiles**
   - Certifications display
   - Years of experience
   - Client count
   - Specialty focus

3. **Transformation Stories**
   - Before/after statistics
   - Detailed testimonials
   - Program attribution
   - Timeline tracking

4. **Equipment Inventory**
   - Categorized by zone
   - Quantity specifications
   - Brand information
   - Usage guidelines

5. **Free Trial System**
   - 7-day trial offer
   - No credit card required
   - Full facility access
   - Easy cancellation

## Technical Details

- Built with Next.js 14 and TypeScript
- Tailwind CSS for styling
- Lucide React for icons
- Client-side navigation
- Responsive design (mobile-first)
- Dark theme optimized

## Content Strategy

### Tone of Voice
- Bold and motivating
- Results-focused
- Community-oriented
- Professional yet approachable

### Key Messaging
- "Forge Your Strongest Self"
- Transformation focus
- Expert guidance
- No contracts, no commitment
- 7-day free trial

## Customization Guide

### Update Classes
Edit `pages/ClassesPage.tsx` and `pages/SchedulePage.tsx` to modify class types, descriptions, and schedule.

### Update Trainers
Edit `pages/TrainingPage.tsx` to add/modify trainer profiles, certifications, and programs.

### Update Pricing
Edit `pages/MembershipPage.tsx` to change membership tiers, pricing, and features.

### Update Success Stories
Edit `pages/SuccessStoriesPage.tsx` to add new transformations and testimonials.

### Update Colors
Colors are defined inline. Primary: #c1121f, Secondary: #780000, Accent: #fdf0d5

## File Structure

```
14-gym/
├── index.tsx                 # Main demo entry
├── CustomerView.tsx          # Customer-facing site
├── AdminView.tsx             # Admin dashboard
├── components/
│   └── Layout.tsx            # Shared layout
└── pages/
    ├── HomePage.tsx
    ├── ClassesPage.tsx
    ├── TrainingPage.tsx
    ├── MembershipPage.tsx
    ├── SchedulePage.tsx
    ├── AmenitiesPage.tsx
    ├── SuccessStoriesPage.tsx
    ├── BlogPage.tsx
    └── JoinPage.tsx
```

## Preview URLs

- Home: `/demos/iron-temple-fitness`
- Classes: `/demos/iron-temple-fitness/classes`
- Training: `/demos/iron-temple-fitness/training`
- Membership: `/demos/iron-temple-fitness/membership`
- Schedule: `/demos/iron-temple-fitness/schedule`
- Amenities: `/demos/iron-temple-fitness/amenities`
- Success Stories: `/demos/iron-temple-fitness/success-stories`
- Blog: `/demos/iron-temple-fitness/blog`
- Join: `/demos/iron-temple-fitness/join`

## Business Value

This demo showcases the complete website package for a fitness business, including:
- Lead generation (free trial form)
- Class booking system
- Membership management
- Content marketing (blog)
- Social proof (success stories)
- Facility showcase
- Trainer credibility

Perfect for gyms, CrossFit boxes, fitness studios, and health clubs looking for a professional online presence.
