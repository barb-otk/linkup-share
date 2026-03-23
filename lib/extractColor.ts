import { Vibrant } from "node-vibrant/node";

const DEFAULT: [number, number, number] = [14, 14, 14];

export async function extractProfileColor(imageUrl: string): Promise<[number, number, number]> {
  if (!imageUrl) return DEFAULT;

  try {
    const palette = await Vibrant.from(imageUrl).getPalette();

    // Prefer Vibrant → DarkVibrant → Muted → DarkMuted, in that order
    const swatch =
      palette.Vibrant ??
      palette.DarkVibrant ??
      palette.Muted ??
      palette.DarkMuted;

    if (!swatch) return DEFAULT;

    const [r, g, b] = swatch.rgb;

    // Darken so it works as a dark background gradient
    const factor = 0.5;
    return [Math.round(r * factor), Math.round(g * factor), Math.round(b * factor)];
  } catch {
    return DEFAULT;
  }
}
