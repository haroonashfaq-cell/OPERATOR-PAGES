'use client'

import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import type { PropertyData } from '@/data/operators'

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
  propertyData?: PropertyData
  children: React.ReactNode
}

export default function StoryLayout({ meta, propertyData, children }: StoryProps) {
  const heroRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)
  const [headings, setHeadings] = useState<{ id: string; text: string }[]>([])
  const [activeHeading, setActiveHeading] = useState('')

  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const heroY = useTransform(heroScroll, [0, 1], ['0%', '30%'])
  const heroOpacity = useTransform(heroScroll, [0, 0.8], [1, 0])

  // Reading progress + heading extraction
  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return
      const el = contentRef.current
      const rect = el.getBoundingClientRect()
      const total = el.scrollHeight - window.innerHeight
      const scrolled = -rect.top
      setProgress(Math.min(Math.max(scrolled / total, 0), 1))

      // Active heading tracking
      const h2s = el.querySelectorAll('h2[id]')
      let current = ''
      h2s.forEach((h2) => {
        const rect = h2.getBoundingClientRect()
        if (rect.top <= 120) current = h2.id
      })
      if (current) setActiveHeading(current)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })

    // Extract headings after mount
    if (contentRef.current) {
      const h2s = contentRef.current.querySelectorAll('h2')
      const items: { id: string; text: string }[] = []
      h2s.forEach((h2, i) => {
        const id = h2.id || `section-${i}`
        h2.id = id
        items.push({ id, text: h2.textContent || '' })
      })
      setHeadings(items)
    }

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div style={{ background: 'var(--bg-page)', minHeight: '100vh' }}>
      {/* Reading progress bar */}
      <motion.div style={{
        position: 'fixed', top: 0, left: 0, right: 0, height: 3,
        background: 'var(--bp-orange)', transformOrigin: 'left', scaleX: progress, zIndex: 70,
      }} />

      {/* Sticky header */}
      <motion.header
        initial={{ y: -60 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        style={{
          position: 'fixed', top: 3, left: 0, right: 0, zIndex: 60,
          background: 'rgba(250,246,239,0.95)',
          backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(227,221,207,0.6)',
        }}
      >
        <div style={{
          maxWidth: 1280, margin: '0 auto',
          padding: '11px clamp(20px, 4vw, 48px)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <nav style={{
            fontFamily: 'var(--ff-body)', fontSize: 13, color: 'var(--bp-ink-muted)',
            display: 'flex', alignItems: 'center', gap: 6,
          }}>
            <Link href={`/${meta.operator}`} style={{ color: 'var(--bp-teal-deep)', fontWeight: 600 }}>
              {meta.operatorName}
            </Link>
            <span style={{ color: 'var(--bp-line)' }}>/</span>
            <Link href={`/${meta.operator}/${meta.property}`} style={{ color: 'var(--bp-ink-soft)' }}>
              {meta.propertyName}
            </Link>
            <span style={{ color: 'var(--bp-line)' }}>/</span>
            <span>Stories</span>
          </nav>
          <Link href={`/${meta.operator}/${meta.property}`} className="btn-primary" style={{ fontSize: 12, padding: '8px 18px' }}>
            View property
          </Link>
        </div>
      </motion.header>

      {/* Hero */}
      <div ref={heroRef} style={{ position: 'relative', overflow: 'hidden' }}>
        <motion.div style={{ height: 'clamp(360px, 50vh, 500px)', y: heroY, position: 'relative' }}>
          <div style={{
            position: 'absolute', inset: 0,
            background: `url(${meta.heroImage}) center / cover no-repeat`,
            filter: 'brightness(0.4) saturate(1.1)',
          }} />
        </motion.div>

        <motion.div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          padding: 'clamp(28px, 4vw, 56px) clamp(20px, 4vw, 48px)', opacity: heroOpacity,
        }}>
          <div style={{ maxWidth: 680, margin: '0 auto' }}>
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                fontFamily: 'var(--ff-display)', fontWeight: 600, fontSize: 11,
                letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--bp-orange)',
                marginBottom: 14,
              }}
            >
              <span style={{ width: 16, height: 2, background: 'var(--bp-orange)', borderRadius: 1 }} />
              Community Guide
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              style={{
                fontFamily: 'var(--ff-display)', fontWeight: 600,
                fontSize: 'clamp(28px, 4.5vw, 44px)', lineHeight: 1.12,
                letterSpacing: '-0.03em', color: 'var(--bp-paper)', margin: '0 0 16px',
              }}
            >
              {meta.title}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              style={{
                display: 'flex', gap: 14, alignItems: 'center',
                fontFamily: 'var(--ff-body)', fontSize: 13, color: 'rgba(250,246,239,0.55)',
                flexWrap: 'wrap',
              }}
            >
              <span>{new Date(meta.datePublished).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'rgba(250,246,239,0.3)' }} />
              <span>{meta.readTime} read</span>
              <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'rgba(250,246,239,0.3)' }} />
              <span>by brightplace</span>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Main content with sidebar TOC */}
      <div style={{
        maxWidth: 1100, margin: '0 auto',
        padding: 'clamp(36px, 5vw, 64px) clamp(20px, 4vw, 48px) clamp(60px, 8vw, 100px)',
        display: 'grid',
        gridTemplateColumns: '200px 1fr',
        gap: 48,
        alignItems: 'start',
      }} className="two-col-grid">

        {/* Left sidebar — Table of Contents */}
        <aside className="desktop-nav" style={{
          position: 'sticky', top: 72,
          paddingTop: 8,
        }}>
          <p style={{
            fontFamily: 'var(--ff-display)', fontWeight: 600, fontSize: 11,
            letterSpacing: '0.14em', textTransform: 'uppercase',
            color: 'var(--bp-ink-muted)', margin: '0 0 14px',
          }}>
            On this page
          </p>
          <nav style={{ display: 'grid', gap: 0 }}>
            {headings.map((h) => (
              <a
                key={h.id}
                href={`#${h.id}`}
                style={{
                  fontFamily: 'var(--ff-body)',
                  fontSize: 13,
                  lineHeight: 1.4,
                  padding: '7px 0 7px 12px',
                  color: activeHeading === h.id ? 'var(--bp-navy)' : 'var(--bp-ink-muted)',
                  fontWeight: activeHeading === h.id ? 600 : 400,
                  borderLeft: `2px solid ${activeHeading === h.id ? 'var(--bp-orange)' : 'var(--bp-line)'}`,
                  transition: 'color 0.2s, border-color 0.2s',
                  textDecoration: 'none',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {h.text}
              </a>
            ))}
          </nav>

          {/* Mini property card in sidebar */}
          <Link href={`/${meta.operator}/${meta.property}`} style={{
            display: 'block', marginTop: 24, padding: 14,
            borderRadius: 'var(--r-md)', background: 'var(--bg-surface)',
            border: '1px solid var(--bp-line)', textDecoration: 'none', color: 'inherit',
            transition: 'border-color 0.2s',
          }}>
            <div style={{
              width: '100%', aspectRatio: '16/9', borderRadius: 'var(--r-sm)',
              background: `url(${meta.heroImage}) center / cover no-repeat`,
              marginBottom: 10,
            }} />
            <p style={{ fontFamily: 'var(--ff-display)', fontWeight: 600, fontSize: 13, margin: '0 0 2px', color: 'var(--bp-navy)' }}>
              {meta.propertyName}
            </p>
            <p style={{ fontFamily: 'var(--ff-body)', fontSize: 11, color: 'var(--bp-ink-muted)', margin: 0 }}>
              {meta.propertySubtitle}
            </p>
          </Link>
        </aside>

        {/* Right — Article content */}
        <div ref={contentRef}>
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="story-content"
          >
            {children}
          </motion.article>

          {/* Bottom property CTA */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              marginTop: 48, padding: 'clamp(24px, 3vw, 36px)',
              borderRadius: 'var(--r-xl)', background: 'var(--bp-navy)', color: 'var(--bp-paper)',
              display: 'grid', gridTemplateColumns: '1fr auto', gap: 20, alignItems: 'center',
            }}
            className="two-col-grid"
          >
            <div>
              <p style={{
                fontFamily: 'var(--ff-display)', fontWeight: 500, fontSize: 11,
                letterSpacing: '0.14em', textTransform: 'uppercase',
                color: 'var(--bp-orange)', margin: '0 0 6px',
              }}>
                Explore {meta.propertyName}
              </p>
              <p style={{
                fontFamily: 'var(--ff-display)', fontWeight: 600,
                fontSize: 'clamp(18px, 2.5vw, 24px)', letterSpacing: '-0.02em', margin: '0 0 6px',
              }}>
                {meta.propertyName} {meta.propertySubtitle}
              </p>
              <p style={{ fontFamily: 'var(--ff-body)', fontSize: 13, color: 'rgba(250,246,239,0.5)', margin: 0 }}>
                Floor plans, pricing, amenities, and tours
              </p>
            </div>
            <Link href={`/${meta.operator}/${meta.property}`} className="btn-primary" style={{ fontSize: 13, padding: '12px 24px' }}>
              View property
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
            </Link>
          </motion.div>

          {/* Footer */}
          <div style={{
            marginTop: 32, paddingTop: 20, borderTop: '1px solid var(--bp-line)',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            flexWrap: 'wrap', gap: 12,
          }}>
            <p style={{ fontFamily: 'var(--ff-body)', fontSize: 12, color: 'var(--bp-ink-muted)', margin: 0 }}>
              Last reviewed: {new Date(meta.dateModified).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </p>
            <p style={{ fontFamily: 'var(--ff-body)', fontSize: 12, color: 'var(--bp-ink-muted)', margin: 0 }}>
              Powered by <Link href="https://brightplace.ai" style={{ color: 'var(--bp-orange)', fontFamily: 'var(--ff-display)', fontWeight: 700 }}>brightplace</Link>
            </p>
          </div>
        </div>
      </div>

      {/* Story content styles */}
      <style>{`
        .story-content h2 {
          font-family: var(--ff-display); font-weight: 600;
          font-size: clamp(22px, 3vw, 28px); line-height: 1.15;
          letter-spacing: -0.02em; color: var(--bp-navy);
          margin: 44px 0 16px; padding-top: 28px; border-top: 1px solid var(--bp-line);
          scroll-margin-top: 80px;
        }
        .story-content h2:first-child { margin-top: 0; padding-top: 0; border-top: none; }
        .story-content h3 {
          font-family: var(--ff-display); font-weight: 600;
          font-size: clamp(17px, 2vw, 20px); color: var(--bp-navy);
          margin: 28px 0 10px;
        }
        .story-content p {
          font-family: var(--ff-body); font-size: 16px; line-height: 1.78;
          color: var(--bp-ink-soft); margin: 0 0 18px;
        }
        .story-content p:first-of-type {
          font-size: 18px; line-height: 1.72; color: var(--bp-navy);
        }
        .story-content strong { color: var(--bp-navy); font-weight: 700; }
        .story-content a {
          color: var(--bp-teal-deep); text-decoration: underline;
          text-underline-offset: 3px; text-decoration-color: rgba(0,138,158,0.3);
          transition: text-decoration-color 0.2s;
        }
        .story-content a:hover { text-decoration-color: var(--bp-teal-deep); }
        .story-content .cta-inline {
          display: flex; align-items: center; gap: 12px;
          padding: 18px 22px; border-radius: var(--r-lg);
          background: var(--bg-sunken); border: 1px solid var(--bp-line);
          margin: 24px 0; text-decoration: none;
          transition: border-color 0.2s;
        }
        .story-content .cta-inline:hover { border-color: var(--bp-teal); }
        .story-content .cta-inline p { font-size: 14px; margin: 0; line-height: 1.5; }
        .story-content .image-block {
          margin: 28px 0; border-radius: var(--r-md); overflow: hidden;
        }
        .story-content .image-caption {
          font-family: var(--ff-body); font-size: 13px;
          color: var(--bp-ink-muted); text-align: center;
          margin: 8px 0 0; font-style: italic;
        }
        .story-content .data-card {
          padding: 22px 24px; border-radius: var(--r-lg);
          background: var(--bg-surface); border: 1px solid var(--bp-line);
          margin: 24px 0; box-shadow: var(--shadow-card);
        }
        .story-content .data-card h4 {
          font-family: var(--ff-display); font-weight: 600;
          font-size: 15px; color: var(--bp-navy); margin: 0 0 12px;
        }
        .story-content .data-row {
          display: flex; justify-content: space-between;
          padding: 9px 0; border-bottom: 1px dashed rgba(227,221,207,0.6);
          font-family: var(--ff-body); font-size: 14px;
        }
        .story-content .data-row:last-child { border-bottom: none; }
        .story-content .data-row span:first-child { color: var(--bp-ink-soft); }
        .story-content .data-row span:last-child { font-weight: 600; font-variant-numeric: tabular-nums; }
        .story-content .faq-section { margin-top: 44px; padding-top: 28px; border-top: 1px solid var(--bp-line); }
        .story-content .faq-item { padding: 16px 0; border-bottom: 1px solid var(--bp-line); }
        .story-content .faq-item strong {
          font-family: var(--ff-display); font-weight: 600;
          font-size: 15px; display: block; margin-bottom: 6px;
        }
        .story-content .faq-item p { font-size: 14px; margin: 0; line-height: 1.65; }
      `}</style>
    </div>
  )
}
