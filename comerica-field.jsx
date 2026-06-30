/* comerica-field.jsx — "Civic Gateway" field instrument for Comerica Park,
   built in this project's protractor style (cf. protractor-diagram.jsx):
   a graduated protractor scale reads the field-axis bearing off true north,
   the ballpark is rotated to match, an orange needle marks the bearing, and
   limestone chips carry LF / CF / RF. Comerica archival palette (navy / orange /
   limestone). Geometry from window.COMERICA. Local data only. */
(function () {
  const e = React.createElement;

  // Comerica palette
  const navy = "#0C2340", navyDeep = "#10294A", orange = "#C8501C",
        clay = "#CBA46C", clayEdge = "#A87C45", wallInk = "#0C2340",
        paper = "#F1EAD6", rule = "#C2B596", ruleStrong = "#B4A88C", ink3 = "#8C8270";

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
    const fs = props.size || 13;
    const w = Math.max(props.minW || 0, props.text.length * fs * 0.62 + (props.padX || 7) * 2), h = 19;
    const hot = props.tone === "hot";
    const fill = hot ? orange : paper, stk = hot ? orange : rule, col = hot ? "#F4EEDF" : navy;
    return e("g", null,
      e("rect", { x: props.x - w / 2, y: props.y - h / 2, width: w, height: h, rx: 2, fill: fill, stroke: stk, strokeWidth: 1 }),
      e("text", { x: props.x, y: props.y + fs * 0.35, textAnchor: "middle",
        style: { fontFamily: "'Space Mono', monospace", fontWeight: 700, fontSize: fs + "px", fill: col } }, props.text)
    );
  }

  function ComericaProtractor(props) {
    const deg = (props.degrees != null) ? props.degrees : 150;
    const orientation = props.orientation || "SSE";
    const C = [168, 164], R = 70, PR = 110;

    // field geometry (local: home bottom, CF top, LF/RF equator)
    const home = [C[0], C[1] + R], cf = [C[0], C[1] - R], lf = [C[0] - R, C[1]], rf = [C[0] + R, C[1]];
    const d = R * 0.30;
    const b1 = [C[0] + d, C[1] + R - d], b2 = [C[0], C[1] + R - 2 * d], b3 = [C[0] - d, C[1] + R - d];
    const grassPath = "M " + home[0] + " " + home[1] + " L " + lf[0] + " " + lf[1] +
      " A " + R + " " + R + " 0 0 1 " + rf[0] + " " + rf[1] + " Z";
    const dia = "M " + home[0] + " " + home[1] + " L " + b1[0] + " " + b1[1] +
      " L " + b2[0] + " " + b2[1] + " L " + b3[0] + " " + b3[1] + " Z";

    // protractor scale (full semicircle, N at top)
    const ticks = [];
    for (let a = 0; a <= 180; a += 15) {
      const big = a % 45 === 0;
      const p1 = polar(C, PR, a), p2 = polar(C, PR - (big ? 12 : 6), a);
      ticks.push(e("line", { key: "t" + a, x1: p1[0], y1: p1[1], x2: p2[0], y2: p2[1],
        stroke: big ? navy : ruleStrong, strokeWidth: big ? 1.3 : 0.8, opacity: big ? 0.9 : 0.55 }));
    }
    const nums = [0, 90, 180].map((a, i) => {
      const p = polar(C, PR + 13, a);
      return e("text", { key: "n" + i, x: p[0], y: p[1] + 4, textAnchor: "middle",
        style: { fontFamily: "'Space Mono',monospace", fontWeight: 700, fontSize: "12px", fill: ink3 } }, a);
    });
    const arcA = polar(C, PR, 0), arcB = polar(C, PR, 180);
    const protArc = "M " + arcA[0] + " " + arcA[1] + " A " + PR + " " + PR + " 0 0 1 " + arcB[0].toFixed(1) + " " + arcB[1].toFixed(1);

    const ntip = polar(C, PR + 14, deg);
    const back = polar(ntip, 9, deg + 180), hl = polar(back, 4, deg - 90), hr = polar(back, 4, deg + 90);
    const head = [ntip, hl, hr].map(p => p[0].toFixed(1) + "," + p[1].toFixed(1)).join(" ");
    const bc = window.FieldLabels.bearingChip(C, PR + 16, deg, 28, 20);
    const nlab = polar(C, PR + 13, 0);

    const chips = [
      { p: out(rot(lf, C, deg), C, 16), t: strip(props.lf) },
      { p: window.FieldLabels.cfWallPoint(C, R, deg), t: strip(props.cf) },
      { p: out(rot(rf, C, deg), C, 16), t: strip(props.rf) }
    ];

    return e("svg", { viewBox: "44 24 272 286", role: "img",
      "aria-label": "Field plan oriented " + orientation + " " + deg + " degrees; LF " + props.lf + " CF " + props.cf + " RF " + props.rf,
      style: { width: "100%", height: "auto", overflow: "visible" } },
      // field group (rotated to the field axis bearing)
      e("g", { transform: "rotate(" + deg + " " + C[0] + " " + C[1] + ")" },
        e("path", { d: grassPath, fill: navy, fillOpacity: 0.07, stroke: wallInk, strokeWidth: 1.5, strokeLinejoin: "round" }),
        e("path", { d: dia, fill: clay, fillOpacity: 0.55, stroke: clayEdge, strokeWidth: 1, strokeLinejoin: "round" }),
        e("circle", { cx: home[0], cy: home[1] - R * 0.42, r: 2.4, fill: clayEdge })
      ),
      // protractor arc + ticks + numerals
      e("path", { d: protArc, fill: "none", stroke: ink3, strokeWidth: 1, opacity: 0.6 }),
      ticks, nums,
      e("text", { x: nlab[0], y: nlab[1] - 9, textAnchor: "middle",
        style: { fontFamily: "'Oswald',sans-serif", fontWeight: 700, fontSize: "15px", fill: navy, letterSpacing: ".04em" } }, "N"),
      // north baseline (0°) + bearing needle
      e("line", { x1: C[0], y1: C[1], x2: polar(C, PR, 0)[0], y2: polar(C, PR, 0)[1], stroke: ink3, strokeWidth: 1, strokeDasharray: "3 3" }),
      e("line", { x1: C[0], y1: C[1], x2: ntip[0], y2: ntip[1], stroke: orange, strokeWidth: 2.1, strokeLinecap: "round" }),
      e("polygon", { points: head, fill: navyDeep }),
      e("circle", { cx: C[0], cy: C[1], r: 2.8, fill: orange }),
      e(Chip, { x: bc.x, y: bc.y, text: deg + "\u00b0", size: 14, tone: "hot", padX: 6 }),
      // distance chips (in place on the field)
      chips.map((c, i) => e(Chip, { key: "d" + i, x: c.p[0], y: c.p[1], text: c.t, size: 15 }))
    );
  }

  window.ComericaProtractor = ComericaProtractor;
})();
