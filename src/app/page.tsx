'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'

const OPERATORS = [
  {
    slug: 'air-communities',
    name: 'AIR Communities',
    properties: 170,
    markets: 'Denver, Philadelphia, Miami, San Diego, Boston, Los Angeles',
    featured: {
      slug: 'oak-trail',
      name: 'Oak Trail',
      subtitle: 'At Cherry Creek South',
      city: 'Denver, CO',
      image: '/images/air-communities/hero-pool.jpg',
      price: 1512,
      plans: 7,
      highlight: 'Two resort-style pools',
    },
  },
  {
    slug: 'towne-properties',
    name: 'Towne Properties',
    properties: 119,
    markets: 'Cincinnati, Columbus, Dayton, Indianapolis, Covington',
    featured: {
      slug: 'harpers-point',
      name: 'Harpers Point',
      subtitle: 'Resort-Style Living',
      city: 'Cincinnati, OH',
      image: '/images/towne-properties/hero-pool.jpg',
      price: 1285,
      plans: 8,
      highlight: 'White sand beach & pub',
    },
  },
]

const FEATURES = [
  {
    title: 'All-in pricing',
    description: 'Every price includes required monthly fees. No surprise line items at lease signing. What you see is what you pay.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
    ),
  },
  {
    title: 'AI-ready pages',
    description: 'Structured data that ChatGPT, Claude, and Perplexity can read and cite. Your properties show up when renters ask AI for recommendations.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a4 4 0 0 1 4 4c0 1.95-1.4 3.58-3.25 3.93"/><path d="M8 6a4 4 0 0 1 8 0"/><path d="M12 18v-4"/><circle cx="12" cy="20" r="2"/></svg>
    ),
  },
  {
    title: 'Built for search',
    description: 'Static HTML that Google indexes instantly. Schema markup, FAQ rich results, and Open Graph for social. Every page is an SEO asset.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
    ),
  },
  {
    title: 'Lead generation',
    description: 'Interactive rent calculators, AI chat assistants, and tracked CTAs that turn page visits into tour bookings.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
    ),
  },
]

const STATS = [
  { value: '289+', label: 'Properties powered' },
  { value: '2', label: 'Operators live' },
  { value: '16', label: 'Floor plans listed' },
  { value: '100%', label: 'AI crawlable' },
]

export default function HomePage() {
  const featuredRef = useRef(null)
  const featuresRef = useRef(null)
  const statsRef = useRef(null)
  const featuredInView = useInView(featuredRef, { once: true, margin: '-80px' })
  const featuresInView = useInView(featuresRef, { once: true, margin: '-80px' })
  const statsInView = useInView(statsRef, { once: true, margin: '-60px' })

  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg-page)' }}>

      {/* ─── HEADER ─── */}
      <header style={{
        padding: '18px clamp(20px, 4vw, 48px)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: 1280,
        margin: '0 auto',
      }}>
        <a href="/" style={{
          fontFamily: 'var(--ff-display)',
          fontWeight: 700,
          fontSize: 22,
          color: 'var(--bp-navy)',
          letterSpacing: '-0.02em',
        }}>
          brightplace
        </a>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <a href="#operators" style={{
            fontFamily: 'var(--ff-display)',
            fontWeight: 500,
            fontSize: 14,
            color: 'var(--bp-ink-soft)',
            padding: '8px 16px',
            borderRadius: 'var(--r-pill)',
            transition: 'background 0.2s',
          }}>
            Operators
          </a>
          <a href="https://brightplace.ai" style={{
            fontFamily: 'var(--ff-display)',
            fontWeight: 600,
            fontSize: 13,
            padding: '10px 22px',
            borderRadius: 'var(--r-pill)',
            background: 'var(--bp-navy)',
            color: 'var(--bp-paper)',
          }}>
            brightplace.ai
          </a>
        </div>
      </header>

      {/* ─── HERO ─── */}
      <section style={{
        padding: 'clamp(60px, 12vw, 140px) clamp(20px, 4vw, 48px) clamp(40px, 8vw, 100px)',
        textAlign: 'center',
        maxWidth: 1280,
        margin: '0 auto',
        position: 'relative',
      }}>
        {/* Subtle background gradient */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(245,166,35,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
          style={{ position: 'relative' }}
        >
          {/* Badge */}
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            fontFamily: 'var(--ff-display)',
            fontWeight: 600,
            fontSize: 12,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--bp-teal-deep)',
            padding: '8px 18px',
            borderRadius: 'var(--r-pill)',
            background: 'rgba(0,188,212,0.06)',
            border: '1px solid rgba(0,188,212,0.12)',
            marginBottom: 28,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--bp-teal)', animation: 'pulse-ring 2s ease-out infinite' }} />
            Operator property pages
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.2, 0.7, 0.2, 1] }}
          style={{
            fontFamily: 'var(--ff-display)',
            fontWeight: 600,
            fontSize: 'clamp(36px, 6vw, 72px)',
            lineHeight: 1.05,
            letterSpacing: '-0.04em',
            color: 'var(--bp-navy)',
            margin: '0 auto 24px',
            maxWidth: '16ch',
            position: 'relative',
          }}
        >
          Property pages that{' '}
          <span style={{ color: 'var(--bp-orange)' }}>generate leads</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{
            fontFamily: 'var(--ff-body)',
            fontSize: 'clamp(16px, 1.8vw, 20px)',
            lineHeight: 1.6,
            color: 'var(--bp-ink-soft)',
            maxWidth: '48ch',
            margin: '0 auto 40px',
          }}
        >
          brightplace builds SEO-optimized, AI-ready property pages for apartment operators. All-in pricing. Interactive rent calculators. Every page designed to convert visitors into tours.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <a href="#operators" className="btn-primary" style={{ fontSize: 16, padding: '16px 32px' }}>
            Explore communities
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>
          </a>
          <a href="https://brightplace.ai" style={{
            fontFamily: 'var(--ff-display)',
            fontWeight: 600,
            fontSize: 16,
            padding: '16px 32px',
            borderRadius: 'var(--r-pill)',
            border: '1.5px solid var(--bp-line)',
            color: 'var(--bp-navy)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            transition: 'border-color 0.2s, background 0.2s',
          }}>
            Learn about brightplace
          </a>
        </motion.div>
      </section>

      {/* ─── STATS BAR ─── */}
      <section ref={statsRef} style={{
        borderTop: '1px solid var(--bp-line)',
        borderBottom: '1px solid var(--bp-line)',
        background: 'var(--bg-surface)',
      }}>
        <div style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: 'clamp(32px, 4vw, 48px) clamp(20px, 4vw, 48px)',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 24,
          textAlign: 'center',
        }} className="footer-grid">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              animate={statsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <p style={{
                fontFamily: 'var(--ff-display)',
                fontWeight: 700,
                fontSize: 'clamp(28px, 4vw, 40px)',
                letterSpacing: '-0.02em',
                color: 'var(--bp-navy)',
                margin: '0 0 4px',
              }}>
                {stat.value}
              </p>
              <p style={{
                fontFamily: 'var(--ff-body)',
                fontSize: 13,
                color: 'var(--bp-ink-muted)',
                margin: 0,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}>
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── FEATURED OPERATORS ─── */}
      <section id="operators" ref={featuredRef} style={{ scrollMarginTop: 40 }}>
        <div style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: 'clamp(72px, 9vw, 140px) clamp(20px, 4vw, 48px)',
        }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={featuredInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{ textAlign: 'center', marginBottom: 'clamp(40px, 6vw, 64px)' }}
          >
            <p className="section-label" style={{ justifyContent: 'center' }}>Operators</p>
            <h2 className="section-heading">Communities powered by brightplace</h2>
            <p style={{
              fontFamily: 'var(--ff-body)',
              fontSize: 17,
              color: 'var(--bp-ink-soft)',
              margin: '16px auto 0',
              maxWidth: '44ch',
              lineHeight: 1.6,
            }}>
              Each operator gets a fully branded portfolio with individual property pages, rent calculators, and AI-powered assistants.
            </p>
          </motion.div>

          {/* Operator cards */}
          <div style={{ display: 'grid', gap: 32 }}>
            {OPERATORS.map((op, i) => (
              <motion.div
                key={op.slug}
                initial={{ opacity: 0, y: 40 }}
                animate={featuredInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.15, duration: 0.7 }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  background: 'var(--bg-surface)',
                  borderRadius: 'var(--r-xl)',
                  border: '1px solid var(--bp-line)',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-card)',
                }}
                className="two-col-grid"
              >
                {/* Property image */}
                <Link href={`/${op.slug}/${op.featured.slug}`} style={{ display: 'block', position: 'relative', overflow: 'hidden' }}>
                  <div style={{
                    width: '100%',
                    height: '100%',
                    minHeight: 340,
                    background: `url(${op.featured.image}) center / cover no-repeat`,
                    transition: 'transform 0.6s cubic-bezier(.2,.7,.2,1)',
                  }} />
                  {/* Property quick info overlay */}
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '48px 24px 20px',
                    background: 'linear-gradient(to top, rgba(15,24,48,0.8), transparent)',
                  }}>
                    <p style={{
                      fontFamily: 'var(--ff-display)',
                      fontWeight: 700,
                      fontSize: 24,
                      color: 'var(--bp-paper)',
                      margin: '0 0 4px',
                      letterSpacing: '-0.01em',
                    }}>
                      {op.featured.name}
                    </p>
                    <p style={{
                      fontFamily: 'var(--ff-body)',
                      fontSize: 13,
                      color: 'rgba(250,246,239,0.65)',
                      margin: 0,
                    }}>
                      {op.featured.subtitle} · {op.featured.city}
                    </p>
                  </div>
                </Link>

                {/* Operator info */}
                <div style={{
                  padding: 'clamp(28px, 4vw, 40px)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}>
                  <p style={{
                    fontFamily: 'var(--ff-display)',
                    fontWeight: 500,
                    fontSize: 11,
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    color: 'var(--bp-teal-deep)',
                    margin: '0 0 8px',
                  }}>
                    Operator
                  </p>
                  <h3 style={{
                    fontFamily: 'var(--ff-display)',
                    fontWeight: 700,
                    fontSize: 'clamp(24px, 3vw, 32px)',
                    letterSpacing: '-0.02em',
                    margin: '0 0 12px',
                  }}>
                    {op.name}
                  </h3>
                  <p style={{
                    fontFamily: 'var(--ff-body)',
                    fontSize: 14,
                    color: 'var(--bp-ink-muted)',
                    margin: '0 0 24px',
                    lineHeight: 1.5,
                  }}>
                    {op.properties}+ communities across {op.markets}
                  </p>

                  {/* Featured property stats */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr',
                    gap: 16,
                    padding: '20px 0',
                    borderTop: '1px solid var(--bp-line)',
                    borderBottom: '1px solid var(--bp-line)',
                    marginBottom: 24,
                  }}>
                    <div>
                      <p style={{ fontFamily: 'var(--ff-display)', fontWeight: 700, fontSize: 20, margin: 0, color: 'var(--bp-navy)' }}>
                        ${op.featured.price.toLocaleString()}
                      </p>
                      <p style={{ fontFamily: 'var(--ff-body)', fontSize: 11, color: 'var(--bp-ink-muted)', margin: '2px 0 0', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                        From/mo
                      </p>
                    </div>
                    <div>
                      <p style={{ fontFamily: 'var(--ff-display)', fontWeight: 700, fontSize: 20, margin: 0, color: 'var(--bp-navy)' }}>
                        {op.featured.plans}
                      </p>
                      <p style={{ fontFamily: 'var(--ff-body)', fontSize: 11, color: 'var(--bp-ink-muted)', margin: '2px 0 0', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                        Floor plans
                      </p>
                    </div>
                    <div>
                      <p style={{ fontFamily: 'var(--ff-body)', fontWeight: 600, fontSize: 13, margin: 0, color: 'var(--bp-teal-deep)', lineHeight: 1.3 }}>
                        {op.featured.highlight}
                      </p>
                      <p style={{ fontFamily: 'var(--ff-body)', fontSize: 11, color: 'var(--bp-ink-muted)', margin: '2px 0 0', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                        Highlight
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: 10 }}>
                    <Link href={`/${op.slug}/${op.featured.slug}`} className="btn-primary" style={{ fontSize: 14, padding: '12px 24px' }}>
                      View property
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
                    </Link>
                    <Link href={`/${op.slug}`} style={{
                      fontFamily: 'var(--ff-display)',
                      fontWeight: 600,
                      fontSize: 14,
                      padding: '12px 24px',
                      borderRadius: 'var(--r-pill)',
                      border: '1.5px solid var(--bp-line)',
                      color: 'var(--bp-navy)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      transition: 'border-color 0.2s',
                    }}>
                      All communities
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section ref={featuresRef} style={{
        background: 'var(--bp-navy)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decorative */}
        <div style={{
          position: 'absolute',
          top: -100,
          right: -100,
          width: 400,
          height: 400,
          borderRadius: '50%',
          border: '1px solid rgba(250,246,239,0.03)',
          pointerEvents: 'none',
        }} />

        <div style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: 'clamp(72px, 9vw, 120px) clamp(20px, 4vw, 48px)',
        }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{ textAlign: 'center', marginBottom: 'clamp(40px, 6vw, 64px)' }}
          >
            <p style={{
              fontFamily: 'var(--ff-display)',
              fontWeight: 600,
              fontSize: 12,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--bp-orange)',
              margin: '0 0 16px',
            }}>
              Why brightplace
            </p>
            <h2 style={{
              fontFamily: 'var(--ff-display)',
              fontWeight: 600,
              fontSize: 'clamp(32px, 4.5vw, 48px)',
              lineHeight: 1.08,
              letterSpacing: '-0.03em',
              color: 'var(--bp-paper)',
              margin: 0,
            }}>
              Every page is a growth engine
            </h2>
          </motion.div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(260px, 100%), 1fr))',
            gap: 20,
          }}>
            {FEATURES.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 24 }}
                animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.15 + i * 0.1, duration: 0.5 }}
                style={{
                  padding: 'clamp(24px, 3vw, 32px)',
                  borderRadius: 'var(--r-lg)',
                  background: 'rgba(250,246,239,0.04)',
                  border: '1px solid rgba(250,246,239,0.06)',
                  transition: 'background 0.3s, border-color 0.3s',
                }}
              >
                <div style={{
                  width: 44,
                  height: 44,
                  borderRadius: 'var(--r-md)',
                  background: 'rgba(245,166,35,0.1)',
                  border: '1px solid rgba(245,166,35,0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 18,
                  color: 'var(--bp-orange)',
                }}>
                  {feature.icon}
                </div>
                <h3 style={{
                  fontFamily: 'var(--ff-display)',
                  fontWeight: 600,
                  fontSize: 18,
                  color: 'var(--bp-paper)',
                  margin: '0 0 8px',
                }}>
                  {feature.title}
                </h3>
                <p style={{
                  fontFamily: 'var(--ff-body)',
                  fontSize: 14,
                  lineHeight: 1.6,
                  color: 'rgba(250,246,239,0.55)',
                  margin: 0,
                }}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section style={{
        maxWidth: 1280,
        margin: '0 auto',
        padding: 'clamp(72px, 9vw, 120px) clamp(20px, 4vw, 48px)',
        textAlign: 'center',
      }}>
        <h2 style={{
          fontFamily: 'var(--ff-display)',
          fontWeight: 600,
          fontSize: 'clamp(28px, 4vw, 44px)',
          letterSpacing: '-0.03em',
          color: 'var(--bp-navy)',
          margin: '0 0 16px',
        }}>
          Ready to see your communities on brightplace?
        </h2>
        <p style={{
          fontFamily: 'var(--ff-body)',
          fontSize: 17,
          color: 'var(--bp-ink-soft)',
          margin: '0 auto 36px',
          maxWidth: '42ch',
          lineHeight: 1.6,
        }}>
          We build property pages that rank in search, get cited by AI, and convert visitors into leasing inquiries.
        </p>
        <a href="mailto:hello@brightplace.ai" className="btn-primary" style={{ fontSize: 16, padding: '16px 36px' }}>
          Get started
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
        </a>
      </section>

      {/* ─── FOOTER ─── */}
      <footer style={{
        borderTop: '1px solid var(--bp-line)',
        padding: '24px clamp(20px, 4vw, 48px)',
        maxWidth: 1280,
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 12,
      }}>
        <p style={{
          fontFamily: 'var(--ff-body)',
          fontSize: 13,
          color: 'var(--bp-ink-muted)',
          margin: 0,
        }}>
          &copy; {new Date().getFullYear()} brightplace. All rights reserved.
        </p>
        <div style={{ display: 'flex', gap: 20 }}>
          {OPERATORS.map((op) => (
            <Link key={op.slug} href={`/${op.slug}`} style={{
              fontFamily: 'var(--ff-body)',
              fontSize: 13,
              color: 'var(--bp-ink-muted)',
              transition: 'color 0.2s',
            }}>
              {op.name}
            </Link>
          ))}
        </div>
      </footer>
    </main>
  )
}
