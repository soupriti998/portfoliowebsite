import { useState, useEffect, useRef } from 'react'
import { User, Briefcase, TrendingUp, Code, Mail, FileText, ArrowLeft, ExternalLink } from 'lucide-react'
import { playFluteHover, playFluteClick } from './utils'

const menuItems = [
  { label: 'About', href: '#about', icon: User },
  { label: 'Work', href: '#projects', icon: Briefcase },
  { label: 'Experience', href: '#journey', icon: TrendingUp },
  { label: 'Skills', href: '#expertise', icon: Code },
  { label: 'Resume', href: '/Soupriti_Das_Resume.pdf', icon: FileText, download: 'Soupriti_Das_Resume.pdf' },
  { label: 'Previous Portfolio', href: 'https://productgrowthsoupriti.framer.website/', icon: ExternalLink, external: true },
  { label: 'Contact', href: '#contact', icon: Mail },
]

export default function Nav({ activeProject, setActiveProject }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [showBranding, setShowBranding] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.scrollY > 400
    }
    return false
  })
  const [visible, setVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [pathname, setPathname] = useState(window.location.pathname)
  const menuRef = useRef(null)

  useEffect(() => {
    const onPopState = () => setPathname(window.location.pathname)
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

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

  // Reset scroll tracker state when activeProject changes
  useEffect(() => {
    setScrolled(false)
    setVisible(true)
    setLastScrollY(0)
  }, [activeProject])

  // ── Track scrolling for header styling and show/hide direction ──
  useEffect(() => {
    const handleScroll = (e) => {
      const target = e.target === document ? window : e.target
      let currentScrollY = 0
      if (target === window) {
        currentScrollY = window.scrollY
      } else if (target && target.scrollTop !== undefined) {
        currentScrollY = target.scrollTop
      }

      setScrolled(currentScrollY > 20)
      setShowBranding(currentScrollY > 400)

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down -> Hide navbar
        setVisible(false)
      } else {
        // Scrolling up -> Show navbar
        setVisible(true)
      }
      setLastScrollY(currentScrollY)
    }
    window.addEventListener('scroll', handleScroll, { capture: true, passive: true })
    return () => window.removeEventListener('scroll', handleScroll, { capture: true })
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

  // ── Smooth Scroll & Routing Handler ──
  const handleItemClick = (e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    if (setActiveProject) {
      setActiveProject(null)
    }
    
    if (href.startsWith('/')) {
      window.history.pushState({}, '', href)
      window.dispatchEvent(new PopStateEvent('popstate'))
      return
    }

    if (window.location.pathname !== '/') {
      window.history.pushState({}, '', '/')
      window.dispatchEvent(new PopStateEvent('popstate'))
      setTimeout(() => {
        if (window.__lenis) {
          window.__lenis.scrollTo(href)
        } else {
          document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 100)
      return
    }

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
          paddingTop: scrolled ? '16px' : '24px',
          paddingBottom: scrolled ? '16px' : '24px',
          background: (!activeProject && !scrolled) ? 'transparent' : 'var(--bg-overlay)',
          borderBottom: (!activeProject && !scrolled) ? 'none' : '1px solid var(--border)',
          backdropFilter: (!activeProject && !scrolled) ? 'none' : 'blur(20px)',
          WebkitBackdropFilter: (!activeProject && !scrolled) ? 'none' : 'blur(20px)',
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
          {/* Left Side: Name and Title OR Back Button */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {activeProject ? (
              <button 
                onClick={() => {
                  if (setActiveProject) setActiveProject(null)
                  playFluteClick()
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-1px)'
                  e.currentTarget.style.boxShadow = 'var(--shadow-md)'
                  playFluteHover()
                }}
                style={{ 
                  textDecoration: 'none', 
                  display: 'flex', 
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 16px',
                  background: 'var(--bg-card-frosted, rgba(255, 255, 255, 0.6))',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-pill)',
                  boxShadow: 'var(--shadow-sm)',
                  color: 'var(--text-primary)',
                  fontWeight: 600,
                  fontSize: '14px',
                  transition: 'all 0.25s var(--ease-out-expo)',
                  cursor: 'pointer',
                  outline: 'none'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'var(--shadow-sm)'
                }}
              >
                <ArrowLeft size={16} className="back-arrow-icon" /> Back
              </button>
            ) : pathname !== '/' ? (
              <a 
                href="/" 
                onClick={(e) => {
                  e.preventDefault()
                  window.history.pushState({}, '', '/')
                  window.dispatchEvent(new PopStateEvent('popstate'))
                  playFluteClick()
                }}
                onMouseEnter={playFluteHover}
                style={{ 
                  textDecoration: 'none', 
                  display: 'flex', 
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 16px',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-pill)',
                  boxShadow: 'var(--shadow-sm)',
                  color: 'var(--text-primary)',
                  fontWeight: 600,
                  fontSize: '14px',
                  transition: 'all 0.25s var(--ease-out-expo)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'var(--shadow-sm)'
                }}
              >
                <ArrowLeft size={16} /> Back
              </a>
            ) : (
              <a 
                href="/" 
                onClick={(e) => {
                  e.preventDefault()
                  playFluteClick()
                  handleItemClick(e, '#home')
                }}
                onMouseEnter={playFluteHover}
                style={{ 
                  textDecoration: 'none', 
                  display: 'flex', 
                  flexDirection: 'column',
                  opacity: showBranding ? 1 : 0,
                  transform: showBranding ? 'translateY(0)' : 'translateY(-8px)',
                  pointerEvents: showBranding ? 'auto' : 'none',
                  transition: 'opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1), transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
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
                  fontWeight: 500,
                  color: 'var(--text-primary)',
                  marginTop: 2,
                }}>
                  Product Designer
                </span>
              </a>
            )}
          </div>

          {/* Right Side: Menu Button and Dropdown Menu */}
          <div ref={menuRef} style={{ position: 'relative' }}>
            <button
              onClick={() => {
                setMenuOpen(!menuOpen)
                playFluteClick()
              }}
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
                playFluteHover()
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
                }}
              >
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
                      target={item.external ? "_blank" : undefined}
                      rel={item.external ? "noopener noreferrer" : undefined}
                      onClick={(e) => {
                        playFluteClick()
                        if (isDownload || item.external) {
                          setMenuOpen(false)
                        } else {
                          handleItemClick(e, item.href)
                        }
                      }}
                      onMouseEnter={playFluteHover}
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
