'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import type { OperatorData } from '@/data/operators'

export default function Gallery({ data }: { data: OperatorData }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [selected, setSelected] = useState<number | null>(null)

  return (
    <section id="gallery" ref={ref} style={{ background: 'var(--bg-page)' }}>
      <div className="container section-padding">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 40 }}
        >
          <p className="section-label">Gallery</p>
          <h2 className="section-heading">See it for yourself</h2>
        </motion.div>

        {/* Masonry-style grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gridAutoRows: 'clamp(120px, 14vw, 180px)',
          gap: 12,
        }}>
          {data.galleryImages.map((img, i) => {
            // Varied grid spans for visual interest
            const spans = [
              { col: 'span 7', row: 'span 2' },  // large hero
              { col: 'span 5', row: 'span 2' },  // tall right
              { col: 'span 4', row: 'span 2' },  // medium
              { col: 'span 4', row: 'span 2' },  // medium
              { col: 'span 4', row: 'span 2' },  // medium
            ]
            const span = spans[i] || { col: 'span 4', row: 'span 2' }

            return (
              <motion.div
                key={i}
                layoutId={`gallery-${i}`}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: i * 0.1, duration: 0.5, ease: [0.2, 0.7, 0.2, 1] }}
                onClick={() => setSelected(i)}
                style={{
                  gridColumn: span.col,
                  gridRow: span.row,
                  borderRadius: 'var(--r-md)',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  position: 'relative',
                }}
                className="gallery-item"
              >
                <motion.div
                  whileHover={{ scale: 1.06 }}
                  transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
                  style={{
                    width: '100%',
                    height: '100%',
                    background: `url(${img.src}) center / cover no-repeat`,
                  }}
                  role="img"
                  aria-label={img.alt}
                />

                {/* Caption overlay on hover */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.25 }}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(15,24,48,0.7) 0%, transparent 50%)',
                    display: 'flex',
                    alignItems: 'flex-end',
                    padding: 18,
                    borderRadius: 'var(--r-md)',
                  }}
                >
                  {img.caption && (
                    <p style={{
                      fontFamily: 'var(--ff-body)',
                      fontSize: 13,
                      color: 'var(--bp-paper)',
                      margin: 0,
                      lineHeight: 1.4,
                    }}>
                      {img.caption}
                    </p>
                  )}
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Lightbox with layoutId animation */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setSelected(null)}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 200,
              background: 'rgba(15,24,48,0.92)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 'clamp(16px, 4vw, 40px)',
              cursor: 'zoom-out',
            }}
          >
            <motion.div
              layoutId={`gallery-${selected}`}
              transition={{ duration: 0.45, ease: [0.2, 0.7, 0.2, 1] }}
              style={{
                width: 'min(900px, 88vw)',
                aspectRatio: '16/10',
                borderRadius: 'var(--r-lg)',
                overflow: 'hidden',
                boxShadow: '0 12px 60px rgba(0,0,0,0.5)',
              }}
            >
              <div style={{
                width: '100%',
                height: '100%',
                background: `url(${data.galleryImages[selected].src}) center / cover no-repeat`,
              }} />
            </motion.div>

            {/* Caption below image */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.2 }}
              style={{
                fontFamily: 'var(--ff-body)',
                fontSize: 15,
                color: 'rgba(250,246,239,0.7)',
                marginTop: 20,
                textAlign: 'center',
              }}
            >
              {data.galleryImages[selected].caption}
            </motion.p>

            {/* Close */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
              onClick={() => setSelected(null)}
              style={{
                position: 'absolute',
                top: 24,
                right: 24,
                width: 44,
                height: 44,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.12)',
                color: 'white',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 20,
                backdropFilter: 'blur(8px)',
              }}
            >
              &times;
            </motion.button>

            {/* Nav arrows — bottom-center on mobile, side-center on desktop */}
            <div style={{
              position: 'absolute',
              bottom: 'clamp(16px, 4vw, auto)',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: 12,
              zIndex: 10,
            }} className="lightbox-nav">
            {selected > 0 && (
              <button
                onClick={(e) => { e.stopPropagation(); setSelected(selected - 1) }}
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.12)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  color: 'white',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
              </button>
            )}
            {selected < data.galleryImages.length - 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); setSelected(selected + 1) }}
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.12)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  color: 'white',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
              </button>
            )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Responsive override for gallery grid on mobile */}
      <style>{`
        @media (max-width: 768px) {
          .gallery-item {
            grid-column: span 6 !important;
            grid-row: span 2 !important;
          }
          .gallery-item:first-child {
            grid-column: span 12 !important;
          }
        }
      `}</style>
    </section>
  )
}
