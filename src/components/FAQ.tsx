'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useRef } from 'react'
import type { OperatorData } from '@/data/operators'

export default function FAQ({ data }: { data: OperatorData }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="faq" ref={ref} style={{
      background: 'var(--bg-sunken)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Decorative shapes */}
      <div style={{
        position: 'absolute',
        top: 60,
        left: -100,
        width: 300,
        height: 300,
        borderRadius: '50%',
        border: '1px solid rgba(227,221,207,0.5)',
        pointerEvents: 'none',
      }} />

      <div className="container section-padding" style={{ maxWidth: 820, position: 'relative' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 52 }}
        >
          <p className="section-label" style={{ justifyContent: 'center' }}>FAQ</p>
          <h2 className="section-heading">Common questions, clear answers</h2>
          <p style={{
            fontFamily: 'var(--ff-body)',
            fontSize: 16,
            color: 'var(--bp-ink-muted)',
            margin: '14px auto 0',
            maxWidth: '40ch',
          }}>
            Everything you need to know before your visit.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gap: 0 }}>
          {data.faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.06, duration: 0.4 }}
            >
              <FAQItem
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                index={i}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
  index,
}: {
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
  index: number
}) {
  return (
    <div style={{
      background: isOpen ? 'var(--bg-surface)' : 'transparent',
      borderRadius: isOpen ? 'var(--r-md)' : 0,
      border: isOpen ? '1px solid var(--bp-line)' : 'none',
      borderBottom: isOpen ? '1px solid var(--bp-line)' : '1px solid var(--bp-line)',
      marginBottom: isOpen ? 8 : 0,
      transition: 'background 0.3s, border-radius 0.3s, margin 0.3s',
      boxShadow: isOpen ? '0 2px 12px rgba(26,39,68,0.04)' : 'none',
    }}>
      <button
        type="button"
        onClick={onToggle}
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 20,
          padding: isOpen ? '20px 24px 0' : '18px 12px',
          minHeight: 56,
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          transition: 'padding 0.3s',
        }}
      >
        <span style={{
          fontFamily: 'var(--ff-display)',
          fontWeight: 600,
          fontSize: 'clamp(15px, 1.8vw, 17px)',
          color: isOpen ? 'var(--bp-navy)' : 'var(--bp-ink-soft)',
          transition: 'color 0.2s',
          lineHeight: 1.35,
        }}>
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.2, 0.7, 0.2, 1] }}
          style={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            background: isOpen ? 'var(--bp-navy)' : 'rgba(26,39,68,0.04)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            transition: 'background 0.3s',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={isOpen ? 'var(--bp-paper)' : 'var(--bp-ink-muted)'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 9l6 6 6-6"/>
          </svg>
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.2, 0.7, 0.2, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <p style={{
              fontFamily: 'var(--ff-body)',
              fontSize: 15,
              lineHeight: 1.7,
              color: 'var(--bp-ink-soft)',
              margin: 0,
              padding: '14px 24px 22px',
              maxWidth: '56ch',
            }}>
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
