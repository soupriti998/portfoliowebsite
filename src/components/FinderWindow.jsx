import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { PROJECTS } from './Projects';

let audioCtx = null;

function playSynthSound(type, isMuted) {
  if (isMuted) return;
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    if (!audioCtx) {
      audioCtx = new AudioContext();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    const now = audioCtx.currentTime;
    
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    if (type === 'hover') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(120, now);
      osc.frequency.exponentialRampToValueAtTime(160, now + 0.05);
      gain.gain.setValueAtTime(0.02, now);
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

export default function FinderWindow({ 
  activeTab, 
  setActiveTab, 
  onClose, 
  children,
  activeProject,
  setActiveProject,
  isMuted,
  focusedWindow,
  isMaximized,
  setIsMaximized
}) {
  const constraintsRef = useRef(null);

  const handleTabClick = (tab) => {
    playSynthSound('click', isMuted);
    setActiveTab(tab);
    setActiveProject(null);
  };

  const handleSubProjectClick = (projectId) => {
    playSynthSound('click', isMuted);
    if (projectId === 'graduation-project') {
      setActiveTab('not-shipped');
    } else {
      setActiveTab('selected-works');
    }
    setActiveProject(projectId);
  };

  const handleHover = () => {
    playSynthSound('hover', isMuted);
  };

  const getTitle = () => {
    if (projectMap[activeProject]) return projectMap[activeProject];
    switch(activeTab) {
      case 'selected-works': return 'Selected Works';
      case 'not-shipped': return 'Not Shipped';
      case 'illustrations': return 'Illustration Works';
      case 'ai-experiments': return 'AI Experiments';
      case 'about-me': return 'About Me';
      default: return 'Finder';
    }
  };

  const projectMap = {
    'graduation-project': 'Graduation Project — Spatial Booking App',
    'search-to-intent': 'Search to Intent',
    'ai-cooking': 'Rethinking AI Cooking Experience',
    'toothlens': 'Toothlens — AI Dental Scan Platform',
    'onboarding': 'Reducing Returns via Onboarding',
    'phonepe': 'PhonePe — Internal Employee Portal',
    'doctorite': 'Doctorite — Clinical Dashboard Operations',
    'mcb-school': 'Imagination-Led MCB School Portal',
    'medpod': 'Medpod — Medication Dispenser',
    'battle-pass': 'Battle Pass Progression'
  };

  return (
    <div 
      ref={constraintsRef}
      style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
        zIndex: focusedWindow === 'finder' ? 450 : 400
      }}
    >
      <motion.div 
        drag={isMaximized ? false : true}
        dragMomentum={false}
        dragConstraints={constraintsRef}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ 
          scale: 1, 
          opacity: 1,
          x: isMaximized ? 0 : undefined,
          y: isMaximized ? 0 : undefined
        }}
        style={{
          width: isMaximized ? '100vw' : 'min(92vw, 920px)',
          height: isMaximized ? '100vh' : 'min(82vh, 600px)',
          position: isMaximized ? 'fixed' : 'relative',
          top: isMaximized ? 0 : 'auto',
          left: isMaximized ? 0 : 'auto',
          borderRadius: isMaximized ? 0 : '12px',
          pointerEvents: 'auto',
          zIndex: isMaximized ? 999 : 'auto'
        }}
        className="finder-window"
      >
        {/* Window Header */}
        <div className="finder-header">
          {/* Close/Min/Max Dots */}
          <div className="finder-dots">
            <div 
              className="finder-dot red" 
              title="Close" 
              onMouseEnter={handleHover}
              onClick={() => {
                playSynthSound('click', isMuted);
                onClose();
              }}
            />
            <div 
              className="finder-dot yellow" 
              title="Restore Normal Size" 
              onMouseEnter={handleHover}
              onClick={() => {
                playSynthSound('click', isMuted);
                setIsMaximized(false);
              }}
            />
            <div 
              className="finder-dot green" 
              title="Maximize Full Screen" 
              onMouseEnter={handleHover}
              onClick={() => {
                playSynthSound('click', isMuted);
                setIsMaximized(true);
              }}
            />
          </div>

          {/* Title */}
          <div className="finder-title">
            {getTitle()}
          </div>
        </div>

        {/* Window Body */}
        <div className="finder-body">
          {/* Sidebar */}
          <div className="finder-sidebar">
            {/* Section 1: Favourites */}
            <div>
              <span className="finder-sidebar-section-title">Favourites</span>
              <ul className="finder-sidebar-list">
                {/* Selected Works Tab */}
                <li 
                  className={`finder-sidebar-item ${activeTab === 'selected-works' ? 'active' : ''}`}
                  onMouseEnter={handleHover}
                  onClick={() => handleTabClick('selected-works')}
                  style={{ display: 'flex', alignItems: 'center', width: '100%' }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '9px', color: '#94a3b8', width: '12px', display: 'inline-block', textAlign: 'center' }}>
                      {activeTab === 'selected-works' ? '▼' : '▶'}
                    </span>
                    <span style={{ fontSize: '13px' }}>⭐</span> Selected Works
                  </span>
                </li>
                
                {/* Sub-projects list */}
                {activeTab === 'selected-works' && (
                  <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: '18px', margin: '4px 0' }}>
                    {PROJECTS.filter(p => p.id !== 'graduation-project').map((project, idx) => (
                      <span 
                        key={project.id}
                        className={`finder-sidebar-subitem ${activeProject === project.id ? 'active' : ''}`}
                        onMouseEnter={handleHover}
                        onClick={() => handleSubProjectClick(project.id)}
                      >
                        📄 Project {String(idx + 1).padStart(2, '0')}
                      </span>
                    ))}
                  </div>
                )}

                {/* Illustration Works Tab */}
                <li 
                  className={`finder-sidebar-item ${activeTab === 'illustrations' ? 'active' : ''}`}
                  onMouseEnter={handleHover}
                  onClick={() => handleTabClick('illustrations')}
                  style={{ display: 'flex', alignItems: 'center', width: '100%', paddingLeft: '18px' }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '13px' }}>📁</span> Illustration Works
                  </span>
                </li>

                {/* AI Experiments Tab */}
                <li 
                  className={`finder-sidebar-item ${activeTab === 'ai-experiments' ? 'active' : ''}`}
                  onMouseEnter={handleHover}
                  onClick={() => handleTabClick('ai-experiments')}
                  style={{ display: 'flex', alignItems: 'center', width: '100%', paddingLeft: '18px' }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '13px' }}>📁</span> AI Experiments
                  </span>
                </li>

                {/* Not Shipped Tab */}
                <li 
                  className={`finder-sidebar-item ${activeTab === 'not-shipped' ? 'active' : ''}`}
                  onMouseEnter={handleHover}
                  onClick={() => handleTabClick('not-shipped')}
                  style={{ display: 'flex', alignItems: 'center', width: '100%' }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '9px', color: '#94a3b8', width: '12px', display: 'inline-block', textAlign: 'center' }}>
                      {activeTab === 'not-shipped' ? '▼' : '▶'}
                    </span>
                    <span style={{ fontSize: '13px' }}>📦</span> Not Shipped
                  </span>
                </li>

                {/* Not Shipped Sub-projects list */}
                {activeTab === 'not-shipped' && (
                  <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: '18px', margin: '4px 0' }}>
                    {PROJECTS.filter(p => p.id === 'graduation-project').map((project, idx) => (
                      <span 
                        key={project.id}
                        className={`finder-sidebar-subitem ${activeProject === project.id ? 'active' : ''}`}
                        onMouseEnter={handleHover}
                        onClick={() => handleSubProjectClick(project.id)}
                      >
                        📄 Project {String(idx + 1).padStart(2, '0')}
                      </span>
                    ))}
                  </div>
                )}
              </ul>
            </div>

            {/* Section 2: Locations */}
            <div style={{ marginTop: '8px' }}>
              <span className="finder-sidebar-section-title">Locations</span>
              <ul className="finder-sidebar-list">
                {/* About Me Tab */}
                <li 
                  className={`finder-sidebar-item ${activeTab === 'about-me' ? 'active' : ''}`}
                  onMouseEnter={handleHover}
                  onClick={() => handleTabClick('about-me')}
                >
                  <span style={{ fontSize: '13px' }}>📁</span> About Me
                </li>
              </ul>
            </div>
          </div>

          {/* Main content pane */}
          <div className="finder-content">
            {children}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
