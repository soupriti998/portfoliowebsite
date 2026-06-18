import React, { useState, useRef, useEffect } from 'react';
import TopBar from './TopBar';
import BottomToolbar from './BottomToolbar';
import WorkspaceCard from './WorkspaceCard';
import PresenceSystem from './PresenceSystem';
import OnboardingMap from './OnboardingMap';
import Chatbot from './Chatbot';
import { 
  ArrowRight, 
  MapPin, 
  Mail, 
  Calendar, 
  Laptop, 
  Music, 
  Award,
  Sparkles,
  Undo2,
  Redo2,
  Minus,
  Plus,
  Maximize2
} from 'lucide-react';

const SECTIONS_CONFIG = [
  { id: 'welcome', name: 'Welcome Board', title: '👋 Welcome!', x: -750, y: -450, width: 520, accent: '#8B5CF6', tag: '01' },
  { id: 'evolution', name: 'Creative Evolution', title: '🌱 Creative Evolution', x: -180, y: -450, width: 620, accent: '#FBBF24', tag: '02' },
  { id: 'tools', name: 'Tools I Use', title: '🛠️ Tools I Use', x: 490, y: -450, width: 500, accent: '#10B981', tag: '03' },
  { id: 'projects', name: 'Selected Projects', title: '📂 Projects', x: -750, y: 120, width: 880, accent: '#3B82F6', tag: '04' },
  { id: 'inside-workspace', name: 'Inside My Workspace', title: '👀 Inside My Workspace', x: 180, y: 120, width: 540, accent: '#EC4899', tag: '05' },
  { id: 'design-process', name: 'Design Process', title: '⚙️ My Design Process', x: 770, y: 120, width: 500, accent: '#EF4444', tag: '06' },
  { id: 'experiments-lab', name: 'AI + Experiments Lab', title: '🧪 AI + Experiments Lab', x: -750, y: 720, width: 620, accent: '#8B5CF6', tag: '07' },
  { id: 'milestone-timeline', name: 'Milestone Timeline', title: '🏆 Milestone Timeline', x: -80, y: 720, width: 680, accent: '#10B981', tag: '08' },
  { id: 'connect', name: 'Let\'s Connect', title: '✉️ Let\'s Connect', x: 650, y: 720, width: 460, accent: '#FF4DA6', tag: '09' }
];

export default function InfiniteCanvas() {
  const [scale, setScale] = useState(0.85);
  const [offset, setOffset] = useState({ x: window.innerWidth / 2 - 100, y: window.innerHeight / 2 - 50 });
  const [activeTool, setActiveTool] = useState('select');
  const [selectedReaction, setSelectedReaction] = useState('❤️');
  const [isPanning, setIsPanning] = useState(false);
  const [chatbotOpen, setChatbotOpen] = useState(false);

  const [cards, setCards] = useState(SECTIONS_CONFIG);
  const [stickies, setStickies] = useState([
    { id: 'sticky-1', x: -120, y: -70, text: "Every phase shaped how I think, design & build today. ❤️", color: '#FFF9C4', rotation: -3 },
    { id: 'sticky-2', x: 1010, y: -220, text: "These tools power my workflow & creativity.", color: '#E0F7FA', rotation: 4 },
    { id: 'sticky-3', x: 600, y: 490, text: "Designing with empathy and curiosity. 💚", color: '#E8F5E9', rotation: -2 },
    { id: 'sticky-4', x: 1130, y: 840, text: "I'd love to collaborate with you! ❤️", color: '#FCE4EC', rotation: 3 }
  ]);

  const [shapes, setShapes] = useState([]);
  const [texts, setTexts] = useState([]);
  const [drawings, setDrawings] = useState([]);
  const [currentPath, setCurrentPath] = useState(null);
  const [stampedReactions, setStampedReactions] = useState([]);
  const [cardReactions, setCardReactions] = useState({
    welcome: { '❤️': 12, '🔥': 8, '👀': 15 },
    projects: { '❤️': 24, '🔥': 18, '👀': 32 },
    'inside-workspace': { '❤️': 16, '🔥': 9, '👀': 21 }
  });

  const canvasRef = useRef(null);
  const panStart = useRef({ x: 0, y: 0 });
  const lastOffset = useRef({ x: 0, y: 0 });

  const getCanvasCoords = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);
    return {
      x: (clientX - rect.left - offset.x) / scale,
      y: (clientY - rect.top - offset.y) / scale
    };
  };

  const handleWheel = (e) => {
    e.preventDefault();
    const zoomFactor = 1.08;
    let nextScale = scale;

    if (e.deltaY < 0) {
      nextScale = Math.min(scale * zoomFactor, 2.5);
    } else {
      nextScale = Math.max(scale / zoomFactor, 0.25);
    }

    const rect = canvasRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const canvasMouseX = (mouseX - offset.x) / scale;
    const canvasMouseY = (mouseY - offset.y) / scale;

    const nextOffsetX = mouseX - canvasMouseX * nextScale;
    const nextOffsetY = mouseY - canvasMouseY * nextScale;

    setScale(nextScale);
    setOffset({ x: nextOffsetX, y: nextOffsetY });
  };

  const handleMouseDown = (e) => {
    if (e.target.closest('.interactive-element') || e.target.closest('input') || e.target.closest('button') || e.target.closest('textarea')) {
      return;
    }

    if (activeTool === 'select') {
      setIsPanning(true);
      panStart.current = { x: e.clientX, y: e.clientY };
      lastOffset.current = { ...offset };
      e.preventDefault();
    } else if (activeTool === 'pencil' || activeTool === 'highlighter') {
      const coords = getCanvasCoords(e);
      setCurrentPath({
        points: [[coords.x, coords.y]],
        color: activeTool === 'highlighter' ? 'rgba(255, 235, 59, 0.45)' : '#FF4DA6',
        strokeWidth: activeTool === 'highlighter' ? 16 : 3,
        type: activeTool
      });
    } else if (activeTool === 'sticky') {
      const coords = getCanvasCoords(e);
      setStickies(prev => [...prev, {
        id: `sticky-${Date.now()}`,
        x: coords.x - 70,
        y: coords.y - 70,
        text: 'New Note',
        color: '#FFF9C4',
        rotation: Math.random() * 6 - 3
      }]);
      setActiveTool('select');
    } else if (activeTool === 'shapes') {
      const coords = getCanvasCoords(e);
      setShapes(prev => [...prev, {
        id: `shape-${Date.now()}`,
        x: coords.x - 50,
        y: coords.y - 50,
        type: 'rect',
        color: '#E8F5E9'
      }]);
      setActiveTool('select');
    } else if (activeTool === 'text') {
      const coords = getCanvasCoords(e);
      setTexts(prev => [...prev, {
        id: `text-${Date.now()}`,
        x: coords.x,
        y: coords.y,
        text: 'Double click to edit text'
      }]);
      setActiveTool('select');
    } else if (activeTool === 'reaction') {
      const coords = getCanvasCoords(e);
      setStampedReactions(prev => [...prev, {
        id: `stamp-${Date.now()}`,
        emoji: selectedReaction,
        x: coords.x - 14,
        y: coords.y - 14
      }]);
    }
  };

  const handleMouseMove = (e) => {
    if (isPanning) {
      const dx = e.clientX - panStart.current.x;
      const dy = e.clientY - panStart.current.y;
      setOffset({
        x: lastOffset.current.x + dx,
        y: lastOffset.current.y + dy
      });
    } else if (currentPath) {
      const coords = getCanvasCoords(e);
      setCurrentPath(prev => ({
        ...prev,
        points: [...prev.points, [coords.x, coords.y]]
      }));
    }
  };

  const handleMouseUp = () => {
    setIsPanning(false);
    if (currentPath) {
      setDrawings(prev => [...prev, currentPath]);
      setCurrentPath(null);
    }
  };

  const handleCardMove = (id, newX, newY) => {
    setCards(prev => prev.map(c => c.id === id ? { ...c, x: newX, y: newY } : c));
  };

  const handlePanToSection = (id) => {
    const target = cards.find(c => c.id === id);
    if (!target) return;
    const nextOffsetX = window.innerWidth / 2 - target.x * scale - (target.width * scale) / 2;
    const nextOffsetY = window.innerHeight / 2 - target.y * scale - 200 * scale;
    setOffset({ x: nextOffsetX, y: nextOffsetY });
  };

  const handleCardReact = (cardId, emoji) => {
    setCardReactions(prev => {
      const card = prev[cardId] || {};
      return {
        ...prev,
        [cardId]: {
          ...card,
          [emoji]: (card[emoji] || 0) + 1
        }
      };
    });
  };

  const resetZoom = () => {
    setScale(0.85);
    setOffset({ x: window.innerWidth / 2 - 100, y: window.innerHeight / 2 - 50 });
  };

  return (
    <div 
      ref={canvasRef}
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      style={{
        width: '100vw',
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
        background: '#FAFBFD',
        cursor: activeTool === 'select' ? (isPanning ? 'grabbing' : 'grab') : 'crosshair',
        fontFamily: '"Inter", system-ui, sans-serif'
      }}
    >
      {/* Infinite transformable world space */}
      <div style={{
        position: 'absolute',
        left: 0,
        top: 0,
        width: 0,
        height: 0,
        transform: `translate3d(${offset.x}px, ${offset.y}px, 0) scale(${scale})`,
        transformOrigin: '0 0',
        pointerEvents: 'none'
      }}>
        
        {/* Dotted Grid Background */}
        <div style={{
          position: 'absolute',
          left: -10000,
          top: -10000,
          width: 20000,
          height: 20000,
          backgroundImage: 'radial-gradient(rgba(0, 0, 0, 0.08) 1.5px, transparent 0)',
          backgroundSize: '28px 28px',
          zIndex: 0
        }} />

        {/* Freehand Pencil Overlay */}
        <svg style={{
          position: 'absolute',
          left: -10000,
          top: -10000,
          width: 20000,
          height: 20000,
          zIndex: 2,
          pointerEvents: 'none'
        }}>
          {drawings.map((draw, i) => (
            <path
              key={i}
              d={draw.points.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p[0]} ${p[1]}`).join(' ')}
              fill="none"
              stroke={draw.color}
              strokeWidth={draw.strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}
          {currentPath && (
            <path
              d={currentPath.points.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p[0]} ${p[1]}`).join(' ')}
              fill="none"
              stroke={currentPath.color}
              strokeWidth={currentPath.strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}
        </svg>

        {/* WHITEBOARD GRAPHICS LAYER */}
        <div style={{ pointerEvents: 'auto', position: 'relative', zIndex: 10 }}>

          {/* Card 1 — WELCOME */}
          {cards.find(c => c.id === 'welcome') && (() => {
            const c = cards.find(c => c.id === 'welcome');
            return (
              <WorkspaceCard {...c} onMove={handleCardMove} activeTool={activeTool} onReact={handleCardReact} reactions={cardReactions[c.id]}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div style={{ display: 'flex', gap: '6px', fontSize: '12px', fontWeight: '600', color: '#8B5CF6' }}>
                    <span>UI/UX Designer</span>
                    <span>&</span>
                    <span>Product Designer</span>
                  </div>
                  <h1 style={{ margin: 0, fontSize: '36px', fontWeight: '800', color: '#1A1A1A', letterSpacing: '-0.03em', lineHeight: '1.1' }}>
                    I'm Soupriti Das
                  </h1>
                  <p style={{ margin: 0, color: '#555555', fontSize: '13px', lineHeight: '1.5' }}>
                    I design experiences, build systems, and tell stories through interfaces that feel human.
                  </p>
                  <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
                    <button 
                      onClick={() => handlePanToSection('projects')}
                      className="interactive-element"
                      style={{
                        padding: '12px 20px',
                        background: '#8B5CF6',
                        border: 'none',
                        borderRadius: '14px',
                        color: '#FFFFFF',
                        fontWeight: '600',
                        fontSize: '12px',
                        cursor: 'pointer',
                        boxShadow: '0 4px 12px rgba(139, 92, 246, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      Explore Workspace <ArrowRight size={14} />
                    </button>
                    <button 
                      onClick={() => handlePanToSection('connect')}
                      className="interactive-element"
                      style={{
                        padding: '12px 20px',
                        background: 'transparent',
                        border: '1.5px solid rgba(0, 0, 0, 0.08)',
                        borderRadius: '14px',
                        color: '#1A1A1A',
                        fontWeight: '600',
                        fontSize: '12px',
                        cursor: 'pointer'
                      }}
                    >
                      Let's Talk
                    </button>
                  </div>
                </div>
              </WorkspaceCard>
            );
          })()}

          {/* Card 2 — CREATIVE EVOLUTION */}
          {cards.find(c => c.id === 'evolution') && (() => {
            const c = cards.find(c => c.id === 'evolution');
            return (
              <WorkspaceCard {...c} onMove={handleCardMove} activeTool={activeTool} onReact={handleCardReact} reactions={cardReactions[c.id]}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', position: 'relative' }}>
                  {[
                    { label: 'Curiosity By Nature', sub: 'Design Spark' },
                    { label: 'Design Education', sub: 'NIFT' },
                    { label: 'Trend Forecasting', sub: 'Roots' },
                    { label: 'UX/Product', sub: 'Design Journey' },
                    { label: 'Storytelling', sub: 'Systems Thinking' },
                    { label: 'AI + Design', sub: 'Explorer' }
                  ].map((node, i) => (
                    <div 
                      key={node.label}
                      style={{
                        background: '#FFFEE0',
                        border: '1px solid rgba(251, 191, 36, 0.3)',
                        borderRadius: '12px',
                        padding: '10px 14px',
                        flex: '1 1 120px',
                        fontSize: '11px',
                        textAlign: 'center',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.02)'
                      }}
                    >
                      <div style={{ fontWeight: '700', color: '#1A1A1A' }}>{node.label}</div>
                      <div style={{ color: '#888888', fontSize: '10px', marginTop: '2px' }}>{node.sub}</div>
                    </div>
                  ))}
                </div>
              </WorkspaceCard>
            );
          })()}

          {/* Card 3 — TOOLS I USE */}
          {cards.find(c => c.id === 'tools') && (() => {
            const c = cards.find(c => c.id === 'tools');
            return (
              <WorkspaceCard {...c} onMove={handleCardMove} activeTool={activeTool} onReact={handleCardReact} reactions={cardReactions[c.id]}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', justifyItems: 'center' }}>
                  {[
                    { name: 'Figma', icon: '🎨' },
                    { name: 'Anti Gravity', icon: 'AG' },
                    { name: 'Cursor', icon: '💻' },
                    { name: 'Lovable', icon: '❤️' },
                    { name: 'Hexfield', icon: '🎥' },
                    { name: 'Framer', icon: '⚡' },
                    { name: 'Midjourney', icon: '🌌' },
                    { name: 'ChatGPT', icon: '🧠' },
                    { name: 'Notion', icon: '🗒️' },
                    { name: 'Spline', icon: '📐' },
                    { name: 'Linear', icon: '⚙️' },
                    { name: 'Google Suite', icon: '📁' }
                  ].map(tool => (
                    <div 
                      key={tool.name}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '6px',
                        width: '76px'
                      }}
                    >
                      <div style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '12px',
                        background: '#FAFAFA',
                        border: '1px solid rgba(0,0,0,0.05)',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '18px',
                        fontWeight: '700',
                        color: '#10B981'
                      }}>
                        {tool.icon}
                      </div>
                      <span style={{ fontSize: '10px', fontWeight: '500', color: '#555555', textAlign: 'center' }}>
                        {tool.name}
                      </span>
                    </div>
                  ))}
                </div>
              </WorkspaceCard>
            );
          })()}

          {/* Card 4 — PROJECTS */}
          {cards.find(c => c.id === 'projects') && (() => {
            const c = cards.find(c => c.id === 'projects');
            return (
              <WorkspaceCard {...c} onMove={handleCardMove} activeTool={activeTool} onReact={handleCardReact} reactions={cardReactions[c.id]} width={840}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px' }}>
                  {[
                    { id: 'toothlens', title: 'ToothLens', desc: 'AI-Powered Dental Intelligence Platform', img: '/projects/healthcare.png' },
                    { id: 'phonepe', title: 'PhonePe', desc: 'Employee Experience & Internal Tools', img: '/projects/airfryer.png' },
                    { id: 'freshndry', title: 'FreshnDry', desc: 'Premium Fruits Marketplace', img: '/projects/mcb_school_cover.jpg' },
                    { id: 'trend', title: 'Trend Forecasting', desc: 'Research & Insights That Drive Strategy', img: '/projects/onboarding.png' }
                  ].map(proj => (
                    <div 
                      key={proj.id}
                      className="interactive-element"
                      style={{
                        background: '#FFFFFF',
                        border: '1px solid rgba(0, 0, 0, 0.05)',
                        borderRadius: '16px',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        boxShadow: '0 4px 16px rgba(0,0,0,0.02)'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                      <img 
                        src={proj.img} 
                        alt={proj.title} 
                        style={{ width: '100%', height: '110px', objectFit: 'cover' }} 
                      />
                      <div style={{ padding: '12px' }}>
                        <span style={{ fontSize: '13px', fontWeight: '700', color: '#1A1A1A' }}>{proj.title}</span>
                        <p style={{ margin: '4px 0 0 0', fontSize: '10px', color: '#888888', lineHeight: '1.4' }}>
                          {proj.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </WorkspaceCard>
            );
          })()}

          {/* Card 5 — INSIDE MY WORKSPACE */}
          {cards.find(c => c.id === 'inside-workspace') && (() => {
            const c = cards.find(c => c.id === 'inside-workspace');
            return (
              <WorkspaceCard {...c} onMove={handleCardMove} activeTool={activeTool} onReact={handleCardReact} reactions={cardReactions[c.id]}>
                <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                  {/* Polaroid Frame */}
                  <div style={{
                    background: '#FFFFFF',
                    border: '1px solid rgba(0,0,0,0.08)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
                    padding: '8px 8px 20px 8px',
                    borderRadius: '4px',
                    transform: 'rotate(-2deg)',
                    flexShrink: 0
                  }}>
                    <img 
                      src="/soupriti.jpg" 
                      alt="Soupriti" 
                      style={{ width: '140px', height: '150px', objectFit: 'cover', borderRadius: '2px' }} 
                    />
                    <div style={{ textAlign: 'center', fontSize: '11px', fontWeight: '600', color: '#555555', marginTop: '10px' }}>
                      That's me! 👇
                    </div>
                  </div>

                  {/* Bullet points */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px', fontWeight: '500', color: '#4A4A4A' }}>
                    <div style={{ display: 'flex', gap: '6px' }}><MapPin size={14} color="#EC4899" /> Bengali by roots</div>
                    <div style={{ display: 'flex', gap: '6px' }}><MapPin size={14} color="#EC4899" /> Chennai upbringing</div>
                    <div style={{ display: 'flex', gap: '6px' }}><Sparkles size={14} color="#EC4899" /> Trend Forecaster</div>
                    <div style={{ display: 'flex', gap: '6px' }}><Laptop size={14} color="#EC4899" /> Storyteller</div>
                    <div style={{ display: 'flex', gap: '6px' }}><Music size={14} color="#EC4899" /> Piano learner</div>
                    <div style={{ display: 'flex', gap: '6px' }}><Award size={14} color="#EC4899" /> Always curious</div>
                  </div>
                </div>
              </WorkspaceCard>
            );
          })()}

          {/* Card 6 — MY DESIGN PROCESS */}
          {cards.find(c => c.id === 'design-process') && (() => {
            const c = cards.find(c => c.id === 'design-process');
            return (
              <WorkspaceCard {...c} onMove={handleCardMove} activeTool={activeTool} onReact={handleCardReact} reactions={cardReactions[c.id]}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: '600' }}>
                    {['Discover', 'Define', 'Design', 'Test', 'Deliver'].map((pStep, index) => (
                      <div key={pStep} style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#EF4444' }}>
                        <span>{pStep}</span>
                        {index < 4 && <span style={{ color: '#DDD' }}>→</span>}
                      </div>
                    ))}
                  </div>
                  <div style={{
                    background: '#FAFAFA',
                    border: '1px solid rgba(0,0,0,0.03)',
                    borderRadius: '12px',
                    padding: '16px',
                    fontSize: '12px',
                    lineHeight: '1.6',
                    color: '#666666'
                  }}>
                    "I believe in human-centered design, systems thinking and meaningful impact."
                  </div>
                </div>
              </WorkspaceCard>
            );
          })()}

          {/* Card 7 — AI + EXPERIMENTS LAB */}
          {cards.find(c => c.id === 'experiments-lab') && (() => {
            const c = cards.find(c => c.id === 'experiments-lab');
            return (
              <WorkspaceCard {...c} onMove={handleCardMove} activeTool={activeTool} onReact={handleCardReact} reactions={cardReactions[c.id]} width={560}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                  {[
                    { name: 'AI Trend Radar', img: '/projects/airfryer.png' },
                    { name: 'Generative UI', img: '/projects/onboarding.png' },
                    { name: 'Prompt Lab', img: '/projects/ai_cooking_cover.avif' }
                  ].map(exp => (
                    <div 
                      key={exp.name}
                      style={{
                        background: '#FFFFFF',
                        border: '1px solid rgba(0, 0, 0, 0.05)',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        fontSize: '11px'
                      }}
                    >
                      <img src={exp.img} alt={exp.name} style={{ width: '100%', height: '80px', objectFit: 'cover' }} />
                      <div style={{ padding: '8px', fontWeight: '600', color: '#1A1A1A' }}>{exp.name}</div>
                    </div>
                  ))}
                </div>
              </WorkspaceCard>
            );
          })()}

          {/* Card 8 — MILESTONE TIMELINE */}
          {cards.find(c => c.id === 'milestone-timeline') && (() => {
            const c = cards.find(c => c.id === 'milestone-timeline');
            return (
              <WorkspaceCard {...c} onMove={handleCardMove} activeTool={activeTool} onReact={handleCardReact} reactions={cardReactions[c.id]} width={640}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '10px 0', position: 'relative' }}>
                  {/* Progress Line */}
                  <div style={{ position: 'absolute', top: '15px', left: '20px', right: '20px', height: '2px', background: '#E5E7EB', zIndex: 1 }} />
                  
                  {[
                    { year: '2019', desc: 'Started journey' },
                    { year: '2020', desc: 'NIFT Guwahati' },
                    { year: '2021', desc: 'Forecasting' },
                    { year: '2022', desc: 'Internships' },
                    { year: '2023', desc: 'Full-time' },
                    { year: 'Now', desc: 'What\'s next?' }
                  ].map(node => (
                    <div key={node.year} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', zIndex: 2, width: '90px' }}>
                      <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10B981', border: '3px solid #FFFFFF', boxShadow: '0 2px 6px rgba(0,0,0,0.1)' }} />
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                        <span style={{ fontSize: '11px', fontWeight: '700', color: '#1A1A1A' }}>{node.year}</span>
                        <span style={{ fontSize: '9px', color: '#888888', marginTop: '2px', lineHeight: '1.2' }}>{node.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </WorkspaceCard>
            );
          })()}

          {/* Card 9 — LET'S CONNECT */}
          {cards.find(c => c.id === 'connect') && (() => {
            const c = cards.find(c => c.id === 'connect');
            return (
              <WorkspaceCard {...c} onMove={handleCardMove} activeTool={activeTool} onReact={handleCardReact} reactions={cardReactions[c.id]}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <p style={{ margin: 0, fontSize: '14px', fontWeight: '600', color: '#1A1A1A' }}>
                    Have a project or an idea?
                  </p>
                  <p style={{ margin: 0, fontSize: '12px', color: '#666666' }}>
                    Let's create something unforgettable together.
                  </p>
                  <button 
                    className="interactive-element"
                    style={{
                      padding: '12px 20px',
                      background: '#FF4DA6',
                      border: 'none',
                      borderRadius: '14px',
                      color: '#FFFFFF',
                      fontWeight: '600',
                      fontSize: '12px',
                      cursor: 'pointer',
                      boxShadow: '0 4px 12px rgba(255, 77, 166, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginTop: '8px'
                    }}
                  >
                    <Mail size={14} /> Send a Message
                  </button>
                </div>
              </WorkspaceCard>
            );
          })()}

          {/* TILTED CREATIVE STICKY NOTES */}
          {stickies.map(sticky => (
            <div
              key={sticky.id}
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                transform: `translate3d(${sticky.x}px, ${sticky.y}px, 0) rotate(${sticky.rotation || 0}deg)`,
                width: '150px',
                minHeight: '130px',
                background: sticky.color,
                boxShadow: '0 8px 24px rgba(0,0,0,0.04), 0 2px 4px rgba(0,0,0,0.02)',
                padding: '16px',
                fontSize: '12px',
                lineHeight: '1.5',
                color: '#2A2A2A',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'flex-start',
                zIndex: 40,
                transition: 'transform 0.15s ease'
              }}
            >
              <textarea
                value={sticky.text}
                onChange={(e) => {
                  const val = e.target.value;
                  setStickies(prev => prev.map(s => s.id === sticky.id ? { ...s, text: val } : s));
                }}
                style={{
                  width: '100%',
                  height: '100%',
                  border: 'none',
                  background: 'transparent',
                  resize: 'none',
                  outline: 'none',
                  fontFamily: 'inherit',
                  fontSize: 'inherit',
                  fontWeight: '500',
                  color: 'inherit'
                }}
              />
            </div>
          ))}

          {/* STAMPED REACTIONS */}
          {stampedReactions.map(stamp => (
            <div
              key={stamp.id}
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                transform: `translate3d(${stamp.x}px, ${stamp.y}px, 0)`,
                fontSize: '28px',
                zIndex: 80,
                pointerEvents: 'none'
              }}
            >
              {stamp.emoji}
            </div>
          ))}

        </div>
      </div>

      {/* TOP NAVIGATION SHELL */}
      <TopBar 
        sections={cards} 
        onPanToSection={handlePanToSection} 
        onSearch={() => {}} 
        onOpenAI={() => setChatbotOpen(true)}
      />

      {/* AMBIENT COLLABORATORS PRESENCE CURSORS */}
      <PresenceSystem canvasScale={scale} canvasOffset={offset} />

      {/* COLLAPSIBLE ONBOARDING MAP */}
      <OnboardingMap onPanToSection={handlePanToSection} sections={cards} />

      {/* WHITEBOARD BOTTOM BAR DOCK */}
      <div style={{
        position: 'fixed',
        bottom: '24px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}>
        {/* Undo / Redo */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(0, 0, 0, 0.06)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
          borderRadius: '20px',
          height: '44px',
          padding: '0 6px',
          display: 'flex',
          alignItems: 'center',
          gap: '2px'
        }}>
          <button style={{ background: 'transparent', border: 'none', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyItems: 'center', cursor: 'pointer', borderRadius: '50%' }}><Undo2 size={16} color="#666" style={{ margin: 'auto' }} /></button>
          <button style={{ background: 'transparent', border: 'none', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyItems: 'center', cursor: 'pointer', borderRadius: '50%' }}><Redo2 size={16} color="#666" style={{ margin: 'auto' }} /></button>
        </div>

        {/* Toolbar */}
        <BottomToolbar 
          activeTool={activeTool} 
          setActiveTool={setActiveTool} 
          selectedReaction={selectedReaction}
          setSelectedReaction={setSelectedReaction}
        />

        {/* Zoom Controls */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(0, 0, 0, 0.06)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
          borderRadius: '20px',
          height: '44px',
          padding: '0 8px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '12px',
          fontWeight: '600',
          color: '#4A4A4A'
        }}>
          <button onClick={() => setScale(Math.max(scale - 0.1, 0.25))} style={{ background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}><Minus size={14} /></button>
          <span onClick={resetZoom} style={{ cursor: 'pointer', width: '40px', textAlign: 'center' }}>{Math.round(scale * 100)}%</span>
          <button onClick={() => setScale(Math.min(scale + 0.1, 2.5))} style={{ background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}><Plus size={14} /></button>
          <button onClick={resetZoom} style={{ background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', borderLeft: '1px solid #EEE', paddingLeft: '8px' }}><Maximize2 size={14} /></button>
        </div>
      </div>

      {/* Helper tips bottom-right */}
      <div style={{
        position: 'fixed',
        right: '24px',
        bottom: '24px',
        zIndex: 999,
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(0,0,0,0.06)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
        padding: '12px 16px',
        borderRadius: '16px',
        maxWidth: '240px',
        fontSize: '10px',
        color: '#666',
        lineHeight: '1.4'
      }}>
        💡 <strong>Tip:</strong> Drag the canvas to pan. Use mouse wheel or trackpad gestures to zoom. Select whiteboard tools to draw or react!
      </div>

      {/* Floating chatbot assistant */}
      {chatbotOpen && (
        <Chatbot onClose={() => setChatbotOpen(false)} />
      )}
    </div>
  );
}
