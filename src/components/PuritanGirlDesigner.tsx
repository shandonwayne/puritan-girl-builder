import { useState } from 'react';
import LayeredCharacter from './LayeredCharacter';
import face1SVG from '../assets/faces/face_1.svg';
import face2SVG from '../assets/faces/face_2.svg';
import face3SVG from '../assets/faces/face_3.svg';
import face4SVG from '../assets/faces/face_4.svg';
import face5SVG from '../assets/faces/face_5.svg';
import hairstyle1Btn from '../assets/hairstyle_1_btn.png';
import hairstyle2Btn from '../assets/hairstyle_2_btn.png';
import hairstyle3Btn from '../assets/hairstyle_3_btn.png';
import dressSimpleBodiceSVG from '../assets/simple_bodice.svg';
import dressCollaredSVG from '../assets/collared.svg';
import dressApronSVG from '../assets/apron_style.svg';
import dressLacedSVG from '../assets/laced_bodice.svg';
import dressClassicSVG from '../assets/classic.svg';
import dressRuffledSVG from '../assets/ruffled.svg';

const SKIN_TONES = [
  { id: 'fair', name: 'Fair', color: '#FADADD' },
  { id: 'light', name: 'Light', color: '#E8B2AB' },
  { id: 'medium', name: 'Medium', color: '#ECAB94' },
  { id: 'warm', name: 'Warm', color: '#D4A574' },
  { id: 'tan', name: 'Tan', color: '#75513D' },
  { id: 'deeptan', name: 'Deep Tan', color: '#5C3A21' },
  { id: 'brown', name: 'Brown', color: '#3E2D25' },
  { id: 'deepbrown', name: 'Deep Brown', color: '#2B1810' },
  { id: 'palegreen', name: 'Pale Green', color: '#D4F1D4' },
  { id: 'palelavender', name: 'Pale Lavender', color: '#E6D9F5' },
];

const FACE_TYPES = [
  { id: 'face1', image: face1SVG },
  { id: 'face2', image: face2SVG },
  { id: 'face3', image: face3SVG },
  { id: 'face4', image: face4SVG },
  { id: 'face5', image: face5SVG },
];

const HAIRSTYLES = [
  { id: 'style1', name: 'Braided Bun', image: hairstyle1Btn },
  { id: 'style2', name: 'Center Part', image: hairstyle2Btn },
  { id: 'style3', name: 'Side Swept', image: hairstyle3Btn },
];

const DRESS_STYLES = [
  { id: 'dress1', name: 'Simple Bodice', image: dressSimpleBodiceSVG },
  { id: 'dress2', name: 'Collared', image: dressCollaredSVG },
  { id: 'dress3', name: 'Apron Style', image: dressApronSVG },
  { id: 'dress4', name: 'Laced Bodice', image: dressLacedSVG },
  { id: 'dress5', name: 'Classic', image: dressClassicSVG },
  { id: 'dress6', name: 'Ruffled', image: dressRuffledSVG },
];

const BANGS_STYLES = [
  { id: 'bangs1', name: 'Side Swept' },
  { id: 'bangs2', name: 'Center Part' },
  { id: 'bangs3', name: 'Straight' },
  { id: 'bangs4', name: 'Wispy' },
];

const BOOTS_STYLES = [
  { id: 'boots1', name: 'Classic' },
  { id: 'boots2', name: 'Buckled' },
  { id: 'boots3', name: 'Ankle' },
  { id: 'boots4', name: 'Tall' },
  { id: 'boots5', name: 'Simple' },
  { id: 'boots6', name: 'Laced' },
];

const PRESET_HAIR_COLORS = [
  { name: 'Black', color: '#171717' },
  { name: 'Coral', color: '#F34C34' },
  { name: 'Rose', color: '#D7859C' },
  { name: 'Lavender', color: '#CBA2ED' },
  { name: 'Silver', color: '#D1CEC9' },
  { name: 'Dark Green', color: '#29460A' },
];

const PRESET_DRESS_COLORS = [
  { name: 'Black', color: '#171717' },
  { name: 'Dark Green', color: '#29460A' },
  { name: 'Purple', color: '#7B6190' },
  { name: 'Brown', color: '#A35808' },
  { name: 'Yellow Gradient', color: 'linear-gradient(180deg,rgba(178, 179, 58, 1) 0%, rgba(189, 167, 58, 1) 33%, rgba(41, 70, 10, 1) 100%)' },
  { name: 'Coral Gradient', color: 'linear-gradient(180deg,rgba(232, 178, 171, 1) 0%, rgba(243, 76, 52, 1) 33%, rgba(251, 138, 16, 1) 100%)' },
];

export default function PuritanGirlDesigner() {
  const [currentDesign, setCurrentDesign] = useState({
    skin_tone: '#E8B2AB',
    face_type: 'face1',
    hairstyle: 'style1',
    hair_color: '#8B4513',
    dress_style: 'dress1',
    dress_color: '#1A1A1A',
    bangs_style: 'bangs1',
    boots_style: 'boots1',
  });
  const [showCustomHairColor, setShowCustomHairColor] = useState(false);
  const [showCustomDressColor, setShowCustomDressColor] = useState(false);

  return (
    <div className="flex gap-0 h-[650px] max-h-[650px]">
      <div className="flex-1 rounded-l-2xl flex items-center justify-center px-32 py-12" style={{ backgroundColor: '#B2B33A' }}>
        <div className="relative w-full max-w-md aspect-[259/455]">
          <LayeredCharacter
            skinTone={currentDesign.skin_tone}
            faceType={currentDesign.face_type}
            hairstyle={currentDesign.hairstyle}
            hairColor={currentDesign.hair_color}
            dressStyle={currentDesign.dress_style}
            dressColor={currentDesign.dress_color}
            bangsStyle={currentDesign.bangs_style}
            bootsStyle={currentDesign.boots_style}
            bootsColor={currentDesign.dress_color}
          />
        </div>
      </div>

      <div className="w-[480px] rounded-r-2xl overflow-y-auto p-8 space-y-8" style={{ backgroundColor: '#0F1C02' }}>
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-widest">Skin Tone</h3>
          </div>
          <div className="flex gap-3 overflow-x-auto py-4">
            {SKIN_TONES.map((tone) => (
              <button
                key={tone.id}
                onClick={() => setCurrentDesign({ ...currentDesign, skin_tone: tone.color })}
                className={`w-[55px] h-[55px] rounded-full border-4 transition-all flex-shrink-0 ${
                  currentDesign.skin_tone === tone.color
                    ? 'border-white scale-110'
                    : 'border-dark-white/30 hover:border-dark-white/50'
                }`}
                style={{ backgroundColor: tone.color }}
                title={tone.name}
              />
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-widest">Face Type</h3>
          </div>
          <div className="flex gap-3">
            {FACE_TYPES.map((face) => (
              <button
                key={face.id}
                onClick={() => setCurrentDesign({ ...currentDesign, face_type: face.id })}
                className={`flex-1 h-[50px] rounded-2xl flex items-center justify-center transition-all overflow-hidden ${
                  currentDesign.face_type === face.id
                    ? 'bg-worm scale-105 ring-4 ring-white/20'
                    : 'bg-worm/90 hover:bg-worm'
                }`}
              >
                <img src={face.image} alt={face.id} className="w-[40%] h-[80%] object-contain" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-widest">Hair Style</h3>
          </div>
          <div className="flex gap-3">
            {HAIRSTYLES.map((style) => (
              <button
                key={style.id}
                onClick={() => setCurrentDesign({ ...currentDesign, hairstyle: style.id })}
                className={`flex-1 h-32 rounded-2xl overflow-hidden transition-all ${
                  currentDesign.hairstyle === style.id
                    ? 'scale-105 ring-4 ring-white/20'
                    : 'hover:scale-105'
                }`}
              >
                <img src={style.image} alt={style.name} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-widest">Hair Color</h3>
          </div>
          <div className="flex gap-3 mb-3 overflow-x-auto py-2">
            {PRESET_HAIR_COLORS.map((preset) => (
              <button
                key={preset.name}
                onClick={() => setCurrentDesign({ ...currentDesign, hair_color: preset.color })}
                className={`w-12 h-12 rounded-full border-4 transition-all flex-shrink-0 ${
                  currentDesign.hair_color === preset.color
                    ? 'border-white scale-110'
                    : 'border-dark-white/30 hover:border-dark-white/50'
                }`}
                style={{ backgroundColor: preset.color }}
                title={preset.name}
              />
            ))}
            <button
              onClick={() => setShowCustomHairColor(!showCustomHairColor)}
              className="w-12 h-12 rounded-full border-4 border-dark-white/30 hover:border-dark-white/50 bg-lite-black flex items-center justify-center text-white text-2xl font-light transition-all flex-shrink-0"
              title="Custom color"
            >
              +
            </button>
          </div>
          {showCustomHairColor && (
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={currentDesign.hair_color}
                onChange={(e) => setCurrentDesign({ ...currentDesign, hair_color: e.target.value })}
                className="w-12 h-10 rounded-lg cursor-pointer bg-lite-black border-2 border-dark-white/30"
              />
              <input
                type="text"
                value={currentDesign.hair_color}
                onChange={(e) => setCurrentDesign({ ...currentDesign, hair_color: e.target.value })}
                className="flex-1 px-3 py-2 bg-lite-black border-2 border-dark-white/30 rounded-lg text-white text-sm focus:outline-none focus:border-white"
                placeholder="#8B4513"
              />
            </div>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-widest">Bangs</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {BANGS_STYLES.map((bangs) => (
              <button
                key={bangs.id}
                onClick={() => setCurrentDesign({ ...currentDesign, bangs_style: bangs.id })}
                className={`h-24 rounded-2xl flex items-center justify-center text-sm font-medium transition-all ${
                  currentDesign.bangs_style === bangs.id
                    ? 'bg-lime text-black scale-105'
                    : 'bg-lite-black text-dark-white hover:bg-lite-black/80'
                }`}
              >
                {bangs.name}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-widest">Dress</h3>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 bg-worm py-5 px-3 rounded-2xl">
            {DRESS_STYLES.map((dress) => (
              <button
                key={dress.id}
                onClick={() => setCurrentDesign({ ...currentDesign, dress_style: dress.id })}
                className={`flex-shrink-0 w-32 h-40 rounded-2xl overflow-hidden transition-all flex items-start justify-center pt-2 px-2 ${
                  currentDesign.dress_style === dress.id
                    ? 'bg-worm scale-105 ring-4 ring-white/20'
                    : 'bg-worm/90 hover:bg-worm'
                }`}
              >
                <img src={dress.image} alt={dress.name} className="h-full w-auto object-contain object-top hover:animate-wobble" style={{ transformOrigin: 'top center' }} />
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-widest">Dress Color</h3>
          </div>
          <div className="flex gap-3 mb-3 overflow-x-auto py-2">
            {PRESET_DRESS_COLORS.map((preset) => (
              <button
                key={preset.name}
                onClick={() => setCurrentDesign({ ...currentDesign, dress_color: preset.color })}
                className={`w-12 h-12 rounded-full border-4 transition-all flex-shrink-0 ${
                  currentDesign.dress_color === preset.color
                    ? 'border-white scale-110'
                    : 'border-dark-white/30 hover:border-dark-white/50'
                }`}
                style={preset.color.startsWith('linear-gradient')
                  ? { backgroundImage: preset.color }
                  : { backgroundColor: preset.color }
                }
                title={preset.name}
              />
            ))}
            <button
              onClick={() => setShowCustomDressColor(!showCustomDressColor)}
              className="w-12 h-12 rounded-full border-4 border-dark-white/30 hover:border-dark-white/50 bg-lite-black flex items-center justify-center text-white text-2xl font-light transition-all flex-shrink-0"
              title="Custom color"
            >
              +
            </button>
          </div>
          {showCustomDressColor && (
            <div className="flex items-center gap-2">
              {!currentDesign.dress_color.startsWith('linear-gradient') && (
                <input
                  type="color"
                  value={currentDesign.dress_color}
                  onChange={(e) => setCurrentDesign({ ...currentDesign, dress_color: e.target.value })}
                  className="w-12 h-10 rounded-lg cursor-pointer bg-lite-black border-2 border-dark-white/30"
                />
              )}
              <input
                type="text"
                value={currentDesign.dress_color}
                onChange={(e) => setCurrentDesign({ ...currentDesign, dress_color: e.target.value })}
                disabled={currentDesign.dress_color.startsWith('linear-gradient')}
                className="flex-1 px-3 py-2 bg-lite-black border-2 border-dark-white/30 rounded-lg text-white text-sm focus:outline-none focus:border-white disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="#4A5568"
              />
            </div>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-widest">Boots</h3>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {BOOTS_STYLES.map((boots) => (
              <button
                key={boots.id}
                onClick={() => setCurrentDesign({ ...currentDesign, boots_style: boots.id })}
                className={`h-20 rounded-2xl flex items-center justify-center text-xs font-medium transition-all ${
                  currentDesign.boots_style === boots.id
                    ? 'bg-lime text-black scale-105'
                    : 'bg-lite-black text-dark-white hover:bg-lite-black/80'
                }`}
              >
                {boots.name}
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
