import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DS_ASSETS = [
  { id: 1, title: "Bree — Conversational AI Kit (Dark & Light Mode)", src: "/design_system/Bree- An Coversational AI Design ki for mobile bothe dark and light mode.png" },
  { id: 2, title: "Dashboard Kit", src: "/design_system/Dashboard Kit.png" },
  { id: 3, title: "Neubrutalist Fun Finance App", src: "/design_system/Neubrutalist Fun Finance App.png" },
  { id: 4, title: "Google Map UI Element", src: "/design_system/Google Map.png" }
];

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

export default function FinderFigmaDesignSystem({ isMuted }) {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleHover = () => {
    playSynthSound('hover', isMuted);
  };

  const handleImageClick = (img) => {
    playSynthSound('click', isMuted);
    setSelectedImage(img);
  };

  return (
    <div style={{ fontFamily: 'var(--font-body)', color: 'var(--text-primary)', paddingBottom: '40px' }}>
      {/* CSS Rules for Layout */}
      <style>{`
        .ds-gallery-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
          margin-top: 24px;
          width: 100%;
        }
        .ds-gallery-card {
          background: var(--bg-card-frosted, rgba(255, 255, 255, 0.4));
          border: 1px solid var(--border);
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0,0,0,0.03);
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease;
          cursor: zoom-in;
        }
        .ds-gallery-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 30px rgba(0,0,0,0.06);
        }
        .ds-img-container {
          width: 100%;
          overflow: hidden;
          background: rgba(0,0,0,0.03);
          display: flex;
          align-items: center;
          justify-content: center;
          border-bottom: 1px solid var(--border);
        }
        .ds-meta-container {
          padding: 14px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .ds-meta-title {
          font-size: 14px;
          fontWeight: 600;
          color: var(--text-primary);
        }
      `}</style>

      {/* Header Info */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <span style={{ fontSize: '20px' }}>🎨</span>
          <span style={{ 
            fontSize: '11px', 
            fontWeight: 700, 
            color: '#3b82f6', 
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            fontFamily: 'var(--font-mono)'
          }}>
            Figma Community
          </span>
        </div>

        <h1 style={{ 
          fontSize: '28px', 
          fontWeight: 800, 
          color: 'var(--text-primary)', 
          margin: '0 0 12px 0',
          letterSpacing: '-0.02em',
          lineHeight: 1.2
        }}>
          Figma Design System
        </h1>

        <p style={{
          fontSize: '14.5px',
          lineHeight: 1.6,
          color: 'var(--text-secondary)',
          maxWidth: '620px',
          margin: '0 0 20px 0'
        }}>
          A premium suite of modular UI kits, neubrutalist dashboards, conversation graphs, and functional vector components designed to scale digital products with engineering precision.
        </p>

        {/* CTA Button to open external community profile */}
        <a 
          href="https://www.figma.com/@soupritidas" 
          target="_blank" 
          rel="noopener noreferrer"
          onClick={() => playSynthSound('click', isMuted)}
          onMouseEnter={handleHover}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: '#3b82f6',
            color: '#ffffff',
            fontWeight: 600,
            fontSize: '13px',
            padding: '8px 18px',
            borderRadius: '24px',
            textDecoration: 'none',
            boxShadow: '0 4px 12px rgba(59, 130, 246, 0.2)',
            transition: 'background 0.2s, transform 0.2s'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = '#2563eb';
            e.currentTarget.style.transform = 'translateY(-1px)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = '#3b82f6';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <span>View on Figma Community</span>
          <span>&rarr;</span>
        </a>
      </div>

      {/* Gallery List of design system files */}
      <div className="ds-gallery-grid">
        {DS_ASSETS.map((item) => (
          <div 
            key={item.id} 
            className="ds-gallery-card"
            onMouseEnter={handleHover}
            onClick={() => handleImageClick(item)}
          >
            <div className="ds-img-container">
              <img 
                src={item.src} 
                alt={item.title} 
                style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'contain' }}
              />
            </div>
            <div className="ds-meta-container">
              <span className="ds-meta-title">{item.title}</span>
              <span style={{ fontSize: '11px', color: '#3b82f6', fontWeight: 600 }}>Zoom Preview</span>
            </div>
          </div>
        ))}
      </div>

      {/* Full Screen Image Zoom Modal Overlay */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(26, 8, 46, 0.88)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10000000,
              padding: '24px',
              cursor: 'zoom-out'
            }}
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: 'relative',
                maxWidth: '90%',
                maxHeight: '90%',
                background: '#ffffff',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 24px 60px rgba(0,0,0,0.5)',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              {/* Header inside modal */}
              <div style={{
                padding: '12px 18px',
                background: '#f8fafc',
                borderBottom: '1px solid #e2e8f0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>{selectedImage.title}</span>
                <button 
                  onClick={() => {
                    playSynthSound('click', isMuted);
                    setSelectedImage(null);
                  }}
                  style={{
                    border: 'none',
                    background: '#e2e8f0',
                    color: '#334155',
                    fontSize: '11px',
                    fontWeight: 700,
                    padding: '4px 10px',
                    borderRadius: '100px',
                    cursor: 'pointer'
                  }}
                >
                  Close
                </button>
              </div>
              
              {/* Large Image body */}
              <div style={{ overflow: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <img 
                  src={selectedImage.src} 
                  alt={selectedImage.title} 
                  style={{ maxWidth: '100%', height: 'auto', display: 'block', maxHeight: '75vh', objectFit: 'contain' }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
