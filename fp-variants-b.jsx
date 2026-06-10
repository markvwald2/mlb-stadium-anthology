/* fp-variants-b.jsx — field-plan studies V6–V10.
   Uses window.FP / FPChip / FPField. */
(function () {
  const FP = window.FP, FPChip = window.FPChip, FPField = window.FPField;
  const e = React.createElement;

  function Svg(props) {
    return e("svg", { viewBox: "0 0 360 360", style: { width: "100%", height: "auto", display: "block" }, role: "img", "aria-label": props.label },
      e("defs", null, FP.grassDef("g_" + props.gid)),
      props.children
    );
  }
  function arrowhead(tip, deg, fill, size) {
    const back = FP.polar(tip, size || 9, deg + 180);
    const l = FP.polar(back, (size || 9) * 0.45, deg - 90), r = FP.polar(back, (size || 9) * 0.45, deg + 90);
    return e("polygon", { points: [tip, l, r].map(p => p[0].toFixed(1) + "," + p[1].toFixed(1)).join(" "), fill: fill });
  }
  function arcPath(C, r, a0, a1) {
    const p0 = FP.polar(C, r, a0), p1 = FP.polar(C, r, a1);
    const large = Math.abs(a1 - a0) > 180 ? 1 : 0;
    return "M " + p0[0].toFixed(1) + " " + p0[1].toFixed(1) + " A " + r + " " + r + " 0 " + large + " 1 " + p1[0].toFixed(1) + " " + p1[1].toFixed(1);
  }

  /* ============ V6 — RADIAL SPOKES / FAN ============ */
  function V6(props) {
    const C = [180, 198], R = 96, deg = props.deg;
    const g = FP.field(C, R);
    const home = FP.rot(g.home, C, deg);
    const poles = { lf: FP.rot(g.lf, C, deg), cf: FP.rot(g.cf, C, deg), rf: FP.rot(g.rf, C, deg) };
    // rotation wedge at home: from north ray to the home->CF axis
    const wedge = "M " + home[0] + " " + home[1] +
      " L " + FP.polar(home, 70, 0)[0] + " " + FP.polar(home, 70, 0)[1] +
      " A 70 70 0 0 1 " + FP.polar(home, 70, deg)[0].toFixed(1) + " " + FP.polar(home, 70, deg)[1].toFixed(1) + " Z";
    function spoke(p, val, key) {
      return e("g", { key: key },
        e("line", { x1: home[0], y1: home[1], x2: p[0], y2: p[1], stroke: FP.royal, strokeWidth: 1.6, opacity: 0.9 }),
        arrowhead(p, Math.atan2(p[1] - home[1], p[0] - home[0]) * 180 / Math.PI + 90, FP.royalDeep, 8),
        e(FPChip, { x: FP.out(p, home, 16)[0], y: FP.out(p, home, 16)[1], text: FP.strip(val), size: 14 })
      );
    }
    const degPos = FP.polar(home, 50, deg / 2);
    return e(Svg, { gid: "v6", label: "Radial spoke field plan" },
      e(FPField, { C: C, R: R, deg: deg, gradId: "g_v6" }),
      e("path", { d: wedge, fill: FP.gold, fillOpacity: 0.22, stroke: "none" }),
      e("line", { x1: home[0], y1: home[1], x2: FP.polar(home, 74, 0)[0], y2: FP.polar(home, 74, 0)[1], stroke: "#48586A", strokeWidth: 1.2, strokeDasharray: "3 3" }),
      e("text", { x: FP.polar(home, 74, 0)[0], y: FP.polar(home, 74, 0)[1] - 6, textAnchor: "middle", style: { fontFamily: "'Oswald',sans-serif", fontWeight: 700, fontSize: "12px", fill: "#3A4654", paintOrder: "stroke", stroke: FP.paperHi, strokeWidth: "3px" } }, "N"),
      spoke(poles.lf, props.lf, "s1"),
      spoke(poles.cf, props.cf, "s2"),
      spoke(poles.rf, props.rf, "s3"),
      e("circle", { cx: home[0], cy: home[1], r: 3.4, fill: FP.royal }),
      e(FPChip, { x: degPos[0], y: degPos[1], text: deg + "\u00b0", size: 13, tone: "gold", padX: 7 })
    );
  }

  /* ============ V7 — AZIMUTH DIAL ============ */
  function V7(props) {
    const C = [180, 184], R = 72, RR = 130, deg = props.deg;
    const grad = [];
    for (let a = 0; a < 360; a += 15) {
      const big = a % 45 === 0;
      const p1 = FP.polar(C, RR, a), p2 = FP.polar(C, RR - (big ? 11 : 6), a);
      grad.push(e("line", { key: "g" + a, x1: p1[0], y1: p1[1], x2: p2[0], y2: p2[1], stroke: big ? FP.royal : FP.ruleStrong, strokeWidth: big ? 1.3 : 0.7, opacity: big ? 0.8 : 0.5 }));
    }
    const nums = [0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => {
      const p = FP.polar(C, RR + 15, a);
      return e("text", { key: "n" + i, x: p[0], y: p[1] + 4, textAnchor: "middle", style: { fontFamily: "'Space Mono',monospace", fontWeight: 700, fontSize: "9.5px", fill: a === 0 ? FP.royal : FP.ink3 } }, a);
    });
    // filled azimuth band 0 -> deg
    const band = arcPath(C, RR - 16, 0, deg);
    const ptip = FP.polar(C, RR - 6, deg);
    const degPos = FP.polar(C, RR - 30, deg / 2);
    return e(Svg, { gid: "v7", label: "Azimuth dial field plan" },
      e("circle", { cx: C[0], cy: C[1], r: RR, fill: "none", stroke: FP.rule, strokeWidth: 1 }),
      grad, nums,
      e(FPField, { C: C, R: R, deg: deg, gradId: "g_v7" }),
      e("path", { d: band, fill: "none", stroke: FP.gold, strokeWidth: 5, strokeLinecap: "round", opacity: 0.9 }),
      e("line", { x1: C[0], y1: C[1], x2: ptip[0], y2: ptip[1], stroke: FP.royal, strokeWidth: 2.2, strokeLinecap: "round" }),
      arrowhead(ptip, deg, FP.royalDeep, 9),
      e("circle", { cx: C[0], cy: C[1], r: 3.2, fill: FP.royal }),
      distChipsRot(C, R, deg, props, 16, 13),
      e(FPChip, { x: degPos[0], y: degPos[1], text: "BRG " + pad3(deg), size: 12, tone: "royal", padX: 7 })
    );
  }
  function pad3(n) { return ("00" + n).slice(-3) + "\u00b0"; }
  function distChipsRot(C, R, deg, d, off, size) {
    const g = FP.field(C, R);
    return [
      { p: FP.out(FP.rot(g.lf, C, deg), C, off), t: FP.strip(d.lf) },
      { p: FP.out(FP.rot(g.cf, C, deg), C, off), t: FP.strip(d.cf) },
      { p: FP.out(FP.rot(g.rf, C, deg), C, off), t: FP.strip(d.rf) }
    ].map((it, i) => e(FPChip, { key: "d" + i, x: it.p[0], y: it.p[1], text: it.t, size: size }));
  }

  /* ============ V8 — STAT CARD (infographic) ============ */
  function V8(props) {
    const C = [104, 120], R = 66, deg = props.deg;
    // distance stat rows (right)
    const rows = [["LEFT", props.lf], ["CENTER", props.cf], ["RIGHT", props.rf]];
    const rowEls = rows.map(([k, v], i) => {
      const y = 92 + i * 44;
      return e("g", { key: "r" + i },
        e("line", { x1: 196, y1: y + 13, x2: 338, y2: y + 13, stroke: FP.rule, strokeWidth: 1 }),
        e("text", { x: 196, y: y, style: { fontFamily: "'Oswald',sans-serif", fontWeight: 600, fontSize: "11px", fill: FP.ink3, letterSpacing: ".16em" } }, k),
        e("text", { x: 338, y: y + 2, textAnchor: "end", style: { fontFamily: "'Space Mono',monospace", fontWeight: 700, fontSize: "26px", fill: FP.royal } }, FP.strip(v))
      );
    });
    // bearing donut (bottom-left)
    const dC = [104, 282], dR = 40;
    const ring = arcPath(dC, dR, 0, 359.9);
    const fill = arcPath(dC, dR, 0, deg);
    return e(Svg, { gid: "v8", label: "Field plan stat card" },
      // field
      e(FPField, { C: C, R: R, deg: deg, gradId: "g_v8" }),
      e("text", { x: 104, y: 210, textAnchor: "middle", style: { fontFamily: "'Oswald',sans-serif", fontWeight: 600, fontSize: "10px", fill: FP.ink3, letterSpacing: ".18em" } }, "PLAN \u00b7 " + props.orientation),
      // stat rows
      rowEls,
      e("text", { x: 196, y: 60, style: { fontFamily: "'Oswald',sans-serif", fontWeight: 600, fontSize: "10px", fill: FP.gold, letterSpacing: ".2em" } }, "DISTANCES \u00b7 FT"),
      // donut
      e("path", { d: ring, fill: "none", stroke: FP.rule, strokeWidth: 7 }),
      e("path", { d: fill, fill: "none", stroke: FP.gold, strokeWidth: 7, strokeLinecap: "round" }),
      FP.polar(dC, dR, 0) && e("circle", { cx: FP.polar(dC, dR, 0)[0], cy: FP.polar(dC, dR, 0)[1], r: 3, fill: FP.royal }),
      e("circle", { cx: FP.polar(dC, dR, deg)[0], cy: FP.polar(dC, dR, deg)[1], r: 3.4, fill: FP.royalDeep }),
      e("text", { x: dC[0], y: dC[1] + 2, textAnchor: "middle", style: { fontFamily: "'Anton',sans-serif", fontWeight: 400, fontSize: "30px", fill: FP.royal } }, deg + "\u00b0"),
      e("text", { x: dC[0], y: dC[1] + 18, textAnchor: "middle", style: { fontFamily: "'Oswald',sans-serif", fontWeight: 600, fontSize: "10px", fill: FP.ink3, letterSpacing: ".16em" } }, "BEARING"),
      // bearing label right of donut
      e("text", { x: 196, y: 270, style: { fontFamily: "'Oswald',sans-serif", fontWeight: 600, fontSize: "11px", fill: FP.ink3, letterSpacing: ".16em" } }, "ORIENTATION"),
      e("text", { x: 196, y: 300, style: { fontFamily: "'Anton',sans-serif", fontWeight: 400, fontSize: "34px", fill: FP.ink } }, props.orientation),
      e("text", { x: 196, y: 322, style: { fontFamily: "'Space Mono',monospace", fontWeight: 700, fontSize: "11px", fill: FP.ink2, letterSpacing: ".05em" } }, "N " + deg + "\u00b0 E \u00b7 of true north")
    );
  }

  /* ============ V9 — COORDINATE GRID (surveyor) ============ */
  function V9(props) {
    const C = [176, 196], R = 94, deg = props.deg;
    const g = FP.field(C, R);
    const rHome = FP.rot(g.home, C, deg), rCF = FP.rot(g.cf, C, deg);
    // grid
    const grid = [];
    for (let i = 0; i <= 360; i += 24) {
      grid.push(e("line", { key: "x" + i, x1: i, y1: 0, x2: i, y2: 360, stroke: FP.ruleStrong, strokeWidth: 0.5, opacity: 0.28 }));
      grid.push(e("line", { key: "y" + i, x1: 0, y1: i, x2: 360, y2: i, stroke: FP.ruleStrong, strokeWidth: 0.5, opacity: 0.28 }));
    }
    // bearing arc at center: from vertical(north) to axis
    const arcR = 44;
    const arc = arcPath(C, arcR, 0, deg);
    const degPos = FP.polar(C, 62, deg / 2);
    // north arrow top-right
    const naC = [322, 50];
    return e("svg", { viewBox: "0 0 360 360", style: { width: "100%", height: "auto", display: "block", background: FP.paper }, role: "img", "aria-label": "Surveyor grid field plan" },
      e("defs", null, FP.grassDef("g_v9")),
      grid,
      e(FPField, { C: C, R: R, deg: deg, gradId: "g_v9" }),
      // north reference up from center
      e("line", { x1: C[0], y1: C[1], x2: FP.polar(C, 70, 0)[0], y2: FP.polar(C, 70, 0)[1], stroke: "#48586A", strokeWidth: 1.1, strokeDasharray: "3 3" }),
      e("line", { x1: rHome[0], y1: rHome[1], x2: rCF[0], y2: rCF[1], stroke: FP.royal, strokeWidth: 1.5, strokeDasharray: "5 4" }),
      e("path", { d: arc, fill: "none", stroke: FP.royal, strokeWidth: 1.6 }),
      e("circle", { cx: C[0], cy: C[1], r: 2.6, fill: FP.royal }),
      distChipsRotB(C, R, deg, props, 18, 13),
      e(FPChip, { x: degPos[0], y: degPos[1], text: deg + "\u00b0", size: 13, tone: "gold", padX: 7 }),
      // north arrow
      e("line", { x1: naC[0], y1: naC[1] + 18, x2: naC[0], y2: naC[1] - 14, stroke: FP.ink2, strokeWidth: 1.4 }),
      arrowhead([naC[0], naC[1] - 18], 0, FP.royal, 10),
      e("text", { x: naC[0], y: naC[1] + 32, textAnchor: "middle", style: { fontFamily: "'Oswald',sans-serif", fontWeight: 700, fontSize: "12px", fill: FP.ink } }, "N"),
      // bearing caption
      e("rect", { x: 16, y: 320, width: 150, height: 26, fill: FP.paperHi, stroke: FP.rule, strokeWidth: 1 }),
      e("text", { x: 24, y: 337, style: { fontFamily: "'Space Mono',monospace", fontWeight: 700, fontSize: "12px", fill: FP.royal, letterSpacing: ".04em" } }, "BRG " + pad3b(deg) + " \u00b7 " + props.orientation)
    );
  }
  function pad3b(n) { return ("00" + n).slice(-3) + "\u00b0"; }
  function distChipsRotB(C, R, deg, d, off, size) {
    const g = FP.field(C, R);
    return [
      { p: FP.out(FP.rot(g.lf, C, deg), C, off), t: FP.strip(d.lf) },
      { p: FP.out(FP.rot(g.cf, C, deg), C, off), t: FP.strip(d.cf) },
      { p: FP.out(FP.rot(g.rf, C, deg), C, off), t: FP.strip(d.rf) }
    ].map((it, i) => e(FPChip, { key: "d" + i, x: it.p[0], y: it.p[1], text: it.t, size: size }));
  }

  /* ============ V10 — MINIMAL LINE ============ */
  function V10(props) {
    const C = [180, 190], R = 104, deg = props.deg;
    const g = FP.field(C, R);
    const poles = { lf: FP.rot(g.lf, C, deg), cf: FP.rot(g.cf, C, deg), rf: FP.rot(g.rf, C, deg) };
    const rHome = FP.rot(g.home, C, deg), rCF = FP.rot(g.cf, C, deg);
    function tick(p, val, key) {
      const o = FP.out(p, C, 8), tEnd = FP.out(p, C, 16), lab = FP.out(p, C, 30);
      return e("g", { key: key },
        e("line", { x1: o[0], y1: o[1], x2: tEnd[0], y2: tEnd[1], stroke: FP.ink3, strokeWidth: 1 }),
        e("text", { x: lab[0], y: lab[1] + 5, textAnchor: "middle", style: { fontFamily: "'Space Mono',monospace", fontWeight: 700, fontSize: "14px", fill: FP.ink } }, FP.strip(val))
      );
    }
    const arcR = 36, arc = arcPath(C, arcR, 0, deg);
    const degPos = FP.polar(C, 54, deg / 2);
    const Ntip = FP.polar(C, 74, 0);
    return e(Svg, { gid: "v10", label: "Minimal line field plan" },
      e(FPField, { C: C, R: R, deg: deg, lineOnly: true, stroke: FP.ink2, sw: 1.3, grassFill: "rgba(85,127,84,0.07)" }),
      // bearing
      e("line", { x1: C[0], y1: C[1], x2: Ntip[0], y2: Ntip[1], stroke: FP.ink3, strokeWidth: 1, strokeDasharray: "3 3" }),
      e("line", { x1: rHome[0], y1: rHome[1], x2: rCF[0], y2: rCF[1], stroke: FP.royal, strokeWidth: 1.3 }),
      e("path", { d: arc, fill: "none", stroke: FP.royal, strokeWidth: 1.4 }),
      e("circle", { cx: C[0], cy: C[1], r: 2, fill: FP.ink2 }),
      e("text", { x: Ntip[0], y: Ntip[1] - 6, textAnchor: "middle", style: { fontFamily: "'Oswald',sans-serif", fontWeight: 600, fontSize: "11px", fill: FP.ink3, letterSpacing: ".1em" } }, "N"),
      e("text", { x: degPos[0], y: degPos[1] + 4, textAnchor: "middle", style: { fontFamily: "'Space Mono',monospace", fontWeight: 700, fontSize: "12px", fill: FP.royal } }, deg + "\u00b0"),
      tick(poles.lf, props.lf, "t1"),
      tick(poles.cf, props.cf, "t2"),
      tick(poles.rf, props.rf, "t3")
    );
  }

  window.FPVariantsB = { V6, V7, V8, V9, V10 };
})();
