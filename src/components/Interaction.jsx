import React, { useEffect, useRef } from 'react';
import Matter from 'matter-js';

export default function Interaction() {
  const canvasRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const Engine = Matter.Engine,
          Runner = Matter.Runner,
          Composites = Matter.Composites,
          MouseConstraint = Matter.MouseConstraint,
          Mouse = Matter.Mouse,
          World = Matter.World,
          Constraint = Matter.Constraint,
          Bodies = Matter.Bodies,
          Composite = Matter.Composite;

    const engine = Engine.create(),
          world = engine.world;
          
    // Slightly lighter gravity for floaty feeling
    engine.gravity.y = 0.8;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    let renderWidth = window.innerWidth;
    let renderHeight = window.innerHeight;
    
    canvas.width = renderWidth;
    canvas.height = renderHeight;
    
    // Bounds to keep ropes in screen
    const floor = Bodies.rectangle(renderWidth / 2, renderHeight + 20, renderWidth * 2, 40, { isStatic: true });
    const leftWall = Bodies.rectangle(-20, renderHeight / 2, 40, renderHeight * 2, { isStatic: true });
    const rightWall = Bodies.rectangle(renderWidth + 20, renderHeight / 2, 40, renderHeight * 2, { isStatic: true });
    
    World.add(world, [floor, leftWall, rightWall]);

    let textBodies = [];

    const updateTextBodies = () => {
      if (textBodies.length > 0) {
        World.remove(world, textBodies);
        textBodies = [];
      }
      if (textRef.current) {
        const wordSpans = textRef.current.querySelectorAll('.phys-word');
        wordSpans.forEach(span => {
          const rect = span.getBoundingClientRect();
          // Adding a static rectangle for each word
          const body = Bodies.rectangle(
            rect.left + rect.width / 2,
            rect.top + rect.height / 2,
            rect.width * 0.95, // Slightly smaller than actual text box to let rope wrap tighter
            rect.height * 0.8,
            { 
              isStatic: true,
              friction: 0.8,
              restitution: 0.2
            }
          );
          textBodies.push(body);
        });
        World.add(world, textBodies);
      }
    };

    // Use a timeout to ensure fonts and layout are fully applied
    const layoutTimeout = setTimeout(updateTextBodies, 300);

    // Use a collision group so ropes don't massively tangle inside themselves, though letting them collide is fun too.
    const ropes = [];
    
    const createRope = (x, y, segments, length, radius) => {
        const rope = Composites.stack(x, y, 1, segments, 0, 0, (x, y) => {
            return Bodies.circle(x, y, radius, { 
                frictionAir: 0.02, 
                density: 0.05,
                restitution: 0.3
            });
        });
        
        Composites.chain(rope, 0.5, 0, -0.5, 0, { stiffness: 0.9, length: length });
        
        // Anchor the first body to the top
        Composite.add(rope, Constraint.create({ 
            bodyB: rope.bodies[0],
            pointB: { x: 0, y: 0 },
            pointA: { x: x, y: y },
            stiffness: 1
        }));
        
        return rope;
    };
    
    const numRopes = window.innerWidth < 768 ? 5 : 8;
    for (let i = 0; i < numRopes; i++) {
        // Space them across the top
        const xPos = (renderWidth / numRopes) * i + (renderWidth / numRopes) / 2;
        // Segments long enough to hit the floor
        const segments = Math.floor(renderHeight / 20) + 4; 
        const rope = createRope(xPos, -10, segments, 10, 14);
        ropes.push(rope);
        World.add(world, rope);
    }
    
    const mouse = Mouse.create(canvas);
    // Prevent zooming on canvas, allow native scroll
    mouse.element.removeEventListener("mousewheel", mouse.mousewheel);
    mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel);
    
    const mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.1,
            render: { visible: false }
        }
    });

    World.add(world, mouseConstraint);

    const runner = Runner.create();
    Runner.run(runner, engine);
    
    let animId;
    const render = () => {
      ctx.clearRect(0, 0, renderWidth, renderHeight);
      
      // Draw Strings
      ctx.lineWidth = 26; 
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.strokeStyle = '#FFD600'; // Yellow
      
      ropes.forEach(rope => {
          ctx.beginPath();
          rope.bodies.forEach((body, index) => {
              if (index === 0) {
                  ctx.moveTo(body.position.x, body.position.y);
              } else {
                  // Draw quadratic curves for smooth lines
                  const prevBody = rope.bodies[index - 1];
                  const midX = (prevBody.position.x + body.position.x) / 2;
                  const midY = (prevBody.position.y + body.position.y) / 2;
                  // If it's the second body, line to mid, else quadCurve
                  if (index === 1) {
                      ctx.lineTo(midX, midY);
                  } else {
                      ctx.quadraticCurveTo(prevBody.position.x, prevBody.position.y, midX, midY);
                  }
              }
          });
          // Draw to the last body exactly
          const lastBody = rope.bodies[rope.bodies.length - 1];
          ctx.lineTo(lastBody.position.x, lastBody.position.y);
          ctx.stroke();
      });
      
      animId = requestAnimationFrame(render);
    };
    render();
    
    const handleResize = () => {
        renderWidth = window.innerWidth;
        renderHeight = window.innerHeight;
        canvas.width = renderWidth;
        canvas.height = renderHeight;
        
        Matter.Body.setPosition(floor, { x: renderWidth / 2, y: renderHeight + 20 });
        Matter.Body.setPosition(rightWall, { x: renderWidth + 20, y: renderHeight / 2 });
        updateTextBodies();
    };
    window.addEventListener('resize', handleResize);

    return () => {
        window.removeEventListener('resize', handleResize);
        clearTimeout(layoutTimeout);
        cancelAnimationFrame(animId);
        Runner.stop(runner);
        Engine.clear(engine);
    };
  }, []);

  return (
    <section
      id="interaction"
      style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: '#0B8337', // Screenshot Green
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
        }}
      />
      
      {/* Content wrapper with pointerEvents: none so mouse passes through to canvas */}
      <div 
        style={{
          position: 'relative', 
          zIndex: 2, 
          pointerEvents: 'none',
          textAlign: 'center',
          color: '#ffffff',
          fontFamily: 'var(--font-display)',
        }}
      >
        <h1 ref={textRef} style={{
          fontSize: 'clamp(36px, 6vw, 64px)',
          fontWeight: '700',
          lineHeight: '1.1',
          letterSpacing: '-0.02em',
        }}>
          <span className="phys-word" style={{ display: 'inline-block', margin: '0 8px' }}>Hello?</span>
          <span className="phys-word" style={{ display: 'inline-block', margin: '0 8px' }}>Is</span>
          <span className="phys-word" style={{ display: 'inline-block', margin: '0 8px' }}>it</span>
          <span className="phys-word" style={{ display: 'inline-block', margin: '0 8px' }}>me</span>
          <span className="phys-word" style={{ display: 'inline-block', margin: '0 8px' }}>you're</span>
          <br />
          <span className="phys-word" style={{ display: 'inline-block', margin: '0 8px', marginTop: '12px' }}>looking</span>
          <span className="phys-word" style={{ display: 'inline-block', margin: '0 8px', marginTop: '12px' }}>for?</span>
        </h1>
      </div>
      
      {/* Scroll Indicator */}
      <div style={{
          position: 'absolute',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2,
          color: '#ffffff',
          fontSize: '11px',
          fontWeight: '700',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          pointerEvents: 'none',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px'
      }}>
          SCROLL
          <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'white' }}></div>
      </div>
    </section>
  );
}
