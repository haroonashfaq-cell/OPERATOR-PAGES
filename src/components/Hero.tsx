'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import type { OperatorData } from '@/data/operators'

export default function Hero({ data }: { data: OperatorData }) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const imageScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.25])
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '15%'])
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.55, 0.8])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.4 } },
  }
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.2, 0.7, 0.2, 1] } },
  }

  return (
    <section id="top" ref={ref} style={{ position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'flex-end',
      }}>
        {/* Parallax background */}
        <motion.div
          style={{ position: 'absolute', inset: -20, scale: imageScale, y: imageY }}
        >
          <div style={{
            width: '100%',
            height: '100%',
            background: `url(${data.heroImage}) center 55% / cover no-repeat`,
            filter: 'saturate(1.15) contrast(1.08)',
          }} role="img" aria-label={data.heroAlt} />
        </motion.div>

        {/* Gradient overlay */}
        <motion.div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(175deg, rgba(15,24,48,0.15) 0%, rgba(15,24,48,0.35) 40%, rgba(15,24,48,0.75) 80%, rgba(15,24,48,0.88) 100%)',
          opacity: overlayOpacity,
        }} />

        {/* Grain texture overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.03,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '128px 128px',
          pointerEvents: 'none',
        }} />

        {/* Content */}
        <motion.div
          className="container"
          variants={stagger}
          initial="hidden"
          animate="visible"
          style={{
            position: 'relative',
            width: '100%',
            paddingBottom: 'clamp(56px, 8vw, 100px)',
            paddingTop: 140,
            y: contentY,
            opacity: contentOpacity,
          }}
        >
          {/* Address pill */}
          <motion.div variants={fadeUp} style={{ marginBottom: 24 }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              fontFamily: 'var(--ff-display)',
              fontWeight: 500,
              fontSize: 12,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--bp-paper)',
              padding: '8px 18px',
              borderRadius: 'var(--r-pill)',
              background: 'rgba(255,255,255,0.08)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              {data.address}, {data.city}
            </span>
          </motion.div>

          <motion.h1 variants={fadeUp} style={{
            fontFamily: 'var(--ff-display)',
            fontWeight: 600,
            letterSpacing: '-0.04em',
            lineHeight: 1,
            fontSize: 'clamp(40px, 7vw, 80px)',
            color: 'var(--bp-paper)',
            margin: 0,
            maxWidth: '14ch',
          }}>
            {data.heroHeadline}
          </motion.h1>

          <motion.p variants={fadeUp} style={{
            fontFamily: 'var(--ff-body)',
            fontSize: 'clamp(16px, 1.6vw, 20px)',
            lineHeight: 1.6,
            color: 'rgba(250,246,239,0.82)',
            margin: '28px 0 0',
            maxWidth: '48ch',
          }}>
            {data.heroDescription}
          </motion.p>

          <motion.div variants={fadeUp} style={{
            display: 'flex',
            gap: 14,
            flexWrap: 'wrap',
            marginTop: 40,
          }}>
            <a href="#tour" className="btn-primary" style={{ fontSize: 16, padding: '16px 32px' }}>
              Schedule a Tour
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
            </a>
            <a href="#residences" className="btn-secondary" style={{ fontSize: 16, padding: '16px 32px' }}>
              Explore Floor Plans
            </a>
          </motion.div>

          {/* Quick stats bar */}
          <motion.div variants={fadeUp} style={{
            display: 'flex',
            gap: 'clamp(20px, 4vw, 48px)',
            marginTop: 'clamp(40px, 6vw, 72px)',
            paddingTop: 24,
            borderTop: '1px solid rgba(250,246,239,0.15)',
            flexWrap: 'wrap',
          }}>
            {[
              { value: `${data.floorPlans.length}`, label: 'Floor Plans' },
              { value: `$${Math.min(...data.floorPlans.map(p => p.price)).toLocaleString()}`, label: 'Starting From' },
              { value: `${Math.min(...data.floorPlans.map(p => p.sqft))}-${Math.max(...data.floorPlans.map(p => p.sqft)).toLocaleString()}`, label: 'Sq Ft Range' },
              { value: '2', label: 'Resort Pools' },
            ].map((stat, i) => (
              <div key={i}>
                <p style={{
                  fontFamily: 'var(--ff-display)',
                  fontWeight: 700,
                  fontSize: 'clamp(22px, 3vw, 32px)',
                  letterSpacing: '-0.02em',
                  color: 'var(--bp-orange)',
                  margin: '0 0 4px',
                }}>
                  {stat.value}
                </p>
                <p style={{
                  fontFamily: 'var(--ff-body)',
                  fontSize: 12,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'rgba(250,246,239,0.5)',
                  margin: 0,
                }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Promo bar */}
      {data.promoText && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          style={{
            background: 'linear-gradient(90deg, var(--bp-teal-deep) 0%, #006B7D 100%)',
            color: 'var(--bp-paper)',
          }}
        >
          <div className="container" style={{
            padding: '13px clamp(20px,4vw,48px)',
            display: 'flex',
            gap: '10px 20px',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            textAlign: 'center',
          }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              fontFamily: 'var(--ff-display)',
              fontWeight: 600,
              fontSize: 14,
            }}>
              <span style={{ fontSize: 18 }}>&#10024;</span>
              {data.promoText}
            </span>
            <a href="#residences" style={{
              fontFamily: 'var(--ff-display)',
              fontWeight: 600,
              fontSize: 13,
              color: 'var(--bp-teal-soft)',
              textDecoration: 'underline',
              textUnderlineOffset: 3,
            }}>
              See eligible plans &rarr;
            </a>
          </div>
        </motion.div>
      )}

      {/* Scroll indicator — hidden on mobile to avoid clutter */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="desktop-nav"
        style={{
          position: 'absolute',
          bottom: data.promoText ? 60 : 28,
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            width: 24,
            height: 40,
            borderRadius: 12,
            border: '1.5px solid rgba(250,246,239,0.3)',
            display: 'flex',
            justifyContent: 'center',
            paddingTop: 8,
          }}
        >
          <motion.div
            animate={{ opacity: [1, 0.3, 1], y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              width: 3,
              height: 8,
              borderRadius: 2,
              background: 'rgba(250,246,239,0.5)',
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
