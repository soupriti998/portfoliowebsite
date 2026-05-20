import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useMotionValueEvent, AnimatePresence, useTransform } from 'framer-motion'
import { FadeUp, Label } from './utils'

const roles = [
  {
    company: 'upliance.ai',
    role: 'Product Designer',
    period: 'Sep 2024 – Present',
    location: 'Bangalore',
    tag: 'AI Product',
    logo: '/upliance.ai-logo.png',
    number: '01',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 14h18M5 14v5a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-5M8 9V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4" />
        <circle cx="12" cy="17" r="1.5" fill="var(--accent)" />
      </svg>
    ),
    highlights: [
      'Redesigned core mobile & device UX for AI-powered cooking platform',
      'Reduced perceived cooking time by 24% through interaction design',
      'Built scalable design system with reusable card components',
      'Partnered with founders to align UX strategy with business KPIs',
    ],
    nodePercent: 0 // Left percentage on timeline
  },
  {
    company: 'Divami Design Labs',
    role: 'UI Designer',
    period: 'Sep 2023 – Aug 2024',
    location: 'Hyderabad',
    tag: 'SaaS & Enterprise',
    logo: '/divami-Logo.png',
    number: '02',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    highlights: [
      'Designed interfaces for SaaS and enterprise platforms',
      'Introduced AI tools into design workflows to accelerate delivery',
      'Created 3D elements and micro-interactions for richer experiences',
    ],
    nodePercent: 33.3
  },
  {
    company: 'Incture Technologies',
    role: 'Associate UX Designer',
    period: 'Jul 2022 – Aug 2023',
    location: 'Bangalore',
    tag: 'SaaS Products',
    logo: '/Incture - Logo.png',
    number: '03',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 3h12l4 6-10 12L2 9z" />
      </svg>
    ),
    highlights: [
      'Led UX design for Cherrywork SaaS platform (PhonePe client)',
      'Revamped Cherrywork dashboard — boosted engagement by 30%',
      'Conducted user research, personas, usability testing',
    ],
    nodePercent: 66.6
  },
  {
    company: 'Brandshape',
    role: 'UX Designer Intern',
    period: 'Jan 2022 – Apr 2022',
    location: 'Mumbai',
    tag: 'Client: HDFC Bank',
    logo: '/Branshape-logo.jpeg',
    number: '04',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="12" cy="12" r="4" stroke="var(--accent)" />
      </svg>
    ),
    highlights: [
      'Designed banking workflows aligning with HDFC Bank UX goals',
      'Conducted user research to identify pain points',
      'Improved clarity of key banking customer journeys',
    ],
    nodePercent: 100
  },
]

export default function Journey() {
  const sectionRef = useRef(null)
  const [isMobile, setIsMobile] = useState(false)
  const [activeStep, setActiveStep] = useState(1) // Ranges 1 to 4 based on scroll progress

  // Track scroll position exactly within the pinning window of the sticky container
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  })

  // Map traveling tracker horizontal offset (0% to 100%)
  const travelerX = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (isMobile) return

    // Segment horizontal progress into 4 ranges
    if (latest < 0.25) {
      setActiveStep(1) // upliance.ai
    } else if (latest >= 0.25 && latest < 0.5) {
      setActiveStep(2) // Divami
    } else if (latest >= 0.5 && latest < 0.75) {
      setActiveStep(3) // Incture
    } else {
      setActiveStep(4) // Brandshape
    }
  })

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Card render (enlarged width: 500px, premium layouts)
  const renderCard = (role) => {
    return (
      <div 
        className="role-card"
        onClick={() => {
          const speakEvent = new CustomEvent('cat-speak', {
            detail: { text: `At ${role.company}, I worked as a ${role.role} focused on ${role.tag}.` }
          })
          window.dispatchEvent(speakEvent)
        }}
        style={{
          width: isMobile ? '100%' : '500px',
          background: 'var(--bg-card)',
          borderRadius: 'var(--radius-xl)',
          border: '1.5px solid var(--border)',
          padding: '32px',
          boxShadow: 'var(--shadow-lg), 0 20px 40px rgba(0, 0, 0, 0.02)',
          cursor: 'pointer',
          textAlign: 'left',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', minWidth: 0, flex: 1 }}>
            {role.logo ? (
              <div className="role-logo-container">
                <img 
                  src={role.logo} 
                  alt={`${role.company} logo`} 
                  className="role-logo-img"
                />
              </div>
            ) : (
              <span className="role-icon-box">{role.icon}</span>
            )}
            <div style={{ minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '15px', fontWeight: 700, color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>{role.number}</span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 19, fontWeight: 500, color: 'var(--text-primary)', letterSpacing: '-0.015em', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {role.company}
                </h3>
              </div>
              <p style={{ fontSize: 14, color: 'var(--text-secondary)', margin: '4px 0 0 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {role.role}
              </p>
            </div>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px', flexShrink: 0 }}>
            <span className="role-card-tag" style={{
              fontSize: '10px',
              fontWeight: 600,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              padding: '3px 10px',
              borderRadius: 'var(--radius-pill)',
              background: 'rgba(0, 82, 255, 0.06)',
              color: 'var(--accent)',
              border: '1px solid rgba(0, 82, 255, 0.15)',
              whiteSpace: 'nowrap'
            }}>{role.tag}</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)' }}>
              {role.period}
            </span>
          </div>
        </div>

        <ul style={{ paddingLeft: '18px', margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {role.highlights.map((h, idx) => (
            <li key={idx} style={{ fontSize: '13.5px', lineHeight: '1.5', color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}>
              {h}
            </li>
          ))}
        </ul>
      </div>
    )
  }

  return (
    <>
      <section 
        ref={sectionRef} 
        id="journey" 
        style={{ 
          position: 'relative', 
          zIndex: 1,
          background: 'var(--bg)', 
          borderTop: '1px solid var(--border)',
          minHeight: isMobile ? 'auto' : '180vh', // Comfortably spaced scroll range
          overflow: 'visible'
        }}
      >
        {/* Sticky layout container for Desktop */}
        <div 
          style={{
            position: isMobile ? 'relative' : 'sticky',
            top: 0,
            height: isMobile ? 'auto' : '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            overflow: 'hidden',
            zIndex: 2,
            padding: isMobile ? 'var(--space-11) 0' : '0'
          }}
        >
          <div className="container" style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: 1100 }}>
            
            {/* Header Title Block */}
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <FadeUp>
                <Label>Journey</Label>
                <h2 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(32px, 4vw, 46px)',
                  fontWeight: 400,
                  letterSpacing: '-0.025em',
                  lineHeight: 1.1,
                  color: 'var(--text-primary)',
                  marginTop: 'var(--space-4)',
                  marginBottom: 0,
                }}>
                  Where I've <span style={{ color: 'var(--accent)' }}>made my mark.</span>
                </h2>
              </FadeUp>
            </div>

            {/* HORIZONTAL TIMELINE DISPLAY */}
            {!isMobile ? (
              <div 
                style={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '60px', // Space between Card display and Timeline line below
                  overflow: 'visible',
                  position: 'relative'
                }}
              >
                {/* Active Card Viewer (Centered) */}
                <div style={{
                  height: '320px', 
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  width: '100%'
                }}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeStep}
                      initial={{ opacity: 0, x: 40, scale: 0.98 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: -40, scale: 0.98 }}
                      transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
                    >
                      {renderCard(roles[activeStep - 1])}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* BOTTOM HORIZONTAL TIMELINE TRACK */}
                <div style={{
                  width: '80%',
                  position: 'relative',
                  paddingBottom: '40px' // Space for text labels below nodes
                }}>
                  {/* Background Track Line */}
                  <div style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: '6px',
                    height: '4px',
                    background: 'var(--border)',
                    borderRadius: '2px',
                    zIndex: 1
                  }} />

                  {/* Traveling Blue Line */}
                  <motion.div 
                    style={{
                      position: 'absolute',
                      left: 0,
                      right: 0,
                      top: '6px',
                      height: '4px',
                      background: 'var(--accent)',
                      borderRadius: '2px',
                      zIndex: 2,
                      originX: 0,
                      scaleX: scrollYProgress
                    }}
                  />

                  {/* Horizontal Traveling Dot */}
                  <motion.div 
                    style={{
                      position: 'absolute',
                      top: '8px',
                      left: travelerX,
                      transform: 'translate(-50%, -50%)',
                      width: 14,
                      height: 14,
                      borderRadius: '50%',
                      background: 'var(--accent)',
                      border: '3px solid var(--bg)',
                      boxShadow: '0 0 10px rgba(0, 82, 255, 0.5)',
                      zIndex: 3,
                    }}
                  />

                  {/* Node Checkpoints & Labels */}
                  {roles.map((r, i) => {
                    const nodeNum = i + 1
                    const isNodeActive = activeStep >= nodeNum

                    return (
                      <div
                        key={r.company}
                        style={{
                          position: 'absolute',
                          left: `${r.nodePercent}%`,
                          top: '8px',
                          transform: 'translate(-50%, -50%)',
                          zIndex: 4,
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center'
                        }}
                      >
                        {/* Dot node */}
                        <div style={{
                          width: 10,
                          height: 10,
                          borderRadius: '50%',
                          background: isNodeActive ? 'var(--accent)' : 'var(--border)',
                          border: '2px solid var(--bg)',
                          transition: 'background 0.3s'
                        }} />

                        {/* Label below dot */}
                        <span style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: 10.5,
                          fontWeight: 700,
                          color: activeStep === nodeNum ? 'var(--text-primary)' : 'var(--text-muted)',
                          marginTop: 14,
                          whiteSpace: 'nowrap',
                          transition: 'color 0.3s'
                        }}>
                          {r.company}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            ) : (
              /* Mobile Stack View fallback with Left side timeline line */
              <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', width: '100%', marginTop: 'var(--space-4)', paddingLeft: '24px' }}>
                {/* Timeline vertical line on mobile */}
                <div style={{
                  position: 'absolute',
                  left: '4px',
                  top: '12px',
                  bottom: '12px',
                  width: '2px',
                  background: 'var(--border)',
                  zIndex: 1
                }} />

                {roles.map((role, i) => (
                  <div key={role.company} style={{ position: 'relative', width: '100%' }}>
                    {/* Node checkpoint dot on mobile */}
                    <div style={{
                      position: 'absolute',
                      left: '-23px',
                      top: '26px',
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: 'var(--accent)',
                      border: '2px solid var(--bg)',
                      zIndex: 2
                    }} />

                    <FadeUp delay={i * 80}>
                      {renderCard(role)}
                    </FadeUp>
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>
      </section>

      {/* Education Section - Rendered as a separate sibling so it scrolls up naturally with 0% overlap */}
      <section 
        id="education" 
        style={{ 
          position: 'relative', 
          zIndex: 2,
          background: 'var(--bg)', 
          borderBottom: '1px solid var(--border)',
          paddingBottom: isMobile ? 'var(--space-8)' : 'var(--space-12)',
          paddingTop: isMobile ? 'var(--space-2)' : 'var(--space-8)'
        }}
      >
        <div className="container" style={{ position: 'relative', zIndex: 12 }}>
          <FadeUp delay={100}>
            <div style={{
              padding: 'var(--space-5) var(--space-6)',
              background: 'var(--bg-warm)',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--border)',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-4)',
              position: 'relative',
              zIndex: 2,
            }}>
              <div>
                <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '4px' }}>Education</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: isMobile ? 16 : 17, fontWeight: 400, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>Bachelor of Design — Fashion Communication</div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: '2px' }}>
                  {isMobile ? "NIFT Chennai · 2018–2022" : "National Institute of Fashion Technology (NIFT), Chennai · 2018–2022"}
                </div>
              </div>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/>
              </svg>
            </div>
          </FadeUp>
        </div>
      </section>

      <style>{`
        .role-card {
          transition: border-color 0.3s ease, box-shadow 0.3s ease !important;
        }
        .role-card:hover {
          border-color: var(--accent) !important;
          box-shadow: var(--shadow-md), 0 10px 24px rgba(0, 82, 255, 0.08) !important;
        }
        .role-logo-container {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: #ffffff;
          border: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          padding: 6px;
          flex-shrink: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.02);
        }
        .role-logo-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
        .role-card:hover .role-logo-container {
          border-color: var(--accent);
        }
      `}</style>
    </>
  )
}
