import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import * as Icons from 'lucide-react'
import { FadeUp, Label } from './utils'

const expertise = [
  { 
    iconName: 'Layers', 
    title: 'Product Design', 
    body: 'End-to-end product thinking from concept to shipped feature — balancing user needs, business goals, and technical constraints.',
    color: '#E0F2FE', // Coinbase pale blue
    textColor: '#0369A1',
    defaultRotate: -4,
    top: '40px',
    left: '45px',
    number: '01'
  },
  { 
    iconName: 'Compass', 
    title: 'UX Strategy', 
    body: 'Shaping product direction through research synthesis, opportunity mapping, and outcome-driven design roadmaps.',
    color: '#DCFCE7', // Pale green
    textColor: '#15803D',
    defaultRotate: 6,
    top: '25px',
    left: '185px',
    number: '02'
  },
  { 
    iconName: 'Search', 
    title: 'User Research', 
    body: 'Qualitative and quantitative methods — interviews, usability tests, behavioral analytics — to ground decisions in real evidence.',
    color: '#FEF9C3', // Pale yellow
    textColor: '#A16207',
    defaultRotate: -5,
    top: '150px',
    left: '198px',
    number: '03'
  },
  { 
    iconName: 'Zap', 
    title: 'Interaction Design', 
    body: 'Crafting micro-interactions, spring animations, and state transitions that make digital products feel alive and responsive.',
    color: '#FEE2E2', // Pale red
    textColor: '#B91C1C',
    defaultRotate: 7,
    top: '200px',
    left: '35px',
    number: '04'
  },
  { 
    iconName: 'Grid', 
    title: 'Design Systems', 
    body: 'Building scalable, token-driven systems in Figma that empower teams to ship consistently and iterate rapidly at scale.',
    color: '#F3E8FF', // Pale purple
    textColor: '#6B21A8',
    defaultRotate: 4,
    top: '265px',
    left: '200px',
    number: '05'
  },
  { 
    iconName: 'Cpu', 
    title: 'AI Experiences', 
    body: 'Designing human-centered AI interfaces — translating complex machine learning models into intuitive, transparent interactions.',
    color: '#FFEDD5', // Pale orange
    textColor: '#C2410C',
    defaultRotate: -3,
    top: '310px',
    left: '105px',
    number: '06'
  },
]

export default function Expertise() {
  const [activeIndex, setActiveIndex] = useState(null)
  const [isDragging, setIsDragging] = useState(null)
  const boardRef = useRef(null)

  // Use the active index if selected, otherwise fallback to the general section introduction
  const activeItem = activeIndex !== null ? expertise[activeIndex] : {
    title: "What I do really well.",
    body: "Six craft areas honed across complex consumer IoT, SaaS dashboard architecture, and conversational interfaces. Drag magnets around the blue board or click to explore each craft."
  }

  return (
    <div 
      id="expertise" 
      style={{ 
        position: 'relative',
        minHeight: '60vh', // Minimized height
        background: 'var(--bg-warm)',
        display: 'flex',
        alignItems: 'center',
        padding: 'var(--space-8) 0', // Minimized padding
        overflow: 'hidden'
      }}
      className="expertise-wrapper-container"
    >
      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        <FadeUp>
          <div className="expertise-split-layout">
            
            {/* ── LEFT PANEL: DYNAMIC DETAILS ── */}
            <div className="expertise-left-panel">
              <Label>Expertise</Label>
              <div className="active-details-wrapper" key={activeIndex ?? 'default'}>
                <h2 className="expertise-active-title">
                  {activeItem.title}
                </h2>
                <p className="expertise-active-body">
                  {activeItem.body}
                </p>
              </div>
            </div>

            {/* ── RIGHT PANEL: THE INTERACTIVE BLUE BOARD ── */}
            <div className="expertise-right-panel">
              <div 
                className="board-wrapper"
                style={{
                  position: 'relative',
                  width: '320px',
                  height: '420px',
                  flexShrink: 0
                }}
              >
                {/* ── BLUE BOARD SURFACE WITH SILVER FRAME ── */}
                <div 
                  ref={boardRef}
                  className="blue-board"
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    background: 'radial-gradient(circle at 30% 20%, #2563eb 0%, #1e3a8a 100%)',
                    borderRadius: '12px',
                    boxShadow: 'inset 0 4px 10px rgba(0, 0, 0, 0.3), 0 10px 25px rgba(0, 0, 0, 0.15)',
                    overflow: 'hidden',
                    border: '10px solid #94a3b8', // Silver aluminum frame
                    outline: '1.5px solid #64748b',
                    boxSizing: 'border-box'
                  }}
                >
                  {/* Subtle Grid Overlay representing a planning layout */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
                    backgroundSize: '24px 24px',
                    pointerEvents: 'none'
                  }} />

                  {/* Gloss reflection shine overlay */}
                  <div style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, height: '50%',
                    background: 'linear-gradient(to bottom, rgba(255,255,255,0.04), transparent)',
                    pointerEvents: 'none'
                  }} />

                  {/* Frame plastic corner brackets */}
                  <div style={{ position: 'absolute', top: 0, left: 0, width: '12px', height: '12px', background: '#475569', borderRadius: '2px 0 2px 0', borderRight: '0.5px solid #1e293b', borderBottom: '0.5px solid #1e293b' }} />
                  <div style={{ position: 'absolute', top: 0, right: 0, width: '12px', height: '12px', background: '#475569', borderRadius: '0 2px 0 2px', borderLeft: '0.5px solid #1e293b', borderBottom: '0.5px solid #1e293b' }} />
                  <div style={{ position: 'absolute', bottom: 0, left: 0, width: '12px', height: '12px', background: '#475569', borderRadius: '0 2px 0 2px', borderRight: '0.5px solid #1e293b', borderTop: '0.5px solid #1e293b' }} />
                  <div style={{ position: 'absolute', bottom: 0, right: 0, width: '12px', height: '12px', background: '#475569', borderRadius: '2px 0 2px 0', borderLeft: '0.5px solid #1e293b', borderTop: '0.5px solid #1e293b' }} />


                  {/* ── DRAGGABLE MAGNETS ── */}
                  {expertise.map((item, idx) => {
                    const isHovered = activeIndex === idx
                    const IconComponent = Icons[item.iconName] || Icons.Sparkles
                    return (
                      <motion.div
                        key={item.title}
                        className="fridge-magnet"
                        drag
                        dragConstraints={boardRef}
                        dragElastic={0.02}
                        dragMomentum={false}
                        onDragStart={() => setIsDragging(idx)}
                        onDragEnd={() => setTimeout(() => setIsDragging(null), 85)}
                        onMouseEnter={() => {
                          if (isDragging === null) setActiveIndex(idx)
                        }}
                        onMouseLeave={() => {
                          if (isDragging === null) setActiveIndex(null)
                        }}
                        onClick={(e) => {
                          e.stopPropagation()
                          if (isDragging !== null) return
                          setActiveIndex(idx)
                          const speakEvent = new CustomEvent('cat-speak', {
                            detail: { text: `My ${item.title} expertise: ${item.body}` }
                          })
                          window.dispatchEvent(speakEvent)
                        }}
                        style={{
                          position: 'absolute',
                          left: item.left,
                          top: item.top,
                          width: '85px',
                          height: '108px',
                          background: item.color,
                          borderRadius: '8px',
                          border: '4px solid #ffffff',
                          boxShadow: '0 4px 8px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.06), 1px 1px 0px rgba(0,0,0,0.08)',
                          outline: '1px solid rgba(0, 0, 0, 0.08)',
                          cursor: 'grab',
                          zIndex: isHovered ? 12 : 7,
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: '6px',
                          boxSizing: 'border-box',
                          userSelect: 'none',
                          touchAction: 'none'
                        }}
                        animate={{
                          rotate: isHovered ? 0 : item.defaultRotate,
                          scale: isHovered ? 1.08 : 1,
                          boxShadow: isHovered 
                            ? '0 12px 24px rgba(0,0,0,0.22), 0 4px 8px rgba(0,0,0,0.12)' 
                            : '0 4px 8px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.06), 1px 1px 0px rgba(0,0,0,0.08)'
                        }}
                        whileDrag={{ cursor: 'grabbing', scale: 1.12, zIndex: 50 }}
                        transition={{
                          type: 'spring',
                          stiffness: 150,
                          damping: 15
                        }}
                      >
                        {/* Magnet Icon Graphic */}
                        <div style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <IconComponent size={24} color={item.textColor} strokeWidth={2.2} style={{ filter: 'drop-shadow(0 1.5px 2px rgba(0,0,0,0.1))' }} />
                        </div>
                        
                        {/* Title text */}
                        <div style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '8px',
                          fontWeight: 800,
                          color: item.textColor,
                          letterSpacing: '0.04em',
                          lineHeight: 1.1,
                          textAlign: 'center',
                          wordWrap: 'break-word',
                          maxWidth: '100%'
                        }}>
                          {item.title.toUpperCase()}
                        </div>

                        {/* Miniature catalog ID */}
                        <span style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '6.5px',
                          color: item.textColor,
                          opacity: 0.55,
                          marginTop: '4px'
                        }}>
                          M-{item.number}
                        </span>
                      </motion.div>
                    )
                  })}

                </div>

                {/* ── ALUMINUM ACCESSORY TRAY AT BOTTOM ── */}
                <div style={{
                  position: 'absolute',
                  bottom: '-12px',
                  left: '20px',
                  right: '20px',
                  height: '10px',
                  background: 'linear-gradient(to bottom, #cbd5e1, #94a3b8)',
                  borderRadius: '2px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.5)',
                  zIndex: 10,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '24px'
                }}>
                  {/* Black Board Marker */}
                  <div style={{
                    width: '45px',
                    height: '4px',
                    background: '#0f172a',
                    borderRadius: '2px',
                    position: 'relative',
                    transform: 'translateY(-3px) rotate(1deg)',
                    boxShadow: '0 2px 2px rgba(0,0,0,0.2)'
                  }}>
                    {/* Red Cap */}
                    <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '8px', background: '#dc2626', borderRadius: '0 2px 2px 0' }} />
                  </div>
                  
                  {/* Board Eraser */}
                  <div style={{
                    width: '32px',
                    height: '8px',
                    background: '#475569',
                    borderRadius: '2px',
                    borderTop: '3px solid #1e293b', // wooden/plastic grip back
                    position: 'relative',
                    transform: 'translateY(-4px) rotate(-1deg)',
                    boxShadow: '0 2.5px 3px rgba(0,0,0,0.25)'
                  }} />
                </div>

              </div>
            </div>

          </div>
        </FadeUp>
      </div>

      <style>{`
        /* ── SPLIT LAYOUT ── */
        .expertise-split-layout {
          display: grid;
          grid-template-columns: 1fr 1.1fr;
          grid-template-areas: "details folder";
          gap: var(--space-8);
          align-items: center;
        }

        .expertise-left-panel {
          grid-area: details;
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
          min-height: 200px;
          justify-content: center;
          padding-left: var(--space-4);
        }

        .active-details-wrapper {
          animation: detailFadeIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes detailFadeIn {
          from { opacity: 0; transform: translateY(8px); filter: blur(3px); }
          to { opacity: 1; transform: translateY(0); filter: blur(0); }
        }

        .expertise-active-title {
          font-family: var(--font-display);
          font-size: clamp(28px, 3.2vw, 40px);
          font-weight: 400;
          letter-spacing: -0.025em;
          line-height: 1.15;
          color: var(--text-primary);
          margin: var(--space-2) 0;
        }

        .expertise-active-body {
          font-size: 15.5px;
          line-height: 1.65;
          color: var(--text-secondary);
          max-width: 46ch;
          margin: 0;
        }

        .expertise-right-panel {
          grid-area: folder;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        /* ── RESPONSIVE MOBILE ADJUSTMENTS ── */
        @media (max-width: 900px) {
          .expertise-wrapper-container {
            padding: var(--space-6) 0 !important;
          }

          .expertise-split-layout {
            grid-template-columns: 1fr;
            grid-template-areas: 
              "details"
              "folder";
            gap: var(--space-6);
          }

          .expertise-left-panel {
            min-height: auto;
            padding-left: 0;
          }

          .expertise-right-panel {
            justify-content: center;
            margin-top: var(--space-4);
          }
        }
      `}</style>
    </div>
  )
}
