import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getProperty, getOperatorMeta } from '@/data/operators'
import StoryLayout from '@/components/StoryLayout'
import AIAssistant from '@/components/AIAssistant'
import Link from 'next/link'

// Story data - in production this would come from markdown files or CMS
const stories: Record<string, Record<string, Record<string, {
  title: string
  metaTitle: string
  metaDescription: string
  primaryKeyword: string
  readTime: string
  datePublished: string
  dateModified: string
  content: (props: { operator: string; slug: string }) => React.ReactNode
}>>> = {
  'towne-properties': {
    'harpers-point': {
      'resort-apartments-cincinnati-guide': {
        title: 'Harpers Point Apartments Cincinnati: Pricing, Beach Amenities, and What to Know',
        metaTitle: 'Harpers Point Cincinnati Review: Pricing & Amenities | brightplace',
        metaDescription: 'Harpers Point apartments in Cincinnati offer a white sand beach, full-service pub, and resort-style pool. 9 floor plans from $1,285/mo. Complete 2026 guide.',
        primaryKeyword: 'Harpers Point apartments Cincinnati',
        readTime: '8 min',
        datePublished: '2026-08-23',
        dateModified: '2026-08-23',
        content: HarpersPointArticle,
      },
    },
  },
  'air-communities': {
    'oak-trail': {
      'cherry-creek-apartment-guide': {
        title: 'Oak Trail at Cherry Creek South: Pricing, Amenities, and Denver Living Guide',
        metaTitle: 'Oak Trail Cherry Creek South Review: Pricing & Guide | brightplace',
        metaDescription: 'Oak Trail at Cherry Creek South offers 7 floor plans from $1,512/mo near Cherry Creek State Park. All-in pricing, 2 pools, dog park. Complete 2026 guide.',
        primaryKeyword: 'Oak Trail at Cherry Creek South',
        readTime: '7 min',
        datePublished: '2026-08-23',
        dateModified: '2026-08-23',
        content: OakTrailArticle,
      },
    },
  },
}

interface PageProps {
  params: Promise<{ operator: string; slug: string; storySlug: string }>
}

export async function generateStaticParams() {
  const params: { operator: string; slug: string; storySlug: string }[] = []
  for (const [operator, properties] of Object.entries(stories)) {
    for (const [slug, storiesList] of Object.entries(properties)) {
      for (const storySlug of Object.keys(storiesList)) {
        params.push({ operator, slug, storySlug })
      }
    }
  }
  return params
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { operator, slug, storySlug } = await params
  const story = stories[operator]?.[slug]?.[storySlug]
  if (!story) return { title: 'Not Found' }

  return {
    title: story.metaTitle,
    description: story.metaDescription,
    openGraph: {
      title: story.metaTitle,
      description: story.metaDescription,
      type: 'article',
      url: `https://operator.brightplace.ai/${operator}/${slug}/stories/${storySlug}`,
    },
    alternates: {
      canonical: `https://operator.brightplace.ai/${operator}/${slug}/stories/${storySlug}`,
    },
  }
}

export default async function StoryPage({ params }: PageProps) {
  const { operator, slug, storySlug } = await params
  const story = stories[operator]?.[slug]?.[storySlug]
  const property = getProperty(operator, slug)
  const operatorMeta = getOperatorMeta(operator)
  if (!story || !property || !operatorMeta) notFound()

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: story.title,
    description: story.metaDescription,
    author: { '@type': 'Organization', name: 'brightplace', url: 'https://brightplace.ai' },
    publisher: { '@type': 'Organization', name: 'brightplace', url: 'https://brightplace.ai' },
    datePublished: story.datePublished,
    dateModified: story.dateModified,
    mainEntityOfPage: `https://operator.brightplace.ai/${operator}/${slug}/stories/${storySlug}`,
  }

  const contentElement = story.content({ operator, slug })

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <StoryLayout meta={{
        title: story.title,
        metaTitle: story.metaTitle,
        metaDescription: story.metaDescription,
        primaryKeyword: story.primaryKeyword,
        readTime: story.readTime,
        datePublished: story.datePublished,
        dateModified: story.dateModified,
        slug: storySlug,
        operator,
        operatorName: operatorMeta.name,
        property: slug,
        propertyName: property.name,
        propertySubtitle: property.subtitle,
        heroImage: property.heroImage,
        heroAlt: property.heroAlt,
      }}>
        {contentElement}
      </StoryLayout>
      <AIAssistant data={property} />
    </>
  )
}

// ─── ARTICLE: Harpers Point ───
function HarpersPointArticle({ operator, slug }: { operator: string; slug: string }) {
  return (
    <>
      <p>
        Harpers Point is a 200+ unit apartment community at 8713 Harperpoint Drive in Cincinnati, Ohio, managed by Towne Properties. The property features one of the only private white sand beaches in the Cincinnati metro, a full-service pub open seven days a week, and resort-style amenities across nine floor plans starting at $1,285 per month (as of Q3 2026).
      </p>

      <h2>What makes Harpers Point different from other Cincinnati apartments?</h2>

      <p>
        Three amenities separate Harpers Point from the Cincinnati rental market: a private white sand beach, a full-service on-site pub, and award-winning landscaping with scenic waterscapes. Most Cincinnati apartment communities offer a pool and gym. Harpers Point adds a resort layer that is genuinely uncommon in the Midwest.
      </p>

      <p>
        The white sand beach sits within the community grounds and gives residents a private outdoor retreat without driving to a lake. The on-site pub is open seven days a week and serves food and drinks, eliminating the need to leave the property for casual dining. These two features alone put Harpers Point in a category of one within the Cincinnati metro.
      </p>

      <Link href={`/${operator}/${slug}#amenities`} className="cta-inline">
        <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(245,166,35,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--bp-orange)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
        </div>
        <div>
          <p><strong style={{ color: 'var(--bp-navy)' }}>See all Harpers Point amenities</strong></p>
          <p style={{ color: 'var(--bp-ink-muted)', fontSize: '13px' }}>Pool, beach, pub, fitness, tennis, basketball, and more</p>
        </div>
      </Link>

      <h2>How much does it cost to live at Harpers Point?</h2>

      <p>
        Harpers Point offers nine floor plans ranging from $1,285 to $3,140 per month (as of Q3 2026). Apartments range from 696 to 1,445 square feet, with options for one-bedroom apartments, two-bedroom apartments, and three-bedroom townhomes.
      </p>

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

      <p>
        Two floor plans, The Coronado and The Delmar, are currently on waitlist due to demand. Both are two-story townhome layouts at 1,405 and 1,445 square feet. Contact the leasing office at (844) 326-8952 to join the waitlist.
      </p>

      <h2>What apartment features are included at Harpers Point?</h2>

      <p>
        Every apartment at Harpers Point includes central air conditioning, stainless-steel appliances, granite countertops, and spacious walk-in closets. In-unit washer and dryer hookups are standard. Select units feature vaulted ceilings, wood-burning fireplaces, and private balconies or patios with water views.
      </p>

      <p>
        The property offers both single-level apartments and two-story townhomes. Townhome layouts provide 1,405 to 1,445 square feet across two floors with 1.5 to 2.5 bathrooms, making them a strong option for renters who want a house-like layout without homeownership commitments.
      </p>

      <div className="image-block">
        <div style={{ width: '100%', aspectRatio: '16/9', background: `url(/images/towne-properties/pool.jpg) center / cover no-repeat`, borderRadius: 'var(--r-md)' }} role="img" aria-label="Harpers Point resort-style swimming pool with sundeck" />
        <p className="image-caption">The resort-style pool at Harpers Point with sundeck and landscaping</p>
      </div>

      <h2>Is Harpers Point pet-friendly?</h2>

      <p>
        Yes. Harpers Point allows up to two pets per apartment with a 50-pound weight limit. Breed restrictions apply. Monthly pet rent is $35 per pet (as of Q3 2026). Move-in requires a $150 refundable pet fee and a $150 nonrefundable pet fee per animal. Contact the leasing office for the current breed restriction list.
      </p>

      <h2>What is the neighborhood like around Harpers Point?</h2>

      <p>
        Harpers Point sits in the Sixteen Mile Stand area of Cincinnati, a suburban pocket with strong retail access. Three shopping centers are within a seven-minute walk, including Shops at Harper's Point and Harpers Station, which anchor the area with restaurants, retail, and services.
      </p>

      <p>
        Regal Deerfield Town Center is nearby for movies. Five parks sit within 10 miles, including Francis RecreAcres and Lake Isabella. I-275 access puts downtown Cincinnati 20 minutes away, making Harpers Point practical for commuters who want suburban quiet without sacrificing city access.
      </p>

      <Link href={`/${operator}/${slug}#neighborhood`} className="cta-inline">
        <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(245,166,35,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--bp-orange)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
        </div>
        <div>
          <p><strong style={{ color: 'var(--bp-navy)' }}>Explore the Harpers Point neighborhood</strong></p>
          <p style={{ color: 'var(--bp-ink-muted)', fontSize: '13px' }}>Nearby shopping, parks, dining, and commute info</p>
        </div>
      </Link>

      <h2>Who manages Harpers Point?</h2>

      <p>
        Harpers Point is managed by Towne Properties, a Cincinnati-based real estate company founded in 1961. Towne Properties manages 119 apartment communities across Ohio, Indiana, Kentucky, and North Carolina. Their headquarters are at 1055 Saint Paul Place, Cincinnati, OH 45202. The company is family-led, with Neil Bortz as chairman and Adam Bortz as CEO.
      </p>

      <div className="image-block">
        <div style={{ width: '100%', aspectRatio: '16/9', background: `url(/images/towne-properties/cincinnati.jpg) center / cover no-repeat`, borderRadius: 'var(--r-md)' }} role="img" aria-label="Cincinnati skyline along the Ohio River" />
        <p className="image-caption">Downtown Cincinnati, approximately 20 minutes from Harpers Point via I-275</p>
      </div>

      <h2>How does Harpers Point compare to other Cincinnati apartments?</h2>

      <p>
        The Cincinnati metro apartment market averages around $1,200 per month for a one-bedroom (as of Q3 2026). Harpers Point starts at $1,285 for a one-bedroom, placing it slightly above average. The premium reflects the resort-style amenities. Most Cincinnati apartments at this price point offer a pool and gym but lack a private beach, on-site pub, or tennis courts.
      </p>

      <p>
        <strong>Harpers Point advantages:</strong> White sand beach (unique in Cincinnati), full-service pub, tennis and basketball courts, award-winning landscaping, townhome options up to 1,445 ft²
      </p>
      <p>
        <strong>Considerations:</strong> Suburban location (20 min to downtown), 50 lb pet weight limit, two popular floor plans on waitlist, higher than metro average rent
      </p>

      <Link href={`/${operator}/${slug}#pricing`} className="cta-inline">
        <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(245,166,35,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--bp-orange)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
        </div>
        <div>
          <p><strong style={{ color: 'var(--bp-navy)' }}>Build your all-in price at Harpers Point</strong></p>
          <p style={{ color: 'var(--bp-ink-muted)', fontSize: '13px' }}>Interactive rent calculator with add-ons</p>
        </div>
      </Link>

      {/* FAQ Section */}
      <div className="faq-section">
        <h2>Frequently asked questions about Harpers Point</h2>

        <div className="faq-item">
          <strong>Does Harpers Point have a beach?</strong>
          <p>Yes. Harpers Point features a private white sand beach within the community grounds. It is one of the only apartment communities in the Cincinnati metro with this amenity, offering residents a private outdoor retreat.</p>
        </div>

        <div className="faq-item">
          <strong>What is the cheapest apartment at Harpers Point?</strong>
          <p>The Escondido is the most affordable option at $1,285 per month (as of Q3 2026). It is a one-bedroom, one-bathroom apartment with 696 square feet, including central A/C, granite countertops, and stainless-steel appliances.</p>
        </div>

        <div className="faq-item">
          <strong>Does Harpers Point have a pub?</strong>
          <p>Yes. Harpers Point has a full-service on-site pub open seven days a week. Residents can dine and drink within the community without leaving the property. This is a rare amenity for apartment living in Cincinnati.</p>
        </div>

        <div className="faq-item">
          <strong>Are townhomes available at Harpers Point?</strong>
          <p>Yes. Harpers Point offers two-story townhomes in two-bedroom and three-bedroom layouts ranging from 1,405 to 1,445 square feet. Two townhome floor plans (The Coronado and The Delmar) are currently on waitlist.</p>
        </div>

        <div className="faq-item">
          <strong>How far is Harpers Point from downtown Cincinnati?</strong>
          <p>Harpers Point is approximately 20 minutes from downtown Cincinnati. The community has direct access to I-275, providing convenient commuter access to the central business district and Greater Cincinnati area.</p>
        </div>

        <div className="faq-item">
          <strong>What is the pet policy at Harpers Point?</strong>
          <p>Harpers Point allows up to 2 pets per unit with a 50 lb weight limit. Pet rent is $35 per month per pet. Move-in requires $150 refundable plus $150 nonrefundable pet fees. Breed restrictions apply.</p>
        </div>

        <div className="faq-item">
          <strong>What shopping is near Harpers Point?</strong>
          <p>Three shopping centers are within a seven-minute walk: Shops at Harper's Point, Harpers Station, and additional nearby retail. Regal Deerfield Town Center for movies is also within easy driving distance.</p>
        </div>

        <div className="faq-item">
          <strong>Does Harpers Point offer all-in pricing?</strong>
          <p>Yes. Prices listed on brightplace include required monthly fees. Base rent plus water, sewer, trash, and pest control are bundled into one number. Electricity, gas, and internet are billed separately by your provider.</p>
        </div>
      </div>
    </>
  )
}

// ─── ARTICLE: Oak Trail ───
function OakTrailArticle({ operator, slug }: { operator: string; slug: string }) {
  return (
    <>
      <p>
        Oak Trail at Cherry Creek South is a 384-unit apartment community at 2234 S Trenton Way in Denver, Colorado, managed by AIR Communities. The property offers seven floor plans from $1,512 per month (as of Q3 2026) with all-in pricing, two resort-style pools, a 24-hour fitness center, and an on-site dog park, all within 10 minutes of Cherry Creek State Park.
      </p>

      <h2>What is all-in pricing at Oak Trail?</h2>

      <p>
        All-in pricing means every listed price at Oak Trail includes base rent plus required monthly fees like water, sewer, trash, pest control, valet trash, and package lockers. There are no surprise line items at lease signing. The number you see on the listing is the number on your lease.
      </p>

      <p>
        This pricing model is uncommon in the Denver market. Most communities advertise a base rent, then add $80 to $150 in mandatory fees at signing. At Oak Trail, a one-bedroom listed at $1,512 per month (as of Q3 2026) actually costs $1,512. The transparency extends to deposits, pet rent, and parking, which are quoted in writing at application.
      </p>

      <Link href={`/${operator}/${slug}#pricing`} className="cta-inline">
        <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(245,166,35,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--bp-orange)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
        </div>
        <div>
          <p><strong style={{ color: 'var(--bp-navy)' }}>Build your all-in price at Oak Trail</strong></p>
          <p style={{ color: 'var(--bp-ink-muted)', fontSize: '13px' }}>Interactive rent calculator with pet, parking, and storage add-ons</p>
        </div>
      </Link>

      <h2>What floor plans does Oak Trail offer?</h2>

      <p>
        Oak Trail has seven floor plans across one-bedroom, two-bedroom, and three-bedroom layouts. Square footage ranges from 678 to 1,380 feet. Select two-bedroom plans are currently offering up to two months free as a move-in promotion.
      </p>

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

      <h2>What amenities does Oak Trail have?</h2>

      <p>
        Oak Trail anchors its community amenities around outdoor living and fitness. Two resort-style swimming pools with expansive sundecks and grilling areas form the center of community life. The 24-hour fitness center includes a dedicated yoga studio.
      </p>

      <p>
        An on-site dog park offers off-leash play space. The resident clubhouse provides a full kitchen, HDTVs, and lounge seating. A business center serves remote workers with quiet, focused workspace. Outdoor social areas feature barbecue stations, a fireplace, and relaxed lounge seating.
      </p>

      <div className="image-block">
        <div style={{ width: '100%', aspectRatio: '16/9', background: `url(/images/air-communities/hero-pool.jpg) center / cover no-repeat`, borderRadius: 'var(--r-md)' }} role="img" aria-label="Oak Trail resort-style swimming pool with timber pavilion" />
        <p className="image-caption">One of two resort-style pools at Oak Trail at Cherry Creek South</p>
      </div>

      <h2>How close is Oak Trail to Cherry Creek State Park?</h2>

      <p>
        Cherry Creek State Park is approximately 10 minutes from Oak Trail. The park spans 4,000 acres with 35 miles of multi-use trails, a 880-acre reservoir for boating and paddleboarding, and a 107-acre off-leash dog area. Cherry Creek Shopping Center is 15 minutes away. Downtown Denver is reachable in about 20 minutes.
      </p>

      <Link href={`/${operator}/${slug}#neighborhood`} className="cta-inline">
        <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(245,166,35,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--bp-orange)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
        </div>
        <div>
          <p><strong style={{ color: 'var(--bp-navy)' }}>Explore the Oak Trail neighborhood</strong></p>
          <p style={{ color: 'var(--bp-ink-muted)', fontSize: '13px' }}>Cherry Creek State Park, shopping, and commute times</p>
        </div>
      </Link>

      <h2>Who manages Oak Trail?</h2>

      <p>
        Oak Trail is managed by AIR Communities, a Denver-based REIT that owns and operates 170+ apartment communities across the United States. AIR Communities properties span markets including Denver, Philadelphia, Miami, San Diego, Boston, and Los Angeles. Their corporate office is at 4582 S. Ulster St., Suite 1700, Denver, CO 80237.
      </p>

      {/* FAQ */}
      <div className="faq-section">
        <h2>Frequently asked questions about Oak Trail</h2>

        <div className="faq-item">
          <strong>What is all-in pricing at Oak Trail?</strong>
          <p>All-in pricing means every listed price includes base rent plus required monthly fees (water, sewer, trash, pest control, valet trash, package lockers). No surprise fees at lease signing. Electricity and internet are billed separately.</p>
        </div>

        <div className="faq-item">
          <strong>Are pets allowed at Oak Trail?</strong>
          <p>Yes. Oak Trail is pet-friendly with an on-site dog park for off-leash play. Breed restrictions, pet deposits, and monthly pet rent amounts are quoted in writing during the application process.</p>
        </div>

        <div className="faq-item">
          <strong>How far is Oak Trail from Cherry Creek State Park?</strong>
          <p>Oak Trail is approximately 10 minutes from Cherry Creek State Park, which offers 35 miles of trails, an 880-acre reservoir, and a 107-acre off-leash dog area. Cherry Creek Shopping Center is 15 minutes away.</p>
        </div>

        <div className="faq-item">
          <strong>What is the cheapest apartment at Oak Trail?</strong>
          <p>Design 1A is the most affordable at $1,512 per month all-in (as of Q3 2026). It is a one-bedroom, one-bathroom apartment with 678 square feet, including granite countertops and in-home washer/dryer.</p>
        </div>

        <div className="faq-item">
          <strong>Is there a move-in special at Oak Trail?</strong>
          <p>Select two-bedroom floor plans are currently offering up to two months free. Contact the leasing office or schedule a tour to learn which specific plans are eligible for the current promotion.</p>
        </div>

        <div className="faq-item">
          <strong>Does Oak Trail have a pool?</strong>
          <p>Yes. Oak Trail has two resort-style swimming pools with expansive sundecks and convenient grilling areas. The pools are a central feature of the community's outdoor amenity package.</p>
        </div>

        <div className="faq-item">
          <strong>What utilities are included in rent at Oak Trail?</strong>
          <p>Water, sewer, trash, pest control, valet trash, and package lockers are included in the all-in price. Electricity and internet are billed separately by your chosen provider.</p>
        </div>

        <div className="faq-item">
          <strong>Does Oak Trail have in-unit laundry?</strong>
          <p>Yes. Every apartment at Oak Trail includes an in-home washer and dryer set. All units also feature granite countertops, modern fixtures, and private balconies or patios.</p>
        </div>
      </div>
    </>
  )
}
