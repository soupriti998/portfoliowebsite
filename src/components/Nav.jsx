import { useState, useEffect, useRef } from 'react'
import { User, Briefcase, TrendingUp, Code, Mail, FileText } from 'lucide-react'

const menuItems = [
  { label: 'About', href: '#about', icon: User },
  { label: 'Work', href: '#projects', icon: Briefcase },
  { label: 'Experience', href: '#journey', icon: TrendingUp },
  { label: 'Skills', href: '#expertise', icon: Code },
  { label: 'Resume', href: '/Soupriti_Das_Resume.pdf', icon: FileText, download: 'Soupriti_Das_Resume.pdf' },
  { label: 'Contact', href: '#contact', icon: Mail },
]

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [visible, setVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const menuRef = useRef(null)

  // ── Light/Dark Mode Initialization ──
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

  // ── Track scrolling for header styling and show/hide direction ──
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setScrolled(currentScrollY > 20)

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down -> Hide navbar
        setVisible(false)
      } else {
        // Scrolling up -> Show navbar
        setVisible(true)
      }
      setLastScrollY(currentScrollY)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  // ── Click outside to close dropdown ──
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // ── Smooth Scroll Handler using Lenis ──
  const handleItemClick = (e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    if (window.__lenis) {
      window.__lenis.scrollTo(href)
    } else {
      const target = document.querySelector(href)
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 1000000,
          paddingTop: scrolled ? '16px' : '32px',
          paddingBottom: scrolled ? '16px' : '0px',
          background: scrolled ? 'var(--bg-overlay)' : 'transparent',
          borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          transition: 'transform 0.4s var(--ease-out-expo), padding 0.3s var(--ease-out-expo), background 0.3s, border-bottom 0.3s, backdrop-filter 0.3s',
          transform: (visible || menuOpen) ? 'translateY(0)' : 'translateY(-100%)',
        }}
      >
        <div 
          className="container" 
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            maxWidth: 1440,
            paddingInline: 'clamp(24px, 5vw, 72px)',
          }}
        >
          {/* Left Side: Name and Title */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <a 
              href="#home" 
              onClick={(e) => handleItemClick(e, '#home')}
              style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column' }}
            >
              <span style={{
                fontFamily: 'var(--font-display)',
                fontSize: '20px',
                fontWeight: 700,
                color: 'var(--text-primary)',
                letterSpacing: '-0.02em',
                lineHeight: 1.2,
              }}>
                Soupriti
              </span>
              <span style={{
                fontFamily: 'var(--font-body)',
                fontSize: '13px',
                fontWeight: 400,
                color: 'var(--text-secondary)',
                marginTop: 2,
              }}>
                Product Designer
              </span>
            </a>
          </div>

          {/* Right Side: Menu Button and Dropdown Menu */}
          <div ref={menuRef} style={{ position: 'relative' }}>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-expanded={menuOpen}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '10px 18px',
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-pill)',
                boxShadow: 'var(--shadow-sm)',
                cursor: 'pointer',
                transition: 'all 0.25s var(--ease-out-expo)',
                outline: 'none',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-1px)'
                e.currentTarget.style.boxShadow = 'var(--shadow-md)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'var(--shadow-sm)'
              }}
            >
              <span style={{
                fontSize: 14,
                fontWeight: 600,
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-body)',
                letterSpacing: '-0.015em',
              }}>
                Menu
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <span style={{
                  display: 'block',
                  width: 16,
                  height: 1.5,
                  background: 'var(--text-primary)',
                  borderRadius: 1,
                  transform: menuOpen ? 'translateY(5.5px) rotate(45deg)' : 'none',
                  transition: 'transform 0.3s var(--ease-out-expo)',
                }} />
                <span style={{
                  display: 'block',
                  width: 16,
                  height: 1.5,
                  background: 'var(--text-primary)',
                  borderRadius: 1,
                  opacity: menuOpen ? 0 : 1,
                  transition: 'opacity 0.2s ease',
                }} />
                <span style={{
                  display: 'block',
                  width: 16,
                  height: 1.5,
                  background: 'var(--text-primary)',
                  borderRadius: 1,
                  transform: menuOpen ? 'translateY(-5.5px) rotate(-45deg)' : 'none',
                  transition: 'transform 0.3s var(--ease-out-expo)',
                }} />
              </div>
            </button>

            {/* Dropdown Menu Overlay */}
            {menuOpen && (
              <div 
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 12px)',
                  right: 0,
                  width: 220,
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: 'var(--shadow-lg)',
                  padding: '8px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 4,
                  zIndex: 110,
                  animation: 'slideDownFade 0.25s var(--ease-out-expo) forwards',
                }}
              >
                {menuItems.map(item => {
                  const Icon = item.icon
                  const isDownload = !!item.download
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      download={isDownload ? item.download : undefined}
                      onClick={(e) => {
                        if (isDownload) {
                          setMenuOpen(false)
                        } else {
                          handleItemClick(e, item.href)
                        }
                      }}
                      className="dropdown-item"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                        padding: '10px 14px',
                        borderRadius: 'var(--radius-sm)',
                        color: 'var(--text-secondary)',
                        fontSize: 14,
                        fontWeight: 500,
                        textDecoration: 'none',
                        transition: 'all 0.2s var(--ease-out-expo)',
                      }}
                    >
                      <Icon size={16} strokeWidth={2} style={{ color: 'var(--text-muted)' }} />
                      <span>{item.label}</span>
                    </a>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Styled components custom animations */}
      <style>{`
        @keyframes slideDownFade {
          from { opacity: 0; transform: translateY(-8px); filter: blur(4px); }
          to { opacity: 1; transform: translateY(0); filter: blur(0); }
        }

        .dropdown-item:hover {
          background: var(--bg-warm);
          color: var(--text-primary) !important;
          transform: translateX(4px);
        }

        .dropdown-item:active {
          transform: translateX(2px) scale(0.97);
        }
      `}</style>
    </>
  )
}
