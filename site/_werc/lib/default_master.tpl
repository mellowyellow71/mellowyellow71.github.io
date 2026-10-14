<header class="site-header">
  <div class="header-links" aria-label="Contact and social links">
    <a href="mailto:revant@stanford.edu">revant@stanford.edu</a>
    <span aria-hidden="true">|</span>
    <a href="https://github.com/mellowyellow71">github</a>
    <span aria-hidden="true">|</span>
    <a href="https://www.linkedin.com/in/revant-kasichainula">linkedin</a>
    <span aria-hidden="true">|</span>
    <a href="https://x.com/rayk65537">x/twt</a>
  </div>
  <img class="masthead-art" src="/assets/lake-banner.jpg" width="2172" height="724" alt="">
  <a class="site-name" href="/">Revant Kasichainula</a>
</header>
<div class="site-body">
<aside class="site-sidebar">
  <nav aria-label="Sections">
% template `{get_lib_file sidebar.tpl}
  </nav>
</aside>
<main id="content">
% run_handlers $handlers_body_head
% run_handler $handler_body_main
% run_handlers $handlers_body_foot
</main>
</div>
<footer class="site-footer">
  <span><a href="https://github.com/mellowyellow71">GitHub</a> · <a href="https://werc.cat-v.org/">powered by werc</a></span>
</footer>
</div>
