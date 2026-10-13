// Rebuild the original header drawing from fftwall's seed-42 Svensson density.
// No runtime dependency: this script writes a static, transparent SVG.
import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { generateDensity, randomGenerator } from '../site/assets/art-core.js';

const size = 256;
let field = generateDensity('svensson', 42, size).field;
// Smooth density rather than coordinates so the filaments retain their shape.
for (let pass = 0; pass < 4; pass++) {
  const smoothed = new Float64Array(field.length);
  for (let y = 1; y < size - 1; y++) for (let x = 1; x < size - 1; x++) {
    let value = 0;
    for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
      value += field[(y + dy) * size + x + dx] * (dx === 0 ? 2 : 1) * (dy === 0 ? 2 : 1);
    }
    smoothed[y * size + x] = value / 16;
  }
  field = smoothed;
}

const project = ([x, y]) => [238 + x / (size - 1) * 414 + (128 - y) * .08, 5 + y / (size - 1) * 155];
const round = value => Math.round(value * 10) / 10;
const key = ([x, y]) => `${x.toFixed(5)},${y.toFixed(5)}`;
const primitive = [];
const paths = [];

function simplify(points, tolerance = .24) {
  if (points.length < 3) return points;
  const a = points[0], b = points.at(-1), dx = b[0] - a[0], dy = b[1] - a[1];
  const denominator = dx * dx + dy * dy;
  let furthest = 0, maximum = tolerance * tolerance;
  for (let i = 1; i < points.length - 1; i++) {
    const p = points[i];
    const t = denominator ? Math.max(0, Math.min(1, ((p[0]-a[0])*dx+(p[1]-a[1])*dy)/denominator)) : 0;
    const distance = (p[0]-a[0]-t*dx)**2 + (p[1]-a[1]-t*dy)**2;
    if (distance > maximum) {maximum = distance; furthest = i;}
  }
  if (!furthest) return [a, b];
  return [...simplify(points.slice(0, furthest+1), tolerance).slice(0, -1), ...simplify(points.slice(furthest), tolerance)];
}

function contour(level) {
  const segments = [], ends = new Map();
  const add = (a, b) => {
    const index = segments.length;
    segments.push([a, b]);
    for (const point of [a, b]) {
      const id = key(point);
      if (!ends.has(id)) ends.set(id, []);
      ends.get(id).push(index);
    }
  };
  const pairs = {1:[[3,0]],2:[[0,1]],3:[[3,1]],4:[[1,2]],5:[[3,0],[1,2]],6:[[0,2]],7:[[3,2]],8:[[2,3]],9:[[2,0]],10:[[0,1],[2,3]],11:[[2,1]],12:[[1,3]],13:[[1,0]],14:[[0,3]]};
  for (let y = 0; y < size - 1; y++) for (let x = 0; x < size - 1; x++) {
    const v = [field[y*size+x],field[y*size+x+1],field[(y+1)*size+x+1],field[(y+1)*size+x]];
    const mask = v.reduce((mask, value, bit) => mask | (value >= level ? 1 << bit : 0), 0);
    if (!pairs[mask]) continue;
    const p = [[x,y],[x+1,y],[x+1,y+1],[x,y+1]];
    const edge = index => {
      const next = (index + 1) % 4;
      const t = (level - v[index]) / (v[next] - v[index]);
      return [p[index][0] + t * (p[next][0] - p[index][0]), p[index][1] + t * (p[next][1] - p[index][1])];
    };
    for (const [a, b] of pairs[mask]) add(edge(a), edge(b));
  }
  const seen = new Set(), lines = [];
  for (let start = 0; start < segments.length; start++) {
    if (seen.has(start)) continue;
    const line = [segments[start][0]], initial = key(line[0]);
    let current = start, point = line[0];
    while (current !== undefined && !seen.has(current)) {
      seen.add(current);
      const segment = segments[current];
      point = key(segment[0]) === key(point) ? segment[1] : segment[0];
      line.push(point);
      current = ends.get(key(point)).find(index => !seen.has(index));
      if (key(point) === initial) break;
    }
    if (line.length >= 10) lines.push(simplify(line.map(project)));
  }
  return lines;
}

// Density is strongest along the actual attractor's folds. Fine contours show
// those folds without turning the enclosed area into a solid patch of ink.
for (const [level, opacity] of [[2.8,.65],[3.25,.72],[3.7,.8]]) {
  const lines = contour(level);
  const d = lines.map(line => line.map(([x,y],index) => `${index?'L':'M'}${round(x)} ${round(y)}`).join('')).join('');
  paths.push(`<path d="${d}" fill="none" stroke="#172745" stroke-width=".75" opacity="${opacity}"/>`);
  for (const points of lines) primitive.push({points, opacity, width:.75});
}

// Sparse dots add a dry-ink texture using the same density, not arbitrary noise.
const random = randomGenerator(42), stipple = [];
for (let y = 1; y < size - 1; y++) for (let x = 1; x < size - 1; x++) {
  const density = field[y * size + x];
  if (density < 2.4 || random() > Math.min(.3, (density - 2.4) * .16)) continue;
  const p = project([x + random() * .5, y + random() * .5]);
  stipple.push(p);
}
const dots = stipple.map(([x,y]) => `M${round(x)} ${round(y)}h.12`).join('');
paths.push(`<path d="${dots}" fill="none" stroke="#172745" stroke-linecap="round" stroke-width=".65" opacity=".38"/>`);

// Light phase-orbit traces give the shape a leftward sweep; their proportions
// follow the wide, shallow ellipse of this particular Svensson attractor.
const sweeps = [
  {points:[[34,105],[56,42],[318,19],[579,90],[414,169],[112,170],[34,105]],opacity:.2},
  {points:[[97,81],[91,34],[371,1],[625,77],[528,169],[211,165],[97,81]],opacity:.2},
  {points:[[177,113],[199,55],[406,10],[645,93],[516,153],[230,181],[177,113]],opacity:.19},
];
for (const {points,opacity} of sweeps) {
  const [[x,y],a,b,c,d,e,f] = points;
  const path = `M${x} ${y}C${a.join(' ')} ${b.join(' ')} ${c.join(' ')}C${d.join(' ')} ${e.join(' ')} ${f.join(' ')}`;
  paths.unshift(`<path d="${path}" fill="none" stroke="#172745" stroke-width=".7" stroke-dasharray=".3 2.5" stroke-linecap="round" opacity="${opacity}"/>`);
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 660 176" width="660" height="176"><title>Svensson phase portrait</title><desc>An original ink drawing made from fftwall's seed-42 attractor density, with thin contours and stippled orbit traces.</desc>${paths.join('')}</svg>\n`;
const output = fileURLToPath(new URL('../site/assets/fft-masthead.svg', import.meta.url));
await writeFile(output, svg);
console.log(`${output}: ${Buffer.byteLength(svg)} bytes`);
// Optional data for a local raster preview; never included in the website.
if (process.argv[2]) await writeFile(process.argv[2], JSON.stringify({primitive,stipple,sweeps}));
