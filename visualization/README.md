# Visualization Helpers

This folder is for local-only overview pages that help review book progress.

The generated book spreads and print layouts remain in the repository root.
`index.html` uses local thumbnails in `assets/cover-ready/` and
`assets/page-thumbnails/` for QA only. It may link to root spread pages and source
CSV data, but root book files should not reference these visualization assets.

Stadium thumbnail source files do not need to share a fixed crop size. When
adding or replacing them, resize as needed for reasonable file size but preserve
the original aspect ratio.
