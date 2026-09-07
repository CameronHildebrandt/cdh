import resumeTex from '../data/resume.tex?raw';

export function GET() {
  return new Response(resumeTex, {
    headers: {
      'Content-Disposition': 'attachment; filename="cameron-hildebrandt-resume.tex"',
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
