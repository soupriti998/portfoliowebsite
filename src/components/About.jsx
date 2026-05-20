import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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

  const activeCard = STRINGS_DATA[activeIndex]

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
        <div style={{ marginBottom: 'var(--space-7)', maxWidth: '800px' }}>
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

        {/* Dynamic Display Area & Fretboard Grid */}
        <div 
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '36px',
            width: '100%',
            marginTop: '20px'
          }}
        >
          {/* TOP AREA: One Active Card Display */}
          <div 
            style={{
              width: '100%',
              maxWidth: '560px',
              minHeight: '190px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative'
            }}
          >
            <AnimatePresence mode="wait">
              {activeCard && (
                <motion.div
                  key={activeCard.note}
                  initial={{ opacity: 0, scale: 0.95, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -15 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 24 }}
                  style={{
                    background: '#FCFAF5',
                    border: '1px solid var(--accent)',
                    borderRadius: '20px',
                    padding: '24px 30px',
                    width: '100%',
                    position: 'relative',
                    boxShadow: '0 16px 40px rgba(0, 82, 255, 0.08), 0 4px 10px rgba(0,0,0,0.03)',
                    overflow: 'hidden'
                  }}
                  className="about-active-card"
                >
                  {/* Binder coils */}
                  <div style={{
                    position: 'absolute',
                    left: '32px',
                    top: '0',
                    right: '32px',
                    display: 'flex',
                    justifyContent: 'space-around',
                    marginTop: '-4px',
                    zIndex: 10
                  }}>
                    {[...Array(8)].map((_, rIdx) => (
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

                  {/* Red Margin Line */}
                  <div style={{
                    position: 'absolute',
                    left: '36px',
                    top: 0,
                    bottom: 0,
                    width: '1px',
                    background: 'rgba(239, 68, 68, 0.28)',
                    pointerEvents: 'none',
                    zIndex: 2
                  }} />

                  {/* Card Content */}
                  <div style={{ paddingLeft: '24px', zIndex: 3, position: 'relative' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span style={{ 
                        fontSize: '9.5px', 
                        fontFamily: 'var(--font-mono)', 
                        fontWeight: 700, 
                        color: 'var(--accent)',
                        background: 'rgba(0, 82, 255, 0.06)',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        letterSpacing: '0.05em',
                        textTransform: 'uppercase'
                      }}>
                        {activeCard.stringName} ({activeCard.note})
                      </span>
                      <span style={{ fontSize: '18px' }}>
                        {activeCard.icon}
                      </span>
                    </div>

                    <h3 style={{
                      margin: 0,
                      fontFamily: 'var(--font-display)',
                      fontSize: '19px',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      letterSpacing: '-0.02em',
                      marginBottom: '10px'
                    }}>
                      {activeCard.title}
                    </h3>

                    <p style={{
                      fontSize: '13.5px',
                      lineHeight: '1.65',
                      color: 'var(--text-secondary)',
                      margin: 0,
                      fontFamily: 'var(--font-body)'
                    }}>
                      {activeCard.desc}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* BOTTOM AREA: Horizontal space black guitar fretboard */}
          <div 
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '10px'
            }}
          >
            <div 
              style={{
                width: '100%',
                height: '180px',
                background: 'linear-gradient(to bottom, #09090b 0%, #151518 50%, #09090b 100%)',
                boxShadow: 'inset 0 0 30px rgba(0,0,0,0.95), 0 16px 36px rgba(0,0,0,0.25)',
                borderRadius: '24px',
                border: '2px solid #000000',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Vertical wood grain stripes for space black texture */}
              <div style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 4px, rgba(255,255,255,0.015) 4px, rgba(255,255,255,0.015) 8px)',
                pointerEvents: 'none',
                opacity: 0.9,
                zIndex: 1
              }} />

              {/* Vertical silver fret wires */}
              {[10, 25, 40, 55, 70, 85].map((pos) => (
                <div 
                  key={pos}
                  style={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: `${pos}%`,
                    width: '3px',
                    background: 'linear-gradient(to right, #9ca3af 0%, #f3f4f6 50%, #4b5563 100%)',
                    boxShadow: '1px 0 2px rgba(0,0,0,0.4)',
                    zIndex: 2
                  }}
                />
              ))}

              {/* Pearl Dot Inlays (centered vertically between strings) */}
              {[32.5, 62.5].map((pos) => (
                <div 
                  key={pos}
                  style={{
                    position: 'absolute',
                    left: `${pos}%`,
                    top: '50%',
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, #ffffff 0%, #d1d5db 100%)',
                    boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.4), 0 1px 1px rgba(255,255,255,0.2)',
                    transform: 'translate(-50%, -50%)',
                    opacity: 0.65,
                    zIndex: 2
                  }}
                />
              ))}

              {/* 6 Horizontal Strings */}
              {STRINGS_DATA.map((string, idx) => {
                const isPlucked = pluckedStrings[idx]
                const isActive = activeIndex === idx
                
                // Vertical position for this string
                const positionPct = `${12 + idx * 15}%`

                return (
                  <div key={string.note} style={{ pointerEvents: 'auto' }}>
                    
                    {/* Invisible pluck helper region */}
                    <div 
                      onMouseEnter={() => triggerPluck(idx)}
                      style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        top: positionPct,
                        height: '24px',
                        transform: 'translateY(-50%)',
                        zIndex: 10,
                        cursor: 'pointer'
                      }}
                    />

                    {/* Visual String */}
                    <div 
                      className={`guitar-string-h ${isPlucked ? 'plucked' : ''}`}
                      style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        top: positionPct,
                        height: `${1.4 + (5 - idx) * 0.7}px`, // Thicker strings on top E2
                        background: idx < 3 
                          ? 'linear-gradient(180deg, #c5a059 0%, #fef3c7 50%, #c5a059 100%)' // Bronze winding
                          : 'linear-gradient(180deg, #6b7280 0%, #e5e7eb 50%, #6b7280 100%)', // Plain steel
                        boxShadow: '0 2px 4px rgba(0,0,0,0.5)',
                        transform: 'translateY(-50%)',
                        pointerEvents: 'none',
                        zIndex: 5
                      }}
                    />

                    {/* Clicking Circle Node (Pearl dot button to lock active index) */}
                    <button
                      onClick={() => triggerPluck(idx)}
                      style={{
                        position: 'absolute',
                        top: positionPct,
                        left: `${17.5 + idx * 15}%`, // staggered diagonal nodes
                        width: '26px',
                        height: '26px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transform: 'translate(-50%, -50%)',
                        background: isActive 
                          ? 'radial-gradient(circle, #3b82f6 0%, #0052ff 100%)' 
                          : 'radial-gradient(circle, #ffffff 0%, #d1d5db 100%)',
                        border: isActive ? '2px solid #ffffff' : '2px solid #6b7280',
                        color: isActive ? '#ffffff' : '#1f2937',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '9.5px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        zIndex: 20,
                        boxShadow: isActive 
                          ? '0 0 15px rgba(0, 82, 255, 0.75), 0 2px 4px rgba(0,0,0,0.4)'
                          : '0 2px 4px rgba(0,0,0,0.35)',
                        transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                        outline: 'none'
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1.15)'
                        }
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1)'
                      }}
                    >
                      {string.note}
                    </button>

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
              💡 Click the circular note nodes on the strings to play notes & reveal biography boxes
            </span>
          </div>

        </div>

      </div>

      <style>{`
        /* String wiggle vibration animations for horizontal strings */
        @keyframes string-wiggle-h {
          0% { transform: translateY(-50%) scaleY(1); }
          8% { transform: translateY(-50%) translateY(-6px); }
          16% { transform: translateY(-50%) translateY(5px); }
          24% { transform: translateY(-50%) translateY(-4px); }
          32% { transform: translateY(-50%) translateY(3.5px); }
          40% { transform: translateY(-50%) translateY(-2.5px); }
          50% { transform: translateY(-50%) translateY(1.8px); }
          60% { transform: translateY(-50%) translateY(-1.2px); }
          70% { transform: translateY(-50%) translateY(0.7px); }
          80% { transform: translateY(-50%) translateY(-0.3px); }
          100% { transform: translateY(-50%) translateY(0); }
        }

        .guitar-string-h.plucked {
          animation: string-wiggle-h 0.85s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
        }
      `}</style>
    </section>
  )
}
