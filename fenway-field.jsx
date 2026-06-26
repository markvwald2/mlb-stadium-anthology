/* fenway-field.jsx — Fenway Park field instrument.
   A small survey/protractor drawn for the dark green steel panel: cream scale,
   restrained Red Sox-red bearing needle reading the NE / 45-degree field axis off
   true north, and an ASYMMETRIC outfield fan whose wall points are placed at radii
   proportional to the real distances (LF 310 / CF 389 / RF 302) so Fenway's deep
   center and short right field read immediately. The left-field wall is drawn as a
   heavier "Green Monster" segment (a named feature in the facade data — no invented
   numbers). Props: lf, cf, rf, orientation, bearing. Exposes window.FenwayField. */
(function () {
  const e = React.createElement;

  // palette for placement ON the dark green steel panel
  const cream = "#E7DEC6", creamDim = "rgba(231,222,198,.55)", creamFaint = "rgba(231,222,198,.32)";
  const grass = "#1E3A26", grassHi = "#27492F", clay = "#A86E3C", clayEdge = "#7F4F2A";
  const monster = "#3C6B45", wallInk = "#0F2417";
  const red = "#C24049", inkChip = "#13281A";

  function polar(C, r, aDeg) { const t = aDeg * Math.PI / 180; return [C[0] + r * Math.sin(t), C[1] - r * Math.cos(t)]; }
  function rot(p, C, deg) {
    const t = deg * Math.PI / 180, c = Math.cos(t), s = Math.sin(t);
    const dx = p[0] - C[0], dy = p[1] - C[1];
    return [C[0] + dx * c - dy * s, C[1] + dx * s + dy * c];
  }

  function Chip(props) {
    const fs = props.size || 13;
    // no box: plain white Jost numerals, with a subtle dark halo (paint-order stroke)
    // so they stay legible over both the green grass and the light dirt.
    return e("text", { x: props.x, y: props.y + fs * 0.35, textAnchor: "middle",
      style: { fontFamily: "'Jost', sans-serif", fontWeight: 600, fontSize: fs + "px", fill: "#FFFFFF",
        letterSpacing: ".01em", paintOrder: "stroke", stroke: "rgba(9,20,13,.6)", strokeWidth: "2.6px", strokeLinejoin: "round" } }, props.text);
  }

  function FenwayField(props) {
    const bearing = (props.bearing != null) ? props.bearing : 45;
    const orientation = props.orientation || "NE";
    // Big-field layout: the uploaded artwork fills the frame and the protractor is
    // tucked INSIDE the outfield grass (small radius) rather than ringing the field,
    // so the diagram can run roughly twice as large as the boxed-in version.
    const C = [132, 196];          // home plate
    const PR = 96;                 // protractor radius — sits in the outfield grass
    const FK = 0.5;                // field artwork scale (its home plate 217,390 -> C)
    const FOX = C[0] - FK * 217, FOY = C[1] - FK * 390;
    const fieldTf = "rotate(" + bearing + " " + C[0] + " " + C[1] + ") translate(" + FOX + " " + FOY + ") scale(" + FK + ")";
    // map an artwork-space point to panel space (scale -> translate -> rotate to bearing)
    function mapPt(p) { return rot([FK * p[0] + FOX, FK * p[1] + FOY], C, bearing); }

    // protractor scale (0..90, N up)
    const ticks = [];
    for (let a = 0; a <= 90; a += 10) {
      const big = a % 30 === 0;
      const p1 = polar(C, PR, a), p2 = polar(C, PR - (big ? 12 : 6), a);
      ticks.push(e("line", { key: "t" + a, x1: p1[0], y1: p1[1], x2: p2[0], y2: p2[1],
        stroke: big ? creamDim : creamFaint, strokeWidth: big ? 1.2 : 0.8 }));
    }
    // 0 is pulled up into the top margin and 90 next to 45 (hand-placed); 45 stays on the arc.
    const numOverride = { 0: [123, 99], 90: [231, 206] };
    const nums = [0, 45, 90].map((a, i) => {
      const d = polar(C, PR + 13, a);
      const o = numOverride[a];
      const x = o ? o[0] : d[0], y = (o ? o[1] : d[1]) + 4;
      return e("text", { key: "n" + i, x: x, y: y, textAnchor: "middle",
        style: { fontFamily: "'Space Mono',monospace", fontWeight: 700, fontSize: "11px", fill: creamDim } }, a);
    });
    const arcA = polar(C, PR, 0), arcB = polar(C, PR, 90);
    const protArc = "M " + arcA[0] + " " + arcA[1] + " A " + PR + " " + PR + " 0 0 1 " + arcB[0].toFixed(1) + " " + arcB[1].toFixed(1);

    // bearing needle at 45
    const ntip = polar(C, PR - 4, bearing);
    const back = polar(ntip, 11, bearing + 180), hl = polar(back, 5, bearing - 90), hr = polar(back, 5, bearing + 90);
    const head = [ntip, hl, hr].map(p => p[0].toFixed(1) + "," + p[1].toFixed(1)).join(" ");
    const degPos = polar(C, PR + 30, bearing);
    const nlab = polar(C, PR + 13, 0);

    // distance labels, placed OFF the field in the surrounding margin (explicit panel
    // coords so they're easy to hand-place). Order: LF / LCF / CF / deep / RCF / RF.
    const chips = [
      { p: [131, 38], t: props.lf },
      { p: [226, 40], t: "379" },
      { p: [275, 53], t: props.cf },
      { p: [307, 79], t: "420" },
      { p: [317, 142], t: "380" },
      { p: [291, 201], t: props.rf }
    ];

    return e("div", { className: "ff-wrap" },
      e("svg", { viewBox: "107 25 226 195", className: "ff-svg", role: "img", style: { transform: "translateY(-3px)" },
        "aria-label": "Field plan, oriented " + orientation + " " + bearing + " degrees; LF " + props.lf + ", CF " + props.cf + ", RF " + props.rf },
        // field artwork is the BOTTOM layer now (the protractor draws on top, inside
        // the grass). fieldTf scales the artwork up ~2x and rotates it to the bearing,
        // mapping its home plate (217,390 in its own 0..450 space) onto C. Strokes are
        // non-scaling so the chalk lines stay crisp.
        e("g", { transform: fieldTf },
          // outfield grass base (rounded outer)
          e("path", { d: "m227.8 442.4c-7.6 2.6-15.1 2.2-23.7-0.7-10.5-3.6-17.9-9.4-20.4-12.5-2.2-2.7-86.2-105.1-86.2-105.1l-7.7-54.8-80-80.5 1.4-1.4 408.9 2.6-1.7 4.3-73.8 75.8-8.4 56-62 73.6c0 0-22.7 27.7-26.8 32.7-3.3 4.2-11.9 7.4-19.6 10z",
            fillRule: "evenodd", fill: "#4a7f4b" }),
          // fair-territory wedge
          e("path", { d: "m217 393.2l-205.8-205.8 153.5-152.1h13.1l114.8-32.2 11.5 35.7 119.5 55.5c23.3 12 23.7 30.5 18.6 41.2l-22.1 54.5z",
            fillRule: "evenodd", fill: "#4a7f4b" }),
          // infield dirt diamond
          e("path", { d: "m217.1 272.1l-60.5 60.6 60.5 60.5 60.6-60.5z",
            fillRule: "evenodd", fill: "#efce8b" }),
          // home-plate dirt circle
          e("path", { d: "m208.6 384.8c4.6-4.6 12.1-4.6 16.7 0 4.7 4.6 4.7 12.1 0 16.8-4.6 4.6-12.1 4.6-16.7 0-4.6-4.7-4.6-12.2 0-16.8z",
            fillRule: "evenodd", fill: "#efce8b" }),
          // foul lines
          e("path", { d: "m11.2 187.4l202.7 202.7 3 3",
            fill: "none", stroke: "#fff", strokeWidth: 1.3, vectorEffect: "non-scaling-stroke", strokeLinecap: "round", strokeLinejoin: "round" }),
          e("path", { d: "m420.8 189.4l-200.7 200.7-3.5 3.5",
            fill: "none", stroke: "#fff", strokeWidth: 1.3, vectorEffect: "non-scaling-stroke", strokeLinecap: "round", strokeLinejoin: "round" })
        ),
        // protractor scale + N, drawn ON the grass (inside the field)
        e("path", { d: protArc, fill: "none", stroke: creamFaint, strokeWidth: 1 }),
        ticks, nums,
        // north baseline + bearing needle
        e("line", { x1: C[0], y1: C[1], x2: polar(C, PR - 4, 0)[0], y2: polar(C, PR - 4, 0)[1], stroke: creamFaint, strokeWidth: 1, strokeDasharray: "3 3" }),
        e("line", { x1: C[0], y1: C[1], x2: ntip[0], y2: ntip[1], stroke: red, strokeWidth: 2.2, strokeLinecap: "round" }),
        e("polygon", { points: head, fill: red }),
        e("circle", { cx: C[0], cy: C[1], r: 2.6, fill: cream }),
        chips.map((c, i) => e(Chip, { key: "d" + i, x: c.p[0], y: c.p[1], text: c.t, size: 13 }))
      )
    );
  }

  window.FenwayField = FenwayField;
})();
