/* fp-variants-a.jsx — field-plan studies V1–V5.
   Each is React component(props:{lf,cf,rf,orientation,deg}) rendering one SVG.
   Uses window.FP / FPChip / FPField. Distance labels placed deterministically
   so they never overlap each other or the bearing annotation. */
(function () {
  const FP = window.FP, FPChip = window.FPChip, FPField = window.FPField;
  const e = React.createElement;

  // shared: three distance chips pushed radially out from the rotated poles
  function distChips(C, R, deg, d, off, size) {
    const g = FP.field(C, R);
    const items = [
      { p: FP.out(FP.rot(g.lf, C, deg), C, off), t: FP.strip(d.lf) },
      { p: FP.out(FP.rot(g.cf, C, deg), C, off), t: FP.strip(d.cf) },
      { p: FP.out(FP.rot(g.rf, C, deg), C, off), t: FP.strip(d.rf) }
    ];
    return items.map((it, i) => e(FPChip, { key: "dc" + i, x: it.p[0], y: it.p[1], text: it.t, size: size || 14 }));
  }

  // shared: north reference + swept-angle arc + degree readout (returns array)
  function bearing(C, deg, opts) {
    opts = opts || {};
    const arcR = opts.arcR || 40;
    const Ntip = FP.polar(C, opts.nLen || 72, 0);
    const aN = FP.polar(C, arcR, 0);
    const aAx = FP.polar(C, arcR, deg);
    const arc = "M " + aN[0] + " " + aN[1] + " A " + arcR + " " + arcR + " 0 0 1 " + aAx[0].toFixed(1) + " " + aAx[1].toFixed(1);
    const degPos = FP.polar(C, opts.degR || 58, deg / 2);
    const out = [];
    // north reference (cased)
    out.push(e("line", { key: "nh", x1: C[0], y1: C[1], x2: Ntip[0], y2: Ntip[1], stroke: FP.paperHi, strokeWidth: 3, strokeLinecap: "round", opacity: 0.55 }));
    out.push(e("line", { key: "nl", x1: C[0], y1: C[1], x2: Ntip[0], y2: Ntip[1], stroke: "#48586A", strokeWidth: 1.3, strokeDasharray: "3 3" }));
    out.push(e("circle", { key: "pv", cx: C[0], cy: C[1], r: 2.6, fill: FP.royal }));
    out.push(e("path", { key: "ac", d: arc, fill: "none", stroke: FP.paperHi, strokeWidth: 3, opacity: 0.55 }));
    out.push(e("path", { key: "al", d: arc, fill: "none", stroke: FP.royal, strokeWidth: 1.6 }));
    out.push(e("text", { key: "nt", x: Ntip[0], y: Ntip[1] - 6, textAnchor: "middle", style: { fontFamily: "'Oswald',sans-serif", fontWeight: 700, fontSize: "13px", fill: "#3A4654", letterSpacing: ".06em", paintOrder: "stroke", stroke: FP.paperHi, strokeWidth: "3px", strokeLinejoin: "round" } }, "N"));
    out.push(e(FPChip, { key: "dg", x: degPos[0], y: degPos[1], text: deg + "\u00b0", size: 13, tone: "gold", padX: 7 }));
    return out;
  }

  function Svg(props) {
    return e("svg", { viewBox: "0 0 360 360", style: { width: "100%", height: "auto", display: "block" }, role: "img", "aria-label": props.label },
      e("defs", null, FP.grassDef("g_" + props.gid)),
      props.children
    );
  }

  /* ============ V1 — BEARING COMPASS (refined classic) ============ */
  function V1(props) {
    const C = [180, 188], R = 100, deg = props.deg;
    const g = FP.field(C, R);
    const rHome = FP.rot(g.home, C, deg), rCF = FP.rot(g.cf, C, deg);
    return e(Svg, { gid: "v1", label: "Bearing compass field plan" },
      e(FPField, { C: C, R: R, deg: deg, gradId: "g_v1" }),
      // field center axis (home -> CF)
      e("line", { x1: rHome[0], y1: rHome[1], x2: rCF[0], y2: rCF[1], stroke: FP.paperHi, strokeWidth: 3.6, strokeLinecap: "round", opacity: 0.55 }),
      e("line", { x1: rHome[0], y1: rHome[1], x2: rCF[0], y2: rCF[1], stroke: FP.royal, strokeWidth: 1.6, strokeDasharray: "5 4" }),
      e("circle", { cx: rCF[0], cy: rCF[1], r: 2.6, fill: FP.royal }),
      bearing(C, deg, { nLen: 78, arcR: 42, degR: 60 }),
      distChips(C, R, deg, props, 20, 14)
    );
  }

  /* ============ V2 — COMPASS ROSE RING ============ */
  function V2(props) {
    const C = [180, 180], R = 74, RR = 128, deg = props.deg;
    const ticks = [];
    for (let a = 0; a < 360; a += 10) {
      const big = a % 30 === 0;
      const p1 = FP.polar(C, RR, a), p2 = FP.polar(C, RR - (big ? 12 : 6), a);
      ticks.push(e("line", { key: "t" + a, x1: p1[0], y1: p1[1], x2: p2[0], y2: p2[1], stroke: big ? FP.royal : FP.ruleStrong, strokeWidth: big ? 1.4 : 0.8, opacity: big ? 0.8 : 0.55 }));
    }
    const cards = [["N", 0], ["E", 90], ["S", 180], ["W", 270]].map(([t, a], i) => {
      const p = FP.polar(C, RR + 16, a);
      return e("text", { key: "c" + i, x: p[0], y: p[1] + 5, textAnchor: "middle", style: { fontFamily: "'Oswald',sans-serif", fontWeight: 700, fontSize: "14px", fill: t === "N" ? FP.royal : FP.ink3, letterSpacing: ".05em" } }, t);
    });
    const needleTip = FP.polar(C, RR - 4, deg);
    const aN = FP.polar(C, RR - 22, 0), aAx = FP.polar(C, RR - 22, deg);
    const arc = "M " + aN[0] + " " + aN[1] + " A " + (RR - 22) + " " + (RR - 22) + " 0 0 1 " + aAx[0].toFixed(1) + " " + aAx[1].toFixed(1);
    const degPos = FP.polar(C, RR - 8, deg / 2);
    return e(Svg, { gid: "v2", label: "Compass rose field plan" },
      e("circle", { cx: C[0], cy: C[1], r: RR, fill: "none", stroke: FP.rule, strokeWidth: 1 }),
      e("circle", { cx: C[0], cy: C[1], r: RR - 12, fill: "none", stroke: FP.rule, strokeWidth: 0.6, opacity: 0.6 }),
      ticks, cards,
      e(FPField, { C: C, R: R, deg: deg, gradId: "g_v2" }),
      // swept angle + needle
      e("path", { d: arc, fill: "none", stroke: FP.royal, strokeWidth: 1.6 }),
      e("line", { x1: C[0], y1: C[1], x2: needleTip[0], y2: needleTip[1], stroke: FP.gold, strokeWidth: 2.4, strokeLinecap: "round" }),
      e("polygon", { points: pts(needleTip, deg), fill: FP.goldDeep }),
      e("circle", { cx: C[0], cy: C[1], r: 3.2, fill: FP.royal }),
      distChips(C, R, deg, props, 16, 13),
      e(FPChip, { x: degPos[0], y: degPos[1], text: deg + "\u00b0", size: 13, tone: "gold", padX: 7 })
    );
  }
  // small arrowhead at end of needle pointing along bearing
  function pts(tip, deg) {
    const back = FP.polar([tip[0], tip[1]], 9, deg + 180);
    const l = FP.polar(back, 4, deg - 90), r = FP.polar(back, 4, deg + 90);
    return [tip, l, r].map(p => p[0].toFixed(1) + "," + p[1].toFixed(1)).join(" ");
  }

  /* ============ V3 — PROTRACTOR ============ */
  function V3(props) {
    const C = [180, 206], R = 90, PR = 132, deg = props.deg;
    const ticks = [];
    for (let a = -10; a <= 120; a += 10) {
      const big = a % 30 === 0;
      const p1 = FP.polar(C, PR, a), p2 = FP.polar(C, PR - (big ? 13 : 7), a);
      if (a < 0 || a > 110) continue;
      ticks.push(e("line", { key: "t" + a, x1: p1[0], y1: p1[1], x2: p2[0], y2: p2[1], stroke: big ? FP.royal : FP.ruleStrong, strokeWidth: big ? 1.3 : 0.8, opacity: big ? 0.85 : 0.5 }));
    }
    const nums = [0, 30, 60, 90].map((a, i) => {
      const p = FP.polar(C, PR + 13, a);
      return e("text", { key: "n" + i, x: p[0], y: p[1] + 4, textAnchor: "middle", style: { fontFamily: "'Space Mono',monospace", fontWeight: 700, fontSize: "10px", fill: FP.ink3 } }, a);
    });
    const arcA = FP.polar(C, PR, 0), arcB = FP.polar(C, PR, 110);
    const protArc = "M " + arcA[0] + " " + arcA[1] + " A " + PR + " " + PR + " 0 0 1 " + arcB[0].toFixed(1) + " " + arcB[1].toFixed(1);
    const needleTip = FP.polar(C, PR - 4, deg);
    const degPos = FP.polar(C, PR - 30, deg / 2 + 6);
    return e(Svg, { gid: "v3", label: "Protractor field plan" },
      e(FPField, { C: C, R: R, deg: deg, gradId: "g_v3" }),
      e("path", { d: protArc, fill: "none", stroke: FP.ink3, strokeWidth: 1.1, opacity: 0.6 }),
      ticks, nums,
      e("line", { x1: C[0], y1: C[1], x2: FP.polar(C, PR, 0)[0], y2: FP.polar(C, PR, 0)[1], stroke: "#48586A", strokeWidth: 1.1, strokeDasharray: "3 3" }),
      e("line", { x1: C[0], y1: C[1], x2: needleTip[0], y2: needleTip[1], stroke: FP.royal, strokeWidth: 2, strokeLinecap: "round" }),
      e("polygon", { points: pts(needleTip, deg), fill: FP.royalDeep }),
      e("circle", { cx: C[0], cy: C[1], r: 3, fill: FP.royal }),
      e(FPChip, { x: degPos[0], y: degPos[1], text: deg + "\u00b0", size: 13, tone: "gold", padX: 7 }),
      distChips(C, R, deg, props, 17, 13)
    );
  }

  /* ============ V4 — BLUEPRINT ============ */
  function V4(props) {
    const C = [180, 196], R = 96, deg = props.deg;
    const g = FP.field(C, R);
    const rh = FP.rot(g.home, C, deg);
    const poles = { lf: FP.rot(g.lf, C, deg), cf: FP.rot(g.cf, C, deg), rf: FP.rot(g.rf, C, deg) };
    function dim(p, key, val) {
      const mid = [(rh[0] + p[0]) / 2, (rh[1] + p[1]) / 2];
      return e("g", { key: key },
        e("line", { x1: rh[0], y1: rh[1], x2: p[0], y2: p[1], stroke: FP.blueLine, strokeWidth: 0.9, opacity: 0.85 }),
        e("circle", { cx: p[0], cy: p[1], r: 2, fill: FP.blueLine }),
        e("rect", { x: mid[0] - 19, y: mid[1] - 9, width: 38, height: 18, rx: 1.5, fill: FP.blue, stroke: FP.blueDim, strokeWidth: 0.8 }),
        e("text", { x: mid[0], y: mid[1] + 4, textAnchor: "middle", style: { fontFamily: "'Space Mono',monospace", fontWeight: 700, fontSize: "11px", fill: FP.blueLine } }, val)
      );
    }
    // north arrow top-right
    const naC = [312, 56];
    return e("svg", { viewBox: "0 0 360 360", style: { width: "100%", height: "auto", display: "block", background: FP.blue }, role: "img", "aria-label": "Blueprint field plan" },
      // grid
      gridLines(FP.blueDim, 0.18),
      e(FPField, { C: C, R: R, deg: deg, lineOnly: true, stroke: FP.blueLine, sw: 1.4 }),
      dim(poles.lf, "lf", FP.strip(props.lf)),
      dim(poles.cf, "cf", FP.strip(props.cf)),
      dim(poles.rf, "rf", FP.strip(props.rf)),
      // north arrow
      e("line", { x1: naC[0], y1: naC[1] + 22, x2: naC[0], y2: naC[1] - 18, stroke: FP.blueLine, strokeWidth: 1.4 }),
      e("polygon", { points: (naC[0]) + "," + (naC[1] - 24) + " " + (naC[0] - 5) + "," + (naC[1] - 12) + " " + (naC[0] + 5) + "," + (naC[1] - 12), fill: FP.blueLine }),
      e("text", { x: naC[0], y: naC[1] + 36, textAnchor: "middle", style: { fontFamily: "'Oswald',sans-serif", fontWeight: 700, fontSize: "13px", fill: FP.blueLine } }, "N"),
      // bearing callout
      e("text", { x: 28, y: 44, style: { fontFamily: "'Space Mono',monospace", fontWeight: 700, fontSize: "16px", fill: "#CFE4FA", letterSpacing: ".04em" } }, "N " + deg + "\u00b0 E"),
      e("text", { x: 28, y: 60, style: { fontFamily: "'Oswald',sans-serif", fontWeight: 500, fontSize: "10px", fill: FP.blueDim, letterSpacing: ".22em" } }, "FIELD BEARING")
    );
  }
  function gridLines(color, op) {
    const out = [];
    for (let i = 0; i <= 360; i += 30) {
      out.push(e("line", { key: "gx" + i, x1: i, y1: 0, x2: i, y2: 360, stroke: color, strokeWidth: 0.5, opacity: op }));
      out.push(e("line", { key: "gy" + i, x1: 0, y1: i, x2: 360, y2: i, stroke: color, strokeWidth: 0.5, opacity: op }));
    }
    return out;
  }

  /* ============ V5 — COMPASS DIAL INSET (upright field) ============ */
  function V5(props) {
    const C = [172, 196], R = 104, deg = props.deg;
    const g = FP.field(C, R);
    // upright field: labels straight out
    const labels = [
      { p: [g.lf[0] - 22, g.lf[1]], t: FP.strip(props.lf) },
      { p: [g.cf[0], g.cf[1] - 18], t: FP.strip(props.cf) },
      { p: [g.rf[0] + 22, g.rf[1]], t: FP.strip(props.rf) }
    ];
    // dial top-right
    const dC = [308, 56], dR = 34;
    const dticks = [];
    for (let a = 0; a < 360; a += 30) {
      const p1 = FP.polar(dC, dR, a), p2 = FP.polar(dC, dR - 5, a);
      dticks.push(e("line", { key: "d" + a, x1: p1[0], y1: p1[1], x2: p2[0], y2: p2[1], stroke: FP.ruleStrong, strokeWidth: 0.8 }));
    }
    const needle = FP.polar(dC, dR - 6, deg);
    return e(Svg, { gid: "v5", label: "Field plan with compass dial" },
      e(FPField, { C: C, R: R, deg: 0, gradId: "g_v5" }),
      labels.map((l, i) => e(FPChip, { key: "l" + i, x: l.p[0], y: l.p[1], text: l.t, size: 14 })),
      // dial
      e("circle", { cx: dC[0], cy: dC[1], r: dR, fill: FP.paperHi, stroke: FP.rule, strokeWidth: 1 }),
      dticks,
      e("text", { x: dC[0], y: dC[1] - dR + 11, textAnchor: "middle", style: { fontFamily: "'Oswald',sans-serif", fontWeight: 700, fontSize: "9px", fill: FP.royal } }, "N"),
      e("line", { x1: dC[0], y1: dC[1], x2: needle[0], y2: needle[1], stroke: FP.gold, strokeWidth: 2.2, strokeLinecap: "round" }),
      e("polygon", { points: pts(needle, deg), fill: FP.goldDeep }),
      e("circle", { cx: dC[0], cy: dC[1], r: 2.4, fill: FP.royal }),
      e("text", { x: dC[0], y: dC[1] + dR + 16, textAnchor: "middle", style: { fontFamily: "'Space Mono',monospace", fontWeight: 700, fontSize: "12px", fill: FP.ink } }, props.orientation + " \u00b7 " + deg + "\u00b0")
    );
  }

  window.FPVariantsA = { V1, V2, V3, V4, V5 };
})();
