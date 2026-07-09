# Full-book photo DPI audit + asset-location map

Method: opened every page, measured each `<image-slot>`'s rendered slot size,
the shadow `<img>`'s true `naturalWidth/Height`, and its cover+zoom, then
computed placed DPI = min(100·natW/dispW, 100·natH/dispH). 300 = floor.

## A. UNDER 300 — file-based (need higher-res SOURCE files)
| Page | file | DPI |
|---|---|---|
| Citi Field | uploads/citi-field-01.jpg | 200 |
| Citi Field | uploads/citi-field-02.jpg | 200 |
| Citi Field | uploads/citi-field-03.jpg | 141 |
| Citi Field | uploads/citi-field-04.jpg | 200 |
| Citi Field | uploads/citi-field-05.jpg | 200 |
| Fenway (HERO) | images/fenway/hero-hd.jpg | 72 |
| Three Rivers (HERO) | images/three-rivers/hero-main.jpg | 85 |
| Front Cover opening | images/opening/op-r02.jpg | 102 |
| Closing | images/opening/op-l02-v3.jpg | 83 |
| Closing | images/opening/op-l04-v3.jpg | 80 |
| Closing | images/opening/op-l14-v3.jpg | 96 |
| Front Cover mosaic | images/cover/cv-sandiego.jpg | 72 |
| Front Cover mosaic | images/cover/cv-cleveland.jpg | 87 |
| Front Cover mosaic | images/cover/cv-angels.jpg | 92 |
| Front Cover mosaic | images/cover/cv-threerivers.jpg | 115 |
| Front Cover mosaic | images/cover/cv-tiger.jpg | 130 |
| Front Cover mosaic | images/cover/cv-fenway.jpg | 173 |

## B. UNDER 300 — embedded data-URI drops (no file; re-drop a higher-res image)
Stored as base64 inside `.image-slots-*.state.json`, not as files.
| Page | slot | native px | DPI |
|---|---|---|---|
| Marlins (HERO) | marlins-hero | 1200×796 | 73 |
| Marlins | marlins-s1 | 738×415 | 200 |
| Marlins | marlins-s2 | 738×554 | 169 |
| Marlins | marlins-s3 | 1024×576 | 278 |
| San Diego | sd-p1 | — | 117 |
| San Diego | sd-p2 | — | 177 |
| San Diego | sd-p3 | — | 138 |

## C. Preview-cache artifacts — files on disk are OK (≥300), will export fine
Same-filename overwrites this session; live preview still shows old cached bitmap.
Verified via image_metadata:
- Mile High hero — file 4414×3264 = 300
- Milwaukee County hero — file 6997×4694 = 431
- Oracle hero — file 4243×3264 = 300
- Tiger hero — file 4352×3264 = 300

## D. Empty / unfilled slots (no image dropped — content gap, not DPI)
- New Comiskey: nc-hero, nc-canopy, nc-night, nc-night2 (all empty)
- Book Intro: jc-m04, m07, m09, m10, m11, m12, m13, g1, g5 (no image loaded)

## E. Exactly ~300 — pass but ZERO margin (don't crop tighter)
Coors hero, PNC hero, Petco hero, Veterans hero, Yankee hero, SunTrust hero,
San Diego hero, Mile High, Oracle, Tiger, bp-dodger-aerial(301).
Slim margin: Wrigley 302, Yankee2009 303, Camden 306, Globe 308.

Everything else measured ≥ ~315 and passes cleanly.

## Asset-location map (for consolidation)
Artwork currently lives in FOUR different places:
1. **uploads/** — most stadium spreads (heroes + numbered editorial photos).
   ~250 MB (already compressed this session).
2. **images/** — 8 spreads + cover/opening. ~124 MB, NOT yet compressed:
   - images/fenway, images/gabp, images/globe, images/rogers,
     images/suntrust, images/target, images/three-rivers, images/yankee2009
   - images/cover  (Front Cover mosaic tiles cv-*.jpg)
   - images/opening (op-l* used by Closing, op-r* used by Front Cover)
2b. Some images/ files load via each spread's own `SRC = {}` map, not `uploads/`.
3. **assets/** — Safeco spread (safeco-*.jpg, ~19 MB), Dodger hero
   (dodger-stadium-hero.jpg), team/league logos. ~23 MB raster.
4. **Inline base64 data-URIs** inside `.image-slots-*.state.json` — user-dropped
   images embedded, not stored as files: San Diego photos, Marlins photos,
   Book Intro mosaic, "The Ballpark and the City" diagrams, Road Trips thumbnails.

### Consolidation suggestion
Move everything to a single **/images/<spread>/** convention (or keep /uploads
as the single root), update each spread's src/SRC-map, and extract the inline
data-URI drops to real files so they can be compressed and reviewed like the
rest. The data-URI ones are the hardest to audit/maintain and are where several
low-DPI failures hide (Marlins, San Diego).
