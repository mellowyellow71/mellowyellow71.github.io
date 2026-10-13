const view = document.querySelector('#cube-view');
const output = document.querySelector('#cube-scramble');
const nextButton = document.querySelector('#cube-new');
const copyButton = document.querySelector('#cube-copy');
const status = document.querySelector('#cube-status');

let library;
let puzzle;
let diagram;
let currentScramble = '';
let pending = false;

async function newScramble() {
  if (pending) return;
  pending = true;
  nextButton.disabled = true;
  copyButton.disabled = true;
  status.textContent = 'generating…';
  output.setAttribute('aria-busy', 'true');

  try {
    library ??= await import('./vendor/cubing/index.js');
    if (!diagram) {
      const loader = library.puzzles['3x3x3'];
      const [kpuzzle, svg] = await Promise.all([loader.kpuzzle(), loader.svg()]);
      puzzle = kpuzzle;
      diagram = new library.ExperimentalSVGAnimator(puzzle, svg);
      diagram.svgElement.setAttribute('role', 'img');
      view.append(diagram.svgElement);
    }
    const scramble = await library.randomScrambleForEvent('333');
    diagram.drawPattern(puzzle.defaultPattern().applyAlg(scramble));
    currentScramble = scramble.toString();
    diagram.svgElement.setAttribute('aria-label', `Cube after applying ${currentScramble}`);
    output.textContent = currentScramble;
    status.textContent = '';
  } catch (error) {
    console.error('Scramble generation failed:', error);
    if (!currentScramble) output.textContent = 'Scramble unavailable.';
    status.textContent = 'Couldn’t generate a scramble. Try again.';
  } finally {
    pending = false;
    nextButton.disabled = false;
    copyButton.disabled = !currentScramble;
    output.removeAttribute('aria-busy');
  }
}

nextButton.addEventListener('click', newScramble);
copyButton.addEventListener('click', async () => {
  const scramble = currentScramble;
  try {
    await navigator.clipboard.writeText(scramble);
    if (!pending && currentScramble === scramble) status.textContent = 'copied';
  } catch {
    // Keep the notation directly selectable when clipboard access is unavailable.
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(output);
    selection.removeAllRanges();
    selection.addRange(range);
    output.focus();
    status.textContent = 'Selected — press Ctrl+C or ⌘C to copy.';
  }
});

newScramble();
