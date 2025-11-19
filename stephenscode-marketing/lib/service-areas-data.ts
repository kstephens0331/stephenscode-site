export interface ServiceArea {
  slug: string
  name: string
  county: string
  population: string
  description: string
  neighborhoods?: string[]
  localFeatures: string[]
  businessTypes: string[]
  distanceFromConroe: string
}

export const serviceAreas: ServiceArea[] = [
  {
    slug: 'the-woodlands',
    name: 'The Woodlands',
    county: 'Montgomery County',
    population: '118,000+',
    description: 'The Woodlands is a master-planned community known for its excellent schools, thriving business district, and high-income residents. Businesses here need polished, professional websites that reflect the community\'s upscale nature.',
    neighborhoods: ['Town Center', 'Creekside Park', 'Sterling Ridge', 'Alden Bridge', 'Cochran\'s Crossing', 'Indian Springs', 'Panther Creek', 'Grogan\'s Mill'],
    localFeatures: [
      'The Woodlands Mall and Market Street shopping',
      'The Cynthia Woods Mitchell Pavilion',
      'Town Center and Waterway Square',
      'Major corporate headquarters (Anadarko, Chevron Phillips)',
      'Top-rated Conroe ISD schools'
    ],
    businessTypes: ['Medical practices', 'Law firms', 'Financial advisors', 'Restaurants', 'Boutique retail', 'Home services', 'Real estate'],
    distanceFromConroe: '15 minutes'
  },
  {
    slug: 'spring',
    name: 'Spring',
    county: 'Harris County',
    population: '60,000+',
    description: 'Spring is a rapidly growing suburb with a mix of established neighborhoods and new developments. Known for Old Town Spring\'s shopping and the ExxonMobil campus, businesses here serve both families and corporate professionals.',
    neighborhoods: ['Old Town Spring', 'Spring Branch', 'Gleannloch Farms', 'Northgate Forest', 'Champions Forest', 'Klein'],
    localFeatures: [
      'Old Town Spring historic shopping district',
      'ExxonMobil corporate campus',
      'Spring Creek Greenway trails',
      'Klein ISD and Spring ISD schools',
      'Easy access to I-45 and Hardy Toll Road'
    ],
    businessTypes: ['Restaurants', 'Retail shops', 'Home services', 'Healthcare', 'Professional services', 'Auto services'],
    distanceFromConroe: '20 minutes'
  },
  {
    slug: 'tomball',
    name: 'Tomball',
    county: 'Harris County',
    population: '12,000+',
    description: 'Tomball maintains its small-town charm while experiencing significant growth. The historic downtown and annual festivals create a strong community identity. Local businesses thrive on personal relationships and community involvement.',
    neighborhoods: ['Downtown Tomball', 'Northpointe', 'Timber Lane', 'Lakewood Forest', 'Rosehill'],
    localFeatures: [
      'Historic downtown depot district',
      'Tomball German Heritage Festival',
      'Railroad Depot museum',
      'Tomball ISD schools',
      'Easy access to SH-249 and Grand Parkway'
    ],
    businessTypes: ['Restaurants', 'Boutiques', 'Healthcare', 'Home services', 'Auto repair', 'Professional services'],
    distanceFromConroe: '25 minutes'
  },
  {
    slug: 'katy',
    name: 'Katy',
    county: 'Harris/Fort Bend/Waller Counties',
    population: '21,000+ (city) / 350,000+ (area)',
    description: 'Katy is one of Houston\'s fastest-growing areas with excellent schools and master-planned communities. The diverse population and strong economy make it ideal for businesses seeking growth opportunities.',
    neighborhoods: ['Cinco Ranch', 'Seven Meadows', 'Grand Lakes', 'Firethorne', 'Elyson', 'Cane Island', 'Cross Creek Ranch'],
    localFeatures: [
      'Katy Mills Mall',
      'Typhoon Texas waterpark',
      'Top-ranked Katy ISD schools',
      'LaCenterra at Cinco Ranch',
      'Energy Corridor proximity'
    ],
    businessTypes: ['Restaurants', 'Retail', 'Healthcare', 'Fitness', 'Home services', 'Real estate', 'Professional services'],
    distanceFromConroe: '45 minutes'
  },
  {
    slug: 'sugar-land',
    name: 'Sugar Land',
    county: 'Fort Bend County',
    population: '110,000+',
    description: 'Sugar Land is an affluent suburb with diverse demographics and a strong business community. The city consistently ranks among the best places to live in Texas, attracting businesses that cater to discerning customers.',
    neighborhoods: ['Sugar Creek', 'First Colony', 'Riverstone', 'Telfair', 'New Territory', 'Greatwood'],
    localFeatures: [
      'Sugar Land Town Square',
      'Constellation Field (baseball stadium)',
      'Smart Financial Centre',
      'Fort Bend ISD schools',
      'Imperial Sugar factory and heritage'
    ],
    businessTypes: ['Medical practices', 'Law firms', 'Financial services', 'Restaurants', 'Boutique retail', 'Real estate'],
    distanceFromConroe: '50 minutes'
  },
  {
    slug: 'pearland',
    name: 'Pearland',
    county: 'Brazoria/Harris Counties',
    population: '125,000+',
    description: 'Pearland is one of the fastest-growing cities in Texas, offering affordable housing and easy access to Houston\'s Medical Center and downtown. The diverse community supports a wide range of local businesses.',
    neighborhoods: ['Shadow Creek Ranch', 'Silverlake', 'Lakes of Highland Glen', 'Southdown', 'Pearland Town Center area'],
    localFeatures: [
      'Pearland Town Center',
      'Shadow Creek golf course',
      'Delmar Stadium',
      'Pearland and Alvin ISD schools',
      'Proximity to Houston Medical Center'
    ],
    businessTypes: ['Healthcare', 'Restaurants', 'Retail', 'Home services', 'Professional services', 'Auto services'],
    distanceFromConroe: '55 minutes'
  },
  {
    slug: 'cypress',
    name: 'Cypress',
    county: 'Harris County',
    population: '180,000+',
    description: 'Cypress is a sprawling, family-friendly area with excellent schools and numerous master-planned communities. The growing population creates strong demand for local services and businesses.',
    neighborhoods: ['Bridgeland', 'Towne Lake', 'Cypress Creek Lakes', 'Fairfield', 'Lakeland Village', 'Longwood'],
    localFeatures: [
      'Cypress Premium Outlets',
      'Berry Center',
      'Bridgeland community trails',
      'Cy-Fair ISD schools',
      'US-290 and Grand Parkway access'
    ],
    businessTypes: ['Home services', 'Healthcare', 'Restaurants', 'Retail', 'Fitness', 'Professional services'],
    distanceFromConroe: '35 minutes'
  },
  {
    slug: 'humble',
    name: 'Humble',
    county: 'Harris County',
    population: '16,000+ (city) / 200,000+ (area)',
    description: 'Humble offers affordable living with easy access to Bush Intercontinental Airport and downtown Houston. The area\'s oil history and outdoor recreation at Lake Houston attract diverse businesses.',
    neighborhoods: ['Atascocita', 'Kingwood', 'Fall Creek', 'Eagle Springs', 'Summer Creek'],
    localFeatures: [
      'Deerbrook Mall',
      'Lake Houston',
      'George Bush Intercontinental Airport',
      'Humble ISD schools',
      'Lake Houston State Park'
    ],
    businessTypes: ['Restaurants', 'Retail', 'Auto services', 'Home services', 'Healthcare', 'Travel services'],
    distanceFromConroe: '30 minutes'
  },
  {
    slug: 'magnolia',
    name: 'Magnolia',
    county: 'Montgomery County',
    population: '3,000+ (city) / 50,000+ (area)',
    description: 'Magnolia is a rapidly growing rural community transitioning to suburban. The area attracts families seeking larger lots and a country feel while staying connected to Houston. Local businesses serve both longtime residents and newcomers.',
    neighborhoods: ['Magnolia Ridge', 'Westwood', 'High Meadow Ranch', 'Magnolia Farms', 'Country Lake Estates'],
    localFeatures: [
      'Unity Park',
      'Historic downtown area',
      'Magnolia ISD schools',
      'FM 1488 and FM 2978 corridors',
      'Proximity to The Woodlands'
    ],
    businessTypes: ['Home services', 'Landscaping', 'Contractors', 'Restaurants', 'Auto services', 'Veterinary'],
    distanceFromConroe: '20 minutes'
  },
  {
    slug: 'montgomery',
    name: 'Montgomery',
    county: 'Montgomery County',
    population: '2,500+ (city) / 25,000+ (area)',
    description: 'Montgomery is the county seat with rich Texas history and a charming downtown. Lake Conroe tourism and the historic district create opportunities for unique businesses serving both residents and visitors.',
    neighborhoods: ['Walden', 'Bentwater', 'April Sound', 'Lake Conroe area', 'Historic Downtown'],
    localFeatures: [
      'Historic downtown courthouse square',
      'Lake Conroe waterfront',
      'Montgomery ISD schools',
      'Fernland Historical Park',
      'Tourism from lake visitors'
    ],
    businessTypes: ['Restaurants', 'Boutiques', 'Lake services', 'Real estate', 'Tourism', 'Professional services'],
    distanceFromConroe: '10 minutes'
  },
  {
    slug: 'willis',
    name: 'Willis',
    county: 'Montgomery County',
    population: '7,000+',
    description: 'Willis is a small but growing city north of Conroe along I-45. The community balances small-town values with growth from Houston commuters and Lake Conroe recreation.',
    neighborhoods: ['Downtown Willis', 'Waterford Park', 'Southern Trails', 'Lake Conroe Hills'],
    localFeatures: [
      'I-45 corridor access',
      'Lake Conroe proximity',
      'Willis ISD schools',
      'Historic downtown area',
      'Affordable cost of living'
    ],
    businessTypes: ['Restaurants', 'Auto services', 'Retail', 'Home services', 'Contractors', 'Storage'],
    distanceFromConroe: '10 minutes'
  },
  {
    slug: 'huntsville',
    name: 'Huntsville',
    county: 'Walker County',
    population: '46,000+',
    description: 'Huntsville is home to Sam Houston State University and Texas\' prison system headquarters. The university brings young consumers and educational services, while the historic downtown attracts tourists.',
    neighborhoods: ['Downtown', 'SHSU campus area', 'Elkins Lake', 'Westwood', 'Raven Hills'],
    localFeatures: [
      'Sam Houston State University',
      'Sam Houston Memorial Museum',
      'Huntsville State Park',
      'Historic downtown square',
      'Texas Prison Museum'
    ],
    businessTypes: ['Restaurants', 'Student services', 'Retail', 'Professional services', 'Healthcare', 'Real estate'],
    distanceFromConroe: '30 minutes'
  },
  {
    slug: 'houston',
    name: 'Houston',
    county: 'Harris County',
    population: '2.3 million+',
    description: 'Houston is the 4th largest city in the US with incredible diversity and economic opportunity. From the Medical Center to the Energy Corridor, businesses of all types thrive in this dynamic market.',
    neighborhoods: ['Downtown', 'Midtown', 'Montrose', 'The Heights', 'River Oaks', 'Memorial', 'West University', 'Galleria', 'Upper Kirby'],
    localFeatures: [
      'Texas Medical Center (largest in the world)',
      'Energy Corridor (oil & gas headquarters)',
      'Port of Houston',
      'NASA Johnson Space Center',
      'World-class museums and dining'
    ],
    businessTypes: ['All industries', 'Medical', 'Energy', 'Legal', 'Technology', 'Hospitality', 'Retail', 'Manufacturing'],
    distanceFromConroe: '40 minutes'
  },
  {
    slug: 'league-city',
    name: 'League City',
    county: 'Galveston/Harris Counties',
    population: '115,000+',
    description: 'League City is a fast-growing suburb between Houston and Galveston. The NASA/aerospace industry and waterfront location create a unique business environment with both technical and recreational customers.',
    neighborhoods: ['South Shore Harbour', 'Tuscan Lakes', 'Victory Lakes', 'West Bay', 'Marina Bay'],
    localFeatures: [
      'Clear Lake and bay access',
      'NASA Johnson Space Center proximity',
      'South Shore Harbour marina',
      'Clear Creek ISD schools',
      'Galveston Bay recreation'
    ],
    businessTypes: ['Maritime services', 'Aerospace', 'Restaurants', 'Healthcare', 'Professional services', 'Recreation'],
    distanceFromConroe: '60 minutes'
  },
  {
    slug: 'conroe',
    name: 'Conroe',
    county: 'Montgomery County',
    population: '100,000+',
    description: 'Conroe is our home base and one of the fastest-growing cities in America. The revitalized downtown, Lake Conroe tourism, and explosive residential growth create endless opportunities for local businesses.',
    neighborhoods: ['Downtown', 'Grand Central Park', 'April Sound', 'River Plantation', 'Lake Conroe', 'Caney Creek area'],
    localFeatures: [
      'Revitalized downtown with restaurants and shops',
      'Lake Conroe recreation and tourism',
      'Conroe ISD schools',
      'The Woodlands proximity',
      'Grand Central Park development'
    ],
    businessTypes: ['Restaurants', 'Retail', 'Home services', 'Healthcare', 'Professional services', 'Lake tourism', 'Real estate'],
    distanceFromConroe: 'Home base'
  }
]

export function getServiceAreaBySlug(slug: string): ServiceArea | undefined {
  return serviceAreas.find(area => area.slug === slug)
}

export function getAllServiceAreaSlugs(): string[] {
  return serviceAreas.map(area => area.slug)
}
