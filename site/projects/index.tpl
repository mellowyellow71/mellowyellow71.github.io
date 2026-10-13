<h1>Projects</h1>
<p>please take a look at some of my projects:</p>

<h2 id="ik-solver">IK solver</h2>
<video class="project-video" width="800" height="450" autoplay loop muted playsinline preload="metadata" poster="/assets/ik-solver-dance.jpg" aria-label="Humanoid robots performing kicks and turns retargeted from dance1_subject2, viewed from a fixed camera">
  <source src="/assets/ik-solver-dance.mp4" type="video/mp4">
  <a href="/assets/ik-solver-dance.mp4">Watch the retargeting clip</a>.
</video>
<p>lafan1 dataset: <a href="https://huggingface.co/datasets/lvhaidong/LAFAN1_Retargeting_Dataset">LAFAN1 Retargeting Dataset</a></p>
<p>I’m currently building a fast trajectory-optimization IK solver that turns human motion capture into humanoid robot motions the robot can actually execute. It optimizes the whole clip at once while respecting joint limits, speed limits, self-collision constraints, and foot contact. It beats the Levenberg-Marquardt pipelines people use today on their own objective while running 20 to 40 times faster. Its output is the target trajectory for humanoid RL controllers.</p>

<h2 id="core-mpc">CoRE-MPC</h2>
<img class="project-hero" src="/assets/core-mpc-hero.png" width="1713" height="667" alt="Nominal reduced-order MPC and CoRE-MPC compared for a soft robot near a wall">
<p>Coupled Reduction Error Model Predictive Control</p>
<p>Previously worked on CoRE-MPC, which makes fast control of high-dimensional nonlinear systems practical without evaluating the full dynamics online. It propagates two coupled error bounds to guarantee full-system constraint satisfaction under the method’s stated assumptions. Submitted to ICRA2027.</p>

<h2 id="robust-mpc">RobustMPC</h2>
<div class="project-gallery">
  <figure class="project-media">
    <video width="768" height="512" autoplay loop muted playsinline preload="metadata" poster="/assets/robust-mpc/wind-tunnel.jpg" aria-label="Smoke particles moving around an aircraft with surface pressure coloring">
      <source src="/assets/robust-mpc/wind-tunnel.mp4" type="video/mp4">
    </video>
    <figcaption>Wind tunnel · surface pressure and smoke flow at α = 10°.</figcaption>
  </figure>
  <figure class="project-media">
    <video width="800" height="550" autoplay loop muted playsinline preload="metadata" poster="/assets/robust-mpc/banked-turn.jpg" aria-label="Flexible-airframe banked-turn simulation">
      <source src="/assets/robust-mpc/banked-turn.mp4" type="video/mp4">
    </video>
    <figcaption>Flexible-airframe banked-turn simulation.</figcaption>
  </figure>
  <figure class="project-media">
    <img src="/assets/robust-mpc/structure.webp" width="800" height="500" loading="lazy" decoding="async" alt="Aircraft structural element sets, with two elevons highlighted">
    <figcaption>Structural element sets and elevon hinges.</figcaption>
  </figure>
  <figure class="project-media">
    <video width="800" height="500" autoplay loop muted playsinline preload="metadata" poster="/assets/robust-mpc/structural-modes.jpg" aria-label="Two aircraft flex modes and a right-elevon mechanism, with slowed and amplified motion">
      <source src="/assets/robust-mpc/structural-modes.mp4" type="video/mp4">
    </video>
    <figcaption>Flex modes and elevon motion · slowed and amplified for display.</figcaption>
  </figure>
</div>
<p>I worked on reduced-order MPC for flexible aircraft, aiming to track maneuvers reliably under model error and actuator limits. I integrated GuSTO planning with Aero-S and built a differentiable JAX simulator coupling airflow, wing deformation, and flight dynamics. My work included stabilizing reduced fluid models, correcting inconsistent maneuver references, and diagnosing the model and actuator failures that destabilized flight.</p>

<h2 id="gnn-mpc">gnn_mpc</h2>
<figure class="project-media">
  <video width="764" height="208" autoplay loop muted playsinline preload="metadata" poster="/assets/gnn-mpc/truth-vs-surrogate.jpg" aria-label="CFD truth and a surrogate rollout shown side by side over a forced limit cycle">
    <source src="/assets/gnn-mpc/truth-vs-surrogate.mp4" type="video/mp4">
  </video>
  <figcaption>CFD truth and surrogate rollout · forced limit cycle.</figcaption>
</figure>
<p>I built a mesh-transformer surrogate and a condensed MPC controller for a rotating-cylinder wake. I replaced expensive sampling with Jacobian-vector-product sensitivities, move blocking, and compiled mixed-precision inference so the learned model could be used for feedback control. Recorded H100 runs reached a median planning time of 0.47 seconds per step, compared with about 30 seconds for the MPPI baseline. In one CFD run, the near-wake fluctuation cost fell by about 80%.</p>
<h2 id="cvxpy">CVXPY</h2>
<p>I worked on a Rust replacement for CVXPY’s C++ canonicalization backend, which turns optimization models into sparse solver data. I focused on reducing repeated work in shared expression graphs, avoiding unnecessary sparse intermediates, and cutting Python–Rust transfer overhead. I also added support for parameterized N-dimensional operations and built cross-backend correctness checks and benchmarks to verify that the faster compilation preserved the solver inputs.</p>
