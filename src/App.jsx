import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CustomCursor from './components/CustomCursor'
import Preloader from './components/Preloader'
import Desktop from './components/Desktop'
import FinderWindow from './components/FinderWindow'
import FinderSelectedWorks from './components/FinderSelectedWorks'
import FinderIllustrations from './components/FinderIllustrations'
import FinderAIExperiments from './components/FinderAIExperiments'
import FinderAboutMe from './components/FinderAboutMe'
import Chatbot from './components/Chatbot'

export default function App() {
  const [loading, setLoading] = useState(true)
  const [isFinderOpen, setIsFinderOpen] = useState(false)
  const [activeFinderTab, setActiveFinderTab] = useState('selected-works')
  const [activeProject, setActiveProject] = useState(null) // selected project ID for case studies
  const [isChatbotOpen, setIsChatbotOpen] = useState(false)
  const [focusedWindow, setFocusedWindow] = useState('finder') // 'finder' or 'chatbot'
  const [isMuted, setIsMuted] = useState(true) // Start muted by default to allow autoplay
  const [bgMuted, setBgMuted] = useState(true) // State specifically for background video mute status (must start muted for autoplay)
  const [isFinderMaximized, setIsFinderMaximized] = useState(false)
  const [isChatbotMaximized, setIsChatbotMaximized] = useState(false)
  const [activeToast, setActiveToast] = useState(null) // macOS-style notification state

  // Auto-dismiss notification after 8 seconds
  useEffect(() => {
    if (activeToast) {
      const timer = setTimeout(() => {
        setActiveToast(null);
        setBgMuted(false); // Unmute background audio when notification dismisses/stops speaking
      }, 9500);
      return () => clearTimeout(timer);
    }
  }, [activeToast]);

  return (
    <>
      <CustomCursor />
      
      {loading ? (
        <Preloader onComplete={() => setLoading(false)} />
      ) : (
        <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
          {/* Main Desktop Interface */}
          <Desktop 
            onOpenWindow={(tab) => {
              setIsFinderOpen(true);
              setActiveFinderTab(tab);
              setFocusedWindow('finder');
            }} 
            isMuted={isMuted} 
            setIsMuted={setIsMuted} 
            bgMuted={bgMuted}
            setBgMuted={setBgMuted}
            isChatbotOpen={isChatbotOpen}
            setIsChatbotOpen={setIsChatbotOpen}
            setFocusedWindow={setFocusedWindow}
            hideDock={(isFinderOpen && isFinderMaximized) || (isChatbotOpen && isChatbotMaximized)}
          />

          {/* Floating Finder Window */}
          {isFinderOpen && (
            <div onClick={() => setFocusedWindow('finder')}>
              <FinderWindow
                activeTab={activeFinderTab}
                setActiveTab={(tab) => {
                  setActiveFinderTab(tab);
                }}
                activeProject={activeProject}
                setActiveProject={setActiveProject}
                onClose={() => {
                  setIsFinderOpen(false);
                  setIsFinderMaximized(false);
                  setActiveProject(null);
                }}
                isMuted={isMuted}
                focusedWindow={focusedWindow}
                isMaximized={isFinderMaximized}
                setIsMaximized={setIsFinderMaximized}
              >
                {activeFinderTab === 'selected-works' && (
                  <FinderSelectedWorks 
                    activeProject={activeProject} 
                    setActiveProject={setActiveProject} 
                    isMuted={isMuted}
                    filter="shipped"
                  />
                )}
                {activeFinderTab === 'not-shipped' && (
                  <FinderSelectedWorks 
                    activeProject={activeProject} 
                    setActiveProject={setActiveProject} 
                    isMuted={isMuted}
                    filter="unshipped"
                  />
                )}
                {activeFinderTab === 'illustrations' && (
                  <FinderIllustrations isMuted={isMuted} />
                )}
                {activeFinderTab === 'ai-experiments' && (
                  <FinderAIExperiments isMuted={isMuted} />
                )}
                {activeFinderTab === 'about-me' && (
                  <FinderAboutMe isMuted={isMuted} />
                )}
              </FinderWindow>
            </div>
          )}

          {/* Centered Agentic AI Search Modal */}
          <AnimatePresence>
            {isChatbotOpen && (
              <Chatbot
                isMuted={isMuted}
                setIsMuted={setIsMuted}
                onBotSpeak={() => setBgMuted(true)}
                setIsFinderOpen={setIsFinderOpen}
                setActiveFinderTab={setActiveFinderTab}
                setActiveProject={setActiveProject}
                onShowToast={(title, msg) => setActiveToast({ title, message: msg })}
                onClose={() => {
                  setIsChatbotOpen(false);
                  setIsChatbotMaximized(false);
                }}
              />
            )}
          </AnimatePresence>

          {/* macOS-style Notification Toast System */}
          <AnimatePresence>
            {activeToast && (
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                style={{
                  position: 'fixed',
                  top: '20px',
                  right: '24px',
                  width: '320px',
                  background: 'rgba(18, 18, 24, 0.85)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '16px',
                  padding: '16px',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                  color: '#ffffff',
                  zIndex: 999999999,
                  fontFamily: 'var(--font-body)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '16px' }}>✨</span>
                    <span style={{ fontSize: '12.5px', fontWeight: 700, letterSpacing: '0.01em', color: '#a78bfa' }}>
                      {activeToast.title}
                    </span>
                  </div>
                  <button 
                    onClick={() => {
                      setActiveToast(null);
                      setBgMuted(false);
                      window.speechSynthesis?.cancel();
                    }}
                    style={{ background: 'transparent', border: 'none', color: '#71717a', fontSize: '13px', cursor: 'pointer', outline: 'none' }}
                  >
                    ✕
                  </button>
                </div>
                <p style={{ margin: 0, fontSize: '12.5px', lineHeight: 1.5, color: '#e4e4e7', fontWeight: 500 }}>
                  {activeToast.message}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </>
  )
}
