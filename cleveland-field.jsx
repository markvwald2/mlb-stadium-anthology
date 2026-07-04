/* cleveland-field.jsx — "Lakefront Civic Datum" field instruments for
   Cleveland Municipal Stadium. Two exports:
     window.ClevelandFieldPlan  — large low-opacity SYMMETRIC field-geometry
                                  plan (322 / 400 / 322), the vast oval bowl,
                                  used as a faint drafting watermark.
     window.ClevelandProtractor — compact protractor orientation instrument
                                  (~1 in), field axis read off true north at NE / 45°.
   Drawn from window.CMS geometry. Local data only; no invented values. */
(function () {
  const e = React.createElement;

  // Lakefront civic palette: weathered-steel drafting lines, charcoal, navy, muted red.
  const ink = "#1B1A17", line = "#5C6B78", lineSoft = "#8C97A1",
        navy = "#0C2340", red = "#A4332B", redBright = "#C8102E",
        paper = "#E7E1D2", rule = "#C7BFAC", ink3 = "#847F74";

  function strip(v) { return (v || "").toString().replace(" ft", ""); }
  function polar(C, r, a) { const t = a * Math.PI / 180; return [C[0] + r * Math.sin(t), C[1] - r * Math.cos(t)]; }

  /* ---------- Large symmetric field plan (watermark) ---------- */
  function ClevelandFieldPlan(props) {
    const stroke = props.stroke || line;
    const op = props.opacity != null ? props.opacity : 1;
    // home plate bottom-center; symmetric bowl, deep CF. 322 / 400 / 322.
    const home = [300, 470];
    const lfPole = [150, 320];   // 322 ft
    const lfAlley = [206, 214];
    const cf = [300, 150];       // 400 ft — deep, centered
    const rfAlley = [394, 214];
    const rfPole = [450, 320];   // 322 ft
    // symmetric outfield wall — broad oval sweep
    const wall =
      "M " + lfPole[0] + " " + lfPole[1] +
      " Q 196 232 " + lfAlley[0] + " " + lfAlley[1] +
      " Q 250 156 " + cf[0] + " " + cf[1] +
      " Q 350 156 " + rfAlley[0] + " " + rfAlley[1] +
      " Q 404 232 " + rfPole[0] + " " + rfPole[1];
    const fair =
      "M " + home[0] + " " + home[1] +
      " L " + lfPole[0] + " " + lfPole[1] +
      " Q 196 232 " + lfAlley[0] + " " + lfAlley[1] +
      " Q 250 156 " + cf[0] + " " + cf[1] +
      " Q 350 156 " + rfAlley[0] + " " + rfAlley[1] +
      " Q 404 232 " + rfPole[0] + " " + rfPole[1] +
      " L " + home[0] + " " + home[1] + " Z";
    // the vast civic OVAL bowl enclosing the field (the building footprint)
    const bowl = "M 300 86 C 470 86 542 250 542 372 C 542 520 410 560 300 560 C 190 560 58 520 58 372 C 58 250 130 86 300 86 Z";
    // infield diamond
    const d = 52;
    const first = [home[0] + d, home[1] - d], second = [home[0], home[1] - 2 * d], third = [home[0] - d, home[1] - d];
    const dia = "M " + home[0] + " " + home[1] + " L " + first[0] + " " + first[1] +
                " L " + second[0] + " " + second[1] + " L " + third[0] + " " + third[1] + " Z";

    function fchip(p, t, key) {
      const w = t.length * 11 + 14, h = 22;
      return e("g", { key: key },
        e("rect", { x: p[0] - w / 2, y: p[1] - h / 2, width: w, height: h, fill: paper, stroke: stroke, strokeWidth: 1, rx: 1 }),
        e("text", { x: p[0], y: p[1] + 5, textAnchor: "middle",
          style: { fontFamily: "'Space Mono',monospace", fontWeight: 700, fontSize: "15px", fill: stroke, letterSpacing: ".01em" } }, t));
    }

    return e("svg", { viewBox: "40 70 520 520", className: props.className, "aria-hidden": "true",
      style: { opacity: op, overflow: "visible" } },
      // civic oval bowl footprint (very faint)
      e("path", { d: bowl, fill: "none", stroke: stroke, strokeWidth: 2, opacity: 0.55 }),
      e("path", { d: bowl, fill: stroke, fillOpacity: 0.04, stroke: "none", style: { transform: "scale(0.9)", transformOrigin: "300px 320px" } }),
      // grass/fair region — faint
      e("path", { d: fair, fill: stroke, fillOpacity: 0.06, stroke: "none" }),
      // foul lines
      e("line", { x1: home[0], y1: home[1], x2: lfPole[0], y2: lfPole[1], stroke: stroke, strokeWidth: 1.3 }),
      e("line", { x1: home[0], y1: home[1], x2: rfPole[0], y2: rfPole[1], stroke: stroke, strokeWidth: 1.3 }),
      // outfield wall
      e("path", { d: wall, fill: "none", stroke: stroke, strokeWidth: 2, strokeLinejoin: "round", strokeLinecap: "round" }),
      // infield
      e("path", { d: dia, fill: "none", stroke: stroke, strokeWidth: 1.2 }),
      e("circle", { cx: home[0], cy: home[1] - d, r: 12, fill: "none", stroke: stroke, strokeWidth: 1 }),
      // distance chips
      fchip([lfPole[0] - 2, lfPole[1] - 16], strip(props.lf), "lf"),
      fchip([cf[0], cf[1] - 18], strip(props.cf), "cf"),
      fchip([rfPole[0] + 2, rfPole[1] - 16], strip(props.rf), "rf")
    );
  }

  /* ---------- Compact protractor orientation instrument ---------- */
  function ClevelandProtractor(props) {
    const deg = props.degrees != null ? props.degrees : 45;
    const orientation = props.orientation || "NE";
    const C = [96, 100], R = 56, PR = 74;
    // small symmetric ballpark glyph
    const home = [C[0], C[1] + R * 0.6], cf = [C[0], C[1] - R * 0.62],
          lf = [C[0] - R * 0.62, C[1] + R * 0.02], rf = [C[0] + R * 0.62, C[1] + R * 0.02];
    const grass = "M " + home[0] + " " + home[1] + " L " + lf[0] + " " + lf[1] +
                  " A " + (R * 0.62) + " " + (R * 0.62) + " 0 0 1 " + rf[0] + " " + rf[1] + " Z";
    const ticks = [];
    for (let a = 0; a <= 90; a += 15) {
      const big = a % 45 === 0;
      const p1 = polar(C, PR, a), p2 = polar(C, PR - (big ? 9 : 5), a);
      ticks.push(e("line", { key: "t" + a, x1: p1[0], y1: p1[1], x2: p2[0], y2: p2[1],
        stroke: big ? ink : lineSoft, strokeWidth: big ? 1.2 : 0.8 }));
    }
    const nums = [0, 45, 90].map((a, i) => {
      const p = polar(C, PR + 12, a);
      return e("text", { key: "n" + i, x: p[0], y: p[1] + 3.5, textAnchor: "middle",
        style: { fontFamily: "'Space Mono',monospace", fontWeight: 700, fontSize: "13px", fill: ink3 } }, a);
    });
    const arcA = polar(C, PR, 0), arcB = polar(C, PR, 90);
    const arc = "M " + arcA[0] + " " + arcA[1] + " A " + PR + " " + PR + " 0 0 1 " + arcB[0].toFixed(1) + " " + arcB[1].toFixed(1);
    const ntip = polar(C, PR + 4, deg);
    const nlab = polar(C, PR + 13, 0);
    const dlab = polar(C, PR + 22, deg);

    return e("svg", { viewBox: "6 4 180 132", className: props.className, role: "img",
      "aria-label": "Field orientation " + orientation + " " + deg + " degrees", style: { overflow: "visible" } },
      e("g", { transform: "rotate(" + deg + " " + C[0] + " " + C[1] + ")" },
        e("path", { d: grass, fill: navy, fillOpacity: 0.14, stroke: navy, strokeWidth: 1.3, strokeLinejoin: "round" }),
        e("line", { x1: home[0], y1: home[1], x2: lf[0], y2: lf[1], stroke: navy, strokeWidth: 0.9 }),
        e("line", { x1: home[0], y1: home[1], x2: rf[0], y2: rf[1], stroke: navy, strokeWidth: 0.9 })
      ),
      e("path", { d: arc, fill: "none", stroke: ink3, strokeWidth: 1 }),
      ticks, nums,
      e("text", { x: nlab[0], y: nlab[1] - 4, textAnchor: "middle",
        style: { fontFamily: "'Oswald',sans-serif", fontWeight: 700, fontSize: "13px", fill: ink } }, "N"),
      // north baseline + bearing needle
      e("line", { x1: C[0], y1: C[1], x2: polar(C, PR, 0)[0], y2: polar(C, PR, 0)[1], stroke: ink3, strokeWidth: 0.9, strokeDasharray: "2.5 2.5" }),
      e("line", { x1: C[0], y1: C[1], x2: ntip[0], y2: ntip[1], stroke: red, strokeWidth: 2, strokeLinecap: "round" }),
      e("circle", { cx: ntip[0], cy: ntip[1], r: 2.6, fill: red }),
      e("circle", { cx: C[0], cy: C[1], r: 2.4, fill: ink }),
      e("text", { x: dlab[0], y: dlab[1] + 4, textAnchor: "middle",
        style: { fontFamily: "'Space Mono',monospace", fontWeight: 700, fontSize: "13px", fill: red } }, deg + "\u00b0")
    );
  }

  window.ClevelandFieldPlan = ClevelandFieldPlan;
  window.ClevelandProtractor = ClevelandProtractor;
})();
