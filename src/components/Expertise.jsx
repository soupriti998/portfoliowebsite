import { useState, useRef, useEffect } from 'react'
import { FadeUp, Label } from './utils'

const expertise = [
  { note: 'Sa', freq: 261.63, title: 'Product Design', body: 'End-to-end product thinking from concept to shipped feature — balancing user needs, business goals, and technical constraints.' },
  { note: 'Re', freq: 293.66, title: 'UX Strategy', body: 'Shaping product direction through research synthesis, opportunity mapping, and outcome-driven design roadmaps.' },
  { note: 'Ga', freq: 329.63, title: 'User Research', body: 'Qualitative and quantitative methods — interviews, usability tests, behavioral analytics — to ground decisions in real evidence.' },
  { note: 'Ma', freq: 349.23, title: 'Interaction Design', body: 'Crafting micro-interactions, spring animations, and state transitions that make digital products feel alive and responsive.' },
  { note: 'Pa', freq: 392.00, title: 'Design Systems', body: 'Building scalable, token-driven systems in Figma that empower teams to ship consistently and iterate rapidly at scale.' },
  { note: 'Dha', freq: 440.00, title: 'AI Experiences', body: 'Designing human-centered AI interfaces — translating complex machine learning models into intuitive, transparent interactions.' },
  { note: 'Ni', freq: 493.88, title: 'Quirky Personality', body: 'I have a quirky, warm personality and easily make friends, bringing positive energy, collaborative laughter, and high-vibe empathy to every product team.' },
]

let audioCtx = null

function playPianoNote(freq) {
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

    // Combine fundamental sine wave with warm triangle harmonic
    const osc1 = audioCtx.createOscillator()
    const gain1 = audioCtx.createGain()
    osc1.type = 'sine'
    osc1.frequency.setValueAtTime(freq, now)
    
    const osc2 = audioCtx.createOscillator()
    const gain2 = audioCtx.createGain()
    osc2.type = 'triangle'
    osc2.frequency.setValueAtTime(freq * 2, now)
    
    const masterGain = audioCtx.createGain()

    osc1.connect(gain1)
    gain1.connect(masterGain)
    
    osc2.connect(gain2)
    gain2.connect(masterGain)
    
    masterGain.connect(audioCtx.destination)
    
    // Rhodes-like warm electric piano envelope
    gain1.gain.setValueAtTime(0.28, now)
    gain1.gain.exponentialRampToValueAtTime(0.008, now + 1.2)
    
    gain2.gain.setValueAtTime(0.08, now)
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.8)
    
    masterGain.gain.setValueAtTime(1.0, now)
    masterGain.gain.exponentialRampToValueAtTime(0.01, now + 1.4)
    
    osc1.start(now)
    osc1.stop(now + 1.4)
    
    osc2.start(now)
    osc2.stop(now + 1.4)
  } catch (e) {
    console.error("Audio playback failed:", e)
  }
}

export default function Expertise() {
  const [activeIndex, setActiveIndex] = useState(null)
  const [floatingNotes, setFloatingNotes] = useState([])

  const activeItem = activeIndex !== null ? expertise[activeIndex] : {
    title: "Craft & Capabilities",
    body: "Seven craft areas honed across complex consumer IoT, SaaS dashboards, AI interfaces, and personality. Press the piano keys below to play a note and explore each skill!"
  }

  const triggerNote = (idx) => {
    setActiveIndex(idx)
    const item = expertise[idx]
    
    // Play warm rhodes synth sound
    playPianoNote(item.freq)

    // Spawn floating particle
    const id = Date.now() + Math.random()
    const newNote = {
      id,
      text: item.note,
      left: `${(idx / 7) * 100 + 7.14}%`, // center on the active key
    }
    setFloatingNotes(prev => [...prev, newNote])

    // Cleanup floating note after animation completes
    setTimeout(() => {
      setFloatingNotes(prev => prev.filter(n => n.id !== id))
    }, 1200)
  }

  return (
    <div 
      id="expertise" 
      style={{ 
        position: 'relative',
        minHeight: '85vh',
        background: 'var(--bg-warm)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        padding: 'var(--space-10) 0',
        overflow: 'hidden',
        boxSizing: 'border-box'
      }}
      className="expertise-wrapper-container"
    >
      {/* Dynamic Floating Particles Container */}
      <div 
        className="floating-notes-container"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 99,
          overflow: 'visible'
        }}
      >
        {floatingNotes.map(n => (
          <span 
            key={n.id} 
            className="floating-note-particle"
            style={{ 
              position: 'absolute',
              left: n.left,
              bottom: '180px', // starts right above the piano keys
            }}
          >
            🎵 {n.text}
          </span>
        ))}
      </div>

      <div 
        className="container" 
        style={{ 
          position: 'relative', 
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 'var(--space-6)',
          width: '100%',
          maxWidth: '1200px',
        }}
      >
        <FadeUp>
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-2)' }}>
            <Label>Expertise</Label>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(28px, 4.5vw, 52px)',
              fontWeight: 400,
              letterSpacing: '-0.025em',
              lineHeight: 1.15,
              color: 'var(--text-primary)',
              margin: 'var(--space-2) 0 0 0',
            }}>
              What I do really well.
            </h2>
          </div>
        </FadeUp>

        {/* MIDDLE DISPLAY (Stacked Vertically) */}
        <div 
          className="active-note-card-display"
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            maxWidth: '640px',
            minHeight: '160px',
            padding: 'var(--space-6)',
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: '24px',
            boxShadow: 'var(--shadow-sm)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            transition: 'all 0.3s ease',
            width: '100%',
            boxSizing: 'border-box',
            margin: 'var(--space-4) auto'
          }}
        >
          <div 
            key={activeIndex ?? 'default'} 
            className="active-details-wrapper"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px'
            }}
          >
            <h3 
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(20px, 2.8vw, 30px)',
                fontWeight: 500,
                color: 'var(--text-primary)',
                margin: 0,
                letterSpacing: '-0.015em'
              }}
            >
              {activeItem.title}
            </h3>
            <p 
              style={{
                fontSize: '15px',
                lineHeight: 1.6,
                color: 'var(--text-secondary)',
                margin: 0,
                maxWidth: '52ch'
              }}
            >
              {activeItem.body}
            </p>
          </div>
        </div>

        {/* BOTTOM PIANO CONTAINER */}
        <div 
          className="piano-container-outer"
          style={{
            width: '100%',
            maxWidth: '680px',
            margin: '0 auto',
            background: '#15161a',
            borderRadius: '16px',
            padding: '12px 12px 0 12px',
            boxShadow: '0 20px 50px rgba(0,0,0,0.45), inset 0 2px 4px rgba(255,255,255,0.08), 0 4px 15px rgba(0,0,0,0.3)',
            border: '1px solid rgba(255,255,255,0.06)',
            position: 'relative',
            boxSizing: 'border-box'
          }}
        >
          {/* Wooden Top Frame */}
          <div 
            style={{
              height: '24px',
              background: 'linear-gradient(to bottom, #2b2d35, #15161a)',
              borderRadius: '8px 8px 0 0',
              borderBottom: '2px solid #000000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative'
            }}
          >
            {/* Red Felt Strip */}
            <div 
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: '#e02424',
                boxShadow: '0 -1px 3px rgba(0,0,0,0.3)'
              }}
            />
          </div>

          {/* Piano Keys Wrapper */}
          <div 
            style={{
              display: 'flex',
              background: '#0a0b0d',
              position: 'relative',
              borderRadius: '0 0 12px 12px',
              overflow: 'hidden',
              paddingBottom: '2px'
            }}
          >
            {expertise.map((item, idx) => {
              const isActive = activeIndex === idx
              return (
                <button
                  key={item.note}
                  onClick={() => triggerNote(idx)}
                  className={`piano-key-btn ${isActive ? 'active' : ''}`}
                  style={{
                    flex: 1,
                    height: '140px',
                    background: isActive 
                      ? 'var(--accent)'
                      : 'linear-gradient(to bottom, #ffffff 0%, #f4f5f7 90%, #e2e5e9 100%)',
                    border: '1px solid rgba(0,0,0,0.12)',
                    borderRight: idx === 6 ? '1px solid rgba(0,0,0,0.12)' : 'none',
                    borderRadius: '0 0 6px 6px',
                    cursor: 'pointer',
                    outline: 'none',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.15s cubic-bezier(0.16, 1, 0.3, 1)',
                    boxShadow: isActive
                      ? '0 8px 24px rgba(0, 82, 255, 0.3), inset 0 2px 8px rgba(0,0,0,0.2)'
                      : 'inset 0 -8px 8px rgba(0,0,0,0.06), 0 4px 6px rgba(0,0,0,0.05)',
                    transformOrigin: 'top center',
                    transform: isActive ? 'scaleY(0.97) translateY(2px)' : 'none',
                    userSelect: 'none'
                  }}
                >
                  <span 
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '18px',
                      fontWeight: 800,
                      color: isActive ? '#ffffff' : 'rgba(0,0,0,0.65)',
                      letterSpacing: '-0.02em',
                      display: 'block'
                    }}
                  >
                    {item.note}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <style>{`
        .active-details-wrapper {
          animation: detailFadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes detailFadeIn {
          from { opacity: 0; transform: translateY(12px); filter: blur(4px); }
          to { opacity: 1; transform: translateY(0); filter: blur(0); }
        }

        @keyframes floatUp {
          0% {
            transform: translate(-50%, 0) scale(0.8);
            opacity: 0;
          }
          15% {
            opacity: 1;
            transform: translate(-50%, -20px) scale(1.1);
          }
          100% {
            transform: translate(-50%, -160px) scale(0.9);
            opacity: 0;
          }
        }

        .floating-note-particle {
          font-family: var(--font-mono);
          font-size: 13px;
          font-weight: 700;
          color: #ffffff;
          background: var(--accent);
          padding: 6px 12px;
          border-radius: 20px;
          box-shadow: 0 4px 15px rgba(0, 82, 255, 0.4);
          animation: floatUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          white-space: nowrap;
        }
      `}</style>
    </div>
  )
}
