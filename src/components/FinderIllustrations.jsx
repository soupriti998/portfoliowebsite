import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ILLUSTRATIONS = [
  { id: 1, type: "image", src: "/illustrations/img_1418.png" },
  { id: 2, type: "image", src: "/illustrations/img_1419.png" },
  { id: 3, type: "image", src: "/illustrations/img_1421.png" },
  { id: 4, type: "image", src: "/illustrations/img_1424.png" },
  { id: 5, type: "image", src: "/illustrations/img_1425.png" },
  { id: 6, type: "image", src: "/illustrations/img_1427.png" },
  { id: 7, type: "image", src: "/illustrations/img_1432.png" },
  { id: 8, type: "image", src: "/illustrations/img_1433.png" },
  { id: 9, type: "image", src: "/illustrations/img_1434.png" },
  { id: 10, type: "image", src: "/illustrations/img_1435.png" },
  { id: 11, type: "image", src: "/illustrations/img_1439.png" },
  { id: 12, type: "image", src: "/illustrations/img_1440.png" },
  { id: 13, type: "image", src: "/illustrations/img_1444.png" },
  { id: 14, type: "image", src: "/illustrations/img_1445.gif" }
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

export default function FinderIllustrations({ isMuted }) {
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [isMaximized, setIsMaximized] = useState(false);

  const handleHover = () => {
    playSynthSound('hover', isMuted);
  };

  const handleMediaClick = (media) => {
    playSynthSound('click', isMuted);
    setSelectedMedia(media);
    setIsMaximized(false);
  };

  return (
    <div style={{ fontFamily: 'var(--font-body)', color: 'var(--text-primary)', paddingBottom: '40px' }}>
      <style>{`
        .bento-illustrations-grid {
          column-count: 3;
          column-gap: 16px;
          width: 100%;
          margin-top: 16px;
        }
        @media (max-width: 900px) {
          .bento-illustrations-grid {
            column-count: 2;
          }
        }
        @media (max-width: 600px) {
          .bento-illustrations-grid {
            column-count: 1;
          }
        }
        .bento-illustrations-item {
          break-inside: avoid;
          margin-bottom: 16px;
          border-radius: 14px;
          overflow: hidden;
          background: #ffffff;
          border: 1px solid rgba(0,0,0,0.06);
          box-shadow: 0 2px 8px rgba(0,0,0,0.02);
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease;
          cursor: pointer;
        }
        .bento-illustrations-item:hover {
          transform: scale(1.02);
          box-shadow: 0 10px 24px rgba(0,0,0,0.06);
        }
      `}</style>

      <h1 style={{ fontSize: '24px', fontWeight: 700, margin: '0 0 6px 0', color: 'var(--text-primary)' }}>Illustration Works</h1>
      <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: '0 0 24px 0', lineHeight: 1.5, maxWidth: '620px' }}>
        I have always found a deep sense of joy in illustrating human characters. Engaging with this creative process helps me master color psychology and the natural flow of tones, which directly translates into more balanced, visually intuitive color palettes for my UI/UX designs.
      </p>

      {/* Dynamic Masonry Bento Grid */}
      <div className="bento-illustrations-grid">
        {ILLUSTRATIONS.map((item) => (
          <div 
            key={item.id}
            className="bento-illustrations-item"
            onMouseEnter={handleHover}
            onClick={() => handleMediaClick(item)}
          >
            {item.type === 'video' ? (
              <video 
                src={item.src} 
                autoPlay 
                loop 
                muted 
                playsInline 
                style={{ width: '100%', height: 'auto', display: 'block' }} 
              />
            ) : (
              <img 
                src={item.src} 
                alt="Illustration Art" 
                style={{ width: '100%', height: 'auto', display: 'block' }} 
              />
            )}
          </div>
        ))}
      </div>

      {/* iOS Style Zoom Modal */}
      <AnimatePresence>
        {selectedMedia && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.45)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              zIndex: 999999999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '24px',
              cursor: 'zoom-out'
            }}
            onClick={() => {
              playSynthSound('click', isMuted);
              setSelectedMedia(null);
            }}
          >
            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 26, stiffness: 220 }}
              style={{
                position: 'relative',
                background: '#ffffff',
                borderRadius: '20px',
                border: '1px solid rgba(255,255,255,0.4)',
                boxShadow: '0 24px 70px rgba(0,0,0,0.3)',
                padding: '20px',
                maxWidth: isMaximized ? '95vw' : '85vw',
                maxHeight: isMaximized ? '95vh' : '85vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                transition: 'max-width 0.4s var(--ease-out-expo), max-height 0.4s var(--ease-out-expo)'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Window Dot Controls (macOS Sonoma style top bar inside modal) */}
              <div style={{
                position: 'absolute',
                top: '16px',
                left: '20px',
                display: 'flex',
                gap: '8px',
                alignItems: 'center',
                zIndex: 10
              }}>
                {/* Close Dot */}
                <button 
                  onClick={() => {
                    playSynthSound('click', isMuted);
                    setSelectedMedia(null);
                  }}
                  title="Close"
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: '#ff5f56',
                    border: '0.5px solid #e0443e',
                    cursor: 'pointer',
                    padding: 0
                  }}
                />
                {/* Fake Minimize Dot */}
                <button 
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: '#ffbd2e',
                    border: '0.5px solid #de9e26',
                    cursor: 'pointer',
                    padding: 0
                  }}
                />
                {/* Maximize/Expand Dot */}
                <button 
                  onClick={() => {
                    playSynthSound('click', isMuted);
                    setIsMaximized(!isMaximized);
                  }}
                  title="Maximize"
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: '#27c93f',
                    border: '0.5px solid #1aab29',
                    cursor: 'pointer',
                    padding: 0
                  }}
                />
              </div>

              {/* Render Media */}
              <div style={{ 
                marginTop: '24px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                width: '100%',
                height: '100%',
                maxHeight: isMaximized ? 'calc(95vh - 70px)' : 'calc(85vh - 70px)',
                overflow: 'auto'
              }}>
                {selectedMedia.type === 'video' ? (
                  <video 
                    src={selectedMedia.src} 
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    controls
                    style={{ 
                      maxWidth: '100%', 
                      maxHeight: '100%', 
                      borderRadius: '12px', 
                      display: 'block',
                      objectFit: 'contain'
                    }} 
                  />
                ) : (
                  <img 
                    src={selectedMedia.src} 
                    alt="Illustration Expanded" 
                    style={{ 
                      maxWidth: 'max-content', 
                      maxHeight: 'max-content', 
                      borderRadius: '12px', 
                      display: 'block'
                    }} 
                  />
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
