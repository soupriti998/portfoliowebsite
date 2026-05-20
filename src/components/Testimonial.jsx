import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FadeUp, Label } from './utils'

const testimonials = [
  {
    initials: 'CH',
    name: 'Chaitanya Hegde',
    role: 'Head of Product · upliance.ai',
    comment: "Soupriti's work on the upliance app was revolutionary. Her interaction design saved us hours of manual work.",
    gradient: 'linear-gradient(135deg, #FF6B6B, #FF8E53)',
    arrowX: 30 // Approximate percentage/pixel coordinate for the tooltip arrow
  },
  {
    initials: 'VR',
    name: 'Vivek Ram',
    role: 'Senior UX Designer · Divami',
    comment: "A design engineer in the truest sense. Her React prototypes are extremely polished and pixel-perfect.",
    gradient: 'linear-gradient(135deg, #4E65FF, #92EFFD)',
    arrowX: 86
  },
  {
    initials: 'SI',
    name: 'Sneha Iyer',
    role: 'Product Manager · HDFC Client',
    comment: "Incredible user ethnography work! Her customer insights redefined our banking onboarding flow.",
    gradient: 'linear-gradient(135deg, #7F00FF, #E100FF)',
    arrowX: 164
  },
  {
    initials: 'RK',
    name: 'Rajesh Kumar',
    role: 'Lead Frontend Engineer · Incture',
    comment: "She bridges the gap between design and code perfectly. It is a absolute pleasure to implement her layouts.",
    gradient: 'linear-gradient(135deg, #11998e, #38ef7d)',
    arrowX: 220
  },
  {
    initials: 'AS',
    name: 'Ananya Sen',
    role: 'Founder · Brandshape',
    comment: "Very proactive and detailed. Her risk-taking ability in UX strategy was crucial for our product launch.",
    gradient: 'linear-gradient(135deg, #f857a6, #ff5858)',
    arrowX: 276
  },
  {
    initials: 'RS',
    name: 'Rohan Shah',
    role: 'Design Partner · Freelance',
    comment: "A master of micro-interactions and layout rhythm. She brings static interfaces to life.",
    gradient: 'linear-gradient(135deg, #FFD166, #F78C6C)',
    arrowX: 350
  },
  {
    initials: 'MN',
    name: 'Meera Nair',
    role: 'Director of Design · TechCorp',
    comment: "Exceptional systems thinking. She builds design systems that developer teams actually love to use.",
    gradient: 'linear-gradient(135deg, #06D6A0, #118AB2)',
    arrowX: 406
  },
  {
    initials: 'DP',
    name: 'Devendra Patel',
    role: 'CTO · FinTech',
    comment: "Her high-fidelity React prototypes saved us months of development. She defines interactions with code.",
    gradient: 'linear-gradient(135deg, #EF476F, #FFD166)',
    arrowX: 462
  },
  {
    initials: 'PS',
    name: 'Priya Sharma',
    role: 'UX Researcher · ResearchLab',
    comment: "Her detail-oriented user research uncovered critical bottlenecks in our SaaS dashboard.",
    gradient: 'linear-gradient(135deg, #833AB4, #FD1D1D)',
    arrowX: 518
  },
  {
    initials: 'AM',
    name: 'Arjun Mehta',
    role: 'VP of Product · SaaSify',
    comment: "Highly empathetic design process. She designs for real-world user behaviors and solves pain points.",
    gradient: 'linear-gradient(135deg, #3a7bd5, #3a6073)',
    arrowX: 574
  }
]

export default function Testimonial() {
  const [extraCount, setExtraCount] = useState(0) // Ranges 0 to 5 on clicking "+"
  const [hoveredIdx, setHoveredIdx] = useState(0) // Default to first testimonial

  const activeTestimonial = testimonials[hoveredIdx]

  const handleAddMore = () => {
    if (extraCount < 5) {
      setExtraCount(prev => prev + 1)
      // Set hovered index to the newly added avatar
      setHoveredIdx(5 + extraCount)
    }
  }

  // Split avatars into groups to mimic Ref Image 2's capsule layouts
  const capsule1 = testimonials.slice(0, 2)
  const capsule2 = testimonials.slice(2, 5)
  const capsule3 = testimonials.slice(5, 5 + extraCount)

  return (
    <section id="testimonial" style={{ position: 'relative', zIndex: 4, padding: 'var(--space-11) 0', background: 'var(--bg)', borderBottom: '1px solid var(--border)' }}>
      <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        <FadeUp>
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
            <Label>Recognition</Label>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(32px, 4vw, 46px)',
              fontWeight: 400,
              letterSpacing: '-0.025em',
              lineHeight: 1.1,
              color: 'var(--text-primary)',
              marginTop: 'var(--space-4)',
              marginBottom: 0,
            }}>
              What my peers <span style={{ color: 'var(--accent)' }}>say about me.</span>
            </h2>
          </div>
        </FadeUp>

        {/* Dynamic Tooltip Quote Display (Positioned relative above the avatars) */}
        <div style={{
          width: '100%',
          maxWidth: 680,
          position: 'relative',
          marginBottom: 48,
          zIndex: 10
        }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={hoveredIdx}
              initial={{ opacity: 0, y: 8, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0)' }}
              exit={{ opacity: 0, y: -8, filter: 'blur(4px)' }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              style={{
                background: 'var(--bg-card)',
                border: '1.5px solid var(--border)',
                borderRadius: 24,
                padding: '32px 36px',
                boxShadow: 'var(--shadow-md), 0 20px 40px rgba(0,0,0,0.02)',
                position: 'relative',
                textAlign: 'left'
              }}
            >
              {/* Quote marks background watermark */}
              <div style={{
                position: 'absolute', top: 12, right: 32,
                fontFamily: 'var(--font-display)',
                fontSize: 120,
                lineHeight: 1,
                color: 'var(--accent)',
                opacity: 0.08,
                pointerEvents: 'none',
                userSelect: 'none',
                fontWeight: 800,
              }}>"</div>

              <blockquote style={{ position: 'relative', zIndex: 1, margin: 0 }}>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 16.5,
                  lineHeight: 1.6,
                  color: 'var(--text-primary)',
                  margin: '0 0 20px 0',
                }}>
                  "{activeTestimonial.comment}"
                </p>
                <footer style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{
                    width: 38, height: 38, borderRadius: '50%',
                    background: activeTestimonial.gradient,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'white', fontWeight: 700, fontSize: 13,
                    fontFamily: 'var(--font-mono)',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)'
                  }}>
                    {activeTestimonial.initials}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14.5, color: 'var(--text-primary)', letterSpacing: '-0.015em' }}>
                      {activeTestimonial.name}
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                      {activeTestimonial.role}
                    </div>
                  </div>
                </footer>
              </blockquote>
            </motion.div>
          </AnimatePresence>

          {/* Animated sliding arrow pointer pointing to the active avatar */}
          <motion.div 
            animate={{ x: activeTestimonial.arrowX + 28 }} // Offset relative to container middle
            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
            style={{
              position: 'absolute',
              top: '100%',
              left: '50%',
              marginLeft: -320, // Center alignment offset relative to 640px maxwidth
              width: 0,
              height: 0,
              borderLeft: '10px solid transparent',
              borderRight: '10px solid transparent',
              borderTop: '10px solid var(--border)',
              zIndex: 5
            }}
          />
          <motion.div 
            animate={{ x: activeTestimonial.arrowX + 28 }}
            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
            style={{
              position: 'absolute',
              top: '100%',
              left: '50%',
              marginLeft: -320,
              width: 0,
              height: 0,
              borderLeft: '10px solid transparent',
              borderRight: '10px solid transparent',
              borderTop: '10px solid var(--bg-card)',
              zIndex: 6,
              transform: 'translateY(-1.5px)'
            }}
          />
        </div>

        {/* Avatar capsule container mimicking Ref Image 2 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap', justifyContent: 'center' }}>
          
          {/* Capsule 1: 2 Avatars */}
          <div className="avatar-capsule">
            {capsule1.map((item, idx) => {
              const globalIdx = idx
              const isActive = hoveredIdx === globalIdx

              return (
                <div
                  key={item.name}
                  onMouseEnter={() => setHoveredIdx(globalIdx)}
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: '50%',
                    background: item.gradient,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 700,
                    fontSize: 15,
                    border: isActive ? '3.5px solid var(--accent)' : '3.5px solid var(--bg-card)',
                    boxShadow: isActive ? '0 8px 24px rgba(0, 82, 255, 0.25)' : '0 4px 12px rgba(0, 0, 0, 0.04)',
                    cursor: 'pointer',
                    userSelect: 'none',
                    marginRight: idx < capsule1.length - 1 ? -12 : 0,
                    zIndex: isActive ? 10 : capsule1.length - idx,
                    transform: isActive ? 'scale(1.1) translateY(-2px)' : 'scale(1)',
                    transition: 'transform 0.25s, border-color 0.25s, box-shadow 0.25s'
                  }}
                >
                  {item.initials}
                </div>
              )
            })}
          </div>

          {/* Capsule 2: 3 Avatars */}
          <div className="avatar-capsule">
            {capsule2.map((item, idx) => {
              const globalIdx = 2 + idx
              const isActive = hoveredIdx === globalIdx

              return (
                <div
                  key={item.name}
                  onMouseEnter={() => setHoveredIdx(globalIdx)}
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: '50%',
                    background: item.gradient,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 700,
                    fontSize: 15,
                    border: isActive ? '3.5px solid var(--accent)' : '3.5px solid var(--bg-card)',
                    boxShadow: isActive ? '0 8px 24px rgba(0, 82, 255, 0.25)' : '0 4px 12px rgba(0, 0, 0, 0.04)',
                    cursor: 'pointer',
                    userSelect: 'none',
                    marginRight: idx < capsule2.length - 1 ? -12 : 0,
                    zIndex: isActive ? 10 : capsule2.length - idx,
                    transform: isActive ? 'scale(1.1) translateY(-2px)' : 'scale(1)',
                    transition: 'transform 0.25s, border-color 0.25s, box-shadow 0.25s'
                  }}
                >
                  {item.initials}
                </div>
              )
            })}
          </div>

          {/* Capsule 3: Dynamic Avatars loaded by clicking plus */}
          {extraCount > 0 && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, x: -20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              className="avatar-capsule"
            >
              {capsule3.map((item, idx) => {
                const globalIdx = 5 + idx
                const isActive = hoveredIdx === globalIdx

                return (
                  <div
                    key={item.name}
                    onMouseEnter={() => setHoveredIdx(globalIdx)}
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: '50%',
                      background: item.gradient,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#ffffff',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 700,
                      fontSize: 15,
                      border: isActive ? '3.5px solid var(--accent)' : '3.5px solid var(--bg-card)',
                      boxShadow: isActive ? '0 8px 24px rgba(0, 82, 255, 0.25)' : '0 4px 12px rgba(0, 0, 0, 0.04)',
                      cursor: 'pointer',
                      userSelect: 'none',
                      marginRight: idx < capsule3.length - 1 ? -12 : 0,
                      zIndex: isActive ? 10 : capsule3.length - idx,
                      transform: isActive ? 'scale(1.1) translateY(-2px)' : 'scale(1)',
                      transition: 'transform 0.25s, border-color 0.25s, box-shadow 0.25s'
                    }}
                  >
                    {item.initials}
                  </div>
                )
              })}
            </motion.div>
          )}

          {/* Plus load button */}
          <button
            onClick={handleAddMore}
            disabled={extraCount >= 5}
            style={{
              width: 56,
              height: 56,
              borderRadius: '50%',
              background: 'var(--bg-card)',
              border: '1.5px solid var(--border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-primary)',
              cursor: extraCount >= 5 ? 'not-allowed' : 'pointer',
              opacity: extraCount >= 5 ? 0.35 : 1,
              boxShadow: 'var(--shadow-sm)',
              outline: 'none',
              transition: 'all 0.25s var(--ease-out-expo)',
              fontSize: 22,
              fontWeight: 300
            }}
            onMouseEnter={e => {
              if (extraCount < 5) {
                e.currentTarget.style.transform = 'scale(1.05)'
                e.currentTarget.style.borderColor = 'var(--accent)'
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 82, 255, 0.08)'
              }
            }}
            onMouseLeave={e => {
              if (extraCount < 5) {
                e.currentTarget.style.transform = 'scale(1)'
                e.currentTarget.style.borderColor = 'var(--border)'
                e.currentTarget.style.boxShadow = 'var(--shadow-sm)'
              }
            }}
          >
            +
          </button>
        </div>

      </div>

      <style>{`
        .avatar-capsule {
          display: flex;
          align-items: center;
          background: var(--bg-card);
          border: 1.5px solid var(--border);
          border-radius: 40px;
          padding: 8px 14px 8px 8px;
          box-shadow: var(--shadow-sm);
        }
      `}</style>
    </section>
  )
}
