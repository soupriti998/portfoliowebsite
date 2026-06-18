import React, { useState, useEffect, useRef } from 'react';

export default function CatInteraction() {
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);
  const [isSneezing, setIsSneezing] = useState(false);
  
  // Fly state
  const flyRef = useRef(null);
  const [flyPos, setFlyPos] = useState({ x: 0, y: 0 });
  
  // Track mouse movement
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      // Calculate normalized mouse position relative to center (-1 to 1)
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Random Blinking
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      if (Math.random() > 0.3) {
        setIsBlinking(true);
        setTimeout(() => setIsBlinking(false), 150);
      }
    }, 4000);
    return () => clearInterval(blinkInterval);
  }, []);

  // Fly animation
  useEffect(() => {
    let t = 0;
    let animId;
    
    const animateFly = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      
      t += 0.02;
      
      // Complex Lissajous curve for erratic fly movement
      const x = Math.sin(t * 1.5) * (rect.width * 0.35) + Math.sin(t * 3.1) * (rect.width * 0.1);
      const y = Math.cos(t * 1.2) * (rect.height * 0.3) + Math.cos(t * 2.8) * (rect.height * 0.1);
      
      setFlyPos({ x, y });
      
      // Sneeze detection: if fly is very close to the nose (center)
      // The nose is roughly at (0, 30) relative to center
      const distToNose = Math.sqrt(Math.pow(x, 2) + Math.pow(y - 30, 2));
      
      if (distToNose < 40 && !isSneezing) {
        // Trigger sneeze!
        setIsSneezing(true);
        setIsBlinking(true);
        
        // Push fly away quickly via a local state hack or just let the animation continue but the cat sneezes
        setTimeout(() => {
          setIsBlinking(false);
          setIsSneezing(false);
        }, 600);
      }
      
      animId = requestAnimationFrame(animateFly);
    };
    
    animId = requestAnimationFrame(animateFly);
    return () => cancelAnimationFrame(animId);
  }, [isSneezing]);

  // Calculate eye pupil translation (clamped)
  const pupilMaxOffset = 18;
  const pupilX = mousePos.x * pupilMaxOffset;
  const pupilY = mousePos.y * pupilMaxOffset;

  return (
    <section
      ref={containerRef}
      style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: '#1E3C40', // Dark teal background from screenshot
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Decorative Leaves Frame */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 1, pointerEvents: 'none' }}>
        {/* We generate layers of leaves around the border */}
        {[...Array(60)].map((_, i) => {
          // Add some randomness to angles and positions for a natural look
          const angle = (i / 60) * Math.PI * 2 + (Math.random() * 0.1);
          // Two rings of leaves: inner and outer
          const isOuter = i % 2 === 0;
          const radiusX = isOuter ? 65 : 52;
          const radiusY = isOuter ? 65 : 52;
          
          const x = 50 + Math.cos(angle) * (radiusX + Math.random() * 5 - 2.5);
          const y = 50 + Math.sin(angle) * (radiusY + Math.random() * 5 - 2.5);
          
          // Point leaves towards the center
          const rot = (angle * 180) / Math.PI + 180;
          
          // Screenshot colors: dark teal, mid teal, light teal, purple
          const colorRand = Math.random();
          let color = '#4CA68D'; // mid teal
          if (colorRand > 0.8) color = '#7D5C9C'; // purple
          else if (colorRand > 0.6) color = '#33816B'; // dark teal
          else if (colorRand > 0.4) color = '#8ED3BA'; // light teal
          
          const scale = isOuter ? (1.5 + Math.random() * 0.5) : (1.0 + Math.random() * 0.4);

          return (
            <g
              key={i}
              style={{
                transformOrigin: `${x}% ${y}%`,
                transform: `translate(${x}vw, ${y}vh) rotate(${rot}deg) scale(${scale})`
              }}
            >
              {/* Leaf Path - elongated, pointed oval */}
              <path 
                d="M -50 0 C -20 -25, 20 -25, 50 0 C 20 25, -20 25, -50 0 Z" 
                fill={color} 
              />
              {/* Leaf Vein */}
              <line x1="-45" y1="0" x2="45" y2="0" stroke="rgba(0,0,0,0.2)" strokeWidth="2" strokeLinecap="round" />
              {/* Optional smaller side veins */}
              <path d="M -20 0 L -10 -8 M -20 0 L -10 8 M 0 0 L 10 -8 M 0 0 L 10 8" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" strokeLinecap="round" />
            </g>
          )
        })}
      </svg>

      {/* Cat Face Container */}
      <div
        style={{
          position: 'relative',
          width: '600px',
          height: '400px',
          zIndex: 2,
          transition: 'transform 0.1s',
          transform: isSneezing ? 'translateY(15px) scale(1.02)' : 'translateY(0) scale(1)', // Sneeze recoil
        }}
      >
        {/* Cat Silhouette */}
        <div style={{
          position: 'absolute',
          top: '10%',
          left: '10%',
          right: '10%',
          bottom: '0',
          backgroundColor: '#0F2326',
          borderRadius: '50% 50% 40% 40%',
          boxShadow: '0 0 100px 50px #0F2326'
        }}></div>

        {/* Eyes */}
        <div style={{
          position: 'absolute',
          top: '30%',
          left: '0',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          gap: '80px',
        }}>
          {/* Left Eye */}
          <div style={{
            width: '140px',
            height: '140px',
            backgroundColor: '#A0D8C8',
            borderRadius: '50% 50% 45% 45%',
            position: 'relative',
            overflow: 'hidden',
            transition: 'transform 0.1s, height 0.1s, top 0.1s',
            transform: isSneezing ? 'rotate(-10deg)' : 'none',
            // Blink squash
            transform: isBlinking ? 'scaleY(0.1)' : (isSneezing ? 'scaleY(0.1) rotate(-10deg)' : 'scaleY(1)'),
          }}>
            {/* Pupil */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '90px',
              height: '100px',
              backgroundColor: '#000000',
              borderRadius: '50%',
              transform: `translate(calc(-50% + ${pupilX}px), calc(-50% + ${pupilY}px))`,
              transition: 'transform 0.05s linear'
            }}></div>
          </div>

          {/* Right Eye */}
          <div style={{
            width: '140px',
            height: '140px',
            backgroundColor: '#A0D8C8',
            borderRadius: '50% 50% 45% 45%',
            position: 'relative',
            overflow: 'hidden',
            transition: 'transform 0.1s, height 0.1s, top 0.1s',
            transform: isSneezing ? 'rotate(10deg)' : 'none',
            transform: isBlinking ? 'scaleY(0.1)' : (isSneezing ? 'scaleY(0.1) rotate(10deg)' : 'scaleY(1)'),
          }}>
            {/* Pupil */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '90px',
              height: '100px',
              backgroundColor: '#000000',
              borderRadius: '50%',
              transform: `translate(calc(-50% + ${pupilX}px), calc(-50% + ${pupilY}px))`,
              transition: 'transform 0.05s linear'
            }}></div>
          </div>
        </div>

        {/* Nose & Whiskers */}
        <div style={{
          position: 'absolute',
          top: '75%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          {/* Whiskers Left */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginRight: '30px', transform: isSneezing ? 'rotate(-15deg)' : 'none', transition: 'transform 0.1s' }}>
            <div style={{ width: '120px', height: '2px', background: '#081415', transform: 'rotate(5deg)' }}></div>
            <div style={{ width: '140px', height: '2px', background: '#081415' }}></div>
            <div style={{ width: '110px', height: '2px', background: '#081415', transform: 'rotate(-5deg)', marginLeft: '30px' }}></div>
          </div>

          {/* Nose */}
          <div style={{
            width: '40px',
            height: '16px',
            backgroundColor: '#000000',
            borderRadius: '10px 10px 20px 20px',
            transition: 'transform 0.1s',
            transform: isSneezing ? 'scale(1.2) translateY(-5px)' : 'scale(1)',
            zIndex: 3
          }}></div>

          {/* Whiskers Right */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginLeft: '30px', transform: isSneezing ? 'rotate(15deg)' : 'none', transition: 'transform 0.1s' }}>
            <div style={{ width: '120px', height: '2px', background: '#081415', transform: 'rotate(-5deg)' }}></div>
            <div style={{ width: '140px', height: '2px', background: '#081415' }}></div>
            <div style={{ width: '110px', height: '2px', background: '#081415', transform: 'rotate(5deg)' }}></div>
          </div>
        </div>
      </div>

      {/* The Fly */}
      <div 
        ref={flyRef}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '30px',
          height: '30px',
          zIndex: 10,
          pointerEvents: 'none',
          transform: `translate(calc(-50% + ${flyPos.x}px), calc(-50% + ${flyPos.y}px))`,
          transition: 'transform 0.05s linear'
        }}
      >
        {/* Scribble Fly SVG */}
        <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', animation: 'flyBuzz 0.1s infinite alternate' }}>
          <path d="M20,50 Q40,20 60,50 T90,60 Q70,80 40,60 T10,40 Z" fill="none" stroke="#F6A831" strokeWidth="6" strokeLinecap="round" />
          <path d="M30,40 Q50,10 70,30 T80,70 Q60,90 30,70 T10,50 Z" fill="none" stroke="#F6A831" strokeWidth="4" strokeLinecap="round" />
        </svg>
      </div>

      <style>{`
        @keyframes flyBuzz {
          0% { transform: rotate(-10deg) scale(0.9); }
          100% { transform: rotate(15deg) scale(1.1) translate(2px, -2px); }
        }
      `}</style>
    </section>
  );
}
