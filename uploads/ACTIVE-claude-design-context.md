# Active Claude Design Context

Use this file as the authoritative project context for the MLB ballpark book. It supersedes older v1/v2 prompt files and any generated concept text that conflicts with it.

## Project

Create finished, print-ready editorial spreads for an MLB stadium anthology printed as a Blurb Large Landscape Photo Book.

Style: premium baseball architecture book; archival, precise, information-dense, restrained, and visually rich. Avoid sports-poster graphics, souvenir collage, fake book mockups, binding shadows, page curls, table surfaces, hands, or surrounding environment.

## Production Geometry

- Full two-page spread with bleed: 25.50 x 10.88 in.
- Working canvas: 2550 x 1088 px at 100 px/in.
- Export target: 7650 x 3264 px at about 300 DPI.
- Single page with bleed: 12.75 x 10.88 in.
- Trimmed page: 12.50 x 10.63 in.
- Center split: x = 12.75 in / 1275 px.
- Outer bleed-only margin: 0.125 in / 12.5 px.
- Critical safe inset inside trim: 0.25 in / 25 px.

Safe boxes for critical content:

- Left page: x = 37.5 to 1237.5 px; y = 37.5 to 1050.5 px.
- Right page: x = 1312.5 to 2512.5 px; y = 37.5 to 1050.5 px.

No-critical-content gutter zone:

- Inches: x = 12.375 to 13.125.
- Pixels: x = 1237.5 to 1312.5.
- No readable text, labels, data, score lines, headings, logos, faces, important photo subjects, or key diagram marks may sit in this zone.
- Only quiet background, texture, nonessential image continuation, color fields, or abstract decoration may cross it.

## Data Rules

- Use only the user-provided stadium brief, CSV row, existing project data, or explicit user instruction as factual sources.
- Do not invent, infer, normalize, supplement, or add visible stadium facts from memory or web knowledge.
- If a value is empty, unknown, not applicable, `n/a`, `null`, or similar, omit that visible field.
- Preserve populated values exactly except for typography, line breaks, punctuation spacing, table alignment, and clearly requested condensation.
- Treat generated concept images as visual direction only. Do not copy incorrect text, fake numbers, fake labels, or hallucinated details from concept images.

## Standard Stadium Spread Structure

Use this structure unless the user explicitly asks for a different type of spread:

- Left page: full-bleed stadium hero image with compact title/city block; the photo remains dominant.
- Right page: organized editorial/data page with Stadium Section and Visit Section.
- Common modules: metadata ribbon, supporting image strip, stadium facts, construction/timeline, field dimensions/gameplay, visit/featured game, weather, historical context, and site/setting.
- Each module must belong clearly to one page. Do not bridge modules across the gutter.
- Stadium context may move where it fits best, but it must remain readable and out of the gutter.

## Visual Rules

- Extend full-bleed art, photos, backgrounds, maps, and color fields to the canvas edge.
- Keep all critical content out of the bleed-only margin and gutter zone.
- Use a flat hairline or clean page division at the center only.
- Do not add binding shadow, gutter shadow, fold shadow, dark center gradient, simulated crease, or fake book depth.
- Use team colors as restrained accents, not a dominant palette unless the user asks.
- Prioritize clear hierarchy, readable type, strong grid discipline, and print-safe spacing over decorative complexity.

## Export Rules

Every finished bound spread must support vector PDF export:

- The HTML loads `print-page.jsx` before the spread component script.
- The app file supports `?print=1&page=left|right`.
- Optional `&guides=1` previews trim, bleed, and safe-area guides.
- `Field Plan Studies.html` is exploratory and does not need this print path.

Known export note: the current `print-page.jsx` PDF harness uses a legacy 13 x 11 trim on a 13.25 x 11.25 sheet. Leave that harness as-is unless the user asks for a separate full re-export normalization pass. The on-canvas design must still follow the official Blurb-safe geometry above.

## Stale Context

Older v1/v2 prompt files are historical only. If they conflict with this file, the current Claude snapshot `CLAUDE.md`, or `template prompt v3`, ignore the older file.
