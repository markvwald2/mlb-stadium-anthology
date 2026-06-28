/* anaheim-field.jsx — Angel Stadium field instrument.
   A compact protractor: a quarter-scale reads the field-axis bearing off true
   north (ENE, 65 deg), a small diamond is rotated to match, and the LF/CF/RF
   distances ride the corners. Survey-tool aesthetic, ~1 in square, deliberately
   subordinate. Big-A palette: navy needle, red head, restrained grass wedge.
   Props: lf, cf, rf, abbr, degrees, accent. Exposes window.AnaheimField. */
(function () {
  const e = React.createElement;

  const ink = "#23211C", navy = "#0E2A4A", red = "#B0122B",
        grass = "#7C8E66", grassHi = "#8C9C74", clay = "#C7A878", clayEdge = "#AE8C57",
        rule = "#C6BCA6", ruleStrong = "#A99C80", ink3 = "#8C8470", paperHi = "#F3ECDB";

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

  function Chip(props) {
    const fs = props.size || 11, w = props.boxW || (props.text.length * fs * 0.66 + 12), h = 17;
    const tone = props.tone || "paper";
    const fill = tone === "accent" ? navy : paperHi, stk = tone === "accent" ? navy : ruleStrong,
          col = tone === "accent" ? paperHi : ink;
    return e("g", null,
      e("rect", { x: props.x - w / 2, y: props.y - h / 2, width: w, height: h, rx: 1.5, fill: fill, stroke: stk, strokeWidth: 1 }),
      e("text", { x: props.x, y: props.y + fs * 0.35, textAnchor: "middle",
        style: { fontFamily: "'Space Mono', monospace", fontWeight: 700, fontSize: fs + "px", fill: col } }, props.text));
  }

  function AnaheimField(props) {
    const deg = (props.degrees != null) ? props.degrees : 65;
    const abbr = props.abbr || "ENE";
    const C = [118, 124], R = 56, PR = 80;
    const home = [C[0], C[1] + R], cf = [C[0], C[1] - R], lf = [C[0] - R, C[1]], rf = [C[0] + R, C[1]];
    const d = R * 0.30;
    const b1 = [C[0] + d, C[1] + R - d], b2 = [C[0], C[1] + R - 2 * d], b3 = [C[0] - d, C[1] + R - d];
    const grassPath = "M " + home[0] + " " + home[1] + " L " + lf[0] + " " + lf[1] +
      " A " + R + " " + R + " 0 0 1 " + rf[0] + " " + rf[1] + " Z";
    const dia = "M " + home[0] + " " + home[1] + " L " + b1[0] + " " + b1[1] +
      " L " + b2[0] + " " + b2[1] + " L " + b3[0] + " " + b3[1] + " Z";

    // protractor scale spanning 0..90 so the ENE (65) bearing is enclosed
    const ticks = [];
    for (let a = 0; a <= 90; a += 10) {
      const big = a % 30 === 0;
      const p1 = polar(C, PR, a), p2 = polar(C, PR - (big ? 11 : 6), a);
      ticks.push(e("line", { key: "t" + a, x1: p1[0], y1: p1[1], x2: p2[0], y2: p2[1],
        stroke: big ? ink : ruleStrong, strokeWidth: big ? 1.2 : 0.8, opacity: big ? 0.9 : 0.5 }));
    }
    const nums = [0, 30, 60, 90].map((a, i) => {
      const p = polar(C, PR + 11, a);
      return e("text", { key: "n" + i, x: p[0], y: p[1] + 3.5, textAnchor: "middle",
        style: { fontFamily: "'Space Mono',monospace", fontWeight: 700, fontSize: "10px", fill: ink3 } }, a);
    });
    const arcA = polar(C, PR, 0), arcB = polar(C, PR, 90);
    const protArc = "M " + arcA[0].toFixed(1) + " " + arcA[1].toFixed(1) +
      " A " + PR + " " + PR + " 0 0 1 " + arcB[0].toFixed(1) + " " + arcB[1].toFixed(1);
    const ntip = polar(C, PR + 26, deg);
    const back = polar(ntip, 8, deg + 180), hl = polar(back, 4, deg - 90), hr = polar(back, 4, deg + 90);
    const head = [ntip, hl, hr].map(p => p[0].toFixed(1) + "," + p[1].toFixed(1)).join(" ");
    const degPos = [201, 34];
    const nlab = polar(C, PR + 11, 0);

    const chips = [
      { p: out(rot(lf, C, deg), C, 13), t: props.lf },
      { p: rot(cf, C, deg), t: props.cf },
      { p: out(rot(rf, C, deg), C, 13), t: props.rf }
    ];

    return e("svg", { viewBox: "20 22 226 192", className: "as-fieldsvg", role: "img",
        "aria-label": "Field plan, oriented " + abbr + " " + deg + " degrees, LF " + props.lf + " CF " + props.cf + " RF " + props.rf },
      e("defs", null,
        e("linearGradient", { id: "asGrass", x1: "0", y1: "0", x2: "0", y2: "1" },
          e("stop", { offset: "0", stopColor: grassHi }), e("stop", { offset: "1", stopColor: grass }))),
      e("g", { transform: "translate(0 12.7)" },
        e("g", { transform: "rotate(" + deg + " " + C[0] + " " + C[1] + ")" },
          e("path", { d: grassPath, fill: "url(#asGrass)", stroke: "#4F5C42", strokeWidth: 1.3, strokeLinejoin: "round" }),
          e("path", { d: dia, fill: clay, stroke: clayEdge, strokeWidth: 1, strokeLinejoin: "round", opacity: 0.92 })),
        e("path", { d: protArc, fill: "none", stroke: ink3, strokeWidth: 1, opacity: 0.55 }),
        ticks, nums,
        e("text", { x: nlab[0], y: nlab[1] - 7, textAnchor: "middle",
          style: { fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: "11px", fill: ink, letterSpacing: ".04em" } }, "N"),
        e("line", { x1: C[0], y1: C[1], x2: polar(C, PR, 0)[0], y2: polar(C, PR, 0)[1], stroke: ink3, strokeWidth: 1, strokeDasharray: "3 3" }),
        e("line", { x1: C[0], y1: C[1], x2: ntip[0], y2: ntip[1], stroke: navy, strokeWidth: 2, strokeLinecap: "round" }),
        e("polygon", { points: head, fill: red }),
        e("circle", { cx: C[0], cy: C[1], r: 2.6, fill: navy }),
        chips.map((c, i) => e(Chip, { key: "d" + i, x: c.p[0], y: c.p[1], text: c.t, size: 11 }))),
      e(Chip, { x: degPos[0], y: degPos[1], text: deg + "\u00b0 " + abbr, size: 10, tone: "accent", boxW: 71 }));
  }

  window.AnaheimField = AnaheimField;
})();
