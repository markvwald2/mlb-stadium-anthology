/* safeco-protractor.jsx — Safeco Field "field orientation" instrument.
   A compact surveying-instrument symbol (NOT a generic baseball diamond):
   a quarter/third protractor scale reads the field-axis bearing off true north,
   a small oriented field is rotated to match (NE, 49deg), and LF/CF/RF chips ride
   the foul lines / center. Mariners palette — navy needle, green field, silver
   chips. Props: lf, cf, rf, orientation, degrees. Exposes window.SafecoProtractor. */
(function () {
  const e = React.createElement;

  const ink = "#23211C", navy = "#0C2C56", navyDeep = "#06203F", green = "#0E5650",
        greenHi = "#1C766D", grass = "#3E6F58", grassHi = "#557E63", clay = "#B98C57",
        clayEdge = "#9C743C", wallInk = "#2C4636", silver = "#AEB6BB",
        rule = "#C6BBA3", ruleStrong = "#A99C80", ink3 = "#857C6B", ink2 = "#514B40";

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
    const fs = props.size || 13, w = Math.max(props.minW || 0, props.text.length * fs * 0.64 + (props.padX || 8) * 2), h = 20;
    const tone = props.tone || "paper";
    const fill = tone === "accent" ? navy : "#F3ECDC", stk = tone === "accent" ? navyDeep : ruleStrong, col = tone === "accent" ? "#F3ECDC" : ink;
    return e("g", null,
      e("rect", { x: props.x - w / 2, y: props.y - h / 2, width: w, height: h, rx: 2, fill: fill, stroke: stk, strokeWidth: 1 }),
      e("text", { x: props.x, y: props.y + fs * 0.35, textAnchor: "middle", style: { fontFamily: "'Space Mono', monospace", fontWeight: 700, fontSize: fs + "px", fill: col } }, props.text)
    );
  }

  function SafecoProtractor(props) {
    const deg = (props.degrees != null) ? props.degrees : 49;
    const orientation = props.orientation || "NE";
    const C = [180, 188], R = 84, PR = 120;
    const home = [C[0], C[1] + R], cf = [C[0], C[1] - R], lf = [C[0] - R, C[1]], rf = [C[0] + R, C[1]];
    const d = R * 0.30;
    const b1 = [C[0] + d, C[1] + R - d], b2 = [C[0], C[1] + R - 2 * d], b3 = [C[0] - d, C[1] + R - d];
    const grassPath = "M " + home[0] + " " + home[1] + " L " + lf[0] + " " + lf[1] + " A " + R + " " + R + " 0 0 1 " + rf[0] + " " + rf[1] + " Z";
    const dia = "M " + home[0] + " " + home[1] + " L " + b1[0] + " " + b1[1] + " L " + b2[0] + " " + b2[1] + " L " + b3[0] + " " + b3[1] + " Z";

    // protractor scale spanning 0..90 so the NE (49) bearing reads cleanly
    const ticks = [];
    for (let a = 0; a <= 90; a += 10) {
      const big = a % 30 === 0;
      const p1 = polar(C, PR, a), p2 = polar(C, PR - (big ? 12 : 6), a);
      ticks.push(e("line", { key: "t" + a, x1: p1[0], y1: p1[1], x2: p2[0], y2: p2[1], stroke: big ? ink : ruleStrong, strokeWidth: big ? 1.3 : 0.8, opacity: big ? 0.9 : 0.5 }));
    }
    const nums = [0, 30, 60, 90].map((a, i) => {
      const p = polar(C, PR + 14, a);
      return e("text", { key: "n" + i, x: p[0], y: p[1] + 4, textAnchor: "middle", style: { fontFamily: "'Space Mono',monospace", fontWeight: 700, fontSize: "10px", fill: ink3 } }, a);
    });
    const arcA = polar(C, PR, 0), arcB = polar(C, PR, 90);
    const protArc = "M " + arcA[0] + " " + arcA[1] + " A " + PR + " " + PR + " 0 0 1 " + arcB[0].toFixed(1) + " " + arcB[1].toFixed(1);
    const ntip = polar(C, PR + 16, deg);
    const degPos = polar(C, PR + 34, deg);
    const nlab = polar(C, PR + 14, 0);

    const chips = [
      { p: out(rot(lf, C, deg), C, 16), t: props.lf },
      { p: rot(cf, C, deg), t: props.cf },
      { p: out(rot(rf, C, deg), C, 16), t: props.rf }
    ];

    return e("div", { className: "fd-wrap" },
      e("svg", { viewBox: "24 36 312 286", className: "fd-svg", role: "img", "aria-label": "Field dimensions plan, oriented " + orientation + " " + deg + " degrees" },
        e("defs", null,
          e("linearGradient", { id: "tmProtGrass", x1: "0", y1: "0", x2: "0", y2: "1" },
            e("stop", { offset: "0", stopColor: grassHi }), e("stop", { offset: "1", stopColor: grass }))
        ),
        e("g", { transform: "rotate(" + deg + " " + C[0] + " " + C[1] + ")" },
          e("path", { d: grassPath, fill: "url(#tmProtGrass)", stroke: wallInk, strokeWidth: 1.5, strokeLinejoin: "round" }),
          e("path", { d: dia, fill: clay, stroke: clayEdge, strokeWidth: 1, strokeLinejoin: "round", opacity: 0.92 })
        ),
        e("path", { d: protArc, fill: "none", stroke: ink3, strokeWidth: 1, opacity: 0.55 }),
        ticks, nums,
        e("text", { x: nlab[0], y: nlab[1] - 8, textAnchor: "middle", style: { fontFamily: "'Oswald',sans-serif", fontWeight: 700, fontSize: "11px", fill: ink, letterSpacing: ".04em" } }, "N"),
        e("line", { x1: C[0], y1: C[1], x2: polar(C, PR, 0)[0], y2: polar(C, PR, 0)[1], stroke: ink2, strokeWidth: 1, strokeDasharray: "3 3" }),
        e("line", { x1: C[0], y1: C[1], x2: ntip[0], y2: ntip[1], stroke: navy, strokeWidth: 2.1, strokeLinecap: "round" }),
        e("circle", { cx: ntip[0], cy: ntip[1], r: 3.4, fill: green }),
        e("circle", { cx: C[0], cy: C[1], r: 3, fill: navy }),
        e(Chip, { x: degPos[0], y: degPos[1], text: deg + "\u00b0 " + orientation, size: 12, tone: "accent", padX: 7 }),
        chips.map((c, i) => e(Chip, { key: "d" + i, x: c.p[0], y: c.p[1], text: c.t, size: 13 }))
      )
    );
  }

  window.SafecoProtractor = SafecoProtractor;
})();
