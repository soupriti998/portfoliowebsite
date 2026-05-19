import { useEffect, useRef, useState } from 'react'
import Matter from 'matter-js'

/* ── High-Fidelity Icons ── */
const BookIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/>
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

const PASSIONS = [
  { label: 'Learning always', icon: <BookIcon />, text: "Always reading books, studying interaction patterns, and prototyping in code." },
  { label: 'Coffee & talks', icon: <CoffeeIcon />, text: "Loves chatting about design systems, user behavior, and technology over hot coffee." },
  { label: 'Exploring places', icon: <CameraIcon />, text: "Draws fresh visual inspiration from travel, local architecture, and fashion communication." },
  { label: 'Sketching ideas', icon: <PencilIcon />, text: "Always carries a sketchbook to map visual hierarchies and screen flows by hand." },
  { label: 'Design challenges', icon: <BrainIcon />, text: "Thrives on tricky layout problems, complex data densities, and accessibility targets." }
]

export default function PassionsPlayground({ triggerCatSpeak }) {
  const containerRef = useRef(null)
  const pillRefs = useRef([])
  const [isInitialized, setIsInitialized] = useState(false)
  
  useEffect(() => {
    if (!containerRef.current) return
    
    // We defer physics engine startup slightly so that the browser has fully calculated the auto-hugging widths of the absolute DOM elements.
    const startTimeout = setTimeout(() => {
      const width = containerRef.current.clientWidth || 380
      const height = containerRef.current.clientHeight || 280
      
      const { Engine, World, Bodies, Runner, Mouse, MouseConstraint, Events, Body, Composite } = Matter
      
      // 1. Setup physics engine with soft gravity
      const engine = Engine.create({
        gravity: { y: 0.5 } // soft natural falling speed
      })
      
      // 2. Setup containment boundaries
      const thickness = 200
      const ground = Bodies.rectangle(width / 2, height + thickness / 2, width * 3, thickness, { 
        isStatic: true,
        restitution: 0.4,
        friction: 0.1 
      })
      const leftWall = Bodies.rectangle(-thickness / 2, height / 2, thickness, height * 3, { 
        isStatic: true,
        restitution: 0.4,
        friction: 0.1 
      })
      const rightWall = Bodies.rectangle(width + thickness / 2, height / 2, thickness, height * 3, { 
        isStatic: true,
        restitution: 0.4,
        friction: 0.1 
      })
      
      // Setup ceiling slightly higher than bounds to allow cards to go up a bit but block escape
      const ceiling = Bodies.rectangle(width / 2, -thickness, width * 3, thickness, { 
        isStatic: true,
        restitution: 0.4,
        friction: 0.1 
      })
      
      Composite.add(engine.world, [ground, leftWall, rightWall, ceiling])
      
      // 3. Create bodies based on actual measured elements
      const pillBodies = PASSIONS.map((p, idx) => {
        const dom = pillRefs.current[idx]
        const measuredWidth = dom ? dom.offsetWidth : 140
        const measuredHeight = dom ? dom.offsetHeight : 36
        
        // Spawn them cascading from the top center/left within safe bounds (avoiding ceiling overlap)
        const startX = width / 2 + (idx - 2) * 35
        const startY = 30 + (idx * 40) // safe interior range, staggered fall
        
        const body = Bodies.rectangle(startX, startY, measuredWidth, measuredHeight, {
          restitution: 0.5, 
          friction: 0.05,
          frictionAir: 0.04, 
          chamfer: { radius: measuredHeight / 2 }, // Perfect capsule boundaries
          angle: Math.random() * 0.4 - 0.2
        })
        
        body.label = `pill-${idx}`
        return body
      })
      
      Composite.add(engine.world, pillBodies)
      
      // 4. Mouse constraint for dragging/throwing
      const mouse = Mouse.create(containerRef.current)
      const mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
          stiffness: 0.15,
          render: { visible: false }
        }
      })
      Composite.add(engine.world, mouseConstraint)
      
      mouseConstraint.mouse.element.removeEventListener("mousewheel", mouseConstraint.mouse.mousewheel);
      mouseConstraint.mouse.element.removeEventListener("DOMMouseScroll", mouseConstraint.mouse.mousewheel);
      
      // 5. Update Loop
      Events.on(engine, 'afterUpdate', () => {
        pillBodies.forEach((body, idx) => {
          const dom = pillRefs.current[idx]
          if (!dom) return
          
          const measuredWidth = dom.offsetWidth
          const measuredHeight = dom.offsetHeight
          
          // Center the DOM element on the physics body coordinates
          const x = body.position.x - measuredWidth / 2
          const y = body.position.y - measuredHeight / 2
          
          dom.style.transform = `translate3d(${x}px, ${y}px, 0px) rotate(${body.angle}rad)`
          
          // Floating idle motion
          if (body.speed < 0.04) {
            const time = Date.now() * 0.001
            const floatY = Math.sin(time + idx) * 0.1
            const floatX = Math.cos(time + idx) * 0.1
            Body.translate(body, { x: floatX, y: floatY })
          }
        })
      })
      
      // 6. Handle Resizing
      const handleResize = () => {
        if (!containerRef.current) return
        const w = containerRef.current.clientWidth
        const h = containerRef.current.clientHeight
        
        Body.setPosition(ground, { x: w / 2, y: h + thickness / 2 })
        Body.setPosition(leftWall, { x: -thickness / 2, y: h / 2 })
        Body.setPosition(rightWall, { x: w + thickness / 2, y: h / 2 })
        Body.setPosition(ceiling, { x: w / 2, y: -thickness })
      }
      
      window.addEventListener('resize', handleResize)
      
      // 7. Start runner
      const runner = Runner.create()
      Runner.run(runner, engine)
      
      setIsInitialized(true)
      
      return () => {
        window.removeEventListener('resize', handleResize)
        Runner.stop(runner)
        Engine.clear(engine)
      }
    }, 150) // Defer 150ms to allow layout paint to complete
    
    return () => clearTimeout(startTimeout)
  }, [])
  
  return (
    <div 
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: 270,
        background: 'var(--bg-warm)',
        borderRadius: 20,
        border: '1.2px solid var(--border)',
        overflow: 'hidden',
        cursor: 'grab',
        touchAction: 'none',
        userSelect: 'none',
        marginTop: 20
      }}
    >
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        background: 'radial-gradient(circle at 50% 20%, rgba(255, 255, 255, 0.4) 0%, transparent 80%)',
        pointerEvents: 'none', zIndex: 0
      }} />

      {PASSIONS.map((item, idx) => (
        <div
          key={item.label}
          ref={el => pillRefs.current[idx] = el}
          onClick={() => triggerCatSpeak(item.text)}
          style={{
            position: 'absolute',
            left: 10 + idx * 25, // Initial spread before engine updates it
            top: 20, 
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            cursor: 'grab',
            padding: '8px 16px',
            borderRadius: 20,
            border: '1.2px solid var(--border)',
            background: 'var(--bg-card)',
            boxShadow: '0 2px 8px -3px rgba(15, 23, 42, 0.04)',
            transition: 'box-shadow 0.2s ease, border-color 0.2s ease',
            userSelect: 'none',
            whiteSpace: 'nowrap', // Force single line text
            width: 'max-content', // Hug the content width
            zIndex: 5,
            opacity: isInitialized ? 1 : 0 // Hide briefly until engine initializes to prevent jitter
          }}
          onMouseDown={e => {
            e.currentTarget.style.cursor = 'grabbing'
            e.currentTarget.style.boxShadow = '0 8px 20px -4px rgba(15, 23, 42, 0.12)'
          }}
          onMouseUp={e => {
            e.currentTarget.style.cursor = 'grab'
            e.currentTarget.style.boxShadow = '0 2px 8px -3px rgba(15, 23, 42, 0.04)'
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = 'rgba(0, 82, 255, 0.3)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'var(--border)'
          }}
        >
          <span style={{ color: 'var(--accent)', display: 'flex', alignItems: 'center' }}>{item.icon}</span>
          <span style={{ fontSize: 10.5, fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.04em', fontFamily: 'var(--font-mono)' }}>
            {item.label}
          </span>
        </div>
      ))}
    </div>
  )
}
