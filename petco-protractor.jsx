/* petco-protractor.jsx — Petco Park "Field Geometry" graphic, drawn as a small
   architect's protractor instrument (not a baseball-diamond icon). A protractor
   scale reads the field-axis bearing off true north; Petco's axis points N at
   0°, so the simple ballpark sits straight up under the needle. LF / CF / RF
   distance chips ring the arc. Petco palette (sandstone + Western-Metal brick +
   gold + white-painted steel). Props: lf, cf, rf, orientation, degrees, accent.
   Exposes window.PetcoProtractor. Local data only. */
(function () {
  const e = React.createElement;

  // Petco "Dark Urban Monograph" palette — light marks on the charcoal sheet,
  // gold instrument needle, light callout chips with dark text, muted field.
  const ink = "#E8DEC9", chipInk = "#22201A", arrow = "#E2BC73", needleGold = "#C99A4A";
  const grass = "#454F2D", grassHi = "#515C36", clay = "#7E602F", clayEdge = "#5E471F", wallInk = "#74804C";
  const paperHi = "#E8DEC9", rule = "#423D34", ruleStrong = "#5E5849", ink3 = "#9A9079", ink2 = "#7E7560";

  function out(p, C, o) {
    const dx = p[0] - C[0], dy = p[1] - C[1], len = Math.hypot(dx, dy) || 1;
    return [p[0] + dx / len * o, p[1] + dy / len * o];
  }
  function rot(p, C, deg) {
    const t = deg * Math.PI / 180, c = Math.cos(t), s = Math.sin(t);
    const dx = p[0] - C[0], dy = p[1] - C[1];
    return [C[0] + dx * c - dy * s, C[1] + dx * s + dy * c];
  }
  function polar(C, r, a) { const t = a * Math.PI / 180; return [C[0] + r * Math.sin(t), C[1] - r * Math.cos(t)]; }
  function strip(v) { return (v || "").toString().replace(" ft", ""); }

  function Chip(props) {
    const fs = props.size || 15, w = Math.max(props.minW || 0, props.text.length * fs * 0.62 + (props.padX || 9) * 2), h = 22;
    const tone = props.tone || "paper";
    const fill = tone === "accent" ? needleGold : paperHi, stk = tone === "accent" ? "#6E541F" : ruleStrong, col = chipInk;
    return e("g", null,
      e("rect", { x: props.x - w / 2, y: props.y - h / 2, width: w, height: h, rx: 2.5, fill: fill, stroke: stk, strokeWidth: 1 }),
      e("text", { x: props.x, y: props.y + fs * 0.35, textAnchor: "middle", style: { fontFamily: "'Space Mono', monospace", fontWeight: 700, fontSize: fs + "px", fill: col } }, props.text)
    );
  }

  function PetcoProtractor(props) {
    const accent = props.accent || needleGold;
    const deg = (props.degrees != null) ? props.degrees : 0;
    const orientation = props.orientation || "N";
    const C = [180, 198], R = 90, PR = 128;
    const home = [C[0], C[1] + R], cf = [C[0], C[1] - R], lf = [C[0] - R, C[1]], rf = [C[0] + R, C[1]];
    const d = R * 0.30;
    const b1 = [C[0] + d, C[1] + R - d], b2 = [C[0], C[1] + R - 2 * d], b3 = [C[0] - d, C[1] + R - d];
    const grassPath = "M " + home[0] + " " + home[1] + " L " + lf[0] + " " + lf[1] + " A " + R + " " + R + " 0 0 1 " + rf[0] + " " + rf[1] + " Z";
    const dia = "M " + home[0] + " " + home[1] + " L " + b1[0] + " " + b1[1] + " L " + b2[0] + " " + b2[1] + " L " + b3[0] + " " + b3[1] + " Z";

    // protractor scale (0..110° to clear the chips), drawn east of north
    const ticks = [];
    for (let a = 0; a <= 110; a += 10) {
      const big = a % 30 === 0;
      const p1 = polar(C, PR, a), p2 = polar(C, PR - (big ? 13 : 7), a);
      ticks.push(e("line", { key: "t" + a, x1: p1[0], y1: p1[1], x2: p2[0], y2: p2[1], stroke: big ? ink : ruleStrong, strokeWidth: big ? 1.4 : 0.9, opacity: big ? 0.9 : 0.55 }));
    }
    const nums = [0, 30, 60, 90].map((a, i) => {
      const p = polar(C, PR + 14, a);
      return e("text", { key: "n" + i, x: p[0], y: p[1] + 4, textAnchor: "middle", style: { fontFamily: "'Space Mono',monospace", fontWeight: 700, fontSize: "11px", fill: ink3 } }, a);
    });
    const arcA = polar(C, PR, 0), arcB = polar(C, PR, 110);
    const protArc = "M " + arcA[0] + " " + arcA[1] + " A " + PR + " " + PR + " 0 0 1 " + arcB[0].toFixed(1) + " " + arcB[1].toFixed(1);
    const ntip = polar(C, PR + 16, deg);
    const back = polar(ntip, 10, deg + 180), hl = polar(back, 4.5, deg - 90), hr = polar(back, 4.5, deg + 90);
    const head = [ntip, hl, hr].map(p => p[0].toFixed(1) + "," + p[1].toFixed(1)).join(" ");
    const bc = window.FieldLabels.bearingChip(C, PR + 16, deg, 28, 20);
    const nlab = polar(C, PR + 14, 0);

    const chips = [
      { p: out(rot(lf, C, deg), C, 18), t: strip(props.lf) },
      { p: window.FieldLabels.cfWallPoint(C, R, deg), t: strip(props.cf) },
      { p: out(rot(rf, C, deg), C, 18), t: strip(props.rf) }
    ];

    return e("svg", { viewBox: "20 28 320 290", className: "pk-fig", role: "img", "aria-label": "Field geometry plan, oriented " + orientation + " " + deg + " degrees" },
      e("defs", null,
        e("linearGradient", { id: "petcoProtGrass", x1: "0", y1: "0", x2: "0", y2: "1" },
          e("stop", { offset: "0", stopColor: grassHi }), e("stop", { offset: "1", stopColor: grass }))
      ),
      e("g", { transform: "rotate(" + deg + " " + C[0] + " " + C[1] + ")" },
        e("path", { d: grassPath, fill: "url(#petcoProtGrass)", stroke: wallInk, strokeWidth: 1.6, strokeLinejoin: "round" }),
        e("path", { d: dia, fill: clay, stroke: clayEdge, strokeWidth: 1, strokeLinejoin: "round", opacity: 0.92 })
      ),
      e("path", { d: protArc, fill: "none", stroke: ink3, strokeWidth: 1.1, opacity: 0.6 }),
      ticks, nums,
      e("text", { x: nlab[0], y: nlab[1] - 9, textAnchor: "middle", style: { fontFamily: "'Oswald',sans-serif", fontWeight: 700, fontSize: "12px", fill: ink, letterSpacing: ".04em" } }, "N"),
      e("line", { x1: C[0], y1: C[1], x2: polar(C, PR, 0)[0], y2: polar(C, PR, 0)[1], stroke: ink2, strokeWidth: 1.1, strokeDasharray: "3 3" }),
      e("line", { x1: C[0], y1: C[1], x2: ntip[0], y2: ntip[1], stroke: accent, strokeWidth: 2.2, strokeLinecap: "round" }),
      e("polygon", { points: head, fill: arrow }),
      e("circle", { cx: C[0], cy: C[1], r: 3, fill: accent }),
      e(Chip, { x: bc.x, y: bc.y, text: deg + "\u00b0", size: 14, tone: "accent", padX: 7 }),
      chips.map((c, i) => e(Chip, { key: "d" + i, x: c.p[0], y: c.p[1], text: c.t, size: 15 }))
    );
  }

  window.PetcoProtractor = PetcoProtractor;
})();
