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
      dateModified: '2026-08-23',
      content: OakTrailArticle,
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
