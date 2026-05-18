import { useState, useEffect, useRef } from 'react'

const links = [
  { label: 'Expertise', href: '#expertise' },
  { label: 'Projects', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Journey', href: '#journey' },
  { label: 'Contact', href: '#contact' },
]

export default function Nav() {
  const [visible, setVisible] = useState(true)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const lastY = useRef(0)

  // ── Light/Dark Mode State ──
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme')
      if (saved) return saved
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
    return 'light'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  // ── Responsive screen width check ──
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      // Show nav when scrolling UP or near top; hide when scrolling DOWN
      if (y < 80) {
        setVisible(true)
      } else if (y > lastY.current + 8) {
        setVisible(false)  // scrolling down
      } else if (y < lastY.current - 8) {
        setVisible(true)   // scrolling up
      }
      setScrolled(y > 40)
      lastY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* ── Unified Main Navigation Pill ── */}
      <header
        id="nav"
        style={{
          position: 'fixed',
          top: 20,
          left: '50%',
          transform: `translateX(-50%) translateY(${visible ? '0' : '-140%'})`,
          zIndex: 100,
          transition: 'transform 0.4s var(--ease-out-expo), box-shadow 0.3s ease, background 0.3s',
          width: 'auto',
          maxWidth: isMobile ? 'calc(100vw - 32px)' : 'calc(100vw - 48px)',
        }}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-3)',
          padding: isMobile ? '6px 8px 6px 10px' : '6px 8px 6px 12px',
          background: theme === 'dark' 
            ? (scrolled ? 'rgba(24, 26, 31, 0.96)' : 'rgba(24, 26, 31, 0.85)')
            : (scrolled ? 'rgba(255, 255, 255, 0.96)' : 'rgba(255, 255, 255, 0.85)'),
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRadius: 'var(--radius-pill)',
          border: '1px solid var(--border)',
          boxShadow: scrolled ? 'var(--shadow-md)' : 'var(--shadow-sm)',
        }}>

          {/* Logo Avatar */}
          <a href="#" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', flexShrink: 0 }}>
            <img 
              src="/soupriti.jpg" 
              alt="Soupriti Das Logo"
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                objectFit: 'cover',
                border: '1.5px solid var(--accent)',
                transition: 'transform 0.2s ease',
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            />
          </a>

          {/* Nav links */}
          <nav className="pill-nav" style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {links.map(l => (
              <a
                key={l.label}
                href={l.href}
                className="pill-nav-link"
              >{l.label}</a>
            ))}
          </nav>

          {/* Resume CTA */}
          <a
            href="/Soupriti_Das_Resume.pdf"
            download="Soupriti_Das_Resume.pdf"
            target="_blank"
            rel="noopener"
            className="resume-cta-btn"
          >
            Resume ↗
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            className="hamburger"
            style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', flexDirection: 'column', gap: 5, padding: '4px 8px' }}
          >
            {[0, 1, 2].map(i => (
              <span key={i} style={{ display: 'block', width: 20, height: 1.5, background: 'var(--text-primary)', borderRadius: 2, transition: 'all 0.3s' }} />
            ))}
          </button>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .pill-nav { display: none !important; }
            .resume-cta-btn { display: none !important; }
            .hamburger { display: flex !important; }
            .theme-toggle-pill-embedded { height: 28px !important; width: 105px !important; }
            .theme-toggle-pill-embedded button { font-size: 9px !important; }
          }
        `}</style>
      </header>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div style={{
          position: 'fixed', inset: 0,
          background: 'var(--bg)',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          gap: 'var(--space-7)', zIndex: 99,
        }}>
          {links.map(l => (
            <a key={l.label} href={l.href} onClick={() => setMenuOpen(false)}
              style={{ fontSize: 28, fontFamily: 'var(--font-display)', fontWeight: 400, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}
            >{l.label}</a>
          ))}
        </div>
      )}

      {/* Micro-interaction styling rules */}
      <style>{`
        /* Emil Kowalski Premium Navbar Microinteractions */
        .pill-nav-link {
          font-size: 13px;
          font-weight: 500;
          color: var(--text-secondary) !important;
          padding: 6px 14px;
          border-radius: var(--radius-pill);
          transition: transform 150ms var(--ease-out-expo), background-color 200ms ease, color 200ms ease !important;
          white-space: nowrap;
          letter-spacing: -0.015em;
          position: relative;
          display: inline-block;
          text-decoration: none;
        }
        .pill-nav-link:hover {
          background-color: var(--bg-warm) !important;
          color: var(--text-primary) !important;
          transform: translateY(-1px) scale(1.03);
        }
        .pill-nav-link:active {
          transform: translateY(0) scale(0.95) !important;
        }

        .resume-cta-btn {
          font-size: 12px;
          font-weight: 600;
          color: white !important;
          padding: 7px 16px;
          background: var(--accent) !important;
          border-radius: var(--radius-pill);
          transition: transform 150ms var(--ease-out-expo), background-color 200ms ease, box-shadow 200ms ease !important;
          white-space: nowrap;
          letter-spacing: -0.01em;
          flex-shrink: 0;
          text-decoration: none;
        }
        .resume-cta-btn:hover {
          background: var(--accent-light) !important;
          transform: translateY(-1px) scale(1.03);
          box-shadow: 0 4px 12px rgba(0, 82, 255, 0.25);
        }
        .resume-cta-btn:active {
          transform: translateY(0) scale(0.95) !important;
        }

        .theme-toggle-option {
          flex: 1;
          height: 100%;
          border: none;
          background: none;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
          font-size: 11px;
          font-weight: 600;
          cursor: pointer;
          z-index: 2;
          transition: color 0.25s ease, transform 120ms var(--ease-out-expo) !important;
          outline: none;
          padding: 0;
        }
        .theme-toggle-option:active {
          transform: scale(0.94);
        }
      `}</style>
    </>
  )
}
