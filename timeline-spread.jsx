/* timeline-spread.jsx — "MLB Stadium Timeline" thematic interstitial.
   A single 2550 x 1088 SVG infographic (vector → clean press PDF) charting
   30 franchise lanes, 83 stadium tenures, year axis 1890–2026.

   System
     · warm cream paper across BOTH pages (this is a data spread, not a hero)
     · unvisited tenure  = muted slate bar               (archival, quiet)
     · visited tenure    = saturated heritage-green bar  (outlined, label cream)
     · known visit        = gold diamond on the bar at the visit year
     · name change        = quiet dark notch on the bar at the rename year
   Labels never sit in the gutter zone (x 1238–1312); a quiet seam marks the fold.
   A collision-aware placer keeps every one of the 83 stadium names legible. */
(function () {
  const { useMemo, useState, useEffect } = React;
  const D = window.TimelineData;

  // ---- palette ----
  const C = {
    paper: "#EFE7D6", paperHi: "#F4EEDF", stripe: "#E8DDC7",
    ink: "#24201C", ink2: "#5A534A", ink3: "#8C8478",
    rule: "#D8CDB4", ruleStrong: "#BBAF90",
    slate: "#6F7B80", slateStroke: "#4E585C",
    green: "#1E6B53", greenStroke: "#103F30",
    gold: "#E0A21C", goldStroke: "#7C5510",
    rename: "#46423B", seam: "#C7BA9C",
    star: "#A82E22", starStroke: "#6C120F",
    band: "rgba(36,32,28,0.062)", bandEdge: "rgba(90,83,74,0.34)",
  };

  // ---- geometry ----
  const YMIN = D.YEAR_MIN, YMAX = D.YEAR_MAX;
  const PLOT_X0 = 314, PLOT_X1 = 2492;
  const CHART_TOP = 144, CHART_BOT = 1027;
  const LABEL_R = 292;            // right edge of franchise rail text
  const FOLD = 1275, GUT0 = 1238, GUT1 = 1312;
  const BARH = 13;
  // ---- year-free GUTTER GAP centered on the fold ----
  // Seasons map at ONE linear scale (PX_SEASON); seasons >= GUT_SPLIT are shifted
  // right by GUT_GAP, so the 0.5in binding-safe band straddling the fold
  // (~1213..1339) holds NO year. Bars cross the dead band as continuous tenures;
  // that span references no year. GUT_SPLIT (1950) is picked so no tenure boundary
  // lands on it (no start==1950, no end==1949) -> xOf stays single-valued with no
  // stretched boundary season.
  const GUT_GAP = 126;
  const GUT_SPLIT = 1950;
  const NSEAS = YMAX - YMIN + 1;
  const PX_SEASON = (PLOT_X1 - PLOT_X0 - GUT_GAP) / NSEAS;
  // span model: each season owns a full slot [xOf(yr), xOf(yr+1)]. There are
  // (YMAX-YMIN+1) seasons, so the divisor is +1 and xOf(YMAX+1) == PLOT_X1.
  const xOf = (yr) => PLOT_X0 + (yr - YMIN) * PX_SEASON + (yr >= GUT_SPLIT ? GUT_GAP : 0);
  const lanes = D.FRANCHISES;
  const ERAS = D.ERAS;

  // ---- ROAD-TRIP RULES ---------------------------------------------------
  // One vertical rule per documented trip, on its season, with a diamond at the
  // chart top. Two trips share 2024, so a same-year group is spread symmetrically
  // inside its season slot (+-3.5px) so both rules read.
  const TRIPS = (function () {
    const src = (window.ROADTRIPS && window.ROADTRIPS.trips) || [];
    const byYear = {};
    src.forEach((t) => { (byYear[t.year] = byYear[t.year] || []).push(t); });
    return src.map((t) => {
      const g = byYear[t.year], i = g.indexOf(t), n = g.length;
      return { key: t.key, year: t.year, accent: t.accent, x: xOf(+t.year + 0.5) + (i - (n - 1) / 2) * 3.5 };
    });
  })();
  // Footer tally is DERIVED from the charted data so it can never drift from the
  // bars a reader can count. Basis: every tenure row that is drawn, including the
  // Braves' 1914-15 Fenway sublet and the Rays' 2026 return to Tropicana Field.
  const TALLY = {
    franchises: D.FRANCHISES.length,
    // The Rays' 2026 Tropicana return is drawn as its own bar but is the SAME
    // occupancy of an already-counted park, so it is excluded from the tally.
    tenures: D.FRANCHISES.reduce((n, f) => n + f.tenures.filter((t) => !t.noLabel).length, 0),
    visited: D.FRANCHISES.reduce((n, f) => n + f.tenures.filter((t) => t.visited && !t.noLabel).length, 0),
  };
  const N = lanes.length;
  const laneH = (CHART_BOT - CHART_TOP) / N;

  const inGutter = (a, b) => a < GUT1 && b > GUT0;
  // Readable labels/spans/external callouts must ALSO clear the 0.5in binding-safe
  // band: left edge >= 1337.5 on the right page, right edge <= 1212.5 on the left.
  // Year-true marks (notches, diamonds) keep the narrower GUT zone above, so they
  // stay on their true year; only readable text avoids this wider band.
  const LG0 = 1210.5, LG1 = 1339.5; // 2px safety vs canvas-measure/render slop
  const inLabelGutter = (a, b) => a < LG1 && b > LG0;
  const hit = (r, o, pad) => (r.x - pad < o.x + o.w && r.x + r.w + pad > o.x && r.y - pad < o.y + o.h && r.y + r.h + pad > o.y);

  function TimelineSpread() {
    const [ready, setReady] = useState(false);
    useEffect(() => {
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => setReady(true));
      const t = setTimeout(() => setReady(true), 400);
      return () => clearTimeout(t);
    }, []);

    const layout = useMemo(() => {
      const measure = (() => {
        const ctx = document.createElement("canvas").getContext("2d");
        return (txt, font) => { ctx.font = font; return ctx.measureText(txt).width; };
      })();
      const F_IN = "500 11px Oswald, sans-serif";
      const F_SPAN = "400 11px Oswald, sans-serif";  // Regular master — lighter than the 500 used for names, and embeddable (no synthesis).
                                                     // 11px = 7.9pt: BELOW the project's 12px readable floor, by explicit request.
      const F_EXT = "500 11px Oswald, sans-serif";
      const lh = 11.5;
      // canvas measureText ignores the SVG letter-spacing we render with, so every
      // width used for fitting adds it back (0.01em @11px = 0.11px/char, 0.02em @12px = 0.24px/char)
      // year span text. The end year is abbreviated to two digits only when it
      // shares a century with the start — 1912-99, but 1970-2000, never 1970-00.
      const sameCentury = (t) => Math.floor(t.start / 100) === Math.floor(t.end / 100);
      const spanFor = (t) => t.spanText || (t.end >= YMAX ? (t.start + "-")
        : (t.start + "-" + (sameCentury(t) ? ("0" + (t.end % 100)).slice(-2) : t.end)));
      // tightest legible form: both years to two digits, no apostrophe (62-64).
      // Same-century only — across a century boundary two digits are ambiguous.
      const compactFor = (t) => (t.spanText || !(t.end >= YMAX || sameCentury(t))) ? null
        : ("\u2019" + ("0" + (t.start % 100)).slice(-2) + "-" + (t.end >= YMAX ? "" : ("0" + (t.end % 100)).slice(-2)));
      const TRACK = {}; TRACK[F_IN] = 0.11; TRACK[F_SPAN] = 0.22;   // spans render at 0.02em/11px TRACK[F_EXT] = 0.11;
      const mw = (txt, font) => measure(txt, font) + txt.length * (TRACK[font] || 0.11);

      const bars = [];
      const obstacles = [];
      const MINW = 7;       // safety floor; the span model already gives every tenure a full-season slot
      const OFFGAP = 5;     // offseason stadium change: narrow gap between two otherwise-abutting tenures
      lanes.forEach((f, i) => {
        const cy = CHART_TOP + i * laneH + laneH / 2;
        const barY = cy - BARH / 2;
        const ten = f.tenures;
        ten.forEach((t, ti) => {
          const sEnd = Math.min(t.end, YMAX);
          // a tenure covers xOf(start) -> xOf(lastSeason + 1): the full width of every season it held.
          let x0 = xOf(t.start);
          let x1 = xOf(sEnd + 1);
          if (ti === 0 && x0 < PLOT_X0) x0 = PLOT_X0; // clamp a pre-axis opener (e.g. 1888) to the chart floor
          let shift = 0; // uniform shifts only (nudge / right-margin); diamonds follow this, NOT the gap trims below
          const prev = ti > 0 ? ten[ti - 1] : null;
          const next = ti + 1 < ten.length ? ten[ti + 1] : null;
          // left edge vs previous tenure
          if (prev) {
            if (t.start === prev.end) x0 = xOf(t.start + 0.5);                 // in-season change -> split the shared season, abut
            else if (t.start === prev.end + 1) x0 = xOf(t.start) + OFFGAP / 2; // offseason change -> narrow gap
          }
          // right edge vs next tenure
          if (next) {
            if (next.start === t.end) x1 = xOf(t.end + 0.5);                   // in-season change -> split the shared season, abut
            else if (next.start === t.end + 1) x1 = xOf(sEnd + 1) - OFFGAP / 2; // offseason change -> narrow gap
          }
          if (t.nudgeX) { x0 += t.nudgeX; x1 += t.nudgeX; shift += t.nudgeX; } // manual horizontal nudge
          if (x1 > PLOT_X1) { const over = x1 - PLOT_X1; x0 -= over; x1 -= over; shift -= over; } // keep inside the right margin
          if (x1 - x0 < MINW) x1 = x0 + MINW;
          const rec = { t, x0, x1, w: x1 - x0, barY, cy, laneIdx: i, shift };
          bars.push(rec);
          obstacles.push({ x: x0, y: barY, w: x1 - x0, h: BARH });
        });
      });

      // ---- marker positions, computed BEFORE labels so the label fitter can dodge them.
      // A visit's marker centers on the MIDDLE of its season slot (xOf(yr+0.5)),
      // carrying only the uniform bar shift (nudge / right-margin) -- never the
      // offseason gap trim -- so every marker sits half-a-season inside the bar
      // edges with no overhang.
      const DR = 7.1;
      bars.forEach((b) => {
        const at = (yr) => {
          let x = clamp(xOf(yr + 0.5) + b.shift, b.x0 + DR, b.x1 - DR);
          if (x > GUT0 && x < GUT1) x = GUT0 - 6;
          return x;
        };
        const marks = [];
        (b.t.visitYears || []).forEach((yr) => marks.push({ x: at(yr), half: 7.1, kind: "visit" }));
        (b.t.asgYears || []).forEach((yr) => {
          if (yr < b.t.start || yr > b.t.end) return;
          marks.push({ x: at(yr), half: 4.8, kind: "asg", yr: yr });
        });
        marks.sort((p, q) => p.x - q.x);
        b.marks = marks;
      });

      const AVOID_X = [];
      for (let y = 1890; y <= 2020; y += 10) AVOID_X.push(xOf(y));
      AVOID_X.push(xOf(GUT_SPLIT) - GUT_GAP, PLOT_X1, FOLD);
      {
        const yrCount = {};
        bars.forEach((b) => b.marks.forEach((m) => { if (m.kind === "asg") yrCount[m.yr] = (yrCount[m.yr] || 0) + 1; }));
        bars.forEach((b) => b.marks.forEach((m) => { if (m.kind === "asg" && yrCount[m.yr] > 1) AVOID_X.push(m.x); }));
      }

      // decide inside vs external
      const externals = [];
      bars.forEach((b) => {
        if (b.t.noLabel || b.t.belowLabel) { b.inside = false; return; } // bar drawn; custom/no label handled separately
        if (b.t.labelOutside || b.t.labelAbove || b.t.labelLeft) { b.inside = false; externals.push(b); return; } // force primary to an external callout
        const nameW = mw(b.t.stadium, F_IN) + (b.t.gapPx || 0);
        const nameFits = b.w >= nameW + 16;
        const nameInGutter = inLabelGutter(b.x0 + 7, b.x0 + 7 + nameW);
        const denseVisits = (b.t.visitYears || []).length >= 8; // e.g. Coors (every year) — keep bar clear for the diamond run
        if (nameFits && !nameInGutter && !denseVisits) {
          b.inside = true;
          b.nameW = nameW;
          let span = b.t.noSpan ? null : spanFor(b.t);
          let spanW = span ? mw(span, F_SPAN) : 0;
          if (span && b.w < nameW + spanW + 26) {
            const cp = compactFor(b.t);
            if (cp) { const cw = mw(cp, F_SPAN); if (b.w >= nameW + cw + 14) { span = cp; spanW = cw; b.spanCompacted = true; } }
          }
          if (span && b.w >= nameW + spanW + 26) {
            let spanX = b.x1 - 4;                              // default: right end of the bar
            if (inLabelGutter(spanX - spanW, spanX)) {
              // bar terminates at the fold, so its right-end span lands in the
              // binding band. Pull the span back to the gutter's LEFT face so it
              // stays on the (long) bar but clears the binding-safe zone.
              const cand = (xOf(GUT_SPLIT) - GUT_GAP) - 5;    // right-align just left of the gap
              if (cand - spanW > b.x0 + 7 + nameW + 12 && !inLabelGutter(cand - spanW, cand)) {
                spanX = cand; b.spanRelocated = true;
              } else { spanX = null; }                        // no room even relocated -> drop
            }
            if (spanX != null) { b.span = span; b.spanW = spanW; b.spanX = spanX; }
          }
        } else {
          b.inside = false;
          externals.push(b);
        }
      });

      // Bars whose NAME sits outside (or auto-flowed outside) can still carry their
      // year span on the bar itself — offer one wherever the bar has the width.
      bars.forEach((b) => {
        if (b.span || b.inside || b.t.noLabel || b.t.noSpan) return;   // inside bars already made a name-aware span decision
        let span = spanFor(b.t);
        let spanW = mw(span, F_SPAN);
        if (b.w < spanW + 16) {
          const cp = compactFor(b.t);
          if (!cp) return;
          const cw = mw(cp, F_SPAN);
          if (b.w < cw + 6) return;
          span = cp; spanW = cw; b.spanCompacted = true;
        }
        const spanX = b.x1 - 4;
        if (inLabelGutter(spanX - spanW, spanX)) return;
        b.span = span; b.spanW = spanW; b.spanX = spanX;
      });

      // place externals — narrowest bars first so boxed-in ones claim gap space
      externals.sort((a, b) => a.w - b.w);
      const placed = [];
      externals.forEach((b) => {
        const txt = b.t.stadium;
        const tw = mw(txt, F_EXT);
        const mid = (b.x0 + b.x1) / 2;
        const gap = laneH - BARH;
        // labelOutside primaries anchor their above/below label to the bar START
        const anchorStart = b.t.labelOutside || b.t.labelAbove;
        const aboveX = anchorStart ? clamp(b.x0, PLOT_X0, PLOT_X1 - tw) : clamp(mid - tw / 2, PLOT_X0, PLOT_X1 - tw);
        const stemX = anchorStart ? (b.x0 + 4) : mid;
        const cands = [
          { x: b.x1 + 6, y: b.cy - lh / 2, anchor: "start", lx1: b.x1, ly1: b.cy, lx2: b.x1 + 5, ly2: b.cy },                 // right
          { x: b.x0 - 6 - tw, y: b.cy - lh / 2, anchor: "start", lx1: b.x0, ly1: b.cy, lx2: b.x0 - 5, ly2: b.cy },             // left
          { x: aboveX, y: b.barY - gap / 2 - lh / 2, anchor: "start", up: true, ax: stemX },                                   // above
          { x: aboveX, y: b.barY + BARH + gap / 2 - lh / 2, anchor: "start", down: true, ax: stemX },                          // below
        ];
        // labelAbove primaries prefer the above slot, then below, then the inline right/left
        const order = b.t.labelLeft ? [cands[1], cands[2], cands[3], cands[0]]
          : b.t.labelAbove ? [cands[2], cands[3], cands[0], cands[1]]
          : b.t.labelBelow ? [cands[3], cands[0], cands[1], cands[2]] : cands;
        let chosen = null;
        for (const c of order) {
          const r = { x: c.x, y: c.y, w: tw, h: lh };
          if (r.x < PLOT_X0 - 0.5 || r.x + r.w > PLOT_X1 + 0.5) continue;
          if (inLabelGutter(r.x - 2, r.x + r.w + 2)) continue;
          let bad = false;
          for (const o of obstacles) { if (hit(r, o, 0.8)) { bad = true; break; } }
          if (!bad) for (const p of placed) { if (hit(r, p, 1.5)) { bad = true; break; } }
          if (!bad) { chosen = c; break; }
        }
        if (!chosen) chosen = b.t.labelLeft ? cands[1] : b.t.labelBelow ? cands[3] : cands[2]; // forced fallback
        const r = { x: chosen.x, y: chosen.y, w: tw, h: lh };
        placed.push(r);
        // leader geometry
        // Above/below callouts use a STRICTLY VERTICAL stem: pick an x that is both on
        // the bar and under the label, then slide it off any decade rule / star tie.
        let leader = null;
        if (chosen.up || chosen.down) {
          const lx = chosen.x + (b.t.extDx || 0);
          const lo2 = Math.max(lx + 3, b.x0 + 3), hi2 = Math.min(lx + tw - 3, b.x1 - 3);
          if (lo2 <= hi2) {
            let ax = clamp(chosen.ax, lo2, hi2);
            const bad = (x) => AVOID_X.some((v) => Math.abs(v - x) < 2.2);
            if (bad(ax)) {
              for (const dd of [4, -4, 6, -6, 8, -8, 11, -11, 15, -15]) {
                const c = ax + dd;
                if (!bad(c) && c >= lo2 && c <= hi2) { ax = c; break; }
              }
            }
            leader = chosen.up
              ? { x1: ax, y1: b.barY, x2: ax, y2: chosen.y + lh - 1.5 }
              : { x1: ax, y1: b.barY + BARH, x2: ax, y2: chosen.y + 1.5 };
          } else {
            // label sits clear of its bar horizontally — angled leader is unavoidable
            leader = chosen.up
              ? { x1: chosen.ax, y1: b.barY, x2: clamp(chosen.ax, lx + 3, lx + tw - 3), y2: chosen.y + lh - 1.5 }
              : { x1: chosen.ax, y1: b.barY + BARH, x2: clamp(chosen.ax, lx + 3, lx + tw - 3), y2: chosen.y + 1.5 };
          }
        } else {
          leader = { x1: chosen.lx1, y1: chosen.ly1, x2: chosen.lx2, y2: chosen.ly2 };
        }
        // manual horizontal nudge for a callout that would otherwise sit under a star tie
        const edx = b.t.extDx || 0;
        b.ext = { x: chosen.x + edx, y: chosen.y + lh / 2, anchor: chosen.anchor, txt, leader };
      });

      // visit diamonds + rename ticks
      const diamonds = [], ticks = [], renameLabels = [], stars = [];
      const F_RN = "500 11px Oswald, sans-serif";
      bars.forEach((b) => {
        const barEnd = b.x1;
        const rs = (b.t.renames || []).filter((r) => r.year > b.t.start && r.year < Math.min(b.t.end, YMAX));
        // notches
        rs.forEach((r) => {
          const x = clamp(xOf(r.year), b.x0 + 1.5, b.x1 - 1.5);
          if (x > GUT0 && x < GUT1) return;
          ticks.push({ x, y0: b.barY - 2, y1: b.barY + BARH + 2 });
        });
        // secondary post-rename names, where the bar segment has room
        rs.forEach((r, idx) => {
          if (!r.name || (r.name === b.t.stadium && !r.relabel)) return;
          const tickX = xOf(r.year);
          if (tickX > GUT0 && tickX < GUT1) return;
          const tw = mw(r.name, F_RN) + (r.gapPx || 0);
          // r.above → callout above the bar at the tick (for tight end-segment renames)
          if (r.above) {
            const gap = laneH - BARH;
            const lx = clamp(tickX, PLOT_X0, PLOT_X1 - tw);
            if (inGutter(lx - 2, lx + tw + 2)) return;
            const ty = b.barY - gap / 2;
            const leadX2 = clamp(tickX, lx + 3, lx + tw - 3);
            renameLabels.push({ x: lx, y: ty, txt: r.name, above: true, leader: { x1: tickX, y1: b.barY, x2: leadX2, y2: ty + 6 } });
            return;
          }
          const nextX = idx + 1 < rs.length ? xOf(rs[idx + 1].year) : barEnd;
          const spanLimit = (b.span && !b.spanRelocated) ? (b.x1 - 7 - (b.spanW || 0) - 6) : b.x1;
          const segEnd = Math.min(nextX, spanLimit) - 4;
          let startX = tickX + 5;
          if (b.inside) startX = Math.max(startX, b.x0 + 7 + (b.nameW || 0) + 9);
          // Right-page rename names must clear the 0.5in binding-safe edge (1337.5).
          // The year-true notch stays on the continuous bar; only the readable name
          // slides out of the near-binding band (it remains on the bar, so still legible).
          if (startX > FOLD && startX < 1337.5) startX = 1337.5;
          if (!r.force && startX + tw > segEnd) return;            // no room in segment (unless forced)
          if (inGutter(startX - 2, startX + tw + 2)) return;      // gutter
          renameLabels.push({ x: startX + (r.dx || 0), y: b.cy, txt: r.name, gapAfter: r.gapAfter, gapPx: r.gapPx, visited: b.t.visited, bar: b, lo: tickX + 4, hi: segEnd });
        });
        b.marks.forEach((m) => {
          if (m.kind === "visit") { diamonds.push({ x: m.x, y: b.cy }); return; }
          // an All-Star year that is ALSO a visit year: the star sits dead-centre on
          // the diamond, so it drops its white keyline and lets the gold ring show
          const onGold = b.marks.some((o) => o.kind === "visit" && Math.abs(o.x - m.x) < 1);
          stars.push({ x: m.x, y: b.cy, onGold, yr: m.yr });
        });
      });

      /* ---------- fit on-bar text around the markers ----------
         Every label that sits ON a bar (stadium name, post-rename name, year
         span) is tested against the marker footprints. Resolution order:
           1. leave it where it is, if it already clears everything;
           2. slide it left/right — smallest move that clears (spans prefer left,
              since they are right-anchored);
           3. multi-word labels only: split at a word space and widen THAT gap so
              the marker sits centred in it, equidistant from both words.
         Anything that still cannot clear is left put and reported in `moves`. */
      const MPAD = 3;        // air between a glyph and a marker edge
      const moves = [], spanCallouts = [];
      function fitOnBar(txt, font, wantX, b, lo, hi, occ, preferLeft, splitFirst) {
        const forb = b.marks.map((m) => [m.x - m.half - MPAD, m.x + m.half + MPAD]);
        forb.push([LG0, LG1]);                       // binding-safe band
        const w = mw(txt, font);
        const free = (a, z) => a >= lo - 0.01 && z <= hi + 0.01
          && !forb.some((f) => a < f[1] && z > f[0])
          && !occ.some((o) => a < o[1] + 4 && z > o[0] - 4);
        if (free(wantX, wantX + w)) return { x: wantX, x1: wantX + w };
        const trySplit = () => {
          const words = txt.split(" ");
          let best = null;
          for (let g = 1; g < words.length; g++) {
            const pre = words.slice(0, g).join(" ");
            const suf = words.slice(g).join(" ");
            const preAdv = mw(pre, font), preSp = mw(pre + " ", font), sufW = mw(suf, font);
            for (const m of b.marks) {
              const nx = m.x - m.half - MPAD - preAdv;   // last GLYPH of the prefix ends just left of the marker
                                                         // (the trailing word space is blank, so it may run under it)
              const sufX = m.x + m.half + MPAD;          // suffix starts just right of it
              const gapPx = sufX - (nx + preSp);
              if (gapPx < 1) continue;
              if (!free(nx, nx + preAdv) || !free(sufX, sufX + sufW)) continue;
              const cost = Math.abs(nx - wantX) + gapPx;
              if (!best || cost < best.cost) best = { x: nx, x1: sufX + sufW, gapAfter: pre, gapPx, cost, note: 'split after "' + pre + '" (' + gapPx.toFixed(1) + 'px gap centred on the ' + m.kind + ' marker)' };
            }
          }
          return best;
        };
        if (splitFirst) { const sp = trySplit(); if (sp) return sp; }
        for (let d = 0.5; d <= 220; d += 0.5) {
          const order = preferLeft ? [-d, d] : [d, -d];
          for (const sgn of order) {
            if (free(wantX + sgn, wantX + sgn + w)) {
              return { x: wantX + sgn, x1: wantX + sgn + w, note: "nudged " + (sgn > 0 ? "right " : "left ") + Math.abs(sgn).toFixed(1) + "px" };
            }
          }
        }
        const best = trySplit();
        if (best) return best;
        return { x: wantX, x1: wantX + w, failed: true };
      }
      bars.forEach((b) => {
        const lane = lanes[b.laneIdx].lines.join(" ");
        const occ = [];
        const log = (kind, txt, r) => {
          if (r.note) moves.push({ lane, tenure: b.t.stadium, kind, text: txt, action: r.note });
          else if (r.failed) moves.push({ lane, tenure: b.t.stadium, kind, text: txt, action: "UNRESOLVED" });
        };
        if (b.inside) {
          const r = fitOnBar(b.t.stadium, F_IN, b.x0 + 7, b, b.x0 + 4, b.x1 - 4, occ, false, b.t.splitFirst);
          b.nameFit = r; occ.push([r.x, r.x1]); log("stadium name", b.t.stadium, r);
        }
        renameLabels.filter((rl) => rl.bar === b).forEach((rl) => {
          const r = fitOnBar(rl.txt, F_RN, rl.x, b, Math.max(rl.lo, b.x0 + 4), Math.min(rl.hi, b.x1 - 4), occ, false);
          rl.x = r.x; rl.gapAfter = r.gapAfter; rl.gapPx = r.gapPx; occ.push([r.x, r.x1]); log("rename", rl.txt, r);
        });
        if (b.span && b.t.spanPin) {
          // pinned to the bar's right edge by request — marker collisions allowed
          b.spanFit = { x: b.x1 - 4 - b.spanW, x1: b.x1 - 4 };
          occ.push([b.spanFit.x, b.spanFit.x1]);
          return;
        }
        if (b.span) {
          const want = (b.spanX != null ? b.spanX : b.x1 - 4) - b.spanW;
          // the span is always the LAST thing on its bar — never allowed to slide
          // left of the stadium name or a rename label
          const occRight = occ.reduce((m, o) => Math.max(m, o[1]), b.x0 + 4);
          const r = fitOnBar(b.span, F_SPAN, want, b, occRight + 4, b.x1 - 4, occ, true);
          b.spanFit = r;
          // a span that cannot clear the markers is DROPPED, not overprinted —
          // it is secondary information the axis already carries.
          if (r.failed && !b.t.spanText && (b.t.end >= YMAX || sameCentury(b.t))) {
            // before giving up the bar, try the abbreviated form — '20– instead of 2020–
            const ab = "\u2019" + ("0" + (b.t.start % 100)).slice(-2) + "-"
              + (b.t.end >= YMAX ? "" : ("0" + (b.t.end % 100)).slice(-2));   // same-century only, so 2 digits is unambiguous
            const abW = mw(ab, F_SPAN);
            const r2 = fitOnBar(ab, F_SPAN, b.x1 - 4 - abW, b, occRight + 4, b.x1 - 4, occ, true);
            if (!r2.failed) {
              b.span = ab; b.spanW = abW; b.spanFit = r2; occ.push([r2.x, r2.x1]);
              moves.push({ lane, tenure: b.t.stadium, kind: "year span", text: ab, action: "abbreviated to fit on the bar" });
              return;
            }
            const cp = compactFor(b.t);
            if (cp) {
              const cw = mw(cp, F_SPAN);
              const r3 = fitOnBar(cp, F_SPAN, b.x1 - 4 - cw, b, occRight + 4, b.x1 - 4, occ, true);
              if (!r3.failed) {
                b.span = cp; b.spanW = cw; b.spanFit = r3; occ.push([r3.x, r3.x1]);
                moves.push({ lane, tenure: b.t.stadium, kind: "year span", text: cp, action: "compacted to two digits to fit on the bar" });
                return;
              }
            }
          }
          if (r.failed) {
            // no room ON the bar → set it in the lane gap instead, in ink, right-aligned
            // to the bar's end, checked against the bars and the external callouts
            const lh2 = 12.5, gap = laneH - BARH, w = b.spanW;
            let put = null;
            // hug the OWNING bar rather than centring in the lane gap, so the
            // callout is never equidistant between two rows
            for (const c of [{ x: b.x1 - 4 - w, y: b.barY - lh2 - 1.5 }, { x: b.x1 - 4 - w, y: b.barY + BARH + 1.5 }]) {
              const rect = { x: c.x, y: c.y, w, h: lh2 };
              if (rect.x < PLOT_X0 || rect.x + w > PLOT_X1) continue;
              if (inLabelGutter(rect.x - 2, rect.x + w + 2)) continue;
              if (obstacles.some((o) => hit(rect, o, 0.8))) continue;
              if (placed.some((p) => hit(rect, p, 1.5))) continue;
              put = rect; break;
            }
            if (put) {
              placed.push(put);
              spanCallouts.push({ x: put.x, y: put.y + lh2 / 2 + (b.t.spanDy || 0), txt: b.span });
              moves.push({ lane, tenure: b.t.stadium, kind: "year span", text: b.span, action: "moved into the lane gap above/below the bar (no room on it)" });
            } else {
              moves.push({ lane, tenure: b.t.stadium, kind: "year span", text: b.span, action: "dropped — no clear space on or beside the bar" });
            }
          }
          else { occ.push([r.x, r.x1]); log("year span", b.span, r); }
        }
      });
      // ---- inflection-point labels ----------------------------------------
      // Horizontal label + horizontal leader running to its band. Labels live in
      // LANE GAPS, which are continuous horizontally, so a leader can travel to its
      // column without ever crossing a bar. Nothing already on the chart is moved.
      const F_ERA = "italic 400 12px Spectral, serif";
      const ERA_WRAP = {};   // year → substring that starts line 2
      const eraLabels = [], eraKey = [];
      {
        // everything already placed that sits in a lane gap
        const gapObs = [];
        bars.forEach((bb) => { if (bb.ext) gapObs.push({ x0: bb.ext.x - 2, x1: bb.ext.x + mw(bb.ext.txt, F_EXT) + 2, y: bb.ext.y }); });
        renameLabels.forEach((r) => { if (r.above) gapObs.push({ x0: r.x - 2, x1: r.x + mw(r.txt, F_RN) + 2, y: r.y }); });
        spanCallouts.forEach((sc) => gapObs.push({ x0: sc.x - 2, x1: sc.x + 40, y: sc.y }));
        bars.forEach((bb) => {
          if (!bb.t.belowLabel) return;
          const mid = (bb.x0 + bb.x1) / 2;
          bb.t.belowLabel.forEach((ln, j) => gapObs.push({ x0: mid - mw(ln, F_EXT) / 2 - 2, x1: mid + mw(ln, F_EXT) / 2 + 2, y: bb.barY + BARH + 16 + j * 12.5 }));
        });
        // A 12px label's line box (~19px) is TALLER than a lane gap (16.4px), so a
        // label can only sit where a neighbouring lane is empty at that x. A LEADER
        // is a hairline, so it can run down the middle of any gap — that is what
        // lets a label reach a band hundreds of px away without crossing a bar.
        // rows run top-down so the labels read chronologically down the page:
        // 1903 highest, 2023 lowest
        const rows = [];
        for (let i = 12; i <= 29; i++) rows.push(CHART_TOP + i * laneH);
        rows.push(CHART_BOT - 14);   // extra row: just above the bottom rule
        const usedLab = [], usedLead = [];
        const clearLabel = (y, x0, x1) =>
          !bars.some((bb) => Math.abs(bb.cy - y) < 17 && bb.x0 < x1 + 4 && bb.x1 > x0 - 4) &&
          !gapObs.some((o) => Math.abs(o.y - y) < 19 && o.x0 < x1 + 8 && o.x1 > x0 - 8) &&
          !usedLab.some((o) => Math.abs(o.y - y) < 19 && o.x0 < x1 + 10 && o.x1 > x0 - 10) &&
          !usedLead.some((o) => Math.abs(o.y - y) < 8 && o.x0 < x1 + 4 && o.x1 > x0 - 4);
        let leaderRelaxed = false;   // last resort: let the hairline run beneath an existing label
        const clearLeader = (y, x0, x1) =>
          !bars.some((bb) => Math.abs(bb.cy - y) < 8 && bb.x0 < x1 && bb.x1 > x0) &&
          (leaderRelaxed || !gapObs.some((o) => Math.abs(o.y - y) < 9 && o.x0 < x1 && o.x1 > x0)) &&
          !usedLab.some((o) => Math.abs(o.y - y) < 11 && o.x0 < x1 && o.x1 > x0) &&
          !usedLead.some((o) => Math.abs(o.y - y) < 5 && o.x0 < x1 && o.x1 > x0);
        let rowPtr = 0;
        const seq = ERAS;
        const rowsSeq = rows;
        // pinned placements: era year → row index (0 = the row just below lane 12)
        const ERA_PIN = { 2020: 17, 2023: 16, 1997: [13, 136], 1994: [13, 92], 1981: [13, 70], 1969: [13, 4], 1972: [13, 26], 1973: [13, 48], 1995: [13, 114] };   // 2020 sits in the Bank One Ballpark / Tropicana Field lane gap
        const order = ERAS.filter((e) => ERA_PIN[e.year]).concat(ERAS.filter((e) => !ERA_PIN[e.year]));
        order.forEach((e) => {
          const bandX = xOf(e.year) + (xOf(e.year + 1) - xOf(e.year)) / 2;
          const txt = e.year + "  " + e.title;
          const brk = ERA_WRAP[e.year] ? txt.indexOf(ERA_WRAP[e.year]) : -1;
          const lines = brk > 0 ? [txt.slice(0, brk).trim(), txt.slice(brk)] : [txt];
          const w = Math.max.apply(null, lines.map((l) => mw(l, F_ERA)));
          const onLeftPage = bandX < FOLD;
          const pageLo = onLeftPage ? PLOT_X0 + 4 : LG1 + 4;
          const pageHi = onLeftPage ? LG0 - 4 : PLOT_X1 - 4;
          let best = null;
          // Rows are handed out in order and each era reserves one for every era
          // still to come, so the labels stay in chronological order down the page.
          const tryRow = (y, maxOff) => {
            if (y == null) return false;
            for (let off = 18; off < (maxOff || 1000); off += 6) {
              const lx = bandX - off - w;
              if (lx < pageLo) break;
              const okLines = lines.every((l, li) => clearLabel(y + li * 13, lx, lx + w));
              const ly = y + (lines.length - 1) * 6.5;   // leader centred between wrapped lines
              if (okLines && clearLeader(ly, lx + w + 6, bandX)) {
                best = { off, x: lx, y, txt, lines, leader: { x1: lx + w - 14, x2: bandX, y: ly } };
                return true;
              }
            }
            return false;
          };
          const remaining = seq.length - 1 - seq.indexOf(e);
          let hi = Math.min(rowsSeq.length, Math.max(rowPtr + 1, rowsSeq.length - remaining));
          if (ERA_PIN[e.year] != null) {
            // pinned row: sit as close to the band as the page allows (slight collisions OK)
            const pin = ERA_PIN[e.year];
            const py = rowsSeq[Array.isArray(pin) ? pin[0] : pin] + (Array.isArray(pin) ? pin[1] : 0);
            if (!tryRow(py, 40)) {
              const lx = Math.max(pageLo, bandX - 18 - w);
              best = { off: 18, x: lx, y: py, txt, lines, leader: { x1: lx + w - 14, x2: bandX, y: py + (lines.length - 1) * 6.5 } };
            }
            hi = rowPtr;
          }
          // pass 1: prefer a row where the leader can be SHORT (same length as 1903/1918)
          for (let ri = rowPtr; ri < hi && !best; ri++) if (tryRow(rowsSeq[ri], 40)) rowPtr = ri + 1;
          // pass 2: any length
          for (let ri = rowPtr; ri < hi && !best; ri++) if (tryRow(rowsSeq[ri])) rowPtr = ri + 1;
          for (let ri = hi; ri < rowsSeq.length && !best; ri++) if (tryRow(rowsSeq[ri])) rowPtr = ri + 1;
          if (!best) {
            leaderRelaxed = true;
            for (let ri = rowPtr; ri < rowsSeq.length && !best; ri++) if (tryRow(rowsSeq[ri])) rowPtr = ri + 1;
            for (let ri = 0; ri < rowPtr && !best; ri++) tryRow(rowsSeq[ri]);
            leaderRelaxed = false;
          }
          if (best) {
            eraLabels.push(best);
            best.lines.forEach((l, li) => usedLab.push({ y: best.y + li * 13, x0: best.x, x1: best.x + w }));
            usedLead.push({ y: best.leader.y, x0: Math.min(best.leader.x1, best.leader.x2), x1: Math.max(best.leader.x1, best.leader.x2) });
          } else eraKey.push(e);
        });
      }

      window.__labelMoves = moves;

      // franchise rail: single-line names, auto-shrunk only when they would
      // breach the left safe edge (37.5px). Available width = LABEL_R - 37.5.
      const AVAIL_RAIL = LABEL_R - 37.5 - 3;
      const rail = lanes.map((f) => {
        const name = f.lines.join(" ").toUpperCase();
        let p = 13;
        while (p > 10) {
          const w = measure(name, "500 " + p + "px Oswald, sans-serif") + (name.length - 1) * 0.04 * p;
          if (w <= AVAIL_RAIL) break;
          p -= 0.5;
        }
        return { name: name, font: p };
      });

      // Two tenures can share one All-Star year — the same ballpark used by two
      // franchises (Sportsman's Park, Shibe Park) or a two-game season (1959-62).
      // A hairline ties those stars together down the year's column.
      const byYear = {};
      stars.forEach((st) => { (byYear[st.yr] = byYear[st.yr] || []).push(st); });
      const starTies = [];
      Object.keys(byYear).forEach((yr) => {
        const g = byYear[yr].slice().sort((a, b) => a.y - b.y);
        if (g.length < 2) return;
        for (let i = 0; i + 1 < g.length; i++) starTies.push({ x1: g[i].x, y1: g[i].y, x2: g[i + 1].x, y2: g[i + 1].y });
      });

      return { bars, diamonds, ticks, rail, renameLabels, stars, spanCallouts, starTies, eraLabels, eraKey };
    }, [ready]);

    // ---------- render ----------
    const decades = [];
    for (let y = 1890; y <= 2020; y += 10) decades.push(y);

    return (
      <svg viewBox="0 0 2550 1088" width="2550" height="1088" style={{ display: "block" }}
        xmlns="http://www.w3.org/2000/svg" data-screen-label="MLB Stadium Timeline spread">
        <rect x="0" y="0" width="2550" height="1088" fill={C.paper} />

        {/* ---- alternating lane stripes ---- */}
        {lanes.map((f, i) => i % 2 === 1 ? (
          <rect key={"st" + i} x={PLOT_X0 - 8} y={CHART_TOP + i * laneH} width={PLOT_X1 - PLOT_X0 + 16} height={laneH} fill={C.stripe} opacity="0.55" />
        ) : null)}

        {/* ---- inflection-point bands: one season wide, tinted, under the bars so
             they read through the lane gaps and the axis margins ---- */}
        {ERAS.map((e) => {
          const x = xOf(e.year), w = xOf(e.year + 1) - x;
          return (
            <g key={"era" + e.year}>
              <rect x={x} y={CHART_TOP} width={w} height={CHART_BOT - CHART_TOP} fill={C.band} />
              <line x1={x} y1={CHART_TOP} x2={x} y2={CHART_BOT} stroke={C.bandEdge} strokeWidth="0.8" />
            </g>
          );
        })}

        {/* ---- road-trip rules: one vertical line per trip, full chart height,
             under the bars so the bars overprint and the rule reads through the
             lane gaps as a continuous column ---- */}
        {TRIPS.map((t) => (
          <line key={"trip" + t.key} x1={t.x} y1={CHART_TOP} x2={t.x} y2={CHART_BOT}
            stroke={t.accent} strokeWidth="1" opacity="0.45" />
        ))}

        {/* ---- season hairlines: every year that is not a decade, very faint ---- */}
        {Array.from({ length: YMAX - YMIN + 1 }, (_, i) => YMIN + i).filter((y) => y % 10 !== 0).map((y) => {
          const x = xOf(y);
          return <line key={"sg" + y} x1={x} y1={CHART_TOP} x2={x} y2={CHART_BOT} stroke={C.rule} strokeWidth="0.5" opacity="0.3" />;
        })}

        {/* ---- decade gridlines ---- */}
        {decades.map((y) => {
          const x = xOf(y);
          return <line key={"g" + y} x1={x} y1={CHART_TOP} x2={x} y2={CHART_BOT} stroke={C.rule} strokeWidth="1" />;
        })}
        {/* 1950 boundary — LEFT face of the gutter gap (mirrors the 1950 gridline on the
           gap's right edge), so the fold-split "19" is anchored symmetrically to "50" */}
        <line x1={xOf(GUT_SPLIT) - GUT_GAP} y1={CHART_TOP} x2={xOf(GUT_SPLIT) - GUT_GAP} y2={CHART_BOT} stroke={C.rule} strokeWidth="1" />
        {/* present edge */}
        <line x1={PLOT_X1} y1={CHART_TOP} x2={PLOT_X1} y2={CHART_BOT} stroke={C.ruleStrong} strokeWidth="1" strokeDasharray="2 3" />

        {/* ---- gutter era seam ---- */}
        <rect x={FOLD - 1.5} y={CHART_TOP} width="3" height={CHART_BOT - CHART_TOP} fill={C.seam} opacity="0.5" />
        <line x1={FOLD} y1={CHART_TOP} x2={FOLD} y2={CHART_BOT} stroke={C.ruleStrong} strokeWidth="0.6" />

        {/* ---- chart frame rules ---- */}
        <line x1={PLOT_X0 - 8} y1={CHART_TOP} x2={PLOT_X1} y2={CHART_TOP} stroke={C.ink} strokeWidth="1.4" />
        <line x1={PLOT_X0 - 8} y1={CHART_BOT} x2={PLOT_X1} y2={CHART_BOT} stroke={C.ink} strokeWidth="1.4" />
        <line x1={PLOT_X0 - 10} y1={CHART_TOP} x2={PLOT_X0 - 10} y2={CHART_BOT} stroke={C.ruleStrong} strokeWidth="1" />

        {/* ---- decade labels (top + bottom), gutter label suppressed ---- */}
        {decades.map((y) => {
          const x = xOf(y);
          // suppress the fold-straddling decade (1950): its line sits at the gap's
          // right edge and a centered label would bleed into the binding-safe band.
          if (x > 1196 && x < 1354) return null;
          return (
            <g key={"dl" + y}>
              <text x={x} y={CHART_TOP - 9} textAnchor="middle" fontFamily="'Space Mono', monospace" fontSize="14" fill={C.ink2} letterSpacing="0.04em">{y}</text>
            </g>
          );
        })}

        {/* ---- fold-split 1950 marker: the mid-century decade falls on the binding,
             so its label is split "19" | gutter | "50" and reads across the spread ---- */}
        <text x={1205} y={CHART_TOP - 9} textAnchor="end" fontFamily="'Space Mono', monospace" fontSize="14" fill={C.ink2} letterSpacing="0.04em">19</text>
        <text x={1346} y={CHART_TOP - 9} textAnchor="start" fontFamily="'Space Mono', monospace" fontSize="14" fill={C.ink2} letterSpacing="0.04em">50</text>

        {/* ---- road-trip diamonds: head of each trip rule, on the top axis ---- */}
        {TRIPS.map((t) => (
          <rect key={"tripd" + t.key} x={t.x - 2.7} y={CHART_TOP - 2.7} width="5.4" height="5.4"
            fill={t.accent} transform={"rotate(45 " + t.x + " " + CHART_TOP + ")"} />
        ))}

        {/* ---- franchise rail labels (single line, auto-fit) ---- */}
        {lanes.map((f, i) => {
          const cy = CHART_TOP + i * laneH + laneH / 2;
          const r = layout.rail[i];
          return (
            <text key={"rail" + i} x={LABEL_R} y={cy} textAnchor="end" dominantBaseline="central"
              fontFamily="'Oswald Med', sans-serif" fontWeight="400" fontSize={r.font} fill={C.ink}
              letterSpacing="0.04em">{r.name}</text>
          );
        })}

        {/* ---- ties between stars sharing an All-Star year — drawn UNDER the bars, so
             the connection shows only in the lane gaps and never crosses a label ---- */}
        {layout.starTies.map((t, k) => (
          <line key={"tie" + k} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} stroke={C.star} strokeWidth="1.1" opacity="0.85" />
        ))}

        {/* ---- bars ---- */}
        {layout.bars.map((b, k) => {
          const visited = b.t.visited;
          return (
            <rect key={"bar" + k} x={b.x0} y={b.barY} width={b.w} height={BARH} rx="1.5"
              fill={visited ? C.green : C.slate}
              stroke={visited ? C.greenStroke : C.slateStroke}
              strokeWidth={visited ? 1.4 : 0.8} />
          );
        })}

        {/* ---- rename notches — behind the markers and every label, like the bars ---- */}
        {layout.ticks.map((t, k) => (
          <line key={"tk" + k} x1={t.x} y1={t.y0} x2={t.x} y2={t.y1} stroke={C.rename} strokeWidth="1.3" opacity="0.85" />
        ))}

        {/* ---- inflection-point leaders: drawn with the bars so any label prints over them ---- */}
        {layout.eraLabels.map((e, i) => (
          <g key={"ell" + i}>
            <line x1={e.leader.x1} y1={e.leader.y} x2={e.leader.x2 - 4.2} y2={e.leader.y} stroke={C.ink3} strokeWidth="0.8" />
            <path d={"M " + e.leader.x2 + " " + e.leader.y + " L " + (e.leader.x2 - 5) + " " + (e.leader.y - 2.6) + " L " + (e.leader.x2 - 5) + " " + (e.leader.y + 2.6) + " Z"} fill={C.ink3} />
          </g>
        ))}

        {/* ---- visit diamonds — sit with the stars just above the bars, so every
             label prints over them ---- */}
        {layout.diamonds.map((d, k) => {
          const hd = 5.4;
          const path = (s) => `M ${d.x} ${d.y - s} L ${d.x + s} ${d.y} L ${d.x} ${d.y + s} L ${d.x - s} ${d.y} Z`;
          return (
            <g key={"dm" + k}>
              <path d={path(hd + 1.7)} fill={C.paperHi} />
              <path d={path(hd)} fill={C.gold} stroke={C.goldStroke} strokeWidth="0.9" />
            </g>
          );
        })}

        {/* ---- All-Star Game stars: dated point events in the visit-diamond class,
             drawn over the gold diamonds but under every label ---- */}
        {layout.stars.map((s, k) => (
          <path key={"as" + k} d={starPath(s.x, s.y, 5.0, 2.1)} fill={C.star}
            stroke={s.onGold ? "none" : "#FFFFFF"} strokeWidth="1.1" strokeLinejoin="round" paintOrder="stroke" />
        ))}

        {/* ---- inside labels ---- */}
        {layout.bars.filter(b => b.inside).map((b, k) => (
          <text key={"il" + k} x={b.nameFit ? b.nameFit.x : b.x0 + 7} y={b.cy} dominantBaseline="central" textAnchor="start"
            fontFamily="'Oswald Med', sans-serif" fontWeight="400" fontSize="11" fill={C.paperHi}
            letterSpacing="0.01em">{gapped(b.t.stadium, b.nameFit && b.nameFit.gapAfter, b.nameFit && b.nameFit.gapPx)}</text>
        ))}

        {/* ---- year spans: offered on every bar wide enough, whether its name sits
             inside the bar or in an external callout ---- */}
        {layout.bars.filter(b => b.span && !(b.spanFit && b.spanFit.failed)).map((b, k) => (
          <text key={"sp" + k} x={b.spanFit ? b.spanFit.x : (b.spanX != null ? b.spanX : b.x1 - 4) - b.spanW} y={b.cy}
            dominantBaseline="central" textAnchor="start"
            fontFamily="Oswald, sans-serif" fontWeight="400" fontSize="11"
            fill={b.t.visited ? "rgba(244,238,223,.8)" : "rgba(244,238,223,.82)"}
            letterSpacing="0.02em">{b.span}</text>
        ))}

        {/* ---- external labels + leaders ---- */}
        {layout.bars.filter(b => b.ext).map((b, k) => (
          <g key={"el" + k}>
            <line x1={b.ext.leader.x1} y1={b.ext.leader.y1} x2={b.ext.leader.x2} y2={b.ext.leader.y2} stroke={C.ink3} strokeWidth="0.8" />
            <text x={b.ext.x} y={b.ext.y} dominantBaseline="central" textAnchor={b.ext.anchor}
              fontFamily="'Oswald Med', sans-serif" fontWeight="400" fontSize="11" fill={C.ink} letterSpacing="0.01em">{b.ext.txt}</text>
          </g>
        ))}

        {/* ---- year spans that could not fit on their bar, set in the lane gap ---- */}
        {layout.spanCallouts.map((sc, k) => (
          <text key={"sc" + k} x={sc.x} y={sc.y} dominantBaseline="central" textAnchor="start"
            fontFamily="Oswald, sans-serif" fontWeight="400" fontSize="11" fill={C.ink2} letterSpacing="0.02em">{sc.txt}</text>
        ))}

        {/* ---- below-label: two centered lines under the bar, vertical leader ---- */}
        {layout.bars.filter(b => b.t.belowLabel).map((b, k) => {
          const mid = (b.x0 + b.x1) / 2;
          const barBottom = b.barY + BARH;
          const l1 = barBottom + 16;
          return (
            <g key={"bl" + k}>
              <line x1={mid} y1={barBottom} x2={mid} y2={l1 - 9} stroke={C.ink3} strokeWidth="0.8" />
              {b.t.belowLabel.map((ln, j) => (
                <text key={j} x={mid} y={l1 + j * 12.5} textAnchor="middle" dominantBaseline="central"
                  fontFamily="'Oswald Med', sans-serif" fontWeight="400" fontSize="11" fill={C.ink} letterSpacing="0.01em">{ln}</text>
              ))}
            </g>
          );
        })}

        {/* ---- post-rename names ---- */}
        {layout.renameLabels.map((r, k) => (
          r.above ? (
            <g key={"rn" + k}>
              <line x1={r.leader.x1} y1={r.leader.y1} x2={r.leader.x2} y2={r.leader.y2} stroke={C.ink3} strokeWidth="0.8" />
              <text x={r.x} y={r.y} dominantBaseline="central" textAnchor="start"
                fontFamily="'Oswald Med', sans-serif" fontWeight="400" fontSize="11" fill={C.ink} letterSpacing="0.01em">{r.txt}</text>
            </g>
          ) : (
            <text key={"rn" + k} x={r.x} y={r.y} dominantBaseline="central" textAnchor="start"
              fontFamily="'Oswald Med', sans-serif" fontWeight="400" fontSize="11" fill={C.paperHi}
              letterSpacing="0.01em">{gapped(r.txt, r.gapAfter, r.gapPx)}</text>
          )
        ))}

        {/* ---- inflection-point labels: horizontal, set left of their band ---- */}
        {layout.eraLabels.map((e, i) => (
          <text key={"el" + i} x={e.leader.x1 - 4} y={e.y} dominantBaseline="central" textAnchor="end"
            fontFamily="Spectral, serif" fontStyle="italic" fontSize="12" fill={C.ink}>
            {(e.lines || [e.txt]).map((ln, j) => (
              <tspan key={j} x={e.leader.x1 - 4} dy={j ? 13 : 0}>
                {j === 0 ? <tspan fontWeight="700">{ln.slice(0, 4)}</tspan> : null}{j === 0 ? ln.slice(4) : ln}
              </tspan>
            ))}</text>
        ))}

        {/* ---- compact key for any band with no room for a label ---- */}
        {layout.eraKey.length ? (
          <g>
            <text x="352" y="638" fontFamily="'Oswald Med', sans-serif" fontWeight="400" fontSize="12" fill={C.ink} letterSpacing="0.14em">INFLECTION POINTS</text>
            <line x1="352" y1="648" x2="900" y2="648" stroke={C.ruleStrong} strokeWidth="1" />
            {layout.eraKey.map((e, i) => {
              const y = 668 + i * 20;
              return (
                <g key={"ek" + e.year}>
                  <rect x="352" y={y - 9} width="7" height="12" fill={C.band} />
                  <line x1="352" y1={y - 9} x2="352" y2={y + 3} stroke={C.bandEdge} strokeWidth="0.8" />
                  <text x="372" y={y} fontFamily="Spectral, serif" fontStyle="italic" fontWeight="700" fontSize="12" fill={C.ink}>{e.year}</text>
                  <text x="412" y={y} fontFamily="Spectral, serif" fontStyle="italic" fontSize="12" fill={C.ink}>{e.title}</text>
                </g>
              );
            })}
          </g>
        ) : null}

        {/* ============ HEADER BAND ============ (sits entirely above the top axis labels) */}
        <text x="52" y="90" fontFamily="'Oswald Bd', sans-serif" fontWeight="400" fontSize="44" fill={C.ink} letterSpacing="0.005em">MLB STADIUM TIMELINE</text>
        <text x="54" y="107" fontFamily="Spectral, serif" fontStyle="italic" fontSize="16" letterSpacing="0.04em" fill={C.ink3}>Franchise stadium tenures, name changes, and known visits, 1890&#8211;2026.</text>

        {/* legend — right page */}
        <Legend C={C} />

        {/* ============ FOOTER BAND ============ (above 0.25in bottom safe line) */}
        <text x={PLOT_X1} y="1046" textAnchor="end" fontFamily="'Oswald Med', sans-serif" fontWeight="400" fontSize="13" fill={C.ink2} letterSpacing="0.12em">
          {TALLY.franchises} FRANCHISES&#160;&#160;&#183;&#160;&#160;{TALLY.tenures} STADIUM TENURES&#160;&#160;&#183;&#160;&#160;{TALLY.visited} TENURES VISITED
        </text>
      </svg>
    );
  }

  function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

  // widen ONE interior word space so a marker can sit inside the label
  function gapped(txt, after, px) {
    if (!after || !px || txt.indexOf(after + " ") !== 0) return txt;
    const rest = txt.slice(after.length + 1);
    return [<tspan key="a">{after + " "}</tspan>, <tspan key="b" dx={px}>{rest}</tspan>];
  }

  // five-point star centred on (cx, cy)
  function starPath(cx, cy, R, r) {
    let d = "";
    for (let i = 0; i < 10; i++) {
      const rad = (i % 2 === 0) ? R : r;
      const a = -Math.PI / 2 + i * Math.PI / 5;
      d += (i ? " L " : "M ") + (cx + rad * Math.cos(a)).toFixed(2) + " " + (cy + rad * Math.sin(a)).toFixed(2);
    }
    return d + " Z";
  }

  // legend block, anchored to the right page top band
  function Legend({ C }) {
    const yRow = 80;
    const items = [
      { kind: "bar", fill: C.slate, stroke: C.slateStroke, sw: 0.8, label: "Stadium tenure" },
      { kind: "bar", fill: C.green, stroke: C.greenStroke, sw: 1.4, label: "Visited stadium" },
      { kind: "diamond", label: "Known visit" },
      { kind: "star", label: "All-Star Game" },
      { kind: "tick", label: "Name change" },
    ];
    // measure-free fixed layout, right aligned ending at 2492
    const measure = (() => { const c = document.createElement("canvas").getContext("2d"); return (t) => { c.font = "500 14px Oswald, sans-serif"; return c.measureText(t.toUpperCase()).width; }; })();
    const SW = 34, GAPsl = 11, GAPit = 30;
    let widths = items.map((it) => SW + GAPsl + measure(it.label) + (it.label.length ? 0 : 0));
    const total = widths.reduce((a, b) => a + b, 0) + GAPit * (items.length - 1);
    let x = 2484 - total;
    const out = [];
    items.forEach((it, i) => {
      const lx = x;
      let glyph;
      if (it.kind === "bar") glyph = <rect x={lx} y={yRow - 9} width={SW} height={16} rx="1.5" fill={it.fill} stroke={it.stroke} strokeWidth={it.sw} />;
      else if (it.kind === "diamond") {
        const cx = lx + SW / 2, cy = yRow - 1, s = 7;
        glyph = <g>
          <path d={`M ${cx} ${cy - s - 1.6} L ${cx + s + 1.6} ${cy} L ${cx} ${cy + s + 1.6} L ${cx - s - 1.6} ${cy} Z`} fill={C.paperHi} />
          <path d={`M ${cx} ${cy - s} L ${cx + s} ${cy} L ${cx} ${cy + s} L ${cx - s} ${cy} Z`} fill={C.gold} stroke={C.goldStroke} strokeWidth="0.9" />
        </g>;
      } else if (it.kind === "star") {
        const cx = lx + SW / 2, cy = yRow - 1;
        glyph = <path d={starPath(cx, cy, 7.4, 3.1)} fill={C.star} stroke="#FFFFFF" strokeWidth="1.3" strokeLinejoin="round" paintOrder="stroke" />;
      } else {
        const cx = lx + SW / 2;
        glyph = <g>
          <rect x={lx + 6} y={yRow - 9} width={SW - 12} height={16} rx="1.5" fill={C.slate} opacity="0.5" />
          <line x1={cx} y1={yRow - 11} x2={cx} y2={yRow + 9} stroke={C.rename} strokeWidth="1.6" />
        </g>;
      }
      out.push(
        <g key={"lg" + i}>
          {glyph}
          <text x={lx + SW + GAPsl - (it.kind === "diamond" || it.kind === "star" ? 7 : 0)} y={yRow} dominantBaseline="central" fontFamily="'Oswald Med', sans-serif" data-lg={it.kind} fontWeight="400" fontSize="14" fill={C.ink} letterSpacing="0.08em">{it.label.toUpperCase()}</text>
        </g>
      );
      x += widths[i] + GAPit;
    });
    return <g>{out}</g>;
  }

  window.TimelineSpread = TimelineSpread;
})();
