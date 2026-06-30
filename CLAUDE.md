# MLB Book — project conventions

A series of two-page editorial spreads, one per ballpark, for the **Blurb Large
Landscape Photo Book (13 × 11 in nominal)**. Every spread is built on a
**2550 × 1088 design canvas at 100 px/in** and exported at 3× =
**7650 × 3264 px (~300 DPI)**.

**Style/tone:** a premium baseball-architecture book — archival, precise,
information-dense, restrained, and visually rich. Avoid sports-poster graphics
and souvenir-collage energy.

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

## Design rules — every spread (AUTHORITATIVE)
These are always in force, alongside the geometry above. They are the rules that
get re-corrected most often, so treat them as hard constraints, not preferences.

1. **No fake book depth.** Never add binding shadow, gutter shadow, fold shadow,
   dark center gradient, simulated crease, page curl, or any "this is a physical
   book" effect. The fold is a flat hairline / clean division at x = 1275 only.
   No table surfaces, hands, device mockups, or surrounding environment either.
2. **No module crosses the gutter.** Beyond keeping content out of the gutter
   *zone*, every module/section must belong to exactly ONE page — nothing bridges
   the center split. Only quiet full-bleed art / texture / color fields may pass
   through. Stadium context may move to wherever it fits best, but stays whole
   and on one page.
3. **Data fidelity — never invent facts.** Use only the user-provided brief, CSV
   row, existing project data, or explicit instruction as factual sources. Do NOT
   invent, infer, normalize, supplement, or pull stadium facts from memory/web.
   If a value is empty / unknown / `n/a` / `null`, OMIT that visible field. Preserve
   populated values exactly (typography, line breaks, punctuation spacing, table
   alignment, and clearly requested condensation are the only allowed changes).
   Concept images are visual direction only — never copy text/numbers/labels from them.
4. **Team colors are restrained accents,** never a dominant palette unless the
   user explicitly asks. Prioritize clear hierarchy, readable type, and grid
   discipline over decorative complexity.
5. **Standard spread structure** (unless the user asks for a different type):
   left page = full-bleed stadium hero with a compact title/city block, photo
   stays dominant; right page = organized editorial/data page with a Stadium
   Section and a Visit Section. Common modules may include: metadata, supporting
   images, stadium facts, construction/lifecycle data, field dimensions, visit/featured
   game, weather, historical context, and site/setting. These modules may be
   arranged in any stadium-specific structure that keeps Stadium and Visit content distinct.
6. **Never caption photos.** Photo `<image-slot>` plates carry NO visible
   caption / figcaption / label of any kind — neither on hero nor editorial
   images. Photos read on their own. (The `placeholder` text inside an empty slot
   is fine — it is drop guidance, not a caption, and disappears once filled.)
   Diagram figures like the field plan keep their existing labels; this rule is
   about photographs only.
7. **Vary the page architecture.** The required Stadium Section and Visit Section
   are content zones, not a fixed visual template. Do not default to a top photo
   strip, horizontal fact ribbon, large prose block, and bottom visit box unless
   the stadium-specific concept truly calls for it. For each ballpark, derive the
   right-page architecture from the stadium's own form, site, era, materials, or
   field geometry: facade bays, rotunda arches, roof trusses, bowl geometry,
   scoreboard hierarchy, civic grid, transit/site-plan logic, masonry blocks,
   vertical columns, radial systems, or asymmetrical image/data placement. The
   spread should still be readable, print-safe, and data-complete, but the
   composition should not feel reusable by swapping only photos, colors, and names.
8. **Field-plan diagram labels — use the shared `field-labels.js` helper
   (`window.FieldLabels`).** Every field/protractor diagram loads
   `<script src="field-labels.js"></script>` (before the `design-canvas.jsx`
   babel script) and places its two reader-facing labels by rule, not by hand:
   - **Degree / bearing chip** sits OUTSIDE the arrowhead via
     `FieldLabels.bearingChip(C, tipRadius, deg, gapX, gapY)` → `{x, y}`.
     Horizontal: RIGHT if `sin(deg) ≥ 0` (eastern parks), else LEFT (mirrored,
     western). Vertical: UP if `cos(deg) ≥ 0` (deg ≤ 90 or ≥ 270), else DOWN.
     → NE up-right · SE down-right · SW down-left · NW up-left · deg==90 → up-right.
     `tipRadius` is the arrowhead radius (usually `PR + 16`); `gapX/gapY` are the
     offset to the chip CENTRE — ~`28/20` for a degree-only chip, ~`46/22` for a
     wider "ORIENT · NN°" chip; scale down on small figures. (A spread whose
     orientation is a deliberate fixed corner callout — e.g. Rogers, Tropicana —
     keeps that callout and does NOT use `bearingChip`.)
   - **Center-field chip** is centred ON the axis∩wall intersection via
     `FieldLabels.cfWallPoint(C, R, deg)` (= `polar(C, R, deg)`). Never push it
     outside the wall or hand-place it (except genuinely asymmetric hand-built
     plans like Fenway, which are exempt).
   - The figure's `<svg>` (or its CSS rule) MUST be `overflow: visible` so a
     chip that sits just outside the viewBox is not clipped — a vertical clip
     cannot be fixed by widening the container.
   - **Exempt diagram types** (do NOT force the helper on these): genuinely
     hand-placed asymmetric plans (Fenway); spreads whose orientation is a fixed
     corner callout (Rogers, Tropicana — but their CF still uses `cfWallPoint`);
     and the compact ~1 in orientation symbols (Cleveland, Tiger, Milwaukee
     County, Yankee, Yankee 2009) that render the degree as radial plain text and
     carry no bearing-relative CF chip. Dodger v2 is CSS-rotated, so its labels
     are hand-placed for its fixed 26° bearing rather than via the helper.

## Preflight checklist — RUN BEFORE EVERY DELIVERY (AUTHORITATIVE)
A spread is not done until all of these pass. Run them with `eval_js`/screenshots
on the live render and report each one explicitly (pass/fail + measured numbers).
Do not call a spread "preflighted" unless every item below was actually checked —
geometry alone is not a preflight.

1. **≥300 DPI on every photo.** For each `<image-slot>`, compute the source
   image's effective resolution at its *placed, cropped* size: the design canvas
   is 100 px/in and exports at 3×, so a slot W×H design-px needs a source of
   ≥3W × 3H native px (cover-crop math: divide native px by the slot's
   inches actually shown after the crop scale). Any photo under 300 DPI fails —
   list it with its native size, placed size, and computed DPI, and request a
   higher-res asset. Full-bleed heroes are the usual offenders (a 12.75×10.88 in
   bleed needs ~3825×3264).
2. **Type-size floors — general-population print legibility (AUTHORITATIVE).**
   Sweep every text-bearing element's *computed* `font-size` (design px = CSS px
   at 1:1; 100 design px = 1 in = 72 pt, so **1 design px = 0.72 pt**). Tiers:
   - **Hard floor: 12px (≈8.5 pt).** NOTHING readable in the book sits below this
     — every label, eyebrow, metadata line, date, coordinate, district tag,
     caption, badge, score line, body paragraph, and diagram data value ≥ 12px.
     Bump and reflow; widen badges or trim tracking rather than leaving sub-floor
     type. 12px is a FLOOR, not a target — text already larger stays as it is;
     never shrink larger type just to meet it.
   - **Body prose: ≥ 12px, set uniformly** (one size/tracking/leading across all
     paragraphs — see item 5). It may run larger (e.g. 14px) where the layout
     allows; do not force larger prose down to 12. (Tight bands fit 12px with
     ~1.38 leading and slightly negative tracking — cf. Dodger.)
   - **Diagram DATA labels: ≥ 12px.** Outfield distance numerals, the
     bearing/orientation chip, and any value a reader leans in to check are
     reader-facing data — they clear the 12px hard floor like any other data.
   - **Diagram instrument scale marks: ≥ 8.3px (6 pt).** Degree ticks
     (0/30/60/90), `N`, and other glance-not-read protractor/compass micro-marks
     may sit between 8.3px and the 12px floor to stay visually subordinate, but
     they no longer get a free pass below 6 pt — **measure them too**.
   The field figures (`.fd-svg` / `.cbp-fig` / `.pk-fig`, plus per-spread
   field/protractor components) generally have open space for full-size labels;
   **enlarge the figure or raise its internal font sizes** to meet these floors
   rather than leaving micro-type. The only thing still exempt is zero-text
   instrument hatching (sub-ticks with no glyphs). Internal SVG `font-size` is
   multiplied by the figure's internal scale (figure-design-px ÷ viewBox-units)
   to get rendered design px — check the rendered value, not the raw attribute.
3. **Nothing in the non-printable / bleed area** except intentional bleed
   photos/graphics. Run the `getBBox()`/`getBoundingClientRect()` sweep of every
   `<text>` and key mark against the per-page safe boxes AND the gutter zone;
   zero violations. The only allowed flags are quiet full-bleed art/color fields
   that are *meant* to run to the canvas edge / through the gutter.
4. **Drop cap formatting is correct & actually rendering.** Confirm the drop cap
   paints at the intended size, color, and line-span — `::first-letter { float }`
   is silently dropped inside `columns:*` containers, so use a real floated
   `.fw-dropcap` span and screenshot to verify it wraps as desired (not a plain
   first letter).
5. **Body prose is typographically uniform.** Stadium-context (and any
   multi-paragraph prose) must share one font-size, letter-spacing, and
   line-height across all paragraphs — sweep computed styles and confirm a single
   unique triple. (Justification is fine; uneven per-paragraph metrics are not.)

## Marking a spread "done" — ALWAYS update the Export PDFs page (AUTHORITATIVE)
A spread is not "done" until it has passed the full preflight checklist above AND
its cell on `Export PDFs.html` reflects it. Whenever we agree a spread is finished,
in the SAME turn flip its entry in the `spreads` array in `Export PDFs.html` from
`status: "pending"` to `status: "done"` (the progress counter and the green
done-styling derive from that field automatically). Never call a spread done
without making this edit. If a spread regresses (re-opened for fixes), flip it
back to `"pending"`.

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

> **Export-sheet note (UPDATED — now the authoritative export spec):**
> `print-page.jsx` prints each page at its TRUE NATIVE scale (100 design-px =
> 1 in, `SCALE = 96/100 = 0.96`) — **nothing is resized**. The design's nominal
> 12.5 × 10.625 in trim therefore maps exactly onto Blurb's trim. Every interior
> page PDF is exactly:
>   - **page 12.625 × 10.875 in = 909 × 783 pt**
>   - trim 12.5 × 10.625 in
>   - bleed 0.125 in on top / bottom / OUTSIDE edge only — **no bleed on the
>     binding edge** (the binding edge is mapped flush to the trim line)
>   - safe 0.25 in top/bottom/outside · 0.50 in binding edge
>
> This matches the Blurb **Large Landscape, Hardcover Dust Jacket (98 pp),
> interior page** spec. The earlier legacy harness stretched the design onto a
> 13 × 11 in trim / 13.25 × 11.25 in sheet — that scaling is **gone**; all
> spreads now re-export at the corrected size. Fonts are force-loaded and
> subset-embedded by the harness so PDFs pass Blurb upload without
> rasterization. If the page spec ever changes again, retune `TRIMW_IN`,
> `TRIMH_IN`, `BLEED_IN`, `PAGE_W/PAGE_H`, and the `@page size` together and
> re-export every spread in one pass.
