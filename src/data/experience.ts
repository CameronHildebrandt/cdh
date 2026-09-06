import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

export type Experience = {
  startDate: string;
  endDate: string;
  city: string;
  company: string;
  title: string;
  highlights: string[];
};

// `process.cwd()` stays at the Astro project root during both dev and prerendering.
const resumePath = resolve(process.cwd(), 'public/resume.tex');

function toPlainText(value: string) {
  return value
    .replace(/\\%/g, '%')
    .replace(/\\\$/g, '$')
    .replace(/\\&/g, '&')
    .replace(/~/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * The public TeX résumé is the canonical source for professional experience.
 * This intentionally understands the compact \resumeHeading/itemize format in
 * public/resume.tex, avoiding a second copy of the same content.
 */
function parseExperience(tex: string): Experience[] {
  const section = tex.match(/\\section\{Experience\}([\s\S]*?)(?=\\section\{|$)/)?.[1] ?? '';
  const entries = section.matchAll(
    /\\resumeHeading\s*\{([^}]*)\}\s*\{([^}]*)\}\s*\{([^}]*)\}\s*\\begin\{itemize\}([\s\S]*?)\\end\{itemize\}/g,
  );

  return Array.from(entries, ([, company, roleAndCity, dateRange, items]) => {
    const divider = roleAndCity.lastIndexOf(' - ');
    const [startDate, endDate = 'Present'] = toPlainText(dateRange).split(/\s+-\s+/);
    const highlights = Array.from(items.matchAll(/\\item\s+([\s\S]*?)(?=\\item|$)/g), ([, item]) => toPlainText(item));

    return {
      company: toPlainText(company),
      title: toPlainText(divider === -1 ? roleAndCity : roleAndCity.slice(0, divider)),
      city: toPlainText(divider === -1 ? '' : roleAndCity.slice(divider + 3)),
      startDate,
      endDate,
      highlights,
    };
  });
}

export const experience = parseExperience(readFileSync(resumePath, 'utf8'));
