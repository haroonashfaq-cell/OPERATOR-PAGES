import Link from 'next/link'

export interface StoryData {
  slug: string
  propertySlug: string
  title: string
  metaTitle: string
  metaDescription: string
  primaryKeyword: string
  readTime: string
  datePublished: string
  dateModified: string
  content: (props: { operator: string; slug: string }) => React.ReactNode
}

const allStories: Record<string, StoryData[]> = {
  'towne-properties': [
    {
      slug: 'harpers-point-resort-guide',
      propertySlug: 'harpers-point',
      title: 'Harpers Point Apartments Cincinnati: Pricing, Beach Amenities, and What to Know',
      metaTitle: 'Harpers Point Cincinnati: Pricing & Amenities | brightplace',
      metaDescription: 'Harpers Point apartments in Cincinnati offer a white sand beach, full-service pub, and resort pool. 9 floor plans from $1,285/mo. Complete 2026 guide.',
      primaryKeyword: 'Harpers Point apartments Cincinnati',
      readTime: '8 min',
      datePublished: '2026-08-23',
      dateModified: '2026-08-23',
      content: HarpersPointArticle,
    },
  ],
  'air-communities': [
    {
      slug: 'oak-trail-cherry-creek-guide',
      propertySlug: 'oak-trail',
      title: 'Oak Trail at Cherry Creek South: Pricing, Amenities, and Denver Living Guide',
      metaTitle: 'Oak Trail Cherry Creek South: Pricing & Guide | brightplace',
      metaDescription: 'Oak Trail at Cherry Creek South offers 7 floor plans from $1,512/mo near Cherry Creek State Park. All-in pricing, 2 pools, dog park. Complete 2026 guide.',
      primaryKeyword: 'Oak Trail at Cherry Creek South',
      readTime: '7 min',
      datePublished: '2026-08-23',
      dateModified: '2026-08-24',
      content: OakTrailArticle,
    },
    {
      slug: 'lakeview-gateway-park-guide',
      propertySlug: 'lakeview-gateway-park',
      title: 'Lakeview at Gateway Park: Lakeside Denver Apartments with Community Lake and Light Rail Access',
      metaTitle: 'Lakeview at Gateway Park Denver: Pricing & Guide | brightplace',
      metaDescription: 'Lakeview at Gateway Park in Denver offers 5 floor plans from $1,450/mo with a community lake, resort pool, and light rail access.',
      primaryKeyword: 'Lakeview at Gateway Park Denver',
      readTime: '6 min',
      datePublished: '2026-08-24',
      dateModified: '2026-08-24',
      content: LakeviewArticle,
    },
    {
      slug: 'air-communities-all-in-pricing-explained',
      propertySlug: 'oak-trail',
      title: 'What Is All-In Pricing? How AIR Communities Apartments Show Your Real Monthly Cost',
      metaTitle: 'All-In Pricing Explained: AIR Communities | brightplace',
      metaDescription: 'AIR Communities uses all-in pricing on brightplace. Learn what fees are included, what is separate, and how to compare apartment costs.',
      primaryKeyword: 'all-in pricing apartments',
      readTime: '5 min',
      datePublished: '2026-08-24',
      dateModified: '2026-08-24',
      content: AllInPricingArticle,
    },
  ],
}

export function getStory(operatorSlug: string, storySlug: string): StoryData | undefined {
  return allStories[operatorSlug]?.find(s => s.slug === storySlug)
}

export function getAllStoryParams(): { operator: string; slug: string }[] {
  const params: { operator: string; slug: string }[] = []
  for (const [operator, stories] of Object.entries(allStories)) {
    for (const story of stories) {
      params.push({ operator, slug: story.slug })
    }
  }
  return params
}

export function getStoriesByProperty(operatorSlug: string, propertySlug: string): StoryData[] {
  return allStories[operatorSlug]?.filter(s => s.propertySlug === propertySlug) || []
}

// Stories index: "stories" slug = operator-level listing
export function isStoriesIndex(slug: string): boolean {
  return slug === 'stories'
}

// Property-level stories index: "oak-trail-stories"
export function isPropertyStoriesIndex(slug: string): { propertySlug: string } | null {
  if (slug.endsWith('-stories') && slug !== 'stories') {
    return { propertySlug: slug.replace('-stories', '') }
  }
  return null
}

export function getAllStoriesByOperator(operatorSlug: string): StoryData[] {
  return allStories[operatorSlug] || []
}

export function getAllStoriesIndexParams(): { operator: string; slug: string }[] {
  const params: { operator: string; slug: string }[] = []
  // Operator-level stories pages
  for (const operator of Object.keys(allStories)) {
    params.push({ operator, slug: 'stories' })
  }
  // Property-level stories pages
  const seenProperties = new Set<string>()
  for (const [operator, stories] of Object.entries(allStories)) {
    for (const story of stories) {
      const key = `${operator}/${story.propertySlug}`
      if (!seenProperties.has(key)) {
        seenProperties.add(key)
        params.push({ operator, slug: `${story.propertySlug}-stories` })
      }
    }
  }
  return params
}

// ─── ARTICLES ───

function HarpersPointArticle({ operator, slug }: { operator: string; slug: string }) {
  return (
    <>
      <p>
        Harpers Point is a 200+ unit apartment community at 8713 Harperpoint Drive in Cincinnati, Ohio, managed by Towne Properties. The property features one of the only private white sand beaches in the Cincinnati metro, a full-service pub open seven days a week, and resort-style amenities across nine floor plans starting at $1,285 per month (as of Q3 2026).
      </p>

      <h2 id="what-makes-harpers-point-different">What makes Harpers Point different from other Cincinnati apartments?</h2>
      <p>Three amenities separate Harpers Point from the Cincinnati rental market: a private white sand beach, a full-service on-site pub, and award-winning landscaping with scenic waterscapes. Most Cincinnati apartment communities offer a pool and gym. Harpers Point adds a resort layer that is genuinely uncommon in the Midwest.</p>
      <p>The white sand beach sits within the community grounds and gives residents a private outdoor retreat without driving to a lake. The on-site pub is open seven days a week and serves food and drinks, eliminating the need to leave the property for casual dining.</p>
      <Link href={`/${operator}/${slug}#amenities`} className="cta-inline">
        <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(245,166,35,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--bp-orange)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
        </div>
        <div>
          <p><strong style={{ color: 'var(--bp-navy)' }}>See all Harpers Point amenities</strong></p>
          <p style={{ color: 'var(--bp-ink-muted)', fontSize: '13px' }}>Pool, beach, pub, fitness, tennis, basketball, and more</p>
        </div>
      </Link>

      <h2 id="pricing">How much does it cost to live at Harpers Point?</h2>
      <p>Harpers Point offers nine floor plans ranging from $1,285 to $3,140 per month (as of Q3 2026). Apartments range from 696 to 1,445 square feet, with options for one-bedroom apartments, two-bedroom apartments, and three-bedroom townhomes.</p>
      <div className="data-card">
        <h4>Harpers Point pricing overview (as of Q3 2026)</h4>
        <div className="data-row"><span>The Escondido (1bd/1ba, 696 ft²)</span><span>$1,285/mo</span></div>
        <div className="data-row"><span>The Newport (1bd/1ba, 696 ft²)</span><span>$1,342/mo</span></div>
        <div className="data-row"><span>The Alta (1bd/1ba, 826 ft²)</span><span>$1,466/mo</span></div>
        <div className="data-row"><span>The Carmel (2bd/1ba, 848 ft²)</span><span>$1,516/mo</span></div>
        <div className="data-row"><span>The Monterey (2bd/2ba, 948 ft²)</span><span>$1,775/mo</span></div>
        <div className="data-row"><span>The Coronado (2bd/1.5ba, 1,405 ft²)</span><span>Waitlist</span></div>
        <div className="data-row"><span>The Sonoma (3bd/2.5ba, 1,405 ft²)</span><span>$2,601/mo</span></div>
        <div className="data-row"><span>The Delmar (3bd/2.5ba, 1,445 ft²)</span><span>Waitlist</span></div>
      </div>
      <p>Two floor plans, The Coronado and The Delmar, are currently on waitlist due to demand. Contact the leasing office at (844) 326-8952 to join.</p>

      <h2 id="apartment-features">What apartment features are included?</h2>
      <p>Every apartment includes central air conditioning, stainless-steel appliances, granite countertops, and spacious walk-in closets. In-unit washer and dryer hookups are standard. Select units feature vaulted ceilings, wood-burning fireplaces, and private balconies or patios with water views.</p>
      <div className="image-block">
        <div style={{ width: '100%', aspectRatio: '16/9', background: `url(/images/towne-properties/pool.jpg) center / cover no-repeat`, borderRadius: 'var(--r-md)' }} role="img" aria-label="Harpers Point resort-style swimming pool" />
        <p className="image-caption">The resort-style pool at Harpers Point with sundeck</p>
      </div>

      <h2 id="pet-policy">Is Harpers Point pet-friendly?</h2>
      <p>Yes. Harpers Point allows up to two pets per apartment with a 50-pound weight limit. Breed restrictions apply. Monthly pet rent is $35 per pet (as of Q3 2026). Move-in requires a $150 refundable pet fee and a $150 nonrefundable pet fee per animal.</p>

      <h2 id="neighborhood">What is the neighborhood like?</h2>
      <p>Harpers Point sits in the Sixteen Mile Stand area of Cincinnati. Three shopping centers are within a seven-minute walk, including Shops at Harper's Point. Regal Deerfield Town Center is nearby for movies. Five parks sit within 10 miles. I-275 access puts downtown Cincinnati 20 minutes away.</p>
      <Link href={`/${operator}/${slug}#neighborhood`} className="cta-inline">
        <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(245,166,35,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--bp-orange)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
        </div>
        <div>
          <p><strong style={{ color: 'var(--bp-navy)' }}>Explore the Harpers Point neighborhood</strong></p>
          <p style={{ color: 'var(--bp-ink-muted)', fontSize: '13px' }}>Shopping, parks, dining, and commute info</p>
        </div>
      </Link>

      <h2 id="comparison">How does Harpers Point compare?</h2>
      <p>The Cincinnati metro averages around $1,200 per month for a one-bedroom (as of Q3 2026). Harpers Point starts at $1,285, slightly above average. The premium reflects the resort-style amenities most Cincinnati apartments at this price point lack.</p>
      <p><strong>Advantages:</strong> White sand beach (unique in Cincinnati), full-service pub, tennis and basketball courts, townhome options up to 1,445 ft²</p>
      <p><strong>Considerations:</strong> Suburban location (20 min to downtown), 50 lb pet weight limit, two popular floor plans on waitlist</p>

      <div className="faq-section">
        <h2 id="faq">Frequently asked questions about Harpers Point</h2>
        <div className="faq-item"><strong>Does Harpers Point have a beach?</strong><p>Yes. Harpers Point features a private white sand beach within the community grounds, one of the only apartment communities in Cincinnati with this amenity.</p></div>
        <div className="faq-item"><strong>What is the cheapest apartment?</strong><p>The Escondido at $1,285 per month (as of Q3 2026). One bedroom, one bathroom, 696 square feet with granite countertops and stainless-steel appliances.</p></div>
        <div className="faq-item"><strong>Does Harpers Point have a pub?</strong><p>Yes. A full-service on-site pub open seven days a week. Residents can dine and drink within the community without leaving the property.</p></div>
        <div className="faq-item"><strong>Are townhomes available?</strong><p>Yes. Two-story townhomes in two and three-bedroom layouts, 1,405 to 1,445 square feet. The Coronado and Delmar plans are currently on waitlist.</p></div>
        <div className="faq-item"><strong>How far from downtown Cincinnati?</strong><p>Approximately 20 minutes via I-275. The community has direct highway access for convenient commuting.</p></div>
        <div className="faq-item"><strong>What is the pet policy?</strong><p>Up to 2 pets per unit, 50 lb weight limit, $35/month pet rent per pet. $150 refundable plus $150 nonrefundable pet fees. Breed restrictions apply.</p></div>
        <div className="faq-item"><strong>What shopping is nearby?</strong><p>Three shopping centers within a seven-minute walk including Shops at Harper's Point and Harpers Station. Regal Deerfield Town Center for movies is also nearby.</p></div>
        <div className="faq-item"><strong>Does Harpers Point offer all-in pricing?</strong><p>Yes on brightplace. Prices include required monthly fees. Electricity, gas, and internet are billed separately by your provider.</p></div>
      </div>
    </>
  )
}

function OakTrailArticle({ operator, slug }: { operator: string; slug: string }) {
  return (
    <>
      <p>
        Oak Trail at Cherry Creek South is a 384-unit apartment community at 2234 S Trenton Way in Denver, Colorado, managed by AIR Communities. Seven floor plans from $1,512 per month (as of Q3 2026) with all-in pricing, two resort-style pools, a 24-hour fitness center, and an on-site dog park, all within 10 minutes of Cherry Creek State Park.
      </p>

      <h2 id="all-in-pricing">What is all-in pricing at Oak Trail?</h2>
      <p>All-in pricing means every listed price includes base rent plus required monthly fees like water, sewer, trash, pest control, valet trash, and package lockers. No surprise line items at lease signing. The number you see on the listing is the number on your lease.</p>
      <Link href={`/${operator}/${slug}#pricing`} className="cta-inline">
        <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(245,166,35,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--bp-orange)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
        </div>
        <div>
          <p><strong style={{ color: 'var(--bp-navy)' }}>Build your all-in price at Oak Trail</strong></p>
          <p style={{ color: 'var(--bp-ink-muted)', fontSize: '13px' }}>Interactive rent calculator with add-ons</p>
        </div>
      </Link>

      <h2 id="floor-plans">What floor plans does Oak Trail offer?</h2>
      <p>Oak Trail has seven floor plans across one, two, and three-bedroom layouts. Square footage ranges from 678 to 1,380 feet. Select two-bedroom plans currently offer up to two months free.</p>
      <div className="data-card">
        <h4>Oak Trail floor plans and pricing (as of Q3 2026)</h4>
        <div className="data-row"><span>Design 1A (1bd/1ba, 678 ft²)</span><span>$1,512/mo</span></div>
        <div className="data-row"><span>Design 1B (1bd/1ba, 753 ft²)</span><span>$1,575/mo</span></div>
        <div className="data-row"><span>Design 2A20 (2bd/2ba, 1,048 ft²)</span><span>$1,715/mo</span></div>
        <div className="data-row"><span>Design 2A10 (2bd/1ba, 960 ft²)</span><span>$1,677/mo</span></div>
        <div className="data-row"><span>Design 2B20 (2bd/2ba, 1,100 ft²)</span><span>$1,785/mo</span></div>
        <div className="data-row"><span>Design 2C20 (2bd/2ba, 1,156 ft²)</span><span>$1,914/mo</span></div>
        <div className="data-row"><span>Design 3A (3bd/2ba, 1,380 ft²)</span><span>$2,422/mo</span></div>
      </div>

      <h2 id="amenities">What amenities does Oak Trail have?</h2>
      <p>Two resort-style swimming pools with sundecks and grilling areas. A 24-hour fitness center with yoga studio. On-site dog park for off-leash play. Resident clubhouse with full kitchen and HDTVs. Business center for remote work. Outdoor social areas with barbecue stations and fireplace.</p>
      <div className="image-block">
        <div style={{ width: '100%', aspectRatio: '16/9', background: `url(/images/air-communities/hero-pool.jpg) center / cover no-repeat`, borderRadius: 'var(--r-md)' }} role="img" aria-label="Oak Trail resort-style swimming pool" />
        <p className="image-caption">One of two resort-style pools at Oak Trail</p>
      </div>

      <h2 id="cherry-creek">How close is Oak Trail to Cherry Creek State Park?</h2>
      <p>Cherry Creek State Park is approximately 10 minutes from Oak Trail. The park spans 4,000 acres with 35 miles of trails, an 880-acre reservoir, and a 107-acre off-leash dog area. Cherry Creek Shopping Center is 15 minutes away. Downtown Denver is about 20 minutes.</p>
      <Link href={`/${operator}/${slug}#neighborhood`} className="cta-inline">
        <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(245,166,35,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--bp-orange)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
        </div>
        <div>
          <p><strong style={{ color: 'var(--bp-navy)' }}>Explore the Oak Trail neighborhood</strong></p>
          <p style={{ color: 'var(--bp-ink-muted)', fontSize: '13px' }}>Cherry Creek State Park, shopping, and commute times</p>
        </div>
      </Link>

      <h2 id="management">Who manages Oak Trail?</h2>
      <p>AIR Communities, a Denver-based REIT operating 170+ apartment communities across the US, including markets in Philadelphia, Miami, San Diego, Boston, and Los Angeles.</p>

      <div className="faq-section">
        <h2 id="faq">Frequently asked questions about Oak Trail</h2>
        <div className="faq-item"><strong>What is all-in pricing?</strong><p>Every listed price includes base rent plus required fees (water, sewer, trash, pest control, valet trash, package lockers). No surprise fees at signing. Electricity and internet billed separately.</p></div>
        <div className="faq-item"><strong>Are pets allowed?</strong><p>Yes. Oak Trail is pet-friendly with an on-site dog park. Breed restrictions, pet deposits, and monthly pet rent are quoted in writing during application.</p></div>
        <div className="faq-item"><strong>How far from Cherry Creek State Park?</strong><p>About 10 minutes. The park has 35 miles of trails, an 880-acre reservoir, and a 107-acre off-leash dog area.</p></div>
        <div className="faq-item"><strong>What is the cheapest apartment?</strong><p>Design 1A at $1,512 per month all-in (as of Q3 2026). One bedroom, one bathroom, 678 square feet.</p></div>
        <div className="faq-item"><strong>Is there a move-in special?</strong><p>Select two-bedroom plans currently offer up to two months free. Contact leasing or schedule a tour for eligible plans.</p></div>
        <div className="faq-item"><strong>Does Oak Trail have a pool?</strong><p>Yes, two resort-style swimming pools with expansive sundecks and grilling areas.</p></div>
        <div className="faq-item"><strong>What utilities are included?</strong><p>Water, sewer, trash, pest control, valet trash, and package lockers are included. Electricity and internet billed separately.</p></div>
        <div className="faq-item"><strong>In-unit laundry?</strong><p>Yes. Every apartment includes an in-home washer and dryer, granite countertops, and private balcony or patio.</p></div>
      </div>
    </>
  )
}

function LakeviewArticle({ operator, slug }: { operator: string; slug: string }) {
  return (
    <>
      <p>
        Lakeview at Gateway Park is a lakeside apartment community at 4699 Kittredge St in Denver, Colorado, managed by AIR Communities. The property offers five floor plans from $1,450 per month (as of Q3 2026) with a community lake, resort-style pool with cabanas, on-site dog park, and light rail access steps from the front door.
      </p>

      <h2 id="community-lake">What is the community lake at Lakeview?</h2>
      <p>Lakeview at Gateway Park is built around a community lake that offers fishing access and jogging trails along the waterfront. The lakeside setting is the defining feature of the property, providing scenic water views from select apartments and a recreational amenity that most Denver apartment communities cannot match.</p>

      <Link href={`/${operator}/${slug}#amenities`} className="cta-inline">
        <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(245,166,35,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--bp-orange)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
        </div>
        <div>
          <p><strong style={{ color: 'var(--bp-navy)' }}>See all Lakeview amenities</strong></p>
          <p style={{ color: 'var(--bp-ink-muted)', fontSize: '13px' }}>Lake, pool, fitness, dog park, clubhouse, and more</p>
        </div>
      </Link>

      <h2 id="pricing">How much does Lakeview at Gateway Park cost?</h2>
      <p>Lakeview offers five floor plans ranging from $1,450 to $2,605 per month (as of Q3 2026). Select apartments currently offer up to two months free as a move-in promotion.</p>
      <div className="data-card">
        <h4>Lakeview floor plans and pricing (as of Q3 2026)</h4>
        <div className="data-row"><span>Design 1A (1bd/1ba, 689 ft²)</span><span>$1,450/mo</span></div>
        <div className="data-row"><span>Design 1B (1bd/1ba, 756 ft²)</span><span>$1,585/mo</span></div>
        <div className="data-row"><span>Design 2A10 (2bd/1ba, 920 ft²)</span><span>$1,825/mo</span></div>
        <div className="data-row"><span>Design 2A20 (2bd/2ba, 1,072 ft²)</span><span>$1,914/mo</span></div>
        <div className="data-row"><span>Design 3A (3bd/2ba, 1,314 ft²)</span><span>$2,605/mo</span></div>
      </div>

      <h2 id="light-rail">Is Lakeview near public transit?</h2>
      <p>Yes. The 40th Ave and Airport Blvd light rail station is within walking distance of Lakeview at Gateway Park. The A Line connects directly to Denver International Airport and Union Station downtown, making car-free commuting practical for residents who work in central Denver or travel frequently.</p>

      <h2 id="neighborhood">What is the neighborhood like?</h2>
      <p>Lakeview sits in Denver's Gateway neighborhood. The Shops at Northfield, with dining, retail, and entertainment, are five minutes away. Denver International Airport is 15 minutes east. Rocky Mountain Arsenal National Wildlife Refuge, with over 15,000 acres of prairie and wetlands, is 10 minutes north. I-70 access puts downtown Denver 20 minutes away.</p>

      <Link href={`/${operator}/${slug}#neighborhood`} className="cta-inline">
        <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(245,166,35,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--bp-orange)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
        </div>
        <div>
          <p><strong style={{ color: 'var(--bp-navy)' }}>Explore the Gateway Park neighborhood</strong></p>
          <p style={{ color: 'var(--bp-ink-muted)', fontSize: '13px' }}>Transit, shopping, wildlife refuge, and commute info</p>
        </div>
      </Link>

      <h2 id="amenities">What amenities does Lakeview offer?</h2>
      <p>Community amenities include the lakeside setting with fishing and trails, a resort-style pool with cabanas and sundeck, a 24-hour fitness center, an on-site dog park, a resident clubhouse with kitchen and billiards, outdoor barbecue kitchen, business center with Wi-Fi, and playground. The community is a smoke-free property.</p>

      <div className="faq-section">
        <h2 id="faq">Frequently asked questions about Lakeview at Gateway Park</h2>
        <div className="faq-item"><strong>Does Lakeview have a lake?</strong><p>Yes. Lakeview features a community lake with fishing access and jogging trails. The lakeside setting provides water views and recreation without leaving the property.</p></div>
        <div className="faq-item"><strong>Is Lakeview near the light rail?</strong><p>Yes. The 40th Ave and Airport Blvd light rail station is within walking distance, connecting to DIA and downtown Denver via the A Line.</p></div>
        <div className="faq-item"><strong>What is the cheapest apartment?</strong><p>Design 1A at $1,450 per month (as of Q3 2026). One bedroom, one bathroom, 689 square feet.</p></div>
        <div className="faq-item"><strong>Is there a move-in special?</strong><p>Yes. Select apartments offer up to two months free. Contact the leasing office at (983) 200-7494 for eligible plans.</p></div>
        <div className="faq-item"><strong>Are pets allowed?</strong><p>Yes. Lakeview is pet-friendly with an on-site dog park. Breed restrictions and weight limits apply. Fees quoted at application.</p></div>
        <div className="faq-item"><strong>Does Lakeview have a pool?</strong><p>Yes. A resort-style swimming pool with private cabanas and sundeck for resident use.</p></div>
        <div className="faq-item"><strong>How far from downtown Denver?</strong><p>About 20 minutes via I-70 by car. The light rail provides a car-free alternative via the A Line to Union Station.</p></div>
        <div className="faq-item"><strong>What are the office hours?</strong><p>Tuesday through Friday 10am to 6pm, Saturday 10am to 5pm. Closed Sunday and Monday. Tours can be scheduled online.</p></div>
      </div>
    </>
  )
}

function AllInPricingArticle({ operator, slug }: { operator: string; slug: string }) {
  return (
    <>
      <p>
        All-in pricing is a pricing model used by AIR Communities on brightplace where every listed apartment price includes base rent plus required monthly fees. Water, sewer, trash, pest control, and other mandatory charges are bundled into one number. No surprise line items at lease signing, no hidden fees on move-in day (as of Q3 2026).
      </p>

      <h2 id="what-is-included">What fees are included in all-in pricing?</h2>
      <p>All-in pricing at AIR Communities properties on brightplace bundles the following into one monthly number: base rent, water and sewer charges, trash removal, pest control, valet trash pickup, and package locker access. The exact fees vary by property, but the total is always shown upfront.</p>
      <p>At Oak Trail at Cherry Creek South, for example, a Design 1A apartment is listed at $1,512 per month all-in (as of Q3 2026). That single number includes $68 for water/sewer/trash, $5 for pest control, $35 for valet trash, and $15 for package lockers. No calculation needed.</p>

      <Link href={`/${operator}/${slug}#pricing`} className="cta-inline">
        <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(245,166,35,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--bp-orange)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
        </div>
        <div>
          <p><strong style={{ color: 'var(--bp-navy)' }}>Try the interactive rent calculator</strong></p>
          <p style={{ color: 'var(--bp-ink-muted)', fontSize: '13px' }}>Build your real monthly cost with pet, parking, and storage add-ons</p>
        </div>
      </Link>

      <h2 id="what-is-separate">What is NOT included?</h2>
      <p>Electricity, gas, and internet are always billed separately by your chosen provider. These are utilities you control: your usage determines the cost, so they cannot be quoted at a fixed rate. Additionally, optional add-ons like pet rent ($35/mo typical), covered parking ($75-$150/mo), and storage units ($50/mo) are quoted separately at application.</p>

      <h2 id="why-it-matters">Why does all-in pricing matter for renters?</h2>
      <p>Most apartment communities advertise a base rent, then add $80 to $200 in mandatory monthly fees at lease signing. A $1,400 apartment becomes $1,580 after water, trash, pest control, and admin fees. This makes it nearly impossible to compare two apartments accurately from their listing prices alone.</p>
      <p>All-in pricing solves this by including every required fee in the listed number. When Oak Trail lists $1,512/mo and Lakeview lists $1,450/mo, those numbers are directly comparable. No math, no guessing, no surprises.</p>

      <h2 id="how-to-compare">How to compare apartments using all-in pricing</h2>
      <p>When comparing an all-in price from brightplace to a traditional listing, add the traditional listing's mandatory fees to its base rent. A competitor listing "$1,350/mo" with $120 in required fees is actually $1,470/mo. Compare that to the brightplace all-in number directly.</p>

      <div className="data-card">
        <h4>Example: all-in vs traditional pricing</h4>
        <div className="data-row"><span>Traditional listing: advertised rent</span><span>$1,350</span></div>
        <div className="data-row"><span>+ Water/sewer/trash</span><span>$68</span></div>
        <div className="data-row"><span>+ Pest control</span><span>$5</span></div>
        <div className="data-row"><span>+ Valet trash</span><span>$35</span></div>
        <div className="data-row"><span>+ Package lockers</span><span>$15</span></div>
        <div className="data-row"><span><strong>Actual monthly cost</strong></span><span><strong>$1,473</strong></span></div>
      </div>
      <p>The brightplace listing for the same apartment would simply show $1,473/mo. One number. Done.</p>

      <h2 id="which-properties">Which AIR Communities properties use all-in pricing?</h2>
      <p>All AIR Communities properties listed on brightplace use all-in pricing. Current properties include Oak Trail at Cherry Creek South (Denver) and Lakeview at Gateway Park (Denver), with more communities being added.</p>

      <div className="faq-section">
        <h2 id="faq">Frequently asked questions about all-in pricing</h2>
        <div className="faq-item"><strong>What is all-in pricing?</strong><p>All-in pricing includes base rent plus all required monthly fees (water, sewer, trash, pest control, etc.) in one number. The listed price is the price you pay.</p></div>
        <div className="faq-item"><strong>What is NOT included in all-in pricing?</strong><p>Electricity, gas, and internet are billed separately by your provider. Optional add-ons (pet rent, parking, storage) are quoted at application.</p></div>
        <div className="faq-item"><strong>How do I compare all-in pricing to regular listings?</strong><p>Add the traditional listing's mandatory fees to its base rent. Compare that total to the brightplace all-in number directly.</p></div>
        <div className="faq-item"><strong>Do all AIR Communities properties use all-in pricing?</strong><p>All AIR Communities properties on brightplace use all-in pricing. The exact fees bundled vary by property but the total is always displayed upfront.</p></div>
        <div className="faq-item"><strong>Can I customize my all-in price?</strong><p>Yes. Each property page on brightplace has an interactive rent calculator. Select your floor plan, toggle pet rent, parking, and storage to see your personalized monthly total.</p></div>
      </div>
    </>
  )
}
