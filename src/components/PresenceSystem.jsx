import React, { useEffect, useState } from 'react';

const COLLABORATORS_DATA = [
  { id: '1', name: '⚡ motion_fanatic', color: '#10B981' },
  { id: '2', name: '👀 hiring_manager', color: '#3B82F6' },
  { id: '3', name: '🎨 design_nerd', color: '#8B5CF6' }
];

export default function PresenceSystem({ canvasScale, canvasOffset }) {
  const [collaborators, setCollaborators] = useState(
    COLLABORATORS_DATA.map(c => ({
      ...c,
      x: Math.random() * 800 - 400,
      y: Math.random() * 600 - 300,
      targetX: Math.random() * 800 - 400,
      targetY: Math.random() * 600 - 300,
      t: 0
    }))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCollaborators(prev => 
        prev.map(c => {
          let newT = c.t + 0.05;
          let newX = c.x + (c.targetX - c.x) * 0.05;
          let newY = c.y + (c.targetY - c.y) * 0.05;

          if (newT >= 1 || Math.abs(c.targetX - newX) < 5) {
            return {
              ...c,
              x: newX,
              y: newY,
              targetX: Math.random() * 1200 - 600,
              targetY: Math.random() * 1000 - 500,
              t: 0
            };
          }

          return {
            ...c,
            x: newX,
            y: newY,
            t: newT
          };
        })
      );
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none',
      zIndex: 900
    }}>
      {collaborators.map(c => {
        // Transform the coordinate into the screen coordinate system
        const screenX = c.x * canvasScale + canvasOffset.x;
        const screenY = c.y * canvasScale + canvasOffset.y;

        return (
          <div
            key={c.id}
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              transform: `translate3d(${screenX}px, ${screenY}px, 0)`,
              transition: 'transform 0.1s linear',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px'
            }}
          >
            {/* Custom Mouse Cursor Pointer SVG */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.15))'
            }}>
              <path d="M4.5 3V17L9.5 12H16.5L4.5 3Z" fill={c.color} stroke="#FFFFFF" strokeWidth="1.5" />
            </svg>
            
            {/* Badge Name Tag */}
            <div style={{
              background: c.color,
              color: '#FFFFFF',
              fontSize: '10px',
              fontWeight: '600',
              padding: '2px 8px',
              borderRadius: '8px',
              whiteSpace: 'nowrap',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              marginLeft: '12px'
            }}>
              {c.name}
            </div>
          </div>
        );
      })}
    </div>
  );
}
