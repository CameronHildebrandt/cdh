import type { ImageMetadata } from 'astro';
import arduinoProject from '../assets/arduino-project.jpg';
import pixelRatioHero from '../assets/pixel-ratio-hero.png';

const projectImages: Record<string, ImageMetadata> = {
  'pixel-ratio': pixelRatioHero,
};

/** A local, optimizable image per project, with a neutral fallback for placeholders. */
export const getProjectImage = (slug: string) => projectImages[slug] ?? arduinoProject;
