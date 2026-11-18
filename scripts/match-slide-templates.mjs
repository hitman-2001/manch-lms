// Reuse slide 10's artwork with slides 8 and 9's original student rows.
// Original JPEGs remain unmodified; SVG applies uniform scaling only.
// Run: node scripts/match-slide-templates.mjs
import { readFile, writeFile } from 'node:fs/promises';

const assets = new URL('../src/assets/carousel/', import.meta.url);
const template = await readFile(new URL('slide10.jpg', assets));
const width = 1516;
const rowTop = 338;
const rowBottom = 740;
const slides = [
  {
    number: 8, sourceWidth: 1452, sourceTop: 401,
    description: 'Pavithra Sriram 96.2%, Prachita Manjrekar 95.4%, Babita Kasbe 95.2%, Drishti Singh 94.2%, Soha Palkar 94.2%.',
  },
  {
    number: 9, sourceWidth: 1518, sourceTop: 400,
    description: 'Mansha Jaiswal 93.8%, Janhvi Jadhav 93.6%, Parth Porwal 93.4%, Soumya Tiwari 93.2%, Om Rai 93%.',
  },
];

for (const { number, sourceWidth, sourceTop, description } of slides) {
const students = await readFile(new URL(`slide${number}.jpg`, assets));
const sourceHeight = (rowBottom - rowTop) * sourceWidth / width;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1516" height="945" viewBox="0 0 1516 945" role="img" aria-labelledby="title desc">
  <title id="title">Manch 2026 toppers</title>
  <desc id="desc">${description} Original student photographs and labels.</desc>
  <image href="data:image/jpeg;base64,${template.toString('base64')}" width="1516" height="945"/>
  <svg x="0" y="${rowTop}" width="${width}" height="${rowBottom - rowTop}" viewBox="0 ${sourceTop} ${sourceWidth} ${sourceHeight}" overflow="hidden" preserveAspectRatio="xMidYMid meet">
    <image href="data:image/jpeg;base64,${students.toString('base64')}" width="${sourceWidth}" height="945"/>
  </svg>
</svg>`;
await writeFile(new URL(`slide${number}-matched.svg`, assets), svg);
console.log(`Built slide${number}-matched.svg using the original JPEG bytes.`);
}
