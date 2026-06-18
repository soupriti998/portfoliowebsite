import { playFluteHover, playFluteClick } from './utils'

export default function Footer() {
  return (
    <footer 
      style={{
        padding: '16px 30px', // Thinner height with exactly 30px left & right padding
        background: '#0052ff', // Electric Blue background
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        color: '#ffffff', // Crisp white text
        position: 'relative',
        zIndex: 16,
      }}
    >
      <div className="container" style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexWrap: 'nowrap', gap: 'var(--space-4)',
      }} className="footer-flex-container">
        
        {/* Left initials logo block */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
          <div style={{
            width: 26, height: 26, borderRadius: '50%',
            background: '#ffffff', // White circle background
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#0052ff', // Blue letter S
            fontWeight: 800, fontSize: 12, fontFamily: 'var(--font-display)',
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.08)',
          }}>S</div>
          <span style={{ color: '#ffffff', fontSize: 13.5, fontWeight: 600, letterSpacing: '-0.01em' }}>soupriti</span>
          <span style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: 12 }}>· Product Designer</span>
          <button
            onClick={() => {
              playFluteClick()
              window.openSpecSheet && window.openSpecSheet()
            }}
            style={{
              background: 'rgba(255, 77, 166, 0.25)',
              border: '1.2px solid #FF4DA6',
              borderRadius: 20,
              padding: '3px 10px',
              fontSize: 10,
              fontWeight: 800,
              fontFamily: 'var(--font-mono)',
              color: '#ffffff',
              cursor: 'pointer',
              marginLeft: 8,
              boxShadow: '0 0 10px rgba(255, 77, 166, 0.4)',
              transition: 'all 0.2s',
              textTransform: 'uppercase',
              letterSpacing: '0.04em'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#FF4DA6'
              e.currentTarget.style.boxShadow = '0 0 18px #FF4DA6'
              e.currentTarget.style.transform = 'translateY(-1px)'
              playFluteHover()
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(255, 77, 166, 0.25)'
              e.currentTarget.style.boxShadow = '0 0 10px rgba(255, 77, 166, 0.4)'
              e.currentTarget.style.transform = 'none'
            }}
          >
            Design Spec ✦
          </button>
          <a
            href="https://productgrowthsoupriti.framer.website/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={playFluteClick}
            style={{
              background: 'rgba(255, 255, 255, 0.15)',
              border: '1.2px solid rgba(255, 255, 255, 0.4)',
              borderRadius: 20,
              padding: '3px 10px',
              fontSize: 10,
              fontWeight: 800,
              fontFamily: 'var(--font-mono)',
              color: '#ffffff',
              cursor: 'pointer',
              marginLeft: 8,
              transition: 'all 0.2s',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              display: 'inline-flex',
              alignItems: 'center',
              textDecoration: 'none'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#ffffff'
              e.currentTarget.style.color = '#0052ff'
              e.currentTarget.style.transform = 'translateY(-1px)'
              playFluteHover()
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)'
              e.currentTarget.style.color = '#ffffff'
              e.currentTarget.style.transform = 'none'
            }}
          >
            Previous Portfolio ↗
          </a>
        </div>

        {/* Center: Single line tagline with emoji, expanding end-to-end */}
        <div 
          style={{ 
            fontSize: 13, 
            color: 'rgba(255, 255, 255, 0.9)', 
            fontFamily: 'var(--font-body)', 
            fontWeight: 500,
            textAlign: 'center',
            whiteSpace: 'nowrap', // No wrapping into 2 lines
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            padding: '0 16px',
            flex: 1,
          }}
          className="footer-tagline-block"
        >
          Made with AI, driven by curiosity, and polished with absolute attention to detail ✨
        </div>

        {/* Right copyright metadata */}
        <p style={{ fontSize: 12, color: 'rgba(255, 255, 255, 0.75)', fontFamily: 'var(--font-mono)', margin: 0, fontWeight: 500, flexShrink: 0 }}>
          © 2025 · Bangalore, India
        </p>

      </div>

      <style>{`
        .footer-flex-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
        }

        @media (max-width: 900px) {
          .footer-flex-container {
            flex-wrap: wrap !important;
            justify-content: center !important;
            gap: 12px !important;
          }
          .footer-tagline-block {
            white-space: normal !important;
            text-align: center !important;
            width: 100% !important;
            flex: none !important;
            padding: 0 !important;
          }
        }
      `}</style>
    </footer>
  )
}
