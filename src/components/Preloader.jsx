import { useState, useEffect, useRef } from 'react'

const WORDS = [
  { word: "Breath", progress: 20, chime: 523.25 },     // C5
  { word: "Live", progress: 40, chime: 587.33 },       // D5
  { word: "Love", progress: 60, chime: 659.25 },       // E5
  { word: "Design", progress: 80, chime: 783.99 },     // G5
  { word: "Drink Water", progress: 100, chime: 880.00 } // A5
]

// Pure synthesized client-side sound engine to avoid asset dependencies
class CalmSoundscape {
  constructor() {
    this.ctx = null
    this.hum = null
    this.humGain = null
    this.breath = null
    this.breathFilter = null
    this.breathGain = null
    this.masterGain = null
    this.breathTimer = null
  }

  init() {
    const AudioContext = window.AudioContext || window.webkitAudioContext
    if (!AudioContext) return
    this.ctx = new AudioContext()

    // Master volume (delightfully soft and non-intrusive)
    this.masterGain = this.ctx.createGain()
    this.masterGain.connect(this.ctx.destination)
    this.masterGain.gain.setValueAtTime(0.06, this.ctx.currentTime)

    // 1. Core resonant hum (110Hz sine wave + low pass filter for physical warmth)
    this.hum = this.ctx.createOscillator()
    this.hum.type = 'sine'
    this.hum.frequency.setValueAtTime(110, this.ctx.currentTime)

    const humFilter = this.ctx.createBiquadFilter()
    humFilter.type = 'lowpass'
    humFilter.frequency.setValueAtTime(130, this.ctx.currentTime)

    this.humGain = this.ctx.createGain()
    this.humGain.gain.setValueAtTime(0.35, this.ctx.currentTime)

    this.hum.connect(humFilter)
    humFilter.connect(this.humGain)
    this.humGain.connect(this.masterGain)

    // LFO to slowly sweep the hum volume (creates a floating breathing rhythm)
    const lfo = this.ctx.createOscillator()
    lfo.frequency.setValueAtTime(0.18, this.ctx.currentTime) // 5.5s breathing loop
    const lfoGain = this.ctx.createGain()
    lfoGain.gain.setValueAtTime(0.12, this.ctx.currentTime)

    lfo.connect(lfoGain)
    lfoGain.connect(this.humGain.gain)

    lfo.start()
    this.hum.start()

    // 2. Synthesized Breath Atmosphere (Filtered white noise simulating calm breathing)
    const bufferSize = this.ctx.sampleRate * 4
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate)
    const output = noiseBuffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1
    }

    this.breath = this.ctx.createBufferSource()
    this.breath.buffer = noiseBuffer
    this.breath.loop = true

    this.breathFilter = this.ctx.createBiquadFilter()
    this.breathFilter.type = 'bandpass'
    this.breathFilter.frequency.setValueAtTime(320, this.ctx.currentTime)
    this.breathFilter.Q.setValueAtTime(1.8, this.ctx.currentTime)

    this.breathGain = this.ctx.createGain()
    this.breathGain.gain.setValueAtTime(0.015, this.ctx.currentTime)

    this.breath.connect(this.breathFilter)
    this.breathFilter.connect(this.breathGain)
    this.breathGain.connect(this.masterGain)

    this.breath.start()

    // Infinite breathing resonance filter sweeper
    this.animateRespiration()
  }

  animateRespiration() {
    if (!this.ctx) return
    const now = this.ctx.currentTime
    
    // Inhale sweep up
    this.breathFilter.frequency.setValueAtTime(280, now)
    this.breathFilter.frequency.exponentialRampToValueAtTime(680, now + 2.7)
    this.breathGain.gain.setValueAtTime(0.012, now)
    this.breathGain.gain.linearRampToValueAtTime(0.038, now + 2.7)

    // Exhale sweep down
    this.breathFilter.frequency.setValueAtTime(680, now + 2.7)
    this.breathFilter.frequency.exponentialRampToValueAtTime(280, now + 5.4)
    this.breathGain.gain.setValueAtTime(0.038, now + 2.7)
    this.breathGain.gain.linearRampToValueAtTime(0.012, now + 5.4)

    this.breathTimer = setTimeout(() => this.animateRespiration(), 5400)
  }

  playChime(freq) {
    if (!this.ctx) return
    const now = this.ctx.currentTime
    
    // Warm chime generator
    const osc1 = this.ctx.createOscillator()
    const osc2 = this.ctx.createOscillator()
    const gainNode = this.ctx.createGain()

    osc1.type = 'sine'
    osc1.frequency.setValueAtTime(freq, now)

    osc2.type = 'triangle'
    osc2.frequency.setValueAtTime(freq * 1.002, now) // Minor detune for rich space

    const filter = this.ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(900, now)

    gainNode.gain.setValueAtTime(0, now)
    gainNode.gain.linearRampToValueAtTime(0.12, now + 0.05)
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 2.0)

    osc1.connect(filter)
    osc2.connect(filter)
    filter.connect(gainNode)
    gainNode.connect(this.masterGain)

    osc1.start(now)
    osc2.start(now)
    
    osc1.stop(now + 2.2)
    osc2.stop(now + 2.2)
  }

  stop() {
    clearTimeout(this.breathTimer)
    try {
      this.hum?.stop()
      this.breath?.stop()
      this.ctx?.close()
    } catch(e) {}
  }
}

export default function Preloader({ onComplete }) {
  const [wordIndex, setWordIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [fadeState, setFadeState] = useState('in') // in, out
  const [theme, setTheme] = useState('light')
  const [audioEnabled, setAudioEnabled] = useState(false)
  const [preloaderActive, setPreloaderActive] = useState(true)

  const soundscapeRef = useRef(null)

  // 1. Sync theme local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('theme') || 'light'
    setTheme(saved)
  }, [])

  // 2. Sequential Word Animator
  useEffect(() => {
    if (!preloaderActive) return

    // Play transition chime when index changes
    if (audioEnabled && soundscapeRef.current) {
      soundscapeRef.current.playChime(WORDS[wordIndex].chime)
    }

    // Phase 1: Keep in state, and animate progress node smoothly
    setProgress(WORDS[wordIndex].progress)

    // Phase 2: Fade word out at the end of word interval
    const fadeOutTimer = setTimeout(() => {
      setFadeState('out')
    }, 1300) // 1.3 seconds of stillness/breathing

    // Phase 3: Move to next word (seamless transition)
    const nextWordTimer = setTimeout(() => {
      if (wordIndex < WORDS.length - 1) {
        setWordIndex(prev => prev + 1)
        setFadeState('in')
      } else {
        // Safe wrap up
        handleSkip()
      }
    }, 1650) // 1.65 seconds per word cycle

    return () => {
      clearTimeout(fadeOutTimer)
      clearTimeout(nextWordTimer)
    }
  }, [wordIndex, audioEnabled, preloaderActive])

  // 3. Ambient audio toggler
  const toggleAudio = () => {
    if (!audioEnabled) {
      const sound = new CalmSoundscape()
      sound.init()
      soundscapeRef.current = sound
      setAudioEnabled(true)
      // Play initial chord chimes
      sound.playChime(WORDS[wordIndex].chime)
    } else {
      soundscapeRef.current?.stop()
      soundscapeRef.current = null
      setAudioEnabled(false)
    }
  }

  // 4. Cleanup soundscapes on unmount
  useEffect(() => {
    return () => {
      soundscapeRef.current?.stop()
    }
  }, [])

  // 5. Complete Loader Animation
  const handleSkip = () => {
    setFadeState('out')
    setProgress(100)
    setTimeout(() => {
      setPreloaderActive(false)
      setTimeout(() => {
        if (onComplete) onComplete()
      }, 700) // Transition out delay
    }, 400)
  }

  // Floating Micro-particles
  const floatingParticles = useRef(
    Array.from({ length: 14 }).map((_, i) => ({
      left: `${5 + Math.random() * 85}%`,
      top: `${5 + Math.random() * 85}%`,
      size: Math.random() * 2.5 + 1.2,
      delay: `${Math.random() * 6}s`,
      duration: `${Math.random() * 15 + 15}s`
    }))
  ).current

  if (!preloaderActive) {
    return (
      <div 
        style={{
          position: 'fixed',
          inset: 0,
          background: theme === 'dark' ? '#0a0b0d' : '#f4f4f5',
          zIndex: 99999999,
          animation: 'slideUpOut 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        }}
      >
        <style>{`
          @keyframes slideUpOut {
            from { transform: translateY(0); opacity: 1; }
            to { transform: translateY(-100%); opacity: 0; }
          }
        `}</style>
      </div>
    )
  }

  // Dark/Light dynamic tokens
  const bgColor = theme === 'dark' ? '#0a0b0d' : '#f4f4f5'
  const textColor = theme === 'dark' ? '#ffffff' : '#0a0b0d'
  const railColor = theme === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'
  const overlayGlow = theme === 'dark' 
    ? 'radial-gradient(circle at 10% 20%, rgba(0, 82, 255, 0.08) 0%, transparent 60%)' 
    : 'radial-gradient(circle at 10% 20%, rgba(0, 82, 255, 0.04) 0%, transparent 60%)'

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: bgColor,
        color: textColor,
        zIndex: 99999999,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 'clamp(24px, 6vw, 64px)',
        overflow: 'hidden',
        fontFamily: 'var(--font-display)',
        transition: 'background-color 0.8s ease'
      }}
    >
      {/* Dynamic Keyframes injected safely */}
      <style>{`
        @keyframes wordIn {
          0% { opacity: 0; transform: translateY(18px); filter: blur(8px); }
          100% { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        @keyframes wordOut {
          0% { opacity: 1; transform: translateY(0); filter: blur(0); }
          100% { opacity: 0; transform: translateY(-15px); filter: blur(6px); }
        }
        @keyframes floatSlow {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(1deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        @keyframes breathingText {
          0% { opacity: 0.85; transform: scale(0.99); }
          100% { opacity: 1; transform: scale(1.01); }
        }
        @keyframes particleMove {
          0% { transform: translateY(0) translateX(0); opacity: 0.12; }
          50% { transform: translateY(-30px) translateX(15px); opacity: 0.35; }
          100% { transform: translateY(0) translateX(0); opacity: 0.12; }
        }
        @keyframes pulseGlow {
          0% { box-shadow: 0 0 8px rgba(0, 82, 255, 0.4); transform: scale(0.92); }
          100% { box-shadow: 0 0 20px rgba(0, 82, 255, 0.8); transform: scale(1.08); }
        }
      `}</style>

      {/* Futuristic grain overlay & background ambient glow */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.038\'/%3E%3C/svg%3E")',
        pointerEvents: 'none', zIndex: 1
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: overlayGlow,
        pointerEvents: 'none', zIndex: 2
      }} />

      {/* Floating Micro-particles */}
      {floatingParticles.map((pt, idx) => (
        <div
          key={idx}
          style={{
            position: 'absolute',
            left: pt.left,
            top: pt.top,
            width: pt.size,
            height: pt.size,
            borderRadius: '50%',
            background: 'var(--accent)',
            opacity: 0.15,
            zIndex: 3,
            animation: `particleMove ${pt.duration} ease-in-out infinite`,
            animationDelay: pt.delay
          }}
        />
      ))}

      {/* Top Header: Monospace Brand Name, Calm Sound Switch & Skip Option */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{
            fontSize: 10,
            fontFamily: 'var(--font-mono)',
            fontWeight: 600,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            opacity: 0.6
          }}>
            Soupriti Das
          </span>
          <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--accent)' }} />
          <span style={{
            fontSize: 9,
            fontFamily: 'var(--font-mono)',
            fontWeight: 500,
            letterSpacing: '0.08em',
            opacity: 0.4,
            textTransform: 'uppercase'
          }}>
            HMI OS v1.0.8
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          {/* Calm Soundscape Toggle Button (Compliance safe Web Audio trigger) */}
          <button
            onClick={toggleAudio}
            style={{
              background: 'none',
              border: 'none',
              color: textColor,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              fontSize: 10,
              fontFamily: 'var(--font-mono)',
              fontWeight: 600,
              letterSpacing: '0.06em',
              opacity: audioEnabled ? 0.95 : 0.45,
              transition: 'opacity 0.2s',
              outline: 'none',
              padding: 0
            }}
          >
            {audioEnabled ? (
              <>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                </svg>
                SOUNDSCAPE ACTIVE
              </>
            ) : (
              <>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                  <line x1="23" y1="9" x2="17" y2="15"></line>
                  <line x1="17" y1="9" x2="23" y2="15"></line>
                </svg>
                ACTIVATE SOUNDSCAPE
              </>
            )}
          </button>

          {/* Calming Skip Intro */}
          <button
            onClick={handleSkip}
            style={{
              background: 'none',
              border: 'none',
              color: textColor,
              cursor: 'pointer',
              fontSize: 10,
              fontFamily: 'var(--font-mono)',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              opacity: 0.4,
              transition: 'opacity 0.2s',
              padding: 0,
              outline: 'none'
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.95'}
            onMouseLeave={e => e.currentTarget.style.opacity = '0.4'}
          >
            Skip Intro
          </button>
        </div>
      </header>

      {/* Middle Section: Massive Breathable Typography with Anti-Gravity drift */}
      <main 
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          flexGrow: 1,
          zIndex: 10,
          paddingLeft: 'clamp(0px, 4vw, 48px)'
        }}
      >
        <div style={{ overflow: 'hidden', height: 'clamp(70px, 15vw, 150px)', display: 'flex', alignItems: 'center' }}>
          <h1
            style={{
              fontSize: 'clamp(54px, 11vw, 110px)',
              fontWeight: 800,
              lineHeight: 1.0,
              letterSpacing: '-0.04em',
              margin: 0,
              color: textColor,
              animation: `${fadeState === 'in' ? 'wordIn' : 'wordOut'} 0.65s cubic-bezier(0.16, 1, 0.3, 1) forwards, floatSlow 6s ease-in-out infinite alternate`,
              display: 'inline-block',
              transformOrigin: 'left center'
            }}
          >
            {WORDS[wordIndex].word}
          </h1>
        </div>
        
        {/* Subtle breathing subtext layer */}
        <p
          style={{
            fontSize: 12,
            fontFamily: 'var(--font-mono)',
            color: 'var(--accent)',
            marginTop: 18,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            opacity: 0.55,
            animation: 'breathingText 2.5s ease-in-out infinite alternate',
            display: 'flex',
            alignItems: 'center',
            gap: 8
          }}
        >
          <span>Mindful boot process</span>
          <span style={{ display: 'inline-block', width: 20, height: 1, background: 'var(--accent)', opacity: 0.4 }} />
          <span>{WORDS[wordIndex].progress}% ready</span>
        </p>
      </main>

      {/* Right Edge: Vertical Loader system with anchored glowing node */}
      <aside
        style={{
          position: 'absolute',
          right: 'clamp(20px, 5vw, 64px)',
          top: '15vh',
          height: '70vh',
          width: 48,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 10
        }}
      >
        {/* Loader Rail line */}
        <div
          style={{
            position: 'relative',
            height: '100%',
            width: 1.2,
            background: railColor,
            borderRadius: 1
          }}
        >
          {/* Tick Indicator Dots */}
          {WORDS.map((itm, i) => {
            const isActive = progress >= itm.progress
            return (
              <div
                key={itm.progress}
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: `${itm.progress}%`,
                  transform: 'translate(-50%, -50%)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12
                }}
              >
                <div
                  style={{
                    width: isActive ? 6 : 4,
                    height: isActive ? 6 : 4,
                    borderRadius: '50%',
                    background: isActive ? 'var(--accent)' : textColor,
                    opacity: isActive ? 0.95 : 0.15,
                    transition: 'all 0.4s ease',
                    boxShadow: isActive ? '0 0 6px var(--accent)' : 'none'
                  }}
                />
                
                {/* Micro percentage monospace labels visible only on larger viewports */}
                <span
                  style={{
                    fontSize: 8,
                    fontFamily: 'var(--font-mono)',
                    color: isActive ? 'var(--accent)' : textColor,
                    opacity: isActive ? 0.75 : 0.1,
                    fontWeight: 700,
                    transition: 'all 0.4s ease',
                    position: 'absolute',
                    right: 12,
                    whiteSpace: 'nowrap'
                  }}
                >
                  {itm.progress}%
                </span>
              </div>
            )
          })}

          {/* Floating Glowing Anti-gravity Orb */}
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: `${progress}%`,
              transform: 'translate(-50%, -50%)',
              width: 10,
              height: 10,
              borderRadius: '50%',
              background: 'var(--accent)',
              boxShadow: '0 0 14px var(--accent)',
              transition: 'top 1.2s cubic-bezier(0.16, 1, 0.3, 1)', // Calm friction-free float
              animation: 'pulseGlow 1.5s ease-in-out infinite alternate',
              zIndex: 5
            }}
          />
        </div>
      </aside>

      {/* Bottom bar: Editorial spacing footer */}
      <footer
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          zIndex: 10
        }}
      >
        <span style={{ fontSize: 9, fontFamily: 'var(--font-mono)', opacity: 0.35, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
          Interactivity Design lab ©2026
        </span>
        <span style={{ fontSize: 9, fontFamily: 'var(--font-mono)', opacity: 0.35, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
          Simplicity is the sophistication
        </span>
      </footer>
    </div>
  )
}
