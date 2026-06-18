import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FadeUp, Label } from './utils'
import Footer from './Footer'
import Contact from './Contact'

/* ── Narrative Case Studies Database (Airfryer Removed) ── */
export const PROJECTS = [
  {
    id: 'search-to-intent',
    title: 'Search to Intent',
    role: 'Lead Product Designer',
    duration: '1 Month',
    impact: 'Generative Discovery',
    category: 'AI Product',
    teamType: 'AI Experience Design',
    accent: '#8b5cf6',
    bg: '#f5f3ff',
    emoji: '🤖',
    categoryGroup: 'AI Product',
    tabColor: '#8b5cf6',
    coverImage: '/projects/search_to_intent_cover.png',
    cardImage: '/projects/search_to_intent_cover.png',
    tags: ['AI Product Design', 'Generative UI', 'Contextual Discovery', 'Mobile App', 'Shift'],
    overview: 'Transformed recipe discovery from keyword-based search into an AI-powered cooking companion, helping users find recipes through natural conversations and social media.',
    mockups: [
      '/projects/search_to_intent_slide_2.png',
      '/projects/search_to_intent_slide_3.png',
      '/projects/search_to_intent_slide_6.png',
      '/projects/search_to_intent_slide_9.png',
      '/projects/search_to_intent_slide_10.png',
      '/projects/search_to_intent_slide_12.png',
      '/projects/search_to_intent_mockup1.png',
      '/projects/search_to_intent_mockup2.jpg'
    ],
    sections: []
  },
  {
    id: 'ai-cooking',
    title: 'Rethinking AI Cooking Experience',
    role: 'Product Designer',
    duration: '9 Months',
    impact: '+24% efficiency',
    category: 'AI Product',
    teamType: '0→1 Experience',
    accent: '#0052ff',
    bg: '#f8fafc',
    emoji: '🍳',
    categoryGroup: 'AI Product',
    tabColor: '#0052ff',
    framerUrl: 'https://productgrowthsoupriti.framer.website/ai-cooking-experience-redesign',
    coverImage: '/projects/ai_cooking_cover.avif',
    cardImage: '/projects/ai_cooking_cover.avif',
    tags: ['AI UX', 'Mobile UX', 'Design System', 'User Research', 'Shift'],
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
    id: 'toothlens',
    title: 'Toothlens — AI Dental Scan Platform',
    role: 'Lead Product Designer',
    duration: '6 Months',
    impact: 'AI Diagnostic Flow',
    category: 'AI Product',
    teamType: '0→1 Experience',
    accent: '#3b82f6',
    bg: '#eff6ff',
    emoji: '🦷',
    categoryGroup: 'AI Product',
    tabColor: '#3b82f6',
    coverImage: '/projects/toothlens_cover.png',
    cardImage: '/projects/toothlens_cover.png',
    tags: ['AI UX', 'SaaS Dashboard', 'Mobile App', 'Dental Tech'],
    overview: 'Designed the mobile patient scanning interface and the dentist analysis dashboard, utilizing AI-driven image validation to make dental checkups accessible from home.',
    sections: [
      {
        label: 'Context & Problem',
        content: 'Dental checkups are often delayed due to high costs, lack of insurance, or clinical anxiety. Toothlens was designed as an AI-powered smartphone scanning app that allows patients to scan their teeth at home. The key challenge was guiding patients to take high-quality mouth photos that the AI model could accurately process, and designing a clear dashboard for dentists to review the results.'
      },
      {
        label: 'Design Approach',
        content: 'I designed a step-by-step smart capture interface with real-time feedback (such as "Align your teeth", "Increase lighting") to minimize error states. For dentists, I created a web dashboard that visualizes the AI-detected risk levels per tooth, logs historic scans, and generates printable patient reports.'
      },
      {
        label: 'Impact & Outcomes',
        content: '• Guided flow reduced image rejection rates by 38%.\n• Average home checkup completion time dropped to under 3 minutes.\n• High satisfaction from partner dental clinics using the diagnostics board.'
      }
    ],
    mockups: [
      '/projects/toothlens_login.png',
      '/projects/toothlens_accounts.png',
      '/projects/toothlens_mockup1.png',
      '/projects/toothlens_guid.png',
      '/projects/toothlens_camera_capture.png',
      '/projects/toothlens_mockup2.png',
      '/projects/toothlens_notifications.png',
      '/projects/toothlens_reports.png'
    ]
  },
  {
    id: 'onboarding',
    title: 'Reducing Returns via Behavior-Driven Onboarding',
    role: 'Product Designer',
    duration: '1 Month',
    impact: '-7% drop rate',
    category: 'Mobile UX',
    teamType: 'Growth Design Squad',
    accent: '#fb923c',
    bg: '#fff7ed',
    emoji: '📱',
    categoryGroup: '0-1 & END TO end projects',
    tabColor: '#fb923c',
    framerUrl: 'https://productgrowthsoupriti.framer.website/7-day-learning-experience',
    coverImage: '/projects/onboarding_cover.png',
    cardImage: '/projects/onboarding_cover.png',
    tags: ['Onboarding UX', 'Behavioral Design', 'Retention'],
    overview: 'Designed a 7-day progressive learning experience that guides users through features step-by-step, reducing drop-off and returns by 7% in the crucial first week.',
    mockups: [
      '/projects/onboarding_mockup1.jpg',
      '/projects/onboarding_mockup2.jpg'
    ],
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
    id: 'phonepe',
    title: 'PhonePe — Internal Employee Portal',
    role: 'Product Designer',
    duration: '3 Months',
    impact: 'Workspace Automation',
    category: 'Enterprise UX',
    teamType: 'Internal System Squad',
    accent: '#5f259f',
    bg: '#f5f0fa',
    emoji: '💼',
    categoryGroup: '0-1 & END TO end projects',
    tabColor: '#5f259f',
    coverImage: '/projects/phonepe_cover.png',
    cardImage: '/projects/phonepe_cover.png',
    tags: ['Enterprise UX', 'Internal Tools', 'Design System'],
    overview: 'Streamlined employee operations and internal service desk ticketing, creating a unified portal that reduced support resolution times.',
    sections: [
      {
        label: 'Context & Problem',
        content: 'Internal teams at PhonePe managed employee onboarding, asset requests, and HR tickets across fragmented, legacy enterprise applications. This caused delays and operational friction. My task was to design a single, unified employee portal that automated routine requests and gave HR managers a centralized control dashboard.'
      },
      {
        label: 'Solution',
        content: 'I designed a modular ticketing and request dashboard with custom widgets for approvals, IT asset tracking, and personal settings. I utilized PhonePe\'s design tokens to ensure visual consistency across all enterprise internal tools.'
      },
      {
        label: 'Impact',
        content: '• Reduced HR ticket resolution time by 32%.\n• Automated 70% of routine hardware allocation approvals.\n• Simplified the employee onboarding queue from 5 screens down to a single workspace view.'
      }
    ],
    mockups: ['/projects/phonepe_mockup.png']
  },
  {
    id: 'graduation-project',
    title: 'Graduation Project — Spatial Booking App',
    role: 'Lead UI/UX Designer',
    duration: '4 Months',
    impact: 'Spatial Preview Integration',
    category: 'Spatial Design & Mobile App',
    teamType: 'End-to-End Individual Project',
    accent: '#0052ff',
    bg: '#f8fafc',
    emoji: '🏠',
    categoryGroup: '0-1 & END TO end projects',
    tabColor: '#0052ff',
    coverImage: '/projects/booking_landing_page.png',
    cardImage: '/projects/booking_landing_page.png',
    tags: ['Spatial UI', 'Mobile UX', 'Try-Before-Commit', 'Rental Search'],
    overview: 'An end-to-end spatial booking platform concept (inspired by Apple Vision Pro UI design for booking.com), designed to solve the critical trust gap in rental house discovery.',
    sections: [
      {
        label: 'Context & Origin Story',
        content: 'This project was born out of personal frustration. During my internships, I faced the recurring headache of finding and choosing a rental house. Online listings would show beautiful, wide-angle photos of spaces with promises of no brokers and a clean setup. In reality, once I visited in person, the spaces were cramped, dimly lit, and disappointing. The experience was constantly underwhelming and stressful.\n\nI realized that traditional photo galleries create a massive trust gap. Users waste valuable time committing to visit a place physically, only to realize within seconds that the images did not reflect reality. This scheduling friction wastes time for the prospect, the property owners, and the brokers.'
      },
      {
        label: 'The Challenge & Friction Loop',
        content: 'Additionally, when a current tenant is set to leave a house in a month, brokers frequently bring multiple prospective tenants to view the property while it is still occupied. This results in significant time waste, disruption of privacy for current residents, and scheduling overhead. \n\nHow can we use technology to make the remote home preview experience feel so real that users can confidently pre-evaluate or even commit to a space without physically visiting? How can we reduce scheduling waste for all three stakeholders: owners, brokers, and renters?'
      },
      {
        label: 'The Spatial Vision (Vision Pro + iOS)',
        content: 'To bridge this trust gap, I explored spatial computing design paradigms. Drawing inspiration from Apple Vision Pro\'s immersive canvas, I designed an iOS/Spatial Booking App concept that brings properties closer to users. \n\nBy leveraging immersive spatial tours, interactive 3D floorplans, and real-time volumetric light analysis (letting users see exactly how much sunlight a room gets at 10:00 AM vs 4:00 PM), the app delivers a true "try-before-commit" experience. This spatial realism allows renters to filter out unsuitable spaces instantly, protecting occupied homes from constant physical viewings and streamlining the leasing pipeline.'
      },
      {
        label: 'Outcomes & Core Takeaways',
        content: 'By bringing high-fidelity spatial telemetry into the property search loop, we can eliminate up to 70% of unnecessary physical viewings. This protects the privacy of departing tenants, eliminates dead scheduling time for brokers/owners, and gives renters total confidence that the home they see on their screen is exactly the home they will walk into.'
      }
    ],
    mockups: [
      '/projects/booking_landing_page.png',
      '/projects/booking_landing_page_1.png',
      '/projects/booking_landing_page_2.png'
    ]
  }
]

// SearchToIntentSlidesView removed because Document mode is preferred.

function SearchToIntentDocView({ isMobile }) {
  const mockups = [
    { src: '/projects/search_to_intent_slide_2.png', label: 'Problem & Discovery Mechanics' },
    { src: '/projects/search_to_intent_slide_3.png', label: 'User Intent & Context Mapping' },
    { src: '/projects/search_to_intent_slide_6.png', label: 'Conversational Prompting & UI Exploration' },
    { src: '/projects/search_to_intent_slide_9.png', label: 'Multimodal Input & Camera Recognition Flow' },
    { src: '/projects/search_to_intent_slide_10.png', label: 'Interaction Easing & Transition Logic' },
    { src: '/projects/search_to_intent_slide_12.png', label: 'Design System Tokens & Grid Specifications' },
    { src: '/projects/search_to_intent_mockup1.png', label: 'Homepage Recommendation & AI Discovery Dashboard' },
    { src: '/projects/search_to_intent_mockup2.jpg', label: 'Conversational Intent & Preferred Choice Assistant' },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      {/* 1. HERO COVER IMAGE */}
      <div style={{
        width: '100%',
        background: 'var(--bg-warm)',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '24px 0',
      }}>
        <img 
          src="/projects/search_to_intent_cover.png" 
          alt="Search to Intent cover"
          style={{
            width: '100%',
            height: 'auto',
            maxHeight: '85vh',
            objectFit: 'contain',
            display: 'block',
          }}
        />
      </div>

      {/* 2. OVERVIEW & CONTRIBUTION (id="overview") */}
      <div id="overview" style={{ background: 'var(--bg)', padding: '100px 0', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '820px', margin: '0 auto', width: '100%', paddingInline: '24px' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', color: 'var(--accent)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', display: 'block', marginBottom: '12px' }}>
            AI Experience Design + Generative Discovery
          </span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 5vw, 54px)', fontWeight: 400, letterSpacing: '-0.025em', lineHeight: 1.1, color: 'var(--text-primary)', margin: '0 0 24px 0' }}>
            Search to Intent
          </h1>
          <p style={{ fontSize: '18px', lineHeight: 1.7, color: 'var(--text-secondary)', marginBottom: '48px' }}>
            Transformed recipe discovery from keyword-based search into an AI-powered cooking companion, helping users create food from around the world through natural conversations, fridge scans, and social media inspiration.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '32px', borderTop: '1px solid var(--border)', paddingTop: '40px' }}>
            <div>
              <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontWeight: 700, display: 'block', marginBottom: '8px', letterSpacing: '0.08em' }}>MY CONTRIBUTION</span>
              <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--text-secondary)', margin: 0 }}>
                Led end-to-end product design including UX research, product strategy, AI experience design, interaction design, information architecture, UI design, prototyping, user testing, and design system. Designed conversational and multimodal discovery experiences using text prompts, ingredient recognition, fridge scans, and social media content.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontWeight: 700, display: 'block', marginBottom: '6px', letterSpacing: '0.08em' }}>TIMELINE</span>
                  <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>1 Month</span>
                </div>
                <div>
                  <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontWeight: 700, display: 'block', marginBottom: '6px', letterSpacing: '0.08em' }}>TARGET USER</span>
                  <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>Busy Cooks</span>
                </div>
              </div>
              <div>
                <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontWeight: 700, display: 'block', marginBottom: '6px', letterSpacing: '0.08em' }}>STAKEHOLDERS</span>
                <span style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>Consumers, Product Team, AI Engineers, Frontend Developers, Founders</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. RECIPE DISCOVERY MOCKUP */}
      <div style={{ background: 'var(--bg-warm)', padding: '100px 0', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', width: '100%', paddingInline: '24px' }}>
          <div 
            style={{
              background: 'var(--bg-card)',
              borderRadius: '32px',
              padding: isMobile ? '12px' : '24px',
              boxShadow: '0 24px 60px rgba(0, 0, 0, 0.08), 0 4px 16px rgba(0, 0, 0, 0.03)',
              overflow: 'hidden',
            }}
          >
            <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', borderRadius: '20px', overflow: 'hidden' }}>
              <iframe 
                src="https://www.canva.com/design/DAHLaWrsGuo/nd2_fdOFi5_mQC632ooo1g/watch?embed" 
                title="Search to Intent Presentation Video"
                width="100%"
                height="100%"
                style={{ border: 'none', display: 'block' }}
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
              />
            </div>
          </div>
          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', fontFamily: 'var(--font-body)', marginTop: '20px', display: 'block', textAlign: 'center' }}>
            AI-Powered Recipe Discovery & Contextual Search Video Walkthrough
          </span>
        </div>
      </div>

      {/* 4. PROBLEM STATEMENT & SCOPE (id="problem") */}
      <div id="problem" style={{ background: 'var(--bg)', padding: '100px 0', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '820px', margin: '0 auto', width: '100%', paddingInline: '24px' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 400, color: 'var(--text-primary)', marginBottom: '40px', letterSpacing: '-0.02em' }}>
            Problem Statement
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', marginBottom: '60px' }}>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
              <div style={{ fontSize: '24px', background: 'rgba(139, 92, 246, 0.08)', padding: '12px', borderRadius: '16px', color: 'var(--accent)' }}>🔍</div>
              <div>
                <h4 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 8px 0' }}>Discovery was hard</h4>
                <p style={{ fontSize: '15px', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.65 }}>Not because of lack of content, but because users didn't know what to search for. They faced immediate decision fatigue when presented with standard keyword query boxes.</p>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
              <div style={{ fontSize: '24px', background: 'rgba(139, 92, 246, 0.08)', padding: '12px', borderRadius: '16px', color: 'var(--accent)' }}>👥</div>
              <div>
                <h4 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 8px 0' }}>Decision Fatigue</h4>
                <p style={{ fontSize: '15px', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.65 }}>Users relied heavily on external social platforms for cooking inspiration, struggling to translate that casual interest into actual recipes inside the app.</p>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
              <div style={{ fontSize: '24px', background: 'rgba(139, 92, 246, 0.08)', padding: '12px', borderRadius: '16px', color: 'var(--accent)' }}>🎯</div>
              <div>
                <h4 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 8px 0' }}>The Real Problem</h4>
                <p style={{ fontSize: '15px', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.65 }}>The core issue wasn't the search capability itself — it was understanding user intent. Because discovery was rigid, thousands of highly rated recipes remained completely undiscovered.</p>
              </div>
            </div>
          </div>

          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '60px', marginTop: '60px' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 500, color: 'var(--text-primary)', marginBottom: '32px' }}>Project Scope</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '40px' }}>
              <div>
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#10b981', fontFamily: 'var(--font-mono)', display: 'block', marginBottom: '16px', letterSpacing: '0.08em' }}>IN SCOPE</span>
                <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <li>Conversational AI for recipe discovery</li>
                  <li>Intent-based recipe recommendations</li>
                  <li>Fridge image recognition</li>
                  <li>Ingredient-based recipe generation</li>
                  <li>Social media link-to-recipe generation</li>
                  <li>Blog and web recipe interpretation</li>
                  <li>Mobile-first discovery experience</li>
                  <li>Homepage exploration redesign</li>
                </ul>
              </div>
              
              <div>
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#ef4444', fontFamily: 'var(--font-mono)', display: 'block', marginBottom: '16px', letterSpacing: '0.08em' }}>OUT OF SCOPE</span>
                <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <li>Cooking hardware experience</li>
                  <li>Cooking execution workflows</li>
                  <li>Device onboarding</li>
                  <li>Community features</li>
                  <li>Social validation systems</li>
                  <li>Hardware-specific interactions</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. APPROACH & AIM (id="approach") */}
      <div id="approach" style={{ 
        background: 'rgba(0, 82, 255, 0.04)', 
        padding: '100px 0', 
        borderTop: '1px solid rgba(0, 82, 255, 0.08)',
        borderBottom: '1px solid rgba(0, 82, 255, 0.08)' 
      }}>
        <div style={{ maxWidth: '820px', margin: '0 auto', width: '100%', paddingInline: '24px' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 400, color: 'var(--text-primary)', marginBottom: '24px', letterSpacing: '-0.025em' }}>
            Approach & Aim
          </h2>
          
          <div style={{ fontSize: '18px', lineHeight: 1.65, color: 'var(--text-primary)', marginBottom: '48px', borderLeft: '4px solid #0052ff', paddingLeft: '24px', fontWeight: 400 }}>
            <span style={{ color: '#0052ff', fontWeight: 600, display: 'block', marginBottom: '8px', fontSize: '12px', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Hypothesis</span>
            "If users express intent naturally through conversations, images, ingredients, and social inspiration, they will discover recipes faster with less effort. Shifting from keyword search to intent-driven discovery makes cooking more approachable and increases exploration."
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.2fr 1fr', gap: '48px', marginTop: '48px', borderTop: '1px solid var(--border)', paddingTop: '40px' }}>
            <div>
              <h4 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--accent)', fontFamily: 'var(--font-mono)', margin: '0 0 20px 0', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Core Objectives</h4>
              <p style={{ fontSize: '15px', color: 'var(--text-primary)', margin: '0 0 16px 0' }}><strong>Primary Goal:</strong> Reduce decision fatigue during recipe discovery.</p>
              <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li>Increase recipe exploration rates</li>
                <li>Improve confidence for beginner cooks</li>
                <li>Increase engagement and retention on mobile</li>
                <li>Help users get started with the device faster</li>
                <li>Enable discovery through natural, casual behavior</li>
              </ul>
            </div>
            <div style={{ background: 'var(--bg-card)', border: '1.2px solid var(--border)', borderRadius: '24px', padding: '28px', display: 'flex', gap: '20px', flexDirection: 'column' }}>
              <div style={{ fontSize: '32px', lineHeight: 1 }}>📱</div>
              <div>
                <h4 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 8px 0' }}>Core Insight</h4>
                <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--text-secondary)', margin: 0 }}>
                  Users don't decide what to cook in the kitchen. They decide while scrolling social media, relaxing at work, shopping, or checking what ingredients are expiring in their fridge. We extended discovery to mobile and designed the AI experience around real-world lifestyle behavior.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 6. METHODOLOGIES */}
      <div style={{ background: 'var(--bg)', padding: '100px 0', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '820px', margin: '0 auto', width: '100%', paddingInline: '24px' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 400, color: 'var(--text-primary)', marginBottom: '16px', letterSpacing: '-0.025em' }}>
            Methodologies
          </h2>
          <p style={{ fontSize: '16px', color: 'var(--text-secondary)', marginBottom: '48px', lineHeight: 1.6 }}>
            A human-centered, AI-enhanced research and design framework to understand how people discover and decide what to cook.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '48px', marginBottom: '60px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.3fr 1fr', gap: '32px', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '10px', fontWeight: 700, color: 'var(--accent)', fontFamily: 'var(--font-mono)', display: 'block', marginBottom: '8px', letterSpacing: '0.08em' }}>RESEARCH CATEGORY</span>
                <h4 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 16px 0' }}>Mixed Methods</h4>
                <p style={{ fontSize: '14.5px', lineHeight: 1.65, color: 'var(--text-secondary)', margin: 0, fontStyle: 'italic', borderLeft: '3px solid var(--accent)', paddingLeft: '16px' }}>
                  "We combined qualitative and quantitative research with AI exploration to uncover real user behavior and build intent-driven discovery experiences."
                </p>
              </div>
              <div style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
                <img src="/projects/search_to_intent_research_category.png" alt="Research Category" style={{ width: '100%', display: 'block' }} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.3fr 1fr', gap: '32px', alignItems: 'center', borderTop: '1px solid var(--border)', paddingTop: '48px' }}>
              <div>
                <span style={{ fontSize: '10px', fontWeight: 700, color: 'var(--accent)', fontFamily: 'var(--font-mono)', display: 'block', marginBottom: '8px', letterSpacing: '0.08em' }}>PARTICIPANTS</span>
                <h4 style={{ fontSize: '17px', fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 12px 0', lineHeight: 1.45 }}>
                  Students, busy professionals, beginner cooks, parents, home cooks, and recipe explorers.
                </h4>
                <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.7, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <li>Wide range of cooking confidence levels</li>
                  <li>Different lifestyles, family structures, and routines</li>
                  <li>Users who cook at home, occasionally, or rarely</li>
                </ul>
              </div>
              <div style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
                <img src="/projects/search_to_intent_research_participants.png" alt="Research Participants" style={{ width: '100%', display: 'block' }} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.3fr 1fr', gap: '32px', alignItems: 'center', borderTop: '1px solid var(--border)', paddingTop: '48px' }}>
              <div>
                <span style={{ fontSize: '10px', fontWeight: 700, color: 'var(--accent)', fontFamily: 'var(--font-mono)', display: 'block', marginBottom: '8px', letterSpacing: '0.08em' }}>GEOGRAPHY / CONTEXT</span>
                <h4 style={{ fontSize: '17px', fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 12px 0', lineHeight: 1.45 }}>
                  Urban Indian households across multiple cities and regions.
                </h4>
                <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.7, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <li>Research conducted in real kitchen environments and mobile-first contexts</li>
                  <li>Included shared living spaces, nuclear families, and multi-generational households</li>
                  <li>Food choices studied across seasons, weather, moods, and daily routines</li>
                </ul>
              </div>
              <div style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
                <img src="/projects/search_to_intent_research_geography.png" alt="Research Geography" style={{ width: '100%', display: 'block' }} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.3fr 1fr', gap: '32px', alignItems: 'center', borderTop: '1px solid var(--border)', paddingTop: '48px' }}>
              <div>
                <span style={{ fontSize: '10px', fontWeight: 700, color: 'var(--accent)', fontFamily: 'var(--font-mono)', display: 'block', marginBottom: '8px', letterSpacing: '0.08em' }}>DATA ANALYSIS</span>
                <h4 style={{ fontSize: '17px', fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 16px 0' }}>Behavior Clustering & Intent Mapping</h4>
                <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--text-secondary)', margin: 0 }}>
                  We combined qualitative insights with AI-assisted synthesis to identify patterns, gaps, and opportunities that informed product and AI experience design.
                </p>
              </div>
              <div style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
                <img src="/projects/search_to_intent_research_analysis.png" alt="Research Analysis" style={{ width: '100%', display: 'block' }} />
              </div>
            </div>
          </div>

          <div style={{ background: 'var(--bg-warm)', border: '1px solid var(--border)', borderRadius: '24px', padding: '36px', marginTop: '60px' }}>
            <span style={{ fontSize: '10px', fontWeight: 700, color: 'var(--accent)', fontFamily: 'var(--font-mono)', display: 'block', marginBottom: '24px', letterSpacing: '0.08em' }}>DISCOVERY FRAMEWORK</span>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '24px' }}>
              <div>
                <h4 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 6px 0' }}>❤️ Mood-Based Decisions</h4>
                <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>Food choices are deeply tied to how users feel—comfort, indulgent, light, nostalgic, or celebratory.</p>
              </div>
              <div>
                <h4 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 6px 0' }}>🌤️ Weather Influence</h4>
                <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>Weather directly impacts cravings and cooking behavior (rainy = comfort food, summer = light & cooling).</p>
              </div>
              <div>
                <h4 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 6px 0' }}>🌿 Seasonal Context</h4>
                <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>Seasonality, festivals, and regional food traditions shape what and how people cook.</p>
              </div>
              <div>
                <h4 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 6px 0' }}>🛒 Ingredient Availability</h4>
                <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>Users often decide based on what's in their fridge or what's easily available.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 7. INSIGHTS & OUTCOMES (id="outcomes") */}
      <div id="outcomes" style={{ background: 'var(--bg-warm)', padding: '100px 0', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '820px', margin: '0 auto', width: '100%', paddingInline: '24px' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 400, color: 'var(--text-primary)', marginBottom: '40px', letterSpacing: '-0.025em' }}>
            Key Insights & Outcomes
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', marginBottom: '60px' }}>
            <div>
              <h5 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 8px 0' }}>1. Decision-making, not search</h5>
              <p style={{ fontSize: '14.5px', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                Recipe discovery wasn't a search problem—it was a decision-making problem. Users rarely knew exactly what they wanted to cook. They started with a feeling, craving, occasion, or constraint rather than a recipe name.
              </p>
            </div>
            <div>
              <h5 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 8px 0' }}>2. Contextual Influence</h5>
              <p style={{ fontSize: '14.5px', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                Food choices were heavily influenced by context. Weather, seasonality, mood, time of day, family preferences, and ingredient availability played a significant role in cooking decisions.
              </p>
            </div>
            <div>
              <h5 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 8px 0' }}>3. Social Inspiration</h5>
              <p style={{ fontSize: '14.5px', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                Social content became the new discovery engine. Instagram reels, YouTube videos, blogs, and creator content were often the starting point of recipe exploration rather than dedicated cooking platforms.
              </p>
            </div>
          </div>

          <div style={{ background: 'var(--bg-card)', border: '1.2px solid var(--border)', borderRadius: '24px', padding: '36px', margin: '48px 0' }}>
            <span style={{ fontSize: '10px', fontWeight: 700, color: 'var(--accent)', fontFamily: 'var(--font-mono)', display: 'block', marginBottom: '16px', letterSpacing: '0.08em' }}>PROJECT IMPACT</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div>
                <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 6px 0', fontFamily: 'var(--font-mono)', letterSpacing: '0.04em' }}>BUSINESS OUTCOME</h4>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.6 }}>
                  Increased recipe exploration and discoverability across the platform by enabling multimodal discovery. Improved retention by empowering users to find anything they crave, anytime.
                </p>
              </div>
              <div style={{ borderTop: '1.2px solid var(--border)', paddingTop: '20px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 6px 0', fontFamily: 'var(--font-mono)', letterSpacing: '0.04em' }}>TEAM OUTCOME</h4>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.6 }}>
                  Established reusable multimodal discovery patterns that can be applied across future AI experiences. Created a framework for designing around intent, context, and user behavior instead of traditional search flows.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 8. SHOWCASE & TRY LIVE (id="showcase") */}
      <div id="showcase" style={{ background: 'var(--bg)', padding: '100px 0', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', width: '100%', paddingInline: '24px' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 400, color: 'var(--text-primary)', marginBottom: '48px', textAlign: 'center', letterSpacing: '-0.025em' }}>
            Search to Intent Showcase
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '64px', alignItems: 'center', width: '100%' }}>
            {mockups.map((item, index) => (
              <div key={index} style={{ width: '100%', maxWidth: '100%', textAlign: 'center' }}>
                <div style={{
                  background: 'var(--bg-card)',
                  borderRadius: '32px',
                  padding: isMobile ? '12px' : '24px',
                  boxShadow: '0 24px 60px rgba(0, 0, 0, 0.08), 0 4px 16px rgba(0, 0, 0, 0.03)',
                  overflowX: 'auto',
                  overflowY: 'hidden',
                  width: '100%',
                  boxSizing: 'border-box'
                }}>
                  <img src={item.src} alt={item.label} style={{ minWidth: '100%', width: 'auto', maxWidth: 'none', height: 'auto', display: 'block', borderRadius: '20px' }} />
                </div>
                <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-secondary)', fontFamily: 'var(--font-body)', marginTop: '16px', display: 'block' }}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          <div style={{ maxWidth: '820px', margin: '100px auto 0 auto', width: '100%' }}>
            <div style={{
              background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.12) 0%, rgba(0, 82, 255, 0.04) 100%)',
              border: '1.5px solid rgba(139, 92, 246, 0.25)',
              borderRadius: '24px',
              padding: '54px 36px',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 12px 40px rgba(139, 92, 246, 0.08)',
            }}>
              <div style={{
                position: 'absolute',
                top: '-50%',
                left: '-50%',
                width: '200%',
                height: '200%',
                background: 'radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 60%)',
                pointerEvents: 'none',
              }} />
              <span style={{ fontSize: '11px', fontWeight: 700, fontFamily: 'var(--font-mono)', color: '#a78bfa', textTransform: 'uppercase', letterSpacing: '0.15em', display: 'block', marginBottom: '12px' }}>
                LIVE EXPERIENCE
              </span>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '30px', fontWeight: 500, color: 'var(--text-primary)', marginBottom: '16px', letterSpacing: '-0.02em' }}>
                Try the upliance App Live
              </h3>
              <p style={{ fontSize: '15px', color: 'var(--text-secondary)', maxWidth: '520px', margin: '0 auto 36px auto', lineHeight: 1.6 }}>
                Experience the AI cooking companion, recipe discovery engine, and smart hardware integration directly on your mobile device. Download the app today.
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
                <a href="https://play.google.com/store/apps/details?id=com.upliance.android.app&pcampaignid=web_share" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', padding: '12px 24px', background: '#0a0a0f', border: '1.2px solid rgba(255,255,255,0.15)', borderRadius: '14px', color: '#ffffff', textDecoration: 'none', transition: 'all 0.25s' }} className="store-btn">
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M5,3.14c-0.23,0-0.46,0.06-0.67,0.18L14.1,12l-9.77,8.68C4.54,20.8,4.77,20.86,5,20.86c0.35,0,0.69-0.1,0.98-0.29l12.75-7.59c0.75-0.45,0.75-1.51,0-1.96L5.98,3.43C5.69,3.24,5.35,3.14,5,3.14z" /></svg>
                  <div style={{ textAlign: 'left' }}><span style={{ fontSize: '9px', textTransform: 'uppercase', display: 'block', color: 'rgba(255,255,255,0.6)', letterSpacing: '0.05em' }}>GET IT ON</span><span style={{ fontSize: '14px', fontWeight: 700, fontFamily: 'var(--font-body)' }}>Google Play</span></div>
                </a>
                <a href="https://apps.apple.com/in/app/upliance/id6514318061" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', padding: '12px 24px', background: '#0a0a0f', border: '1.2px solid rgba(255,255,255,0.15)', borderRadius: '14px', color: '#ffffff', textDecoration: 'none', transition: 'all 0.25s' }} className="store-btn">
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M18.71,19.5C17.88,20.74,17,21.95,15.66,22c-1.34,0-1.77-0.83-3.32-0.83c-1.54,0-2,.81-3.28,0.86 c-1.26,0.05-2.24-1.32-3.08-2.54c-1.72-2.5-3.03-7.05-1.27-10.13c0.88-1.53,2.45-2.5,4.16-2.53c1.3-0.02,2.53,0.88,3.33,0.88 c0.8,0,2.27-1.07,3.81-0.91c0.65,0.03,2.47,0.26,3.64,1.98c-0.09,0.06-2.17,1.28-2.15,3.81c0.03,3.02,2.65,4.03,2.68,4.04 C19.97,16.24,19.54,18.25,18.71,19.5z M15.97,4.17c0.66-0.81,1.11-1.93,0.99-3.06c-0.96,0.04-2.13,0.64-2.82,1.45 c-0.6,0.7-1.12,1.84-0.98,2.94C14.12,5.55,15.28,4.92,15.97,4.17z" /></svg>
                  <div style={{ textAlign: 'left' }}><span style={{ fontSize: '9px', textTransform: 'uppercase', display: 'block', color: 'rgba(255,255,255,0.6)', letterSpacing: '0.05em' }}>Download on the</span><span style={{ fontSize: '14px', fontWeight: 700, fontFamily: 'var(--font-body)' }}>App Store</span></div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Full-Page Case Study Overlay View ── */
function CaseStudyPage({ project, onClose, onNextProject, isMobile }) {
  const contentRef = useRef(null)
  const [readProgress, setReadProgress] = useState(0)
  const [navVisible, setNavVisible] = useState(true)
  const [scrolled, setScrolled] = useState(false)
  const [lastScrollTop, setLastScrollTop] = useState(0)
  const [activeSection, setActiveSection] = useState('overview')

  // Sync scroll lock on open
  useEffect(() => {
    window.__lenis?.stop()
    return () => window.__lenis?.start()
  }, [])

  // Calculate reading progress as the modal scrolls
  const handleScroll = (e) => {
    const el = e.currentTarget
    const currentScrollTop = el.scrollTop
    const totalHeight = el.scrollHeight - el.clientHeight
    if (totalHeight > 0) {
      setReadProgress(currentScrollTop / totalHeight)
    }

    setScrolled(currentScrollTop > 20)

    // Sync visibility of top bar
    if (currentScrollTop > lastScrollTop && currentScrollTop > 100) {
      setNavVisible(false)
    } else {
      setNavVisible(true)
    }
    setLastScrollTop(currentScrollTop)

    // Check active section
    const sectionIds = ['overview', 'problem', 'approach', 'outcomes', 'showcase']
    for (const id of sectionIds) {
      const secEl = el.querySelector(id === 'overview' ? '.case-study-overlay' : `#${id}`)
      if (secEl) {
        const rect = secEl.getBoundingClientRect()
        // If section is in view near top of viewport
        if (rect.top <= 160 && rect.bottom > 160) {
          setActiveSection(id)
          break
        }
      }
    }
  }

  // Calculate next project loop index
  const nextProjectIndex = (PROJECTS.findIndex(p => p.id === project.id) + 1) % PROJECTS.length
  const nextProj = PROJECTS[nextProjectIndex]

  return (
    <div
      data-lenis-prevent
      onScroll={handleScroll}
      className="case-study-overlay"
      ref={contentRef}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'var(--bg)',
        zIndex: 999999, // Just below global Nav (zIndex: 1000000)
        overflowY: 'auto',
        color: 'var(--text-primary)',
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
          zIndex: 10000002,
          boxShadow: '0 0 8px var(--accent)',
          transition: 'width 0.1s ease',
        }}
      />

      {/* ── Secondary Nav Bar ── */}
      <div
        style={{
          position: 'fixed',
          top: scrolled ? (isMobile ? '56px' : '64px') : (isMobile ? '80px' : '88px'),
          left: 0,
          width: '100%',
          height: '48px',
          background: 'var(--bg-overlay)',
          borderBottom: '1px solid var(--border)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          zIndex: 999998,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          transition: 'transform 0.4s var(--ease-out-expo), top 0.3s var(--ease-out-expo), background 0.3s, border-bottom 0.3s',
          transform: navVisible ? 'translateY(0)' : 'translateY(-180px)',
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: isMobile ? '8px' : '32px',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            maxWidth: '820px',
            paddingInline: '16px',
          }}
        >
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'problem', label: 'Problem' },
            { id: 'approach', label: 'Approach' },
            { id: 'outcomes', label: 'Outcomes' },
            { id: 'showcase', label: 'Showcase' },
          ].map((item) => {
            const isActive = activeSection === item.id
            return (
              <button
                key={item.id}
                onClick={() => {
                  const container = contentRef.current
                  
                  if (item.id === 'overview') {
                    container.scrollTo({ top: 0, behavior: 'smooth' })
                    setActiveSection('overview')
                    return
                  }

                  const targetEl = container.querySelector(`#${item.id}`)
                  if (targetEl) {
                    const containerRect = container.getBoundingClientRect()
                    const targetRect = targetEl.getBoundingClientRect()
                    const topOffset = container.scrollTop + (targetRect.top - containerRect.top) - (isMobile ? 110 : 130)
                    container.scrollTo({
                      top: topOffset,
                      behavior: 'smooth'
                    })
                    setActiveSection(item.id)
                  }
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
                  fontSize: isMobile ? '11px' : '13px',
                  fontWeight: 600,
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  padding: '6px 12px',
                  cursor: 'pointer',
                  position: 'relative',
                  outline: 'none',
                  transition: 'color 0.2s ease',
                }}
              >
                {item.label}
                {isActive && (
                  <motion.div
                    layoutId="activeCSNavDot"
                    style={{
                      position: 'absolute',
                      bottom: -2,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '4px',
                      height: '4px',
                      borderRadius: '50%',
                      background: 'var(--accent)',
                    }}
                  />
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Case Study Scrollable Content */}
      <div 
        style={{
          width: '100%',
          maxWidth: project.id === 'search-to-intent' ? '100%' : '1200px',
          margin: '0 auto',
          padding: project.id === 'search-to-intent' ? '0px' : '120px 24px 60px 24px',
        }}
      >
        {project.id === 'search-to-intent' ? (
          <SearchToIntentDocView isMobile={isMobile} />
        ) : (
          <>
            <div id="overview" style={{ maxWidth: '820px', margin: '0 auto', width: '100%' }}>
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
                color: 'var(--text-primary)',
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
                color: 'var(--text-secondary)',
                borderBottom: '1px solid var(--border)',
                paddingBottom: 'var(--space-6)',
                marginBottom: 'var(--space-8)',
              }}>
                <span>Role: <strong style={{ color: 'var(--text-primary)' }}>{project.role}</strong></span>
                <span>•</span>
                <span>Duration: <strong style={{ color: 'var(--text-primary)' }}>{project.duration}</strong></span>
                <span>•</span>
                <span>Impact: <strong style={{ color: 'var(--accent)' }}>{project.impact}</strong></span>
              </div>
            </div>

            {/* Render Cover image if present */}
            {project.coverImage && (
              <div style={{
                width: '100%',
                height: 'clamp(260px, 45vw, 560px)',
                borderRadius: '32px',
                overflow: 'hidden',
                marginBottom: 'var(--space-9)',
                border: 'none',
                boxShadow: '0 24px 60px rgba(0, 0, 0, 0.08), 0 4px 16px rgba(0, 0, 0, 0.03)',
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
            <div style={{ maxWidth: '820px', margin: '0 auto', width: '100%' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
                {(() => {
                  let problemIndex = -1
                  let approachIndex = -1
                  let outcomesIndex = -1

                  project.sections?.forEach((sec, idx) => {
                    const l = sec.label.toLowerCase()
                    if (problemIndex === -1 && (l.includes('problem') || l.includes('challenge') || l.includes('brief') || l.includes('goal'))) {
                      problemIndex = idx
                    }
                    if (approachIndex === -1 && (l.includes('approach') || l.includes('decision') || l.includes('solution') || l.includes('direction') || l.includes('system'))) {
                      approachIndex = idx
                    }
                    if (outcomesIndex === -1 && (l.includes('outcome') || l.includes('impact') || l.includes('result'))) {
                      outcomesIndex = idx
                    }
                  })

                  if (problemIndex === -1 && project.sections?.length > 0) problemIndex = 0
                  if (approachIndex === -1 && project.sections?.length > 1) {
                    approachIndex = Math.floor(project.sections.length / 2)
                    if (approachIndex === problemIndex) approachIndex = Math.min(problemIndex + 1, project.sections.length - 1)
                  }
                  if (outcomesIndex === -1 && project.sections?.length > 2) {
                    outcomesIndex = project.sections.length - 1
                    if (outcomesIndex === approachIndex) outcomesIndex = Math.max(approachIndex + 1, project.sections.length - 1)
                  }

                  return project.sections?.map((sec, i) => {
                    const secId = i === problemIndex ? 'problem' : i === approachIndex ? 'approach' : i === outcomesIndex ? 'outcomes' : undefined
                    return (
                      <div 
                        key={sec.label}
                        id={secId}
                        style={{
                          animation: `pageIn 0.5s ease-out ${i * 60}ms both`,
                        }}
                      >
                        <h3 style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '22px',
                          fontWeight: 500,
                          color: 'var(--text-primary)',
                          marginBottom: 'var(--space-4)',
                          letterSpacing: '-0.015em',
                        }}>
                          {sec.label}
                        </h3>
                        <p style={{
                          fontSize: '16px',
                          lineHeight: 1.75,
                          color: 'var(--text-secondary)',
                          whiteSpace: 'pre-line',
                          margin: 0,
                        }}>
                          {sec.content}
                        </p>
                      </div>
                    )
                  })
                })()}
              </div>
            </div>

            {/* Generic Project Mockups */}
            {project.mockups && project.mockups.length > 0 && (
              <div id="showcase" style={{ marginTop: '80px', borderTop: '1px solid var(--border)', paddingTop: '60px' }}>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '28px',
                  fontWeight: 500,
                  color: 'var(--text-primary)',
                  marginBottom: '40px',
                  textAlign: 'center',
                  letterSpacing: '-0.015em'
                }}>
                  Design Showcase
                </h3>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '64px',
                  alignItems: 'center',
                  width: '100%'
                }}>
                  {project.mockups.map((mockup, index) => (
                    <div 
                      key={index} 
                      style={{ 
                        width: '100%', 
                        maxWidth: '100%',
                        borderRadius: '32px', 
                        overflowX: 'auto', 
                        overflowY: 'hidden',
                        border: 'none', 
                        boxShadow: '0 24px 60px rgba(0, 0, 0, 0.08), 0 4px 16px rgba(0, 0, 0, 0.03)',
                        background: 'var(--bg-card)',
                        padding: isMobile ? '12px' : '24px',
                        boxSizing: 'border-box'
                      }}
                    >
                      <img 
                        src={mockup} 
                        alt={`${project.title} screen ${index + 1}`} 
                        style={{ 
                          minWidth: '100%', 
                          width: 'auto', 
                          maxWidth: 'none',
                          height: 'auto', 
                          display: 'block',
                          borderRadius: '20px' 
                        }} 
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Framing call to action */}
            {project.framerUrl && (
              <div id={(!project.mockups || project.mockups.length === 0) ? "showcase" : undefined} style={{ maxWidth: '820px', margin: '80px auto 0 auto', width: '100%', textAlign: 'center' }}>
                <div style={{
                  borderTop: '1px solid var(--border)',
                  paddingTop: '40px',
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
                    onMouseEnter={e => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 82, 255, 0.4)';
                    }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 82, 255, 0.25)'; }}
                  >
                    Explore live interactive study ↗
                  </a>
                </div>
              </div>
            )}
          </>
        )}

        {/* Explore More Work Section */}
        <div 
          id={(!project.mockups || project.mockups.length === 0) && !project.framerUrl ? "showcase" : undefined}
          style={{
            marginTop: '100px',
            borderTop: '1px solid var(--border)',
            paddingTop: '60px',
          width: '100%'
        }}>
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '24px',
            fontWeight: 500,
            color: 'var(--text-primary)',
            marginBottom: '32px',
            textAlign: 'center',
            letterSpacing: '-0.015em'
          }}>
            Explore More Work
          </h3>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr 1fr',
            gap: '24px',
            marginBottom: '48px'
          }}>
            {PROJECTS.filter(p => p.id !== project.id).slice(0, 3).map(otherProj => {
              return (
                <div
                  key={otherProj.id}
                  onClick={() => {
                    if (contentRef.current) {
                      contentRef.current.scrollTop = 0
                    }
                    onNextProject(otherProj)
                  }}
                  style={{
                    background: 'var(--bg-card)',
                    border: '1.2px solid var(--border)',
                    borderRadius: '20px',
                    padding: '24px',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '20px',
                    transition: 'all 0.3s var(--ease-out-expo)',
                  }}
                  className="explore-card"
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-4px)'
                    e.currentTarget.style.borderColor = otherProj.accent
                    e.currentTarget.style.boxShadow = 'var(--shadow-md)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.borderColor = 'var(--border)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '11px', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                        {otherProj.category}
                      </span>
                      <span style={{ fontSize: '20px' }}>{otherProj.emoji}</span>
                    </div>
                    <h4 style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '17px',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      lineHeight: 1.3,
                      margin: 0,
                      letterSpacing: '-0.01em'
                    }}>
                      {otherProj.title}
                    </h4>
                    <p style={{
                      fontSize: '13px',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.5,
                      margin: 0,
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}>
                      {otherProj.overview}
                    </p>
                  </div>
                  <span style={{
                    fontSize: '12px',
                    fontWeight: 600,
                    color: otherProj.accent,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    marginTop: '8px'
                  }}>
                    Read Case Study ↗
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <Contact />
      <Footer />

      <style>{`
        @keyframes pageIn { from { opacity: 0; transform: translateY(36px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  )
}

export default function Projects({ activeProject, setActiveProject }) {
  const [isMobile, setIsMobile] = useState(false)
  const [hoveredCardId, setHoveredCardId] = useState(null)

  // Mobile layout detection
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const categories = [
    {
      id: 'ai-product',
      title: 'AI PRODUCT',
      projects: PROJECTS.filter(p => p.categoryGroup === 'AI Product')
    },
    {
      id: '0-1',
      title: '0-1 & END TO END PROJECTS',
      projects: PROJECTS.filter(p => p.categoryGroup === '0-1 & END TO end projects')
    },
    {
      id: 'ui',
      title: 'UI DESIGN',
      projects: PROJECTS.filter(p => p.categoryGroup === 'UI')
    },
    {
      id: 'interactive',
      title: 'INTERACTIVE & GAME DESIGN',
      projects: PROJECTS.filter(p => p.categoryGroup === 'INTERACTIVE & GAME DESIGN')
    }
  ]

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
              Along this journey, I've brought several<br />
              <span style={{ color: 'var(--accent)', fontWeight: 600 }}>visions to life.</span>
            </h2>
          </FadeUp>
        </div>

        {/* Categories stacked vertically one by one */}
        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '80px', position: 'relative', zIndex: 20 }}>
          {categories.map((cat) => (
            <div key={cat.id} style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              {/* Category title */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '4px', height: '24px', backgroundColor: 'var(--accent)', borderRadius: '2px' }} />
                <h3 style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '14px',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  color: 'var(--text-primary)',
                  textTransform: 'uppercase',
                  margin: 0
                }}>
                  {cat.title}
                </h3>
              </div>

              {/* Grid of Projects: Stacked vertically one after the other */}
              <div 
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr',
                  gap: '96px',
                  width: '100%'
                }}
              >
                {cat.projects.map((project, pIdx) => {
                  const isHovered = hoveredCardId === project.id
                  return (
                    <div 
                      key={project.id}
                      style={{
                        background: 'var(--bg-card)',
                        border: '1.5px solid var(--border)',
                        borderColor: isHovered ? 'var(--accent)' : 'var(--border)',
                        borderRadius: '24px',
                        padding: isMobile ? '32px 24px' : '56px',
                        display: 'grid',
                        gridTemplateColumns: isMobile ? '1fr' : '1fr 1.25fr',
                        gap: isMobile ? '32px' : '56px',
                        boxShadow: isHovered ? 'var(--shadow-md)' : 'var(--shadow-sm)',
                        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
                        transition: 'transform 0.3s var(--ease-out-expo), box-shadow 0.3s var(--ease-out-expo), border-color 0.3s',
                        cursor: 'pointer'
                      }}
                      className="project-grid-card"
                      onClick={() => setActiveProject(project)}
                      onMouseEnter={() => setHoveredCardId(project.id)}
                      onMouseLeave={() => setHoveredCardId(null)}
                    >
                      {isMobile ? (
                        <>
                          {/* Mobile Layout: Top-to-Bottom Flow */}
                          {/* Top Header of Card */}
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ 
                              fontSize: '28px', 
                              fontWeight: 800, 
                              color: isHovered ? 'rgba(0, 82, 255, 0.08)' : 'var(--border)', 
                              fontFamily: 'var(--font-mono)',
                              lineHeight: 1,
                              transition: 'color 0.3s'
                            }}>
                              0{pIdx + 1}.
                            </span>
                            <span style={{ fontSize: '20px' }}>{project.emoji}</span>
                          </div>

                          {/* Card Cover Image (Mockup) */}
                          {project.coverImage && (
                            <div style={{
                              width: '100%',
                              height: '280px',
                              borderRadius: '16px',
                              overflow: 'hidden',
                              border: '1.2px solid var(--border)',
                              background: 'var(--bg-warm)',
                            }}>
                              <img 
                                src={project.coverImage} 
                                alt={project.title}
                                style={{
                                  width: '100%',
                                  height: '100%',
                                  objectFit: 'cover',
                                  transition: 'transform 0.4s var(--ease-out-expo)',
                                  transform: isHovered ? 'scale(1.04)' : 'scale(1)'
                                }}
                              />
                            </div>
                          )}

                          {/* Card Content */}
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <h4 style={{
                              fontFamily: 'var(--font-display)',
                              fontSize: '24px',
                              fontWeight: 600,
                              color: 'var(--text-primary)',
                              lineHeight: 1.3,
                              margin: 0,
                              letterSpacing: '-0.015em'
                            }}>
                              {project.title}
                            </h4>
                            <p style={{
                              fontFamily: 'var(--font-body)',
                              fontSize: '15px',
                              color: 'var(--text-secondary)',
                              lineHeight: 1.6,
                              margin: 0
                            }}>
                              {project.overview}
                            </p>
                          </div>

                          {/* Tags */}
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                            {project.tags?.slice(0, 4).map(tag => (
                              <span 
                                key={tag}
                                style={{
                                  fontSize: '11px',
                                  fontWeight: 600,
                                  letterSpacing: '0.04em',
                                  background: 'var(--bg-warm)',
                                  border: '1px solid var(--border)',
                                  padding: '6px 14px',
                                  borderRadius: '100px',
                                  color: 'var(--text-secondary)'
                                }}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          {/* Metadata Table */}
                          <div 
                            style={{ 
                              display: 'grid', 
                              gridTemplateColumns: '1fr 1fr', 
                              gap: '16px',
                              borderTop: '1px solid var(--border)',
                              borderBottom: '1px solid var(--border)',
                              padding: '16px 0'
                            }}
                          >
                            <div>
                              <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontWeight: 700, display: 'block', marginBottom: '2px', letterSpacing: '0.08em' }}>ROLE</span>
                              <span style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)' }}>{project.role}</span>
                            </div>
                            <div>
                              <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontWeight: 700, display: 'block', marginBottom: '2px', letterSpacing: '0.08em' }}>IMPACT</span>
                              <span style={{ 
                                fontSize: '15px', 
                                fontWeight: 700, 
                                color: isHovered ? 'var(--accent)' : 'var(--text-primary)',
                                transition: 'color 0.3s'
                              }}>
                                {project.impact}
                              </span>
                            </div>
                          </div>

                          {/* CTA Button */}
                          <button
                            style={{
                              width: '100%',
                              backgroundColor: isHovered ? 'var(--accent)' : 'var(--bg-warm)',
                              color: isHovered ? '#ffffff' : 'var(--text-primary)',
                              border: isHovered ? '1px solid transparent' : '1px solid var(--border)',
                              fontFamily: 'var(--font-body)',
                              fontSize: '13.5px',
                              fontWeight: 600,
                              borderRadius: '100px',
                              padding: '12px 20px',
                              cursor: 'pointer',
                              boxShadow: isHovered ? '0 4px 12px rgba(0, 82, 255, 0.2)' : 'none',
                              transition: 'all 0.3s var(--ease-out-expo)',
                              textAlign: 'center',
                              outline: 'none'
                            }}
                            className="project-cta-btn"
                          >
                            Read Case Study ↗
                          </button>
                        </>
                      ) : (
                        <>
                          {/* Desktop Layout: Split Grid Layout */}
                          {/* Left Column: Details & Actions */}
                          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '24px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                              {/* Top Header of Card */}
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ 
                                  fontSize: '32px', 
                                  fontWeight: 800, 
                                  color: isHovered ? 'rgba(0, 82, 255, 0.08)' : 'var(--border)', 
                                  fontFamily: 'var(--font-mono)',
                                  lineHeight: 1,
                                  transition: 'color 0.3s'
                                }}>
                                  0{pIdx + 1}.
                                </span>
                                <span style={{ fontSize: '24px' }}>{project.emoji}</span>
                              </div>

                              {/* Card Content */}
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                <h4 style={{
                                  fontFamily: 'var(--font-display)',
                                  fontSize: 'clamp(26px, 2.5vw, 36px)',
                                  fontWeight: 600,
                                  color: 'var(--text-primary)',
                                  lineHeight: 1.2,
                                  margin: 0,
                                  letterSpacing: '-0.02em'
                                }}>
                                  {project.title}
                                </h4>
                                <p style={{
                                  fontFamily: 'var(--font-body)',
                                  fontSize: '16px',
                                  color: 'var(--text-secondary)',
                                  lineHeight: 1.65,
                                  margin: 0
                                }}>
                                  {project.overview}
                                </p>
                              </div>

                              {/* Tags */}
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                {project.tags?.slice(0, 4).map(tag => (
                                  <span 
                                    key={tag}
                                    style={{
                                      fontSize: '11px',
                                      fontWeight: 600,
                                      letterSpacing: '0.04em',
                                      background: 'var(--bg-warm)',
                                      border: '1px solid var(--border)',
                                      padding: '6px 14px',
                                      borderRadius: '100px',
                                      color: 'var(--text-secondary)'
                                    }}
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                              {/* Metadata Table */}
                              <div 
                                style={{ 
                                  display: 'grid', 
                                  gridTemplateColumns: '1fr 1fr', 
                                  gap: '16px',
                                  borderTop: '1px solid var(--border)',
                                  borderBottom: '1px solid var(--border)',
                                  padding: '16px 0'
                                }}
                              >
                                <div>
                                  <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontWeight: 700, display: 'block', marginBottom: '2px', letterSpacing: '0.08em' }}>ROLE</span>
                                  <span style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)' }}>{project.role}</span>
                                </div>
                                <div>
                                  <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontWeight: 700, display: 'block', marginBottom: '2px', letterSpacing: '0.08em' }}>IMPACT</span>
                                  <span style={{ 
                                    fontSize: '15px', 
                                    fontWeight: 700, 
                                    color: isHovered ? 'var(--accent)' : 'var(--text-primary)',
                                    transition: 'color 0.3s'
                                  }}>
                                    {project.impact}
                                  </span>
                                </div>
                              </div>

                              {/* CTA Button */}
                              <button
                                style={{
                                  width: '100%',
                                  backgroundColor: isHovered ? 'var(--accent)' : 'var(--bg-warm)',
                                  color: isHovered ? '#ffffff' : 'var(--text-primary)',
                                  border: isHovered ? '1px solid transparent' : '1px solid var(--border)',
                                  fontFamily: 'var(--font-body)',
                                  fontSize: '13.5px',
                                  fontWeight: 600,
                                  borderRadius: '100px',
                                  padding: '12px 20px',
                                  cursor: 'pointer',
                                  boxShadow: isHovered ? '0 4px 12px rgba(0, 82, 255, 0.2)' : 'none',
                                  transition: 'all 0.3s var(--ease-out-expo)',
                                  textAlign: 'center',
                                  outline: 'none'
                                }}
                                className="project-cta-btn"
                              >
                                Read Case Study ↗
                              </button>
                            </div>
                          </div>

                          {/* Right Column: Cover Image Mockup */}
                          {project.coverImage && (
                            <div style={{
                              width: '100%',
                              height: '100%',
                              minHeight: '480px',
                              borderRadius: '16px',
                              overflow: 'hidden',
                              border: '1.2px solid var(--border)',
                              background: 'var(--bg-warm)',
                              position: 'relative'
                            }}>
                              <img 
                                src={project.coverImage} 
                                alt={project.title}
                                style={{
                                  width: '100%',
                                  height: '100%',
                                  objectFit: 'cover',
                                  transition: 'transform 0.4s var(--ease-out-expo)',
                                  transform: isHovered ? 'scale(1.04)' : 'scale(1)'
                                }}
                              />
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Case study overlay modal */}
      {activeProject && (
        <CaseStudyPage 
          project={activeProject} 
          onClose={() => setActiveProject(null)} 
          onNextProject={(nextP) => setActiveProject(nextP)}
          isMobile={isMobile}
        />
      )}
    </>
  )
}
