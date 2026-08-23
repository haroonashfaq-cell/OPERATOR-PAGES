'use client'

import { useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef } from 'react'
import type { OperatorData } from '@/data/operators'

const DEFAULT_FEES = [
  { label: 'Water / sewer / trash', amount: 68 },
  { label: 'Pest control', amount: 5 },
  { label: 'Valet trash', amount: 35 },
  { label: 'Package lockers', amount: 15 },
]

const ADD_ONS = [
  { id: 'pet', label: 'Pet rent', amount: 35 },
  { id: 'parking', label: 'Covered parking', amount: 75 },
  { id: 'garage', label: 'Garage', amount: 150 },
  { id: 'storage', label: 'Storage unit', amount: 50 },
]

export default function RentCalculator({ data }: { data: OperatorData }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const fees = data.requiredFees || DEFAULT_FEES
  const REQUIRED_TOTAL = fees.reduce((sum, f) => sum + f.amount, 0)

  const [selectedPlan, setSelectedPlan] = useState(0)
  const [activeAddOns, setActiveAddOns] = useState<Set<string>>(new Set())

  const plan = data.floorPlans[selectedPlan]
  const addOnTotal = ADD_ONS.filter(a => activeAddOns.has(a.id)).reduce((sum, a) => sum + a.amount, 0)
  const total = plan.price + REQUIRED_TOTAL + addOnTotal

  const toggleAddOn = (id: string) => {
    setActiveAddOns(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <section id="pricing" ref={ref} style={{
      background: 'var(--bp-paper-deep)',
      position: 'relative',
      overflow: 'hidden',
      borderTop: '1px solid var(--bp-line)',
      borderBottom: '1px solid var(--bp-line)',
    }}>
      <div className="container section-padding">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 'clamp(40px, 5vw, 56px)' }}
        >
          <p className="section-label">All-in pricing</p>
          <h2 className="section-heading">Build your monthly cost in real time</h2>
          <p style={{
            fontFamily: 'var(--ff-body)',
            fontSize: 17,
            lineHeight: 1.6,
            color: 'var(--bp-ink-soft)',
            margin: '18px 0 0',
            maxWidth: '48ch',
          }}>
            {data.pricingDescription}
          </p>
        </motion.div>

        {/* Main layout */}
        <div className="pricing-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 400px',
          gap: 'clamp(24px, 4vw, 48px)',
          alignItems: 'start',
        }}>
          {/* Left — Plan cards + add-ons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {/* Step 1 */}
            <p style={{
              fontFamily: 'var(--ff-display)',
              fontWeight: 600,
              fontSize: 13,
              color: 'var(--bp-ink-muted)',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              margin: '0 0 14px',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}>
              <span style={{
                width: 22,
                height: 22,
                borderRadius: '50%',
                background: 'var(--bp-navy)',
                color: 'var(--bp-paper)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 11,
                fontWeight: 700,
              }}>1</span>
              Select your floor plan
            </p>

            {/* Plan cards grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(190px, 100%), 1fr))',
              gap: 10,
            }}>
              {data.floorPlans.map((p, i) => {
                const active = selectedPlan === i
                return (
                  <motion.button
                    key={p.name}
                    type="button"
                    onClick={() => setSelectedPlan(i)}
                    initial={{ opacity: 0, y: 16 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2 + i * 0.04, duration: 0.4 }}
                    whileHover={{ y: -2 }}
                    style={{
                      padding: '16px 18px',
                      borderRadius: 'var(--r-md)',
                      border: active ? '2px solid var(--bp-orange)' : '2px solid transparent',
                      background: active ? 'var(--bp-navy)' : 'var(--bg-surface)',
                      boxShadow: active ? '0 4px 20px rgba(26,39,68,0.15)' : 'var(--shadow-card)',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.25s cubic-bezier(.2,.7,.2,1)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 6,
                      minHeight: 44,
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 6 }}>
                      <span style={{
                        fontFamily: 'var(--ff-display)',
                        fontWeight: 700,
                        fontSize: 15,
                        color: active ? 'var(--bp-paper)' : 'var(--bp-navy)',
                      }}>
                        {p.name}
                      </span>
                      {p.promo && (
                        <span style={{
                          fontFamily: 'var(--ff-display)',
                          fontWeight: 700,
                          fontSize: 9,
                          letterSpacing: '0.06em',
                          textTransform: 'uppercase',
                          padding: '3px 7px',
                          borderRadius: 'var(--r-pill)',
                          background: active ? 'rgba(0,188,212,0.2)' : 'rgba(0,138,158,0.08)',
                          color: active ? 'var(--bp-teal-soft)' : 'var(--bp-teal-deep)',
                          whiteSpace: 'nowrap',
                        }}>
                          {p.promo}
                        </span>
                      )}
                    </div>

                    <span style={{
                      fontFamily: 'var(--ff-body)',
                      fontSize: 12,
                      color: active ? 'rgba(250,246,239,0.5)' : 'var(--bp-ink-muted)',
                    }}>
                      {p.beds}bd / {p.baths}ba · {p.sqft.toLocaleString()} ft²
                    </span>

                    <span style={{
                      fontFamily: 'var(--ff-display)',
                      fontWeight: 700,
                      fontSize: 18,
                      color: active ? 'var(--bp-orange)' : 'var(--bp-navy)',
                      fontVariantNumeric: 'tabular-nums',
                    }}>
                      ${p.price.toLocaleString()}
                      <span style={{
                        fontSize: 12,
                        fontWeight: 400,
                        color: active ? 'rgba(250,246,239,0.4)' : 'var(--bp-ink-muted)',
                      }}>/mo</span>
                    </span>
                  </motion.button>
                )
              })}
            </div>

            {/* Step 2 — Add-ons */}
            <p style={{
              fontFamily: 'var(--ff-display)',
              fontWeight: 600,
              fontSize: 13,
              color: 'var(--bp-ink-muted)',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              margin: '36px 0 14px',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}>
              <span style={{
                width: 22,
                height: 22,
                borderRadius: '50%',
                background: 'var(--bp-navy)',
                color: 'var(--bp-paper)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 11,
                fontWeight: 700,
              }}>2</span>
              Add extras
            </p>

            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {ADD_ONS.map((addon) => {
                const active = activeAddOns.has(addon.id)
                return (
                  <motion.button
                    key={addon.id}
                    type="button"
                    onClick={() => toggleAddOn(addon.id)}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      padding: '12px 20px',
                      borderRadius: 'var(--r-pill)',
                      border: 'none',
                      background: active ? 'var(--bp-navy)' : 'var(--bg-surface)',
                      boxShadow: active ? '0 2px 12px rgba(26,39,68,0.15)' : 'var(--shadow-card)',
                      cursor: 'pointer',
                      transition: 'all 0.25s cubic-bezier(.2,.7,.2,1)',
                      minHeight: 44,
                    }}
                  >
                    {/* Check circle */}
                    <div style={{
                      width: 20,
                      height: 20,
                      borderRadius: '50%',
                      border: `2px solid ${active ? 'var(--bp-orange)' : 'var(--bp-line)'}`,
                      background: active ? 'var(--bp-orange)' : 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      transition: 'all 0.2s',
                    }}>
                      {active && (
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--bp-navy)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      )}
                    </div>

                    <span style={{
                      fontFamily: 'var(--ff-display)',
                      fontWeight: 600,
                      fontSize: 13,
                      color: active ? 'var(--bp-paper)' : 'var(--bp-navy)',
                    }}>
                      {addon.label}
                    </span>

                    <span style={{
                      fontFamily: 'var(--ff-display)',
                      fontWeight: 600,
                      fontSize: 12,
                      color: active ? 'var(--bp-orange)' : 'var(--bp-ink-muted)',
                      fontVariantNumeric: 'tabular-nums',
                    }}>
                      +${addon.amount}
                    </span>
                  </motion.button>
                )
              })}
            </div>
          </motion.div>

          {/* Right — Sticky price card (sticky on desktop, flows on mobile) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="price-card-wrapper"
          >
            <div style={{
              background: 'var(--bg-surface)',
              borderRadius: 'var(--r-xl)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-pop)',
              border: '1px solid var(--bp-line)',
            }}>
              {/* Card header — navy band */}
              <div style={{
                padding: '20px 28px',
                background: 'var(--bp-navy)',
                color: 'var(--bp-paper)',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                  <div>
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={plan.name}
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.2 }}
                        style={{
                          fontFamily: 'var(--ff-display)',
                          fontWeight: 700,
                          fontSize: 20,
                          letterSpacing: '-0.02em',
                          margin: 0,
                        }}
                      >
                        {plan.name}
                      </motion.p>
                    </AnimatePresence>
                    <p style={{
                      fontFamily: 'var(--ff-body)',
                      fontSize: 13,
                      color: 'rgba(250,246,239,0.55)',
                      margin: '3px 0 0',
                    }}>
                      {plan.tier} · {plan.beds}bd / {plan.baths}ba · {plan.sqft.toLocaleString()} ft²
                    </p>
                  </div>
                  <motion.div
                    key={plan.img}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.35 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      width: 52,
                      height: 44,
                      background: `url(${plan.img}) center / contain no-repeat`,
                      flexShrink: 0,
                      filter: 'invert(1)',
                    }}
                  />
                </div>
              </div>

              {/* Breakdown */}
              <div style={{ padding: '4px 28px 0' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '14px 0',
                  borderBottom: '1px solid var(--bp-line)',
                  fontFamily: 'var(--ff-body)',
                  fontSize: 15,
                }}>
                  <span style={{ fontWeight: 600 }}>Base rent</span>
                  <motion.span
                    key={plan.price}
                    initial={{ opacity: 0.5 }}
                    animate={{ opacity: 1 }}
                    style={{ fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}
                  >
                    ${plan.price.toLocaleString()}
                  </motion.span>
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '12px 0',
                  borderBottom: '1px solid var(--bp-line)',
                  fontFamily: 'var(--ff-body)',
                  fontSize: 14,
                  color: 'var(--bp-ink-soft)',
                }}>
                  <span>Required fees</span>
                  <span style={{ fontVariantNumeric: 'tabular-nums', display: 'flex', alignItems: 'center', gap: 6 }}>
                    ${REQUIRED_TOTAL}
                    <span title={fees.map(f => `${f.label} ($${f.amount})`).join(' + ')} style={{
                      width: 16,
                      height: 16,
                      borderRadius: '50%',
                      background: 'var(--bg-sunken)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 10,
                      color: 'var(--bp-ink-muted)',
                      cursor: 'help',
                      fontFamily: 'var(--ff-display)',
                      fontWeight: 700,
                    }}>
                      ?
                    </span>
                  </span>
                </div>

                {/* Active add-ons */}
                <AnimatePresence>
                  {ADD_ONS.filter(a => activeAddOns.has(a.id)).map((addon) => (
                    <motion.div
                      key={addon.id}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '12px 0',
                        borderBottom: '1px solid var(--bp-line)',
                        fontFamily: 'var(--ff-body)',
                        fontSize: 14,
                        color: 'var(--bp-teal-deep)',
                      }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--bp-teal)', flexShrink: 0 }} />
                          {addon.label}
                        </span>
                        <span style={{ fontVariantNumeric: 'tabular-nums' }}>+${addon.amount}</span>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Total + CTA */}
              <div style={{ padding: '20px 28px 28px' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  paddingTop: 8,
                }}>
                  <p style={{
                    fontFamily: 'var(--ff-display)',
                    fontWeight: 600,
                    fontSize: 13,
                    color: 'var(--bp-ink-muted)',
                    margin: 0,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                  }}>
                    Total monthly
                  </p>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={total}
                      initial={{ y: 12, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -12, opacity: 0 }}
                      transition={{ duration: 0.2, ease: [0.2, 0.7, 0.2, 1] }}
                      style={{
                        fontFamily: 'var(--ff-display)',
                        fontWeight: 700,
                        fontSize: 'clamp(34px, 5vw, 46px)',
                        letterSpacing: '-0.03em',
                        fontVariantNumeric: 'tabular-nums',
                        color: 'var(--bp-navy)',
                      }}
                    >
                      ${total.toLocaleString()}
                    </motion.span>
                  </AnimatePresence>
                </div>

                {/* Promo callout */}
                {plan.promo && (
                  <div style={{
                    marginTop: 14,
                    padding: '10px 14px',
                    borderRadius: 'var(--r-sm)',
                    background: 'rgba(0,188,212,0.06)',
                    border: '1px solid rgba(0,188,212,0.12)',
                  }}>
                    <p style={{
                      fontFamily: 'var(--ff-body)',
                      fontSize: 13,
                      color: 'var(--bp-teal-deep)',
                      margin: 0,
                      lineHeight: 1.45,
                    }}>
                      Eligible for <strong>{plan.promo}</strong> — effective ~${Math.round(total * 10 / 12).toLocaleString()}/mo over 12 months
                    </p>
                  </div>
                )}

                <p style={{
                  fontFamily: 'var(--ff-body)',
                  fontSize: 12,
                  color: 'var(--bp-ink-muted)',
                  margin: '14px 0 0',
                }}>
                  Electricity and internet billed separately.
                </p>

                <a href="#tour" className="btn-primary" style={{
                  width: '100%',
                  justifyContent: 'center',
                  marginTop: 18,
                  fontSize: 15,
                  padding: '15px 28px',
                }}>
                  Lock in this rate
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

    </section>
  )
}
