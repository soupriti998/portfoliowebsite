import { useState, useEffect, useRef } from 'react'

const CATEGORIES = {
  'All': { color: 'var(--accent)', icon: '◈' },
  'Design Decision': { color: '#00F5D4', icon: '✦', bg: 'rgba(0, 245, 212, 0.05)', border: 'rgba(0, 245, 212, 0.15)' },
  'UI Iteration': { color: '#0052FF', icon: '◰', bg: 'rgba(0, 82, 255, 0.05)', border: 'rgba(0, 82, 255, 0.15)' },
  'UX Insight': { color: '#FFB703', icon: '💡', bg: 'rgba(255, 183, 3, 0.05)', border: 'rgba(255, 183, 3, 0.15)' },
  'AI Workflow': { color: '#FF4DA6', icon: '🤖', bg: 'rgba(255, 77, 166, 0.05)', border: 'rgba(255, 77, 166, 0.15)' },
  'Motion Experiment': { color: '#9B5DE5', icon: '⚡', bg: 'rgba(155, 93, 229, 0.05)', border: 'rgba(155, 93, 229, 0.15)' },
  'Bug Fix': { color: '#FF0054', icon: '🪲', bg: 'rgba(255, 0, 84, 0.05)', border: 'rgba(255, 0, 84, 0.15)' },
  'Personal Thought': { color: '#70E000', icon: '✍️', bg: 'rgba(112, 224, 0, 0.05)', border: 'rgba(112, 224, 0, 0.15)' }
}

const LOG_ENTRIES = [
  {
    time: '12:42 AM',
    date: 'May 18, 2026',
    category: 'Motion Experiment',
    title: 'Breathing Circle Logo Animation System',
    description: 'Designed a highly ambient, emotionally responsive breathing logo system. Replaced the generic mascot idea with a single glowing circle that mimics awareness, listening, and deep thinking. Polished the inhalation/exhalation easing equations in standard CSS.',
    version: 'v1.4.2',
    commit: 'feat(notch): breathing animation core and dynamic height observer',
    section: 'hero',
    funNote: 'Version 17 finally stopped scaling awkwardly at 2AM. Ambient intelligence unlocked!',
    stats: { iterations: 17, hours: 14.5, stressLevel: 'Medium' }
  },
  {
    time: '11:42 PM',
    date: 'May 17, 2026',
    category: 'UI Iteration',
    title: 'Establishing Experience Card Consistency',
    description: 'Redesigned the Experience timeline card headers. Replaced the old wrapping layout with flexible columns, setting min-width on left details and flex-shrink: 0 on tags/dates. Now long company names truncate gracefully, and tags stay locked in the top-right without sliding down.',
    version: 'v1.3.8',
    commit: 'style(journey): unify card headers to prevent layout shift',
    section: 'journey',
    funNote: 'Restraint exists! Decided not to add a fourth drop shadow to the card tags.',
    stats: { iterations: 4, hours: 2.2, stressLevel: 'Low' }
  },
  {
    time: '03:18 PM',
    date: 'May 16, 2026',
    category: 'Design Decision',
    title: 'The "Liquid Glass" Visual Theme Space',
    description: 'Defined the primary design system using a high-density, futuristic OS feel. Shifted from plain colors to harmony palettes—pure white layouts for light mode spec sheets, deep dark backgrounds, and bright electric blue highlights accompanied by soft neon pink assistant diffusions.',
    version: 'v1.1.0',
    commit: 'style(theme): complete OKLCH custom color variable setup',
    section: 'tools',
    funNote: 'Light mode glass cards must use 80%+ opacity to look premium and remain readable under bright sunlight.',
    stats: { iterations: 9, hours: 18.0, stressLevel: 'High' }
  },
  {
    time: '02:03 AM',
    date: 'May 15, 2026',
    category: 'AI Workflow',
    title: 'Integrating Luffy AI Assistant Copilot',
    description: 'Engineered a highly responsive, personalized client co-pilot right inside the dynamic notch. Programmed Luffy to answer questions about skills, process resumes, matches JDs, and talk in real-time. Added localized context tags specifically tailored to the Indian design ecosystem.',
    version: 'v1.5.0',
    commit: 'feat(chatbot): contextual responses and interactive JD analyzer tool',
    section: 'projects',
    funNote: 'Taught Luffy to speak with authority but stay humble. A highly designed pairing!',
    stats: { iterations: 22, hours: 32.5, stressLevel: 'High' }
  },
  {
    time: '11:27 PM',
    date: 'May 14, 2026',
    category: 'UX Insight',
    title: 'Direct Auto-Scan on JD Clipboard Paste',
    description: 'Simplified the JD Matcher interaction. Removed the redundant "Analyze Alignment Profile" submit button. Added clipboard listener so the analysis launches immediately when a user pastes text or drops a PDF. Added a smart 1200ms typing idle trigger.',
    version: 'v1.5.2',
    commit: 'ux(notch): auto-trigger JD scanner to remove click friction',
    section: 'projects',
    funNote: 'Good design is invisible. Removing that button felt therapeutic.',
    stats: { iterations: 3, hours: 4.0, stressLevel: 'Low' }
  },
  {
    time: '01:05 AM',
    date: 'May 12, 2026',
    category: 'Bug Fix',
    title: 'Hardware Acceleration on Voice Wave Visualizer',
    description: 'Fixed lag on voice wave rendering. Refactored custom CSS animation properties to use transform scaleY instead of height, forcing the browser to offload animations directly to the GPU. Zero canvas dropping at 60fps.',
    version: 'v1.2.4',
    commit: 'fix(voice): hardware accelerate visualizer scales',
    section: 'expertise',
    funNote: 'Animations are great, but performance is respect. Lag is not an option.',
    stats: { iterations: 2, hours: 3.5, stressLevel: 'Low' }
  },
  {
    time: '09:12 PM',
    date: 'May 10, 2026',
    category: 'Personal Thought',
    title: 'Restraint vs. Cinematic Visual Flairs',
    description: 'Landed on an editorial typography layout pairing Inter with Outfit. Decided that a product design portfolio should look like a premium spec sheet, displaying specs, tools, and technical breakdowns inline to respect hiring managers\' scan speed.',
    version: 'v1.0.2',
    commit: 'style(typography): pair Outfit with Inter for display and body',
    section: 'about',
    funNote: 'Removed 4 cards and simplified the timeline to tell a concise product story.',
    stats: { iterations: 6, hours: 8.0, stressLevel: 'Medium' }
  }
]

export default function ActivityLog({ onClose }) {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [activeSection, setActiveSection] = useState('all')
  const [hoveredEntry, setHoveredEntry] = useState(null)
  const [expandedEntry, setExpandedEntry] = useState(null)
  
  const containerRef = useRef(null)

  // Escape key to close
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  // Track scroll position of the main window to contextually highlight active log entries!
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'expertise', 'projects', 'about', 'journey', 'tools']
      let currentSection = 'all'

      for (let s of sections) {
        const el = document.getElementById(s)
        if (el) {
          const rect = el.getBoundingClientRect()
          // If the section occupies the center of the viewport
          if (rect.top <= window.innerHeight * 0.4 && rect.bottom >= window.innerHeight * 0.4) {
            currentSection = s
            break
          }
        }
      }
      setActiveSection(currentSection)
    }

    window.addEventListener('scroll', handleScroll)
    // Run once initially
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Filter entries
  const filteredEntries = LOG_ENTRIES.filter(entry => {
    const matchesCat = selectedCategory === 'All' || entry.category === selectedCategory
    return matchesCat
  })

  // Scroll main portfolio window to specified section
  const handleScrollToSection = (sectionId) => {
    const el = document.getElementById(sectionId)
    if (el) {
      playSound('pop')
      el.scrollIntoView({ behavior: 'smooth' })
      onClose() // Close activity log for immersive focus
    }
  }

  const playSound = (type = 'pop') => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)()
      const osc = audioCtx.createOscillator()
      const gain = audioCtx.createGain()
      
      osc.connect(gain)
      gain.connect(audioCtx.destination)

      if (type === 'pop') {
        osc.frequency.setValueAtTime(400, audioCtx.currentTime)
        osc.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 0.1)
        gain.gain.setValueAtTime(0.06, audioCtx.currentTime)
        gain.gain.linearRampToValueAtTime(0.001, audioCtx.currentTime + 0.1)
        osc.start()
        osc.stop(audioCtx.currentTime + 0.1)
      } else if (type === 'expand') {
        osc.frequency.setValueAtTime(200, audioCtx.currentTime)
        osc.frequency.exponentialRampToValueAtTime(600, audioCtx.currentTime + 0.25)
        gain.gain.setValueAtTime(0.08, audioCtx.currentTime)
        gain.gain.linearRampToValueAtTime(0.001, audioCtx.currentTime + 0.25)
        osc.start()
        osc.stop(audioCtx.currentTime + 0.25)
      }
    } catch (e) {
      // AudioContext blocked
    }
  }

  return (
    <div 
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(10, 11, 14, 0.94)',
        backdropFilter: 'blur(28px)',
        zIndex: 99999999,
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'var(--font-body)',
        color: '#ffffff',
        overflow: 'hidden',
        boxSizing: 'border-box'
      }}
    >
      {/* Dynamic Grid Background Texture */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)`,
        backgroundSize: '24px 24px', pointerEvents: 'none', zIndex: 0
      }} />

      {/* ── HEADER ACTION BAR ── */}
      <header style={{
        padding: '20px 28px',
        borderBottom: '1px solid rgba(255, 77, 166, 0.15)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
        zIndex: 2,
        background: 'rgba(10, 11, 14, 0.85)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ 
            width: 12, height: 12, borderRadius: '50%', background: '#FF4DA6', 
            boxShadow: '0 0 12px #FF4DA6', animation: 'pulseCore 2s ease-in-out infinite alternate' 
          }} />
          <div>
            <h1 style={{ margin: 0, fontSize: 16, fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
              SYSTEM ACTIVITY & PROCESS LOG
            </h1>
            <span style={{ fontSize: 11, color: 'rgba(255, 255, 255, 0.5)', marginTop: 2, display: 'block', fontFamily: 'var(--font-mono)' }}>
              BUILD ARCHIVE · PROCESS JOURNAL · REAL-TIME SECTION TELEMETRY
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {/* Active section highlight display */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            background: 'rgba(255, 77, 166, 0.08)',
            border: '1px solid rgba(255, 77, 166, 0.25)',
            padding: '4px 10px',
            borderRadius: 8,
            fontSize: 10.5,
            fontFamily: 'var(--font-mono)',
            textTransform: 'uppercase',
            color: '#FF4DA6'
          }} className="section-telemetry-badge">
            <span style={{ display: 'inline-block', width: 5, height: 5, borderRadius: '50%', background: '#FF4DA6', animation: 'bounce 1s infinite' }} />
            Active Section: {activeSection}
          </div>

          <button 
            onClick={() => {
              playSound('pop')
              onClose()
            }}
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 20,
              padding: '6px 14px',
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: 11,
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              transition: 'all 0.2s'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = '#FF4DA6'
              e.currentTarget.style.color = '#ffffff'
              e.currentTarget.style.boxShadow = '0 0 10px rgba(255, 77, 166, 0.2)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
              e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            ✕ CLOSE CONSOLE
          </button>
        </div>
      </header>

      {/* ── CATEGORY FILTER ROW ── */}
      <div style={{
        padding: '14px 28px',
        background: 'rgba(12, 13, 18, 0.8)',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
        display: 'flex',
        gap: 8,
        overflowX: 'auto',
        position: 'relative',
        zIndex: 2,
        scrollbarWidth: 'none'
      }}>
        {Object.entries(CATEGORIES).map(([catName, spec]) => {
          const isActive = selectedCategory === catName
          return (
            <button
              key={catName}
              onClick={() => {
                playSound('pop')
                setSelectedCategory(catName)
              }}
              style={{
                background: isActive ? spec.bg || 'rgba(0, 82, 255, 0.08)' : 'rgba(255,255,255,0.02)',
                border: `1px solid ${isActive ? spec.color : 'rgba(255,255,255,0.08)'}`,
                color: isActive ? '#ffffff' : 'rgba(255,255,255,0.6)',
                borderRadius: 20,
                padding: '6px 14px',
                fontSize: 11,
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                transition: 'all 0.2s',
                whiteSpace: 'nowrap'
              }}
              onMouseEnter={e => {
                if (!isActive) {
                  e.currentTarget.style.borderColor = spec.color
                  e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                }
              }}
              onMouseLeave={e => {
                if (!isActive) {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                  e.currentTarget.style.background = 'rgba(255,255,255,0.02)'
                }
              }}
            >
              <span>{spec.icon}</span>
              <span>{catName}</span>
            </button>
          )
        })}
      </div>

      {/* ── CORE JOURNAL LAYOUT ── */}
      <div style={{
        flex: 1,
        display: 'flex',
        position: 'relative',
        zIndex: 1,
        overflow: 'hidden'
      }}>
        {/* Left Side: Timeline Feed */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '32px 40px',
          display: 'flex',
          flexDirection: 'column',
          gap: 20
        }}>
          {filteredEntries.length === 0 ? (
            <div style={{
              flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14,
              opacity: 0.7, color: 'rgba(255, 255, 255, 0.4)'
            }}>
              <span style={{ fontSize: 32 }}>◈</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>SYSTEM CALM. NO PROCESS LOGS DETECTED.</span>
            </div>
          ) : (
            filteredEntries.map((entry, idx) => {
              const spec = CATEGORIES[entry.category] || CATEGORIES['All']
              const isHovered = hoveredEntry === idx
              const isExpanded = expandedEntry === idx
              const isContextualActive = activeSection === entry.section

              return (
                <div
                  key={idx}
                  onMouseEnter={() => setHoveredEntry(idx)}
                  onMouseLeave={() => setHoveredEntry(null)}
                  style={{
                    position: 'relative',
                    background: isContextualActive 
                      ? 'rgba(255, 77, 166, 0.04)' 
                      : (isHovered ? 'rgba(255, 255, 255, 0.02)' : 'rgba(255, 255, 255, 0.01)'),
                    border: `1.2px solid ${isContextualActive ? 'rgba(255, 77, 166, 0.3)' : (isHovered ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.04)')}`,
                    borderRadius: 16,
                    padding: '24px 28px',
                    cursor: 'pointer',
                    transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                    boxShadow: isContextualActive 
                      ? '0 0 20px rgba(255, 77, 166, 0.06)' 
                      : (isHovered ? '0 10px 30px rgba(0, 0, 0, 0.25)' : 'none'),
                    transform: isHovered ? 'translateY(-2px)' : 'none'
                  }}
                  onClick={() => {
                    playSound('expand')
                    setExpandedEntry(isExpanded ? null : idx)
                  }}
                >
                  {/* Left Color Indicator Rail */}
                  <div style={{
                    position: 'absolute', left: 0, top: 20, bottom: 20, width: 3,
                    borderRadius: '0 3px 3px 0',
                    background: isContextualActive ? '#FF4DA6' : spec.color,
                    boxShadow: isContextualActive ? '0 0 8px #FF4DA6' : `0 0 6px ${spec.color}`
                  }} />

                  {/* Contextual Active Section Glowing Badge */}
                  {isContextualActive && (
                    <div style={{
                      position: 'absolute', top: -10, right: 28,
                      background: '#FF4DA6', color: '#ffffff',
                      fontSize: 8.5, fontFamily: 'var(--font-mono)', fontWeight: 800,
                      padding: '2px 8px', borderRadius: 10, letterSpacing: '0.06em',
                      boxShadow: '0 0 10px rgba(255, 77, 166, 0.4)',
                      textTransform: 'uppercase'
                    }}>
                      ◈ Linked Viewport Match
                    </div>
                  )}

                  {/* Header Row */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ fontSize: 13, color: spec.color }}>{spec.icon}</span>
                      <span style={{
                        fontSize: 10.5,
                        fontWeight: 700,
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        fontFamily: 'var(--font-mono)',
                        color: spec.color
                      }}>
                        {entry.category}
                      </span>
                      <span style={{ fontSize: 11, color: 'rgba(255, 255, 255, 0.3)' }}>·</span>
                      <span style={{ fontSize: 11, color: 'rgba(255, 255, 255, 0.4)', fontFamily: 'var(--font-mono)' }}>
                        {entry.date} at {entry.time}
                      </span>
                    </div>

                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                      <span style={{
                        fontSize: 9.5,
                        fontFamily: 'var(--font-mono)',
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.06)',
                        padding: '2px 8px',
                        borderRadius: 6,
                        color: 'rgba(255,255,255,0.5)'
                      }}>
                        {entry.version}
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 style={{
                    margin: '12px 0 6px 0', fontSize: 17, fontWeight: 700,
                    color: '#ffffff', letterSpacing: '-0.01em', textAlign: 'left'
                  }}>
                    {entry.title}
                  </h3>

                  {/* Description */}
                  <p style={{
                    margin: 0, fontSize: 13, lineHeight: 1.6,
                    color: 'rgba(255, 255, 255, 0.7)', textAlign: 'left'
                  }}>
                    {entry.description}
                  </p>

                  {/* Commit Log */}
                  <div style={{
                    marginTop: 12, display: 'flex', alignItems: 'center', gap: 6,
                    background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)',
                    padding: '6px 12px', borderRadius: 8, width: 'fit-content'
                  }}>
                    <span style={{ fontSize: 9.5, fontFamily: 'var(--font-mono)', color: 'rgba(255, 255, 255, 0.35)' }}>COMMIT</span>
                    <span style={{ fontSize: 11.5, fontFamily: 'var(--font-mono)', color: 'var(--accent)' }}>{entry.commit}</span>
                  </div>

                  {/* Expandable Section Details */}
                  {isExpanded && (
                    <div style={{
                      marginTop: 20, paddingTop: 18, borderTop: '1px solid rgba(255,255,255,0.06)',
                      animation: 'fadeIn 0.25s ease-out', display: 'flex', flexDirection: 'column', gap: 14
                    }}>
                      {/* Grid Stats */}
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
                        <div style={{ background: 'rgba(255,255,255,0.02)', padding: '10px 14px', borderRadius: 10 }}>
                          <span style={{ fontSize: 9.5, fontFamily: 'var(--font-mono)', opacity: 0.5, display: 'block' }}>ITERATIONS</span>
                          <span style={{ fontSize: 14, fontWeight: 700, fontFamily: 'var(--font-mono)', color: '#ffffff' }}>#{entry.stats.iterations}</span>
                        </div>
                        <div style={{ background: 'rgba(255,255,255,0.02)', padding: '10px 14px', borderRadius: 10 }}>
                          <span style={{ fontSize: 9.5, fontFamily: 'var(--font-mono)', opacity: 0.5, display: 'block' }}>CRAFT HOURS</span>
                          <span style={{ fontSize: 14, fontWeight: 700, fontFamily: 'var(--font-mono)', color: '#ffffff' }}>{entry.stats.hours}h</span>
                        </div>
                        <div style={{ background: 'rgba(255,255,255,0.02)', padding: '10px 14px', borderRadius: 10 }}>
                          <span style={{ fontSize: 9.5, fontFamily: 'var(--font-mono)', opacity: 0.5, display: 'block' }}>STRESS LEVEL</span>
                          <span style={{ fontSize: 14, fontWeight: 700, fontFamily: 'var(--font-mono)', color: entry.stats.stressLevel === 'High' ? '#FF0054' : '#00F5D4' }}>{entry.stats.stressLevel}</span>
                        </div>
                      </div>

                      {/* Creative failure / thought bubbles */}
                      <div style={{
                        background: 'rgba(255, 77, 166, 0.03)', border: '1px solid rgba(255, 77, 166, 0.12)',
                        padding: '12px 16px', borderRadius: 10, display: 'flex', gap: 8, alignItems: 'flex-start'
                      }}>
                        <span style={{ fontSize: 12 }}>✍️</span>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <span style={{ fontSize: 9.5, fontFamily: 'var(--font-mono)', color: 'rgba(255, 77, 166, 0.7)', fontWeight: 800 }}>DEV NOTE / PROCESS AWARENESS</span>
                          <p style={{ margin: '4px 0 0 0', fontSize: 12, lineHeight: 1.5, color: 'rgba(255,255,255,0.85)', textAlign: 'left', fontStyle: 'italic' }}>
                            "{entry.funNote}"
                          </p>
                        </div>
                      </div>

                      {/* Jump to matching portfolio section */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleScrollToSection(entry.section)
                        }}
                        style={{
                          alignSelf: 'flex-start', background: 'rgba(0, 82, 255, 0.08)',
                          border: '1px solid rgba(0, 82, 255, 0.3)', color: '#ffffff',
                          padding: '6px 14px', borderRadius: 20, fontSize: 10.5, fontWeight: 700,
                          cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
                          transition: 'all 0.2s', marginTop: 4
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.background = 'var(--accent)'
                          e.currentTarget.style.borderColor = 'var(--accent)'
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.background = 'rgba(0, 82, 255, 0.08)'
                          e.currentTarget.style.borderColor = 'rgba(0, 82, 255, 0.3)'
                        }}
                      >
                        ◈ TELEPORT VIEWPORT TO THIS SECTION
                      </button>
                    </div>
                  )}
                </div>
              )
            })
          )}
        </div>

        {/* Right Side: Telemetry Specs Grid */}
        <div style={{
          width: 320,
          borderLeft: '1px solid rgba(255, 255, 255, 0.06)',
          background: 'rgba(10, 11, 14, 0.65)',
          padding: 28,
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
          overflowY: 'auto'
        }} className="activity-telemetry-panel">
          <div>
            <span style={{ fontSize: 9.5, fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.4)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>SYSTEM HEALTH</span>
            <div style={{
              marginTop: 10, display: 'flex', flexDirection: 'column', gap: 10,
              background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)',
              padding: 16, borderRadius: 12
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11.5, fontFamily: 'var(--font-mono)' }}>
                <span style={{ opacity: 0.6 }}>TOTAL COMMITS</span>
                <span style={{ fontWeight: 800, color: 'var(--accent)' }}>142 COMMITS</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11.5, fontFamily: 'var(--font-mono)' }}>
                <span style={{ opacity: 0.6 }}>CRAFT TIMELINE</span>
                <span style={{ fontWeight: 800, color: '#00F5D4' }}>14 DAYS LOGGED</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11.5, fontFamily: 'var(--font-mono)' }}>
                <span style={{ opacity: 0.6 }}>LLM TOKENS</span>
                <span style={{ fontWeight: 800, color: '#FF4DA6' }}>1.2M INGESTED</span>
              </div>
            </div>
          </div>

          <div>
            <span style={{ fontSize: 9.5, fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.4)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>LIVE VIEWPORT TELEMETRY</span>
            <div style={{
              marginTop: 10, display: 'flex', flexDirection: 'column', gap: 10,
              background: 'rgba(255, 77, 166, 0.02)', border: '1px solid rgba(255, 77, 166, 0.15)',
              padding: 16, borderRadius: 12
            }}>
              <span style={{ fontSize: 11.5, fontFamily: 'var(--font-mono)', color: '#FF4DA6', fontWeight: 800 }}>
                {activeSection === 'all' ? 'RESTING STATE / NOTCH ANCHOR' : `SCROLL MATCH: ${activeSection.toUpperCase()}`}
              </span>
              <p style={{ margin: 0, fontSize: 11, lineHeight: 1.5, color: 'rgba(255,255,255,0.6)' }}>
                {activeSection === 'all' 
                  ? 'Move the scroll wheel to matches related dev entries.'
                  : `Currently tracking active viewport of #${activeSection}. Telemetry is focusing matching design thinking logs.`
                }
              </p>
            </div>
          </div>

          <div>
            <span style={{ fontSize: 9.5, fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.4)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>PORTFOLIO CORE STACK</span>
            <div style={{
              marginTop: 10, display: 'flex', flexWrap: 'wrap', gap: 6
            }}>
              {['React 18', 'Vite', 'Lenis Scroll', 'Figma API', 'Midjourney', 'Google Fonts', 'Web Audio API', 'GPU scaleY'].map(tag => (
                <span
                  key={tag}
                  style={{
                    fontSize: 9.5, fontFamily: 'var(--font-mono)',
                    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
                    padding: '4px 8px', borderRadius: 6, color: 'rgba(255,255,255,0.7)'
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
