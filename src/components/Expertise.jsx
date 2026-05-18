import { useEffect, useRef, useState } from 'react'
import { FadeUp, Label } from './utils'

const expertise = [
  { icon: '⬡', title: 'Product Design', body: 'End-to-end product thinking from concept to shipped feature — balancing user needs, business goals, and technical constraints.' },
  { icon: '◑', title: 'UX Strategy', body: 'Shaping product direction through research synthesis, opportunity mapping, and outcome-driven design roadmaps.' },
  { icon: '◎', title: 'User Research', body: 'Qualitative and quantitative methods — interviews, usability tests, behavioral analytics — to ground decisions in real evidence.' },
  { icon: '⬟', title: 'Interaction Design', body: 'Crafting micro-interactions, spring animations, and state transitions that make digital products feel alive and responsive.' },
  { icon: '⬤', title: 'Design Systems', body: 'Building scalable, token-driven systems in Figma that empower teams to ship consistently and iterate rapidly at scale.' },
  { icon: '✦', title: 'AI Experiences', body: 'Designing human-centered AI interfaces — translating complex machine learning models into intuitive, transparent interactions.' },
]

export default function Expertise() {
  const containerRef = useRef(null)
  const trackRef = useRef(null)
  
  const scrollProgress = useRef(0)
  const currentTranslation = useRef(0)
  const [progress, setProgress] = useState(0)

  // 1. PINNED VERTICAL TO HORIZONTAL SCROLL INTERACTION (Desktop only)
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || window.innerWidth <= 900) return
      
      const rect = containerRef.current.getBoundingClientRect()
      const totalHeight = containerRef.current.offsetHeight
      const windowHeight = window.innerHeight
      
      const scrollOffset = -rect.top
      const maxScrollDist = totalHeight - windowHeight
      
      let prog = scrollOffset / maxScrollDist
      prog = Math.max(0, Math.min(1, prog))
      scrollProgress.current = prog
      setProgress(prog)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  // 2. Buttery spring drift loop
  useEffect(() => {
    let animId
    const updatePhysics = () => {
      if (trackRef.current && window.innerWidth > 900) {
        const scrollWidth = trackRef.current.scrollWidth
        const maxTranslation = scrollWidth - window.innerWidth + 120
        const targetTranslation = -scrollProgress.current * Math.max(0, maxTranslation)
        
        currentTranslation.current += (targetTranslation - currentTranslation.current) * 0.08
        trackRef.current.style.transform = `translateX(${currentTranslation.current}px)`
      }
      animId = requestAnimationFrame(updatePhysics)
    }
    animId = requestAnimationFrame(updatePhysics)
    return () => cancelAnimationFrame(animId)
  }, [])

  return (
    <div 
      ref={containerRef} 
      id="expertise" 
      style={{ 
        position: 'relative',
        height: '240vh',
        background: 'var(--bg-warm)',
      }}
      className="expertise-wrapper-container"
    >
      {/* Sticky section container */}
      <div style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }} className="expertise-sticky-section">
        
        <div className="container" style={{ marginBottom: 'var(--space-6)', position: 'relative', zIndex: 10 }}>
          <FadeUp>
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 'var(--space-5)', alignItems: 'flex-end' }}>
              <div>
                <Label>Expertise</Label>
                <h2 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(32px, 3.8vw, 46px)',
                  fontWeight: 400,
                  letterSpacing: '-0.025em',
                  lineHeight: 1.15,
                  color: 'var(--text-primary)',
                  marginTop: 'var(--space-4)',
                }}>
                  What I do<br />
                  <span style={{ color: 'var(--accent)' }}>really well.</span>
                </h2>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', alignItems: 'flex-end' }} className="expertise-meta">
                <p style={{ fontSize: 14.5, color: 'var(--text-secondary)', margin: 0, textAlign: 'right', maxWidth: '36ch', lineHeight: 1.6 }}>
                  Six craft areas honed across complex consumer IoT, SaaS dashboard architecture, and conversational interfaces.
                </p>
                {/* Horizontal Progress Track */}
                <div style={{
                  width: 160,
                  height: 3,
                  background: 'var(--border)',
                  borderRadius: 'var(--radius-pill)',
                  position: 'relative',
                  overflow: 'hidden',
                }} className="scroll-hint-desktop">
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: '100%',
                    width: `${progress * 100}%`,
                    background: 'var(--accent)',
                    borderRadius: 'var(--radius-pill)',
                    transition: 'width 100ms linear',
                  }} />
                </div>
              </div>
            </div>
          </FadeUp>
        </div>

        {/* ── Horizontal Glide Cards Track ── */}
        <div 
          ref={trackRef}
          className="expertise-horizontal-track"
          style={{
            display: 'flex',
            gap: 'var(--space-6)',
            paddingLeft: 'max(40px, calc((100vw - 1200px) / 2))',
            paddingRight: 'max(40px, calc((100vw - 1200px) / 2))',
            willChange: 'transform',
          }}
        >
          {expertise.map(({ icon, title, body }, i) => {
            const floatOffset = `translateY(${Math.sin((i * 2) + Date.now()) * 2}px)`
            return (
              <div
                key={title}
                className="expertise-editorial-card"
                style={{
                  transform: floatOffset,
                }}
              >
                {/* Visual Accent top strip */}
                <div className="card-accent-blueprint-grid" />
                
                <div className="card-details-panel">
                  <div className="expertise-icon-wrapper-editorial">{icon}</div>
                  <h3 className="expertise-title-editorial">{title}</h3>
                  <p className="expertise-body-editorial">{body}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <style>{`
        /* Editorial Pinned Cards Styling */
        .expertise-editorial-card {
          flex: 0 0 clamp(310px, 24vw, 380px);
          height: clamp(340px, 42vh, 380px);
          background: var(--bg-card);
          border-radius: var(--radius-xl);
          border: 1px solid var(--border);
          box-shadow: var(--shadow-sm);
          position: relative;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          cursor: default;
          box-sizing: border-box;
          transition: transform 420ms cubic-bezier(0.16, 1, 0.3, 1),
                      box-shadow 420ms cubic-bezier(0.16, 1, 0.3, 1),
                      border-color 420ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        .expertise-editorial-card:hover {
          transform: translateY(-8px) scale(1.02) !important;
          border-color: var(--accent);
          box-shadow: var(--shadow-lg), 0 20px 40px rgba(0, 82, 255, 0.05);
        }

        /* Ambient blueprint overlay inside card on hover */
        .card-accent-blueprint-grid {
          position: absolute;
          inset: 0;
          height: 100%;
          width: 100%;
          opacity: 0;
          pointer-events: none;
          background-image: radial-gradient(var(--accent) 0.8px, transparent 0.8px);
          background-size: 16px 16px;
          transition: opacity 400ms cubic-bezier(0.16, 1, 0.3, 1);
          z-index: 1;
        }

        .expertise-editorial-card:hover .card-accent-blueprint-grid {
          opacity: 0.12;
        }

        .card-details-panel {
          position: relative;
          z-index: 2;
          padding: var(--space-7);
          display: flex;
          flex-direction: column;
          height: 100%;
          justify-content: flex-start;
        }

        .expertise-icon-wrapper-editorial {
          font-size: 32px;
          color: var(--accent);
          font-family: var(--font-display);
          line-height: 1;
          margin-bottom: var(--space-5);
          transition: transform 450ms cubic-bezier(0.16, 1, 0.3, 1), color 450ms ease;
          display: inline-block;
          width: fit-content;
        }

        .expertise-editorial-card:hover .expertise-icon-wrapper-editorial {
          transform: scale(1.22) rotate(12deg);
          color: var(--accent);
          text-shadow: 0 0 12px rgba(0, 82, 255, 0.3);
        }

        .expertise-title-editorial {
          font-family: var(--font-display);
          font-size: 19px;
          fontWeight: 500;
          letter-spacing: -0.015em;
          color: var(--text-primary);
          margin: 0 0 var(--space-3) 0;
        }

        .expertise-body-editorial {
          font-size: 14px;
          line-height: 1.65;
          color: var(--text-secondary);
          margin: 0;
        }

        /* Mobile Touch-Swipe Gestures Fallback */
        @media (max-width: 900px) {
          .expertise-wrapper-container {
            height: auto !important;
            padding: var(--space-10) 0 !important;
          }

          .expertise-sticky-section {
            position: relative !important;
            height: auto !important;
            width: auto !important;
            overflow: visible !important;
          }

          .scroll-hint-desktop {
            display: none !important;
          }

          .expertise-meta {
            align-items: flex-start !important;
          }
          
          .expertise-meta p {
            text-align: left !important;
          }

          .expertise-horizontal-track {
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            padding-top: var(--space-4);
            padding-bottom: var(--space-6);
            padding-left: var(--space-5);
            padding-right: var(--space-5);
            transform: none !important;
            scrollbar-width: none;
            -ms-overflow-style: none;
          }

          .expertise-horizontal-track::-webkit-scrollbar {
            display: none;
          }

          .expertise-editorial-card {
            flex: 0 0 290px !important;
            height: 330px !important;
            scroll-snap-align: start;
            transform: none !important;
          }

          .expertise-editorial-card:hover {
            transform: none !important;
          }
        }
      `}</style>
    </div>
  )
}
