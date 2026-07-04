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
      const F_SPAN = "400 12px 'Space Mono', monospace";
      const F_EXT = "500 11px Oswald, sans-serif";
      const lh = 11.5;

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

      // decide inside vs external
      const externals = [];
      bars.forEach((b) => {
        if (b.t.noLabel || b.t.belowLabel) { b.inside = false; return; } // bar drawn; custom/no label handled separately
        if (b.t.labelOutside || b.t.labelAbove) { b.inside = false; externals.push(b); return; } // force primary to an external callout
        const nameW = measure(b.t.stadium, F_IN);
        const nameFits = b.w >= nameW + 16;
        const nameInGutter = inLabelGutter(b.x0 + 7, b.x0 + 7 + nameW);
        const denseVisits = (b.t.visitYears || []).length >= 8; // e.g. Coors (every year) — keep bar clear for the diamond run
        if (nameFits && !nameInGutter && !denseVisits) {
          b.inside = true;
          b.nameW = nameW;
          const span = b.t.spanText || (b.t.end >= YMAX ? (b.t.start + "\u2013now")
            : (b.t.start + "\u2013" + ("0" + (b.t.end % 100)).slice(-2)));
          const spanW = measure(span, F_SPAN);
          if (b.w >= nameW + spanW + 26) {
            let spanX = b.x1 - 7;                              // default: right end of the bar
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

      // place externals — narrowest bars first so boxed-in ones claim gap space
      externals.sort((a, b) => a.w - b.w);
      const placed = [];
      externals.forEach((b) => {
        const txt = b.t.stadium;
        const tw = measure(txt, F_EXT);
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
        const order = b.t.labelAbove ? [cands[2], cands[3], cands[0], cands[1]] : cands;
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
        if (!chosen) chosen = cands[2]; // forced fallback → above (sits in gap, avoids neighbour text)
        const r = { x: chosen.x, y: chosen.y, w: tw, h: lh };
        placed.push(r);
        // leader geometry
        let leader = null;
        if (chosen.up) leader = { x1: chosen.ax, y1: b.barY, x2: clamp(chosen.ax, chosen.x + 3, chosen.x + tw - 3), y2: chosen.y + lh - 1.5 };
        else if (chosen.down) leader = { x1: chosen.ax, y1: b.barY + BARH, x2: clamp(chosen.ax, chosen.x + 3, chosen.x + tw - 3), y2: chosen.y + 1.5 };
        else leader = { x1: chosen.lx1, y1: chosen.ly1, x2: chosen.lx2, y2: chosen.ly2 };
        b.ext = { x: chosen.x, y: chosen.y + lh / 2, anchor: chosen.anchor, txt, leader };
      });

      // visit diamonds + rename ticks
      const diamonds = [], ticks = [], renameLabels = [];
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
          const tw = measure(r.name, F_RN);
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
          renameLabels.push({ x: startX, y: b.cy, txt: r.name });
        });
        // a visit's marker centers on the MIDDLE of its season slot (xOf(yr+0.5)),
        // carrying only the uniform bar shift (nudge / right-margin) -- never the
        // offseason gap trim -- so every diamond sits half-a-season inside the bar
        // edges with no overhang. A light clamp (diamond half-width) keeps the rare
        // shared-season visit on an in-season-split bar off the very edge.
        const DR = 7.1;
        b.t.visitYears.forEach((yr) => {
          let x = clamp(xOf(yr + 0.5) + b.shift, b.x0 + DR, b.x1 - DR);
          if (x > GUT0 && x < GUT1) x = GUT0 - 6;
          diamonds.push({ x, y: b.cy });
        });
      });

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

      return { bars, diamonds, ticks, rail, renameLabels };
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
        <text x={1211} y={CHART_TOP - 9} textAnchor="end" fontFamily="'Space Mono', monospace" fontSize="14" fill={C.ink2} letterSpacing="0.04em">19</text>
        <text x={1340} y={CHART_TOP - 9} textAnchor="start" fontFamily="'Space Mono', monospace" fontSize="14" fill={C.ink2} letterSpacing="0.04em">50</text>

        {/* ---- franchise rail labels (single line, auto-fit) ---- */}
        {lanes.map((f, i) => {
          const cy = CHART_TOP + i * laneH + laneH / 2;
          const r = layout.rail[i];
          return (
            <text key={"rail" + i} x={LABEL_R} y={cy} textAnchor="end" dominantBaseline="central"
              fontFamily="Oswald, sans-serif" fontWeight="500" fontSize={r.font} fill={C.ink}
              letterSpacing="0.04em">{r.name}</text>
          );
        })}

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

        {/* ---- inside labels ---- */}
        {layout.bars.filter(b => b.inside).map((b, k) => (
          <g key={"il" + k}>
            <text x={b.x0 + 7} y={b.cy} dominantBaseline="central" textAnchor="start"
              fontFamily="Oswald, sans-serif" fontWeight="500" fontSize="11" fill={C.paperHi}
              letterSpacing="0.01em">{b.t.stadium}</text>
            {b.span ? (
              <text x={b.spanX != null ? b.spanX : (b.x1 - 7)} y={b.cy} dominantBaseline="central" textAnchor="end"
                fontFamily="'Space Mono', monospace" fontSize="12" fill={b.t.visited ? "rgba(244,238,223,.7)" : "rgba(244,238,223,.72)"}
                letterSpacing="0.02em">{b.span}</text>
            ) : null}
          </g>
        ))}

        {/* ---- rename notches ---- */}
        {layout.ticks.map((t, k) => (
          <line key={"tk" + k} x1={t.x} y1={t.y0} x2={t.x} y2={t.y1} stroke={C.rename} strokeWidth="1.3" opacity="0.85" />
        ))}

        {/* ---- external labels + leaders ---- */}
        {layout.bars.filter(b => b.ext).map((b, k) => (
          <g key={"el" + k}>
            <line x1={b.ext.leader.x1} y1={b.ext.leader.y1} x2={b.ext.leader.x2} y2={b.ext.leader.y2} stroke={C.ink3} strokeWidth="0.8" />
            <text x={b.ext.x} y={b.ext.y} dominantBaseline="central" textAnchor={b.ext.anchor}
              fontFamily="Oswald, sans-serif" fontWeight="500" fontSize="11" fill={C.ink} letterSpacing="0.01em">{b.ext.txt}</text>
          </g>
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
                  fontFamily="Oswald, sans-serif" fontWeight="500" fontSize="11" fill={C.ink} letterSpacing="0.01em">{ln}</text>
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
                fontFamily="Oswald, sans-serif" fontWeight="500" fontSize="11" fill={C.ink} letterSpacing="0.01em">{r.txt}</text>
            </g>
          ) : (
            <text key={"rn" + k} x={r.x} y={r.y} dominantBaseline="central" textAnchor="start"
              fontFamily="Oswald, sans-serif" fontWeight="500" fontSize="11" fill={C.paperHi} letterSpacing="0.01em">{r.txt}</text>
          )
        ))}

        {/* ---- visit diamonds (drawn last — always on top) ---- */}
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

        {/* ============ HEADER BAND ============ (sits entirely above the top axis labels) */}
        <text x="52" y="90" fontFamily="Oswald, sans-serif" fontWeight="700" fontSize="44" fill={C.ink} letterSpacing="0.005em">MLB STADIUM TIMELINE</text>
        <text x="54" y="107" fontFamily="Spectral, serif" fontStyle="italic" fontSize="16" letterSpacing="0.04em" fill={C.ink3}>Franchise stadium tenures, name changes, and known visits, 1890&#8211;2026.</text>

        {/* legend — right page */}
        <Legend C={C} />

        {/* ============ FOOTER BAND ============ (above 0.25in bottom safe line) */}
        <text x={PLOT_X1} y="1046" textAnchor="end" fontFamily="Oswald, sans-serif" fontWeight="500" fontSize="13" fill={C.ink2} letterSpacing="0.12em">
          30 FRANCHISES&#160;&#160;&#183;&#160;&#160;105 STADIUM TENURES&#160;&#160;&#183;&#160;&#160;43 VISITED
        </text>
      </svg>
    );
  }

  function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

  // legend block, anchored to the right page top band
  function Legend({ C }) {
    const yRow = 80;
    const items = [
      { kind: "bar", fill: C.slate, stroke: C.slateStroke, sw: 0.8, label: "Stadium tenure" },
      { kind: "bar", fill: C.green, stroke: C.greenStroke, sw: 1.4, label: "Visited stadium" },
      { kind: "diamond", label: "Known visit" },
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
          <text x={lx + SW + GAPsl} y={yRow} dominantBaseline="central" fontFamily="Oswald, sans-serif" fontWeight="500" fontSize="14" fill={C.ink} letterSpacing="0.08em">{it.label.toUpperCase()}</text>
        </g>
      );
      x += widths[i] + GAPit;
    });
    return <g>{out}</g>;
  }

  window.TimelineSpread = TimelineSpread;
})();
