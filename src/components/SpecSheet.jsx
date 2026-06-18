import { useState, useEffect } from 'react'
import { playFluteHover, playFluteClick } from './utils'

/* ── Interactive State CSS Snippets & Metadata ── */
const STATE_SPECS = {
  // Category 1: IDLE / BREATHING STATES
  'Idle - Min': {
    desc: 'The minimum breathing state. Displays a compact glow orb with subtle blur.',
    css: `@keyframes pulseMin {
  0% { transform: scale(0.9); opacity: 0.6; }
  100% { transform: scale(0.95); opacity: 0.8; }
}`,
    react: `<div style={{ width: 14, height: 14, borderRadius: '50%', background: '#FF4DA6', boxShadow: '0 0 8px #FF4DA6' }} />`
  },
  'Breathing In': {
    desc: 'The inhalation curve. Circle expands outward with increasing glow luminosity.',
    css: `@keyframes breathIn {
  from { transform: scale(0.9); opacity: 0.6; filter: blur(1px); }
  to { transform: scale(1.15); opacity: 0.95; filter: blur(0px); }
}`,
    react: `<div style={{ width: 20, height: 20, borderRadius: '50%', background: '#FF4DA6', boxShadow: '0 0 16px #FF4DA6' }} />`
  },
  'Breathing Max': {
    desc: 'Maximum expansion node. High-energy presence, soft glowing diffusion ring.',
    css: `@keyframes breathMax {
  0%, 100% { transform: scale(1.2); opacity: 1; filter: blur(0.5px); }
}`,
    react: `<div style={{ width: 24, height: 24, borderRadius: '50%', background: '#FF4DA6', boxShadow: '0 0 24px #FF4DA6' }} />`
  },
  'Breathing Out': {
    desc: 'The exhalation phase. Circle collapses gently, releasing energy into a ring.',
    css: `@keyframes breathOut {
  from { transform: scale(1.15); opacity: 0.9; }
  to { transform: scale(0.95); opacity: 0.65; }
}`,
    react: `<div style={{ width: 16, height: 16, borderRadius: '50%', background: '#FF4DA6', boxShadow: '0 0 10px #FF4DA6' }} />`
  },
  'Idle - Loop': {
    desc: 'The complete standard resting cycle of the assistant. Frictionless and calm.',
    css: `@keyframes pulseCore {
  0% { transform: scale(0.88); opacity: 0.75; }
  100% { transform: scale(1.1); opacity: 1; }
}`,
    react: `<div style={{ animation: 'pulseCore 2s ease-in-out infinite alternate' }} />`
  },

  // Category 2: THINKING / PROCESSING STATES
  'Thinking - Dots': {
    desc: 'Three physical orbits inside the core circle representing structural layout thought processing.',
    css: `@keyframes pulseDots {
  0%, 100% { transform: scale(0.9); opacity: 0.7; }
  50% { transform: scale(1.1); opacity: 1; }
}`,
    react: `<div className="thinking-dots" />`
  },
  'Thinking - Orbit': {
    desc: 'A single dotted satellite particle orbiting the core on a thin tracking rail.',
    css: `@keyframes spinOrbit {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}`,
    react: `<div style={{ animation: 'spinOrbit 2s linear infinite' }} />`
  },
  'Thinking - Pulse': {
    desc: 'Concentric energy shockwaves emitting outward from the core of the assistant.',
    css: `@keyframes ripplePulse {
  0% { transform: scale(0.7); opacity: 0.9; }
  100% { transform: scale(1.6); opacity: 0; }
}`,
    react: `<div style={{ animation: 'ripplePulse 1.5s ease-out infinite' }} />`
  },
  'Processing - Spin': {
    desc: 'High speed tracking spin of a gradient pink ring, representing active command execution.',
    css: `@keyframes fastSpin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}`,
    react: `<div style={{ animation: 'fastSpin 0.8s cubic-bezier(0.4, 0, 0.2, 1) infinite' }} />`
  },
  'Processing - Particles': {
    desc: 'Tiny micro-particles rotating and floating in a zero-gravity ring around the core.',
    css: `@keyframes particleOrbit {
  from { transform: rotate(0deg) translateX(10px) rotate(0deg); }
  to { transform: rotate(360deg) translateX(10px) rotate(-360deg); }
}`,
    react: `<div className="orbit-particles" />`
  },
  'Processing - Wave': {
    desc: 'Soft minor-pentatonic voice waveforms, showing responsive ambient intelligence.',
    css: `@keyframes waveScale {
  0%, 100% { transform: scaleY(0.4); }
  50% { transform: scaleY(1.4); }
}`,
    react: `<div className="wave-bars" />`
  },
  'Typing': {
    desc: 'Subtle sequential bounce of three internal dot cells, showing system active reply.',
    css: `@keyframes dotBounce {
  0%, 60%, 100% { transform: translateY(0); }
  30% { transform: translateY(-4px); }
}`,
    react: `<div className="typing-dots" />`
  },

  // Category 3: ACTIVE / INTERACTION STATES
  'Hover': {
    desc: 'Luminous pink glow flare expansion triggered when user moves pointer close to the notch.',
    css: `transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
box-shadow: 0 0 20px #FF4DA6, inset 0 0 4px #FF4DA6;`,
    react: `<div style={{ transform: 'scale(1.1)', boxShadow: '0 0 20px #FF4DA6' }} />`
  },
  'Pressed': {
    desc: 'Momentary physics-driven squash compression showing responsive tactile feedback.',
    css: `transition: transform 0.1s ease;
transform: scale(0.85);`,
    react: `<div style={{ transform: 'scale(0.85)', background: 'rgba(255, 77, 166, 0.8)' }} />`
  },
  'Listening': {
    desc: 'Double pulsating acoustic radar wings displaying real-time microphone stream observation.',
    css: `@keyframes radarPulse {
  0% { transform: scale(1); opacity: 0.8; }
  100% { transform: scale(1.5); opacity: 0; }
}`,
    react: `<div className="listening-radar" />`
  },
  'Active / Focus': {
    desc: 'High-contrast halo perimeter glow locking the assistant in the center.',
    css: `border: 2px solid #FF4DA6;
box-shadow: 0 0 24px rgba(255, 77, 166, 0.6);`,
    react: `<div style={{ border: '2.2px solid #FF4DA6' }} />`
  },
  'Success': {
    desc: 'Gentle chromatic color shift from soft pink to glowing turquoise, signaling a completed task.',
    css: `@keyframes successShift {
  0% { background: #FF4DA6; }
  100% { background: #00F5D4; }
}`,
    react: `<div style={{ background: '#00F5D4', boxShadow: '0 0 16px #00F5D4' }} />`
  },
  'Attention': {
    desc: 'A physical high-contrast double halo pulse, warning the user of actions needed.',
    css: `@keyframes attentionAlert {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.25); box-shadow: 0 0 28px #FF4DA6; }
}`,
    react: `<div style={{ animation: 'attentionAlert 1.2s infinite' }} />`
  },
  'Notification': {
    desc: 'A tiny floating pink beacon orb anchored at the top-right curve of the main circle.',
    css: `position: relative;
&::after { content: ''; position: absolute; top: -2px; right: -2px; width: 6px; height: 6px; background: #FF4DA6; }`,
    react: `<div className="notification-circle" />`
  },

  // Category 4: CONTEXTUAL STATES
  'Reading': {
    desc: 'A calm, low-opacity slow-breathing presence that matches standard article reading.',
    css: `@keyframes slowRead {
  0%, 100% { transform: scale(0.95); opacity: 0.55; }
  50% { transform: scale(1.02); opacity: 0.7; }
}`,
    react: `<div style={{ animation: 'slowRead 3.5s ease-in-out infinite' }} />`
  },
  'Scrolling': {
    desc: 'Laser line sweeps downward representing responsive navigation scanning.',
    css: `@keyframes scanLine {
  0% { transform: translateY(-8px); opacity: 0.3; }
  100% { transform: translateY(8px); opacity: 0.3; }
}`,
    react: `<div className="scanning-bar" />`
  },
  'Voice Mode': {
    desc: 'Deep multi-halo acoustic waveform rings showing continuous audio interaction.',
    css: `@keyframes audioRipple {
  0% { transform: scale(0.9); opacity: 0.7; }
  100% { transform: scale(1.6); opacity: 0; }
}`,
    react: `<div className="audio-rippler" />`
  },
  'Helping': {
    desc: 'A magical constellation of glowing sparkles drifting around the circle in zero gravity.',
    css: `@keyframes sparkleDrift {
  0% { transform: translateY(0) scale(0.8); opacity: 0; }
  50% { opacity: 0.9; }
  100% { transform: translateY(-8px) scale(0.6); opacity: 0; }
}`,
    react: `<div className="helping-sparkles" />`
  },
  'New Info': {
    desc: 'A glowing pink sparkle star appearing above the circle indicating new details available.',
    css: `@keyframes sparkleStar {
  0%, 100% { transform: scale(0.7); opacity: 0.5; }
  50% { transform: scale(1.1); opacity: 1; }
}`,
    react: `<div className="sparkle-star" />`
  },
  'Deep Focus': {
    desc: 'The assistant recesses into a slow breathing mode with a clean border ring.',
    css: `@keyframes deepFocus {
  0% { opacity: 0.4; }
  100% { opacity: 0.7; }
}`,
    react: `<div style={{ border: '1px dashed rgba(255, 77, 166, 0.4)' }} />`
  },
  'End / Complete': {
    desc: 'A beautiful tick checkmark morphing inside the glowing pink circle representing task finish.',
    css: `transition: all 0.3s ease;
background: rgba(255, 77, 166, 0.15);`,
    react: `<div className="complete-checkmark" />`
  },

  // Category 5: EMPTY / INACTIVE / OFFLINE STATES
  'Dim Idle': {
    desc: 'Low brightness resting state used during screen dimmed sleep phases.',
    css: `opacity: 0.35;
box-shadow: 0 0 4px rgba(255, 77, 166, 0.4);`,
    react: `<div style={{ opacity: 0.35 }} />`
  },
  'Very Low': {
    desc: 'Extremely thin, low glow outline circle showing critical power or sleep status.',
    css: `border: 1px solid rgba(255, 77, 166, 0.25);
background: transparent;`,
    react: `<div style={{ border: '1px solid rgba(255, 77, 166, 0.25)', background: 'transparent' }} />`
  },
  'Offline / Hidden': {
    desc: 'A dotted circle boundary showing absolute dormant or offline state.',
    css: `border: 1px dashed rgba(255, 77, 166, 0.3);
background: transparent;`,
    react: `<div style={{ border: '1.2px dashed rgba(255, 77, 166, 0.3)', background: 'transparent' }} />`
  },
  'Sleeping': {
    desc: 'Slow sleeping cycle accompanied by small rising letter Zs in zero gravity.',
    css: `@keyframes sleepRise {
  0% { transform: translate(0, 0) scale(0.6); opacity: 0; }
  50% { opacity: 0.8; }
  100% { transform: translate(6px, -12px) scale(0.8); opacity: 0; }
}`,
    react: `<div className="sleeping-zs" />`
  },
  'Away': {
    desc: 'Dashed rings slowly breathing, indicating user is away from keyboard.',
    css: `@keyframes awayOrbit {
  0% { transform: rotate(0deg) scale(0.9); }
  100% { transform: rotate(180deg) scale(1.05); }
}`,
    react: `<div style={{ animation: 'awayOrbit 4s ease-in-out infinite alternate' }} />`
  },
  'Do Not Disturb': {
    desc: 'A tiny horizontal bar blocking the bottom of the circle showing focused silence.',
    css: `position: relative;
&::after { content: ''; position: absolute; bottom: 0; width: 6px; height: 1.5px; background: #FF4DA6; }`,
    react: `<div className="dnd-indicator" />`
  },
  'Error': {
    desc: 'A sharp, vibrating cross alert showing system process interruption.',
    css: `@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-1px); }
  75% { transform: translateX(1px); }
}`,
    react: `<div className="error-cross" />`
  }
}

/* ── Interactive Circle Renderer Component ── */
const InteractiveCircleSpec = ({ name, active, onClick, theme }) => {
  const isDark = theme === 'dark'
  const pinkGlow = '#FF4DA6'

  // Render specific animated states matching sprite sheet spec
  const renderCircle = () => {
    switch (name) {
      // 1. IDLE / BREATHING STATES
      case 'Idle - Min':
        return (
          <div style={{
            width: 14, height: 14,
            borderRadius: '50%',
            background: pinkGlow,
            boxShadow: `0 0 8px ${pinkGlow}`,
            animation: 'pulseCore 2.5s ease-in-out infinite alternate'
          }} />
        )
      case 'Breathing In':
        return (
          <div style={{
            width: 22, height: 22,
            borderRadius: '50%',
            background: 'rgba(255, 77, 166, 0.45)',
            border: `1.5px solid ${pinkGlow}`,
            boxShadow: `0 0 16px ${pinkGlow}`,
            animation: 'pulseCore 1.5s ease-in-out infinite alternate'
          }} />
        )
      case 'Breathing Max':
        return (
          <div style={{
            width: 26, height: 26,
            borderRadius: '50%',
            background: pinkGlow,
            boxShadow: `0 0 26px ${pinkGlow}`,
            animation: 'pulseCore 0.8s ease-in-out infinite alternate'
          }} />
        )
      case 'Breathing Out':
        return (
          <div style={{
            width: 18, height: 18,
            borderRadius: '50%',
            background: 'rgba(255, 77, 166, 0.25)',
            border: `1.2px solid ${pinkGlow}`,
            boxShadow: `0 0 10px ${pinkGlow}`,
            animation: 'pulseCore 2.2s ease-in-out infinite alternate'
          }} />
        )
      case 'Idle - Loop':
        return (
          <div style={{
            position: 'relative',
            width: 18, height: 18,
            borderRadius: '50%',
            background: pinkGlow,
            boxShadow: `0 0 12px ${pinkGlow}`,
            animation: 'pulseCore 2s ease-in-out infinite alternate'
          }} />
        )

      // 2. THINKING / PROCESSING STATES
      case 'Thinking - Dots':
        return (
          <div style={{
            position: 'relative', width: 22, height: 22,
            borderRadius: '50%', border: `1.5px solid ${pinkGlow}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2,
            boxShadow: `0 0 10px rgba(255, 77, 166, 0.25)`
          }}>
            {[1, 2, 3].map(i => (
              <div key={i} style={{ width: 2.5, height: 2.5, borderRadius: '50%', background: pinkGlow }} />
            ))}
          </div>
        )
      case 'Thinking - Orbit':
        return (
          <div style={{ position: 'relative', width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{
              position: 'absolute', width: 18, height: 18,
              borderRadius: '50%', border: `1.2px dashed ${pinkGlow}`,
              animation: 'spinOrbit 2.5s linear infinite'
            }} />
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: pinkGlow, boxShadow: `0 0 6px ${pinkGlow}` }} />
          </div>
        )
      case 'Thinking - Pulse':
        return (
          <div style={{ position: 'relative', width: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{
              position: 'absolute', width: 22, height: 22,
              borderRadius: '50%', border: `1.5px solid ${pinkGlow}`,
              animation: 'pulseCore 1s ease-in-out infinite alternate'
            }} />
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: pinkGlow, boxShadow: `0 0 8px ${pinkGlow}` }} />
          </div>
        )
      case 'Processing - Spin':
        return (
          <div style={{ position: 'relative', width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{
              position: 'absolute', width: 18, height: 18,
              borderRadius: '50%', border: `1.5px solid rgba(255, 77, 166, 0.15)`,
              borderTopColor: pinkGlow, borderRightColor: pinkGlow,
              animation: 'spinOrbit 1s cubic-bezier(0.4, 0, 0.2, 1) infinite'
            }} />
            <div style={{ width: 4, height: 4, borderRadius: '50%', background: isDark ? '#ffffff' : '#000000' }} />
          </div>
        )
      case 'Processing - Particles':
        return (
          <div style={{ position: 'relative', width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{
              position: 'absolute', width: 18, height: 18,
              borderRadius: '50%', border: `1.2px solid rgba(255, 77, 166, 0.2)`
            }} />
            {[0, 1, 2].map(i => (
              <div 
                key={i} 
                style={{
                  position: 'absolute', width: 3, height: 3, borderRadius: '50%',
                  background: pinkGlow, boxShadow: `0 0 4px ${pinkGlow}`,
                  animation: 'orbitParticle 2.5s linear infinite',
                  animationDelay: `${i * 0.8}s`
                }} 
              />
            ))}
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: pinkGlow }} />
          </div>
        )
      case 'Processing - Wave':
        return (
          <div style={{ display: 'flex', gap: 2.2, alignItems: 'center', height: 12, width: 20, justifyContent: 'center' }}>
            {[1, 2, 3, 4].map(i => (
              <div 
                key={i} 
                style={{
                  width: 2, height: '100%', borderRadius: 1,
                  background: pinkGlow, boxShadow: `0 0 4px ${pinkGlow}`,
                  animation: 'ambientWave 0.6s ease-in-out infinite alternate',
                  animationDelay: `${i * 0.15}s`
                }} 
              />
            ))}
          </div>
        )
      case 'Typing':
        return (
          <div style={{ display: 'flex', gap: 3, alignItems: 'center', justifyContent: 'center' }}>
            {[1, 2, 3].map(i => (
              <div 
                key={i} 
                style={{
                  width: 5, height: 5, borderRadius: '50%',
                  background: pinkGlow, boxShadow: `0 0 4px ${pinkGlow}`,
                  animation: 'bounce 1.2s infinite',
                  animationDelay: `${i * 0.2}s`
                }} 
              />
            ))}
          </div>
        )

      // 3. ACTIVE / INTERACTION STATES
      case 'Hover':
        return (
          <div style={{
            width: 22, height: 22,
            borderRadius: '50%',
            background: 'rgba(255, 77, 166, 0.2)',
            border: `2px solid ${pinkGlow}`,
            boxShadow: `0 0 20px ${pinkGlow}, inset 0 0 6px ${pinkGlow}`,
            transform: 'scale(1.1)',
            transition: 'all 0.3s'
          }} />
        )
      case 'Pressed':
        return (
          <div style={{
            width: 18, height: 18,
            borderRadius: '50%',
            background: 'rgba(255, 77, 166, 0.8)',
            border: `1.5px solid ${pinkGlow}`,
            transform: 'scale(0.88)'
          }} />
        )
      case 'Listening':
        return (
          <div style={{ position: 'relative', width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="voice-radar-pulse" style={{ border: `1.5px solid ${pinkGlow}` }} />
            <div style={{ width: 14, height: 14, borderRadius: '50%', background: pinkGlow, boxShadow: `0 0 10px ${pinkGlow}` }} />
          </div>
        )
      case 'Active / Focus':
        return (
          <div style={{
            width: 22, height: 22,
            borderRadius: '50%',
            background: 'transparent',
            border: `2.2px solid ${pinkGlow}`,
            boxShadow: `0 0 22px ${pinkGlow}`
          }} />
        )
      case 'Success':
        return (
          <div style={{
            width: 18, height: 18,
            borderRadius: '50%',
            background: '#00F5D4',
            boxShadow: '0 0 16px #00F5D4',
            animation: 'pulseCore 1s infinite alternate'
          }} />
        )
      case 'Attention':
        return (
          <div style={{
            width: 20, height: 20,
            borderRadius: '50%',
            background: 'transparent',
            border: `2.5px solid ${pinkGlow}`,
            boxShadow: `0 0 18px ${pinkGlow}`,
            animation: 'attentionAlert 1.2s infinite'
          }} />
        )
      case 'Notification':
        return (
          <div style={{ position: 'relative', width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 14, height: 14, borderRadius: '50%', background: 'rgba(255, 77, 166, 0.4)', border: `1.2px solid ${pinkGlow}` }} />
            <div style={{
              position: 'absolute', top: 0, right: 0,
              width: 6, height: 6, borderRadius: '50%',
              background: pinkGlow, boxShadow: `0 0 6px ${pinkGlow}`
            }} />
          </div>
        )

      // 4. CONTEXTUAL STATES
      case 'Reading':
        return (
          <div style={{
            width: 16, height: 16,
            borderRadius: '50%',
            background: pinkGlow,
            opacity: 0.6,
            boxShadow: `0 0 8px ${pinkGlow}`,
            animation: 'pulseCore 3.5s ease-in-out infinite alternate'
          }} />
        )
      case 'Scrolling':
        return (
          <div style={{ position: 'relative', width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{
              position: 'absolute', width: '100%', height: 1.5,
              background: `linear-gradient(to right, transparent, ${pinkGlow}, transparent)`,
              boxShadow: `0 0 4px ${pinkGlow}`,
              animation: 'scanLaser 1.5s ease-in-out infinite alternate'
            }} />
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: pinkGlow }} />
          </div>
        )
      case 'Voice Mode':
        return (
          <div style={{ position: 'relative', width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="voice-radar-pulse" style={{ border: `1px solid ${pinkGlow}`, animationDuration: '2s' }} />
            <div style={{ width: 14, height: 14, borderRadius: '50%', background: 'rgba(255, 77, 166, 0.2)', border: `1.5px solid ${pinkGlow}` }} />
          </div>
        )
      case 'Helping':
        return (
          <div style={{ position: 'relative', width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: pinkGlow }} />
            {[0, 1, 2].map(i => (
              <div 
                key={i} 
                style={{
                  position: 'absolute', width: 2, height: 2, background: pinkGlow,
                  boxShadow: `0 0 4px ${pinkGlow}`,
                  animation: 'awayOrbit 3s infinite alternate',
                  animationDelay: `${i * 1.1}s`
                }} 
              />
            ))}
          </div>
        )
      case 'New Info':
        return (
          <div style={{ position: 'relative', width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: 'rgba(255, 77, 166, 0.45)', border: `1px solid ${pinkGlow}` }} />
            <span style={{ position: 'absolute', top: -1, right: -1, color: pinkGlow, fontSize: 10, fontWeight: 900, textShadow: `0 0 4px ${pinkGlow}` }}>✦</span>
          </div>
        )
      case 'Deep Focus':
        return (
          <div style={{
            width: 20, height: 20,
            borderRadius: '50%',
            background: 'transparent',
            border: `1.5px dashed rgba(255, 77, 166, 0.5)`,
            animation: 'spinOrbit 6s linear infinite'
          }} />
        )
      case 'End / Complete':
        return (
          <div style={{
            width: 20, height: 20,
            borderRadius: '50%',
            background: 'rgba(255, 77, 166, 0.15)',
            border: `1.5px solid ${pinkGlow}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: `0 0 10px rgba(255, 77, 166, 0.2)`
          }}>
            <span style={{ color: pinkGlow, fontSize: 10, fontWeight: 900 }}>✓</span>
          </div>
        )

      // 5. EMPTY / INACTIVE / OFFLINE STATES
      case 'Dim Idle':
        return (
          <div style={{
            width: 14, height: 14,
            borderRadius: '50%',
            background: pinkGlow,
            opacity: 0.3,
            boxShadow: `0 0 4px ${pinkGlow}`
          }} />
        )
      case 'Very Low':
        return (
          <div style={{
            width: 14, height: 14,
            borderRadius: '50%',
            background: 'transparent',
            border: `1px solid rgba(255, 77, 166, 0.35)`,
            boxShadow: `0 0 4px rgba(255, 77, 166, 0.1)`
          }} />
        )
      case 'Offline / Hidden':
        return (
          <div style={{
            width: 16, height: 16,
            borderRadius: '50%',
            background: 'transparent',
            border: `1.2px dashed rgba(255, 77, 166, 0.3)`
          }} />
        )
      case 'Sleeping':
        return (
          <div style={{ position: 'relative', width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{
              width: 12, height: 12, borderRadius: '50%',
              background: 'rgba(255, 77, 166, 0.2)', border: `1.2px solid ${pinkGlow}`,
              animation: 'pulseCore 4s ease-in-out infinite'
            }} />
            <span style={{
              position: 'absolute', top: -4, right: -4,
              color: pinkGlow, fontSize: 8, fontWeight: 700,
              animation: 'awayOrbit 3s infinite alternate'
            }}>\uD83D\uDECC\u2728</span>
          </div>
        )
      case 'Away':
        return (
          <div style={{
            width: 14, height: 14,
            borderRadius: '50%',
            background: 'transparent',
            border: `1.2px solid ${pinkGlow}`,
            opacity: 0.45,
            animation: 'pulseSleep 3s infinite'
          }} />
        )
      case 'Do Not Disturb':
        return (
          <div style={{ position: 'relative', width: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 14, height: 14, borderRadius: '50%', background: 'rgba(255, 77, 166, 0.35)', border: `1.2px solid ${pinkGlow}` }} />
            <div style={{
              position: 'absolute', bottom: 1.5, width: 8, height: 1.5,
              background: pinkGlow, borderRadius: 1
            }} />
          </div>
        )
      case 'Error':
        return (
          <div style={{
            width: 18, height: 18,
            borderRadius: '50%',
            background: 'transparent',
            border: `1.5px solid ${pinkGlow}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: `0 0 10px rgba(255, 77, 166, 0.25)`
          }}>
            <span style={{ color: pinkGlow, fontSize: 9, fontWeight: 900 }}>✕</span>
          </div>
        )
      default:
        return <div style={{ width: 12, height: 12, borderRadius: '50%', background: pinkGlow }} />
    }
  }

  return (
    <div 
      onClick={() => {
        playFluteClick()
        onClick()
      }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px 12px',
        background: active 
          ? 'rgba(255, 77, 166, 0.08)' 
          : (isDark ? 'rgba(255,255,255,0.01)' : 'rgba(0,0,0,0.005)'),
        border: active 
          ? `1.5px solid ${pinkGlow}` 
          : `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
        borderRadius: 16,
        cursor: 'pointer',
        transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        minWidth: 85,
        minHeight: 85,
        boxSizing: 'border-box'
      }}
      onMouseEnter={e => {
        playFluteHover()
        if (!active) {
          e.currentTarget.style.background = isDark ? 'rgba(255,77,166,0.04)' : 'rgba(255,77,166,0.02)'
          e.currentTarget.style.borderColor = 'rgba(255, 77, 166, 0.4)'
          e.currentTarget.style.transform = 'translateY(-2px)'
        }
      }}
      onMouseLeave={e => {
        if (!active) {
          e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.01)' : 'rgba(0,0,0,0.005)'
          e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'
          e.currentTarget.style.transform = 'none'
        }
      }}
    >
      <div style={{ height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {renderCircle()}
      </div>
      <span style={{
        marginTop: 10,
        fontSize: 9.5,
        fontWeight: 700,
        color: active ? pinkGlow : (isDark ? '#a1a1a6' : '#515156'),
        textAlign: 'center',
        fontFamily: 'var(--font-mono)',
        whiteSpace: 'nowrap'
      }}>
        {name}
      </span>
    </div>
  )
}

/* ── MAIN INTERACTIVE SPEC SHEET COMPONENT ── */
export default function SpecSheet({ onClose }) {
  const [theme, setTheme] = useState('light') // Standalone Spec Sheet background (White for infographic grid as requested!)
  const [selectedState, setSelectedState] = useState('Idle - Loop')
  const [copied, setCopied] = useState(false)

  // Escape key support to dismiss overlay
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  const copyCode = (text) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const spec = STATE_SPECS[selectedState] || STATE_SPECS['Idle - Loop']
  const isDark = theme === 'dark'
  const pinkGlow = '#FF4DA6'

  // Colors based on Spec Sheet theme selection (Light mode matching the requested infographic style by default!)
  const bgColor = isDark ? '#0c0d12' : '#ffffff'
  const panelBg = isDark ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.015)'
  const textColor = isDark ? '#ffffff' : '#0a0b0d'
  const subtextColor = isDark ? '#a1a1a6' : '#515156'
  const borderCol = isDark ? 'rgba(255, 77, 166, 0.15)' : 'rgba(255, 77, 166, 0.25)'

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: bgColor,
      zIndex: 99999999,
      display: 'flex',
      flexDirection: 'column',
      overflowY: 'auto',
      fontFamily: 'var(--font-body)',
      color: textColor,
      transition: 'background 0.3s ease',
      boxSizing: 'border-box'
    }}>
      
      {/* ── TOP HEADER ACTION BAR ── */}
      <header style={{
        padding: '16px 24px',
        borderBottom: `1px solid ${borderCol}`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: isDark ? 'rgba(12, 13, 18, 0.9)' : 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(20px)',
        position: 'sticky',
        top: 0,
        zIndex: 10
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: pinkGlow, boxShadow: `0 0 8px ${pinkGlow}` }} />
          <div>
            <h1 style={{ margin: 0, fontSize: 15, fontWeight: 800, letterSpacing: '0.04em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
              Breathing Circle Logo – States Sprite Sheet
            </h1>
            <span style={{ fontSize: 11, color: subtextColor, marginTop: 2, display: 'block' }}>
              A minimal breathing circle logo used in the assistant notch component.
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          {/* Light/Dark Toggle */}
          <div style={{
            display: 'flex',
            background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
            padding: 3,
            borderRadius: 20,
            border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`
          }}>
            <button 
              onClick={() => {
                playFluteClick()
                setTheme('light')
              }}
              onMouseEnter={playFluteHover}
              style={{
                border: 'none', background: !isDark ? '#ffffff' : 'none',
                color: !isDark ? pinkGlow : '#a1a1a6',
                padding: '4px 12px', fontSize: 10.5, fontWeight: 700, borderRadius: 16,
                cursor: 'pointer', transition: 'all 0.2s'
              }}
            >
              LIGHT
            </button>
            <button 
              onClick={() => {
                playFluteClick()
                setTheme('dark')
              }}
              onMouseEnter={playFluteHover}
              style={{
                border: 'none', background: isDark ? 'rgba(255, 77, 166, 0.25)' : 'none',
                color: isDark ? '#ffffff' : '#515156',
                padding: '4px 12px', fontSize: 10.5, fontWeight: 700, borderRadius: 16,
                cursor: 'pointer', transition: 'all 0.2s'
              }}
            >
              DARK
            </button>
          </div>

          {/* Close Spec Sheet Overlay */}
          <button 
            onClick={() => {
              playFluteClick()
              onClose()
            }}
            style={{
              padding: '6px 14px', borderRadius: 20, background: pinkGlow,
              border: 'none', color: '#ffffff', fontSize: 11, fontWeight: 700,
              cursor: 'pointer', boxShadow: `0 4px 12px rgba(255, 77, 166, 0.35)`,
              display: 'flex', alignItems: 'center', gap: 6, transition: 'all 0.2s'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'scale(1.05)'
              playFluteHover()
            }}
            onMouseLeave={e => e.currentTarget.style.transform = 'none'}
          >
            <span>CLOSE</span>
            <span style={{ fontSize: 9.5, opacity: 0.8, fontFamily: 'var(--font-mono)' }}>ESC</span>
          </button>
        </div>
      </header>

      {/* ── MAIN WORKSPACE split grid ── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 340px',
        flex: 1,
        minHeight: 0
      }} className="spec-split-grid">
        
        {/* LEFT COLUMN: INTERACTIVE SPRITE GRID GROUPED BY SPEC */}
        <div style={{
          padding: '24px 30px',
          borderRight: `1px solid ${borderCol}`,
          display: 'flex',
          flexDirection: 'column',
          gap: 28
        }}>
          
          {/* SECTION 1: IDLE / BREATHING STATES */}
          <div>
            <h2 style={{ fontSize: 11.5, fontFamily: 'var(--font-mono)', fontWeight: 800, color: pinkGlow, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>
              1. Idle / Breathing States
            </h2>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {['Idle - Min', 'Breathing In', 'Breathing Max', 'Breathing Out', 'Idle - Loop'].map(name => (
                <InteractiveCircleSpec 
                  key={name} name={name} 
                  active={selectedState === name} 
                  onClick={() => setSelectedState(name)}
                  theme={theme}
                />
              ))}
            </div>
          </div>

          {/* SECTION 2: THINKING / PROCESSING STATES */}
          <div>
            <h2 style={{ fontSize: 11.5, fontFamily: 'var(--font-mono)', fontWeight: 800, color: pinkGlow, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>
              2. Thinking / Processing States
            </h2>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {['Thinking - Dots', 'Thinking - Orbit', 'Thinking - Pulse', 'Processing - Spin', 'Processing - Particles', 'Processing - Wave', 'Typing'].map(name => (
                <InteractiveCircleSpec 
                  key={name} name={name} 
                  active={selectedState === name} 
                  onClick={() => setSelectedState(name)}
                  theme={theme}
                />
              ))}
            </div>
          </div>

          {/* SECTION 3: ACTIVE / INTERACTION STATES */}
          <div>
            <h2 style={{ fontSize: 11.5, fontFamily: 'var(--font-mono)', fontWeight: 800, color: pinkGlow, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>
              3. Active / Interaction States
            </h2>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {['Hover', 'Pressed', 'Listening', 'Active / Focus', 'Success', 'Attention', 'Notification'].map(name => (
                <InteractiveCircleSpec 
                  key={name} name={name} 
                  active={selectedState === name} 
                  onClick={() => setSelectedState(name)}
                  theme={theme}
                />
              ))}
            </div>
          </div>

          {/* SECTION 4: CONTEXTUAL STATES */}
          <div>
            <h2 style={{ fontSize: 11.5, fontFamily: 'var(--font-mono)', fontWeight: 800, color: pinkGlow, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>
              4. Contextual States
            </h2>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {['Reading', 'Scrolling', 'Voice Mode', 'Helping', 'New Info', 'Deep Focus', 'End / Complete'].map(name => (
                <InteractiveCircleSpec 
                  key={name} name={name} 
                  active={selectedState === name} 
                  onClick={() => setSelectedState(name)}
                  theme={theme}
                />
              ))}
            </div>
          </div>

          {/* SECTION 5: EMPTY / INACTIVE / OFFLINE STATES */}
          <div>
            <h2 style={{ fontSize: 11.5, fontFamily: 'var(--font-mono)', fontWeight: 800, color: pinkGlow, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>
              5. Empty / Inactive & Offline States
            </h2>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {['Dim Idle', 'Very Low', 'Offline / Hidden', 'Sleeping', 'Away', 'Do Not Disturb', 'Error'].map(name => (
                <InteractiveCircleSpec 
                  key={name} name={name} 
                  active={selectedState === name} 
                  onClick={() => setSelectedState(name)}
                  theme={theme}
                />
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: CODE SPEC SIDEBAR PANEL & USAGE NOTES */}
        <aside style={{
          padding: 24,
          background: panelBg,
          display: 'flex',
          flexDirection: 'column',
          gap: 20
        }}>
          
          {/* SELECTED STATE SPECS & CODE VIEWER */}
          <div style={{
            padding: 20,
            background: isDark ? 'rgba(255,255,255,0.03)' : '#ffffff',
            border: `1.2px solid ${pinkGlow}`,
            borderRadius: 16,
            boxShadow: `0 8px 32px rgba(255, 77, 166, 0.06)`
          }}>
            <div style={{ display: 'flex', justify: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <span style={{ fontSize: 9.5, fontFamily: 'var(--font-mono)', fontWeight: 800, color: pinkGlow, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Selected Spec</span>
              <span style={{ fontSize: 11, fontWeight: 700, color: textColor }}>{selectedState}</span>
            </div>
            
            <p style={{ margin: '0 0 16px', fontSize: 11.5, color: subtextColor, lineHeight: 1.5 }}>
              {spec.desc}
            </p>

            {/* CSS KEYFRAMES BOX */}
            <div style={{ marginBottom: 12 }}>
              <span style={{ fontSize: 9, fontFamily: 'var(--font-mono)', fontWeight: 700, color: subtextColor, display: 'block', marginBottom: 6 }}>CSS Keyframes & Style:</span>
              <pre style={{
                margin: 0, padding: 12, background: isDark ? '#000000' : '#f7f7f9',
                borderRadius: 8, fontSize: 10, color: isDark ? '#ffffff' : '#000000',
                fontFamily: 'var(--font-mono)', overflowX: 'auto', border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}`
              }}>
                {spec.css}
              </pre>
            </div>

            {/* REACT MARKUP BOX */}
            <div style={{ marginBottom: 18 }}>
              <span style={{ fontSize: 9, fontFamily: 'var(--font-mono)', fontWeight: 700, color: subtextColor, display: 'block', marginBottom: 6 }}>React Element:</span>
              <pre style={{
                margin: 0, padding: 12, background: isDark ? '#000000' : '#f7f7f9',
                borderRadius: 8, fontSize: 10, color: isDark ? '#ffffff' : '#000000',
                fontFamily: 'var(--font-mono)', overflowX: 'auto', border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}`
              }}>
                {spec.react}
              </pre>
            </div>

            <button
              onClick={() => {
                playFluteClick()
                copyCode(spec.css + '\n\n' + spec.react)
              }}
              onMouseEnter={playFluteHover}
              style={{
                width: '100%', padding: '10px', borderRadius: 10, background: pinkGlow,
                border: 'none', color: '#ffffff', fontSize: 11, fontWeight: 700, cursor: 'pointer',
                transition: 'all 0.2s', boxShadow: `0 4px 12px rgba(255, 77, 166, 0.25)`
              }}
            >
              {copied ? '✓ COPIED!' : 'COPY CSS & REACT'}
            </button>
          </div>

          {/* USAGE NOTES CARD */}
          <div style={{
            padding: 16,
            background: isDark ? 'rgba(255,255,255,0.02)' : '#ffffff',
            border: `1.2px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
            borderRadius: 16
          }}>
            <h3 style={{ margin: '0 0 10px', fontSize: 11, fontFamily: 'var(--font-mono)', fontWeight: 800, color: pinkGlow, textTransform: 'uppercase' }}>
              Usage Notes
            </h3>
            <ul style={{ margin: 0, paddingLeft: 16, fontSize: 11, color: subtextColor, lineHeight: 1.6, display: 'flex', flexDirection: 'column', gap: 6 }}>
              <li>This circle represents the assistant's living core.</li>
              <li>It breathes dynamically in all idle states.</li>
              <li>Glow intensity increases on hover/active/listening.</li>
              <li>Dotted orbital ring spins reactively in thinking state.</li>
              <li>Uses soft bezier transitions and fluid hardware loops.</li>
            </ul>
          </div>

          {/* SIZING RESPONSIVE GUIDE */}
          <div style={{
            padding: 16,
            background: isDark ? 'rgba(255,255,255,0.02)' : '#ffffff',
            border: `1.2px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
            borderRadius: 16
          }}>
            <h3 style={{ margin: '0 0 12px', fontSize: 11, fontFamily: 'var(--font-mono)', fontWeight: 800, color: pinkGlow, textTransform: 'uppercase' }}>
              Size Guide (Responsive)
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { name: 'Desktop Size', sizes: [24, 28, 32, 40, 48] },
                { name: 'Tablet Size', sizes: [20, 24, 28, 32, 40] },
                { name: 'Mobile Size', sizes: [16, 20, 24, 28, 38] }
              ].map(g => (
                <div key={g.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: subtextColor }}>{g.name}</span>
                  <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                    {g.sizes.map((s, idx) => (
                      <div 
                        key={idx} 
                        style={{
                          width: s / 2.2, height: s / 2.2, borderRadius: '50%',
                          background: pinkGlow, opacity: 0.4 + (idx * 0.12),
                          boxShadow: `0 0 ${s / 6}px ${pinkGlow}`
                        }} 
                        title={`${s}px`}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </aside>

      </div>

      {/* ── RESPONSIVE MEDIA STYLING ── */}
      <style>{`
        @media (max-width: 960px) {
          .spec-split-grid {
            grid-template-columns: 1fr !important;
          }
          aside {
            border-top: 1px solid ${borderCol};
          }
        }
      `}</style>

    </div>
  )
}
