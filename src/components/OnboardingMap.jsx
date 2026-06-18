import React, { useState } from 'react';
import { Compass, X, Hand, Maximize, Edit3, MessageSquare, Heart } from 'lucide-react';

export default function OnboardingMap({ onPanToSection, sections }) {
  const [minimized, setMinimized] = useState(false);

  return (
    <div style={{
      position: 'fixed',
      left: '24px',
      bottom: '24px',
      zIndex: 1000,
      fontFamily: 'system-ui, sans-serif'
    }}>
      {minimized ? (
        <button
          onClick={() => setMinimized(false)}
          style={{
            background: '#FFFFFF',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.06)',
            borderRadius: '50%',
            width: '48px',
            height: '48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#FF4DA6',
            transition: 'all 0.2s cubic-bezier(0.2, 0.8, 0.2, 1)'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          title="Open Workspace Map"
        >
          <Compass size={22} />
        </button>
      ) : (
        <div style={{
          width: '280px',
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(0, 0, 0, 0.08)',
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.08)',
          borderRadius: '24px',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
          animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
        }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#1A1A1A' }}>
              <Compass size={18} color="#FF4DA6" />
              <span style={{ fontWeight: '600', fontSize: '13px' }}>Workspace Onboarding</span>
            </div>
            <button
              onClick={() => setMinimized(true)}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: '#888888',
                padding: '4px'
              }}
            >
              <X size={16} />
            </button>
          </div>

          {/* Quick Controls guide */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '11px', color: '#555555' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Hand size={14} color="#888888" />
              <span>Drag canvas to explore / zoom with scroll</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Edit3 size={14} color="#888888" />
              <span>Use bottom tools to sketch / annotate</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Heart size={14} color="#888888" />
              <span>Stamp reactions on any project card</span>
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid rgba(0,0,0,0.06)', margin: 0 }} />

          {/* Jump To Navigation List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <span style={{ fontSize: '11px', fontWeight: '600', color: '#888888' }}>Jump to Board:</span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
              {sections.map(sec => (
                <button
                  key={sec.id}
                  onClick={() => onPanToSection(sec.id)}
                  style={{
                    background: 'rgba(0, 0, 0, 0.03)',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '4px 8px',
                    fontSize: '10px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    color: '#4A4A4A',
                    transition: 'background 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 77, 166, 0.08)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(0, 0, 0, 0.03)'}
                >
                  {sec.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
