import React from 'react'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo)
    this.setState({ errorInfo })
  }

  handleReset = () => {
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: '#0a0b0d',
          color: '#ffffff',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '24px',
          zIndex: 999999,
          fontFamily: 'var(--font-body, sans-serif)',
          overflowY: 'auto'
        }}>
          <div style={{
            width: '100%',
            maxWidth: '680px',
            background: 'rgba(23, 25, 30, 0.65)',
            border: '1px solid rgba(255, 77, 166, 0.25)',
            backdropFilter: 'blur(24px)',
            borderRadius: '16px',
            padding: '40px',
            boxShadow: '0 24px 64px rgba(0,0,0,0.8)',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{
                display: 'inline-block',
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: '#ff0055',
                boxShadow: '0 0 12px #ff0055',
                animation: 'pulseCore 1.5s infinite alternate'
              }} />
              <span style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '11px',
                fontWeight: 600,
                color: '#ff0055',
                letterSpacing: '0.15em',
                textTransform: 'uppercase'
              }}>
                SYSTEM FAULT DETECTED // HMI ERROR
              </span>
            </div>

            <h1 style={{
              fontSize: '28px',
              fontWeight: 700,
              color: '#ffffff',
              margin: 0,
              fontFamily: 'var(--font-display, sans-serif)'
            }}>
              Something went wrong initializing the scene.
            </h1>

            <p style={{
              fontSize: '14px',
              color: 'rgba(255,255,255,0.6)',
              margin: 0,
              lineHeight: 1.5
            }}>
              The creative universe failed to load due to a runtime exception. Please see the system log telemetry below:
            </p>

            <div style={{
              background: 'rgba(10, 11, 13, 0.85)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '8px',
              padding: '20px',
              maxHeight: '260px',
              overflowY: 'auto',
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '12px',
              color: '#ff74c4',
              whiteSpace: 'pre-wrap',
              textAlign: 'left'
            }}>
              <strong>Error:</strong> {this.state.error?.toString()}
              {this.state.errorInfo?.componentStack && (
                <>
                  {"\n\n"}
                  <strong>Stack trace:</strong>
                  {this.state.errorInfo.componentStack}
                </>
              )}
            </div>

            <div style={{ display: 'flex', gap: '16px', marginTop: '8px' }}>
              <button
                onClick={this.handleReset}
                style={{
                  background: 'var(--accent, #0052ff)',
                  border: 'none',
                  borderRadius: '100px',
                  padding: '12px 28px',
                  color: '#ffffff',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  boxShadow: '0 8px 24px rgba(0, 82, 255, 0.35)',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-1px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                Re-initialize Universe
              </button>
              
              <a
                href="/"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '100px',
                  padding: '12px 28px',
                  color: 'rgba(255,255,255,0.8)',
                  fontSize: '13px',
                  fontWeight: 600,
                  textDecoration: 'none',
                  textAlign: 'center',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'}
              >
                Return to Port Deck
              </a>
            </div>
          </div>

          <style>{`
            @keyframes pulseCore {
              0% { opacity: 0.6; transform: scale(0.95); }
              100% { opacity: 1; transform: scale(1.05); }
            }
          `}</style>
        </div>
      )
    }

    return this.props.children
  }
}
