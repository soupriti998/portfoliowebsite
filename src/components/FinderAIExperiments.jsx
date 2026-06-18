import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AI_GROUPS = [
  {
    title: "AI Image Generation (upliance)",
    items: [
      { type: "image", src: "/ai_experiments/upliance_website/modern_minimalist_kitchen_counter.png" },
      { type: "image", src: "/ai_experiments/upliance_website/modern_minimalist_kitchen_counter_1.png" },
      { type: "image", src: "/ai_experiments/upliance_website/modern_minimalist_kitchen_setting.png" },
      { type: "image", src: "/ai_experiments/upliance_website/modern_minimalist_kitchen.png" },
      { type: "image", src: "/ai_experiments/upliance_website/old_indian_kitchen_counter.png" }
    ]
  },
  {
    title: "Product Banners & Ads",
    items: [
      { type: "image", src: "/ai_experiments/product_banners/ads_frame_1_1.png" },
      { type: "image", src: "/ai_experiments/product_banners/ads_frame_1410127985.png" },
      { type: "image", src: "/ai_experiments/product_banners/ads_frame_1410127986.png" },
      { type: "image", src: "/ai_experiments/product_banners/ads_frame_1410127987_1.png" },
      { type: "image", src: "/ai_experiments/product_banners/frame_6_from_figma.png" },
      { type: "image", src: "/ai_experiments/product_banners/frame_8_from_figma.png" },
      { type: "image", src: "/ai_experiments/product_banners/binary_bot01_httpss.mj.runmvbvawf4ytu_httpss.mj.rune7ehge1oxy_5dae468b_47df_414b_85ae_b0cc49b0c8ee_2_1.png" }
    ]
  },
  {
    title: "Social Media Ads",
    items: [
      { type: "image", src: "/ai_experiments/social_ads/chatgpt_image_may_9_2026_02_54_26_pm.png" },
      { type: "image", src: "/ai_experiments/social_ads/chatgpt_image_may_9_2026_03_07_02_pm.png" },
      { type: "image", src: "/ai_experiments/social_ads/chatgpt_image_may_9_2026_03_30_20_pm.png" },
      { type: "image", src: "/ai_experiments/social_ads/chatgpt_image_may_9_2026_03_45_12_pm.png" },
      { type: "image", src: "/ai_experiments/social_ads/chatgpt_image_may_9_2026_05_12_33_am.png" },
      { type: "image", src: "/ai_experiments/social_ads/chatgpt_image_may_9_2026_05_12_38_am.png" },
      { type: "image", src: "/ai_experiments/social_ads/chatgpt_image_may_9_2026_05_12_43_am.png" },
      { type: "image", src: "/ai_experiments/social_ads/chatgpt_image_may_9_2026_05_44_37_pm.png" },
      { type: "image", src: "/ai_experiments/social_ads/chatgpt_image_may_9_2026_05_54_51_pm.png" },
      { type: "image", src: "/ai_experiments/social_ads/chatgpt_image_may_9_2026_05_59_46_pm.png" },
      { type: "image", src: "/ai_experiments/social_ads/chatgpt_image_may_9_2026_05_59_56_pm.png" },
      { type: "image", src: "/ai_experiments/social_ads/chatgpt_image_may_9_2026_06_00_03_pm.png" },
      { type: "image", src: "/ai_experiments/social_ads/illustration_02.png" },
      { type: "video", src: "/ai_experiments/social_ads/bottle_drops_into_bag_202605091812.mp4" },
      { type: "video", src: "/ai_experiments/social_ads/recording_bts_content_tote_202605091812.mp4" }
    ]
  },
  {
    title: "Videos",
    items: [
      { type: "video", src: "/ai_experiments/videos/cookin_flow.mp4" },
      { type: "video", src: "/ai_experiments/videos/illustration_mp4.mp4" }
    ]
  },
  {
    title: "Wireframes & Research Charts",
    items: [
      { type: "image", src: "/ai_experiments/wireframes_charts/33b6e75f_2c89_487a_8262_ee33c2a11b40.png" },
      { type: "image", src: "/ai_experiments/wireframes_charts/chatgpt_image_apr_12_2026_10_32_56_pm.png" },
      { type: "image", src: "/ai_experiments/wireframes_charts/chatgpt_image_apr_30_2026_09_41_45_am.png" },
      { type: "image", src: "/ai_experiments/wireframes_charts/chatgpt_image_may_11_2026_08_38_43_pm.png" },
      { type: "image", src: "/ai_experiments/wireframes_charts/chatgpt_image_may_11_2026_08_46_23_pm.png" },
      { type: "image", src: "/ai_experiments/wireframes_charts/chatgpt_image_may_11_2026_08_56_02_pm.png" },
      { type: "image", src: "/ai_experiments/wireframes_charts/chatgpt_image_may_11_2026_08_59_37_pm.png" },
      { type: "image", src: "/ai_experiments/wireframes_charts/chatgpt_image_may_12_2026_01_02_58_pm.png" },
      { type: "image", src: "/ai_experiments/wireframes_charts/chatgpt_image_may_12_2026_01_04_10_pm.png" },
      { type: "image", src: "/ai_experiments/wireframes_charts/chatgpt_image_may_12_2026_05_16_15_pm.png" },
      { type: "image", src: "/ai_experiments/wireframes_charts/chatgpt_image_may_12_2026_05_25_03_pm.png" },
      { type: "image", src: "/ai_experiments/wireframes_charts/chatgpt_image_may_12_2026_12_58_54_pm.png" }
    ]
  }
];

let synthAudioCtx = null;

function playSynthSound(type, isMuted) {
  if (isMuted) return;
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    if (!synthAudioCtx) {
      synthAudioCtx = new AudioContext();
    }
    if (synthAudioCtx.state === 'suspended') {
      synthAudioCtx.resume();
    }
    const now = synthAudioCtx.currentTime;
    const osc = synthAudioCtx.createOscillator();
    const gain = synthAudioCtx.createGain();
    
    osc.connect(gain);
    gain.connect(synthAudioCtx.destination);
    
    if (type === 'hover') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(130, now);
      osc.frequency.exponentialRampToValueAtTime(170, now + 0.05);
      gain.gain.setValueAtTime(0.015, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      osc.start(now);
      osc.stop(now + 0.05);
    } else if (type === 'click') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(380, now);
      osc.frequency.exponentialRampToValueAtTime(80, now + 0.08);
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.start(now);
      osc.stop(now + 0.08);
    }
  } catch (e) {
    console.warn("Synth audio failed:", e);
  }
}

export default function FinderAIExperiments({ isMuted }) {
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [isMaximized, setIsMaximized] = useState(false);

  const handleHover = () => {
    playSynthSound('hover', isMuted);
  };

  const handleMediaClick = (media) => {
    playSynthSound('click', isMuted);
    setSelectedMedia(media);
    setIsMaximized(false);
  };

  return (
    <div style={{ fontFamily: 'var(--font-body)', color: 'var(--text-primary)', paddingBottom: '40px' }}>
      <style>{`
        .bento-masonry-grid {
          column-count: 3;
          column-gap: 16px;
          width: 100%;
          margin-top: 16px;
        }
        @media (max-width: 900px) {
          .bento-masonry-grid {
            column-count: 2;
          }
        }
        @media (max-width: 600px) {
          .bento-masonry-grid {
            column-count: 1;
          }
        }
        .bento-masonry-item {
          break-inside: avoid;
          margin-bottom: 16px;
          border-radius: 14px;
          overflow: hidden;
          background: #ffffff;
          border: 1px solid rgba(0,0,0,0.06);
          box-shadow: 0 2px 8px rgba(0,0,0,0.02);
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease;
          cursor: pointer;
        }
        .bento-masonry-item:hover {
          transform: scale(1.02);
          box-shadow: 0 10px 24px rgba(0,0,0,0.06);
        }
      `}</style>

      <h1 style={{ fontSize: '24px', fontWeight: 700, margin: '0 0 6px 0', color: 'var(--text-primary)' }}>AI Experiments</h1>
      <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: '0 0 28px 0' }}>
        A curated collection of design and media generated using advanced AI image and video models.
      </p>

      {/* Render each folder group */}
      {AI_GROUPS.map((group, gIdx) => (
        <div key={gIdx} style={{ marginBottom: '40px' }}>
          <h2 style={{ 
            fontSize: '15px', 
            fontWeight: 700, 
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            color: '#5b616e',
            borderBottom: '1px solid rgba(0,0,0,0.08)',
            paddingBottom: '8px',
            marginBottom: '16px',
            fontFamily: 'var(--font-mono)'
          }}>
            {group.title}
          </h2>

          <div className="bento-masonry-grid">
            {group.items.map((item, iIdx) => (
              <div 
                key={iIdx}
                className="bento-masonry-item"
                onMouseEnter={handleHover}
                onClick={() => handleMediaClick(item)}
              >
                {item.type === 'video' ? (
                  <video 
                    src={item.src} 
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    style={{ width: '100%', height: 'auto', display: 'block' }} 
                  />
                ) : (
                  <img 
                    src={item.src} 
                    alt="AI Generated Media" 
                    style={{ width: '100%', height: 'auto', display: 'block' }} 
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* iOS Style Zoom Modal */}
      <AnimatePresence>
        {selectedMedia && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.45)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              zIndex: 999999999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '24px',
              cursor: 'zoom-out'
            }}
            onClick={() => {
              playSynthSound('click', isMuted);
              setSelectedMedia(null);
            }}
          >
            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 26, stiffness: 220 }}
              style={{
                position: 'relative',
                background: '#ffffff',
                borderRadius: '20px',
                border: '1px solid rgba(255,255,255,0.4)',
                boxShadow: '0 24px 70px rgba(0,0,0,0.3)',
                padding: '20px',
                maxWidth: isMaximized ? '95vw' : '85vw',
                maxHeight: isMaximized ? '95vh' : '85vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                transition: 'max-width 0.4s var(--ease-out-expo), max-height 0.4s var(--ease-out-expo)'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Window Dot Controls (macOS Sonoma style top bar inside modal) */}
              <div style={{
                position: 'absolute',
                top: '16px',
                left: '20px',
                display: 'flex',
                gap: '8px',
                alignItems: 'center',
                zIndex: 10
              }}>
                {/* Close Dot */}
                <button 
                  onClick={() => {
                    playSynthSound('click', isMuted);
                    setSelectedMedia(null);
                  }}
                  title="Close"
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: '#ff5f56',
                    border: '0.5px solid #e0443e',
                    cursor: 'pointer',
                    padding: 0
                  }}
                />
                {/* Fake Minimize Dot */}
                <button 
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: '#ffbd2e',
                    border: '0.5px solid #de9e26',
                    cursor: 'pointer',
                    padding: 0
                  }}
                />
                {/* Maximize/Expand Dot */}
                <button 
                  onClick={() => {
                    playSynthSound('click', isMuted);
                    setIsMaximized(!isMaximized);
                  }}
                  title="Maximize"
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: '#27c93f',
                    border: '0.5px solid #1aab29',
                    cursor: 'pointer',
                    padding: 0
                  }}
                />
              </div>

              {/* Render Media */}
              <div style={{ 
                marginTop: '24px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                width: '100%',
                height: '100%',
                maxHeight: isMaximized ? 'calc(95vh - 70px)' : 'calc(85vh - 70px)',
                overflow: 'auto'
              }}>
                {selectedMedia.type === 'video' ? (
                  <video 
                    src={selectedMedia.src} 
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    controls
                    style={{ 
                      maxWidth: '100%', 
                      maxHeight: '100%', 
                      borderRadius: '12px', 
                      display: 'block',
                      objectFit: 'contain'
                    }} 
                  />
                ) : (
                  <img 
                    src={selectedMedia.src} 
                    alt="AI Generated Media Expanded" 
                    style={{ 
                      maxWidth: 'max-content', 
                      maxHeight: 'max-content', 
                      borderRadius: '12px', 
                      display: 'block'
                    }} 
                  />
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
