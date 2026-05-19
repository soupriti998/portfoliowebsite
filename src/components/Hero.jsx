import { useEffect, useRef, useState } from 'react'

/* ── Canvas cursor-reactive background ── */
function CursorCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId
    let mouse = { x: -999, y: -999 }

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Dot grid
    const SPACING = 38
    const dots = []
    const buildDots = () => {
      dots.length = 0
      const cols = Math.ceil(canvas.width / SPACING) + 1
      const rows = Math.ceil(canvas.height / SPACING) + 1
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          dots.push({ x: c * SPACING, y: r * SPACING })
        }
      }
    }
    buildDots()
    window.addEventListener('resize', buildDots)

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouse = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    window.addEventListener('mousemove', onMove)

    const RADIUS = 140
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Dynamically read accent-rgb from stylesheet to support theme switching
      const computedStyle = getComputedStyle(document.documentElement)
      const accentRgb = (computedStyle.getPropertyValue('--accent-rgb') || '106, 95, 193').trim()

      for (const d of dots) {
        const dx = d.x - mouse.x
        const dy = d.y - mouse.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        const influence = Math.max(0, 1 - dist / RADIUS)
        const size = 1.2 + influence * 2.8
        const alpha = 0.08 + influence * 0.28
        ctx.beginPath()
        ctx.arc(d.x, d.y, size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${accentRgb}, ${alpha})`
        ctx.fill()
      }
      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('resize', buildDots)
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute', inset: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  )
}

export default function Hero() {
  const [loaded, setLoaded] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 })
  const heroRef = useRef(null)

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(t)
  }, [])

  const handleMouseMove = (e) => {
    const { left, top, width, height } = heroRef.current.getBoundingClientRect()
    setMousePos({
      x: (e.clientX - left) / width,
      y: (e.clientY - top) / height,
    })
  }

  const px = (mousePos.x - 0.5) * 24
  const py = (mousePos.y - 0.5) * 14

  return (
    <section
      id="home"
      ref={heroRef}
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--bg)',
        paddingTop: '152px', /* 72px (navbar bottom) + 80px (requested gap) */
        paddingBottom: '80px',
      }}
    >
      <style>{`
        .hero-grid {
          display: grid;
          grid-template-columns: minmax(620px, 920px) minmax(320px, 420px);
          justify-content: space-between;
          align-items: center;
          column-gap: clamp(24px, 5vw, 100px);
          width: 100%;
          min-height: calc(100vh - 180px);
        }
        .hero-ai-dock-wrapper {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          position: relative;
          width: 100%;
          min-height: 240px;
          padding-top: 24px;
        }
        .hero-h1 {
          font-size: 58px;
          white-space: nowrap;
        }
        @media (max-width: 1023px) {
          .hero-grid {
            grid-template-columns: 1fr;
            gap: 60px;
            text-align: center;
            justify-content: center;
          }
          .hero-h1 {
            font-size: clamp(36px, 6vw, 48px);
            white-space: normal;
          }
          .hero-grid > div:first-child {
            align-items: center;
            text-align: center;
          }
          
          .hero-ai-dock-wrapper {
            justify-content: center;
            min-height: 220px;
            padding-top: 0;
          }
        }
      `}</style>

      {/* Ambient gradient orbs (Subtle blue) */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute',
          width: 700, height: 700,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0, 82, 255, 0.04) 0%, transparent 70%)',
          top: '-15%', right: '-12%',
        }} />
        <div style={{
          position: 'absolute',
          width: 500, height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0, 82, 255, 0.03) 0%, transparent 70%)',
          bottom: '5%', left: '-8%',
        }} />
      </div>

      <div className="container" style={{ 
        position: 'relative', 
        zIndex: 1, 
        paddingTop: 0, 
        paddingBottom: 'var(--space-10)',
        maxWidth: 1540,
        paddingInline: 'clamp(24px, 5vw, 72px)',
        minHeight: 'calc(100vh - 160px)',
        display: 'flex',
        alignItems: 'center',
      }}>
          <div className="hero-grid">
            {/* Left Panel - Existing Content exactly as is */}
            <div
              style={{
                maxWidth: 920,
                width: '100%',
                textAlign: 'left',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >

              {/* Headline (Coinbase Display 400, editorial calm) */}
              <h1
                className="hero-h1"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 400,
                  lineHeight: 1.05,
                  letterSpacing: '-0.035em',
                  color: 'var(--text-primary)',
                  marginBottom: '32px',
                  maxWidth: 'none',
                  opacity: loaded ? 1 : 0,
                  transform: loaded ? 'translateY(0)' : 'translateY(28px)',
                  transition: 'all 0.9s var(--ease-out-expo) 0.2s',
                }}
              >
                Designing thoughtful <span style={{ color: 'var(--accent)' }}>digital</span><br />
                <span style={{ color: 'var(--accent)' }}>experiences</span> that feel human.
              </h1>

              {/* Sub */}
              <p
                style={{
                  fontSize: 17,
                  lineHeight: 1.72,
                  color: 'var(--text-secondary)',
                  maxWidth: '56ch',
                  marginInline: '0',
                  marginBottom: 'var(--space-8)',
                  opacity: loaded ? 1 : 0,
                  transform: loaded ? 'translateY(0)' : 'translateY(16px)',
                  transition: 'all 0.8s var(--ease-out-expo) 0.35s',
                }}
              >
                Product Designer with 3+ years shaping AI-powered and SaaS products.
                I turn complexity into clarity — improving task efficiency by{' '}
                <strong style={{ color: 'var(--text-primary)', fontWeight: 500 }}>24%</strong>{' '}
                and engagement by{' '}
                <strong style={{ color: 'var(--text-primary)', fontWeight: 500 }}>30%</strong>.
              </p>

              {/* CTAs */}
              <div
                style={{
                  display: 'flex', gap: 'var(--space-4)',
                  justifyContent: 'flex-start',
                  flexWrap: 'wrap',
                  marginBottom: 'var(--space-4)',
                  opacity: loaded ? 1 : 0,
                  transform: loaded ? 'translateY(0)' : 'translateY(16px)',
                  transition: 'all 0.8s var(--ease-out-expo) 0.5s',
                }}
              >
                <a
                  href="#projects"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)',
                    padding: '12px 24px',
                    background: 'var(--accent)',
                    color: 'white',
                    borderRadius: 'var(--radius-pill)',
                    fontSize: 15, fontWeight: 600,
                    letterSpacing: '-0.015em',
                    transition: 'all 0.2s var(--ease-out-expo)',
                    boxShadow: 'var(--shadow-sm)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'var(--accent-light)'
                    e.currentTarget.style.transform = 'translateY(-1px)'
                    e.currentTarget.style.boxShadow = 'var(--shadow-md)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'var(--accent)'
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = 'var(--shadow-sm)'
                  }}
                >
                  View Projects →
                </a>

                <a
                  href="#contact"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)',
                    padding: '12px 24px',
                    background: 'var(--bg-warm)',
                    color: 'var(--text-primary)',
                    borderRadius: 'var(--radius-pill)',
                    border: '1px solid var(--border)',
                    fontSize: 15, fontWeight: 600,
                    letterSpacing: '-0.015em',
                    transition: 'all 0.2s var(--ease-out-expo)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'var(--border)'
                    e.currentTarget.style.transform = 'translateY(-1px)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'var(--bg-warm)'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                >
                  Let's Talk
                </a>
              </div>
            </div>

            {/* Right Panel - AI Copilot Dock Placeholder */}
            <div 
              id="hero-ai-dock"
              className="hero-ai-dock-wrapper"
              style={{
                opacity: loaded ? 1 : 0,
                transform: loaded ? 'translateY(0)' : 'translateY(28px)',
                transition: 'all 0.9s var(--ease-out-expo) 0.6s',
              }}
            >
              {/* The DynamicNotch will sync its position here on load */}
            </div>
          </div>
      </div>
    </section>
  )
}
