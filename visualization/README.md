# Visualization Helpers

This folder is for local-only overview pages that help review book progress.

The generated book spreads and print layouts remain in the repository root.
`index.html` uses local thumbnails in `assets/cover-ready/` and
`assets/page-thumbnails/` for QA only. The page thumbnails should be generated
from the rendered HTML pages, not filled with source photos. Run:

```sh
/Users/markvahrenwald/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node visualization/render-page-thumbnails.js
```

Pass a filter to regenerate one item, for example:

```sh
/Users/markvahrenwald/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node visualization/render-page-thumbnails.js fenway
```

The renderer opens each HTML file in Chrome, screenshots the `2550x1088` spread
or `1275x1088` single-page artboard, and writes a downsized JPEG into
`assets/page-thumbnails/`. These visualization assets are local QA helpers; root
book files should not reference them.
