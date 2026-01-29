import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Download } from 'lucide-react';
import LayeredCharacter, { LayeredCharacterRef } from './LayeredCharacter';
import face1SVG from '../assets/faces/face_1.svg';
import face2SVG from '../assets/faces/face_2.svg';
import face3SVG from '../assets/faces/face_3.svg';
import face4SVG from '../assets/faces/face_4.svg';
import hairstyle1SVG from '../assets/hairstyle-1.svg';
import hairstyle1SelectedSVG from '../assets/hairstyle-1-selected.svg';
import hairstyle2SVG from '../assets/hairstyle-2.svg';
import hairstyle2SelectedSVG from '../assets/hairstyle-2-selected.svg';
import hairstyle3SVG from '../assets/hairstyle-3.svg';
import hairstyle3SelectedSVG from '../assets/hairstyle-3-selected.svg';
import hairstyle4SVG from '../assets/hairstyle-4.svg';
import hairstyle4SelectedSVG from '../assets/hairstyle-4-selected.svg';
import hairstyle5SVG from '../assets/hairstyle-5.svg';
import hairstyle5SelectedSVG from '../assets/hairstyle-5-selected.svg';
import hairstyle6SVG from '../assets/hairstyle-6.svg';
import hairstyle6SelectedSVG from '../assets/hairstyle-6-selected.svg';
import hairstyle7SVG from '../assets/hairstyle-7.svg';
import hairstyle7SelectedSVG from '../assets/hairstyle-7-selected.svg';
import hairstyle8SVG from '../assets/hairstyle-8.svg';
import hairstyle8SelectedSVG from '../assets/hairstyle-8-selected.svg';
import dressSimpleBodiceSVG from '../assets/simple_bodice.svg';
import dressCollaredSVG from '../assets/collared.svg';
import dressApronSVG from '../assets/apron_style.svg';
import dressLacedSVG from '../assets/laced_bodice.svg';
import dressClassicSVG from '../assets/classic.svg';
import dressRuffledSVG from '../assets/ruffled.svg';
import bangsSideSweptSVG from '../assets/bangs/bangs-side-swept.svg';
import bangsCenterSVG from '../assets/bangs/bangs-center.svg';
import bangsStraightSVG from '../assets/bangs/bangs-straight.svg';
import bangsWispySVG from '../assets/bangs/bangs-wispy.svg';
import bootsClassicPNG from '../assets/boots-classic.png';
import bootsLacedPNG from '../assets/boots-laced.png';
import bootsBuckledPNG from '../assets/boots-buckled.png';
import bootsTallPNG from '../assets/boots-tall.png';
import bootsAnklePNG from '../assets/boots-ankle.png';
import bootsSimplePNG from '../assets/boots-simple.png';

const SKIN_TONES = [
  { id: 'fair', name: 'Fair', color: '#FADADD' },
  { id: 'light', name: 'Light', color: '#E8B2AB' },
  { id: 'medium', name: 'Medium', color: '#ECAB94' },
  { id: 'warm', name: 'Warm', color: '#D4A574' },
  { id: 'tan', name: 'Tan', color: '#75513D' },
  { id: 'deeptan', name: 'Deep Tan', color: '#5C3A21' },
  { id: 'brown', name: 'Brown', color: '#3E2D25' },
  { id: 'deepbrown', name: 'Deep Brown', color: '#2B1810' },
  { id: 'palegreen', name: 'Pale Green', color: '#8BC98B' },
  { id: 'palelavender', name: 'Pale Lavender', color: '#E6D9F5' },
];

const FACE_TYPES = [
  { id: 'face1', image: face1SVG },
  { id: 'face2', image: face2SVG },
  { id: 'face3', image: face3SVG },
  { id: 'face4', image: face4SVG },
];

const HAIRSTYLES = [
  { id: 'style1', name: 'Style 1', image: hairstyle1SVG, selectedImage: hairstyle1SelectedSVG, scale: 1.0 },
  { id: 'style2', name: 'Style 2', image: hairstyle2SVG, selectedImage: hairstyle2SelectedSVG, scale: 1.0 },
  { id: 'style3', name: 'Style 3', image: hairstyle3SVG, selectedImage: hairstyle3SelectedSVG, scale: 1.0 },
  { id: 'style4', name: 'Style 4', image: hairstyle4SVG, selectedImage: hairstyle4SelectedSVG, scale: 1.0 },
  { id: 'style5', name: 'Style 5', image: hairstyle5SVG, selectedImage: hairstyle5SelectedSVG, scale: 1.0 },
  { id: 'style6', name: 'Style 6', image: hairstyle6SVG, selectedImage: hairstyle6SelectedSVG, scale: 1.0 },
  { id: 'style7', name: 'Style 7', image: hairstyle7SVG, selectedImage: hairstyle7SelectedSVG, scale: 0.78 },
  { id: 'style8', name: 'Style 8', image: hairstyle8SVG, selectedImage: hairstyle8SelectedSVG, scale: 1.0 },
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
  { id: 'bangs1', name: 'Side Swept', image: bangsSideSweptSVG },
  { id: 'bangs2', name: 'Center Part', image: bangsCenterSVG },
  { id: 'bangs3', name: 'Straight', image: bangsStraightSVG },
  { id: 'bangs4', name: 'Wispy', image: bangsWispySVG },
];

const BOOTS_STYLES = [
  { id: 'boots1', name: 'Classic', image: bootsClassicPNG },
  { id: 'boots2', name: 'Buckled', image: bootsBuckledPNG },
  { id: 'boots3', name: 'Ankle', image: bootsAnklePNG },
  { id: 'boots4', name: 'Tall', image: bootsTallPNG },
  { id: 'boots5', name: 'Simple', image: bootsSimplePNG },
  { id: 'boots6', name: 'Laced', image: bootsLacedPNG },
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

  const characterRef = useRef<LayeredCharacterRef>(null);
  const skinToneScrollRef = useRef<HTMLDivElement>(null);
  const hairColorScrollRef = useRef<HTMLDivElement>(null);
  const hairstyleScrollRef = useRef<HTMLDivElement>(null);
  const dressStyleScrollRef = useRef<HTMLDivElement>(null);
  const dressColorScrollRef = useRef<HTMLDivElement>(null);

  const scroll = (ref: React.RefObject<HTMLDivElement>, direction: 'left' | 'right') => {
    if (ref.current) {
      let scrollAmount = 200;
      if (ref === dressStyleScrollRef) {
        scrollAmount = 304;
      } else if (ref === hairstyleScrollRef) {
        scrollAmount = 280;
      }
      ref.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="flex gap-0 h-[650px] max-h-[650px]">
      <div className="flex-1 rounded-l-2xl flex items-center justify-center px-32 py-12" style={{ backgroundColor: '#B2B33A' }}>
        <div className="relative w-full max-w-md aspect-[259/455]">
          <LayeredCharacter
            ref={characterRef}
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
          <div className="relative group">
            <button
              onClick={() => scroll(skinToneScrollRef, 'left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div ref={skinToneScrollRef} className="flex gap-3 overflow-x-auto py-4 scrollbar-hide">
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
            <button
              onClick={() => scroll(skinToneScrollRef, 'right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-widest">Face Type</h3>
          </div>
          <div className="flex gap-5">
            {FACE_TYPES.map((face) => (
              <button
                key={face.id}
                onClick={() => setCurrentDesign({ ...currentDesign, face_type: face.id })}
                className={`flex-1 aspect-square rounded-full flex items-center justify-center transition-all overflow-hidden ${
                  currentDesign.face_type === face.id
                    ? 'bg-worm scale-110 ring-4 ring-white/20'
                    : 'bg-worm/90 hover:bg-worm'
                }`}
              >
                <img src={face.image} alt={face.id} className="w-[45%] h-[70%] object-contain" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-widest">Hair Style</h3>
          </div>
          <div className="relative rounded-2xl overflow-hidden group" style={{ backgroundColor: '#D8C3E6' }}>
            <div className="relative pt-8 pb-20 px-3">
              <button
                onClick={() => scroll(hairstyleScrollRef, 'left')}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-[#8B5DAF] rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <div
                ref={hairstyleScrollRef}
                className="flex gap-6 overflow-x-auto scrollbar-hide w-[280px] mx-auto scroll-smooth snap-x snap-mandatory"
              >
                {HAIRSTYLES.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => setCurrentDesign({ ...currentDesign, hairstyle: style.id })}
                    className="relative group/item flex-shrink-0 snap-start"
                  >
                    <div className="relative w-32 h-32 flex items-center justify-center transition-transform group-hover/item:scale-105">
                      <img
                        src={currentDesign.hairstyle === style.id ? style.selectedImage : style.image}
                        alt={style.name}
                        className="h-24 w-auto object-contain"
                        style={{ transform: `scale(${style.scale})` }}
                      />
                    </div>
                  </button>
                ))}
              </div>

              <button
                onClick={() => scroll(hairstyleScrollRef, 'right')}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-[#8B5DAF] rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            <div
              className="absolute bottom-0 left-0 right-0 h-12 rounded-full mx-8"
              style={{ backgroundColor: '#8B5DAF' }}
            ></div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-widest">Hair Color</h3>
          </div>
          <div className="relative">
            <div ref={hairColorScrollRef} className="flex gap-3 mb-3 overflow-x-auto py-2 scrollbar-hide">
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
          <div className="grid grid-cols-4 gap-3">
            {BANGS_STYLES.map((bangs) => (
              <button
                key={bangs.id}
                onClick={() => setCurrentDesign({ ...currentDesign, bangs_style: bangs.id })}
                className={`h-24 rounded-2xl flex items-center justify-center transition-all overflow-hidden ${
                  currentDesign.bangs_style === bangs.id
                    ? 'bg-worm scale-105 ring-4 ring-white/20'
                    : 'bg-worm/90 hover:bg-worm'
                }`}
              >
                <img src={bangs.image} alt={bangs.name} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-widest">Dress</h3>
          </div>
          <div className="relative group bg-worm py-5 px-3 rounded-2xl overflow-hidden">
            <button
              onClick={() => scroll(dressStyleScrollRef, 'left')}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div ref={dressStyleScrollRef} className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide w-[296px] mx-auto scroll-smooth snap-x snap-mandatory">
              {DRESS_STYLES.map((dress) => (
                <button
                  key={dress.id}
                  onClick={() => setCurrentDesign({ ...currentDesign, dress_style: dress.id })}
                  className={`flex-shrink-0 w-36 h-36 rounded-2xl overflow-visible transition-all flex items-start justify-center pt-2 px-2 snap-start ${
                    currentDesign.dress_style === dress.id
                      ? 'bg-worm scale-105'
                      : 'bg-worm/90 hover:bg-worm'
                  }`}
                >
                  <div className="h-full w-auto relative">
                    <img
                      src={dress.image}
                      alt={dress.name}
                      className="h-full w-auto object-contain object-top hover:animate-wobble"
                      style={{
                        transformOrigin: 'top center',
                        filter: currentDesign.dress_style === dress.id
                          ? 'brightness(0) saturate(100%) invert(13%) sepia(47%) saturate(1756%) hue-rotate(45deg) brightness(97%) contrast(98%)'
                          : 'none'
                      }}
                    />
                  </div>
                </button>
              ))}
            </div>
            <button
              onClick={() => scroll(dressStyleScrollRef, 'right')}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-widest">Dress Color</h3>
          </div>
          <div className="relative">
            <div ref={dressColorScrollRef} className="flex gap-3 mb-3 overflow-x-auto py-2 scrollbar-hide">
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
                className={`h-[95px] rounded-2xl flex items-center justify-center text-xs font-medium transition-all overflow-hidden ${
                  currentDesign.boots_style === boots.id
                    ? 'bg-lime text-black scale-105 ring-4 ring-white/20'
                    : 'bg-lite-black text-dark-white hover:bg-lite-black/80'
                }`}
              >
                {boots.image ? (
                  <img src={boots.image} alt={boots.name} className="w-full h-full object-cover" />
                ) : (
                  boots.name
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-4">
          <button
            onClick={() => characterRef.current?.downloadImage()}
            className="w-full h-16 rounded-2xl bg-lime hover:bg-lime/90 text-black font-bold text-lg uppercase tracking-wide transition-all flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
          >
            <Download className="w-6 h-6" />
            Download Image
          </button>
        </div>

      </div>
    </div>
  );
}
