import { useState, useRef, useEffect, useCallback } from 'react'

/* ── Abstract Technical Design Thoughts Database ── */
const THOUGHTS = {
  hero: [
    { text: "Welcome! I'm Luffy, your design systems assistant ✨", target: null },
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
  greet: ["Hi! I'm Luffy, Soupriti's portfolio assistant ✨ Ask me anything about her work, skills, or experience.", "Hello! I'm Luffy — here to help you explore Soupriti's portfolio. What would you like to know?", "Welcome! I'm Luffy. Feel free to ask me about Soupriti's projects, skills, or how to get in touch."],
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

  if (q.match(/hi|hello|hey|greet/)) return "hey I am luffy, I can help you being more contextual about soupriti's portfolio."
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
      aria-label="Chat with Luffy"
      style={{
        width: 64,
        height: 64,
        background: 'var(--bg-card)',
        border: '2.5px solid #000000',
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
          ? '0 0 24px rgba(0, 82, 255, 0.2), 0 8px 16px rgba(0, 0, 0, 0.08)' 
          : '0 4px 12px rgba(0, 0, 0, 0.06)',
        transform: isHovered ? 'scale(1.08)' : 'scale(1)',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* Outer Dotted Rotating Ring */}
      <div style={{
        position: 'absolute',
        inset: 4,
        borderRadius: '50%',
        border: '1.8px dashed var(--accent)',
        animation: `spinRing ${isHovered ? '4s' : '16s'} linear infinite`,
      }} />

      {/* Inner Solid Rotating Ring */}
      <div style={{
        position: 'absolute',
        inset: 10,
        borderRadius: '50%',
        border: '1.2px solid var(--text-primary)',
        animation: `spinRingInverse ${isHovered ? '3s' : '10s'} linear infinite`,
        opacity: 0.7,
      }} />

      {/* Center Pulsating Core Core */}
      <div style={{
        width: 14,
        height: 14,
        borderRadius: '50%',
        background: 'var(--accent)',
        animation: 'pulseCore 2.2s ease-in-out infinite',
      }} />
    </button>
  )
}

/* ── Modern Sharp Pill Thought Bubble ── */
function SharpPillThoughtBubble({ text, onClick, onMouseEnter, onMouseLeave, isHovered }) {
  return (
    <div
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        position: 'absolute',
        bottom: 84, // Sit beautifully above the grounded cat
        right: 0,
        background: 'var(--bg-card)',
        color: 'var(--text-primary)',
        border: '2.5px solid #000000', // Premium sharp Swiss/comic border
        borderRadius: 'var(--radius-pill)', // Pill shape
        padding: '10px 20px',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
        cursor: 'pointer',
        zIndex: 205,
        fontFamily: 'var(--font-mono)', // Sharp mono typography
        fontSize: '12px',
        fontWeight: 700,
        letterSpacing: '-0.01em',
        whiteSpace: 'nowrap',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        transform: `scale(${isHovered ? 1.05 : 1}) translateY(${isHovered ? -3 : 0}px)`,
        transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1.25)',
        pointerEvents: 'auto',
      }}
    >
      <span style={{ color: 'var(--accent)', animation: 'pulseDot 1.2s infinite' }}>●</span>
      <span>{text}</span>
      {/* Crisp little sharp arrow pointing down to cat */}
      <div style={{
        position: 'absolute',
        bottom: -8,
        right: 36,
        width: 12,
        height: 12,
        background: 'var(--bg-card)',
        borderBottom: '2.5px solid #000000',
        borderRight: '2.5px solid #000000',
        transform: 'rotate(45deg)',
      }} />
    </div>
  )
}

/* ── Main Chatbot Drawer & Gravity Companion Component ── */
const OPENING = "hey I am luffy, I can help you being more contextual about soupriti's portfolio."

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
        {/* ── Sharp Pill Thought Bubble ── */}
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
              width: 360, height: 490,
              background: 'var(--bg-card)', borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--border)', boxShadow: 'var(--shadow-xl)',
              display: 'flex', flexDirection: 'column', overflow: 'visible',
              zIndex: 200, animation: 'panelIn 0.35s var(--ease-out-expo)',
            }}
          >
            {/* Header */}
            <div style={{ padding: 'var(--space-4) var(--space-5)', background: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 'var(--space-3)', borderTopLeftRadius: 'var(--radius-xl)', borderTopRightRadius: 'var(--radius-xl)' }}>
              
              {/* Smaller Rotating Circle Emblem in Header */}
              <div style={{ width: 32, height: 32, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{
                  position: 'absolute',
                  inset: 2,
                  borderRadius: '50%',
                  border: '1.2px dashed #ffffff',
                  animation: 'spinRing 12s linear infinite',
                }} />
                <div style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: 'var(--accent)',
                  animation: 'pulseCore 2.2s ease-in-out infinite',
                }} />
              </div>
              
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'white', letterSpacing: '-0.01em' }}>Luffy</div>
                <div style={{ fontSize: 11, color: '#a8acb3', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: speaking ? '#ff3b30' : '#34c759', display: 'inline-block', animation: speaking ? 'speakPulse 0.8s ease-in-out infinite' : 'none' }} />
                  {speaking ? 'Speaking...' : jokeState ? '🎭 Joke mode...' : "Soupriti's AI Companion"}
                </div>
              </div>
              {speaking && (
                <button onClick={stopSpeaking} title="Stop speaking"
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'white', fontSize: 18, marginRight: 8 }}>⏹</button>
              )}
              {/* Sleek close cross in header */}
              <button 
                onClick={() => setOpen(false)}
                title="Close chat"
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#a8acb3',
                  fontSize: 16,
                  transition: 'color 0.2s',
                  padding: 4,
                }}
                onMouseEnter={e => e.currentTarget.style.color = 'white'}
                onMouseLeave={e => e.currentTarget.style.color = '#a8acb3'}
              >
                ✕
              </button>
            </div>

            {/* Messages */}
            <div style={{ flex: 1, overflowY: 'auto', padding: 'var(--space-5)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              {messages.map((msg, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: msg.from === 'user' ? 'flex-end' : 'flex-start', animation: 'msgIn 0.3s var(--ease-out-expo)' }}>
                  <div style={{
                    maxWidth: '82%', padding: 'var(--space-4) var(--space-5)',
                    borderRadius: msg.from === 'user'
                      ? 'var(--radius-lg) var(--radius-sm) var(--radius-lg) var(--radius-lg)'
                      : 'var(--radius-sm) var(--radius-lg) var(--radius-lg) var(--radius-lg)',
                    background: msg.from === 'user' ? 'var(--accent)' : 'var(--bg-warm)',
                    color: msg.from === 'user' ? 'white' : 'var(--text-primary)',
                    fontSize: 13, lineHeight: 1.65, whiteSpace: 'pre-line',
                    border: msg.from === 'bot' ? '1px solid var(--border)' : 'none',
                  }}>{msg.text}</div>
                </div>
              ))}

              {/* Quick chips — shown only at start */}
              {messages.length === 1 && !jokeState && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                  {chips.map((chip, i) => (
                    <button key={chip} onClick={() => sendMessage(chipQ[i])}
                      style={{ padding: '5px 12px', borderRadius: 'var(--radius-pill)', border: '1px solid var(--border)', background: 'var(--bg-card)', color: 'var(--text-secondary)', fontSize: 12, cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'var(--font-body)' }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.color = 'white'; e.currentTarget.style.borderColor = 'var(--accent)'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'var(--bg-card)'; e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
                    >{chip}</button>
                  ))}
                </div>
              )}

              {typing && (
                <div style={{ display: 'flex', gap: 4, padding: 'var(--space-3) var(--space-5)', background: 'var(--bg-warm)', borderRadius: 'var(--radius-lg)', width: 'fit-content', border: '1px solid var(--border)' }}>
                  {[0, 1, 2].map(i => <span key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--text-muted)', animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite`, display: 'inline-block' }} />)}
                </div>
              )}
              <div ref={endRef} />
            </div>

            {/* Input row */}
            <div style={{ padding: 'var(--space-3) var(--space-4)', borderTop: '1px solid var(--border)', display: 'flex', gap: 8, background: 'var(--bg-card)', alignItems: 'center', borderBottomLeftRadius: 'var(--radius-xl)', borderBottomRightRadius: 'var(--radius-xl)' }}>
              <button id="chatbot-voice" onClick={toggleVoice} title={listening ? 'Stop recording' : 'Click to speak'}
                style={{ width: 38, height: 38, borderRadius: '50%', background: listening ? 'var(--accent)' : 'var(--bg-warm)', border: '1px solid var(--border)', cursor: 'pointer', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.2s', animation: listening ? 'micPulse 1s ease-in-out infinite' : 'none', color: listening ? 'white' : 'var(--text-primary)' }}
              >🎤</button>
              <input ref={inputRef} id="chatbot-input" type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && send()}
                placeholder={listening ? '🎤 Listening...' : jokeState ? 'Type your answer...' : 'Ask Luffy anything...'}
                style={{ flex: 1, padding: 'var(--space-3) var(--space-4)', borderRadius: 'var(--radius-pill)', border: '1px solid var(--border)', background: 'var(--bg)', fontSize: 13, fontFamily: 'var(--font-body)', color: 'var(--text-primary)', outline: 'none', transition: 'border-color 0.2s' }}
                onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                onBlur={e => e.target.style.borderColor = 'var(--border)'}
              />
              <button id="chatbot-send" onClick={send} disabled={!input.trim()}
                style={{ width: 38, height: 38, borderRadius: '50%', background: input.trim() ? 'var(--accent)' : 'var(--border)', border: 'none', cursor: input.trim() ? 'pointer' : 'default', color: 'white', fontSize: 16, transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
              >→</button>
            </div>
            {listening && (
              <div style={{ textAlign: 'center', fontSize: 11, color: 'var(--accent)', padding: '4px 0 8px', fontWeight: 600, letterSpacing: '0.05em' }}>● Listening — speak now</div>
            )}
          </div>
        )}
      </div>

      <style>{`
        @keyframes bubbleIn { from { opacity: 0; transform: translateY(12px) scale(0.95); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes panelIn { from { opacity: 0; transform: translateY(20px) scale(0.96); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes msgIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes bounce { 0%, 60%, 100% { transform: translateY(0); } 30% { transform: translateY(-6px); } }
        @keyframes micPulse { 0%, 100% { box-shadow: 0 0 0 0 rgba(0, 82, 255, 0.4); } 50% { box-shadow: 0 0 0 10px rgba(0, 82, 255, 0); } }
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
          0%, 100% { transform: scale(0.85); opacity: 0.85; filter: drop-shadow(0 0 2px var(--accent)); }
          50% { transform: scale(1.2); opacity: 1; filter: drop-shadow(0 0 8px var(--accent)); }
        }

        @media (max-width: 480px) { 
          #chatbot-panel { right: -12px; width: calc(100vw - 32px); height: 470px; } 
        }
      `}</style>
    </>
  )
}
