import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
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

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <section id="tools" style={{ padding: 'var(--space-11) 0', background: 'var(--bg)', borderTop: '1px solid var(--border)', overflow: 'hidden' }}>
      <div className="container">
        <FadeUp>
          <Label>Toolkit</Label>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(28px, 3.5vw, 44px)',
            fontWeight: 400,
            letterSpacing: '-0.025em',
            lineHeight: 1.1,
            color: 'var(--text-primary)',
            marginTop: 'var(--space-5)',
            marginBottom: 'var(--space-3)',
          }}>
            Systems I build<br />
            <span style={{ color: 'var(--accent)' }}>with these tools.</span>
          </h2>
          <p style={{ fontSize: 15, color: 'var(--text-secondary)', marginBottom: 'var(--space-9)', maxWidth: '50ch' }}>
            No plain percentage meters. Grab and drag these cards to organize my toolkit, or hover over them to bring them to the front.
          </p>
        </FadeUp>

        <div 
          ref={containerRef}
          style={{
            position: 'relative',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: isMobile ? '16px' : '24px',
            padding: '40px 10px',
            overflow: 'visible',
          }}
        >
          {tools.map(({ name, category, icon, contribution, outcome, bg, color, rotate, x, y }) => (
            <motion.div
              key={name}
              className="tool-card-motion"
              drag={!isMobile}
              dragConstraints={containerRef}
              dragElastic={0.15}
              dragMomentum={false}
              whileHover={{ 
                scale: 1.05, 
                rotate: 0, 
                zIndex: 50,
                boxShadow: '0 20px 40px rgba(0,0,0,0.12)' 
              }}
              whileTap={{ cursor: 'grabbing' }}
              whileDrag={{ 
                scale: 1.08, 
                rotate: 0, 
                zIndex: 100,
                boxShadow: '0 30px 60px rgba(0,0,0,0.18)' 
              }}
              initial={{ 
                rotate: isMobile ? rotate / 2 : rotate,
                x: isMobile ? x / 2 : x,
                y: isMobile ? y / 2 : y
              }}
              style={{
                width: '280px',
                height: '330px',
                padding: 'var(--space-6)',
                background: bg,
                color: color,
                borderRadius: 'var(--radius-xl)',
                border: '1px solid rgba(0, 0, 0, 0.05)',
                boxShadow: 'var(--shadow-sm)',
                position: 'relative',
                overflow: 'hidden',
                cursor: isMobile ? 'default' : 'grab',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxSizing: 'border-box',
                userSelect: 'none',
                touchAction: isMobile ? 'auto' : 'none',
              }}
            >
              {/* Blueprint grid on hover */}
              <div 
                className="tool-blueprint-bg" 
                style={{
                  position: 'absolute',
                  inset: 0,
                  opacity: 0,
                  pointerEvents: 'none',
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
                  margin: '0 0 var(--space-5) 0',
                  fontFamily: 'var(--font-body)'
                }}>
                  {contribution}
                </p>
              </div>

              <div 
                style={{
                  position: 'relative',
                  zIndex: 2,
                  fontSize: 11,
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 600,
                  color: color,
                  background: color === '#FFFFFF' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.06)',
                  padding: '6px 12px',
                  borderRadius: 'var(--radius-pill)',
                  width: 'fit-content',
                  border: color === '#FFFFFF' ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.05)',
                }}
              >
                🎯 {outcome}
              </div>
            </motion.div>
          ))}
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
