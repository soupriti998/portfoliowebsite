import { useState, useEffect } from 'react'
import { FadeUp, Label } from './utils'

export default function Contact({ isCaseStudy = false }) {
  const [copiedText, setCopiedText] = useState(null)
  const [headline, setHeadline] = useState("Let's create together.")

  const caseStudyHeadlines = [
    "Want to build something weird together?",
    "Curious what happens behind the pixels?",
    "Need a designer who thinks in systems?",
    "Let’s make interfaces feel alive."
  ]

  useEffect(() => {
    if (isCaseStudy) {
      const idx = Math.floor(Math.random() * caseStudyHeadlines.length)
      setHeadline(caseStudyHeadlines[idx])
    } else {
      setHeadline("Let's create together.")
    }
  }, [isCaseStudy])

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text)
    setCopiedText(type)
    setTimeout(() => setCopiedText(null), 2000)
  }

  // Icons DB
  const icons = {
    email: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
    phone: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
    linkedin: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
    portfolio: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
        <path d="M2 12h20" />
      </svg>
    ),
    archive: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="5" x="2" y="3" rx="1" />
        <path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8" />
        <path d="M10 12h4" />
      </svg>
    ),
    copy: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
      </svg>
    ),
    redirect: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 3h6v6" />
        <path d="M10 14 21 3" />
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      </svg>
    ),
    check: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 6 9 17l-5-5" />
      </svg>
    )
  }

  return (
    <section 
      id="contact" 
      style={{ 
        padding: 'var(--space-10) 0', 
        background: '#0a0b0d', 
        borderTop: '1px solid #16181d',
        position: 'relative',
        overflow: 'hidden',
        color: '#ffffff',
      }}
    >
      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 'var(--space-10)', alignItems: 'center' }} className="contact-grid">
          
          {/* Left Column */}
          <FadeUp>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '4px 12px', background: 'rgba(0, 82, 255, 0.15)', border: '1px solid rgba(0, 82, 255, 0.3)', borderRadius: 'var(--radius-pill)', marginBottom: 20 }}>
              <span className="contact-label-dot" />
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#0052ff' }}>Get in Touch</span>
            </div>
            
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(34px, 4vw, 50px)',
              fontWeight: 400,
              letterSpacing: '-0.025em',
              lineHeight: 1.1,
              color: '#ffffff',
              marginTop: 'var(--space-2)',
              marginBottom: 'var(--space-4)',
            }}>
              {headline}
            </h2>

            <p style={{ 
              fontSize: 16, 
              lineHeight: 1.65, 
              color: '#a0a5b5', 
              marginBottom: 0, 
              maxWidth: '44ch',
              fontFamily: 'var(--font-body)'
            }}>
              Open to senior product design roles, AI-first products, research collaborations, and ambitious interactive ecosystems. Let’s construct something beautiful together.
            </p>
          </FadeUp>

          {/* Right Column: Clean utility contact rows with button actions */}
          <FadeUp delay={85}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }} className="contact-links-list">
              
              {/* EMAIL: COPY */}
              <div className="contact-detail-row">
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div className="contact-row-icon">{icons.email}</div>
                  <div>
                    <span className="contact-row-label">Email</span>
                    <span className="contact-row-value">soupritidas123@gmail.com</span>
                  </div>
                </div>
                <button 
                  onClick={() => copyToClipboard('soupritidas123@gmail.com', 'email')}
                  className={`contact-action-pill ${copiedText === 'email' ? 'copied' : ''}`}
                >
                  {copiedText === 'email' ? icons.check : icons.copy}
                  <span>{copiedText === 'email' ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>

              {/* PHONE: COPY */}
              <div className="contact-detail-row">
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div className="contact-row-icon">{icons.phone}</div>
                  <div>
                    <span className="contact-row-label">Phone</span>
                    <span className="contact-row-value">+91 8825442430</span>
                  </div>
                </div>
                <button 
                  onClick={() => copyToClipboard('+91 8825442430', 'phone')}
                  className={`contact-action-pill ${copiedText === 'phone' ? 'copied' : ''}`}
                >
                  {copiedText === 'phone' ? icons.check : icons.copy}
                  <span>{copiedText === 'phone' ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>

              {/* LINKEDIN: REDIRECTION */}
              <div className="contact-detail-row">
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div className="contact-row-icon">{icons.linkedin}</div>
                  <div>
                    <span className="contact-row-label">LinkedIn</span>
                    <span className="contact-row-value">linkedin.com/in/soupriti-das</span>
                  </div>
                </div>
                <a 
                  href="https://www.linkedin.com/in/soupriti-das"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-action-pill"
                >
                  {icons.redirect}
                  <span>Visit ↗</span>
                </a>
              </div>

              {/* CURRENT PORTFOLIO: REDIRECTION */}
              <div className="contact-detail-row">
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div className="contact-row-icon">{icons.portfolio}</div>
                  <div>
                    <span className="contact-row-label">Portfolio</span>
                    <span className="contact-row-value">productgrowthsoupriti.framer.website</span>
                  </div>
                </div>
                <a 
                  href="https://productgrowthsoupriti.framer.website"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-action-pill"
                >
                  {icons.redirect}
                  <span>Visit ↗</span>
                </a>
              </div>

              {/* PREVIOUS ARCHIVE: REDIRECTION */}
              <div className="contact-detail-row">
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div className="contact-row-icon">{icons.archive}</div>
                  <div>
                    <span className="contact-row-label">Archive</span>
                    <span className="contact-row-value">productgrowthsoupriti.framer.website/works</span>
                  </div>
                </div>
                <a 
                  href="https://productgrowthsoupriti.framer.website/works"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-action-pill"
                >
                  {icons.redirect}
                  <span>Visit ↗</span>
                </a>
              </div>

            </div>
          </FadeUp>

        </div>
      </div>

      <style>{`
        /* Contact row structure */
        .contact-detail-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 20px;
          border-radius: var(--radius-xl);
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.04);
          transition: all 300ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        .contact-detail-row:hover {
          background: rgba(0, 82, 255, 0.04);
          border-color: rgba(0, 82, 255, 0.15);
          transform: translateX(4px);
        }

        .contact-row-icon {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.03);
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255, 255, 255, 0.7);
          transition: all 0.3s;
          flex-shrink: 0;
        }

        .contact-detail-row:hover .contact-row-icon {
          background: rgba(0, 82, 255, 0.1);
          color: var(--accent);
          transform: scale(1.08) rotate(6deg);
        }

        .contact-row-label {
          display: block;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #68708c;
          margin-bottom: 2px;
        }

        .contact-row-value {
          display: block;
          font-size: 13.5px;
          font-weight: 500;
          color: #e2e5f0;
          font-family: var(--font-body);
        }

        .contact-detail-row:hover .contact-row-value {
          color: #ffffff;
        }

        /* Action pill button styling */
        .contact-action-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          border-radius: var(--radius-pill);
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(255, 255, 255, 0.03);
          color: rgba(255, 255, 255, 0.8);
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 250ms cubic-bezier(0.16, 1, 0.3, 1);
          text-decoration: none;
          outline: none;
        }

        .contact-action-pill:hover {
          background: var(--accent);
          border-color: var(--accent);
          color: #ffffff;
          box-shadow: 0 4px 12px rgba(0, 82, 255, 0.25);
          transform: translateY(-1px);
        }

        .contact-action-pill:active {
          transform: translateY(1px);
        }

        .contact-action-pill.copied {
          background: #00cc66 !important;
          border-color: #00cc66 !important;
          color: #ffffff !important;
          box-shadow: 0 4px 12px rgba(0, 204, 102, 0.25);
        }

        .contact-label-dot {
          width: 6px;
          height: 6px;
          background: #0052ff;
          border-radius: 50%;
          animation: contactDotPulse 1.5s infinite;
        }

        @keyframes contactDotPulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.5); opacity: 0.4; }
          100% { transform: scale(1); opacity: 1; }
        }

        @media (max-width: 900px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
            gap: var(--space-8) !important;
          }
          
          .contact-detail-row {
            padding: 12px 16px !important;
          }

          .contact-row-value {
            font-size: 12px !important;
          }
        }
      `}</style>
    </section>
  )
}
