# Image consolidation into /images — status

## DONE (verified rendering from /images)
- **uploads/ photos → images/&lt;slug&gt;/** : 119 files into 26 per-spread folders; 32 source files rewired.
- **assets/ photos → images/** : Safeco (6) → images/safeco/, Dodger hero → images/dodger/.
- **Inline data-URI drops extracted to files (61 of 116 total drops):**
  - San Diego (3) → images/san-diego/*.webp
  - Marlins (4) → images/marlins/*.webp
  - Road Trips (34) → images/road-trips/*.webp  (helper derives src by id)
  - Book Intro (20) → images/book-intro/*.webp  (helper derives src by id)

## REMAINING: 55 inline drops across 10 pages (resumable)
Manifest: scraps/_dropsAll.json  (each {file, id, ext, bytes}); grouped in scraps/_dropsBySlug.json.
Method per drop: decode base64 "u" from .image-slots-&lt;id&gt;.state.json → save images/&lt;slug&gt;/&lt;id&gt;.&lt;ext&gt;
→ ensure slot has src to that file → strip "u" (keep {s,x,y}). Ordering is safe: wiring src
while "u" still present changes nothing (drop wins until "u" removed).

Pure-drop spreads (Slot helper, no existing file src — blanket helper derive works like road-trips):
- comerica (5, webp)  — helper line ~15
- coors (6, webp)
- citizens (7, webp)  — cbp-*
- dodger (7, webp)    — dodger-v2-*  (helper already has src: props.src; use src||derive)
- pnc (6, jpg)

Mixed / needs per-slot care (hero or some slots already have a file src + a drop on top):
- oracle (5): oracle-hero jpg drop over images/oracle/ file src; oracle-p1..4 webp drops
- citi (5): citi-p1..5 webp drops over images/citi/citi-field-0X.jpg file src (moved earlier)
- riverfront (4): rf-hero jpg + rf-p* mixed
- gabp (1): gabp-hero webp drop over images/gabp/hero-main.jpg file src
- ballpark-city (9, jpg): bp-* diagrams; wiring in ballpark-city-spread1/2.jsx (not a simple Slot helper — inspect)

Note: for slots that ALREADY have a file src, the drop currently overrides it, so extracting
the DROP (not the old file) preserves what's visible. Either overwrite the file at the existing
src path with the extracted drop, or point src at the new extracted file.

## Also outstanding (non-blocking)
- uploads/ now holds ~90 unreferenced orphans (old hero versions + superseded editorials) + 3 draw-*.png. Safe to delete per ref scan.
- Shared logos remain in assets/ (mlb-logo referenced by 40 spreads etc.) — intentionally left (brand assets, not artwork).
- scraps/ has working files (_dropsAll.json etc.) — keep until consolidation finished, then delete scraps/st2, _drops*, _manifest, _refmap, _statefiles.
