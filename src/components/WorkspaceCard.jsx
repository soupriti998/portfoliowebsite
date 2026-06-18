import React, { useState, useRef, useEffect } from 'react';

export default function WorkspaceCard({ 
  id, 
  title, 
  subtitle, 
  x, 
  y, 
  width = 420, 
  height, 
  children, 
  onMove, 
  activeTool,
  accentColor = '#FF94B9',
  onReact,
  reactions = {},
  tag
}) {
  const [isDragging, setIsDragging] = useState(false);
  const cardRef = useRef(null);
  const dragStart = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    // Only drag with select tool and from the drag handle/title bar
    if (activeTool !== 'select') return;
    
    // Ignore clicks on buttons/inputs inside card
    if (e.target.closest('button') || e.target.closest('input') || e.target.closest('a') || e.target.closest('.interactive-element') || e.target.closest('textarea')) {
      return;
    }

    setIsDragging(true);
    dragStart.current = {
      x: e.clientX - x,
      y: e.clientY - y
    };
    e.preventDefault();
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      const newX = e.clientX - dragStart.current.x;
      const newY = e.clientY - dragStart.current.y;
      onMove(id, newX, newY);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, id, onMove]);

  return (
    <div 
      ref={cardRef}
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        transform: `translate3d(${x}px, ${y}px, 0)`,
        width: `${width}px`,
        height: height ? `${height}px` : 'auto',
        background: '#FFFFFF',
        border: '1px solid rgba(0, 0, 0, 0.08)',
        borderRadius: '24px',
        boxShadow: isDragging 
          ? '0 20px 48px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.03)'
          : '0 8px 30px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.02)',
        display: 'flex',
        flexDirection: 'column',
        userSelect: 'none',
        transition: isDragging ? 'none' : 'transform 0.15s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.15s ease',
        cursor: activeTool === 'select' ? (isDragging ? 'grabbing' : 'grab') : 'default',
        overflow: 'hidden'
      }}
    >
      {/* Title bar (Drag Handle) */}
      <div 
        onMouseDown={handleMouseDown}
        style={{
          padding: '16px 24px 12px 24px',
          borderBottom: '1px solid rgba(0, 0, 0, 0.03)',
          background: 'linear-gradient(to bottom, #FAFAFA, #FFFFFF)',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative'
        }}
      >
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          {/* Card Tag Pill */}
          {tag && (
            <div style={{
              fontSize: '9px',
              fontWeight: '700',
              color: accentColor,
              background: `${accentColor}12`,
              border: `1.5px solid ${accentColor}30`,
              borderRadius: '8px',
              padding: '2px 6px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              {tag}
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flex: 1 }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '600', color: '#1A1A1A', letterSpacing: '-0.01em' }}>
                {title}
              </h3>
              {subtitle && (
                <span style={{ fontSize: '11px', color: '#888888', fontWeight: '400', marginTop: '2px', display: 'block' }}>
                  {subtitle}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content wrapper */}
      <div style={{
        padding: '24px',
        flex: 1,
        overflowY: 'auto',
        fontSize: '13px',
        lineHeight: '1.6',
        color: '#4A4A4A'
      }}>
        {children}
      </div>

      {/* Reactions Bar at bottom of card */}
      <div style={{
        padding: '8px 16px',
        borderTop: '1px solid rgba(0, 0, 0, 0.03)',
        display: 'flex',
        gap: '8px',
        alignItems: 'center',
        background: '#FAFBFD',
        height: '40px'
      }}>
        {['❤️', '🔥', '👀'].map(emoji => {
          const count = reactions[emoji] || 0;
          return (
            <button
              key={emoji}
              className="interactive-element"
              onClick={() => onReact(id, emoji)}
              style={{
                background: count > 0 ? 'rgba(255, 77, 166, 0.06)' : 'transparent',
                border: count > 0 ? '1px solid rgba(255, 77, 166, 0.15)' : '1px solid rgba(0,0,0,0.03)',
                borderRadius: '12px',
                padding: '4px 8px',
                fontSize: '12px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                color: count > 0 ? '#FF4DA6' : '#666666',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <span>{emoji}</span>
              {count > 0 && <span style={{ fontWeight: '600', fontSize: '11px' }}>{count}</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
