<figure class="artwork">
  <div class="art-picture">
    <img src="/assets/art/svensson-42.webp" width="1600" height="900" alt="A Svensson attractor generated with fftwall.">
    <canvas id="art-canvas" width="512" height="512" role="img" aria-label="Generated mathematical artwork"></canvas>
  </div>
  <figcaption id="art-caption">Svensson attractor · spatial domain · seed 42</figcaption>
</figure>
<div class="art-controls" aria-label="Procedural artwork controls">
  <label for="art-system">Map</label>
  <select id="art-system"><option value="svensson">Svensson</option><option value="dejong">De Jong</option><option value="clifford">Clifford</option></select>
  <span id="art-seed">seed 42</span>
  <button id="reseed" type="button">new seed</button>
  <div class="domain-controls" role="group" aria-label="Artwork domain"><button id="space-button" type="button" aria-pressed="true">spatial</button> / <button id="spectrum-button" type="button" aria-pressed="false">spectrum</button></div>
</div>
<p class="sr-only" id="art-status" role="status" aria-live="polite"></p>
