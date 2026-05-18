import { FadeUp, Label } from './utils'

export default function Testimonial() {
  return (
    <section id="testimonial" style={{ padding: 'var(--space-11) 0', background: 'var(--bg)', borderBottom: '1px solid var(--border)' }}>
      <div className="container">
        <FadeUp>
          <Label>Recognition</Label>
        </FadeUp>

        {/* Big editorial quote */}
        <FadeUp delay={80}>
          <div style={{
            marginTop: 'var(--space-9)',
            padding: 'var(--space-10) var(--space-9)',
            background: 'var(--bg-card)',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--border)',
            boxShadow: 'var(--shadow-md)',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', top: 'var(--space-3)', right: 'var(--space-7)',
              fontFamily: 'var(--font-display)',
              fontSize: 160,
              lineHeight: 1,
              color: 'var(--accent)',
              opacity: 0.1,
              pointerEvents: 'none',
              userSelect: 'none',
              fontWeight: 800,
            }}>"</div>

            <blockquote style={{ position: 'relative', zIndex: 1 }}>
              <p style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(20px, 2.5vw, 26px)',
                fontWeight: 400,
                letterSpacing: '-0.02em',
                lineHeight: 1.5,
                color: 'var(--text-primary)',
                maxWidth: '72ch',
                marginBottom: 'var(--space-8)',
              }}>
                "Soupriti's work on the upliance app has been revolutionary. Introducing AI to streamline real image usage was a brilliant move that saved us hours of manual work. Her design thinking and risk-taking ability have greatly enhanced the app's user experience."
              </p>
              <footer style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
                <div style={{
                  width: 48, height: 48, borderRadius: '50%',
                  background: 'var(--accent)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'white', fontWeight: 700, fontSize: 18,
                  fontFamily: 'var(--font-display)',
                }}>C</div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 15, color: 'var(--text-primary)', letterSpacing: '-0.015em' }}>Chaitanya Hegde</div>
                  <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Head of Product · upliance.ai</div>
                </div>
              </footer>
            </blockquote>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
