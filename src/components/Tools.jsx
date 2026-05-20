import { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import { FadeUp, Label } from './utils'

const tools = [
  { 
    name: 'Figma', 
    category: 'Design Systems', 
    icon: '🎨', 
    contribution: 'Built scalable AI-first product systems, standardized variable tokens, and organized multi-platform SaaS dashboard components.',
    outcome: '30% component reuse increase',
    bg: '#FF6B6B',
    color: '#FFFFFF',
    rotate: -5,
    x: -8,
    y: 10
  },
  { 
    name: 'Framer', 
    category: 'Interactive Development', 
    icon: '⚡', 
    contribution: 'Created immersive storytelling portfolios, high-fidelity user-test prototypes, and custom canvas-based physics engines.',
    outcome: 'Interactive storytelling fidelity',
    bg: '#54A0FF',
    color: '#FFFFFF',
    rotate: 4,
    x: 10,
    y: -8
  },
  { 
    name: 'Cursor', 
    category: 'AI Coding & Prototyping', 
    icon: '◈', 
    contribution: 'Rapidly engineered intelligent UI layouts, custom contextual AI assistants, animated components, and fluid layout physics.',
    outcome: 'Zero-friction code prototypes',
    bg: '#576574',
    color: '#FFFFFF',
    rotate: -3,
    x: -12,
    y: 6
  },
  { 
    name: 'Midjourney', 
    category: 'AI Visual Assets', 
    icon: '✦', 
    contribution: 'Developed conceptual visual assets, rich art boards, hand-drawn vector mascot systems, and highly creative interfaces.',
    outcome: 'Bespoke brand illustrations',
    bg: '#9B59B6',
    color: '#FFFFFF',
    rotate: 6,
    x: 14,
    y: -12
  },
  { 
    name: 'Claude', 
    category: 'AI Writing & UX Copy', 
    icon: '◎', 
    contribution: 'Structured complex contextual conversational dialog states, descriptive microcopy, user flow scripts, and empty states.',
    outcome: 'Emotional & clear copy loops',
    bg: '#FECA57',
    color: '#2C3E50',
    rotate: -4,
    x: -6,
    y: 8
  },
  { 
    name: 'Lottie', 
    category: 'Motion Microinteractions', 
    icon: '▶', 
    contribution: 'Designed extremely lightweight responsive SVG motion assets, interactive micro-states, and custom button animations.',
    outcome: '60fps interaction delight',
    bg: '#FF9FF3',
    color: '#2C3E50',
    rotate: 5,
    x: 12,
    y: -5
  },
  { 
    name: 'Whimsical', 
    category: 'Behavioral Architecture', 
    icon: '◇', 
    contribution: 'Mapped end-to-end product user journey ecosystems, behavior state trees, database flows, and information routing architectures.',
    outcome: '7% drop-rate journey reduction',
    bg: '#1DD1A1',
    color: '#2C3E50',
    rotate: -6,
    x: -10,
    y: 12
  },
  { 
    name: 'Illustrator', 
    category: 'Vector Visual Identity', 
    icon: '◆', 
    contribution: 'Crafted distinct scalable custom iconography, comic sketch mascot sheets, and visual art systems.',
    outcome: 'Pixel-perfect graphic systems',
    bg: '#FF9F43',
    color: '#FFFFFF',
    rotate: 3,
    x: 8,
    y: -4
  },
]

export default function Tools() {
  const containerRef = useRef(null)
  const [isMobile, setIsMobile] = useState(false)
  const [overlap, setOverlap] = useState(-100)
  const [hoveredIndex, setHoveredIndex] = useState(null)
  
  // Track if the cards container is in the viewport to trigger dealing animation
  const isInView = useInView(containerRef, { once: true, amount: 0.15 })

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      const mobile = width < 768
      setIsMobile(mobile)
      
      if (mobile) {
        setOverlap(0)
      } else if (width < 1024) {
        setOverlap(-150) // High overlap for narrow screens
      } else if (width < 1280) {
        setOverlap(-125) // Medium overlap
      } else {
        setOverlap(-100) // Standard desktop overlap
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [isMobile])

  // Calculate shift amount based on current overlap density
  const shiftAmount = Math.abs(overlap) * 0.95

  return (
    <section id="tools" style={{ position: 'relative', zIndex: 3, padding: 'var(--space-11) 0', background: 'var(--bg)', borderTop: '1px solid var(--border)', overflow: 'visible' }}>
      <div className="container" style={{ position: 'relative' }}>
        
        {/* Centered Heading */}
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-9)' }}>
          <FadeUp>
            <div style={{ display: 'inline-block' }}>
              <Label>Toolkit</Label>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(32px, 4.5vw, 52px)',
                fontWeight: 400,
                letterSpacing: '-0.025em',
                lineHeight: 1.1,
                color: 'var(--text-primary)',
                marginTop: 'var(--space-5)',
                marginBottom: 'var(--space-4)',
              }}>
                Systems I build<br />
                <span style={{ color: 'var(--accent)' }}>with these tools.</span>
              </h2>
              <p style={{ fontSize: 16, color: 'var(--text-secondary)', margin: '0 auto', maxWidth: '54ch', lineHeight: 1.5 }}>
                Drag cards anywhere, or hover over them to focus and reveal their outcomes.
              </p>
            </div>
          </FadeUp>
        </div>

        {/* Cards container */}
        <div 
          ref={containerRef}
          style={{
            position: 'relative',
            display: 'flex',
            flexWrap: isMobile ? 'wrap' : 'nowrap',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '40px 10px 60px 10px',
            overflow: 'visible',
            minHeight: '420px',
            width: '100%',
          }}
        >
          {tools.map(({ name, category, icon, contribution, outcome, bg, color, rotate, x, y }, i) => {
            // Calculate hover shifting offsets
            let xShift = 0
            let extraRotate = 0
            
            if (hoveredIndex !== null && !isMobile) {
              if (i < hoveredIndex) {
                xShift = -shiftAmount
                extraRotate = -4
              } else if (i > hoveredIndex) {
                xShift = shiftAmount
                extraRotate = 4
              }
            }

            // Determine custom tooltip background and text colors to match the card theme
            const tooltipBg = color === '#FFFFFF' ? '#FFFFFF' : '#2C3E50'
            const tooltipColor = bg

            return (
              <motion.div
                key={name}
                className="tool-card-wrapper"
                animate={isInView ? {
                  x: xShift,
                  rotate: (isMobile ? rotate / 2 : rotate) + extraRotate,
                  scale: 1,
                  opacity: 1,
                  y: 0,
                } : {
                  x: 0,
                  rotate: 0,
                  scale: 0.9,
                  opacity: 0,
                  y: 50, // Stagger up slightly when dealing
                }}
                transition={{
                  type: 'spring',
                  stiffness: isInView ? 160 : 120,
                  damping: isInView ? 18 : 16,
                  delay: isInView ? i * 0.05 : 0, // Staggered dealing!
                }}
                style={{
                  marginLeft: isMobile ? '0' : (i === 0 ? '0' : `${overlap}px`),
                  zIndex: hoveredIndex === i ? 50 : i,
                  position: 'relative',
                  transition: 'margin-left 0.3s ease',
                  marginBottom: isMobile ? 'var(--space-5)' : '0',
                }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <motion.div
                  className="tool-card-motion"
                  drag={!isMobile}
                  dragConstraints={containerRef}
                  dragElastic={0.15}
                  dragMomentum={false}
                  whileHover={{ 
                    scale: 1.06, 
                    rotate: 0, 
                    boxShadow: '0 20px 40px rgba(0,0,0,0.15)' 
                  }}
                  whileTap={{ cursor: 'grabbing' }}
                  whileDrag={{ 
                    scale: 1.08, 
                    rotate: 0, 
                    zIndex: 100,
                    boxShadow: '0 30px 60px rgba(0,0,0,0.2)' 
                  }}
                  initial={{ 
                    x: isMobile ? x / 2 : x,
                    y: isMobile ? y / 2 : y
                  }}
                  style={{
                    width: '260px',
                    height: '300px',
                    padding: 'var(--space-6)',
                    background: bg,
                    color: color,
                    borderRadius: 'var(--radius-xl)',
                    border: '1px solid rgba(0, 0, 0, 0.05)',
                    boxShadow: 'var(--shadow-sm)',
                    position: 'relative',
                    overflow: 'visible',
                    cursor: isMobile ? 'default' : 'grab',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    boxSizing: 'border-box',
                    userSelect: 'none',
                    touchAction: isMobile ? 'auto' : 'none',
                  }}
                >
                  {/* Floating Tooltip Pill pointing down - Nested inside the draggable element so it drags with it */}
                  <AnimatePresence>
                    {hoveredIndex === i && (
                      <motion.div
                        initial={{ opacity: 0, y: 15, x: '-50%', scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, x: '-50%', scale: 1 }}
                        exit={{ opacity: 0, y: 15, x: '-50%', scale: 0.8 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                        style={{
                          position: 'absolute',
                          top: '-50px',
                          left: '50%',
                          background: tooltipBg,
                          color: tooltipColor,
                          padding: '6px 14px',
                          borderRadius: 'var(--radius-pill)',
                          fontSize: '11.5px',
                          fontWeight: 700,
                          fontFamily: 'var(--font-mono)',
                          whiteSpace: 'nowrap',
                          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.12)',
                          zIndex: 100,
                          pointerEvents: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                        }}
                      >
                        🎯 {outcome}
                        {/* Arrow */}
                        <div 
                          style={{
                            position: 'absolute',
                            bottom: '-4px',
                            left: '50%',
                            transform: 'translateX(-50%) rotate(45deg)',
                            width: '8px',
                            height: '8px',
                            background: tooltipBg,
                          }}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Blueprint grid on hover */}
                  <div 
                    className="tool-blueprint-bg" 
                    style={{
                      position: 'absolute',
                      inset: 0,
                      opacity: 0,
                      pointerEvents: 'none',
                      borderRadius: 'var(--radius-xl)',
                      backgroundSize: '16px 16px',
                      backgroundImage: `radial-gradient(${color} 0.8px, transparent 0.8px)`,
                      transition: 'opacity 400ms cubic-bezier(0.16, 1, 0.3, 1)',
                      zIndex: 1
                    }} 
                  />

                  <div style={{ position: 'relative', zIndex: 2 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <span style={{ fontSize: 24, filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.05))' }}>{icon}</span>
                        <div>
                          <h3 style={{ fontWeight: 700, fontSize: 18, color: color, letterSpacing: '-0.015em', margin: 0 }}>{name}</h3>
                          <span style={{ fontSize: 11, color: color, opacity: 0.8, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginTop: 2 }}>{category}</span>
                        </div>
                      </div>
                    </div>

                    <p style={{ 
                      fontSize: 13, 
                      lineHeight: 1.6, 
                      color: color, 
                      opacity: 0.9,
                      margin: 0,
                      fontFamily: 'var(--font-body)'
                    }}>
                      {contribution}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            )
          })}
        </div>

        {/* Technical dialogue block */}
        <FadeUp delay={200}>
          <div style={{
            marginTop: 'var(--space-8)',
            padding: 'var(--space-6) var(--space-7)',
            background: 'var(--bg-warm)',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--border)',
            display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap', alignItems: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)', position: 'relative', zIndex: 2 }}>Working developer knowledge:</span>
            {['HTML5', 'CSS3', 'JavaScript (ES6)', 'React.js', 'Vite'].map(tech => (
              <span key={tech} style={{
                fontSize: 11, fontWeight: 600, padding: '4px 12px',
                borderRadius: 'var(--radius-pill)',
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                color: 'var(--text-secondary)',
                position: 'relative', zIndex: 2,
              }}>{tech}</span>
            ))}
            <span style={{ fontSize: 13, color: 'var(--text-secondary)', marginLeft: 'var(--space-2)', position: 'relative', zIndex: 2 }}>— allows me to code my own layouts, speak fluently with engineers, and run high-fidelity functional prototypes directly in browser.</span>
          </div>
        </FadeUp>
      </div>

      <style>{`
        .tool-card-motion:hover .tool-blueprint-bg {
          opacity: 0.15 !important;
        }
      `}</style>
    </section>
  )
}
