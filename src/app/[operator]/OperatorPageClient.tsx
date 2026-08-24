'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import type { OperatorMeta, PropertyData } from '@/data/operators'

interface SerializedStory {
  slug: string
  propertySlug: string
  title: string
  metaTitle: string
  metaDescription: string
  primaryKeyword: string
  readTime: string
  datePublished: string
  dateModified: string
}

interface Props {
  operator: string
  meta: OperatorMeta
  properties: PropertyData[]
  stories: SerializedStory[]
}

export default function OperatorPageClient({ operator, meta, properties, stories }: Props) {
  const commRef = useRef(null)
  const storiesRef = useRef(null)
  const faqRef = useRef(null)
  const commInView = useInView(commRef, { once: true, margin: '-60px' })
  const storiesInView = useInView(storiesRef, { once: true, margin: '-60px' })
  const faqInView = useInView(faqRef, { once: true, margin: '-60px' })

  const faqs = [
    { q: `What is ${meta.name}?`, a: meta.description },
    { q: `How many properties does ${meta.name} manage?`, a: `${meta.name} manages ${meta.totalProperties}+ apartment communities across ${meta.markets.join(', ')}.` },
    { q: 'What is all-in pricing?', a: 'All-in pricing means every listed price includes base rent plus required monthly fees like water, sewer, trash, and pest control. No surprise fees at lease signing.' },
    { q: `How do I tour a ${meta.name} property?`, a: `Visit any property page on brightplace and click "Schedule a Tour." You can also call the leasing office directly. Every tour is customized to your needs.` },
  ]

  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg-page)' }}>
      {/* ─── NAV ─── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 60,
        background: 'rgba(250,246,239,0.96)', backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(227,221,207,0.5)',
      }}>
        <div style={{
          maxWidth: 1280, margin: '0 auto', padding: '12px clamp(16px, 3vw, 40px)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <Link href="/" style={{ fontFamily: 'var(--ff-display)', fontWeight: 700, fontSize: 20, color: 'var(--bp-navy)', letterSpacing: '-0.02em' }}>
            brightplace
          </Link>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            <a href="#communities" style={{ fontFamily: 'var(--ff-display)', fontWeight: 500, fontSize: 13, color: 'var(--bp-ink-soft)', padding: '8px 14px', borderRadius: 'var(--r-pill)' }}>
              Communities
            </a>
            <a href="#stories" style={{ fontFamily: 'var(--ff-display)', fontWeight: 500, fontSize: 13, color: 'var(--bp-ink-soft)', padding: '8px 14px', borderRadius: 'var(--r-pill)' }}>
              Stories
            </a>
            <a href="#faq" style={{ fontFamily: 'var(--ff-display)', fontWeight: 500, fontSize: 13, color: 'var(--bp-ink-soft)', padding: '8px 14px', borderRadius: 'var(--r-pill)' }}>
              FAQ
            </a>
          </div>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section style={{
        background: 'var(--bp-navy)', color: 'var(--bp-paper)',
        paddingTop: 'clamp(120px, 16vw, 180px)', paddingBottom: 'clamp(64px, 10vw, 120px)',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Decorative circles */}
        <div style={{ position: 'absolute', top: -120, right: -120, width: 400, height: 400, borderRadius: '50%', border: '1px solid rgba(250,246,239,0.04)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -80, left: -80, width: 280, height: 280, borderRadius: '50%', background: 'radial-gradient(circle, rgba(245,166,35,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 clamp(16px, 3vw, 40px)' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p style={{
              fontFamily: 'var(--ff-display)', fontWeight: 600, fontSize: 12,
              letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--bp-orange)',
              margin: '0 0 18px', display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <span style={{ width: 20, height: 2, background: 'var(--bp-orange)', borderRadius: 1 }} />
              Operator Partner
            </p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
            style={{
              fontFamily: 'var(--ff-display)', fontWeight: 600,
              fontSize: 'clamp(40px, 7vw, 72px)', lineHeight: 1.05,
              letterSpacing: '-0.04em', margin: '0 0 20px', maxWidth: '14ch',
            }}
          >
            {meta.name}
          </motion.h1>

          {meta.tagline && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
              style={{ fontFamily: 'var(--ff-serif)', fontStyle: 'italic', fontSize: 20, color: 'rgba(250,246,239,0.5)', margin: '0 0 24px' }}>
              {meta.tagline}
            </motion.p>
          )}

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6 }}
            style={{
              fontFamily: 'var(--ff-body)', fontSize: 17, lineHeight: 1.65,
              color: 'rgba(250,246,239,0.6)', maxWidth: '50ch', margin: '0 0 36px',
            }}
          >
            {meta.description}
          </motion.p>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            style={{ display: 'flex', gap: 'clamp(24px, 5vw, 56px)', flexWrap: 'wrap' }}
          >
            {[
              { value: `${meta.totalProperties}+`, label: 'Communities' },
              { value: `${properties.length}`, label: 'On brightplace' },
              { value: `${meta.markets.length}`, label: 'Markets' },
              { value: `${stories.length}`, label: 'Stories' },
            ].map((s, i) => (
              <div key={i}>
                <p style={{ fontFamily: 'var(--ff-display)', fontWeight: 700, fontSize: 'clamp(24px, 4vw, 36px)', letterSpacing: '-0.02em', color: 'var(--bp-orange)', margin: '0 0 2px' }}>{s.value}</p>
                <p style={{ fontFamily: 'var(--ff-body)', fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(250,246,239,0.4)', margin: 0 }}>{s.label}</p>
              </div>
            ))}
          </motion.div>

          {/* Market pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55 }}
            style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 32 }}
          >
            {meta.markets.slice(0, 10).map((m) => (
              <span key={m} style={{
                fontFamily: 'var(--ff-body)', fontSize: 12, padding: '6px 14px',
                borderRadius: 'var(--r-pill)', background: 'rgba(250,246,239,0.05)',
                border: '1px solid rgba(250,246,239,0.08)', color: 'rgba(250,246,239,0.45)',
              }}>{m}</span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── COMMUNITIES ─── */}
      <section id="communities" ref={commRef} style={{ scrollMarginTop: 60 }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: 'clamp(64px, 9vw, 120px) clamp(16px, 3vw, 40px)' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={commInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            style={{ marginBottom: 40 }}
          >
            <p className="section-label">Communities</p>
            <h2 className="section-heading">{properties.length} communities on brightplace</h2>
            <p style={{ fontFamily: 'var(--ff-body)', fontSize: 16, color: 'var(--bp-ink-soft)', margin: '14px 0 0', maxWidth: '44ch', lineHeight: 1.6 }}>
              Each property page features all-in pricing, interactive rent calculators, and AI-powered assistants.
            </p>
          </motion.div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(340px, 100%), 1fr))',
            gap: 20,
          }}>
            {properties.map((prop, i) => (
              <motion.div
                key={prop.slug}
                initial={{ opacity: 0, y: 24 }}
                animate={commInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <Link href={`/${operator}/${prop.slug}`} style={{
                  display: 'block', background: 'var(--bg-surface)', borderRadius: 'var(--r-lg)',
                  border: '1px solid var(--bp-line)', overflow: 'hidden',
                  textDecoration: 'none', color: 'inherit',
                  transition: 'box-shadow 0.3s, transform 0.3s',
                }}>
                  <div style={{
                    height: 200, background: `url(${prop.heroImage}) center / cover no-repeat`,
                    position: 'relative',
                  }}>
                    {prop.promoText && (
                      <span style={{
                        position: 'absolute', top: 14, left: 14,
                        fontFamily: 'var(--ff-display)', fontWeight: 700, fontSize: 10,
                        letterSpacing: '0.06em', textTransform: 'uppercase',
                        padding: '5px 12px', borderRadius: 'var(--r-pill)',
                        background: 'rgba(0,188,212,0.9)', color: 'white', backdropFilter: 'blur(4px)',
                      }}>Special Offer</span>
                    )}
                    {/* Gradient overlay */}
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 80, background: 'linear-gradient(to top, rgba(0,0,0,0.3), transparent)' }} />
                  </div>
                  <div style={{ padding: '18px 22px 20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                      <div>
                        <p style={{ fontFamily: 'var(--ff-display)', fontWeight: 500, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--bp-teal-deep)', margin: '0 0 4px' }}>
                          {prop.city}, {prop.state}
                        </p>
                        <h3 style={{ fontFamily: 'var(--ff-display)', fontWeight: 700, fontSize: 20, letterSpacing: '-0.01em', margin: '0 0 3px' }}>{prop.name}</h3>
                        <p style={{ fontFamily: 'var(--ff-body)', fontSize: 13, color: 'var(--bp-ink-muted)', margin: 0 }}>{prop.subtitle}</p>
                      </div>
                      <div style={{ textAlign: 'right', flexShrink: 0 }}>
                        <p style={{ fontFamily: 'var(--ff-body)', fontSize: 10, color: 'var(--bp-ink-muted)', margin: '0 0 2px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>From</p>
                        <p style={{ fontFamily: 'var(--ff-display)', fontWeight: 700, fontSize: 18, margin: 0, fontVariantNumeric: 'tabular-nums' }}>
                          ${Math.min(...prop.floorPlans.map(p => p.price)).toLocaleString()}
                        </p>
                      </div>
                    </div>

                    {/* Quick stats */}
                    <div style={{
                      display: 'flex', gap: 16, marginTop: 14, paddingTop: 14,
                      borderTop: '1px solid var(--bp-line)',
                      fontFamily: 'var(--ff-body)', fontSize: 12, color: 'var(--bp-ink-muted)',
                    }}>
                      <span>{prop.floorPlans.length} plans</span>
                      <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'var(--bp-line)', alignSelf: 'center' }} />
                      <span>{Math.min(...prop.floorPlans.map(p => p.sqft))}-{Math.max(...prop.floorPlans.map(p => p.sqft)).toLocaleString()} ft²</span>
                      <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'var(--bp-line)', alignSelf: 'center' }} />
                      <span>{prop.amenities.length} amenities</span>
                      <span style={{ marginLeft: 'auto', color: 'var(--bp-teal-deep)', fontFamily: 'var(--ff-display)', fontWeight: 600 }}>
                        View &rarr;
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── STORIES ─── */}
      {stories.length > 0 && (
        <section id="stories" ref={storiesRef} style={{ background: 'var(--bg-sunken)', borderTop: '1px solid var(--bp-line)', borderBottom: '1px solid var(--bp-line)', scrollMarginTop: 60 }}>
          <div style={{ maxWidth: 1280, margin: '0 auto', padding: 'clamp(64px, 9vw, 120px) clamp(16px, 3vw, 40px)' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={storiesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16, marginBottom: 36 }}
            >
              <div>
                <p className="section-label">Stories & Guides</p>
                <h2 className="section-heading">Read about our communities</h2>
              </div>
              <Link href={`/${operator}/stories`} style={{
                fontFamily: 'var(--ff-display)', fontWeight: 600, fontSize: 14,
                color: 'var(--bp-teal-deep)', display: 'flex', alignItems: 'center', gap: 6,
              }}>
                View all stories <span>&rarr;</span>
              </Link>
            </motion.div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(340px, 100%), 1fr))', gap: 20 }}>
              {stories.map((story, i) => {
                const prop = properties.find(p => p.slug === story.propertySlug)
                return (
                  <motion.div
                    key={story.slug}
                    initial={{ opacity: 0, y: 24 }}
                    animate={storiesInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                  >
                    <Link href={`/${operator}/${story.slug}`} style={{
                      display: 'block', background: 'var(--bg-surface)', borderRadius: 'var(--r-lg)',
                      border: '1px solid var(--bp-line)', overflow: 'hidden',
                      textDecoration: 'none', color: 'inherit', transition: 'box-shadow 0.3s, transform 0.3s',
                    }}>
                      <div style={{ height: 180, background: `url(${prop?.heroImage || ''}) center / cover no-repeat`, position: 'relative' }}>
                        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 60, background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent)' }} />
                        {prop && (
                          <span style={{
                            position: 'absolute', bottom: 12, left: 14,
                            fontFamily: 'var(--ff-display)', fontWeight: 600, fontSize: 11,
                            color: 'white', display: 'flex', alignItems: 'center', gap: 6,
                          }}>
                            <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--bp-orange)' }} />
                            {prop.name}
                          </span>
                        )}
                      </div>
                      <div style={{ padding: '16px 22px 20px' }}>
                        <p style={{ fontFamily: 'var(--ff-display)', fontWeight: 500, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--bp-teal-deep)', margin: '0 0 8px' }}>
                          Community Guide
                        </p>
                        <h3 style={{ fontFamily: 'var(--ff-display)', fontWeight: 600, fontSize: 17, lineHeight: 1.3, letterSpacing: '-0.01em', margin: '0 0 10px' }}>
                          {story.title}
                        </h3>
                        <div style={{ display: 'flex', gap: 10, alignItems: 'center', fontFamily: 'var(--ff-body)', fontSize: 12, color: 'var(--bp-ink-muted)' }}>
                          <span>{story.readTime} read</span>
                          <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'var(--bp-line)' }} />
                          <span>{new Date(story.datePublished).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* ─── FAQ ─── */}
      <section id="faq" ref={faqRef} style={{ scrollMarginTop: 60 }}>
        <div style={{ maxWidth: 720, margin: '0 auto', padding: 'clamp(64px, 9vw, 120px) clamp(16px, 3vw, 40px)' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={faqInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            style={{ textAlign: 'center', marginBottom: 40 }}
          >
            <p className="section-label" style={{ justifyContent: 'center' }}>FAQ</p>
            <h2 className="section-heading">Common questions</h2>
          </motion.div>

          <div style={{ display: 'grid', gap: 12 }}>
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={faqInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                style={{
                  padding: '20px 24px', borderRadius: 'var(--r-md)',
                  background: 'var(--bg-surface)', border: '1px solid var(--bp-line)',
                }}
              >
                <p style={{ fontFamily: 'var(--ff-display)', fontWeight: 600, fontSize: 15, color: 'var(--bp-navy)', margin: '0 0 8px' }}>{faq.q}</p>
                <p style={{ fontFamily: 'var(--ff-body)', fontSize: 14, lineHeight: 1.6, color: 'var(--bp-ink-soft)', margin: 0 }}>{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer style={{
        borderTop: '1px solid var(--bp-line)',
        padding: '28px clamp(16px, 3vw, 40px)',
        maxWidth: 1280, margin: '0 auto',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12,
      }}>
        <p style={{ fontFamily: 'var(--ff-body)', fontSize: 13, color: 'var(--bp-ink-muted)', margin: 0 }}>
          &copy; {new Date().getFullYear()} {meta.name}. All rights reserved.
        </p>
        <p style={{ fontFamily: 'var(--ff-body)', fontSize: 12, color: 'var(--bp-ink-muted)', margin: 0 }}>
          Powered by <Link href="https://brightplace.ai" style={{ color: 'var(--bp-orange)', fontFamily: 'var(--ff-display)', fontWeight: 700 }}>brightplace</Link>
        </p>
      </footer>
    </main>
  )
}
