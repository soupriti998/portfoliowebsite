import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FadeUp, Label } from './utils'
import PassionsPlayground from './PassionsPlayground'

/* ── High-Fidelity Custom SVG Icons ── */
const SearchIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
)

const BulbIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A5 5 0 0 0 8 8c0 1 .4 2.5 1.5 3.5.7.8 1.3 1.5 1.5 2.5M9 18h6M10 22h4"/>
  </svg>
)

const NibIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275Z"/>
  </svg>
)

const RefreshIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8M21 3v5h-5M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16M3 21v-5h5"/>
  </svg>
)

const BoxIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
    <polyline points="3.29 7 12 12 20.71 7"/>
    <line x1="12" y1="22" x2="12" y2="12"/>
  </svg>
)

const MouseIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="2" width="14" height="20" rx="7"/>
    <line x1="12" y1="6" x2="12" y2="12"/>
  </svg>
)

const PaintIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 14.7255 3.09032 17.1962 4.85857 19C5.0371 19.1785 5.09703 19.4444 5.01168 19.6841C4.79603 20.2898 4.68 20.9317 4.68 21.6C4.68 21.8209 4.85909 22 5.08 22H12Z"/>
    <circle cx="7.5" cy="10.5" r="1.5" fill="currentColor"/><circle cx="11.5" cy="7.5" r="1.5" fill="currentColor"/><circle cx="16.5" cy="9.5" r="1.5" fill="currentColor"/>
  </svg>
)

const BriefcaseIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
  </svg>
)

const MapPinIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
  </svg>
)

const ClockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
)

const RocketIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 16.5c-1.5 1.25-2.5 3.5-2.5 3.5s2.25-1 3.5-2.5M12 2C6 2 2 6 2 12c0 2.5 1.5 4.5 3.5 5.5l11-11C15.5 4.5 13.5 3 12 2Z"/><path d="M20 4c.5-1 .5-1 .5-1s0 0-1 .5l-2.5 2.5 3 3L20 4Z"/><path d="M19 9c-1-1.5-2.5-3-3.5-3.5l-11 11c1 2 3 3.5 5.5 3.5 6 0 10-4 10-10Z"/>
  </svg>
)

export default function About() {
  const [activeExplain, setActiveExplain] = useState("Click on any highlight inside the Bento grid to activate the Soup AI thought stream!")
  
  // Design Toolkit Auto-scroll index
  const [toolkitIndex, setToolkitIndex] = useState(0)
  const [hoveredToolkit, setHoveredToolkit] = useState(false)

  useEffect(() => {
    if (hoveredToolkit) return
    const timer = setInterval(() => {
      setToolkitIndex((prev) => (prev + 1) % 4)
    }, 3200)
    return () => clearInterval(timer)
  }, [hoveredToolkit])

  // Strategic Process Checklist States
  const [processStep, setProcessStep] = useState(1)

  useEffect(() => {
    const timer = setInterval(() => {
      setProcessStep((prev) => (prev === 4 ? 1 : prev + 1))
    }, 3500)
    return () => clearInterval(timer)
  }, [])

  const triggerCatSpeak = (text) => {
    setActiveExplain(text)
    const speakEvent = new CustomEvent('cat-speak', {
      detail: { text }
    });
    window.dispatchEvent(speakEvent);
  }

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
        <div style={{ marginBottom: 'var(--space-8)', maxWidth: '800px' }}>
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
              I'm <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>soupriti</strong>, a Product Designer based in Bangalore. With a visual design foundation from <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>NIFT Chennai</strong>, I specialize in combining rigorous user ethnography with high-end, functional React prototypes.
            </p>
          </FadeUp>
        </div>

        {/* ── BENTO GRID LAYOUT (Mimicking Ref Image 1) ── */}
        <div className="about-bento-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gap: 24,
          marginTop: 'var(--space-7)'
        }}>

          {/* CARD A (Top Left): "Total Sales" style Telemetry box */}
          <div 
            className="bento-box shadow-card bento-card-a"
            onClick={() => triggerCatSpeak("My professional telemetry shows high figma-to-code accuracy and extensive kitchen-observational UX hours.")}
            style={{
              gridColumn: 'span 6',
              background: 'var(--bg-card)',
              border: '1.5px solid var(--border)',
              borderRadius: 24,
              padding: '28px 32px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: 280,
              cursor: 'pointer',
              userSelect: 'none'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
                  TELEMETRY / METRIC
                </span>
                <span style={{ fontSize: 14, color: 'var(--text-muted)' }}>•••</span>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginTop: 16 }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(44px, 4.5vw, 56px)', fontWeight: 600, color: 'var(--text-primary)', margin: 0, letterSpacing: '-0.02em', lineHeight: 1 }}>
                  100%
                </h3>
                <span style={{ 
                  fontSize: 11.5, 
                  fontWeight: 700, 
                  color: 'var(--accent)', 
                  background: 'rgba(0, 82, 255, 0.08)',
                  padding: '4px 10px', 
                  borderRadius: 12,
                  fontFamily: 'var(--font-mono)'
                }}>
                  ↗ SPEC MATCH
                </span>
              </div>
              <span style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginTop: 6, display: 'block' }}>
                FIGMA TO PROTOTYPE
              </span>
            </div>

            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr', 
              borderTop: '1px solid var(--border)', 
              paddingTop: 20,
              marginTop: 16,
              gap: 16 
            }}>
              <div>
                <h4 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 500, color: 'var(--text-primary)', margin: 0 }}>
                  4.0
                </h4>
                <span style={{ fontSize: 11, color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}>
                  Years in UX Design
                </span>
              </div>
              <div>
                <h4 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 500, color: 'var(--text-primary)', margin: 0 }}>
                  12+
                </h4>
                <span style={{ fontSize: 11, color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}>
                  Shipped Projects
                </span>
              </div>
            </div>
          </div>

          {/* CARD B (Top Right): Circle/Pie chart style Quality Distribution */}
          <div 
            className="bento-box shadow-card bento-card-b"
            onClick={() => triggerCatSpeak("This is my designer profile split: 50% Interaction Craft, 30% Ethnographic User Research, and 20% Visual Systems.")}
            style={{
              gridColumn: 'span 6',
              background: 'var(--bg-card)',
              border: '1.5px solid var(--border)',
              borderRadius: 24,
              padding: '28px 32px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: 280,
              cursor: 'pointer',
              userSelect: 'none'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
                ROLE FOCUS / SPECTRUM
              </span>
              <span style={{ fontSize: 14, color: 'var(--text-muted)' }}>•••</span>
            </div>

            {/* Circular visualization resembling Ref Image 1 top right */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 32, margin: '20px 0' }}>
              <div style={{ position: 'relative', width: 90, height: 90, flexShrink: 0 }}>
                {/* Big blue circle */}
                <div style={{ position: 'absolute', top: 0, left: 0, width: 90, height: 90, borderRadius: '50%', background: 'var(--accent)', opacity: 0.85 }} />
                {/* Overlapping darker circle */}
                <div style={{ position: 'absolute', top: 15, left: 45, width: 55, height: 55, borderRadius: '50%', background: 'var(--text-primary)', opacity: 0.9 }} />
                {/* Overlapping grey circle */}
                <div style={{ position: 'absolute', top: 40, left: 80, width: 35, height: 35, borderRadius: '50%', background: 'var(--text-muted)', opacity: 0.6 }} />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flexGrow: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12.5 }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-secondary)' }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)' }} /> Interaction Craft
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--text-primary)' }}>50%</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12.5 }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-secondary)' }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--text-primary)' }} /> User Research
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--text-primary)' }}>30%</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12.5 }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-secondary)' }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--text-muted)' }} /> Visual Systems
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--text-primary)' }}>20%</span>
                </div>
              </div>
            </div>

            <span style={{ fontSize: 11, color: 'var(--text-secondary)', fontFamily: 'var(--font-body)', textAlign: 'left' }}>
              Hover to examine core capabilities in the toolkit below
            </span>
          </div>

          {/* CARD C (Middle): "Cancellations" wide layout style card - DESIGN TOOLKIT */}
          <div 
            className="bento-box shadow-card bento-card-c"
            onMouseEnter={() => setHoveredToolkit(true)}
            onMouseLeave={() => setHoveredToolkit(false)}
            style={{
              gridColumn: 'span 12',
              background: 'var(--bg-card)',
              border: '1.5px solid var(--border)',
              borderRadius: 24,
              padding: '28px 32px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
                01 // DESIGN TOOLKIT slider
              </span>
              <span style={{ 
                fontSize: 8.5, 
                fontFamily: 'var(--font-mono)', 
                fontWeight: 700, 
                color: hoveredToolkit ? '#8e8e93' : 'var(--accent)', 
                background: hoveredToolkit ? 'rgba(0,0,0,0.04)' : 'rgba(0, 82, 255, 0.06)',
                padding: '3px 8px',
                borderRadius: 4,
                letterSpacing: '0.04em',
                transition: 'all 0.2s'
              }}>
                {hoveredToolkit ? 'PAUSED' : 'AUTO_SCROLL'}
              </span>
            </div>

            {/* Horizontal sliding viewport */}
            <div style={{ width: '100%', overflow: 'hidden', position: 'relative', height: 112 }}>
              <div style={{
                display: 'flex',
                width: '400%',
                height: '100%',
                transform: `translateX(-${toolkitIndex * 25}%)`,
                transition: 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)'
              }}>
                {[
                  { title: 'Product Design', sub: 'Figma to React', icon: <BoxIcon />, text: "Holistic end-to-end design from user research mapping to React/JS front-end logic." },
                  { title: 'User Research', sub: 'Contextual Inquiry', icon: <SearchIcon />, text: "Ethnographic logs, user interviews, telemetry mapping, and usability testing." },
                  { title: 'Interaction Design', sub: 'Micro-interactions', icon: <MouseIcon />, text: "Fluid animations, micro-interactions, state transitions, and responsive structures." },
                  { title: 'UI Design & Systems', sub: 'Figma Spec Systems', icon: <PaintIcon />, text: "High-contrast visual design, custom icon vectors, typography rhythms, and design systems." }
                ].map((item) => (
                  <div 
                    key={item.title}
                    className="bento-toolkit-slider-item"
                    onClick={() => triggerCatSpeak(item.text)}
                    style={{
                      width: '25%',
                      height: '100%',
                      padding: '0 8px',
                      display: 'flex',
                      alignItems: 'center',
                      flexShrink: 0
                    }}
                  >
                    <div style={{
                      width: '100%',
                      height: '100%',
                      padding: '20px 24px',
                      borderRadius: 16,
                      border: '1.2px solid var(--border)',
                      background: 'var(--bg-warm)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 20,
                      transition: 'all 0.25s',
                      userSelect: 'none'
                    }}>
                      <div className="toolkit-icon-capsule" style={{
                        width: 44, height: 44, borderRadius: '50%',
                        background: 'var(--bg-card)',
                        border: '1.2px solid var(--border)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: 'var(--accent)', flexShrink: 0,
                        transition: 'all 0.25s'
                      }}>{item.icon}</div>
                      
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>
                          {item.title}
                        </span>
                        <span style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginTop: 2, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                          {item.sub}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom selection slider dots */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 12 }}>
              {[0, 1, 2, 3].map(idx => (
                <button
                  key={idx}
                  onClick={() => setToolkitIndex(idx)}
                  style={{
                    width: toolkitIndex === idx ? 16 : 6,
                    height: 6,
                    borderRadius: 3,
                    background: toolkitIndex === idx ? 'var(--accent)' : 'rgba(var(--accent-rgb), 0.15)',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    transition: 'all 0.25s cubic-bezier(0.23, 1, 0.32, 1)',
                    outline: 'none'
                  }}
                />
              ))}
            </div>
          </div>

          {/* CARD D (Bottom Left): Tall card containing PASSIONS & PLAYGROUND */}
          <div 
            className="bento-box shadow-card bento-card-d"
            style={{
              gridColumn: 'span 6',
              height: 480,
              background: 'var(--bg-card)',
              border: '1.5px solid var(--border)',
              borderRadius: 24,
              padding: '28px 32px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              overflow: 'hidden'
            }}
          >
            <div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
                05 // PASSIONS & DRIVE
              </span>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 500, color: 'var(--text-primary)', margin: '8px 0 0 0', letterSpacing: '-0.015em' }}>
                Interactive Playground
              </h3>
              <p style={{ fontSize: 12, color: 'var(--text-secondary)', fontFamily: 'var(--font-body)', marginTop: 4, marginBottom: 12 }}>
                Figma-to-code components and hobbies. Drag them around!
              </p>
            </div>

            {/* Central dragging playground */}
            <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <PassionsPlayground triggerCatSpeak={triggerCatSpeak} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12, borderTop: '1px solid var(--border)', paddingTop: 16 }}>
              <span style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                FORCE FEEDBACK: ON
              </span>
              <button 
                onClick={() => triggerCatSpeak("I enjoy learning new hobbies, experimenting with WebGL, and building interactive micro-interactions!")}
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: '#ffffff',
                  background: 'var(--accent)',
                  border: 'none',
                  borderRadius: 8,
                  padding: '6px 12px',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-body)'
                }}
              >
                Learn more
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN container wrapping Card E and F & G */}
          <div className="bento-card-right-col" style={{
            gridColumn: 'span 6',
            display: 'flex',
            flexDirection: 'column',
            gap: 24,
            height: 480
          }}>
            
            {/* CARD E (Bottom Right Top): "Setup: 4 Tasks" style Blue checklist - STRATEGIC PROCESS */}
            <div 
              className="bento-box bento-card-e"
              style={{
                background: 'var(--accent)',
                borderRadius: 24,
                padding: '24px 28px',
                display: 'flex',
                flexDirection: 'column',
                flexGrow: 1,
                position: 'relative',
                color: '#ffffff',
                boxShadow: '0 12px 30px rgba(0, 82, 255, 0.15)',
                overflow: 'hidden'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, color: 'rgba(255, 255, 255, 0.7)', letterSpacing: '0.05em' }}>
                  03 // STRATEGIC PROCESS
                </span>
                <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'rgba(255, 255, 255, 0.7)' }}>
                  0{processStep} / 04 TASKS
                </span>
              </div>

              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 500, margin: '0 0 16px 0', letterSpacing: '-0.02em' }}>
                4 Design Tasks
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { label: 'Research deeply', num: '01', text: "She maps ethnographic cooking journals before designing a single high-fidelity screen." },
                  { label: 'Think strategically', num: '02', text: "Every layout connects directly to key product metrics: retention, rating, and adoption." },
                  { label: 'Design intentionally', num: '03', text: "No generic presets. She uses clear visual indicators to manage cognitive load." },
                  { label: 'Iterate constantly', num: '04', text: "From early grey paper prototypes to fully working React models, she builds to learn." }
                ].map((item, index) => {
                  const isChecked = index + 1 <= processStep;
                  const isLatest = index + 1 === processStep;

                  return (
                    <div 
                      key={item.label}
                      onClick={() => triggerCatSpeak(item.text)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '10px 14px',
                        background: isLatest ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                        border: isLatest ? '1px solid rgba(255, 255, 255, 0.3)' : '1px solid transparent',
                        borderRadius: 12,
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        opacity: isChecked ? 1 : 0.55
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        {/* Checkmark circle */}
                        <div style={{
                          width: 18, height: 18, borderRadius: '50%',
                          background: isChecked ? '#ffffff' : 'transparent',
                          border: isChecked ? '1.5px solid #ffffff' : '1.5px solid rgba(255, 255, 255, 0.4)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          color: 'var(--accent)', fontSize: 10, fontWeight: 800, flexShrink: 0
                        }}>
                          {isChecked && '✓'}
                        </div>
                        <span style={{ fontSize: 13, fontWeight: 500 }}>{item.label}</span>
                      </div>
                      <span style={{ fontSize: 12, opacity: 0.6 }}>→</span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* CARD F & G: Two small square cards side by side */}
            <div className="bento-card-fg-row" style={{
              display: 'flex',
              gap: 24,
              height: 140
            }}>
              
              {/* CARD F (Peer Rating) */}
              <div 
                className="bento-box shadow-card bento-card-f"
                onClick={() => triggerCatSpeak("Peers rate me 4.9 out of 5 for collaboration, technical alignment, and visual craft quality.")}
                style={{
                  flex: 1,
                  background: 'var(--bg-card)',
                  border: '1.5px solid var(--border)',
                  borderRadius: 24,
                  padding: '20px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  userSelect: 'none'
                }}
              >
                <div>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 600, color: 'var(--text-primary)', margin: 0, letterSpacing: '-0.02em', lineHeight: 1 }}>
                    4.9
                  </h4>
                  <span style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', display: 'block', marginTop: 4 }}>
                    ↗ PEER RATING
                  </span>
                </div>
                <span style={{ fontSize: 11, color: 'var(--text-secondary)', fontFamily: 'var(--font-body)', lineHeight: 1.2 }}>
                  Collaboration & Craft
                </span>
              </div>

              {/* CARD G (Engagement Boost) */}
              <div 
                className="bento-box shadow-card bento-card-g"
                onClick={() => triggerCatSpeak("By designing intuitive and simplified SaaS controls, I help reduce onboarding friction and boost user adoption.")}
                style={{
                  flex: 1,
                  background: 'var(--bg-card)',
                  border: '1.5px solid var(--border)',
                  borderRadius: 24,
                  padding: '20px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  userSelect: 'none'
                }}
              >
                <div>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 600, color: 'var(--text-primary)', margin: 0, letterSpacing: '-0.02em', lineHeight: 1 }}>
                    80%
                  </h4>
                  <span style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', display: 'block', marginTop: 4 }}>
                    ↗ USER RETENTION
                  </span>
                </div>
                <span style={{ fontSize: 11, color: 'var(--text-secondary)', fontFamily: 'var(--font-body)', lineHeight: 1.2 }}>
                  Reduced friction
                </span>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Bento Grid styling stylesheets */}
      <style>{`
        .shadow-card {
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02), 0 1px 2px rgba(0, 0, 0, 0.03);
          transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s cubic-bezier(0.23, 1, 0.32, 1);
        }
        
        .shadow-card:hover {
          border-color: rgba(0, 82, 255, 0.2) !important;
          box-shadow: 0 8px 30px rgba(0, 82, 255, 0.04);
          transform: translateY(-2px);
        }

        .bento-toolkit-slider-item > div:hover {
          border-color: var(--accent) !important;
          background: var(--bg-card) !important;
          transform: translateY(-3px);
          box-shadow: 0 6px 20px rgba(0, 82, 255, 0.06);
        }
        .bento-toolkit-slider-item > div:hover .toolkit-icon-capsule {
          background: var(--accent) !important;
          color: #ffffff !important;
          border-color: var(--accent) !important;
        }

        /* Responsive Bento Grid overrides */
        @media (max-width: 1023px) {
          .about-bento-grid {
            grid-template-columns: 1fr !important;
          }
          .bento-card-a, .bento-card-b, .bento-card-c, .bento-card-d, .bento-card-right-col {
            grid-column: span 12 !important;
          }
          .bento-card-right-col {
            height: auto !important;
          }
          .bento-card-d {
            height: 400px !important;
          }
          .bento-card-fg-row {
            flex-direction: column !important;
            height: auto !important;
          }
          .bento-card-f, .bento-card-g {
            height: 120px !important;
          }
        }
      `}</style>
    </section>
  )
}
