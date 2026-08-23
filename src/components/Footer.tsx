import type { OperatorData } from '@/data/operators'

export default function Footer({ data }: { data: OperatorData }) {
  const currentYear = new Date().getFullYear()

  return (
    <footer style={{ background: 'var(--bp-navy)', color: 'var(--bp-paper)', position: 'relative', overflow: 'hidden' }}>
      {/* Decorative gradient */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 1,
        background: 'linear-gradient(90deg, var(--bp-orange), var(--bp-teal), var(--bp-orange))',
      }} />

      <div className="container footer-grid" style={{
        padding: 'clamp(56px, 7vw, 88px) clamp(20px, 4vw, 48px) clamp(36px, 5vw, 52px)',
        display: 'grid',
        gridTemplateColumns: '1.2fr 0.8fr 0.8fr 1fr',
        gap: 'clamp(32px, 4vw, 56px)',
      }}>
        {/* Brand */}
        <div>
          <p style={{
            fontFamily: 'var(--ff-display)',
            fontWeight: 700,
            fontSize: 26,
            letterSpacing: '-0.02em',
            margin: '0 0 4px',
          }}>
            {data.name}
          </p>
          <p style={{
            fontFamily: 'var(--ff-body)',
            fontSize: 12,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'rgba(250,246,239,0.4)',
            margin: '0 0 20px',
          }}>
            {data.subtitle}
          </p>
          <p style={{
            fontFamily: 'var(--ff-body)',
            fontSize: 14,
            lineHeight: 1.7,
            color: 'rgba(250,246,239,0.65)',
            margin: 0,
            maxWidth: '28ch',
          }}>
            {data.address}<br />
            {data.city}, {data.state} {data.zip}
          </p>
        </div>

        {/* Contact */}
        <div>
          <p style={{
            fontFamily: 'var(--ff-display)',
            fontWeight: 600,
            fontSize: 12,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'rgba(250,246,239,0.35)',
            margin: '0 0 18px',
          }}>
            Contact
          </p>
          <div style={{ display: 'grid', gap: 12 }}>
            <a href={`tel:${data.phone}`} style={{
              fontFamily: 'var(--ff-body)',
              fontSize: 14,
              color: 'rgba(250,246,239,0.75)',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--bp-orange)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              {data.phone}
            </a>
            <a href={`mailto:${data.email}`} style={{
              fontFamily: 'var(--ff-body)',
              fontSize: 14,
              color: 'rgba(250,246,239,0.75)',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--bp-orange)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              {data.email}
            </a>
          </div>
        </div>

        {/* Quick links */}
        <div>
          <p style={{
            fontFamily: 'var(--ff-display)',
            fontWeight: 600,
            fontSize: 12,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'rgba(250,246,239,0.35)',
            margin: '0 0 18px',
          }}>
            Explore
          </p>
          <div style={{ display: 'grid', gap: 10 }}>
            {[
              { label: 'Residences', href: '#residences' },
              { label: 'Amenities', href: '#amenities' },
              { label: 'Neighborhood', href: '#neighborhood' },
              { label: 'Gallery', href: '#gallery' },
              { label: 'FAQ', href: '#faq' },
              { label: 'Stories', href: '#' },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                style={{
                  fontFamily: 'var(--ff-body)',
                  fontSize: 14,
                  color: 'rgba(250,246,239,0.65)',
                  transition: 'color 0.2s',
                }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* CTA column */}
        <div>
          <p style={{
            fontFamily: 'var(--ff-display)',
            fontWeight: 600,
            fontSize: 12,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'rgba(250,246,239,0.35)',
            margin: '0 0 18px',
          }}>
            Get Started
          </p>
          <p style={{
            fontFamily: 'var(--ff-body)',
            fontSize: 14,
            lineHeight: 1.6,
            color: 'rgba(250,246,239,0.55)',
            margin: '0 0 20px',
            maxWidth: '26ch',
          }}>
            Ready to find your new home? Schedule a personalized tour today.
          </p>
          <a href="#tour" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            fontFamily: 'var(--ff-display)',
            fontWeight: 600,
            fontSize: 14,
            padding: '12px 24px',
            borderRadius: 'var(--r-pill)',
            background: 'var(--bp-orange)',
            color: 'var(--bp-navy)',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}>
            Schedule Tour
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid rgba(250,246,239,0.08)' }}>
        <div className="container" style={{
          padding: '18px clamp(20px, 4vw, 48px)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 12,
        }}>
          <p style={{
            fontFamily: 'var(--ff-body)',
            fontSize: 12,
            color: 'rgba(250,246,239,0.35)',
            margin: 0,
          }}>
            &copy; {currentYear} {data.name}. All rights reserved.
          </p>
          <p style={{
            fontFamily: 'var(--ff-body)',
            fontSize: 12,
            color: 'rgba(250,246,239,0.3)',
            margin: 0,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}>
            Powered by{' '}
            <a href="https://brightplace.ai" style={{
              fontFamily: 'var(--ff-display)',
              fontWeight: 700,
              color: 'var(--bp-orange)',
              letterSpacing: '-0.01em',
            }}>
              brightplace
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
