/* county-protractor.jsx — compact field-orientation instrument for the
   Milwaukee County Stadium "Lamp-Matrix Municipal" spread. A small (~1 in)
   protractor drawn for a dark scoreboard bay: amber arc + ticks, lamp-cream
   field glyph, red-orange bearing needle. Field axis read off true north at
   SE / 135 degrees; symmetric bowl 362 / 402 / 362.
   Drawn from window.MCS geometry. Local data only; no invented values. */
(function () {
  const e = React.createElement;

  function polar(C, r, a) { const t = a * Math.PI / 180; return [C[0] + r * Math.sin(t), C[1] - r * Math.cos(t)]; }

  function CountyProtractor(props) {
    const deg = props.degrees != null ? props.degrees : 135;
    const orientation = props.orientation || "SE";
    const amber = "#f4b223", amberDim = "#9a7e3a", cream = "#ece3cf",
          red = "#e0623a", muted = "#8aa0bb";
    const aDim = "#7d6a3c", rule = "#42597a";
    const C = [96, 86], R = 56, PR = 74;

    // small symmetric ballpark glyph (home bottom, CF top)
    const home = [C[0], C[1] + R * 0.6], cf = [C[0], C[1] - R * 0.62],
          lf = [C[0] - R * 0.62, C[1] + R * 0.02], rf = [C[0] + R * 0.62, C[1] + R * 0.02];
    const grass = "M " + home[0] + " " + home[1] + " L " + lf[0] + " " + lf[1] +
                  " A " + (R * 0.62) + " " + (R * 0.62) + " 0 0 1 " + rf[0] + " " + rf[1] + " Z";

    const ticks = [];
    for (let a = 90; a <= 180; a += 15) {
      const big = a % 45 === 0;
      const p1 = polar(C, PR, a), p2 = polar(C, PR - (big ? 9 : 5), a);
      ticks.push(e("line", { key: "t" + a, x1: p1[0], y1: p1[1], x2: p2[0], y2: p2[1],
        stroke: big ? amber : aDim, strokeWidth: big ? 1.3 : 0.8 }));
    }
    const nums = [90, 135, 180].filter((a) => a !== deg).map((a, i) => {
      const p = polar(C, PR + 13, a);
      return e("text", { key: "n" + i, x: p[0], y: p[1] + 3.5, textAnchor: "middle",
        style: { fontFamily: "'Space Mono',monospace", fontWeight: 700, fontSize: "10px", fill: muted } }, a);
    });
    const arcA = polar(C, PR, 90), arcB = polar(C, PR, 180);
    const arc = "M " + arcA[0].toFixed(1) + " " + arcA[1].toFixed(1) + " A " + PR + " " + PR + " 0 0 1 " + arcB[0].toFixed(1) + " " + arcB[1].toFixed(1);
    const ntip = polar(C, PR + 4, deg);
    const nlab = polar(C, 44, 0);
    const dlab = polar(C, PR + 26, deg);

    return e("svg", { viewBox: "6 28 180 138", className: props.className, role: "img",
      "aria-label": "Field orientation " + orientation + " " + deg + " degrees", style: { overflow: "visible" } },
      e("g", { transform: "rotate(" + deg + " " + C[0] + " " + C[1] + ")" },
        e("path", { d: grass, fill: amber, fillOpacity: 0.16, stroke: amber, strokeWidth: 1.3, strokeLinejoin: "round" }),
        e("line", { x1: home[0], y1: home[1], x2: lf[0], y2: lf[1], stroke: cream, strokeWidth: 0.9, strokeOpacity: 0.7 }),
        e("line", { x1: home[0], y1: home[1], x2: rf[0], y2: rf[1], stroke: cream, strokeWidth: 0.9, strokeOpacity: 0.7 })
      ),
      e("path", { d: arc, fill: "none", stroke: aDim, strokeWidth: 1 }),
      ticks, nums,
      e("text", { x: nlab[0], y: nlab[1] - 4, textAnchor: "middle",
        style: { fontFamily: "'Saira Condensed',sans-serif", fontWeight: 700, fontSize: "12px", fill: cream } }, "N"),
      // north baseline + bearing needle (SE / 135)
      e("line", { x1: C[0], y1: C[1], x2: polar(C, 32, 0)[0], y2: polar(C, 32, 0)[1], stroke: rule, strokeWidth: 0.9, strokeDasharray: "2.5 2.5" }),
      e("line", { x1: C[0], y1: C[1], x2: ntip[0], y2: ntip[1], stroke: red, strokeWidth: 2, strokeLinecap: "round" }),
      e("circle", { cx: ntip[0], cy: ntip[1], r: 2.6, fill: red }),
      e("circle", { cx: C[0], cy: C[1], r: 2.4, fill: amber }),
      e("text", { x: dlab[0], y: dlab[1] + 4, textAnchor: "middle",
        style: { fontFamily: "'Space Mono',monospace", fontWeight: 700, fontSize: "14px", fill: red } }, deg + "\u00b0")
    );
  }

  window.CountyProtractor = CountyProtractor;
})();
