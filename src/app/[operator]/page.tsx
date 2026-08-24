import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllOperatorSlugs, getOperatorMeta, getPropertiesByOperator } from '@/data/operators'
import { getAllStoriesByOperator } from '@/data/stories'
import OperatorPageClient from './OperatorPageClient'

interface PageProps {
  params: Promise<{ operator: string }>
}

export async function generateStaticParams() {
  return getAllOperatorSlugs().map((slug) => ({ operator: slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { operator } = await params
  const meta = getOperatorMeta(operator)
  if (!meta) return { title: 'Not Found' }

  return {
    title: `${meta.name} Communities | brightplace`,
    description: `Explore ${meta.name} apartment communities with all-in pricing. ${meta.totalProperties}+ properties across ${meta.markets.slice(0, 4).join(', ')}.`,
    openGraph: {
      title: `${meta.name} | brightplace`,
      description: `${meta.totalProperties}+ apartment communities with transparent pricing.`,
      type: 'website',
      url: `https://operator.brightplace.ai/${operator}`,
    },
    alternates: { canonical: `https://operator.brightplace.ai/${operator}` },
  }
}

export default async function OperatorPage({ params }: PageProps) {
  const { operator } = await params
  const meta = getOperatorMeta(operator)
  if (!meta) notFound()

  const properties = getPropertiesByOperator(operator)
  const stories = getAllStoriesByOperator(operator)

  // Serialize data for client component (strip content functions from stories)
  const serializedStories = stories.map(({ content, ...rest }) => rest)

  return <OperatorPageClient
    operator={operator}
    meta={meta}
    properties={properties}
    stories={serializedStories}
  />
}
