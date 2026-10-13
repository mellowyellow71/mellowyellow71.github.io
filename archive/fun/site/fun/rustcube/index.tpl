<h1>rustcube</h1>
<p>A little terminal-based cube timer I wrote in Rust, with TNoodle generating the scrambles. Space to arm, start, and stop.</p>
<section class="cube-demo" aria-label="3×3 scramble generator">
  <div id="cube-view" class="cube-view" aria-label="Cube after applying the scramble"></div>
  <p id="cube-scramble" class="cube-scramble" aria-label="Scramble" tabindex="0">Loading a 3×3 scramble…</p>
  <div class="cube-controls">
    <button id="cube-new" type="button" disabled>new scramble</button>
    <button id="cube-copy" type="button" disabled>copy</button>
    <span id="cube-status" role="status" aria-live="polite"></span>
  </div>
  <p class="cube-credit">Browser scrambles by <a href="https://js.cubing.net/cubing/scramble/">cubing.js</a>.</p>
  <noscript><p>Enable JavaScript to try the scrambler.</p></noscript>
</section>
<p><a href="https://github.com/mellowyellow71/rustcube">github →</a></p>
<p><a href="/fun/">Back to fun</a></p>
