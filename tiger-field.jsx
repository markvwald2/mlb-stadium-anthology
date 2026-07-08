/* tiger-field.jsx — "The Corner Lot" field instruments for Tiger Stadium.
   Two exports:
     window.TigerFieldPlan  — large low-opacity asymmetric field-geometry plan
                              (short corners, very deep center, right-field
                              upper-deck overhang) used as a drafting watermark.
     window.TigerProtractor — compact protractor orientation symbol (~1 in),
                              bearing needle read off true north.
   Drawn from window.TIGER geometry. Local data only; no invented values. */
(function () {
  const e = React.createElement;

  // Corner-Lot palette: blueprint gray drafting lines, charcoal, Detroit orange.
  const ink = "#20201D", line = "#6A7782", lineSoft = "#8A95A0",
        orange = "#C5491B", navy = "#0C2340", paperHi = "#F3EEE0",
        rule = "#C9C1AE", ink3 = "#87827A";

  function strip(v) { return (v || "").toString().replace(" ft", ""); }
  function polar(C, r, a) { const t = a * Math.PI / 180; return [C[0] + r * Math.sin(t), C[1] - r * Math.cos(t)]; }

  /* ---------- Large asymmetric field plan (watermark) ---------- */
  function TigerFieldPlan(props) {
    const stroke = props.stroke || line;
    const op = props.opacity != null ? props.opacity : 1;
    // home plate bottom-center; CF deep at top. Asymmetry encoded in geometry.
    const home = [300, 486];
    const lfPole = [126, 312];   // 340 ft — short
    const lfAlley = [188, 226];
    const cf = [300, 150];       // 440 ft — very deep
    const rfAlley = [410, 232];
    const rfPole = [470, 322];   // 325 ft — shortest
    // outfield wall: stepped, asymmetric, bulging through center
    const wall =
      "M " + lfPole[0] + " " + lfPole[1] +
      " L " + lfAlley[0] + " " + lfAlley[1] +
      " Q 250 168 " + cf[0] + " " + cf[1] +
      " Q 360 172 " + rfAlley[0] + " " + rfAlley[1] +
      " L " + rfPole[0] + " " + rfPole[1];
    // fair-territory fill
    const fair =
      "M " + home[0] + " " + home[1] +
      " L " + lfPole[0] + " " + lfPole[1] +
      " L " + lfAlley[0] + " " + lfAlley[1] +
      " Q 250 168 " + cf[0] + " " + cf[1] +
      " Q 360 172 " + rfAlley[0] + " " + rfAlley[1] +
      " L " + rfPole[0] + " " + rfPole[1] + " Z";
    // infield diamond
    const d = 52;
    const first = [home[0] + d, home[1] - d], second = [home[0], home[1] - 2 * d], third = [home[0] - d, home[1] - d];
    const dia = "M " + home[0] + " " + home[1] + " L " + first[0] + " " + first[1] +
                " L " + second[0] + " " + second[1] + " L " + third[0] + " " + third[1] + " Z";
    // right-field upper-deck overhang: dashed line set just inside the RF wall
    const ov1 = [rfPole[0] - 16, rfPole[1] - 6], ov2 = [rfAlley[0] - 10, rfAlley[1] + 14];

    function fchip(p, t, key) {
      const w = t.length * 12 + 16, h = 24;
      return e("g", { key: key },
        e("rect", { x: p[0] - w / 2, y: p[1] - h / 2, width: w, height: h, fill: "#ECE6D6", stroke: stroke, strokeWidth: 1.1, rx: 1.5 }),
        e("text", { x: p[0], y: p[1] + 5.5, textAnchor: "middle",
          style: { fontFamily: "'Space Mono',monospace", fontWeight: 700, fontSize: "16px", fill: stroke, letterSpacing: ".01em" } }, t));
    }

    // faint field-plan watermark (lines + distance chips), BEHIND the prose
    return e("svg", { viewBox: "70 110 460 420", className: props.className, "aria-hidden": "true",
      style: { opacity: op, overflow: "visible" } },
      // grass/fair region — faint
      e("path", { d: fair, fill: stroke, fillOpacity: 0.06, stroke: "none" }),
      // foul lines
      e("line", { x1: home[0], y1: home[1], x2: lfPole[0], y2: lfPole[1], stroke: stroke, strokeWidth: 1.4 }),
      e("line", { x1: home[0], y1: home[1], x2: rfPole[0], y2: rfPole[1], stroke: stroke, strokeWidth: 1.4 }),
      // outfield wall
      e("path", { d: wall, fill: "none", stroke: stroke, strokeWidth: 2, strokeLinejoin: "round", strokeLinecap: "round" }),
      // overhang dashed line + faint label (part of the watermark)
      e("line", { x1: ov1[0], y1: ov1[1], x2: ov2[0], y2: ov2[1], stroke: orange, strokeWidth: 1.6, strokeDasharray: "5 4", opacity: 0.7 }),
      e("text", { x: rfPole[0] + 6, y: rfPole[1] + 8, textAnchor: "end",
        style: { fontFamily: "'Oswald',sans-serif", fontWeight: 600, fontSize: "11px", fill: orange, letterSpacing: ".12em" } }, "RF OVERHANG"),
      // infield
      e("path", { d: dia, fill: "none", stroke: stroke, strokeWidth: 1.3 }),
      e("circle", { cx: home[0], cy: home[1] - d, r: 13, fill: "none", stroke: stroke, strokeWidth: 1 }),
      // distance chips — faint, part of the watermark
      fchip([lfPole[0] - 4, lfPole[1] - 18], strip(props.lf), "lf"),
      fchip([cf[0], cf[1] - 20], strip(props.cf), "cf"),
      fchip([rfPole[0] + 6, rfPole[1] - 18], strip(props.rf), "rf")
    );
  }

  /* ---------- Compact protractor orientation symbol ---------- */
  function TigerProtractor(props) {
    const deg = props.degrees != null ? props.degrees : 22.5;
    const orientation = props.orientation || "NNE";
    const C = [90, 96], R = 52, PR = 70;
    // small rotated ballpark glyph
    const home = [C[0], C[1] + R * 0.62], cf = [C[0], C[1] - R * 0.62],
          lf = [C[0] - R * 0.6, C[1] + R * 0.04], rf = [C[0] + R * 0.6, C[1] + R * 0.04];
    const grass = "M " + home[0] + " " + home[1] + " L " + lf[0] + " " + lf[1] +
                  " A " + (R * 0.6) + " " + (R * 0.6) + " 0 0 1 " + rf[0] + " " + rf[1] + " Z";
    const ticks = [];
    for (let a = 0; a <= 90; a += 15) {
      const big = a % 45 === 0;
      const p1 = polar(C, PR, a), p2 = polar(C, PR - (big ? 9 : 5), a);
      ticks.push(e("line", { key: "t" + a, x1: p1[0], y1: p1[1], x2: p2[0], y2: p2[1],
        stroke: big ? ink : lineSoft, strokeWidth: big ? 1.2 : 0.8 }));
    }
    const arcA = polar(C, PR, 0), arcB = polar(C, PR, 90);
    const arc = "M " + arcA[0] + " " + arcA[1] + " A " + PR + " " + PR + " 0 0 1 " + arcB[0].toFixed(1) + " " + arcB[1].toFixed(1);
    const ntip = polar(C, PR + 4, deg);
    const nlab = polar(C, PR + 13, 0);
    const dlab = polar(C, PR + 20, deg);

    return e("svg", { viewBox: "8 2 164 128", className: props.className, role: "img",
      "aria-label": "Field orientation " + orientation + " " + deg + " degrees", style: { overflow: "visible" } },
      e("g", { transform: "rotate(" + deg + " " + C[0] + " " + C[1] + ")" },
        e("path", { d: grass, fill: navy, fillOpacity: 0.12, stroke: navy, strokeWidth: 1.3, strokeLinejoin: "round" }),
        e("line", { x1: home[0], y1: home[1], x2: lf[0], y2: lf[1], stroke: navy, strokeWidth: 0.9 }),
        e("line", { x1: home[0], y1: home[1], x2: rf[0], y2: rf[1], stroke: navy, strokeWidth: 0.9 })
      ),
      e("path", { d: arc, fill: "none", stroke: ink3, strokeWidth: 1 }),
      ticks,
      // bearing needle
      e("line", { x1: C[0], y1: C[1], x2: polar(C, PR, 0)[0], y2: polar(C, PR, 0)[1], stroke: ink3, strokeWidth: 0.9, strokeDasharray: "2.5 2.5" }),
      e("line", { x1: C[0], y1: C[1], x2: ntip[0], y2: ntip[1], stroke: orange, strokeWidth: 2, strokeLinecap: "round" }),
      e("circle", { cx: ntip[0], cy: ntip[1], r: 2.6, fill: orange }),
      e("circle", { cx: C[0], cy: C[1], r: 2.4, fill: ink }),
      e("text", { x: dlab[0], y: dlab[1] + 4, textAnchor: "middle",
        style: { fontFamily: "'Space Mono',monospace", fontWeight: 700, fontSize: "21px", fill: orange } }, deg + "\u00b0")
    );
  }

  window.TigerFieldPlan = TigerFieldPlan;
  window.TigerProtractor = TigerProtractor;
})();
