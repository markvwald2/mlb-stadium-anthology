/* citizens-diagram.jsx — drafting instruments for the Citizens Bank Park spread.
   Steel-gray line work on warm paper; field green, granite, and restrained
   brick-red / Phillies-blue accents. Local data only. Exposes window.CBPDiagrams:
     FieldInstrument — small protractor-style field-geometry plate (LF/CF/RF)
                       with the N / 9-degree orientation cue. ~1 inch, subordinate.
     VetGhost        — the lifecycle transition: a ghosted radial multipurpose
                       bowl (Veterans Stadium) resolving into a rectilinear
                       baseball-specific brick footprint (Citizens Bank Park).
     Bell            — a minimal Liberty Bell silhouette used as a restrained
                       signal mark; never cartoonish.
*/
(function () {
  const e = React.createElement;
  const ink = "#211A14", ink2 = "#574B3D", ink3 = "#8A7E6B",
        navy = "#1E3A6E", steel = "#6E6A63", steelHi = "#9A948A",
        brick = "#8E3B2F", brickHi = "#A85040", red = "#BA0C2F",
        stone = "#D8CDB6", grass = "#5E7350", grassHi = "#6E8460",
        rule = "#C3B69C", paperHi = "#F4ECDA";
  const MONO = "'Space Mono', monospace";
  const SANS = "'Oswald', sans-serif";

  /* ------------------------------------------------ Liberty Bell signal mark */
  function Bell(props) {
    const s = props.size || 26, c = props.color || brick, op = props.opacity == null ? 1 : props.opacity;
    return e("svg", { width: s, height: s, viewBox: "0 0 32 32", role: "img",
      "aria-label": "Liberty Bell mark", style: { display: "block", flex: "none", opacity: op } },
      // crown / yoke
      e("rect", { x: 14, y: 3, width: 4, height: 3.4, rx: 1, fill: c }),
      // bell body — two quadratic shoulders flaring to a flat rim
      e("path", { d: "M 16 6 C 11 6 9 10 8.4 16 C 8 20 7 23 5.5 25 L 26.5 25 C 25 23 24 20 23.6 16 C 23 10 21 6 16 6 Z",
        fill: c }),
      // base rim
      e("rect", { x: 4.5, y: 25.4, width: 23, height: 3, rx: 1, fill: c }),
      // clapper
      e("circle", { cx: 16, cy: 26.9, r: 1.5, fill: paperHi }),
      // the crack
      e("path", { d: "M 18.4 9 L 16.6 13 L 18 16 L 16.4 20 L 17.4 24.6", fill: "none",
        stroke: paperHi, strokeWidth: 1.1, strokeLinejoin: "round", strokeLinecap: "round", opacity: 0.85 })
    );
  }

  /* ------------------------------------------------ field geometry plate */
  // Compact, subordinate protractor: fair wedge, foul lines, LF/CF/RF chips,
  // small infield diamond, and an N / 9-degree orientation cue. Not a hero.
  function FieldInstrument(props) {
    const lf = props.lf, cf = props.cf, rf = props.rf;
    const orientation = props.orientation, deg = props.degrees;
    const W = 232, H = 196;
    const C = [W / 2 + 4, 168];                  // home plate
    const rCF = 120;                              // CF (401) deepest
    const rLF = rCF * Number(lf) / Number(cf);    // 329
    const rRF = rCF * Number(rf) / Number(cf);    // 369
    const FOUL = 45;                              // half foul-angle from CF axis
    const polar = (r, aDeg) => { const a = aDeg * Math.PI / 180; return [C[0] + r * Math.sin(a), C[1] - r * Math.cos(a)]; };
    const pLF = polar(rLF, -FOUL), pCF = polar(rCF, 0), pRF = polar(rRF, FOUL);
    const sector = "M " + C[0] + " " + C[1] +
      " L " + pLF[0].toFixed(1) + " " + pLF[1].toFixed(1) +
      " Q " + polar(rCF * 1.05, -FOUL / 2)[0].toFixed(1) + " " + polar(rCF * 1.05, -FOUL / 2)[1].toFixed(1) +
        " " + pCF[0].toFixed(1) + " " + pCF[1].toFixed(1) +
      " Q " + polar(rCF * 1.05, FOUL / 2)[0].toFixed(1) + " " + polar(rCF * 1.05, FOUL / 2)[1].toFixed(1) +
        " " + pRF[0].toFixed(1) + " " + pRF[1].toFixed(1) + " Z";
    // protractor arc + ticks
    const ticks = [];
    for (let a = -FOUL; a <= FOUL; a += FOUL / 4) {
      const big = Math.abs(a) < 1 || Math.abs(Math.abs(a) - FOUL) < 1;
      const p1 = polar(rCF + 9, a), p2 = polar(rCF + 9 - (big ? 9 : 5), a);
      ticks.push(e("line", { key: "tk" + a, x1: p1[0], y1: p1[1], x2: p2[0], y2: p2[1],
        stroke: big ? ink2 : ink3, strokeWidth: big ? 1.1 : 0.7, opacity: big ? 0.9 : 0.5 }));
    }
    const arcA = polar(rCF + 9, -FOUL), arcB = polar(rCF + 9, FOUL);
    const protArc = "M " + arcA[0].toFixed(1) + " " + arcA[1].toFixed(1) +
      " A " + (rCF + 9) + " " + (rCF + 9) + " 0 0 1 " + arcB[0].toFixed(1) + " " + arcB[1].toFixed(1);
    const d = 15;
    const dia = "M " + C[0] + " " + C[1] +
      " L " + (C[0] + d) + " " + (C[1] - d) + " L " + C[0] + " " + (C[1] - 2 * d) +
      " L " + (C[0] - d) + " " + (C[1] - d) + " Z";

    function chip(p, t, off) {
      const fs = 11, w = t.length * fs * 0.62 + 12, h = 17;
      const x = p[0] + (off ? off[0] : 0), y = p[1] + (off ? off[1] : 0);
      return e("g", { key: "c" + t },
        e("rect", { x: x - w / 2, y: y - h / 2, width: w, height: h, rx: 2, fill: paperHi, stroke: rule, strokeWidth: 1 }),
        e("text", { x: x, y: y + 3.6, textAnchor: "middle",
          style: { fontFamily: MONO, fontWeight: 700, fontSize: fs + "px", fill: ink } }, t));
    }

    // N orientation arrow (true north), bearing deg east of plate-CF axis
    const nC = [30, 40], nR = 19;
    const nTip = [nC[0] + nR * Math.sin(deg * Math.PI / 180), nC[1] - nR * Math.cos(deg * Math.PI / 180)];
    const nB1 = [nC[0] + 5 * Math.sin((deg + 145) * Math.PI / 180), nC[1] - 5 * Math.cos((deg + 145) * Math.PI / 180)];
    const nB2 = [nC[0] + 5 * Math.sin((deg - 145) * Math.PI / 180), nC[1] - 5 * Math.cos((deg - 145) * Math.PI / 180)];

    return e("svg", { viewBox: "0 0 " + W + " " + H, className: "cbp-fig", role: "img",
      "aria-label": "Field geometry: LF " + lf + ", CF " + cf + ", RF " + rf + " feet; oriented " + orientation + " " + deg + " degrees" },
      e("defs", null,
        e("linearGradient", { id: "cbpGrass", x1: "0", y1: "0", x2: "0", y2: "1" },
          e("stop", { offset: "0", stopColor: grassHi }), e("stop", { offset: "1", stopColor: grass }))),
      e("path", { d: sector, fill: "url(#cbpGrass)", stroke: "#52663F", strokeWidth: 1, strokeLinejoin: "round", opacity: 0.42 }),
      e("line", { x1: C[0], y1: C[1], x2: pLF[0], y2: pLF[1], stroke: ink2, strokeWidth: 0.9, opacity: 0.8 }),
      e("line", { x1: C[0], y1: C[1], x2: pRF[0], y2: pRF[1], stroke: ink2, strokeWidth: 0.9, opacity: 0.8 }),
      e("path", { d: dia, fill: "none", stroke: ink2, strokeWidth: 1, strokeLinejoin: "round" }),
      e("path", { d: protArc, fill: "none", stroke: ink3, strokeWidth: 1, opacity: 0.6 }),
      ticks,
      chip(pLF, lf, [-4, 0]),
      chip(pCF, cf, [0, -11]),
      chip(pRF, rf, [4, 0]),
      e("circle", { cx: C[0], cy: C[1], r: 2.4, fill: navy }),
      // N orientation cue
      e("circle", { cx: nC[0], cy: nC[1], r: nR, fill: "none", stroke: ink3, strokeWidth: 0.8, opacity: 0.6 }),
      e("line", { x1: nC[0], y1: nC[1], x2: nTip[0], y2: nTip[1], stroke: navy, strokeWidth: 1.6, strokeLinecap: "round" }),
      e("polygon", { points: nTip[0].toFixed(1) + "," + nTip[1].toFixed(1) + " " + nB1[0].toFixed(1) + "," + nB1[1].toFixed(1) + " " + nB2[0].toFixed(1) + "," + nB2[1].toFixed(1), fill: red }),
      e("text", { x: nC[0], y: nC[1] + 32, textAnchor: "middle",
        style: { fontFamily: SANS, fontWeight: 700, fontSize: "12px", fill: ink, letterSpacing: ".05em" } }, orientation),
      e("text", { x: nC[0] + 34, y: nC[1] - 4, textAnchor: "start",
        style: { fontFamily: MONO, fontWeight: 700, fontSize: "15px", fill: ink } }, deg + "\u00b0"),
      e("text", { x: nC[0] + 34, y: nC[1] + 9, textAnchor: "start",
        style: { fontFamily: SANS, fontWeight: 500, fontSize: "7.5px", fill: ink3, letterSpacing: ".12em" } }, "FIELD ORIENT.")
    );
  }

  /* ------------------------------------------------ lifecycle transition */
  // Left: the Veterans Stadium "concrete donut" — a circular multipurpose
  // seating ring around a symmetric field. Right: Citizens Bank Park as an open
  // baseball footprint — a grass wedge opening from home plate inside a brick
  // grandstand horseshoe. An arrow carries multipurpose -> baseball-specific.
  function VetGhost() {
    const W = 240, H = 150;
    const L = [60, 84], R = [184, 84];
    const concrete = "#CBC4B2", concreteEdge = steel;
    const polarUp = (C, r, deg) => { const a = deg * Math.PI / 180; return [C[0] + r * Math.sin(a), C[1] - r * Math.cos(a)]; };

    /* ---- Veterans Stadium: concrete multipurpose donut ---- */
    const vO = 42, vI = 22;
    const donut =
      "M " + (L[0] - vO) + " " + L[1] +
      " a " + vO + " " + vO + " 0 1 0 " + (vO * 2) + " 0" +
      " a " + vO + " " + vO + " 0 1 0 " + (-vO * 2) + " 0 Z" +
      "M " + (L[0] - vI) + " " + L[1] +
      " a " + vI + " " + vI + " 0 1 1 " + (vI * 2) + " 0" +
      " a " + vI + " " + vI + " 0 1 1 " + (-vI * 2) + " 0 Z";
    // radial seating divisions across the ring
    const vSpokes = [];
    for (let i = 0; i < 16; i++) {
      const a = (Math.PI / 8) * i;
      vSpokes.push(e("line", { key: "vs" + i,
        x1: (L[0] + vI * Math.cos(a)).toFixed(1), y1: (L[1] + vI * Math.sin(a)).toFixed(1),
        x2: (L[0] + vO * Math.cos(a)).toFixed(1), y2: (L[1] + vO * Math.sin(a)).toFixed(1),
        stroke: concreteEdge, strokeWidth: 0.5, opacity: 0.4 }));
    }
    // symmetric multipurpose field inside (round) + a faint diamond
    const vDia = "M " + L[0] + " " + (L[1] + 11) + " L " + (L[0] + 11) + " " + L[1] +
      " L " + L[0] + " " + (L[1] - 11) + " L " + (L[0] - 11) + " " + L[1] + " Z";

    /* ---- Citizens Bank Park: open baseball footprint ---- */
    const home = [R[0], R[1] + 38];
    const fr = 58, FOUL = 48;
    const cLF = polarUp(home, fr, -FOUL), cCF = polarUp(home, fr, 0), cRF = polarUp(home, fr, FOUL);
    const wedge = "M " + home[0] + " " + home[1] +
      " L " + cLF[0].toFixed(1) + " " + cLF[1].toFixed(1) +
      " Q " + polarUp(home, fr * 1.04, -FOUL / 2)[0].toFixed(1) + " " + polarUp(home, fr * 1.04, -FOUL / 2)[1].toFixed(1) +
        " " + cCF[0].toFixed(1) + " " + cCF[1].toFixed(1) +
      " Q " + polarUp(home, fr * 1.04, FOUL / 2)[0].toFixed(1) + " " + polarUp(home, fr * 1.04, FOUL / 2)[1].toFixed(1) +
        " " + cRF[0].toFixed(1) + " " + cRF[1].toFixed(1) + " Z";
    // brick grandstand horseshoe just outside the seating, open at home
    const gLF = polarUp(home, fr + 11, -62), gRF = polarUp(home, fr + 11, 62);
    const grand = "M " + gLF[0].toFixed(1) + " " + gLF[1].toFixed(1) +
      " A " + (fr + 11) + " " + (fr + 11) + " 0 0 1 " + gRF[0].toFixed(1) + " " + gRF[1].toFixed(1);
    // infield clay diamond at home
    const dd = 13;
    const cDia = "M " + home[0] + " " + home[1] +
      " L " + (home[0] + dd) + " " + (home[1] - dd) + " L " + home[0] + " " + (home[1] - 2 * dd) +
      " L " + (home[0] - dd) + " " + (home[1] - dd) + " Z";

    return e("svg", { viewBox: "0 0 " + W + " " + H, className: "cbp-fig", role: "img",
      "aria-label": "Lifecycle: Veterans Stadium multipurpose concrete bowl resolves into the Citizens Bank Park open baseball footprint" },
      e("defs", null,
        e("linearGradient", { id: "vetGrass", x1: "0", y1: "0", x2: "0", y2: "1" },
          e("stop", { offset: "0", stopColor: grassHi }), e("stop", { offset: "1", stopColor: grass }))),
      // labels
      e("text", { x: L[0], y: 18, textAnchor: "middle",
        style: { fontFamily: SANS, fontWeight: 600, fontSize: "9px", fill: ink3, letterSpacing: ".1em" } }, "VETERANS STADIUM"),
      e("text", { x: L[0], y: 142, textAnchor: "middle",
        style: { fontFamily: MONO, fontWeight: 400, fontSize: "8px", fill: ink3, letterSpacing: ".04em" } }, "1971\u20132003"),
      e("text", { x: R[0], y: 18, textAnchor: "middle",
        style: { fontFamily: SANS, fontWeight: 600, fontSize: "9px", fill: brick, letterSpacing: ".1em" } }, "CITIZENS BANK PARK"),
      e("text", { x: R[0], y: 142, textAnchor: "middle",
        style: { fontFamily: MONO, fontWeight: 400, fontSize: "8px", fill: ink3, letterSpacing: ".04em" } }, "2004\u2013"),

      // --- Veterans Stadium donut ---
      e("circle", { cx: L[0], cy: L[1], r: vI - 2, fill: grassHi, opacity: 0.5 }),
      e("path", { d: vDia, fill: "none", stroke: "#4F5E3E", strokeWidth: 0.8, opacity: 0.6 }),
      e("path", { d: donut, fill: concrete, fillRule: "evenodd", stroke: "none", opacity: 0.92 }),
      vSpokes,
      e("circle", { cx: L[0], cy: L[1], r: vO, fill: "none", stroke: concreteEdge, strokeWidth: 1.3 }),
      e("circle", { cx: L[0], cy: L[1], r: vI, fill: "none", stroke: concreteEdge, strokeWidth: 1 }),

      // --- Citizens Bank Park footprint ---
      e("path", { d: grand, fill: "none", stroke: brick, strokeWidth: 2, strokeLinecap: "round" }),
      e("line", { x1: gLF[0], y1: gLF[1], x2: home[0] - 9, y2: home[1] - 4, stroke: brick, strokeWidth: 2, strokeLinecap: "round" }),
      e("line", { x1: gRF[0], y1: gRF[1], x2: home[0] + 9, y2: home[1] - 4, stroke: brick, strokeWidth: 2, strokeLinecap: "round" }),
      e("path", { d: wedge, fill: "url(#vetGrass)", stroke: "#4F5E3E", strokeWidth: 1, strokeLinejoin: "round" }),
      e("path", { d: cDia, fill: stone, stroke: "#A8854A", strokeWidth: 0.9, strokeLinejoin: "round", opacity: 0.95 }),
      e("circle", { cx: home[0], cy: home[1], r: 1.8, fill: brick }),

      // transition arrow
      e("line", { x1: L[0] + 50, y1: L[1], x2: R[0] - 50, y2: L[1], stroke: ink2, strokeWidth: 1 }),
      e("polygon", { points: (R[0] - 50) + "," + L[1] + " " + (R[0] - 56) + "," + (L[1] - 3.5) + " " + (R[0] - 56) + "," + (L[1] + 3.5), fill: ink2 })
    );
  }

  // VetGhost (multipurpose-bowl → baseball-footprint transition diagram) retired
  // from the lifecycle band — superseded by the horizontal evolution timeline.
  window.CBPDiagrams = { FieldInstrument, Bell };
})();
