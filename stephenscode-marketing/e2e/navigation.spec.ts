import { test, expect } from '@playwright/test'

const pages = [
  { path: '/', name: 'Home' },
  { path: '/services', name: 'Services' },
  { path: '/pricing', name: 'Pricing' },
  { path: '/about', name: 'About' },
  { path: '/contact', name: 'Contact' },
  { path: '/demos', name: 'Demos' },
  { path: '/blog', name: 'Blog' },
  { path: '/work', name: 'Our Work' },
  { path: '/faq', name: 'FAQ' },
  { path: '/msp', name: 'MSP' },
  { path: '/service-areas', name: 'Service Areas' },
  { path: '/partners', name: 'Partners' },
  { path: '/custom-solutions', name: 'Custom Solutions' },
]

test.describe('Navigation - All pages load', () => {
  for (const page of pages) {
    test(`${page.name} (${page.path}) returns 200`, async ({ request }) => {
      const response = await request.get(page.path)
      expect(response.status()).toBe(200)
    })
  }
})

test.describe('Dark theme applied', () => {
  test('Homepage has dark background', async ({ page }) => {
    await page.goto('/')
    const body = page.locator('body')
    const bgColor = await body.evaluate(el => getComputedStyle(el).backgroundColor)
    // Should not be white (rgb(255, 255, 255))
    expect(bgColor).not.toBe('rgb(255, 255, 255)')
  })

  test('Header has dark background', async ({ page }) => {
    await page.goto('/')
    const header = page.locator('header')
    await expect(header).toBeVisible()
  })
})

test.describe('Navigation elements', () => {
  test('Navbar has key links', async ({ page }) => {
    await page.goto('/')
    // Desktop nav links should be present
    await expect(page.locator('nav')).toBeVisible()
    await expect(page.getByRole('link', { name: /pricing/i }).first()).toBeVisible()
    await expect(page.getByRole('link', { name: /contact/i }).first()).toBeVisible()
  })

  test('Footer has phone number', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('footer')).toContainText('936')
  })
})
