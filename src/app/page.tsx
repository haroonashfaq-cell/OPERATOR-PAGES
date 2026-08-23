import { getAllOperatorSlugs, operators } from '@/data/operators'
import Link from 'next/link'

export default function Home() {
  const slugs = getAllOperatorSlugs()

  return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="container" style={{ textAlign: 'center', paddingTop: 80, paddingBottom: 80 }}>
        <p style={{ fontFamily: 'var(--ff-display)', fontWeight: 700, fontSize: 28, color: 'var(--bp-navy)', marginBottom: 8 }}>
          brightplace
        </p>
        <p style={{ fontFamily: 'var(--ff-body)', fontSize: 18, color: 'var(--bp-ink-muted)', marginBottom: 48 }}>
          Operator property pages
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}>
          {slugs.map((slug) => {
            const op = operators[slug]
            return (
              <Link
                key={slug}
                href={`/air-communities/${slug}`}
                className="btn-primary"
              >
                {op.name} - {op.subtitle}
              </Link>
            )
          })}
        </div>
      </div>
    </main>
  )
}
