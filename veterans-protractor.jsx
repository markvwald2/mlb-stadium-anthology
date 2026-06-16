/* veterans-protractor.jsx — small field instrument: a surveying protractor that
   reads the field-axis bearing (ENE / 67.5°) off true north, with the
   symmetrical field rotated to match. Reads like a survey tool, not a baseball
   diamond icon. Props: lf, cf, rf, orientation, degrees, accent. Local data. */
(function () {
  const e = React.createElement;

  const ink = "#26241F", slate = "#4B4A44", ink3 = "#857F73";
  const red = "#A8132B", redDeep = "#7E0F20";
  const grass = "#73805A", grassHi = "#85916A", clay = "#B49A6A", chalk = "#EEE9D9", wallInk = "#3A3A33";
  const paperHi = "#EFEBE2", ruleStrong = "#A8A290";

  function rot(p, C, deg) {
    const t = deg * Math.PI / 180, c = Math.cos(t), s = Math.sin(t);
    const dx = p[0] - C[0], dy = p[1] - C[1];
    return [C[0] + dx * c - dy * s, C[1] + dx * s + dy * c];
  }
  function outp(p, C, o) {
    const dx = p[0] - C[0], dy = p[1] - C[1], len = Math.hypot(dx, dy) || 1;
    return [p[0] + dx / len * o, p[1] + dy / len * o];
  }
  function polar(C, r, a) { const t = a * Math.PI / 180; return [C[0] + r * Math.sin(t), C[1] - r * Math.cos(t)]; }
  function strip(v) { return (v || "").toString().replace(/\s*ft$/i, ""); }

  function Chip(props) {
    const fs = props.size || 13, w = Math.max(props.minW || 0, props.text.length * fs * 0.62 + (props.padX || 8) * 2), h = 19;
    const tone = props.tone || "paper";
    const fill = tone === "red" ? red : paperHi, stk = tone === "red" ? redDeep : ruleStrong, col = tone === "red" ? "#FFF4F0" : ink;
    return e("g", null,
      e("rect", { x: props.x - w / 2, y: props.y - h / 2, width: w, height: h, rx: 2, fill: fill, stroke: stk, strokeWidth: 1 }),
      e("text", { x: props.x, y: props.y + fs * 0.34, textAnchor: "middle", style: { fontFamily: "'Space Mono', monospace", fontWeight: 700, fontSize: fs + "px", fill: col } }, props.text)
    );
  }

  function VetProtractor(props) {
    const accent = props.accent || red;
    const deg = (props.degrees != null) ? props.degrees : 67.5;
    const orientation = props.orientation || "ENE";
    const C = [170, 182], R = 78, PR = 116;
    const home = [C[0], C[1] + R], cf = [C[0], C[1] - R], lf = [C[0] - R, C[1]], rf = [C[0] + R, C[1]];
    const d = R * 0.30;
    const b1 = [C[0] + d, C[1] + R - d], b2 = [C[0], C[1] + R - 2 * d], b3 = [C[0] - d, C[1] + R - d];
    const mound = [C[0], C[1] + R - 2.6 * d];
    const grassPath = "M " + home[0] + " " + home[1] + " L " + lf[0] + " " + lf[1] + " A " + R + " " + R + " 0 0 1 " + rf[0] + " " + rf[1] + " Z";
    const dia = "M " + home[0] + " " + home[1] + " L " + b1[0] + " " + b1[1] + " L " + b2[0] + " " + b2[1] + " L " + b3[0] + " " + b3[1] + " Z";

    // protractor scale 0..90 (a 67.5 bearing reads on-scale)
    const ticks = [];
    for (let a = 0; a <= 90; a += 7.5) {
      const big = a % 30 === 0;
      const p1 = polar(C, PR, a), p2 = polar(C, PR - (big ? 12 : 6), a);
      ticks.push(e("line", { key: "t" + a, x1: p1[0], y1: p1[1], x2: p2[0], y2: p2[1], stroke: big ? slate : ruleStrong, strokeWidth: big ? 1.3 : 0.8, opacity: big ? 0.9 : 0.55 }));
    }
    const nums = [0, 30, 60, 90].map((a, i) => {
      const p = polar(C, PR + 13, a);
      return e("text", { key: "n" + i, x: p[0], y: p[1] + 4, textAnchor: "middle", style: { fontFamily: "'Space Mono',monospace", fontWeight: 700, fontSize: "10px", fill: ink3 } }, a);
    });
    const arcA = polar(C, PR, 0), arcB = polar(C, PR, 90);
    const protArc = "M " + arcA[0].toFixed(1) + " " + arcA[1].toFixed(1) + " A " + PR + " " + PR + " 0 0 1 " + arcB[0].toFixed(1) + " " + arcB[1].toFixed(1);
    const ntip = polar(C, PR + 14, deg);
    const back = polar(ntip, 10, deg + 180), hl = polar(back, 4.5, deg - 90), hr = polar(back, 4.5, deg + 90);
    const head = [ntip, hl, hr].map(p => p[0].toFixed(1) + "," + p[1].toFixed(1)).join(" ");
    const degPos = polar(C, PR + 32, deg);
    const orPos = polar(C, PR + 32, deg);
    const nlab = polar(C, PR + 13, 0);

    const chips = [
      { p: outp(rot(lf, C, deg), C, 15), t: strip(props.lf) },
      { p: rot(cf, C, deg), t: strip(props.cf) },
      { p: outp(rot(rf, C, deg), C, 15), t: strip(props.rf) }
    ];

    return e("div", { className: "vet-prot-wrap" },
      e("svg", { viewBox: "62 30 280 300", className: "vet-prot-svg", role: "img", "aria-label": "Field dimensions plan, oriented " + orientation + " " + deg + " degrees" },
        e("defs", null,
          e("linearGradient", { id: "vetProtGrass", x1: "0", y1: "0", x2: "0", y2: "1" },
            e("stop", { offset: "0", stopColor: grassHi }), e("stop", { offset: "1", stopColor: grass }))),
        // field (rotated to bearing)
        e("g", { transform: "rotate(" + deg + " " + C[0] + " " + C[1] + ")" },
          e("path", { d: grassPath, fill: "url(#vetProtGrass)", stroke: wallInk, strokeWidth: 1.5, strokeLinejoin: "round" }),
          e("line", { x1: home[0], y1: home[1], x2: lf[0], y2: lf[1], stroke: chalk, strokeWidth: 1, opacity: .8 }),
          e("line", { x1: home[0], y1: home[1], x2: rf[0], y2: rf[1], stroke: chalk, strokeWidth: 1, opacity: .8 }),
          e("path", { d: dia, fill: clay, stroke: chalk, strokeWidth: 1.2, strokeLinejoin: "round" }),
          e("circle", { cx: mound[0], cy: mound[1], r: 2.4, fill: clay, stroke: chalk, strokeWidth: .8 })),
        // protractor arc + ticks + numerals
        e("path", { d: protArc, fill: "none", stroke: ink3, strokeWidth: 1, opacity: 0.55 }),
        ticks, nums,
        e("text", { x: nlab[0], y: nlab[1] - 8, textAnchor: "middle", style: { fontFamily: "'Oswald',sans-serif", fontWeight: 700, fontSize: "11px", fill: slate, letterSpacing: ".04em" } }, "N"),
        // north baseline (0 deg) + bearing needle
        e("line", { x1: C[0], y1: C[1], x2: polar(C, PR, 0)[0], y2: polar(C, PR, 0)[1], stroke: ink3, strokeWidth: 1, strokeDasharray: "3 3" }),
        e("line", { x1: C[0], y1: C[1], x2: ntip[0], y2: ntip[1], stroke: accent, strokeWidth: 2, strokeLinecap: "round" }),
        e("polygon", { points: head, fill: redDeep }),
        e("circle", { cx: C[0], cy: C[1], r: 2.8, fill: accent }),
        e(Chip, { x: degPos[0], y: degPos[1], text: deg + "\u00b0", size: 12, tone: "red", padX: 6 }),
        chips.map((c, i) => e(Chip, { key: "d" + i, x: c.p[0], y: c.p[1], text: c.t, size: 12 }))
      )
    );
  }

  window.VetProtractor = VetProtractor;
})();
