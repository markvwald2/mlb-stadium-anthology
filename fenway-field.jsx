/* fenway-field.jsx — Fenway Park field instrument.
   A small survey/protractor drawn for the dark green steel panel: cream scale,
   restrained Red Sox-red bearing needle reading the NE / 45-degree field axis off
   true north, and an ASYMMETRIC outfield fan whose wall points are placed at radii
   proportional to the real distances (LF 310 / CF 389 / RF 302) so Fenway's deep
   center and short right field read immediately. The left-field wall is drawn as a
   heavier "Green Monster" segment (a named feature in the facade data — no invented
   numbers). Props: lf, cf, rf, orientation, bearing. Exposes window.FenwayField. */
(function () {
  const e = React.createElement;

  // palette for placement ON the dark green steel panel
  const cream = "#E7DEC6", creamDim = "rgba(231,222,198,.55)", creamFaint = "rgba(231,222,198,.32)";
  const grass = "#1E3A26", grassHi = "#27492F", clay = "#A86E3C", clayEdge = "#7F4F2A";
  const monster = "#3C6B45", wallInk = "#0F2417";
  const red = "#C24049", inkChip = "#13281A";

  function polar(C, r, aDeg) { const t = aDeg * Math.PI / 180; return [C[0] + r * Math.sin(t), C[1] - r * Math.cos(t)]; }
  function rot(p, C, deg) {
    const t = deg * Math.PI / 180, c = Math.cos(t), s = Math.sin(t);
    const dx = p[0] - C[0], dy = p[1] - C[1];
    return [C[0] + dx * c - dy * s, C[1] + dx * s + dy * c];
  }

  function Chip(props) {
    const fs = props.size || 13;
    const w = Math.max(props.minW || 0, props.text.length * fs * 0.62 + 12), h = 19;
    return e("g", null,
      e("rect", { x: props.x - w / 2, y: props.y - h / 2, width: w, height: h, rx: 2, fill: cream, stroke: wallInk, strokeWidth: 0.8 }),
      e("text", { x: props.x, y: props.y + fs * 0.35, textAnchor: "middle",
        style: { fontFamily: "'Space Mono', monospace", fontWeight: 700, fontSize: fs + "px", fill: inkChip, letterSpacing: ".02em" } }, props.text)
    );
  }

  function FenwayField(props) {
    const bearing = (props.bearing != null) ? props.bearing : 45;
    const orientation = props.orientation || "NE";
    const C = [150, 190];          // home plate
    const Rcf = 92;
    const Rlf = Rcf * (parseFloat(props.lf) / parseFloat(props.cf));
    const Rrf = Rcf * (parseFloat(props.rf) / parseFloat(props.cf));
    const PR = 122;

    // field fan, CF straight up, foul lines at +/-45 deg (90-degree fair territory)
    const lf = [C[0] - Math.SQRT1_2 * Rlf, C[1] - Math.SQRT1_2 * Rlf];
    const rf = [C[0] + Math.SQRT1_2 * Rrf, C[1] - Math.SQRT1_2 * Rrf];
    const cf = [C[0], C[1] - Rcf];
    // infield diamond
    const d = 26;
    const b2 = [C[0], C[1] - d * 1.9];
    const b1 = [C[0] + d, C[1] - d];
    const b3 = [C[0] - d, C[1] - d];

    // rounded outfield: circle through the three wall points keeps the asymmetric
    // radii (deep CF / short RF) but draws a smooth arc like the other field plans.
    function circum(a, b, c) {
      const D = 2 * (a[0] * (b[1] - c[1]) + b[0] * (c[1] - a[1]) + c[0] * (a[1] - b[1]));
      const ax2 = a[0] * a[0] + a[1] * a[1], bx2 = b[0] * b[0] + b[1] * b[1], cx2 = c[0] * c[0] + c[1] * c[1];
      const ux = (ax2 * (b[1] - c[1]) + bx2 * (c[1] - a[1]) + cx2 * (a[1] - b[1])) / D;
      const uy = (ax2 * (c[0] - b[0]) + bx2 * (a[0] - c[0]) + cx2 * (b[0] - a[0])) / D;
      return Math.hypot(a[0] - ux, a[1] - uy);
    }
    const Rout = circum(lf, cf, rf);
    const grassPath = "M " + C[0] + " " + C[1] + " L " + lf[0] + " " + lf[1] + " A " + Rout.toFixed(2) + " " + Rout.toFixed(2) + " 0 0 1 " + rf[0].toFixed(2) + " " + rf[1].toFixed(2) + " Z";
    const dia = "M " + C[0] + " " + C[1] + " L " + b1[0] + " " + b1[1] + " L " + b2[0] + " " + b2[1] + " L " + b3[0] + " " + b3[1] + " Z";

    // protractor scale (0..90, N up)
    const ticks = [];
    for (let a = 0; a <= 90; a += 10) {
      const big = a % 30 === 0;
      const p1 = polar(C, PR, a), p2 = polar(C, PR - (big ? 12 : 6), a);
      ticks.push(e("line", { key: "t" + a, x1: p1[0], y1: p1[1], x2: p2[0], y2: p2[1],
        stroke: big ? creamDim : creamFaint, strokeWidth: big ? 1.2 : 0.8 }));
    }
    const nums = [0, 45, 90].map((a, i) => {
      const p = polar(C, PR + 13, a);
      return e("text", { key: "n" + i, x: p[0], y: p[1] + 4, textAnchor: "middle",
        style: { fontFamily: "'Space Mono',monospace", fontWeight: 700, fontSize: "11px", fill: creamDim } }, a);
    });
    const arcA = polar(C, PR, 0), arcB = polar(C, PR, 90);
    const protArc = "M " + arcA[0] + " " + arcA[1] + " A " + PR + " " + PR + " 0 0 1 " + arcB[0].toFixed(1) + " " + arcB[1].toFixed(1);

    // bearing needle at 45
    const ntip = polar(C, PR - 4, bearing);
    const back = polar(ntip, 11, bearing + 180), hl = polar(back, 5, bearing - 90), hr = polar(back, 5, bearing + 90);
    const head = [ntip, hl, hr].map(p => p[0].toFixed(1) + "," + p[1].toFixed(1)).join(" ");
    const degPos = polar(C, PR + 30, bearing);
    const nlab = polar(C, PR + 13, 0);

    // chips rotate WITH the field group (positioned in field space, then rotated)
    const chips = [
      { p: rot([lf[0] - 14, lf[1] - 6], C, bearing), t: props.lf },
      { p: rot([cf[0], cf[1] - 14], C, bearing), t: props.cf },
      { p: rot([rf[0] + 14, rf[1] - 6], C, bearing), t: props.rf }
    ];

    return e("div", { className: "ff-wrap" },
      e("svg", { viewBox: "96 26 206 208", className: "ff-svg", role: "img",
        "aria-label": "Field plan, oriented " + orientation + " " + bearing + " degrees; LF " + props.lf + ", CF " + props.cf + ", RF " + props.rf },
        e("defs", null,
          e("linearGradient", { id: "ffGrass", x1: "0", y1: "0", x2: "0", y2: "1" },
            e("stop", { offset: "0", stopColor: grassHi }), e("stop", { offset: "1", stopColor: grass }))),
        // protractor arc + ticks + numerals + N
        e("path", { d: protArc, fill: "none", stroke: creamFaint, strokeWidth: 1 }),
        ticks, nums,
        e("text", { x: nlab[0], y: nlab[1] - 8, textAnchor: "middle",
          style: { fontFamily: "'Jost',sans-serif", fontWeight: 700, fontSize: "12px", fill: cream, letterSpacing: ".06em" } }, "N"),
        // field group (rotated to bearing)
        e("g", { transform: "rotate(" + bearing + " " + C[0] + " " + C[1] + ")" },
          e("path", { d: grassPath, fill: "url(#ffGrass)", stroke: wallInk, strokeWidth: 1.6, strokeLinejoin: "round" }),
          e("path", { d: dia, fill: clay, stroke: clayEdge, strokeWidth: 0.9, strokeLinejoin: "round", opacity: 0.92 })
        ),
        // north baseline + bearing needle
        e("line", { x1: C[0], y1: C[1], x2: polar(C, PR - 4, 0)[0], y2: polar(C, PR - 4, 0)[1], stroke: creamFaint, strokeWidth: 1, strokeDasharray: "3 3" }),
        e("line", { x1: C[0], y1: C[1], x2: ntip[0], y2: ntip[1], stroke: red, strokeWidth: 2.2, strokeLinecap: "round" }),
        e("polygon", { points: head, fill: red }),
        e("circle", { cx: C[0], cy: C[1], r: 2.6, fill: cream }),
        e(Chip, { x: degPos[0], y: degPos[1], text: bearing + "\u00b0 " + orientation, size: 11 }),
        chips.map((c, i) => e(Chip, { key: "d" + i, x: c.p[0], y: c.p[1], text: c.t, size: 13 }))
      )
    );
  }

  window.FenwayField = FenwayField;
})();
