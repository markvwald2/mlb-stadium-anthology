/* tropicana-protractor.jsx — Tropicana Field "Field Dimensions & Orientation"
   plate, drawn as a small surveying / protractor instrument (NOT a baseball
   diamond icon). A half-circle scale reads the field-axis bearing off true north
   (N / 359°); the simple ballpark fan is rotated to match. The synthetic turf is
   the one strong color field; steel ticks, charcoal numerals, a restrained Rays-
   yellow bearing needle, light concrete distance chips.
   Props: lf, cf, rf, orientation, bearing. Exposes window.TropicanaProtractor. */
(function () {
  const e = React.createElement;

  // Service-deck palette — concrete/steel marks, vivid synthetic turf, yellow needle
  const ink = "#23262A", ink2 = "#4C5358", ink3 = "#7E868C";
  const navy = "#092C5C", steel = "#A7ACAB", ruleStrong = "#9097A0";
  const accent = "#E3B81E"; // restrained Rays yellow needle
  const turf = "#2E8B4E", turfHi = "#37A35B", clay = "#B97A45", clayEdge = "#94602F", wallInk = "#1F5E37";
  const chipFill = "#EDEEEC", chipInk = "#23262A", chipStroke = "#9097A0";

  function polar(C, r, a) { const t = a * Math.PI / 180; return [C[0] + r * Math.sin(t), C[1] - r * Math.cos(t)]; }
  function rot(p, C, deg) {
    const t = deg * Math.PI / 180, c = Math.cos(t), s = Math.sin(t);
    const dx = p[0] - C[0], dy = p[1] - C[1];
    return [C[0] + dx * c - dy * s, C[1] + dx * s + dy * c];
  }
  function out(p, C, o) {
    const dx = p[0] - C[0], dy = p[1] - C[1], len = Math.hypot(dx, dy) || 1;
    return [p[0] + dx / len * o, p[1] + dy / len * o];
  }
  function strip(v) { return (v || "").toString().replace(/\s*ft$/i, ""); }

  function Chip(props) {
    const fs = props.size || 14, w = Math.max(props.minW || 0, props.text.length * fs * 0.62 + (props.padX || 9) * 2), h = 21;
    const tone = props.tone || "paper";
    const fill = tone === "accent" ? accent : chipFill, stk = tone === "accent" ? "#9c7d10" : chipStroke;
    return e("g", null,
      e("rect", { x: props.x - w / 2, y: props.y - h / 2, width: w, height: h, rx: 1.5, fill: fill, stroke: stk, strokeWidth: 1 }),
      e("text", { x: props.x, y: props.y + fs * 0.35, textAnchor: "middle", style: { fontFamily: "'Space Mono', monospace", fontWeight: 700, fontSize: fs + "px", fill: chipInk } }, props.text)
    );
  }

  function TropicanaProtractor(props) {
    const bearing = (props.bearing != null) ? props.bearing : 359;
    const orientation = props.orientation || "N";
    const deg = bearing - 360;           // 359° → -1° (essentially straight N)
    const C = [165, 182], R = 80, PR = 120;

    const home = polar(C, R, 180), cf = polar(C, R, 0), lf = polar(C, R, -90), rf = polar(C, R, 90);
    const d = R * 0.3;
    const b1 = [C[0] + d, C[1] + R - d], b2 = [C[0], C[1] + R - 2 * d], b3 = [C[0] - d, C[1] + R - d];
    const grassPath = "M " + home[0] + " " + home[1] + " L " + lf[0] + " " + lf[1] +
      " A " + R + " " + R + " 0 0 1 " + rf[0] + " " + rf[1] + " Z";
    const dia = "M " + home[0] + " " + home[1] + " L " + b1[0] + " " + b1[1] +
      " L " + b2[0] + " " + b2[1] + " L " + b3[0] + " " + b3[1] + " Z";

    // protractor scale: -90° → +90° across the top
    const ticks = [];
    for (let a = -90; a <= 90; a += 5) {
      const big = (a % 30 === 0);
      const p1 = polar(C, PR, a), p2 = polar(C, PR - (big ? 13 : 7), a);
      ticks.push(e("line", { key: "t" + a, x1: p1[0], y1: p1[1], x2: p2[0], y2: p2[1],
        stroke: big ? navy : ruleStrong, strokeWidth: big ? 1.3 : 0.8, opacity: big ? 0.9 : 0.5 }));
    }
    const numerals = [[-90, "270"], [-60, "300"], [-30, "330"], [0, "0"], [30, "30"], [60, "60"], [90, "90"]];
    const nums = numerals.map((nd, i) => {
      const p = polar(C, PR + 15, nd[0]);
      return e("text", { key: "n" + i, x: p[0], y: p[1] + 4, textAnchor: "middle",
        style: { fontFamily: "'Space Mono',monospace", fontWeight: 700, fontSize: "10px", fill: ink2 } }, nd[1]);
    });
    const arcA = polar(C, PR, -90), arcB = polar(C, PR, 90);
    const protArc = "M " + arcA[0] + " " + arcA[1] + " A " + PR + " " + PR + " 0 0 1 " + arcB[0].toFixed(1) + " " + arcB[1].toFixed(1);

    // bearing needle (to N / 359°)
    const ntip = polar(C, PR + 8, bearing);
    const back = polar(ntip, 11, bearing + 180), hl = polar(back, 5, bearing - 90), hr = polar(back, 5, bearing + 90);
    const head = [ntip, hl, hr].map(p => p[0].toFixed(1) + "," + p[1].toFixed(1)).join(" ");
    const needleBase = polar(C, R + 4, bearing);

    const chips = [
      { p: out(rot(lf, C, deg), C, 17), t: strip(props.lf) },
      { p: out(rot(cf, C, deg), C, 16), t: strip(props.cf) },
      { p: out(rot(rf, C, deg), C, 17), t: strip(props.rf) }
    ];

    return e("div", { className: "fd-wrap" },
      e("svg", { viewBox: "8 30 314 248", className: "fd-svg", role: "img",
        "aria-label": "Field dimensions plan, oriented " + orientation + " " + bearing + " degrees" },
        e("defs", null,
          e("linearGradient", { id: "tropProtGrass", x1: "0", y1: "0", x2: "0", y2: "1" },
            e("stop", { offset: "0", stopColor: turfHi }), e("stop", { offset: "1", stopColor: turf }))
        ),
        e("g", { transform: "rotate(" + deg + " " + C[0] + " " + C[1] + ")" },
          e("path", { d: grassPath, fill: "url(#tropProtGrass)", stroke: wallInk, strokeWidth: 1.5, strokeLinejoin: "round" }),
          e("path", { d: dia, fill: clay, stroke: clayEdge, strokeWidth: 1, strokeLinejoin: "round", opacity: 0.92 })
        ),
        e("path", { d: protArc, fill: "none", stroke: ink3, strokeWidth: 1.1, opacity: 0.6 }),
        ticks, nums,
        e("line", { x1: C[0], y1: C[1], x2: polar(C, PR, 0)[0], y2: polar(C, PR, 0)[1], stroke: ink2, strokeWidth: 1, strokeDasharray: "3 3", opacity: 0.7 }),
        e("text", { x: polar(C, PR + 15, 0)[0], y: polar(C, PR + 15, 0)[1] - 9, textAnchor: "middle",
          style: { fontFamily: "'Oswald',sans-serif", fontWeight: 700, fontSize: "11px", fill: navy, letterSpacing: ".04em" } }, "N"),
        e("line", { x1: needleBase[0], y1: needleBase[1], x2: ntip[0], y2: ntip[1], stroke: accent, strokeWidth: 2.2, strokeLinecap: "round" }),
        e("polygon", { points: head, fill: accent }),
        e("circle", { cx: C[0], cy: C[1], r: 2.6, fill: navy }),
        e("text", { x: 22, y: 50, textAnchor: "start",
          style: { fontFamily: "'Oswald',sans-serif", fontWeight: 700, fontSize: "12px", fill: navy, letterSpacing: ".06em" } },
          orientation + " \u00b7 " + bearing + "\u00b0"),
        chips.map((c, i) => e(Chip, { key: "d" + i, x: c.p[0], y: c.p[1], text: c.t, size: 14 }))
      )
    );
  }

  window.TropicanaProtractor = TropicanaProtractor;
})();
