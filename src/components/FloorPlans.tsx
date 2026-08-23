'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useRef } from 'react'
import type { OperatorData, FloorPlan } from '@/data/operators'

const filters = ['All', 'One Bedroom', 'Two Bedroom', 'Three Bedroom']

export default function FloorPlans({ data }: { data: OperatorData }) {
  const [activeFilter, setActiveFilter] = useState('All')
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const filtered = activeFilter === 'All'
    ? data.floorPlans
    : data.floorPlans.filter((p) => p.tier === activeFilter)

  return (
    <section id="residences" ref={ref} style={{ background: 'var(--bg-page)', position: 'relative' }}>
      <div className="container section-padding">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            gap: '24px 48px',
            alignItems: 'end',
            marginBottom: 40,
          }}
          className="two-col-grid"
        >
          <div>
            <p className="section-label">Residences</p>
            <h2 className="section-heading" style={{ maxWidth: '16ch' }}>
              Find your perfect floor plan
            </h2>
          </div>
          <p style={{
            fontFamily: 'var(--ff-serif)',
            fontStyle: 'italic',
            fontSize: 17,
            lineHeight: 1.55,
            color: 'var(--bp-ink-soft)',
            margin: 0,
            maxWidth: '32ch',
            alignSelf: 'end',
          }}>
            Granite countertops, in-home washer and dryer, private balconies and patios in every home.
          </p>
        </motion.div>

        {/* Filter bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.5 }}
          style={{
            display: 'flex',
            gap: 8,
            flexWrap: 'wrap',
            alignItems: 'center',
            padding: '12px 16px',
            background: 'var(--bg-surface)',
            borderRadius: 'var(--r-lg)',
            border: '1px solid var(--bp-line)',
            boxShadow: '0 1px 4px rgba(26,39,68,0.04)',
            marginBottom: 32,
          }}
        >
          {filters.map((f) => {
            const isActive = activeFilter === f
            return (
              <button
                key={f}
                type="button"
                onClick={() => setActiveFilter(f)}
                style={{
                  fontFamily: 'var(--ff-display)',
                  fontWeight: 600,
                  fontSize: 13,
                  padding: '9px 18px',
                  borderRadius: 'var(--r-pill)',
                  border: 'none',
                  background: isActive ? 'var(--bp-navy)' : 'transparent',
                  color: isActive ? 'var(--bp-paper)' : 'var(--bp-ink-soft)',
                  cursor: 'pointer',
                  transition: 'all 0.25s cubic-bezier(.2,.7,.2,1)',
                  position: 'relative',
                }}
              >
                {f}
              </button>
            )
          })}
          <span style={{
            fontFamily: 'var(--ff-body)',
            fontSize: 13,
            color: 'var(--bp-ink-muted)',
            marginLeft: 'auto',
            paddingRight: 4,
          }}>
            {filtered.length} {filtered.length === 1 ? 'plan' : 'plans'} available
          </span>
        </motion.div>

        {/* Cards */}
        <motion.div
          layout
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(280px, 100%), 1fr))',
            gap: 20,
          }}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((plan, i) => (
              <FloorPlanCard key={plan.name} plan={plan} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}

function FloorPlanCard({ plan, index }: { plan: FloorPlan; index: number }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: [0.2, 0.7, 0.2, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'var(--bg-surface)',
        borderRadius: 'var(--r-lg)',
        border: `1.5px solid ${hovered ? 'var(--bp-teal)' : 'var(--bp-line)'}`,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: hovered ? 'var(--shadow-pop)' : 'var(--shadow-card)',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        transition: 'border-color 0.3s, box-shadow 0.35s, transform 0.35s cubic-bezier(.2,.7,.2,1)',
      }}
    >
      {/* Plan image */}
      <div style={{
        background: 'var(--bg-sunken)',
        padding: 24,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 200,
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Background pattern */}
        <div style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.03,
          backgroundImage: 'radial-gradient(circle at 1px 1px, var(--bp-navy) 1px, transparent 0)',
          backgroundSize: '20px 20px',
        }} />
        <motion.div
          animate={{ scale: hovered ? 1.06 : 1 }}
          transition={{ duration: 0.4 }}
          style={{
            width: '100%',
            height: 170,
            background: `url(${plan.img}) center / contain no-repeat`,
            position: 'relative',
          }}
          role="img"
          aria-label={plan.imgAlt}
        />
      </div>

      <div style={{ padding: '22px 24px 24px', display: 'flex', flexDirection: 'column', gap: 14, flex: 1 }}>
        {/* Tier + name + promo */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10 }}>
          <div>
            <p style={{
              fontFamily: 'var(--ff-display)',
              fontWeight: 500,
              fontSize: 11,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--bp-teal-deep)',
              margin: '0 0 5px',
            }}>
              {plan.tier}
            </p>
            <p style={{
              fontFamily: 'var(--ff-display)',
              fontWeight: 700,
              fontSize: 22,
              letterSpacing: '-0.02em',
              margin: 0,
            }}>
              {plan.name}
            </p>
          </div>
          {plan.promo && (
            <span style={{
              fontFamily: 'var(--ff-display)',
              fontWeight: 700,
              fontSize: 10,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              padding: '5px 11px',
              borderRadius: 'var(--r-pill)',
              whiteSpace: 'nowrap',
              background: 'linear-gradient(135deg, rgba(0,188,212,0.12), rgba(0,188,212,0.06))',
              color: 'var(--bp-teal-deep)',
              border: '1px solid rgba(0,188,212,0.25)',
            }}>
              {plan.promo}
            </span>
          )}
        </div>

        {/* Specs row */}
        <div style={{
          display: 'flex',
          gap: 0,
          fontFamily: 'var(--ff-body)',
          fontSize: 13,
          color: 'var(--bp-ink-soft)',
          paddingBottom: 14,
          borderBottom: '1px solid var(--bp-line)',
        }}>
          {[`${plan.beds} Bed`, `${plan.baths} Bath`, `${plan.sqft.toLocaleString()} Sq Ft`].map((spec, i) => (
            <span key={i} style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}>
              {i > 0 && <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'var(--bp-line)', margin: '0 6px' }} />}
              {spec}
            </span>
          ))}
        </div>

        {/* Price */}
        <div>
          <p style={{ fontFamily: 'var(--ff-body)', fontSize: 11, color: 'var(--bp-ink-muted)', margin: 0, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            All-in from
          </p>
          <p style={{
            fontFamily: 'var(--ff-display)',
            fontWeight: 700,
            fontSize: 28,
            letterSpacing: '-0.02em',
            margin: '3px 0 0',
            fontVariantNumeric: 'tabular-nums',
          }}>
            ${plan.price.toLocaleString()}
            <span style={{ fontFamily: 'var(--ff-body)', fontWeight: 400, fontSize: 14, color: 'var(--bp-ink-muted)', marginLeft: 2 }}>/mo</span>
          </p>
        </div>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: 8, marginTop: 'auto', paddingTop: 6 }}>
          <a href="#tour" className="btn-outline" style={{ flex: 1, padding: '12px 14px', fontSize: 13, minHeight: 44 }}>
            Check availability
          </a>
          <a href="#tour" className="btn-dark" style={{ flex: 1, padding: '12px 14px', fontSize: 13, minHeight: 44 }}>
            Schedule tour
          </a>
        </div>
      </div>
    </motion.article>
  )
}
