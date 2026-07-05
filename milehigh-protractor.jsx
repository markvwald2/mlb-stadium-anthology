/* milehigh-protractor.jsx — Mile High Stadium "Field Plan" graphic.
   A protractor scale reads the field-axis bearing (SE, 135°) off true north;
   the simple ballpark diamond is rotated to match. Purple / steel / concrete
   palette. Same props as the shared FieldDiagram (lf, cf, rf, orientation,
   degrees, accent). Local data only — no invented labels. */
(function () {
  const e = React.createElement;

  // palette (Mile High: concrete + steel, Rockies purple accent)
  const purple = "#5A3E8E", purpleDeep = "#3C2A63", silver = "#AEB1B5";
  const grass = "#5E7A57", grassHi = "#6B8763", clay = "#BD9059", clayEdge = "#A0773F", wallInk = "#2F4536";
  const paperHi = "#F3ECDB", rule = "#CFC3A8", ruleStrong = "#B0A488", ink3 = "#8A8478", steel = "#5C5E62";

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
    const fs = props.size || 15, w = Math.max(props.minW || 0, props.text.length * fs * 0.62 + (props.padX || 9) * 2), h = Math.max(22, fs + 8);
    const tone = props.tone || "paper";
    const fill = tone === "purple" ? purple : paperHi, stk = tone === "purple" ? purpleDeep : ruleStrong, col = tone === "purple" ? "#F3ECDB" : purpleDeep;
    return e("g", null,
      e("rect", { x: props.x - w / 2, y: props.y - h / 2, width: w, height: h, rx: 2.5, fill: fill, stroke: stk, strokeWidth: 1 }),
      e("text", { x: props.x, y: props.y + fs * 0.35, textAnchor: "middle", style: { fontFamily: "'Space Mono', monospace", fontWeight: 700, fontSize: fs + "px", fill: col } }, props.text)
    );
  }

  function MileHighProtractor(props) {
    const accent = props.accent || purple;
    const deg = (props.degrees != null) ? props.degrees : 135;
    const orientation = props.orientation || "SE";
    const C = [180, 196], R = 88, PR = 126;
    // field geometry (local: home bottom, CF top, LF/RF equator)
    const home = [C[0], C[1] + R], cf = [C[0], C[1] - R], lf = [C[0] - R, C[1]], rf = [C[0] + R, C[1]];
    const d = R * 0.30;
    const b1 = [C[0] + d, C[1] + R - d], b2 = [C[0], C[1] + R - 2 * d], b3 = [C[0] - d, C[1] + R - d];
    const grassPath = "M " + home[0] + " " + home[1] + " L " + lf[0] + " " + lf[1] + " A " + R + " " + R + " 0 0 1 " + rf[0] + " " + rf[1] + " Z";
    const dia = "M " + home[0] + " " + home[1] + " L " + b1[0] + " " + b1[1] + " L " + b2[0] + " " + b2[1] + " L " + b3[0] + " " + b3[1] + " Z";

    // protractor scale — extended to clear the SE (135°) bearing
    const ARC = 160;
    const ticks = [];
    for (let a = 0; a <= ARC; a += 10) {
      const big = a % 45 === 0;
      const p1 = polar(C, PR, a), p2 = polar(C, PR - (big ? 13 : 7), a);
      ticks.push(e("line", { key: "t" + a, x1: p1[0], y1: p1[1], x2: p2[0], y2: p2[1], stroke: big ? purple : steel, strokeWidth: big ? 1.4 : 0.9, opacity: big ? 0.9 : 0.45 }));
    }
    const nums = [0, 45, 90].map((a, i) => {
      const p = polar(C, PR + 15, a);
      return e("text", { key: "n" + i, x: p[0], y: p[1] + 4, textAnchor: "middle", style: { fontFamily: "'Space Mono',monospace", fontWeight: 700, fontSize: "14px", fill: ink3 } }, a);
    });
    const arcA = polar(C, PR, 0), arcB = polar(C, PR, ARC);
    const protArc = "M " + arcA[0] + " " + arcA[1] + " A " + PR + " " + PR + " 0 0 1 " + arcB[0].toFixed(1) + " " + arcB[1].toFixed(1);
    const ntip = polar(C, PR + 16, deg);
    const back = polar(ntip, 10, deg + 180), hl = polar(back, 4.5, deg - 90), hr = polar(back, 4.5, deg + 90);
    const head = [ntip, hl, hr].map(p => p[0].toFixed(1) + "," + p[1].toFixed(1)).join(" ");
    const bc = window.FieldLabels.bearingChip(C, PR + 16, deg, 46, 22);
    const nlab = polar(C, PR + 15, 0);

    const chips = [
      { p: out(rot(lf, C, deg), C, 17), t: strip(props.lf) },
      { p: window.FieldLabels.cfWallPoint(C, R, deg), t: strip(props.cf) },
      { p: out(rot(rf, C, deg), C, 17), t: strip(props.rf) }
    ];

    return e("div", { className: "fd-wrap" },
      e("svg", { viewBox: "60 26 300 312", className: "fd-svg", role: "img", "aria-label": "Field dimensions plan, oriented " + orientation + " " + deg + " degrees" },
        e("defs", null,
          e("linearGradient", { id: "mhGrass", x1: "0", y1: "0", x2: "0", y2: "1" },
            e("stop", { offset: "0", stopColor: grassHi }), e("stop", { offset: "1", stopColor: grass }))
        ),
        // field group (rotated to bearing)
        e("g", { transform: "rotate(" + deg + " " + C[0] + " " + C[1] + ")" },
          e("path", { d: grassPath, fill: "url(#mhGrass)", stroke: wallInk, strokeWidth: 1.6, strokeLinejoin: "round" }),
          e("path", { d: dia, fill: clay, stroke: clayEdge, strokeWidth: 1, strokeLinejoin: "round", opacity: 0.92 })
        ),
        // protractor arc + ticks + numerals
        e("path", { d: protArc, fill: "none", stroke: steel, strokeWidth: 1.1, opacity: 0.55 }),
        ticks, nums,
        e("text", { x: nlab[0], y: nlab[1] - 9, textAnchor: "middle", style: { fontFamily: "'Oswald',sans-serif", fontWeight: 700, fontSize: "14px", fill: purple, letterSpacing: ".04em" } }, "N"),
        // north baseline (0°) + bearing needle
        e("line", { x1: C[0], y1: C[1], x2: polar(C, PR, 0)[0], y2: polar(C, PR, 0)[1], stroke: steel, strokeWidth: 1.1, strokeDasharray: "3 3" }),
        e("line", { x1: C[0], y1: C[1], x2: ntip[0], y2: ntip[1], stroke: accent, strokeWidth: 2.2, strokeLinecap: "round" }),
        e("polygon", { points: head, fill: purpleDeep }),
        e("circle", { cx: C[0], cy: C[1], r: 3, fill: accent }),
        e(Chip, { x: bc.x, y: bc.y, text: deg + "\u00b0 " + orientation, size: 20, tone: "purple", padX: 8 }),
        // distance chips
        chips.map((c, i) => e(Chip, { key: "d" + i, x: c.p[0], y: c.p[1], text: c.t, size: 20 }))
      )
    );
  }

  window.MileHighProtractor = MileHighProtractor;
})();
