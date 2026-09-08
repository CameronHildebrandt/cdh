import type { ImageMetadata } from 'astro';
import arduinoProject from '../assets/arduino-project.jpg';
import autonomousDrivingRobot from '../assets/autonomous-driving-robot.jpg';
import bciDemoWebsite from '../assets/bci-demo-website.png';
import pixelRatioHero from '../assets/pixel-ratio-hero.png';

const projectImages: Record<string, ImageMetadata> = {
  'placeholder-project-02': autonomousDrivingRobot,
  'placeholder-project-03': bciDemoWebsite,
  'pixel-ratio': pixelRatioHero,
};

/** A local, optimizable image per project, with a neutral fallback for placeholders. */
export const getProjectImage = (slug: string) => projectImages[slug] ?? arduinoProject;
