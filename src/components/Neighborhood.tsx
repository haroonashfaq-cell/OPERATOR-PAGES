'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import type { OperatorData } from '@/data/operators'

export default function Neighborhood({ data }: { data: OperatorData }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="neighborhood" ref={ref} style={{ background: 'var(--bg-page)' }}>
      <div className="container section-padding two-col-grid" style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 'clamp(40px, 6vw, 80px)',
        alignItems: 'center',
      }}>
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="section-label">Neighborhood</p>
          <h2 className="section-heading">{data.neighborhoodHeadline}</h2>
          <p style={{
            fontFamily: 'var(--ff-body)',
            fontSize: 17,
            lineHeight: 1.65,
            color: 'var(--bp-ink-soft)',
            margin: '20px 0 0',
            maxWidth: '44ch',
          }}>
            {data.neighborhoodDescription}
          </p>

          {/* Distance chips */}
          {data.distances && data.distances.length > 0 && (
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 28 }}>
            {data.distances.map((d, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '8px 16px',
                  borderRadius: 'var(--r-pill)',
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--bp-line)',
                  fontFamily: 'var(--ff-body)',
                  fontSize: 13,
                }}
              >
                <span style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: 'var(--bp-orange)',
                  flexShrink: 0,
                }} />
                <span style={{ color: 'var(--bp-ink-soft)' }}>{d.place}</span>
                <span style={{
                  fontFamily: 'var(--ff-display)',
                  fontWeight: 700,
                  fontSize: 12,
                  color: 'var(--bp-teal-deep)',
                  marginLeft: 2,
                }}>
                  {d.time}
                </span>
              </motion.div>
            ))}
          </div>
          )}
        </motion.div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, y: 40, rotate: 1 }}
          animate={inView ? { opacity: 1, y: 0, rotate: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15 }}
          style={{
            borderRadius: 'var(--r-lg)',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-pop)',
          }}
        >
          <motion.div
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
            style={{
              width: '100%',
              aspectRatio: '16/10',
              background: `url(${data.neighborhoodImage}) center / cover no-repeat`,
            }}
            role="img"
            aria-label={data.neighborhoodImageAlt}
          />
        </motion.div>
      </div>
    </section>
  )
}
