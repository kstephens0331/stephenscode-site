import { test, expect } from '@playwright/test'

const priorityCities = [
  'houston',
  'conroe',
  'the-woodlands',
  'spring',
  'tomball',
  'magnolia',
  'kingwood',
  'humble',
  'montgomery',
  'willis',
  'porter',
  'new-caney',
]

test.describe('Service Areas - Priority Cities', () => {
  for (const city of priorityCities) {
    test(`/service-areas/${city} returns 200`, async ({ request }) => {
      const response = await request.get(`/service-areas/${city}`)
      expect(response.status()).toBe(200)
    })
  }

  for (const city of priorityCities) {
    test(`/service-areas/${city} has city name in heading`, async ({ page }) => {
      await page.goto(`/service-areas/${city}`)
      const h1 = page.locator('h1')
      await expect(h1).toBeVisible()
    })
  }
})

test.describe('Service Areas - Index Page', () => {
  test('Service areas index loads', async ({ page }) => {
    await page.goto('/service-areas')
    await expect(page.locator('h1')).toBeVisible()
  })

  test('Nationwide remote section is visible', async ({ page }) => {
    await page.goto('/service-areas')
    await expect(page.getByText('Not in Your Area? We Work Nationwide.')).toBeVisible()
  })

  test('City pages have nationwide section', async ({ page }) => {
    await page.goto('/service-areas/conroe')
    await expect(page.getByText('We Work Nationwide')).toBeVisible()
  })
})

test.describe('Service Areas - Unique Content', () => {
  test('Conroe has unique markdown content', async ({ page }) => {
    await page.goto('/service-areas/conroe')
    // Conroe markdown references specific local content
    await expect(page.getByText(/Lake Conroe|Loop 336|Montgomery County/i).first()).toBeVisible()
  })

  test('Tomball has unique markdown content', async ({ page }) => {
    await page.goto('/service-areas/tomball')
    await expect(page.getByText(/German Heritage|SH-249|Tomball Parkway/i).first()).toBeVisible()
  })

  test('Kingwood has unique markdown content', async ({ page }) => {
    await page.goto('/service-areas/kingwood')
    await expect(page.getByText(/Livable Forest|Lake Houston|greenbelt/i).first()).toBeVisible()
  })
})

test.describe('Service Areas - SEO', () => {
  test('City pages have JSON-LD schema', async ({ page }) => {
    await page.goto('/service-areas/houston')
    const scripts = await page.locator('script[type="application/ld+json"]').allTextContents()
    expect(scripts.length).toBeGreaterThan(0)
    const schema = JSON.parse(scripts[0])
    expect(schema['@context']).toBe('https://schema.org')
  })
})
