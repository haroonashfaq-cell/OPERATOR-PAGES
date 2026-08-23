import { operators } from '@/data/operators'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Air Communities | brightplace Operator Pages',
  description: 'Explore Air Communities properties powered by brightplace. Browse apartments with all-in pricing, virtual tours, and detailed floor plans.',
  openGraph: {
    title: 'Air Communities | brightplace',
    description: 'Explore Air Communities properties with all-in pricing and virtual tours.',
    type: 'website',
    url: 'https://operator.brightplace.ai/air-communities',
  },
}

export default function AirCommunitiesIndex() {
  const properties = Object.values(operators)

  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg-page)' }}>
      {/* Header */}
      <header style={{
        background: 'var(--bp-navy)',
        color: 'var(--bp-paper)',
        padding: 'clamp(48px, 8vw, 96px) clamp(16px, 4vw, 40px)',
        textAlign: 'center',
      }}>
        <p style={{
          fontFamily: 'var(--ff-display)',
          fontWeight: 500,
          fontSize: 13,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: 'var(--bp-orange)',
          margin: '0 0 16px',
        }}>
          Operator Portfolio
        </p>
        <h1 style={{
          fontFamily: 'var(--ff-display)',
          fontWeight: 600,
          fontSize: 'clamp(32px, 5vw, 56px)',
          letterSpacing: '-0.03em',
          lineHeight: 1.1,
          margin: '0 0 16px',
          color: 'var(--bp-paper)',
        }}>
          Air Communities
        </h1>
        <p style={{
          fontFamily: 'var(--ff-body)',
          fontSize: 18,
          lineHeight: 1.55,
          color: 'rgba(250,246,239,0.75)',
          maxWidth: '48ch',
          margin: '0 auto',
        }}>
          Browse all properties managed by Air Communities. Every listing features all-in pricing with no hidden fees.
        </p>
      </header>

      {/* Properties grid */}
      <div className="container section-padding">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: 24,
        }}>
          {properties.map((op) => (
            <Link
              key={op.slug}
              href={`/air-communities/${op.slug}`}
              style={{
                display: 'block',
                background: 'var(--bg-surface)',
                borderRadius: 'var(--r-md)',
                border: '1px solid var(--bp-line)',
                overflow: 'hidden',
                transition: 'box-shadow 0.25s, transform 0.25s',
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              <div style={{
                height: 220,
                background: `url(${op.heroImage}) center / cover no-repeat`,
              }} />
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
                  {op.city}, {op.state}
                </p>
                <h2 style={{
                  fontFamily: 'var(--ff-display)',
                  fontWeight: 600,
                  fontSize: 24,
                  letterSpacing: '-0.01em',
                  margin: '0 0 8px',
                }}>
                  {op.name} <span style={{ fontWeight: 400, color: 'var(--bp-ink-muted)' }}>{op.subtitle}</span>
                </h2>
                <p style={{
                  fontFamily: 'var(--ff-body)',
                  fontSize: 14,
                  color: 'var(--bp-ink-soft)',
                  lineHeight: 1.5,
                  margin: '0 0 16px',
                }}>
                  {op.heroDescription.slice(0, 120)}...
                </p>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                  <span style={{
                    fontFamily: 'var(--ff-display)',
                    fontWeight: 600,
                    fontSize: 18,
                  }}>
                    From ${Math.min(...op.floorPlans.map(p => p.price)).toLocaleString()}/mo
                  </span>
                  <span style={{
                    fontFamily: 'var(--ff-display)',
                    fontWeight: 600,
                    fontSize: 14,
                    color: 'var(--bp-teal-deep)',
                  }}>
                    View property &rarr;
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
        padding: '24px clamp(16px, 4vw, 40px)',
        textAlign: 'center',
      }}>
        <p style={{
          fontFamily: 'var(--ff-body)',
          fontSize: 13,
          color: 'var(--bp-ink-muted)',
          margin: 0,
        }}>
          Powered by <a href="https://brightplace.ai" style={{ color: 'var(--bp-orange)', textDecoration: 'underline' }}>brightplace</a>
        </p>
      </footer>
    </main>
  )
}
