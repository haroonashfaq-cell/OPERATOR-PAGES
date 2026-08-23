'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'

interface StoryProps {
  meta: {
    title: string
    metaTitle: string
    metaDescription: string
    slug: string
    primaryKeyword: string
    operator: string
    operatorName: string
    property: string
    propertyName: string
    propertySubtitle: string
    datePublished: string
    dateModified: string
    readTime: string
    heroImage: string
    heroAlt: string
  }
  children: React.ReactNode
}

export default function StoryLayout({ meta, children }: StoryProps) {
  const contentRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)
  const [headings, setHeadings] = useState<{ id: string; text: string }[]>([])
  const [activeHeading, setActiveHeading] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return
      const el = contentRef.current
      const rect = el.getBoundingClientRect()
      const total = el.scrollHeight - window.innerHeight
      const scrolled = -rect.top
      setProgress(Math.min(Math.max(scrolled / total, 0), 1))
      const h2s = el.querySelectorAll('h2[id]')
      let current = ''
      h2s.forEach((h2) => { if (h2.getBoundingClientRect().top <= 120) current = h2.id })
      if (current) setActiveHeading(current)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    if (contentRef.current) {
      const h2s = contentRef.current.querySelectorAll('h2')
      const items: { id: string; text: string }[] = []
      h2s.forEach((h2, i) => { const id = h2.id || `s-${i}`; h2.id = id; items.push({ id, text: h2.textContent || '' }) })
      setHeadings(items)
    }
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div style={{ background: 'var(--bg-page)', minHeight: '100vh' }}>
      {/* Progress bar */}
      <motion.div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 3, background: 'var(--bp-orange)', transformOrigin: 'left', scaleX: progress, zIndex: 70 }} />

      {/* Header */}
      <motion.header
        initial={{ y: -56 }} animate={{ y: 0 }} transition={{ duration: 0.5 }}
        style={{
          position: 'fixed', top: 3, left: 0, right: 0, zIndex: 60,
          background: 'rgba(250,246,239,0.96)', backdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(227,221,207,0.5)',
        }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '10px clamp(16px, 3vw, 40px)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <nav style={{ fontFamily: 'var(--ff-body)', fontSize: 13, color: 'var(--bp-ink-muted)', display: 'flex', alignItems: 'center', gap: 5 }}>
            <Link href={`/${meta.operator}`} style={{ color: 'var(--bp-teal-deep)', fontWeight: 600 }}>{meta.operatorName}</Link>
            <span style={{ color: 'var(--bp-line)', margin: '0 2px' }}>/</span>
            <Link href={`/${meta.operator}/${meta.property}`} style={{ color: 'var(--bp-ink-soft)' }}>{meta.propertyName}</Link>
          </nav>
          <Link href={`/${meta.operator}/${meta.property}`} className="btn-primary" style={{ fontSize: 12, padding: '8px 16px' }}>View property</Link>
        </div>
      </motion.header>

      {/* Hero — clean full-width image, no 3D card */}
      <div style={{ paddingTop: 50, background: 'var(--bp-navy)' }}>
        <div style={{
          width: '100%', height: 'clamp(240px, 35vh, 360px)',
          background: `url(${meta.heroImage}) center 40% / cover no-repeat`,
          filter: 'brightness(0.5) saturate(1.1)',
        }} />
      </div>

      {/* Article header card — overlaps hero bottom */}
      <div style={{ maxWidth: 700, margin: '-60px auto 0', padding: '0 clamp(16px, 3vw, 40px)', position: 'relative', zIndex: 10 }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          style={{
            background: 'var(--bg-surface)', borderRadius: 'var(--r-lg)',
            padding: 'clamp(24px, 3vw, 36px)', boxShadow: 'var(--shadow-pop)',
            border: '1px solid var(--bp-line)',
          }}
        >
          <span style={{
            display: 'inline-block', fontFamily: 'var(--ff-display)', fontWeight: 700, fontSize: 10,
            letterSpacing: '0.14em', textTransform: 'uppercase', padding: '4px 12px',
            borderRadius: 'var(--r-pill)', background: 'rgba(0,188,212,0.08)', color: 'var(--bp-teal-deep)',
            border: '1px solid rgba(0,188,212,0.15)', marginBottom: 14,
          }}>
            Community Guide
          </span>
          <h1 style={{
            fontFamily: 'var(--ff-display)', fontWeight: 600, fontSize: 'clamp(22px, 3.5vw, 32px)',
            lineHeight: 1.2, letterSpacing: '-0.02em', color: 'var(--bp-navy)', margin: '0 0 16px',
          }}>
            {meta.title}
          </h1>

          {/* Author + meta row */}
          <div style={{
            display: 'flex', gap: 14, alignItems: 'center', paddingTop: 16,
            borderTop: '1px solid var(--bp-line)', flexWrap: 'wrap',
          }}>
            {/* Author avatar */}
            <div style={{
              width: 36, height: 36, borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--bp-orange), var(--bp-orange-deep))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--ff-display)', fontWeight: 700, fontSize: 14, color: 'var(--bp-navy)',
              flexShrink: 0,
            }}>
              bp
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontFamily: 'var(--ff-display)', fontWeight: 600, fontSize: 14, margin: 0, color: 'var(--bp-navy)' }}>
                brightplace Research
              </p>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center', fontFamily: 'var(--ff-body)', fontSize: 12, color: 'var(--bp-ink-muted)', marginTop: 2 }}>
                <span>{new Date(meta.datePublished).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'var(--bp-line)' }} />
                <span>{meta.readTime} read</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Content area with centered TOC */}
      <div style={{
        maxWidth: 1200, margin: '0 auto',
        padding: 'clamp(32px, 5vw, 56px) clamp(16px, 3vw, 40px) clamp(48px, 6vw, 80px)',
        display: 'grid', gridTemplateColumns: '220px 1fr', gap: 56, alignItems: 'start',
      }} className="two-col-grid">

        {/* TOC sidebar — centered vertically */}
        <aside className="desktop-nav" style={{ position: 'sticky', top: 72, paddingTop: 4 }}>
          <p style={{
            fontFamily: 'var(--ff-display)', fontWeight: 600, fontSize: 10,
            letterSpacing: '0.18em', textTransform: 'uppercase',
            color: 'var(--bp-ink-muted)', margin: '0 0 14px', paddingLeft: 12,
          }}>
            Contents
          </p>
          <nav style={{ display: 'grid', gap: 2 }}>
            {headings.map((h) => (
              <a key={h.id} href={`#${h.id}`} style={{
                fontFamily: 'var(--ff-body)', fontSize: 13, lineHeight: 1.4,
                padding: '7px 12px', borderRadius: 'var(--r-sm)',
                color: activeHeading === h.id ? 'var(--bp-navy)' : 'var(--bp-ink-muted)',
                fontWeight: activeHeading === h.id ? 600 : 400,
                background: activeHeading === h.id ? 'var(--bg-surface)' : 'transparent',
                boxShadow: activeHeading === h.id ? '0 1px 4px rgba(26,39,68,0.06)' : 'none',
                transition: 'all 0.2s', textDecoration: 'none',
                display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
              }}>
                {h.text}
              </a>
            ))}
          </nav>

          {/* Mini property card */}
          <Link href={`/${meta.operator}/${meta.property}`} style={{
            display: 'block', marginTop: 24, padding: 12,
            borderRadius: 'var(--r-md)', background: 'var(--bg-surface)',
            border: '1px solid var(--bp-line)', textDecoration: 'none', color: 'inherit',
            transition: 'border-color 0.2s, box-shadow 0.2s',
          }}>
            <div style={{ width: '100%', aspectRatio: '16/9', borderRadius: 6, background: `url(${meta.heroImage}) center / cover no-repeat`, marginBottom: 10 }} />
            <p style={{ fontFamily: 'var(--ff-display)', fontWeight: 600, fontSize: 13, margin: '0 0 2px', color: 'var(--bp-navy)' }}>{meta.propertyName}</p>
            <p style={{ fontFamily: 'var(--ff-body)', fontSize: 11, color: 'var(--bp-ink-muted)', margin: '0 0 8px' }}>{meta.propertySubtitle}</p>
            <span style={{ fontFamily: 'var(--ff-display)', fontWeight: 600, fontSize: 12, color: 'var(--bp-teal-deep)' }}>View property &rarr;</span>
          </Link>
        </aside>

        {/* Article body */}
        <div ref={contentRef} style={{ maxWidth: 680 }}>
          <motion.article initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="story-content">
            {children}
          </motion.article>

          {/* Author box at bottom */}
          <div style={{
            marginTop: 48, padding: 24, borderRadius: 'var(--r-lg)',
            background: 'var(--bg-surface)', border: '1px solid var(--bp-line)',
            display: 'flex', gap: 16, alignItems: 'center',
          }}>
            <div style={{
              width: 48, height: 48, borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--bp-orange), var(--bp-orange-deep))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--ff-display)', fontWeight: 700, fontSize: 18, color: 'var(--bp-navy)',
              flexShrink: 0,
            }}>bp</div>
            <div>
              <p style={{ fontFamily: 'var(--ff-display)', fontWeight: 600, fontSize: 15, margin: '0 0 3px', color: 'var(--bp-navy)' }}>
                brightplace Research
              </p>
              <p style={{ fontFamily: 'var(--ff-body)', fontSize: 13, color: 'var(--bp-ink-muted)', margin: 0, lineHeight: 1.5 }}>
                brightplace creates transparent, data-driven property guides with all-in pricing to help renters make informed decisions.
              </p>
            </div>
          </div>

          {/* Bottom CTA */}
          <div style={{
            marginTop: 24, padding: 'clamp(20px, 3vw, 28px)',
            borderRadius: 'var(--r-lg)', background: 'var(--bp-navy)', color: 'var(--bp-paper)',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap',
          }}>
            <div>
              <p style={{ fontFamily: 'var(--ff-display)', fontWeight: 600, fontSize: 17, margin: '0 0 3px' }}>{meta.propertyName}</p>
              <p style={{ fontFamily: 'var(--ff-body)', fontSize: 13, color: 'rgba(250,246,239,0.5)', margin: 0 }}>Floor plans, pricing, and tours</p>
            </div>
            <Link href={`/${meta.operator}/${meta.property}`} className="btn-primary" style={{ fontSize: 13, padding: '12px 22px' }}>View property &rarr;</Link>
          </div>

          <div style={{ marginTop: 24, paddingTop: 16, borderTop: '1px solid var(--bp-line)', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
            <p style={{ fontFamily: 'var(--ff-body)', fontSize: 12, color: 'var(--bp-ink-muted)', margin: 0 }}>
              Last reviewed: {new Date(meta.dateModified).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </p>
            <p style={{ fontFamily: 'var(--ff-body)', fontSize: 12, color: 'var(--bp-ink-muted)', margin: 0 }}>
              Powered by <Link href="https://brightplace.ai" style={{ color: 'var(--bp-orange)', fontFamily: 'var(--ff-display)', fontWeight: 700 }}>brightplace</Link>
            </p>
          </div>
        </div>
      </div>

      {/* Styles */}
      <style>{`
        .story-content h2 { font-family: var(--ff-display); font-weight: 600; font-size: clamp(20px, 2.8vw, 26px); line-height: 1.2; letter-spacing: -0.02em; color: var(--bp-navy); margin: 40px 0 14px; padding-top: 28px; border-top: 1px solid var(--bp-line); scroll-margin-top: 72px; }
        .story-content h2:first-child { margin-top: 0; padding-top: 0; border-top: none; }
        .story-content p { font-family: var(--ff-body); font-size: 16px; line-height: 1.78; color: var(--bp-ink-soft); margin: 0 0 18px; }
        .story-content p:first-of-type { font-size: 17px; color: var(--bp-navy); }
        .story-content strong { color: var(--bp-navy); font-weight: 700; }
        .story-content a { color: var(--bp-teal-deep); text-decoration: underline; text-underline-offset: 3px; text-decoration-color: rgba(0,138,158,0.25); }
        .story-content a:hover { text-decoration-color: var(--bp-teal-deep); }
        .story-content .cta-inline { display: flex; align-items: center; gap: 12px; padding: 16px 20px; border-radius: var(--r-md); background: var(--bg-sunken); border: 1px solid var(--bp-line); margin: 22px 0; text-decoration: none; transition: border-color 0.2s; }
        .story-content .cta-inline:hover { border-color: var(--bp-teal); }
        .story-content .cta-inline p { font-size: 14px; margin: 0; line-height: 1.4; }
        .story-content .image-block { margin: 28px 0; border-radius: var(--r-md); overflow: hidden; }
        .story-content .image-caption { font-family: var(--ff-body); font-size: 12px; color: var(--bp-ink-muted); text-align: center; margin: 8px 0 0; font-style: italic; }
        .story-content .data-card { padding: 20px 24px; border-radius: var(--r-md); background: var(--bg-surface); border: 1px solid var(--bp-line); margin: 22px 0; box-shadow: var(--shadow-card); }
        .story-content .data-card h4 { font-family: var(--ff-display); font-weight: 600; font-size: 14px; color: var(--bp-navy); margin: 0 0 12px; }
        .story-content .data-row { display: flex; justify-content: space-between; padding: 9px 0; border-bottom: 1px dashed rgba(227,221,207,0.5); font-family: var(--ff-body); font-size: 14px; }
        .story-content .data-row:last-child { border-bottom: none; }
        .story-content .data-row span:first-child { color: var(--bp-ink-soft); }
        .story-content .data-row span:last-child { font-weight: 600; font-variant-numeric: tabular-nums; }
        .story-content .faq-section { margin-top: 40px; padding-top: 28px; border-top: 1px solid var(--bp-line); }
        .story-content .faq-item { padding: 18px 20px; margin-bottom: 10px; border-radius: var(--r-md); background: var(--bg-surface); border: 1px solid var(--bp-line); }
        .story-content .faq-item strong { font-family: var(--ff-display); font-weight: 600; font-size: 15px; display: block; margin-bottom: 6px; color: var(--bp-navy); }
        .story-content .faq-item p { font-size: 14px; margin: 0; line-height: 1.6; color: var(--bp-ink-soft); }
      `}</style>
    </div>
  )
}
