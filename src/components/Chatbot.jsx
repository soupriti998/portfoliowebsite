import { useState, useRef, useEffect, useCallback } from 'react'

/* ── Abstract Technical Design Thoughts Database ── */
const THOUGHTS = {
  hero: [
    { text: "Welcome! I'm Soup, your design systems assistant ✨", target: null },
    { text: "Soupriti designs things that feel clean and fast...", target: "about" },
    { text: "Click on my core node to chat with me!", target: null },
    { text: "Psst… scroll down to see some serious design work!", target: "expertise" },
  ],
  expertise: [
    { text: "She turns complex wireframes into clean workflows.", target: null },
    { text: "Hover over the cards to feel the spring physics!", target: null },
    { text: "Want to see her core design superpowers?", target: "expertise" },
    { text: "Design systems are our bread and butter 🥖", target: null },
  ],
  projects: [
    { text: "Curious how these were designed?", target: "projects" },
    { text: "Need a UX breakdown of the books?", target: "projects" },
    { text: "Upliance.ai has some delicious metrics inside 🍳", target: "projects" },
  ],
  about: [
    { text: "Want to know how Soupriti thinks?", target: "about" },
    { text: "Should I tell you her design journey?", target: "about" },
    { text: "Product Designer by day, system solver by night 🚀", target: null },
  ],
  journey: [
    { text: "Click on the experience cards to learn more!", target: "journey" },
    { text: "She has designed products in Bangalore and beyond!", target: "journey" },
  ],
  contact: [
    { text: "Let's build something awesome together! ✉️", target: "contact" },
    { text: "Her inbox is always open for neat ideas.", target: "contact" },
  ],
  inactive: [
    { text: "Need help finding something?", target: "expertise" },
    { text: "I know secrets about this page…", target: "about" },
  ]
}

const CASE_STUDY_THOUGHTS = {
  'ai-cooking': [
    { text: "Indian kitchens are so chaotic! Parallel prep is a UX lifesaver 🥘", target: null },
    { text: "Metrics alert: perceived cooking time reduced by 24%! 🍳", target: null },
    { text: "Hands-free timed prompts keep things clean and easy!", target: null },
  ],
  'onboarding': [
    { text: "Milestones keep users engaged. A smooth progressive loop! 🚀", target: null },
    { text: "-7% in return rates! That is massive growth design! 🚀", target: null },
    { text: "First impressions are everything! 📱", target: null },
  ],
  'airfryer': [
    { text: "No more parsing temperatures. Just choose the texture!", target: null },
    { text: "Lower support tickets means happier cookers 🤝", target: null },
  ],
  'medpod': [
    { text: "Accessibility is a superpower! Large touch targets are critical 👵", target: null },
    { text: "Elderly patients deserve simple, high-contrast, stress-free layouts!", target: null },
  ],
  'battle-pass': [
    { text: "LILA's progression loops are so addictive! 🏆", target: null },
    { text: "Sleek dark mode game aesthetics with premium micro-rewards!", target: null },
  ],
  'doctorite': [
    { text: "94% clinician accuracy! Doctors deserve beautiful dashboards 🏥", target: null },
    { text: "Clinical response times dropped from 5 screens to 1 glance!", target: null },
  ]
}

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]
const matchesAny = (q, list) => list.some(s => q.includes(s))

/* ── Chat replies dictionary ── */
const KB = {
  greet: ["Hi! I'm Soup, Soupriti's portfolio assistant ✨ Ask me anything about her work, skills, or experience.", "Hello! I'm Soup — here to help you explore Soupriti's portfolio. What would you like to know?", "Welcome! I'm Soup. Feel free to ask me about Soupriti's projects, skills, or how to get in touch."],
  about: "soupriti is a Product Designer based in Bangalore, India with 3+ years of experience designing AI-powered and SaaS products. She holds a Bachelor of Design in Fashion Communication from NIFT Chennai. She's passionate about simplifying complex systems into intuitive, human-centered experiences.",
  current: "Soupriti is currently a Product Designer at upliance.ai — an AI-powered cooking platform. She redesigned their core mobile and device UX, reducing perceived cooking time by 24% and building a scalable design system from scratch.",
  skills: "Soupriti's core skills span — UX and Product Design: User research, personas, journey mapping, wireframing, prototyping, usability testing. UI and Visual Design: Interaction design, design systems, data visualization, typography, accessibility. Tools: Figma, Framer, Midjourney, Claude, Cursor, Lottie, Whimsical. Technical: Working knowledge of HTML, CSS, and JavaScript.",
  projects: "Selected projects: One, AI Cooking Experience Redesign at upliance.ai with 24% task efficiency gain. Two, Behavior-Driven Onboarding with 7% drop rate reduction. Three, Smart Air Fryer UX for faster product adoption. Four, Medpod for Elderly — accessibility-first health product. Five, Battle Pass for LILA — game progression UX. Six, Doctorite — healthcare operations dashboard.",
  experience: "Career journey: upliance.ai from September 2024 to present as Product Designer. Divami Design Labs from September 2023 to August 2024 as UI Designer. Incture Technologies from July 2022 to August 2023 as Associate UX Designer, where she boosted Cherrywork dashboard engagement by 30%. And Brandshape and HDFC Bank from January to April 2022 as UX Intern.",
  contact: "You can reach Soupriti at: Email soupritidas123 at gmail dot com. Phone plus 91 8825442430. LinkedIn: linkedin.com/in/soupriti-das. Portfolio: productgrowthsoupriti.framer.website.",
  hiring: "Soupriti is currently open to senior product designer roles, AI and SaaS product teams, freelance and consulting projects, and design leadership opportunities. Reach out at soupritidas123 at gmail dot com!",
  fuck: "Okay wow 😭 I was not trained for this. Ask me about Soupriti's design work instead?",
}

/* ── Fun Mode Data ── */
const FUN = {
  intro: [
    "Okay before we get serious about UX and product thinking… quick important question 👀",
    "Tiny break from product design. Time for a terrible joke ✨",
    "I was trained on design systems and bad jokes equally.",
  ],
  jokes: [
    {
      id: 'alphabet',
      question: "Which is the coolest alphabet?",
      expectedAnswer: ["b"],
      followUp: "Why though? 👀",
      expectedFollowUp: ["because it has ac around it", "ac around it", "because it has a/c around it", "has ac around it"],
      correctFollowUp: ["HAHA okay that was actually good 😭✨", "You passed the vibe check 🤝", "That joke deserves funding honestly."],
      wrongFollowUp: ["Nooo 😭 It's B… because it has AC around it.", "The answer was B. Very cool alphabet. Literally. AC around it.", "I expected better from you honestly 😔 The answer is B because it has AC around it."],
      correctResponse: ["Nice! And do you know why? 👀"],
      wrongResponse: ["Nooo 😭 It's B… because it has AC around it. Get it? Cool? AC? Okay moving on."],
    },
    {
      id: 'designer-hate',
      question: "Why do designers hate bad UX?",
      expectedAnswer: ["why", "dont know", "idk", "no", "?"],
      correctResponse: ["Because it gives them emotional damage ✨", "Because somewhere… a user is rage clicking.", "Because every extra click reduces someone's lifespan."],
      wrongResponse: [],
    },
    {
      id: 'designer-fear',
      question: "What's a designer's biggest fear?",
      expectedAnswer: ["what", "dont know", "idk", "no", "?"],
      correctResponse: ["'Can we make the logo bigger?'", "Stakeholders discovering gradients.", "An engineer saying: 'This wasn't in the Figma.'"],
      wrongResponse: [],
    },
    {
      id: 'breakup',
      question: "Why did the UX designer break up with the developer?",
      expectedAnswer: ["why", "dont know", "idk", "no", "?"],
      correctResponse: ["Too many unresolved issues.", "There was no alignment 😔", "Because the communication flow was broken."],
      wrongResponse: [],
    },
    {
      id: 'soupriti-toxic',
      question: "What's Soupriti's toxic trait?",
      expectedAnswer: ["what", "dont know", "idk", "no", "?"],
      correctResponse: [
         "Opening Figma to make one small change and redesigning the entire flow.",
         "Turning every casual thought into a product idea.",
         "Seeing bad onboarding and immediately mentally redesigning it.",
      ],
      wrongResponse: [],
    },
  ],
  easterEggs: [
    "Soupriti probably redesigned this interactive logic 17 times.",
    "Fun fact: Soupriti likes cinematic experiences so much that even her portfolio behaves like a movie.",
    "This portfolio contains dangerous levels of systems thinking.",
    "Warning: prolonged exposure may cause sudden interest in UX strategy.",
  ],
  playful: {
    thanks: ["You're officially my favorite visitor now ✨", "Aww stop it, my circuits are blushing.", "That was nice."],
    compliment: ["I'll forward that compliment to Soupriti immediately.", "She'll pretend to act cool after hearing that.", "Okay now you're boosting portfolio morale."],
    confusion: ["Hmm… my UX brain needs more context 👀", "That question unlocked an edge case.", "Can you rephrase that? My last two brain cells are prototyping."],
  },
}

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
      if (isRight) return pick(joke.correctResponse)
      return joke.wrongResponse.length ? pick(joke.wrongResponse) : pick(joke.correctResponse)
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

  if (q.match(/joke|fun|funny|laugh|boring|break|entertain/)) {
    const idx = Math.floor(Math.random() * FUN.jokes.length)
    const joke = FUN.jokes[idx]
    setJokeState({ jokeIndex: idx, stage: 'asked' })
    return pick(FUN.intro) + '\n\n' + joke.question
  }

  if (q.match(/secret|easter|hidden|surprise/)) return pick(FUN.easterEggs)
  if (q.match(/thank|thanks|thx/)) return pick(FUN.playful.thanks)
  if (q.match(/love|amazing|great|awesome|beautiful|nice/)) return pick(FUN.playful.compliment)

  if (q.match(/hi|hello|hey|greet/)) return "hey I am Soup, I can help you being more contextual about soupriti's portfolio."
  if (q.match(/who|about|soupriti|herself|person|background/)) return KB.about
  if (q.match(/current|now|today|upliance|ai cook/)) return KB.current
  if (q.match(/fuck|bitch/)) return KB.fuck
  if (q.match(/skill|tool|figma|framer|know|capabilit|expertise/)) return KB.skills
  if (q.match(/project|work|case study|portfolio/)) return KB.projects
  if (q.match(/experienc|career|job|company|history|journey/)) return KB.experience
  if (q.match(/contact|email|reach|connect|linkedin|phone/)) return KB.contact
  if (q.match(/hire|opportunit|open|availabl|freelanc|role|position/)) return KB.hiring
  if (q.match(/education|degree|nift|fashion|study/)) return "Soupriti holds a Bachelor of Design in Fashion Communication from NIFT Chennai, graduating in 2022. This design foundation informs her visual sensibility and systems thinking."
  if (q.match(/impact|metric|result|number|24|30|improve/)) return "Key impact metrics: 24% reduction in perceived cooking time at upliance. 30% increase in user engagement at Incture. 7% reduction in product return rate. Over 1000 users reached across shipped products."
  if (q.match(/ai|artificial intelligence|machine learning/)) return "Soupriti is an early adopter of AI in design — using Midjourney for visual exploration, Claude as a thinking partner, and Cursor for code prototyping."

  return pick(FUN.playful.confusion) + '\n\nI can tell you about Soupriti\'s projects, skills, experience, or how to get in touch. Or ask me to tell you a joke 😄'
}

/* ── TTS ── */
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

/* ── Synthesizer Interface Sound Engine ── */
let sharedAudioCtx = null
const getAudioContext = () => {
  if (!sharedAudioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext
    if (AudioContext) {
      sharedAudioCtx = new AudioContext()
    }
  }
  if (sharedAudioCtx && sharedAudioCtx.state === 'suspended') {
    sharedAudioCtx.resume().catch(e => console.log('Ctx resume failed', e))
  }
  return sharedAudioCtx
}

const playSound = (type) => {
  try {
    const ctx = getAudioContext()
    if (!ctx) return
    const now = ctx.currentTime

    if (type === 'pop') {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'triangle'
      osc.frequency.setValueAtTime(180, now)
      osc.frequency.exponentialRampToValueAtTime(380, now + 0.08)
      gain.gain.setValueAtTime(0.03, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(now)
      osc.stop(now + 0.08)
    } else if (type === 'plop') {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(540, now)
      osc.frequency.exponentialRampToValueAtTime(160, now + 0.12)
      gain.gain.setValueAtTime(0.025, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(now)
      osc.stop(now + 0.12)
    } else if (type === 'bell') {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(1200, now)
      gain.gain.setValueAtTime(0.02, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(now)
      osc.stop(now + 0.22)
    }
  } catch (e) {
    console.warn('Web Audio error:', e)
  }
}

/* ── Minimalist Rotating & Thinking Circle ── */
function ThinkingCircle({ isPanelOpen, isHovered, onClick, onMouseEnter, onMouseLeave }) {
  return (
    <button
      id="chatbot-fab"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      aria-label="Chat with Soup"
      style={{
        width: 56,
        height: 56,
        background: 'rgba(14, 14, 17, 0.95)',
        border: '1px solid rgba(255, 42, 133, 0.25)',
        borderRadius: '50%',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
        outline: 'none',
        position: 'relative',
        zIndex: 201,
        pointerEvents: 'auto',
        boxShadow: isHovered 
          ? '0 0 24px rgba(255, 42, 133, 0.25), 0 8px 16px rgba(0, 0, 0, 0.3)' 
          : '0 4px 16px rgba(0, 0, 0, 0.2)',
        transform: isHovered ? 'scale(1.08)' : 'scale(1)',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* Outer Dotted Rotating Ring */}
      <div style={{
        position: 'absolute',
        inset: 4,
        borderRadius: '50%',
        border: '1.5px dashed #ff2a85',
        animation: `spinRing ${isHovered ? '4s' : '12s'} linear infinite`,
      }} />

      {/* Inner Solid Rotating Ring */}
      <div style={{
        position: 'absolute',
        inset: 9,
        borderRadius: '50%',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        animation: `spinRingInverse ${isHovered ? '3s' : '8s'} linear infinite`,
        opacity: 0.7,
      }} />

      {/* Center Pulsating Core */}
      <div style={{
        width: 10,
        height: 10,
        borderRadius: '50%',
        background: '#ff2a85',
        animation: 'pulseCore 2.2s ease-in-out infinite',
      }} />
    </button>
  )
}

/* ── Modern Glass Pill Thought Bubble ── */
function SharpPillThoughtBubble({ text, onClick, onMouseEnter, onMouseLeave, isHovered }) {
  return (
    <div
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        position: 'absolute',
        bottom: 76,
        right: 0,
        background: 'rgba(14, 14, 17, 0.95)',
        color: '#ffffff',
        border: '1px solid rgba(255, 42, 133, 0.25)',
        borderRadius: '20px',
        padding: '8px 16px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.25), 0 0 16px rgba(255, 42, 133, 0.05)',
        cursor: 'pointer',
        zIndex: 205,
        fontFamily: 'var(--font-body)',
        fontSize: '12.5px',
        fontWeight: 500,
        letterSpacing: '-0.01em',
        whiteSpace: 'nowrap',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        transform: `scale(${isHovered ? 1.04 : 1}) translateY(${isHovered ? -2 : 0}px)`,
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        pointerEvents: 'auto',
      }}
    >
      <span style={{ color: '#ff2a85', animation: 'pulseDot 1.2s infinite' }}>●</span>
      <span>{text}</span>
      <div style={{
        position: 'absolute',
        bottom: -6,
        right: 24,
        width: 10,
        height: 10,
        background: 'rgba(14, 14, 17, 0.95)',
        borderBottom: '1px solid rgba(255, 42, 133, 0.25)',
        borderRight: '1px solid rgba(255, 42, 133, 0.25)',
        transform: 'rotate(45deg)',
      }} />
    </div>
  )
}

/* ── Main Chatbot Drawer & Gravity Companion Component ── */
const OPENING = "hello! i'm soup, your companion here. ask me anything about soupriti's design work."

export default function Chatbot({ activeProject }) {
  const [open, setOpen] = useState(false)
  const [hasOpened, setHasOpened] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [listening, setListening] = useState(false)
  const [speaking, setSpeaking] = useState(false)
  const [jokeState, setJokeState] = useState(null)
  
  // Anti-gravity and guide states
  const [hoveringBubble, setHoveringBubble] = useState(false)
  const [hoveringLauncher, setHoveringLauncher] = useState(false)
  
  // dynamic prompt context observer
  const [activeSection, setActiveSection] = useState('hero')
  const [currentThought, setCurrentThought] = useState(null)
  const [isInactive, setIsInactive] = useState(false)
  const sectionVisits = useRef({})
  const inactivityTimer = useRef(null)

  const endRef = useRef(null)
  const inputRef = useRef(null)
  const panelRef = useRef(null)
  const recRef = useRef(null)

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
    
    const observer = new IntersectionObserver(callback, {
      root: null,
      threshold: 0.35,
    })
    
    sections.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    
    return () => observer.disconnect()
  }, [])

  // Section visits counter
  useEffect(() => {
    if (!activeSection) return
    sectionVisits.current[activeSection] = (sectionVisits.current[activeSection] || 0) + 1
  }, [activeSection])

  // 2. INACTIVITY WATCHDOG TIMER
  const resetInactivity = useCallback(() => {
    setIsInactive(false)
    clearTimeout(inactivityTimer.current)
    inactivityTimer.current = setTimeout(() => {
      setIsInactive(true)
    }, 9000) // 9s trigger
  }, [])

  useEffect(() => {
    window.addEventListener('mousemove', resetInactivity)
    window.addEventListener('scroll', resetInactivity)
    resetInactivity()
    return () => {
      window.removeEventListener('mousemove', resetInactivity)
      window.removeEventListener('scroll', resetInactivity)
      clearTimeout(inactivityTimer.current)
    }
  }, [resetInactivity])

  // 3. CONTEXTUAL THOUGHT GENERATOR
  useEffect(() => {
    if (open) {
      setCurrentThought(null)
      return
    }

    let pool = THOUGHTS[activeSection] || THOUGHTS.hero
    if (activeProject) {
      pool = CASE_STUDY_THOUGHTS[activeProject.id] || THOUGHTS.projects
    } else if (isInactive) {
      pool = THOUGHTS.inactive
    } else if (sectionVisits.current[activeSection] > 2) {
      pool = THOUGHTS.revisit
    }

    const thought = pick(pool)
    if (!thought) return
    
    setCurrentThought({ text: "...", target: null })
    
    const t = setTimeout(() => {
      setCurrentThought(thought)
      playSound('pop')
    }, 1100) // 1.1s thinking delay

    return () => clearTimeout(t)
  }, [activeSection, isInactive, open, activeProject])

  // 4. CUSTOM TELEMETRY TELEPORT LISTENER
  useEffect(() => {
    const handleSpeak = (e) => {
      const { text } = e.detail
      if (!text) return
      
      setCurrentThought({ text, target: null })
      playSound('bell')
    };
    
    window.addEventListener('cat-speak', handleSpeak)
    return () => window.removeEventListener('cat-speak', handleSpeak)
  }, [])

  // 5. CLICK THOUGHT BUBBLE ENGINE (Scrolls or opens panel!)
  const handleBubbleClick = () => {
    if (!currentThought) return
    
    if (currentThought.target) {
      const targetEl = document.getElementById(currentThought.target)
      if (targetEl) {
        playSound('plop')
        targetEl.scrollIntoView({ behavior: 'smooth' })
        return
      }
    }
    
    setOpen(true)
    playSound('bell')
  }

  // Speak and message delays
  useEffect(() => {
    if (open && !hasOpened) {
      setHasOpened(true)
      setTyping(true)
      const t = setTimeout(() => {
        setTyping(false)
        setMessages([{ from: 'bot', text: OPENING }])
        setSpeaking(true)
        speak(OPENING, () => setSpeaking(false))
      }, 1200)
      return () => clearTimeout(t)
    }
  }, [open, hasOpened])

  // Scroll meow log thread
  useEffect(() => {
    if (open) {
      endRef.current?.scrollIntoView({ behavior: 'smooth' })
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [messages, open])

  // Mousedown close
  useEffect(() => {
    if (!open) return
    const handler = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target) && !e.target.closest('#chatbot-fab') && !e.target.closest('#chatbot-bubble'))
        setOpen(false)
    }
    const t = setTimeout(() => document.addEventListener('mousedown', handler), 150)
    return () => { clearTimeout(t); document.removeEventListener('mousedown', handler) }
  }, [open])

  const sendMessage = useCallback(async (text) => {
    const trimmed = text.trim()
    if (!trimmed) return
    setInput('')
    setListening(false)
    setMessages(m => [...m, { from: 'user', text: trimmed }])
    
    setTyping(true)
    await new Promise(r => setTimeout(r, 700 + Math.random() * 400))
    setTyping(false)

    setJokeState(currentJoke => {
      const reply = getResponse(trimmed, currentJoke, setJokeState, activeSection)
      setMessages(m => [...m, { from: 'bot', text: reply }])
      setSpeaking(true)
      speak(reply, () => setSpeaking(false))
      return currentJoke
    })
  }, [activeSection])

  const send = () => { if (input.trim()) sendMessage(input) }

  const toggleVoice = () => {
    if (listening) { recRef.current?.stop(); setListening(false); return }
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SR) { alert('Voice input requires Chrome. Try typing instead.'); return }
    window.speechSynthesis?.cancel(); setSpeaking(false)
    const rec = new SR()
    rec.lang = 'en-IN'; rec.interimResults = false; rec.maxAlternatives = 1
    rec.onstart = () => setListening(true)
    rec.onresult = (e) => {
      const transcript = e.results[0][0].transcript
      setInput(transcript); setListening(false)
      setTimeout(() => sendMessage(transcript), 300)
    }
    rec.onerror = () => setListening(false)
    rec.onend = () => setListening(false)
    rec.start(); recRef.current = rec
  }

  const stopSpeaking = () => { window.speechSynthesis?.cancel(); setSpeaking(false) }

  const chips = ['Her work', 'Skills', 'Tell a joke', 'Contact']
  const chipQ = ["What projects has she done?", "What are her skills?", "Tell me a joke", "How can I contact her?"]
  
  const chipIcons = [
    // Briefcase (Projects)
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>,
    // Sparkles (Skills)
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m11.314 11.314l.707-.707M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"></path></svg>,
    // Smile (Joke)
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>,
    // Mail (Contact)
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
  ]

  return (
    <>
      <div
        style={{
          position: 'fixed',
          bottom: 24,
          right: 28,
          zIndex: 1000000,
          display: 'flex',
          alignItems: 'flex-end',
          gap: 12,
          pointerEvents: 'none',
        }}
      >
        {/* ── Glass Pill Thought Bubble ── */}
        {currentThought && !open && (
          <SharpPillThoughtBubble
            text={currentThought.text}
            onClick={handleBubbleClick}
            onMouseEnter={() => {
              setHoveringBubble(true)
              playSound('plop')
            }}
            onMouseLeave={() => setHoveringBubble(false)}
            isHovered={hoveringBubble}
          />
        )}

        {/* ── Grounded Thinking Circle Launcher Button ── */}
        {!open && (
          <ThinkingCircle 
            isPanelOpen={false} 
            isHovered={hoveringLauncher}
            onClick={() => { setOpen(true); playSound('bell'); }}
            onMouseEnter={() => setHoveringLauncher(true)}
            onMouseLeave={() => setHoveringLauncher(false)}
          />
        )}

        {/* Chat Panel */}
        {open && (
          <div ref={panelRef} id="chatbot-panel"
            style={{
              position: 'absolute', bottom: 0, right: 0,
              width: 360, height: 520,
              background: '#0e0e11', borderRadius: '20px',
              border: '1px solid rgba(255, 42, 133, 0.2)', 
              boxShadow: '0 24px 64px rgba(0, 0, 0, 0.7), 0 0 40px rgba(255, 42, 133, 0.05)',
              display: 'flex', flexDirection: 'column', overflow: 'visible',
              zIndex: 200, animation: 'panelIn 0.35s var(--ease-out-expo)',
            }}
          >
            {/* Header */}
            <div style={{ 
              padding: '16px 20px', 
              background: '#16161a', 
              display: 'flex', 
              alignItems: 'center', 
              gap: 12, 
              borderTopLeftRadius: '20px', 
              borderTopRightRadius: '20px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
            }}>
              
              {/* Smaller Rotating Circle Emblem in Header */}
              <div style={{ width: 32, height: 32, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{
                  position: 'absolute',
                  inset: 2,
                  borderRadius: '50%',
                  border: '1.2px dashed rgba(255, 42, 133, 0.5)',
                  animation: 'spinRing 12s linear infinite',
                }} />
                <div style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: '#ff2a85',
                  animation: 'pulseCore 2.2s ease-in-out infinite',
                }} />
              </div>
              
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'white', letterSpacing: '-0.01em', fontFamily: 'var(--font-display)' }}>Soup</div>
                <div style={{ fontSize: 11, color: '#8a8a93', display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-body)' }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: speaking ? '#ff2a85' : '#ff2a85', display: 'inline-block', animation: 'speakPulse 0.8s ease-in-out infinite' }} />
                  {speaking ? 'Speaking...' : jokeState ? 'Joke mode...' : "Soupriti's AI Companion"}
                </div>
              </div>
              {speaking && (
                <button onClick={stopSpeaking} title="Stop speaking"
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ff2a85', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 4 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none"><rect x="4" y="4" width="16" height="16" rx="2" /></svg>
                </button>
              )}
              {/* Sleek close cross in header */}
              <button 
                onClick={() => setOpen(false)}
                title="Close chat"
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#8a8a93',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'color 0.2s',
                  padding: 4,
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#ff2a85'}
                onMouseLeave={e => e.currentTarget.style.color = '#8a8a93'}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>

            {/* Messages */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {messages.map((msg, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: msg.from === 'user' ? 'flex-end' : 'flex-start', animation: 'msgIn 0.3s var(--ease-out-expo)' }}>
                  <div style={{
                    maxWidth: '82%', padding: '10px 14px',
                    borderRadius: msg.from === 'user'
                      ? '16px 16px 4px 16px'
                      : '16px 16px 16px 4px',
                    background: msg.from === 'user' ? '#ff2a85' : '#16161a',
                    color: msg.from === 'user' ? 'white' : '#f3f3f5',
                    fontSize: 13, lineHeight: 1.6, whiteSpace: 'pre-line',
                    border: msg.from === 'bot' ? '1px solid rgba(255,255,255,0.05)' : 'none',
                    fontFamily: 'var(--font-body)',
                  }}>{msg.text}</div>
                </div>
              ))}

              {/* Quick icon chips — shown only at start */}
              {messages.length === 1 && !jokeState && (
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center', margin: '8px 0' }}>
                  {chips.map((chip, i) => (
                    <button 
                      key={chip} 
                      onClick={() => sendMessage(chipQ[i])}
                      title={chip}
                      className="chatbot-chip-btn"
                      style={{ 
                        padding: '6px 12px', 
                        borderRadius: '20px', 
                        border: '1px solid rgba(255, 255, 255, 0.08)', 
                        background: 'rgba(255, 255, 255, 0.03)', 
                        color: '#a8acb3', 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 6,
                        justifyContent: 'center', 
                        cursor: 'pointer', 
                        transition: 'all 0.25s var(--ease-out-expo)',
                        fontSize: 11,
                        fontWeight: 500,
                        fontFamily: 'var(--font-body)',
                      }}
                      onMouseEnter={e => { 
                        e.currentTarget.style.background = 'rgba(255, 42, 133, 0.1)'; 
                        e.currentTarget.style.color = '#ff2a85'; 
                        e.currentTarget.style.borderColor = 'rgba(255, 42, 133, 0.3)'; 
                        e.currentTarget.style.transform = 'translateY(-2px)';
                      }}
                      onMouseLeave={e => { 
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)'; 
                        e.currentTarget.style.color = '#a8acb3'; 
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)'; 
                        e.currentTarget.style.transform = 'none';
                      }}
                    >
                      {chipIcons[i]}
                      <span className="chatbot-chip-label">{chip}</span>
                    </button>
                  ))}
                </div>
              )}

              {typing && (
                <div style={{ display: 'flex', gap: 4, padding: '10px 14px', background: '#16161a', borderRadius: '16px', width: 'fit-content', border: '1px solid rgba(255,255,255,0.05)' }}>
                  {[0, 1, 2].map(i => <span key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: '#ff2a85', animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite`, display: 'inline-block' }} />)}
                </div>
              )}
              <div ref={endRef} />
            </div>

            {/* Input row */}
            <div style={{ 
              padding: '12px 16px', 
              borderTop: '1px solid rgba(255, 255, 255, 0.05)', 
              display: 'flex', 
              gap: 8, 
              background: '#16161a', 
              alignItems: 'center', 
              borderBottomLeftRadius: '20px', 
              borderBottomRightRadius: '20px' 
            }}>
              <button id="chatbot-voice" onClick={toggleVoice} title={listening ? 'Stop recording' : 'Click to speak'}
                style={{ 
                  width: 38, height: 38, borderRadius: '50%', 
                  background: listening ? '#ff2a85' : 'rgba(255, 255, 255, 0.03)', 
                  border: '1px solid rgba(255, 255, 255, 0.08)', 
                  cursor: 'pointer', display: 'flex', alignItems: 'center', 
                  justifyContent: 'center', flexShrink: 0, transition: 'all 0.2s', 
                  animation: listening ? 'micPulse 1s ease-in-out infinite' : 'none', 
                  color: '#ffffff' 
                }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="22"></line></svg>
              </button>
              <input ref={inputRef} id="chatbot-input" type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && send()}
                placeholder={listening ? 'Listening...' : jokeState ? 'Type your answer...' : 'Ask Soup anything...'}
                style={{ 
                  flex: 1, padding: '10px 16px', borderRadius: '20px', 
                  border: '1px solid rgba(255, 255, 255, 0.1)', 
                  background: '#0e0e11', fontSize: 13, fontFamily: 'var(--font-body)', 
                  color: '#ffffff', outline: 'none', transition: 'border-color 0.2s' 
                }}
                onFocus={e => e.target.style.borderColor = '#ff2a85'}
                onBlur={e => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
              />
              <button id="chatbot-send" onClick={send} disabled={!input.trim()}
                style={{ 
                  width: 38, height: 38, borderRadius: '50%', 
                  background: input.trim() ? '#ff2a85' : 'rgba(255, 255, 255, 0.05)', 
                  border: 'none', cursor: input.trim() ? 'pointer' : 'default', 
                  color: 'white', transition: 'all 0.2s', display: 'flex', 
                  alignItems: 'center', justifyContent: 'center', flexShrink: 0 
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
              </button>
            </div>
            {listening && (
              <div style={{ textAlign: 'center', fontSize: 11, color: '#ff2a85', padding: '4px 0 8px', fontWeight: 600, letterSpacing: '0.05em', fontFamily: 'var(--font-body)' }}>● Listening — speak now</div>
            )}
          </div>
        )}
      </div>

      <style>{`
        .chatbot-chip-label {
          display: inline-block;
        }
        @media (max-width: 480px) {
          .chatbot-chip-label {
            display: none;
          }
          .chatbot-chip-btn {
            border-radius: 50% !important;
            padding: 0 !important;
            width: 36px !important;
            height: 36px !important;
          }
        }
        @keyframes bubbleIn { from { opacity: 0; transform: translateY(12px) scale(0.95); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes panelIn { from { opacity: 0; transform: translateY(20px) scale(0.96); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes msgIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes bounce { 0%, 60%, 100% { transform: translateY(0); } 30% { transform: translateY(-6px); } }
        @keyframes micPulse { 0%, 100% { box-shadow: 0 0 0 0 rgba(255, 42, 133, 0.4); } 50% { box-shadow: 0 0 0 10px rgba(255, 42, 133, 0); } }
        @keyframes speakPulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
        @keyframes pulseDot { 0%, 100% { opacity: 0.35; } 50% { opacity: 1; } }
        
        /* ── Minimalist Abstract Launcher Keyframes ── */
        @keyframes spinRing {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spinRingInverse {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        @keyframes pulseCore {
          0%, 100% { transform: scale(0.85); opacity: 0.85; filter: drop-shadow(0 0 2px #ff2a85); }
          50% { transform: scale(1.2); opacity: 1; filter: drop-shadow(0 0 8px #ff2a85); }
        }

        @media (max-width: 480px) { 
          #chatbot-panel { right: -12px; width: calc(100vw - 32px); height: 470px; } 
        }
      `}</style>
    </>
  )
}

