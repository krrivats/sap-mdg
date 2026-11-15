// Build a classic-script bundle so index.html works when opened directly from disk.
// ES modules are blocked by browsers on file:// URLs, so we concatenate the
// source modules into one IIFE that loads with a normal <script> tag.
import { readFileSync, writeFileSync } from 'node:fs';

const files = [
  'src/learning.js',
  'src/content.js',
  'src/interview.js',
  'src/interview-simple.js',
  'src/diagrams.js',
  'src/app.js'
];

const strip = (code) =>
  code
    .split('\n')
    .filter((line) => !/^\s*import\s/.test(line))
    .map((line) => line.replace(/^\s*export\s+(const|let|var|function|class)\s/, '$1 '))
    .join('\n');

const body = files.map((file) => `/* ${file} */\n${strip(readFileSync(file, 'utf8'))}`).join('\n\n');
const out = `/* SAP MDG Learning Lab — generated bundle. Edit the files in src/ then run: npm run build */\n(() => {\n'use strict';\n${body}\n})();\n`;
writeFileSync('app.bundle.js', out, 'utf8');
console.log(`Wrote app.bundle.js (${out.length.toLocaleString()} chars)`);
