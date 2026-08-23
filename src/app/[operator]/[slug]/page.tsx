import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getProperty, getAllOperatorPropertyPairs, getOperatorMeta } from '@/data/operators'
import { getStory, getAllStoryParams, isStoriesIndex, isPropertyStoriesIndex, getAllStoriesIndexParams, getStoriesByProperty, getAllStoriesByOperator } from '@/data/stories'
import { getPropertiesByOperator } from '@/data/operators'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import RentCalculator from '@/components/RentCalculator'
import FloorPlans from '@/components/FloorPlans'
import Amenities from '@/components/Amenities'
import Neighborhood from '@/components/Neighborhood'
import Gallery from '@/components/Gallery'
import FAQ from '@/components/FAQ'
import TourCTA from '@/components/TourCTA'
import Footer from '@/components/Footer'
import AIAssistant from '@/components/AIAssistant'
import StoryLayout from '@/components/StoryLayout'
import Link from 'next/link'

interface PageProps {
  params: Promise<{ operator: string; slug: string }>
}

export async function generateStaticParams() {
  const propertyParams = getAllOperatorPropertyPairs().map(({ operator, slug }) => ({ operator, slug }))
  const storyParams = getAllStoryParams().map(({ operator, slug }) => ({ operator, slug }))
  const indexParams = getAllStoriesIndexParams().map(({ operator, slug }) => ({ operator, slug }))
  return [...propertyParams, ...storyParams, ...indexParams]
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { operator, slug } = await params

  // Operator-level stories index
  if (isStoriesIndex(slug)) {
    const opMeta = getOperatorMeta(operator)
    if (opMeta) {
      return {
        title: `${opMeta.name} Stories & Guides | brightplace`,
        description: `Read guides, reviews, and neighborhood insights about ${opMeta.name} communities.`,
      }
    }
  }

  // Property-level stories index
  const propIndex = isPropertyStoriesIndex(slug)
  if (propIndex) {
    const property = getProperty(operator, propIndex.propertySlug)
    if (property) {
      return {
        title: `${property.name} Stories & Guides | brightplace`,
        description: `Read guides and insights about ${property.name} ${property.subtitle} in ${property.city}, ${property.state}.`,
      }
    }
  }

  // Check if it's a story
  const story = getStory(operator, slug)
  if (story) {
    return {
      title: story.metaTitle,
      description: story.metaDescription,
      openGraph: {
        title: story.metaTitle,
        description: story.metaDescription,
        type: 'article',
        url: `https://operator.brightplace.ai/${operator}/${slug}`,
      },
      alternates: { canonical: `https://operator.brightplace.ai/${operator}/${slug}` },
    }
  }

  // Property page
  const data = getProperty(operator, slug)
  if (!data) return { title: 'Not Found' }

  return {
    title: data.metaTitle,
    description: data.metaDescription,
    openGraph: {
      title: data.metaTitle,
      description: data.metaDescription,
      type: 'website',
      url: `https://operator.brightplace.ai/${operator}/${slug}`,
      images: [{ url: data.heroImage, width: 1200, height: 630, alt: data.heroAlt }],
      siteName: 'brightplace',
    },
    twitter: {
      card: 'summary_large_image',
      title: data.metaTitle,
      description: data.metaDescription,
      images: [data.heroImage],
    },
    alternates: { canonical: `https://operator.brightplace.ai/${operator}/${slug}` },
    robots: { index: true, follow: true },
  }
}

export default async function Page({ params }: PageProps) {
  const { operator, slug } = await params

  // Operator-level stories page: /towne-properties/stories
  if (isStoriesIndex(slug)) {
    const operatorMeta = getOperatorMeta(operator)
    if (!operatorMeta) notFound()
    const allStories = getAllStoriesByOperator(operator)
    const properties = getPropertiesByOperator(operator)

    return (
      <main style={{ minHeight: '100vh', background: 'var(--bg-page)' }}>
        <div style={{
          background: 'var(--bp-navy)', color: 'var(--bp-paper)',
          padding: 'clamp(100px, 14vw, 160px) clamp(20px, 4vw, 48px) clamp(48px, 7vw, 80px)',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: -100, right: -100, width: 300, height: 300, borderRadius: '50%', border: '1px solid rgba(250,246,239,0.04)', pointerEvents: 'none' }} />
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <nav style={{ fontFamily: 'var(--ff-body)', fontSize: 13, color: 'rgba(250,246,239,0.45)', marginBottom: 20 }}>
              <Link href={`/${operator}`} style={{ color: 'var(--bp-orange)' }}>{operatorMeta.name}</Link>
              <span style={{ margin: '0 6px' }}>/</span>
              <span style={{ color: 'rgba(250,246,239,0.8)' }}>Stories & Guides</span>
            </nav>
            <h1 style={{ fontFamily: 'var(--ff-display)', fontWeight: 600, fontSize: 'clamp(32px, 5vw, 48px)', lineHeight: 1.1, letterSpacing: '-0.03em', margin: '0 0 14px' }}>
              {operatorMeta.name} Stories
            </h1>
            <p style={{ fontFamily: 'var(--ff-body)', fontSize: 17, lineHeight: 1.6, color: 'rgba(250,246,239,0.6)', margin: 0, maxWidth: '48ch' }}>
              Guides, reviews, and neighborhood insights across all {operatorMeta.name} communities.
            </p>
          </div>
        </div>

        <div style={{ maxWidth: 800, margin: '0 auto', padding: 'clamp(40px, 6vw, 72px) clamp(20px, 4vw, 48px)' }}>
          {/* Group by property */}
          {properties.map((prop) => {
            const propStories = allStories.filter(s => s.propertySlug === prop.slug)
            if (propStories.length === 0) return null
            return (
              <div key={prop.slug} style={{ marginBottom: 48 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 'var(--r-sm)', background: `url(${prop.heroImage}) center / cover no-repeat`, flexShrink: 0 }} />
                  <div>
                    <p style={{ fontFamily: 'var(--ff-display)', fontWeight: 600, fontSize: 16, margin: '0 0 1px', color: 'var(--bp-navy)' }}>{prop.name}</p>
                    <p style={{ fontFamily: 'var(--ff-body)', fontSize: 12, color: 'var(--bp-ink-muted)', margin: 0 }}>{prop.subtitle} · {prop.city}, {prop.state}</p>
                  </div>
                </div>
                <div style={{ display: 'grid', gap: 16 }}>
                  {propStories.map((s) => (
                    <Link key={s.slug} href={`/${operator}/${s.slug}`} style={{
                      display: 'grid', gridTemplateColumns: '180px 1fr', gap: 20,
                      padding: 16, borderRadius: 'var(--r-md)',
                      background: 'var(--bg-surface)', border: '1px solid var(--bp-line)',
                      textDecoration: 'none', color: 'inherit',
                      transition: 'box-shadow 0.25s, transform 0.25s', alignItems: 'center',
                    }} className="two-col-grid">
                      <div style={{ width: '100%', aspectRatio: '16/10', borderRadius: 6, background: `url(${prop.heroImage}) center / cover no-repeat` }} />
                      <div>
                        <p style={{ fontFamily: 'var(--ff-display)', fontWeight: 500, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--bp-teal-deep)', margin: '0 0 5px' }}>Community Guide</p>
                        <h3 style={{ fontFamily: 'var(--ff-display)', fontWeight: 600, fontSize: 17, letterSpacing: '-0.01em', margin: '0 0 6px', lineHeight: 1.3 }}>{s.title}</h3>
                        <div style={{ display: 'flex', gap: 10, alignItems: 'center', fontFamily: 'var(--ff-body)', fontSize: 12, color: 'var(--bp-ink-muted)' }}>
                          <span>{s.readTime} read</span>
                          <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'var(--bp-line)' }} />
                          <span>{new Date(s.datePublished).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )
          })}

          <div style={{ marginTop: 32, textAlign: 'center' }}>
            <Link href={`/${operator}`} style={{ fontFamily: 'var(--ff-display)', fontWeight: 600, fontSize: 14, color: 'var(--bp-teal-deep)' }}>
              &larr; Back to {operatorMeta.name}
            </Link>
          </div>
        </div>

        <footer style={{ borderTop: '1px solid var(--bp-line)', padding: '24px clamp(20px, 4vw, 48px)', textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--ff-body)', fontSize: 13, color: 'var(--bp-ink-muted)', margin: 0 }}>
            Powered by <Link href="https://brightplace.ai" style={{ color: 'var(--bp-orange)', fontFamily: 'var(--ff-display)', fontWeight: 700 }}>brightplace</Link>
          </p>
        </footer>
      </main>
    )
  }

  // Property-level stories index
  const propIndex = isPropertyStoriesIndex(slug)
  if (propIndex) {
    const property = getProperty(operator, propIndex.propertySlug)
    const operatorMeta = getOperatorMeta(operator)
    if (!property || !operatorMeta) notFound()
    const stories = getStoriesByProperty(operator, propIndex.propertySlug)

    return (
      <main style={{ minHeight: '100vh', background: 'var(--bg-page)' }}>
        {/* Header */}
        <div style={{
          background: 'var(--bp-navy)', color: 'var(--bp-paper)',
          padding: 'clamp(100px, 14vw, 160px) clamp(20px, 4vw, 48px) clamp(48px, 7vw, 80px)',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: -100, right: -100, width: 300, height: 300, borderRadius: '50%', border: '1px solid rgba(250,246,239,0.04)', pointerEvents: 'none' }} />
          <div style={{ maxWidth: 760, margin: '0 auto' }}>
            <nav style={{ fontFamily: 'var(--ff-body)', fontSize: 13, color: 'rgba(250,246,239,0.45)', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 6 }}>
              <Link href={`/${operator}`} style={{ color: 'var(--bp-orange)' }}>{operatorMeta.name}</Link>
              <span>/</span>
              <Link href={`/${operator}/${propIndex.propertySlug}`} style={{ color: 'rgba(250,246,239,0.6)' }}>{property.name}</Link>
              <span>/</span>
              <span style={{ color: 'rgba(250,246,239,0.8)' }}>Stories</span>
            </nav>
            <h1 style={{
              fontFamily: 'var(--ff-display)', fontWeight: 600,
              fontSize: 'clamp(32px, 5vw, 48px)', lineHeight: 1.1,
              letterSpacing: '-0.03em', margin: '0 0 14px',
            }}>
              {property.name} Stories
            </h1>
            <p style={{
              fontFamily: 'var(--ff-body)', fontSize: 17, lineHeight: 1.6,
              color: 'rgba(250,246,239,0.6)', margin: 0, maxWidth: '44ch',
            }}>
              Guides, reviews, and neighborhood insights about {property.name} {property.subtitle} in {property.city}, {property.state}.
            </p>
          </div>
        </div>

        {/* Stories list */}
        <div style={{ maxWidth: 760, margin: '0 auto', padding: 'clamp(40px, 6vw, 72px) clamp(20px, 4vw, 48px)' }}>
          <div style={{ display: 'grid', gap: 24 }}>
            {stories.map((s) => (
              <Link
                key={s.slug}
                href={`/${operator}/${s.slug}`}
                style={{
                  display: 'grid', gridTemplateColumns: '200px 1fr', gap: 24,
                  padding: 20, borderRadius: 'var(--r-lg)',
                  background: 'var(--bg-surface)', border: '1px solid var(--bp-line)',
                  textDecoration: 'none', color: 'inherit',
                  transition: 'box-shadow 0.3s, transform 0.3s',
                  alignItems: 'center',
                }}
                className="two-col-grid"
              >
                <div style={{
                  width: '100%', aspectRatio: '16/10', borderRadius: 'var(--r-sm)',
                  background: `url(${property.heroImage}) center / cover no-repeat`,
                }} />
                <div>
                  <p style={{
                    fontFamily: 'var(--ff-display)', fontWeight: 500, fontSize: 11,
                    letterSpacing: '0.12em', textTransform: 'uppercase',
                    color: 'var(--bp-teal-deep)', margin: '0 0 6px',
                  }}>
                    Community Guide
                  </p>
                  <h2 style={{
                    fontFamily: 'var(--ff-display)', fontWeight: 600, fontSize: 20,
                    letterSpacing: '-0.01em', margin: '0 0 8px', lineHeight: 1.25,
                  }}>
                    {s.title}
                  </h2>
                  <p style={{
                    fontFamily: 'var(--ff-body)', fontSize: 14,
                    color: 'var(--bp-ink-muted)', margin: '0 0 10px',
                    lineHeight: 1.5,
                    display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                  }}>
                    {s.metaDescription}
                  </p>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'center', fontFamily: 'var(--ff-body)', fontSize: 12, color: 'var(--bp-ink-muted)' }}>
                    <span>{s.readTime} read</span>
                    <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'var(--bp-line)' }} />
                    <span>{new Date(s.datePublished).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Back to property */}
          <div style={{ marginTop: 40, textAlign: 'center' }}>
            <Link href={`/${operator}/${propIndex.propertySlug}`} style={{
              fontFamily: 'var(--ff-display)', fontWeight: 600, fontSize: 14,
              color: 'var(--bp-teal-deep)', display: 'inline-flex', alignItems: 'center', gap: 6,
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5m7-7-7 7 7 7"/></svg>
              Back to {property.name}
            </Link>
          </div>
        </div>

        <footer style={{ borderTop: '1px solid var(--bp-line)', padding: '24px clamp(20px, 4vw, 48px)', textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--ff-body)', fontSize: 13, color: 'var(--bp-ink-muted)', margin: 0 }}>
            Powered by <Link href="https://brightplace.ai" style={{ color: 'var(--bp-orange)', fontFamily: 'var(--ff-display)', fontWeight: 700 }}>brightplace</Link>
          </p>
        </footer>
      </main>
    )
  }

  // Check if it's a story
  const story = getStory(operator, slug)
  if (story) {
    const property = getProperty(operator, story.propertySlug)
    const operatorMeta = getOperatorMeta(operator)
    if (!property || !operatorMeta) notFound()

    const articleJsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: story.title,
      description: story.metaDescription,
      author: { '@type': 'Organization', name: 'brightplace', url: 'https://brightplace.ai' },
      publisher: { '@type': 'Organization', name: 'brightplace', url: 'https://brightplace.ai' },
      datePublished: story.datePublished,
      dateModified: story.dateModified,
      mainEntityOfPage: `https://operator.brightplace.ai/${operator}/${slug}`,
    }

    const Content = story.content

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
          slug,
          operator,
          operatorName: operatorMeta.name,
          property: story.propertySlug,
          propertyName: property.name,
          propertySubtitle: property.subtitle,
          heroImage: property.heroImage,
          heroAlt: property.heroAlt,
        }}>
          <Content operator={operator} slug={story.propertySlug} />
        </StoryLayout>
        <AIAssistant data={property} />
      </>
    )
  }

  // Property page
  const data = getProperty(operator, slug)
  const operatorMeta = getOperatorMeta(operator)
  if (!data || !operatorMeta) notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ApartmentComplex',
    name: `${data.name} ${data.subtitle}`,
    description: data.metaDescription,
    address: {
      '@type': 'PostalAddress',
      streetAddress: data.address,
      addressLocality: data.city,
      addressRegion: data.state,
      postalCode: data.zip,
      addressCountry: 'US',
    },
    telephone: data.phone,
    email: data.email,
    image: data.heroImage,
    url: `https://operator.brightplace.ai/${operator}/${slug}`,
    amenityFeature: data.amenities.map((a) => ({
      '@type': 'LocationFeatureSpecification',
      name: a.title,
      value: true,
    })),
    numberOfAvailableAccommodation: data.floorPlans.length,
    floorSize: {
      '@type': 'QuantitativeValue',
      minValue: Math.min(...data.floorPlans.map((p) => p.sqft)),
      maxValue: Math.max(...data.floorPlans.map((p) => p.sqft)),
      unitCode: 'FTK',
    },
    priceRange: `$${Math.min(...data.floorPlans.map((p) => p.price)).toLocaleString()} - $${Math.max(...data.floorPlans.map((p) => p.price)).toLocaleString()}/mo`,
  }

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: data.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'brightplace', item: 'https://brightplace.ai' },
      { '@type': 'ListItem', position: 2, name: operatorMeta.name, item: `https://operator.brightplace.ai/${operator}` },
      { '@type': 'ListItem', position: 3, name: `${data.name} ${data.subtitle}`, item: `https://operator.brightplace.ai/${operator}/${slug}` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <Header data={data} operatorSlug={operator} propertySlug={slug} />
      <main>
        <Hero data={data} />
        <RentCalculator data={data} />
        <FloorPlans data={data} />
        <Amenities data={data} />
        <Neighborhood data={data} />
        <Gallery data={data} />
        <FAQ data={data} />
        <TourCTA data={data} />
      </main>
      <Footer data={data} />
      <AIAssistant data={data} />
    </>
  )
}
