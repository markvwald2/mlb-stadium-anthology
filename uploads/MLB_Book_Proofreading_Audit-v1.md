# MLB Stadium Anthology — Proofreading and Production Audit

Status: working audit; live-render sweep completed for all 51 entries in `visualization/book-order.json`.

## Audit conventions

- Severity: Critical / Major / Minor / Polish
- Certainty: Definite Error / Probable Error / Verify Manually
- Confidence: High / Medium / Low
- Geometry measurements use the authoritative 2550 × 1088 design canvas and safe boxes in `AGENTS.md`.
- Historical facts are not silently normalized. When the project lacks a supplied master ledger, the issue is marked Verify Manually unless an authoritative source settles it.

## Book-wide and production-control issues

### Print / production

1. **Critical · Definite Error · High confidence — completion records conflict.** `Export PDFs.html` marks every entry `done`, while `PRODUCTION-STATUS.md` says most layouts remain pending after the export-size reset. A green export sheet therefore cannot be treated as evidence of completed preflight. Reconcile the two records and mark a spread done only after the five required checks pass.
2. **Major · Definite Error · High confidence — automated type preflight uses the wrong floor.** `preflight.js` sets `MIN_FONT = 10`; the authoritative floor is 12 px, with only instrument scale marks permitted down to 8.3 px. The script can issue false passes. Raise the general floor to 12 and classify instrument marks separately.
3. **Major · Definite Error · High confidence — product/page-count metadata conflicts.** `print-page.jsx` describes “Hardcover, Dust Jacket (98pp),” while the authoritative instructions specify Hardcover ImageWrap (96 pp). Confirm the purchased Blurb product and final page count, then make all comments, export copy, and manifests agree.
4. **Major · Definite Error · High confidence — export sheet order does not match the book-order manifest.** `Export PDFs.html` starts with Rogers Centre, Globe Life Field, Yankee Stadium 2009, and Fenway Park; `visualization/book-order.json` starts the stadium sequence with Anaheim, Dodger, Yankee 1923, and San Diego. Use one final pagination manifest before export and assembly.
5. **Major · Verify Manually · High confidence — required source-of-truth documents are absent as discrete files.** No Stadium Master Registry, Visit and Game Ledger, Stadium Naming Timelines, Book Style Sheet, Design System Reference, or Open Issues Ledger was found under those roles. Existing per-stadium files provide partial substitutes, but unresolved conflicts cannot be adjudicated safely without a master ledger.

## Cover Wrap

### Naming and consistency

1. **Minor · Verify Manually · Medium confidence — shortened stadium names lack an explicit cover rule.** The cover uses “County Stadium” while the stadium spread and book order use “Milwaukee County Stadium.” It also uses other deliberately compact labels. Add a style-sheet rule stating that cover-grid labels may use approved shorthand, or expand them.

### Visual / production

1. **Minor · Probable Error · Medium confidence — stadium captions are exceptionally small at final reading size.** They technically cleared the 12 px computed sweep, but the thumbnail shows low visual prominence and tight reading conditions. Inspect the printed proof at final size.

## Book Introduction

### Typography

1. **Major · Definite Error · High confidence — twelve text blocks violate the 12 px hard floor.** All six era descriptions are 10.5 px and all six stadium-list paragraphs are 11 px. Increase both styles to at least 12 px and reflow the bottom band.

### Editorial consistency

1. **Minor · Verify Manually · Medium confidence — shorthand names appear without a stated rule.** Examples include “Jack Murphy,” “Shea,” and “The Vet,” while most entries use formal stadium names. Standardize or document that this introductory taxonomy intentionally uses familiar shorthand.

## Road Trips Overview

### Historical / cross-layout

1. **Major · Definite Error · High confidence — Cleveland is labeled “Cleveland Stadium.”** The corresponding stadium page and book order use “Cleveland Municipal Stadium.” If historical shorthand is permitted, document it; otherwise use the formal name.
2. **Major · Verify Manually · High confidence — Camden chronology is incomplete without the makeup-game relationship.** The overview records the May 5, 2019 rainout; the Camden spread features the July 13 makeup game. Add “made up July 13” or otherwise state whether the makeup was attended.

### Print / production

1. **Major · Definite Error · High confidence — four right-page text elements extend beyond the safe boundary.** The date-span/statistics module reaches x=2526; the safe maximum is x=2512.5. Move the module at least 14 px left.

## Anaheim Stadium

### Print / production

1. **Major · Definite Error · High confidence — at least sixteen readable elements exceed the right-page safe boundary.** Affected material includes the league header, Field Plan, name history, predecessor note, improvement labels, context prose, and visit tab. The recurring right edge is approximately x=2514; move the right column left enough to clear x=2512.5 with rounding tolerance.

## Dodger Stadium

### Print / production

1. **Major · Definite Error · High confidence — Field Plan and context prose exceed the right safe boundary.** Their right edge is approximately x=2514. Reflow or shift them left.

## Yankee Stadium (1923)

### Print / production

1. **Major · Definite Error · High confidence — at least twelve elements exceed the right safe boundary.** The lifecycle module, surface data, timeline marks, field value, and context prose reach x=2524. Shift/reflow the full rightmost column.

## San Diego Stadium

### Print / production

1. **Major · Definite Error · High confidence — six elements exceed the right safe boundary.** The era block, lifecycle line, context paragraphs, and lower label reach x=2520. Move the right column left.

## Wrigley Field

### Print / production

1. **Major · Definite Error · High confidence — eight elements exceed the right safe boundary.** Historical Context prose and financing material reach x=2526. Reflow the right column.

## Milwaukee County Stadium

### Image quality

1. **Critical · Definite Error · High confidence — hero photo is approximately 26 effective DPI.** Source: 420 × 282 px; placed area: 1275 × 1088 design px. Required full-bleed source is approximately 3825 × 3264 px. Replace with a materially higher-resolution image.

### Typography

1. **Minor · Definite Error · High confidence — diagram scale labels “90” and “180” are 10 px.** These may qualify as instrument marks and therefore clear the special 8.3 px floor, but they do not clear the 12 px reader-data floor. Confirm classification; enlarge to 12 px if readers use them as orientation data.

### Cross-layout data

1. **Major · Probable Error · High confidence — timeline visit year conflicts with the appendix.** `timeline-data.js` marks the Braves-era County Stadium visit as 1953, while `ballparks-data.js` gives first visit 1955. Reconcile against the family visit ledger.

## Riverfront Stadium

### Print / production

1. **Major · Definite Error · High confidence — seven right-column elements exceed the safe boundary.** Era, section heading, and context prose reach x=2518.

## Tiger Stadium

### Image quality

1. **Critical · Definite Error · High confidence — hero photo is approximately 72 effective DPI.** Source: 1044 × 783 px; placed full left page. Replace with a source near 3825 × 3264 px or better.

### Gutter safety

1. **Critical · Definite Error · High confidence — “Trumbull Avenue” enters the no-critical-content gutter.** Measured box x=1221–1241; left safe maximum is x=1237.5. Move it left so the complete glyph bounds clear the gutter.

### Typography

1. **Minor · Definite Error · High confidence — “RF OVERHANG” is 11 px.** It is reader-facing diagram data and must be at least 12 px.

## Royals Stadium

### Print / production

1. **Major · Definite Error · High confidence — three elements exceed the right safe boundary.** The final context paragraph and status block reach x=2519.

## Cleveland Municipal Stadium

### Naming / cross-layout

1. **Major · Definite Error · High confidence — appendices use “Cleveland Stadium.”** The page title and principal data use “Cleveland Municipal Stadium.” Adopt one formal name or define the shorthand rule.

### Print / production

1. **Major · Definite Error · High confidence — five field/footer elements reach x=2526.** Move the rightmost field-dimension and footer material left.

## Three Rivers Stadium

### Image quality

1. **Critical · Definite Error · High confidence — hero photo is approximately 85 effective DPI.** Source: 1200 × 926 px; placed full left page. Replace with a print-resolution source.

### Print / production

1. **Major · Definite Error · High confidence — at least fifteen game-panel elements exceed the right safe boundary.** The featured-visit bar, score columns, time, wind, and humidity values reach x=2522–2524.

## Veterans Stadium

### Print / production

1. **Major · Definite Error · High confidence — at least twelve elements exceed the right safe boundary.** The lineage module and context prose reach x=2524.

## Shea Stadium

### Print / production

1. **Major · Definite Error · High confidence — at least six elements exceed the right safe boundary.** The page eyebrow, capacity block, and related right-edge material reach x=2524.

## Memorial Stadium

### Print / production

1. **Major · Definite Error · High confidence — at least fourteen elements exceed the right safe boundary.** The top descriptor and context module reach x=2524.

## Mile High Stadium

### Image quality

1. **Critical · Definite Error · High confidence — hero photo is approximately 72 effective DPI.** Source: 1059 × 783 px; placed full left page. Replace with a print-resolution source.

### Print / production

1. **Major · Definite Error · High confidence — six elements exceed the right safe boundary.** Era and financing modules reach x=2518.

## Coors Field

### Print / production

1. **Major · Definite Error · High confidence — three context blocks exceed the right safe boundary.** Their right edge is approximately x=2518.

## New Comiskey Park

### Print / production

1. **Major · Definite Error · High confidence — at least twelve visit-panel elements exceed the right safe boundary.** Date, matchup, time, and adjacent data reach x=2526.

## Safeco Field

### Print / production

1. **Major · Definite Error · High confidence — at least fourteen elements exceed the right safe boundary.** Capacity, era heading, and related modules reach x=2515–2527.

## Petco Park

### Gutter safety

1. **Critical · Definite Error · High confidence — “VISIT / NO. 23” enters the gutter.** Measured box x=1171–1239; the left safe maximum is x=1237.5. Move the complete badge at least 2 px left, preferably with additional production tolerance.

## The Ballpark and the City — Spread 1

### Print / production

1. **Major · Definite Error · High confidence — seven right-edge elements exceed the safe boundary.** The Baker Bowl module and other rightmost text reach x=2519.

## The Ballpark and the City — Spread 2

### Print / production

1. **Major · Definite Error · High confidence — final prose block exceeds the right safe boundary.** It reaches x=2519.

## Great American Ball Park

### Naming

1. **Major · Definite Error · High confidence — formal spacing must remain “Ball Park.”** The principal page is correct; retain this spelling in every appendix and reference.

### Print / production

1. **Major · Definite Error · High confidence — six right-edge elements exceed the safe boundary.** Cost and context modules reach x=2526.

## PNC Park

### Print / production

1. **Major · Definite Error · High confidence — at least ten context elements exceed the right safe boundary.** Several prose blocks reach x=2524.

## Fenway Park

### Image quality

1. **Critical · Definite Error · High confidence — hero photo is approximately 72 effective DPI.** Source: 1138 × 783 px; placed full left page. Replace with a print-resolution source.

### Print / production

1. **Major · Definite Error · High confidence — lower visit-number elements reach x=2526.** Move the badge left.

## Tropicana Field

### Print / production

1. **Major · Definite Error · High confidence — at least ten right-edge elements exceed the safe boundary.** Header and plant/structure values reach x=2524.

## SunTrust Park

### Naming

1. **Major · Definite Error · High confidence — All Trip Games calls it “SunTrust Stadium.”** The official name on the May 28, 2018 visit date was SunTrust Park. Correct the appendix. Contemporary MLB references consistently use SunTrust Park; it became Truist Park in 2020.

### Typography

1. **Minor · Definite Error · High confidence — eight protractor scale labels are 10 px.** They clear the 8.3 px instrument minimum but should be checked for consistent scale-mark treatment.

## Nationals Park

### Print / production

1. **Major · Definite Error · High confidence — six right-edge elements exceed the safe boundary.** Identity, pitching, and financing material reach x=2524.

## Citi Field

### Print / production

1. **Major · Definite Error · High confidence — three context elements exceed the right safe boundary.** They reach x=2524.

## Yankee Stadium (2009)

### Print / production

1. **Major · Definite Error · High confidence — retired-number line exceeds the right safe boundary.** It reaches x=2524.

### Content

1. **Minor · Verify Manually · Medium confidence — retired-number line visibly repeats 8 and 42.** This may be historically correct because multiple honorees share numbers, but without names the repetition can look like a typesetting error. Consider adding names or a note.

## Oriole Park at Camden Yards

### Historical / cross-layout

1. **Major · Verify Manually · High confidence — explain the rainout/makeup chronology.** The appendix lists the May 5 rainout; this spread features the July 13 makeup game, Orioles 2–1. Baseball-Reference identifies July 13 as rescheduled from May 5. Confirm whether the family attended both dates and state the relationship.

### Print / production

1. **Major · Definite Error · High confidence — at least ten visit/game elements exceed the right safe boundary.** The date, result, line score, and pitching fields reach x=2524.

## Minute Maid Park

### Era naming

1. **Minor · Verify Manually · High confidence — current-name references may age the book.** The timeline records the 2025 rename to Daikin Park while the page is intentionally titled Minute Maid Park for the 2021 visit. Keep the historical page title, but ensure any “current” field uses the chosen publication cutoff.

### Print / production

1. **Major · Definite Error · High confidence — at least twelve visit-panel elements exceed the right safe boundary.** Date, result, time, attendance, and pitching values reach x=2521.

## Globe Life Field

### Print / production

1. **Major · Definite Error · High confidence — six elements exceed the right safe boundary.** Location, visit header, pitching matchup, and attendance reach x=2524.

## Rogers Centre

### Typography

1. **Minor · Definite Error · High confidence — eight protractor labels are 11 px.** If these are instrument marks they clear 8.3 px; if they communicate reader-facing bearing data they must be 12 px. Standardize the classification.

### Print / production

1. **Major · Definite Error · High confidence — at least thirteen visit and facility elements exceed the right safe boundary.** Score columns, decision, construction, cost, and financing text reach x=2524.

## Target Field

### Print / production

1. **Major · Definite Error · High confidence — at least fourteen visit/game elements exceed the right safe boundary.** Featured-visit metadata, score columns, and weather values reach x=2524.

## Chase Field

### Print / production

1. **Major · Definite Error · High confidence — four context paragraphs exceed the right safe boundary.** They reach x=2524.

## Busch Stadium

### Print / production

1. **Major · Definite Error · High confidence — four capacity/weather elements exceed the right safe boundary.** They reach x=2515–2525.

## Sutter Health Park

### Historical / game facts

1. **Minor · Definite Error · High confidence — matchup ordering differs across project files.** `all-games-data.js` stores home A’s / away Blue Jays, while the spread correctly phrases Blue Jays at Athletics. The rendered appendix should be checked to ensure it visually presents away at home rather than object-property order.

### Print / production

1. **Major · Definite Error · High confidence — eight visit-panel elements exceed the right safe boundary.** Visit number, date, matchup, result, time, pitchers, attendance, and duration reach x=2524.

## Oracle Park

### Editorial

1. **Polish · Probable Error · Medium confidence — “The Bay” is unnecessarily capitalized in prose.** In “geographic features nearby” context, prefer “the bay” unless the style sheet explicitly treats “The Bay” as a proper local name.

### Print / production

1. **Major · Definite Error · High confidence — five context/address elements exceed the right safe boundary.** They reach x=2524.

## Stadium Timeline

### Typography

1. **Major · Definite Error · High confidence — at least 100 stadium/name labels render at 11 px.** The automated sweep capped the list at 100, so the actual count may be higher. Raise all reader-facing timeline labels to at least 12 px and reflow the chart.

### Data consistency

1. **Major · Probable Error · High confidence — Milwaukee County Stadium visit year conflicts with `ballparks-data.js`.** Timeline: 1953; appendix first visit: 1955. Reconcile against the family ledger.
2. **Major · Verify Manually · Medium confidence — “visited: 43” conflicts conceptually with a 42-stadium book.** This may count franchise-tenure bars rather than unique physical stadiums, but the visible key must label that distinction precisely.
3. **Minor · Verify Manually · Medium confidence — all active tenures end in 2026.** Confirm that 2026 is the publication cutoff and not an automatically advanced placeholder.

## Ballpark First Visits Appendix

### Naming and era

1. **Major · Verify Manually · High confidence — current names are mixed with historical visit framing.** Examples include Truist Park and loanDepot park for 2018 visits. If the appendix is a current registry, label it accordingly; if it is a first-visit chronology, use the visit-date names.

## All Trip Games Appendix

### Naming

1. **Major · Definite Error · High confidence — “SunTrust Stadium” must be “SunTrust Park.”** This is the clearest literal stadium-name error in the appendix.
2. **Minor · Verify Manually · High confidence — “Cleveland Stadium” and “Camden Yards” use shorthand while other rows use formal names.** Apply a documented appendix shorthand rule or use Cleveland Municipal Stadium and Oriole Park at Camden Yards.

### Chronology

1. **Major · Verify Manually · High confidence — May 5 Camden entry records only the rainout while the stadium spread features the July 13 makeup.** Confirm whether the appendix is a trip itinerary, a list of attended games, or both. Its title “All Baseball Trip Games” currently makes the omission ambiguous.

## Closing Stadium Grid

### Consistency

1. **Minor · Verify Manually · Medium confidence — audit all grid labels against the approved cover/appendix shorthand rule.** This page uses a compact image-grid idiom similar to the cover; its naming treatment should not form a third convention.

## Pages with no definite page-specific defect found in the current sweep

Comiskey Park; Progressive Field; Comerica Park; American Family Field; Marlins Park; Citizens Bank Park. These pages still require final literal proofreading, fact reconciliation, drop-cap verification, prose-style uniformity measurement, and printed-size visual review before they can be marked clear.

## Required final reconciliation queue

1. Obtain or create the master Stadium Registry, Visit/Game Ledger, Naming Timelines, Style Sheet, Design System Reference, and Open Issues Ledger.
2. Resolve Milwaukee County Stadium 1953 versus 1955.
3. Resolve whether Camden’s May 5 rainout and July 13 makeup represent one trip event, two attended dates, or a later independent visit.
4. Define whether appendices use visit-date names, current names, or both in separately labeled fields.
5. Define approved shorthand: County Stadium, Cleveland Stadium, Camden Yards, Jack Murphy, Shea, The Vet.
6. Replace all five failed hero images.
7. Correct the 12 px typography failures.
8. Repair both gutter violations and every measured safe-boundary violation.
9. Re-run drop-cap and body-prose uniformity checks page by page.
10. Reconcile export order, page count, product type, and completion status before generating final PDFs.
