import React, { useState } from 'react';
import { Search, Share2, HelpCircle, Bot, ChevronDown, User, Check, Globe } from 'lucide-react';

export default function TopBar({ onSearch, onPanToSection, sections, activeProject, onOpenAI }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
    onSearch(val);
  };

  const handleSuggestionClick = (secId) => {
    onPanToSection(secId);
    setSearchQuery('');
    onSearch('');
  };

  // Filter sections that match search query
  const suggestions = searchQuery.trim() 
    ? sections.filter(sec => 
        sec.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sec.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <div style={{
      position: 'fixed',
      top: '16px',
      left: '16px',
      right: '16px',
      height: '56px',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '16px',
      pointerEvents: 'none' // Let clicks pass through except on children
    }}>
      {/* LEFT: Profile & Dropdown */}
      <div style={{
        pointerEvents: 'auto',
        background: 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(0, 0, 0, 0.06)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
        borderRadius: '20px',
        height: '44px',
        padding: '0 12px 0 6px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        cursor: 'pointer',
        position: 'relative',
        userSelect: 'none'
      }} onClick={() => setDropdownOpen(!dropdownOpen)}>
        {/* Profile Avatar */}
        <div style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #FF4DA6, #FF94B9)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#FFFFFF',
          fontWeight: '600',
          fontSize: '13px',
          boxShadow: '0 2px 8px rgba(255, 77, 166, 0.3)'
        }}>
          SD
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '12px', fontWeight: '600', color: '#1A1A1A', lineHeight: '1.2' }}>
            Soupriti's Workspace
          </span>
          <span style={{ fontSize: '10px', color: '#888888', display: 'flex', alignItems: 'center', gap: '3px' }}>
            <Globe size={10} /> Live Portfolio
          </span>
        </div>
        <ChevronDown size={14} color="#888888" style={{
          transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.2s ease'
        }} />

        {/* Dropdown panel */}
        {dropdownOpen && (
          <div style={{
            position: 'absolute',
            top: '52px',
            left: '0',
            width: '240px',
            background: '#FFFFFF',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.1)',
            borderRadius: '16px',
            padding: '8px',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            cursor: 'default'
          }} onClick={(e) => e.stopPropagation()}>
            <div style={{ padding: '6px 8px', fontSize: '11px', fontWeight: '500', color: '#888888' }}>
              Switch Space
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '8px 12px',
              borderRadius: '10px',
              background: 'rgba(0, 0, 0, 0.03)',
              fontSize: '13px',
              fontWeight: '500'
            }}>
              <span>Product Design Board</span>
              <Check size={14} color="#FF4DA6" />
            </div>
            <div 
              onClick={() => { window.location.pathname = '/interaction' }}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '8px 12px',
                borderRadius: '10px',
                fontSize: '13px',
                cursor: 'pointer',
                color: '#555555',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.03)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              Classic Scrolling View
            </div>
          </div>
        )}
      </div>

      {/* CENTER: Search Bar */}
      <div style={{
        pointerEvents: 'auto',
        position: 'relative',
        flex: '1',
        maxWidth: '440px'
      }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(0, 0, 0, 0.06)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
          borderRadius: '20px',
          height: '44px',
          display: 'flex',
          alignItems: 'center',
          padding: '0 16px',
          gap: '10px'
        }}>
          <Search size={18} color="#888888" />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search projects, tools, thoughts..."
            style={{
              border: 'none',
              background: 'transparent',
              outline: 'none',
              fontSize: '13px',
              width: '100%',
              color: '#1A1A1A'
            }}
          />
        </div>

        {/* Search Suggestions Dropdown */}
        {suggestions.length > 0 && (
          <div style={{
            position: 'absolute',
            top: '50px',
            left: '0',
            right: '0',
            background: '#FFFFFF',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.1)',
            borderRadius: '16px',
            padding: '8px',
            maxHeight: '260px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '2px'
          }}>
            {suggestions.map(sec => (
              <div
                key={sec.id}
                onClick={() => handleSuggestionClick(sec.id)}
                style={{
                  padding: '8px 12px',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '2px',
                  transition: 'background 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.03)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <div style={{ fontSize: '13px', fontWeight: '500', color: '#1A1A1A' }}>
                  {sec.name}
                </div>
                <div style={{ fontSize: '11px', color: '#888888' }}>
                  {sec.description}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* RIGHT: Collaborators, Share, AI Button */}
      <div style={{
        pointerEvents: 'auto',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        {/* Collaborators indicator */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(0, 0, 0, 0.06)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
          borderRadius: '20px',
          height: '44px',
          padding: '0 14px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '12px',
          fontWeight: '500',
          color: '#4A4A4A',
          userSelect: 'none'
        }}>
          {/* Green dot */}
          <div style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: '#10B981',
            boxShadow: '0 0 6px #10B981',
            animation: 'radarWave 1.6s infinite alternate'
          }} />
          <span>3 people exploring</span>
        </div>

        {/* Share Button */}
        <button
          onClick={handleShare}
          style={{
            background: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(0, 0, 0, 0.06)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
            borderRadius: '20px',
            width: '44px',
            height: '44px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#4A4A4A',
            transition: 'all 0.2s cubic-bezier(0.2, 0.8, 0.2, 1)'
          }}
          title="Share Workspace Link"
        >
          {copied ? <Check size={18} color="#10B981" /> : <Share2 size={18} />}
        </button>

        {/* AI Assistant Button */}
        <button
          onClick={onOpenAI}
          style={{
            background: 'linear-gradient(135deg, #000000, #222222)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
            borderRadius: '20px',
            width: '44px',
            height: '44px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#FFFFFF',
            transition: 'all 0.2s cubic-bezier(0.2, 0.8, 0.2, 1)'
          }}
          title="Open Workspace AI"
        >
          <Bot size={18} />
        </button>
      </div>
    </div>
  );
}
