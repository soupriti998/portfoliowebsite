import { useState, useEffect, useRef } from 'react'

const rawWords = [
  "Drink Water", "Create Daily", "Think Clearly", "Stay Curious", "Design Slowly",
  "Feel Human", "Build Calmly", "Dream Bigger", "Seek Clarity", "Ship Better",
  "Move Gently", "Stay Present", "Observe More", "Design Mindfully", "Simplify Things",
  "Think Systems", "Explore Freely", "Rest Properly", "Breathe Deeply", "Make Magic",
  "Build Thoughtfully", "Stay Weird", "Think Deeply", "Learn Always", "Create Fearlessly",
  "Sleep Better", "Protect Energy", "Notice Details", "Stay Soft", "Trust Process"
]

const beethovenOdeToJoy = [
  659.25, 659.25, 698.46, 783.99, // E E F G
  783.99, 698.46, 659.25, 587.33, // G F E D
  523.25, 523.25, 587.33, 659.25, // C C D E
  659.25, 587.33, 587.33,         // E D D (end of phrase 1)
  
  659.25, 659.25, 698.46, 783.99, // E E F G
  783.99, 698.46, 659.25, 587.33, // G F E D
  523.25, 523.25, 587.33, 659.25, // C C D E
  587.33, 523.25, 523.25          // D C C (end of phrase 2)
]

const WORDS = rawWords.map((word, i) => ({
  word,
  progress: ((i + 1) / rawWords.length) * 100,
  chime: beethovenOdeToJoy[i % beethovenOdeToJoy.length]
}))

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

/* ── Emil Kowalski Style Vertical Rolling Digit Component ── */
function DigitColumn({ digit }) {
  return (
    <span style={{
      height: 24,
      overflow: 'hidden',
      position: 'relative',
      width: 10,
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <span style={{
        transform: `translateY(-${digit * 10}%)`,
        transition: 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'absolute',
        top: 0
      }}>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => (
          <span key={n} style={{ height: 24, display: 'flex', alignItems: 'center', fontSize: 13, fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
            {n}
          </span>
        ))}
      </span>
    </span>
  )
}

function RollingNumber({ value }) {
  const hundreds = Math.floor(value / 100)
  const tens = Math.floor((value % 100) / 10)
  const ones = value % 10

  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', height: 24 }}>
      {hundreds > 0 && <DigitColumn digit={hundreds} />}
      {(value >= 10 || hundreds > 0) && <DigitColumn digit={tens} />}
      <DigitColumn digit={ones} />
      <span style={{ fontSize: 13, fontWeight: 700, fontFamily: 'var(--font-mono)', marginLeft: 1 }}>%</span>
    </span>
  )
}

export default function Preloader({ onComplete }) {
  const [wordIndex, setWordIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [fadeState, setFadeState] = useState('in') // in, out
  const [audioEnabled, setAudioEnabled] = useState(false)
  const [preloaderActive, setPreloaderActive] = useState(true)

  const soundscapeRef = useRef(null)

  // 1. Smooth, Consecutive progress loader count (0 to 100)
  useEffect(() => {
    if (!preloaderActive) return

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev < 100) {
          return prev + 1
        } else {
          clearInterval(interval)
          handleSkip()
          return 100
        }
      })
    }, 72) // 7.2 seconds total, consecutive increments

    return () => clearInterval(interval)
  }, [preloaderActive])

  // 2. Dynamic Word Resolver based on progress
  useEffect(() => {
    const targetWordIdx = Math.min(WORDS.length - 1, Math.floor(progress / (100 / WORDS.length)))

    if (targetWordIdx !== wordIndex) {
      setWordIndex(targetWordIdx)
      setFadeState('in')
      
      // Play transition chime
      if (soundscapeRef.current) {
        soundscapeRef.current.playChime(WORDS[targetWordIdx].chime)
      }
    }
  }, [progress, wordIndex])

  // 3. Ambient Audio Auto-activation on First User Gesture
  useEffect(() => {
    const startAudio = () => {
      if (!soundscapeRef.current) {
        const sound = new CalmSoundscape()
        sound.init()
        soundscapeRef.current = sound
        setAudioEnabled(true)
        sound.playChime(WORDS[wordIndex].chime)
      }
    }

    // Auto-start on any initial interaction to keep music always playing
    window.addEventListener('click', startAudio, { once: true })
    window.addEventListener('touchstart', startAudio, { once: true })
    window.addEventListener('keydown', startAudio, { once: true })
    window.addEventListener('mousemove', startAudio, { once: true })

    return () => {
      window.removeEventListener('click', startAudio)
      window.removeEventListener('touchstart', startAudio)
      window.removeEventListener('keydown', startAudio)
      window.removeEventListener('mousemove', startAudio)
    }
  }, [wordIndex])

  // 4. Ambient audio manual toggler
  const toggleAudio = () => {
    if (!audioEnabled) {
      const sound = new CalmSoundscape()
      sound.init()
      soundscapeRef.current = sound
      setAudioEnabled(true)
      sound.playChime(WORDS[wordIndex].chime)
    } else {
      soundscapeRef.current?.stop()
      soundscapeRef.current = null
      setAudioEnabled(false)
    }
  }

  // 5. Cleanup soundscapes on unmount
  useEffect(() => {
    return () => {
      soundscapeRef.current?.stop()
    }
  }, [])

  // 6. Complete Loader Animation
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
          background: '#0052ff', // Whole page electric blue
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

  // Signature styling tokens: Blue backdrop, pure crisp white components
  const bgColor = '#0052ff'
  const textColor = '#ffffff'
  const railColor = 'rgba(255, 255, 255, 0.15)'
  const overlayGlow = 'radial-gradient(circle at 10% 20%, rgba(255, 255, 255, 0.08) 0%, transparent 60%)'

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
          0% { box-shadow: 0 0 8px rgba(255, 255, 255, 0.4); transform: scale(0.92); }
          100% { box-shadow: 0 0 20px rgba(255, 255, 255, 0.8); transform: scale(1.08); }
        }
      `}</style>

      {/* Futuristic grain overlay & background ambient glow */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.02\'/%3E%3C/svg%3E")',
        pointerEvents: 'none', zIndex: 1
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: overlayGlow,
        pointerEvents: 'none', zIndex: 2
      }} />

      {/* Floating Micro-particles in crisp white */}
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
            background: '#ffffff',
            opacity: 0.18,
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
            opacity: 0.8
          }}>
            soupriti
          </span>
          <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#ffffff' }} />
          <span style={{
            fontSize: 9,
            fontFamily: 'var(--font-mono)',
            fontWeight: 500,
            letterSpacing: '0.08em',
            opacity: 0.5,
            textTransform: 'uppercase'
          }}>
            HMI OS v1.0.8
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          {/* Calm Soundscape Toggle Button */}
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
              opacity: audioEnabled ? 0.95 : 0.6,
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
              opacity: 0.6,
              transition: 'opacity 0.2s',
              padding: 0,
              outline: 'none'
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = '1'}
            onMouseLeave={e => e.currentTarget.style.opacity = '0.6'}
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
        
        {/* Subtle breathing subtext layer with rolling progress number */}
        <div
          style={{
            fontSize: 12,
            fontFamily: 'var(--font-mono)',
            color: '#ffffff',
            marginTop: 18,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            opacity: 0.8,
            animation: 'breathingText 2.5s ease-in-out infinite alternate',
            display: 'flex',
            alignItems: 'center',
            gap: 8
          }}
        >
          <span>Mindful boot process</span>
          <span style={{ display: 'inline-block', width: 20, height: 1, background: '#ffffff', opacity: 0.4 }} />
          <RollingNumber value={progress} />
        </div>
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
          {WORDS.map((itm) => {
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
                    background: '#ffffff',
                    opacity: isActive ? 0.95 : 0.25,
                    transition: 'all 0.4s ease',
                    boxShadow: isActive ? '0 0 8px #ffffff' : 'none'
                  }}
                />
                
                {/* Micro percentage monospace labels */}
                <span
                  style={{
                    fontSize: 8,
                    fontFamily: 'var(--font-mono)',
                    color: '#ffffff',
                    opacity: isActive ? 0.95 : 0.25,
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
              background: '#ffffff',
              boxShadow: '0 0 16px #ffffff',
              transition: 'top 0.15s linear', // Perfectly consecutive fluid alignment
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
        <span style={{ fontSize: 9, fontFamily: 'var(--font-mono)', opacity: 0.5, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
          Assiste with Luffy
        </span>
        <span style={{ fontSize: 9, fontFamily: 'var(--font-mono)', opacity: 0.5, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
          Simplicity is the sophistication
        </span>
      </footer>
    </div>
  )
}
