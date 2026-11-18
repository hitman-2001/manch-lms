// Build brand-aligned results posters using unretouched original photo crops.
// Run from the repository root: node scripts/restore-student-photos.mjs
import { execFileSync } from 'node:child_process';
import { writeFile } from 'node:fs/promises';
import { Jimp } from 'jimp';

const revamp = '7650c4e';
const banners = [
  { slide: 8, cards: [
    ['Pavithra Sriram', 28, 450, 334, 307],
    ['Prachita Manjrekar', 383, 453, 337, 310],
    ['Babita Kasbe', 739, 459, 339, 311],
    ['Drishti Singh', 181, 848, 339, 312],
    ['Soha Palkar', 589, 849, 338, 311],
  ] },
  { slide: 9, cards: [
    ['Mansha Jaiswal', 16, 448, 334, 307],
    ['Janhvi Jadhav', 382, 454, 335, 305],
    ['Parth Porwal', 729, 459, 334, 309],
    ['Soumya Tiwari', 171, 849, 334, 306],
    ['Om Rai', 578, 850, 335, 306],
  ] },
  { slide: 10, cards: [
    ['Princy Jain', 16, 454, 334, 305],
    ['Vidhi Gharat', 383, 458, 335, 307],
    ['Aditya Palve', 729, 465, 335, 305],
    ['Pavitra Rane', 170, 854, 335, 305],
    ['Riyaan Pirjade', 579, 855, 335, 306],
  ] },
  { slide: 11, cards: [
    ['Aayushman Jha', 16, 471, 334, 308],
    ['Dhyan Shetty', 373, 476, 336, 306],
    ['Shruti Yadav', 728, 482, 336, 308],
    ['Aditya Singh', 171, 872, 335, 307],
    ['Nidhi Kadam', 579, 872, 335, 309],
  ] },
  { slide: 12, cards: [
    ['Vikash Choudhary', 25, 484, 335, 313],
    ['Purva Shedge', 372, 481, 337, 311],
    ['Prem Singh', 728, 487, 336, 310],
    ['Tejas Mishra', 18, 862, 335, 311],
    ['Sachin Yadav', 375, 862, 335, 310],
    ['Akshra Desai', 728, 862, 336, 310],
  ] },
];

function readAtRevision(revision, path) {
  return Jimp.read(execFileSync('git', ['show', `${revision}:${path}`], {
    maxBuffer: 10 * 1024 * 1024,
  }));
}

// Values and spellings are transcribed from the pre-revamp posters.
const scores = [
  ['96.2', '95.4', '95.2', '94.2', '94.2'],
  ['93.8', '93.6', '93.4', '93.2', '93.0'],
  ['92.2', '91.6', '91.4', '91.2', '90.8'],
  ['90.6', '90.6', '90.0', '90.0', '90.0'],
  ['90.0', '90.0', '90.0', '90.0', '90.0', '90.0'],
];
const escapeXml = (value) => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;');
const headings = [
  '<tspan fill="#fcd34d">26</tspan> TOPPERS',
  'HARD WORK. <tspan fill="#fcd34d">REAL RESULTS.</tspan>',
  '<tspan fill="#fcd34d">2026</tspan> ACHIEVERS',
  'SSC <tspan fill="#fcd34d">STAR PERFORMERS</tspan>',
  'YOU MAKE US <tspan fill="#fcd34d">PROUD.</tspan>',
];
const headingSizes = [118, 86, 110, 96, 100];
const portraitAspect = 208 / 186;

function matchHeadroomBackground(original, photo, card, crop, hairTop) {
  // Sample the real blue backdrop below the old poster border. Fit its horizontal
  // colour gradient, like extending a background with a sampled Photoshop fill.
  // No generative model, face reconstruction, or global photo colour adjustments.
  const samples = [];
  const isBlue = (r, g, b) => b > 155 && b - r > 40 && b - g > 14;
  // The strip on the final poster is darker than the portrait backdrop, but
  // retains the same strongly blue hue; do not mistake it for dark hair.
  const isBlueBackdrop = (r, g, b) => b > 110 && b - r > 40 && b - g > 14;
  for (let row = card.y + 34; row <= card.y + 62; row += 4) {
    for (let col = card.x + 14; col < card.x + card.width - 14; col += 4) {
      const offset = (row * original.bitmap.width + col) * 4;
      const rgb = [...original.bitmap.data.subarray(offset, offset + 3)];
      if (isBlue(...rgb)) samples.push({ x: col - card.x, rgb });
    }
  }
  if (samples.length < 20) throw new Error('Insufficient clean backdrop samples');
  const meanX = samples.reduce((sum, sample) => sum + sample.x, 0) / samples.length;
  const variance = samples.reduce((sum, sample) => sum + (sample.x - meanX) ** 2, 0);
  const gradient = [0, 1, 2].map(channel => {
    const mean = samples.reduce((sum, sample) => sum + sample.rgb[channel], 0) / samples.length;
    const slope = samples.reduce((sum, sample) => sum + (sample.x - meanX) * (sample.rgb[channel] - mean), 0) / variance;
    return { mean, slope };
  });
  // Restrict the repair to the old poster/card seam. Protect original hair
  // pixels (including their immediate edges), and leave the entire face alone.
  const repairEnd = Math.min(photo.bitmap.height, card.y + 30 - crop.y);
  const protectedPixels = new Uint8Array(photo.bitmap.width * repairEnd);
  for (let row = 0; row < repairEnd; row++) {
    for (let col = 0; col < photo.bitmap.width; col++) {
      const offset = (row * photo.bitmap.width + col) * 4;
      const [r, g, b] = photo.bitmap.data.subarray(offset, offset + 3);
      if (crop.y + row >= hairTop - 3 && !isBlueBackdrop(r, g, b)) {
        for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
          const nx = col + dx, ny = row + dy;
          if (nx >= 0 && nx < photo.bitmap.width && ny >= 0 && ny < repairEnd) {
            protectedPixels[ny * photo.bitmap.width + nx] = 1;
          }
        }
      }
    }
  }
  const before = Buffer.from(photo.bitmap.data);
  for (let row = 0; row < repairEnd; row++) {
    // Feather into the existing backdrop over the last eight pixels.
    const blend = Math.min(1, (repairEnd - 1 - row) / 8);
    for (let col = 0; col < photo.bitmap.width; col++) {
      if (protectedPixels[row * photo.bitmap.width + col]) continue;
      const offset = (row * photo.bitmap.width + col) * 4;
      gradient.forEach(({ mean, slope }, channel) => {
        const matched = Math.max(0, Math.min(255, mean + slope * (crop.x + col - card.x - meanX)));
        photo.bitmap.data[offset + channel] = Math.round(before[offset + channel] * (1 - blend) + matched * blend);
      });
    }
  }
  // Verify the protected hair and the lower portrait are copied byte-for-byte.
  for (let row = 0; row < photo.bitmap.height; row++) {
    for (let col = 0; col < photo.bitmap.width; col++) {
      if (row < repairEnd && !protectedPixels[row * photo.bitmap.width + col]) continue;
      const offset = (row * photo.bitmap.width + col) * 4;
      if (!before.subarray(offset, offset + 4).equals(photo.bitmap.data.subarray(offset, offset + 4))) {
        throw new Error('Background repair changed a protected portrait pixel');
      }
    }
  }
  return photo;
}

function portraitCrop(original, x, y, width, name) {
  const cardCenter = x + Math.round(width / 2);
  // The old poster's card edge is NOT the top of the student's hair. Some
  // portraits extend above it (notably Aditya Palve and Prem Singh).
  // Locate the dark hair against the blue poster before adding real headroom.
  let hairTop;
  for (let row = y - 24; row < y + 48; row++) {
    let hairPixels = 0;
    for (let col = cardCenter - 72; col <= cardCenter + 72; col++) {
      const offset = (row * original.bitmap.width + col) * 4;
      const [r, g, b] = original.bitmap.data.subarray(offset, offset + 3);
      if (Math.max(r, g, b) < 105 && b - r < 50) hairPixels++;
    }
    if (hairPixels >= 3) { hairTop = row; break; }
  }
  if (hairTop === undefined) throw new Error(`Unable to locate portrait at ${x}, ${y}`);
  // Centre the student, not the original poster's card. Measure the horizontal
  // midpoint of the face across several rows, excluding the blue background.
  // This only chooses the crop coordinates; no portrait pixels are transformed.
  const faceCenters = [];
  for (let row = hairTop + 42; row <= hairTop + 112; row += 3) {
    const faceColumns = [];
    for (let col = cardCenter - 115; col <= cardCenter + 115; col++) {
      const offset = (row * original.bitmap.width + col) * 4;
      const [r, g, b] = original.bitmap.data.subarray(offset, offset + 3);
      if (r > 65 && g > 35 && b > 20 && r - g > 8 && r - b > 12) faceColumns.push(col);
    }
    if (faceColumns.length >= 12) {
      const left = faceColumns[Math.floor(faceColumns.length * 0.05)];
      const right = faceColumns[Math.floor(faceColumns.length * 0.95)];
      faceCenters.push((left + right) / 2);
    }
  }
  if (faceCenters.length < 8) throw new Error(`Unable to determine portrait centre for ${name}`);
  faceCenters.sort((a, b) => a - b);
  const center = Math.round(faceCenters[Math.floor(faceCenters.length / 2)]);
  const top = hairTop - 22;
  // Keep the lower crop above the original score labels, then match only the
  // added headroom's backdrop to remove the old poster's different-blue strip.
  const height = y + 166 - top;
  const cropWidth = Math.round(height * portraitAspect);
  const crop = { x: center - Math.round(cropWidth / 2), y: top, w: cropWidth, h: height };
  if (crop.x < x || crop.x + crop.w > x + width) throw new Error(`Portrait crop exceeds original card for ${name}`);
  console.log(`${name}: horizontal crop shift ${center - cardCenter}px`);
  return matchHeadroomBackground(original, original.clone().crop(crop), { x, y, width }, crop, hairTop);
}

for (const [page, { slide, cards }] of banners.entries()) {
  const original = await readAtRevision(`${revamp}^`, `src/assets/carousel/slide${slide}.jpg`);
  const margin = 56;
  const gap = 22;
  const width = (1812 - 2 * margin - gap * (cards.length - 1)) / cards.length;
  const rendered = [];
  for (const [index, [name, x, y, w]] of cards.entries()) {
    const photo = portraitCrop(original, x, y, w, name);
    const image = (await photo.getBuffer('image/png')).toString('base64');
    const left = margin + index * (width + gap);
    // Consistent card inset and top alignment for both five- and six-photo rows.
    // Fit the entire crop proportionally; never cover/crop the hair to fill a box.
    const photoWidth = Math.min(width - 32, 240 * portraitAspect);
    const photoHeight = photoWidth / portraitAspect;
    const photoLeft = left + (width - photoWidth) / 2;
    const photoTop = 350;
    const nameParts = name.split(' ');
    rendered.push(`
    <g aria-label="${escapeXml(name)}, ${scores[page][index]} percent">
      <rect x="${left}" y="330" width="${width}" height="448" rx="24" fill="#1e40af" stroke="#60a5fa" stroke-opacity="0.65" stroke-width="2"/>
      <clipPath id="photo-${index}"><rect x="${photoLeft}" y="${photoTop}" width="${photoWidth}" height="${photoHeight}" rx="16"/></clipPath>
      <image href="data:image/png;base64,${image}" x="${photoLeft}" y="${photoTop}" width="${photoWidth}" height="${photoHeight}" preserveAspectRatio="xMidYMin meet" clip-path="url(#photo-${index})"/>
      <rect x="${left + 24}" y="608" width="${width - 48}" height="76" rx="16" fill="#fcd34d"/>
      <text x="${left + width / 2}" y="665" text-anchor="middle" fill="#172554" font-size="62" font-weight="800" letter-spacing="-2">${scores[page][index]}<tspan font-size="38" letter-spacing="0">%</tspan></text>
      <text x="${left + width / 2}" y="722" text-anchor="middle" fill="#ffffff" font-size="32" font-weight="600">${escapeXml(nameParts[0])}<tspan x="${left + width / 2}" dy="36">${escapeXml(nameParts.slice(1).join(' '))}</tspan></text>
    </g>`);
  }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1812" height="868" viewBox="0 0 1812 868" role="img" aria-labelledby="title desc">
  <title id="title">Manch SSC Board Results 2026 — ${page + 1} of 5</title>
  <desc id="desc">${cards.map(([name], index) => `${escapeXml(name)}: ${scores[page][index]}%`).join('; ')}. Original student photographs.</desc>
  <defs>
    <linearGradient id="brand" x1="0" y1="1" x2="1" y2="0">
      <stop stop-color="#172554"/>
      <stop offset="0.6" stop-color="#1e40af"/>
      <stop offset="1" stop-color="#2563eb"/>
    </linearGradient>
  </defs>
  <rect width="1812" height="868" fill="url(#brand)"/>
  <g fill="none" stroke="#93c5fd" stroke-width="2" opacity="0.12">
    <circle cx="1690" cy="-120" r="430"/>
    <circle cx="1690" cy="-120" r="500"/>
    <circle cx="1690" cy="-120" r="570"/>
  </g>
  <path d="M1728 0H1812V84Z" fill="#fcd34d"/>
  <g font-family="Arial, Helvetica, sans-serif">
    <text x="56" y="91" font-family="Georgia, serif" font-size="64" font-weight="700" letter-spacing="-2" fill="#ffffff">Manch</text>
    <path d="M277 48V92" stroke="#93c5fd" stroke-opacity="0.6" stroke-width="2"/>
    <text x="301" y="80" font-size="28" font-weight="600" letter-spacing="1" fill="#dbeafe">IIT–JEE | NEET</text>
    <rect x="1348" y="44" width="364" height="54" rx="27" fill="#172554" fill-opacity="0.3" stroke="#93c5fd" stroke-opacity="0.45"/>
    <text x="1530" y="80" text-anchor="middle" font-size="25" font-weight="700" letter-spacing="2" fill="#ffffff">SSC BOARD · 2026</text>
    <text x="52" y="231" font-size="${headingSizes[page]}" font-weight="800" letter-spacing="-3" fill="#ffffff">${headings[page]}</text>
    <rect x="56" y="271" width="36" height="4" rx="2" fill="#fcd34d"/>
    <text x="108" y="283" font-size="28" fill="#dbeafe">Celebrating the hard work of our Class 10 students.</text>
    ${rendered.join('\n')}
    <text x="56" y="835" font-size="26" fill="#dbeafe">Better guidance. Brighter future.</text>
    <text x="1756" y="835" text-anchor="end" font-size="24" font-weight="600" letter-spacing="2" fill="#dbeafe">OUR ACHIEVERS <tspan fill="#fcd34d">${String(page + 1).padStart(2, '0')} / 05</tspan></text>
  </g>
</svg>\n`;
  await writeFile(`src/assets/carousel/slide${slide}.svg`, svg);
  console.log(`Slide ${slide}: ${cards.length} original photos; ${cards.map(([name]) => name).join(', ')}`);
}
