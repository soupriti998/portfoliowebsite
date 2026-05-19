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
            alignItems: 'center'
          }}
        >
          {expertise.map(({ icon, title, body }, i) => (
            <FolderCard key={title} icon={icon} title={title} body={body} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        /* ── FOLDER CARD CSS ── */
        .folder-card-wrapper {
          position: relative;
          width: 320px;
          height: 280px;
          flex-shrink: 0;
          cursor: pointer;
          transition: width 0.65s cubic-bezier(0.19, 1, 0.22, 1);
          will-change: width, transform;
          perspective: 1200px;
          animation: folderFloat 6s ease-in-out infinite;
        }

        @keyframes folderFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        .folder-card-wrapper.is-open {
          width: 640px; /* 320 folder + 20 gap + 300 paper */
        }

        /* FOLDER BACK */
        .folder-back {
          position: absolute;
          top: 0; left: 0;
          width: 320px;
          height: 280px;
          z-index: 1;
        }

        .folder-tab {
          width: 140px;
          height: 32px;
          background: linear-gradient(135deg, #4F59F7, #262BDE);
          border-radius: 16px 16px 0 0;
          position: absolute;
          top: 0; left: 0;
        }

        .folder-back-main {
          width: 320px;
          height: calc(280px - 32px);
          background: linear-gradient(135deg, #4A55F7, #1E22A8);
          border-radius: 0 16px 16px 16px;
          position: absolute;
          top: 32px; left: 0;
          box-shadow: inset 0 2px 20px rgba(0,0,0,0.15);
        }

        /* FOLDER FRONT */
        .folder-front {
          position: absolute;
          top: 32px; left: 0;
          width: 320px;
          height: calc(280px - 32px);
          background: linear-gradient(135deg, #626CFF, #3238FF);
          border-radius: 0 16px 16px 16px;
          z-index: 3;
          padding: 24px;
          box-sizing: border-box;
          color: #fff;
          box-shadow: 0 -4px 15px rgba(0,0,0,0.1), inset 0 1px 1px rgba(255,255,255,0.25);
          transition: transform 0.5s cubic-bezier(0.19, 1, 0.22, 1);
          transform-origin: bottom center;
        }

        /* Front hinges open on hover and click */
        .folder-card-wrapper:hover .folder-front,
        .folder-card-wrapper.is-open .folder-front {
          transform: rotateX(-8deg) translateY(4px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.2), inset 0 1px 1px rgba(255,255,255,0.3);
        }

        .folder-title-wrap h3 {
          margin: 0 0 6px 0;
          font-family: var(--font-display);
          font-size: 22px;
          font-weight: 500;
          letter-spacing: -0.01em;
        }

        .folder-subtitle {
          font-size: 13px;
          opacity: 0.8;
          font-family: var(--font-body);
        }

        .folder-front-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .folder-icons {
          display: flex;
          gap: 12px;
          opacity: 0.9;
          font-size: 18px;
        }
        
        .folder-icon-btn {
          width: 24px; height: 24px;
          display: flex; align-items: center; justify-content: center;
          border-radius: 50%;
          background: rgba(255,255,255,0.15);
          backdrop-filter: blur(4px);
        }

        /* THE PAPER */
        .folder-paper {
          position: absolute;
          top: 40px; 
          left: 10px;
          width: 300px;
          height: calc(280px - 50px);
          background: #fdfdfd;
          border-radius: 12px;
          z-index: 2;
          box-sizing: border-box;
          padding: 20px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
          transition: all 0.65s cubic-bezier(0.19, 1, 0.22, 1);
          border: 1px solid rgba(0,0,0,0.05);
          display: flex;
          flex-direction: column;
        }

        /* Peek on hover */
        .folder-card-wrapper:hover:not(.is-open) .folder-paper {
          transform: translateY(-46px);
          box-shadow: 0 12px 30px rgba(0,0,0,0.12);
        }

        /* Slide out on click */
        .folder-card-wrapper.is-open .folder-paper {
          transform: translateX(330px) translateY(-20px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.08);
          z-index: 4; /* Pops above folder */
          height: calc(280px - 10px); /* Taller when fully out */
        }

        /* Paper Content */
        .paper-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          font-family: var(--font-mono);
          font-size: 11px;
          color: #888;
        }

        .paper-date-wrap {
          display: flex;
          gap: 8px;
          align-items: center;
        }

        .paper-time {
          background: #f0f0f0;
          padding: 3px 6px;
          border-radius: 6px;
          color: #555;
          font-weight: 600;
        }

        .paper-subtitle {
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.05em;
          color: #111;
          margin-bottom: 16px;
        }

        .paper-checkbox-item {
          display: flex;
          gap: 12px;
          align-items: flex-start;
        }

        .checkbox-box {
          width: 16px;
          height: 16px;
          border-radius: 4px;
          background: var(--accent);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          margin-top: 2px;
          flex-shrink: 0;
        }

        .paper-body {
          font-size: 13px;
          line-height: 1.6;
          color: #444;
          margin: 0;
        }

        /* Mobile Adjustments */
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
            padding-top: var(--space-8);
            padding-bottom: var(--space-10);
            padding-left: var(--space-5);
            padding-right: var(--space-5);
            transform: none !important;
            scrollbar-width: none;
            -ms-overflow-style: none;
          }

          .expertise-horizontal-track::-webkit-scrollbar {
            display: none;
          }

          .folder-card-wrapper {
            scroll-snap-align: center;
          }
        }
      `}</style>
    </div>
  )
}

function FolderCard({ icon, title, body, index }) {
  const [isOpen, setIsOpen] = useState(false)

  // Format a realistic date to match the "Wed, 07 May 2025" aesthetic
  const dateStr = new Date().toLocaleDateString('en-US', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' }).replace(/,/g, '')
  const timeStr = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })

  return (
    <div 
      className={`folder-card-wrapper ${isOpen ? 'is-open' : ''}`}
      onClick={() => setIsOpen(!isOpen)}
      onMouseLeave={() => setIsOpen(false)}
      style={{ '--index': index }}
    >
      {/* BACKGROUND SHAPE */}
      <div className="folder-back">
        <div className="folder-tab" />
        <div className="folder-back-main" />
      </div>

      {/* PAPER SLIDER */}
      <div className="folder-paper">
        <div className="paper-header">
          <div className="paper-date-wrap">
            <span>{dateStr}</span>
            <span className="paper-time">{timeStr}</span>
          </div>
          <span>...</span>
        </div>
        <div className="paper-content">
          <div className="paper-subtitle">THINGS TO DO TODAY</div>
          <div className="paper-checkbox-item">
            <div className="checkbox-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg>
            </div>
            <p className="paper-body" style={{ textDecoration: 'line-through', opacity: 0.6 }}>Analyze requirements</p>
          </div>
          <div className="paper-checkbox-item" style={{ marginTop: 12 }}>
            <div className="checkbox-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg>
            </div>
            <p className="paper-body">{body}</p>
          </div>
        </div>
      </div>

      {/* FRONT COVER */}
      <div className="folder-front">
        <div className="folder-front-header">
           <div className="folder-title-wrap">
             <h3>{title}</h3>
             <span className="folder-subtitle">1 note</span>
           </div>
           <div className="folder-icons">
             <div className="folder-icon-btn">
               <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
             </div>
             <div className="folder-icon-btn">
               <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
             </div>
           </div>
        </div>
      </div>
    </div>
  )
}
