# Archived Fun section

fftwall, rustcube, and keebs are retained here for later use. This directory is outside the active `site/` tree, so the static exporter does not publish its pages or assets.

The original directory layout preserves module imports and the masthead helper's relative paths. `manifest.json` records each original path and SHA-256 hash. All moved files are unchanged, including third-party licenses and notices.

Snapshots of shared templates, CSS, and legacy About/Work pages preserve the previous integration. `fun.css` contains the styles removed from the active stylesheet.

To restore the section:

1. Move the files marked `moved` in `manifest.json` back to their original paths.
2. Reinsert the Fun navigation and script hooks from the archived template snapshots, and merge `fun.css` into the active stylesheet.
3. Run the werc checks and project-path export described in the root README before publishing.

Shared-file snapshots are reference copies; do not overwrite newer shared files when restoring.
