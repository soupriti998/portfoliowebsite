import React from 'react';
import { 
  MousePointer, 
  StickyNote, 
  Smile, 
  PenTool, 
  Highlighter, 
  ArrowUpRight, 
  Square, 
  Type 
} from 'lucide-react';

export default function BottomToolbar({ activeTool, setActiveTool, selectedReaction, setSelectedReaction }) {
  const tools = [
    { id: 'select', label: 'Select (V)', icon: MousePointer },
    { id: 'sticky', label: 'Sticky Note (S)', icon: StickyNote },
    { id: 'reaction', label: 'Reactions (E)', icon: Smile },
    { id: 'pencil', label: 'Pencil (P)', icon: PenTool },
    { id: 'highlighter', label: 'Highlighter (H)', icon: Highlighter },
    { id: 'arrow', label: 'Arrow (A)', icon: ArrowUpRight },
    { id: 'shapes', label: 'Shapes (R)', icon: Square },
    { id: 'text', label: 'Text (T)', icon: Type },
  ];

  const reactionsList = [
    { emoji: '❤️', label: 'Love' },
    { emoji: '🔥', label: 'Fire' },
    { emoji: '👀', label: 'Eyes' }
  ];

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '8px'
    }}>
      {/* Sub-toolbar for Reaction Selection */}
      {activeTool === 'reaction' && (
        <div style={{
          background: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(0, 0, 0, 0.08)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
          borderRadius: '16px',
          padding: '8px',
          display: 'flex',
          gap: '8px',
          animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards'
        }}>
          {reactionsList.map(item => (
            <button
              key={item.emoji}
              onClick={() => setSelectedReaction(item.emoji)}
              style={{
                fontSize: '24px',
                background: selectedReaction === item.emoji ? 'rgba(255, 77, 166, 0.1)' : 'transparent',
                border: selectedReaction === item.emoji ? '1.5px solid #FF4DA6' : '1.5px solid transparent',
                borderRadius: '12px',
                width: '44px',
                height: '44px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s cubic-bezier(0.2, 0.8, 0.2, 1)',
                padding: 0
              }}
              title={item.label}
            >
              {item.emoji}
            </button>
          ))}
        </div>
      )}

      {/* Main Floating centered dock */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(24px)',
        border: '1px solid rgba(0, 0, 0, 0.06)',
        boxShadow: '0 12px 40px rgba(0, 0, 0, 0.06), 0 1px 3px rgba(0, 0, 0, 0.02)',
        borderRadius: '24px',
        padding: '6px 12px',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        height: '56px'
      }}>
        {tools.map(tool => {
          const Icon = tool.icon;
          const isActive = activeTool === tool.id;

          return (
            <button
              key={tool.id}
              onClick={() => setActiveTool(tool.id)}
              style={{
                background: isActive ? '#000000' : 'transparent',
                border: 'none',
                borderRadius: '16px',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: isActive ? '#FFFFFF' : '#4A4A4A',
                transition: 'all 0.2s cubic-bezier(0.2, 0.8, 0.2, 1)',
                position: 'relative'
              }}
              title={tool.label}
            >
              <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
              
              {isActive && (
                <div style={{
                  position: 'absolute',
                  bottom: '-3px',
                  width: '4px',
                  height: '4px',
                  borderRadius: '50%',
                  background: '#FF4DA6'
                }} />
              )}
            </button>
          );
        })}
      </div>

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(10px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
