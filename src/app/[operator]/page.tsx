import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllOperatorSlugs, getOperatorMeta, getPropertiesByOperator } from '@/data/operators'

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
  }
}

export default async function OperatorPage({ params }: PageProps) {
  const { operator } = await params
  const meta = getOperatorMeta(operator)
  if (!meta) notFound()

  const properties = getPropertiesByOperator(operator)

  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg-page)' }}>
      {/* Header */}
      <header style={{
        background: 'var(--bp-navy)',
        color: 'var(--bp-paper)',
        padding: 'clamp(56px, 10vw, 120px) clamp(20px, 4vw, 48px) clamp(48px, 8vw, 96px)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          top: -100,
          right: -100,
          width: 300,
          height: 300,
          borderRadius: '50%',
          border: '1px solid rgba(250,246,239,0.04)',
          pointerEvents: 'none',
        }} />
        <p style={{
          fontFamily: 'var(--ff-display)',
          fontWeight: 600,
          fontSize: 12,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--bp-orange)',
          margin: '0 0 16px',
        }}>
          Operator Portfolio
        </p>
        <h1 style={{
          fontFamily: 'var(--ff-display)',
          fontWeight: 600,
          fontSize: 'clamp(36px, 6vw, 60px)',
          letterSpacing: '-0.03em',
          lineHeight: 1.08,
          margin: '0 0 18px',
          color: 'var(--bp-paper)',
        }}>
          {meta.name}
        </h1>
        {meta.tagline && (
          <p style={{
            fontFamily: 'var(--ff-serif)',
            fontStyle: 'italic',
            fontSize: 18,
            color: 'rgba(250,246,239,0.55)',
            margin: '0 0 24px',
          }}>
            {meta.tagline}
          </p>
        )}
        <p style={{
          fontFamily: 'var(--ff-body)',
          fontSize: 17,
          lineHeight: 1.6,
          color: 'rgba(250,246,239,0.65)',
          maxWidth: '52ch',
          margin: '0 auto',
        }}>
          {meta.description}
        </p>

        {/* Market tags */}
        <div style={{
          display: 'flex',
          gap: 8,
          flexWrap: 'wrap',
          justifyContent: 'center',
          marginTop: 32,
        }}>
          {meta.markets.slice(0, 8).map((m) => (
            <span key={m} style={{
              fontFamily: 'var(--ff-body)',
              fontSize: 12,
              padding: '6px 14px',
              borderRadius: 'var(--r-pill)',
              background: 'rgba(250,246,239,0.06)',
              border: '1px solid rgba(250,246,239,0.1)',
              color: 'rgba(250,246,239,0.5)',
            }}>
              {m}
            </span>
          ))}
        </div>
      </header>

      {/* Properties grid */}
      <div className="container section-padding">
        <p style={{
          fontFamily: 'var(--ff-display)',
          fontWeight: 600,
          fontSize: 13,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--bp-ink-muted)',
          marginBottom: 28,
        }}>
          {properties.length} {properties.length === 1 ? 'community' : 'communities'} on brightplace
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(360px, 100%), 1fr))',
          gap: 20,
        }}>
          {properties.map((prop) => (
            <Link
              key={prop.slug}
              href={`/${operator}/${prop.slug}`}
              style={{
                display: 'block',
                background: 'var(--bg-surface)',
                borderRadius: 'var(--r-lg)',
                border: '1px solid var(--bp-line)',
                overflow: 'hidden',
                transition: 'box-shadow 0.3s, transform 0.3s',
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              <div style={{
                height: 200,
                background: `url(${prop.heroImage}) center / cover no-repeat`,
                position: 'relative',
              }}>
                {prop.promoText && (
                  <span style={{
                    position: 'absolute',
                    top: 14,
                    left: 14,
                    fontFamily: 'var(--ff-display)',
                    fontWeight: 700,
                    fontSize: 10,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    padding: '5px 12px',
                    borderRadius: 'var(--r-pill)',
                    background: 'rgba(0,188,212,0.9)',
                    color: 'white',
                    backdropFilter: 'blur(4px)',
                  }}>
                    Special Offer
                  </span>
                )}
              </div>
              <div style={{ padding: '20px 24px 24px' }}>
                <p style={{
                  fontFamily: 'var(--ff-display)',
                  fontWeight: 500,
                  fontSize: 11,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'var(--bp-teal-deep)',
                  margin: '0 0 6px',
                }}>
                  {prop.city}, {prop.state}
                </p>
                <h2 style={{
                  fontFamily: 'var(--ff-display)',
                  fontWeight: 700,
                  fontSize: 22,
                  letterSpacing: '-0.01em',
                  margin: '0 0 4px',
                }}>
                  {prop.name}
                </h2>
                <p style={{
                  fontFamily: 'var(--ff-body)',
                  fontSize: 13,
                  color: 'var(--bp-ink-muted)',
                  margin: '0 0 14px',
                }}>
                  {prop.subtitle}
                </p>
                <p style={{
                  fontFamily: 'var(--ff-body)',
                  fontSize: 14,
                  color: 'var(--bp-ink-soft)',
                  lineHeight: 1.5,
                  margin: '0 0 18px',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}>
                  {prop.heroDescription}
                </p>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: 16,
                  borderTop: '1px solid var(--bp-line)',
                }}>
                  <div>
                    <p style={{ fontFamily: 'var(--ff-body)', fontSize: 11, color: 'var(--bp-ink-muted)', margin: '0 0 2px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      From
                    </p>
                    <p style={{
                      fontFamily: 'var(--ff-display)',
                      fontWeight: 700,
                      fontSize: 20,
                      margin: 0,
                      fontVariantNumeric: 'tabular-nums',
                    }}>
                      ${Math.min(...prop.floorPlans.map(p => p.price)).toLocaleString()}/mo
                    </p>
                  </div>
                  <span style={{
                    fontFamily: 'var(--ff-display)',
                    fontWeight: 600,
                    fontSize: 13,
                    color: 'var(--bp-teal-deep)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                  }}>
                    View property
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid var(--bp-line)',
        padding: '24px clamp(20px, 4vw, 48px)',
        textAlign: 'center',
      }}>
        <p style={{ fontFamily: 'var(--ff-body)', fontSize: 13, color: 'var(--bp-ink-muted)', margin: 0 }}>
          Powered by <a href="https://brightplace.ai" style={{ color: 'var(--bp-orange)', fontFamily: 'var(--ff-display)', fontWeight: 700 }}>brightplace</a>
        </p>
      </footer>
    </main>
  )
}
