/* dodger-protractor.jsx — Dodger Stadium field geometry, drawn as restrained
   ARCHITECTURAL NOTATION rather than a baseball graphic: a thin drafting plan of
   the playing field rotated to its true bearing, a dashed true-north reference,
   and a single blue axis line showing the field points NNE at 26 deg east of
   north. LF / CF / RF read as fine mono dimension labels. Charcoal line-work on
   the concrete sheet; one trace of Dodger blue for the axis. Very small, very
   restrained. Props: lf, cf, rf, orientation, degrees. Exposes
   window.DodgerProtractor. Local data only. */
(function () {
  const e = React.createElement;
  const INK = "#2A2620", STEEL = "#9A8E76", FAINT = "#C9BFA8", BLUE = "#1B4B86", INK2 = "#6B655A";

  function rot(p, C, deg) {
    const t = deg * Math.PI / 180, c = Math.cos(t), s = Math.sin(t);
    const dx = p[0] - C[0], dy = p[1] - C[1];
    return [C[0] + dx * c - dy * s, C[1] + dx * s + dy * c];
  }
  // angle measured clockwise from straight-up (north)
  function polar(C, r, a) { const t = a * Math.PI / 180; return [C[0] + r * Math.sin(t), C[1] - r * Math.cos(t)]; }
  function strip(v) { return (v || "").toString().replace(" ft", ""); }
  function f(p) { return p[0].toFixed(1) + " " + p[1].toFixed(1); }

  function DodgerProtractor(props) {
    const deg = (props.degrees != null) ? props.degrees : 0;
    const orientation = props.orientation || "NNE";
    const C = [118, 150], R = 92;
    const fl = R * 0.707;
    const home = C;
    const left = [C[0] - fl, C[1] - fl];
    const right = [C[0] + fl, C[1] - fl];
    const cf = [C[0], C[1] - R];
    // infield diamond
    const d = R * 0.26;
    const b1 = [C[0] + d, C[1] - d], b2 = [C[0], C[1] - 2 * d], b3 = [C[0] - d, C[1] - d];

    const arc = "M " + f(left) + " A " + R + " " + R + " 0 0 1 " + f(right);
    const grass = "M " + f(home) + " L " + f(left) + " A " + R + " " + R + " 0 0 1 " + f(right) + " Z";
    const dia = "M " + f(home) + " L " + f(b1) + " L " + f(b2) + " L " + f(b3) + " Z";

    // arc ticks
    const ticks = [];
    for (let a = -45; a <= 45; a += 7.5) {
      const big = Math.abs(a) % 45 === 0 || a === 0;
      const p1 = polar(C, R, a), p2 = polar(C, R + (big ? 7 : 4), a);
      ticks.push(e("line", { key: "tk" + a, x1: p1[0], y1: p1[1], x2: p2[0], y2: p2[1], stroke: STEEL, strokeWidth: big ? 1 : 0.7 }));
    }

    // true north reference (dashed, vertical) + axis (blue, rotated by deg)
    const northTip = [C[0], C[1] - R - 30];
    const axisTip = polar(C, R + 30, deg);
    const at1 = polar(C, R + 30, deg), atL = polar(at1, 7, deg + 152), atR = polar(at1, 7, deg - 152);
    // small bearing arc between north and axis
    const bArcA = polar(C, 30, 0), bArcB = polar(C, 30, deg);
    const bArc = "M " + f(bArcA) + " A 30 30 0 0 1 " + f(bArcB);

    // distance label anchors (rotated field), pushed outward
    function lab(pt, ox, oy) { const r = rot(pt, C, deg); return [r[0] + ox, r[1] + oy]; }
    const lLF = lab(left, -2, 13), lCF = lab(cf, 0, -8), lRF = lab(right, 2, 13);

    const mono = (size, fill, weight) => ({ fontFamily: "'Space Mono', monospace", fontSize: size + "px", fill: fill, fontWeight: weight || 400, letterSpacing: ".02em" });

    return e("svg", { viewBox: "0 0 236 214", className: "ds-fig", role: "img",
        "aria-label": "Field plan, axis " + orientation + " " + deg + " degrees, LF " + props.lf + " CF " + props.cf + " RF " + props.rf },
      // rotated field plan (thin line-work)
      e("g", { transform: "rotate(" + deg + " " + C[0] + " " + C[1] + ")" },
        e("path", { d: grass, fill: FAINT, fillOpacity: 0.5, stroke: INK, strokeWidth: 1.3, strokeLinejoin: "round" }),
        e("path", { d: dia, fill: "none", stroke: INK2, strokeWidth: 1, strokeLinejoin: "round" }),
        e("circle", { cx: home[0], cy: home[1], r: 1.8, fill: INK })),
      ticks,
      // true north reference
      e("line", { x1: C[0], y1: C[1], x2: northTip[0], y2: northTip[1], stroke: INK2, strokeWidth: 0.9, strokeDasharray: "3 3" }),
      e("path", { d: "M " + C[0] + " " + (northTip[1] - 1) + " l -3.3 7 l 3.3 -2.6 l 3.3 2.6 z", fill: INK2 }),
      e("text", { x: C[0], y: northTip[1] - 6, textAnchor: "middle", style: mono(10, INK, 700) }, "N"),
      // field axis (blue) + arrowhead
      e("line", { x1: C[0], y1: C[1], x2: axisTip[0], y2: axisTip[1], stroke: BLUE, strokeWidth: 1.6 }),
      e("polygon", { points: f(at1).replace(" ", ",") + " " + f(atL).replace(" ", ",") + " " + f(atR).replace(" ", ","), fill: BLUE }),
      // bearing notation
      e("path", { d: bArc, fill: "none", stroke: BLUE, strokeWidth: 0.9 }),
      e("text", { x: C[0] + 36, y: C[1] - 30, style: mono(9.5, BLUE, 700) }, deg + "\u00b0 " + orientation),
      // distance dimension labels
      e("text", { x: lLF[0], y: lLF[1], textAnchor: "middle", style: mono(10.5, INK, 700) }, strip(props.lf)),
      e("text", { x: lCF[0], y: lCF[1], textAnchor: "middle", style: mono(10.5, INK, 700) }, strip(props.cf)),
      e("text", { x: lRF[0], y: lRF[1], textAnchor: "middle", style: mono(10.5, INK, 700) }, strip(props.rf)),
      // tiny LF/CF/RF keys under the diagram
      e("text", { x: C[0], y: 206, textAnchor: "middle", style: mono(7.5, INK2, 400) }, "LF \u00b7 CF \u00b7 RF  (FT)")
    );
  }

  window.DodgerProtractor = DodgerProtractor;
})();
