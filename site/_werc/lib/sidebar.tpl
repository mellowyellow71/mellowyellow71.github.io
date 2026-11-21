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
% site_sidebar_link /other-interests/ 'other interests/'
  </li>
</ul>
