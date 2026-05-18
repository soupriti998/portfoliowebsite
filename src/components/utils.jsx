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
