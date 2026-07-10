# Full-book photo DPI audit — CORRECTED (2026-07-10)

## Method (AUTHORITATIVE — read before trusting any DPI number here)
DPI must be computed from each photo's **true on-disk dimensions**
(`image_metadata` on the `/images` file) combined with its **rendered slot size**
(`clientWidth`/`clientHeight` from a live page — immune to the proxy since it's a
layout value). DPI = 100 / ( max(slotW/srcW, slotH/srcH) × zoom ).

Two traps that produced WRONG numbers earlier — do not repeat:
1. **The preview downscaling proxy** rewrites image bytes. BOTH the DOM's
   `<img>.naturalWidth` AND `readImage()` inside run_script get the downscaled
   copy (e.g. `hero-hd.jpg` 4742×3264 came back as 1138×783; county
   6997×4694 as 420×282). Any DPI derived from those reads is a false failure.
   ONLY `image_metadata` reads real file bytes.
2. **Slot size** — `opening-frames.json` stores a ~2× retina buffer (e.g. 578),
   NOT the print size. The delivered pages render these tiles at ~289–291 px
   (2.9 in). Using 578 halved the DPI and produced false "falls short" calls on
   the cover/closing tiles. Use the measured `clientWidth` (~290), not 578.

Placed DPI = 100 · (source px along the tighter cover axis) ÷ (slot inches).
Design canvas is 100 px/in and exports at 3×, so a slot needs ≥3× its design-px
size in source pixels to clear 300 DPI. Floor = 300.

## Upload provenance (answered)
Every flagged low-res photo is a **file in `/images` referenced by `src`** — none
are user "uploads" (inline data-URI drops). Confirmed: their per-id sidecars
(`.image-slots-<id>.state.json`) are framing-only (no `u`). The low resolution is
baked into the source file; replacing the file fixes it.

## A. GENUINELY LOW-RES — REMAINING
NONE. Every filled photo in the book now computes ≥300 DPI at its placed,
cropped size (verified via `image_metadata` true on-disk dims + rendered slot
size — see method note in section E). The last four (below) were resolved this
session by the user's uploads:
| Page | slot | new file | on-disk px | slot px | ~DPI |
|---|---|---|---|---|---|
| Front/back cover panel | op-r02 | images/opening/op-r02.jpg (Petco) | 1458×941 | 291×221 | ~321 |
| Closing (mosaic) | op-l02 | images/opening/op-l02-v4.jpg (Citi) | 1200×800 | 289×216 | ~345 |
| Closing (mosaic) | op-l04 | images/opening/op-l04-v4.jpg (Safeco) | 1080×910 | 289×216 | ~336 |
| Closing (mosaic) | op-l14 | images/opening/op-l14-v4.jpg (Yankee) | 1567×1033 | 289×216 | ~402 |

Two cover mosaic tiles sit right on the line and are worth knowing about (still
pass): cv-sandiego 998×665 → ~301, cv-angels 1508×852 @ zoom 1.28 → ~300.

## B. FALSE ALARMS — files on disk are fine (≥300); earlier readings were the
## preview proxy downscaling, not the real asset
| Page | slot | file | on-disk px | ~DPI |
|---|---|---|---|---|
| Fenway (HERO) | fenway-hero | images/fenway/hero-hd.jpg | 4742×3264 | 300 |
| Tiger (HERO) | ts-hero | images/tiger/tiger-stadium-00-main-31a229d7.jpg | 4352×3264 | 300 |
| Milwaukee County (HERO) | mcs-hero | images/county/county-stadium-00-main-2ee57177.jpg | 6997×4694 | 431 |
| Oracle (HERO) | oracle-hero | images/oracle/oracle-park-00-main-848832b8.jpg | 4243×3264 | 300 |
| Mile High (HERO) | milehigh-hero | images/milehigh/mile-high-stadium-00-main-93e6537b.jpg | 4414×3264 | 300 |
| Three Rivers (HERO) | trs-hero | images/three-rivers/hero-main.jpg | 5000×3859 | 354 |
| San Diego (HERO) | sandiego-hero | images/san-diego/jack-murphy-stadium-00-main-c39a25c4.jpg | 4500×3264 | 300 |
| Front Cover mosaic | cv-sandiego | images/cover/cv-sandiego.jpg | 998×665 | 301 |
| Front Cover mosaic | cv-cleveland | images/cover/cv-cleveland.jpg | 1059×850 | 364 |
| Front Cover mosaic | cv-angels | images/cover/cv-angels.jpg | 1508×852 | 386 |
| Front Cover mosaic | cv-threerivers | images/cover/cv-threerivers.jpg | 1600×1061 | 481 |
| Front Cover mosaic | cv-tiger | images/cover/cv-tiger.jpg | 1594×1199 | 543 |
| Front Cover mosaic | cv-fenway | images/cover/cv-fenway.jpg | 2395×1597 | 723 |

Also now PASSING (were listed low in the previous audit, since migrated/upgraded):
- **Citi Field** — citi-hero + citi-p1..p5 all ≥300 (measured 317–1203) after
  migration to `images/citi/`.

The old cover-mosaic "under 300" list (cv-* at 72–173) is **stale** — those tiles
were upgraded; every `cv-*.jpg` now clears 300 at the 291×221 tile size.

## C. Embedded-blob cleanup + fixes done this session
Two legacy shared sidecars still held base64 photo drops that duplicated (and were
superseded by) real `/images` files + per-id framing sidecars:
- `.image-slots.state.json` — `pnc-hero`, `pnc-p1..p5`, `jc-g1..g4`  → **deleted**
- `.image-slots-dodger.state.json` — `dodger-v2-s2`  → **deleted**

Verified after deletion: PNC (`images/pnc/*.jpg`, hero 4896×3264), Dodger
(`images/dodger/*`, incl. `dodger-v2-s2.webp`), and Book Intro
(`images/book-intro/jc-g*.webp`) all render from files with **no data-URLs
remaining**. The whole book is now file-referenced; no inline photo drops left.

**Riverfront hero RESOLVED:** user supplied a 4368×3264 replacement; placed at
`images/riverfront/riverfront-00-main-hd.jpg` and `rf-hero` `src` rewired to it
(~300 DPI at the full-bleed). (Preview may still show the old downscaled proxy
copy; on-disk file + print export are full-res.)

## E. Full 312-slot sweep result (this session)
Collected slot src + rendered size + zoom from all 49 pages (312 filled slots);
computed DPI with true `image_metadata` dims. Result: **0 slots under 300** after
the four uploads above. Heroes (all 4000–7000 px files), every editorial strip,
the 28-tile cover mosaic, and the road-trip thumbnails all clear 300 at their
placed sizes. No embedded data-URL photos remain anywhere (all file-referenced).

## D. Text / layout sweep
Clean across all 48 spreads + interstitials + appendix + cover: no text off-page,
no gutter intrusions, no bleed-edge violations, nothing cut off. Only cosmetic
line-box leading on a few 14px labels (line-height 14.7px, `overflow:hidden`
trims empty leading, not glyph ink) — not visible, no action.
