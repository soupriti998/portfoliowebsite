import React from 'react';
import { PROJECTS } from './Projects';
import CuriousFooter from './CuriousFooter';

let synthAudioCtx = null;

function playSynthSound(type, isMuted) {
  if (isMuted) return;
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
      gain.gain.setValueAtTime(0.015, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      osc.start(now);
      osc.stop(now + 0.05);
    } else if (type === 'click') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(380, now);
      osc.frequency.exponentialRampToValueAtTime(80, now + 0.08);
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.start(now);
      osc.stop(now + 0.08);
    }
  } catch (e) {
    console.warn("Synth audio failed:", e);
  }
}

export default function FinderSelectedWorks({ activeProject, setActiveProject, isMuted, filter = 'shipped' }) {
  
  const handleProjectClick = (projectId) => {
    playSynthSound('click', isMuted);
    setActiveProject(projectId);
  };

  const handleBackClick = () => {
    playSynthSound('click', isMuted);
    setActiveProject(null);
  };

  const handleHover = () => {
    playSynthSound('hover', isMuted);
  };

  const filteredProjects = PROJECTS.filter(project => {
    if (filter === 'unshipped') {
      return project.id === 'graduation-project';
    } else {
      return project.id !== 'graduation-project';
    }
  });

  if (activeProject) {
    const project = PROJECTS.find(p => p.id === activeProject);
    if (!project) return <div>Project not found</div>;

    return (
      <div style={{ fontFamily: 'var(--font-body)', color: 'var(--text-primary)' }}>
        {/* Back Button */}
        <button 
          onClick={handleBackClick}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-1px)';
            e.currentTarget.style.boxShadow = 'var(--shadow-md)';
            handleHover();
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
          }}
          style={{
            background: 'var(--bg-card-frosted, rgba(255, 255, 255, 0.6))',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-pill)',
            boxShadow: 'var(--shadow-sm)',
            color: 'var(--text-primary)',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '14px',
            marginBottom: '24px',
            padding: '8px 16px',
            transition: 'all 0.25s var(--ease-out-expo)',
            outline: 'none'
          }}
        >
          ← Back to Selected Works
        </button>

        {/* Project Header */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span style={{ fontSize: '20px' }}>{project.emoji || '📁'}</span>
            <span style={{ 
              fontSize: '11px', 
              fontWeight: 700, 
              color: '#0052ff', 
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              fontFamily: 'var(--font-mono)'
            }}>
              {project.category}
            </span>
          </div>

          <h1 style={{ 
            fontSize: '28px', 
            fontWeight: 800, 
            color: 'var(--text-primary)', 
            margin: '0 0 16px 0',
            letterSpacing: '-0.02em',
            lineHeight: 1.2
          }}>
            {project.title}
          </h1>

          {/* Quick Stats Grid */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', 
            gap: '16px',
            background: 'var(--bg-warm)',
            border: '1px solid var(--border)',
            borderRadius: '12px',
            padding: '16px',
            marginBottom: '32px'
          }}>
            <div>
              <span style={{ display: 'block', fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', marginBottom: '4px' }}>Role</span>
              <span style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--text-primary)' }}>{project.role}</span>
            </div>
            <div>
              <span style={{ display: 'block', fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', marginBottom: '4px' }}>Duration</span>
              <span style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--text-primary)' }}>{project.duration}</span>
            </div>
            <div>
              <span style={{ display: 'block', fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', marginBottom: '4px' }}>Impact</span>
              <span style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--text-primary)' }}>{project.impact}</span>
            </div>
            <div>
              <span style={{ display: 'block', fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', marginBottom: '4px' }}>Team</span>
              <span style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--text-primary)' }}>{project.teamType}</span>
            </div>
          </div>
        </div>

        {/* Project Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          {/* Overview Section */}
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '12px', color: 'var(--text-primary)' }}>Overview</h2>
            <p style={{ fontSize: '14.5px', lineHeight: 1.6, color: 'var(--text-secondary)', margin: 0 }}>
              {project.overview}
            </p>
          </div>

          {/* Case Study Sections */}
          {project.sections && project.sections.map((section, idx) => (
            <div key={idx} style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '24px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '10px', color: 'var(--text-primary)' }}>
                {section.label}
              </h3>
              <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--text-secondary)', whiteSpace: 'pre-line', margin: 0 }}>
                {section.content}
              </p>
            </div>
          ))}

          {/* Project Mockups */}
          {project.mockups && project.mockups.length > 0 && (
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px', color: 'var(--text-primary)' }}>Project Mockups</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {project.mockups.map((mockup, mIdx) => (
                  <div 
                    key={mIdx} 
                    style={{ 
                      borderRadius: '16px', 
                      overflow: 'hidden', 
                      border: '1px solid var(--border)',
                      boxShadow: 'var(--shadow-lg)',
                      background: 'var(--bg-warm)'
                    }}
                  >
                    <img 
                      src={mockup} 
                      alt={`Mockup ${mIdx + 1}`} 
                      style={{ width: '100%', height: 'auto', display: 'block' }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Framer Interactive Embed Link */}
          {project.framerUrl && (
            <div style={{ 
              marginTop: '16px', 
              padding: '24px', 
              background: '#0052ff08', 
              borderRadius: '16px', 
              border: '1px solid #0052ff15',
              textAlign: 'center'
            }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '8px', color: '#0052ff' }}>Want to see the interactive prototype?</h3>
              <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                You can explore the live prototype built in Framer to experience the animations and flows.
              </p>
              <a 
                href={project.framerUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  display: 'inline-block',
                  background: '#0052ff',
                  color: 'white',
                  fontWeight: 600,
                  fontSize: '13.5px',
                  padding: '10px 20px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  boxShadow: '0 4px 12px rgba(0, 82, 255, 0.2)'
                }}
              >
                Open Live Framer Prototype ↗
              </a>
            </div>
          )}
        </div>
        
        {/* Universal Recruiter CTA Footer */}
        <CuriousFooter />
      </div>
    );
  }

  return (
    <div>
      <h1 style={{ fontSize: '24px', fontWeight: 700, margin: '0 0 6px 0', color: 'var(--text-primary)' }}>
        {filter === 'unshipped' ? 'Not Shipped (Conceptual Work)' : 'Selected Works'}
      </h1>
      <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: '0 0 24px 0' }}>
        {filter === 'unshipped' 
          ? 'Exploratory spatial concepts and experimental 0-to-1 designs.' 
          : 'Selected projects across product design, UX research and brand.'}
      </p>

      {/* Grid of Projects */}
      <div className="finder-project-grid">
        {filteredProjects.map((project, idx) => (
          <div 
            key={project.id} 
            className="finder-project-card"
            onMouseEnter={handleHover}
            onClick={() => handleProjectClick(project.id)}
          >
            <img 
              src={project.coverImage || project.cardImage} 
              alt={project.title} 
              className="finder-project-card-image"
            />
            <div className="finder-project-card-body">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ 
                  fontSize: '10px', 
                  fontWeight: 700, 
                  color: '#ef4444', 
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  fontFamily: 'var(--font-mono)'
                }}>
                  Project {String(idx + 1).padStart(2, '0')}
                </span>
                <span style={{
                  fontSize: '9px',
                  fontWeight: 600,
                  color: project.id === 'graduation-project' ? '#ff2a85' : '#10b981',
                  background: project.id === 'graduation-project' ? 'rgba(255, 42, 133, 0.08)' : '#ecfdf5',
                  border: project.id === 'graduation-project' ? '1px solid rgba(255, 42, 133, 0.3)' : '1px solid #a7f3d0',
                  padding: '2px 6px',
                  borderRadius: '10px',
                  fontFamily: 'var(--font-mono)',
                  textTransform: 'uppercase'
                }}>
                  {project.id === 'graduation-project' ? 'Concept' : 'Shipped'}
                </span>
              </div>
              <h3 style={{ 
                fontSize: '16px', 
                fontWeight: 700, 
                color: 'var(--text-primary)', 
                margin: '0 0 6px 0',
                lineHeight: 1.3
              }}>
                {project.title}
              </h3>
              <p style={{ 
                fontSize: '12.5px', 
                color: 'var(--text-secondary)',
                margin: '0 0 10px 0',
                lineHeight: 1.4
              }}>
                {project.role} &middot; {project.duration}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                {project.tags && project.tags.slice(0, 3).map((tag, tIdx) => (
                  <span 
                    key={tIdx} 
                    style={{ 
                      fontSize: '9px', 
                      background: tag === 'Shift' ? 'rgba(255, 42, 133, 0.08)' : 'rgba(0, 82, 255, 0.06)', 
                      color: tag === 'Shift' ? '#ff2a85' : '#0052ff', 
                      border: tag === 'Shift' ? '1px solid rgba(255, 42, 133, 0.2)' : '1px solid rgba(0, 82, 255, 0.1)',
                      padding: '1px 6px', 
                      borderRadius: '6px',
                      fontWeight: 500,
                      fontFamily: 'var(--font-mono)'
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
