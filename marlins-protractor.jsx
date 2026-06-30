/* marlins-protractor.jsx — Marlins Park "Field Plan", treated as an engineering
   instrument inside the climate vessel. A protractor scale reads the field-axis
   bearing (SE, 128°) off true north; the ballpark is rotated to match. Subordinate
   to the spread — an arc, ticks, LF/CF/RF values, and the SE / 128° cue, not a
   generic baseball-diamond icon. Marlins climate palette (white, silver, pale
   aqua glass, Miami Blue, Caliente Red). Exposes window.MarlinsProtractor. */
(function () {
  const e = React.createElement;

  // Marlins climate-vessel palette
  const ink = "#1C2A30", slateInk = "#15252C", miami = "#0E84B4", miamiDeep = "#0A6087", caliente = "#D8473E", calienteDeep = "#B5362E";
  const grass = "#557E63", grassHi = "#63906F", clay = "#C0995F", clayEdge = "#A57C46", wallInk = "#33523F";
  const paperHi = "#F5F8F7", rule = "#CAD4D3", ruleStrong = "#A6B4B3", ink3 = "#7C8A90", ink2 = "#46555C";

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
  function strip(v) { return (v || "").toString().replace(/\s*ft$/i, ""); }

  function Chip(props) {
    const fs = props.size || 15, w = Math.max(props.minW || 0, props.text.length * fs * 0.62 + (props.padX || 9) * 2), h = 22;
    const tone = props.tone || "paper";
    const fill = tone === "accent" ? miami : paperHi, stk = tone === "accent" ? miamiDeep : rule, col = tone === "accent" ? "#F5F8F7" : ink;
    return e("g", null,
      e("rect", { x: props.x - w / 2, y: props.y - h / 2, width: w, height: h, rx: 2, fill: fill, stroke: stk, strokeWidth: 1 }),
      e("text", { x: props.x, y: props.y + fs * 0.35, textAnchor: "middle", style: { fontFamily: "'Space Mono', monospace", fontWeight: 700, fontSize: fs + "px", fill: col } }, props.text)
    );
  }

  function MarlinsProtractor(props) {
    const accent = props.accent || caliente;
    const deg = (props.degrees != null) ? props.degrees : 128;
    const orientation = props.orientation || "SE";
    const C = [184, 196], R = 86, PR = 124, MAX = 150;
    // field geometry (local: home bottom, CF top, LF/RF equator)
    const home = [C[0], C[1] + R], cf = [C[0], C[1] - R], lf = [C[0] - R, C[1]], rf = [C[0] + R, C[1]];
    const d = R * 0.30;
    const b1 = [C[0] + d, C[1] + R - d], b2 = [C[0], C[1] + R - 2 * d], b3 = [C[0] - d, C[1] + R - d];
    const grassPath = "M " + home[0] + " " + home[1] + " L " + lf[0] + " " + lf[1] + " A " + R + " " + R + " 0 0 1 " + rf[0] + " " + rf[1] + " Z";
    const dia = "M " + home[0] + " " + home[1] + " L " + b1[0] + " " + b1[1] + " L " + b2[0] + " " + b2[1] + " L " + b3[0] + " " + b3[1] + " Z";

    // protractor scale (0..150 to seat the SE / 128° bearing)
    const ticks = [];
    for (let a = 0; a <= MAX; a += 10) {
      const big = a % 30 === 0;
      const p1 = polar(C, PR, a), p2 = polar(C, PR - (big ? 13 : 7), a);
      ticks.push(e("line", { key: "t" + a, x1: p1[0], y1: p1[1], x2: p2[0], y2: p2[1], stroke: big ? miamiDeep : ruleStrong, strokeWidth: big ? 1.4 : 0.9, opacity: big ? 0.85 : 0.5 }));
    }
    const nums = [0, 30, 60, 90, 120, 150].map((a, i) => {
      const p = polar(C, PR + 14, a);
      return e("text", { key: "n" + i, x: p[0], y: p[1] + 4, textAnchor: "middle", style: { fontFamily: "'Space Mono',monospace", fontWeight: 700, fontSize: "10.5px", fill: ink3 } }, a);
    });
    const arcA = polar(C, PR, 0), arcB = polar(C, PR, MAX);
    const protArc = "M " + arcA[0] + " " + arcA[1] + " A " + PR + " " + PR + " 0 0 1 " + arcB[0].toFixed(1) + " " + arcB[1].toFixed(1);
    const ntip = polar(C, PR + 16, deg);
    const back = polar(ntip, 10, deg + 180), hl = polar(back, 4.5, deg - 90), hr = polar(back, 4.5, deg + 90);
    const head = [ntip, hl, hr].map(p => p[0].toFixed(1) + "," + p[1].toFixed(1)).join(" ");
    const bc = window.FieldLabels.bearingChip(C, PR + 16, deg, 46, 22);
    const nlab = polar(C, PR + 14, 0);

    const chips = [
      { p: out(rot(lf, C, deg), C, 17), t: strip(props.lf) },
      { p: window.FieldLabels.cfWallPoint(C, R, deg), t: strip(props.cf) },
      { p: out(rot(rf, C, deg), C, 17), t: strip(props.rf) }
    ];

    return e("div", { className: "fd-wrap" },
      e("svg", { viewBox: "48 26 312 300", className: "fd-svg", role: "img", "aria-label": "Field dimensions plan, oriented " + orientation + " " + deg + " degrees" },
        e("defs", null,
          e("linearGradient", { id: "mlaProtGrass", x1: "0", y1: "0", x2: "0", y2: "1" },
            e("stop", { offset: "0", stopColor: grassHi }), e("stop", { offset: "1", stopColor: grass }))
        ),
        // field group (rotated to true bearing)
        e("g", { transform: "rotate(" + deg + " " + C[0] + " " + C[1] + ")" },
          e("path", { d: grassPath, fill: "url(#mlaProtGrass)", stroke: wallInk, strokeWidth: 1.6, strokeLinejoin: "round" }),
          e("path", { d: dia, fill: clay, stroke: clayEdge, strokeWidth: 1, strokeLinejoin: "round", opacity: 0.92 })
        ),
        // protractor arc + ticks + numerals
        e("path", { d: protArc, fill: "none", stroke: ink3, strokeWidth: 1.1, opacity: 0.55 }),
        ticks, nums,
        e("text", { x: nlab[0], y: nlab[1] - 9, textAnchor: "middle", style: { fontFamily: "'Oswald',sans-serif", fontWeight: 700, fontSize: "12px", fill: miamiDeep, letterSpacing: ".04em" } }, "N"),
        // north baseline (0°) + bearing needle
        e("line", { x1: C[0], y1: C[1], x2: polar(C, PR, 0)[0], y2: polar(C, PR, 0)[1], stroke: ink2, strokeWidth: 1.1, strokeDasharray: "3 3" }),
        e("line", { x1: C[0], y1: C[1], x2: ntip[0], y2: ntip[1], stroke: accent, strokeWidth: 2.2, strokeLinecap: "round" }),
        e("polygon", { points: head, fill: calienteDeep }),
        e("circle", { cx: C[0], cy: C[1], r: 3, fill: accent }),
        e(Chip, { x: bc.x, y: bc.y, text: orientation + " \u00b7 " + deg + "\u00b0", size: 12, tone: "accent", padX: 7 }),
        // distance chips
        chips.map((c, i) => e(Chip, { key: "d" + i, x: c.p[0], y: c.p[1], text: c.t, size: 15 }))
      )
    );
  }

  window.MarlinsProtractor = MarlinsProtractor;
})();
