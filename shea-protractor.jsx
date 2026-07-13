/* shea-protractor.jsx — small field instrument embedded in the Stadium Facts
   bay: a surveying protractor reading the field-axis bearing (ENE / 67.5°) off
   true north, the symmetrical 338/410/338 field rotated to match. A single
   apple-red dot sits beyond center field as a quiet Home Run Apple cue.
   Reads as a survey tool, not a baseball-diamond icon. Local data only. */
(function () {
  const e = React.createElement;

  const ink = "#23211C", slate = "#4A4942", ink3 = "#807A6E";
  const blue = "#0A2E73", orange = "#E8531A", apple = "#B11226";
  const grass = "#6E7C52", grassHi = "#7E8B61", clay = "#B49A6A", chalk = "#EEE9D9", wallInk = "#39392F";
  const paperHi = "#EFEBE2", ruleStrong = "#A6A091";

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
    const fs = props.size || 13, w = Math.max(props.minW || 0, props.text.length * fs * 0.62 + (props.padX || 8) * 2), h = Math.round(fs * 1.42);
    const tone = props.tone || "paper";
    const fill = tone === "blue" ? blue : paperHi, stk = tone === "blue" ? "#072357" : ruleStrong, col = tone === "blue" ? "#F2F4FB" : ink;
    return e("g", null,
      e("rect", { x: props.x - w / 2, y: props.y - h / 2, width: w, height: h, rx: 2, fill: fill, stroke: stk, strokeWidth: 1 }),
      e("text", { x: props.x, y: props.y + fs * 0.34, textAnchor: "middle", style: { fontFamily: "'Space Mono', monospace", fontWeight: 700, fontSize: fs + "px", fill: col } }, props.text)
    );
  }

  function SheaProtractor(props) {
    const accent = props.accent || orange;
    const deg = (props.degrees != null) ? props.degrees : 67.5;
    const orientation = props.orientation || "ENE";
    const C = [170, 182], R = 78, PR = 116;
    const home = [C[0], C[1] + R], cf = [C[0], C[1] - R], lf = [C[0] - R, C[1]], rf = [C[0] + R, C[1]];
    const d = R * 0.30;
    const b1 = [C[0] + d, C[1] + R - d], b2 = [C[0], C[1] + R - 2 * d], b3 = [C[0] - d, C[1] + R - d];
    const mound = [C[0], C[1] + R - 2.6 * d];
    const grassPath = "M " + home[0] + " " + home[1] + " L " + lf[0] + " " + lf[1] + " A " + R + " " + R + " 0 0 1 " + rf[0] + " " + rf[1] + " Z";
    const dia = "M " + home[0] + " " + home[1] + " L " + b1[0] + " " + b1[1] + " L " + b2[0] + " " + b2[1] + " L " + b3[0] + " " + b3[1] + " Z";
    // apple-red Home Run Apple cue: small dot just beyond CF wall, pre-rotation
    const apl = [C[0], C[1] - R - 9];

    const ticks = [];
    for (let a = 0; a <= 90; a += 7.5) {
      const big = a % 30 === 0;
      const p1 = polar(C, PR, a), p2 = polar(C, PR - (big ? 12 : 6), a);
      ticks.push(e("line", { key: "t" + a, x1: p1[0], y1: p1[1], x2: p2[0], y2: p2[1], stroke: big ? slate : ruleStrong, strokeWidth: big ? 1.3 : 0.8, opacity: big ? 0.9 : 0.55 }));
    }
    const nums = [0, 30, 60, 90].map((a, i) => {
      const p = polar(C, PR + 13, a);
      return e("text", { key: "n" + i, x: p[0], y: p[1] + 5, textAnchor: "middle", style: { fontFamily: "'Space Mono',monospace", fontWeight: 700, fontSize: "18px", fill: ink3 } }, a);
    });
    const arcA = polar(C, PR, 0), arcB = polar(C, PR, 90);
    const protArc = "M " + arcA[0].toFixed(1) + " " + arcA[1].toFixed(1) + " A " + PR + " " + PR + " 0 0 1 " + arcB[0].toFixed(1) + " " + arcB[1].toFixed(1);
    const ntip = polar(C, PR + 14, deg);
    const back = polar(ntip, 10, deg + 180), hl = polar(back, 4.5, deg - 90), hr = polar(back, 4.5, deg + 90);
    const head = [ntip, hl, hr].map(p => p[0].toFixed(1) + "," + p[1].toFixed(1)).join(" ");
    const bc = window.FieldLabels.bearingChip(C, PR + 16, deg, 28, 20);
    const nlab = polar(C, PR + 13, 0);

    const chips = [
      { p: outp(rot(lf, C, deg), C, 15), t: strip(props.lf) },
      { p: window.FieldLabels.cfWallPoint(C, R, deg), t: strip(props.cf) },
      { p: outp(rot(rf, C, deg), C, 15), t: strip(props.rf) }
    ];

    return e("div", { className: "shea-prot-wrap" },
      e("svg", { viewBox: "62 26 280 304", className: "shea-prot-svg", role: "img", "aria-label": "Field plan, oriented " + orientation + " " + deg + " degrees, 338/410/338" },
        e("defs", null,
          e("linearGradient", { id: "sheaProtGrass", x1: "0", y1: "0", x2: "0", y2: "1" },
            e("stop", { offset: "0", stopColor: grassHi }), e("stop", { offset: "1", stopColor: grass }))),
        // field (rotated to bearing) + apple cue rotated with it
        e("g", { transform: "rotate(" + deg + " " + C[0] + " " + C[1] + ")" },
          e("path", { d: grassPath, fill: "url(#sheaProtGrass)", stroke: wallInk, strokeWidth: 1.5, strokeLinejoin: "round" }),
          e("line", { x1: home[0], y1: home[1], x2: lf[0], y2: lf[1], stroke: chalk, strokeWidth: 1, opacity: .8 }),
          e("line", { x1: home[0], y1: home[1], x2: rf[0], y2: rf[1], stroke: chalk, strokeWidth: 1, opacity: .8 }),
          e("path", { d: dia, fill: clay, stroke: chalk, strokeWidth: 1.2, strokeLinejoin: "round" }),
          e("circle", { cx: apl[0], cy: apl[1], r: 4.4, fill: apple, stroke: "#7E0C1A", strokeWidth: 1 })),
        // protractor arc + ticks + numerals
        e("path", { d: protArc, fill: "none", stroke: ink3, strokeWidth: 1, opacity: 0.55 }),
        ticks, nums,
        e("text", { x: nlab[0], y: nlab[1] - 9, textAnchor: "middle", style: { fontFamily: "'Saira Semi Condensed',sans-serif", fontWeight: 700, fontSize: "18px", fill: slate, letterSpacing: ".04em" } }, "N"),
        // north baseline (0 deg) + bearing needle
        e("line", { x1: C[0], y1: C[1], x2: polar(C, PR, 0)[0], y2: polar(C, PR, 0)[1], stroke: ink3, strokeWidth: 1, strokeDasharray: "3 3" }),
        e("line", { x1: C[0], y1: C[1], x2: ntip[0], y2: ntip[1], stroke: accent, strokeWidth: 2, strokeLinecap: "round" }),
        e("polygon", { points: head, fill: "#B5410F" }),
        e("circle", { cx: C[0], cy: C[1], r: 2.8, fill: accent }),
        e(Chip, { x: bc.x + 28.8, y: bc.y - 9.6, text: deg + "\u00b0", size: 26, tone: "blue", padX: 6 }),
        chips.map((c, i) => e(Chip, { key: "d" + i, x: c.p[0], y: c.p[1], text: c.t, size: 26 }))
      )
    );
  }

  window.SheaProtractor = SheaProtractor;
})();
