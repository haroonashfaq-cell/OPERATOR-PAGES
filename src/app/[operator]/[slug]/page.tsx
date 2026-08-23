import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getProperty, getAllOperatorPropertyPairs, getOperatorMeta } from '@/data/operators'
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

interface PageProps {
  params: Promise<{ operator: string; slug: string }>
}

export async function generateStaticParams() {
  return getAllOperatorPropertyPairs().map(({ operator, slug }) => ({ operator, slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { operator, slug } = await params
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
    alternates: {
      canonical: `https://operator.brightplace.ai/${operator}/${slug}`,
    },
    robots: { index: true, follow: true },
  }
}

export default async function PropertyPage({ params }: PageProps) {
  const { operator, slug } = await params
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

      <Header data={data} />
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
