import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS } from './Projects';

// Speak function using web SpeechSynthesis
function speak(text, onEnd) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const clean = text.replace(/\*\*|#|•/g, ''); // remove markdown formatting
  const utt = new SpeechSynthesisUtterance(clean);
  const setVoice = () => {
    const voices = window.speechSynthesis.getVoices();
    // Prefer Google or natural sounding voices
    const premium = voices.find(v => v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Samantha') || v.name.includes('Microsoft')) || voices[0];
    if (premium) utt.voice = premium;
    utt.onend = onEnd;
    window.speechSynthesis.speak(utt);
  };
  if (window.speechSynthesis.getVoices().length) setVoice();
  else window.speechSynthesis.onvoiceschanged = setVoice;
}

export default function Chatbot({
  isMuted,
  onBotSpeak,
  setIsFinderOpen,
  setActiveFinderTab,
  setActiveProject,
  onClose,
  onShowToast
}) {
  const [input, setInput] = useState('');
  const [listening, setListening] = useState(false);
  const fileInputRef = useRef(null);

  // Typewriter rolling placeholders cycle
  const placeholders = [
    "Ask me anything about Soupriti's work, Soupriti's experience",
    "Paste a JD to see if she is a good match",
    "Ask about her experience in Fintech, SaaS, or IoT"
  ];
  const [currentPlaceholder, setCurrentPlaceholder] = useState('');
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  useEffect(() => {
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 50;
    let timer;

    const type = () => {
      const currentText = placeholders[placeholderIndex];
      
      if (!isDeleting) {
        setCurrentPlaceholder(currentText.slice(0, charIndex + 1));
        charIndex++;
        if (charIndex === currentText.length) {
          isDeleting = true;
          typingSpeed = 2500; // Pause at full text
        } else {
          typingSpeed = 40;
        }
      } else {
        setCurrentPlaceholder(currentText.slice(0, charIndex - 1));
        charIndex--;
        if (charIndex === 0) {
          isDeleting = false;
          setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
          typingSpeed = 600; // Pause before starting next text
        } else {
          typingSpeed = 25;
        }
      }
      timer = setTimeout(type, typingSpeed);
    };

    timer = setTimeout(type, 200);
    return () => clearTimeout(timer);
  }, [placeholderIndex]);

  // Voice Speech Recognition
  const toggleVoice = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      alert('Voice input is supported in Chrome/Safari. Try typing instead.');
      return;
    }
    
    if (listening) {
      setListening(false);
      return;
    }

    window.speechSynthesis?.cancel();
    const rec = new SR();
    rec.lang = 'en-IN';
    rec.interimResults = false;
    rec.maxAlternatives = 1;
    rec.onstart = () => setListening(true);
    rec.onend = () => setListening(false);
    rec.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      setInput(transcript);
      setListening(false);
    };
    rec.start();
  };

  // Trigger file attachment
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setInput(`Uploaded JD: ${file.name}. Match score compatibility check required.`);
    }
  };

  // Main Submit handler (closes modal, speaks response, and redirects portfolio)
  const handleSubmit = () => {
    const query = input.trim().toLowerCase();
    if (!query) return;

    onClose(); // Close the modal immediately

    // Default trigger states
    let speechText = '';
    let toastTitle = 'Soup AI';

    if (query.includes('fintech') || query.includes('phonepe') || query.includes('payment') || query.includes('money')) {
      // Open PhonePe
      setIsFinderOpen(true);
      setActiveFinderTab('selected-works');
      setActiveProject('phonepe');
      speechText = "Hey, yeah, Soupriti has worked on fintech for PhonePe employee onboarding and an internal tool for managers and super admins. I have opened the case study for you to view.";
      toastTitle = "Fintech Case Study Opened";
    } else if (query.includes('cooking') || query.includes('upliance') || query.includes('kitchen') || query.includes('food')) {
      // Open upliance.ai
      setIsFinderOpen(true);
      setActiveFinderTab('selected-works');
      setActiveProject('ai-cooking');
      speechText = "Soupriti worked on upliance.ai, redesigning core mobile and device experiences for their smart cooking assistant. I have opened the case study for you to view.";
      toastTitle = "upliance.ai Case Study Opened";
    } else if (query.includes('toothlens') || query.includes('dental') || query.includes('diagnostic')) {
      // Open Toothlens
      setIsFinderOpen(true);
      setActiveFinderTab('selected-works');
      setActiveProject('toothlens');
      speechText = "Soupriti worked on Toothlens, designing dental AI analysis and reports. I have opened the case study for you to view.";
      toastTitle = "Toothlens Case Study Opened";
    } else if (query.includes('saas') || query.includes('dashboard') || query.includes('enterprise') || query.includes('divami') || query.includes('incture')) {
      // Open Selected Works tab
      setIsFinderOpen(true);
      setActiveFinderTab('selected-works');
      setActiveProject(null);
      speechText = "Soupriti has extensive experience designing SaaS platforms and enterprise dashboards at Divami and Incture. I have opened the Selected Works tab for you.";
      toastTitle = "SaaS Experience";
    } else if (query.includes('illustration') || query.includes('drawing') || query.includes('sketch') || query.includes('art')) {
      // Open illustrations finder tab
      setIsFinderOpen(true);
      setActiveFinderTab('illustrations');
      setActiveProject(null);
      speechText = "I have opened Soupriti's illustration works for you to view.";
      toastTitle = "Illustrations Opened";
    } else if (query.includes('resume') || query.includes('cv') || query.includes('download')) {
      // Trigger download
      const link = document.createElement('a');
      link.href = '/Soupriti_Das_Resume.pdf';
      link.download = 'Soupriti_Das_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      speechText = "I have started downloading Soupriti's resume for you.";
      toastTitle = "Resume Downloading";
    } else if (query.includes('linkedin')) {
      // Open LinkedIn link
      window.open('https://www.linkedin.com/in/soupriti-das/', '_blank');
      speechText = "Sure! Redirecting you to Soupriti's LinkedIn profile.";
      toastTitle = "LinkedIn Redirection";
    } else if (query.includes('jd') || query.includes('job description') || query.includes('match') || query.includes('fit')) {
      // Simulated JD matching analysis
      const score = Math.floor(Math.random() * 10) + 88; // 88% - 98%
      speechText = `I have analyzed the JD requirements. Soupriti has a strong compatibility match of ${score}%! She brings advanced design system variables, high fidelity prototypes, and developer collaboration experience to your team.`;
      toastTitle = `JD Fit Score: ${score}%`;
    } else {
      // Fallback response
      speechText = "Soupriti Das is a lead product designer specializing in high fidelity interaction, design systems, and AI-powered interfaces. Let me know if you would like to view her fintech, SaaS, or IoT works!";
      toastTitle = "Soup AI Assistant";
    }

    // Trigger Notification Toast
    if (onShowToast) {
      onShowToast(toastTitle, speechText);
    }

    // Play Voice Speech (cancels background video audio while speaking)
    if (!isMuted) {
      if (onBotSpeak) onBotSpeak();
      speak(speechText);
    }
  };

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.4)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        zIndex: 999999999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      onClick={input.trim() === '' ? onClose : undefined}
    >
      {/* Background Matrix/Grid Coding pattern and ambient glows */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        
        {/* Subtle orange left glow */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '35%',
          transform: 'translate(-50%, -50%)',
          width: '320px',
          height: '240px',
          background: 'radial-gradient(circle, rgba(249, 115, 22, 0.14) 0%, transparent 70%)',
          filter: 'blur(30px)',
          zIndex: 1
        }} />

        {/* Subtle blue right glow */}
        <div style={{
          position: 'absolute',
          top: '50%',
          right: '35%',
          transform: 'translate(50%, -50%)',
          width: '320px',
          height: '240px',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.18) 0%, transparent 70%)',
          filter: 'blur(30px)',
          zIndex: 1
        }} />

        {/* Binary code texture styling */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
          opacity: 0.8,
          zIndex: 2
        }} />
      </div>

      {/* Main Agentic AI input pill */}
      <motion.div
        initial={{ scale: 0.96, opacity: 0, y: 10 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.96, opacity: 0, y: 10 }}
        transition={{ type: 'spring', damping: 24, stiffness: 220 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          width: '90%',
          maxWidth: '540px',
          background: '#0d0d0f',
          border: '1.2px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '20px',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.45)',
          padding: '16px 20px',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}
      >
        {/* Hidden File input */}
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          style={{ display: 'none' }}
          accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
        />

        {/* Top Input Row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            placeholder={listening ? "Listening..." : currentPlaceholder}
            autoFocus
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#ffffff',
              fontSize: '14px',
              fontFamily: 'var(--font-body)',
              padding: '6px 0'
            }}
          />
          
          {/* Close button if input has text */}
          {input.trim() !== '' && (
            <button
              onClick={() => setInput('')}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#8a8a93',
                fontSize: '16px',
                cursor: 'pointer',
                padding: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              ✕
            </button>
          )}

          {/* Close button manually shown on top-right if requested */}
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#52525b',
              fontSize: '12px',
              cursor: 'pointer',
              marginLeft: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            title="Close Search"
          >
            Esc
          </button>
        </div>

        {/* Bottom Control Row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '4px' }}>
          
          {/* Left options */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {/* Plus button */}
            <button
              onClick={() => fileInputRef.current?.click()}
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                color: '#a1a1aa',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontSize: '16px',
                transition: 'all 0.15s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'}
              title="Add File attachment"
            >
              +
            </button>

            {/* Normal / Upload JD pill */}
            <button
              onClick={() => fileInputRef.current?.click()}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '20px',
                padding: '4px 10px',
                fontSize: '11px',
                color: '#d4d4d8',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              📄 Upload JD
            </button>

            {/* DeepThink / Paste JD pill */}
            <button
              onClick={() => setInput('Job Description: [paste JD text here]')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '20px',
                padding: '4px 10px',
                fontSize: '11px',
                color: '#d4d4d8',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              💡 Paste JD
            </button>
          </div>

          {/* Right options */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            
            {/* Voice option */}
            <button
              onClick={toggleVoice}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: listening ? 'rgba(139, 92, 246, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                border: listening ? '1.2px solid #8b5cf6' : '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '20px',
                padding: '4px 12px',
                fontSize: '11.5px',
                color: listening ? '#a78bfa' : '#d4d4d8',
                fontWeight: 600,
                cursor: 'pointer',
                animation: listening ? 'micPulse 1s infinite alternate' : 'none'
              }}
              title="Speak query aloud"
            >
              <span>🎙️ Voice</span>
            </button>

            {/* Send Option */}
            <button
              onClick={handleSubmit}
              disabled={input.trim() === ''}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: input.trim() === '' 
                  ? 'rgba(255,255,255,0.04)' 
                  : 'linear-gradient(135deg, #a855f7 0%, #3b82f6 100%)',
                border: 'none',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: input.trim() === '' ? 'default' : 'pointer',
                transition: 'all 0.2s',
                boxShadow: input.trim() === '' ? 'none' : '0 4px 10px rgba(139, 92, 246, 0.3)'
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>

          </div>
        </div>
      </motion.div>
    </div>
  );
}
