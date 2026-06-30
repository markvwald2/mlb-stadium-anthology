/* nationals-protractor.jsx — Nationals Park field plan as a surveying instrument.
   Thin drafting lines on limestone, a protractor scale reading the field-axis
   bearing off true north, the diamond rotated to NNE 28 degrees, and LF/CF/RF
   distance chips. Subordinate, civic, not a cartoon diamond.
   Props: lf, cf, rf, orientation, degrees, accent. Exposes window.NatsProtractor. */
(function () {
  const e = React.createElement;

  // civic palette
  const ink = "#20201E", navy = "#14264B", red = "#AB0003";
  const draft = "#6B6A60", rule = "#C9C2B1", ink3 = "#8C887C", ink2 = "#56544E";
  const fieldLine = "#56544E", paperHi = "#F3EEE2";

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

  function Chip(props) {
    const fs = props.size || 14, w = Math.max(props.minW || 0, props.text.length * fs * 0.62 + (props.padX || 9) * 2), h = 21;
    const tone = props.tone || "paper";
    const fill = tone === "navy" ? navy : paperHi, stk = tone === "navy" ? navy : rule, col = tone === "navy" ? paperHi : ink;
    return e("g", null,
      e("rect", { x: props.x - w / 2, y: props.y - h / 2, width: w, height: h, rx: 1.5, fill: fill, stroke: stk, strokeWidth: 1 }),
      e("text", { x: props.x, y: props.y + fs * 0.35, textAnchor: "middle", style: { fontFamily: "'Space Mono', monospace", fontWeight: 700, fontSize: fs + "px", fill: col, letterSpacing: ".01em" } }, props.text)
    );
  }

  function NatsProtractor(props) {
    const accent = props.accent || navy;
    const deg = (props.degrees != null) ? props.degrees : 28;
    const orientation = props.orientation || "NNE";
    const C = [180, 200], R = 88, PR = 126;
    const home = [C[0], C[1] + R], cf = [C[0], C[1] - R], lf = [C[0] - R, C[1]], rf = [C[0] + R, C[1]];
    const d = R * 0.30;
    const b1 = [C[0] + d, C[1] + R - d], b2 = [C[0], C[1] + R - 2 * d], b3 = [C[0] - d, C[1] + R - d];
    const mound = [C[0], C[1] + R - 1.55 * d];
    const fieldPath = "M " + home[0] + " " + home[1] + " L " + lf[0] + " " + lf[1] + " A " + R + " " + R + " 0 0 1 " + rf[0] + " " + rf[1] + " Z";
    const inArc = "M " + (C[0] - R * 0.62) + " " + (C[1] + R * 0.10) + " A " + (R * 0.63) + " " + (R * 0.63) + " 0 0 1 " + (C[0] + R * 0.62) + " " + (C[1] + R * 0.10);
    const dia = "M " + home[0] + " " + home[1] + " L " + b1[0] + " " + b1[1] + " L " + b2[0] + " " + b2[1] + " L " + b3[0] + " " + b3[1] + " Z";

    // protractor scale (0..110 from north)
    const ticks = [];
    for (let a = 0; a <= 110; a += 5) {
      const big = a % 30 === 0, mid = a % 10 === 0;
      const p1 = polar(C, PR, a), p2 = polar(C, PR - (big ? 13 : mid ? 8 : 5), a);
      ticks.push(e("line", { key: "t" + a, x1: p1[0], y1: p1[1], x2: p2[0], y2: p2[1], stroke: big ? ink : draft, strokeWidth: big ? 1.3 : 0.8, opacity: big ? 0.85 : 0.5 }));
    }
    const nums = [0, 30, 60, 90].map((a, i) => {
      const p = polar(C, PR + 14, a);
      return e("text", { key: "n" + i, x: p[0], y: p[1] + 4, textAnchor: "middle", style: { fontFamily: "'Space Mono',monospace", fontWeight: 700, fontSize: "10px", fill: ink3 } }, a);
    });
    const arcA = polar(C, PR, 0), arcB = polar(C, PR, 110);
    const protArc = "M " + arcA[0] + " " + arcA[1] + " A " + PR + " " + PR + " 0 0 1 " + arcB[0].toFixed(1) + " " + arcB[1].toFixed(1);
    const ntip = polar(C, PR + 16, deg);
    const back = polar(ntip, 10, deg + 180), hl = polar(back, 4.5, deg - 90), hr = polar(back, 4.5, deg + 90);
    const head = [ntip, hl, hr].map(p => p[0].toFixed(1) + "," + p[1].toFixed(1)).join(" ");
    const bc = window.FieldLabels.bearingChip(C, PR + 16, deg, 28, 20);
    const nlab = polar(C, PR + 14, 0);

    const chips = [
      { p: out(rot(lf, C, deg), C, 17), t: strip(props.lf) },
      { p: window.FieldLabels.cfWallPoint(C, R, deg), t: strip(props.cf) },
      { p: out(rot(rf, C, deg), C, 17), t: strip(props.rf) }
    ];

    return e("div", { className: "fd-wrap" },
      e("svg", { viewBox: "60 30 300 300", className: "fd-svg", role: "img", "aria-label": "Field dimensions plan, oriented " + orientation + " " + deg + " degrees" },
        // field group (rotated) — thin drafting outline, no heavy fill
        e("g", { transform: "rotate(" + deg + " " + C[0] + " " + C[1] + ")" },
          e("path", { d: fieldPath, fill: "none", stroke: fieldLine, strokeWidth: 1.2, strokeLinejoin: "round" }),
          e("path", { d: inArc, fill: "none", stroke: draft, strokeWidth: 0.8, opacity: 0.55 }),
          e("path", { d: dia, fill: "none", stroke: ink2, strokeWidth: 1, strokeLinejoin: "round" }),
          e("circle", { cx: mound[0], cy: mound[1], r: 2, fill: "none", stroke: ink2, strokeWidth: 0.9 }),
          [b1, b2, b3].map((b, i) => e("rect", { key: i, x: b[0] - 2, y: b[1] - 2, width: 4, height: 4, fill: paperHi, stroke: ink2, strokeWidth: 0.9, transform: "rotate(45 " + b[0] + " " + b[1] + ")" })),
          e("rect", { x: home[0] - 2.4, y: home[1] - 2.4, width: 4.8, height: 4.8, fill: red, transform: "rotate(45 " + home[0] + " " + home[1] + ")" })
        ),
        // protractor arc + ticks + numerals
        e("path", { d: protArc, fill: "none", stroke: ink3, strokeWidth: 1, opacity: 0.6 }),
        ticks, nums,
        e("text", { x: nlab[0], y: nlab[1] - 9, textAnchor: "middle", style: { fontFamily: "'Oswald',sans-serif", fontWeight: 700, fontSize: "12px", fill: ink, letterSpacing: ".04em" } }, "N"),
        // north baseline (0) + bearing needle
        e("line", { x1: C[0], y1: C[1], x2: polar(C, PR, 0)[0], y2: polar(C, PR, 0)[1], stroke: draft, strokeWidth: 1, strokeDasharray: "3 3" }),
        e("line", { x1: C[0], y1: C[1], x2: ntip[0], y2: ntip[1], stroke: accent, strokeWidth: 2, strokeLinecap: "round" }),
        e("polygon", { points: head, fill: accent }),
        e("circle", { cx: C[0], cy: C[1], r: 2.6, fill: accent }),
        e(Chip, { x: bc.x, y: bc.y, text: deg + "\u00b0", size: 13, tone: "navy", padX: 7 }),
        // orientation cue
        e("text", { x: ntip[0] + 12, y: ntip[1] - 4, textAnchor: "start", style: { fontFamily: "'Oswald',sans-serif", fontWeight: 600, fontSize: "10px", fill: ink2, letterSpacing: ".14em" } }, orientation),
        // distance chips
        chips.map((c, i) => e(Chip, { key: "d" + i, x: c.p[0], y: c.p[1], text: c.t, size: 14 }))
      )
    );
  }

  window.NatsProtractor = NatsProtractor;
})();
