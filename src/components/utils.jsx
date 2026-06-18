import { useEffect, useRef, useState } from 'react'

// Shared hook: fade-up on scroll
export function useFadeUp(threshold = 0.15) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, visible]
}

// Animated section wrapper
export function FadeUp({ children, delay = 0, className = '' }) {
  const [ref, visible] = useFadeUp()
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(32px)',
        transition: `opacity 0.7s var(--ease-out-expo) ${delay}ms, transform 0.7s var(--ease-out-expo) ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

// Section label pill
export function Label({ children }) {
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 'var(--space-2)',
      fontSize: '11px',
      fontWeight: 600,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: 'var(--accent)',
      fontFamily: 'var(--font-body)',
    }}>
      <span style={{ width: 16, height: 1, background: 'var(--accent)', display: 'inline-block' }} />
      {children}
    </span>
  )
}

// Synthesized breathy flute audio engine using native Web Audio API
export function playFluteSound(freq, isClick = false) {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext
    if (!AudioContext) return
    const ctx = new AudioContext()
    const now = ctx.currentTime

    // Oscillators
    const osc1 = ctx.createOscillator()
    const osc2 = ctx.createOscillator()

    osc1.type = 'sine'
    osc1.frequency.setValueAtTime(freq, now)

    osc2.type = 'triangle'
    osc2.frequency.setValueAtTime(freq * 2, now) // octave harmonic overtone

    // LFO for organic wind vibrato
    const lfo = ctx.createOscillator()
    const lfoGain = ctx.createGain()
    lfo.frequency.setValueAtTime(isClick ? 5.2 : 6.0, now) // vibrato rate (Hz)
    lfoGain.gain.setValueAtTime(freq * (isClick ? 0.012 : 0.015), now) // vibrato depth

    lfo.connect(lfoGain)
    lfoGain.connect(osc1.frequency)
    lfoGain.connect(osc2.frequency)

    // Breath noise burst (represents the air blowing across the embouchure hole)
    const bufferSize = ctx.sampleRate * 0.25
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1
    }
    const noise = ctx.createBufferSource()
    noise.buffer = buffer

    const noiseFilter = ctx.createBiquadFilter()
    noiseFilter.type = 'lowpass'
    noiseFilter.frequency.setValueAtTime(1300, now) // warm breath cut

    const noiseGain = ctx.createGain()
    noiseGain.gain.setValueAtTime(isClick ? 0.010 : 0.015, now)
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.12)

    noise.connect(noiseFilter)
    noiseFilter.connect(noiseGain)
    noiseGain.connect(ctx.destination)

    // Main Gain Envelope
    const gainNode = ctx.createGain()
    gainNode.connect(ctx.destination)

    if (isClick) {
      // Firm, solid button press
      gainNode.gain.setValueAtTime(0, now)
      gainNode.gain.linearRampToValueAtTime(0.18, now + 0.03) // quick attack
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.32) // decay
    } else {
      // Soft, breathy element hover
      gainNode.gain.setValueAtTime(0, now)
      gainNode.gain.linearRampToValueAtTime(0.13, now + 0.07) // soft swelling attack
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.24) // short decay
    }

    osc1.connect(gainNode)
    osc2.connect(gainNode)

    lfo.start(now)
    osc1.start(now)
    osc2.start(now)
    noise.start(now)

    const duration = isClick ? 0.34 : 0.26
    lfo.stop(now + duration)
    osc1.stop(now + duration)
    osc2.stop(now + duration)
    noise.stop(now + duration)
  } catch (e) {
    console.error("Flute sound failed:", e)
  }
}

export const playFluteHover = () => playFluteSound(698.46, false) // F5 breathy flute note
export const playFluteClick = () => playFluteSound(523.25, true)  // C5 solid flute note

