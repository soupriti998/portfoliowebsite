import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { FadeUp, Label } from './utils'

// Frequencies for open strings of a guitar: E2, A2, D3, G3, B3, E4
const STRINGS_DATA = [
  {
    note: 'Sa',
    stringName: 'String 6',
    gauge: 'E2',
    freq: 82.41,
    title: 'Telemetry & Bio',
    icon: '📈',
    desc: 'Visual design graduate from NIFT Chennai. I combine 4.0 UX years and 12+ projects with a 100% specification delivery rate for developers.',
    color: '#E0F2FE'
  },
  {
    note: 'Re',
    stringName: 'String 5',
    gauge: 'A2',
    freq: 110.00,
    title: 'Interaction Craft',
    icon: '🧭',
    desc: 'Focus on motion physics, micro-interactions, spring-based reveals, and fluid animation (accounts for 50% of my core daily focus).',
    color: '#DCFCE7'
  },
  {
    note: 'Ga',
    stringName: 'String 4',
    gauge: 'D3',
    freq: 146.83,
    title: 'Design Toolkit',
    icon: '🎨',
    desc: 'Mastery in Figma token spec systems, advanced responsive layouts, usability testing logs, and custom React development.',
    color: '#FEF9C3'
  },
  {
    note: 'Ma',
    stringName: 'String 3',
    gauge: 'G3',
    freq: 196.00,
    title: 'Strategic Process',
    icon: '⚡',
    desc: 'Deep interest in log diaries and user observation research, mapping behavioral patterns into quantitative product growth metrics.',
    color: '#FEE2E2'
  },
  {
    note: 'Pa',
    stringName: 'String 2',
    gauge: 'B3',
    freq: 246.94,
    title: 'Passions & Hobbies',
    icon: '🕹️',
    desc: 'Fueled by travel diaries, specialty coffee, digital sketching on procreate, retro console gaming, and modular synthesizer patches.',
    color: '#F3E8FF'
  },
  {
    note: 'Dha',
    stringName: 'String 1',
    gauge: 'E4',
    freq: 329.63,
    title: 'Quirky Personality',
    icon: '✨',
    desc: 'Empathic, enthusiastic, and easily makes friends. Brings high energy, collaborative laughter, and positive team dynamics to any design sprint.',
    color: '#FCE7F3'
  }
]

let audioCtx = null

function playGuitarPluck(freq) {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext
    if (!AudioContext) return
    if (!audioCtx) {
      audioCtx = new AudioContext()
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume()
    }
    const now = audioCtx.currentTime

    // 1. Noise Burst for Pluck contact (crisp pick sound)
    const bufferSize = audioCtx.sampleRate * 0.025
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1
    }
    const noise = audioCtx.createBufferSource()
    noise.buffer = buffer

    const noiseFilter = audioCtx.createBiquadFilter()
    noiseFilter.type = 'bandpass'
    noiseFilter.frequency.value = 1100
    noiseFilter.Q.value = 2.5

    const noiseGain = audioCtx.createGain()
    noiseGain.gain.setValueAtTime(0.05, now)
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.025)

    noise.connect(noiseFilter)
    noiseFilter.connect(noiseGain)
    noiseGain.connect(audioCtx.destination)
    noise.start(now)

    // 2. Multi-oscillator String resonance (warm, wood acoustic decay)
    const osc1 = audioCtx.createOscillator()
    osc1.type = 'sawtooth'
    osc1.frequency.setValueAtTime(freq, now)

    const osc2 = audioCtx.createOscillator()
    osc2.type = 'triangle'
    osc2.frequency.setValueAtTime(freq * 2.01, now) // octave + chorus detune

    const filter = audioCtx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(950, now)
    filter.frequency.exponentialRampToValueAtTime(70, now + 1.8)

    const gainNode = audioCtx.createGain()
    const decay = freq < 120 ? 2.2 : 1.6 // low strings decay longer
    
    gainNode.gain.setValueAtTime(0.24, now)
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + decay)

    osc1.connect(filter)
    osc2.connect(filter)
    filter.connect(gainNode)
    gainNode.connect(audioCtx.destination)

    osc1.start(now)
    osc2.start(now)
    osc1.stop(now + decay + 0.1)
    osc2.stop(now + decay + 0.1)
  } catch (e) {
    console.error("Guitar synthesis failed:", e)
  }
}

export default function About() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [pluckedStrings, setPluckedStrings] = useState([false, false, false, false, false, false])
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkViewport = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    checkViewport()
    window.addEventListener('resize', checkViewport)
    return () => window.removeEventListener('resize', checkViewport)
  }, [])

  const triggerPluck = (idx) => {
    setActiveIndex(idx)
    playGuitarPluck(STRINGS_DATA[idx].freq)
    
    setPluckedStrings(prev => {
      const next = [...prev]
      next[idx] = true
      return next
    })

    setTimeout(() => {
      setPluckedStrings(prev => {
        const next = [...prev]
        next[idx] = false
        return next
      })
    }, 850)
  }

  return (
    <section 
      id="about" 
      style={{ 
        position: 'relative', 
        background: 'var(--bg-warm)', 
        borderTop: '1px solid var(--border)', 
        padding: 'var(--space-11) 0',
        overflow: 'hidden'
      }}
    >
      <div className="container" style={{ position: 'relative', zIndex: 2, width: '100%' }}>
        
        {/* Title Block */}
        <div style={{ marginBottom: 'var(--space-8)', maxWidth: '800px' }}>
          <FadeUp>
            <Label>About Me</Label>
          </FadeUp>
          <FadeUp delay={80}>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(34px, 4.5vw, 52px)',
              fontWeight: 400,
              letterSpacing: '-0.03em',
              lineHeight: 1.08,
              color: 'var(--text-primary)',
              marginTop: 'var(--space-4)',
              marginBottom: 'var(--space-5)',
            }}>
              The designer behind<br />
              <span style={{ color: 'var(--accent)', fontWeight: 600 }}>all the interactive play.</span>
            </h2>
          </FadeUp>
          <FadeUp delay={120}>
            <p style={{ fontSize: 16.5, lineHeight: 1.75, color: 'var(--text-secondary)', fontFamily: 'var(--font-body)', margin: 0, maxWidth: '720px' }}>
              I'm <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Soupriti</strong>, a Product Designer based in Bangalore. With a visual design foundation from <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>NIFT Chennai</strong>, I specialize in combining rigorous user ethnography with high-end, functional React prototypes.
            </p>
          </FadeUp>
        </div>

        {/* Responsive Grid Container */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1.2fr 0.8fr',
            gap: '32px',
            alignItems: 'start',
            width: '100%',
            marginTop: '20px'
          }}
        >
          {/* LEFT SIDE: Expandable Notebook Biography Cards */}
          <div 
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
              width: '100%'
            }}
          >
            {STRINGS_DATA.map((item, idx) => {
              const isActive = activeIndex === idx
              return (
                <div
                  key={item.note}
                  onClick={() => triggerPluck(idx)}
                  style={{
                    background: isActive ? '#FCFAF5' : 'rgba(252, 250, 245, 0.45)',
                    border: isActive ? '1px solid var(--accent)' : '1px solid rgba(0, 0, 0, 0.05)',
                    borderRadius: '16px',
                    padding: '18px 24px',
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    position: 'relative',
                    overflow: 'hidden',
                    boxShadow: isActive 
                      ? '0 12px 30px rgba(0, 82, 255, 0.07), 0 3px 6px rgba(0,0,0,0.02)'
                      : 'none',
                    transform: isActive ? 'translateX(4px)' : 'none',
                  }}
                  className="about-note-card"
                >
                  {/* Binder coils for active card */}
                  {isActive && (
                    <div style={{
                      position: 'absolute',
                      left: '24px',
                      top: '0',
                      right: '24px',
                      display: 'flex',
                      justifyContent: 'space-around',
                      marginTop: '-4px',
                      zIndex: 10
                    }}>
                      {[...Array(6)].map((_, rIdx) => (
                        <div key={rIdx} style={{
                          width: '4px',
                          height: '10px',
                          background: 'linear-gradient(90deg, #e5e5ea, #c7c7cc, #e5e5ea)',
                          borderRadius: '2px',
                          boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                          border: '0.5px solid rgba(0,0,0,0.05)'
                        }} />
                      ))}
                    </div>
                  )}

                  {/* Red Margin Line */}
                  <div style={{
                    position: 'absolute',
                    left: '28px',
                    top: 0,
                    bottom: 0,
                    width: '1px',
                    background: 'rgba(239, 68, 68, 0.28)',
                    pointerEvents: 'none',
                    zIndex: 2
                  }} />

                  <div style={{ paddingLeft: '18px', zIndex: 3, position: 'relative' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <span style={{ 
                        fontSize: '9px', 
                        fontFamily: 'var(--font-mono)', 
                        fontWeight: 700, 
                        color: isActive ? 'var(--accent)' : 'var(--text-muted)',
                        background: isActive ? 'rgba(0, 82, 255, 0.06)' : 'rgba(0,0,0,0.03)',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        letterSpacing: '0.05em',
                        textTransform: 'uppercase'
                      }}>
                        {item.stringName} ({item.note})
                      </span>
                      <span style={{ fontSize: '14px' }}>
                        {item.icon}
                      </span>
                    </div>

                    <h3 style={{
                      margin: 0,
                      fontFamily: 'var(--font-display)',
                      fontSize: '16px',
                      fontWeight: isActive ? 600 : 500,
                      color: isActive ? 'var(--text-primary)' : 'rgba(0,0,0,0.5)',
                      letterSpacing: '-0.015em'
                    }}>
                      {item.title}
                    </h3>

                    {/* Expandable description body */}
                    <div style={{
                      height: isActive ? 'auto' : 0,
                      opacity: isActive ? 1 : 0,
                      overflow: 'hidden',
                      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                      marginTop: isActive ? '8px' : 0
                    }}>
                      <p style={{
                        fontSize: '12.5px',
                        lineHeight: '1.6',
                        color: 'var(--text-secondary)',
                        margin: 0,
                        fontFamily: 'var(--font-body)'
                      }}>
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* RIGHT SIDE: Zoomed-in Fretboard with Guitar Strings */}
          <div 
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'sticky',
              top: '120px'
            }}
          >
            <div 
              style={{
                width: '100%',
                maxWidth: isMobile ? '100%' : '360px',
                height: isMobile ? '200px' : '450px',
                background: 'linear-gradient(to right, #1d0f0a 0%, #2f1b12 25%, #3c2217 50%, #2f1b12 75%, #1d0f0a 100%)',
                boxShadow: 'inset 0 0 35px rgba(0,0,0,0.85), 0 16px 36px rgba(0,0,0,0.22)',
                borderRadius: '20px',
                border: '2px solid #140b08',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer'
              }}
            >
              {/* Subtle vertical wood grain overlay */}
              <div style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                backgroundImage: isMobile 
                  ? 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.12) 3px, rgba(0,0,0,0.12) 6px)'
                  : 'repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(0,0,0,0.12) 3px, rgba(0,0,0,0.12) 6px)',
                pointerEvents: 'none',
                opacity: 0.85,
                zIndex: 1
              }} />

              {/* Fretboard Markers (Pearl Dots) */}
              {isMobile ? (
                // Horizontal frets for mobile
                <>
                  <div style={{ position: 'absolute', top: 0, bottom: 0, left: '30%', width: '3px', background: 'linear-gradient(to right, #d1d5db, #9ca3af, #4b5563)', zIndex: 2 }} />
                  <div style={{ position: 'absolute', top: 0, bottom: 0, left: '60%', width: '3px', background: 'linear-gradient(to right, #d1d5db, #9ca3af, #4b5563)', zIndex: 2 }} />
                  <div style={{ position: 'absolute', top: 0, bottom: 0, left: '90%', width: '3px', background: 'linear-gradient(to right, #d1d5db, #9ca3af, #4b5563)', zIndex: 2 }} />
                  {/* Pearl Dot */}
                  <div style={{
                    position: 'absolute', left: '45%', top: '50%', width: '10px', height: '10px', borderRadius: '50%',
                    background: 'radial-gradient(circle, #ffffff, #dcdcdc)', boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.3)',
                    transform: 'translate(-50%, -50%)', opacity: 0.75, zIndex: 2
                  }} />
                </>
              ) : (
                // Vertical frets for desktop
                <>
                  <div style={{ position: 'absolute', left: 0, right: 0, top: '22%', height: '3px', background: 'linear-gradient(to bottom, #d1d5db, #9ca3af, #4b5563)', zIndex: 2 }} />
                  <div style={{ position: 'absolute', left: 0, right: 0, top: '48%', height: '3px', background: 'linear-gradient(to bottom, #d1d5db, #9ca3af, #4b5563)', zIndex: 2 }} />
                  <div style={{ position: 'absolute', left: 0, right: 0, top: '74%', height: '3px', background: 'linear-gradient(to bottom, #d1d5db, #9ca3af, #4b5563)', zIndex: 2 }} />
                  {/* Pearl Dots */}
                  <div style={{
                    position: 'absolute', top: '35%', left: '50%', width: '12px', height: '12px', borderRadius: '50%',
                    background: 'radial-gradient(circle, #ffffff, #dcdcdc)', boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.3)',
                    transform: 'translate(-50%, -50%)', opacity: 0.75, zIndex: 2
                  }} />
                  <div style={{
                    position: 'absolute', top: '61%', left: '50%', width: '12px', height: '12px', borderRadius: '50%',
                    background: 'radial-gradient(circle, #ffffff, #dcdcdc)', boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.3)',
                    transform: 'translate(-50%, -50%)', opacity: 0.75, zIndex: 2
                  }} />
                </>
              )}

              {/* Guitar Strings Loop */}
              {STRINGS_DATA.map((string, idx) => {
                const isPlucked = pluckedStrings[idx]
                const positionPct = `${10 + idx * 16}%`

                return (
                  <div key={string.note} style={{ pointerEvents: 'auto' }}>
                    {/* Invisible Wide Hover Bridge for easy tactile plucking */}
                    {isMobile ? (
                      <div 
                        onMouseEnter={() => triggerPluck(idx)}
                        style={{
                          position: 'absolute',
                          left: 0,
                          right: 0,
                          top: positionPct,
                          height: '26px',
                          transform: 'translateY(-50%)',
                          zIndex: 10,
                          cursor: 'pointer'
                        }}
                      />
                    ) : (
                      <div 
                        onMouseEnter={() => triggerPluck(idx)}
                        style={{
                          position: 'absolute',
                          top: 0,
                          bottom: 0,
                          left: positionPct,
                          width: '38px',
                          transform: 'translateX(-50%)',
                          zIndex: 10,
                          cursor: 'pointer'
                        }}
                      />
                    )}

                    {/* Actual Visual String */}
                    {isMobile ? (
                      <div 
                        className={`guitar-string-h ${isPlucked ? 'plucked' : ''}`}
                        style={{
                          position: 'absolute',
                          left: 0,
                          right: 0,
                          top: positionPct,
                          height: `${1.5 + (5 - idx) * 0.7}px`, // Thicker strings on top E2
                          background: idx < 3 
                            ? 'linear-gradient(180deg, #d4af37 0%, #fff7d6 50%, #d4af37 100%)' // Bronze E, A, D
                            : 'linear-gradient(180deg, #8a95a5 0%, #e2e8f0 50%, #8a95a5 100%)', // Steel G, B, e
                          boxShadow: '0 2px 4px rgba(0,0,0,0.45)',
                          transform: 'translateY(-50%)',
                          pointerEvents: 'none',
                          zIndex: 5
                        }}
                      />
                    ) : (
                      <div 
                        className={`guitar-string-v ${isPlucked ? 'plucked' : ''}`}
                        style={{
                          position: 'absolute',
                          top: 0,
                          bottom: 0,
                          left: positionPct,
                          width: `${1.5 + (5 - idx) * 0.7}px`, // Thicker strings on left E2
                          background: idx < 3 
                            ? 'linear-gradient(90deg, #d4af37 0%, #fff7d6 50%, #d4af37 100%)' // Bronze E, A, D
                            : 'linear-gradient(90deg, #8a95a5 0%, #e2e8f0 50%, #8a95a5 100%)', // Steel G, B, e
                          boxShadow: '2px 0 4px rgba(0,0,0,0.45)',
                          transform: 'translateX(-50%)',
                          pointerEvents: 'none',
                          zIndex: 5
                        }}
                      />
                    )}
                  </div>
                )
              })}
            </div>
            
            {/* Guide Caption */}
            <span style={{ 
              fontSize: '11px', 
              color: 'var(--text-muted)', 
              fontFamily: 'var(--font-mono)', 
              marginTop: '16px',
              textAlign: 'center',
              display: 'block'
            }}>
              💡 Sweep mouse/thumb across the strings to play the open arpeggio
            </span>
          </div>

        </div>

      </div>

      <style>{`
        /* Lined Notepad Paper Card Design */
        .about-note-card {
          background: #FCFAF5;
          user-select: none;
          box-shadow: 0 1px 3px rgba(0,0,0,0.02);
        }

        .about-note-card:hover {
          border-color: rgba(0, 82, 255, 0.4) !important;
        }

        /* String wiggle vibration animations */
        @keyframes string-wiggle-v {
          0% { transform: translateX(-50%) scaleX(1); }
          8% { transform: translateX(-50%) translateX(-8px); }
          16% { transform: translateX(-50%) translateX(7px); }
          24% { transform: translateX(-50%) translateX(-6px); }
          32% { transform: translateX(-50%) translateX(5px); }
          40% { transform: translateX(-50%) translateX(-4px); }
          50% { transform: translateX(-50%) translateX(3px); }
          60% { transform: translateX(-50%) translateX(-2px); }
          70% { transform: translateX(-50%) translateX(1.2px); }
          80% { transform: translateX(-50%) translateX(-0.6px); }
          90% { transform: translateX(-50%) translateX(0.3px); }
          100% { transform: translateX(-50%) translateX(0); }
        }

        @keyframes string-wiggle-h {
          0% { transform: translateY(-50%) scaleY(1); }
          8% { transform: translateY(-50%) translateY(-8px); }
          16% { transform: translateY(-50%) translateY(7px); }
          24% { transform: translateY(-50%) translateY(-6px); }
          32% { transform: translateY(-50%) translateY(5px); }
          40% { transform: translateY(-50%) translateY(-4px); }
          50% { transform: translateY(-50%) translateY(3px); }
          60% { transform: translateY(-50%) translateY(-2px); }
          70% { transform: translateY(-50%) translateY(1.2px); }
          80% { transform: translateY(-50%) translateY(-0.6px); }
          90% { transform: translateY(-50%) translateY(0.3px); }
          100% { transform: translateY(-50%) translateY(0); }
        }

        .guitar-string-v.plucked {
          animation: string-wiggle-v 0.85s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
        }

        .guitar-string-h.plucked {
          animation: string-wiggle-h 0.85s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
        }
      `}</style>
    </section>
  )
}
