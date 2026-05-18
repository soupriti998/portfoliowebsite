import { useState, useEffect } from 'react'

const QUOTES = [
  { text: "Design is not just what it looks like and feels like. Design is how it works.", author: "Steve Jobs" },
  { text: "Simplicity is the ultimate sophistication.", author: "Leonardo da Vinci" },
  { text: "Make things as simple as possible, but not simpler.", author: "Albert Einstein" },
  { text: "Good design is as little design as possible.", author: "Dieter Rams" },
  { text: "Design is intelligence made visible.", author: "Alina Wheeler" }
]

export default function Preloader({ onComplete }) {
  const [count, setCount] = useState(0)
  const [quoteIndex, setQuoteIndex] = useState(0)
  const [visible, setVisible] = useState(true)
  const [quoteFade, setQuoteFade] = useState(false)

  // Trigger initial quote roll-in on mount
  useEffect(() => {
    const t = setTimeout(() => {
      setQuoteFade(true)
    }, 150)
    return () => clearTimeout(t)
  }, [])

  // 1. Smooth Counting Animation from 0 to 100
  useEffect(() => {
    let start = 0
    const duration = 2400 // Total load duration: 2.4s
    const startTime = performance.now()

    const updateCount = (currentTime) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      // Easing curve for a premium, non-linear count build-up (slows down at the end)
      const easeProgress = 1 - Math.pow(1 - progress, 3)
      const currentVal = Math.floor(easeProgress * 100)
      
      setCount(currentVal)

      if (progress < 1) {
        requestAnimationFrame(updateCount)
      } else {
        // Complete the preloader
        setTimeout(() => {
          setVisible(false)
          setTimeout(() => {
            if (onComplete) onComplete()
          }, 800) // Match the slideUp animation duration
        }, 300)
      }
    }

    requestAnimationFrame(updateCount)
  }, [onComplete])

  // 2. Rotate Quotes with a clean fade-out fade-in transition
  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteFade(false)
      setTimeout(() => {
        setQuoteIndex((prev) => (prev + 1) % QUOTES.length)
        setQuoteFade(true)
      }, 300)
    }, 9000)

    return () => clearInterval(interval)
  }, [])

  if (!visible) {
    return (
      <div 
        style={{
          position: 'fixed',
          inset: 0,
          background: '#0D0F12',
          zIndex: 9999999,
          animation: 'slideUpOut 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        }}
      >
        <style>{`
          @keyframes slideUpOut {
            from { transform: translateY(0); }
            to { transform: translateY(-100%); }
          }
        `}</style>
      </div>
    )
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: '#0D0F12',
        color: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 'var(--space-10)',
        zIndex: 9999999,
      }}
    >
      {/* Top Section: Static Logo branding */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.15em', opacity: 0.5, textTransform: 'uppercase' }}>
          SOUPRITI DAS — PORTFOLIO
        </span>
        <span style={{
          width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)',
          animation: 'pulseDotLoader 1.5s ease-in-out infinite'
        }} />
      </div>

      {/* Middle Section: Rotating Designer Quotes with premium word-by-word rolling animation */}
      <div style={{ maxWidth: 720, alignSelf: 'center', textAlign: 'center', padding: '0 var(--space-5)' }}>
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(20px, 4.2vw, 30px)',
          fontWeight: 500,
          lineHeight: 1.45,
          color: '#F3F4F6',
          letterSpacing: '-0.025em',
          margin: 0,
        }}>
          <span style={{ display: 'inline-block', marginRight: '0.1em', color: 'var(--accent)' }}>“</span>
          {QUOTES[quoteIndex].text.split(' ').map((word, wordIndex) => (
            <span 
              key={wordIndex}
              style={{
                display: 'inline-block',
                overflow: 'hidden',
                verticalAlign: 'bottom',
                marginRight: '0.24em',
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  transform: quoteFade ? 'translateY(0)' : 'translateY(110%)',
                  opacity: quoteFade ? 1 : 0,
                  transition: 'transform 0.75s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.65s ease-out',
                  transitionDelay: `${wordIndex * 35}ms`,
                }}
              >
                {word}
              </span>
            </span>
          ))}
          <span style={{ display: 'inline-block', marginLeft: '0.05em', color: 'var(--accent)' }}>”</span>
        </h3>
        
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          color: 'var(--accent)',
          marginTop: 24,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          opacity: quoteFade ? 0.75 : 0,
          transform: quoteFade ? 'translateY(0)' : 'translateY(6px)',
          transition: 'all 0.55s cubic-bezier(0.16, 1, 0.3, 1)',
          transitionDelay: `${QUOTES[quoteIndex].text.split(' ').length * 35 + 80}ms`,
        }}>
          — {QUOTES[quoteIndex].author}
        </p>
      </div>

      {/* Bottom Section: Progress bar and high-fidelity text counter */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Progress bar line */}
        <div style={{ width: '100%', height: 2, background: 'rgba(255, 255, 255, 0.08)', position: 'relative' }}>
          <div style={{
            position: 'absolute', top: 0, left: 0, bottom: 0,
            width: `${count}%`, background: 'var(--accent)',
            boxShadow: '0 0 12px var(--accent)',
            transition: 'width 0.1s cubic-bezier(0.1, 0.8, 0.1, 1)',
          }} />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, opacity: 0.4, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            {count === 100 ? 'SYSTEM READY' : 'INTERACTIVE SYSTEMS BOOTING...'}
          </span>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(54px, 12vw, 108px)',
            fontWeight: 700,
            lineHeight: 0.9,
            letterSpacing: '-0.04em',
            color: 'white',
          }}>
            {count.toString().padStart(3, '0')}%
          </span>
        </div>
      </div>

      <style>{`
        @keyframes pulseDotLoader {
          0%, 100% { opacity: 0.3; transform: scale(0.9); }
          50% { opacity: 1; transform: scale(1.25); }
        }
      `}</style>
    </div>
  )
}
