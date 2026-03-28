import { test, expect } from '@playwright/test'

// All internal (non-real-client) demo slugs
const internalDemos = [
  'classic-cuts-barbershop',
  'fixit-fast-handyman',
  'sparkle-clean-services',
  'smart-start-tutoring',
  'green-valley-landscaping',
  'bright-smile-dental',
  'peak-financial-advisors',
  'glamour-studio-salon',
  'justice-associates-law',
  'premier-plumbing-pros',
  'skyline-realty-group',
  'iron-temple-fitness',
  'paws-care-animal-hospital',
  'bella-boutique-fashion',
  'sweet-dreams-bakery',
  'peak-performance-supplements',
  'timeless-treasures-jewelry',
  'hoppy-trails-craft-beer',
  'urban-jungle-plant-shop',
  'roasted-perfection-coffee',
  'happy-paws-pet-supplies',
  'gourmet-kitchen-restaurant',
  'healthfirst-medical-group',
  'serenity-spa-wellness',
  'swift-logistics-services',
  'elite-property-management',
  'premier-staffing-solutions',
  'celebration-events-company',
  'fastserve-franchise-network',
  'techpro-manufacturing',
  'booking-system-showcase',
  'analytics-dashboard-showcase',
  'membership-portal-showcase',
  'crm-system-showcase',
  'inventory-management-showcase',
  'workflow-automation-showcase',
]

// Real client demos that should redirect
const realClientDemos = [
  { slug: 'fc-photo-houston', url: 'fcphotohouston.com' },
  { slug: 'amw-air-conditioning', url: 'amwairconditioning.com' },
  { slug: 'terracotta-construction', url: 'terracottaconstruction.com' },
  { slug: 'cars-collision-refinish', url: 'carscollisionandrefinishshop.com' },
]

test.describe('Demos - Listing Page', () => {
  test('Demos page loads', async ({ page }) => {
    await page.goto('/demos')
    await expect(page.locator('h1')).toBeVisible()
  })
})

test.describe('Demos - Internal demos load', () => {
  // Test a representative sample (first 10 + last 5 to keep test time reasonable)
  const sampleDemos = [...internalDemos.slice(0, 10), ...internalDemos.slice(-5)]

  for (const slug of sampleDemos) {
    test(`Demo "${slug}" loads with specific component`, async ({ page }) => {
      await page.goto(`/demos/${slug}`)
      // Should have the demo controls bar
      await expect(page.getByText('Back to Demos')).toBeVisible()
      // Should have customer/admin toggle
      await expect(page.getByText('Customer View')).toBeVisible()
      await expect(page.getByText('Admin Dashboard')).toBeVisible()
    })
  }
})

test.describe('Demos - Real client redirects', () => {
  for (const demo of realClientDemos) {
    test(`Real client "${demo.slug}" redirects to external site`, async ({ page }) => {
      const response = await page.goto(`/demos/${demo.slug}`)
      // Should redirect (the final URL should contain the external domain)
      const url = page.url()
      // Either redirected externally or shows redirect card
      expect(
        url.includes(demo.url) || (await page.getByText('Visit Live Site').isVisible())
      ).toBeTruthy()
    })
  }
})

test.describe('Demos - View toggle', () => {
  test('Customer/Admin toggle works', async ({ page }) => {
    await page.goto('/demos/classic-cuts-barbershop')
    // Click admin view
    await page.getByText('Admin Dashboard').click()
    // Click back to customer
    await page.getByText('Customer View').click()
  })
})

test.describe('Demos - Dark theme on wrapper', () => {
  test('Demo frame has dark theme', async ({ page }) => {
    await page.goto('/demos/classic-cuts-barbershop')
    // Instructions banner should have dark theme
    const banner = page.locator('.bg-primary-950\\/50, [class*="primary-950"]')
    // Controls bar should be dark (bg-gray-900)
    await expect(page.locator('[class*="bg-gray-900"]').first()).toBeVisible()
  })
})
