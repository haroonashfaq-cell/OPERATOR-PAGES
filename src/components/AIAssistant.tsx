'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { OperatorData } from '@/data/operators'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const QUICK_QUESTIONS = [
  'What floor plans are available?',
  'Tell me about the amenities',
  'What is the all-in pricing?',
  'How do I schedule a tour?',
]

function getAIResponse(question: string, data: OperatorData): string {
  const q = question.toLowerCase()

  if (q.includes('floor plan') || q.includes('bedroom') || q.includes('unit') || q.includes('apartment')) {
    const plans = data.floorPlans
    const min = Math.min(...plans.map(p => p.price))
    const max = Math.max(...plans.map(p => p.price))
    return `${data.name} offers ${plans.length} floor plans:\n\n` +
      plans.map(p => `${p.name} (${p.tier}) - ${p.beds} bed/${p.baths} bath, ${p.sqft.toLocaleString()} sq ft, from $${p.price.toLocaleString()}/mo`).join('\n') +
      `\n\nPrices range from $${min.toLocaleString()} to $${max.toLocaleString()}/mo all-in. Would you like to schedule a tour to see any of these?`
  }

  if (q.includes('amenit') || q.includes('pool') || q.includes('gym') || q.includes('fitness') || q.includes('dog') || q.includes('pet')) {
    return `Here are the community amenities at ${data.name}:\n\n` +
      data.amenities.map(a => `- ${a.title}: ${a.description}`).join('\n') +
      `\n\nYes, we are pet-friendly with an on-site dog park! Would you like to know more about anything specific?`
  }

  if (q.includes('price') || q.includes('pricing') || q.includes('cost') || q.includes('rent') || q.includes('fee') || q.includes('all-in')) {
    return `At ${data.name}, we use all-in pricing. The price you see includes base rent plus required monthly fees (water, sewer, trash, pest control, valet trash, and package lockers).\n\n` +
      `Example: ${data.samplePlan.name} (${data.samplePlan.details})\n` +
      data.samplePlan.breakdown.map(r => `  ${r.label}: ${r.value}`).join('\n') +
      `\n  Total: ${data.samplePlan.total}/mo\n\n` +
      `Electricity and internet are billed separately. No surprise fees at lease signing!`
  }

  if (q.includes('tour') || q.includes('visit') || q.includes('schedule') || q.includes('see')) {
    return `We would love to show you around ${data.name}! You can:\n\n` +
      `- Call us: ${data.phone}\n` +
      `- Email: ${data.email}\n` +
      `- Click "Schedule a Tour" on this page\n\n` +
      `We customize every tour to match what matters most to you. What time works best?`
  }

  if (q.includes('location') || q.includes('neighborhood') || q.includes('where') || q.includes('near') || q.includes('park') || q.includes('downtown')) {
    return `${data.name} is located at ${data.address}, ${data.city}, ${data.state} ${data.zip}.\n\n` +
      `Nearby highlights:\n` +
      `- Cherry Creek State Park: ~10 minutes\n` +
      `- Cherry Creek Shopping Center: ~15 minutes\n` +
      `- Downtown Denver: ~20 minutes\n\n` +
      `The neighborhood is perfect for those who want access to nature and city life.`
  }

  if (q.includes('move-in') || q.includes('special') || q.includes('promo') || q.includes('deal') || q.includes('free')) {
    return data.promoText
      ? `Great news! We currently have a promotion: ${data.promoText}. Select two-bedroom plans are eligible. Contact our leasing team to learn which specific plans qualify.`
      : `Please contact our leasing team for current availability and any ongoing specials.`
  }

  return `Thanks for your interest in ${data.name}! Here is a quick overview:\n\n` +
    `- ${data.floorPlans.length} floor plans from $${Math.min(...data.floorPlans.map(p => p.price)).toLocaleString()}/mo\n` +
    `- All-in pricing (no hidden fees)\n` +
    `- ${data.amenities.length} community amenities including pools, fitness center, and dog park\n` +
    `- Located in ${data.city}, ${data.state}\n\n` +
    `What specific question can I help you with? I can tell you about floor plans, pricing, amenities, the neighborhood, or help you schedule a tour.`
}

export default function AIAssistant({ data }: { data: OperatorData }) {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: `Hi! I am the ${data.name} AI assistant. Ask me anything about floor plans, pricing, amenities, or the neighborhood. How can I help you today?`,
    },
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, typing])

  const handleSend = (text?: string) => {
    const q = text || input.trim()
    if (!q) return

    setMessages((prev) => [...prev, { role: 'user', content: q }])
    setInput('')
    setTyping(true)

    setTimeout(() => {
      const response = getAIResponse(q, data)
      setMessages((prev) => [...prev, { role: 'assistant', content: response }])
      setTyping(false)
    }, 600 + Math.random() * 800)
  }

  return (
    <>
      {/* Floating button */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            onClick={() => setOpen(true)}
            className="ai-chat-bubble"
            aria-label="Open AI assistant"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.92 }}
            transition={{ duration: 0.3, ease: [0.2, 0.7, 0.2, 1] }}
            className="ai-chat-panel"
          >
            {/* Header */}
            <div style={{
              padding: '16px 20px',
              borderBottom: '1px solid var(--bp-line)',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              background: 'var(--bp-navy)',
              color: 'var(--bp-paper)',
            }}>
              <div style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--bp-orange), var(--bp-orange-deep))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--bp-navy)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a4 4 0 0 1 4 4c0 1.95-1.4 3.58-3.25 3.93"/>
                  <path d="M8 6a4 4 0 0 1 8 0"/>
                  <path d="M12 18v-4"/>
                  <circle cx="12" cy="20" r="2"/>
                </svg>
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontFamily: 'var(--ff-display)', fontWeight: 600, fontSize: 15, margin: 0 }}>
                  {data.name} AI
                </p>
                <p style={{ fontFamily: 'var(--ff-body)', fontSize: 11, margin: 0, opacity: 0.6 }}>
                  Powered by brightplace
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.08)',
                  border: 'none',
                  color: 'var(--bp-paper)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 18,
                }}
              >
                &times;
              </button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              style={{
                flex: 1,
                overflowY: 'auto',
                padding: '16px 16px 8px',
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
                minHeight: 200,
                maxHeight: 340,
              }}
            >
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  style={{
                    alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                    maxWidth: '85%',
                  }}
                >
                  <div style={{
                    padding: '10px 14px',
                    borderRadius: msg.role === 'user'
                      ? '14px 14px 4px 14px'
                      : '14px 14px 14px 4px',
                    background: msg.role === 'user' ? 'var(--bp-navy)' : 'var(--bg-sunken)',
                    color: msg.role === 'user' ? 'var(--bp-paper)' : 'var(--fg-primary)',
                    fontFamily: 'var(--ff-body)',
                    fontSize: 13,
                    lineHeight: 1.55,
                    whiteSpace: 'pre-line',
                  }}>
                    {msg.content}
                  </div>
                </motion.div>
              ))}

              {typing && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{ alignSelf: 'flex-start' }}
                >
                  <div style={{
                    padding: '12px 18px',
                    borderRadius: '14px 14px 14px 4px',
                    background: 'var(--bg-sunken)',
                    display: 'flex',
                    gap: 4,
                  }}>
                    {[0, 1, 2].map((d) => (
                      <motion.div
                        key={d}
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: d * 0.15 }}
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: '50%',
                          background: 'var(--bp-ink-muted)',
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Quick questions */}
            {messages.length <= 2 && (
              <div style={{
                padding: '0 16px 8px',
                display: 'flex',
                gap: 6,
                flexWrap: 'wrap',
              }}>
                {QUICK_QUESTIONS.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(q)}
                    style={{
                      fontFamily: 'var(--ff-body)',
                      fontSize: 12,
                      padding: '10px 14px',
                      borderRadius: 'var(--r-pill)',
                      background: 'transparent',
                      border: '1px solid var(--bp-line)',
                      color: 'var(--bp-ink-soft)',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      whiteSpace: 'nowrap',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'var(--bg-sunken)'
                      e.currentTarget.style.borderColor = 'var(--bp-teal)'
                      e.currentTarget.style.color = 'var(--bp-teal-deep)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent'
                      e.currentTarget.style.borderColor = 'var(--bp-line)'
                      e.currentTarget.style.color = 'var(--bp-ink-soft)'
                    }}
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div style={{
              padding: '12px 16px',
              borderTop: '1px solid var(--bp-line)',
              display: 'flex',
              gap: 8,
            }}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about this property..."
                style={{
                  flex: 1,
                  fontFamily: 'var(--ff-body)',
                  fontSize: 14,
                  padding: '10px 16px',
                  borderRadius: 'var(--r-pill)',
                  border: '1.5px solid var(--bp-line)',
                  background: 'var(--bg-page)',
                  color: 'var(--fg-primary)',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                }}
                onFocus={(e) => e.currentTarget.style.borderColor = 'var(--bp-teal)'}
                onBlur={(e) => e.currentTarget.style.borderColor = 'var(--bp-line)'}
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim()}
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                  background: input.trim() ? 'var(--bp-orange)' : 'var(--bg-sunken)',
                  border: 'none',
                  cursor: input.trim() ? 'pointer' : 'default',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background 0.2s, transform 0.2s',
                  flexShrink: 0,
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={input.trim() ? 'var(--bp-navy)' : 'var(--bp-ink-muted)'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"/>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
