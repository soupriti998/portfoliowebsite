import { useState } from 'react'
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
  const [isOpen, setIsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(null)

  // Use the active index if selected, otherwise fallback to the general section introduction
  const activeItem = activeIndex !== null ? expertise[activeIndex] : {
    title: "What I do really well.",
    body: "Six craft areas honed across complex consumer IoT, SaaS dashboard architecture, and conversational interfaces. Hover and click the folder to explore each file."
  }

  const dateStr = new Date().toLocaleDateString('en-US', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' }).replace(/,/g, '')
  const timeStr = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })

  return (
    <div 
      id="expertise" 
      style={{ 
        position: 'relative',
        minHeight: '85vh',
        background: 'var(--bg-warm)',
        display: 'flex',
        alignItems: 'center',
        padding: 'var(--space-10) 0',
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

            {/* ── RIGHT PANEL: THE 3D INTERACTIVE FOLDER ── */}
            <div className="expertise-right-panel">
              <div 
                className={`folder-card-wrapper ${isOpen ? 'is-open' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
                onMouseLeave={() => {
                  setIsOpen(false)
                  setActiveIndex(null)
                }}
              >
                {/* BACK FLAP */}
                <div className="folder-back">
                  <div className="folder-tab" />
                  <div className="folder-back-main" />
                </div>

                {/* SLIDING PAPER CHECKLIST */}
                <div className="folder-paper">
                  <div className="paper-header">
                    <div className="paper-date-wrap">
                      <span>{dateStr}</span>
                      <span className="paper-time">{timeStr}</span>
                    </div>
                    <span>...</span>
                  </div>
                  <div className="paper-content">
                    <div className="paper-subtitle">CRAFT INDEX</div>
                    
                    <div className="paper-checklist-flow">
                      {expertise.map((item, idx) => (
                        <div 
                          key={item.title}
                          className={`paper-checkbox-item ${activeIndex === idx ? 'active' : ''}`}
                          onMouseEnter={() => setActiveIndex(idx)}
                          onClick={(e) => {
                            e.stopPropagation()
                            setActiveIndex(idx)
                          }}
                        >
                          <div className="checkbox-box">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                              <path d="M20 6L9 17l-5-5"/>
                            </svg>
                          </div>
                          <span className="paper-item-title">{item.title}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* FRONT FLAP */}
                <div className="folder-front">
                  <div className="folder-front-header">
                     <div className="folder-title-wrap">
                       <h3>Expertise</h3>
                       <span className="folder-subtitle">6 notes</span>
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
            </div>

          </div>
        </FadeUp>
      </div>

      <style>{`
        /* ── SPLIT LAYOUT ── */
        .expertise-split-layout {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          grid-template-areas: "folder details";
          gap: var(--space-8);
          align-items: center;
        }

        .expertise-left-panel {
          grid-area: details;
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
          min-height: 280px;
          justify-content: center;
          padding-left: var(--space-6);
        }

        .active-details-wrapper {
          animation: detailFadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes detailFadeIn {
          from { opacity: 0; transform: translateY(12px); filter: blur(4px); }
          to { opacity: 1; transform: translateY(0); filter: blur(0); }
        }

        .expertise-active-title {
          font-family: var(--font-display);
          font-size: clamp(28px, 3.2vw, 42px);
          font-weight: 400;
          letter-spacing: -0.025em;
          line-height: 1.15;
          color: var(--text-primary);
          margin: var(--space-2) 0;
        }

        .expertise-active-body {
          font-size: 16px;
          line-height: 1.7;
          color: var(--text-secondary);
          max-width: 48ch;
          margin: 0;
        }

        .expertise-right-panel {
          grid-area: folder;
          display: flex;
          justify-content: flex-start;
          align-items: center;
        }

        /* ── FOLDER CARD CSS (RIGHT-ALIGNED) ── */
        .folder-card-wrapper {
          position: relative;
          width: 320px;
          height: 380px;
          flex-shrink: 0;
          cursor: pointer;
          will-change: transform, width;
          perspective: 1200px;
          animation: folderFloat 6s ease-in-out infinite;
          transition: transform 0.65s cubic-bezier(0.19, 1, 0.22, 1), width 0.65s cubic-bezier(0.19, 1, 0.22, 1);
        }

        @keyframes folderFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        /* FOLDER BACK */
        .folder-back {
          position: absolute;
          top: 0; left: 0;
          width: 320px;
          height: 380px;
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
          height: calc(380px - 32px);
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
          height: calc(380px - 32px);
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

        /* THE PAPER (Slides to the right) */
        .folder-paper {
          position: absolute;
          top: 40px; 
          left: 10px;
          width: 300px;
          height: calc(380px - 50px);
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
          overflow: hidden; /* Fix: prevents bottom-peek spill when folder is closed */
        }

        /* Peek on hover */
        .folder-card-wrapper:hover:not(.is-open) .folder-paper {
          transform: translateY(-46px);
          box-shadow: 0 12px 30px rgba(0,0,0,0.12);
        }

        /* Slide out to the RIGHT on click */
        .folder-card-wrapper.is-open {
          width: 630px;
        }

        .folder-card-wrapper.is-open .folder-paper {
          transform: translateX(310px) translateY(-10px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.08);
          z-index: 4;
          height: calc(380px - 10px);
        }

        /* Paper Content */
        .paper-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
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
          margin-bottom: 12px;
        }

        .paper-checklist-flow {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .paper-checkbox-item {
          display: flex;
          gap: 12px;
          align-items: center;
          padding: 6px 8px;
          border-radius: 8px;
          transition: all 0.2s ease;
          cursor: pointer;
        }

        .paper-checkbox-item:hover,
        .paper-checkbox-item.active {
          background: rgba(0, 82, 255, 0.05);
        }

        .paper-checkbox-item.active .paper-item-title {
          color: var(--accent);
          font-weight: 600;
        }

        .checkbox-box {
          width: 16px;
          height: 16px;
          border-radius: 4px;
          border: 1px solid rgba(0, 82, 255, 0.15);
          background: rgba(0, 82, 255, 0.03);
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(0, 82, 255, 0.3);
          transition: all 0.2s ease;
          flex-shrink: 0;
        }

        .checkbox-box svg {
          width: 10px;
          height: 10px;
          opacity: 0.7;
        }

        .paper-checkbox-item.active .checkbox-box {
          border-color: var(--accent);
          background: var(--accent);
          color: white;
          box-shadow: 0 0 8px rgba(0, 82, 255, 0.3);
        }
        
        .paper-checkbox-item.active .checkbox-box svg {
          opacity: 1;
        }

        .paper-item-title {
          font-size: 13.5px;
          color: #444;
          transition: color 0.2s;
        }

        /* ── RESPONSIVE MOBILE ADJUSTMENTS ── */
        @media (max-width: 900px) {
          .expertise-wrapper-container {
            padding: var(--space-8) 0 !important;
          }

          .expertise-split-layout {
            grid-template-columns: 1fr;
            grid-template-areas: 
              "details"
              "folder";
            gap: var(--space-8);
          }

          .expertise-left-panel {
            min-height: auto;
            padding-left: 0;
          }

          .expertise-right-panel {
            justify-content: center;
          }

          .folder-card-wrapper.is-open {
            height: 700px;
            width: 320px;
          }

          .folder-card-wrapper.is-open .folder-paper {
            transform: translateY(350px) translateX(0);
            height: 280px;
          }
        }
      `}</style>
    </div>
  )
}

