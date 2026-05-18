import { useState, useRef, useEffect } from 'react'

/* ── Interactive State Dimension Specs ── */
const DIMS = {
  compact: { width: 390, height: 46, radius: 23 },
  expanded: { width: 780, height: 58, radius: 29 },
  chat: { width: 450, height: 490, radius: 25 },
  voice: { width: 350, height: 270, radius: 25 }
}

/* ── Dynamic Status HUD Animated Icon System (NO MASCOT, NO CAT) ── */
const StatusHUDIcon = ({ state }) => {
  if (state === 'voice') {
    // Pulse ambient voice waves
    return (
      <div style={{ display: 'flex', gap: 2.2, alignItems: 'center', height: 14, width: 24, justifyContent: 'center' }}>
        {[1, 2, 3, 4, 5].map(i => (
          <div 
            key={i} 
            style={{
              width: 2.2,
              height: '100%',
              background: 'var(--accent)',
              borderRadius: 1,
              animation: `ambientWave 0.7s ease-in-out infinite alternate`,
              animationDelay: `${i * 0.12}s`
            }} 
          />
        ))}
      </div>
    )
  }

  if (state === 'thinking') {
    // Rotating orbit particle core
    return (
      <div style={{ position: 'relative', width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{
          position: 'absolute',
          width: 14, height: 14,
          borderRadius: '50%',
          border: '1.5px dashed var(--accent)',
          animation: 'spinOrbit 2s linear infinite'
        }} />
        <div style={{
          width: 6, height: 6,
          borderRadius: '50%',
          background: 'var(--accent)',
          boxShadow: '0 0 6px var(--accent)',
          animation: 'pulseCore 1s ease-in-out infinite alternate'
        }} />
      </div>
    )
  }

  if (state === 'scrolling') {
    // Scanning line / Rotating outer ring
    return (
      <div style={{ position: 'relative', width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{
          position: 'absolute',
          width: 16, height: 16,
          borderRadius: '50%',
          border: '1.2px solid rgba(0, 82, 255, 0.4)',
          borderTopColor: 'var(--accent)',
          animation: 'spinOrbit 1.2s cubic-bezier(0.25, 1, 0.5, 1) infinite'
        }} />
        <div style={{
          position: 'absolute',
          width: '100%', height: 1.8,
          background: 'linear-gradient(to right, transparent, var(--accent), transparent)',
          boxShadow: '0 0 4px var(--accent)',
          animation: 'scanLaser 1.8s ease-in-out infinite alternate'
        }} />
        <div style={{
          width: 4, height: 4,
          borderRadius: '50%',
          background: '#ffffff',
          boxShadow: '0 0 4px #ffffff'
        }} />
      </div>
    )
  }

  if (state === 'inactive') {
    // Sleeping core (deep pulsing dim blue orb)
    return (
      <div style={{ position: 'relative', width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{
          width: 8, height: 8,
          borderRadius: '50%',
          background: 'rgba(0, 82, 255, 0.3)',
          border: '1px solid rgba(0, 82, 255, 0.5)',
          boxShadow: '0 0 8px rgba(0, 82, 255, 0.15)',
          animation: 'pulseSleep 3.5s ease-in-out infinite'
        }} />
      </div>
    )
  }

  // default 'idle' - Breathing Glow / Orbit Animation
  return (
    <div style={{ position: 'relative', width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{
        position: 'absolute',
        width: 12, height: 12,
        borderRadius: '50%',
        background: 'rgba(0, 82, 255, 0.15)',
        filter: 'blur(3px)',
        animation: 'pulseCore 2.5s ease-in-out infinite alternate'
      }} />
      <div style={{
        position: 'absolute',
        width: 16, height: 16,
        borderRadius: '50%',
        border: '1.2px solid rgba(0, 82, 255, 0.25)',
        animation: 'pulseCore 2.5s ease-in-out infinite alternate'
      }} />
      <div style={{
        position: 'absolute',
        width: 3,
        height: 3,
        borderRadius: '50%',
        background: 'var(--accent)',
        boxShadow: '0 0 4px var(--accent)',
        animation: 'orbitParticle 3s linear infinite'
      }} />
      <div style={{
        width: 6,
        height: 6,
        borderRadius: '50%',
        background: 'var(--accent)',
        boxShadow: '0 0 8px var(--accent)'
      }} />
    </div>
  )
}

/* ── Smart Contextual Status Resolver (Scroll, Reading Time, Inactivity, Active Project) ── */
const getSmartHUDState = (section, velocity, activeProj, inactive, readingSecs) => {
  // 1. Thinking / Active Project state
  if (activeProj) {
    if (velocity > 0.4) {
      return {
        text: `Scanning case: ${activeProj.name.slice(0, 16)}...`,
        shortcut: "Want the UX breakdown?",
        icon: "scrolling"
      };
    }
    return {
      text: `Analyzing: ${activeProj.name.slice(0, 22)}`,
      shortcut: "High-fidelity case study",
      icon: "thinking"
    };
  }

  // 2. Inactive / Idle state
  if (inactive) {
    const idlePool = [
      { text: "Idle but attentive.", shortcut: "Ready when you are" },
      { text: "Waiting for curiosity...", shortcut: "Monitoring interactions" },
      { text: "Still exploring?", shortcut: "Ctrl + L to co-pilot" },
      { text: "Need help finding something?", shortcut: "Ask Luffy" }
    ];
    const idx = Math.floor((window.scrollY / 250) % idlePool.length);
    return { ...idlePool[idx], icon: "inactive" };
  }

  // 3. Active Scrolling state
  if (velocity > 0.4) {
    const scrollPool = [
      { text: "You've entered deep-scroll mode.", shortcut: "Voice mode available" },
      { text: "Summarize this section?", shortcut: "Press Ctrl + L" },
      { text: "Need a quick overview?", shortcut: "I can guide you" },
      { text: "Tracking scroll momentum...", shortcut: "Voice ready" }
    ];
    const idx = Math.floor((window.scrollY / 300) % scrollPool.length);
    return { ...scrollPool[idx], icon: "scrolling" };
  }

  // 4. Reading deep insight state (stays in section > 15 seconds)
  if (readingSecs > 15) {
    const readingPool = [
      { text: "Reading personality signals...", shortcut: "Systems thinker identified" },
      { text: "Cross-domain design detected.", shortcut: "NIFT systems logic" },
      { text: "Analyzing interaction pattern...", shortcut: "Intuitive HMI flow" }
    ];
    const idx = Math.floor((window.scrollY / 200) % readingPool.length);
    return { ...readingPool[idx], icon: "thinking" };
  }

  // 5. Default Resting Section state
  const restingPool = {
    hero: {
      text: "Luffy: Ready to co-pilot",
      shortcut: "Ctrl + L to talk",
      icon: "idle"
    },
    expertise: {
      text: "Reviewing superpowers: Figma & React",
      shortcut: "Figma interaction systems",
      icon: "idle"
    },
    projects: {
      text: "Deep-diving into upliance.ai designs",
      shortcut: "Changed 3 times!",
      icon: "idle"
    },
    about: {
      text: "Caching cinematic celluloid reels",
      shortcut: "NIFT Chennai background",
      icon: "idle"
    },
    journey: {
      text: "Verifying career timeline: NIFT → upliance",
      shortcut: "Senior product engineer",
      icon: "idle"
    },
    contact: {
      text: "Opening secure communication channel",
      shortcut: "Luffy recommends: HIRE!",
      icon: "idle"
    }
  };

  return restingPool[section] || restingPool.hero;
};

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
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
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
  const [rollClass, setRollClass] = useState('roll-idle') // roll-idle, roll-out, roll-in

  useEffect(() => {
    if (text === currentText) return

    // Trigger roll-out animation
    setRollClass('roll-out')
    
    const outTimeout = setTimeout(() => {
      // Swapping text targets while hidden
      setCurrentText(text)
      setDisplayedText('')
      setIndex(0)
      setRollClass('roll-in')
    }, 220) // Match rollOut animation duration

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

  // Styles based on transition state
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
            color: 'var(--accent)', 
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
  
  // Chat States
  const [messages, setMessages] = useState([{ from: 'bot', text: "hey I am luffy, I can help you being more contextual about soupriti's portfolio." }])
  const [chatInput, setChatInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [jokeState, setJokeState] = useState(null)
  
  // Voice Mode States
  const [voiceStatus, setVoiceStatus] = useState('idle') // listening, thinking, replying, idle
  const [voiceSpeechText, setVoiceSpeechText] = useState('')
  const recRef = useRef(null)

  const chatEndRef = useRef(null)

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

  // Dimension mapping
  const currentDim = DIMS[notchState] || DIMS.compact
  
  // Inertia squash momentum calculation
  const transformScale = notchState === 'compact' 
    ? `translateX(-50%) scaleX(${1 + scrollVelocity * 0.05}) scaleY(${1 - scrollVelocity * 0.03})`
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
          height: currentDim.height,
          borderBottomLeftRadius: currentDim.radius,
          borderBottomRightRadius: currentDim.radius,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          background: 'rgba(10, 10, 12, 0.88)',
          borderTop: 'none',
          borderLeft: '1.2px solid rgba(0, 82, 255, 0.15)', // Premium Subtle Faint Tint Border
          borderRight: '1.2px solid rgba(0, 82, 255, 0.15)',
          borderBottom: '1.2px solid rgba(0, 82, 255, 0.15)',
          backdropFilter: 'blur(20px) saturate(180%)',
          boxShadow: '0 8px 32px rgba(0, 82, 255, 0.08), inset 0 1px 0 rgba(255,255,255,0.05)',
          zIndex: 999999,
          overflow: 'hidden',
          transition: 'all 0.55s cubic-bezier(0.175, 0.885, 0.32, 1.25), transform 0.1s ease-out', // Spring ease and fast lag recovery
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
        
        {/* STATE 1: COMPACT NOTCH */}
        {notchState === 'compact' && (() => {
          const hud = getSmartHUDState(activeSection, scrollVelocity, activeProject, inactivityState, readingTime);
          return (
            <div style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 18px',
              animation: 'fadeIn 0.25s ease-out'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                {/* Animated Futuristic Icon (Replaces cat/photo avatar) */}
                <StatusHUDIcon state={hud.icon} />
                
                {/* Contextual thoughts (Strictly updated to var(--font-body) style guide, modest weight 600, guaranteed single-line) */}
                <span style={{
                  fontSize: 12.5,
                  fontFamily: 'var(--font-body)',
                  fontWeight: 600,
                  color: '#ffffff',
                  letterSpacing: '-0.015em',
                  textTransform: 'none',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: '215px',
                  display: 'block',
                  transition: 'all 0.3s ease-out'
                }}>
                  <TypingText text={hud.text} />
                </span>
              </div>

              {/* Dynamic Contextual Action / Shortcut Pill Badge */}
              <div style={{
                background: 'rgba(0, 82, 255, 0.1)',
                border: '1px solid rgba(0, 82, 255, 0.2)',
                borderRadius: 20,
                padding: '3px 10px',
                fontSize: 9,
                fontFamily: 'var(--font-mono)',
                fontWeight: 700,
                color: 'var(--accent)',
                letterSpacing: '0.04em',
                whiteSpace: 'nowrap',
                display: 'flex',
                alignItems: 'center',
                boxShadow: '0 0 8px rgba(0, 82, 255, 0.08)',
                userSelect: 'none',
                transition: 'all 0.3s ease-out'
              }}>
                {hud.shortcut}
              </div>
            </div>
          );
        })()}

        {/* STATE 2: EXPANDED HOVER MENU (Fuzzy search completely removed, beautiful blue resume CTA at end) */}
        {notchState === 'expanded' && (
          <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 24px',
            position: 'relative',
            animation: 'fadeIn 0.3s ease-out'
          }}>
            {/* Left: Interactive HUD Status Mark */}
            <div 
              onClick={() => scrollTo('hero')} 
              style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}
            >
              <StatusHUDIcon state="idle" />
              <span style={{
                fontSize: 11,
                fontFamily: 'var(--font-mono)',
                fontWeight: 800,
                color: '#ffffff',
                letterSpacing: '0.08em',
                textTransform: 'uppercase'
              }}>
                Soupriti.
              </span>
            </div>

            {/* Middle: Identical links to previous top nav */}
            <div style={{ display: 'flex', gap: 22 }}>
              {['Expertise', 'Projects', 'About', 'Journey', 'Contact'].map(label => {
                const target = label === 'Expertise' ? 'expertise' : (label === 'Projects' ? 'projects' : (label === 'About' ? 'about' : (label === 'Journey' ? 'journey' : 'contact')))
                return (
                  <button 
                    key={label}
                    onClick={() => scrollTo(target)}
                    style={{
                      background: 'none', border: 'none', color: '#a1a1a6',
                      fontSize: 12, fontWeight: 700, fontFamily: 'var(--font-body)',
                      cursor: 'pointer', transition: 'color 0.2s', textTransform: 'uppercase',
                      letterSpacing: '0.02em'
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
                    onMouseLeave={e => e.currentTarget.style.color = '#a1a1a6'}
                  >
                    {label}
                  </button>
                )
              })}
            </div>

            {/* Right: Tools + Solid Blue Resume CTA Button at the end */}
            <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
              
              {/* Voice mode trigger (Now rendered as premium circular button icon) */}
              <button 
                onClick={() => {
                  playSound('bell')
                  setNotchState('voice')
                  setTimeout(() => startVoiceRecognition(), 200)
                }}
                title="Voice Mode (CTRL+L)"
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1.2px solid rgba(255,255,255,0.1)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'rgba(255,255,255,0.7)',
                  transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(0, 82, 255, 0.15)';
                  e.currentTarget.style.color = '#ffffff';
                  e.currentTarget.style.borderColor = 'var(--accent)';
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                  e.currentTarget.style.color = 'rgba(255,255,255,0.7)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                  e.currentTarget.style.transform = 'none';
                }}
              >
                <MicIcon />
              </button>

              {/* Embedded Chat mode trigger (Now rendered as premium circular button icon) */}
              <button 
                onClick={() => {
                  playSound('bell')
                  setNotchState('chat')
                }}
                title="Ask Luffy AI"
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1.2px solid rgba(255,255,255,0.1)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'rgba(255,255,255,0.7)',
                  transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(0, 82, 255, 0.15)';
                  e.currentTarget.style.color = '#ffffff';
                  e.currentTarget.style.borderColor = 'var(--accent)';
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                  e.currentTarget.style.color = 'rgba(255,255,255,0.7)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                  e.currentTarget.style.transform = 'none';
                }}
              >
                <ChatIcon />
              </button>

              {/* Solid Electric Blue Resume download CTA Button at the very end */}
              <a 
                href="/resume.pdf" 
                download
                title="Download Resume"
                style={{
                  background: 'var(--accent)',
                  color: '#ffffff',
                  fontSize: 11,
                  fontWeight: 700,
                  fontFamily: 'var(--font-mono)',
                  padding: '6px 14px',
                  borderRadius: 20,
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  boxShadow: '0 4px 12px rgba(0, 82, 255, 0.3)',
                  transition: 'all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                  border: '1.2px solid rgba(255,255,255,0.1)',
                  cursor: 'pointer'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 82, 255, 0.5)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 82, 255, 0.3)';
                }}
              >
                <DocIcon />
                <span>RESUME</span>
              </a>

            </div>

          </div>
        )}

        {/* STATE 3: AI CHAT CANOPY DOCK */}
        {notchState === 'chat' && (
          <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            animation: 'fadeIn 0.3s ease-out'
          }}>
            {/* Header */}
            <div style={{
              width: '100%', padding: '14px 20px',
              borderBottom: '1.2px solid rgba(0, 82, 255, 0.15)',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 6px var(--accent)' }} />
                <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'white', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Luffy Assistant</span>
              </div>
              <button 
                onClick={() => {
                  playSound('pop')
                  setNotchState('compact')
                }}
                style={{
                  background: 'none', border: 'none', color: '#8e8e93',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, fontSize: 11.5
                }}
                onMouseEnter={e => e.currentTarget.style.color = 'white'}
                onMouseLeave={e => e.currentTarget.style.color = '#8e8e93'}
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
                    background: m.from === 'user' ? 'var(--accent)' : 'rgba(255,255,255,0.04)',
                    color: 'white', fontSize: 12, lineHeight: 1.5,
                    borderRadius: 12, border: m.from === 'bot' ? '1.2px solid rgba(0, 82, 255, 0.15)' : 'none',
                    boxShadow: m.from === 'user' ? '0 4px 12px rgba(0, 82, 255, 0.2)' : 'none'
                  }}
                >
                  {m.text}
                </div>
              ))}
              
              {isTyping && (
                <div style={{
                  alignSelf: 'flex-start', display: 'flex', gap: 4,
                  padding: '10px 14px', background: 'rgba(255,255,255,0.04)',
                  borderRadius: 12, width: 'fit-content'
                }}>
                  {[0,1,2].map(i => <span key={i} style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--accent)', animation: `bounce 1.2s infinite ${i * 0.2}s` }} />)}
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
                      padding: '5px 12px', borderRadius: 20, background: 'rgba(255,255,255,0.03)',
                      border: '1.2px solid rgba(0, 82, 255, 0.15)', color: '#d1d1d6',
                      fontSize: 10.5, cursor: 'pointer', transition: 'all 0.2s', fontWeight: 600
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = 'rgba(0, 82, 255, 0.1)';
                      e.currentTarget.style.borderColor = 'var(--accent)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                      e.currentTarget.style.borderColor = 'rgba(0, 82, 255, 0.15)';
                    }}
                  >
                    {chip}
                  </button>
                ))}
              </div>
            )}

            {/* Input Form Box */}
            <div style={{
              padding: '10px 16px', borderTop: '1px solid rgba(0, 82, 255, 0.15)',
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
                  background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
                  color: 'white', fontSize: 12, outline: 'none'
                }}
              />
              <button
                onClick={() => handleSendChat(chatInput)}
                disabled={!chatInput.trim()}
                style={{
                  width: 32, height: 32, borderRadius: '50%',
                  background: chatInput.trim() ? 'var(--accent)' : 'rgba(255,255,255,0.04)',
                  color: 'white', border: 'none', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: chatInput.trim() ? '0 4px 10px rgba(0, 82, 255, 0.3)' : 'none'
                }}
              >
                <SendIcon />
              </button>
            </div>

          </div>
        )}

        {/* STATE 4: IMMERSIVE VOICE ACTIVATION CANOPY */}
        {notchState === 'voice' && (
          <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 24,
            position: 'relative',
            animation: 'fadeIn 0.3s ease-out'
          }}>
            
            <div style={{
              fontSize: 10, fontFamily: 'var(--font-mono)', fontWeight: 700,
              color: 'rgba(0, 82, 255, 0.6)', textTransform: 'uppercase',
              letterSpacing: '0.1em', marginBottom: 12
            }}>
              Local AI Engine
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
                background: voiceStatus === 'listening' ? 'rgba(0, 82, 255, 0.15)' : 'rgba(255,255,255,0.02)',
                border: '2.5px solid var(--accent)',
                display: 'flex', alignItems: 'center',
                justifyContent: 'center', cursor: 'pointer', position: 'relative',
                boxShadow: '0 0 24px rgba(0, 82, 255, 0.3)',
                transition: 'all 0.3s ease',
                color: 'white'
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
                      background: 'var(--accent)',
                      borderRadius: 1.5,
                      animation: voiceStatus !== 'thinking' ? `voiceWave 0.5s ease-in-out infinite alternate` : 'none',
                      animationDelay: `${i * 0.08}s`,
                      boxShadow: '0 0 4px var(--accent)'
                    }}
                  />
                ))}
              </div>
            )}

            <div style={{
              fontSize: 12, color: '#ffffff', fontWeight: 700,
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
                background: 'none', border: 'none', color: '#8e8e93',
                cursor: 'pointer', fontSize: 10, fontFamily: 'var(--font-mono)',
                display: 'flex', alignItems: 'center', gap: 4
              }}
              onMouseEnter={e => e.currentTarget.style.color = 'white'}
              onMouseLeave={e => e.currentTarget.style.color = '#8e8e93'}
            >
              <CloseIcon />
              <span>EXIT</span>
            </button>

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
          from { height: 3px; }
          to { height: 12px; }
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
          border: 1.5px solid var(--accent);
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
      `}</style>
    </>
  )
}
