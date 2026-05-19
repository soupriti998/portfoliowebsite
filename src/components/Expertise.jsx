import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FadeUp, Label } from './utils'

const expertise = [
  { title: 'Product Design', body: 'End-to-end product thinking from concept to shipped feature — balancing user needs, business goals, and technical constraints.' },
  { title: 'UX Strategy', body: 'Shaping product direction through research synthesis, opportunity mapping, and outcome-driven design roadmaps.' },
  { title: 'User Research', body: 'Qualitative and quantitative methods — interviews, usability tests, behavioral analytics — to ground decisions in real evidence.' },
  { title: 'Interaction Design', body: 'Crafting micro-interactions, spring animations, and state transitions that make digital products feel alive and responsive.' },
  { title: 'Design Systems', body: 'Building scalable, token-driven systems in Figma that empower teams to ship consistently and iterate rapidly at scale.' },
  { title: 'AI Experiences', body: 'Designing human-centered AI interfaces — translating complex machine learning models into intuitive, transparent interactions.' },
]

export default function Expertise() {
  const [isOpen, setIsOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 900)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // Framer Motion Variants
  const folderBackVars = {
    idle: { x: 0, y: 0, scale: 1 },
    hover: { x: 0, y: 0, scale: 1 },
    open: { 
      x: isMobile ? 0 : -240, 
      y: isMobile ? -300 : 0, 
      scale: isMobile ? 0.8 : 1 
    }
  }

  const folderFrontVars = {
    idle: { x: 0, y: 0, rotateX: 0, scale: 1 },
    hover: { x: 0, y: 0, rotateX: -15, scale: 1 },
    open: { 
      x: isMobile ? 0 : -240, 
      y: isMobile ? -300 : 0, 
      rotateX: -25, 
      scale: isMobile ? 0.8 : 1 
    }
  }

  const paperVars = {
    idle: { x: 0, y: 20, width: 300, height: 190, opacity: 0, scale: 1 },
    hover: { x: 0, y: -40, width: 300, height: 190, opacity: 1, scale: 1 },
    open: { 
      x: isMobile ? -20 : 210, // offsets the left: 20px
      y: isMobile ? -70 : -80, 
      width: isMobile ? 340 : 460, 
      height: isMobile ? 540 : 580, 
      opacity: 1,
      scale: 1
    }
  }

  const springConfig = { type: "spring", stiffness: 280, damping: 26 }

  return (
    <section 
      id="expertise" 
      style={{ 
        position: 'relative',
        minHeight: '100vh',
        background: 'var(--bg-warm)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '120px 20px',
        overflow: 'hidden'
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: isMobile ? 60 : 100, zIndex: 10 }}>
        <FadeUp>
          <Label>Expertise</Label>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(32px, 3.8vw, 46px)',
            fontWeight: 400,
            letterSpacing: '-0.025em',
            lineHeight: 1.15,
            color: 'var(--text-primary)',
            marginTop: 'var(--space-4)',
          }}>
            What I do<br />
            <span style={{ color: 'var(--accent)' }}>really well.</span>
          </h2>
          {!isOpen && (
             <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginTop: 16 }}>
               Click the folder to open
             </p>
          )}
        </FadeUp>
      </div>

      <div 
        style={{ 
          position: 'relative', 
          width: 340, 
          height: 240, 
          perspective: 1500,
          cursor: isOpen ? 'default' : 'pointer'
        }}
        onMouseEnter={() => !isMobile && setIsHovered(true)}
        onMouseLeave={() => !isMobile && setIsHovered(false)}
        onClick={() => !isOpen && setIsOpen(true)}
      >
        {/* BACK FLAP */}
        <motion.div 
          variants={folderBackVars} 
          initial="idle"
          animate={isOpen ? "open" : isHovered ? "hover" : "idle"}
          transition={springConfig}
          style={{ position: 'absolute', top: 0, left: 0, width: 340, height: 240, zIndex: 1 }}
        >
          <svg width="340" height="240" viewBox="0 0 340 240" fill="none">
            <path d="M0 16C0 7.163 7.163 0 16 0H120C125 0 130 3 134 8L146 24H324C332.837 24 340 31.163 340 40V224C340 232.837 332.837 240 324 240H16C7.163 240 0 232.837 0 224V16Z" fill="url(#folder-grad)"/>
            <defs>
              <linearGradient id="folder-grad" x1="0" y1="0" x2="340" y2="240" gradientUnits="userSpaceOnUse">
                <stop stopColor="#4A60FF"/>
                <stop offset="1" stopColor="#2E3BFF"/>
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        {/* PAPER CONTENT */}
        <motion.div
          variants={paperVars}
          initial="idle"
          animate={isOpen ? "open" : isHovered ? "hover" : "idle"}
          transition={springConfig}
          style={{ 
            position: 'absolute', 
            top: 0, 
            left: 20, 
            zIndex: 2,
            background: 'var(--bg-card)',
            borderRadius: 16,
            boxShadow: isOpen ? '0 20px 50px rgba(0,0,0,0.1)' : '0 4px 10px rgba(0,0,0,0.05)',
            border: '1px solid var(--border)',
            overflow: 'hidden'
          }}
        >
          {/* Skeleton lines shown when peeking */}
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: isOpen ? 0 : 1 }}
            style={{ position: 'absolute', top: 30, left: 30, right: 30 }}
          >
            <div style={{ width: '40%', height: 12, background: 'var(--border)', borderRadius: 6, marginBottom: 16 }} />
            <div style={{ width: '80%', height: 12, background: 'var(--border)', borderRadius: 6, marginBottom: 12 }} />
            <div style={{ width: '60%', height: 12, background: 'var(--border)', borderRadius: 6 }} />
          </motion.div>

          {/* Full Checklist shown when open */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: isOpen ? 1 : 0 }}
            transition={{ duration: 0.3, delay: isOpen ? 0.15 : 0 }}
            style={{ padding: isMobile ? '24px 20px' : '32px 36px', width: '100%', height: '100%', boxSizing: 'border-box' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: 16, marginBottom: 20 }}>
              <span style={{ fontSize: 11, color: 'var(--text-secondary)', fontWeight: 700, fontFamily: 'var(--font-mono)', letterSpacing: '0.04em' }}>
                EXPERTISE LIST
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 12, color: 'var(--text-secondary)', fontWeight: 500 }}>
                  {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
                {/* Close Button */}
                <button 
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsOpen(false)
                  }}
                  style={{
                    background: 'var(--bg-warm)',
                    border: '1px solid var(--border)',
                    borderRadius: '50%',
                    width: 28,
                    height: 28,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: 'var(--text-secondary)'
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
              </div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? 12 : 16 }}>
              {expertise.map((item) => (
                <div key={item.title} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <div style={{ width: 18, height: 18, borderRadius: 5, background: 'var(--accent)', display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0, marginTop: 2 }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <div>
                    <h4 style={{ margin: 0, fontSize: isMobile ? 14 : 15, color: 'var(--text-primary)', fontWeight: 600 }}>{item.title}</h4>
                    <p style={{ margin: '4px 0 0 0', fontSize: isMobile ? 12.5 : 13.5, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* FRONT FLAP */}
        <motion.div
          variants={folderFrontVars}
          initial="idle"
          animate={isOpen ? "open" : isHovered ? "hover" : "idle"}
          transition={springConfig}
          style={{ 
            position: 'absolute', 
            top: 40, 
            left: 0, 
            width: 340, 
            height: 200, 
            zIndex: 3,
            background: 'linear-gradient(180deg, #5b73ff, #384bff)',
            borderRadius: '8px 8px 16px 16px',
            boxShadow: '0 -2px 10px rgba(0,0,0,0.1), inset 0 2px 4px rgba(255,255,255,0.2)',
            padding: '24px 28px',
            boxSizing: 'border-box',
            transformOrigin: 'bottom center',
            display: 'flex',
            flexDirection: 'column'
          }}
          onClick={() => setIsOpen(!isOpen)}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <h3 style={{ margin: 0, color: 'white', fontSize: 24, fontWeight: 500, fontFamily: 'var(--font-display)' }}>Expertise</h3>
            <div style={{ display: 'flex', gap: 10 }}>
               <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
               <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
            </div>
          </div>
          <p style={{ margin: '8px 0 0 0', color: 'rgba(255,255,255,0.7)', fontSize: 13 }}>6 notes</p>
        </motion.div>
      </div>
    </section>
  )
}
