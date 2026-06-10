# MLB Book — project conventions

A series of two-page editorial spreads, one per ballpark, for the **Blurb Large
Landscape Photo Book (13 × 11 in nominal)**. Every spread is built on a
**2550 × 1088 design canvas at 100 px/in** and exported at 3× =
**7650 × 3264 px (~300 DPI)**.

## Canvas geometry & safe areas — AUTHORITATIVE (1 in = 100 px)
These are the official production dimensions. Obey them on every spread.

| Spec | inches | canvas px |
|---|---|---|
| Full two-page spread **with bleed** (= the canvas) | 25.50 × 10.88 | 2550 × 1088 |
| Single page **with bleed** (outer edge → fold) | 12.75 × 10.88 | 1275 × 1088 |
| Trimmed page | 12.50 × 10.63 | 1250 × 1063 |
| Center split / fold | x = 12.75 | **x = 1275** |
| Outer bleed (all four edges, bleed-only) | 0.125 | 12.5 |
| Safe inset (critical content ≥ this far inside trim) | 0.25 | 25 |

**Trim rectangles (px):**
- Left page trim:  x ∈ [12.5, 1262.5], y ∈ [12.5, 1075.5]
- Right page trim: x ∈ [1287.5, 2537.5], y ∈ [12.5, 1075.5]

**No-critical-content gutter zone:** x ∈ [1237.5, 1312.5] px (12.375–13.125 in),
straddling the fold. Nothing readable — text, key labels, logos, score lines,
faces, important image subjects — may cross or sit inside it. Only full-bleed
art / color fields / quiet grid continuation may pass through.

**Safe boxes for critical content (0.25 in inside trim):**
- Left page:  x ∈ [37.5, 1237.5], y ∈ [37.5, 1050.5]
- Right page: x ∈ [1312.5, 2512.5], y ∈ [37.5, 1050.5]
  (Left-safe right edge and right-safe left edge coincide with the gutter
  bounds, so respecting the safe box automatically clears the gutter.)

**Rules of thumb**
- Extend full-bleed art, photos, backgrounds, maps, and color fields all the way
  to the canvas edge (0 / 2550 / 1088).
- Treat the outer 0.125 in (12.5 px) as bleed-only — decorative only, never
  load-bearing.
- Keep ALL critical text, labels, logos, data, score lines, captions, and
  important image details ≥ 0.25 in (25 px) inside the final trim, i.e. within
  the safe boxes above, and out of the gutter zone.
- Verify before delivery: an `eval_js` sweep of `getBBox()` on every `<text>`
  (and key marks) against the safe boxes should return zero violations. Glyph
  bounds — not the baseline — are what get trimmed, so a tall display face can
  poke into the bleed even when the baseline looks fine.

Hero spreads put a dark photo on the left page and warm paper on the right; the
stadium-timeline interstitial is a data spread and uses warm paper across BOTH
pages. Either way the geometry above is identical.

## Per-spread file pattern
Each ballpark is a cluster of files: `<name>-data.js`, `<name>-spread.jsx` (or
`-editorial.jsx`), usually a diagram component (`-protractor.jsx` / `-field.jsx` /
`circle-diagram.jsx`), and `<name>-app.jsx`, all loaded by `<Name> Spread.html`.
Photos are user-filled via `<image-slot>` and persist in
`.image-slots.state.json`.

## REQUIRED: every spread must support vector PDF export
The press-ready PDF path is non-negotiable — wire it into EVERY new spread.

1. The HTML must load `print-page.jsx` **before** the spread component script,
   after the diagram script. e.g.:
   ```html
   <script type="text/babel" src="design-canvas.jsx"></script>
   <script type="text/babel" src="<name>-diagram.jsx"></script>
   <script type="text/babel" src="print-page.jsx"></script>
   <script type="text/babel" src="<name>-spread.jsx"></script>
   <script type="text/babel" src="<name>-app.jsx"></script>
   ```

2. The `<name>-app.jsx` must branch on `?print=1` BEFORE rendering the design
   canvas, using the spread's own left (dark hero) and right (paper) page
   background colors so the spine bleed fills correctly:
   ```js
   const Spread = window.<Name>Spread;

   // ?print=1&page=left|right[&guides=1] → single press-ready page for vector PDF export.
   const params = new URLSearchParams(location.search);
   if (params.get("print")) {
     document.body.classList.add("pp-mode");
     window.PrintPageInit();
     const side = params.get("page") === "left" ? "left" : "right";
     const bg = side === "left" ? "#<LEFT_HERO_BG>" : "#<RIGHT_PAPER_BG>";
     ReactDOM.createRoot(document.getElementById("root")).render(
       window.PrintPage({ Spread: Spread, side: side, bg: bg, guides: params.get("guides") === "1" })
     );
     return;
   }
   ```

## How the user exports a PDF
For each spread, open it twice and Save as PDF (Chrome, Cmd/Ctrl+P) — gives a
true VECTOR PDF (type, rules, diagrams stay vector; only photos rasterize):
- left page:  `<Name> Spread.html?print=1&page=left`
- right page: `<Name> Spread.html?print=1&page=right`
- add `&guides=1` to preview trim / bleed / safe-area guides on screen (guides
  auto-hide when printing).

Two single-page PDFs per spread (correct for perfect-bound book). The artboard
⋯ → "Download PNG" is raster — do NOT use it for press.

> **Export-sheet note / open production item (DECIDED: leave as-is):**
> `print-page.jsx` scales each page so the design half maps to a
> **13 × 11 in trim on a 13.25 × 11.25 in sheet** (nominal product size), NOT
> the 12.50 × 10.63 in official trim above. This is a known, accepted mismatch:
> the **on-canvas design must follow the official Blurb-safe specs / safe boxes
> above** (that is what governs every spread), while the PDF page size/scale
> intentionally stays on the legacy 13 × 11 sheet so all already-exported
> spreads remain consistent. **Do NOT retune the harness** mid-design. If a
> press ever needs the exact 12.75 × 10.88 in page-with-bleed sheet, do it as a
> separate export-normalization pass that re-exports every spread together
> (retune `TRIMW_IN`, `TRIMH_IN`, `@page size`).

`Field Plan Studies.html` is an exploration page (ten study cards), NOT a bound
spread, so it intentionally has no print path.
