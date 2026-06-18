import { useState, useEffect } from 'react'

function playMacStartupChime() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;
  try {
    const ctx = new AudioContext();
    const masterGain = ctx.createGain();
    masterGain.connect(ctx.destination);
    masterGain.gain.setValueAtTime(0.12, ctx.currentTime);

    // macOS chord frequencies: F#2 (92.5Hz), C#3 (138.59Hz), F#3 (185Hz), A#3 (233.08Hz), C#4 (277.18Hz), F#4 (369.99Hz)
    const freqs = [92.5, 138.59, 185.0, 233.08, 277.18, 369.99];
    
    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      
      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.1);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 3.0);
      
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1200, ctx.currentTime);
      
      osc.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(masterGain);
      
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 3.2);
    });
  } catch (e) {
    console.warn("Chime failed:", e);
  }
}

export default function Preloader({ onComplete }) {
  const [preloaderActive, setPreloaderActive] = useState(true);

  // Auto-complete after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setPreloaderActive(false);
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 800); // Wait for slideUpOut animation
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  // Audio Auto-activation on First User Gesture
  useEffect(() => {
    let played = false;
    const triggerBootSound = () => {
      if (!played) {
        playMacStartupChime();
        played = true;
      }
    };

    window.addEventListener('click', triggerBootSound, { once: true });
    window.addEventListener('touchstart', triggerBootSound, { once: true });
    window.addEventListener('keydown', triggerBootSound, { once: true });

    return () => {
      window.removeEventListener('click', triggerBootSound);
      window.removeEventListener('touchstart', triggerBootSound);
      window.removeEventListener('keydown', triggerBootSound);
    };
  }, []);

  if (!preloaderActive) {
    return (
      <div 
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(255, 255, 255, 0.4)',
          backdropFilter: 'blur(30px)',
          WebkitBackdropFilter: 'blur(30px)',
          zIndex: 99999999,
          animation: 'slideUpOut 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        }}
      >
        <style>{`
          @keyframes slideUpOut {
            from { transform: translateY(0); opacity: 1; }
            to { transform: translateY(-100%); opacity: 0; }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(255, 255, 255, 0.4)',
        backdropFilter: 'blur(30px)',
        WebkitBackdropFilter: 'blur(30px)',
        zIndex: 99999999,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      <style>{`
        @keyframes logoBlink {
          0% { opacity: 0.25; transform: scale(0.96); }
          50% { opacity: 1; transform: scale(1.04); }
          100% { opacity: 0.25; transform: scale(0.96); }
        }
      `}</style>

      {/* Futuristic grain overlay & background ambient glow */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.02\'/%3E%3C/svg%3E")',
        pointerEvents: 'none', zIndex: 1
      }} />

      {/* Centered blinking logo */}
      <div style={{ 
        zIndex: 10,
        animation: 'logoBlink 1.8s ease-in-out infinite',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <svg width="64" height="84" viewBox="0 0 37 49" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(0 2px 10px rgba(0,0,0,0.08))' }}>
          <path d="M15.1091 13.7987C15.1091 15.6885 12.9271 16.1755 11.0374 17.1738C8.93174 24.1738 6.89937 20.1738 4.53735 18.3181C3.53735 18.3181 4.53735 21.3544 2.40676 21.1738C1.35491 21.0847 0.447393 26.2808 0.0373535 26.1738L0.00716259 16.5391C0.00337078 15.329 1.06665 14.3959 2.27203 14.5024C3.82253 14.6394 5.36498 14.708 6.89937 14.708C9.09219 14.708 10.1886 14.3336 10.1886 13.5848C10.1886 13.2817 10.0014 13.0054 9.62702 12.7558C9.25264 12.4884 8.76237 12.2477 8.15623 12.0338C7.56791 11.802 6.90828 11.5703 6.17734 11.3385C5.46423 11.0889 4.7422 10.7947 4.01126 10.456C3.28032 10.0995 2.61178 9.70725 2.00563 9.27938C1.41731 8.85151 0.935961 8.31668 0.561576 7.67488C0.187192 7.01525 0 6.28431 0 5.48205C0 3.87755 0.802252 2.56721 2.40676 1.55102C4.01126 0.517007 6.38236 0 9.52006 0C10.1084 0 10.8215 0.0534833 11.6594 0.16045C12.4973 0.249589 13.1124 0.347642 13.5046 0.454608V5.37509C11.5079 5.07201 9.49332 4.92048 7.46094 4.92048C5.7673 4.92048 4.92048 5.23246 4.92048 5.85644C4.92048 6.10603 5.10767 6.33779 5.48206 6.55172C5.85644 6.76566 6.33779 6.97068 6.92611 7.16678C7.53226 7.36289 8.2008 7.57682 8.93174 7.80859C9.66268 8.04035 10.3847 8.33451 11.0978 8.69106C11.8288 9.02979 12.4884 9.422 13.0767 9.8677C13.6829 10.2956 14.1731 10.8482 14.5475 11.5257C14.9219 12.2031 15.1091 12.9608 15.1091 13.7987Z" fill="#000000" />
          <path d="M21.4469 1.31034C22.8374 0.436781 24.3528 0 25.993 0C27.6331 0 29.1485 0.436781 30.5391 1.31034C31.9296 2.18391 33.026 3.37837 33.8283 4.89374C34.6484 6.39127 35.0584 8.03143 35.0584 9.81422C35.0584 11.597 34.6484 13.2461 33.8283 14.7614C33.026 16.259 30.2984 18.3003 28.9078 19.1738C27.5172 20.0474 26.6775 19.1738 25.0374 19.1738C23.3972 19.1738 22.4467 23.6738 20.0374 23.6738C17.0374 23.6738 19.8266 19.6738 16.5374 16.6738C19.0374 15.6738 16.9543 11.597 16.9543 9.81422C16.9543 8.03143 17.3554 6.39127 18.1576 4.89374C18.9777 3.37837 20.0741 2.18391 21.4469 1.31034ZM23.0781 14.0662C23.8804 15.225 24.852 15.8044 25.993 15.8044C27.1339 15.8044 28.1056 15.225 28.9078 14.0662C29.7279 12.8895 30.1379 11.4722 30.1379 9.81422C30.1379 8.15623 29.7279 6.74783 28.9078 5.58902C28.1056 4.41239 27.1339 3.82407 25.993 3.82407C24.852 3.82407 23.8804 4.41239 23.0781 5.58902C22.2759 6.74783 21.8747 8.15623 21.8747 9.81422C21.8747 11.4722 22.2759 12.8895 23.0781 14.0662Z" fill="#000000" />
          <path d="M16.6975 36.4893C16.6975 38.3077 16.3766 39.8677 15.7348 41.1691C15.1108 42.4527 14.3031 46.4607 13.0374 47.1738C11.7894 47.8691 10.1457 42.6738 8.38077 42.6738C6.59799 42.6738 5.80313 45.8691 4.53735 45.1738C3.28941 44.4607 2.50264 42.4527 1.86084 41.1691C1.23687 39.8677 0.0373535 38.3077 0.0373535 36.4893V28.6737C0.999792 29.2984 2.29243 28.9259 2.77485 27.8848L4.95783 23.1738V33.6738C4.95783 36.9185 4.75539 39.156 7.03735 39.1738C9.30149 39.156 11.777 39.734 11.777 36.4893V19.6738L12.2315 19.1486C13.7363 17.4101 16.5922 18.4536 16.6216 20.7527L16.6975 26.6737V36.4893Z" fill="#000000" />
          <path d="M24.2898 35.6603C24.2898 35.6603 25.0374 41.6738 24.2898 45.1738C23.9001 46.9986 22.0374 47.1738 21.0374 48.6738C20.3438 49.7141 18.5374 47.1738 18.5374 47.1738L19.3693 27.1738C21.3445 26.5504 22.7442 24.8887 23.819 23.1182C24.0353 22.7618 24.2757 22.4335 24.5374 22.1738C26.1741 20.5496 29.0374 23.1738 30.0928 20.1738C31.1482 17.1737 36.1255 23.6739 36.5374 27.6738C36.5374 29.6739 36.5374 32.605 36.5374 34.1738C36.5374 35.7248 33.4324 39.6603 33.0374 40.1738C28.0374 46.6738 26.0374 39.6738 25.5374 38.6738C25.0374 37.6738 24.2898 35.6603 24.2898 35.6603ZM29.5374 27.1738C28.1953 25.4962 25.696 25.9885 24.9621 28.0077L24.2898 29.8573C24.2898 29.8573 24.5374 31.1737 25.0374 32.6738C25.5374 34.1738 25.8046 34.7313 26.0374 35.1738C26.7291 36.4893 28.0374 39.1738 29.5374 39.6738C31.0374 40.1738 33.2141 34.1739 33.5374 33.1738C33.9422 31.9212 33.7703 28.6939 32.8606 27.6738C31.9871 26.6942 31.5374 29.6738 29.5374 27.1738ZM29.5374 28.8573C29.5374 28.8573 29.5374 28.8573 29.5374 28.8573Z" fill="#000000" />
        </svg>
      </div>
    </div>
  );
}
