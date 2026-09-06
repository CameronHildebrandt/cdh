import resumeTex from './resume.tex?raw';

export type Experience = {
  startDate: string;
  endDate: string;
  city: string;
  company: string;
  title: string;
  duration: string;
  durationShort: string;
  highlights: string[];
};

function toPlainText(value: string) {
  return value
    .replace(/\\%/g, '%')
    .replace(/\\\$/g, '$')
    .replace(/\\&/g, '&')
    .replace(/~/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function formatDuration(startDate: string, endDate: string, compact = false) {
  const months: Record<string, number> = {
    jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
    jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11,
  };
  const parseMonth = (date: string) => {
    if (date === 'Present') return new Date();
    const [, month, year] = date.match(/^([A-Za-z]+)\.?\s+(\d{4})$/) ?? [];
    return month && year ? new Date(Number(year), months[month.slice(0, 3).toLowerCase()] ?? 0, 1) : null;
  };
  const start = parseMonth(startDate);
  const end = parseMonth(endDate);
  if (!start || !end) return '';

  const totalMonths = Math.max(0, (end.getFullYear() - start.getFullYear()) * 12 + end.getMonth() - start.getMonth());
  const years = Math.floor(totalMonths / 12);
  const remainingMonths = totalMonths % 12;
  return [
    years && (compact ? `${years}y` : `${years} ${years === 1 ? 'year' : 'years'}`),
    remainingMonths && (compact ? `${remainingMonths}m` : `${remainingMonths} ${remainingMonths === 1 ? 'month' : 'months'}`),
  ].filter(Boolean).join(' ');
}

/**
 * The bundled TeX résumé is the canonical source for professional experience.
 * This intentionally understands the compact \resumeHeading/itemize format in
 * src/data/resume.tex, avoiding a second copy of the same content. The build
 * copies this source to public/resume.tex for the downloadable version.
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
      duration: formatDuration(startDate, endDate),
      durationShort: formatDuration(startDate, endDate, true),
      highlights,
    };
  });
}

export const experience = parseExperience(resumeTex);
