'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import type { OperatorData } from '@/data/operators'

const amenityIcons: Record<string, string> = {
  '24-hour fitness center': 'M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z',
  'Two resort-style pools': 'M2 12h2a2 2 0 0 1 2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2a2 2 0 0 0 2 2h2',
  'On-site dog park': 'M10 5.172C10 3.782 8.423 2.679 6.5 3c-2.823.47-4.113 6.006-4 7 .137 1.217 1.5 2 2.5 2s2-.5 3-1.5c.5-.5 1-.5 1.5 0 1 1 2 1.5 3 1.5s2.363-.783 2.5-2c.113-.994-1.177-6.53-4-7C9.077 2.679 7.5 3.782 7.5 5.172',
  'Resident clubhouse': 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z',
  'Business center': 'M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z',
  'Outdoor social spaces': 'M17 8l4 4-4 4M7 8l-4 4 4 4',
}

export default function Amenities({ data }: { data: OperatorData }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="amenities" ref={ref}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        minHeight: 560,
      }} className="amenities-split">
        {/* Left panel */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.2, 0.7, 0.2, 1] }}
          style={{
            background: 'var(--bp-navy)',
            color: 'var(--bp-paper)',
            padding: 'clamp(48px, 6vw, 88px) clamp(28px, 4vw, 64px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Decorative circle */}
          <div style={{
            position: 'absolute',
            top: -80,
            right: -80,
            width: 280,
            height: 280,
            borderRadius: '50%',
            border: '1px solid rgba(250,246,239,0.04)',
            pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute',
            bottom: -120,
            left: -60,
            width: 320,
            height: 320,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0,188,212,0.05) 0%, transparent 60%)',
            pointerEvents: 'none',
          }} />

          <p style={{
            fontFamily: 'var(--ff-display)',
            fontWeight: 600,
            fontSize: 12,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--bp-orange)',
            margin: '0 0 16px',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}>
            <span style={{ width: 24, height: 2, background: 'var(--bp-orange)', borderRadius: 1, display: 'block' }} />
            Amenities
          </p>

          <h2 style={{
            fontFamily: 'var(--ff-display)',
            fontWeight: 600,
            fontSize: 'clamp(28px, 3.5vw, 44px)',
            lineHeight: 1.08,
            letterSpacing: '-0.03em',
            margin: '0 0 40px',
            color: 'var(--bp-paper)',
            maxWidth: '14ch',
          }}>
            {data.amenitiesHeadline}
          </h2>

          {/* Amenity items */}
          <div style={{ display: 'grid', gap: 20 }}>
            {data.amenities.map((a, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.08, duration: 0.5 }}
                style={{
                  display: 'flex',
                  gap: 16,
                  alignItems: 'flex-start',
                }}
              >
                <div style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: 'rgba(245,166,35,0.08)',
                  border: '1px solid rgba(245,166,35,0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <span style={{ color: 'var(--bp-orange)', fontSize: 16 }}>&#10003;</span>
                </div>
                <div>
                  <p style={{
                    fontFamily: 'var(--ff-display)',
                    fontWeight: 600,
                    fontSize: 15,
                    margin: '0 0 3px',
                    color: 'var(--bp-paper)',
                  }}>
                    {a.title}
                  </p>
                  <p style={{
                    fontFamily: 'var(--ff-body)',
                    fontSize: 13,
                    lineHeight: 1.5,
                    margin: 0,
                    color: 'rgba(250,246,239,0.55)',
                  }}>
                    {a.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right image */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.2, 0.7, 0.2, 1], delay: 0.15 }}
          style={{ position: 'relative', overflow: 'hidden' }}
        >
          <motion.div
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.8, ease: [0.2, 0.7, 0.2, 1] }}
            style={{
              width: '100%',
              height: '100%',
              minHeight: 'clamp(280px, 50vw, 480px)',
              background: `url(${data.amenityImage}) center / cover no-repeat`,
            }}
            role="img"
            aria-label={data.amenityImageAlt}
          />
          {/* Gradient overlay on image edge */}
          <div style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: 80,
            background: 'linear-gradient(90deg, rgba(26,39,68,0.15), transparent)',
            pointerEvents: 'none',
          }} />
        </motion.div>
      </div>
    </section>
  )
}
