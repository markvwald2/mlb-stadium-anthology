/* minute-maid-diagram.jsx — engineering instruments for Bay D of the
   Minute Maid Park spread. Three small, subordinate, drafting-style figures
   that read as terminal/roof machinery rather than sports graphics:
     RoofSection  — sectional truss profile of the retractable roof
     RoofTravel   — plan schematic of the sliding roof panels on their tracks
     FieldInstrument — protractor-like field-geometry plate (LF/CF/RF) + the
                       NNW / 343° orientation compass
   Steel-gray line work on warm paper; grass + navy + a single orange tick as
   restrained accents. Local data only. Exposes window.MMPDiagrams. */
(function () {
  const e = React.createElement;
  const ink = "#211D17", ink2 = "#524A3C", ink3 = "#8A816E",
        navy = "#0E2A47", steel = "#6F6E68", steelHi = "#9A968C",
        roofglass = "#7C93A0", brick = "#9C3A2A", orange = "#D9641C",
        grass = "#6E8758", grassHi = "#7E9866", rule = "#BEB199";

  const MONO = "'Space Mono', monospace";
  const SANS = "'Oswald', sans-serif";

  // ---------------------------------------------------------------- roof section
  // Two nested arched steel trusses (the parked roof) springing from rail-edge
  // gantries, with web members; a thin glass line and the bowl datum beneath.
  function RoofSection() {
    const W = 214, H = 104;
    const cx = W / 2, base = 90, springL = 22, springR = W - 22;
    function arc(rise) {
      const top = base - rise;
      return "M " + springL + " " + base +
             " Q " + cx + " " + (top - 14) + " " + springR + " " + base;
    }
    // web members between the two trusses
    const webs = [];
    const N = 9;
    for (let i = 1; i < N; i++) {
      const t = i / N;
      const x = springL + (springR - springL) * t;
      // parabola heights for outer (rise 64) and inner (rise 48)
      const yO = base - (64 - 14) * (1 - Math.pow(2 * t - 1, 2)) - 14 * 0;
      const par = (rise) => base - (rise) * (1 - Math.pow(2 * t - 1, 2));
      webs.push(e("line", { key: "w" + i, x1: x, y1: par(58), x2: x, y2: par(44),
        stroke: steelHi, strokeWidth: 0.8, opacity: 0.7 }));
      if (i % 2 === 0) webs.push(e("line", { key: "d" + i, x1: x, y1: par(58),
        x2: springL + (springR - springL) * ((i - 1) / N), y2: par(44),
        stroke: steelHi, strokeWidth: 0.7, opacity: 0.5 }));
    }
    return e("svg", { viewBox: "0 0 " + W + " " + H, className: "mm-fig", role: "img",
      "aria-label": "Sectional profile of the retractable roof trusses" },
      // bowl datum
      e("line", { x1: 6, y1: base, x2: W - 6, y2: base, stroke: ink3, strokeWidth: 1, strokeDasharray: "2 3", opacity: 0.7 }),
      // gantries / rail edges
      e("rect", { x: springL - 7, y: base, width: 8, height: 12, fill: "none", stroke: steel, strokeWidth: 1 }),
      e("rect", { x: springR - 1, y: base, width: 8, height: 12, fill: "none", stroke: steel, strokeWidth: 1 }),
      // roof glass tint between trusses
      e("path", { d: arc(58) + " L " + springR + " " + base + " Z", fill: roofglass, opacity: 0.12 }),
      webs,
      // outer + inner truss chords
      e("path", { d: arc(64), fill: "none", stroke: steel, strokeWidth: 1.5 }),
      e("path", { d: arc(48), fill: "none", stroke: steelHi, strokeWidth: 1 }),
      // a single orange signal lamp at the crown
      e("circle", { cx: cx, cy: base - 60, r: 2.2, fill: orange })
    );
  }

  // ---------------------------------------------------------------- roof travel
  // Plan of the sliding panels parked along their tracks; gantry crossbars,
  // travel arrows. Abstract rhythm device — not a claim about panel count.
  function RoofTravel() {
    const W = 214, H = 78, top = 16, bot = 60, n = 5;
    const x0 = 14, x1 = W - 14, span = x1 - x0, seg = span / n;
    const tracks = [top, bot].map((y, i) =>
      e("line", { key: "t" + i, x1: x0 - 6, y1: y, x2: x1 + 6, y2: y, stroke: steel, strokeWidth: 1.2 }));
    const panels = [];
    for (let i = 0; i < n; i++) {
      const px = x0 + seg * i + 3, pw = seg - 6;
      // staggered parked position to suggest travel
      const off = (i - 2) * 1.5;
      panels.push(e("rect", { key: "p" + i, x: px + off, y: top + 4, width: pw, height: bot - top - 8,
        fill: i === 2 ? "rgba(124,147,160,0.16)" : "none", stroke: steelHi, strokeWidth: 1, opacity: 0.92 }));
      // hatch
      panels.push(e("line", { key: "h" + i, x1: px + off, y1: bot - 4, x2: px + off + pw, y2: top + 4,
        stroke: steelHi, strokeWidth: 0.6, opacity: 0.5 }));
      panels.push(e("text", { key: "n" + i, x: px + off + pw / 2, y: (top + bot) / 2 + 3, textAnchor: "middle",
        style: { fontFamily: MONO, fontWeight: 700, fontSize: "8px", fill: ink3 } }, i + 1));
    }
    return e("svg", { viewBox: "0 0 " + W + " " + H, className: "mm-fig", role: "img",
      "aria-label": "Plan schematic of the roof panels on their travel tracks" },
      tracks, panels,
      // travel direction arrow
      e("line", { x1: x0 + 4, y1: H - 6, x2: x1 - 4, y2: H - 6, stroke: ink3, strokeWidth: 0.8 }),
      e("polygon", { points: (x1 - 4) + "," + (H - 6) + " " + (x1 - 9) + "," + (H - 9) + " " + (x1 - 9) + "," + (H - 3), fill: ink3 }),
      e("polygon", { points: (x0 + 4) + "," + (H - 6) + " " + (x0 + 9) + "," + (H - 9) + " " + (x0 + 9) + "," + (H - 3), fill: ink3 })
    );
  }

  // ---------------------------------------------------------------- field plate
  function FieldInstrument(props) {
    const lf = props.lf, cf = props.cf, rf = props.rf;
    const W = 214, H = 188;
    const C = [W / 2, 168];                 // home plate
    // distance -> radius (CF 409 deepest)
    const rCF = 132, rLF = rCF * 315 / 409, rRF = rCF * 326 / 409;
    const FOUL = 46;                        // half foul-angle (deg) from CF axis
    const polar = (r, aDeg) => { const a = aDeg * Math.PI / 180; return [C[0] + r * Math.sin(a), C[1] - r * Math.cos(a)]; };
    const pLF = polar(rLF, -FOUL), pCF = polar(rCF, 0), pRF = polar(rRF, FOUL);
    // fair sector: home -> LF -> (smooth thru CF) -> RF -> home
    const sector = "M " + C[0] + " " + C[1] +
      " L " + pLF[0].toFixed(1) + " " + pLF[1].toFixed(1) +
      " Q " + polar(rCF * 1.04, -FOUL / 2)[0].toFixed(1) + " " + polar(rCF * 1.04, -FOUL / 2)[1].toFixed(1) +
        " " + pCF[0].toFixed(1) + " " + pCF[1].toFixed(1) +
      " Q " + polar(rCF * 1.04, FOUL / 2)[0].toFixed(1) + " " + polar(rCF * 1.04, FOUL / 2)[1].toFixed(1) +
        " " + pRF[0].toFixed(1) + " " + pRF[1].toFixed(1) + " Z";
    // protractor arc + ticks across the fair sector
    const ticks = [];
    for (let a = -FOUL; a <= FOUL; a += FOUL / 4) {
      const big = Math.abs(a) < 1 || Math.abs(Math.abs(a) - FOUL) < 1;
      const p1 = polar(rCF + 8, a), p2 = polar(rCF + 8 - (big ? 9 : 5), a);
      ticks.push(e("line", { key: "tk" + a, x1: p1[0], y1: p1[1], x2: p2[0], y2: p2[1],
        stroke: big ? ink2 : ink3, strokeWidth: big ? 1.2 : 0.7, opacity: big ? 0.9 : 0.55 }));
    }
    const arcA = polar(rCF + 8, -FOUL), arcB = polar(rCF + 8, FOUL);
    const protArc = "M " + arcA[0].toFixed(1) + " " + arcA[1].toFixed(1) +
      " A " + (rCF + 8) + " " + (rCF + 8) + " 0 0 1 " + arcB[0].toFixed(1) + " " + arcB[1].toFixed(1);
    // infield diamond
    const d = 16;
    const dia = "M " + C[0] + " " + C[1] +
      " L " + (C[0] + d) + " " + (C[1] - d) + " L " + C[0] + " " + (C[1] - 2 * d) +
      " L " + (C[0] - d) + " " + (C[1] - d) + " Z";

    function chip(p, t, off) {
      const fs = 11, w = t.length * fs * 0.62 + 12, h = 17;
      const x = p[0] + (off ? off[0] : 0), y = p[1] + (off ? off[1] : 0);
      return e("g", { key: "c" + t },
        e("rect", { x: x - w / 2, y: y - h / 2, width: w, height: h, rx: 2, fill: "#F4ECDA", stroke: rule, strokeWidth: 1 }),
        e("text", { x: x, y: y + 3.6, textAnchor: "middle",
          style: { fontFamily: MONO, fontWeight: 700, fontSize: fs + "px", fill: ink } }, t));
    }

    return e("svg", { viewBox: "0 0 " + W + " " + H, className: "mm-fig mm-field", role: "img",
      "aria-label": "Field geometry plate: LF " + lf + ", CF " + cf + ", RF " + rf + " feet" },
      e("defs", null,
        e("linearGradient", { id: "mmGrass", x1: "0", y1: "0", x2: "0", y2: "1" },
          e("stop", { offset: "0", stopColor: grassHi }), e("stop", { offset: "1", stopColor: grass }))),
      e("path", { d: sector, fill: "url(#mmGrass)", stroke: "#5E7350", strokeWidth: 1, strokeLinejoin: "round", opacity: 0.4 }),
      // foul lines
      e("line", { x1: C[0], y1: C[1], x2: pLF[0], y2: pLF[1], stroke: ink2, strokeWidth: 0.9, opacity: 0.8 }),
      e("line", { x1: C[0], y1: C[1], x2: pRF[0], y2: pRF[1], stroke: ink2, strokeWidth: 0.9, opacity: 0.8 }),
      e("path", { d: dia, fill: "none", stroke: ink2, strokeWidth: 1, strokeLinejoin: "round" }),
      e("path", { d: protArc, fill: "none", stroke: ink3, strokeWidth: 1, opacity: 0.6 }),
      ticks,
      // distance chips
      chip(pLF, lf, [-2, -2]),
      chip(pCF, cf, [0, -10]),
      chip(pRF, rf, [2, -2]),
      e("circle", { cx: C[0], cy: C[1], r: 2.4, fill: navy })
    );
  }

  // ---------------------------------------------------------------- compass
  function Compass(props) {
    const deg = props.degrees, orientation = props.orientation;
    const W = 214, H = 96, C = [44, 50], R = 30;
    const polar = (r, aDeg) => { const a = aDeg * Math.PI / 180; return [C[0] + r * Math.sin(a), C[1] - r * Math.cos(a)]; };
    const ticks = [];
    for (let a = 0; a < 360; a += 30) {
      const big = a % 90 === 0;
      const p1 = polar(R, a), p2 = polar(R - (big ? 7 : 4), a);
      ticks.push(e("line", { key: "ct" + a, x1: p1[0], y1: p1[1], x2: p2[0], y2: p2[1],
        stroke: big ? ink2 : ink3, strokeWidth: big ? 1.1 : 0.7, opacity: big ? 0.9 : 0.5 }));
    }
    const tip = polar(R - 3, deg), tail = polar(R - 3, deg + 180);
    const hl = polar(R - 11, deg), perp = deg + 90;
    const ph = (a, r) => polar(r, a);
    // arrowhead
    const hA = polar(R - 3, deg), hB = polar(R - 12, deg - 7), hC = polar(R - 12, deg + 7);
    const nlab = polar(R + 9, 0);
    return e("svg", { viewBox: "0 0 " + W + " " + H, className: "mm-fig", role: "img",
      "aria-label": "Field orientation " + orientation + " " + deg + " degrees" },
      e("circle", { cx: C[0], cy: C[1], r: R, fill: "none", stroke: ink3, strokeWidth: 1, opacity: 0.7 }),
      ticks,
      e("text", { x: nlab[0], y: nlab[1] + 3, textAnchor: "middle",
        style: { fontFamily: SANS, fontWeight: 700, fontSize: "10px", fill: ink, letterSpacing: ".04em" } }, "N"),
      // needle
      e("line", { x1: tail[0], y1: tail[1], x2: tip[0], y2: tip[1], stroke: navy, strokeWidth: 2, strokeLinecap: "round" }),
      e("polygon", { points: hA[0].toFixed(1) + "," + hA[1].toFixed(1) + " " + hB[0].toFixed(1) + "," + hB[1].toFixed(1) + " " + hC[0].toFixed(1) + "," + hC[1].toFixed(1), fill: orange }),
      e("circle", { cx: C[0], cy: C[1], r: 2.6, fill: navy }),
      // readout
      e("text", { x: 92, y: 40, style: { fontFamily: SANS, fontWeight: 700, fontSize: "26px", fill: navy, letterSpacing: ".02em" } }, orientation),
      e("text", { x: 92, y: 64, style: { fontFamily: MONO, fontWeight: 700, fontSize: "18px", fill: ink } }, deg + "\u00b0"),
      e("text", { x: 93, y: 80, style: { fontFamily: SANS, fontWeight: 500, fontSize: "8.5px", fill: ink3, letterSpacing: ".14em" } }, "FIELD AXIS \u00b7 TRUE N")
    );
  }

  window.MMPDiagrams = { RoofSection, RoofTravel, FieldInstrument, Compass };
})();
