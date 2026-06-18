import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Matter from 'matter-js';
import { FadeUp } from './utils';

const SKILLS = [
  'Figma', 'React', 'UX Research', 'UI Design', 'WCAG',
  'Accessibility', 'SaaS', 'Mobile UX', 'Framer', 'Design Systems',
  'Interaction Craft', 'Motion Physics', 'User Ethnography', 'Product Design'
];

const GRADIENTS = [
  { start: '#FF74C4', end: '#F43F5E' }, // Pink
  { start: '#00F0FF', end: '#0284C7' }, // Cyan/Blue
  { start: '#A855F7', end: '#7C3AED' }, // Purple
  { start: '#FB923C', end: '#EA580C' }, // Orange
  { start: '#FACC15', end: '#84CC16' }, // Yellow/Green
  { start: '#818CF8', end: '#4F46E5' }  // Indigo
];

export default function Hero() {
  const [loaded, setLoaded] = useState(false);

  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const logoRef = useRef(null);
  const descRef = useRef(null);
  const titleRef = useRef(null);
  const aboutLabelRef = useRef(null);
  const aboutTitleRef = useRef(null);
  const aboutDescRef = useRef(null);
  const aboutButtonsRef = useRef(null);

  useEffect(() => {
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    let width = container.clientWidth;
    let height = container.clientHeight;

    canvas.width = width;
    canvas.height = height;

    // Matter.js setup
    const engine = Matter.Engine.create({
      gravity: { y: 0.8 }
    });

    const world = engine.world;

    // Boundaries
    const thickness = 100;
    const ground = Matter.Bodies.rectangle(width / 2, height + thickness / 2, width * 2, thickness, { 
      isStatic: true, 
      label: 'ground' 
    });
    const leftWall = Matter.Bodies.rectangle(-thickness / 2, height / 2, thickness, height * 2, { 
      isStatic: true, 
      label: 'leftWall' 
    });
    const rightWall = Matter.Bodies.rectangle(width + thickness / 2, height / 2, thickness, height * 2, { 
      isStatic: true, 
      label: 'rightWall' 
    });

    Matter.Composite.add(world, [ground, leftWall, rightWall]);

    // Bounding Boxes for Text Elements
    let textObstacles = [];
    
    const getRelativeRect = (element) => {
      if (!element) return null;
      const rect = element.getBoundingClientRect();
      const parentRect = container.getBoundingClientRect();
      return {
        x: rect.left - parentRect.left + rect.width / 2,
        y: rect.top - parentRect.top + rect.height / 2,
        w: rect.width,
        h: rect.height
      };
    };

    const updateTextObstacles = () => {
      // Remove old obstacles
      if (textObstacles.length > 0) {
        Matter.Composite.remove(world, textObstacles);
        textObstacles = [];
      }

      // Add logo obstacle
      const logoRect = getRelativeRect(logoRef.current);
      if (logoRect && logoRect.w > 0) {
        const logoObstacle = Matter.Bodies.rectangle(logoRect.x, logoRect.y, logoRect.w + 16, logoRect.h + 10, {
          isStatic: true,
          label: 'logo-text'
        });
        textObstacles.push(logoObstacle);
      }

      // Add desc obstacle
      const descRect = getRelativeRect(descRef.current);
      if (descRect && descRect.w > 0) {
        const descObstacle = Matter.Bodies.rectangle(descRect.x, descRect.y, descRect.w + 24, descRect.h + 16, {
          isStatic: true,
          label: 'desc-text'
        });
        textObstacles.push(descObstacle);
      }

      // Add title obstacle
      const titleRect = getRelativeRect(titleRef.current);
      if (titleRect && titleRect.w > 0) {
        const titleObstacle = Matter.Bodies.rectangle(titleRect.x, titleRect.y, titleRect.w + 32, titleRect.h + 20, {
          isStatic: true,
          label: 'title-text'
        });
        textObstacles.push(titleObstacle);
      }

      // Add about label obstacle
      const aboutLabelRect = getRelativeRect(aboutLabelRef.current);
      if (aboutLabelRect && aboutLabelRect.w > 0) {
        const aboutLabelObstacle = Matter.Bodies.rectangle(aboutLabelRect.x, aboutLabelRect.y, aboutLabelRect.w + 16, aboutLabelRect.h + 10, {
          isStatic: true,
          label: 'about-label'
        });
        textObstacles.push(aboutLabelObstacle);
      }

      // Add about title obstacle
      const aboutTitleRect = getRelativeRect(aboutTitleRef.current);
      if (aboutTitleRect && aboutTitleRect.w > 0) {
        const aboutTitleObstacle = Matter.Bodies.rectangle(aboutTitleRect.x, aboutTitleRect.y, aboutTitleRect.w + 24, aboutTitleRect.h + 16, {
          isStatic: true,
          label: 'about-title'
        });
        textObstacles.push(aboutTitleObstacle);
      }

      // Add about desc obstacle
      const aboutDescRect = getRelativeRect(aboutDescRef.current);
      if (aboutDescRect && aboutDescRect.w > 0) {
        const aboutDescObstacle = Matter.Bodies.rectangle(aboutDescRect.x, aboutDescRect.y, aboutDescRect.w + 24, aboutDescRect.h + 16, {
          isStatic: true,
          label: 'about-desc'
        });
        textObstacles.push(aboutDescObstacle);
      }

      // Add about buttons obstacle
      const aboutButtonsRect = getRelativeRect(aboutButtonsRef.current);
      if (aboutButtonsRect && aboutButtonsRect.w > 0) {
        const aboutButtonsObstacle = Matter.Bodies.rectangle(aboutButtonsRect.x, aboutButtonsRect.y, aboutButtonsRect.w + 24, aboutButtonsRect.h + 16, {
          isStatic: true,
          label: 'about-buttons'
        });
        textObstacles.push(aboutButtonsObstacle);
      }

      if (textObstacles.length > 0) {
        Matter.Composite.add(world, textObstacles);
      }
    };

    // Delay measurement slightly to ensure styling and layouts have settled
    const initTimer = setTimeout(updateTextObstacles, 300);

    // Mouse constraint for dragging pills
    const mouse = Matter.Mouse.create(canvas);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false }
      }
    });

    Matter.Composite.add(world, mouseConstraint);

    // Keep track of spawned pills to prune them
    let pills = [];
    const maxPills = 40;
    let lastSpawnTime = 0;
    const spawnCooldown = 120; // ms

    // Spawning function
    const spawnPill = (x, y) => {
      const now = Date.now();
      if (now - lastSpawnTime < spawnCooldown) return;
      lastSpawnTime = now;

      const text = SKILLS[Math.floor(Math.random() * SKILLS.length)];
      const gradient = GRADIENTS[Math.floor(Math.random() * GRADIENTS.length)];

      // Measure text width using canvas context
      ctx.font = '600 13px Inter, sans-serif';
      const textWidth = ctx.measureText(text).width;
      const pillWidth = textWidth + 32;
      const pillHeight = 34;

      const pill = Matter.Bodies.rectangle(x, y, pillWidth, pillHeight, {
        chamfer: { radius: pillHeight / 2 },
        restitution: 0.55,
        friction: 0.1,
        label: 'pill'
      });

      pill.pillText = text;
      pill.pillWidth = pillWidth;
      pill.pillHeight = pillHeight;
      pill.pillGradient = gradient;

      pills.push(pill);
      Matter.Composite.add(world, pill);

      // Remove oldest pill if count exceeded
      if (pills.length > maxPills) {
        const oldest = pills.shift();
        Matter.Composite.remove(world, oldest);
      }
    };

    // Check if point is inside a rect obstacle
    const isInsideObstacle = (x, y) => {
      const logoRect = getRelativeRect(logoRef.current);
      const descRect = getRelativeRect(descRef.current);
      const titleRect = getRelativeRect(titleRef.current);
      const aboutLabelRect = getRelativeRect(aboutLabelRef.current);
      const aboutTitleRect = getRelativeRect(aboutTitleRef.current);
      const aboutDescRect = getRelativeRect(aboutDescRef.current);
      const aboutButtonsRect = getRelativeRect(aboutButtonsRef.current);

      const check = (ptX, ptY, rect, padding = 15) => {
        if (!rect) return false;
        return ptX >= rect.x - rect.w / 2 - padding &&
               ptX <= rect.x + rect.w / 2 + padding &&
               ptY >= rect.y - rect.h / 2 - padding &&
               ptY <= rect.y + rect.h / 2 + padding;
      };

      return check(x, y, logoRect) || check(x, y, descRect) || check(x, y, titleRect) ||
             check(x, y, aboutLabelRect) || check(x, y, aboutTitleRect) ||
             check(x, y, aboutDescRect) || check(x, y, aboutButtonsRect);
    };

    // Mouse Move event
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      // Spawn only if NOT inside text bounding boxes
      if (!isInsideObstacle(mouseX, mouseY)) {
        spawnPill(mouseX, mouseY);
      }
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    // Custom Canvas Render Loop
    let animId;
    const run = () => {
      Matter.Engine.update(engine, 1000 / 60);

      ctx.clearRect(0, 0, width, height);

      // Draw all bodies
      const bodies = Matter.Composite.allBodies(world);
      bodies.forEach(body => {
        if (body.label === 'pill') {
          const { x, y } = body.position;
          const { angle } = body;
          const { pillText, pillWidth, pillHeight, pillGradient } = body;

          ctx.save();
          ctx.translate(x, y);
          ctx.rotate(angle);

          // Draw shadows for visual depth
          ctx.shadowColor = 'rgba(0, 0, 0, 0.15)';
          ctx.shadowBlur = 10;
          ctx.shadowOffsetY = 4;

          // Draw pill background
          const path = new Path2D();
          const r = pillHeight / 2;
          const w = pillWidth;
          const h = pillHeight;
          path.arc(-w / 2 + r, -h / 2 + r, r, Math.PI / 2, (3 * Math.PI) / 2);
          path.lineTo(w / 2 - r, -h / 2);
          path.arc(w / 2 - r, -h / 2 + r, r, (3 * Math.PI) / 2, Math.PI / 2);
          path.lineTo(-w / 2 + r, h / 2);
          path.closePath();

          // Draw pill background (no colors, transparent white)
          ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
          ctx.fill(path);

          // Remove shadow for text
          ctx.shadowColor = 'transparent';

          // Draw pill border (white outline)
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 1.5;
          ctx.stroke(path);

          // Draw text label
          ctx.fillStyle = '#ffffff';
          ctx.font = '600 13px Inter, sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(pillText, 0, 0);

          ctx.restore();
        }
      });

      animId = requestAnimationFrame(run);
    };

    run();

    // Resize Handler
    const handleResize = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      canvas.width = width;
      canvas.height = height;

      // Update static walls
      Matter.Body.setPosition(ground, { x: width / 2, y: height + thickness / 2 });
      Matter.Body.setPosition(leftWall, { x: -thickness / 2, y: height / 2 });
      Matter.Body.setPosition(rightWall, { x: width + thickness / 2, y: height / 2 });

      updateTextObstacles();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(initTimer);
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      Matter.World.clear(world);
      Matter.Engine.clear(engine);
    };
  }, []);

  return (
    <section
      id="home"
      className="bg-blue"
      ref={containerRef}
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        background: '#0052ff', // Unified Electric Blue primary
        overflow: 'hidden',
        color: '#ffffff',
        fontFamily: 'var(--font-body)',
      }}
    >
      {/* ── Branding Logo ── */}
      <div
        ref={logoRef}
        style={{
          position: 'absolute',
          top: '24px',
          left: 'clamp(24px, 5vw, 72px)',
          zIndex: 100,
          width: 'fit-content',
        }}
      >
        <span 
          style={{
            fontSize: '18px',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            fontFamily: 'var(--font-display)',
            color: '#ffffff',
            display: 'inline-block',
          }}
        >
          Soupriti Das
        </span>
      </div>

      {/* ── Physics Canvas (Layered behind logo and text, but clickable) ── */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 5,
          pointerEvents: 'auto',
          cursor: 'grab',
        }}
      />

      {/* ── Faint White Grid Backdrop with Breathing Animation ── */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px), 
            linear-gradient(90deg, rgba(255, 255, 255, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          zIndex: 1,
          pointerEvents: 'none',
          animation: 'gridBreathe 6s ease-in-out infinite alternate',
        }}
      />

      {/* ── Soft Teal Glowing Aura (Blob) ── */}
      <div 
        style={{
          position: 'absolute',
          top: '15%',
          right: '-10%',
          width: 'min(90vw, 700px)',
          height: 'min(90vw, 700px)',
          background: 'radial-gradient(circle, rgba(0, 230, 255, 0.38) 0%, rgba(0, 82, 255, 0) 70%)',
          filter: 'blur(70px)',
          zIndex: 2,
          pointerEvents: 'none',
          animation: 'blobBreathe 10s ease-in-out infinite alternate',
        }}
      />

      {/* ── Main Content Area ── */}
      <div 
        style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '120px clamp(24px, 5vw, 72px) 64px clamp(24px, 5vw, 72px)',
          position: 'relative',
          zIndex: 10,
          pointerEvents: 'none', // Allow cursor to reach canvas underneath
          boxSizing: 'border-box',
        }}
      >
        {/* Middle Content Row */}
        <div 
          ref={descRef}
          style={{ 
            display: 'flex', 
            alignItems: 'flex-start', 
            gap: '24px', 
            maxWidth: '620px',
            marginTop: 'auto',
            marginBottom: 'auto',
            width: 'fit-content',
            pointerEvents: 'auto', // Re-enable pointer events for description
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
          }}
        >
          <p 
            style={{
              fontSize: 'clamp(15px, 2vw, 18px)',
              lineHeight: 1.6,
              fontWeight: 500,
              color: 'rgba(255, 255, 255, 0.95)',
              margin: 0,
              fontFamily: 'var(--font-mono)',
              letterSpacing: '-0.01em',
            }}
          >
            I design workflows from zero to one, helping teams integrate AI, design systems, and seamless user experiences into product strategy.
          </p>
        </div>

        {/* Bottom Big Heading */}
        <div
          ref={titleRef}
          style={{
            marginTop: 'auto',
            width: 'fit-content',
            pointerEvents: 'auto', // Re-enable pointer events for title
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.8s ease-out 0.2s, transform 0.8s ease-out 0.2s',
          }}
        >
          <h1 
            style={{
              fontSize: 'clamp(44px, 8.5vw, 110px)',
              fontWeight: 700,
              letterSpacing: '-0.035em',
              lineHeight: 1.05,
              margin: 0,
              fontFamily: 'var(--font-display)',
            }}
          >
            Product Designer
            <br />
            and Strategist
          </h1>
        </div>
      </div>

      {/* ── About Section (Seamless continuation) ── */}
      <div 
        id="about" 
        style={{ 
          position: 'relative', 
          padding: '120px clamp(24px, 5vw, 72px) 160px clamp(24px, 5vw, 72px)',
          zIndex: 10,
          pointerEvents: 'none', // Allow clicks to background canvas
          boxSizing: 'border-box',
        }}
      >
        <div style={{ maxWidth: '800px', width: '100%', display: 'flex', flexDirection: 'column', gap: '20px', pointerEvents: 'auto' }}>
          <FadeUp>
            <div ref={aboutLabelRef} style={{ display: 'inline-block' }}>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#00f0ff', // Vibrant cyan label
                fontFamily: 'var(--font-body)',
              }}>
                <span style={{ width: 16, height: 1, background: '#00f0ff', display: 'inline-block' }} />
                About Me
              </span>
            </div>
          </FadeUp>
          <FadeUp delay={80}>
            <h2 
              ref={aboutTitleRef}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(34px, 4.5vw, 52px)',
                fontWeight: 400,
                letterSpacing: '-0.03em',
                lineHeight: 1.08,
                color: '#ffffff',
                marginTop: '4px',
                marginBottom: '8px',
              }}
            >
              The designer behind<br />
              <span style={{ color: '#00f0ff', fontWeight: 600 }}>all the interactive play.</span>
            </h2>
          </FadeUp>
          <FadeUp delay={120}>
            <p 
              ref={aboutDescRef}
              style={{ 
                fontSize: 16.5, 
                lineHeight: 1.75, 
                color: 'rgba(255, 255, 255, 0.85)', 
                fontFamily: 'var(--font-body)', 
                margin: 0 
              }}
            >
              I'm <strong style={{ color: '#ffffff', fontWeight: 600 }}>Soupriti</strong>, a Product Designer based in Bangalore. With a visual design foundation from <strong style={{ color: '#ffffff', fontWeight: 600 }}>NIFT Chennai</strong>, I specialize in combining rigorous user ethnography with high-end, functional React prototypes.
            </p>
          </FadeUp>

          {/* Design System CTAs */}
          <FadeUp delay={160}>
            <div 
              ref={aboutButtonsRef}
              style={{ 
                display: 'flex', 
                gap: '16px', 
                marginTop: '12px', 
                flexWrap: 'wrap' 
              }}
            >
              <a 
                href="/Soupriti_Das_Resume.pdf" 
                download="Soupriti_Das_Resume.pdf"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: '#ffffff',
                  color: '#0052ff',
                  fontFamily: 'var(--font-body)',
                  fontSize: '14.5px',
                  fontWeight: 600,
                  borderRadius: '100px',
                  padding: '12px 24px',
                  boxShadow: '0 4px 12px rgba(255, 255, 255, 0.1)',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer'
                }}
                className="cv-btn-cta"
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 6px 16px rgba(255, 255, 255, 0.2)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 255, 255, 0.1)'
                }}
              >
                Download CV <span style={{ fontSize: '15px' }}>📄</span>
              </a>
              <a 
                href="https://linkedin.com/in/soupriti-das" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: 'transparent',
                  color: '#ffffff',
                  border: '1.5px solid #ffffff',
                  fontFamily: 'var(--font-body)',
                  fontSize: '14.5px',
                  fontWeight: 600,
                  borderRadius: '100px',
                  padding: '10.5px 22.5px',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer'
                }}
                className="linkedin-btn-cta"
                onMouseEnter={e => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.backgroundColor = 'transparent'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                Connect on Linkedin <span style={{ fontSize: '14px' }}>↗</span>
              </a>
            </div>
          </FadeUp>
        </div>
      </div>

      {/* ── Keyframes styles ── */}
      <style>{`
        @keyframes gridBreathe {
          0% { opacity: 0.6; }
          100% { opacity: 0.95; }
        }
        @keyframes blobBreathe {
          0% { transform: scale(0.95) translate(0px, 0px); opacity: 0.8; }
          100% { transform: scale(1.08) translate(10px, -15px); opacity: 1; }
        }
      `}</style>
    </section>
  );
}
