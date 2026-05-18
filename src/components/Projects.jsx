import { useState, useEffect, useRef } from 'react'
import { FadeUp, Label } from './utils'

/* ── Cozy Case Study Data Database ── */
const PROJECTS = [
  {
    id: 'ai-cooking',
    title: 'Rethinking AI Cooking Experience',
    role: 'Product Designer',
    duration: '9 Months',
    impact: '+24% efficiency',
    category: 'AI Product',
    teamType: '0→1 Experience',
    accent: 'oklch(60% 0.14 200)',
    bg: 'oklch(96% 0.03 200)',
    emoji: '🍳',
    framerUrl: 'https://productgrowthsoupriti.framer.website/ai-cooking-experience-redesign',
    coverImage: '/projects/ai_cooking_cover.avif',
    cardImage: '/projects/ai_cooking_cover.avif',
    tags: ['AI UX', 'Mobile UX', 'Design System', 'User Research'],
    overview: 'Designed a guided cooking flow to reduce mid-way drop-offs, helping the team protect their core north star metric by turning first-time setup into everyday cooking habits.',
    sections: [
      {
        label: 'Context & Problem',
        content: 'This AI-powered cooking assistant promised to take the stress out of daily cooking in Indian households. In reality, the experience often broke down at the exact moments when people needed it most. Users started recipes with enthusiasm but abandoned them halfway, got confused about what the device was doing, or didn’t trust that the outcome would match their expectations.\n\nDespite strong hardware and ambitious AI features, actual recipe completion and repeat usage were lower than expected. Many users reverted to traditional cooking or felt the device demanded too much of their constant attention.\n\nThe core friction was clear: the experience didn’t reflect the reality of Indian kitchens—messy hands, parallel tasks, interruptions, family preferences, and inconsistent attention. My goal was to redesign the core cooking experience so it felt like a reliable partner in the kitchen, not another screen demanding attention.',
      },
      {
        label: 'Goals & Success Metrics',
        content: '• Increase recipe completion rate (primary metric).\n• Improve recipe ratings (user satisfaction proxy).\n• Reduce time spent feeling “stuck” or confused in key flows.\n• Increase perceived trust and predictability of the device.',
      },
      {
        label: 'Understanding real kitchens, not ideal flows',
        content: 'To bridge the gap between AI ambition and kitchen reality, we moved beyond the lab:\n\n• Log Analysis: Identified exactly where users were dropping off in multi-step recipes.\n• Contextual Inquiry: Conducted remote and in-home sessions to observe how people juggled the device alongside their gas stove, pressure cookers, and phone calls.\n• Comparative Interviews: Spoke to both power users and those who had churned to understand the "trust break" moments.\n\nKey insights emerged:\n\n• Only 1 in 2 recipes were completed; most drop-offs happened mid-way when instructions became dense or timing felt off.\n• Users struggled with unclear step boundaries. "Am I supposed to prep now or wait?" was a common frustration.\n• The device felt unpredictable. Users weren’t sure what was happening inside the jar, leading to anxiety about ruined expensive ingredients.\n• The UI assumed total focus. In reality, cooking is social, interrupt-driven, and chaotic.',
      },
      {
        label: 'Key Design Decisions',
        content: '• The "Add to Jar" Phase: Grouped early prep steps into low-friction instructions focused on adding ingredients. Goal: reduce cognitive load at the beginning so users can start cooking quickly without parsing dense text.\n\n• Device-Led Action Stages: Introduced a clear distinction between user prep and device actions. After tapping “Start”, the device takes over heating and sautéing with explicit visual feedback. This mirrors a human sous-chef: you prep, they cook.\n\n• Parallel Prep, Not Idle Waiting: Instead of showing a static timer, the UI now prompts users to prepare for upcoming steps (chopping, fetching garnishes) while the device is active. This leverages natural multitasking habits.\n\n• Explicit Task Card States: Defined high-contrast visual states for “needs your action”, “in progress”, and “done”. This eliminated the "is it stuck?" anxiety that led to recipe abandonment.\n\n• Surface Continuous Progress: Added persistent progress indicators and always-visible core controls (pause, repeat). This allowed users to quickly recover from interruptions like phone calls or doorbells without losing their place.',
      },
      {
        label: 'Before vs After: A Day in the Kitchen',
        content: 'Previously, a user felt tethered to the device, constantly checking if they had missed a prompt or if the device was still active. In the redesigned flow, the device became a background partner.\n\nA user could start the \'Sauté\' phase, walk away to answer the door, and return to find clear instructions for the next prep step already waiting—all while feeling confident that the AI was managing the heat correctly in their absence.',
      },
      {
        label: 'Outcomes & Impact',
        content: 'The redesign led to a significant shift in how users perceived the device. Beyond the immediate jump in recipe completion, qualitative feedback highlighted a restored sense of trust. Users reported feeling that the device was "finally working with them" rather than against them. These results were validated through a mix of cohort analysis and automated interaction logs post-rollout.',
      },
      {
        label: 'What I Learned',
        content: '• Context First, UI Second: Understanding the physical environment (messy hands, steam, noise) was more valuable than pixel-perfect screens.\n• Design for Imperfection: Success depended on making the system forgiving and predictable rather than trying to make it "smarter" in isolation.\n• Simplification is Power: The most impactful changes came from clarifying the division of labor between the user and the AI.\n• Collaboration is Key: Grounding ambitious UX ideas in what could actually ship required deep alignment with the data and engineering teams.',
      },
    ],
  },
  {
    id: 'onboarding',
    title: 'Reducing Returns via Behavior-Driven Onboarding',
    role: 'Product Designer',
    duration: '1 Month',
    impact: '-7% drop rate',
    category: 'Mobile UX',
    teamType: 'Growth Design Squad',
    accent: 'oklch(58% 0.12 42)',
    bg: 'oklch(96% 0.03 42)',
    emoji: '📱',
    framerUrl: 'https://productgrowthsoupriti.framer.website/7-day-learning-experience',
    tags: ['Onboarding UX', 'Behavioral Design', 'Retention'],
    overview: 'Designed a 7-day progressive learning experience that guides users through features step-by-step, reducing drop-off and returns by 7% in the crucial first week.',
    sections: [
      {
        label: 'Problem',
        content: 'A significant portion of users were returning the product within the first week because onboarding did not set expectations or build early cooking habits.',
      },
      {
        label: 'Approach',
        content: 'Designed a behavior-driven journey presenting progressive milestones, personalized setup prompts, and timely alerts before the return window closed.',
      },
      {
        label: 'Outcome',
        content: '• 7% reduction in returns and early churn\n• Improved D7 retention metrics\n• Faster path to the primary product habit loop',
      },
    ],
  },
  {
    id: 'airfryer',
    title: 'Designing a Smart Air Fryer Experience',
    role: 'Product Designer',
    duration: '10 Months',
    impact: 'Faster adoption',
    category: 'Consumer IoT',
    teamType: 'Cross-functional Team',
    accent: 'oklch(62% 0.14 60)',
    bg: 'oklch(96% 0.03 60)',
    emoji: '✈️',
    framerUrl: 'https://productgrowthsoupriti.framer.website/airfryer',
    tags: ['IoT UX', 'Interaction Design', 'Outcome-driven'],
    overview: 'Shifted interface parameters from complex temperature inputs to intuitive outcome-driven texture selections — crispy, juicy, golden — for stress-free adoption.',
    sections: [
      {
        label: 'Problem',
        content: 'Traditional air fryer interfaces forced users to guess time and temperature parameters, creating cooking anxiety and highly inconsistent meals.',
      },
      {
        label: 'Solution',
        content: 'Redesigned core inputs to target desired textures (Crispy, Golden, Juicy), backed by smart adaptive progress loops and quick-adjust manual overrides.',
      },
      {
        label: 'Impact',
        content: '• Faster product adoption and recipe experimentation\n• Lower overcook support tickets\n• Elevated first-cook satisfaction scores',
      },
    ],
  },
  {
    id: 'medpod',
    title: 'Medpod — Smart Medication Pod for Elderly',
    role: 'Product Designer',
    duration: '6 Months',
    impact: 'Accessibility-first',
    category: 'HealthTech',
    teamType: '0→1 Experience',
    accent: 'oklch(62% 0.11 150)',
    bg: 'oklch(96% 0.03 150)',
    emoji: '💊',
    framerUrl: 'https://productgrowthsoupriti.framer.website/medpod',
    tags: ['Elderly UX', 'Hardware IoT', 'Accessibility'],
    overview: 'Designed a smart medicine dispenser experience focusing on elderly cognitive/motor limits, error prevention, and automated caregiver reassurance loops.',
    sections: [
      {
        label: 'Challenge',
        content: 'Elderly users struggle with complex schedules, memory constraints, and hard-to-read labels, while caregivers lack structured tracking without intrusive check-ins.',
      },
      {
        label: 'Design Approach',
        content: 'Large tactile touch targets, simple voice-confirmation loops, calming notification color indicators, and remote status dashboards for family peace of mind.',
      },
      {
        label: 'Key Decisions',
        content: 'Substituted small visual confirmation targets with spoken prompts and utilized distinct amber-glow alert states to alleviate anxiety.',
      },
    ],
  },
  {
    id: 'battle-pass',
    title: 'Battle Pass Progression for LILA Games',
    role: 'Game UX Designer',
    duration: '3 Months',
    impact: 'Engagement loops',
    category: 'Gaming UX',
    teamType: 'Core Mechanics Team',
    accent: 'oklch(58% 0.14 300)',
    bg: 'oklch(96% 0.02 300)',
    emoji: '🎮',
    framerUrl: 'https://productgrowthsoupriti.framer.website/battle-pass-system',
    tags: ['Gamification', 'Progression Systems', 'Reward UX'],
    overview: 'Designed a progression-driven battle pass featuring intuitive milestone anticipation, mission tracking, and seamless reward upgrade interactions.',
    sections: [
      {
        label: 'Goal',
        content: 'Craft a highly engaging battle pass experience that increases active play retention and purchase conversion without resorting to deceptive practices.',
      },
      {
        label: 'System Design',
        content: 'Clear effort-to-reward metrics, visually distinct milestone progression trails, delightful animated chest openings, and honest pricing transparency.',
      },
      {
        label: 'Outcome',
        content: '• Better player returning rates through meaningful progression\n• High satisfaction on reward claims and tier upgrades',
      },
    ],
  },
  {
    id: 'mcb-school',
    title: 'Imagination-Led MCB School Portal',
    role: 'UI/UX Designer',
    duration: '4 Months',
    impact: 'Brand transformation',
    category: 'EdTech',
    teamType: 'Small Studio Squad',
    accent: 'oklch(60% 0.12 220)',
    bg: 'oklch(96% 0.02 220)',
    emoji: '🏫',
    framerUrl: 'https://productgrowthsoupriti.framer.website/works',
    tags: ['Brand Identity', 'UI Design', 'Digital Portal'],
    overview: 'Transformed traditional learning documentation into an imagination-driven digital experience for students, featuring friendly layouts and clear parental guides.',
    sections: [
      {
        label: 'Brief',
        content: 'MCB School wanted a modernized digital presence matching their creative philosophy: that learning must be joyful, collaborative, and student-first.',
      },
      {
        label: 'Design Direction',
        content: 'Created a warm, visual language, approachable copy, simplified student-parent navigation modules, and highly responsive page layouts.',
      },
      {
        label: 'Impact',
        content: '• Strong brand modernization signals\n• Double-digit increase in digital admission inquiries\n• Positive parental user test scores',
      },
    ],
  },
  {
    id: 'doctorite',
    title: 'Doctorite — Operational Hospital Dashboard',
    role: 'Product Designer',
    duration: '8 Months',
    impact: '+94% efficiency',
    category: 'HealthTech SaaS',
    teamType: 'Dashboard Operations',
    accent: 'oklch(48% 0.14 165)',
    bg: 'oklch(96% 0.03 165)',
    emoji: '🏥',
    cardImage: '/projects/healthcare.png',
    coverImage: '/projects/healthcare.png',
    framerUrl: 'https://productgrowthsoupriti.framer.website/works',
    tags: ['SaaS Dashboard', 'Data Visualization', 'Operations'],
    overview: 'Designed a real-time clinical control deck surfacing key case metrics, pipelines, and patient transfers — giving administrators instant clarity.',
    sections: [
      {
        label: 'Problem',
        content: 'Operational staff juggled 4+ distinct legacy applications, delaying response times and leading to critical cases getting delayed.',
      },
      {
        label: 'Approach',
        content: 'Unified active patient flows, occupancy graphs, staff ratios, and response trackers into a single desktop dashboard with high data density.',
      },
      {
        label: 'Impact',
        content: '• Surge to 94% clinician tracking accuracy\n• Reduced case transfer queries from 5 screens to 1 glance\n• Strong praise for operational speed during medical tests',
      },
    ],
  },
]

/* ── Upright Bookshelf Book Component ── */
function BookshelfBook({ project, isHovered, onHover, onClick }) {
  return (
    <div 
      className={`bookshelf-book-container ${isHovered ? 'book-expanded' : ''}`}
      onMouseEnter={onHover}
      onClick={onClick}
      style={{
        '--book-accent': isHovered ? 'var(--accent)' : 'var(--border)',
        '--book-bg': 'var(--bg-card)',
      }}
    >
      <div className="bookshelf-book-3d">
        
        {/* Book Spine (Quiet grey unselected, dynamic electric blue active) */}
        <div 
          className="book-spine-face"
          style={{
            background: isHovered ? 'var(--accent)' : 'var(--bg-card)',
            color: isHovered ? '#ffffff' : 'var(--text-secondary)',
            border: isHovered ? '1px solid var(--accent)' : '1px solid var(--border)',
            boxShadow: isHovered ? 'none' : 'inset -2px 0 5px rgba(0,0,0,0.04)',
            borderRadius: '4px 0 0 4px',
          }}
        >
          {isHovered ? (
            <>
              <span className="spine-emoji">{project.emoji}</span>
              <span className="spine-title">{project.category}</span>
              <span className="spine-impact">{project.impact}</span>
            </>
          ) : (
            <span className="spine-title-quiet">{project.category}</span>
          )}
        </div>

        {/* Book Cover (Vibrant design system Electric Blue active cover layout!) */}
        <div 
          className="book-cover-face"
          style={{
            background: 'var(--bg-card)',
            border: '2px solid var(--accent)',
            borderRadius: '0 8px 8px 0',
          }}
        >
          <div className="cover-glow" style={{ background: 'var(--accent)' }} />
          
          <div className="cover-header">
            <span className="cover-category" style={{ color: 'var(--accent)' }}>{project.category.toUpperCase()}</span>
            <span className="cover-emoji">{project.emoji}</span>
          </div>

          <h3 className="cover-title">{project.title}</h3>

          <div className="cover-meta-row">
            <span className="cover-role-label">{project.role}</span>
            <span className="cover-meta-dot">·</span>
            <span className="cover-duration-label">{project.duration}</span>
          </div>

          <p className="cover-overview">{project.overview}</p>

          {/* Embedded design tags - Sharp corners */}
          <div className="cover-tags-row">
            {project.tags?.slice(0, 3).map((t) => (
              <span key={t} className="cover-tag-pill">{t}</span>
            ))}
          </div>

          <div className="cover-footer">
            <div className="cover-impact-badge" style={{ background: 'rgba(0, 82, 255, 0.06)', border: '1px solid rgba(0, 82, 255, 0.15)', color: 'var(--accent)' }}>
              {project.impact}
            </div>
            <span className="cover-action-cta" style={{ color: 'var(--accent)' }}>Read Case Study ↗</span>
          </div>
        </div>

        {/* Book Pages Thickness Edge */}
        <div className="book-pages-face" />
      </div>
    </div>
  )
}

/* ── Full-Page Case Study Overlay View ── */
function CaseStudyPage({ project, onClose, onNextProject }) {
  const contentRef = useRef(null)
  const [readProgress, setReadProgress] = useState(0)
  const [scrolled, setScrolled] = useState(false)

  // Sync scroll lock on open
  useEffect(() => {
    window.__lenis?.stop()
    return () => window.__lenis?.start()
  }, [])

  // Calculate reading progress as the modal scrolls
  const handleScroll = (e) => {
    const el = e.currentTarget
    const totalHeight = el.scrollHeight - el.clientHeight
    if (totalHeight > 0) {
      setReadProgress(el.scrollTop / totalHeight)
    }
    setScrolled(el.scrollTop > 40)
  }

  // Calculate next project loop index
  const nextProjectIndex = (PROJECTS.findIndex(p => p.id === project.id) + 1) % PROJECTS.length
  const nextProj = PROJECTS[nextProjectIndex]

  // Light/Dark Local theme state inside case study detail
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light'
  })

  const toggleTheme = (nextTheme) => {
    const targetTheme = nextTheme || (theme === 'light' ? 'dark' : 'light')
    setTheme(targetTheme)
    document.documentElement.setAttribute('data-theme', targetTheme)
    localStorage.setItem('theme', targetTheme)
  }

  return (
    <div
      data-lenis-prevent
      onScroll={handleScroll}
      className="case-study-overlay"
      style={{
        position: 'fixed',
        inset: 0,
        background: theme === 'dark' ? '#0d0f12' : '#ffffff',
        zIndex: 9999,
        overflowY: 'auto',
        color: theme === 'dark' ? '#f3f4f6' : '#1f2937',
        scrollBehavior: 'smooth',
      }}
    >
      {/* ── Fixed Reader Progress bar ── */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: 3,
          background: 'var(--accent)',
          width: `${readProgress * 100}%`,
          zIndex: 10001,
          boxShadow: '0 0 8px var(--accent)',
          transition: 'width 0.1s ease',
        }}
      />

      {/* ── Nav Bar Pill with Back Action inside ── */}
      <div 
        style={{
          position: 'fixed',
          top: 20,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'auto',
          maxWidth: 'calc(100vw - 32px)',
          zIndex: 10000,
          transition: 'transform 0.4s var(--ease-out-expo), box-shadow 0.3s ease',
        }}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '6px 8px 6px 8px',
          background: theme === 'dark' 
            ? (scrolled ? 'rgba(24, 26, 31, 0.96)' : 'rgba(24, 26, 31, 0.85)')
            : (scrolled ? 'rgba(255, 255, 255, 0.96)' : 'rgba(255, 255, 255, 0.85)'),
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRadius: 'var(--radius-pill)',
          border: '1px solid var(--border)',
          boxShadow: scrolled ? 'var(--shadow-md)' : 'var(--shadow-sm)',
        }}>
          
          {/* Back Action button inside nav pill */}
          <button
            onClick={onClose}
            aria-label="Back to portfolio shelf"
            className="case-nav-back-btn-pill"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '6px 14px',
              borderRadius: 'var(--radius-pill)',
              background: 'var(--accent)',
              color: 'white',
              fontFamily: 'var(--font-mono)',
              fontWeight: 700,
              fontSize: 10.5,
              border: 'none',
              cursor: 'pointer',
              transition: 'background 0.2s, transform 0.2s',
              outline: 'none',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
            }}
          >
            ← BACK TO SHELF
          </button>

          {/* Active project tag details */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '0 8px' }}>
            <span style={{ fontSize: 13 }}>{project.emoji}</span>
            <span style={{ fontSize: 11, fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              {project.category}
            </span>
          </div>

          {/* Next Project Nav inside pill */}
          <button 
            onClick={() => {
              if (contentRef.current) contentRef.current.scrollTop = 0
              onNextProject(nextProj)
            }}
            className="case-nav-btn-next"
          >
            Next Project ↗
          </button>

          <div style={{ width: 1, height: 20, background: 'var(--border)', margin: '0 4px', opacity: 0.6 }} />

          {/* Local theme switch toggle */}
          <div
            className="theme-toggle-pill-embedded"
            style={{
              height: 32,
              width: 105,
              borderRadius: 16,
              display: 'flex',
              alignItems: 'center',
              background: theme === 'dark' 
                ? 'rgba(255, 255, 255, 0.08)'
                : 'rgba(0, 0, 0, 0.04)',
              border: '1px solid var(--border)',
              padding: 2,
              position: 'relative',
              userSelect: 'none',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 2,
                bottom: 2,
                left: theme === 'light' ? 2 : 'calc(50% + 1px)',
                width: 'calc(50% - 3px)',
                borderRadius: 13,
                background: theme === 'dark' ? 'rgba(255, 255, 255, 0.15)' : '#ffffff',
                boxShadow: theme === 'dark' 
                  ? '0 1px 3px rgba(0, 0, 0, 0.3)' 
                  : '0 1px 3px rgba(0, 0, 0, 0.08)',
                transition: 'left 0.3s cubic-bezier(0.16, 1, 0.3, 1), background 0.3s',
                zIndex: 1,
              }}
            />

            <button
              onClick={() => toggleTheme('light')}
              className="case-nav-btn-action"
              style={{
                flex: 1, height: '100%', border: 'none', background: 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: theme === 'light' ? 'var(--text-primary)' : 'var(--text-secondary)',
                fontSize: 9, fontWeight: 700, cursor: 'pointer', zIndex: 2, outline: 'none', padding: 0
              }}
            >☀️ Light</button>

            <button
              onClick={() => toggleTheme('dark')}
              className="case-nav-btn-action"
              style={{
                flex: 1, height: '100%', border: 'none', background: 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: theme === 'dark' ? 'var(--text-primary)' : 'var(--text-secondary)',
                fontSize: 9, fontWeight: 700, cursor: 'pointer', zIndex: 2, outline: 'none', padding: 0
              }}
            >🌙 Dark</button>
          </div>
        </div>
      </div>

      {/* Case Study Scrollable Content */}
      <div 
        ref={contentRef}
        style={{
          width: '100%',
          maxWidth: '920px',
          margin: '0 auto',
          padding: '120px 24px 100px 24px',
        }}
      >
        {/* Category Label */}
        <span style={{
          fontSize: '11px',
          fontWeight: 700,
          letterSpacing: '0.15em',
          color: 'var(--accent)',
          fontFamily: 'var(--font-mono)',
          textTransform: 'uppercase',
          display: 'block',
          marginBottom: 'var(--space-3)'
        }}>
          {project.category} · {project.teamType}
        </span>

        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(28px, 4.5vw, 52px)',
          fontWeight: 400,
          letterSpacing: '-0.025em',
          lineHeight: 1.15,
          color: theme === 'dark' ? '#ffffff' : 'var(--text-primary)',
          margin: '0 0 var(--space-4) 0',
        }}>
          {project.title}
        </h1>

        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 'var(--space-4)',
          alignItems: 'center',
          fontSize: '14px',
          color: theme === 'dark' ? '#9ca3af' : 'var(--text-secondary)',
          borderBottom: '1px solid var(--border)',
          paddingBottom: 'var(--space-6)',
          marginBottom: 'var(--space-8)',
        }}>
          <span>Role: <strong style={{ color: theme === 'dark' ? '#e5e7eb' : 'var(--text-primary)' }}>{project.role}</strong></span>
          <span>•</span>
          <span>Duration: <strong style={{ color: theme === 'dark' ? '#e5e7eb' : 'var(--text-primary)' }}>{project.duration}</strong></span>
          <span>•</span>
          <span>Impact: <strong style={{ color: 'var(--accent)' }}>{project.impact}</strong></span>
        </div>

        {/* Render Cover image if present */}
        {project.coverImage && (
          <div style={{
            width: '100%',
            height: 'clamp(220px, 35vw, 420px)',
            borderRadius: '24px',
            overflow: 'hidden',
            marginBottom: 'var(--space-9)',
            border: '1px solid var(--border)',
            boxShadow: 'var(--shadow-sm)',
            background: 'var(--bg-warm)',
          }}>
            <img 
              src={project.coverImage} 
              alt={project.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </div>
        )}

        {/* Narrative sections */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
          {project.sections?.map((sec, i) => (
            <div 
              key={sec.label}
              style={{
                animation: `pageIn 0.5s ease-out ${i * 60}ms both`,
              }}
            >
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '22px',
                fontWeight: 500,
                color: theme === 'dark' ? '#ffffff' : 'var(--text-primary)',
                marginBottom: 'var(--space-4)',
                letterSpacing: '-0.015em',
              }}>
                {sec.label}
              </h3>
              <p style={{
                fontSize: '16px',
                lineHeight: 1.75,
                color: theme === 'dark' ? '#d1d5db' : 'var(--text-secondary)',
                whiteSpace: 'pre-line',
                margin: 0,
              }}>
                {sec.content}
              </p>
            </div>
          ))}
        </div>

        {/* Framing call to action */}
        {project.framerUrl && (
          <div style={{
            marginTop: '80px',
            borderTop: '1px solid var(--border)',
            paddingTop: '40px',
            textAlign: 'center',
          }}>
            <a
              href={project.framerUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '16px 36px',
                background: 'var(--accent)',
                color: '#ffffff',
                borderRadius: 'var(--radius-pill)',
                fontSize: 15,
                fontWeight: 600,
                textDecoration: 'none',
                boxShadow: '0 4px 16px rgba(0, 82, 255, 0.25)',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 82, 255, 0.4)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 82, 255, 0.25)'; }}
            >
              Explore live interactive study ↗
            </a>
          </div>
        )}
      </div>

      <style>{`
        @keyframes pageIn { from { opacity: 0; transform: translateY(36px); } to { opacity: 1; transform: translateY(0); } }
        
        .case-nav-btn-action {
          transition: transform 120ms cubic-bezier(0.16, 1, 0.3, 1), color 0.2s ease !important;
        }
        .case-nav-btn-action:hover {
          background: var(--bg-warm) !important;
          color: var(--text-primary) !important;
          transform: translateY(-1px) scale(1.03);
        }
        .case-nav-btn-action:active {
          transform: translateY(0) scale(0.95) !important;
        }

        .case-nav-back-btn-pill {
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }
        .case-nav-back-btn-pill:hover {
          background: var(--accent-light) !important;
          transform: translateY(-1px) scale(1.04);
          box-shadow: 0 4px 12px rgba(0, 82, 255, 0.2);
        }
        .case-nav-back-btn-pill:active {
          transform: translateY(0) scale(0.96) !important;
        }

        .case-nav-btn-next {
          border: none;
          cursor: pointer;
          font-size: 11px;
          font-weight: 700;
          font-family: var(--font-mono);
          padding: 6px 14px;
          background: var(--accent) !important;
          color: white !important;
          border-radius: var(--radius-pill);
          transition: transform 150ms cubic-bezier(0.16, 1, 0.3, 1), background-color 200ms ease, box-shadow 200ms ease !important;
          white-space: nowrap;
          letter-spacing: -0.01em;
          display: inline-block;
          text-decoration: none;
        }

        .case-nav-btn-next:hover {
          background: var(--accent-light) !important;
          transform: translateY(-1px) scale(1.03);
          box-shadow: 0 4px 12px rgba(0, 82, 255, 0.2);
        }

        .case-nav-btn-next:active {
          transform: translateY(0) scale(0.95) !important;
        }
      `}</style>
    </div>
  )
}

export default function Projects({ activeProject, setActiveProject }) {
  // Synchronized active book index
  const [activeProjIndex, setActiveProjIndex] = useState(0)

  return (
    <>
      <div 
        id="projects" 
        style={{ 
          position: 'relative',
          background: 'var(--bg)',
          paddingTop: '100px',
          paddingBottom: '160px',
          overflow: 'hidden',
        }}
        className="projects-wrapper-container"
      >
        {/* Header */}
        <div className="container" style={{ position: 'relative', zIndex: 10, marginBottom: '60px' }}>
          <FadeUp>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
              <div>
                <Label>Showcase</Label>
                <h2 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(32px, 3.8vw, 46px)',
                  fontWeight: 400,
                  letterSpacing: '-0.025em',
                  lineHeight: 1.15,
                  color: 'var(--text-primary)',
                  marginTop: '16px',
                }}>
                  The Design<br />
                  <span style={{ color: 'var(--accent)' }}>Bookshelf.</span>
                </h2>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 8, fontFamily: 'var(--font-body)', opacity: 0.8 }}>
                  Hover over a book on the shelf to slide it out and reveal its cover, metrics, and details.
                </p>
              </div>
            </div>
          </FadeUp>
        </div>

        {/* ── Immersive Breathable Full-Width Bookshelf ── */}
        <div className="container" style={{ position: 'relative', zIndex: 20 }}>
          <div className="bookshelf-layout-grid-refined">
            
            {/* Full-Width Refined Horizontal Bookshelf */}
            <div className="bookshelf-shelf-wood-refined">
              <div className="bookshelf-row-books-refined">
                {PROJECTS.map((p, i) => {
                  const isHovered = activeProjIndex === i
                  return (
                    <BookshelfBook 
                      key={p.id}
                      project={p}
                      isHovered={isHovered}
                      onHover={() => setActiveProjIndex(i)}
                      onClick={() => setActiveProject(p)}
                    />
                  )
                })}


              </div>
              
              {/* Crisp Black Shelf Line Plinth */}
              <div className="shelf-bar-plinth-refined">
                <div className="shelf-shadow-edge-refined" />
                <div className="shelf-surface-refined" />
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Case study overlay */}
      {activeProject && (
        <CaseStudyPage 
          project={activeProject} 
          onClose={() => setActiveProject(null)} 
          onNextProject={(nextP) => setActiveProject(nextP)}
        />
      )}

      <style>{`
        /* ── Breathable Bookshelf Layout ── */
        .bookshelf-layout-grid-refined {
          display: block;
          width: 100%;
          min-height: 400px;
        }

        /* ── Breathable Horizontal Bookshelf ── */
        .bookshelf-shelf-wood-refined {
          width: 100%;
          position: relative;
          padding-bottom: 24px;
        }

        .bookshelf-row-books-refined {
          display: flex;
          align-items: flex-end;
          justify-content: flex-start;
          gap: 12px;
          min-height: 380px;
          padding: 0 16px;
          perspective: 1500px;
        }

        /* Sharp Black Shelf Plinth Line */
        .shelf-bar-plinth-refined {
          position: relative;
          width: 100%;
          height: 6px;
          background: #000000;
          margin-top: -2px;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
        }

        .shelf-surface-refined {
          position: absolute;
          inset: 0;
          background: #000000;
        }

        .shelf-shadow-edge-refined {
          position: absolute;
          top: -6px;
          left: 0;
          right: 0;
          height: 6px;
          background: rgba(0, 0, 0, 0.03);
          filter: blur(2px);
        }

        /* ── Refined Larger 3D Book Container ── */
        .bookshelf-book-container {
          width: 65px;
          height: 360px;
          position: relative;
          cursor: pointer;
          perspective: 1200px;
          transition: width 0.45s cubic-bezier(0.16, 1, 0.3, 1), transform 0.3s;
          transform-style: preserve-3d;
          flex-shrink: 0;
        }

        .bookshelf-book-container:hover,
        .book-expanded {
          width: 440px;
        }

        .bookshelf-book-3d {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
          transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
          transform: rotateY(-24deg) rotateX(1deg);
          transform-origin: bottom left;
        }

        .bookshelf-book-container:hover .bookshelf-book-3d,
        .book-expanded .bookshelf-book-3d {
          transform: rotateY(0deg) translateZ(20px) translateY(-10px);
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.15);
        }

        /* Spine Face */
        .book-spine-face {
          position: absolute;
          width: 65px;
          height: 100%;
          box-shadow: inset -3px 0 6px rgba(0,0,0,0.15);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          padding: 24px 0;
          z-index: 5;
          backface-visibility: hidden;
          transition: opacity 0.2s, transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), background 0.3s, color 0.3s;
        }

        .spine-title {
          writing-mode: vertical-rl;
          transform: rotate(180deg);
          font-family: var(--font-display);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          white-space: nowrap;
          opacity: 0.9;
          margin: 10px 0;
        }

        .spine-title-quiet {
          writing-mode: vertical-rl;
          transform: rotate(180deg);
          font-family: var(--font-display);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          white-space: nowrap;
          opacity: 0.6;
          margin: auto 0;
        }

        .spine-emoji {
          font-size: 22px;
          display: block;
        }

        .spine-impact {
          font-size: 9.5px;
          font-family: var(--font-mono);
          font-weight: 600;
          opacity: 0.9;
        }

        /* Spine rotates out of sight on hover */
        .bookshelf-book-container:hover .book-spine-face,
        .book-expanded .book-spine-face {
          transform: rotateY(-90deg) translateZ(32px);
          opacity: 0;
          pointer-events: none;
        }

        /* Cover Face (Giant Detailed Card on Book) */
        .book-cover-face {
          position: absolute;
          inset: 0;
          z-index: 4;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 32px;
          box-shadow: inset 4px 0 12px rgba(255,255,255,0.45), 4px 4px 24px rgba(0,0,0,0.08);
          opacity: 0;
          transition: opacity 0.25s ease, transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
          pointer-events: none;
        }

        .bookshelf-book-container:hover .book-cover-face,
        .book-expanded .book-cover-face {
          opacity: 1;
          pointer-events: auto;
        }

        .cover-glow {
          position: absolute;
          width: 120px;
          height: 120px;
          filter: blur(48px);
          opacity: 0.08;
          top: -30px;
          right: -30px;
          pointer-events: none;
        }

        .cover-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .cover-category {
          font-family: var(--font-mono);
          font-size: 9.5px;
          font-weight: 700;
          letter-spacing: 0.12em;
        }

        .cover-emoji {
          font-size: 28px;
        }

        .cover-title {
          font-family: var(--font-display);
          font-size: 21px;
          font-weight: 600;
          color: var(--text-primary);
          line-height: 1.35;
          margin: 12px 0 6px 0;
          letter-spacing: -0.020em;
        }

        .cover-meta-row {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11.5px;
          font-family: var(--font-body);
          color: var(--text-secondary);
          margin-bottom: 12px;
          opacity: 0.85;
        }

        .cover-meta-dot {
          opacity: 0.5;
        }

        .cover-overview {
          font-size: 13px;
          line-height: 1.6;
          color: var(--text-secondary);
          margin: 0 0 16px 0;
          opacity: 0.9;
        }

        .cover-tags-row {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 20px;
        }

        .cover-tag-pill {
          font-size: 10px;
          font-weight: 500;
          color: var(--text-secondary);
          background: var(--bg-warm);
          border: 1px solid var(--border);
          padding: 3px 8px;
          border-radius: 4px;
          font-family: var(--font-body);
        }

        .cover-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid var(--border);
          padding-top: 16px;
        }

        .cover-impact-badge {
          font-size: 10px;
          font-weight: 600;
          font-family: var(--font-mono);
          padding: 4px 10px;
          border-radius: 4px;
        }

        .cover-action-cta {
          font-size: 11.5px;
          font-weight: 700;
          cursor: pointer;
        }

        /* Thick inner page edges */
        .book-pages-face {
          position: absolute;
          width: 20px;
          height: 96%;
          top: 2%;
          right: 0;
          background: #fdfdf9;
          border: 1px solid #d5d4ca;
          border-radius: 0 4px 4px 0;
          transform: rotateY(90deg) translateZ(10px);
          z-index: 3;
          background-image: linear-gradient(to right, #f7f7f0 80%, #e1e0d5 100%);
        }

        /* ── Responsive Bookshelf Styles ── */
        @media (max-width: 900px) {
          .bookshelf-row-books-refined {
            justify-content: flex-start !important;
            overflow-x: auto !important;
            padding-bottom: 12px !important;
            gap: 16px !important;
            min-height: 380px !important;
            width: 100% !important;
          }

          .bookshelf-book-container {
            width: 65px !important;
          }

          .bookshelf-book-container:hover,
          .book-expanded {
            width: 320px !important;
          }
        }
      `}</style>
    </>
  )
}
