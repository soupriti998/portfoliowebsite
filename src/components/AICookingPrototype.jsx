import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Play, Pause, Square, ArrowLeft, Heart, CheckCircle2, Info, Clock, Thermometer, Fan, Scale, Droplets } from 'lucide-react';

/* ── Asset placeholders (Replace with actual paths when ready) ── */
const ASSETS = {
  murgCurry: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&q=80&w=400',
  butterChicken: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&q=80&w=400',
  mangoDal: 'https://images.unsplash.com/photo-1548943487-a2e4d43b4850?auto=format&fit=crop&q=80&w=400',
  paneerChilli: 'https://images.unsplash.com/photo-1551881192-002d02bb87e4?auto=format&fit=crop&q=80&w=800',
  cookerTopDown: 'https://images.unsplash.com/photo-1585238342024-78d387f4a707?auto=format&fit=crop&q=80&w=400',
  ingredientToorDal: 'https://images.unsplash.com/photo-1515543904379-3d757afe72e4?auto=format&fit=crop&q=80&w=150',
  ingredientWater: 'https://images.unsplash.com/photo-1548839140-29a749e1bc4c?auto=format&fit=crop&q=80&w=150',
  ingredientOnion: 'https://images.unsplash.com/photo-1618512496248-a07ce83aa8cb?auto=format&fit=crop&q=80&w=150',
  ingredientCoriander: 'https://images.unsplash.com/photo-1599909695420-9944a991cb8c?auto=format&fit=crop&q=80&w=150',
  ingredientTomato: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=150',
  ingredientBesan: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=150',
};

// Main State Machine for the prototype
const VIEWS = {
  GRID: 'GRID',
  RECIPE_DETAIL: 'RECIPE_DETAIL',
  STEP_ADD_INGREDIENT: 'STEP_ADD_INGREDIENT',
  CELEBRATION: 'CELEBRATION',
  STEP_SAUTE: 'STEP_SAUTE',
  STEP_PREP: 'STEP_PREP'
};

export default function AICookingPrototype() {
  const [currentView, setCurrentView] = useState(VIEWS.GRID);
  const [activeRecipe, setActiveRecipe] = useState(null);
  const [cookingTimeLeft, setCookingTimeLeft] = useState(178); // seconds (2:58)
  const [isCooking, setIsCooking] = useState(false);
  const [textureSelection, setTextureSelection] = useState('Default');

  const [tasteModalOpen, setTasteModalOpen] = useState(false);
  const [spiceLevel, setSpiceLevel] = useState('standard');
  const [saltLevel, setSaltLevel] = useState('standard');

  // Colors based on screenshots
  const colors = {
    bgLight: '#F3F4F6',
    bgWhite: '#FFFFFF',
    textDark: '#1E1E2D',
    textMuted: '#6E6E82',
    accentOrange: '#FF7A00',
    accentPurple: '#4B32C3',
    lightPurple: '#EBE5F7',
    border: '#E2E2EA',
    green: '#00C853',
    bgGray: '#E5E7EB'
  };

  const handleTextureChange = (type) => {
    setTextureSelection(type);
    if (type === 'Brown Onions' || type === 'Golden Onions') {
      setCookingTimeLeft(178 + 120); // add 2 mins
    } else {
      setCookingTimeLeft(178);
    }
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s} min`;
  };

  // 1. Grid View (Home)
  const renderGrid = () => (
    <div style={{ padding: '24px', background: colors.bgLight, height: '100%', overflowY: 'auto' }}>
      <h3 style={{ fontSize: '18px', fontWeight: 600, color: colors.textDark, marginBottom: '16px' }}>The Chicken Edit</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px' }}>
        
        {/* Recipe Card */}
        {[
          { title: 'Murg Curry', img: ASSETS.murgCurry, time: '39 min', tag: 'Most Favorited' },
          { title: 'Butter Chicken', img: ASSETS.butterChicken, time: '48 min', tag: 'Most Favorited' },
          { title: 'Mango Toor Dal', img: ASSETS.mangoDal, time: '21 min', tag: 'High Repeat Rate', id: 'mango-dal' }
        ].map((recipe, idx) => (
          <div 
            key={idx} 
            onClick={() => { setActiveRecipe(recipe); setCurrentView(VIEWS.RECIPE_DETAIL); }}
            style={{ 
              background: colors.bgWhite, borderRadius: '16px', overflow: 'hidden', cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)', transition: 'transform 0.2s'
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={{ position: 'relative', height: '160px' }}>
              <img src={recipe.img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt={recipe.title} />
              <div style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(0,0,0,0.4)', borderRadius: '50%', padding: '6px' }}>
                <Heart size={16} color="white" />
              </div>
            </div>
            <div style={{ padding: '16px' }}>
              <h4 style={{ fontSize: '16px', fontWeight: 600, margin: '0 0 8px 0' }}>{recipe.title}</h4>
              <div style={{ display: 'inline-block', padding: '4px 8px', background: recipe.tag.includes('Favorited') ? '#FFEAE8' : '#E0F2FE', color: recipe.tag.includes('Favorited') ? '#E53E3E' : '#0284C7', fontSize: '11px', fontWeight: 700, borderRadius: '4px', marginBottom: '12px' }}>
                {recipe.tag}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: colors.textMuted }}>
                <Clock size={14} /> {recipe.time}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // 2. Recipe Detail
  const renderRecipeDetail = () => (
    <div style={{ background: colors.bgWhite, height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px', borderBottom: `1px solid ${colors.border}` }}>
        <button onClick={() => setCurrentView(VIEWS.GRID)} style={{ background: colors.bgLight, border: 'none', width: 40, height: 40, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <ArrowLeft size={20} color={colors.textDark} />
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: colors.bgLight, padding: '8px 16px', borderRadius: '24px', fontSize: '13px', fontWeight: 500 }}>
          01:27am <span style={{ background: 'white', width: 20, height: 20, borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>?</span>
        </div>
      </div>

      <div style={{ display: 'flex', flex: 1, padding: '32px 40px', gap: '48px', overflowY: 'auto' }}>
        {/* Left Image */}
        <div style={{ flex: '0 0 400px', borderRadius: '32px', overflow: 'hidden' }}>
          <img src={activeRecipe?.img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Recipe" />
        </div>
        
        {/* Right Info */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '16px 0' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 600, color: colors.accentPurple, margin: '0 0 16px 0' }}>{activeRecipe?.title}</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: colors.textMuted, fontSize: '14px', marginBottom: '32px' }}>
            <Clock size={16} /> Cook: {activeRecipe?.time}
          </div>

          <div 
            onClick={() => setTasteModalOpen(true)}
            style={{ background: colors.bgLight, padding: '16px 24px', borderRadius: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', cursor: 'pointer' }}
          >
            <div style={{ display: 'flex', gap: '24px', fontSize: '14px', fontWeight: 500 }}>
              <span>🌶️ Spice: {spiceLevel === 'standard' ? 'Default' : spiceLevel}</span>
              <span style={{ color: colors.border }}>|</span>
              <span>🧂 Salt: {saltLevel === 'standard' ? 'Default' : saltLevel}</span>
            </div>
            <button style={{ background: colors.accentPurple, color: 'white', border: 'none', width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: '12px' }}>⎚</span>
            </button>
          </div>

          <div style={{ display: 'flex', gap: '16px', marginBottom: '40px' }}>
            <button style={{ flex: 1, padding: '16px', background: colors.bgLight, border: 'none', borderRadius: '12px', fontWeight: 600, color: colors.textDark }}>Ingredients & Cookware</button>
            <button style={{ padding: '16px 32px', background: colors.bgLight, border: 'none', borderRadius: '12px', fontWeight: 600, color: colors.textDark }}>318 Kcal</button>
          </div>

          <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'flex-end', paddingBottom: '24px' }}>
            <button onClick={() => setCurrentView(VIEWS.STEP_ADD_INGREDIENT)} style={{ background: colors.accentOrange, color: 'white', border: 'none', padding: '16px 48px', borderRadius: '32px', fontSize: '16px', fontWeight: 600, cursor: 'pointer', boxShadow: '0 8px 24px rgba(255, 122, 0, 0.3)' }}>
              Start Cooking
            </button>
          </div>
        </div>
      </div>

      <BottomStatusBar activeCooking={false} time="" />

      {tasteModalOpen && (
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>
          <div style={{ background: 'white', width: '600px', borderRadius: '24px', overflow: 'hidden' }}>
            <div style={{ padding: '24px', borderBottom: `1px solid ${colors.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 600, color: colors.textDark, margin: 0 }}>Taste Preferences</h3>
              <button onClick={() => setTasteModalOpen(false)} style={{ background: colors.accentOrange, color: 'white', border: 'none', padding: '8px 24px', borderRadius: '24px', fontWeight: 600, cursor: 'pointer' }}>Apply</button>
            </div>
            
            <div style={{ padding: '32px 24px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
              {/* Spice */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '16px', fontWeight: 500 }}>
                  🌶️ Spice Level
                </div>
                <div style={{ display: 'flex', border: `1px solid ${colors.border}`, borderRadius: '32px', overflow: 'hidden' }}>
                  {['light', 'standard', 'extra'].map(level => (
                    <button 
                      key={level}
                      onClick={() => setSpiceLevel(level)}
                      style={{ 
                        padding: '12px 24px', 
                        border: 'none',
                        background: spiceLevel === level ? colors.accentPurple : 'transparent',
                        color: spiceLevel === level ? 'white' : colors.textMuted,
                        fontWeight: spiceLevel === level ? 600 : 500,
                        cursor: 'pointer'
                      }}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              {/* Salt */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: `1px solid ${colors.border}`, paddingTop: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '16px', fontWeight: 500 }}>
                  🧂 Salt Level
                </div>
                <div style={{ display: 'flex', border: `1px solid ${colors.border}`, borderRadius: '32px', overflow: 'hidden' }}>
                  {['light', 'standard', 'extra'].map(level => (
                    <button 
                      key={level}
                      onClick={() => setSaltLevel(level)}
                      style={{ 
                        padding: '12px 24px', 
                        border: 'none',
                        background: saltLevel === level ? colors.accentPurple : 'transparent',
                        color: saltLevel === level ? 'white' : colors.textMuted,
                        fontWeight: saltLevel === level ? 600 : 500,
                        cursor: 'pointer'
                      }}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // 3. Step 1: Free Scroll Cooking Feed
  const renderAddIngredients = () => (
    <div style={{ background: colors.bgGray, height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Floating Top Nav */}
      <div style={{ padding: '0 24px', marginTop: '24px', zIndex: 10, flexShrink: 0 }}>
        <div style={{ 
          background: colors.bgWhite, 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          padding: '12px 24px',
          borderRadius: '32px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.06)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button onClick={() => setCurrentView(VIEWS.RECIPE_DETAIL)} style={{ background: colors.bgLight, border: 'none', width: 40, height: 40, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s' }}>
              <ArrowLeft size={18} color={colors.textDark} />
            </button>
            <span style={{ fontSize: '18px', fontWeight: 700, color: colors.textDark }}>{activeRecipe?.title || 'Paneer Chilli'}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: colors.bgLight, padding: '8px 16px', borderRadius: '24px', fontSize: '14px', fontWeight: 600, color: colors.textDark }}>
            01:27am <span style={{ background: 'white', width: 24, height: 24, borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: colors.textDark }}>?</span>
          </div>
        </div>
      </div>

      <div style={{ flex: 1, padding: '0 24px', overflowY: 'auto', display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '100%', maxWidth: '720px', padding: '32px 0', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {/* STEP 01 HEADER */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 16px' }}>
            <div style={{ fontSize: '12px', fontWeight: 700, color: colors.textMuted }}>STEP 01 <span style={{ color: colors.accentPurple, marginLeft: '8px', fontSize: '14px' }}>Saute Aromatics</span></div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: colors.textMuted }}>
              <Clock size={14} /> 5 min <ChevronDown size={14} />
            </div>
          </div>

          {/* Card: Add to Jar */}
          <div style={{ background: colors.bgLight, borderRadius: '24px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', border: `1px solid ${colors.bgWhite}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, color: colors.accentPurple }}>
              <span style={{ fontSize: '20px' }}>🗑️</span> Add to Jar
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { name: 'Ginger', desc: 'Prep', img: ASSETS.ingredientBesan, weight: '60g' },
                { name: 'Tomato', desc: 'Cut into 2', img: ASSETS.ingredientTomato, weight: '1.5 Large', isLarge: true }
              ].map((ing, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 16px', background: colors.bgWhite, borderRadius: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <img src={ing.img} style={{ width: 40, height: 40, borderRadius: '8px', objectFit: 'cover' }} alt={ing.name} />
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 500, color: colors.accentPurple }}>{ing.name}</div>
                      <div style={{ fontSize: '12px', color: colors.textMuted }}>{ing.desc}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <ChevronDown size={16} color={colors.textMuted} />
                    <div style={{ padding: '8px 16px', background: colors.lightPurple, color: colors.accentPurple, borderRadius: '8px', fontWeight: 600, fontSize: '13px' }}>
                      {ing.isLarge ? '💭' : '⚖'} {ing.weight}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px', padding: '0 8px' }}>
              <span style={{ fontSize: '14px', color: colors.accentPurple, fontWeight: 500 }}>Go to next step?</span>
              <button onClick={() => setCurrentView(VIEWS.STEP_SAUTE)} style={{ background: colors.accentOrange, color: 'white', border: 'none', padding: '10px 32px', borderRadius: '24px', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>Done</button>
            </div>
          </div>

          {/* Card: Boiling Tomatoes */}
          <div style={{ background: colors.bgWhite, borderRadius: '24px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, color: colors.textDark }}>
              <span style={{ color: colors.textMuted }}>≀≀≀</span> Boiling Tomatoes
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ fontSize: '18px', color: colors.accentPurple, maxWidth: '200px', lineHeight: '1.4' }}>
                Place the <span style={{ fontWeight: 600 }}>Crown</span> in before you start the next step.
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <span style={{ fontSize: '24px' }}>↓</span>
                <div style={{ width: 64, height: 64, background: '#333', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '10px' }}>CROWN</div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '18px', fontWeight: 600, color: colors.accentPurple }}>
                <Clock size={20} /> 05:00
              </div>
              <button onClick={() => setCurrentView(VIEWS.CELEBRATION)} style={{ background: colors.accentOrange, color: 'white', border: 'none', padding: '12px 40px', borderRadius: '24px', fontSize: '15px', fontWeight: 600, cursor: 'pointer' }}>
                Start
              </button>
            </div>
          </div>

          {/* Card: Marinate the Paneer */}
          <div style={{ background: colors.bgLight, borderRadius: '24px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', border: `1px solid ${colors.bgWhite}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, color: colors.accentPurple }}>
              <span style={{ fontSize: '20px' }}>◩</span> Marinate the Paneer
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { name: 'Coriander', desc: 'Chopped', img: ASSETS.ingredientCoriander, weight: '60g' },
                { name: 'Chilli Flakes', desc: '', img: ASSETS.ingredientWater, weight: '1.5 Large', isLarge: true },
                { name: 'Origano', desc: '', img: ASSETS.ingredientToorDal, weight: '1.5 Large', isLarge: true }
              ].map((ing, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 16px', background: colors.bgWhite, borderRadius: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <img src={ing.img} style={{ width: 40, height: 40, borderRadius: '8px', objectFit: 'cover' }} alt={ing.name} />
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 500, color: colors.accentPurple }}>{ing.name}</div>
                      {ing.desc && <div style={{ fontSize: '12px', color: colors.textMuted }}>{ing.desc}</div>}
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <ChevronDown size={16} color={colors.textMuted} />
                    <div style={{ padding: '8px 16px', background: colors.lightPurple, color: colors.accentPurple, borderRadius: '8px', fontWeight: 600, fontSize: '13px' }}>
                      {ing.isLarge ? '💭' : '⚖'} {ing.weight}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px', padding: '0 8px' }}>
              <span style={{ fontSize: '14px', color: colors.accentPurple, fontWeight: 500 }}>Go to next step?</span>
              <button onClick={() => setCurrentView(VIEWS.STEP_SAUTE)} style={{ background: colors.accentOrange, color: 'white', border: 'none', padding: '10px 32px', borderRadius: '24px', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>Next</button>
            </div>
          </div>

          {/* Card: Drain the prawns */}
          <div style={{ background: colors.bgWhite, borderRadius: '24px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, color: colors.accentPurple }}>
              <span>📋</span> Drain the prawns.
            </div>
            <div style={{ fontSize: '15px', color: colors.accentPurple, lineHeight: '1.5' }}>
              Rinse the frozen shrimp in hot water and give them a quick soak.
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
              <span style={{ fontSize: '14px', color: colors.accentPurple, fontWeight: 500 }}>Go to next step?</span>
              <button style={{ background: colors.accentOrange, color: 'white', border: 'none', padding: '10px 32px', borderRadius: '24px', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>Next</button>
            </div>
          </div>

          {/* Collapsed Steps */}
          {[
            { num: '02', name: 'Air-Fry Chicken', time: '10 min' },
            { num: '03', name: 'Steam Rice', time: '15 min' },
            { num: '04', name: 'Layer & Garnish', time: '20 min' },
            { num: '05', name: 'Simmering Together', time: '25 min' }
          ].map((step, idx) => (
             <div key={idx} style={{ background: colors.bgWhite, borderRadius: '16px', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                 <span style={{ fontSize: '10px', fontWeight: 700, color: colors.textMuted }}>STEP {step.num}</span>
                 <span style={{ fontSize: '14px', fontWeight: 500, color: colors.accentPurple }}>{step.name}</span>
               </div>
               <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: colors.textMuted }}>
                 <Clock size={14} /> {step.time} <ChevronDown size={14} />
               </div>
             </div>
          ))}

        </div>
      </div>
      
      {/* Bottom Status Bar */}
      <BottomStatusBar activeCooking={false} time="" />
    </div>
  );

  // 4. Celebration Screen (Transition)
  const renderCelebration = () => (
    <div style={{ background: colors.accentPurple, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white', animation: 'fadeIn 0.5s' }}>
      <div style={{ fontSize: '64px', marginBottom: '24px', animation: 'bounce 2s infinite' }}>🌱</div>
      <h2 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '16px' }}>Hey, you were fast!</h2>
      <p style={{ fontSize: '18px', opacity: 0.8, marginBottom: '40px' }}>You just planted a virtual tree by cooking efficiently.</p>
      <button onClick={() => setCurrentView(VIEWS.STEP_SAUTE)} style={{ background: colors.accentOrange, color: 'white', border: 'none', padding: '16px 48px', borderRadius: '32px', fontSize: '16px', fontWeight: 600, cursor: 'pointer' }}>
        Continue to next step
      </button>
      
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }
      `}</style>
    </div>
  );

  // 5. Saute (Texture Settings) & 6. Prep Step (Combined as shown in screenshots)
  const renderSauteAndPrep = () => (
    <div style={{ background: colors.bgLight, height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Floating Top Nav */}
      <div style={{ padding: '0 24px', marginTop: '24px', zIndex: 10 }}>
        <div style={{ 
          background: colors.bgWhite, 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          padding: '12px 24px',
          borderRadius: '32px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.06)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button onClick={() => setCurrentView(VIEWS.STEP_ADD_INGREDIENT)} style={{ background: colors.bgLight, border: 'none', width: 40, height: 40, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s' }}>
              <ArrowLeft size={18} color={colors.textDark} />
            </button>
            <span style={{ fontSize: '18px', fontWeight: 700, color: colors.textDark }}>{activeRecipe?.title || 'Paneer Chilli By Shashi'}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: colors.bgLight, padding: '8px 16px', borderRadius: '24px', fontSize: '14px', fontWeight: 600, color: colors.textDark }}>
            Help <span style={{ background: 'white', width: 24, height: 24, borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: colors.textDark }}>?</span>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flex: 1, padding: '24px', gap: '24px', overflow: 'hidden' }}>
        {/* Left Column: Video/Action */}
        <div style={{ flex: '0 0 320px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ background: colors.bgWhite, borderRadius: '16px', padding: '24px', textAlign: 'center', position: 'relative', height: '400px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: colors.textMuted, fontSize: '13px', position: 'absolute', top: 24 }}>Play the prep of this step</span>
            <div style={{ width: 64, height: 64, background: colors.bgLight, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Play size={24} color={colors.border} fill={colors.border} />
            </div>
            {/* Speech bubble pointer */}
            <div style={{ position: 'absolute', right: -12, top: 40, width: 24, height: 24, background: colors.bgWhite, transform: 'rotate(45deg)' }}></div>
          </div>
        </div>

        {/* Right Column: Scrollable Content */}
        <div style={{ flex: 1, position: 'relative' }}>
          <div style={{ height: '100%', overflowY: 'auto', paddingRight: '24px', display: 'flex', flexDirection: 'column', gap: '16px', scrollBehavior: 'smooth' }}>

            {/* Collect Ingredients (Prep) Card */}
            <div style={{ background: colors.bgWhite, borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.02)', marginTop: '8px' }}>
              <div style={{ padding: '24px', borderBottom: `1px solid ${colors.border}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: 40, height: 40, background: colors.lightPurple, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: '20px' }}>📦</span>
                  </div>
                  <div>
                    <h4 style={{ fontSize: '18px', fontWeight: 600, color: colors.accentPurple, margin: 0 }}>Collect these Ingredients</h4>
                    <span style={{ fontSize: '14px', color: colors.textMuted }}>While upliance cooks.</span>
                  </div>
                </div>
              </div>

              <div style={{ background: colors.lightPurple, padding: '16px 24px', display: 'flex', alignItems: 'center', gap: '8px', color: colors.accentPurple, fontSize: '14px', fontWeight: 500 }}>
                <span style={{ transform: 'scaleX(-1)', display: 'inline-block' }}>↻</span> For next step
              </div>

              <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px', background: colors.bgLight }}>
                {[
                  { name: 'Basan', img: ASSETS.ingredientBesan, weight: '200g' },
                  { name: 'Water', img: ASSETS.ingredientWater, weight: '200g' },
                  { name: 'Tomato', img: ASSETS.ingredientTomato, weight: '200g', desc: 'Peeled' }
                ].map((ing, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: colors.bgWhite, borderRadius: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <img src={ing.img} style={{ width: 40, height: 40, borderRadius: '8px', objectFit: 'cover' }} alt={ing.name} />
                      <div>
                        <div style={{ fontSize: '15px', fontWeight: 500, color: colors.accentPurple }}>{ing.name}</div>
                        {ing.desc && <div style={{ fontSize: '12px', color: colors.textMuted }}>{ing.desc}</div>}
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <ChevronDown size={16} color={colors.textMuted} />
                      <div style={{ padding: '8px 16px', background: colors.lightPurple, color: colors.accentPurple, borderRadius: '8px', fontWeight: 600, fontSize: '13px' }}>
                        ⚖ {ing.weight}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
          
          {/* Custom Scrollbar visual indicator */}
          <div style={{ position: 'absolute', right: 0, top: '10%', bottom: '10%', width: '8px', background: colors.border, borderRadius: '4px' }}>
            <div style={{ width: '100%', height: '40px', background: colors.accentPurple, borderRadius: '4px' }}></div>
          </div>
        </div>
      </div>

      {/* Bottom Status Bar */}
      <BottomStatusBar activeCooking={true} time={formatTime(cookingTimeLeft)} />
    </div>
  );

  const BottomStatusBar = ({ activeCooking, time }) => (
    <div style={{ padding: '8px 32px', background: colors.bgWhite, borderTop: `1px solid ${colors.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderRadius: '0 0 32px 32px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600 }}>
        <div style={{ position: 'relative' }}>
          <span style={{ fontSize: '24px' }}>🗑️</span>
          <div style={{ position: 'absolute', right: -4, bottom: -4, background: colors.green, borderRadius: '50%', padding: '2px' }}>
            <CheckCircle2 size={12} color="white" />
          </div>
        </div>
        24c
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: colors.bgLight, padding: '8px 16px', borderRadius: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: activeCooking ? colors.accentPurple : colors.textMuted, fontWeight: 600 }}>
           <Thermometer size={16} /> {activeCooking ? 'HIGH' : 'OFF'}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: activeCooking ? colors.accentPurple : colors.textMuted, fontWeight: 600 }}>
           <Fan size={16} /> {activeCooking ? 'STIR(3)' : 'OFF'}
        </div>
      </div>

      {activeCooking && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', background: colors.bgLight, padding: '6px 6px 6px 16px', borderRadius: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: colors.textDark, fontSize: '13px', fontWeight: 500 }}>
            <span style={{ color: colors.green, fontWeight: 700 }}>≀≀≀</span> Cooking Chilli Paneer
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginLeft: '24px' }}>
            <span style={{ fontSize: '13px', fontWeight: 600 }}>{time}</span>
            <button style={{ background: colors.accentOrange, border: 'none', width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', cursor: 'pointer' }}>
               <Pause size={14} fill="currentColor" />
            </button>
          </div>
        </div>
      )}

      {!activeCooking && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: colors.bgLight, padding: '8px 16px', borderRadius: '24px', color: colors.textMuted, fontWeight: 500, fontSize: '14px' }}>
          <Droplets size={16} /> Rinse
        </div>
      )}

      <button style={{ background: colors.bgLight, border: `1px solid ${colors.border}`, width: 44, height: 44, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors.accentPurple, cursor: 'pointer' }}>
        <Scale size={20} />
      </button>
    </div>
  );

  return (
    <div style={{ 
      width: '100%', 
      maxWidth: '1200px', 
      height: '80vh',
      minHeight: '600px',
      margin: '40px auto', 
      background: '#121212', 
      borderRadius: '40px', 
      padding: '24px',
      boxShadow: '0 32px 80px rgba(0,0,0,0.3)'
    }}>
      {/* Tablet Screen Container */}
      <div style={{ 
        width: '100%', 
        height: '100%', 
        background: colors.bgWhite, 
        borderRadius: '32px',
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {currentView === VIEWS.GRID && renderGrid()}
        {currentView === VIEWS.RECIPE_DETAIL && renderRecipeDetail()}
        {currentView === VIEWS.STEP_ADD_INGREDIENT && renderAddIngredients()}
        {currentView === VIEWS.CELEBRATION && renderCelebration()}
        {currentView === VIEWS.STEP_SAUTE && renderSauteAndPrep()}
      </div>
    </div>
  );
}
