import { access, copyFile, mkdir, mkdtemp, rm } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const previewDirectory = resolve(root, 'resume-tmp');
const source = resolve(previewDirectory, 'resume.tex');
const publish = process.argv.includes('--publish');
const destination = publish
  ? resolve(root, 'public/resume.pdf')
  : resolve(previewDirectory, 'resume.pdf');
const temporaryDirectory = await mkdtemp(resolve(tmpdir(), 'chil-resume-'));

const compile = () => new Promise((resolveCompile, rejectCompile) => {
  const process = spawn('pdflatex', ['-halt-on-error', '-interaction=nonstopmode', `-output-directory=${temporaryDirectory}`, source], {
    cwd: root,
    stdio: 'inherit',
  });

  process.once('error', () => rejectCompile(new Error('Could not find pdflatex. Install a TeX distribution such as MacTeX, then run yarn gen-pdf again.')));
  process.once('exit', (code) => code === 0 ? resolveCompile() : rejectCompile(new Error('TeX compilation failed. See the pdflatex output above.')));
});

const revealInFinder = (path) => new Promise((resolveReveal) => {
  const finder = spawn('open', ['-R', path], { stdio: 'ignore' });
  finder.once('error', () => {
    console.warn('Could not reveal the generated file in Finder.');
    resolveReveal();
  });
  finder.once('exit', () => resolveReveal());
});

try {
  try {
    await access(source);
  } catch {
    throw new Error('No temporary TeX résumé found. Run yarn gen-resume first, then run yarn gen-pdf.');
  }
  await compile();
  await mkdir(dirname(destination), { recursive: true });
  await copyFile(resolve(temporaryDirectory, 'resume.pdf'), destination);
  console.log(`Generated ${destination.replace(`${root}/`, '')}.`);
  await revealInFinder(destination);
} finally {
  await rm(temporaryDirectory, { recursive: true, force: true });
}
