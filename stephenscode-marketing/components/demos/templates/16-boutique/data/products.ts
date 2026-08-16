export interface BoutiqueProduct {
  id: string
  name: string
  category: string
  price: number
  originalPrice?: number
  discount?: number
  image: string
  rating: number
  sizes: string[]
  colors: string[]
  newTag?: string
  description: string
}

export const shopProducts: BoutiqueProduct[] = [
  { id: '1', name: 'Silk Evening Dress', category: 'dresses', price: 299.99, image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400', rating: 4.9, sizes: ['XS', 'S', 'M', 'L'], colors: ['Black', 'Navy', 'Burgundy'], description: 'A floor-skimming silk dress with a draped neckline and a subtle side slit. Fully lined and cut for an elegant, fluid silhouette.' },
  { id: '2', name: 'Designer Handbag', category: 'accessories', price: 199.99, image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400', rating: 4.8, sizes: ['One Size'], colors: ['Tan', 'Black', 'White'], description: 'Structured pebbled-leather handbag with gold-tone hardware, an interior zip pocket, and a detachable crossbody strap.' },
  { id: '3', name: 'Cashmere Sweater', category: 'tops', price: 159.99, image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400', rating: 4.7, sizes: ['XS', 'S', 'M', 'L', 'XL'], colors: ['Cream', 'Gray', 'Camel'], description: 'Ultra-soft two-ply cashmere in a relaxed crewneck cut. Ribbed trims and a slightly dropped shoulder for effortless layering.' },
  { id: '4', name: 'Leather Boots', category: 'shoes', price: 249.99, image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400', rating: 4.9, sizes: ['6', '7', '8', '9', '10'], colors: ['Black', 'Brown', 'Tan'], description: 'Italian leather ankle boots with a walkable block heel, almond toe, and cushioned insole. Wear-with-everything versatility.' },
  { id: '5', name: 'Tailored Blazer', category: 'outerwear', price: 279.99, image: 'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=400', rating: 4.8, sizes: ['XS', 'S', 'M', 'L'], colors: ['Black', 'Navy', 'Gray'], description: 'Sharp single-breasted blazer with structured shoulders, a nipped waist, and functional buttoned cuffs. Office to evening ready.' },
  { id: '6', name: 'Pleated Midi Skirt', category: 'bottoms', price: 129.99, image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=400', rating: 4.6, sizes: ['XS', 'S', 'M', 'L', 'XL'], colors: ['Black', 'Beige', 'Burgundy'], description: 'Knife-pleated midi skirt in a fluid crepe that moves beautifully. Elasticized back waistband for all-day comfort.' },
  { id: '7', name: 'Pearl Necklace', category: 'accessories', price: 89.99, image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400', rating: 4.9, sizes: ['One Size'], colors: ['White', 'Cream'], description: 'Hand-knotted freshwater pearls on an 18-inch strand with a sterling silver clasp. A timeless finishing touch.' },
  { id: '8', name: 'Satin Blouse', category: 'tops', price: 119.99, image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400', rating: 4.7, sizes: ['XS', 'S', 'M', 'L', 'XL'], colors: ['White', 'Blush', 'Black'], description: 'Lustrous satin blouse with a relaxed fit, concealed placket, and softly gathered cuffs. Tuck it in or leave it flowing.' },
  { id: '9', name: 'Wide Leg Pants', category: 'bottoms', price: 149.99, image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400', rating: 4.8, sizes: ['XS', 'S', 'M', 'L', 'XL'], colors: ['Black', 'Navy', 'Cream'], description: 'High-rise wide leg trousers with a clean front and floor-grazing hem. Tailored drape that flatters every frame.' },
  { id: '10', name: 'Velvet Pumps', category: 'shoes', price: 189.99, image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400', rating: 4.6, sizes: ['6', '7', '8', '9', '10'], colors: ['Black', 'Burgundy', 'Navy'], description: 'Plush velvet pumps with a pointed toe and a stable 3-inch heel. Understated glamour for evenings out.' },
  { id: '11', name: 'Trench Coat', category: 'outerwear', price: 349.99, image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400', rating: 4.9, sizes: ['XS', 'S', 'M', 'L'], colors: ['Beige', 'Black', 'Navy'], description: 'Classic double-breasted trench in water-resistant cotton twill with a storm flap, belt, and deep pockets.' },
  { id: '12', name: 'Cocktail Dress', category: 'dresses', price: 259.99, image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=400', rating: 4.7, sizes: ['XS', 'S', 'M', 'L', 'XL'], colors: ['Red', 'Black', 'Emerald'], description: 'Knee-length cocktail dress with a sweetheart neckline and gently ruched bodice. Made for celebrations.' },
]

export const newArrivalProducts: BoutiqueProduct[] = [
  { id: 'n1', name: 'Silk Midi Dress', category: 'dresses', price: 289.99, image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400', rating: 5.0, sizes: ['XS', 'S', 'M', 'L'], colors: ['Emerald', 'Black', 'Navy'], newTag: 'Just In', description: 'Bias-cut silk midi dress that skims the body with a cowl neckline and adjustable straps.' },
  { id: 'n2', name: 'Leather Tote Bag', category: 'accessories', price: 249.99, image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400', rating: 4.9, sizes: ['One Size'], colors: ['Cognac', 'Black'], newTag: 'Just In', description: 'Roomy full-grain leather tote with a laptop sleeve, magnetic closure, and hand-stitched handles.' },
  { id: 'n3', name: 'Wool Blend Coat', category: 'outerwear', price: 399.99, image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400', rating: 5.0, sizes: ['XS', 'S', 'M', 'L'], colors: ['Camel', 'Black', 'Gray'], newTag: 'Trending', description: 'Longline wool blend coat with a shawl collar and hidden snap front. Warm without the weight.' },
  { id: 'n4', name: 'Satin Slip Dress', category: 'dresses', price: 189.99, image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=400', rating: 4.8, sizes: ['XS', 'S', 'M', 'L', 'XL'], colors: ['Champagne', 'Black', 'Rose'], newTag: 'Just In', description: 'Nineties-inspired satin slip with delicate straps and a lace-trimmed neckline. Layer it or let it shine solo.' },
  { id: 'n5', name: 'Chunky Gold Hoops', category: 'accessories', price: 79.99, image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400', rating: 4.9, sizes: ['One Size'], colors: ['Gold'], newTag: 'Best Seller', description: '18k gold-plated chunky hoops with a secure hinge closure. Lightweight enough for all-day wear.' },
  { id: 'n6', name: 'Ribbed Knit Set', category: 'tops', price: 169.99, image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400', rating: 4.7, sizes: ['XS', 'S', 'M', 'L', 'XL'], colors: ['Cream', 'Mocha', 'Black'], newTag: 'Trending', description: 'Matching ribbed knit tank and cardigan set in a buttery-soft stretch blend. Wear together or apart.' },
  { id: 'n7', name: 'Suede Ankle Boots', category: 'shoes', price: 279.99, image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400', rating: 5.0, sizes: ['6', '7', '8', '9', '10'], colors: ['Tan', 'Black', 'Olive'], newTag: 'Just In', description: 'Butter-soft suede ankle boots with a stacked heel and side zip. The new-season essential.' },
  { id: 'n8', name: 'Cropped Blazer', category: 'outerwear', price: 219.99, image: 'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=400', rating: 4.8, sizes: ['XS', 'S', 'M', 'L'], colors: ['Black', 'Ivory', 'Burgundy'], newTag: 'Trending', description: 'Boxy cropped blazer with padded shoulders and a single-button front. Pairs perfectly with high-rise denim.' },
]

export const saleProducts: BoutiqueProduct[] = [
  { id: 's1', name: 'Evening Gown', category: 'dresses', price: 199.99, originalPrice: 349.99, discount: 43, image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=400', rating: 4.8, sizes: ['XS', 'S', 'M'], colors: ['Black', 'Navy'], description: 'Sweeping floor-length gown with a fitted bodice and flowing chiffon skirt. Formal-event perfection.' },
  { id: 's2', name: 'Wool Sweater', category: 'tops', price: 79.99, originalPrice: 139.99, discount: 43, image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400', rating: 4.6, sizes: ['S', 'M', 'L'], colors: ['Gray', 'Beige'], description: 'Cozy merino wool sweater with a funnel neck and ribbed hem. A cold-weather staple at a warm price.' },
  { id: 's3', name: 'Leather Jacket', category: 'outerwear', price: 249.99, originalPrice: 449.99, discount: 44, image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400', rating: 4.9, sizes: ['S', 'M'], colors: ['Black'], description: 'Classic moto jacket in supple lambskin with an asymmetric zip and quilted shoulder detail.' },
  { id: 's4', name: 'Silk Blouse', category: 'tops', price: 69.99, originalPrice: 119.99, discount: 42, image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400', rating: 4.7, sizes: ['XS', 'S', 'M', 'L'], colors: ['White', 'Blush'], description: 'Pure silk blouse with mother-of-pearl buttons and a softly pointed collar. Polished and versatile.' },
  { id: 's5', name: 'Designer Heels', category: 'shoes', price: 129.99, originalPrice: 249.99, discount: 48, image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400', rating: 4.5, sizes: ['7', '8', '9'], colors: ['Black', 'Nude'], description: 'Sculptural stiletto heels with a low-cut vamp that lengthens the leg. Red-carpet ready.' },
  { id: 's6', name: 'Pencil Skirt', category: 'bottoms', price: 59.99, originalPrice: 99.99, discount: 40, image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=400', rating: 4.4, sizes: ['XS', 'S', 'M', 'L'], colors: ['Black', 'Navy'], description: 'High-waisted stretch pencil skirt with a back vent and invisible zip. Boardroom-approved tailoring.' },
]

export const allProducts: BoutiqueProduct[] = [...shopProducts, ...newArrivalProducts, ...saleProducts]

const swatchColors: Record<string, string> = {
  black: '#1a1a1a',
  white: '#ffffff',
  navy: '#1e2a4a',
  gray: '#8a8f98',
  beige: '#d9c7a7',
  burgundy: '#6d1a2d',
  red: '#c0392b',
  cream: '#f4ecd8',
  camel: '#b98a4b',
  tan: '#c9a066',
  brown: '#6b4a2b',
  emerald: '#0f6e4f',
  blush: '#e8b4b8',
  champagne: '#f0d9b5',
  rose: '#d9838d',
  gold: '#cfa93f',
  cognac: '#9a5b2d',
  mocha: '#8a6650',
  olive: '#6b6b3a',
  ivory: '#f6f1e7',
  nude: '#e3c1a5',
}

export function getSwatchColor(name: string): string {
  return swatchColors[name.toLowerCase()] || '#d1d5db'
}
