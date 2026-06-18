import React from 'react';
import CuriousFooter from './CuriousFooter';

export default function FinderAboutMe() {
  // Remaining 5 cards (Sa-Re-Ga-Ma strings text cards without the tuner notes/Sa-Re-Ga-Ma details or Telemetry card)
  const BENTO_CARDS_DATA = [
    {
      title: 'Interaction Craft',
      icon: '🧭',
      desc: 'Focus on motion physics, micro-interactions, spring-based reveals, and fluid animation (accounts for 50% of my core daily focus).',
    },
    {
      title: 'Design Toolkit',
      icon: '🎨',
      desc: 'Mastery in Figma token spec systems, advanced responsive layouts, usability testing logs, and custom React development.',
    },
    {
      title: 'Strategic Process',
      icon: '⚡',
      desc: 'Deep interest in log diaries and user observation research, mapping behavioral patterns into quantitative product growth metrics.',
    },
    {
      title: 'Passions & Hobbies',
      icon: '🕹️',
      desc: 'Fueled by travel diaries, specialty coffee, digital sketching on procreate, retro console gaming, and modular synthesizer patches.',
    },
    {
      title: 'Quirky Personality',
      icon: '✨',
      desc: 'Empathic, enthusiastic, and easily makes friends. Brings high energy, collaborative laughter, and positive team dynamics to any design sprint.',
    }
  ];

  return (
    <div className="about-me-single-column">
      {/* 2. Centered Avatar Portrait */}
      <div className="about-me-avatar-centered">
        <img 
          src="/soupriti.jpg" 
          alt="Soupriti Das" 
          className="about-me-avatar"
          onError={(e) => {
            e.target.src = '/soupriti_new.png';
          }}
        />
        <span style={{ 
          fontSize: '13px', 
          fontStyle: 'italic', 
          color: 'var(--text-secondary)',
          fontFamily: 'var(--font-mono)' 
        }}>
          &mdash; that's me :)
        </span>
      </div>

      {/* 3. Work Experience timeline */}
      <div style={{ width: '100%' }}>
        <h3 style={{ 
          fontSize: '13px', 
          fontWeight: 800, 
          color: '#8b5cf6', 
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          margin: '0 0 16px 0',
          fontFamily: 'var(--font-mono)'
        }}>
          Work Experience
        </h3>

        <div className="experience-timeline">
          {/* upliance.ai */}
          <div className="experience-timeline-item">
            <div className="experience-timeline-dot" />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
              <h4 style={{ fontSize: '14.5px', fontWeight: 700, margin: 0 }}>
                Product Designer &middot; <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>upliance.ai</span>
              </h4>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>Sep 2024 &ndash; Present</span>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: '4px 0 0 0', lineHeight: 1.5 }}>
              Redesigned core mobile and device experiences for an AI-powered cooking platform, improving usability and engagement by 24%.
            </p>
          </div>

          {/* Divami */}
          <div className="experience-timeline-item">
            <div className="experience-timeline-dot" />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
              <h4 style={{ fontSize: '14.5px', fontWeight: 700, margin: 0 }}>
                UI Designer &middot; <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>Divami Design Labs</span>
              </h4>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>Sep 2023 &ndash; Aug 2024</span>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: '4px 0 0 0', lineHeight: 1.5 }}>
              Designed user interfaces for SaaS and enterprise platforms, focusing on usability, 3D interactive assets, and design systems.
            </p>
          </div>

          {/* Incture */}
          <div className="experience-timeline-item">
            <div className="experience-timeline-dot" />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
              <h4 style={{ fontSize: '14.5px', fontWeight: 700, margin: 0 }}>
                Associate UX Designer &middot; <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>Incture Technologies</span>
              </h4>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>Jul 2022 &ndash; Aug 2023</span>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: '4px 0 0 0', lineHeight: 1.5 }}>
              Led UX design for SaaS platforms (Cherrywork), streamlining enterprise dashboards and improving customer engagement by 30%.
            </p>
          </div>

          {/* Brandshape */}
          <div className="experience-timeline-item">
            <div className="experience-timeline-dot" />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
              <h4 style={{ fontSize: '14.5px', fontWeight: 700, margin: 0 }}>
                UX Designer Intern &middot; <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>Brandshape</span>
              </h4>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>Jan 2022 &ndash; Apr 2022</span>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: '4px 0 0 0', lineHeight: 1.5 }}>
              Designed user experiences for banking workflows, mapping user pain points and validating solutions for HDFC Bank.
            </p>
          </div>
        </div>
      </div>

      {/* 4. Bento Grid (excluding Bio and Skills Sandbox) */}
      <div style={{ width: '100%' }}>
        <h3 style={{ 
          fontSize: '13px', 
          fontWeight: 800, 
          color: '#8b5cf6', 
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          margin: '24px 0 16px 0',
          fontFamily: 'var(--font-mono)'
        }}>
          💡 Specializations & Craft
        </h3>

        <div className="about-me-bento-grid">
          {BENTO_CARDS_DATA.map((item) => (
            <div 
              key={item.title} 
              className="bento-card"
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                padding: '18px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: 700, margin: 0 }}>{item.title}</h4>
                <span style={{ fontSize: '16px' }}>{item.icon}</span>
              </div>
              <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
                {item.desc}
              </p>
            </div>
          ))}

          {/* Design Stack Card */}
          <div className="bento-card span-2">
            <h4 style={{ fontSize: '14px', fontWeight: 700, margin: '0 0 10px 0' }}>💻 Design Engineer Stack</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {['Figma', 'Framer', 'Cursor', 'Midjourney', 'Claude', 'Lottie', 'Whimsical', 'Illustrator', 'React.js', 'HTML5', 'CSS3', 'JavaScript', 'Vite'].map(tech => (
                <span key={tech} style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  padding: '4px 10px',
                  borderRadius: '20px',
                  background: 'var(--bg-card-frosted, rgba(255,255,255,0.65))',
                  border: '1px solid var(--border)',
                  color: 'var(--text-secondary)',
                }}>
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Purple Physics Hero Banner (Universal Curious Footer) at the very bottom */}
      <CuriousFooter />
    </div>
  );
}
