import { useRef } from 'react'
import { FadeUp, Label } from './utils'

const roles = [
  {
    company: 'upliance.ai',
    role: 'Product Designer',
    period: 'Sep 2024 – Present',
    location: 'Bangalore',
    tag: 'AI Product',
    logo: '/upliance.ai-logo.png',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="role-icon-svg">
        {/* Smart induction cooker + steaming heat waves */}
        <path d="M3 14h18M5 14v5a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-5M8 9V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4" />
        <path d="M12 2v1M9 2.5l.5 1M15 2.5l-.5 1" stroke="var(--accent)" strokeWidth="1.5" />
        <circle cx="12" cy="17" r="1.5" fill="var(--accent)" />
      </svg>
    ),
    highlights: [
      'Redesigned core mobile & device UX for AI-powered cooking platform',
      'Reduced perceived cooking time by 24% through interaction design',
      'Built scalable design system with reusable card components',
      'Partnered with founders to align UX strategy with business KPIs',
      'Led user research & behavioral analysis to drive data-informed design',
    ],
  },
  {
    company: 'Divami Design Labs',
    role: 'UI Designer',
    period: 'Sep 2023 – Aug 2024',
    location: 'Hyderabad',
    tag: 'SaaS & Enterprise',
    logo: '/divami-Logo.png',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="role-icon-svg">
        {/* Dynamic lightning bolt node connection */}
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        <circle cx="13" cy="2" r="1.5" fill="var(--accent)" />
        <circle cx="3" cy="14" r="1.5" fill="var(--accent)" />
        <circle cx="21" cy="10" r="1.5" fill="var(--accent)" />
      </svg>
    ),
    highlights: [
      'Designed interfaces for SaaS and enterprise platforms',
      'Introduced AI tools into design workflows to accelerate delivery',
      'Created 3D elements and micro-interactions for richer experiences',
      'Collaborated in Agile teams delivering quality under tight timelines',
    ],
  },
  {
    company: 'Incture Technologies',
    role: 'Associate UX Designer',
    period: 'Jul 2022 – Aug 2023',
    location: 'Bangalore',
    tag: 'SaaS Products',
    logo: '/Incture - Logo.png',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="role-icon-svg">
        {/* Editorial diamond grid layout wireframe */}
        <path d="M6 3h12l4 6-10 12L2 9z" />
        <path d="M11 3 8 9l4 12 4-12-3-6" stroke="var(--accent)" strokeWidth="1" />
      </svg>
    ),
    highlights: [
      'Led UX design for Cherrywork SaaS platform (PhonePe client)',
      'Revamped Cherrywork dashboard — boosted engagement by 30%',
      'Conducted user research, personas, usability testing',
      'Simplified complex enterprise data into intuitive dashboards',
    ],
  },
  {
    company: 'Brandshape',
    role: 'UX Designer Intern',
    period: 'Jan 2022 – Apr 2022',
    location: 'Mumbai',
    tag: 'Client: HDFC Bank',
    logo: '/Branshape-logo.jpeg',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="role-icon-svg">
        {/* Banking vault gateway / dynamic rotation lock */}
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="12" cy="12" r="4" stroke="var(--accent)" />
        <path d="M12 8v8M8 12h8" />
      </svg>
    ),
    highlights: [
      'Designed banking workflows aligning with HDFC Bank UX goals',
      'Conducted user research to identify pain points',
      'Improved clarity of key banking customer journeys',
    ],
  },
]

export default function Journey() {
  const containerRef = useRef(null)

  const scroll = (direction) => {
    if (containerRef.current) {
      const amount = direction === 'left' ? -380 : 380
      containerRef.current.scrollBy({ left: amount, behavior: 'smooth' })
    }
  }

  return (
    <section id="journey" style={{ padding: 'var(--space-11) 0', background: 'var(--bg)', position: 'relative', overflow: 'hidden' }}>
      
      {/* Ambient background glowing orbs */}
      <div style={{ position: 'absolute', top: '15%', left: '5%', width: 350, height: 350, borderRadius: '50%', background: 'rgba(0, 82, 255, 0.02)', filter: 'blur(100px)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'absolute', bottom: '20%', right: '5%', width: 450, height: 450, borderRadius: '50%', background: 'rgba(0, 82, 255, 0.01)', filter: 'blur(120px)', pointerEvents: 'none', zIndex: 0 }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        
        {/* Title Block with Slide Nav Buttons */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 'var(--space-8)', flexWrap: 'wrap', gap: 'var(--space-5)' }}>
          <FadeUp>
            <Label>Journey</Label>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(32px, 4vw, 48px)',
              fontWeight: 400,
              letterSpacing: '-0.025em',
              lineHeight: 1.1,
              color: 'var(--text-primary)',
              marginTop: 'var(--space-5)',
              marginBottom: 0,
            }}>
              Where I've <span style={{ color: 'var(--accent)' }}>made my mark.</span>
            </h2>
          </FadeUp>

          {/* Sliding Control Arrows */}
          <FadeUp delay={60}>
            <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center' }}>
              <button
                onClick={() => scroll('left')}
                aria-label="Scroll left"
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                  border: '1px solid var(--border)',
                  background: 'var(--bg-card)',
                  color: 'var(--text-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.25s var(--ease-out-expo)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--accent)'
                  e.currentTarget.style.background = 'var(--bg-warm)'
                  e.currentTarget.style.transform = 'translateX(-2px)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--border)'
                  e.currentTarget.style.background = 'var(--bg-card)'
                  e.currentTarget.style.transform = 'none'
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={() => scroll('right')}
                aria-label="Scroll right"
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                  border: '1px solid var(--border)',
                  background: 'var(--bg-card)',
                  color: 'var(--text-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.25s var(--ease-out-expo)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--accent)'
                  e.currentTarget.style.background = 'var(--bg-warm)'
                  e.currentTarget.style.transform = 'translateX(2px)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--border)'
                  e.currentTarget.style.background = 'var(--bg-card)'
                  e.currentTarget.style.transform = 'none'
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </FadeUp>
        </div>

        {/* Horizontal Timeline Track Container */}
        <div style={{ position: 'relative', width: '100%' }}>
          
          {/* Continuous Glowing Horizontal Line behind cards */}
          <div style={{
            position: 'absolute',
            top: '46px',
            left: '50%',
            width: '100vw',
            transform: 'translateX(-50%)',
            height: 2,
            background: 'linear-gradient(90deg, var(--border) 0%, var(--accent) 50%, var(--border) 100%)',
            opacity: 0.35,
            zIndex: 1,
          }} />

          {/* Horizontally scrollable row */}
          <div 
            ref={containerRef}
            className="journey-scroll-container"
            style={{
              display: 'flex',
              gap: 'var(--space-6)',
              overflowX: 'auto',
              scrollSnapType: 'x mandatory',
              padding: '12px 4px 36px',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              position: 'relative',
              zIndex: 2,
              width: '100vw',
              marginLeft: '50%',
              transform: 'translateX(-50%)',
            }}
          >
            {roles.map((role, i) => (
              <div 
                key={role.company}
                className="role-card"
                onClick={() => {
                  const speakEvent = new CustomEvent('cat-speak', {
                    detail: { text: `At ${role.company}, I worked as a ${role.role} focused on ${role.tag}.` }
                  });
                  window.dispatchEvent(speakEvent);
                }}
                style={{
                  flex: '0 0 380px',
                  scrollSnapAlign: 'start',
                  background: 'var(--bg-card)',
                  borderRadius: 'var(--radius-xl)',
                  border: '1px solid var(--border)',
                  padding: 'var(--space-6)',
                  boxShadow: 'var(--shadow-sm)',
                  cursor: 'pointer',
                  position: 'relative',
                  textAlign: 'left',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                }}
              >
                {/* Node connection bubble directly on top edge */}
                <div style={{
                  position: 'absolute',
                  top: '-28px',
                  left: '32px',
                  width: 14,
                  height: 14,
                  borderRadius: '50%',
                  background: 'var(--bg-card)',
                  border: '2.5px solid var(--accent)',
                  boxShadow: '0 0 10px rgba(0, 82, 255, 0.4)',
                  zIndex: 3,
                }} />

                {/* Card Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
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
                      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 500, color: 'var(--text-primary)', letterSpacing: '-0.015em', margin: 0, textAlign: 'left' }}>{role.company}</h3>
                    </div>
                    <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: '6px', margin: '6px 0 0 0', textAlign: 'left' }}>{role.role} · <span style={{ color: 'var(--text-muted)' }}>{role.location}</span></p>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                    <span className="role-card-tag" style={{
                      fontSize: 10,
                      fontWeight: 600,
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                      padding: '2px 8px',
                      borderRadius: 'var(--radius-pill)',
                      background: 'rgba(0, 82, 255, 0.06)',
                      color: 'var(--accent)',
                      border: '1px solid rgba(0, 82, 255, 0.15)',
                    }}>{role.tag}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)', marginTop: '2px' }}>{role.period}</span>
                  </div>
                </div>

                {/* Highlights List */}
                <ul style={{
                  paddingLeft: '16px',
                  margin: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  textAlign: 'left',
                }}>
                  {role.highlights.map((h, idx) => (
                    <li 
                      key={idx}
                      style={{
                        fontSize: '12px',
                        lineHeight: '1.5',
                        color: 'var(--text-secondary)',
                        fontFamily: 'var(--font-body)',
                        textAlign: 'left',
                      }}
                    >
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Education Section */}
        <FadeUp delay={100}>
          <div style={{
            marginTop: 'var(--space-8)',
            padding: 'var(--space-6) var(--space-7)',
            background: 'var(--bg-warm)',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--border)',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-5)',
            position: 'relative',
            zIndex: 2,
          }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 'var(--space-2)' }}>Education</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 19, fontWeight: 400, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>Bachelor of Design — Fashion Communication</div>
              <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 'var(--space-1)' }}>National Institute of Fashion Technology (NIFT), Chennai · 2018–2022</div>
            </div>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
              <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
              <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/>
            </svg>
          </div>
        </FadeUp>

      </div>

      {/* Premium Micro-Interaction Styles */}
      <style>{`
        .journey-scroll-container {
          padding-left: calc((100vw - 1200px) / 2 + var(--space-8)) !important;
          padding-right: calc((100vw - 1200px) / 2 + var(--space-8)) !important;
        }
        @media (max-width: 1200px) {
          .journey-scroll-container {
            padding-left: var(--space-8) !important;
            padding-right: var(--space-8) !important;
          }
        }
        @media (max-width: 768px) {
          .journey-scroll-container {
            padding-left: var(--space-5) !important;
            padding-right: var(--space-5) !important;
          }
        }
        .journey-scroll-container::-webkit-scrollbar {
          display: none;
        }
        .role-card {
          transition: all 0.45s var(--ease-out-expo) !important;
        }
        .role-card:hover {
          transform: translateY(-8px) scale(1.005) !important;
          border-color: var(--accent) !important;
          box-shadow: var(--shadow-lg), 0 16px 36px rgba(0, 82, 255, 0.08) !important;
        }
        .role-icon-svg {
          transition: transform 0.45s var(--ease-out-expo), color 0.45s var(--ease-out-expo);
          color: var(--text-secondary);
        }
        .role-card:hover .role-icon-svg {
          transform: scale(1.2) rotate(6deg);
          color: var(--accent) !important;
        }
        .role-logo-container {
          width: 46px;
          height: 46px;
          border-radius: 12px;
          background: #ffffff;
          border: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          padding: 6px;
          transition: all 0.45s var(--ease-out-expo);
          flex-shrink: 0;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
        }
        [data-theme="dark"] .role-logo-container {
          background: #ffffff;
          border-color: #24272e;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
        }
        .role-card:hover .role-logo-container {
          transform: scale(1.1) rotate(4deg);
          border-color: var(--accent) !important;
          box-shadow: 0 8px 20px rgba(0, 82, 255, 0.18) !important;
        }
        .role-logo-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          transition: transform 0.45s var(--ease-out-expo);
        }
        .role-card:hover .role-logo-img {
          transform: scale(1.05);
        }
        .role-card:hover .role-card-tag {
          background: var(--accent) !important;
          color: white !important;
          border-color: var(--accent) !important;
        }
        @media (max-width: 480px) {
          .role-card {
            flex: 0 0 300px !important;
          }
        }
      `}</style>
    </section>
  )
}
