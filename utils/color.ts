/**
 * Simple hash function to convert a string to a number.
 */
const stringToHash = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash);
};

/**
 * Converts an HSL color value to RGB.
 * Assumes h, s, and l are in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 */
const hslToRgb = (h: number, s: number, l: number): [number, number, number] => {
    let r, g, b;

    if (s === 0) {
        r = g = b = l; // achromatic
    } else {
        const hue2rgb = (p: number, q: number, t: number) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };

        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
};


/**
 * Calculates the perceived luminance of an RGB color.
 * Returns a value between 0 (black) and 255 (white).
 */
const getLuminance = (r: number, g: number, b: number): number => {
  return 0.299 * r + 0.587 * g + 0.114 * b;
};

/**
 * Converts a hex color string to an RGB array.
 */
export const hexToRgb = (hex: string): [number, number, number] | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16),
      ]
    : null;
};

/**
 * Determines whether text should be black or white based on the background hex color.
 */
export const getTextColorForBackground = (hexColor: string): 'text-white' | 'text-black' => {
  const rgb = hexToRgb(hexColor);
  if (!rgb) {
    return 'text-white'; // Default for invalid colors
  }
  const [r, g, b] = rgb;
  const luminance = getLuminance(r, g, b);
  return luminance > 128 ? 'text-black' : 'text-white';
};


/**
 * Generates a gradient style and appropriate text color from a URL string.
 */
export const generateGradientFromUrl = (url: string): { gradient: string; textColor: string } => {
  const hash = stringToHash(url);

  // Use hash to generate two hue values for the gradient
  const hue1 = hash % 360;
  const hue2 = (hue1 + 45) % 360; // Analogous color

  // Use fixed saturation and lightness for vibrant colors
  const saturation = 0.7;
  const lightness = 0.5;

  const [r1, g1, b1] = hslToRgb(hue1 / 360, saturation, lightness);
  const [r2, g2, b2] = hslToRgb(hue2 / 360, saturation, lightness);
  
  // Calculate average luminance to determine text color
  const lum1 = getLuminance(r1, g1, b1);
  const lum2 = getLuminance(r2, g2, b2);
  const avgLuminance = (lum1 + lum2) / 2;
  
  const textColor = avgLuminance > 128 ? 'text-black' : 'text-white';

  const gradient = `linear-gradient(to bottom right, rgb(${r1}, ${g1}, ${b1}), rgb(${r2}, ${g2}, ${b2}))`;

  return { gradient, textColor };
};