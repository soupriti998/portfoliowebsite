import { useState, useRef, useEffect } from 'react'

const DIMS = {
  compact: { width: 440, height: 46, radius: 23 },
  expanded: { width: 500, height: 320, radius: 24 }, 
  chat: { width: 480, height: 520, radius: 25 },
  voice: { width: 480, height: 380, radius: 25 },
  jdMatch: { width: 480, height: 480, radius: 25 }
}

/* ── Dynamic Breathing Circle & Status System (NO MASCOT, NO CAT) ── */
const StatusHUDIcon = ({ state, theme }) => {
  const pinkGlow = '#FF4DA6'

  if (state === 'voice' || state === 'listening') {
    // Pulse ambient voice waves
    return (
      <div className="breathing-circle-logo" style={{ display: 'flex', gap: 3, alignItems: 'center', height: 16, width: 26, justifyContent: 'center' }}>
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
      <div className="breathing-circle-logo" style={{ position: 'relative', width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
      <div className="breathing-circle-logo" style={{ position: 'relative', width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
      <div className="breathing-circle-logo" style={{ position: 'relative', width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
      <div className="breathing-circle-logo" style={{ position: 'relative', width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
    <div className="breathing-circle-logo" style={{ position: 'relative', width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
  greet: ["Hmm... Hey! I am Soup, Soupriti's digital pet. Ask me anything about her work, skills, or experience.", "Hmm... Hello! I'm Soup — here to help you explore. What would you like to know?", "Hmm... Welcome! I'm Soup. Feel free to ask me about Soupriti's projects, skills, or how to get in touch."],
  about: "soupriti is a Product Designer based in Bangalore with 3+ years of experience designing HMI and SaaS products. She completed B.Des in Fashion Communication at NIFT Chennai. She simplifies complex systems into warm, human-centered experiences.",
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

  // Recruiter-First queries
  if (q.includes('good fit for saas') || q.includes('fit for saas') || q.match(/\bsaas\b/)) {
    return "Soupriti is an exceptional fit for SaaS product roles. At Divami Design Labs and Incture, she worked extensively on complex high-density SaaS dashboards, data-heavy enterprise platforms, and complex workflow mapping. She combines design systems mastery in Figma with solid React frontend understanding, enabling her to design systems that are both beautiful and highly constructible by engineering."
  }
  if (q.includes('summarize') || q.includes('summary') || q.includes('experience summary')) {
    return "Soupriti is currently a Product Designer at upliance.ai (Bangalore, 2024-Present), where she redesigned their core appliance HMI touchscreen and companion app. Previously, she designed dashboard layouts at Divami Design Labs (2023-2024) and worked on enterprise applications at Incture (2022-2023). She holds a B.Des from NIFT Chennai."
  }
  if (q.includes('ai project') || q.includes('ai work') || q.includes('ai design')) {
    return "At upliance.ai, Soupriti designed behavior-driven HMI cooking workflows, contextual voice-assistant prompt notch states, and smart air fryer controls. She has also prototyped a variety of AI-driven widgets, dashboard monitoring controls, and contextual search tools."
  }
  if (q.includes('ux thinking') || q.includes('ux process') || q.includes('evaluate ux')) {
    return "Soupriti's UX process is deeply system-driven and data-backed. When designing the HMI interface for upliance.ai, she conducted contextual inquiry and diary studies to resolve cognitive load issues. By restructuring user flows and visual hierarchy, she achieved a measurable 24% increase in cooking task completion speed and a 30% boost in user retention."
  }
  if (q.includes('product strategy') || q.includes('design strategy')) {
    return "Soupriti bridges visual craft with business outcomes. Her strategy involves building robust design tokens (OKLCH-engineered light/dark modes) to speed up frontend development time, and aligning user journeys with business success metrics—such as onboarding completion rate and active device usage."
  }
  if (q.includes('philosophy') || q.includes('design approach')) {
    return "Soupriti believes in 'complexity made warm.' Design should feel human, transparent, and responsive. Instead of decorative visuals, she focuses on functional design systems, clear typographic rhythms, and micro-interactions that elevate utility into moments of delightful feedback."
  }
  if (q.match(/\bb2b\b/) || q.match(/\bb2c\b/)) {
    return "Soupriti has a strong dual background: B2B/Enterprise SaaS design at Divami Design Labs and Incture (building complex workflows, data tables, and developer-friendly systems), combined with consumer B2C hardware-software HMI and mobile app design at upliance.ai. This makes her versatile in handling both B2B systems and B2C products."
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
  if (q.match(/hi|hello|hey|soup/)) return "Hmm... hey I am Soup, Soupriti's digital pet. I can help you explore her portfolio."
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

const ImageIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
    <circle cx="8.5" cy="8.5" r="1.5"/>
    <polyline points="21 15 16 10 5 21"/>
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

const LogIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <line x1="9" y1="9" x2="15" y2="9" />
    <line x1="9" y1="13" x2="15" y2="13" />
    <line x1="9" y1="17" x2="13" y2="17" />
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
  const [viewportHeight, setViewportHeight] = useState(typeof window !== 'undefined' ? window.innerHeight : 800)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const handleResize = () => {
      setViewportHeight(window.innerHeight)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  
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
  const [messages, setMessages] = useState([{ from: 'bot', text: "Hmm... Hey! I'm Soup, Soupriti's digital pet. I can help you sniff around and explore her work. Ask me anything!" }])
  const [hovered, setHovered] = useState(false)
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

  // Debounced auto-analyzer for pasted/typed JDs
  useEffect(() => {
    if (!jdText.trim() || matchResult || isScanning || jdFileName) return
    if (jdText.trim().length < 15) return // wait for sufficient length

    const timer = setTimeout(() => {
      handleAnalyzeJD(jdText)
    }, 1200)

    return () => clearTimeout(timer)
  }, [jdText, matchResult, isScanning, jdFileName])

  // Dynamic Height Hugging States
  const contentRef = useRef(null)
  const [dynamicHeight, setDynamicHeight] = useState(null)

  // -- HERO MORPHING STATES --
  const [dockRect, setDockRect] = useState(null)
  const [scrollProgress, setScrollProgress] = useState(0) // 0 (Docked) -> 1 (Floating Notch)

  useEffect(() => {
    let ticking = false
    const updateScroll = () => {
      const y = window.scrollY
      let p = y / 250 // Morph threshold
      if (p > 1) p = 1
      if (p < 0) p = 0
      setScrollProgress(p)
      ticking = false
    }
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScroll)
        ticking = true
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    updateScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const dock = document.getElementById('hero-ai-dock')
    if (!dock) return

    const updateDock = () => {
      const rect = dock.getBoundingClientRect()
      if (rect.width > 0) {
        setDockRect({
          top: rect.top + window.scrollY,
          left: rect.left + window.scrollX,
          width: rect.width,
          height: rect.height,
          centerX: rect.left + window.scrollX + rect.width / 2,
          centerY: rect.top + window.scrollY + rect.height / 2,
        })
      }
    }

    const observer = new ResizeObserver(updateDock)
    observer.observe(dock)

    window.addEventListener('resize', updateDock)
    window.addEventListener('scroll', updateDock, { passive: true })

    // Check immediately and also after small delays to ensure layout is ready
    updateDock()
    const t1 = setTimeout(updateDock, 100)
    const t2 = setTimeout(updateDock, 500)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', updateDock)
      window.removeEventListener('scroll', updateDock)
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

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
      summaryPoints.push("Soupriti excels in designing advanced AI user experiences—including agentic UI flows, floating HUD control units, and conversational co-pilots like Soup.")
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
      summaryPoints.push("soupriti fits this profile excellently, bringing production-ready product design expertise, high-fidelity interactive prototyping, and pixel-perfect aesthetics.")
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
      const isVoiceShortcut = (e.ctrlKey && e.code === 'KeyL') || (e.altKey && e.code === 'Space')
      if (isVoiceShortcut) {
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

    const reply = getResponse(trimmed, jokeState, setJokeState, activeSection)
    setMessages(prev => [...prev, { from: 'bot', text: reply }])
    playSound('pop')
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

  // Colors & Aesthetic Tokens (Forced dark & pink aesthetic for chatbot notch companion)
  const isDark = true
  const bgColor = 'rgba(10, 10, 12, 0.95)'
  const textColor = '#ffffff'
  const subtextColor = '#a8acb3'
  const accentColor = '#FF4DA6' // Glowing Pink
  const borderTint = 'rgba(255, 77, 166, 0.2)'
  const glowShadow = '0 12px 40px rgba(255, 77, 166, 0.15), 0 0 12px rgba(255, 77, 166, 0.12), inset 0 1px 0 rgba(255,255,255,0.05)'

  // -- INTERPOLATION LOGIC --
  const isDocked = dockRect && scrollProgress < 1
  const p = isDocked ? scrollProgress : 1
  const pEase = p === 1 ? 1 : 1 - Math.pow(2, -10 * p) // easeOutExpo

  const dockWidth = dockRect ? Math.min(dockRect.width, DIMS.chat.width) : DIMS.chat.width
  const dockHeight = dockRect ? Math.min(dockRect.height, DIMS.chat.height) : DIMS.chat.height

  // Spacing for floating notch from the bottom and right of the viewport
  const bottomSpacing = typeof window !== 'undefined' && window.innerWidth < 768 ? 20 : 32
  const rightSpacing = typeof window !== 'undefined' && window.innerWidth < 768 ? 20 : 32

  let finalWidth = currentDim.width
  let finalHeight = notchState === 'compact' ? DIMS.compact.height : (dynamicHeight || currentDim.height)
  let finalRadiusBottom = currentDim.radius
  let finalRadiusTop = currentDim.radius
  
  let finalTop = viewportHeight - finalHeight - bottomSpacing
  // Calculate target center X for the bottom right positioning
  let targetCenterX = typeof window !== 'undefined' ? window.innerWidth - (finalWidth / 2) - rightSpacing : 0
  let finalLeft = `${targetCenterX}px`

  if (isDocked) {
    finalWidth = dockRect.width * (1 - pEase) + finalWidth * pEase
    finalHeight = dockRect.height * (1 - pEase) + finalHeight * pEase
    finalRadiusBottom = 24 * (1 - pEase) + currentDim.radius * pEase
    finalRadiusTop = 24 * (1 - pEase) + currentDim.radius * pEase

    const dockViewportTop = dockRect.top - window.scrollY
    const dockViewportLeft = dockRect.left
    const dockCenterX = dockViewportLeft + dockRect.width / 2

    const targetTop = viewportHeight - finalHeight - bottomSpacing
    // Use targetCenterX to interpolate towards the bottom right
    targetCenterX = typeof window !== 'undefined' ? window.innerWidth - (finalWidth / 2) - rightSpacing : 0
    
    finalTop = dockViewportTop * (1 - pEase) + targetTop * pEase
    finalLeft = `calc(${dockCenterX}px * ${1 - pEase} + ${targetCenterX}px * ${pEase})`
  }

  // Inertia squash momentum calculation
  const transformScale = notchState === 'compact' && p === 1
    ? `translateX(-50%) scaleX(${1 + scrollVelocity * 0.04}) scaleY(${1 - scrollVelocity * 0.02})`
    : `translateX(-50%) scale(1)`

  // Add floating animation if fully docked
  const isFullyDocked = p === 0

  const hoverShadow = '0 12px 40px rgba(255, 77, 166, 0.25), 0 0 16px rgba(255, 77, 166, 0.2), inset 0 1px 0 rgba(255,255,255,0.05)'

  const finalTransformScale = notchState === 'compact' && p === 1
    ? `translateX(-50%) scaleX(${(1 + scrollVelocity * 0.04) * (hovered ? 1.03 : 1)}) scaleY(${(1 - scrollVelocity * 0.02) * (hovered ? 1.03 : 1)})`
    : `translateX(-50%) scale(1)`

  return (
    <>
      <style>{`
        @keyframes floatDock {
          0%, 100% { transform: ${finalTransformScale} translateY(${translateY}px); }
          50% { transform: ${finalTransformScale} translateY(${translateY - 6}px); }
        }
      `}</style>
      <nav
        id="dynamic-island-notch"
        style={{
          position: 'fixed',
          top: finalTop,
          left: finalLeft,
          transform: `${finalTransformScale} translateY(${translateY}px)`,
          width: finalWidth,
          height: finalHeight,
          borderBottomLeftRadius: finalRadiusBottom,
          borderBottomRightRadius: finalRadiusBottom,
          borderTopLeftRadius: finalRadiusTop,
          borderTopRightRadius: finalRadiusTop,
          background: bgColor,
          border: `1.2px solid ${borderTint}`,
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          boxShadow: (hovered && notchState === 'compact') ? hoverShadow : glowShadow,
          zIndex: 999999,
          overflow: 'hidden',
          transition: isDocked ? 'none' : 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.1s ease-out',
          animation: isFullyDocked ? 'floatDock 4s ease-in-out infinite' : 'none',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          cursor: notchState === 'compact' ? 'pointer' : 'default',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={notchState === 'compact' ? () => {
          playSound('pop')
          setNotchState('chat')
        } : undefined}
      >
        
        {/* Absolute Left bezel Wing Flare (Hide when docked) */}
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
          opacity: isDocked ? pEase : 1,
          transition: 'box-shadow 0.4s ease, opacity 0.2s'
        }} />

        {/* Absolute Right bezel Wing Flare (Hide when docked) */}
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
          opacity: isDocked ? pEase : 1,
          transition: 'box-shadow 0.4s ease, opacity 0.2s'
        }} />

        {/* STATE 1: COMPACT NOTCH & DOCKED IDLE */}
        {notchState === 'compact' && (() => {
          const hud = getSmartHUDState(activeSection, scrollVelocity, activeProject, inactivityState, readingTime);
          return (
            <div 
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: isFullyDocked ? 'column' : 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: isFullyDocked ? 20 : 12,
                padding: isFullyDocked ? '40px 24px' : '0 20px',
                animation: 'fadeIn 0.25s ease-out',
                cursor: 'pointer',
                textAlign: 'center',
                opacity: isFullyDocked ? 1 : pEase,
                transition: 'opacity 0.3s, flex-direction 0.3s, gap 0.3s, padding 0.3s',
              }}
              onClick={() => {
                playSound('pop')
                setNotchState('chat')
              }}
            >
              {/* Glowing Breathing Circle */}
              <div style={{
                transform: isFullyDocked ? 'scale(2.2)' : 'none',
                transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                marginBottom: isFullyDocked ? 12 : 0,
              }}>
                <StatusHUDIcon state={hud.icon} theme={theme} />
              </div>
              
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
                opacity: isFullyDocked ? (1 - pEase) : 1,
                transition: 'opacity 0.3s',
              }}>
                {/* Dynamic Contextual Text */}
                <span style={{
                  fontSize: isFullyDocked ? 15 : 12,
                  fontFamily: isFullyDocked ? 'var(--font-display)' : 'var(--font-body)',
                  fontWeight: isFullyDocked ? 700 : 600,
                  color: textColor,
                  letterSpacing: isFullyDocked ? '-0.02em' : '-0.01em',
                  textTransform: 'none',
                  whiteSpace: isFullyDocked ? 'normal' : 'nowrap',
                }}>
                  {isFullyDocked ? "Hi, this is Soup." : "soup — press ctrl+l to talk"}
                </span>

                {isFullyDocked && (
                  <>
                    <span style={{
                      fontSize: 12,
                      fontFamily: 'var(--font-body)',
                      color: subtextColor,
                      maxWidth: '42ch',
                      lineHeight: 1.5,
                      opacity: 0.85,
                    }}>
                      I can help you sniff around and see if Soupriti’s the kind of designer your team has been looking for. Peek into projects, systems, interactions, and late-night creative experiments.
                    </span>
                    <span style={{
                      fontSize: 11,
                      fontFamily: 'var(--font-mono)',
                      color: pinkGlow,
                      marginTop: 8,
                      opacity: 0.9,
                      letterSpacing: '0.02em',
                      fontWeight: 600,
                    }}>
                      Press Ctrl + L to start talking.
                    </span>
                  </>
                )}
              </div>
            </div>
          )
        })()}

        {/* CONTENT DOCK WRAPPER FOR DYNAMIC HUGGING */}
        {notchState !== 'compact' && (
          <div ref={contentRef} style={{ width: '100%', display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}>
            
            {/* 1. UNIFIED WORKSPACE HEADER */}
            <div style={{
              width: '100%', padding: '14px 20px',
              borderBottom: `1.2px solid rgba(255, 77, 166, 0.15)`,
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              boxSizing: 'border-box'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: accentColor, boxShadow: `0 0 6px ${accentColor}`, animation: 'speakPulse 1.2s infinite' }} />
                <span style={{ fontSize: 12, fontFamily: 'var(--font-body)', fontWeight: 600, color: textColor }}>
                  {notchState === 'chat' ? "soup chat" : (notchState === 'jdMatch' ? "match scanner" : "voice companion")}
                </span>
              </div>
              
              <button 
                onClick={() => {
                  playSound('pop')
                  if (notchState === 'voice') stopVoiceRecognition()
                  setNotchState('compact')
                }}
                title="Minimize"
                style={{
                  background: 'none', border: 'none', color: subtextColor,
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  padding: 6, borderRadius: '50%', transition: 'all 0.2s'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = '#ff2a85'
                  e.currentTarget.style.background = 'rgba(255, 77, 166, 0.1)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = subtextColor
                  e.currentTarget.style.background = 'none'
                }}
              >
                <CloseIcon />
              </button>
            </div>

            {/* 2. UNIFIED WORKSPACE SEGMENTED TABS */}
            <div style={{
              display: 'flex',
              gap: 8,
              padding: '8px 16px',
              borderBottom: `1px dashed rgba(255, 77, 166, 0.15)`,
              background: 'rgba(255, 255, 255, 0.01)',
              boxSizing: 'border-box'
            }}>
              {[
                { id: 'chat', label: 'Chat', icon: <ChatIcon /> },
                { id: 'jdMatch', label: 'JD Match', icon: <ScanJDIcon /> },
                { id: 'voice', label: 'Voice', icon: <MicIcon /> },
                { id: 'devJournal', label: 'Journal', icon: <LogIcon />, action: () => {
                  playSound('pop')
                  setNotchState('compact')
                  if (window.openActivityLog) window.openActivityLog()
                }},

              ].map(tab => {
                const isActive = notchState === tab.id
                const handleClick = tab.action || (() => {
                  playSound('pop')
                  if (notchState === 'voice') stopVoiceRecognition()
                  setNotchState(tab.id)
                })
                return (
                  <button
                    key={tab.id}
                    onClick={handleClick}
                    title={tab.label}
                    className="chatbot-tab-btn"
                    style={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 6,
                      height: 36,
                      background: isActive ? 'rgba(255, 77, 166, 0.15)' : 'transparent',
                      border: `1px solid ${isActive ? accentColor : 'transparent'}`,
                      borderRadius: '20px',
                      color: isActive ? accentColor : subtextColor,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      padding: '0 12px',
                    }}
                    onMouseEnter={e => {
                      if (!isActive) {
                        e.currentTarget.style.color = textColor
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
                      }
                    }}
                    onMouseLeave={e => {
                      if (!isActive) {
                        e.currentTarget.style.color = subtextColor
                        e.currentTarget.style.background = 'transparent'
                      }
                    }}
                  >
                    {tab.icon}
                    <span className="chatbot-tab-label">{tab.label}</span>
                  </button>
                )
              })}
            </div>

            {/* 3. ACTIVE VIEW PORT CONTENT */}

            {/* VIEW A: CHAT WORKSPACE */}
            {notchState === 'chat' && (
              <div style={{ display: 'flex', flexDirection: 'column', height: '100%', boxSizing: 'border-box' }}>
                {messages.length === 1 ? (
                  /* Welcome Onboarding Screen */
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 16,
                    padding: '20px',
                    animation: 'fadeIn 0.35s ease-out',
                    boxSizing: 'border-box'
                  }}>
                    {/* Welcome Header */}
                    <div>
                      <h3 style={{
                        margin: '0 0 6px 0',
                        fontSize: 15,
                        fontWeight: 700,
                        color: textColor,
                        fontFamily: 'var(--font-display)',
                        letterSpacing: '-0.01em',
                        lineHeight: 1.2
                      }}>
                        Hi, this is Soup.
                      </h3>
                      <p style={{
                        margin: 0,
                        fontSize: 12,
                        lineHeight: 1.5,
                        color: subtextColor,
                        fontFamily: 'var(--font-body)'
                      }}>
                        I can help you sniff around and see if Soupriti’s the kind of designer your team has been looking for. Peek into projects, systems, interactions, and late-night creative experiments.
                      </p>
                    </div>

                    {/* Recruiter quick prompt list */}
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 8
                    }}>
                      {/* Upload JD highlight card */}
                      <button
                        onClick={() => {
                          playSound('pop')
                          setNotchState('jdMatch')
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: 8,
                          padding: '12px 16px',
                          background: 'linear-gradient(135deg, #FF4DA6 0%, #FF2E93 100%)',
                          color: '#ffffff',
                          border: 'none',
                          borderRadius: 12,
                          fontSize: 12,
                          fontWeight: 700,
                          fontFamily: 'var(--font-body)',
                          cursor: 'pointer',
                          boxShadow: '0 4px 12px rgba(255, 77, 166, 0.25)',
                          transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.transform = 'translateY(-1px)'
                          e.currentTarget.style.boxShadow = '0 6px 16px rgba(255, 77, 166, 0.35)'
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.transform = 'none'
                          e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 77, 166, 0.25)'
                        }}
                      >
                        <ScanJDIcon />
                        <span>Upload a job description</span>
                      </button>

                      {/* Prompt Cards Grid */}
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: 8
                      }}>
                        {[
                          { label: 'Is she a good fit for SaaS?', query: 'Is Soupriti a good fit for SaaS product roles?' },
                          { label: 'Summarize her experience', query: "Summarize Soupriti's experience" },
                          { label: 'Explore AI projects', query: "Tell me about Soupriti's AI projects" },
                          { label: 'Evaluate UX thinking', query: "Evaluate Soupriti's UX thinking and process" },
                          { label: 'Review product strategy', query: "Review Soupriti's product design strategy" },
                          { label: 'Hear her design philosophy', query: "What is Soupriti's design philosophy?" },
                          { label: 'Ask about B2B/B2C experience', query: "Tell me about Soupriti's B2B and B2C experience" }
                        ].map(act => (
                          <button
                            key={act.label}
                            onClick={() => handleSendChat(act.query)}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'flex-start',
                              textAlign: 'left',
                              padding: '10px 12px',
                              background: 'rgba(255,255,255,0.03)',
                              border: '1.2px solid rgba(255, 77, 166, 0.12)',
                              borderRadius: 12,
                              fontSize: 11.5,
                              fontWeight: 600,
                              color: textColor,
                              fontFamily: 'var(--font-body)',
                              cursor: 'pointer',
                              transition: 'all 0.2s'
                            }}
                            onMouseEnter={e => {
                              e.currentTarget.style.borderColor = accentColor
                              e.currentTarget.style.background = 'rgba(255, 77, 166, 0.08)'
                              e.currentTarget.style.transform = 'translateY(-1px)'
                            }}
                            onMouseLeave={e => {
                              e.currentTarget.style.borderColor = 'rgba(255, 77, 166, 0.12)'
                              e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
                              e.currentTarget.style.transform = 'none'
                            }}
                          >
                            {act.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Voice guidance card */}
                    <div style={{
                      marginTop: 4,
                      padding: '10px 14px',
                      background: 'rgba(255,255,255,0.02)',
                      border: '1px dashed rgba(255,255,255,0.06)',
                      borderRadius: 12,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 4
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <div style={{ color: accentColor }}><MicIcon /></div>
                        <span style={{ fontSize: 11, fontWeight: 600, color: textColor, fontFamily: 'var(--font-body)' }}>
                          Voice mode: press Ctrl + L to talk
                        </span>
                      </div>
                      <span style={{ fontSize: 11, color: subtextColor, fontFamily: 'var(--font-body)', lineHeight: 1.4 }}>
                        Ask Soup anything about Soupriti’s work, process, or fit.
                      </span>
                    </div>
                  </div>
                ) : (
                  /* Standard Chat Thread List */
                  <div style={{ display: 'flex', flexDirection: 'column', height: '100%', boxSizing: 'border-box' }}>
                    <div style={{
                      flex: 1, maxHeight: '340px', overflowY: 'auto', padding: '16px 20px',
                      display: 'flex', flexDirection: 'column', gap: 12, boxSizing: 'border-box'
                    }}>
                      {messages.map((m, i) => (
                        <div 
                          key={i} 
                          style={{
                            alignSelf: m.from === 'user' ? 'flex-end' : 'flex-start',
                            maxWidth: '82%', padding: '10px 14px',
                            background: m.from === 'user' ? accentColor : (isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)'),
                            color: m.from === 'user' ? '#ffffff' : textColor, fontSize: 12, lineHeight: 1.5,
                            fontFamily: 'var(--font-body)',
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
                  </div>
                )}

                {/* Input box is persistent for chat mode */}
                <div style={{
                  padding: '10px 16px', borderTop: `1px solid ${isDark ? 'rgba(255, 77, 166, 0.15)' : 'rgba(255, 77, 166, 0.25)'}`,
                  display: 'flex', gap: 8, alignItems: 'center', boxSizing: 'border-box'
                }}>
                  <input
                    type="text"
                    value={chatInput}
                    onChange={e => setChatInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSendChat(chatInput)}
                    placeholder="Ask about my skills, projects, or workflow..."
                    style={{
                      flex: 1, padding: '8px 14px', borderRadius: 20,
                      background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)', 
                      border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.1)'}`,
                      color: textColor, fontSize: 12, outline: 'none',
                      fontFamily: 'var(--font-body)'
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

            {/* VIEW B: JD SCANNER WORKSPACE */}
            {notchState === 'jdMatch' && (
              <div style={{ width: '100%', boxSizing: 'border-box' }}>
                {isScanning ? (
                  <div style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20,
                    padding: '40px 24px'
                  }}>
                    <div style={{ position: 'relative', width: 64, height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <div style={{
                        position: 'absolute', inset: 0, borderRadius: '50%',
                        border: '2.5px solid rgba(255, 77, 166, 0.2)',
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
                    <span style={{ fontSize: 11, fontFamily: 'var(--font-body)', fontWeight: 600, color: accentColor }}>
                      scanning profile match...
                    </span>
                  </div>
                ) : matchResult ? (
                  <div style={{
                    display: 'flex', gap: 20, padding: '24px', alignItems: 'center',
                    animation: 'fadeIn 0.3s ease-out'
                  }}>
                    {/* Left Side: Score Circle */}
                    <div style={{
                      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8
                    }}>
                      <div style={{
                        width: 90, height: 90, borderRadius: '50%',
                        border: '3px solid rgba(255, 77, 166, 0.25)',
                        borderColor: `${accentColor} ${accentColor} transparent ${accentColor}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: `0 0 20px rgba(255, 77, 166, 0.15)`,
                        position: 'relative'
                      }}>
                        <span style={{ fontSize: 24, fontWeight: 700, color: textColor, fontFamily: 'var(--font-body)' }}>
                          {matchResult.score}%
                        </span>
                      </div>
                      <span style={{ fontSize: 10, fontFamily: 'var(--font-body)', fontWeight: 500, opacity: 0.6 }}>
                        match score
                      </span>
                    </div>

                    {/* Right Side: Description Summary & Action */}
                    <div style={{
                      flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 12
                    }}>
                      <div>
                        <h4 style={{ margin: '0 0 4px 0', fontSize: 12, fontWeight: 700, color: textColor, fontFamily: 'var(--font-body)' }}>
                          alignment overview
                        </h4>
                        <p style={{ margin: 0, fontSize: 11.5, lineHeight: 1.5, color: subtextColor, fontFamily: 'var(--font-body)' }}>
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
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1.2px solid rgba(255, 77, 166, 0.2)',
                          color: textColor, fontSize: 10.5, fontWeight: 700, cursor: 'pointer',
                          transition: 'all 0.2s', fontFamily: 'var(--font-body)'
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.background = accentColor
                          e.currentTarget.style.color = '#ffffff'
                          e.currentTarget.style.borderColor = accentColor
                          e.currentTarget.style.boxShadow = `0 4px 10px rgba(255, 77, 166, 0.25)`
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
                          e.currentTarget.style.color = textColor
                          e.currentTarget.style.borderColor = 'rgba(255, 77, 166, 0.2)'
                          e.currentTarget.style.boxShadow = 'none'
                        }}
                      >
                        analyze new role
                      </button>
                    </div>
                  </div>
                ) : (
                  <div style={{
                    display: 'flex', flexDirection: 'column', padding: '16px 20px 20px 20px', gap: 12
                  }}>
                    {/* Inputs Wrapper */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      <textarea
                        value={jdText}
                        onChange={e => setJdText(e.target.value)}
                        onPaste={e => {
                          const pastedText = e.clipboardData.getData('text')
                          if (pastedText.trim()) {
                            playSound('pop')
                            setJdText(pastedText)
                            handleAnalyzeJD(pastedText)
                          }
                        }}
                        placeholder="Paste your Job Description (JD) here to measure fit instantly..."
                        style={{
                          width: '100%', height: 110, borderRadius: 12,
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

                      {/* Document & Image Upload Row */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '2px', flexWrap: 'wrap', gap: 8 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          {/* PDF Upload */}
                          <label style={{ display: 'inline-flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
                            <input
                              type="file"
                              accept=".pdf"
                              onChange={e => {
                                const file = e.target.files?.[0]
                                if (file) {
                                  playSound('pop')
                                  setJdFileName(file.name)
                                  const mockText = `Role Details for PDF: ${file.name}. Looking for a Senior Product Designer with experience designing SaaS component libraries, high-fidelity React interactive web modules, and conversational AI UX layouts in Figma.`
                                  setJdText(mockText)
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
                              display: 'flex', alignItems: 'center', gap: 6, transition: 'all 0.2s',
                              fontFamily: 'var(--font-mono)'
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
                              {jdFileName && jdFileName.endsWith('.pdf') ? jdFileName : "Upload JD (.pdf)"}
                            </span>
                          </label>

                          {/* Image Upload */}
                          <label style={{ display: 'inline-flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={e => {
                                const file = e.target.files?.[0]
                                if (file) {
                                  playSound('pop')
                                  setJdFileName(file.name)
                                  const mockText = `Role details extracted from Image: ${file.name}. Seeking a Senior Product Designer skilled in OKLCH dark/light design systems, high-fidelity interactive visual dashboards, and custom micro-interactions in React/Vite.`
                                  setJdText(mockText)
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
                              display: 'flex', alignItems: 'center', gap: 6, transition: 'all 0.2s',
                              fontFamily: 'var(--font-mono)'
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
                              <ImageIcon />
                              {jdFileName && !jdFileName.endsWith('.pdf') ? jdFileName : "upload JD image"}
                            </span>
                          </label>
                        </div>

                        {jdFileName && (
                          <span style={{ fontSize: 10, fontFamily: 'var(--font-body)', opacity: 0.6 }}>
                            {jdFileName.endsWith('.pdf') ? "pdf" : "image"} loaded ✓
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* VIEW C: VOICE CO-PILOT WORKSPACE */}
            {notchState === 'voice' && (
              <div style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '24px 20px',
                position: 'relative',
                boxSizing: 'border-box'
              }}>
                <div style={{
                  fontSize: 11, fontFamily: 'var(--font-body)', fontWeight: 600,
                  color: 'rgba(255, 77, 166, 0.9)', marginBottom: 16
                }}>
                  voice companion active
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
                  fontSize: 12, color: textColor, fontWeight: 600,
                  fontFamily: 'var(--font-body)', marginTop: 16, textAlign: 'center',
                  maxWidth: '280px'
                }}>
                  {voiceSpeechText ? voiceSpeechText.toLowerCase() : "listening..."}
                </div>
              </div>
            )}

          </div>
        )}
      </nav>

      {/* Dynamic Keyframes */}
      <style>{`
        .chatbot-tab-label {
          display: inline-block;
          font-size: 11px;
          font-weight: 600;
          font-family: var(--font-body);
        }
        @media (max-width: 480px) {
          .chatbot-tab-label {
            display: none;
          }
          .chatbot-tab-btn {
            border-radius: 50% !important;
            padding: 0 !important;
          }
        }
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
        .breathing-circle-logo {
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: pointer;
        }
        .breathing-circle-logo:hover {
          transform: scale(1.1) !important;
        }
        .breathing-circle-logo:hover > div:nth-child(2) {
          border: 2.2px solid #FF4DA6 !important;
          box-shadow: 0 0 20px #FF4DA6, inset 0 0 6px #FF4DA6 !important;
          background: rgba(255, 77, 166, 0.2) !important;
        }
        .breathing-circle-logo:active {
          transform: scale(0.85) !important;
          transition: transform 0.1s ease !important;
        }
      `}</style>
    </>
  )
}
