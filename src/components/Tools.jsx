import { FadeUp, Label } from './utils'

const tools = [
  { 
    name: 'Figma', 
    category: 'Design Systems', 
    icon: '🎨', 
    contribution: 'Built scalable AI-first product systems, standardized variable tokens, and organized multi-platform SaaS dashboard components.',
    outcome: '30% component reuse increase'
  },
  { 
    name: 'Framer', 
    category: 'Interactive Development', 
    icon: '⚡', 
    contribution: 'Created immersive storytelling portfolios, high-fidelity user-test prototypes, and custom canvas-based physics engines.',
    outcome: 'Interactive storytelling fidelity'
  },
  { 
    name: 'Cursor', 
    category: 'AI Coding & Prototyping', 
    icon: '◈', 
    contribution: 'Rapidly engineered intelligent UI layouts, custom contextual AI assistants, animated components, and fluid layout physics.',
    outcome: 'Zero-friction code prototypes'
  },
  { 
    name: 'Midjourney', 
    category: 'AI Visual Assets', 
    icon: '✦', 
    contribution: 'Developed conceptual visual assets, rich art boards, hand-drawn vector mascot systems, and highly creative interfaces.',
    outcome: 'Bespoke brand illustrations'
  },
  { 
    name: 'Claude', 
    category: 'AI Writing & UX Copy', 
    icon: '◎', 
    contribution: 'Structured complex contextual conversational dialog states, descriptive microcopy, user flow scripts, and empty states.',
    outcome: 'Emotional & clear copy loops'
  },
  { 
    name: 'Lottie', 
    category: 'Motion Microinteractions', 
    icon: '▶', 
    contribution: 'Designed extremely lightweight responsive SVG motion assets, interactive micro-states, and custom button animations.',
    outcome: '60fps interaction delight'
  },
  { 
    name: 'Whimsical', 
    category: 'Behavioral Architecture', 
    icon: '◇', 
    contribution: 'Mapped end-to-end product user journey ecosystems, behavior state trees, database flows, and information routing architectures.',
    outcome: '7% drop-rate journey reduction'
  },
  { 
    name: 'Illustrator', 
    category: 'Vector Visual Identity', 
    icon: '◆', 
    contribution: 'Crafted distinct scalable custom iconography, comic sketch mascot sheets, and visual art systems.',
    outcome: 'Pixel-perfect graphic systems'
  },
]

export default function Tools() {
  return (
    <section id="tools" style={{ padding: 'var(--space-11) 0', background: 'var(--bg)', borderTop: '1px solid var(--border)' }}>
      <div className="container">
        <FadeUp>
          <Label>Toolkit</Label>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(28px, 3.5vw, 44px)',
            fontWeight: 400,
            letterSpacing: '-0.025em',
            lineHeight: 1.1,
            color: 'var(--text-primary)',
            marginTop: 'var(--space-5)',
            marginBottom: 'var(--space-3)',
          }}>
            Systems I build<br />
            <span style={{ color: 'var(--accent)' }}>with these tools.</span>
          </h2>
          <p style={{ fontSize: 15, color: 'var(--text-secondary)', marginBottom: 'var(--space-9)', maxWidth: '50ch' }}>
            No plain percentage meters. Here are real system contributions and outcomes designed and built using my core toolkit.
          </p>
        </FadeUp>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 'var(--space-5)',
        }}>
          {tools.map(({ name, category, icon, contribution, outcome }, i) => (
            <FadeUp key={name} delay={i * 50}>
              <div
                className="tool-contribution-card"
                style={{
                  padding: 'var(--space-6)',
                  background: 'var(--bg-card)',
                  borderRadius: 'var(--radius-xl)',
                  border: '1px solid var(--border)',
                  boxShadow: 'var(--shadow-sm)',
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'default',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: '100%',
                  boxSizing: 'border-box',
                }}
              >
                {/* Blueprint grid on card hover */}
                <div className="tool-blueprint-bg" />

                <div style={{ position: 'relative', zIndex: 2 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <span style={{ fontSize: 24, filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.05))' }}>{icon}</span>
                      <div>
                        <h3 style={{ fontWeight: 600, fontSize: 16, color: 'var(--text-primary)', letterSpacing: '-0.015em', margin: 0 }}>{name}</h3>
                        <span style={{ fontSize: 11, color: 'var(--accent)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginTop: 2 }}>{category}</span>
                      </div>
                    </div>
                  </div>

                  <p style={{ 
                    fontSize: 13, 
                    lineHeight: 1.6, 
                    color: 'var(--text-secondary)', 
                    margin: '0 0 var(--space-5) 0',
                    fontFamily: 'var(--font-body)'
                  }}>
                    {contribution}
                  </p>
                </div>

                <div 
                  className="tool-card-outcome-badge"
                  style={{
                    position: 'relative',
                    zIndex: 2,
                    fontSize: 11,
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 600,
                    color: 'var(--accent)',
                    background: 'rgba(0, 82, 255, 0.06)',
                    padding: '6px 12px',
                    borderRadius: 'var(--radius-pill)',
                    width: 'fit-content',
                    transition: 'all 0.3s ease',
                  }}
                >
                  🎯 {outcome}
                </div>
              </div>
            </FadeUp>
          ))}
        </div>

        {/* Technical dialogue block */}
        <FadeUp delay={200}>
          <div style={{
            marginTop: 'var(--space-8)',
            padding: 'var(--space-6) var(--space-7)',
            background: 'var(--bg-warm)',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--border)',
            display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap', alignItems: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)', position: 'relative', zIndex: 2 }}>Working developer knowledge:</span>
            {['HTML5', 'CSS3', 'JavaScript (ES6)', 'React.js', 'Vite'].map(tech => (
              <span key={tech} style={{
                fontSize: 11, fontWeight: 600, padding: '4px 12px',
                borderRadius: 'var(--radius-pill)',
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                color: 'var(--text-secondary)',
                position: 'relative', zIndex: 2,
              }}>{tech}</span>
            ))}
            <span style={{ fontSize: 13, color: 'var(--text-secondary)', marginLeft: 'var(--space-2)', position: 'relative', zIndex: 2 }}>— allows me to code my own layouts, speak fluently with engineers, and run high-fidelity functional prototypes directly in browser.</span>
          </div>
        </FadeUp>
      </div>

      <style>{`
        /* Toolkit custom contribution cards */
        .tool-contribution-card {
          transition: transform 400ms cubic-bezier(0.16, 1, 0.3, 1),
                      border-color 400ms cubic-bezier(0.16, 1, 0.3, 1),
                      box-shadow 400ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        .tool-contribution-card:hover {
          transform: translateY(-6px) scale(1.015);
          border-color: var(--accent);
          box-shadow: var(--shadow-lg), 0 20px 40px rgba(0, 82, 255, 0.05);
        }

        .tool-blueprint-bg {
          position: absolute;
          inset: 0;
          opacity: 0;
          pointer-events: none;
          background-image: radial-gradient(var(--accent) 0.8px, transparent 0.8px);
          background-size: 16px 16px;
          transition: opacity 400ms cubic-bezier(0.16, 1, 0.3, 1);
          z-index: 1;
        }

        .tool-contribution-card:hover .tool-blueprint-bg {
          opacity: 0.12;
        }

        .tool-contribution-card:hover .tool-card-outcome-badge {
          background: rgba(0, 82, 255, 0.12);
          box-shadow: 0 0 12px rgba(0, 82, 255, 0.18);
        }
      `}</style>
    </section>
  )
}
