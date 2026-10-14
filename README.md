# mellowyellow71.github.io

Revant Kasichainula’s personal website, authored with [werc](https://werc.cat-v.org/) and exported as static HTML.

Website: [mellowyellow71.github.io](https://mellowyellow71.github.io/).

## Deployment

Push changes to `main` to deploy, or run **Deploy werc site to GitHub Pages** from the Actions tab. The workflow builds the pinned Plan 9 runtime, checks real werc responses, exports the site using GitHub Pages’ reported base path, checks the export, and deploys `dist/`. The Pages publishing source is **GitHub Actions**.

## Authoring and preview

Edit content in `site/`, templates in `site/_werc/lib/`, and styles or media in `site/assets/`. `dist/` is generated output.

Local setup requires Python 3, Node.js, Git, and a C compiler. No npm dependencies are required. The upstream template compiler uses the host’s `/usr/bin/awk` for UTF-8 compatibility on Linux.

```sh
npm run setup
npm run dev
```

The preview runs at `http://127.0.0.1:4173/` using live werc CGI. To validate the root-site export:

```sh
python3 scripts/check_werc.py
python3 scripts/export_werc.py --base-path /
python3 scripts/check_export.py --base-path /
```

The export preserves directory routes and compatibility redirects. Its base path is applied to local links and asset URLs; external links remain unchanged.

## Archived content

The Fun section (fftwall, rustcube, and keebs) is preserved in [`archive/fun/`](archive/fun/README.md). Its pages, compatibility aliases, and assets are outside `site/` and are excluded from deployment.

## Third-party code

- The vendored werc release is public-domain software. Its original README and release provenance are preserved in `vendor/werc/` and `vendor/WERC_SOURCE.md`.
- Archived FFT artwork adapts [fftwall](https://github.com/mellowyellow71/fftwall); its MIT license is in `archive/fun/site/assets/fftwall-LICENSE.txt`.
- The archived cube demo uses self-hosted cubing.js 0.65.1 under MPL-2.0, with dependency notices in `archive/fun/site/assets/vendor/cubing/`. Preserve the complete relative chunk layout, licenses, and provenance when restoring or updating it.

Plan 9 from User Space is downloaded from its pinned official source during setup. Its runtime is cached outside the published artifact.
