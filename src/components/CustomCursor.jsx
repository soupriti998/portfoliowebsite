import React, { useState, useEffect } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);

      const el = document.elementFromPoint(e.clientX, e.clientY);
      if (el) {
        // Check if cursor hover is interactive
        const isInteractive = 
          el.tagName === 'A' || 
          el.tagName === 'BUTTON' || 
          el.closest('a') || 
          el.closest('button') || 
          el.closest('.desktop-folder-item') ||
          el.closest('.desktop-dock-item') ||
          el.closest('.bento-masonry-item') ||
          el.closest('.bento-illustrations-item') ||
          el.closest('.finder-sidebar-item') ||
          el.closest('.finder-sidebar-subitem') ||
          el.closest('.finder-project-card') ||
          el.closest('.finder-dot') ||
          window.getComputedStyle(el).cursor === 'pointer';
        
        setHovered(!!isInteractive);
      }
    };

    const handleMouseLeave = () => {
      setVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <>
      <div
        style={{
          position: 'fixed',
          left: position.x,
          top: position.y,
          width: 24,
          height: 24,
          pointerEvents: 'none',
          zIndex: 2147483647,
          // Hotspot alignment offsets
          transform: hovered ? 'translate(-6px, -1px)' : 'translate(-2px, -2px)',
          transition: 'transform 0.08s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {hovered ? (
          /* macOS Sonoma Style Pointing Hand glove */
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.15))' }}>
            <path 
              d="M8.5 5.5V13.5C8.5 13.5 7.7 13 7 13C6 13 5 13.8 4.6 14.8C4.3 15.6 4.7 16.5 5.5 17.2L9.7 20.8C10.3 21.3 11.1 21.5 11.9 21.5H17C18.7 21.5 20 20.1 20 18.5V9.5C20 8.7 19.3 8 18.5 8C18 8 17.5 8.4 17.3 8.8C17 8 16.2 7.5 15.3 7.5C14.8 7.5 14.3 7.7 14 8.1C13.7 7.2 12.8 6.5 11.7 6.5C11.3 6.5 10.9 6.6 10.5 6.9V5.5C10.5 4.4 9.6 3.5 8.5 3.5C7.4 3.5 6.5 4.4 6.5 5.5Z" 
              fill="#ffffff" 
              stroke="#000000" 
              strokeWidth="1.5" 
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          /* macOS Sonoma Black Arrow with crisp white border */
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(0 2px 5px rgba(0,0,0,0.18))' }}>
            <path 
              d="M3 3V21L8.25 15.75L13.5 21L16.5 18L11.25 12.75L18 12.75L3 3Z" 
              fill="#000000" 
              stroke="#ffffff" 
              strokeWidth="1.5" 
              strokeLinejoin="miter"
            />
          </svg>
        )}
      </div>
      
      {/* Hide native cursor globally */}
      <style>{`
        body, *, a, button, [role="button"], select, input, textarea, .desktop-folder-item, .desktop-dock-item {
          cursor: none !important;
        }
      `}</style>
    </>
  );
}
