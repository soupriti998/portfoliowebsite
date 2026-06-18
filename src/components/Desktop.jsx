import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Custom modern SVG folders
export const FolderIcon = ({ color1 = "#4ade80", color2 = "#22c55e" }) => (
  <svg width="100%" height="100%" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 12C6 9.79086 7.79086 8 10 8H24L30 16H54C56.2091 16 58 17.7909 58 20V52C58 54.2091 56.2091 56 54 56H10C7.79086 56 6 54.2091 6 52V12Z" fill={`url(#folderGrad-${color1.replace('#', '')})`} />
    <path d="M6 22C6 19.7909 7.79086 18 10 18H54C56.2091 18 58 19.7909 58 22V52C58 54.2091 56.2091 56 54 56H10C7.79086 56 6 54.2091 6 52V22Z" fill={`url(#folderFrontGrad-${color1.replace('#', '')})`} opacity="0.9" />
    <defs>
      <linearGradient id={`folderGrad-${color1.replace('#', '')}`} x1="32" y1="8" x2="32" y2="56" gradientUnits="userSpaceOnUse">
        <stop stopColor={color1} />
        <stop offset="1" stopColor={color2} />
      </linearGradient>
      <linearGradient id={`folderFrontGrad-${color1.replace('#', '')}`} x1="32" y1="18" x2="32" y2="56" gradientUnits="userSpaceOnUse">
        <stop stopColor={color1} stopOpacity="0.8" />
        <stop offset="1" stopColor={color2} />
      </linearGradient>
    </defs>
  </svg>
);

export const CaseStudiesIcon = () => (
  <svg width="100%" height="100%" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="64" height="64" rx="16" fill="#18181b" />
    <circle cx="24" cy="32" r="8" fill="#ffffff" />
    <circle cx="40" cy="32" r="8" fill="#ffffff" />
    <rect x="24" y="24" width="16" height="16" fill="#ffffff" />
    <circle cx="32" cy="32" r="8" fill="#18181b" />
  </svg>
);

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
    }
  } catch (e) {
    console.warn("Synth audio failed:", e);
  }
}

function DesktopFolderItem({ label, icon, onClick, handleHover, isShipped }) {
  const [isHovered, setIsHovered] = useState(false);

  const onMouseEnter = () => {
    setIsHovered(true);
    handleHover();
  };

  const onMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div 
      className="desktop-folder-item"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      style={{ position: 'relative' }}
    >
      <div style={{ position: 'relative', width: '80px', height: '80px', marginBottom: '8px' }}>
        {/* Page 1 (left) */}
        <motion.div 
          style={{
            position: 'absolute',
            width: '48px',
            height: '60px',
            background: '#ffffff',
            border: '1px solid rgba(226, 232, 240, 0.85)',
            borderRadius: '5px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.12)',
            top: 10,
            left: 16,
            zIndex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            padding: '6px 5px',
            transformOrigin: 'bottom center',
            pointerEvents: 'none'
          }}
          animate={isHovered ? { opacity: 1, y: -30, rotate: -18, scale: 1 } : { opacity: 0, y: 5, rotate: 0, scale: 0.8 }}
          transition={{ type: 'spring', stiffness: 260, damping: 18 }}
        >
          <div style={{ width: '80%', height: '3px', background: '#cbd5e1', borderRadius: '0.5px' }} />
          <div style={{ width: '50%', height: '3px', background: '#cbd5e1', borderRadius: '0.5px' }} />
          <div style={{ width: '70%', height: '3px', background: '#cbd5e1', borderRadius: '0.5px' }} />
        </motion.div>

        {/* Page 2 (middle) */}
        <motion.div 
          style={{
            position: 'absolute',
            width: '48px',
            height: '60px',
            background: '#ffffff',
            border: '1px solid rgba(226, 232, 240, 0.85)',
            borderRadius: '5px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.12)',
            top: 10,
            left: 16,
            zIndex: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            padding: '6px 5px',
            transformOrigin: 'bottom center',
            pointerEvents: 'none'
          }}
          animate={isHovered ? { opacity: 1, y: -38, rotate: 0, scale: 1.05 } : { opacity: 0, y: 5, rotate: 0, scale: 0.8 }}
          transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.02 }}
        >
          <div style={{ width: '60%', height: '3px', background: '#94a3b8', borderRadius: '0.5px' }} />
          <div style={{ width: '80%', height: '3px', background: '#cbd5e1', borderRadius: '0.5px' }} />
          <div style={{ width: '45%', height: '3px', background: '#cbd5e1', borderRadius: '0.5px' }} />
        </motion.div>

        {/* Page 3 (right) */}
        <motion.div 
          style={{
            position: 'absolute',
            width: '48px',
            height: '60px',
            background: '#ffffff',
            border: '1px solid rgba(226, 232, 240, 0.85)',
            borderRadius: '5px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.12)',
            top: 10,
            left: 16,
            zIndex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            padding: '6px 5px',
            transformOrigin: 'bottom center',
            pointerEvents: 'none'
          }}
          animate={isHovered ? { opacity: 1, y: -30, rotate: 18, scale: 1 } : { opacity: 0, y: 5, rotate: 0, scale: 0.8 }}
          transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.04 }}
        >
          <div style={{ width: '70%', height: '3px', background: '#cbd5e1', borderRadius: '0.5px' }} />
          <div style={{ width: '60%', height: '3px', background: '#cbd5e1', borderRadius: '0.5px' }} />
          <div style={{ width: '75%', height: '3px', background: '#cbd5e1', borderRadius: '0.5px' }} />
        </motion.div>

        {/* Actual Folder Icon */}
        <div style={{ position: 'relative', zIndex: 10, width: '100%', height: '100%', filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.15))' }}>
          {icon}
        </div>
      </div>
      <span className="desktop-folder-label" style={{ fontSize: '13px', marginTop: '6px' }}>{label}</span>
      {isShipped && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          padding: '2px 8px',
          background: 'rgba(34, 197, 94, 0.12)',
          border: '1px solid rgba(34, 197, 94, 0.25)',
          borderRadius: '100px',
          fontSize: '9px',
          fontWeight: 600,
          color: '#16a34a',
          marginTop: '4px',
          letterSpacing: '0.01em',
          width: 'fit-content',
          marginInline: 'auto',
          boxShadow: '0 1px 2px rgba(34,197,94,0.1)'
        }}>
          <span className="pulse-green-dot" style={{
            width: '5px',
            height: '5px',
            backgroundColor: '#22c55e',
            borderRadius: '50%',
            display: 'inline-block',
            boxShadow: '0 0 4px #22c55e'
          }} />
          <span style={{ fontSize: '9px' }}>used by 60k+ users</span>
        </div>
      )}
    </div>
  );
}

function MacNotification({ icon, appName, time, title, message, onClose }) {
  return (
    <motion.div
      initial={{ x: 380, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 380, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 150, damping: 22 }}
      className="mac-notification"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="mac-notification-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div className="mac-notification-app-icon">
            {icon}
          </div>
          <span className="mac-notification-app-name">{appName}</span>
        </div>
        <span className="mac-notification-time">{time}</span>
      </div>
      
      {/* Content */}
      <div className="mac-notification-content">
        <h4 className="mac-notification-title">{title}</h4>
        <p className="mac-notification-message">{message}</p>
      </div>
    </motion.div>
  );
}
function playIosNotificationChime() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;
  try {
    const ctx = new AudioContext();
    const masterGain = ctx.createGain();
    masterGain.connect(ctx.destination);
    masterGain.gain.setValueAtTime(0.08, ctx.currentTime);

    // Tritone sequence: C6 (1046.5Hz) -> E6 (1318.51Hz) -> G6 (1567.98Hz)
    const notes = [1046.5, 1318.51, 1567.98];
    const noteDuration = 0.12; 
    const delay = 0.11;

    notes.forEach((freq, idx) => {
      const startTime = ctx.currentTime + idx * delay;
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);
      
      gainNode.gain.setValueAtTime(0, startTime);
      gainNode.gain.linearRampToValueAtTime(0.12, startTime + 0.015);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, startTime + noteDuration);
      
      osc.connect(gainNode);
      gainNode.connect(masterGain);
      
      osc.start(startTime);
      osc.stop(startTime + noteDuration + 0.05);
    });
  } catch (e) {
    console.warn("Notification chime failed:", e);
  }
}

export default function Desktop({ 
  onOpenWindow, 
  isMuted, 
  setIsMuted,
  bgMuted,
  setBgMuted,
  isChatbotOpen,
  setIsChatbotOpen,
  setFocusedWindow,
  hideDock
}) {
  const desktopRef = useRef(null);
  const [showNotesPopup, setShowNotesPopup] = useState(false);
  const [showStatusNotification, setShowStatusNotification] = useState(false);
  const [showCreedNotification, setShowCreedNotification] = useState(false);

  // Pop notifications one by one after landing
  useEffect(() => {
    const timer1 = setTimeout(() => {
      setShowStatusNotification(true);
      if (!isMuted) playIosNotificationChime();
    }, 2000);

    const timer2 = setTimeout(() => {
      setShowCreedNotification(true);
      if (!isMuted) playIosNotificationChime();
    }, 4000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [isMuted]);

  const playClickSound = () => {
    if (isMuted) return;
    const audio = new Audio('/Cute,_high-pitched_n_#4-1779064071214.wav');
    audio.volume = 0.4;
    audio.play().catch(e => console.log("Sound play blocked"));
  };

  const playOpenSound = () => {
    if (isMuted) return;
    const audio = new Audio('/Soft_cat_voice_in_a__#4-1779061559576.wav');
    audio.volume = 0.45;
    audio.play().catch(e => console.log("Sound play blocked"));
  };

  const handleFolderClick = (e, tab) => {
    e.stopPropagation();
    playOpenSound();
    onOpenWindow(tab);
  };

  const handleDockItemClick = (e, tab, isExternal, url) => {
    if (e && typeof e.stopPropagation === 'function') {
      e.stopPropagation();
    }
    playClickSound();
    
    let actualTab = tab;
    let actualIsExternal = isExternal;
    let actualUrl = url;
    
    if (typeof e === 'string') {
      actualTab = e;
      actualIsExternal = false;
    }
    
    if (actualIsExternal) {
      window.open(actualUrl, '_blank');
    } else {
      onOpenWindow(actualTab);
    }
  };

  const handleDesktopClick = () => {
    const nextMute = !bgMuted;
    setBgMuted(nextMute);
    setIsMuted(nextMute);
  };

  const handleHover = () => {
    playSynthSound('hover', isMuted);
  };

  return (
    <div className="desktop-wrapper" ref={desktopRef} onClick={handleDesktopClick}>
      {/* ── Background Image & TV Video Player ── */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#ffffff'
        }}
      >
        <div className="bg-container">
          {/* Background Video */}
          <motion.video 
            src="/bg_video.mp4" 
            poster="/background_img.png"
            autoPlay
            loop
            muted={bgMuted}
            playsInline
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              pointerEvents: 'none'
            }}
          />
        </div>

        {/* Subtle overlay to ensure text/notes contrast */}
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(255, 255, 255, 0.05)',
            pointerEvents: 'none',
            zIndex: 4
          }}
        />
      </div>

      {/* ── Top Header Bar ── */}
      <header 
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '64px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 clamp(24px, 5vw, 72px)',
          zIndex: 50,
          pointerEvents: 'auto'
        }}
      >
        {/* Custom Logo (My logo.svg) */}
        <div 
          onClick={playClickSound}
          onMouseEnter={handleHover}
          style={{
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <svg width="24" height="32" viewBox="0 0 37 49" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.1091 13.7987C15.1091 15.6885 12.9271 16.1755 11.0374 17.1738C8.93174 24.1738 6.89937 20.1738 4.53735 18.3181C3.53735 18.3181 4.53735 21.3544 2.40676 21.1738C1.35491 21.0847 0.447393 26.2808 0.0373535 26.1738L0.00716259 16.5391C0.00337078 15.329 1.06665 14.3959 2.27203 14.5024C3.82253 14.6394 5.36498 14.708 6.89937 14.708C9.09219 14.708 10.1886 14.3336 10.1886 13.5848C10.1886 13.2817 10.0014 13.0054 9.62702 12.7558C9.25264 12.4884 8.76237 12.2477 8.15623 12.0338C7.56791 11.802 6.90828 11.5703 6.17734 11.3385C5.46423 11.0889 4.7422 10.7947 4.01126 10.456C3.28032 10.0995 2.61178 9.70725 2.00563 9.27938C1.41731 8.85151 0.935961 8.31668 0.561576 7.67488C0.187192 7.01525 0 6.28431 0 5.48205C0 3.87755 0.802252 2.56721 2.40676 1.55102C4.01126 0.517007 6.38236 0 9.52006 0C10.1084 0 10.8215 0.0534833 11.6594 0.16045C12.4973 0.249589 13.1124 0.347642 13.5046 0.454608V5.37509C11.5079 5.07201 9.49332 4.92048 7.46094 4.92048C5.7673 4.92048 4.92048 5.23246 4.92048 5.85644C4.92048 6.10603 5.10767 6.33779 5.48206 6.55172C5.85644 6.76566 6.33779 6.97068 6.92611 7.16678C7.53226 7.36289 8.2008 7.57682 8.93174 7.80859C9.66268 8.04035 10.3847 8.33451 11.0978 8.69106C11.8288 9.02979 12.4884 9.422 13.0767 9.8677C13.6829 10.2956 14.1731 10.8482 14.5475 11.5257C14.9219 12.2031 15.1091 12.9608 15.1091 13.7987Z" fill="#000000" />
            <path d="M21.4469 1.31034C22.8374 0.436781 24.3528 0 25.993 0C27.6331 0 29.1485 0.436781 30.5391 1.31034C31.9296 2.18391 33.026 3.37837 33.8283 4.89374C34.6484 6.39127 35.0584 8.03143 35.0584 9.81422C35.0584 11.597 34.6484 13.2461 33.8283 14.7614C33.026 16.259 30.2984 18.3003 28.9078 19.1738C27.5172 20.0474 26.6775 19.1738 25.0374 19.1738C23.3972 19.1738 22.4467 23.6738 20.0374 23.6738C17.0374 23.6738 19.8266 19.6738 16.5374 16.6738C19.0374 15.6738 16.9543 11.597 16.9543 9.81422C16.9543 8.03143 17.3554 6.39127 18.1576 4.89374C18.9777 3.37837 20.0741 2.18391 21.4469 1.31034ZM23.0781 14.0662C23.8804 15.225 24.852 15.8044 25.993 15.8044C27.1339 15.8044 28.1056 15.225 28.9078 14.0662C29.7279 12.8895 30.1379 11.4722 30.1379 9.81422C30.1379 8.15623 29.7279 6.74783 28.9078 5.58902C28.1056 4.41239 27.1339 3.82407 25.993 3.82407C24.852 3.82407 23.8804 4.41239 23.0781 5.58902C22.2759 6.74783 21.8747 8.15623 21.8747 9.81422C21.8747 11.4722 22.2759 12.8895 23.0781 14.0662Z" fill="#000000" />
            <path d="M16.6975 36.4893C16.6975 38.3077 16.3766 39.8677 15.7348 41.1691C15.1108 42.4527 14.3031 46.4607 13.0374 47.1738C11.7894 47.8691 10.1457 42.6738 8.38077 42.6738C6.59799 42.6738 5.80313 45.8691 4.53735 45.1738C3.28941 44.4607 2.50264 42.4527 1.86084 41.1691C1.23687 39.8677 0.0373535 38.3077 0.0373535 36.4893V28.6737C0.999792 29.2984 2.29243 28.9259 2.77485 27.8848L4.95783 23.1738V33.6738C4.95783 36.9185 4.75539 39.156 7.03735 39.1738C9.30149 39.156 11.777 39.734 11.777 36.4893V19.6738L12.2315 19.1486C13.7363 17.4101 16.5922 18.4536 16.6216 20.7527L16.6975 26.6737V36.4893Z" fill="#000000" />
            <path d="M24.2898 35.6603C24.2898 35.6603 25.0374 41.6738 24.2898 45.1738C23.9001 46.9986 22.0374 47.1738 21.0374 48.6738C20.3438 49.7141 18.5374 47.1738 18.5374 47.1738L19.3693 27.1738C21.3445 26.5504 22.7442 24.8887 23.819 23.1182C24.0353 22.7618 24.2757 22.4335 24.5374 22.1738C26.1741 20.5496 29.0374 23.1738 30.0928 20.1738C31.1482 17.1737 36.1255 23.6739 36.5374 27.6738C36.5374 29.6739 36.5374 32.605 36.5374 34.1738C36.5374 35.7248 33.4324 39.6603 33.0374 40.1738C28.0374 46.6738 26.0374 39.6738 25.5374 38.6738C25.0374 37.6738 24.2898 35.6603 24.2898 35.6603ZM29.5374 27.1738C28.1953 25.4962 25.696 25.9885 24.9621 28.0077L24.2898 29.8573C24.2898 29.8573 24.5374 31.1737 25.0374 32.6738C25.5374 34.1738 25.8046 34.7313 26.0374 35.1738C26.7291 36.4893 28.0374 39.1738 29.5374 39.6738C31.0374 40.1738 33.2141 34.1739 33.5374 33.1738C33.9422 31.9212 33.7703 28.6939 32.8606 27.6738C31.9871 26.6942 31.5374 29.6738 29.5374 27.1738ZM29.5374 28.8573C29.5374 28.8573 29.5374 28.8573 29.5374 28.8573Z" fill="#000000" />
          </svg>
        </div>

        {/* Right side controls - Removed as requested */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        </div>
      </header>

      {/* ── Desktop Main Content Area ── */}
      <div className="desktop-content">
        {/* Left Side: Desktop Folders */}
        <div className="desktop-folders" style={{ marginTop: '40px' }}>
          {[
            { label: "Selected Works", icon: <FolderIcon color1="#42e6a4" color2="#17b978" />, tab: 'selected-works' },
            { label: "Illustration Works", icon: <FolderIcon color1="#3b82f6" color2="#1d4ed8" />, tab: 'illustrations' },
            { label: "AI Experiments", icon: <FolderIcon color1="#06b6d4" color2="#0891b2" />, tab: 'ai-experiments' },
            { label: "Not Shipped", icon: <FolderIcon color1="#ec4899" color2="#db2777" />, tab: 'not-shipped' }
          ].map((item, idx) => (
            <motion.div
              key={item.tab}
              drag
              dragConstraints={desktopRef}
              dragElastic={0.05}
              dragMomentum={false}
              whileDrag={{ scale: 1.05, zIndex: 100 }}
              initial={{ scale: 0, y: 40, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              transition={{
                type: 'spring',
                stiffness: 150,
                damping: 12,
                delay: 0.6 + idx * 0.15
              }}
            >
              <DesktopFolderItem 
                label={item.label}
                icon={item.icon}
                onClick={(e) => handleFolderClick(e, item.tab)}
                handleHover={handleHover}
                isShipped={item.tab === 'selected-works'}
              />
            </motion.div>
          ))}
        </div>

        {/* Right Side: iOS Notification Banners - Floating in top-right corner above top nav bar */}
        <div style={{ 
          position: 'absolute', 
          top: '20px', 
          right: 'clamp(24px, 5vw, 72px)', 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '16px', 
          width: '320px', 
          pointerEvents: 'none', 
          zIndex: 1000 
        }}>
          <AnimatePresence>
            {showStatusNotification && (
              <MacNotification
                icon={
                  <svg width="10" height="12" viewBox="0 0 37 49" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.1091 13.7987C15.1091 15.6885 12.9271 16.1755 11.0374 17.1738C8.93174 24.1738 6.89937 20.1738 4.53735 18.3181C3.53735 18.3181 4.53735 21.3544 2.40676 21.1738C1.35491 21.0847 0.447393 26.2808 0.0373535 26.1738L0.00716259 16.5391C0.00337078 15.329 1.06665 14.3959 2.27203 14.5024C3.82253 14.6394 5.36498 14.708 6.89937 14.708C9.09219 14.708 10.1886 14.3336 10.1886 13.5848C10.1886 13.2817 10.0014 13.0054 9.62702 12.7558C9.25264 12.4884 8.76237 12.2477 8.15623 12.0338C7.56791 11.802 6.90828 11.5703 6.17734 11.3385C5.46423 11.0889 4.7422 10.7947 4.01126 10.456C3.28032 10.0995 2.61178 9.70725 2.00563 9.27938C1.41731 8.85151 0.935961 8.31668 0.561576 7.67488C0.187192 7.01525 0 6.28431 0 5.48205C0 3.87755 0.802252 2.56721 2.40676 1.55102C4.01126 0.517007 6.38236 0 9.52006 0C10.1084 0 10.8215 0.0534833 11.6594 0.16045C12.4973 0.249589 13.1124 0.347642 13.5046 0.454608V5.37509C11.5079 5.07201 9.49332 4.92048 7.46094 4.92048C5.7673 4.92048 4.92048 5.23246 4.92048 5.85644C4.92048 6.10603 5.10767 6.33779 5.48206 6.55172C5.85644 6.76566 6.33779 6.97068 6.92611 7.16678C7.53226 7.36289 8.2008 7.57682 8.93174 7.80859C9.66268 8.04035 10.3847 8.33451 11.0978 8.69106C11.8288 9.02979 12.4884 9.422 13.0767 9.8677C13.6829 10.2956 14.1731 10.8482 14.5475 11.5257C14.9219 12.2031 15.1091 12.9608 15.1091 13.7987Z" fill="#ffffff" />
                  </svg>
                }
                appName="Finder"
                time="now"
                title="Hey, this is Soupriti"
                message="I am an AI product designer & AI native designer."
                onClose={() => {
                  playClickSound();
                  setShowStatusNotification(false);
                }}
              />
            )}
            {showCreedNotification && (
              <MacNotification
                icon={
                  <img src="/figma_logo.png" alt="Figma" style={{ width: '100%', height: '100%', objectFit: 'contain', background: '#ffffff', padding: '2px' }} />
                }
                appName="Figma"
                time="now"
                title="Recent Launch"
                message="Recently I have made a design system for an AI product and I have launched it in Figma community."
                onClose={() => {
                  playClickSound();
                  setShowCreedNotification(false);
                }}
              />
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── Bottom Dock ── */}
      <motion.div 
        className="desktop-dock-container"
        onClick={(e) => e.stopPropagation()}
        initial={{ y: 120, opacity: 0, scale: 0.4, x: '-50%' }}
        animate={{ 
          y: hideDock ? 120 : 0, 
          opacity: hideDock ? 0 : 1,
          scale: hideDock ? 0.4 : 1,
          x: '-50%'
        }}
        transition={{ 
          type: 'spring', 
          stiffness: 100, 
          damping: 18,
          delay: 0.4
        }}
        style={{
          pointerEvents: hideDock ? 'none' : 'auto',
        }}
      >
        <div className="desktop-dock">
          {/* Finder */}
          <div 
            className="desktop-dock-item-wrapper"
            onMouseEnter={handleHover}
            onClick={() => handleDockItemClick('selected-works')}
          >
            <span className="dock-tooltip">Finder</span>
            <div className="desktop-dock-item">
              <img src="/finder_logo.png" alt="Finder" style={{ width: '80%', height: '80%', objectFit: 'contain' }} />
            </div>
          </div>

          {/* About Me */}
          <div 
            className="desktop-dock-item-wrapper"
            onMouseEnter={handleHover}
            onClick={() => handleDockItemClick('about-me')}
          >
            <span className="dock-tooltip">About Me</span>
            <div className="desktop-dock-item" style={{ overflow: 'hidden' }}>
              <img 
                src="/soupriti.jpg" 
                alt="About Me" 
                onError={(e) => e.target.src = '/soupriti_new.png'} 
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '11px' }} 
              />
            </div>
          </div>

          {/* Soup AI */}
          <div 
            className="desktop-dock-item-wrapper"
            onMouseEnter={handleHover}
            onClick={() => {
              playClickSound();
              setIsChatbotOpen(!isChatbotOpen);
              if (!isChatbotOpen) {
                setFocusedWindow('chatbot');
              }
            }}
          >
            <span className="dock-tooltip">Soup AI</span>
            <div className="desktop-dock-item">
              <img src="/ai_logo.png" alt="Soup AI" style={{ width: '74%', height: '74%', objectFit: 'contain' }} />
            </div>
          </div>

          {/* Divider */}
          <div className="dock-divider" />

          {/* LinkedIn */}
          <div 
            className="desktop-dock-item-wrapper"
            onMouseEnter={handleHover}
            onClick={(e) => handleDockItemClick(e, null, true, 'https://www.linkedin.com/in/soupriti-das/')}
          >
            <span className="dock-tooltip">LinkedIn</span>
            <div className="desktop-dock-item">
              <img src="/linkedin_logo.avif" alt="LinkedIn" style={{ width: '68%', height: '68%', objectFit: 'contain' }} />
            </div>
          </div>

          {/* Instagram */}
          <div 
            className="desktop-dock-item-wrapper"
            onMouseEnter={handleHover}
            onClick={(e) => handleDockItemClick(e, null, true, 'https://www.instagram.com/_soupriti_das_._?igsh=MTRhNHhhemV6dXZnZA%3D%3D&utm_source=qr')}
          >
            <span className="dock-tooltip">Instagram</span>
            <div className="desktop-dock-item">
              <img src="/instagram_logo.png" alt="Instagram" style={{ width: '68%', height: '68%', objectFit: 'contain' }} />
            </div>
          </div>

          {/* Figma */}
          <div 
            className="desktop-dock-item-wrapper"
            onMouseEnter={handleHover}
            onClick={(e) => handleDockItemClick(e, null, true, 'https://www.figma.com/@soupritidas')}
          >
            <span className="dock-tooltip">Figma</span>
            <div className="desktop-dock-item">
              <img src="/figma_logo.png" alt="Figma" style={{ width: '68%', height: '68%', objectFit: 'contain' }} />
            </div>
          </div>

          {/* Resume Download */}
          <div 
            className="desktop-dock-item-wrapper"
            onMouseEnter={handleHover}
            onClick={() => {
              playClickSound();
              const link = document.createElement('a');
              link.href = '/Soupriti_Das_Resume.pdf';
              link.download = 'Soupriti_Das_Resume.pdf';
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
          >
            <span className="dock-tooltip">Resume</span>
            <div className="desktop-dock-item">
              <img src="/resume_logo.png" alt="Resume" style={{ width: '68%', height: '68%', objectFit: 'contain' }} />
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Philosophy/Notes Popup ── */}
      {showNotesPopup && (
        <motion.div
          onClick={(e) => e.stopPropagation()}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          style={{
            position: 'absolute',
            bottom: '90px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '320px',
            background: '#fffffe',
            border: '1px solid #cbd5e1',
            borderRadius: '12px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
            padding: '16px',
            zIndex: 1001,
            fontFamily: 'var(--font-body)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px' }}>
            <span style={{ fontWeight: 700, fontSize: '14px', color: '#0f172a' }}>Quick Thoughts</span>
            <button 
              onClick={() => {
                playClickSound();
                setShowNotesPopup(false);
              }}
              style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '14px', color: '#94a3b8' }}
            >
              ✕
            </button>
          </div>
          <p style={{ fontSize: '13px', lineHeight: 1.6, color: '#334155', margin: 0 }}>
            "Good design is not just what it looks like and feels like. Design is how it works."
            <br /><br />
            I focus on high fidelity interaction, design systems, and helping AI companies deliver complex products with seamless consumer experience.
          </p>
        </motion.div>
      )}

    </div>
  );
}
