'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import type { OperatorData } from '@/data/operators'

interface HeaderProps {
  data: OperatorData
  operatorSlug?: string
  propertySlug?: string
}

export default function Header({ data, operatorSlug, propertySlug }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 60)
  })

  const storyUrl = operatorSlug && propertySlug
    ? `/${operatorSlug}/${propertySlug}-stories`
    : undefined

  const navLinks = [
    { href: '#residences', label: 'Residences' },
    { href: '#amenities', label: 'Amenities' },
    { href: '#neighborhood', label: 'Neighborhood' },
    { href: '#gallery', label: 'Gallery' },
    { href: '#faq', label: 'FAQ' },
    ...(storyUrl ? [{ href: storyUrl, label: 'Stories' }] : []),
  ]

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1], delay: 0.3 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 60,
        background: scrolled ? 'rgba(250,246,239,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px) saturate(1.4)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px) saturate(1.4)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(227,221,207,0.6)' : '1px solid transparent',
        transition: 'background 0.4s, border-color 0.4s, backdrop-filter 0.4s',
      }}
    >
      <div className="container" style={{
        padding: scrolled ? '12px clamp(20px,4vw,48px)' : '18px clamp(20px,4vw,48px)',
        display: 'flex',
        alignItems: 'center',
        gap: 28,
        transition: 'padding 0.3s',
      }}>
        {/* Logo */}
        <a href="#top" style={{
          display: 'flex',
          flexDirection: 'column',
          lineHeight: 1.05,
          flexShrink: 0,
          transition: 'transform 0.2s',
        }}>
          <span style={{
            fontFamily: 'var(--ff-display)',
            fontWeight: 700,
            fontSize: 22,
            letterSpacing: '-0.02em',
            color: scrolled ? 'var(--bp-navy)' : 'var(--bp-paper)',
            transition: 'color 0.3s',
          }}>
            {data.name}
          </span>
          <span style={{
            fontFamily: 'var(--ff-body)',
            fontSize: 10,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: scrolled ? 'var(--bp-ink-muted)' : 'rgba(250,246,239,0.6)',
            transition: 'color 0.3s',
          }}>
            {data.subtitle}
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="desktop-nav" style={{
          display: 'flex',
          gap: 6,
          marginLeft: 'auto',
        }}>
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              style={{
                fontFamily: 'var(--ff-display)',
                fontWeight: 500,
                fontSize: 13,
                padding: '8px 14px',
                borderRadius: 'var(--r-pill)',
                color: scrolled ? 'var(--bp-navy)' : 'rgba(250,246,239,0.85)',
                transition: 'color 0.2s, background 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = scrolled ? 'rgba(26,39,68,0.06)' : 'rgba(255,255,255,0.1)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent'
              }}
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginLeft: 'auto', flexShrink: 0 }}
             className="desktop-cta">
          <a href="#tour" style={{
            fontFamily: 'var(--ff-display)',
            fontWeight: 600,
            fontSize: 13,
            padding: '10px 22px',
            borderRadius: 'var(--r-pill)',
            border: scrolled ? '1.5px solid var(--bp-navy)' : '1.5px solid rgba(250,246,239,0.3)',
            color: scrolled ? 'var(--bp-navy)' : 'var(--bp-paper)',
            transition: 'all 0.25s',
          }}>
            Apply Now
          </a>
          <a href="#tour" style={{
            fontFamily: 'var(--ff-display)',
            fontWeight: 600,
            fontSize: 13,
            padding: '10px 22px',
            borderRadius: 'var(--r-pill)',
            background: 'var(--bp-orange)',
            color: 'var(--bp-navy)',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}>
            Schedule Tour
          </a>
        </div>

        {/* Mobile menu */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="mobile-menu-btn"
          aria-label="Toggle menu"
          style={{
            display: 'none',
            alignItems: 'center',
            gap: 8,
            background: scrolled ? 'rgba(26,39,68,0.04)' : 'rgba(255,255,255,0.1)',
            border: scrolled ? '1.5px solid var(--bp-line)' : '1.5px solid rgba(250,246,239,0.2)',
            borderRadius: 'var(--r-pill)',
            padding: '10px 16px',
            cursor: 'pointer',
            fontFamily: 'var(--ff-display)',
            fontWeight: 600,
            fontSize: 13,
            color: scrolled ? 'var(--bp-navy)' : 'var(--bp-paper)',
            marginLeft: 'auto',
            backdropFilter: 'blur(8px)',
            transition: 'all 0.3s',
          }}
        >
          <span style={{ display: 'grid', gap: 3.5 }}>
            <motion.span animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 5 : 0 }} style={{ display: 'block', width: 16, height: 1.5, background: 'currentColor', transformOrigin: 'left' }} />
            <motion.span animate={{ opacity: menuOpen ? 0 : 1, x: menuOpen ? -8 : 0 }} style={{ display: 'block', width: 16, height: 1.5, background: 'currentColor' }} />
            <motion.span animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -5 : 0 }} style={{ display: 'block', width: 16, height: 1.5, background: 'currentColor', transformOrigin: 'left' }} />
          </span>
          {menuOpen ? 'Close' : 'Menu'}
        </button>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
            style={{
              overflow: 'hidden',
              background: 'var(--bp-paper)',
              borderTop: '1px solid var(--bp-line)',
              boxShadow: '0 20px 40px rgba(15,24,48,0.12)',
            }}
          >
            <div className="container" style={{ padding: '16px clamp(20px,4vw,48px) 28px', display: 'grid', gap: 0 }}>
              {navLinks.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 + 0.1 }}
                  style={{
                    fontFamily: 'var(--ff-display)',
                    fontWeight: 600,
                    fontSize: 20,
                    padding: '16px 0',
                    borderBottom: '1px solid var(--bp-line)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  {l.label}
                  <span style={{ fontSize: 14, color: 'var(--bp-ink-muted)' }}>&rarr;</span>
                </motion.a>
              ))}
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 24 }}>
                <a href="#tour" onClick={() => setMenuOpen(false)} className="btn-primary" style={{ flex: 1 }}>Schedule a Tour</a>
                <a href="#tour" onClick={() => setMenuOpen(false)} className="btn-outline" style={{ flex: 1, borderColor: 'var(--bp-navy)', color: 'var(--bp-navy)' }}>Apply Now</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
