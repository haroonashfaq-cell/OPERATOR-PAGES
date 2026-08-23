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
  const heroRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)
  const [headings, setHeadings] = useState<{ id: string; text: string }[]>([])
  const [activeHeading, setActiveHeading] = useState('')

  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(heroScroll, [0, 1], ['0%', '25%'])
  const cardRotateX = useTransform(heroScroll, [0, 0.5], [8, 0])
  const cardScale = useTransform(heroScroll, [0, 0.4], [0.94, 1])

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
        initial={{ y: -60 }} animate={{ y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
        style={{
          position: 'fixed', top: 3, left: 0, right: 0, zIndex: 60,
          background: 'rgba(250,246,239,0.96)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(227,221,207,0.5)',
        }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '10px clamp(16px, 3vw, 40px)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <nav style={{ fontFamily: 'var(--ff-body)', fontSize: 13, color: 'var(--bp-ink-muted)', display: 'flex', alignItems: 'center', gap: 5 }}>
            <Link href={`/${meta.operator}`} style={{ color: 'var(--bp-teal-deep)', fontWeight: 600 }}>{meta.operatorName}</Link>
            <span style={{ color: 'var(--bp-line)', margin: '0 2px' }}>/</span>
            <Link href={`/${meta.operator}/${meta.property}`} style={{ color: 'var(--bp-ink-soft)' }}>{meta.propertyName}</Link>
          </nav>
          <Link href={`/${meta.operator}/${meta.property}`} className="btn-primary" style={{ fontSize: 12, padding: '8px 16px' }}>
            View property
          </Link>
        </div>
      </motion.header>

      {/* Hero with 3D property card */}
      <div ref={heroRef} style={{ position: 'relative', overflow: 'hidden', background: 'var(--bp-navy)' }}>
        {/* Background image */}
        <motion.div style={{ height: 'clamp(480px, 65vh, 640px)', y: heroY, position: 'relative' }}>
          <div style={{ position: 'absolute', inset: 0, background: `url(${meta.heroImage}) center / cover no-repeat`, filter: 'brightness(0.3) saturate(1.1) blur(1px)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(15,24,48,0.3) 0%, rgba(15,24,48,0.7) 60%, var(--bp-navy) 100%)' }} />
        </motion.div>

        {/* 3D Property Card floating over hero */}
        <div style={{ position: 'absolute', bottom: -60, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: 720, padding: '0 clamp(16px, 3vw, 40px)', zIndex: 10 }}>
          <motion.div
            style={{ rotateX: cardRotateX, scale: cardScale, perspective: 1200 }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.2, 0.7, 0.2, 1] }}
          >
            <div style={{
              background: 'var(--bg-surface)', borderRadius: 'var(--r-xl)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.08)',
              overflow: 'hidden',
            }}>
              {/* Card image strip */}
              <div style={{ height: 160, background: `url(${meta.heroImage}) center 40% / cover no-repeat`, position: 'relative' }}>
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 40%, rgba(255,255,255,0.9) 100%)' }} />
              </div>
              {/* Card content */}
              <div style={{ padding: '0 28px 24px', marginTop: -40, position: 'relative' }}>
                <span style={{
                  display: 'inline-block', fontFamily: 'var(--ff-display)', fontWeight: 700, fontSize: 10,
                  letterSpacing: '0.14em', textTransform: 'uppercase', padding: '5px 12px',
                  borderRadius: 'var(--r-pill)', background: 'var(--bp-orange)', color: 'var(--bp-navy)', marginBottom: 12,
                }}>
                  Community Guide
                </span>
                <h1 style={{
                  fontFamily: 'var(--ff-display)', fontWeight: 600, fontSize: 'clamp(22px, 3.5vw, 30px)',
                  lineHeight: 1.2, letterSpacing: '-0.02em', color: 'var(--bp-navy)', margin: '0 0 12px',
                }}>
                  {meta.title}
                </h1>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center', fontFamily: 'var(--ff-body)', fontSize: 13, color: 'var(--bp-ink-muted)', flexWrap: 'wrap' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                    {new Date(meta.datePublished).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                  <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'var(--bp-line)' }} />
                  <span>{meta.readTime} read</span>
                  <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'var(--bp-line)' }} />
                  <span>by <strong style={{ color: 'var(--bp-navy)' }}>brightplace</strong></span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Spacer for 3D card overflow */}
      <div style={{ height: 80 }} />

      {/* Content with TOC sidebar */}
      <div style={{
        maxWidth: 1060, margin: '0 auto',
        padding: 'clamp(24px, 4vw, 48px) clamp(16px, 3vw, 40px) clamp(48px, 6vw, 80px)',
        display: 'grid', gridTemplateColumns: '180px 1fr', gap: 40, alignItems: 'start',
      }} className="two-col-grid">

        {/* TOC sidebar */}
        <aside className="desktop-nav" style={{ position: 'sticky', top: 68 }}>
          <p style={{
            fontFamily: 'var(--ff-display)', fontWeight: 600, fontSize: 10,
            letterSpacing: '0.16em', textTransform: 'uppercase',
            color: 'var(--bp-ink-muted)', margin: '0 0 12px',
          }}>
            On this page
          </p>
          <nav style={{ display: 'grid', gap: 0 }}>
            {headings.map((h) => (
              <a key={h.id} href={`#${h.id}`} style={{
                fontFamily: 'var(--ff-body)', fontSize: 12, lineHeight: 1.35,
                padding: '6px 0 6px 10px',
                color: activeHeading === h.id ? 'var(--bp-navy)' : 'var(--bp-ink-muted)',
                fontWeight: activeHeading === h.id ? 600 : 400,
                borderLeft: `2px solid ${activeHeading === h.id ? 'var(--bp-orange)' : 'var(--bp-line)'}`,
                transition: 'color 0.2s, border-color 0.2s', textDecoration: 'none',
                display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
              }}>
                {h.text}
              </a>
            ))}
          </nav>

          {/* Mini property link */}
          <Link href={`/${meta.operator}/${meta.property}`} style={{
            display: 'block', marginTop: 20, padding: 10,
            borderRadius: 'var(--r-sm)', background: 'var(--bg-surface)', border: '1px solid var(--bp-line)',
            textDecoration: 'none', color: 'inherit', transition: 'border-color 0.2s',
          }}>
            <div style={{ width: '100%', aspectRatio: '16/9', borderRadius: 4, background: `url(${meta.heroImage}) center / cover no-repeat`, marginBottom: 8 }} />
            <p style={{ fontFamily: 'var(--ff-display)', fontWeight: 600, fontSize: 12, margin: '0 0 1px', color: 'var(--bp-navy)' }}>{meta.propertyName}</p>
            <p style={{ fontFamily: 'var(--ff-body)', fontSize: 10, color: 'var(--bp-ink-muted)', margin: 0 }}>{meta.propertySubtitle}</p>
          </Link>
        </aside>

        {/* Article */}
        <div ref={contentRef}>
          <motion.article initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.5 }} className="story-content">
            {children}
          </motion.article>

          {/* Bottom CTA */}
          <div style={{
            marginTop: 48, padding: 'clamp(20px, 3vw, 32px)',
            borderRadius: 'var(--r-lg)', background: 'var(--bp-navy)', color: 'var(--bp-paper)',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap',
          }}>
            <div>
              <p style={{ fontFamily: 'var(--ff-display)', fontWeight: 600, fontSize: 18, margin: '0 0 4px' }}>
                {meta.propertyName} {meta.propertySubtitle}
              </p>
              <p style={{ fontFamily: 'var(--ff-body)', fontSize: 13, color: 'rgba(250,246,239,0.5)', margin: 0 }}>
                Floor plans, pricing, amenities, and tours
              </p>
            </div>
            <Link href={`/${meta.operator}/${meta.property}`} className="btn-primary" style={{ fontSize: 13, padding: '12px 22px' }}>
              View property &rarr;
            </Link>
          </div>

          {/* Footer */}
          <div style={{ marginTop: 28, paddingTop: 16, borderTop: '1px solid var(--bp-line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
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
        .story-content h2 {
          font-family: var(--ff-display); font-weight: 600;
          font-size: clamp(20px, 2.8vw, 26px); line-height: 1.2;
          letter-spacing: -0.02em; color: var(--bp-navy);
          margin: 36px 0 14px; padding-top: 24px; border-top: 1px solid var(--bp-line);
          scroll-margin-top: 72px;
        }
        .story-content h2:first-child { margin-top: 0; padding-top: 0; border-top: none; }
        .story-content h3 {
          font-family: var(--ff-display); font-weight: 600;
          font-size: clamp(16px, 2vw, 19px); color: var(--bp-navy);
          margin: 24px 0 8px;
        }
        .story-content p {
          font-family: var(--ff-body); font-size: 15px; line-height: 1.75;
          color: var(--bp-ink-soft); margin: 0 0 16px;
        }
        .story-content p:first-of-type {
          font-size: 16px; line-height: 1.7; color: var(--bp-navy);
        }
        .story-content strong { color: var(--bp-navy); font-weight: 700; }
        .story-content a { color: var(--bp-teal-deep); text-decoration: underline; text-underline-offset: 3px; text-decoration-color: rgba(0,138,158,0.25); }
        .story-content a:hover { text-decoration-color: var(--bp-teal-deep); }
        .story-content .cta-inline {
          display: flex; align-items: center; gap: 10px;
          padding: 14px 18px; border-radius: var(--r-md);
          background: var(--bg-sunken); border: 1px solid var(--bp-line);
          margin: 20px 0; text-decoration: none; transition: border-color 0.2s;
        }
        .story-content .cta-inline:hover { border-color: var(--bp-teal); }
        .story-content .cta-inline p { font-size: 13px; margin: 0; line-height: 1.4; }
        .story-content .image-block { margin: 24px 0; border-radius: var(--r-sm); overflow: hidden; }
        .story-content .image-caption { font-family: var(--ff-body); font-size: 12px; color: var(--bp-ink-muted); text-align: center; margin: 6px 0 0; font-style: italic; }
        .story-content .data-card { padding: 18px 20px; border-radius: var(--r-md); background: var(--bg-surface); border: 1px solid var(--bp-line); margin: 20px 0; box-shadow: var(--shadow-card); }
        .story-content .data-card h4 { font-family: var(--ff-display); font-weight: 600; font-size: 14px; color: var(--bp-navy); margin: 0 0 10px; }
        .story-content .data-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px dashed rgba(227,221,207,0.5); font-family: var(--ff-body); font-size: 13px; }
        .story-content .data-row:last-child { border-bottom: none; }
        .story-content .data-row span:first-child { color: var(--bp-ink-soft); }
        .story-content .data-row span:last-child { font-weight: 600; font-variant-numeric: tabular-nums; }
        .story-content .faq-section { margin-top: 36px; padding-top: 24px; border-top: 1px solid var(--bp-line); }
        .story-content .faq-item { padding: 14px 0; border-bottom: 1px solid var(--bp-line); }
        .story-content .faq-item strong { font-family: var(--ff-display); font-weight: 600; font-size: 14px; display: block; margin-bottom: 5px; }
        .story-content .faq-item p { font-size: 13px; margin: 0; line-height: 1.6; }
      `}</style>
    </div>
  )
}
