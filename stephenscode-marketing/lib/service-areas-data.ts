export interface ServiceArea {
  slug: string
  name: string
  county: string
  region: 'montgomery' | 'houston-neighborhoods' | 'harris-north' | 'fort-bend' | 'galveston-bay' | 'outlying'
  population: string
  description: string
  neighborhoods?: string[]
  localFeatures: string[]
  businessTypes: string[]
  distanceFromConroe: string
}

export const serviceAreas: ServiceArea[] = [
  // ========== MONTGOMERY COUNTY ==========
  {
    slug: 'conroe',
    name: 'Conroe',
    county: 'Montgomery County',
    region: 'montgomery',
    population: '100,000+',
    description: 'Conroe is our home base and one of the fastest-growing cities in America. Named the top-selling master-planned community market in Texas, Conroe has seen explosive residential and commercial growth along the I-45 corridor. The revitalized downtown features locally owned restaurants, breweries, and boutiques that have transformed the city center into a walkable destination. Lake Conroe tourism brings millions in annual revenue, and Grand Central Park is one of the largest mixed-use developments in the state. For local businesses, this growth means more customers — but also more competition. A professional website is no longer optional here.',
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
  },
  {
    slug: 'the-woodlands',
    name: 'The Woodlands',
    county: 'Montgomery County',
    region: 'montgomery',
    population: '118,000+',
    description: 'The Woodlands is a master-planned community ranked among the best places to live in America by Niche and Money magazine. With a median household income exceeding $120,000, businesses here serve an affluent, digitally savvy customer base that expects polished online experiences. The Woodlands Waterway, Town Center, and Market Street create a thriving commercial hub, while major corporations like Chevron Phillips, Huntsman, and McKesson have headquarters here. The combination of high-earning residents and corporate presence makes this one of the most competitive local markets in Texas — your website needs to stand out.',
    neighborhoods: ['Town Center', 'Creekside Park', 'Sterling Ridge', 'Alden Bridge', 'Cochran\'s Crossing', 'Indian Springs', 'Panther Creek', 'Grogan\'s Mill'],
    localFeatures: [
      'The Woodlands Mall and Market Street shopping',
      'The Cynthia Woods Mitchell Pavilion',
      'Town Center and Waterway Square',
      'Major corporate headquarters (Chevron Phillips, Huntsman)',
      'Top-rated Conroe ISD schools'
    ],
    businessTypes: ['Medical practices', 'Law firms', 'Financial advisors', 'Restaurants', 'Boutique retail', 'Home services', 'Real estate'],
    distanceFromConroe: '15 minutes'
  },
  {
    slug: 'magnolia',
    name: 'Magnolia',
    county: 'Montgomery County',
    region: 'montgomery',
    population: '3,000+ (city) / 50,000+ (area)',
    description: 'Magnolia is a rapidly growing rural community where country living meets suburban convenience. The area attracts families seeking larger lots, equestrian properties, and a small-town atmosphere while staying within commuting distance of Houston and The Woodlands. FM 1488 and FM 2978 are the commercial corridors, with new shopping centers and restaurants appearing regularly to serve the growing population. Local businesses here succeed by building personal relationships — and a professional website extends that personal touch to every potential customer searching online.',
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
    region: 'montgomery',
    population: '2,500+ (city) / 25,000+ (area)',
    description: 'Montgomery is the county seat with a rich Texas history dating back to 1837 — it was once the third-largest city in the Republic of Texas. Today, the charming historic downtown square draws visitors with antique shops, cafes, and the annual Montgomery Trek. Lake Conroe\'s southern shore brings year-round tourism, with communities like Walden, Bentwater, and April Sound creating a resort-like atmosphere. Local businesses here benefit from both the permanent residential base and a steady stream of lake visitors. Having a strong online presence ensures you capture both audiences.',
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
    region: 'montgomery',
    population: '7,000+',
    description: 'Willis is a small but growing city north of Conroe along the I-45 corridor. Once a quiet railroad town, Willis is experiencing growth as Houston commuters seek affordable housing and Lake Conroe recreation. The downtown area preserves its historic character while new commercial development along I-45 brings modern retail and dining. Willis ISD serves a tight-knit community that values local businesses. For entrepreneurs here, a professional website helps you compete with larger businesses in nearby Conroe and The Woodlands while establishing your reputation as the trusted local choice.',
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
    slug: 'pinehurst',
    name: 'Pinehurst',
    county: 'Montgomery County',
    region: 'montgomery',
    population: '5,000+',
    description: 'Pinehurst is a small village nestled between Conroe and Tomball along SH-249 (the Aggie Expressway). This quiet, wooded community offers an affordable alternative to The Woodlands with a distinctly rural feel — many properties sit on 1-5 acre lots with pine trees and rolling terrain. The recent completion of the SH-249 toll road has dramatically improved access to Houston, making Pinehurst increasingly attractive to commuters and sparking new commercial development along the corridor. Local businesses serve a community that values quality workmanship and personal service over flash — your website should reflect that authenticity.',
    neighborhoods: ['Decker Prairie', 'Pinehurst Estates', 'Pinehurst Village'],
    localFeatures: [
      'SH-249 Aggie Expressway access',
      'Rural wooded lots and acreage',
      'Proximity to both Conroe and Tomball',
      'New commercial development along SH-249',
      'Magnolia ISD schools'
    ],
    businessTypes: ['Contractors', 'Landscaping', 'Equestrian services', 'Home services', 'Auto repair', 'Small retail'],
    distanceFromConroe: '15 minutes'
  },
  {
    slug: 'shenandoah',
    name: 'Shenandoah',
    county: 'Montgomery County',
    region: 'montgomery',
    population: '3,000+',
    description: 'Shenandoah is a small city wedged between The Woodlands and Conroe along I-45, punching far above its weight in commercial activity. Despite its tiny residential population, Shenandoah\'s commercial corridor along I-45 and Research Forest Drive generates massive traffic with shopping centers, restaurants, hotels, and entertainment venues. Sam Houston State University\'s Woodlands campus brings a student population, and the Metropark Square mixed-use development has added even more retail and dining options. If your business is in Shenandoah, you\'re competing for attention in one of the busiest commercial strips in Montgomery County — a strong website is essential.',
    neighborhoods: ['Shenandoah Park', 'Research Forest corridor', 'I-45 commercial district'],
    localFeatures: [
      'Metropark Square mixed-use development',
      'Sam Houston State University - Woodlands campus',
      'Heavy I-45 commercial corridor traffic',
      'Adjacent to The Woodlands Town Center',
      'Major hotel and dining cluster'
    ],
    businessTypes: ['Restaurants', 'Retail', 'Hotels', 'Entertainment', 'Professional services', 'Medical offices'],
    distanceFromConroe: '12 minutes'
  },
  {
    slug: 'oak-ridge-north',
    name: 'Oak Ridge North',
    county: 'Montgomery County',
    region: 'montgomery',
    population: '3,200+',
    description: 'Oak Ridge North is a small, established city adjacent to The Woodlands and Shenandoah. While it shares many amenities with its larger neighbors, Oak Ridge North has maintained its own identity as a walkable, affordable community with a strong sense of neighborliness. Robinson Road and Hanna Road provide the commercial backbone, with local shops and services serving the tight-knit residential base. The city\'s location at the crossroads of I-45 and Robinson Road gives businesses excellent visibility and accessibility. A well-designed website helps Oak Ridge North businesses capture the overflow traffic from The Woodlands shoppers seeking local alternatives.',
    neighborhoods: ['Marilyn Estates', 'Oak Ridge North Village'],
    localFeatures: [
      'Adjacent to The Woodlands amenities',
      'Robinson Road commercial corridor',
      'Easy I-45 access',
      'Conroe ISD schools',
      'Walkable community layout'
    ],
    businessTypes: ['Small retail', 'Restaurants', 'Professional services', 'Home services', 'Auto services'],
    distanceFromConroe: '13 minutes'
  },
  {
    slug: 'panorama-village',
    name: 'Panorama Village',
    county: 'Montgomery County',
    region: 'montgomery',
    population: '2,400+',
    description: 'Panorama Village is a serene golf course community set among towering pines just south of Conroe. Built around the Panorama Golf Club, this quiet residential enclave attracts retirees and families who value privacy and natural beauty. While primarily residential, the community supports local service providers who understand the area\'s demographics — professionals and retirees with discretionary income who prefer to hire local. If you serve the Panorama Village community, a polished website builds the trust and credibility that this discerning clientele expects before making a hiring decision.',
    neighborhoods: ['Panorama Golf Club area', 'Panorama Estates'],
    localFeatures: [
      'Panorama Golf Club',
      'Heavily wooded lots with mature pines',
      'Quiet residential atmosphere',
      'Close proximity to Conroe amenities',
      'Higher-income residential demographic'
    ],
    businessTypes: ['Home services', 'Landscaping', 'Pool services', 'Professional services', 'Healthcare', 'Golf services'],
    distanceFromConroe: '5 minutes'
  },
  {
    slug: 'cut-and-shoot',
    name: 'Cut and Shoot',
    county: 'Montgomery County',
    region: 'montgomery',
    population: '1,100+',
    description: 'Cut and Shoot is one of the most uniquely named towns in Texas — and the story behind the name (a 1912 community dispute) is as colorful as the community itself. Located just east of Conroe along FM 1485, this small rural community embodies the independent, self-reliant spirit of East Texas. Residents here are fiercely loyal to local businesses and tradespeople. If you\'re a contractor, mechanic, or service provider working the Cut and Shoot area, a professional website might seem unexpected — but that\'s exactly why it works. Being the only business in your trade with a real website gives you a massive competitive advantage in a market where word-of-mouth still dominates.',
    localFeatures: [
      'Historic Texas community with unique name origin',
      'Rural East Texas character',
      'FM 1485 corridor',
      'Close to Conroe and Sam Houston National Forest',
      'Strong word-of-mouth business culture'
    ],
    businessTypes: ['Contractors', 'Auto repair', 'Welding', 'Heavy equipment', 'Home services', 'Agricultural services'],
    distanceFromConroe: '10 minutes'
  },
  {
    slug: 'new-caney',
    name: 'New Caney',
    county: 'Montgomery County',
    region: 'montgomery',
    population: '20,000+',
    description: 'New Caney is one of the fastest-growing communities in east Montgomery County, fueled by the Valley Ranch master-planned development and the Grand Texas entertainment complex. US-59/I-69 provides the main corridor, with new retail, restaurants, and housing developments appearing at a rapid pace. The area is transitioning from rural to suburban, creating opportunities for businesses that can serve both the established community and the wave of new residents. Grand Texas — including Big Rivers Waterpark — has put New Caney on the map as a recreation destination. A strong online presence helps New Caney businesses capture the attention of both new residents searching for local services and visitors exploring the area.',
    neighborhoods: ['Valley Ranch', 'Tavola', 'Roman Forest', 'Peach Creek', 'Kings Manor'],
    localFeatures: [
      'Valley Ranch master-planned community',
      'Grand Texas / Big Rivers Waterpark',
      'US-59/I-69 corridor growth',
      'New Caney ISD schools',
      'Rapid residential development'
    ],
    businessTypes: ['Restaurants', 'Retail', 'Home services', 'Healthcare', 'Contractors', 'Entertainment'],
    distanceFromConroe: '25 minutes'
  },
  {
    slug: 'porter',
    name: 'Porter',
    county: 'Montgomery County',
    region: 'montgomery',
    population: '35,000+',
    description: 'Porter is a rapidly expanding community along the US-59 corridor in southeast Montgomery County. Once considered a remote outpost, Porter has exploded with master-planned communities, new schools, and commercial centers serving the growing population. The area sits at the intersection of US-59 and FM 1314, giving businesses access to traffic from both Houston commuters and local residents. Porter\'s demographics skew toward young families in new construction homes — a tech-savvy audience that searches online for every service they need. If your business serves the Porter area, showing up in those searches with a professional, fast-loading website is how you win customers over the competition.',
    neighborhoods: ['Eagle Springs', 'Balmoral', 'Fall Creek', 'Summer Creek', 'Canyon Gate'],
    localFeatures: [
      'US-59/I-69 corridor rapid growth',
      'Multiple master-planned communities',
      'New Caney ISD schools',
      'FM 1314 commercial corridor',
      'Young family demographics'
    ],
    businessTypes: ['Home services', 'Pediatric healthcare', 'Restaurants', 'Fitness', 'Contractors', 'Childcare'],
    distanceFromConroe: '30 minutes'
  },
  {
    slug: 'splendora',
    name: 'Splendora',
    county: 'Montgomery County',
    region: 'montgomery',
    population: '2,000+',
    description: 'Splendora is a small, close-knit community in eastern Montgomery County along US-59 between Conroe and Humble. The town maintains a distinctly rural character with affordable housing, wooded properties, and a community that values hard work and reliability. Splendora ISD is the center of community life, and local events bring residents together. Businesses in Splendora compete for customers who often drive to Kingwood, Humble, or Conroe for services. Having a professional website makes you visible to these residents before they leave town — keeping revenue local and building your reputation as the go-to provider in the Splendora area.',
    localFeatures: [
      'US-59 corridor access between Conroe and Humble',
      'Splendora ISD community',
      'Affordable rural living',
      'Sam Houston National Forest proximity',
      'East Montgomery County growth corridor'
    ],
    businessTypes: ['Contractors', 'Auto services', 'Home services', 'Restaurants', 'Retail', 'Agricultural supplies'],
    distanceFromConroe: '20 minutes'
  },

  // ========== HARRIS COUNTY & NORTH HOUSTON SUBURBS ==========
  {
    slug: 'spring',
    name: 'Spring',
    county: 'Harris County',
    region: 'harris-north',
    population: '60,000+',
    description: 'Spring is a rapidly growing suburb with a mix of established neighborhoods and new developments. Known for Old Town Spring\'s shopping and the ExxonMobil campus, businesses here serve both families and corporate professionals. The Hardy Toll Road and I-45 provide excellent north-south connectivity, making Spring a natural crossroads between Houston and Montgomery County.',
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
    region: 'harris-north',
    population: '12,000+',
    description: 'Tomball maintains its small-town charm while experiencing significant growth along the SH-249 and Grand Parkway corridors. The historic downtown depot district hosts popular events like the German Heritage Festival and the Tomball Night Market. New retail and restaurant development has accelerated along SH-249, but the community\'s identity remains rooted in its small-town values. Local businesses thrive here by combining personal relationships with professional quality — and a well-built website helps extend that reputation to every potential customer searching online.',
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
    slug: 'cypress',
    name: 'Cypress',
    county: 'Harris County',
    region: 'harris-north',
    population: '180,000+',
    description: 'Cypress is a sprawling, family-friendly community in northwest Harris County with some of the best schools in the Houston area. Cy-Fair ISD consistently ranks among the top districts in Texas, attracting families who then need every local service imaginable. Master-planned communities like Bridgeland and Towne Lake have added tens of thousands of new homes, and the retail and dining scene along US-290 and the Grand Parkway has expanded to match. The sheer size and growth of Cypress means heavy competition for local businesses — standing out requires a website that loads fast, looks professional, and ranks well in local searches.',
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
    region: 'harris-north',
    population: '16,000+ (city) / 200,000+ (area)',
    description: 'Humble offers affordable living with easy access to Bush Intercontinental Airport and downtown Houston. The area\'s oil history — Humble Oil Company was founded here and later became ExxonMobil — gives the city historical significance, while Lake Houston and surrounding parks provide outdoor recreation. Deerbrook Mall anchors the retail sector, and the surrounding area supports a diverse mix of businesses serving families, airport travelers, and outdoor enthusiasts.',
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
    slug: 'kingwood',
    name: 'Kingwood',
    county: 'Harris County',
    region: 'harris-north',
    population: '80,000+',
    description: 'Known as the "Livable Forest," Kingwood is one of Houston\'s most established master-planned communities, developed in 1971 among dense East Texas pine forests along the San Jacinto River. The community\'s extensive trail system, mature tree canopy, and well-maintained neighborhoods attract families and professionals who value outdoor living. Kingwood Town Center provides the commercial hub, while the community\'s proximity to Bush Intercontinental Airport makes it popular with frequent travelers. Local businesses here serve a loyal, affluent customer base that researches online before buying. Your website needs to match the quality standard Kingwood residents expect.',
    neighborhoods: ['Kingwood Town Center', 'Kings Point', 'Forest Cove', 'Greentree Village', 'Elm Grove', 'Bear Branch'],
    localFeatures: [
      'Extensive hike and bike trail system',
      'Lake Houston and San Jacinto River',
      'Kingwood Town Center shopping',
      'Humble ISD top-rated schools',
      'Bush Intercontinental Airport proximity'
    ],
    businessTypes: ['Healthcare', 'Restaurants', 'Home services', 'Professional services', 'Fitness', 'Real estate'],
    distanceFromConroe: '35 minutes'
  },
  {
    slug: 'atascocita',
    name: 'Atascocita',
    county: 'Harris County',
    region: 'harris-north',
    population: '80,000+',
    description: 'Atascocita is a large, fast-growing community northeast of Houston along FM 1960 and the Atascocita Road corridor. The area has transformed from rural ranch land to a suburban hub with master-planned communities, shopping centers, and a strong sense of community identity. Lake Houston and its tributaries provide recreation, while the Atascocita golf courses and country clubs cater to an active outdoor lifestyle. The population skews toward young to middle-aged families in newer homes — a demographic that relies heavily on online search to find local services. A website optimized for Atascocita-specific searches puts your business in front of these residents at exactly the moment they\'re looking for help.',
    neighborhoods: ['Shadow Creek', 'Eagle Springs', 'Pine Brook', 'Lakeshore', 'Atascocita Forest'],
    localFeatures: [
      'FM 1960 and Atascocita Road commercial corridors',
      'Lake Houston recreation and fishing',
      'Atascocita golf courses',
      'Humble ISD schools',
      'Grand Parkway access'
    ],
    businessTypes: ['Home services', 'Restaurants', 'Healthcare', 'Fitness', 'Childcare', 'Professional services'],
    distanceFromConroe: '30 minutes'
  },

  // ========== HOUSTON NEIGHBORHOODS ==========
  {
    slug: 'houston',
    name: 'Houston',
    county: 'Harris County',
    region: 'houston-neighborhoods',
    population: '2.3 million+',
    description: 'Houston is the 4th largest city in the US with incredible diversity and economic opportunity. From the Medical Center to the Energy Corridor, businesses of all types thrive in this dynamic market. Houston\'s lack of zoning creates a unique business landscape where retail, dining, and services can spring up in unexpected locations — making online visibility even more critical since customers can\'t always rely on foot traffic alone.',
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
    slug: 'midtown-houston',
    name: 'Midtown Houston',
    county: 'Harris County',
    region: 'houston-neighborhoods',
    population: '15,000+',
    description: 'Midtown is Houston\'s densely packed urban core, a neighborhood defined by high-rise apartments, trendy restaurants, and one of the city\'s most active nightlife scenes. Located between Downtown and the Museum District along the Main Street METRORail line, Midtown attracts young professionals, entrepreneurs, and creatives who live, work, and play in the neighborhood. The dining scene ranges from acclaimed Vietnamese restaurants on Milam Street to rooftop bars and craft cocktail lounges. For businesses in Midtown, your customer base is mobile-first and digitally native — they\'re searching on their phones while walking down the street. A fast, mobile-optimized website isn\'t just nice to have; it\'s how you survive in this competitive, fast-moving market.',
    neighborhoods: ['Main Street corridor', 'Midtown Park area', 'McGowen Street', 'Milam Street'],
    localFeatures: [
      'METRORail Red Line stops throughout the neighborhood',
      'Midtown Park green space and events',
      'Walkable restaurant and bar district',
      'Adjacent to Museum District and Downtown',
      'Dense apartment and condo development'
    ],
    businessTypes: ['Restaurants & bars', 'Fitness studios', 'Salons & spas', 'Professional services', 'Creative agencies', 'Retail boutiques'],
    distanceFromConroe: '45 minutes'
  },
  {
    slug: 'the-heights-houston',
    name: 'The Heights',
    county: 'Harris County',
    region: 'houston-neighborhoods',
    population: '40,000+',
    description: 'Houston Heights is one of the city\'s most iconic neighborhoods — a historic district where Victorian-era bungalows sit alongside trendy boutiques, farm-to-table restaurants, and craft breweries. 19th Street and White Oak Drive form the commercial heart, drawing visitors from across Houston for shopping, dining, and the Heights weekend bike ride along the MKT Trail. The neighborhood has experienced massive gentrification and property value increases, attracting affluent residents who support local businesses over chains. Heights customers are loyal but selective — they choose businesses that feel authentic, local, and professional. A thoughtfully designed website that reflects your brand\'s personality is essential to earning their trust.',
    neighborhoods: ['Houston Heights', 'Woodland Heights', 'Norhill', 'Shady Acres', 'Sunset Heights'],
    localFeatures: [
      '19th Street shopping and dining district',
      'White Oak Music Hall and entertainment',
      'Heights Bike Trail (MKT Trail)',
      'Historic Victorian architecture',
      'Karbach Brewing Company and craft beer scene'
    ],
    businessTypes: ['Boutique retail', 'Restaurants & cafes', 'Art galleries', 'Home renovation', 'Interior design', 'Yoga & wellness'],
    distanceFromConroe: '40 minutes'
  },
  {
    slug: 'montrose-houston',
    name: 'Montrose',
    county: 'Harris County',
    region: 'houston-neighborhoods',
    population: '35,000+',
    description: 'Montrose is Houston\'s most eclectic neighborhood — a cultural melting pot known for world-class art institutions, vintage shops, diverse dining, and a fiercely independent spirit. Home to the Menil Collection, the Rothko Chapel, and the Contemporary Arts Museum, Montrose has long been the city\'s creative hub. The neighborhood has evolved from its bohemian roots into one of Houston\'s most desirable addresses, with property values that reflect its cultural cachet. Westheimer Road is the main commercial artery, lined with independent businesses that define Montrose\'s character. If your business is here, your customers expect creativity and authenticity — cookie-cutter template websites don\'t cut it in a neighborhood that celebrates the unique.',
    neighborhoods: ['Neartown', 'Cherryhurst', 'Avondale', 'Castle Court', 'Westheimer corridor'],
    localFeatures: [
      'Menil Collection and Rothko Chapel',
      'Contemporary Arts Museum Houston',
      'Westheimer Road commercial corridor',
      'Diverse, independent restaurant scene',
      'Houston\'s LGBTQ+ community hub'
    ],
    businessTypes: ['Art galleries', 'Vintage & thrift shops', 'Restaurants', 'Coffee shops', 'Tattoo studios', 'Independent retail', 'Creative services'],
    distanceFromConroe: '45 minutes'
  },
  {
    slug: 'downtown-houston',
    name: 'Downtown Houston',
    county: 'Harris County',
    region: 'houston-neighborhoods',
    population: '11,000+ (residential) / 150,000+ (daytime)',
    description: 'Downtown Houston is the city\'s central business district and the economic engine of the 4th largest metro in America. The skyline houses headquarters for energy companies, law firms, financial institutions, and tech startups. Beyond the office towers, Downtown has undergone a dramatic residential and entertainment transformation — Discovery Green, the Theater District, and GreenStreet have made it a destination for more than just work. The Downtown tunnel system connects 95 city blocks underground. For businesses serving Downtown\'s corporate audience, your website is often your first impression in a market where professionalism and credibility are non-negotiable. Whether you\'re a law firm, consulting practice, or restaurant catering to the lunch crowd, your online presence needs to match the polish of the skyline above.',
    neighborhoods: ['Main Street District', 'Market Square', 'Theater District', 'Discovery Green area', 'East Downtown (EaDo)'],
    localFeatures: [
      'Discovery Green urban park',
      'Theater District (17 performing arts venues)',
      'Downtown tunnel system (6+ miles)',
      'Minute Maid Park (Houston Astros)',
      'GreenStreet entertainment complex'
    ],
    businessTypes: ['Law firms', 'Financial services', 'Consulting', 'Restaurants', 'Technology', 'Commercial real estate'],
    distanceFromConroe: '45 minutes'
  },
  {
    slug: 'galleria-uptown-houston',
    name: 'Galleria / Uptown Houston',
    county: 'Harris County',
    region: 'houston-neighborhoods',
    population: '50,000+',
    description: 'The Galleria-Uptown area is Houston\'s premier shopping, dining, and high-rise district. Anchored by The Galleria — the largest mall in Texas with over 400 stores — this area represents luxury and commerce at scale. The Uptown District along Post Oak Boulevard features high-rise office buildings, upscale restaurants, international hotels, and the newly completed Uptown Bus Rapid Transit system. The Williams Tower (formerly Transco Tower) and its waterwall are Houston landmarks. Businesses here compete in Houston\'s most upscale market. Your website needs to communicate quality, sophistication, and professionalism. The customer base here has high expectations and will compare your online presence against national brands.',
    neighborhoods: ['Uptown Park', 'Post Oak corridor', 'Tanglewood', 'Briargrove', 'San Felipe corridor'],
    localFeatures: [
      'The Galleria (400+ stores, largest in Texas)',
      'Williams Tower and Gerald D. Hines Waterwall',
      'Uptown Park luxury shopping',
      'High-rise office district',
      'Uptown Bus Rapid Transit (BRT)'
    ],
    businessTypes: ['Luxury retail', 'Fine dining', 'Law firms', 'Financial advisors', 'Medical aesthetics', 'High-end services'],
    distanceFromConroe: '50 minutes'
  },
  {
    slug: 'memorial-houston',
    name: 'Memorial',
    county: 'Harris County',
    region: 'houston-neighborhoods',
    population: '60,000+',
    description: 'Memorial is one of Houston\'s most affluent residential areas, stretching along the I-10 corridor from the Heights to the Energy Corridor. Anchored by Memorial Park — one of the largest urban parks in the nation — the area attracts families with excellent Spring Branch ISD schools, established neighborhoods with large lots, and easy access to both Downtown and the west side. Memorial City Mall provides a major retail hub. Residents here tend to be professionals with above-average household incomes who invest in quality services for their homes and families. They research extensively online before choosing a service provider, making your website a critical factor in winning or losing their business.',
    neighborhoods: ['Memorial Villages', 'Memorial Bend', 'Memorial Forest', 'Spring Valley Village', 'Hedwig Village', 'Bunker Hill Village'],
    localFeatures: [
      'Memorial Park (1,500+ acres)',
      'Memorial City Mall',
      'Terry Hershey Park bike trails',
      'Spring Branch ISD top-rated schools',
      'Memorial Hermann hospitals'
    ],
    businessTypes: ['Home services', 'Healthcare', 'Restaurants', 'Real estate', 'Private education', 'Professional services'],
    distanceFromConroe: '45 minutes'
  },
  {
    slug: 'energy-corridor-houston',
    name: 'Energy Corridor',
    county: 'Harris County',
    region: 'houston-neighborhoods',
    population: '45,000+',
    description: 'The Energy Corridor is Houston\'s western business district, home to the headquarters and major offices of the world\'s largest energy companies — ConocoPhillips, BP, Shell, and dozens more. Located along I-10 between Beltway 8 and SH-6, this area combines corporate campuses with surrounding residential communities like Nottingham Forest and Briar Forest. The Westchase District to the south adds more commercial density. The customer base here splits between corporate professionals who need B2B services during the week and families who need residential services on weekends. A professional website that clearly communicates your value proposition helps you serve both audiences effectively.',
    neighborhoods: ['Westchase', 'Briar Forest', 'Nottingham Forest', 'Eldridge area', 'Park Row'],
    localFeatures: [
      'ConocoPhillips, BP, Shell headquarters',
      'Energy Corridor Business Improvement District',
      'Terry Hershey Park extension',
      'Westchase District commercial hub',
      'I-10 and Beltway 8 interchange access'
    ],
    businessTypes: ['B2B services', 'Consulting', 'Engineering', 'Technology', 'Restaurants', 'Commercial services'],
    distanceFromConroe: '50 minutes'
  },
  {
    slug: 'west-university-place',
    name: 'West University Place',
    county: 'Harris County',
    region: 'houston-neighborhoods',
    population: '15,000+',
    description: 'West University Place ("West U") is one of the most affluent small cities in Texas, completely surrounded by Houston. With median home values exceeding $1 million and some of the best public schools in the state, West U attracts successful professionals and families who demand the best in everything — including the businesses they hire. Rice Village, the adjacent shopping and dining district, provides the commercial center for the area. West U residents are highly educated and thorough researchers. They will check your website, read reviews, and compare options before contacting you. A professional, well-designed website is the price of entry in this market — without one, you won\'t even make the shortlist.',
    neighborhoods: ['West University core', 'Southside Place', 'Rice Village area', 'University Place'],
    localFeatures: [
      'Rice Village shopping and dining district',
      'Rice University campus adjacency',
      'West University Elementary (Blue Ribbon school)',
      'Hermann Park and Houston Zoo proximity',
      'Texas Medical Center proximity'
    ],
    businessTypes: ['Professional services', 'Healthcare', 'Home renovation', 'Tutoring & education', 'Fine dining', 'Boutique retail'],
    distanceFromConroe: '50 minutes'
  },
  {
    slug: 'bellaire',
    name: 'Bellaire',
    county: 'Harris County',
    region: 'houston-neighborhoods',
    population: '19,000+',
    description: 'Bellaire is a small, independent city within Houston known for its excellent schools, tree-lined streets, and thriving Chinatown district along Bellaire Boulevard. The city occupies a unique position — simultaneously a quiet residential enclave and a major commercial corridor. The stretch of Bellaire Boulevard from Gessner to Beltway 8 is Houston\'s primary Chinatown, one of the largest Asian commercial districts in the American South, featuring hundreds of restaurants, shops, and businesses serving the city\'s vast Asian-American community. Businesses here need websites that can reach a diverse, multicultural customer base. Whether you\'re a restaurant, medical practice, or service provider, your site needs to be mobile-optimized and clearly communicate your offerings to customers from various backgrounds.',
    neighborhoods: ['Bellaire proper', 'Chinatown corridor', 'Meyerland adjacent', 'Sharpstown area'],
    localFeatures: [
      'Houston\'s Chinatown commercial district',
      'Bellaire High School (Houston ISD)',
      'Diverse multicultural dining scene',
      'Evelyn\'s Park community gathering space',
      'Central Houston location'
    ],
    businessTypes: ['Asian restaurants & bakeries', 'Healthcare', 'Retail', 'Professional services', 'Import/export', 'Beauty services'],
    distanceFromConroe: '50 minutes'
  },

  // ========== FORT BEND COUNTY ==========
  {
    slug: 'katy',
    name: 'Katy',
    county: 'Harris/Fort Bend/Waller Counties',
    region: 'fort-bend',
    population: '21,000+ (city) / 350,000+ (area)',
    description: 'Katy is one of Houston\'s fastest-growing areas with excellent schools and master-planned communities. The diverse population and strong economy make it ideal for businesses seeking growth opportunities. Katy ISD is one of the largest and highest-rated districts in Texas, making it a magnet for families from across the country.',
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
    region: 'fort-bend',
    population: '110,000+',
    description: 'Sugar Land is an affluent suburb with diverse demographics and a strong business community. The city consistently ranks among the best places to live in Texas. Fort Bend County has become one of the most ethnically diverse counties in America, and Sugar Land businesses serve customers from a wide range of cultural backgrounds. The city\'s imperial Sugar heritage and modern Town Square development create a unique blend of history and progress.',
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
    slug: 'missouri-city',
    name: 'Missouri City',
    county: 'Fort Bend/Harris Counties',
    region: 'fort-bend',
    population: '75,000+',
    description: 'Missouri City is a diverse, family-oriented suburb in Fort Bend County that offers affordable housing compared to neighboring Sugar Land while sharing many of the same amenities. The city straddles the Fort Bend and Harris County line, giving residents access to both county systems. Fort Bend ISD and Houston ISD schools serve the area. The Sienna community in the south and established neighborhoods like Quail Valley anchor the residential base. Missouri City\'s commercial districts along US-90A and SH-6 serve a growing population that increasingly looks online to find local services. For businesses here, ranking in Missouri City-specific searches gives you an advantage over competitors in Sugar Land and Houston who may not be targeting your market directly.',
    neighborhoods: ['Sienna', 'Quail Valley', 'Lake Olympia', 'Riverstone area', 'Four Corners'],
    localFeatures: [
      'Sienna master-planned community',
      'Fort Bend County Library system',
      'US-90A and SH-6 commercial corridors',
      'Fort Bend ISD schools',
      'Quail Valley golf and recreation'
    ],
    businessTypes: ['Home services', 'Healthcare', 'Restaurants', 'Retail', 'Professional services', 'Childcare'],
    distanceFromConroe: '55 minutes'
  },
  {
    slug: 'richmond',
    name: 'Richmond',
    county: 'Fort Bend County',
    region: 'fort-bend',
    population: '12,000+ (city) / 100,000+ (area)',
    description: 'Richmond is the county seat of Fort Bend County with deep Texas roots — it was founded in 1837 and served as the home of Mirabeau B. Lamar, the 2nd President of the Republic of Texas. Today, Richmond balances its historic character with the rapid growth spreading from Sugar Land and Rosenberg. The Fort Bend County Courthouse and government center bring daily foot traffic, while the surrounding area\'s master-planned communities provide a growing customer base. Richmond businesses benefit from being the government and services hub for all of Fort Bend County — one of the wealthiest and fastest-growing counties in Texas. A professional website helps you capture the business of residents across the county who come to Richmond for court dates, county services, and government offices.',
    neighborhoods: ['Pecan Grove', 'Long Meadow Farms', 'Harvest Green', 'Downtown Richmond', 'Brazos Town Center area'],
    localFeatures: [
      'Fort Bend County Courthouse and government center',
      'Historic downtown with Texas heritage sites',
      'George Ranch Historical Park',
      'Lamar CISD schools',
      'Brazos River recreation'
    ],
    businessTypes: ['Legal services', 'Government contractors', 'Restaurants', 'Retail', 'Home services', 'Professional services'],
    distanceFromConroe: '60 minutes'
  },

  // ========== GALVESTON BAY & SOUTH HOUSTON ==========
  {
    slug: 'pearland',
    name: 'Pearland',
    county: 'Brazoria/Harris Counties',
    region: 'galveston-bay',
    population: '125,000+',
    description: 'Pearland is one of the fastest-growing cities in Texas, offering affordable housing with easy access to Houston\'s Medical Center, Downtown, and NASA. The diverse community supports a wide range of local businesses, and the Pearland Town Center has become the commercial hub for the south Houston area.',
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
    slug: 'league-city',
    name: 'League City',
    county: 'Galveston/Harris Counties',
    region: 'galveston-bay',
    population: '115,000+',
    description: 'League City is a fast-growing suburb between Houston and Galveston with a unique position in the aerospace and maritime industries. NASA Johnson Space Center is just minutes away, and the proximity to Galveston Bay provides waterfront living and recreation. The city\'s mix of tech-savvy aerospace workers and outdoor enthusiasts creates a distinctive customer base.',
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
    slug: 'friendswood',
    name: 'Friendswood',
    county: 'Galveston/Harris Counties',
    region: 'galveston-bay',
    population: '40,000+',
    description: 'Friendswood is a family-oriented city consistently ranked among the best places to raise a family in Texas. Originally founded as a Quaker colony in 1895, the city retains a strong sense of community and neighborliness that defines its character. Friendswood ISD and Clear Creek ISD provide excellent schools that draw families from across the Houston metro. Businesses here succeed by building genuine relationships with a loyal customer base. The community\'s emphasis on trust and personal connection means your website needs to feel approachable and genuine — not corporate or generic. A website that tells your story, showcases your local involvement, and makes it easy to get in touch aligns perfectly with how Friendswood residents choose who to do business with.',
    neighborhoods: ['West Ranch', 'Friendswood Lakes', 'Autumn Creek', 'Heritage Park area', 'Downtown Friendswood'],
    localFeatures: [
      'Historic Quaker heritage and community values',
      'Friendswood ISD and Clear Creek ISD schools',
      'Stevenson Park recreation complex',
      'Centennial Park and community events',
      'Clear Creek natural area'
    ],
    businessTypes: ['Family healthcare', 'Home services', 'Restaurants', 'Tutoring & enrichment', 'Youth sports', 'Professional services'],
    distanceFromConroe: '55 minutes'
  },
  {
    slug: 'webster',
    name: 'Webster',
    county: 'Harris County',
    region: 'galveston-bay',
    population: '12,000+',
    description: 'Webster sits at the epicenter of the Bay Area Houston commercial district, home to NASA Johnson Space Center and the massive Baybrook Mall — the largest mall in the Clear Lake area. Despite its small residential population, Webster is a commercial powerhouse that draws shoppers and workers from across the south Houston region. The NASA Road 1 and I-45 corridors generate heavy traffic, and the Space Center Houston tourist attraction brings over a million visitors annually. For businesses in Webster, your potential customer base extends far beyond the city limits. A well-optimized website helps you capture traffic from the entire Bay Area Houston market — from Clear Lake to Kemah to Seabrook — by ranking for the searches these customers are making.',
    neighborhoods: ['Bay Area Boulevard corridor', 'NASA Road 1 area', 'Baybrook area', 'Clear Lake Shores adjacent'],
    localFeatures: [
      'NASA Johnson Space Center and Space Center Houston',
      'Baybrook Mall (largest in Clear Lake area)',
      'Bay Area Boulevard commercial corridor',
      'Proximity to Clear Lake and Galveston Bay',
      'I-45 and NASA Road 1 interchange'
    ],
    businessTypes: ['Aerospace services', 'Restaurants', 'Retail', 'Tourism', 'Hotels', 'Technology'],
    distanceFromConroe: '60 minutes'
  },

  // ========== OUTLYING AREAS ==========
  {
    slug: 'huntsville',
    name: 'Huntsville',
    county: 'Walker County',
    region: 'outlying',
    population: '46,000+',
    description: 'Huntsville is home to Sam Houston State University and the Texas Department of Criminal Justice headquarters. The university brings young consumers, cultural events, and educational services, while the historic downtown square with its Sam Houston statue attracts tourists. The city\'s dual identity — college town and state government hub — creates unique business opportunities.',
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
]

export function getServiceAreaBySlug(slug: string): ServiceArea | undefined {
  return serviceAreas.find(area => area.slug === slug)
}

export function getAllServiceAreaSlugs(): string[] {
  return serviceAreas.map(area => area.slug)
}

// Helper to get areas by region for grouping
export function getServiceAreasByRegion(region: ServiceArea['region']): ServiceArea[] {
  return serviceAreas.filter(area => area.region === region)
}
