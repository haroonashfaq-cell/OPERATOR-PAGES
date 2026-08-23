'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import type { OperatorData } from '@/data/operators'

export default function TourCTA({ data }: { data: OperatorData }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="tour" ref={ref} style={{ position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'relative',
        minHeight: 420,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(48px, 8vw, 100px) clamp(20px, 4vw, 48px)',
      }}>
        {/* Background */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: `url(${data.heroImage}) center 40% / cover no-repeat`,
          filter: 'brightness(0.4) saturate(0.8)',
        }} />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, rgba(15,24,48,0.7), rgba(15,24,48,0.5))',
        }} />

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
          style={{
            position: 'relative',
            maxWidth: 520,
            width: '100%',
            padding: 'clamp(36px, 5vw, 56px) clamp(28px, 4vw, 48px)',
            background: 'var(--bg-surface)',
            borderRadius: 'var(--r-xl)',
            textAlign: 'center',
            boxShadow: '0 8px 40px rgba(15,24,48,0.3), 0 0 0 1px rgba(255,255,255,0.1)',
          }}
        >
          {/* Accent top */}
          <div style={{
            position: 'absolute',
            top: -1,
            left: 'calc(50% - 40px)',
            width: 80,
            height: 4,
            borderRadius: '0 0 4px 4px',
            background: 'linear-gradient(90deg, var(--bp-orange), var(--bp-teal))',
          }} />

          <div style={{
            width: 56,
            height: 56,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(245,166,35,0.1), rgba(0,188,212,0.08))',
            border: '1.5px solid rgba(245,166,35,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--bp-orange)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          </div>

          <h2 style={{
            fontFamily: 'var(--ff-display)',
            fontWeight: 600,
            fontSize: 'clamp(22px, 3vw, 30px)',
            letterSpacing: '-0.02em',
            margin: '0 0 10px',
          }}>
            {data.tourHeadline}
          </h2>
          <p style={{
            fontFamily: 'var(--ff-body)',
            fontSize: 15,
            lineHeight: 1.6,
            color: 'var(--bp-ink-soft)',
            margin: '0 auto 32px',
            maxWidth: '36ch',
          }}>
            {data.tourDescription}
          </p>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={`mailto:${data.email}`} className="btn-primary" style={{ fontSize: 15, padding: '14px 32px' }}>
              Schedule a Tour
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
            </a>
            <a href={`tel:${data.phone}`} style={{
              fontFamily: 'var(--ff-display)',
              fontWeight: 600,
              fontSize: 14,
              padding: '14px 24px',
              borderRadius: 'var(--r-pill)',
              border: '1.5px solid var(--bp-line)',
              color: 'var(--bp-navy)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              transition: 'border-color 0.2s, background 0.2s',
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              Call us
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
