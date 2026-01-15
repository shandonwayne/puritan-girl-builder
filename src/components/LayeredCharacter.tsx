import { useEffect, useRef } from 'react';
import baseGirlSVG from '../assets/base-girl.svg';
import hairstyle1SVG from '../assets/hairstyle_1.svg';
import hairstyle2SVG from '../assets/hairstyle_2.svg';
import hairstyle3SVG from '../assets/hairstyle_3.svg';
import dress1SVG from '../assets/dress_1.svg';
import dress2SVG from '../assets/dress_2.svg';
import dress3SVG from '../assets/dress_3.svg';
import dress4SVG from '../assets/dress_4.svg';
import dress5SVG from '../assets/dress_5 copy.svg';
import dress6SVG from '../assets/dress_6.svg';
import bangs1SVG from '../assets/bangs/bangs-1.svg';
import bangs2SVG from '../assets/bangs/bangs_2.svg';
import bangs3SVG from '../assets/bangs/bangs_3.svg';
import bangs4SVG from '../assets/bangs/bangs-4.svg';
import face1SVG from '../assets/faces/face_1.svg';
import face2SVG from '../assets/faces/face_2.svg';
import face3SVG from '../assets/faces/face_3.svg';
import face4SVG from '../assets/faces/face_4.svg';
import face5SVG from '../assets/faces/face_5.svg';
import boots1SVG from '../assets/boots_1 copy.svg';
import boots2SVG from '../assets/boots_2 copy.svg';
import boots3SVG from '../assets/boots_3 copy.svg';
import boots4SVG from '../assets/boots_4 copy.svg';
import boots5SVG from '../assets/boots_5 copy.svg';
import boots6SVG from '../assets/boots_6 copy.svg';

interface LayeredCharacterProps {
  skinTone: string;
  faceType: string;
  hairstyle: string;
  hairColor: string;
  dressStyle: string;
  dressColor: string;
  bangsStyle?: string;
  bootsStyle?: string;
  bootsColor?: string;
}

const HAIRSTYLE_MAP: Record<string, string> = {
  style1: hairstyle1SVG,
  style2: hairstyle2SVG,
  style3: hairstyle3SVG,
};

const DRESS_MAP: Record<string, string> = {
  dress1: dress1SVG,
  dress2: dress2SVG,
  dress3: dress3SVG,
  dress4: dress4SVG,
  dress5: dress5SVG,
  dress6: dress6SVG,
};

const BANGS_MAP: Record<string, string> = {
  bangs1: bangs1SVG,
  bangs2: bangs2SVG,
  bangs3: bangs3SVG,
  bangs4: bangs4SVG,
};

const FACE_MAP: Record<string, string> = {
  face1: face1SVG,
  face2: face2SVG,
  face3: face3SVG,
  face4: face4SVG,
  face5: face5SVG,
};

const BOOTS_MAP: Record<string, string> = {
  boots1: boots1SVG,
  boots2: boots2SVG,
  boots3: boots3SVG,
  boots4: boots4SVG,
  boots5: boots5SVG,
  boots6: boots6SVG,
};

const BOOTS_POSITIONS: Record<string, string> = {
  boots1: 'translate(21, 339)',
  boots2: 'translate(21, 318)',
  boots3: 'translate(21, 374)',
  boots4: 'translate(21, 400)',
  boots5: 'translate(21, 332)',
  boots6: 'translate(21, 371)',
};

const lightenColor = (color: string, amount: number = 0.15): string => {
  const hex = color.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  const newR = Math.min(255, Math.floor(r + (255 - r) * amount));
  const newG = Math.min(255, Math.floor(g + (255 - g) * amount));
  const newB = Math.min(255, Math.floor(b + (255 - b) * amount));

  return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
};

const darkenColor = (color: string, amount: number = 0.15): string => {
  const hex = color.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  const newR = Math.max(0, Math.floor(r * (1 - amount)));
  const newG = Math.max(0, Math.floor(g * (1 - amount)));
  const newB = Math.max(0, Math.floor(b * (1 - amount)));

  return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
};

const getColorLuminance = (color: string): number => {
  const hex = color.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

const shouldLightenFaceFeatures = (skinTone: string): boolean => {
  const luminance = getColorLuminance(skinTone);
  return luminance < 0.5;
};

const getFantasyFaceColor = (skinTone: string): string | null => {
  const paleGreen = '#D4F1D4';
  const paleLavender = '#E6D9F5';

  if (skinTone.toLowerCase() === paleGreen.toLowerCase()) {
    return '#5A8F5A';
  }

  if (skinTone.toLowerCase() === paleLavender.toLowerCase()) {
    return '#8B6FAE';
  }

  return null;
};

const isGradient = (color: string): boolean => {
  return color.trim().startsWith('linear-gradient');
};

interface GradientStop {
  color: string;
  position: string;
}

interface ParsedGradient {
  angle: number;
  stops: GradientStop[];
}

const parseGradient = (gradientString: string): ParsedGradient | null => {
  const match = gradientString.match(/linear-gradient\((.*)\)/);
  if (!match) return null;

  const content = match[1];
  const parts: string[] = [];
  let currentPart = '';
  let parenDepth = 0;

  for (let i = 0; i < content.length; i++) {
    const char = content[i];
    if (char === '(') {
      parenDepth++;
      currentPart += char;
    } else if (char === ')') {
      parenDepth--;
      currentPart += char;
    } else if (char === ',' && parenDepth === 0) {
      parts.push(currentPart.trim());
      currentPart = '';
    } else {
      currentPart += char;
    }
  }
  if (currentPart.trim()) {
    parts.push(currentPart.trim());
  }

  let angle = 180;
  let colorStops: string[] = parts;

  if (parts[0].includes('deg') || parts[0].includes('to ')) {
    const angleStr = parts[0];
    if (angleStr.includes('deg')) {
      angle = parseInt(angleStr);
    } else if (angleStr.includes('to bottom')) {
      angle = 180;
    } else if (angleStr.includes('to top')) {
      angle = 0;
    } else if (angleStr.includes('to right')) {
      angle = 90;
    } else if (angleStr.includes('to left')) {
      angle = 270;
    }
    colorStops = parts.slice(1);
  }

  const stops: GradientStop[] = colorStops.map((stop, index) => {
    const rgbaMatch = stop.match(/(rgba?\([^)]+\))\s*(\d+%?)?/);
    if (rgbaMatch) {
      const color = rgbaMatch[1];
      const position = rgbaMatch[2] || `${(index / (colorStops.length - 1)) * 100}%`;
      return { color, position };
    }

    const stopParts = stop.trim().split(/\s+/);
    const color = stopParts[0];
    const position = stopParts[1] || `${(index / (colorStops.length - 1)) * 100}%`;
    return { color, position };
  });

  return { angle, stops };
};

const rgbaToHex = (rgba: string): string => {
  const match = rgba.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*[\d.]+)?\s*\)/);
  if (!match) return rgba;

  const r = parseInt(match[1]).toString(16).padStart(2, '0');
  const g = parseInt(match[2]).toString(16).padStart(2, '0');
  const b = parseInt(match[3]).toString(16).padStart(2, '0');

  return `#${r}${g}${b}`;
};

const createSVGGradient = (gradientId: string, parsedGradient: ParsedGradient): SVGLinearGradientElement => {
  const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
  gradient.setAttribute('id', gradientId);

  const angle = parsedGradient.angle;
  const radians = (angle - 90) * (Math.PI / 180);
  const x2 = Math.cos(radians) * 0.5 + 0.5;
  const y2 = Math.sin(radians) * 0.5 + 0.5;
  const x1 = 1 - x2;
  const y1 = 1 - y2;

  gradient.setAttribute('x1', `${x1 * 100}%`);
  gradient.setAttribute('y1', `${y1 * 100}%`);
  gradient.setAttribute('x2', `${x2 * 100}%`);
  gradient.setAttribute('y2', `${y2 * 100}%`);

  parsedGradient.stops.forEach(stop => {
    const stopElement = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stopElement.setAttribute('offset', stop.position);
    const hexColor = stop.color.startsWith('rgb') ? rgbaToHex(stop.color) : stop.color;
    stopElement.setAttribute('stop-color', hexColor);
    gradient.appendChild(stopElement);
  });

  return gradient;
};

export default function LayeredCharacter({
  skinTone,
  faceType,
  hairstyle,
  hairColor,
  dressStyle,
  dressColor,
  bangsStyle = '',
  bootsStyle = '',
  bootsColor = '#1A1A1A',
}: LayeredCharacterProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const baseSVGRef = useRef<string>('');
  const faceSVGRef = useRef<string>('');
  const hairstyleSVGRef = useRef<string>('');
  const dressSVGRef = useRef<string>('');
  const bangsSVGRef = useRef<string>('');
  const bootsSVGRef = useRef<string>('');

  useEffect(() => {
    const loadSVGs = async () => {
      const promises = [
        fetch(baseGirlSVG),
        fetch(HAIRSTYLE_MAP[hairstyle]),
      ];

      if (faceType && FACE_MAP[faceType]) {
        promises.push(fetch(FACE_MAP[faceType]));
      }

      if (dressStyle && DRESS_MAP[dressStyle]) {
        promises.push(fetch(DRESS_MAP[dressStyle]));
      }

      if (bangsStyle && BANGS_MAP[bangsStyle]) {
        promises.push(fetch(BANGS_MAP[bangsStyle]));
      }

      if (bootsStyle && BOOTS_MAP[bootsStyle]) {
        promises.push(fetch(BOOTS_MAP[bootsStyle]));
      }

      const results = await Promise.all(promises);

      baseSVGRef.current = await results[0].text();
      hairstyleSVGRef.current = await results[1].text();

      let resultIndex = 2;
      if (faceType && FACE_MAP[faceType]) {
        faceSVGRef.current = await results[resultIndex].text();
        resultIndex++;
      } else {
        faceSVGRef.current = '';
      }

      if (dressStyle && DRESS_MAP[dressStyle]) {
        dressSVGRef.current = await results[resultIndex].text();
        resultIndex++;
      } else {
        dressSVGRef.current = '';
      }

      if (bangsStyle && BANGS_MAP[bangsStyle]) {
        bangsSVGRef.current = await results[resultIndex].text();
        resultIndex++;
      } else {
        bangsSVGRef.current = '';
      }

      if (bootsStyle && BOOTS_MAP[bootsStyle]) {
        bootsSVGRef.current = await results[resultIndex].text();
      } else {
        bootsSVGRef.current = '';
      }

      renderComposite();
    };

    loadSVGs();
  }, [hairstyle, faceType, dressStyle, bangsStyle, bootsStyle]);

  useEffect(() => {
    if (baseSVGRef.current && hairstyleSVGRef.current) {
      renderComposite();
    }
  }, [skinTone, hairColor, dressColor, bootsColor]);

  const renderComposite = () => {
    if (!containerRef.current || !baseSVGRef.current) return;

    const parser = new DOMParser();

    const baseDoc = parser.parseFromString(baseSVGRef.current, 'image/svg+xml');
    const baseSVG = baseDoc.querySelector('svg');
    if (!baseSVG) return;

    const skinPath = baseSVG.querySelector('.base.skin');
    if (skinPath) {
      skinPath.setAttribute('fill', skinTone);
    }

    const darkerSkinTone = darkenColor(skinTone, 0.1);
    const earLines = baseSVG.querySelectorAll('.ear.line');
    earLines.forEach(line => line.setAttribute('stroke', darkerSkinTone));

    const hairDoc = parser.parseFromString(hairstyleSVGRef.current, 'image/svg+xml');
    const hairSVG = hairDoc.querySelector('svg');
    if (hairSVG) {
      const hairPaths = hairSVG.querySelectorAll('path[fill="#9E7EB9"]');
      hairPaths.forEach(path => path.setAttribute('fill', hairColor));
    }

    let dressSVG = null;
    let dressGradientElement: SVGLinearGradientElement | null = null;
    let dressGradientId = '';

    if (dressSVGRef.current) {
      const dressDoc = parser.parseFromString(dressSVGRef.current, 'image/svg+xml');
      dressSVG = dressDoc.querySelector('svg');
      if (dressSVG) {
        const dressBlackPaths = dressSVG.querySelectorAll('path[fill="#1A1A1A"], path[stroke="#1A1A1A"]');

        if (isGradient(dressColor)) {
          const parsedGradient = parseGradient(dressColor);
          if (parsedGradient) {
            dressGradientId = `dressGradient-${Date.now()}`;
            dressGradientElement = createSVGGradient(dressGradientId, parsedGradient);

            dressBlackPaths.forEach(path => {
              path.setAttribute('fill', `url(#${dressGradientId})`);
              if (path.hasAttribute('stroke')) {
                path.setAttribute('stroke', `url(#${dressGradientId})`);
              }
            });
          }
        } else {
          dressBlackPaths.forEach(path => {
            path.setAttribute('fill', dressColor);
            if (path.hasAttribute('stroke')) {
              path.setAttribute('stroke', dressColor);
            }
          });
        }
      }
    }

    let bootsSVG = null;
    let bootsGradientElement: SVGLinearGradientElement | null = null;
    let bootsGradientId = '';

    if (bootsSVGRef.current) {
      const bootsDoc = parser.parseFromString(bootsSVGRef.current, 'image/svg+xml');
      bootsSVG = bootsDoc.querySelector('svg');
      if (bootsSVG && bootsStyle) {
        const bootsPaths = bootsSVG.querySelectorAll('path[fill="#1A1A1A"], ellipse[fill="#1A1A1A"]');
        const bootsStrokes = bootsSVG.querySelectorAll('path[stroke="#1A1A1A"]');

        if (isGradient(bootsColor)) {
          const parsedGradient = parseGradient(bootsColor);
          if (parsedGradient) {
            bootsGradientId = `bootsGradient-${Date.now()}`;
            bootsGradientElement = createSVGGradient(bootsGradientId, parsedGradient);

            bootsPaths.forEach(path => path.setAttribute('fill', `url(#${bootsGradientId})`));
            bootsStrokes.forEach(path => path.setAttribute('stroke', `url(#${bootsGradientId})`));
          }
        } else {
          bootsPaths.forEach(path => path.setAttribute('fill', bootsColor));
          bootsStrokes.forEach(path => path.setAttribute('stroke', bootsColor));
        }

        const skinToneDarker = darkenColor(darkenColor(skinTone, 0.15), 0.15);
        const bootsBuckleStrokes = bootsSVG.querySelectorAll('path[stroke="#E09F97"]');
        bootsBuckleStrokes.forEach(path => path.setAttribute('stroke', skinToneDarker));
      }
    }

    const wrapper = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    wrapper.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    wrapper.setAttribute('viewBox', '0 -20 259 475');
    wrapper.setAttribute('width', '100%');
    wrapper.setAttribute('height', '100%');

    let defsElement = baseSVG.querySelector('defs');
    if (!defsElement) {
      defsElement = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    } else {
      defsElement = defsElement.cloneNode(true) as SVGDefsElement;
    }

    if (dressGradientElement) {
      defsElement.appendChild(dressGradientElement);
    }

    if (bootsGradientElement) {
      defsElement.appendChild(bootsGradientElement);
    }

    wrapper.appendChild(defsElement);

    if (hairSVG) {
      const hairGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      hairGroup.setAttribute('transform', 'translate(31.5, -20)');
      const hairContent = hairSVG.querySelector('g');
      if (hairContent) {
        hairGroup.appendChild(hairContent.cloneNode(true));
      } else {
        const children = Array.from(hairSVG.children);
        children.forEach(child => {
          hairGroup.appendChild(child.cloneNode(true));
        });
      }
      wrapper.appendChild(hairGroup);
    }

    const baseGroup = baseSVG.querySelector('.base-girl');
    if (baseGroup) {
      wrapper.appendChild(baseGroup.cloneNode(true));
    }

    let faceSVG = null;
    if (faceSVGRef.current) {
      const faceDoc = parser.parseFromString(faceSVGRef.current, 'image/svg+xml');
      faceSVG = faceDoc.querySelector('svg');
      if (faceSVG) {
        const eyebrowPaths = faceSVG.querySelectorAll('.eyebrows path[stroke="#E8B2AB"]');
        eyebrowPaths.forEach(path => path.setAttribute('stroke', hairColor));

        const fantasyColor = getFantasyFaceColor(skinTone);
        const tanSkinTone = '#75513D';

        if (fantasyColor) {
          const eyeEllipses = faceSVG.querySelectorAll('.eyes ellipse[fill="#1A1A1A"]');
          eyeEllipses.forEach(ellipse => ellipse.setAttribute('fill', fantasyColor));

          const mouthPath = faceSVG.querySelector('.mouth[stroke="#1A1A1A"]');
          if (mouthPath) {
            mouthPath.setAttribute('stroke', fantasyColor);
          }
        } else if (skinTone.toLowerCase() === tanSkinTone.toLowerCase()) {
          const eyeEllipses = faceSVG.querySelectorAll('.eyes ellipse[fill="#1A1A1A"]');
          eyeEllipses.forEach(ellipse => ellipse.setAttribute('fill', '#2C1810'));

          const mouthPath = faceSVG.querySelector('.mouth[stroke="#1A1A1A"]');
          if (mouthPath) {
            mouthPath.setAttribute('stroke', '#2C1810');
          }
        } else {
          const shouldLighten = shouldLightenFaceFeatures(skinTone);
          if (shouldLighten) {
            const eyeEllipses = faceSVG.querySelectorAll('.eyes ellipse[fill="#1A1A1A"]');
            eyeEllipses.forEach(ellipse => ellipse.setAttribute('fill', '#8B6F47'));

            const mouthPath = faceSVG.querySelector('.mouth[stroke="#1A1A1A"]');
            if (mouthPath) {
              mouthPath.setAttribute('stroke', '#8B6F47');
            }
          }
        }

        const faceGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        faceGroup.setAttribute('transform', 'translate(110, 55)');
        const faceContent = faceSVG.querySelector('g');
        if (faceContent) {
          faceGroup.appendChild(faceContent.cloneNode(true));
        } else {
          const children = Array.from(faceSVG.children);
          children.forEach(child => {
            faceGroup.appendChild(child.cloneNode(true));
          });
        }
        wrapper.appendChild(faceGroup);
      }
    }

    if (bootsSVG && bootsStyle) {
      const bootsGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      bootsGroup.setAttribute('transform', BOOTS_POSITIONS[bootsStyle] || 'translate(21, 371)');
      const bootsContent = bootsSVG.querySelector('g');
      if (bootsContent) {
        bootsGroup.appendChild(bootsContent.cloneNode(true));
      } else {
        const children = Array.from(bootsSVG.children);
        children.forEach(child => {
          bootsGroup.appendChild(child.cloneNode(true));
        });
      }
      wrapper.appendChild(bootsGroup);
    }

    if (dressSVG) {
      const dressGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      dressGroup.setAttribute('transform', 'translate(1.5, 102)');
      const dressContent = dressSVG.querySelector('g');
      if (dressContent) {
        dressGroup.appendChild(dressContent.cloneNode(true));
      }
      wrapper.appendChild(dressGroup);

      const dressDefs = dressSVG.querySelector('defs');
      if (dressDefs) {
        wrapper.appendChild(dressDefs.cloneNode(true));
      }
    }

    let bangsSVG = null;
    if (bangsSVGRef.current) {
      const bangsDoc = parser.parseFromString(bangsSVGRef.current, 'image/svg+xml');
      bangsSVG = bangsDoc.querySelector('svg');
      if (bangsSVG) {
        const bangsPaths = bangsSVG.querySelectorAll('path[fill="#CBA2ED"], path[fill="#BD9ADA"], path[fill="#29460A"]');
        const lighterHairColor = lightenColor(hairColor);
        bangsPaths.forEach(path => path.setAttribute('fill', lighterHairColor));

        const bangsGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        bangsGroup.setAttribute('transform', 'translate(65, -5)');
        const bangsContent = bangsSVG.querySelector('svg > *');
        if (bangsContent) {
          const children = Array.from(bangsSVG.children);
          children.forEach(child => {
            bangsGroup.appendChild(child.cloneNode(true));
          });
        }
        wrapper.appendChild(bangsGroup);
      }
    }

    containerRef.current.innerHTML = '';
    containerRef.current.appendChild(wrapper);
  };

  return (
    <div
      ref={containerRef}
      className="w-full h-full flex items-center justify-center"
    />
  );
}
