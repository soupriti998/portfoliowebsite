import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FadeUp, Label } from './utils'

/* ── High-Fidelity Custom SVG Icons (Replacing Emojis) ── */
const CheckIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)

const SearchIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
)

const BulbIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A5 5 0 0 0 8 8c0 1 .4 2.5 1.5 3.5.7.8 1.3 1.5 1.5 2.5M9 18h6M10 22h4"/>
  </svg>
)

const NibIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275Z"/>
  </svg>
)

const RefreshIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8M21 3v5h-5M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16M3 21v-5h5"/>
  </svg>
)

const BoxIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
    <polyline points="3.29 7 12 12 20.71 7"/>
    <line x1="12" y1="22" x2="12" y2="12"/>
  </svg>
)

const MouseIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="2" width="14" height="20" rx="7"/>
    <line x1="12" y1="6" x2="12" y2="12"/>
  </svg>
)

const PaintIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 14.7255 3.09032 17.1962 4.85857 19C5.0371 19.1785 5.09703 19.4444 5.01168 19.6841C4.79603 20.2898 4.68 20.9317 4.68 21.6C4.68 21.8209 4.85909 22 5.08 22H12Z"/>
    <circle cx="7.5" cy="10.5" r="1.5" fill="currentColor"/><circle cx="11.5" cy="7.5" r="1.5" fill="currentColor"/><circle cx="16.5" cy="9.5" r="1.5" fill="currentColor"/>
  </svg>
)

const TargetIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
  </svg>
)

const PuzzleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11.75 3a2.5 2.5 0 0 1 4.96.6L16.5 5h3a1 1 0 0 1 1 1v3l1.4-.3a2.5 2.5 0 0 1 .6 4.96l-2 .4v3a1 1 0 0 1-1 1h-3l.3 1.4a2.5 2.5 0 0 1-4.96.6L11.75 19H9a1 1 0 0 1-1-1v-3l-1.4.3a2.5 2.5 0 0 1-.6-4.96l2-.4V6a1 1 0 0 1 1-1h3.25Z"/>
  </svg>
)

const PeopleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
)

const BookIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
  </svg>
)

const CoffeeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><line x1="6" y1="2" x2="6" y2="4"/><line x1="10" y1="2" x2="10" y2="4"/><line x1="14" y1="2" x2="14" y2="4"/>
  </svg>
)

const CameraIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/>
  </svg>
)

const PencilIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
  </svg>
)

const BrainIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1 0-3.12 3 3 0 0 1 0-3.88 2.5 2.5 0 0 1 0-3.12A2.5 2.5 0 0 1 9.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 0-3.12 3 3 0 0 0 0-3.88 2.5 2.5 0 0 0 0-3.12A2.5 2.5 0 0 0 14.5 2Z"/>
  </svg>
)

const BriefcaseIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
  </svg>
)

const MapPinIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
  </svg>
)

const ClockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
)

const RocketIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 16.5c-1.5 1.25-2.5 3.5-2.5 3.5s2.25-1 3.5-2.5M12 2C6 2 2 6 2 12c0 2.5 1.5 4.5 3.5 5.5l11-11C15.5 4.5 13.5 3 12 2Z"/><path d="M20 4c.5-1 .5-1 .5-1s0 0-1 .5l-2.5 2.5 3 3L20 4Z"/><path d="M19 9c-1-1.5-2.5-3-3.5-3.5l-11 11c1 2 3 3.5 5.5 3.5 6 0 10-4 10-10Z"/>
  </svg>
)

const RadarIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
  </svg>
)

const GridPlusIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/><path d="M6.5 17.5h4M8.5 15.5v4"/>
  </svg>
)

const GrowthMetricsIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/>
  </svg>
)

const CAROUSEL_CARDS = [
  {
    id: 1,
    title: 'Solving real problems',
    text: 'Designing systems that reduce friction and create meaningful user outcomes.',
    icon: <RadarIcon />,
    glow: 'rgba(0, 82, 255, 0.5)',
    color: '#0052ff'
  },
  {
    id: 2,
    title: 'Simplifying complex systems',
    text: 'Turning technical workflows into intuitive and scalable experiences.',
    icon: <GridPlusIcon />,
    glow: 'rgba(79, 70, 229, 0.5)',
    color: '#4f46e5'
  },
  {
    id: 3,
    title: 'Creating business impact',
    text: 'Bridging user needs with measurable product and business growth.',
    icon: <GrowthMetricsIcon />,
    glow: 'rgba(37, 99, 235, 0.5)',
    color: '#2563eb'
  }
]

const CorePurposeCarousel = () => {
  const [cards, setCards] = useState(CAROUSEL_CARDS)
  const [isHovered, setIsHovered] = useState(false)
  
  // Auto-swipe effect
  useEffect(() => {
    if (isHovered) return
    const timer = setInterval(() => {
      setCards(prev => {
        const newCards = [...prev]
        const first = newCards.shift()
        newCards.push(first)
        return newCards
      })
    }, 3800)
    return () => clearInterval(timer)
  }, [isHovered])

  const handleNext = () => {
    setCards(prev => {
      const newCards = [...prev]
      const first = newCards.shift()
      newCards.push(first)
      return newCards
    })
  }

  return (
    <div 
      style={{
        position: 'relative',
        width: '100%',
        height: 250,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        perspective: 1000,
        marginTop: 20
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence mode="popLayout">
        {cards.map((card, index) => {
          const isFront = index === 0
          
          return (
            <motion.div
              key={card.id}
              layout
              initial={{ scale: 0.8, opacity: 0, x: 100 }}
              animate={{ 
                scale: isFront ? 1 : 1 - (index * 0.05), 
                opacity: isFront ? 1 : 1 - (index * 0.15), 
                x: isFront ? 0 : index * 14,
                y: isFront ? 0 : index * 8,
                zIndex: cards.length - index
              }}
              exit={{ scale: 0.8, opacity: 0, x: -100, transition: { duration: 0.2 } }}
              transition={{ 
                type: 'spring', 
                stiffness: 300, 
                damping: 30, 
                mass: 0.8 
              }}
              onClick={isFront ? handleNext : undefined}
              whileHover={isFront ? { 
                scale: 1.01, 
                y: -3, 
                rotateX: 1.5, 
                rotateY: -1.5,
                boxShadow: '0 20px 40px -12px rgba(15, 23, 42, 0.07), 0 6px 18px -6px rgba(15, 23, 42, 0.03)'
              } : {}}
              style={{
                position: 'absolute',
                width: '100%',
                maxWidth: 380,
                height: 180,
                background: 'var(--bg-card)',
                borderRadius: 28,
                border: '1.2px solid var(--border)',
                padding: '24px 28px',
                cursor: isFront ? 'pointer' : 'default',
                boxShadow: isFront 
                  ? '0 12px 32px -8px rgba(15, 23, 42, 0.05), 0 4px 12px -5px rgba(15, 23, 42, 0.02)' 
                  : '0 2px 8px -4px rgba(15, 23, 42, 0.02)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: 16,
                transformStyle: 'preserve-3d',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <motion.div 
                  style={{
                    width: 48, height: 48, borderRadius: '50%',
                    background: `linear-gradient(135deg, var(--bg-card), var(--bg-warm))`,
                    border: '1.2px solid var(--border)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: card.color,
                    boxShadow: isFront ? '0 4px 10px -2px rgba(15, 23, 42, 0.08)' : 'none'
                  }}
                  animate={isFront ? { scale: [1, 1.05, 1], rotate: [0, 4, -4, 0] } : {}}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                >
                  {card.icon}
                </motion.div>
                <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>
                  {card.title}
                </h3>
              </div>
              <p style={{ margin: 0, fontSize: 13.5, color: 'var(--text-secondary)', lineHeight: 1.5, fontFamily: 'var(--font-body)' }}>
                {card.text}
              </p>
            </motion.div>
          )
        })}
      </AnimatePresence>
      
      {/* Pagination indicators */}
      <div style={{
        position: 'absolute',
        bottom: -24,
        display: 'flex',
        gap: 6
      }}>
        {CAROUSEL_CARDS.map((c) => (
          <div key={c.id} style={{
            width: cards[0].id === c.id ? 20 : 6,
            height: 6,
            borderRadius: 3,
            background: cards[0].id === c.id ? 'var(--text-primary)' : 'var(--border)',
            transition: 'all 0.3s var(--ease-out-expo)'
          }} />
        ))}
      </div>
    </div>
  )
}

export default function About() {
  const [activeExplain, setActiveExplain] = useState("Click on any highlight inside the Bento grid to activate the Luffy AI thought stream!")

  /* ── 01. Design Toolkit Auto-scroll index ── */
  const [toolkitIndex, setToolkitIndex] = useState(0)
  const [hoveredToolkit, setHoveredToolkit] = useState(false)

  useEffect(() => {
    if (hoveredToolkit) return
    const timer = setInterval(() => {
      setToolkitIndex((prev) => (prev + 1) % 4)
    }, 3200)
    return () => clearInterval(timer)
  }, [hoveredToolkit])

  /* ── 02. Core Qualities Wallet Stack States ── */
  const [topQualIndex, setTopQualIndex] = useState(0)
  const [isHoveredQual, setIsHoveredQual] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setTopQualIndex((prev) => (prev + 1) % 4)
    }, 3800)
    return () => clearInterval(timer)
  }, [])

  /* ── 03. Strategic Process Pipeline Progressive reveal ── */
  const [processStep, setProcessStep] = useState(1)

  useEffect(() => {
    const timer = setInterval(() => {
      setProcessStep((prev) => (prev === 4 ? 1 : prev + 1))
    }, 2800)
    return () => clearInterval(timer)
  }, [])

  /* ── Horizontal Scroll Reveal States & Refs ── */
  const containerRef = useRef(null)
  const trackRef = useRef(null)
  const [translateX, setTranslateX] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  // Mobile layout detection breakpoint
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024) // Revert to stacked on tablet/mobile for touch-friendly feel
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Scroll listener translating vertical scrolling to horizontal translating
  useEffect(() => {
    if (isMobile) return

    const handleScroll = () => {
      if (!containerRef.current || !trackRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const containerHeight = rect.height
      const viewportHeight = window.innerHeight
      
      // Calculate active scroll range when the section is scrolled
      const scrolled = -rect.top
      const maxScroll = containerHeight - viewportHeight
      
      if (maxScroll <= 0) return
      
      const progress = Math.max(0, Math.min(scrolled / maxScroll, 1))
      
      // Get the width of all horizontal cards aligned side-by-side
      const trackWidth = trackRef.current.scrollWidth
      const viewportWidth = window.innerWidth
      const maxTranslate = Math.max(0, trackWidth - viewportWidth + 64) // 64px offset cushion
      
      setTranslateX(progress * maxTranslate)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)
    // Tiny delay to ensure styles and layouts are calculated
    const timer = setTimeout(handleScroll, 100)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
      clearTimeout(timer)
    }
  }, [isMobile])

  const triggerCatSpeak = (text) => {
    setActiveExplain(text)
    const speakEvent = new CustomEvent('cat-speak', {
      detail: { text }
    });
    window.dispatchEvent(speakEvent);
  };

  return (
    <section 
      id="about" 
      ref={containerRef}
      style={{ 
        position: 'relative', 
        height: isMobile ? 'auto' : '230vh', 
        background: 'var(--bg-warm)', 
        borderTop: '1px solid var(--border)', 
        overflow: 'visible'
      }}
    >
      <div style={{
        position: isMobile ? 'relative' : 'sticky',
        top: 0,
        height: isMobile ? 'auto' : '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: isMobile ? 'var(--space-9) 0' : 0,
        overflow: 'visible'
      }}>
        <div className="container" style={{ position: 'relative', zIndex: 2, width: '100%' }}>
          
          {/* Title Block */}
          <div style={{ marginBottom: isMobile ? 'var(--space-8)' : 'var(--space-6)', maxWidth: '800px' }}>
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
                I'm <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>soupriti</strong>, a Product Designer based in Bangalore. With a visual design foundation from <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>NIFT Chennai</strong>, I specialize in combining rigorous user ethnography with high-end, functional React prototypes.
              </p>
            </FadeUp>
          </div>

          {/* ── BENTO GRID LAYOUT (Unified Bento Grid) ── */}
          <div className="bento-rectangle-outline" style={{
            marginTop: 'var(--space-4)',
            overflow: 'visible',
            width: '100%'
          }}>

            <div 
              ref={trackRef}
              className="about-bento-grid-inner" 
              style={{
                display: isMobile ? 'grid' : 'flex',
                gridTemplateColumns: isMobile ? 'repeat(12, 1fr)' : undefined,
                flexDirection: isMobile ? undefined : 'row',
                gap: 24,
                width: isMobile ? '100%' : 'max-content',
                transform: isMobile ? undefined : `translateX(-${translateX}px)`,
                transition: isMobile ? undefined : 'transform 0.08s cubic-bezier(0.25, 1, 0.5, 1)',
                paddingRight: isMobile ? 0 : 120
              }}
            >

              {/* CARD 1: 01 // DESIGN TOOLKIT (Auto Scrolling capabilities horizontally) */}
              <div 
                className="bento-box shadow-card" 
                onMouseEnter={() => setHoveredToolkit(true)}
                onMouseLeave={() => setHoveredToolkit(false)}
                style={{
                  width: isMobile ? '100%' : '520px',
                  height: isMobile ? 'auto' : '380px',
                  flexShrink: 0,
                  gridColumn: isMobile ? 'span 12' : undefined,
                  background: 'var(--bg-card)',
                  border: '1.5px solid var(--border)',
                  borderRadius: 24,
                  padding: '24px 28px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <h4 className="bento-card-header" style={{ margin: 0, border: 'none', padding: 0 }}>
                  01 // DESIGN TOOLKIT
                </h4>
                <span style={{ 
                  fontSize: 8, 
                  fontFamily: 'var(--font-mono)', 
                  fontWeight: 700, 
                  color: hoveredToolkit ? '#8e8e93' : 'var(--accent)', 
                  background: hoveredToolkit ? 'rgba(0,0,0,0.04)' : 'rgba(0, 82, 255, 0.06)',
                  padding: '2px 6px',
                  borderRadius: 4,
                  letterSpacing: '0.04em',
                  transition: 'all 0.2s'
                }}>
                  {hoveredToolkit ? 'PAUSED' : 'AUTO_SCROLL'}
                </span>
              </div>

              {/* Horizontal sliding viewport */}
              <div style={{ width: '100%', overflow: 'hidden', position: 'relative', height: 112 }}>
                <div style={{
                  display: 'flex',
                  width: '400%',
                  height: '100%',
                  transform: `translateX(-${toolkitIndex * 25}%)`,
                  transition: 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)'
                }}>
                  {[
                    { title: 'Product Design', sub: 'Figma to React', icon: <BoxIcon />, text: "Holistic end-to-end design from user research mapping to React/JS front-end logic." },
                    { title: 'User Research', sub: 'Contextual Inquiry', icon: <SearchIcon />, text: "Ethnographic logs, user interviews, telemetry mapping, and usability testing." },
                    { title: 'Interaction Design', sub: 'Micro-interactions', icon: <MouseIcon />, text: "Fluid animations, micro-interactions, state transitions, and responsive structures." },
                    { title: 'UI Design & Systems', sub: 'Figma Spec Systems', icon: <PaintIcon />, text: "High-contrast visual design, custom icon vectors, typography rhythms, and design systems." }
                  ].map((item) => (
                    <div 
                      key={item.title}
                      className="bento-toolkit-slider-item"
                      onClick={() => triggerCatSpeak(item.text)}
                      style={{
                        width: '25%',
                        height: '100%',
                        padding: '0 8px',
                        display: 'flex',
                        alignItems: 'center',
                        flexShrink: 0
                      }}
                    >
                      <div style={{
                        width: '100%',
                        height: '100%',
                        padding: '20px 24px',
                        borderRadius: 16,
                        border: '1.2px solid var(--border)',
                        background: 'var(--bg-warm)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 20,
                        transition: 'all 0.25s',
                        userSelect: 'none'
                      }}>
                        <div className="toolkit-icon-capsule" style={{
                          width: 44, height: 44, borderRadius: '50%',
                          background: 'var(--bg-card)',
                          border: '1.2px solid var(--border)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          color: 'var(--accent)', flexShrink: 0,
                          transition: 'all 0.25s'
                        }}>{item.icon}</div>
                        
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>
                            {item.title}
                          </span>
                          <span style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginTop: 2, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                            {item.sub}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom selection slider dots */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 12 }}>
                {[0, 1, 2, 3].map(idx => (
                  <button
                    key={idx}
                    onClick={() => setToolkitIndex(idx)}
                    style={{
                      width: toolkitIndex === idx ? 16 : 6,
                      height: 6,
                      borderRadius: 3,
                      background: toolkitIndex === idx ? 'var(--accent)' : 'rgba(var(--accent-rgb), 0.15)',
                      border: 'none',
                      cursor: 'pointer',
                      padding: 0,
                      transition: 'all 0.25s cubic-bezier(0.23, 1, 0.32, 1)',
                      outline: 'none'
                    }}
                  />
                ))}
              </div>
            </div>

            {/* CARD 2: 02 // CORE QUALITIES (Stacked Deck of Cards in Stacks of 3) */}
            <div 
              className="bento-box shadow-card"
              onMouseEnter={() => setIsHoveredQual(true)}
              onMouseLeave={() => setIsHoveredQual(false)}
              style={{
                width: isMobile ? '100%' : '440px',
                height: isMobile ? 'auto' : '380px',
                flexShrink: 0,
                gridColumn: isMobile ? 'span 12' : undefined,
                background: 'var(--bg-card)',
                border: '1.5px solid var(--border)',
                borderRadius: 24,
                padding: '24px 28px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <h4 className="bento-card-header" style={{ margin: 0, border: 'none', padding: 0 }}>
                  02 // CORE QUALITIES
                </h4>
                <span style={{ 
                  fontSize: 7.5, 
                  fontFamily: 'var(--font-mono)', 
                  fontWeight: 700, 
                  color: 'rgba(var(--accent-rgb), 0.6)', 
                  background: 'rgba(var(--accent-rgb), 0.05)',
                  padding: '2px 6px',
                  borderRadius: 4,
                  letterSpacing: '0.04em'
                }}>
                  SWIPE_STACK_3D
                </span>
              </div>

              {/* Stack holder viewport */}
              <div style={{
                position: 'relative',
                width: '100%',
                height: 180,
                marginTop: 8
              }}>
                {[
                  { 
                    label: 'Empathetic', 
                    val: '100%', 
                    text: "Soupriti spent 50+ hours in messy kitchens observing cooking habits to design presets!", 
                    icon: (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                      </svg>
                    )
                  },
                  { 
                    label: 'Detail-oriented', 
                    val: '98%', 
                    text: "She maintains a 100% perfect match between Figma specs and React production code.", 
                    icon: (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 3v18M3 12h18M12 9l-3 3 3 3M12 9l3 3-3 3" />
                      </svg>
                    )
                  },
                  { 
                    label: 'User-focused', 
                    val: '95%', 
                    text: "She translates user interaction logs into simple presetted textures to reduce onboarding churn.", 
                    icon: (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                    )
                  },
                  { 
                    label: 'Always curious', 
                    val: '100%', 
                    text: "Self-taught React during NIFT design courses to bring visual ideas to working code!", 
                    icon: (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1 0-3.12 3 3 0 0 1 0-4.88 2.5 2.5 0 0 1 0-3.12A2.5 2.5 0 0 1 9.5 2Z" />
                        <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 0-3.12 3 3 0 0 0 0-4.88 2.5 2.5 0 0 0 0-3.12A2.5 2.5 0 0 0 14.5 2Z" />
                      </svg>
                    )
                  }
                ].map((item, index) => {
                  const relativeIndex = (index - topQualIndex + 4) % 4;
                  const isTop = relativeIndex === 0;
                  const isMiddle = relativeIndex === 1;
                  const isBottom = relativeIndex === 2;
                  const isHidden = relativeIndex === 3;
                  
                  // Stacking styles math
                  let transform = `translateY(${relativeIndex * 14}px) scale(${1 - relativeIndex * 0.045})`;
                  let opacity = 1 - relativeIndex * 0.35;
                  let zIndex = 10 - relativeIndex;
                  let filter = `blur(${relativeIndex * 0.4}px)`;
                  
                  if (isHidden) {
                    transform = 'translateY(-100px) rotate(-8deg) scale(0.92)';
                    opacity = 0;
                    filter = 'blur(4px)';
                  }

                  if (isTop && isHoveredQual) {
                    // On hover, active top card shifts upwards slightly for micro-interaction tactile delight
                    transform = 'translateY(-8px) scale(1.015)';
                  }

                  return (
                    <div 
                      key={item.label}
                      onClick={() => isTop && triggerCatSpeak(item.text)}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        borderRadius: 18,
                        background: 'var(--bg-card)',
                        border: isTop ? '1.5px solid var(--accent)' : '1.2px solid var(--border)',
                        padding: '18px 22px',
                        boxShadow: isTop ? '0 12px 30px rgba(0, 82, 255, 0.08)' : 'var(--shadow-sm)',
                        transform,
                        opacity,
                        zIndex,
                        filter,
                        transition: 'transform 0.4s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.4s, filter 0.4s, border-color 0.3s',
                        cursor: isTop ? 'pointer' : 'default',
                        userSelect: 'none'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                          <div style={{
                            width: 32, height: 32, borderRadius: '50%',
                            background: 'rgba(var(--accent-rgb), 0.08)',
                            color: 'var(--accent)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            flexShrink: 0
                          }}>{item.icon}</div>
                          
                          <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>
                            {item.label}
                          </span>
                        </div>

                        <span style={{ 
                          fontSize: 10.5, 
                          fontFamily: 'var(--font-mono)', 
                          fontWeight: 700, 
                          color: 'var(--accent)', 
                          background: 'rgba(var(--accent-rgb), 0.06)', 
                          padding: '2px 8px', 
                          borderRadius: 20 
                        }}>
                          {item.val}
                        </span>
                      </div>

                      <p style={{
                        fontSize: 12.5,
                        color: 'var(--text-secondary)',
                        fontFamily: 'var(--font-body)',
                        lineHeight: 1.5,
                        margin: 0
                      }}>
                        {item.text}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* CARD 3: 03 // STRATEGIC PROCESS (Connected Pipeline Timeline with sequential pop-ins) */}
            <div 
              className="bento-box shadow-card" 
              style={{
                width: isMobile ? '100%' : '460px',
                height: isMobile ? 'auto' : '380px',
                flexShrink: 0,
                gridColumn: isMobile ? 'span 12' : undefined,
                background: 'var(--bg-card)',
                border: '1.5px solid var(--border)',
                borderRadius: 24,
                padding: '24px 28px',
                position: 'relative'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <h4 className="bento-card-header" style={{ margin: 0, border: 'none', padding: 0 }}>
                  03 // STRATEGIC PROCESS
                </h4>
                <span style={{ 
                  fontSize: 8, 
                  fontFamily: 'var(--font-mono)', 
                  fontWeight: 700, 
                  color: 'var(--accent)', 
                  background: 'rgba(0, 82, 255, 0.08)',
                  padding: '2px 6px',
                  borderRadius: 4,
                  letterSpacing: '0.04em'
                }}>
                  PIPELINE_STEP_0{processStep}
                </span>
              </div>
              
              {/* Vector Flow Connector Line */}
              <div style={{
                position: 'absolute', left: 40, top: 80, bottom: 44, width: 2,
                borderLeft: '2px dashed rgba(0, 82, 255, 0.15)', zIndex: 1
              }} />

              {/* Glowing active blue line mapping the progress */}
              <div style={{
                position: 'absolute', left: 40, top: 80, 
                height: `${(processStep - 1) * 29}%`, 
                maxHeight: 'calc(100% - 110px)',
                width: 2,
                borderLeft: '2px solid var(--accent)',
                transition: 'height 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
                zIndex: 2
              }} />

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, position: 'relative', zIndex: 3 }}>
                {[
                  { label: 'Research deeply', num: '01', icon: <SearchIcon />, text: "She maps ethnographic cooking journals before designing a single high-fidelity screen." },
                  { label: 'Think strategically', num: '02', icon: <BulbIcon />, text: "Every layout connects directly to key product metrics: retention, rating, and adoption." },
                  { label: 'Design intentionally', num: '03', icon: <NibIcon />, text: "No generic presets. She uses clear visual indicators to manage cognitive load." },
                  { label: 'Iterate constantly', num: '04', icon: <RefreshIcon />, text: "From early grey paper prototypes to fully working React models, she builds to learn." }
                ].map((item, index) => {
                  const isActive = index + 1 <= processStep;
                  const isLatest = index + 1 === processStep;
                  
                  return (
                    <div 
                      key={item.label}
                      className="bento-process-item"
                      onClick={() => isActive && triggerCatSpeak(item.text)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 16,
                        cursor: isActive ? 'pointer' : 'default',
                        userSelect: 'none',
                        opacity: isActive ? 1 : 0.12,
                        transform: isActive ? (isLatest ? 'scale(1.02) translateX(4px)' : 'scale(1) translateX(0)') : 'scale(0.97)',
                        filter: isActive ? 'blur(0)' : 'blur(0.5px)',
                        transition: 'opacity 0.4s ease-out, transform 0.4s cubic-bezier(0.23, 1, 0.32, 1), filter 0.4s'
                      }}
                    >
                      <div className="process-circle" style={{
                        width: 26, height: 26, borderRadius: '50%',
                        background: isLatest ? 'var(--accent)' : 'var(--bg-card)',
                        border: isLatest ? '1.5px solid var(--accent)' : '1.5px solid var(--border)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 10, fontFamily: 'var(--font-mono)', fontWeight: 700,
                        color: isLatest ? '#ffffff' : 'var(--accent)', flexShrink: 0,
                        boxShadow: isLatest ? '0 0 10px rgba(0,82,255,0.4)' : 'var(--shadow-sm)',
                        transition: 'all 0.3s'
                      }}>
                        {item.num}
                      </div>
                      
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-body)' }}>
                          {item.label}
                        </span>
                        <span style={{ fontSize: 10.5, color: isLatest ? 'var(--accent)' : 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginTop: 2, fontWeight: isLatest ? 700 : 400 }}>
                          Step {item.num}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* CARD 4: 04 // CORE PURPOSE & METRICS */}
            <div className="bento-box shadow-card" style={{
              width: isMobile ? '100%' : '440px',
              height: isMobile ? 'auto' : '380px',
              flexShrink: 0,
              gridColumn: isMobile ? 'span 12' : undefined,
              background: 'var(--bg-card)',
              border: '1.5px solid var(--border)',
              borderRadius: 24,
              padding: '24px 28px',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              overflow: 'hidden' // contain the floating depth bounds
            }}>
              {/* Subtle Stage Background Blur & Glow */}
              <div style={{
                position: 'absolute', top: '50%', left: '50%', width: '80%', height: '80%',
                background: 'radial-gradient(circle, rgba(0, 82, 255, 0.04) 0%, transparent 70%)',
                transform: 'translate(-50%, -50%)', pointerEvents: 'none', zIndex: 0
              }} />

              <h4 className="bento-card-header" style={{ position: 'relative', zIndex: 1 }}>
                04 // CORE PURPOSE & METRICS
              </h4>
              
              <div style={{ position: 'relative', zIndex: 1, flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                <CorePurposeCarousel />
              </div>
            </div>

            {/* CARD 5: 05 // PASSIONS & DRIVE */}
            <div className="bento-box shadow-card" style={{
              width: isMobile ? '100%' : '440px',
              height: isMobile ? 'auto' : '380px',
              flexShrink: 0,
              gridColumn: isMobile ? 'span 12' : undefined,
              background: 'var(--bg-card)',
              border: '1.5px solid var(--border)',
              borderRadius: 24,
              padding: '24px 28px',
            }}>
              <h4 className="bento-card-header">
                05 // PASSIONS & DRIVE
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {[
                  { label: 'Learning always', icon: <BookIcon />, text: "Always reading books, studying interaction patterns, and prototyping in code." },
                  { label: 'Coffee & talks', icon: <CoffeeIcon />, text: "Loves chatting about design systems, user behavior, and technology over hot coffee." },
                  { label: 'Exploring places', icon: <CameraIcon />, text: "Draws fresh visual inspiration from travel, local architecture, and fashion communication." },
                  { label: 'Sketching ideas', icon: <PencilIcon />, text: "Always carries a sketchbook to map visual hierarchies and screen flows by hand." },
                  { label: 'Design challenges', icon: <BrainIcon />, text: "Thrives on tricky layout problems, complex data densities, and accessibility targets." }
                ].map((item) => (
                  <div 
                    key={item.label}
                    className="bento-passion-badge"
                    onClick={() => triggerCatSpeak(item.text)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      cursor: 'pointer',
                      padding: '8px 16px',
                      borderRadius: 30,
                      border: '1.2px solid var(--border)',
                      background: 'var(--bg-warm)',
                      transition: 'all 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                      userSelect: 'none'
                    }}
                  >
                    <span style={{ color: 'var(--accent)', display: 'flex' }}>{item.icon}</span>
                    <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.04em', fontFamily: 'var(--font-mono)' }}>
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* CARD 6: 06 // PROFESSIONAL TELEMETRY */}
            <div className="bento-box shadow-card" style={{
              width: isMobile ? '100%' : '460px',
              height: isMobile ? 'auto' : '380px',
              flexShrink: 0,
              gridColumn: isMobile ? 'span 12' : undefined,
              background: 'var(--bg-card)',
              border: '1.5px solid var(--border)',
              borderRadius: 24,
              padding: '24px 28px',
            }}>
              <h4 className="bento-card-header">
                06 // PROFESSIONAL TELEMETRY
              </h4>
              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? 'repeat(auto-fit, minmax(180px, 1fr))' : '1fr 1fr',
                gap: 14
              }}>
                {[
                  { label: 'UI/UX Designer', desc: 'Crafting experiences', icon: <BriefcaseIcon />, text: "Currently crafting guided cooking experiences and systems at upliance.ai." },
                  { label: 'Based in India', desc: 'Bangalore Tech Hub', icon: <MapPinIcon />, text: "Located in the silicon valley of India, enjoying tech and filter coffee." },
                  { label: 'Turning ideas', desc: 'Into functional React', icon: <ClockIcon />, text: "Fusing design theory with interactive front-end implementation." },
                  { label: 'Always exploring', desc: 'Growing and scaling', icon: <RocketIcon />, text: "Applying systems thinking to ambient displays, IoT, and AI sashes." }
                ].map((item) => (
                  <div 
                    key={item.label}
                    className="bento-stat-card"
                    onClick={() => triggerCatSpeak(item.text)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 14,
                      cursor: 'pointer',
                      padding: '16px 18px',
                      borderRadius: 16,
                      transition: 'all 0.25s var(--ease-out-expo)',
                      background: 'var(--bg-warm)',
                      border: '1.2px solid var(--border)',
                      userSelect: 'none'
                    }}
                  >
                    <div className="telemetry-icon-circle" style={{
                      width: 32, height: 32, borderRadius: '50%',
                      background: 'var(--bg-card)',
                      border: '1.2px solid var(--border)',
                      color: 'var(--accent)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0, transition: 'all 0.25s'
                    }}>{item.icon}</div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-display)', lineHeight: 1.25 }}>
                        {item.label}
                      </span>
                      <span style={{ fontSize: 10.5, color: 'var(--text-muted)', fontFamily: 'var(--font-body)', marginTop: 2 }}>
                        {item.desc}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

      {/* Bento Grid layout style sheets */}
      <style>{`
        .bento-card-header {
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 700;
          color: var(--text-muted);
          letter-spacing: 0.08em;
          border-bottom: 1.5px solid var(--border);
          padding-bottom: 10px;
          margin-top: 0;
          margin-bottom: 18px;
          text-transform: uppercase;
          transition: border-color 0.3s;
        }

        .shadow-card {
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02), 0 1px 2px rgba(0, 0, 0, 0.03);
          transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s cubic-bezier(0.23, 1, 0.32, 1);
        }
        
        .shadow-card:hover {
          border-color: rgba(0, 82, 255, 0.2) !important;
          box-shadow: 0 8px 30px rgba(0, 82, 255, 0.04);
        }

        .bento-toolkit-slider-item > div:hover {
          border-color: var(--accent) !important;
          background: var(--bg-card) !important;
          transform: translateY(-3px);
          box-shadow: 0 6px 20px rgba(0, 82, 255, 0.06);
        }
        .bento-toolkit-slider-item > div:hover .toolkit-icon-capsule {
          background: var(--accent) !important;
          color: #ffffff !important;
          border-color: var(--accent) !important;
        }

        .bento-list-item-long:hover {
          border-color: var(--accent) !important;
          background: var(--bg-card) !important;
          transform: translateY(-2px);
          box-shadow: 0 4px 14px rgba(0, 82, 255, 0.05);
        }
        .bento-list-item-long:hover .purpose-icon-container {
          background: var(--accent) !important;
          color: #ffffff !important;
          border-color: var(--accent) !important;
        }

        .bento-passion-badge:hover {
          background: var(--accent) !important;
          border-color: var(--accent) !important;
          transform: translateY(-2px) scale(1.03);
          box-shadow: 0 6px 16px rgba(0, 82, 255, 0.2);
        }
        .bento-passion-badge:hover span {
          color: #ffffff !important;
        }

        .bento-process-item:hover .process-circle {
          background: var(--accent) !important;
          color: #ffffff !important;
          border-color: var(--accent) !important;
          transform: scale(1.1);
        }

        .bento-stat-card:hover {
          border-color: var(--accent) !important;
          background: var(--bg-card) !important;
          transform: translateY(-3px);
          box-shadow: 0 6px 20px rgba(0, 82, 255, 0.06);
        }
        .bento-stat-card:hover .telemetry-icon-circle {
          background: var(--accent) !important;
          color: #ffffff !important;
          border-color: var(--accent) !important;
        }

        /* Responsive Bento Grid overrides */
        .about-bento-grid-inner > div {
          grid-column: span 12 !important;
        }

        @media (min-width: 1024px) {
          .about-bento-grid-inner > div:nth-child(1) { grid-column: span 7 !important; }
          .about-bento-grid-inner > div:nth-child(2) { grid-column: span 5 !important; }
          .about-bento-grid-inner > div:nth-child(3) { grid-column: span 6 !important; }
          .about-bento-grid-inner > div:nth-child(4) { grid-column: span 6 !important; }
          .about-bento-grid-inner > div:nth-child(5) { grid-column: span 6 !important; }
          .about-bento-grid-inner > div:nth-child(6) { grid-column: span 6 !important; }
          .about-bento-grid-inner > div:nth-child(7) { grid-column: span 12 !important; }
        }
      `}</style>
    </section>
  )
}
