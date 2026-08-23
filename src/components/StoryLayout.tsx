'use client'

import { motion, useScroll, useTransform, useInView } from 'framer-motion'
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
  const heroRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const heroY = useTransform(heroScroll, [0, 1], ['0%', '30%'])
  const heroOpacity = useTransform(heroScroll, [0, 0.8], [1, 0])

  // Reading progress bar
  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return
      const el = contentRef.current
      const rect = el.getBoundingClientRect()
      const total = el.scrollHeight - window.innerHeight
      const scrolled = -rect.top
      setProgress(Math.min(Math.max(scrolled / total, 0), 1))
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div style={{ background: 'var(--bg-page)', minHeight: '100vh' }}>
      {/* Reading progress bar */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: 'var(--bp-orange)',
          transformOrigin: 'left',
          scaleX: progress,
          zIndex: 70,
        }}
      />

      {/* Sticky header */}
      <motion.header
        initial={{ y: -60 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        style={{
          position: 'fixed',
          top: 3,
          left: 0,
          right: 0,
          zIndex: 60,
          background: 'rgba(250,246,239,0.95)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(227,221,207,0.6)',
        }}
      >
        <div style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '12px clamp(20px, 4vw, 48px)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          {/* Breadcrumb */}
          <nav style={{
            fontFamily: 'var(--ff-body)',
            fontSize: 13,
            color: 'var(--bp-ink-muted)',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
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
        <motion.div style={{
          height: 'clamp(400px, 55vh, 560px)',
          y: heroY,
          position: 'relative',
        }}>
          <div style={{
            position: 'absolute',
            inset: 0,
            background: `url(${meta.heroImage}) center / cover no-repeat`,
            filter: 'brightness(0.45) saturate(1.1)',
          }} />
        </motion.div>

        {/* Hero content overlay */}
        <motion.div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: 'clamp(32px, 5vw, 64px) clamp(20px, 4vw, 48px)',
            opacity: heroOpacity,
          }}
        >
          <div style={{ maxWidth: 760, margin: '0 auto' }}>
            {/* Category tag */}
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                fontFamily: 'var(--ff-display)',
                fontWeight: 600,
                fontSize: 11,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'var(--bp-orange)',
                marginBottom: 16,
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
                fontFamily: 'var(--ff-display)',
                fontWeight: 600,
                fontSize: 'clamp(32px, 5vw, 52px)',
                lineHeight: 1.08,
                letterSpacing: '-0.03em',
                color: 'var(--bp-paper)',
                margin: '0 0 18px',
              }}
            >
              {meta.title}
            </motion.h1>

            {/* Meta row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              style={{
                display: 'flex',
                gap: 16,
                alignItems: 'center',
                fontFamily: 'var(--ff-body)',
                fontSize: 13,
                color: 'rgba(250,246,239,0.6)',
                flexWrap: 'wrap',
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                {new Date(meta.datePublished).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
              <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'rgba(250,246,239,0.3)' }} />
              <span>{meta.readTime} read</span>
              <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'rgba(250,246,239,0.3)' }} />
              <span>by brightplace</span>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Article body */}
      <div ref={contentRef} style={{
        maxWidth: 760,
        margin: '0 auto',
        padding: 'clamp(40px, 6vw, 72px) clamp(20px, 4vw, 48px) clamp(60px, 8vw, 100px)',
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="story-content"
        >
          {children}
        </motion.div>

        {/* Property CTA card at bottom */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            marginTop: 56,
            padding: 'clamp(28px, 4vw, 40px)',
            borderRadius: 'var(--r-xl)',
            background: 'var(--bp-navy)',
            color: 'var(--bp-paper)',
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            gap: 24,
            alignItems: 'center',
          }}
          className="two-col-grid"
        >
          <div>
            <p style={{
              fontFamily: 'var(--ff-display)',
              fontWeight: 500,
              fontSize: 11,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--bp-orange)',
              margin: '0 0 8px',
            }}>
              Explore {meta.propertyName}
            </p>
            <p style={{
              fontFamily: 'var(--ff-display)',
              fontWeight: 600,
              fontSize: 'clamp(20px, 3vw, 26px)',
              letterSpacing: '-0.02em',
              margin: '0 0 8px',
            }}>
              {meta.propertyName} {meta.propertySubtitle}
            </p>
            <p style={{
              fontFamily: 'var(--ff-body)',
              fontSize: 14,
              color: 'rgba(250,246,239,0.55)',
              margin: 0,
              lineHeight: 1.5,
            }}>
              View floor plans, pricing, amenities, and schedule a tour.
            </p>
          </div>
          <Link href={`/${meta.operator}/${meta.property}`} className="btn-primary" style={{ fontSize: 14, padding: '14px 28px' }}>
            View property
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
          </Link>
        </motion.div>

        {/* Footer */}
        <div style={{
          marginTop: 40,
          paddingTop: 24,
          borderTop: '1px solid var(--bp-line)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 12,
        }}>
          <p style={{ fontFamily: 'var(--ff-body)', fontSize: 12, color: 'var(--bp-ink-muted)', margin: 0 }}>
            Last reviewed: {new Date(meta.dateModified).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </p>
          <p style={{ fontFamily: 'var(--ff-body)', fontSize: 12, color: 'var(--bp-ink-muted)', margin: 0 }}>
            Powered by <Link href="https://brightplace.ai" style={{ color: 'var(--bp-orange)', fontFamily: 'var(--ff-display)', fontWeight: 700 }}>brightplace</Link>
          </p>
        </div>
      </div>

      {/* Story content styles */}
      <style>{`
        .story-content h2 {
          font-family: var(--ff-display);
          font-weight: 600;
          font-size: clamp(24px, 3.5vw, 32px);
          line-height: 1.12;
          letter-spacing: -0.02em;
          color: var(--bp-navy);
          margin: 48px 0 18px;
          padding-top: 32px;
          border-top: 1px solid var(--bp-line);
        }
        .story-content h2:first-child {
          margin-top: 0;
          padding-top: 0;
          border-top: none;
        }
        .story-content h3 {
          font-family: var(--ff-display);
          font-weight: 600;
          font-size: clamp(18px, 2.5vw, 22px);
          color: var(--bp-navy);
          margin: 32px 0 12px;
        }
        .story-content p {
          font-family: var(--ff-body);
          font-size: 17px;
          line-height: 1.75;
          color: var(--bp-ink-soft);
          margin: 0 0 20px;
        }
        .story-content p:first-of-type {
          font-size: 19px;
          line-height: 1.7;
          color: var(--bp-navy);
          font-weight: 400;
        }
        .story-content strong {
          color: var(--bp-navy);
          font-weight: 700;
        }
        .story-content a {
          color: var(--bp-teal-deep);
          text-decoration: underline;
          text-underline-offset: 3px;
          text-decoration-color: rgba(0,138,158,0.3);
          transition: text-decoration-color 0.2s;
        }
        .story-content a:hover {
          text-decoration-color: var(--bp-teal-deep);
        }
        .story-content .cta-inline {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 20px 24px;
          border-radius: var(--r-lg);
          background: var(--bg-sunken);
          border: 1px solid var(--bp-line);
          margin: 28px 0;
          text-decoration: none;
        }
        .story-content .cta-inline:hover {
          border-color: var(--bp-teal);
        }
        .story-content .cta-inline p {
          font-size: 14px;
          margin: 0;
          line-height: 1.5;
        }
        .story-content .image-block {
          margin: 32px -24px;
          border-radius: var(--r-md);
          overflow: hidden;
        }
        .story-content .image-block img,
        .story-content .image-block > div {
          width: 100%;
          border-radius: var(--r-md);
        }
        .story-content .image-caption {
          font-family: var(--ff-body);
          font-size: 13px;
          color: var(--bp-ink-muted);
          text-align: center;
          margin: 10px 0 0;
          font-style: italic;
        }
        .story-content .data-card {
          padding: 24px 28px;
          border-radius: var(--r-lg);
          background: var(--bg-surface);
          border: 1px solid var(--bp-line);
          margin: 28px 0;
          box-shadow: var(--shadow-card);
        }
        .story-content .data-card h4 {
          font-family: var(--ff-display);
          font-weight: 600;
          font-size: 16px;
          color: var(--bp-navy);
          margin: 0 0 14px;
        }
        .story-content .data-row {
          display: flex;
          justify-content: space-between;
          padding: 10px 0;
          border-bottom: 1px dashed rgba(227,221,207,0.6);
          font-family: var(--ff-body);
          font-size: 15px;
        }
        .story-content .data-row:last-child {
          border-bottom: none;
        }
        .story-content .data-row span:first-child {
          color: var(--bp-ink-soft);
        }
        .story-content .data-row span:last-child {
          font-weight: 600;
          font-variant-numeric: tabular-nums;
        }
        .story-content .faq-section {
          margin-top: 48px;
          padding-top: 32px;
          border-top: 1px solid var(--bp-line);
        }
        .story-content .faq-item {
          padding: 18px 0;
          border-bottom: 1px solid var(--bp-line);
        }
        .story-content .faq-item strong {
          font-family: var(--ff-display);
          font-weight: 600;
          font-size: 16px;
          display: block;
          margin-bottom: 8px;
        }
        .story-content .faq-item p {
          font-size: 15px;
          margin: 0;
          line-height: 1.65;
        }
        @media (max-width: 768px) {
          .story-content .image-block { margin: 24px 0; }
        }
      `}</style>
    </div>
  )
}
