import { readFileSync, writeFileSync } from 'node:fs';

const redirects = JSON.parse(readFileSync(new URL('../src/data/redirects.json', import.meta.url), 'utf8'));
const rules = [
  '# Generated from src/data/redirects.json. Do not edit manually.',
  ...Object.entries(redirects).map(([keyword, destination]) => `/${keyword} ${destination} 301`),
  '',
];

writeFileSync(new URL('../public/_redirects', import.meta.url), rules.join('\n'));
