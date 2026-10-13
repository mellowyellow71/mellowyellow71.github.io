# Framework provenance

The files in `werc/` are from the official werc release:

- Release: `werc-20260511.tgz`
- URL: https://werc.cat-v.org/download/werc-20260511.tgz
- SHA-256: `1dd2b45e9eb9fae57926963282bbd20e86855a89c44e7ccd2c468022fba76183`

The archive's Git metadata and example websites were excluded. Framework code is unmodified. This project's design overrides live in `site/_werc/lib/`; content lives in `site/`.

werc is distributed in the public domain, with MIT/ISC alternatives stated on its official site. Its upstream README is preserved in `werc/README`.

Plan 9 from User Space is downloaded from the official `9fans/plan9port` repository and compiled into a temporary runtime cache. The setup pins commit `b6564bd96ca189c69e28797738dad56f91eb5967`; its source and license remain with that cache. It is not part of the deployed static output.
