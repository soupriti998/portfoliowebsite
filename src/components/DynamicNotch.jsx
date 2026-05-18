import { useState, useRef, useEffect } from 'react'

/* ── Interactive State Dimension Specs ── */
const DIMS = {
  compact: { width: 365, height: 46, radius: 23 },
  expanded: { width: 500, height: 195, radius: 24 }, // Slightly taller for the new layout
  chat: { width: 450, height: 490, radius: 25 },
  voice: { width: 350, height: 270, radius: 25 },
  jdMatch: { width: 500, height: 450, radius: 25 }
}

/* ── Dynamic Breathing Circle & Status System (NO MASCOT, NO CAT) ── */
const StatusHUDIcon = ({ state, theme }) => {
  const pinkGlow = '#FF4DA6'

  if (state === 'voice' || state === 'listening') {
    // Pulse ambient voice waves
    return (
      <div style={{ display: 'flex', gap: 3, alignItems: 'center', height: 16, width: 26, justifyContent: 'center' }}>
        {[1, 2, 3, 4, 5].map(i => (
          <div 
            key={i} 
            style={{
              width: 2.2,
              height: '100%',
              background: pinkGlow,
              borderRadius: 1.5,
              animation: `ambientWave 0.6s ease-in-out infinite alternate`,
              animationDelay: `${i * 0.12}s`,
              boxShadow: `0 0 6px ${pinkGlow}`
            }} 
          />
        ))}
      </div>
    )
  }

  if (state === 'thinking') {
    // Dotted orbit ring + pulsating core matching thinking state
    return (
      <div style={{ position: 'relative', width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{
          position: 'absolute',
          width: 16, height: 16,
          borderRadius: '50%',
          border: `1.5px dashed ${pinkGlow}`,
          animation: 'spinOrbit 2s linear infinite',
          opacity: 0.8
        }} />
        <div style={{
          width: 6, height: 6,
          borderRadius: '50%',
          background: pinkGlow,
          boxShadow: `0 0 8px ${pinkGlow}`,
          animation: 'pulseCore 0.8s ease-in-out infinite alternate'
        }} />
      </div>
    )
  }

  if (state === 'processing') {
    // Spinning particle ring representing active process
    return (
      <div style={{ position: 'relative', width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{
          position: 'absolute',
          width: 16, height: 16,
          borderRadius: '50%',
          border: `1.5px solid rgba(255, 77, 166, 0.2)`,
          borderTopColor: pinkGlow,
          borderRightColor: pinkGlow,
          animation: 'spinOrbit 1s cubic-bezier(0.4, 0, 0.2, 1) infinite'
        }} />
        <div style={{
          width: 4, height: 4,
          borderRadius: '50%',
          background: theme === 'dark' ? '#ffffff' : '#0a0b0d',
          boxShadow: `0 0 4px ${theme === 'dark' ? '#ffffff' : 'rgba(0, 0, 0, 0.2)'}`
        }} />
      </div>
    )
  }

  if (state === 'scrolling') {
    // Scanning laser and sweep ring
    return (
      <div style={{ position: 'relative', width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{
          position: 'absolute',
          width: 18, height: 18,
          borderRadius: '50%',
          border: `1.2px solid rgba(255, 77, 166, 0.35)`,
          borderTopColor: pinkGlow,
          animation: 'spinOrbit 1.2s cubic-bezier(0.25, 1, 0.5, 1) infinite'
        }} />
        <div style={{
          position: 'absolute',
          width: '100%', height: 1.5,
          background: `linear-gradient(to right, transparent, ${pinkGlow}, transparent)`,
          boxShadow: `0 0 4px ${pinkGlow}`,
          animation: 'scanLaser 1.5s ease-in-out infinite alternate'
        }} />
        <div style={{
          width: 4, height: 4,
          borderRadius: '50%',
          background: theme === 'dark' ? '#ffffff' : '#0a0b0d',
          boxShadow: `0 0 4px ${theme === 'dark' ? '#ffffff' : 'rgba(0, 0, 0, 0.2)'}`
        }} />
      </div>
    )
  }

  if (state === 'inactive') {
    // Sleeping core (deep pulsing dim pink orb)
    return (
      <div style={{ position: 'relative', width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{
          width: 8, height: 8,
          borderRadius: '50%',
          background: 'rgba(255, 77, 166, 0.3)',
          border: '1px solid rgba(255, 77, 166, 0.5)',
          boxShadow: '0 0 6px rgba(255, 77, 166, 0.2)',
          animation: 'pulseSleep 3.5s ease-in-out infinite'
        }} />
      </div>
    )
  }

  // Default 'idle' - Slowly breathing pink neon circle
  return (
    <div style={{ position: 'relative', width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{
        position: 'absolute',
        width: 14, height: 14,
        borderRadius: '50%',
        background: 'rgba(255, 77, 166, 0.15)',
        filter: 'blur(3px)',
        animation: 'pulseCore 2.5s ease-in-out infinite alternate'
      }} />
      <div style={{
        position: 'absolute',
        width: 18, height: 18,
        borderRadius: '50%',
        border: '1.2px solid rgba(255, 77, 166, 0.25)',
        animation: 'pulseCore 2.5s ease-in-out infinite alternate'
      }} />
      <div style={{
        position: 'absolute',
        width: 3,
        height: 3,
        borderRadius: '50%',
        background: pinkGlow,
        boxShadow: `0 0 4px ${pinkGlow}`,
        animation: 'orbitParticle 3s linear infinite'
      }} />
      <div style={{
        width: 7,
        height: 7,
        borderRadius: '50%',
        background: pinkGlow,
        boxShadow: `0 0 8px ${pinkGlow}`
      }} />
    </div>
  )
}

/* ── Smart Contextual Status Resolver (Scroll, Reading Time, Inactivity, Active Project) ── */
const getSmartHUDState = (section, velocity, activeProj, inactive, readingSecs) => {
  // 1. Check if near bottom
  const scrollHeight = document.documentElement.scrollHeight
  const clientHeight = document.documentElement.clientHeight
  const isNearBottom = (window.scrollY + clientHeight) >= (scrollHeight - 150)

  if (isNearBottom) {
    return {
      text: "You've reached the end.",
      icon: "idle"
    }
  }

  // 2. Active Project Detail View open
  if (activeProj) {
    if (velocity > 0.4) {
      return {
        text: "Scanning case details...",
        icon: "scrolling"
      }
    }
    return {
      text: "Analyzing project patterns...",
      icon: "thinking"
    }
  }

  // 3. Inactive / Sleeping states
  if (inactive) {
    if (readingSecs > 45) {
      return {
        text: "Taking a tiny nap...",
        icon: "inactive"
      }
    }
    const inactivePool = [
      "Still here.",
      "Missed me?",
      "Whenever you're ready.",
      "Keeping an eye on things."
    ]
    const idx = Math.floor((window.scrollY / 250) % inactivePool.length)
    return {
      text: inactivePool[idx],
      icon: "inactive"
    }
  }

  // 4. Scroll Aware states
  if (velocity > 0.7) {
    return {
      text: "Deep-scroll mode on.",
      icon: "scrolling"
    }
  }

  if (velocity > 0.3) {
    return {
      text: "Keep going, I'm here.",
      icon: "scrolling"
    }
  }

  // 5. Reading deep states (time in current section)
  if (readingSecs > 14) {
    const readingPool = [
      "Reading this section",
      "Analyzing patterns",
      "Extracting key points",
      "Gathering insights"
    ]
    const idx = Math.floor((window.scrollY / 200) % readingPool.length)
    return {
      text: readingPool[idx],
      icon: "thinking"
    }
  }

  // 6. Section aware defaults
  const sectionPool = {
    hero: {
      text: "Exploring quietly",
      icon: "idle"
    },
    expertise: {
      text: "Let's talk ideas",
      icon: "idle"
    },
    projects: {
      text: "Exploring deep-scroll",
      icon: "idle"
    },
    about: {
      text: "Checking the details",
      icon: "idle"
    },
    journey: {
      text: "This part is important",
      icon: "idle"
    },
    contact: {
      text: "Ready when you are",
      icon: "idle"
    }
  }

  return sectionPool[section] || { text: "I'm here if you need me", icon: "idle" }
}

/* ── Chat replies dictionary ── */
const KB = {
  greet: ["Hmm... Hey! I am Luffy. Ask me anything about Soupriti's work, skills, or experience.", "Hmm... Hello! I'm Luffy — here to help you explore. What would you like to know?", "Hmm... Welcome! I'm Luffy. Feel free to ask me about Soupriti's projects, skills, or how to get in touch."],
  about: "Soupriti Das is a Product Designer based in Bangalore with 3+ years of experience designing HMI and SaaS products. She completed B.Des in Fashion Communication at NIFT Chennai. She simplifies complex systems into warm, human-centered experiences.",
  current: "Soupriti is currently a Product Designer at upliance.ai. She redesigned their device interface, reducing perceived cooking times by 24% and coding their scalable React design system from scratch.",
  skills: "Skills: End-to-end UX/UI, user research, data dashboard mapping, Figma interaction system design, and React/JS prototyping. She works closely with developers to ensure 100% engineering delivery.",
  projects: "Selected projects: One, AI Cooking Experience at upliance.ai. Two, Behavior-Driven Onboarding. Three, Smart Air Fryer UX. Four, Medpod Health Accessibility. Five, Battle Pass for LILA. Six, Doctorite Dashboard.",
  experience: "Career: Product Designer at upliance.ai (2024-Present), UI Designer at Divami Design Labs (2023-2024), Associate UX Designer at Incture (2022-2023), and Intern at HDFC Bank (2022).",
  contact: "Contact Soupriti: Email soupritidas123 at gmail dot com. Phone plus 91 8825442430. LinkedIn: linkedin.com/in/soupriti-das.",
  hiring: "Soupriti is currently open to senior product designer roles, AI and SaaS product teams, and senior design leadership roles. Let's work together!",
  fuck: "Let's focus on design systems and UX thinking instead.",
}

/* ── Fun Mode Data ── */
const FUN = {
  intro: [
    "Before we get serious… did someone say terrible joke?",
    "Time for a quick design systems break!",
    "I was trained on layout ratios and bad jokes equally.",
  ],
  jokes: [
    {
      id: 'alphabet',
      question: "Which is the coolest alphabet?",
      expectedAnswer: ["b"],
      followUp: "Why though? 👀",
      expectedFollowUp: ["because it has ac around it", "ac around it", "a/c", "ac"],
      correctFollowUp: ["HA! Passed the vibe check.", "Okay that was actually gold."],
      wrongFollowUp: ["It's B… because it has AC around it."],
      correctResponse: ["Nice! And do you know why?"],
      wrongResponse: ["It's B… because it has AC around it. Cool? AC? Okay, moving on."],
    },
    {
      id: 'designer-hate',
      question: "Why do designers hate bad UX?",
      expectedAnswer: ["why", "dont know", "idk", "no", "?"],
      correctResponse: ["Because it gives them emotional damage.", "Because somewhere a user is rage-clicking."],
      wrongResponse: [],
    },
    {
      id: 'designer-fear',
      question: "What's a designer's biggest fear?",
      expectedAnswer: ["what", "dont know", "idk", "no", "?"],
      correctResponse: ["'Can we make the logo bigger?'", "An engineer saying: 'This wasn't in the Figma.'"],
      wrongResponse: [],
    }
  ],
  playful: {
    thanks: ["You're officially my favorite visitor now!", "My island notch pixels are blushing."],
    compliment: ["Forwarding that compliment to Soupriti now!", "She'll act cool, but she's dancing."],
    confusion: ["Hmm… my UX brain needs more context.", "That unlocked a layout edgecase. Rephrase?"],
  }
}

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]
const matchesAny = (q, list) => list.some(s => q.includes(s))

function getResponse(input, jokeState, setJokeState, activeSection) {
  const q = input.toLowerCase().trim()

  if (jokeState) {
    const joke = FUN.jokes[jokeState.jokeIndex]
    if (jokeState.stage === 'followUp' && joke.followUp) {
      setJokeState(null)
      const isRight = matchesAny(q, joke.expectedFollowUp)
      return isRight ? pick(joke.correctFollowUp) : pick(joke.wrongFollowUp)
    }
    if (jokeState.stage === 'asked') {
      const isRight = matchesAny(q, joke.expectedAnswer)
      if (joke.followUp && isRight) {
        setJokeState({ jokeIndex: jokeState.jokeIndex, stage: 'followUp' })
        return pick(joke.correctResponse) + '\n\n' + joke.followUp
      }
      setJokeState(null)
      return isRight ? pick(joke.correctResponse) : (joke.wrongResponse.length ? pick(joke.wrongResponse) : pick(joke.correctResponse))
    }
  }

  // Highly contextual observer replies
  if (q.match(/what am i seeing|what is this|where am i|what section|what is here|explain this page|context/)) {
    if (activeSection === 'hero') {
      return "You are looking at the Hero section of Soupriti's portfolio! It outlines her background as a Lead Product Designer with 3+ years of experience crafting SaaS and AI-powered interfaces, plus a quick preview of her interactive AI notch. Press CTRL + L to speak to me!"
    }
    if (activeSection === 'expertise') {
      return "You are viewing the Expertise & Skills section! Here you can check out her core superpowers—Figma design systems, React front-end engineering, physical-digital IoT logic, and accessibility designs. Hover over any tile to interact!"
    }
    if (activeSection === 'projects') {
      return "You are exploring the Selected Projects section! This features case studies from upliance.ai (where she achieved a 24% increase in cooking task completion speed), behavior-driven onboarding platforms, smart air fryer devices, and doctor-facing diagnostic dashboards."
    }
    if (activeSection === 'about') {
      return "You are looking at the Bento-grid About section! Here you can see Soupriti's profile portrait, explore her NIFT Chennai design background, read her core qualities, strategic processes, and personal telemetry. Click on any tile to stream my thought logs!"
    }
    if (activeSection === 'journey') {
      return "You are looking at Soupriti's Career Journey timeline! It traces her path from NIFT Chennai through Brandshape, Incture Technologies, Divami Design Labs, up to her current role at upliance.ai."
    }
    if (activeSection === 'contact') {
      return "You are at the Contact section! This is the perfect place to reach out to Soupriti at soupritidas123@gmail.com, find her LinkedIn, or grab her resume to hire her for your product team!"
    }
    return "You are exploring Soupriti's premium interactive portfolio! I am tracking your active section in real-time. Ask me about her upliance work, skills, or NIFT design foundation anytime."
  }

  if (q.match(/joke|fun|funny|laugh|entertain/)) {
    const idx = Math.floor(Math.random() * FUN.jokes.length)
    const joke = FUN.jokes[idx]
    setJokeState({ jokeIndex: idx, stage: 'asked' })
    return pick(FUN.intro) + '\n\n' + joke.question
  }

  if (q.match(/thank|thanks/)) return pick(FUN.playful.thanks)
  if (q.match(/love|amazing|great|nice|beautiful/)) return pick(FUN.playful.compliment)
  if (q.match(/hi|hello|hey|luffy/)) return "Hmm... hey I am luffy, I can help you being more contextual about soupriti's portfolio."
  if (q.match(/who|about|soupriti|herself|person/)) return KB.about
  if (q.match(/current|now|today|upliance/)) return KB.current
  if (q.match(/fuck|bitch/)) return KB.fuck
  if (q.match(/skill|tool|figma|framer|know|capabilit/)) return KB.skills
  if (q.match(/project|work/)) return KB.projects
  if (q.match(/experienc|career|job|company|history/)) return KB.experience
  if (q.match(/contact|email|reach|linkedin/)) return KB.contact
  if (q.match(/hire|open|availabl|role/)) return KB.hiring
  if (q.match(/education|degree|nift/)) return "Soupriti holds a Bachelor of Design in Fashion Communication from NIFT Chennai, graduating in 2022. This design foundation informs her visual sensibility and systems thinking."

  return pick(FUN.playful.confusion) + '\n\nI can tell you about Soupriti\'s projects, skills, experience, or tell a joke!'
}

/* ── TTS Synthesizer voice ── */
function speak(text, onEnd) {
  if (!window.speechSynthesis) return
  window.speechSynthesis.cancel()
  const clean = text.replace(/[•\n]/g, '. ').replace(/\d+\./g, '').trim()
  const utt = new SpeechSynthesisUtterance(clean)
  utt.rate = 1.05; utt.pitch = 1.1; utt.volume = 1
  const setVoice = () => {
    const voices = window.speechSynthesis.getVoices()
    const preferred = voices.find(v => /female|zira|samantha|karen|moira/i.test(v.name))
      || voices.find(v => v.lang.startsWith('en')) || voices[0]
    if (preferred) utt.voice = preferred
    window.speechSynthesis.speak(utt)
    if (onEnd) utt.onend = onEnd
  }
  if (window.speechSynthesis.getVoices().length) setVoice()
  else window.speechSynthesis.onvoiceschanged = setVoice
}

/* ── Synthesizer sound generator ── */
let sharedAudioCtx = null
const playSound = (type) => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext
    if (!AudioContext) return
    if (!sharedAudioCtx) sharedAudioCtx = new AudioContext()
    if (sharedAudioCtx.state === 'suspended') sharedAudioCtx.resume()
    const ctx = sharedAudioCtx
    const now = ctx.currentTime

    if (type === 'bell') {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(1100, now)
      gain.gain.setValueAtTime(0.015, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(now)
      osc.stop(now + 0.18)
    } else if (type === 'pop') {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'triangle'
      osc.frequency.setValueAtTime(160, now)
      osc.frequency.exponentialRampToValueAtTime(320, now + 0.08)
      gain.gain.setValueAtTime(0.02, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(now)
      osc.stop(now + 0.08)
    }
  } catch (e) {
    console.warn(e)
  }
}

/* ── High-Fidelity Vector Icons ── */
const DocIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
  </svg>
)

const SummaryIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="21" y1="10" x2="3" y2="10"/>
    <line x1="21" y1="6" x2="3" y2="6"/>
    <line x1="21" y1="14" x2="3" y2="14"/>
    <line x1="21" y1="18" x2="3" y2="18"/>
  </svg>
)

const MicIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/>
  </svg>
)

const MicLargeIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/>
  </svg>
)

const ScanJDIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
    <polyline points="14 2 14 8 20 8"/>
    <path d="M8 13h8"/>
    <path d="M8 17h8"/>
    <path d="M10 9H8"/>
  </svg>
)

const ChatIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
)

const CloseIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
)

const SendIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
)

const GearIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'spin 2.2s linear infinite' }}>
    <circle cx="12" cy="12" r="3"/>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
  </svg>
)

const VolumeIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--accent)' }}>
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
  </svg>
)

function TypingText({ text, speed = 20 }) {
  const [currentText, setCurrentText] = useState(text)
  const [displayedText, setDisplayedText] = useState(text)
  const [index, setIndex] = useState(text.length)
  const [rollClass, setRollClass] = useState('roll-idle')

  useEffect(() => {
    if (text === currentText) return

    setRollClass('roll-out')
    
    const outTimeout = setTimeout(() => {
      setCurrentText(text)
      setDisplayedText('')
      setIndex(0)
      setRollClass('roll-in')
    }, 220)

    return () => clearTimeout(outTimeout)
  }, [text, currentText])

  useEffect(() => {
    if (rollClass === 'roll-in' || rollClass === 'roll-idle') {
      if (index < currentText.length) {
        const timeout = setTimeout(() => {
          setDisplayedText(prev => prev + currentText.charAt(index))
          setIndex(prev => prev + 1)
        }, speed)
        return () => clearTimeout(timeout)
      } else if (rollClass === 'roll-in') {
        setRollClass('roll-idle')
      }
    }
  }, [index, currentText, speed, rollClass])

  const isComplete = index >= currentText.length

  let animation = 'none'
  if (rollClass === 'roll-out') {
    animation = 'rollOut 0.22s cubic-bezier(0.77, 0, 0.175, 1) forwards'
  } else if (rollClass === 'roll-in') {
    animation = 'rollIn 0.28s cubic-bezier(0.16, 1, 0.3, 1) forwards'
  }

  return (
    <span style={{ 
      display: 'inline-block', 
      overflow: 'hidden',
      verticalAlign: 'bottom',
      maxWidth: '100%'
    }}>
      <span style={{
        display: 'inline-block',
        animation,
        whiteSpace: 'nowrap'
      }}>
        {displayedText}
        {!isComplete && rollClass !== 'roll-out' && (
          <span style={{ 
            color: '#FF4DA6', 
            marginLeft: 2, 
            animation: 'blinkCursor 0.8s step-end infinite',
            fontWeight: 800
          }}>|</span>
        )}
      </span>
    </span>
  )
}

export default function DynamicNotch({ activeProject }) {
  const [notchState, setNotchState] = useState('compact') // compact, expanded, chat, voice
  const [activeSection, setActiveSection] = useState('hero')
  const [scrollVelocity, setScrollVelocity] = useState(0)
  const lastScrollY = useRef(0)
  
  // Custom HUD States
  const [inactivityState, setInactivityState] = useState(false)
  const [readingTime, setReadingTime] = useState(0)
  const [translateY, setTranslateY] = useState(0)
  
  // Dynamic Global Theme Tracker (Modularity preserved!)
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.getAttribute('data-theme') || 'dark'
    }
    return 'dark'
  })

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const current = document.documentElement.getAttribute('data-theme') || 'dark'
      setTheme(current)
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    return () => observer.disconnect()
  }, [])
  
  // Chat States
  const [messages, setMessages] = useState([{ from: 'bot', text: "Hmm... Hey! I'm Luffy. I can help you co-pilot and explore Soupriti's work contextually. Ask me anything!" }])
  const [chatInput, setChatInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [jokeState, setJokeState] = useState(null)
  
  // Voice Mode States
  const [voiceStatus, setVoiceStatus] = useState('idle') // listening, thinking, replying, idle
  const [voiceSpeechText, setVoiceSpeechText] = useState('')
  const recRef = useRef(null)
  const chatEndRef = useRef(null)

  // JD Matcher States
  const [jdText, setJdText] = useState('')
  const [jdFileName, setJdFileName] = useState('')
  const [isScanning, setIsScanning] = useState(false)
  const [matchResult, setMatchResult] = useState(null)

  // Dynamic Height Hugging States
  const contentRef = useRef(null)
  const [dynamicHeight, setDynamicHeight] = useState(null)

  useEffect(() => {
    if (notchState === 'compact') {
      setDynamicHeight(null)
      return
    }

    const element = contentRef.current
    if (!element) return

    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setDynamicHeight(entry.target.scrollHeight)
      }
    })

    observer.observe(element)
    setDynamicHeight(element.scrollHeight)

    return () => observer.disconnect()
  }, [notchState, matchResult, isScanning, messages, voiceStatus])

  const handleAnalyzeJD = async (textToScan) => {
    const rawText = (textToScan || jdText || '').trim()
    if (!rawText && !jdFileName) return

    setIsScanning(true)
    setMatchResult(null)

    // Simulate futuristic scan duration
    await new Promise(r => setTimeout(r, 2000))

    // Heuristics Score engine
    let score = 78 // solid baseline for a world-class designer
    const textLower = rawText.toLowerCase()

    const matches = {
      figma: textLower.includes('figma'),
      designSystem: textLower.includes('system') || textLower.includes('token') || textLower.includes('library'),
      ai: textLower.includes('ai') || textLower.includes('artificial') || textLower.includes('intelligence') || textLower.includes('gpt') || textLower.includes('llm') || textLower.includes('agent'),
      saas: textLower.includes('saas') || textLower.includes('b2b') || textLower.includes('enterprise') || textLower.includes('dashboard') || textLower.includes('data'),
      react: textLower.includes('react') || textLower.includes('frontend') || textLower.includes('code') || textLower.includes('javascript') || textLower.includes('html') || textLower.includes('css'),
      interaction: textLower.includes('interaction') || textLower.includes('animation') || textLower.includes('micro') || textLower.includes('motion')
    }

    if (matches.figma) score += 4
    if (matches.designSystem) score += 4
    if (matches.ai) score += 5
    if (matches.saas) score += 4
    if (matches.react) score += 3
    if (matches.interaction) score += 3

    // Cap at 98% because there is always room for custom creative iterations
    score = Math.min(98, score)

    // Generate Tailored Summary
    let summaryPoints = []
    if (matches.ai) {
      summaryPoints.push("Soupriti excels in designing advanced AI user experiences—including agentic UI flows, floating HUD control units, and conversational co-pilots like Luffy.")
    }
    if (matches.designSystem) {
      summaryPoints.push("She builds scalable, tokenized design systems with clear multi-theme (light/dark) engineering and robust semantic tokens.")
    }
    if (matches.saas || matches.interaction) {
      summaryPoints.push("She specializes in high-density SaaS dashboards, simplifying complex data hierarchies with interactive widgets and organic micro-interactions.")
    }
    if (matches.react) {
      summaryPoints.push("Her design engineering skills allow her to bridge the design-to-development gap seamlessly, writing clean component logic in React/Vite.")
    }

    if (summaryPoints.length === 0) {
      summaryPoints.push("Soupriti Das fits this profile excellently, bringing production-ready product design expertise, high-fidelity interactive prototyping, and pixel-perfect aesthetics.")
    }

    setMatchResult({
      score,
      summary: summaryPoints.join(" ")
    })
    setIsScanning(false)
  }

  // 1. SECTION INTERSECTION OBSERVER
  useEffect(() => {
    const sections = ['hero', 'expertise', 'projects', 'about', 'journey', 'contact']
    const callback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }
    const observer = new IntersectionObserver(callback, { root: null, threshold: 0.35 })
    sections.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  // 2. SCROLL VELOCITY / ACCELERATION LISTENER & ANTI-GRAVITY DRIFT
  useEffect(() => {
    let timer
    const handleScroll = () => {
      const cy = window.scrollY
      const diffY = cy - lastScrollY.current
      const absDiff = Math.abs(diffY)
      
      setScrollVelocity(Math.min(2.5, absDiff / 10))
      
      // Calculate smooth anti-gravity lag offset (max 6px drift)
      const drift = Math.max(-6, Math.min(6, diffY * 0.08))
      setTranslateY(drift)
      
      lastScrollY.current = cy

      clearTimeout(timer)
      timer = setTimeout(() => {
        setScrollVelocity(0)
        setTranslateY(0) // Smoothly recover back to zero gravity center
      }, 150)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(timer)
    }
  }, [])

  // 2.1 INACTIVITY TRACKER (8s mouse/scroll stillness triggers system idle mode)
  useEffect(() => {
    let activeTimer
    const resetTimer = () => {
      setInactivityState(false)
      clearTimeout(activeTimer)
      activeTimer = setTimeout(() => {
        setInactivityState(true)
      }, 8000)
    }
    
    window.addEventListener('mousemove', resetTimer, { passive: true })
    window.addEventListener('scroll', resetTimer, { passive: true })
    window.addEventListener('keydown', resetTimer, { passive: true })
    window.addEventListener('click', resetTimer, { passive: true })
    
    resetTimer()
    
    return () => {
      window.removeEventListener('mousemove', resetTimer)
      window.removeEventListener('scroll', resetTimer)
      window.removeEventListener('keydown', resetTimer)
      window.removeEventListener('click', resetTimer)
      clearTimeout(activeTimer)
    }
  }, [])

  // 2.2 READING TIMER (Tracks active exploration duration per section)
  useEffect(() => {
    setReadingTime(0)
    const interval = setInterval(() => {
      setReadingTime(prev => prev + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [activeSection])

  // 3. KEYBOARD CTRL + L DETECTOR (Voice Toggle)
  useEffect(() => {
    const handleKey = (e) => {
      if (e.ctrlKey && e.code === 'KeyL') {
        e.preventDefault()
        playSound('bell')
        setNotchState(current => {
          if (current === 'voice') {
            stopVoiceRecognition()
            return 'compact'
          }
          setTimeout(() => startVoiceRecognition(), 200)
          return 'voice'
        })
      }
      if (e.code === 'Escape') {
        setNotchState('compact')
        stopVoiceRecognition()
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  // Scroll Chat thread
  useEffect(() => {
    if (notchState === 'chat') {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, notchState])

  // 4. SPEECH RECOGNITION (VOICE STT ENGINE)
  const startVoiceRecognition = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SR) {
      alert('Voice Mode requires Google Chrome.')
      setNotchState('compact')
      return
    }
    window.speechSynthesis?.cancel()
    setVoiceStatus('listening')
    setVoiceSpeechText('Listening...')
    
    const rec = new SR()
    rec.lang = 'en-IN'
    rec.interimResults = false
    rec.maxAlternatives = 1
    
    rec.onresult = async (e) => {
      const transcript = e.results[0][0].transcript
      setVoiceStatus('thinking')
      setVoiceSpeechText(`"${transcript}"`)
      
      await new Promise(r => setTimeout(r, 800)) // Cognitive delay
      
      setJokeState(currentJoke => {
        const reply = getResponse(transcript, currentJoke, setJokeState, activeSection)
        setVoiceStatus('replying')
        setVoiceSpeechText('Speaking...')
        
        speak(reply, () => {
          setVoiceStatus('idle')
          setVoiceSpeechText('Click center to speak again')
        })
        return currentJoke
      })
    }
    rec.onerror = () => {
      setVoiceStatus('idle')
      setVoiceSpeechText('Microphone error. Click to retry.')
    }
    rec.onresult = rec.onresult.bind(rec)
    rec.start()
    recRef.current = rec
  }

  const stopVoiceRecognition = () => {
    window.speechSynthesis?.cancel()
    if (recRef.current) {
      recRef.current.stop()
      recRef.current = null
    }
    setVoiceStatus('idle')
  }

  // 5. CHAT TEXT TRANSMISSION
  const handleSendChat = async (text) => {
    const trimmed = text.trim()
    if (!trimmed) return
    setChatInput('')
    setMessages(prev => [...prev, { from: 'user', text: trimmed }])
    
    setIsTyping(true)
    await new Promise(r => setTimeout(r, 600 + Math.random() * 300))
    setIsTyping(false)

    setJokeState(currentJoke => {
      const reply = getResponse(trimmed, currentJoke, setJokeState, activeSection)
      setMessages(prev => [...prev, { from: 'bot', text: reply }])
      playSound('pop')
      return currentJoke
    })
  }

  // Scroll to section
  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) {
      playSound('pop')
      el.scrollIntoView({ behavior: 'smooth' })
      setNotchState('compact')
    }
  }

  // Dynamic Dims calculation
  const getDims = () => {
    if (notchState === 'compact') return DIMS.compact
    if (notchState === 'chat') return DIMS.chat
    if (notchState === 'voice') return DIMS.voice
    if (notchState === 'jdMatch') return DIMS.jdMatch
    return DIMS.expanded
  }

  const currentDim = getDims()

  // Colors & Aesthetic Tokens
  const isDark = theme === 'dark'
  const bgColor = isDark ? 'rgba(10, 10, 12, 0.88)' : 'rgba(244, 244, 245, 0.88)'
  const textColor = isDark ? '#ffffff' : '#0a0b0d'
  const subtextColor = isDark ? '#a1a1a6' : '#515156'
  const accentColor = '#FF4DA6' // Glowing Pink
  const borderTint = isDark ? 'rgba(255, 77, 166, 0.15)' : 'rgba(255, 77, 166, 0.3)'
  const glowShadow = isDark 
    ? '0 8px 32px rgba(255, 77, 166, 0.08), inset 0 1px 0 rgba(255,255,255,0.05)'
    : '0 8px 32px rgba(255, 77, 166, 0.06), inset 0 1px 0 rgba(255,255,255,0.2)'

  // Inertia squash momentum calculation
  const transformScale = notchState === 'compact' 
    ? `translateX(-50%) scaleX(${1 + scrollVelocity * 0.04}) scaleY(${1 - scrollVelocity * 0.02})`
    : `translateX(-50%) scale(1)`

  return (
    <>
      <nav
        id="dynamic-island-notch"
        style={{
          position: 'fixed',
          top: 0,
          left: '50%',
          transform: `${transformScale} translateY(${translateY}px)`,
          width: currentDim.width,
          height: notchState === 'compact' ? DIMS.compact.height : (dynamicHeight ? dynamicHeight : currentDim.height),
          borderBottomLeftRadius: currentDim.radius,
          borderBottomRightRadius: currentDim.radius,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          background: bgColor,
          borderTop: 'none',
          borderLeft: `1.2px solid ${borderTint}`,
          borderRight: `1.2px solid ${borderTint}`,
          borderBottom: `1.2px solid ${borderTint}`,
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          boxShadow: glowShadow,
          zIndex: 999999,
          overflow: 'hidden',
          transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.1s ease-out', // Super smooth spring-physics easing
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}
        onMouseEnter={() => {
          if (notchState === 'compact') {
            playSound('bell')
            setNotchState('expanded')
          }
        }}
        onMouseLeave={() => {
          if (notchState === 'expanded') {
            setNotchState('compact')
          }
        }}
      >
        
        {/* Absolute Left bezel Wing Flare */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: -24,
          width: 24,
          height: 24,
          background: 'transparent',
          pointerEvents: 'none',
          borderTopRightRadius: 24,
          boxShadow: `12px -12px 0 0 ${bgColor}`,
          transition: 'box-shadow 0.4s ease'
        }} />

        {/* Absolute Right bezel Wing Flare */}
        <div style={{
          position: 'absolute',
          top: 0,
          right: -24,
          width: 24,
          height: 24,
          background: 'transparent',
          pointerEvents: 'none',
          borderTopLeftRadius: 24,
          boxShadow: `-12px -12px 0 0 ${bgColor}`,
          transition: 'box-shadow 0.4s ease'
        }} />

        {/* STATE 1: COMPACT NOTCH */}
        {notchState === 'compact' && (() => {
          const hud = getSmartHUDState(activeSection, scrollVelocity, activeProject, inactivityState, readingTime);
          return (
            <div style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 12,
              padding: '0 20px',
              animation: 'fadeIn 0.25s ease-out'
            }}>
              {/* Glowing Breathing Circle */}
              <StatusHUDIcon state={hud.icon} theme={theme} />
              
              {/* Dynamic Contextual Text */}
              <span style={{
                fontSize: 12,
                fontFamily: 'var(--font-body)',
                fontWeight: 600,
                color: textColor,
                letterSpacing: '-0.015em',
                whiteSpace: 'nowrap',
                display: 'block'
              }}>
                Hi I am Luffy, press Ctrl + L to talk.
              </span>
            </div>
          );
        })()}

        {/* CONTENT DOCK WRAPPER FOR DYNAMIC HUGGING */}
        {notchState !== 'compact' && (
          <div ref={contentRef} style={{ width: '100%', display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}>
            {/* STATE 2: EXPANDED HUD DOCK */}
            {notchState === 'expanded' && (
              <div style={{
                width: '100%',
                height: 'auto',
            display: 'flex',
            flexDirection: 'column',
            padding: '16px 20px',
            animation: 'fadeIn 0.3s ease-out',
            boxSizing: 'border-box'
          }}>
            {/* Header: Ask Anything prompt & Breathing Circle */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 14
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <StatusHUDIcon state="idle" theme={theme} />
                <span style={{
                  fontSize: 13,
                  fontFamily: 'var(--font-body)',
                  fontWeight: 700,
                  color: textColor,
                  letterSpacing: '-0.01em'
                }}>
                  How can I assist you today?
                </span>
              </div>
              <span style={{
                fontSize: 10,
                fontFamily: 'var(--font-mono)',
                fontWeight: 700,
                color: 'rgba(255, 77, 166, 0.7)',
                letterSpacing: '0.04em',
                background: isDark ? 'rgba(255, 77, 166, 0.1)' : 'rgba(255, 77, 166, 0.15)',
                padding: '2px 8px',
                borderRadius: 10
              }}>
                CTRL + L
              </span>
            </div>

            {/* Quick Actions Grid (Quick Nav removed, Resume Download added) */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 8,
              marginBottom: 10,
              transition: 'all 0.3s ease'
            }}>
              {[
                { label: 'Ask Anything', icon: <ChatIcon />, type: 'button', action: () => setNotchState('chat') },
                { 
                  label: 'JD Matcher', 
                  icon: <ScanJDIcon />, 
                  type: 'button',
                  action: () => {
                    playSound('pop')
                    setNotchState('jdMatch')
                  } 
                },
                { 
                  label: 'Voice Mode', 
                  icon: <MicIcon />, 
                  type: 'button',
                  action: () => {
                    playSound('bell')
                    setNotchState('voice')
                    setTimeout(() => startVoiceRecognition(), 200)
                  } 
                }
              ].map(btn => (
                <button
                  key={btn.label}
                  onClick={btn.action}
                  style={{
                    background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                    border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)'}`,
                    borderRadius: 12,
                    padding: '8px 6px',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 4,
                    color: textColor,
                    transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = isDark ? 'rgba(255, 77, 166, 0.08)' : 'rgba(255, 77, 166, 0.05)';
                    e.currentTarget.style.borderColor = accentColor;
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 77, 166, 0.12)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)';
                    e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)';
                    e.currentTarget.style.transform = 'none';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{ color: 'inherit' }}>
                    {btn.icon}
                  </div>
                  <span style={{ fontSize: 10, fontWeight: 700, whiteSpace: 'nowrap' }}>{btn.label}</span>
                </button>
              ))}

              {/* Direct Resume Download Button Link */}
              <a
                href="/Soupriti_Das_Resume.pdf"
                download="Soupriti_Das_Resume.pdf"
                onClick={() => playSound('pop')}
                style={{
                  textDecoration: 'none',
                  background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                  border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)'}`,
                  borderRadius: 12,
                  padding: '8px 6px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 4,
                  color: textColor,
                  transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = isDark ? 'rgba(255, 77, 166, 0.08)' : 'rgba(255, 77, 166, 0.05)';
                  e.currentTarget.style.borderColor = accentColor;
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 77, 166, 0.12)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)';
                  e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)';
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ color: 'inherit' }}>
                  <DocIcon />
                </div>
                <span style={{ fontSize: 10, fontWeight: 700, whiteSpace: 'nowrap' }}>Resume ↗</span>
              </a>
            </div>

            {/* Quick Navigation Links Row (Directly visible on hover expanded!) */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 12px',
              background: isDark ? 'rgba(255, 77, 166, 0.05)' : 'rgba(255, 77, 166, 0.03)',
              borderRadius: 12,
              border: `1px solid ${isDark ? 'rgba(255, 77, 166, 0.15)' : 'rgba(255, 77, 166, 0.25)'}`,
              animation: 'fadeIn 0.2s ease-out'
            }}>
              {['Expertise', 'Projects', 'About', 'Journey', 'Contact'].map(label => {
                const target = label.toLowerCase();
                const isActive = activeSection === target;
                return (
                  <button
                    key={label}
                    onClick={() => scrollTo(target)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: isActive ? accentColor : subtextColor,
                      fontSize: 11,
                      fontWeight: isActive ? 800 : 600,
                      fontFamily: 'var(--font-mono)',
                      letterSpacing: '0.02em',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      textTransform: 'uppercase',
                      padding: '4px 6px',
                      borderRadius: 6
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.color = accentColor;
                      e.currentTarget.style.transform = 'translateY(-1px) scale(1.05)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.color = isActive ? accentColor : subtextColor;
                      e.currentTarget.style.transform = 'none';
                    }}
                  >
                    {label}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* STATE 3: AI CHAT CANOPY DOCK */}
        {notchState === 'chat' && (
          <div style={{
            width: '100%',
            height: '490px',
            display: 'flex',
            flexDirection: 'column',
            animation: 'fadeIn 0.3s ease-out',
            boxSizing: 'border-box'
          }}>
            {/* Header */}
            <div style={{
              width: '100%', padding: '14px 20px',
              borderBottom: `1.2px solid ${isDark ? 'rgba(255, 77, 166, 0.15)' : 'rgba(255, 77, 166, 0.25)'}`,
              display: 'flex', justifyContent: 'space-between', alignItems: 'center'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: accentColor, boxShadow: `0 0 6px ${accentColor}` }} />
                <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', fontWeight: 700, color: textColor, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Luffy Assistant</span>
              </div>
              <button 
                onClick={() => {
                  playSound('pop')
                  setNotchState('compact')
                }}
                style={{
                  background: 'none', border: 'none', color: subtextColor,
                  cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, fontSize: 11.5
                }}
                onMouseEnter={e => e.currentTarget.style.color = textColor}
                onMouseLeave={e => e.currentTarget.style.color = subtextColor}
              >
                <CloseIcon />
                <span>CLOSE</span>
              </button>
            </div>

            {/* Embedded Messages Thread */}
            <div style={{
              flex: 1, overflowY: 'auto', padding: '16px 20px',
              display: 'flex', flexDirection: 'column', gap: 12
            }}>
              {messages.map((m, i) => (
                <div 
                  key={i} 
                  style={{
                    alignSelf: m.from === 'user' ? 'flex-end' : 'flex-start',
                    maxWidth: '82%', padding: '10px 14px',
                    background: m.from === 'user' ? accentColor : (isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)'),
                    color: m.from === 'user' ? '#ffffff' : textColor, fontSize: 12, lineHeight: 1.5,
                    borderRadius: 12, border: m.from === 'bot' ? `1.2px solid ${isDark ? 'rgba(255, 77, 166, 0.12)' : 'rgba(255, 77, 166, 0.22)'}` : 'none',
                    boxShadow: m.from === 'user' ? `0 4px 12px rgba(255, 77, 166, 0.25)` : 'none'
                  }}
                >
                  {m.text}
                </div>
              ))}
              
              {isTyping && (
                <div style={{
                  alignSelf: 'flex-start', display: 'flex', gap: 4,
                  padding: '10px 14px', background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)',
                  borderRadius: 12, width: 'fit-content'
                }}>
                  {[0,1,2].map(i => <span key={i} style={{ width: 5, height: 5, borderRadius: '50%', background: accentColor, animation: `bounce 1.2s infinite ${i * 0.2}s` }} />)}
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Dynamic Suggestion Chips */}
            {messages.length === 1 && (
              <div style={{ display: 'flex', gap: 6, padding: '0 20px 12px', flexWrap: 'wrap' }}>
                {['Her work', 'Skills', 'Design joke', 'Contact'].map(chip => (
                  <button
                    key={chip}
                    onClick={() => {
                      const q = chip === 'Her work' ? 'Tell me about her projects' : (chip === 'Skills' ? 'What are her design skills?' : (chip === 'Design joke' ? 'Tell me a design joke' : 'How do I contact her?'))
                      handleSendChat(q)
                    }}
                    style={{
                      padding: '5px 12px', borderRadius: 20, background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.01)',
                      border: `1.2px solid ${isDark ? 'rgba(255, 77, 166, 0.15)' : 'rgba(255, 77, 166, 0.25)'}`, color: subtextColor,
                      fontSize: 10.5, cursor: 'pointer', transition: 'all 0.2s', fontWeight: 600
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = isDark ? 'rgba(255, 77, 166, 0.1)' : 'rgba(255, 77, 166, 0.05)';
                      e.currentTarget.style.borderColor = accentColor;
                      e.currentTarget.style.color = textColor;
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.01)';
                      e.currentTarget.style.borderColor = isDark ? 'rgba(255, 77, 166, 0.15)' : 'rgba(255, 77, 166, 0.25)';
                      e.currentTarget.style.color = subtextColor;
                    }}
                  >
                    {chip}
                  </button>
                ))}
              </div>
            )}

            {/* Input Form Box */}
            <div style={{
              padding: '10px 16px', borderTop: `1px solid ${isDark ? 'rgba(255, 77, 166, 0.15)' : 'rgba(255, 77, 166, 0.25)'}`,
              display: 'flex', gap: 8, alignItems: 'center'
            }}>
              <input
                type="text"
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSendChat(chatInput)}
                placeholder="Ask Luffy AI anything..."
                style={{
                  flex: 1, padding: '8px 14px', borderRadius: 20,
                  background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)', 
                  border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.1)'}`,
                  color: textColor, fontSize: 12, outline: 'none'
                }}
              />
              <button
                onClick={() => handleSendChat(chatInput)}
                disabled={!chatInput.trim()}
                style={{
                  width: 32, height: 32, borderRadius: '50%',
                  background: chatInput.trim() ? accentColor : (isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'),
                  color: 'white', border: 'none', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: chatInput.trim() ? `0 4px 10px rgba(255, 77, 166, 0.3)` : 'none',
                  transition: 'all 0.2s'
                }}
              >
                <SendIcon />
              </button>
            </div>

          </div>
        )}

        {/* STATE 5: JD PROFILE MATCHING CANOPY */}
        {notchState === 'jdMatch' && (
          <div style={{
            width: '100%',
            height: 'auto',
            display: 'flex',
            flexDirection: 'column',
            animation: 'fadeIn 0.3s ease-out',
            boxSizing: 'border-box'
          }}>
            {/* Header */}
            <div style={{
              width: '100%', padding: '14px 20px',
              borderBottom: `1.2px solid ${isDark ? 'rgba(255, 77, 166, 0.15)' : 'rgba(255, 77, 166, 0.25)'}`,
              display: 'flex', justifyContent: 'space-between', alignItems: 'center'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: accentColor, boxShadow: `0 0 6px ${accentColor}` }} />
                <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', fontWeight: 700, color: textColor, letterSpacing: '0.08em', textTransform: 'uppercase' }}>JD Fit Analyzer</span>
              </div>
              <button 
                onClick={() => {
                  playSound('pop')
                  setNotchState('compact')
                  setJdText('')
                  setJdFileName('')
                  setMatchResult(null)
                }}
                style={{
                  background: 'none', border: 'none', color: subtextColor,
                  cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, fontSize: 11.5
                }}
                onMouseEnter={e => e.currentTarget.style.color = textColor}
                onMouseLeave={e => e.currentTarget.style.color = subtextColor}
              >
                <CloseIcon />
                <span>CLOSE</span>
              </button>
            </div>

            {/* Content Switch */}
            {isScanning ? (
              <div style={{
                flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20
              }}>
                <div style={{ position: 'relative', width: 64, height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{
                    position: 'absolute', inset: 0, borderRadius: '50%',
                    border: `2.5px solid ${isDark ? 'rgba(255, 77, 166, 0.1)' : 'rgba(255, 77, 166, 0.2)'}`,
                    borderTopColor: accentColor,
                    animation: 'spinOrbit 1s cubic-bezier(0.4, 0, 0.2, 1) infinite'
                  }} />
                  <div style={{
                    position: 'absolute', width: '90%', height: 1.5, background: accentColor,
                    boxShadow: `0 0 8px ${accentColor}`,
                    animation: 'scanLaser 1.5s ease-in-out infinite alternate'
                  }} />
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: accentColor, boxShadow: `0 0 10px ${accentColor}` }} />
                </div>
                <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', fontWeight: 700, letterSpacing: '0.12em', color: accentColor, textTransform: 'uppercase' }}>
                  Scanning Profile Match...
                </span>
              </div>
            ) : matchResult ? (
              <div style={{
                flex: 1, display: 'flex', gap: 20, padding: '20px 24px', alignItems: 'center'
              }}>
                {/* Left Side: Score Circle */}
                <div style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8
                }}>
                  <div style={{
                    width: 90, height: 90, borderRadius: '50%',
                    border: `3px solid ${isDark ? 'rgba(255, 77, 166, 0.15)' : 'rgba(255, 77, 166, 0.25)'}`,
                    borderColor: `${accentColor} ${accentColor} transparent ${accentColor}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: `0 0 20px rgba(255, 77, 166, 0.15)`,
                    animation: 'pulseCore 2s ease-in-out infinite alternate',
                    position: 'relative'
                  }}>
                    <span style={{ fontSize: 24, fontWeight: 800, color: textColor, fontFamily: 'var(--font-mono)' }}>
                      {matchResult.score}%
                    </span>
                  </div>
                  <span style={{ fontSize: 9, fontFamily: 'var(--font-mono)', fontWeight: 700, opacity: 0.6, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                    Match Score
                  </span>
                </div>

                {/* Right Side: Description Summary & Action */}
                <div style={{
                  flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 12
                }}>
                  <div>
                    <h4 style={{ margin: '0 0 4px 0', fontSize: 12, fontWeight: 800, color: textColor, textTransform: 'uppercase', letterSpacing: '0.02em' }}>
                      Alignment Overview
                    </h4>
                    <p style={{ margin: 0, fontSize: 11.5, lineHeight: 1.5, color: subtextColor }}>
                      {matchResult.summary}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      playSound('pop')
                      setMatchResult(null)
                      setJdText('')
                      setJdFileName('')
                    }}
                    style={{
                      alignSelf: 'flex-start',
                      padding: '6px 14px', borderRadius: 20,
                      background: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)',
                      border: `1.2px solid ${isDark ? 'rgba(255, 77, 166, 0.2)' : 'rgba(255, 77, 166, 0.3)'}`,
                      color: textColor, fontSize: 10.5, fontWeight: 700, cursor: 'pointer',
                      transition: 'all 0.2s', textTransform: 'uppercase', letterSpacing: '0.02em'
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = accentColor
                      e.currentTarget.style.color = '#ffffff'
                      e.currentTarget.style.borderColor = accentColor
                      e.currentTarget.style.boxShadow = `0 4px 10px rgba(255, 77, 166, 0.25)`
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)'
                      e.currentTarget.style.color = textColor
                      e.currentTarget.style.borderColor = isDark ? 'rgba(255, 77, 166, 0.2)' : 'rgba(255, 77, 166, 0.3)'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  >
                    Scan Another JD
                  </button>
                </div>
              </div>
            ) : (
              <div style={{
                flex: 1, display: 'flex', flexDirection: 'column', padding: '16px 20px', gap: 12
              }}>
                {/* Inputs Wrapper */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <textarea
                    value={jdText}
                    onChange={e => setJdText(e.target.value)}
                    placeholder="Paste the Job Description (JD) text here to analyze alignment..."
                    style={{
                      width: '100%', height: 90, borderRadius: 12,
                      background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                      border: `1.2px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.1)'}`,
                      color: textColor, padding: '10px 14px', fontSize: 11.5,
                      outline: 'none', boxSizing: 'border-box', resize: 'none',
                      lineHeight: 1.55, fontFamily: 'var(--font-body)',
                      transition: 'border-color 0.2s'
                    }}
                    onFocus={e => e.currentTarget.style.borderColor = accentColor}
                    onBlur={e => e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.1)'}
                  />

                  {/* PDF Upload trigger row */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <label style={{ display: 'inline-flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={e => {
                          const file = e.target.files?.[0]
                          if (file) {
                            playSound('pop')
                            setJdFileName(file.name)
                            // Auto populate descriptive mock text based on PDF name
                            const mockText = `Role Details for PDF: ${file.name}. Looking for a Senior Product Designer with experience designing SaaS component libraries, high-fidelity React interactive web modules, and conversational AI UX layouts in Figma.`
                            setJdText(mockText)
                            // Directly trigger analysis immediately to show loading and generate the score
                            handleAnalyzeJD(mockText)
                          }
                        }}
                        style={{ display: 'none' }}
                      />
                      <span style={{
                        padding: '6px 14px', borderRadius: 20,
                        background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.02)',
                        border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.1)'}`,
                        color: textColor, fontSize: 10.5, fontWeight: 700,
                        display: 'flex', alignItems: 'center', gap: 6, transition: 'all 0.2s'
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.borderColor = accentColor
                        e.currentTarget.style.background = isDark ? 'rgba(255, 77, 166, 0.06)' : 'rgba(255, 77, 166, 0.03)'
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.1)'
                        e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.02)'
                      }}
                      >
                        <DocIcon />
                        {jdFileName ? jdFileName : "Upload Job PDF"}
                      </span>
                    </label>

                    {jdFileName && (
                      <span style={{ fontSize: 9.5, fontFamily: 'var(--font-mono)', opacity: 0.6, textTransform: 'uppercase' }}>
                        PDF Loaded ✓
                      </span>
                    )}
                  </div>
                </div>

                {/* Scan Action Trigger */}
                <button
                  onClick={() => handleAnalyzeJD()}
                  disabled={!jdText.trim() && !jdFileName}
                  style={{
                    width: '100%', padding: '10px 16px', borderRadius: 28,
                    background: (jdText.trim() || jdFileName) ? accentColor : (isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'),
                    color: (jdText.trim() || jdFileName) ? '#ffffff' : subtextColor,
                    border: 'none', fontWeight: 800, fontSize: 11, cursor: (jdText.trim() || jdFileName) ? 'pointer' : 'default',
                    transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                    boxShadow: (jdText.trim() || jdFileName) ? `0 6px 16px rgba(255, 77, 166, 0.3)` : 'none',
                    textTransform: 'uppercase', letterSpacing: '0.06em'
                  }}
                  onMouseEnter={e => {
                    if (jdText.trim() || jdFileName) {
                      e.currentTarget.style.transform = 'translateY(-2px)'
                      e.currentTarget.style.boxShadow = `0 8px 20px rgba(255, 77, 166, 0.45)`
                    }
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'none'
                    e.currentTarget.style.boxShadow = (jdText.trim() || jdFileName) ? `0 6px 16px rgba(255, 77, 166, 0.3)` : 'none'
                  }}
                >
                  Analyze Alignment Profile
                </button>
              </div>
            )}
          </div>
        )}

        {/* STATE 4: IMMERSIVE VOICE ACTIVATION CANOPY */}
        {notchState === 'voice' && (
          <div style={{
            width: '100%',
            height: '270px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 24,
            position: 'relative',
            animation: 'fadeIn 0.3s ease-out',
            boxSizing: 'border-box'
          }}>
            
            <div style={{
              fontSize: 10, fontFamily: 'var(--font-mono)', fontWeight: 700,
              color: 'rgba(255, 77, 166, 0.8)', textTransform: 'uppercase',
              letterSpacing: '0.15em', marginBottom: 12
            }}>
              Voice co-pilot active
            </div>

            <div 
              onClick={() => {
                if (voiceStatus === 'idle') {
                  startVoiceRecognition()
                } else {
                  stopVoiceRecognition()
                }
              }}
              style={{
                width: 72, height: 72, borderRadius: '50%',
                background: voiceStatus === 'listening' ? 'rgba(255, 77, 166, 0.15)' : (isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)'),
                border: `2.5px solid ${accentColor}`,
                display: 'flex', alignItems: 'center',
                justifyContent: 'center', cursor: 'pointer', position: 'relative',
                boxShadow: `0 0 24px rgba(255, 77, 166, 0.25)`,
                transition: 'all 0.3s ease',
                color: textColor
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', justify: 'center' }}>
                {voiceStatus === 'listening' ? <MicLargeIcon /> : (voiceStatus === 'thinking' ? <GearIcon /> : <VolumeIcon />)}
              </span>
              
              {voiceStatus === 'listening' && (
                <div className="voice-radar-pulse" />
              )}
            </div>

            {voiceStatus !== 'idle' && (
              <div style={{ display: 'flex', gap: 4, alignItems: 'center', height: 20, marginTop: 16 }}>
                {[1, 2, 3, 4, 5, 6, 7].map(i => (
                  <div 
                    key={i}
                    style={{
                      width: 3,
                      height: voiceStatus === 'listening' ? 14 : (voiceStatus === 'replying' ? 24 : 6),
                      background: accentColor,
                      borderRadius: 1.5,
                      animation: voiceStatus !== 'thinking' ? `voiceWave 0.5s ease-in-out infinite alternate` : 'none',
                      animationDelay: `${i * 0.08}s`,
                      boxShadow: `0 0 4px ${accentColor}`
                    }}
                  />
                ))}
              </div>
            )}

            <div style={{
              fontSize: 12, color: textColor, fontWeight: 700,
              fontFamily: 'var(--font-mono)', marginTop: 14, textAlign: 'center',
              textTransform: 'uppercase', letterSpacing: '0.02em'
            }}>
              {voiceSpeechText || "Listening..."}
            </div>

            <button 
              onClick={() => {
                stopVoiceRecognition()
                setNotchState('compact')
              }}
              style={{
                position: 'absolute', bottom: 16, right: 18,
                background: 'none', border: 'none', color: subtextColor,
                cursor: 'pointer', fontSize: 10, fontFamily: 'var(--font-mono)',
                display: 'flex', alignItems: 'center', gap: 4
              }}
              onMouseEnter={e => e.currentTarget.style.color = textColor}
              onMouseLeave={e => e.currentTarget.style.color = subtextColor}
            >
              <CloseIcon />
              <span>EXIT</span>
            </button>
          </div>
        )}
          </div>
        )}
      </nav>

      {/* Dynamic Keyframes */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.96); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes ambientWave {
          from { height: 4px; }
          to { height: 14px; }
        }
        @keyframes voiceWave {
          0% { transform: scaleY(0.3); }
          100% { transform: scaleY(1.3); }
        }
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-5px); }
        }
        
        .voice-radar-pulse {
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          border: 1.5px solid #FF4DA6;
          animation: radarWave 1.4s cubic-bezier(0.1, 0.8, 0.3, 1) infinite;
        }
        @keyframes radarWave {
          0% { transform: scale(0.95); opacity: 0.8; }
          100% { transform: scale(1.4); opacity: 0; }
        }
        @keyframes blinkCursor {
          from, to { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes rollOut {
          0% { transform: translateY(0); opacity: 1; filter: blur(0px); }
          100% { transform: translateY(-100%); opacity: 0; filter: blur(1.5px); }
        }
        @keyframes rollIn {
          0% { transform: translateY(100%); opacity: 0; filter: blur(1.5px); }
          100% { transform: translateY(0); opacity: 1; filter: blur(0px); }
        }
        @keyframes spinOrbit {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulseCore {
          0% { transform: scale(0.85); opacity: 0.7; }
          100% { transform: scale(1.15); opacity: 1; }
        }
        @keyframes pulseSleep {
          0% { transform: scale(0.9); opacity: 0.4; }
          50% { transform: scale(1.1); opacity: 0.7; }
          100% { transform: scale(0.9); opacity: 0.4; }
        }
        @keyframes scanLaser {
          0% { transform: translateY(-8px); opacity: 0.2; }
          50% { opacity: 0.9; }
          100% { transform: translateY(8px); opacity: 0.2; }
        }
        @keyframes orbitParticle {
          0% { transform: rotate(0deg) translateX(8px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(8px) rotate(-360deg); }
        }
      `}</style>
    </>
  )
}
