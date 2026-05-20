import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FadeUp, Label } from './utils'

const expertise = [
  { 
    icon: '🎨', 
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
    icon: '🧭', 
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
    icon: '🔍', 
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
    icon: '⚡', 
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
    icon: '📦', 
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
    icon: '🤖', 
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
  const [isOpen, setIsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(null)

  // Use the active index if selected, otherwise fallback to the general section introduction
  const activeItem = activeIndex !== null ? expertise[activeIndex] : {
    title: "What I do really well.",
    body: "Six craft areas honed across complex consumer IoT, SaaS dashboard architecture, and conversational interfaces. Hover over the fridge magnets to explore each craft."
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

            {/* ── RIGHT PANEL: THE INTERACTIVE FRIDGE ── */}
            <div className="expertise-right-panel">
              <div 
                className="fridge-wrapper"
                style={{
                  position: 'relative',
                  width: '320px',
                  height: '420px',
                  perspective: '1200px',
                  flexShrink: 0
                }}
              >
                {/* ── FRIDGE CABINET INTERIOR (Visible when door is open) ── */}
                <div 
                  className="fridge-interior"
                  onClick={() => setIsOpen(false)}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: '#f3f4f6', // Cabinet interior light gray
                    borderRadius: '24px',
                    border: '1.5px solid var(--border)',
                    boxShadow: 'inset 0 10px 30px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.05)',
                    zIndex: 1,
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: 'pointer'
                  }}
                >
                  {/* Internal Warm Yellow Light Glow */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(circle at center, rgba(254, 240, 138, 0.35) 0%, transparent 80%)',
                    pointerEvents: 'none'
                  }} />

                  {/* SHELF 1 */}
                  <div style={{
                    position: 'absolute',
                    top: '120px', left: '12px', right: '12px', height: '6px',
                    background: 'rgba(255, 255, 255, 0.75)',
                    border: '1px solid rgba(0,0,0,0.12)',
                    borderRadius: '3px',
                    zIndex: 2
                  }} />

                  {/* SHELF 1 ITEMS */}
                  {/* Soda Can */}
                  <div style={{ position: 'absolute', left: '50px', bottom: '300px', zIndex: 3 }}>
                    <div style={{
                      width: '22px',
                      height: '38px',
                      background: 'linear-gradient(135deg, #FF4B4B, #C0392B)',
                      borderRadius: '4px',
                      border: '1px solid rgba(0,0,0,0.15)',
                      position: 'relative',
                      boxShadow: '0 3px 6px rgba(0,0,0,0.15)'
                    }}>
                      <div style={{ position: 'absolute', top: '-1.5px', left: '2px', right: '2px', height: '1.5px', background: '#e0e0e0', borderRadius: '50%' }} />
                      <div style={{ position: 'absolute', top: '12px', left: 0, right: 0, height: '6px', background: '#fff', transform: 'skewY(-8deg)', opacity: 0.75 }} />
                    </div>
                  </div>

                  {/* Milk Bottle */}
                  <div style={{ position: 'absolute', left: '90px', bottom: '300px', zIndex: 3 }}>
                    <div style={{
                      width: '26px',
                      height: '58px',
                      background: 'rgba(255, 255, 255, 0.95)',
                      borderTopLeftRadius: '10px',
                      borderTopRightRadius: '10px',
                      borderBottomLeftRadius: '3px',
                      borderBottomRightRadius: '3px',
                      border: '1px solid rgba(0,0,0,0.12)',
                      position: 'relative',
                      boxShadow: '0 3px 5px rgba(0,0,0,0.08)',
                      overflow: 'hidden'
                    }}>
                      <div style={{ position: 'absolute', top: '22px', left: 0, right: 0, height: '14px', background: 'rgba(0, 82, 255, 0.08)', borderTop: '1px solid rgba(0, 82, 255, 0.15)', borderBottom: '1px solid rgba(0, 82, 255, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ fontSize: '6.5px', fontWeight: 800, color: 'var(--accent)', fontFamily: 'var(--font-mono)', scale: 0.85 }}>MILK</span>
                      </div>
                      <div style={{ position: 'absolute', top: 0, left: '5px', right: '5px', height: '3.5px', background: '#FF4B4B', borderRadius: '1px' }} />
                    </div>
                  </div>

                  {/* SHELF 2 */}
                  <div style={{
                    position: 'absolute',
                    top: '260px', left: '12px', right: '12px', height: '6px',
                    background: 'rgba(255, 255, 255, 0.75)',
                    border: '1px solid rgba(0,0,0,0.12)',
                    borderRadius: '3px',
                    zIndex: 2
                  }} />

                  {/* SHELF 2 ITEMS */}
                  {/* Slice of Cake on Plate */}
                  <div style={{ position: 'absolute', left: '120px', bottom: '160px', display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 3 }}>
                    <div style={{ width: '52px', height: '7px', background: '#f3f4f6', borderRadius: '50%', border: '1px solid #d1d5db', position: 'absolute', bottom: 0 }} />
                    <div style={{
                      width: '34px',
                      height: '28px',
                      position: 'absolute',
                      bottom: '3px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-end',
                      overflow: 'hidden'
                    }}>
                      <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#FF4B4B', alignSelf: 'center', marginBottom: '-2px', zIndex: 2 }} />
                      <div style={{
                        height: '20px',
                        width: '100%',
                        background: 'linear-gradient(to bottom, #FFF, #FED7D7 40%, #7B3F00 45%, #7B3F00 55%, #FFF 60%, #FFF)',
                        borderRadius: '1.5px',
                        border: '1px solid rgba(0,0,0,0.1)',
                        zIndex: 1
                      }} />
                    </div>
                    {/* Small warning note next to the cake */}
                    <div style={{
                      position: 'absolute',
                      left: '46px',
                      bottom: '8px',
                      background: '#FFD166',
                      border: '1px solid rgba(0,0,0,0.08)',
                      padding: '1px 4px',
                      fontSize: '6.5px',
                      fontWeight: 800,
                      fontFamily: 'var(--font-mono)',
                      whiteSpace: 'nowrap',
                      rotate: '6deg',
                      boxShadow: '0 1.5px 3px rgba(0,0,0,0.08)',
                      color: '#0a0b0d'
                    }}>
                      Luffy's! 🐾
                    </div>
                  </div>

                </div>

                {/* ── FRIDGE DOOR (Swings open to the left on click) ── */}
                <motion.div
                  className="fridge-door"
                  onClick={(e) => {
                    // Prevent toggling door state if clicking on handle, magnets or sticky note directly (to keep focus clean)
                    if (e.target.closest('.fridge-magnet') || e.target.closest('.sticky-note')) return
                    setIsOpen(!isOpen)
                  }}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(135deg, #B5EAD7, #85D3CB)', // Retro mint green
                    borderRadius: '24px',
                    border: '1.5px solid rgba(0, 0, 0, 0.08)',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.08), inset 0 2px 4px rgba(255,255,255,0.4)',
                    zIndex: 5,
                    transformOrigin: 'left center',
                    backfaceVisibility: 'hidden',
                    overflow: 'visible'
                  }}
                  animate={{
                    rotateY: isOpen ? -100 : 0,
                    boxShadow: isOpen 
                      ? '12px 10px 30px rgba(0,0,0,0.15)' 
                      : '0 10px 30px rgba(0,0,0,0.08)'
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 110,
                    damping: 18
                  }}
                >
                  {/* Gloss reflection line */}
                  <div style={{
                    position: 'absolute',
                    top: 0, left: 0, bottom: 0, width: '45px',
                    background: 'linear-gradient(to right, rgba(255,255,255,0.22), transparent)',
                    borderTopLeftRadius: '24px',
                    borderBottomLeftRadius: '24px',
                    pointerEvents: 'none'
                  }} />

                  {/* Chrome Retro Handle (Left edge) */}
                  <div 
                    className="fridge-handle"
                    onClick={() => setIsOpen(!isOpen)}
                    style={{
                      position: 'absolute',
                      right: '16px', // Right side of the door so it swings from the left hinge!
                      top: '80px',
                      width: '14px',
                      height: '130px',
                      background: 'linear-gradient(to right, #bdbdbd, #ffffff 30%, #e0e0e0 70%, #9e9e9e)',
                      borderRadius: '6px',
                      boxShadow: '0 4px 8px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.4)',
                      cursor: 'pointer',
                      zIndex: 10
                    }}
                  >
                    {/* Handle brackets */}
                    <div style={{ position: 'absolute', left: '-3px', top: '12px', width: '20px', height: '6px', background: '#9e9e9e', borderRadius: '1.5px', border: '0.5px solid rgba(0,0,0,0.1)' }} />
                    <div style={{ position: 'absolute', left: '-3px', bottom: '12px', width: '20px', height: '6px', background: '#9e9e9e', borderRadius: '1.5px', border: '0.5px solid rgba(0,0,0,0.1)' }} />
                  </div>

                  {/* ── YELLOW STICKY NOTE (Post-it Checklist) ── */}
                  <div 
                    className="sticky-note"
                    style={{
                      position: 'absolute',
                      left: '100px',
                      top: '145px',
                      width: '120px',
                      height: '130px',
                      background: '#FDF0CD', // Warm post-it yellow
                      boxShadow: '0 4px 10px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
                      transform: 'rotate(1.5deg)',
                      padding: '12px 10px',
                      boxSizing: 'border-box',
                      zIndex: 6,
                      border: '1px solid rgba(0,0,0,0.04)'
                    }}
                  >
                    {/* Post-it header tape */}
                    <div style={{
                      position: 'absolute',
                      top: '-6px',
                      left: '30px',
                      width: '60px',
                      height: '14px',
                      background: 'rgba(255,255,255,0.45)',
                      transform: 'rotate(-2deg)',
                      border: '0.5px solid rgba(0,0,0,0.03)'
                    }} />

                    {/* Handwritten style checklist */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', height: '100%' }}>
                      <div style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '8px',
                        fontWeight: 800,
                        color: 'var(--text-secondary)',
                        letterSpacing: '0.08em',
                        borderBottom: '1px solid rgba(0,0,0,0.08)',
                        paddingBottom: '3px'
                      }}>
                        CRAFT INDEX
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '2px' }}>
                        {expertise.map((item, idx) => (
                          <div 
                            key={item.title} 
                            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                          >
                            {/* Tiny checkbox */}
                            <div style={{
                              width: '8px',
                              height: '8px',
                              border: `1px solid ${activeIndex === idx ? 'var(--accent)' : 'rgba(0,0,0,0.18)'}`,
                              background: activeIndex === idx ? 'var(--accent)' : 'transparent',
                              borderRadius: '1.5px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              transition: 'all 0.15s ease'
                            }}>
                              {activeIndex === idx && (
                                <div style={{ width: '3px', height: '3px', background: '#FFF', borderRadius: '50%' }} />
                              )}
                            </div>
                            {/* Short label */}
                            <span style={{
                              fontFamily: 'var(--font-body)',
                              fontSize: '7.5px',
                              fontWeight: activeIndex === idx ? 700 : 500,
                              color: activeIndex === idx ? 'var(--accent)' : 'rgba(0,0,0,0.65)',
                              transition: 'color 0.15s ease',
                              whiteSpace: 'nowrap'
                            }}>
                              {item.title}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* ── THE 6 FRIDGE MAGNETS (Expertise Categories) ── */}
                  {expertise.map((item, idx) => {
                    const isHovered = activeIndex === idx
                    return (
                      <motion.div
                        key={item.title}
                        className="fridge-magnet"
                        onMouseEnter={() => setActiveIndex(idx)}
                        onMouseLeave={() => setActiveIndex(null)}
                        onClick={() => {
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
                          boxShadow: '0 4px 8px rgba(0,0,0,0.06), 0 2px 4px rgba(0,0,0,0.04), 1px 1px 0px rgba(0,0,0,0.08)',
                          outline: '1px solid rgba(0, 0, 0, 0.08)',
                          cursor: 'pointer',
                          zIndex: isHovered ? 12 : 7,
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: '6px',
                          boxSizing: 'border-box',
                          userSelect: 'none'
                        }}
                        animate={{
                          rotate: isHovered ? 0 : item.defaultRotate,
                          scale: isHovered ? 1.08 : 1,
                          boxShadow: isHovered 
                            ? '0 12px 24px rgba(0,0,0,0.12), 0 4px 8px rgba(0,0,0,0.06)' 
                            : '0 4px 8px rgba(0,0,0,0.06), 0 2px 4px rgba(0,0,0,0.04), 1px 1px 0px rgba(0,0,0,0.08)'
                        }}
                        transition={{
                          type: 'spring',
                          stiffness: 150,
                          damping: 15
                        }}
                      >
                        {/* Magnet Graphics */}
                        <span style={{ fontSize: '24px', marginBottom: '6px', filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.06))' }}>{item.icon}</span>
                        
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

                </motion.div>
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
