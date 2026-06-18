import React, { useState, useEffect, useRef } from 'react';
import Matter from 'matter-js';

export default function CuriousFooter() {
  const containerRef = useRef(null);
  const labelRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const buttonsRef = useRef(null);

  const [pills, setPills] = useState([]);
  const engineRef = useRef(null);

  const skillTags = [
    'User Ethnography', 'Framer', 'Mobile UX', 'Accessibility', 'WCAG', 
    'Motion Physics', 'UI Design', 'Figma', 'React', 'Design Systems', 
    'Product Design', 'Interaction Craft'
  ];

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth || 600;
    const height = container.clientHeight || 420;

    // Matter.js setup
    const engine = Matter.Engine.create({
      gravity: { y: 0.7 }
    });
    engineRef.current = engine;
    const world = engine.world;

    // Static Boundaries (walls & floor)
    const thickness = 60;
    const ground = Matter.Bodies.rectangle(width / 2, height + thickness / 2, width * 2, thickness, { isStatic: true });
    const leftWall = Matter.Bodies.rectangle(-thickness / 2, height / 2, thickness, height * 2, { isStatic: true });
    const rightWall = Matter.Bodies.rectangle(width + thickness / 2, height / 2, thickness, height * 2, { isStatic: true });

    Matter.Composite.add(world, [ground, leftWall, rightWall]);

    // Setup text obstacle bodies
    let textObstacles = [];
    
    const getRelativeRect = (elem) => {
      if (!elem) return null;
      const rect = elem.getBoundingClientRect();
      const parentRect = container.getBoundingClientRect();
      return {
        x: rect.left - parentRect.left + rect.width / 2,
        y: rect.top - parentRect.top + rect.height / 2,
        w: rect.width,
        h: rect.height
      };
    };

    const addTextObstacles = () => {
      if (textObstacles.length > 0) {
        Matter.Composite.remove(world, textObstacles);
        textObstacles = [];
      }

      // 1. Label
      const labelRect = getRelativeRect(labelRef.current);
      if (labelRect && labelRect.w > 0) {
        const obs = Matter.Bodies.rectangle(labelRect.x, labelRect.y, labelRect.w + 10, labelRect.h + 8, { isStatic: true });
        textObstacles.push(obs);
      }

      // 2. Title
      const titleRect = getRelativeRect(titleRef.current);
      if (titleRect && titleRect.w > 0) {
        const obs = Matter.Bodies.rectangle(titleRect.x, titleRect.y, titleRect.w + 20, titleRect.h + 10, { isStatic: true });
        textObstacles.push(obs);
      }

      // 3. Bio Description
      const descRect = getRelativeRect(descRef.current);
      if (descRect && descRect.w > 0) {
        const obs = Matter.Bodies.rectangle(descRect.x, descRect.y, descRect.w + 20, descRect.h + 10, { isStatic: true });
        textObstacles.push(obs);
      }

      // 4. Buttons group
      const btnRect = getRelativeRect(buttonsRef.current);
      if (btnRect && btnRect.w > 0) {
        const obs = Matter.Bodies.rectangle(btnRect.x, btnRect.y, btnRect.w + 20, btnRect.h + 10, { isStatic: true });
        textObstacles.push(obs);
      }

      if (textObstacles.length > 0) {
        Matter.Composite.add(world, textObstacles);
      }
    };

    // Calculate obstacles after rendering settles
    const obstacleTimeout = setTimeout(addTextObstacles, 250);

    // Create Matter bodies for all skill tags dropping from top
    const tagBodies = skillTags.map((text, idx) => {
      const x = Math.random() * (width - 150) + 75;
      const y = -40 - (idx * 55);
      
      const estWidth = text.length * 8.5 + 24;
      const body = Matter.Bodies.rectangle(x, y, estWidth, 32, {
        restitution: 0.6,
        friction: 0.1,
        frictionAir: 0.015,
        chamfer: { radius: 16 }
      });
      body.skillText = text;
      body.pillWidth = estWidth;
      return body;
    });

    Matter.Composite.add(world, tagBodies);

    // Enable mouse constraint dragging
    const mouse = Matter.Mouse.create(container);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false }
      }
    });
    Matter.Composite.add(world, mouseConstraint);

    // Prevent scroll wheel issues inside container
    mouse.element.removeEventListener('mousewheel', mouse.mousewheel);
    mouse.element.removeEventListener('DOMMouseScroll', mouse.mousewheel);
    mouse.element.removeEventListener('wheel', mouse.mousewheel);

    let animId;
    const run = () => {
      if (!engineRef.current) return;
      Matter.Engine.update(engine, 1000 / 60);

      const updated = tagBodies.map(b => ({
        id: b.id,
        text: b.skillText,
        w: b.pillWidth,
        x: b.position.x,
        y: b.position.y,
        angle: b.angle
      }));

      setPills(updated);
      animId = requestAnimationFrame(run);
    };

    animId = requestAnimationFrame(run);

    return () => {
      clearTimeout(obstacleTimeout);
      cancelAnimationFrame(animId);
      Matter.World.clear(world);
      Matter.Engine.clear(engine);
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="blueprint-hero-container"
      style={{ userSelect: 'none', marginTop: '24px' }}
    >
      {/* Background blueprint physics nodes layer */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'auto', zIndex: 1 }}>
        {pills.map(p => (
          <div
            key={p.id}
            style={{
              position: 'absolute',
              left: `${p.x}px`,
              top: `${p.y}px`,
              width: `${p.w}px`,
              height: '32px',
              transform: `translate(-50%, -50%) rotate(${p.angle}rad)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1.5px solid rgba(255, 255, 255, 0.85)',
              borderRadius: '20px',
              background: 'rgba(255, 255, 255, 0.08)',
              color: '#ffffff',
              fontSize: '12.5px',
              fontWeight: 600,
              cursor: 'grab',
              whiteSpace: 'nowrap',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              transformOrigin: 'center center',
              pointerEvents: 'none'
            }}
          >
            {p.text}
          </div>
        ))}
      </div>

      {/* Content Text Block (registered as physics obstacles) */}
      <div style={{ position: 'relative', zIndex: 5, pointerEvents: 'auto', maxWidth: '640px' }}>
        
        {/* Label */}
        <div 
          ref={labelRef}
          style={{ 
            display: 'inline-block',
            fontSize: '11px', 
            fontWeight: 700, 
            letterSpacing: '0.08em', 
            color: '#8b5cf6',
            textTransform: 'uppercase',
            marginBottom: '10px'
          }}
        >
          &mdash; CURIOUS TO KNOW MORE?
        </div>

        {/* Title */}
        <h2 
          ref={titleRef}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(28px, 3.8vw, 42px)',
            fontWeight: 400,
            letterSpacing: '-0.02em',
            lineHeight: 1.15,
            color: '#ffffff',
            marginTop: '0',
            marginBottom: '16px'
          }}
        >
          The designer behind<br />
          <span style={{ color: '#00f0ff', fontWeight: 600 }}>all the interactive play.</span>
        </h2>

        {/* Bio Text */}
        <p 
          ref={descRef}
          style={{
            fontSize: '14.5px',
            lineHeight: 1.65,
            color: 'rgba(255, 255, 255, 0.85)',
            marginBottom: '28px',
            fontFamily: 'var(--font-body)'
          }}
        >
          I'm <strong style={{ color: '#ffffff', fontWeight: 600 }}>Soupriti</strong>, a Product Designer based in Bangalore. With a visual design foundation from <strong style={{ color: '#ffffff', fontWeight: 600 }}>NIFT Chennai</strong>, I specialize in combining rigorous user ethnography with high-end, functional React prototypes.
        </p>

        {/* Buttons / Actions without icons */}
        <div 
          ref={buttonsRef}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px'
          }}
        >
          <a
            href="/Soupriti_Das_Resume.pdf"
            download="Soupriti_Das_Resume.pdf"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: '#ffffff',
              color: '#1a082e',
              border: 'none',
              borderRadius: '24px',
              padding: '10px 20px',
              fontSize: '13.5px',
              fontWeight: 700,
              cursor: 'pointer',
              textDecoration: 'none',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}
          >
            Download Resume
          </a>



          <a
            href="https://www.linkedin.com/in/soupriti-das/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: 'transparent',
              color: '#ffffff',
              border: '1.5px solid rgba(255,255,255,0.4)',
              borderRadius: '24px',
              padding: '10px 20px',
              fontSize: '13.5px',
              fontWeight: 600,
              cursor: 'pointer',
              textDecoration: 'none',
              transition: 'border-color 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = '#ffffff'}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'}
          >
            Connect on LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
}
