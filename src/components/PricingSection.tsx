'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import type { OperatorData } from '@/data/operators'

export default function PricingSection({ data }: { data: OperatorData }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="pricing" ref={ref} style={{
      background: 'var(--bg-sunken)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Subtle background accent */}
      <div style={{
        position: 'absolute',
        top: -200,
        right: -200,
        width: 500,
        height: 500,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(245,166,35,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="container section-padding pricing-grid" style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 'clamp(40px, 6vw, 80px)',
        alignItems: 'center',
      }}>
        {/* Left text */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
        >
          <p className="section-label">All-in pricing</p>
          <h2 className="section-heading">{data.pricingHeadline}</h2>
          <p style={{
            fontFamily: 'var(--ff-body)',
            fontSize: 17,
            lineHeight: 1.65,
            color: 'var(--bp-ink-soft)',
            margin: '22px 0 0',
            maxWidth: '44ch',
          }}>
            {data.pricingDescription}
          </p>

          {/* Bullet points with icons */}
          <div style={{ marginTop: 32, display: 'grid', gap: 18 }}>
            {data.pricingBullets.map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                style={{
                  display: 'flex',
                  gap: 14,
                  alignItems: 'flex-start',
                }}
              >
                <div style={{
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  background: 'rgba(0,188,212,0.08)',
                  border: '1.5px solid rgba(0,188,212,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  marginTop: 1,
                }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--bp-teal-deep)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <span style={{
                  fontFamily: 'var(--ff-body)',
                  fontSize: 15,
                  lineHeight: 1.55,
                  color: 'var(--bp-ink-soft)',
                }}>
                  {b}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right price card */}
        <motion.div
          initial={{ opacity: 0, y: 40, rotateY: -4 }}
          animate={inView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.2, 0.7, 0.2, 1], delay: 0.2 }}
          style={{
            background: 'var(--bg-surface)',
            borderRadius: 'var(--r-lg)',
            padding: 'clamp(24px, 3.5vw, 36px)',
            boxShadow: 'var(--shadow-pop)',
            border: '1px solid rgba(227,221,207,0.5)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Card accent line */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 3,
            background: 'linear-gradient(90deg, var(--bp-orange), var(--bp-teal))',
          }} />

          {/* Card header */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: 12,
            paddingBottom: 18,
            borderBottom: '1px solid var(--bp-line)',
          }}>
            <div>
              <p style={{ fontFamily: 'var(--ff-display)', fontWeight: 600, fontSize: 22, margin: 0, letterSpacing: '-0.01em' }}>
                {data.samplePlan.name}
              </p>
              <p style={{ fontFamily: 'var(--ff-body)', fontSize: 13, color: 'var(--bp-ink-muted)', margin: '4px 0 0' }}>
                {data.samplePlan.details}
              </p>
            </div>
            <span style={{
              fontFamily: 'var(--ff-display)',
              fontWeight: 600,
              fontSize: 10,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              padding: '5px 12px',
              borderRadius: 'var(--r-pill)',
              whiteSpace: 'nowrap',
              color: 'var(--bp-ink-muted)',
              background: 'var(--bg-sunken)',
            }}>
              Sample
            </span>
          </div>

          {/* Breakdown rows */}
          <div style={{ marginTop: 16, display: 'grid', gap: 0 }}>
            {data.samplePlan.breakdown.map((row, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.5 + i * 0.08 }}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: 16,
                  padding: '12px 0',
                  borderBottom: '1px dashed rgba(227,221,207,0.6)',
                  fontFamily: 'var(--ff-body)',
                  fontSize: 15,
                }}
              >
                <span style={{ color: 'var(--bp-ink-soft)' }}>{row.label}</span>
                <span style={{ fontVariantNumeric: 'tabular-nums', fontWeight: 600 }}>{row.value}</span>
              </motion.div>
            ))}
          </div>

          {/* Total */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            gap: 16,
            marginTop: 20,
            paddingTop: 20,
            borderTop: '2px solid var(--bp-navy)',
          }}>
            <div>
              <p style={{ fontFamily: 'var(--ff-display)', fontWeight: 600, fontSize: 17, margin: 0 }}>
                Your all-in monthly cost
              </p>
              <p style={{ fontFamily: 'var(--ff-body)', fontSize: 12, color: 'var(--bp-ink-muted)', margin: '3px 0 0' }}>
                Before any current promotion
              </p>
            </div>
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.8, duration: 0.5, type: 'spring' }}
              style={{
                fontFamily: 'var(--ff-display)',
                fontWeight: 700,
                fontSize: 'clamp(30px, 4vw, 40px)',
                letterSpacing: '-0.02em',
                fontVariantNumeric: 'tabular-nums',
                color: 'var(--bp-orange-deep)',
              }}
            >
              {data.samplePlan.total}
            </motion.span>
          </div>

          <p style={{
            fontFamily: 'var(--ff-body)',
            fontSize: 13,
            lineHeight: 1.6,
            color: 'var(--bp-ink-muted)',
            margin: '16px 0 0',
          }}>
            {data.samplePlan.note}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
