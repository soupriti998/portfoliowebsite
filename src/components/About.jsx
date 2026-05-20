import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FadeUp, Label } from './utils'
import PassionsPlayground from './PassionsPlayground'

export default function About() {
  const [activeExplain, setActiveExplain] = useState("Hover, drag, or align the notepad papers on the desk mat to explore my designer profile!")
  const [isAligned, setIsAligned] = useState(false)
  const deskRef = useRef(null)

  // Checklist items in Note 4
  const [checkedTasks, setCheckedTasks] = useState({
    '01': true,
    '02': true,
    '03': true,
    '04': true
  })

  // Detect mobile viewports to force vertical list stack for mobile usability
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const checkViewport = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    checkViewport()
    window.addEventListener('resize', checkViewport)
    return () => window.removeEventListener('resize', checkViewport)
  }, [])

  const triggerCatSpeak = (text) => {
    setActiveExplain(text)
    const speakEvent = new CustomEvent('cat-speak', {
      detail: { text }
    })
    window.dispatchEvent(speakEvent)
  }

  // 5 Notepad Cards Data Setup
  const notes = [
    {
      id: 'bio',
      title: 'Telemetry & Bio',
      icon: '📈',
      defaultRotate: -4,
      scatteredLeft: '2%',
      scatteredTop: '20px',
      color: '#E0F2FE', // Coinbase pale blue header
      desc: "My design telemetry showing NIFT Chennai visual background, shipped products, and Figma precision.",
      render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '10px' }}>
            <div style={{ background: 'rgba(0,82,255,0.05)', border: '1px solid rgba(0,82,255,0.08)', padding: '6px 4px', borderRadius: '10px', textAlign: 'center', flex: 1 }}>
              <span style={{ fontSize: '16px', fontWeight: 700, color: 'var(--accent)', fontFamily: 'var(--font-display)', display: 'block' }}>4.0</span>
              <span style={{ fontSize: '8px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>UX YEARS</span>
            </div>
            <div style={{ background: 'rgba(0,82,255,0.05)', border: '1px solid rgba(0,82,255,0.08)', padding: '6px 4px', borderRadius: '10px', textAlign: 'center', flex: 1 }}>
              <span style={{ fontSize: '16px', fontWeight: 700, color: 'var(--accent)', fontFamily: 'var(--font-display)', display: 'block' }}>12+</span>
              <span style={{ fontSize: '8px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>PROJECTS</span>
            </div>
            <div style={{ background: 'rgba(0,82,255,0.05)', border: '1px solid rgba(0,82,255,0.08)', padding: '6px 4px', borderRadius: '10px', textAlign: 'center', flex: 1.2 }}>
              <span style={{ fontSize: '16px', fontWeight: 700, color: 'var(--accent)', fontFamily: 'var(--font-display)', display: 'block' }}>100%</span>
              <span style={{ fontSize: '8px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>SPEC MATCH</span>
            </div>
          </div>
          <p style={{ fontSize: '12px', lineHeight: '1.6', color: 'var(--text-secondary)', marginTop: '14px', fontFamily: 'var(--font-body)', margin: '14px 0 0 0' }}>
            Visual design graduate from <strong>NIFT Chennai</strong>. I connect user observation logs with exact Figma developer specs.
          </p>
        </div>
      )
    },
    {
      id: 'focus',
      title: 'Role Spectrum',
      icon: '🧭',
      defaultRotate: 5,
      scatteredLeft: '22%',
      scatteredTop: '160px',
      color: '#DCFCE7', // Pale green header
      desc: "My design spectrum: 50% Interaction, 30% User Research, 20% Visual Systems.",
      render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '3px', fontWeight: 600, color: 'var(--text-primary)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent)' }} />
                Interaction Craft
              </span>
              <span style={{ fontFamily: 'var(--font-mono)' }}>50%</span>
            </div>
            <div style={{ height: '5px', background: 'rgba(0,0,0,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ width: '50%', height: '100%', background: 'var(--accent)' }} />
            </div>
          </div>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '3px', fontWeight: 600, color: 'var(--text-primary)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--text-primary)' }} />
                User Research
              </span>
              <span style={{ fontFamily: 'var(--font-mono)' }}>30%</span>
            </div>
            <div style={{ height: '5px', background: 'rgba(0,0,0,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ width: '30%', height: '100%', background: 'var(--text-primary)' }} />
            </div>
          </div>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '3px', fontWeight: 600, color: 'var(--text-primary)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--text-muted)' }} />
                Visual Systems
              </span>
              <span style={{ fontFamily: 'var(--font-mono)' }}>20%</span>
            </div>
            <div style={{ height: '5px', background: 'rgba(0,0,0,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ width: '20%', height: '100%', background: 'var(--text-muted)' }} />
            </div>
          </div>
          <p style={{ fontSize: '10.5px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginTop: '4px', lineHeight: '1.3' }}>
            Balance of layout aesthetics, motion physics, and strategic metrics.
          </p>
        </div>
      )
    },
    {
      id: 'toolkit',
      title: 'Design Toolkit',
      icon: '🎨',
      defaultRotate: -3,
      scatteredLeft: '42%',
      scatteredTop: '20px',
      color: '#FEF9C3', // Pale yellow header
      desc: "Key toolsets: Figma spec systems, React development, Framer Motion, and Usability testing.",
      render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '10px' }}>
          {[
            { label: 'Product Design', tool: 'Figma to React' },
            { label: 'User Research', tool: 'Usability testing' },
            { label: 'Interaction Design', tool: 'Micro-interactions' },
            { label: 'UI Design & Systems', tool: 'Figma Spec Systems' }
          ].map((item) => (
            <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(0,82,255,0.03)', border: '1px solid rgba(0,0,0,0.04)', borderRadius: '6px', padding: '5px 10px' }}>
              <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-primary)' }}>{item.label}</span>
              <span style={{ fontSize: '8px', fontFamily: 'var(--font-mono)', color: 'var(--accent)', marginLeft: 'auto', background: 'rgba(0,82,255,0.06)', padding: '1px 4px', borderRadius: '3px', fontWeight: 600 }}>{item.tool}</span>
            </div>
          ))}
        </div>
      )
    },
    {
      id: 'process',
      title: 'Strategic Process',
      icon: '⚡',
      defaultRotate: 3,
      scatteredLeft: '60%',
      scatteredTop: '160px',
      color: '#FEE2E2', // Pale red header
      desc: "Four steps process: Research deeply, Think strategically, Design intentionally, Iterate constantly.",
      render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }} onPointerDown={(e) => e.stopPropagation()}>
          {[
            { label: 'Research deeply', id: '01', desc: 'Cook journals mapping' },
            { label: 'Think strategically', id: '02', desc: 'Product metric link' },
            { label: 'Design intentionally', id: '03', desc: 'Manage cognitive load' },
            { label: 'Iterate constantly', id: '04', desc: 'Figma to React loop' }
          ].map((task) => {
            const isChecked = checkedTasks[task.id]
            return (
              <div 
                key={task.id} 
                onClick={() => setCheckedTasks(prev => ({ ...prev, [task.id]: !prev[task.id] }))}
                style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', opacity: isChecked ? 1 : 0.55, transition: 'opacity 0.2s' }}
              >
                <div style={{
                  width: '13px', height: '13px', borderRadius: '3px',
                  border: isChecked ? '1.5px solid var(--accent)' : '1.5px solid rgba(0,0,0,0.2)',
                  background: isChecked ? 'var(--accent)' : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontSize: '8px', fontWeight: 900
                }}>
                  {isChecked && '✓'}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-primary)', textDecoration: isChecked ? 'line-through' : 'none' }}>{task.label}</span>
                  <span style={{ fontSize: '8.5px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{task.desc}</span>
                </div>
              </div>
            )
          })}
        </div>
      )
    },
    {
      id: 'passions',
      title: 'Passions Playground',
      icon: '🕹️',
      defaultRotate: 5,
      scatteredLeft: '76%',
      scatteredTop: '20px',
      color: '#F3E8FF', // Pale purple header
      desc: "Drag the circular stickers around to discover my personal hobbies and chimes!",
      render: () => (
        <div 
          style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '170px', marginTop: '2px', position: 'relative' }}
          onPointerDown={(e) => e.stopPropagation()}
        >
          <PassionsPlayground triggerCatSpeak={triggerCatSpeak} />
        </div>
      )
    }
  ]

  return (
    <section 
      id="about" 
      style={{ 
        position: 'relative', 
        background: 'var(--bg-warm)', 
        borderTop: '1px solid var(--border)', 
        padding: 'var(--space-11) 0',
        overflow: 'hidden'
      }}
    >
      <div className="container" style={{ position: 'relative', zIndex: 2, width: '100%' }}>
        
        {/* Title Block */}
        <div style={{ marginBottom: 'var(--space-7)', maxWidth: '800px' }}>
          <FadeUp>
            <Label>About Me</Label>
          </FadeUp>
          <FadeUp delay={80}>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(34px, 4.5vw, 52px)',
              fontWeight: 400,
              letterSpacing: '-0.03em',
              lineHeight: 1.08,
              color: 'var(--text-primary)',
              marginTop: 'var(--space-4)',
              marginBottom: 'var(--space-5)',
            }}>
              The designer behind<br />
              <span style={{ color: 'var(--accent)', fontWeight: 600 }}>all the interactive play.</span>
            </h2>
          </FadeUp>
          <FadeUp delay={120}>
            <p style={{ fontSize: 16.5, lineHeight: 1.75, color: 'var(--text-secondary)', fontFamily: 'var(--font-body)', margin: 0, maxWidth: '720px' }}>
              I'm <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Soupriti</strong>, a Product Designer based in Bangalore. With a visual design foundation from <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>NIFT Chennai</strong>, I specialize in combining rigorous user ethnography with high-end, functional React prototypes.
            </p>
          </FadeUp>
        </div>

        {/* Header Controls for Notepad desk */}
        {!isMobile && (
          <FadeUp delay={160}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <span style={{ fontSize: 12.5, color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', fontWeight: 500 }}>
                {isAligned ? "📍 ALIGNED IN A ROW" : "🍃 SCATTERED MAT (DRAG OR HOVER CARDS)"}
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                  (or click the empty mat below)
                </span>
                <button
                  onClick={() => setIsAligned(!isAligned)}
                  style={{
                    fontSize: 10.5,
                    fontWeight: 700,
                    fontFamily: 'var(--font-mono)',
                    textTransform: 'uppercase',
                    color: '#ffffff',
                    background: 'var(--accent)',
                    border: 'none',
                    borderRadius: 12,
                    padding: '6px 14px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: 'var(--shadow-sm)',
                    outline: 'none'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.03)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)'
                  }}
                >
                  {isAligned ? "Scatter Notes" : "Arrange Horizontally"}
                </button>
              </div>
            </div>
          </FadeUp>
        )}

        {/* ── DRAGGABLE NOTEPAD DESK MAT ── */}
        <div 
          ref={deskRef}
          onClick={(e) => {
            // Toggles alignment only if user clicks the mat background itself
            if (e.target === e.currentTarget && !isMobile) {
              setIsAligned(!isAligned)
            }
          }}
          className="about-desk-mat"
          style={{
            position: 'relative',
            width: '100%',
            height: (isAligned || isMobile) ? 'auto' : '570px',
            background: 'var(--bg-card)',
            backgroundImage: 'radial-gradient(circle, rgba(0, 0, 0, 0.02) 1.2px, transparent 1.2px)',
            backgroundSize: '20px 20px',
            border: '1.5px dashed var(--border)',
            borderRadius: 28,
            padding: isMobile ? '24px' : '32px',
            boxSizing: 'border-box',
            overflow: (isAligned || isMobile) ? 'visible' : 'hidden',
            display: 'flex',
            flexDirection: (isAligned || isMobile) ? 'row' : 'row',
            flexWrap: (isAligned || isMobile) ? 'wrap' : 'nowrap',
            justifyContent: 'center',
            gap: '24px',
            cursor: (isAligned || isMobile) ? 'default' : 'pointer',
            userSelect: 'none',
            transition: 'height 0.4s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.3s'
          }}
        >
          {notes.map((item, idx) => {
            const defaultRotate = item.defaultRotate
            const targetRotate = (isAligned || isMobile) ? 0 : defaultRotate
            
            // Layout offsets based on mode
            const styleStacked = {
              position: 'absolute',
              left: item.scatteredLeft,
              top: item.scatteredTop,
              width: '290px',
              height: '380px',
              rotate: targetRotate,
              zIndex: 10 + idx,
              transformOrigin: 'center center'
            }

            const styleAligned = {
              position: 'relative',
              width: '290px',
              height: '380px',
              rotate: 0,
              zIndex: 1
            }

            return (
              <motion.div
                key={item.id}
                layout
                drag={!(isAligned || isMobile)}
                dragConstraints={deskRef}
                dragElastic={0.08}
                dragMomentum={false}
                style={(isAligned || isMobile) ? styleAligned : styleStacked}
                onClick={(e) => {
                  e.stopPropagation() // Don't trigger desk-mat align toggle
                  triggerCatSpeak(item.desc)
                }}
                whileHover={{
                  y: -14,
                  rotate: (isAligned || isMobile) ? 2 : defaultRotate + (idx % 2 === 0 ? 3 : -3),
                  scale: 1.025,
                  boxShadow: '0 25px 40px rgba(0, 82, 255, 0.08), 0 10px 20px rgba(0, 0, 0, 0.03)',
                  zIndex: 100
                }}
                whileDrag={{ 
                  scale: 1.05, 
                  rotate: 0, 
                  zIndex: 200, 
                  boxShadow: '0 30px 60px rgba(0,0,0,0.12)' 
                }}
                transition={{
                  type: 'spring',
                  stiffness: 220,
                  damping: 20
                }}
                className="about-notepad-card"
              >
                {/* Custom Colored Binder Stripe with silver coil loop binders */}
                <div style={{ 
                  height: '14px', 
                  background: item.color,
                  borderBottom: '1.2px solid rgba(0,0,0,0.06)',
                  borderRadius: '10px 10px 0 0', 
                  margin: '-20px -20px 20px -20px',
                  position: 'relative',
                  zIndex: 10
                }}>
                  {/* Binder coils rings */}
                  <div style={{ display: 'flex', justifyContent: 'space-around', padding: '0 16px', marginTop: '-7px' }}>
                    {[...Array(6)].map((_, rIdx) => (
                      <div key={rIdx} style={{
                        width: '6px',
                        height: '14px',
                        background: 'linear-gradient(90deg, #e5e5ea, #c7c7cc, #e5e5ea)',
                        borderRadius: '3px',
                        boxShadow: '0 1.5px 3px rgba(0,0,0,0.12)',
                        border: '0.8px solid rgba(0,0,0,0.06)'
                      }} />
                    ))}
                  </div>
                </div>

                {/* Classic red notebook margin line */}
                <div className="about-paper-margin" />

                {/* Faint blue notepad lines */}
                <div className="about-paper-lines">
                  {/* Header metadata */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', position: 'relative', zIndex: 5 }}>
                    <span style={{ fontSize: '9px', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'rgba(0, 82, 255, 0.5)', background: 'rgba(0,82,255,0.05)', padding: '2px 5px', borderRadius: '4px' }}>
                      NOTE 0{idx + 1}
                    </span>
                    <span style={{ fontSize: '9px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                      Bangalore, IN
                    </span>
                  </div>

                  {/* Title and Icon */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', position: 'relative', zIndex: 5 }}>
                    <span style={{ fontSize: '20px' }}>{item.icon}</span>
                    <h3 style={{
                      margin: 0,
                      fontFamily: 'var(--font-display)',
                      fontSize: '15.5px',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      letterSpacing: '-0.015em'
                    }}>
                      {item.title}
                    </h3>
                  </div>

                  {/* Card specific custom render */}
                  <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, position: 'relative', zIndex: 5 }}>
                    {item.render()}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

      </div>

      <style>{`
        /* Lined Notepad Paper Card Design */
        .about-notepad-card {
          background: #FCFAF5; /* Premium cream lined notebook paper */
          border: 1px solid rgba(0, 0, 0, 0.06);
          border-radius: 12px;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.03);
          box-sizing: border-box;
          overflow: hidden;
          padding: 20px;
          cursor: grab;
          display: flex;
          flex-direction: column;
          user-select: none;
          transition: border-color 0.25s, box-shadow 0.25s;
        }

        .about-notepad-card:active {
          cursor: grabbing;
        }

        .about-notepad-card:hover {
          border-color: var(--accent);
        }

        /* Red margin line */
        .about-paper-margin {
          position: absolute;
          left: 28px;
          top: 0;
          bottom: 0;
          width: 1px;
          background: rgba(239, 68, 68, 0.35); /* Classic red writing margin */
          z-index: 2;
          pointer-events: none;
        }

        /* Blueprint style faint blue writing lines */
        .about-paper-lines {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          background-image: linear-gradient(rgba(0, 82, 255, 0.03) 1px, transparent 1px);
          background-size: 100% 22px;
          background-position: 0 6px;
          padding-left: 18px; /* Offset text past the red margin line */
          box-sizing: border-box;
          z-index: 3;
        }

        /* Custom mat hover borders */
        .about-desk-mat:hover {
          border-color: rgba(0, 82, 255, 0.25);
          background-color: rgba(0, 82, 255, 0.005);
        }
      `}</style>
    </section>
  )
}
