/* minute-maid-protractor.jsx — Minute Maid Park "field orientation" instrument.
   The book-standard protractor graphic: a half-circle scale reads the field-axis
   bearing off true north, and the little ballpark is rotated to match
   (NNW, 343deg). One graphic carries BOTH the field geometry (LF/CF/RF) and the
   orientation, so it replaces the old FieldInstrument + Compass pair.
   MMP palette — navy needle, orange arrow + signal, brick/clay infield, grass.
   Props: lf, cf, rf, orientation, degrees. Exposes window.MMPProtractor.
   Local data only. */
(function () {
  const e = React.createElement;

  const ink = "#211D17", ink2 = "#524A3C", ink3 = "#8A816E",
        navy = "#0E2A47", navyDeep = "#0A1E33", orange = "#D9641C",
        brick = "#9C3A2A", grass = "#6E8758", grassHi = "#7E9866",
        clay = "#C0925A", clayEdge = "#A6793F", wallInk = "#3E4A38",
        paperHi = "#F4ECDA", rule = "#C6B99E", ruleStrong = "#A4967A";

  const MONO = "'Space Mono', monospace";
  const SANS = "'Oswald', sans-serif";

  function rot(p, C, deg) {
    const t = deg * Math.PI / 180, c = Math.cos(t), s = Math.sin(t);
    const dx = p[0] - C[0], dy = p[1] - C[1];
    return [C[0] + dx * c - dy * s, C[1] + dx * s + dy * c];
  }
  function out(p, C, o) {
    const dx = p[0] - C[0], dy = p[1] - C[1], len = Math.hypot(dx, dy) || 1;
    return [p[0] + dx / len * o, p[1] + dy / len * o];
  }
  function polar(C, r, a) { const t = a * Math.PI / 180; return [C[0] + r * Math.sin(t), C[1] - r * Math.cos(t)]; }
  function strip(v) { return (v || "").toString().replace(" ft", ""); }
  function bearing(a) { return ((Math.round(a) % 360) + 360) % 360; }

  function Chip(props) {
    const fs = props.size || 13, w = Math.max(props.minW || 0, props.text.length * fs * 0.64 + (props.padX || 8) * 2), h = props.h || Math.round(fs * 1.42);
    const tone = props.tone || "paper";
    const fill = tone === "accent" ? navy : paperHi, stk = tone === "accent" ? navyDeep : ruleStrong, col = tone === "accent" ? paperHi : ink;
    return e("g", null,
      e("rect", { x: props.x - w / 2, y: props.y - h / 2, width: w, height: h, rx: 2, fill: fill, stroke: stk, strokeWidth: 1 }),
      e("text", { x: props.x, y: props.y + fs * 0.35, textAnchor: "middle", style: { fontFamily: MONO, fontWeight: 700, fontSize: fs + "px", fill: col } }, props.text)
    );
  }

  function MMPProtractor(props) {
    const deg = (props.degrees != null) ? props.degrees : 343;
    const orientation = props.orientation || "NNW";
    const C = [180, 196], R = 80, PR = 118;
    const home = [C[0], C[1] + R], cf = [C[0], C[1] - R], lf = [C[0] - R, C[1]], rf = [C[0] + R, C[1]];
    const d = R * 0.30;
    const b1 = [C[0] + d, C[1] + R - d], b2 = [C[0], C[1] + R - 2 * d], b3 = [C[0] - d, C[1] + R - d];
    const grassPath = "M " + home[0] + " " + home[1] + " L " + lf[0] + " " + lf[1] + " A " + R + " " + R + " 0 0 1 " + rf[0] + " " + rf[1] + " Z";
    const dia = "M " + home[0] + " " + home[1] + " L " + b1[0] + " " + b1[1] + " L " + b2[0] + " " + b2[1] + " L " + b3[0] + " " + b3[1] + " Z";

    // scale spanning the NW quadrant near north so the NNW (343 = -17) bearing is enclosed
    const A0 = -60, A1 = 30;
    const ticks = [];
    for (let a = A0; a <= A1; a += 10) {
      const big = a % 30 === 0;
      const p1 = polar(C, PR, a), p2 = polar(C, PR - (big ? 12 : 6), a);
      ticks.push(e("line", { key: "t" + a, x1: p1[0], y1: p1[1], x2: p2[0], y2: p2[1], stroke: big ? ink : ruleStrong, strokeWidth: big ? 1.3 : 0.8, opacity: big ? 0.9 : 0.5 }));
    }
    const nums = [-60, -30, 30].map((a, i) => {
      const p = polar(C, PR + 13, a);
      return e("text", { key: "n" + i, x: p[0], y: p[1] + 5, textAnchor: "middle", style: { fontFamily: MONO, fontWeight: 700, fontSize: "13px", fill: ink3 } }, bearing(a));
    });
    const arcA = polar(C, PR, A0), arcB = polar(C, PR, A1);
    const protArc = "M " + arcA[0].toFixed(1) + " " + arcA[1].toFixed(1) + " A " + PR + " " + PR + " 0 0 1 " + arcB[0].toFixed(1) + " " + arcB[1].toFixed(1);
    const ntip = polar(C, PR + 16, deg);
    const back = polar(ntip, 9, deg + 180), hl = polar(back, 4.5, deg - 90), hr = polar(back, 4.5, deg + 90);
    const head = [ntip, hl, hr].map(p => p[0].toFixed(1) + "," + p[1].toFixed(1)).join(" ");
    const bc = window.FieldLabels.bearingChip(C, PR + 16, deg, 46, 22);
    const nlab = polar(C, PR + 13, 0);

    const chips = [
      { p: out(rot(lf, C, deg), C, 16), t: strip(props.lf) },
      { p: window.FieldLabels.cfWallPoint(C, R, deg), t: strip(props.cf) },
      { p: out(rot(rf, C, deg), C, 16), t: strip(props.rf) }
    ];

    return e("div", { className: "mm-protwrap" },
      e("svg", { viewBox: "40 32 280 258", className: "mm-fig", role: "img",
        "aria-label": "Field geometry & orientation plate: LF " + props.lf + ", CF " + props.cf + ", RF " + props.rf + " feet; oriented " + orientation + " " + deg + " degrees" },
        e("defs", null,
          e("linearGradient", { id: "mmpProtGrass", x1: "0", y1: "0", x2: "0", y2: "1" },
            e("stop", { offset: "0", stopColor: grassHi }), e("stop", { offset: "1", stopColor: grass }))),
        // field group (rotated to true bearing)
        e("g", { transform: "rotate(" + deg + " " + C[0] + " " + C[1] + ")" },
          e("path", { d: grassPath, fill: "url(#mmpProtGrass)", stroke: wallInk, strokeWidth: 1.5, strokeLinejoin: "round" }),
          e("path", { d: dia, fill: clay, stroke: clayEdge, strokeWidth: 1, strokeLinejoin: "round", opacity: 0.92 })),
        // protractor arc + ticks + numerals
        e("path", { d: protArc, fill: "none", stroke: ink3, strokeWidth: 1, opacity: 0.55 }),
        ticks, nums,
        e("text", { x: nlab[0], y: nlab[1] - 8, textAnchor: "middle", style: { fontFamily: SANS, fontWeight: 700, fontSize: "13px", fill: ink, letterSpacing: ".04em" } }, "N"),
        // north baseline (0 deg) + bearing needle
        e("line", { x1: C[0], y1: C[1], x2: polar(C, PR, 0)[0], y2: polar(C, PR, 0)[1], stroke: ink2, strokeWidth: 1, strokeDasharray: "3 3" }),
        e("line", { x1: C[0], y1: C[1], x2: ntip[0], y2: ntip[1], stroke: navy, strokeWidth: 2.1, strokeLinecap: "round" }),
        e("polygon", { points: head, fill: orange }),
        e("circle", { cx: C[0], cy: C[1], r: 3, fill: navy }),
        e(Chip, { x: bc.x, y: bc.y, text: deg + "\u00b0 " + orientation, size: 19, tone: "accent", padX: 6 }),
        // distance chips
        chips.map((c, i) => e(Chip, { key: "d" + i, x: c.p[0], y: c.p[1], text: c.t, size: 19 }))
      )
    );
  }

  window.MMPProtractor = MMPProtractor;
})();
