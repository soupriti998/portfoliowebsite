import React from 'react';
import CuriousFooter from './CuriousFooter';

let synthAudioCtx = null;

function playSynthSound(type) {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    if (!synthAudioCtx) {
      synthAudioCtx = new AudioContext();
    }
    if (synthAudioCtx.state === 'suspended') {
      synthAudioCtx.resume();
    }
    const now = synthAudioCtx.currentTime;
    const osc = synthAudioCtx.createOscillator();
    const gain = synthAudioCtx.createGain();
    
    osc.connect(gain);
    gain.connect(synthAudioCtx.destination);
    
    if (type === 'hover') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(130, now);
      osc.frequency.exponentialRampToValueAtTime(170, now + 0.05);
      gain.gain.setValueAtTime(0.012, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      osc.start(now);
      osc.stop(now + 0.05);
    }
  } catch (e) {
    console.warn("Synth audio failed:", e);
  }
}

export default function FinderAboutMe() {
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
    },
    {
      title: 'Design Engineer Stack',
      icon: '💻',
      isTechStack: true,
      techs: ['Figma', 'Framer', 'Cursor', 'Midjourney', 'Claude', 'Lottie', 'Whimsical', 'Illustrator', 'React.js', 'HTML5', 'CSS3', 'JavaScript', 'Vite']
    }
  ];

  // Duplicate the list for infinite looping marquee
  const carouselCards = [...BENTO_CARDS_DATA, ...BENTO_CARDS_DATA];

  return (
    <div className="about-me-single-column">
      {/* CSS Styles for Horizontal Marquee Scroll Carousel */}
      <style>{`
        .about-me-carousel-container {
          width: 100%;
          overflow: hidden;
          position: relative;
          padding: 12px 0;
          margin-top: 10px;
          mask-image: linear-gradient(to right, transparent, white 20px, white calc(100% - 20px), transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, white 20px, white calc(100% - 20px), transparent);
        }
        .about-me-carousel-track {
          display: flex;
          gap: 16px;
          width: max-content;
          animation: marquee-horizontal 32s linear infinite;
        }
        .about-me-carousel-track:hover {
          animation-play-state: paused;
        }
        .carousel-card {
          width: 290px;
          height: 175px;
          flex-shrink: 0;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 18px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.01);
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.25s ease, box-shadow 0.25s ease;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          cursor: pointer;
          user-select: none;
        }
        .carousel-card:hover {
          transform: translateY(-5px) scale(1.02);
          border-color: rgba(139, 92, 246, 0.55);
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.06);
        }
        @keyframes marquee-horizontal {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>

      {/* 1. Centered Avatar Portrait */}
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

      {/* 2. Work Experience timeline */}
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

      {/* 3. Horizontal Auto Scroll Carousel */}
      <div style={{ width: '100%', overflow: 'hidden' }}>
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

        <div className="about-me-carousel-container">
          <div className="about-me-carousel-track">
            {carouselCards.map((item, idx) => (
              <div 
                key={`${item.title}-${idx}`} 
                className="carousel-card"
                onMouseEnter={() => playSynthSound('hover')}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <h4 style={{ fontSize: '13.5px', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>{item.title}</h4>
                  <span style={{ fontSize: '16px' }}>{item.icon}</span>
                </div>
                {item.isTechStack ? (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '4px' }}>
                    {item.techs.map(tech => (
                      <span key={tech} style={{
                        fontSize: '9.5px',
                        fontWeight: 600,
                        padding: '3px 8px',
                        borderRadius: '20px',
                        background: 'var(--bg-card-frosted, rgba(255,255,255,0.65))',
                        border: '1px solid var(--border)',
                        color: 'var(--text-secondary)',
                      }}>
                        {tech}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
                    {item.desc}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Purple Physics Hero Banner (Universal Curious Footer) at the very bottom */}
      <CuriousFooter />
    </div>
  );
}
