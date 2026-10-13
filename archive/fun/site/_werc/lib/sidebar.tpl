<ul class="nav-tree">
  <li>
% site_sidebar_link / 'home/'
  </li>
  <li>
% site_sidebar_link /projects/ 'projects/'
% if(~ $req_path /projects/ /projects/*) {
    <ul>
      <li>
% site_sidebar_link '/projects/#ik-solver' 'IK solver'
      </li>
      <li>
% site_sidebar_link '/projects/#core-mpc' CoRE-MPC
      </li>
      <li>
% site_sidebar_link '/projects/#robust-mpc' RobustMPC
      </li>
      <li>
% site_sidebar_link '/projects/#gnn-mpc' gnn_mpc
      </li>
      <li>
% site_sidebar_link '/projects/#cvxpy' CVXPY
      </li>
    </ul>
% }
  </li>
  <li>
% site_sidebar_link /fun/ 'fun/'
% if(~ $req_path /fun/ /fun/*) {
    <ul>
      <li>
% site_sidebar_link /fun/fftwall/ fftwall
      </li>
      <li>
% site_sidebar_link /fun/rustcube/ rustcube
      </li>
      <li>
% site_sidebar_link /fun/mechanical-keyboards/ keebs
      </li>
    </ul>
% }
  </li>
  <li>
% site_sidebar_link /other-interests/ 'other interests/'
  </li>
</ul>
