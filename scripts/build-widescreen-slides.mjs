// Compose vector layouts around the original, unmodified JPEG student rows.
// Run: node scripts/build-widescreen-slides.mjs
// No retouching or raster re-encoding; the original JPEG bytes are embedded.
import { readFile, writeFile } from 'node:fs/promises';

const root = new URL('../src/assets/carousel/', import.meta.url);
const slides = [
  { number: 8, width: 1452, top: 401, heading: '26 TOPPERS', size: 100, caption: 'Hard work. Outstanding results.' },
  { number: 9, width: 1518, top: 400, heading: 'YOU MAKE US PROUD', size: 70, caption: 'Smart guidance. Remarkable achievements.' },
  { number: 10, width: 1516, top: 338, heading: '2026 TOPPERS', size: 94, caption: 'Congratulations to our achievers!' },
  { number: 11, width: 1516, top: 338, heading: '2026 TOPPERS', size: 94, caption: 'Congratulations to our achievers!' },
  { number: 12, width: 1514, top: 338, heading: '2026 TOPPERS', size: 94, caption: 'Congratulations to our achievers!' },
];

for (const slide of slides) {
  const bytes = await readFile(new URL(`slide${slide.number}.jpg`, root));
  // The viewBox matches the displayed row's ratio, so both axes scale equally.
  // Bounds include all five students' hair, portraits, scores and nameplates.
  const rowHeight = (slide.number < 10 ? 780 : 755) - slide.top;
  const displayHeight = rowHeight * 1812 / slide.width;
  const footerTop = 280 + displayHeight;
  const footerBaseline = footerTop + (868 - footerTop) / 2 + 9;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1812" height="868" viewBox="0 0 1812 868" role="img" aria-labelledby="title">
  <title id="title">Manch results — ${slide.heading}</title>
  <defs>
    <linearGradient id="blue" x2="1" y2="1"><stop stop-color="#073d85"/><stop offset="1" stop-color="#051c4e"/></linearGradient>
    <linearGradient id="gold"><stop stop-color="#fff293"/><stop offset=".5" stop-color="#ffd43b"/><stop offset="1" stop-color="#e6ae16"/></linearGradient>
  </defs>
  <path fill="url(#blue)" d="M0 0h1812v868H0z"/>
  <path fill="#0b53a4" opacity=".5" d="M1200 0h300l-280 280H920zM1600 0h212v90l-190 190h-300z"/>
  <path fill="url(#gold)" d="M0 0h96L0 96zM1812 868h-80l80-80z"/>
  <g fill="white">
    <text x="72" y="132" font-family="Georgia,serif" font-size="112" font-weight="bold">Manch<tspan font-size="28" baseline-shift="super">®</tspan></text>
    <text x="78" y="190" font-family="Arial,sans-serif" font-size="31" letter-spacing="4">IIT-JEE | NEET</text>
  </g>
  <path stroke="#7eb8ed" stroke-opacity=".45" stroke-width="2" d="M590 62v154"/>
  <g font-family="Arial,sans-serif" text-anchor="middle">
    <text x="1180" y="141" font-size="${slide.size}" font-weight="900" font-style="italic" fill="url(#gold)">${slide.heading}</text>
    <text x="1180" y="202" font-size="29" fill="#d9edff" letter-spacing="1">${slide.caption}</text>
  </g>
  <path fill="url(#gold)" d="M0 276h1812v4H0z"/>
  <svg x="0" y="280" width="1812" height="${displayHeight}" viewBox="0 ${slide.top} ${slide.width} ${rowHeight}" overflow="hidden" preserveAspectRatio="xMidYMid meet">
    <image href="data:image/jpeg;base64,${bytes.toString('base64')}" width="${slide.width}" height="945"/>
  </svg>
  <path stroke="#4a8bd1" d="M0 ${footerTop}h1812"/>
  <g font-family="Arial,sans-serif" font-size="24">
    <text x="64" y="${footerBaseline}" fill="#d9edff" letter-spacing="2">BETTER GUIDANCE. BRIGHTER FUTURE.</text>
    <text x="1748" y="${footerBaseline}" text-anchor="end" fill="#ffdc51" font-weight="bold" letter-spacing="2">CELEBRATING OUR ACHIEVERS</text>
  </g>
</svg>`;
  await writeFile(new URL(`slide${slide.number}-wide.svg`, root), svg);
  console.log(`Built slide${slide.number}-wide.svg (1812×868)`);
}
