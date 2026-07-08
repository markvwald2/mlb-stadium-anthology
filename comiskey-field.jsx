/* comiskey-field.jsx — "Exploding Scoreboard" field instruments for Comiskey Park.
   Exports:
     window.ComiskeyField    — protractor-style field plan (the book's canonical
                               ProtractorDiagram layout: a protractor scale reads the
                               field-axis bearing off true north, the ballpark glyph is
                               rotated to match, with LF/CF/RF chips and a NE/45° needle)
                               recolored for the dark steel scoreboard module.
     window.ComiskeyPinwheel — tiny exploding-scoreboard pinwheel cue (radial blades).
   Drawn from window.COMISKEY geometry. Local data only; no invented values. */
(function () {
  const e = React.createElement;

  // Dark scoreboard palette
  const silver = "#B8AF9B", silverSoft = "#7E7765", ink3 = "#9A9080",
        bulb = "#F0D384", brick = "#C0563B",
        grass = "#333E22", grassHi = "#3D4A29", wallInk = "#283019",
        clay = "#43341F", clayEdge = "#2E2415";

  function rot(p, C, deg) {
    const t = deg * Math.PI / 180, c = Math.cos(t), s = Math.sin(t);
    const dx = p[0] - C[0], dy = p[1] - C[1];
    return [C[0] + dx * c - dy * s, C[1] + dx * s + dy * c];
  }
  function out(p, C, o) { const dx = p[0] - C[0], dy = p[1] - C[1], len = Math.hypot(dx, dy) || 1; return [p[0] + dx / len * o, p[1] + dy / len * o]; }
  function polar(C, r, a) { const t = a * Math.PI / 180; return [C[0] + r * Math.sin(t), C[1] - r * Math.cos(t)]; }
  function strip(v) { return (v || "").toString().replace(" ft", ""); }

  function Chip(props) {
    const fs = props.size || 14, w = Math.max(props.minW || 0, props.text.length * fs * 0.62 + (props.padX || 8) * 2), h = Math.max(20, fs + 7);
    return e("g", null,
      e("rect", { x: props.x - w / 2, y: props.y - h / 2, width: w, height: h, rx: 2, fill: "#16120C", stroke: props.stk || silver, strokeWidth: 1 }),
      e("text", { x: props.x, y: props.y + fs * 0.35, textAnchor: "middle",
        style: { fontFamily: "'Space Mono', monospace", fontWeight: 700, fontSize: fs + "px", fill: props.col || bulb } }, props.text));
  }

  function ComiskeyField(props) {
    const deg = (props.degrees != null) ? props.degrees : 45;
    const orientation = props.orientation || "NE";
    const C = [180, 198], R = 90, PR = 128;
    // field geometry (local: home bottom, CF top, LF/RF equator)
    const home = [C[0], C[1] + R], cf = [C[0], C[1] - R], lf = [C[0] - R, C[1]], rf = [C[0] + R, C[1]];
    const d = R * 0.30;
    const b1 = [C[0] + d, C[1] + R - d], b2 = [C[0], C[1] + R - 2 * d], b3 = [C[0] - d, C[1] + R - d];
    const grassPath = "M " + home[0] + " " + home[1] + " L " + lf[0] + " " + lf[1] + " A " + R + " " + R + " 0 0 1 " + rf[0] + " " + rf[1] + " Z";
    const dia = "M " + home[0] + " " + home[1] + " L " + b1[0] + " " + b1[1] + " L " + b2[0] + " " + b2[1] + " L " + b3[0] + " " + b3[1] + " Z";

    // protractor scale
    const ticks = [];
    for (let a = 0; a <= 110; a += 10) {
      const big = a % 30 === 0;
      const p1 = polar(C, PR, a), p2 = polar(C, PR - (big ? 13 : 7), a);
      ticks.push(e("line", { key: "t" + a, x1: p1[0], y1: p1[1], x2: p2[0], y2: p2[1], stroke: big ? silver : silverSoft, strokeWidth: big ? 1.4 : 0.9, opacity: big ? 0.95 : 0.55 }));
    }
    const nums = [0, 30, 60, 90].map((a, i) => {
      const p = polar(C, PR + 15, a);
      return e("text", { key: "n" + i, x: p[0], y: p[1] + 4, textAnchor: "middle", style: { fontFamily: "'Space Mono',monospace", fontWeight: 700, fontSize: "18px", fill: ink3 } }, a);
    });
    const arcA = polar(C, PR, 0), arcB = polar(C, PR, 110);
    const protArc = "M " + arcA[0] + " " + arcA[1] + " A " + PR + " " + PR + " 0 0 1 " + arcB[0].toFixed(1) + " " + arcB[1].toFixed(1);
    const ntip = polar(C, PR + 16, deg);
    const back = polar(ntip, 10, deg + 180), hl = polar(back, 4.5, deg - 90), hr = polar(back, 4.5, deg + 90);
    const head = [ntip, hl, hr].map(p => p[0].toFixed(1) + "," + p[1].toFixed(1)).join(" ");
    const bc = window.FieldLabels.bearingChip(C, PR + 16, deg, 28, 20);
    const nlab = polar(C, PR + 15, 0);

    const chips = [
      { p: out(rot(lf, C, deg), C, 18), t: strip(props.lf) },
      { p: window.FieldLabels.cfWallPoint(C, R, deg), t: strip(props.cf) },
      { p: out(rot(rf, C, deg), C, 18), t: strip(props.rf) }
    ];

    return e("svg", { viewBox: "62 28 280 290", className: props.className, role: "img",
      "aria-label": "Field dimensions plan, oriented " + orientation + " " + deg + " degrees",
      style: { overflow: "visible", width: "135px", height: "135px", display: "block" } },
      e("defs", null,
        e("linearGradient", { id: "cmGrass", x1: "0", y1: "0", x2: "0", y2: "1" },
          e("stop", { offset: "0", stopColor: grassHi }), e("stop", { offset: "1", stopColor: grass }))),
      // field group (rotated to bearing)
      e("g", { transform: "rotate(" + deg + " " + C[0] + " " + C[1] + ")" },
        e("path", { d: grassPath, fill: "url(#cmGrass)", stroke: wallInk, strokeWidth: 1.6, strokeLinejoin: "round" }),
        e("path", { d: dia, fill: clay, stroke: clayEdge, strokeWidth: 1, strokeLinejoin: "round", opacity: 0.95 })),
      // protractor arc + ticks + numerals
      e("path", { d: protArc, fill: "none", stroke: silverSoft, strokeWidth: 1.1, opacity: 0.6 }),
      ticks, nums,
      e("text", { x: nlab[0], y: nlab[1] - 15, textAnchor: "middle", style: { fontFamily: "'Oswald',sans-serif", fontWeight: 700, fontSize: "18px", fill: silver, letterSpacing: ".04em" } }, "N"),
      // north baseline (0°) + bearing needle
      e("line", { x1: C[0], y1: C[1], x2: polar(C, PR, 0)[0], y2: polar(C, PR, 0)[1], stroke: silverSoft, strokeWidth: 1.1, strokeDasharray: "3 3" }),
      e("line", { x1: C[0], y1: C[1], x2: ntip[0], y2: ntip[1], stroke: bulb, strokeWidth: 2.2, strokeLinecap: "round" }),
      e("polygon", { points: head, fill: brick }),
      e("circle", { cx: C[0], cy: C[1], r: 3, fill: bulb }),
      e(Chip, { x: bc.x, y: bc.y, text: deg + "\u00b0", size: 26, padX: 7, col: brick }),
      // distance chips
      chips.map((c, i) => e(Chip, { key: "d" + i, x: c.p[0], y: c.p[1], text: c.t, size: 26 }))
    );
  }

  /* ---------- Tiny exploding-scoreboard pinwheel cue ---------- */
  function ComiskeyPinwheel(props) {
    const s = props.size || 22;
    const c = s / 2, blades = 8, R = s * 0.46, r = s * 0.16;
    const col = props.color || silver;
    const arr = [];
    for (let i = 0; i < blades; i++) {
      const a0 = (i / blades) * 2 * Math.PI, a1 = ((i + 0.5) / blades) * 2 * Math.PI;
      const x0 = c + R * Math.cos(a0), y0 = c + R * Math.sin(a0);
      const x1 = c + r * Math.cos(a1), y1 = c + r * Math.sin(a1);
      arr.push(e("path", {
        key: i, d: "M " + c + " " + c + " L " + x0.toFixed(1) + " " + y0.toFixed(1) + " L " + x1.toFixed(1) + " " + y1.toFixed(1) + " Z",
        fill: i === 0 ? bulb : col, fillOpacity: i % 2 ? 0.45 : 0.85
      }));
    }
    return e("svg", { width: s, height: s, viewBox: "0 0 " + s + " " + s, className: props.className, "aria-hidden": "true" },
      arr, e("circle", { cx: c, cy: c, r: s * 0.10, fill: "#16120C", stroke: col, strokeWidth: 1 }));
  }

  window.ComiskeyField = ComiskeyField;
  window.ComiskeyPinwheel = ComiskeyPinwheel;
})();
