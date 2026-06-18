import { useEffect, useState } from 'react'
import { FadeUp, Label } from './utils'

export default function IntroVideo() {
  const [isHovered, setIsHovered] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <section 
      id="intro-video" 
      style={{
        position: 'relative',
        background: 'var(--bg)',
        paddingTop: '60px',
        paddingBottom: '80px',
        overflow: 'hidden',
      }}
    >
      {/* Background glow behind video */}
      <div 
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '70%',
          height: '60%',
          background: 'radial-gradient(circle, rgba(0, 82, 255, 0.04) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        <FadeUp>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '40px' }}>
            <Label>Intro Video</Label>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(28px, 3.5vw, 42px)',
              fontWeight: 400,
              letterSpacing: '-0.020em',
              lineHeight: 1.2,
              color: 'var(--text-primary)',
              marginTop: '16px',
            }}>
              A brief walkthrough of <br />
              <span style={{ color: 'var(--accent)', fontWeight: 600 }}>my design journey.</span>
            </h2>
          </div>
        </FadeUp>

        <FadeUp>
          <div 
            style={{
              maxWidth: '920px',
              margin: '0 auto',
              padding: '1.5px', // Border wrapper glow
              borderRadius: '24px',
              background: isHovered 
                ? 'linear-gradient(135deg, var(--accent) 0%, rgba(255, 77, 166, 0.5) 100%)' 
                : 'linear-gradient(135deg, var(--border) 0%, var(--border) 100%)',
              boxShadow: isHovered 
                ? '0 20px 48px rgba(0, 82, 255, 0.12)' 
                : '0 4px 20px rgba(0, 0, 0, 0.03)',
              transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
              transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div 
              style={{
                background: 'var(--bg-card)',
                borderRadius: '22.5px',
                overflow: 'hidden',
                position: 'relative',
                width: '100%',
                aspectRatio: '16 / 9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
              }}
            >
              <iframe
                src="https://www.canva.com/design/DAHLIUT-L4A/56KlT6WH8igJyp6Kp7KEsg/watch?embed"
                allowFullScreen
                allow="autoplay"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: 'none',
                  borderRadius: '22.5px',
                }}
              />
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
